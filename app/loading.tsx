export default function Loading() {
  return (
    <main className="premium-main">
      <section className="premium-section site-max site-px">
        <div className="premium-glass-card premium-skeleton-card" aria-busy="true" aria-live="polite">
          <p className="premium-eyebrow">Loading</p>
          <div className="premium-skeleton-line" />
          <div className="premium-skeleton-line short" />
          <div className="premium-skeleton-line" />
        </div>
      </section>
    </main>
  );
}
