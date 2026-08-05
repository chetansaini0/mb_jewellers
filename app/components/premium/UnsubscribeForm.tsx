"use client";

import { FormEvent, useState } from "react";

export function UnsubscribeForm({
  initialEmail = "",
  token = "",
}: {
  initialEmail?: string;
  token?: string;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: token || undefined, website }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.error ?? "Unable to unsubscribe right now.");
        return;
      }
      setStatus("done");
      setMessage("You’re unsubscribed. You may still hear from us about active studio appointments.");
    } catch {
      setStatus("error");
      setMessage("Unable to unsubscribe right now.");
    }
  }

  return (
    <form className="premium-glass-card space-y-4 p-6" onSubmit={onSubmit} noValidate>
      <label className="block text-sm" htmlFor="unsubscribe-email">
        Email address
        <input
          id="unsubscribe-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-base outline-none focus:border-[var(--gold)]"
        />
      </label>
      <label className="sr-only" htmlFor="unsubscribe-website">
        Website
      </label>
      <input
        id="unsubscribe-website"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="hidden"
        aria-hidden
      />
      <button
        type="submit"
        className="premium-button premium-button--primary w-full sm:w-auto"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Updating…" : "Unsubscribe"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "error" ? "text-red-300" : "text-[var(--muted)]"}`} role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
