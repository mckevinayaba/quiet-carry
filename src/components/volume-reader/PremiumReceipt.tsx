interface PremiumReceiptProps {
  from: string;
  to: string;
  date: string;
  total: string;
  keepText?: string;
  isQuietAnger?: boolean;
  isClosing?: boolean;
}

export function PremiumReceipt({
  from,
  to,
  date,
  total,
  keepText = "Keep this.",
  isQuietAnger,
  isClosing,
}: PremiumReceiptProps) {
  return (
    <div
      style={{
        background: isQuietAnger
          ? "color-mix(in oklab, var(--vr-accent, #C4A882) 14%, var(--vr-bg, #FAF6F1))"
          : "color-mix(in oklab, var(--vr-accent, #C4A882) 8%, var(--vr-bg, #FAF6F1))",
        borderTop: "2px dashed var(--vr-accent, #C4A882)",
        padding: "20px 24px 20px",
      }}
    >
      {/* Stamp header */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "ui-monospace, 'Lora', Georgia, serif",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--vr-muted, #9C8478)",
          marginBottom: "12px",
        }}
      >
        The Note You Needed Today
      </div>

      <hr style={{ borderColor: "var(--vr-divider, #E8DDD4)", marginBottom: "16px" }} />

      {/* FROM / TO / DATE fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        <ReceiptField label="FROM" value={from} />
        <ReceiptField label="TO" value={to} />
        <ReceiptField label="DATE" value={date} />
      </div>

      <hr style={{ borderColor: "var(--vr-divider, #E8DDD4)", margin: "14px 0" }} />

      {/* TOTAL — the punchline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <span
          style={{
            fontFamily: "ui-monospace, 'Lora', Georgia, serif",
            fontSize: "10px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--vr-muted, #9C8478)",
          }}
        >
          TOTAL
        </span>
        <p
          style={{
            fontFamily: "var(--vr-display, 'Playfair Display', serif)",
            fontSize: isClosing ? "1.65rem" : "1.1rem",
            fontWeight: 500,
            lineHeight: 1.45,
            color: "var(--vr-text, #3D2B1F)",
            margin: 0,
          }}
        >
          {total}
        </p>
      </div>

      {/* Footer row: "Keep this." + wax seal */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "14px",
          paddingTop: "12px",
          borderTop: "1px solid var(--vr-divider, #E8DDD4)",
        }}
      >
        <span
          style={{
            fontFamily: "ui-monospace, 'Lora', Georgia, serif",
            fontSize: "11px",
            letterSpacing: "0.06em",
            color: "var(--vr-muted, #9C8478)",
          }}
        >
          {keepText}
        </span>

        {/* CSS wax seal — MAD monogram */}
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "var(--vr-accent, #C4A882)",
            opacity: 0.5,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--vr-display, 'Playfair Display', serif)",
              fontSize: "11px",
              fontStyle: "italic",
              color: "var(--vr-text, #3D2B1F)",
              lineHeight: 1,
            }}
          >
            M
          </span>
        </span>
      </div>
    </div>
  );
}

function ReceiptField({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3px",
        padding: "10px 0",
        borderBottom: "1px solid var(--vr-divider, #E8DDD4)",
      }}
    >
      <span
        style={{
          fontFamily: "ui-monospace, 'Lora', Georgia, serif",
          fontSize: "10px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--vr-muted, #9C8478)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--vr-display, 'Playfair Display', serif)",
          fontSize: "1rem",
          lineHeight: 1.55,
          color: "var(--vr-text, #3D2B1F)",
        }}
      >
        {value}
      </span>
    </div>
  );
}
