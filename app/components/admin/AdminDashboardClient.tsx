"use client";

import { useMemo, useState, useTransition } from "react";
import type { AppointmentLead, InquiryLead, LeadStatus, AppointmentStatus } from "@/app/lib/lead-store";

const appointmentStatuses: AppointmentStatus[] = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
  "NO_SHOW",
];
const inquiryStatuses: LeadStatus[] = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "SPAM"];

type Props = {
  appointments: AppointmentLead[];
  inquiries: InquiryLead[];
  subscribersCount: number;
};

export function AdminDashboardClient({ appointments, inquiries, subscribersCount }: Props) {
  const [appointmentList, setAppointmentList] = useState(appointments);
  const [inquiryList, setInquiryList] = useState(inquiries);
  const [isPending, startTransition] = useTransition();

  const stats = useMemo(() => {
    const pendingAppointments = appointmentList.filter((item) => item.status === "PENDING").length;
    const newInquiries = inquiryList.filter((item) => (item.leadStatus ?? "NEW") === "NEW").length;
    return { pendingAppointments, newInquiries };
  }, [appointmentList, inquiryList]);

  const updateAppointment = (id: string, status: AppointmentStatus) => {
    startTransition(async () => {
      const response = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setAppointmentList((list) => list.map((item) => (item.id === id ? { ...item, status } : item)));
      }
    });
  };

  const updateInquiry = (id: string, leadStatus: LeadStatus) => {
    startTransition(async () => {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadStatus }),
      });
      if (response.ok) {
        setInquiryList((list) => list.map((item) => (item.id === id ? { ...item, leadStatus } : item)));
      }
    });
  };

  return (
    <section className="premium-section">
      <div className="site-max site-px">
        <div className="premium-section__head">
          <p className="premium-eyebrow">Admin dashboard</p>
          <h1 className="premium-title">Lead and appointment command center</h1>
          <p className="premium-section__lede">
            {isPending ? "Saving updates..." : "Track private appointments and convert inquiries into confirmed visits."}
          </p>
        </div>

        <div className="premium-trust__grid" style={{ marginBottom: "1rem" }}>
          <article className="premium-glass-card premium-trust__card">
            <p>Total appointments</p>
            <strong>{appointmentList.length}</strong>
            <small>{stats.pendingAppointments} pending</small>
          </article>
          <article className="premium-glass-card premium-trust__card">
            <p>Total inquiries</p>
            <strong>{inquiryList.length}</strong>
            <small>{stats.newInquiries} new leads</small>
          </article>
          <article className="premium-glass-card premium-trust__card">
            <p>Subscribers</p>
            <strong>{subscribersCount}</strong>
            <small>newsletter contacts</small>
          </article>
        </div>

        <div className="premium-contact__grid">
          <article className="premium-glass-card" style={{ padding: "1rem" }}>
            <p className="premium-eyebrow">Appointments</p>
            <div className="premium-contact-form__fields">
              {appointmentList.slice(0, 20).map((item) => (
                <div key={item.id} className="premium-glass-card" style={{ padding: "0.85rem" }}>
                  <strong>{item.fullName}</strong>
                  <p>{item.email} · {item.phone}</p>
                  <p>{item.appointmentType} · {item.preferredDate.slice(0, 10)} · {item.preferredTimeSlot}</p>
                  <label>
                    Status
                    <select
                      className="premium-field"
                      value={item.status}
                      onChange={(event) => updateAppointment(item.id, event.target.value as AppointmentStatus)}
                    >
                      {appointmentStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
            </div>
          </article>

          <article className="premium-glass-card" style={{ padding: "1rem" }}>
            <p className="premium-eyebrow">Inquiries</p>
            <div className="premium-contact-form__fields">
              {inquiryList.slice(0, 20).map((item) => (
                <div key={item.id} className="premium-glass-card" style={{ padding: "0.85rem" }}>
                  <strong>{item.fullName}</strong>
                  <p>{item.email}{item.phone ? ` · ${item.phone}` : ""}</p>
                  <p>{item.message}</p>
                  <label>
                    Lead status
                    <select
                      className="premium-field"
                      value={item.leadStatus ?? "NEW"}
                      onChange={(event) => updateInquiry(item.id, event.target.value as LeadStatus)}
                    >
                      {inquiryStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
