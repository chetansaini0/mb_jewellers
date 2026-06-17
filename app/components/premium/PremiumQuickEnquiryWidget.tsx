"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar, Gem, Search, Sparkles } from "lucide-react";

const occasions = [
  { value: "bridal", label: "Bridal" },
  { value: "engagement", label: "Engagement" },
  { value: "gifting", label: "Gifting" },
  { value: "custom", label: "Custom design" },
  { value: "viewing", label: "Private viewing" },
];

const collections = [
  { value: "diamond", label: "Diamond" },
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "bridal", label: "Bridal suite" },
  { value: "any", label: "Open to suggestions" },
];

export function PremiumQuickEnquiryWidget() {
  const router = useRouter();
  const [preferredDate, setPreferredDate] = useState("");
  const [occasion, setOccasion] = useState("viewing");
  const [collection, setCollection] = useState("any");
  const todayIso = new Date().toISOString().slice(0, 10);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set("mode", "APPOINTMENT");
    if (preferredDate) params.set("date", preferredDate);
    params.set("occasion", occasion);
    params.set("category", collection);
    router.push(`/contact?${params.toString()}`);
  }

  return (
    <form onSubmit={submit} className="premium-enquiry-widget" aria-label="Quick appointment enquiry">
      <label className="premium-enquiry-widget__field">
        <span className="premium-enquiry-widget__label">
          <Calendar className="premium-enquiry-widget__icon" aria-hidden />
          Preferred date
        </span>
        <input
          type="date"
          min={todayIso}
          value={preferredDate}
          onChange={(event) => setPreferredDate(event.target.value)}
          className="premium-enquiry-widget__input"
        />
      </label>

      <label className="premium-enquiry-widget__field">
        <span className="premium-enquiry-widget__label">
          <Sparkles className="premium-enquiry-widget__icon" aria-hidden />
          Occasion
        </span>
        <select
          value={occasion}
          onChange={(event) => setOccasion(event.target.value)}
          className="premium-enquiry-widget__input"
        >
          {occasions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label className="premium-enquiry-widget__field">
        <span className="premium-enquiry-widget__label">
          <Gem className="premium-enquiry-widget__icon" aria-hidden />
          Collection
        </span>
        <select
          value={collection}
          onChange={(event) => setCollection(event.target.value)}
          className="premium-enquiry-widget__input"
        >
          {collections.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <div className="premium-enquiry-widget__action">
        <button type="submit" className="premium-enquiry-widget__submit">
          <Search className="premium-enquiry-widget__icon" aria-hidden />
          Request viewing
        </button>
      </div>
    </form>
  );
}
