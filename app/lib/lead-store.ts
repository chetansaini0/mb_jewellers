import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getPrismaClient } from "@/app/lib/db";
import { getStorageMode } from "@/app/lib/storage-mode";

type JsonRecord = Record<string, unknown>;

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED" | "SPAM";
export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";

export type InquiryLead = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
  source: string;
  createdAt: string;
  leadStatus?: LeadStatus;
} & JsonRecord;

export type AppointmentLead = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  appointmentType: string;
  preferredDate: string;
  preferredTimeSlot: string;
  category?: string;
  occasion?: string;
  notes?: string;
  source: string;
  status: AppointmentStatus;
  createdAt: string;
} & JsonRecord;

export type NewsletterSubscriber = {
  id: string;
  email: string;
  fullName?: string;
  source: string;
  isActive: boolean;
  updatedAt: string;
} & JsonRecord;

const dataDir = path.join(process.cwd(), ".data");
const leadsFile = path.join(dataDir, "leads.json");

type DbInquiry = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  category: string | null;
  message: string;
  source: string;
  createdAt: Date;
  leadStatus: LeadStatus;
};

type DbAppointment = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  appointmentType: string;
  preferredDate: Date;
  preferredTimeSlot: string;
  category: string | null;
  occasion: string | null;
  notes: string | null;
  source: string;
  status: AppointmentStatus;
  createdAt: Date;
};

type DbSubscriber = {
  id: string;
  email: string;
  fullName: string | null;
  source: string;
  isActive: boolean;
  updatedAt: Date;
};

export type LeadStore = {
  inquiries: InquiryLead[];
  appointments: AppointmentLead[];
  subscribers: NewsletterSubscriber[];
};

const defaultStore: LeadStore = {
  inquiries: [],
  appointments: [],
  subscribers: [],
};

async function loadStore(): Promise<LeadStore> {
  try {
    const raw = await readFile(leadsFile, "utf8");
    return { ...defaultStore, ...(JSON.parse(raw) as Partial<LeadStore>) };
  } catch {
    return defaultStore;
  }
}

async function saveStore(store: LeadStore) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(leadsFile, JSON.stringify(store, null, 2), "utf8");
}

function shouldUsePostgres() {
  return getStorageMode() === "postgres-ready";
}

function toInquiryLead(inquiry: DbInquiry): InquiryLead {
  return {
    id: inquiry.id,
    fullName: inquiry.fullName,
    email: inquiry.email,
    phone: inquiry.phone ?? undefined,
    category: inquiry.category ?? undefined,
    message: inquiry.message,
    source: inquiry.source,
    createdAt: inquiry.createdAt.toISOString(),
    leadStatus: inquiry.leadStatus as LeadStatus,
  };
}

function toAppointmentLead(appointment: DbAppointment): AppointmentLead {
  return {
    id: appointment.id,
    fullName: appointment.fullName,
    email: appointment.email,
    phone: appointment.phone,
    appointmentType: appointment.appointmentType,
    preferredDate: appointment.preferredDate.toISOString(),
    preferredTimeSlot: appointment.preferredTimeSlot,
    category: appointment.category ?? undefined,
    occasion: appointment.occasion ?? undefined,
    notes: appointment.notes ?? undefined,
    source: appointment.source,
    status: appointment.status as AppointmentStatus,
    createdAt: appointment.createdAt.toISOString(),
  };
}

function toSubscriber(subscriber: DbSubscriber): NewsletterSubscriber {
  return {
    id: subscriber.id,
    email: subscriber.email,
    fullName: subscriber.fullName ?? undefined,
    source: subscriber.source,
    isActive: subscriber.isActive,
    updatedAt: subscriber.updatedAt.toISOString(),
  };
}

export async function insertInquiry(entry: JsonRecord) {
  const prisma = shouldUsePostgres() ? await getPrismaClient() : null;
  if (prisma) {
    const payload = entry as Partial<InquiryLead>;
    await prisma.inquiry.create({
      data: {
        fullName: String(payload.fullName ?? ""),
        email: String(payload.email ?? "").toLowerCase(),
        phone: typeof payload.phone === "string" ? payload.phone : null,
        category: typeof payload.category === "string" ? payload.category : null,
        message: String(payload.message ?? ""),
        source: typeof payload.source === "string" ? payload.source : "website",
        leadStatus: payload.leadStatus ?? "NEW",
      },
    });
    return;
  }

  const store = await loadStore();
  store.inquiries.unshift(entry as InquiryLead);
  await saveStore(store);
}

