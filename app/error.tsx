"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="premium-main">
      <section className="premium-section site-max site-px">
        <div className="premium-glass-card premium-error-card" role="alert">
          <p className="premium-eyebrow">Something went wrong</p>
          <h1 className="premium-title">We could not load this section</h1>
          <p className="premium-section__lede">
            Please try again. If the issue persists, contact MB Jewellers support.
          </p>
          <button type="button" className="premium-button premium-button--primary" onClick={reset}>
            Try again
          </button>
          {process.env.NODE_ENV !== "production" ? (
            <pre className="premium-error-card__debug">{error.message}</pre>
          ) : null}
        </div>
      </section>
    </main>
  );
}
