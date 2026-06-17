"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf7f0",
          color: "#1a1510",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <p style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", color: "#9c7a32" }}>
            MB Jewellers
          </p>
          <h1 style={{ fontSize: "1.75rem", margin: "0.75rem 0" }}>Something went wrong</h1>
          <p style={{ maxWidth: 420, margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
            An unexpected error occurred. Please try again, or contact us if the issue persists.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              cursor: "pointer",
              border: "1px solid #c8a24d",
              background: "#c8a24d",
              color: "#fffdf8",
              borderRadius: "999px",
              padding: "0.75rem 2rem",
              fontSize: "0.95rem",
              letterSpacing: "0.08em",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
