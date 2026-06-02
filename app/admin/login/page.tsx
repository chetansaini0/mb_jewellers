"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useClientMounted } from "@/app/hooks/useClientMounted";

function getSafeRedirect() {
  if (typeof window === "undefined") return "/admin";
  const params = new URLSearchParams(window.location.search);
  const next = params.get("next");
  if (next && next.startsWith("/")) return next;
  return "/admin";
}

export default function AdminLoginPage() {
  const router = useRouter();
  const mounted = useClientMounted();
  const [redirectTo] = useState(getSafeRedirect);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Unable to login.");
      }
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to login.");
    }
  };

  return (
    <main className="premium-main">
      <section className="premium-section">
        <div className="site-max site-px" style={{ maxWidth: "32rem" }}>
          <div className="premium-glass-card" style={{ padding: "1.5rem" }}>
            <p className="premium-eyebrow">Admin</p>
            <h1 className="premium-title" style={{ fontSize: "2rem" }}>
              Secure login
            </h1>
            <p className="premium-section__lede">Sign in to manage appointments and leads.</p>
            {!mounted ? (
              <div className="premium-contact-form__fields" style={{ marginTop: "1rem" }} aria-hidden>
                <div className="premium-field" style={{ minHeight: "2.75rem", opacity: 0.4 }} />
                <div className="premium-field" style={{ minHeight: "2.75rem", opacity: 0.4 }} />
                <button className="premium-button premium-button--primary" type="button" disabled tabIndex={-1}>
                  Sign in
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="premium-contact-form__fields" style={{ marginTop: "1rem" }}>
                <label>
                  Email
                  <input
                    className="premium-field"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                  />
                </label>
                <label>
                  Password
                  <input
                    className="premium-field"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </label>
                <button className="premium-button premium-button--primary" type="submit">
                  {status === "loading" ? "Signing in..." : "Sign in"}
                </button>
                {status === "error" ? <p className="premium-contact-form__error">{error}</p> : null}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
