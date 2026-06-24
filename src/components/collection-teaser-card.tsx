import { Link } from "@tanstack/react-router";

export interface CollectionTeaser {
  id: string;
  title: string;
  tagline: string;
  teasers: string[];
}

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function CollectionTeaserCard({ teaser }: { teaser: CollectionTeaser }) {
  return (
    <div
      style={{
        position: "relative",
        background: "#FAF6F1",
        border: "1px solid #E8DDD4",
        borderRadius: "12px",
        padding: "36px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: NOISE_BG,
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <span
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "11px",
            fontVariant: "small-caps",
            letterSpacing: "0.12em",
            color: "#9C8478",
          }}
        >
          Writing in progress
        </span>

        <h3
          style={{
            marginTop: "12px",
            fontFamily: "'Playfair Display', serif",
            fontSize: "28px",
            fontWeight: 500,
            lineHeight: 1.15,
            color: "#2C2420",
          }}
        >
          {teaser.title}
        </h3>

        <p
          style={{
            marginTop: "6px",
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "16px",
            fontStyle: "italic",
            color: "#8B7355",
          }}
        >
          {teaser.tagline}
        </p>

        <ul style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "6px" }}>
          {teaser.teasers.map((line) => (
            <li
              key={line}
              style={{
                display: "flex",
                gap: "8px",
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "15px",
                lineHeight: 1.9,
                color: "#6B5744",
              }}
            >
              <span aria-hidden>·</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/account"
          style={{
            display: "inline-flex",
            marginTop: "20px",
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "14px",
            color: "#8B6F5E",
            textDecoration: "none",
          }}
        >
          Be the first to know →
        </Link>
      </div>
    </div>
  );
}
