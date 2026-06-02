const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[0-9\s()-]{8,20}$/;
const appointmentTypes = new Set(["CONSULTATION", "BRIDAL", "CUSTOM_DESIGN", "REPAIR", "OTHER"]);

function normalizeString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function optionalString(value: unknown, maxLength: number) {
  const normalized = normalizeString(value, maxLength);
  return normalized.length ? normalized : undefined;
}

export type ContactInquiryInput = {
  fullName: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
  website: string;
};

export type AppointmentInput = {
  fullName: string;
  email: string;
  phone: string;
  appointmentType: "CONSULTATION" | "BRIDAL" | "CUSTOM_DESIGN" | "REPAIR" | "OTHER";
  preferredDate: string;
  preferredTimeSlot: string;
  category?: string;
  occasion?: string;
  notes?: string;
  website: string;
};

export type NewsletterInput = {
  email: string;
  fullName?: string;
  website: string;
};

export function parseContactInquiry(input: unknown): ContactInquiryInput | null {
  if (!input || typeof input !== "object") return null;
  const payload = input as Record<string, unknown>;

  const fullName = normalizeString(payload.fullName, 80);
  const email = normalizeString(payload.email, 120).toLowerCase();
  const phone = optionalString(payload.phone, 20);
  const category = optionalString(payload.category, 40);
  const message = normalizeString(payload.message, 1200);
  const website = normalizeString(payload.website, 0);

  if (fullName.length < 2) return null;
  if (!emailRegex.test(email)) return null;
  if (phone && !phoneRegex.test(phone)) return null;
  if (message.length < 10) return null;

  return { fullName, email, phone, category, message, website };
}

export function parseAppointment(input: unknown): AppointmentInput | null {
  if (!input || typeof input !== "object") return null;
  const payload = input as Record<string, unknown>;

  const fullName = normalizeString(payload.fullName, 80);
  const email = normalizeString(payload.email, 120).toLowerCase();
  const phone = normalizeString(payload.phone, 20);
  const appointmentType = normalizeString(payload.appointmentType, 20);
  const preferredDate = normalizeString(payload.preferredDate, 10);
  const preferredTimeSlot = normalizeString(payload.preferredTimeSlot, 40);
  const category = optionalString(payload.category, 40);
  const occasion = optionalString(payload.occasion, 100);
  const notes = optionalString(payload.notes, 1200);
  const website = normalizeString(payload.website, 0);

  if (fullName.length < 2) return null;
  if (!emailRegex.test(email)) return null;
  if (!phoneRegex.test(phone)) return null;
  if (!appointmentTypes.has(appointmentType)) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) return null;
  if (preferredTimeSlot.length < 2) return null;

  return {
    fullName,
    email,
    phone,
    appointmentType: appointmentType as AppointmentInput["appointmentType"],
    preferredDate,
    preferredTimeSlot,
    category,
    occasion,
    notes,
    website,
  };
}

export function parseNewsletter(input: unknown): NewsletterInput | null {
  if (!input || typeof input !== "object") return null;
  const payload = input as Record<string, unknown>;

  const email = normalizeString(payload.email, 120).toLowerCase();
  const fullName = optionalString(payload.fullName, 80);
  const website = normalizeString(payload.website, 0);

  if (!emailRegex.test(email)) return null;

  return { email, fullName, website };
}
