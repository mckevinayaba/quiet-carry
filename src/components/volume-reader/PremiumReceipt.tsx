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
  const dashOpacity = isQuietAnger ? "30%" : "18%";

  return (
    <div
      style={{
        background: "var(--paper-gradient)",
        borderTop: `2px dashed color-mix(in oklab, var(--foreground) ${dashOpacity}, transparent)`,
        padding: "20px 24px 20px",
      }}
    >
      {/* Stamp header */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "var(--font-label)",
          fontSize: "9px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-muted-foreground)",
          opacity: 0.55,
          marginBottom: "12px",
        }}
      >
        The Note You Needed Today
      </div>

      <hr
        style={{
          borderColor: "color-mix(in oklab, var(--border) 55%, transparent)",
          marginBottom: "16px",
        }}
      />

      {/* FROM / TO / DATE fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        <ReceiptField label="FROM" value={from} />
        <ReceiptField label="TO" value={to} />
        <ReceiptField label="DATE" value={date} />
      </div>

      <hr
        style={{
          borderColor: "var(--color-border)",
          margin: "14px 0",
        }}
      />

      {/* TOTAL — the punchline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-muted-foreground)",
            opacity: 0.65,
          }}
        >
          TOTAL
        </span>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: isClosing ? "1.65rem" : "1.1rem",
            fontWeight: 500,
            lineHeight: 1.45,
            color: "var(--color-foreground)",
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
          borderTop: "1px solid color-mix(in oklab, var(--border) 45%, transparent)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "10px",
            letterSpacing: "0.08em",
            color: "var(--color-muted-foreground)",
            opacity: 0.55,
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
            background: "var(--primary)",
            opacity: 0.28,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "11px",
              fontStyle: "italic",
              color: "var(--color-foreground)",
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
        borderBottom: "1px solid color-mix(in oklab, var(--border) 38%, transparent)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-label)",
          fontSize: "9px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-muted-foreground)",
          opacity: 0.65,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          lineHeight: 1.55,
          color: "var(--color-foreground)",
        }}
      >
        {value}
      </span>
    </div>
  );
}
