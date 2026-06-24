import { Link } from "@tanstack/react-router";

import { volumeOneSelarUrl } from "@/lib/note-data";
import { trackEvent } from "@/lib/analytics";

const LINE_ITEMS = [
  ["15 designed notes", "included"],
  ["15 mobile wallpapers", "included"],
  ["15 quiet captions", "included"],
  ["15 journal prompts", "included"],
  ["5 private letters", "included"],
  ["Opening letter from MAD", "included"],
  ["Safety & care page", "included"],
  ["Closing receipt page", "included"],
] as const;

export function Volume1FeaturedCard() {
  return (
    <div
      style={{
        background: "#2C2420",
        borderRadius: "16px",
        padding: "48px 32px",
        transition: "box-shadow 0.3s ease",
        boxShadow: "0 4px 20px rgba(44, 36, 32, 0.15)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 40px rgba(44, 36, 32, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(44, 36, 32, 0.15)";
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "11px",
          fontVariant: "small-caps",
          letterSpacing: "0.15em",
          color: "#C4A882",
        }}
      >
        <span aria-hidden>●</span> Now available · Volume 1
      </span>

      <h2
        style={{
          marginTop: "16px",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 5vw, 40px)",
          fontWeight: 500,
          lineHeight: 1.1,
          color: "#FAF6F1",
        }}
      >
        The Things We Do Not Say Out Loud
      </h2>

      <p
        style={{
          marginTop: "8px",
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "18px",
          fontStyle: "italic",
          color: "#C4A882",
        }}
      >
        The Note You Needed Today, Volume 1
      </p>

      <p
        style={{
          marginTop: "16px",
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "16px",
          lineHeight: 1.7,
          color: "#D4C5B0",
        }}
      >
        Fifteen notes. Five chapters. One private letter per chapter. Written for the things you
        carry that have no funeral.
      </p>

      <div style={{ borderTop: "1px dashed #5C4A3A", margin: "32px 0" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {LINE_ITEMS.map(([label, value]) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "baseline",
              fontFamily: "ui-monospace, 'Lora', Georgia, serif",
              fontSize: "13px",
              lineHeight: 2,
              color: "#C4A882",
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>{label}</span>
            <span
              aria-hidden
              style={{
                flex: 1,
                margin: "0 6px 4px",
                borderBottom: "1px dotted #5C4A3A",
              }}
            />
            <span style={{ whiteSpace: "nowrap" }}>{value}</span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px dashed #5C4A3A", margin: "32px 0" }} />

      <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "#FAF6F1",
          }}
        >
          R149
        </span>
        <span
          style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "14px",
            color: "#9C8478",
          }}
        >
          · $7–9 USD
        </span>
      </div>

      <div className="flex flex-col sm:flex-row" style={{ gap: "12px", marginTop: "24px" }}>
        <a
          href={volumeOneSelarUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("volume1_purchase_clicked", { source: "collections_card" })}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#8B6F5E",
            color: "#FAF6F1",
            borderRadius: "100px",
            padding: "12px 32px",
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "15px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Get Volume 1 →
        </a>
        <Link
          to="/volume-1/preview"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #8B6F5E",
            background: "transparent",
            color: "#C4A882",
            borderRadius: "100px",
            padding: "12px 32px",
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "15px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Read a chapter first →
        </Link>
      </div>

      <p
        style={{
          marginTop: "12px",
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "12px",
          fontStyle: "italic",
          color: "#9C8478",
        }}
      >
        One-time purchase. No subscription. Your access code arrives by email.
      </p>
    </div>
  );
}