export async function insertAppointment(entry: JsonRecord) {
  const prisma = shouldUsePostgres() ? await getPrismaClient() : null;
  if (prisma) {
    const payload = entry as Partial<AppointmentLead>;
    const preferredDate = new Date(String(payload.preferredDate ?? ""));
    await prisma.appointment.create({
      data: {
        fullName: String(payload.fullName ?? ""),
        email: String(payload.email ?? "").toLowerCase(),
        phone: String(payload.phone ?? ""),
        appointmentType: String(payload.appointmentType ?? "CONSULTATION"),
        preferredDate,
        preferredTimeSlot: String(payload.preferredTimeSlot ?? ""),
        category: typeof payload.category === "string" ? payload.category : null,
        occasion: typeof payload.occasion === "string" ? payload.occasion : null,
        notes: typeof payload.notes === "string" ? payload.notes : null,
        source: typeof payload.source === "string" ? payload.source : "website",
        status: payload.status ?? "PENDING",
      },
    });
    return;
  }

  const store = await loadStore();
  store.appointments.unshift(entry as AppointmentLead);
  await saveStore(store);
}

export async function upsertSubscriber(entry: Partial<NewsletterSubscriber> & { email: string }) {
  const prisma = shouldUsePostgres() ? await getPrismaClient() : null;
  if (prisma) {
    await prisma.newsletterSubscriber.upsert({
      where: { email: entry.email.toLowerCase() },
      update: {
        fullName: entry.fullName ?? null,
        source: entry.source ?? "website",
        isActive: entry.isActive ?? true,
      },
      create: {
        email: entry.email.toLowerCase(),
        fullName: entry.fullName ?? null,
        source: entry.source ?? "website",
        isActive: entry.isActive ?? true,
      },
    });
    return;
  }

  const store = await loadStore();
  const existing = store.subscribers.findIndex((item) => item.email === entry.email);
  if (existing >= 0) {
    store.subscribers[existing] = {
      ...store.subscribers[existing],
      ...entry,
      updatedAt: new Date().toISOString(),
    };
  } else {
    store.subscribers.unshift({
      id: String(entry.id ?? crypto.randomUUID()),
      email: entry.email,
      fullName: entry.fullName,
      source: String(entry.source ?? "website"),
      isActive: entry.isActive ?? true,
      updatedAt: String(entry.updatedAt ?? new Date().toISOString()),
    });
  }
  await saveStore(store);
}

export async function getLeadStoreSnapshot() {
  const prisma = shouldUsePostgres() ? await getPrismaClient() : null;
  if (prisma) {
    const [inquiries, appointments, subscribers] = await Promise.all([
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.appointment.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.newsletterSubscriber.findMany({
        orderBy: { updatedAt: "desc" },
      }),
    ]);

    return {
      inquiries: (inquiries as DbInquiry[]).map(toInquiryLead),
      appointments: (appointments as DbAppointment[]).map(toAppointmentLead),
      subscribers: (subscribers as DbSubscriber[]).map(toSubscriber),
    };
  }

  return loadStore();
}

export async function updateAppointmentStatus(id: string, status: AppointmentStatus) {
  const prisma = shouldUsePostgres() ? await getPrismaClient() : null;
  if (prisma) {
    try {
      const updated = await prisma.appointment.update({
        where: { id },
        data: { status },
      });
      return toAppointmentLead(updated as DbAppointment);
    } catch {
      return null;
    }
  }

  const store = await loadStore();
  const index = store.appointments.findIndex((item) => item.id === id);
  if (index < 0) return null;

  store.appointments[index] = { ...store.appointments[index], status };
  await saveStore(store);
  return store.appointments[index];
}

export async function updateInquiryStatus(id: string, leadStatus: LeadStatus) {
  const prisma = shouldUsePostgres() ? await getPrismaClient() : null;
  if (prisma) {
    try {
      const updated = await prisma.inquiry.update({
        where: { id },
        data: { leadStatus },
      });
      return toInquiryLead(updated as DbInquiry);
    } catch {
      return null;
    }
  }

  const store = await loadStore();
  const index = store.inquiries.findIndex((item) => item.id === id);
  if (index < 0) return null;

  store.inquiries[index] = { ...store.inquiries[index], leadStatus };
  await saveStore(store);
  return store.inquiries[index];
}
