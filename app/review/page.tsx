import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Share your experience | MB Jewellers",
  description: "Share an honest Google review for MB Jewellers, Sikar.",
  path: "/review",
  // A redirect door to an external review tool, not content: keep it out of search results.
  noIndex: true,
});

const DEFAULT_LANDING = "https://reviewflow-ai-lime.vercel.app/r/mb-jewellers";

function safeLandingUrl(value: string | undefined): string | null {
  const raw = value?.trim() || DEFAULT_LANDING;
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== "https:") return null;
    if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) return null;
    if (!raw.includes("/r/")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export default function ReviewDoorPage() {
  const target = safeLandingUrl(process.env.REVIEWFLOW_LANDING_URL);
  if (target) {
    redirect(target);
  }

  return (
    <section className="mx-auto max-w-lg px-5 py-16 text-center">
      <h1 className="font-serif text-3xl">Your experience matters to us.</h1>
      <p className="mt-4 text-sm leading-relaxed">
        The review page is not configured yet. Ask the store team to connect the ReviewFlowAI landing address.
      </p>
    </section>
  );
}
