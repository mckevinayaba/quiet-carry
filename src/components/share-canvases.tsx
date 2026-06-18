import { forwardRef } from "react";
import type { CSSProperties, ReactNode } from "react";

import type { RenderPlan } from "@/lib/note-render-engine";
import { PRODUCT_DOMAIN } from "@/lib/note-render-engine";

// ─── Brand tokens ─────────────────────────────────────────────────────────────

export const B = {
  parchment: "#f7f1e8",
  cream: "#fff9f2",
  kraft: "oklch(0.86 0.036 72)",
  ink: "oklch(0.28 0.03 55)",
  inkMuted: "oklch(0.52 0.04 55)",
  inkFaint: "oklch(0.70 0.03 58)",
  accent: "oklch(0.48 0.1 50)",
  accentBorder: "oklch(0.68 0.08 52 / 0.32)",
  receiptBg: "oklch(0.97 0.012 75 / 0.55)",
} as const;

export const F = {
  display: "var(--font-display)",
  note: "var(--font-note)",
  label: "var(--font-label)",
} as const;

// ─── Adaptive font size ───────────────────────────────────────────────────────

function getNoteSize(length: number): string {
  if (length <= 120) return "1.08rem";
  if (length <= 200) return "0.94rem";
  if (length <= 300) return "0.82rem";
  if (length <= 420) return "0.72rem";
  return "0.62rem";
}

// ─── Shared atoms ─────────────────────────────────────────────────────────────

export function HeartSVG({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function MadMark() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <span style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.18em", textTransform: "uppercase", color: B.inkMuted, lineHeight: 1 }}>
        MAD
      </span>
      <HeartSVG style={{ width: 5, height: 5, color: B.accent }} />
    </div>
  );
}

export function CtaDomain() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <span style={{ fontFamily: F.label, fontSize: "0.36rem", letterSpacing: "0.1em", textTransform: "uppercase", color: B.inkFaint, lineHeight: 1 }}>
        Read the full note at
      </span>
      <span style={{ fontFamily: F.label, fontSize: "0.4rem", letterSpacing: "0.12em", color: B.inkMuted, lineHeight: 1 }}>
        {PRODUCT_DOMAIN}
      </span>
    </div>
  );
}

// ─── Brand header — identical across all presets ──────────────────────────────

function BrandHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{
      background: B.kraft,
      padding: compact ? "0.55rem 1rem" : "0.68rem 1rem 0.52rem",
      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
      flexShrink: 0,
    }}>
      <HeartSVG style={{ width: 9, height: 9, color: B.accent }} />
      <span style={{ fontFamily: F.label, fontSize: "0.48rem", letterSpacing: "0.22em", textTransform: "uppercase", color: B.ink }}>
        The Note You Needed Today
      </span>
      <HeartSVG style={{ width: 9, height: 9, color: B.accent }} />
    </div>
  );
}

// ─── V-fold envelope crease ───────────────────────────────────────────────────

function VCrease({ bg = B.parchment }: { bg?: string }) {
  return (
    <svg viewBox="0 0 200 9" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 9, background: B.kraft, flexShrink: 0 }} aria-hidden="true">
      <polygon points="0,9 100,0 200,9" fill={bg} />
      <polyline points="0,9 100,0 200,9" fill="none" stroke={B.inkFaint} strokeWidth="0.5" opacity="0.35" />
    </svg>
  );
}

// ─── Receipt block ────────────────────────────────────────────────────────────

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2.6rem 1fr", gap: "0.25rem", alignItems: "flex-start" }}>
      <span style={{ fontFamily: F.label, fontSize: "0.36rem", letterSpacing: "0.08em", color: B.ink, lineHeight: 1.45 }}>
        {label}
      </span>
      <span style={{ fontFamily: F.label, fontSize: "0.36rem", color: B.inkMuted, lineHeight: 1.45 }}>
        {value}
      </span>
    </div>
  );
}

function ReceiptBlock({ from, to, date, total }: { from?: string; to?: string; date?: string; total?: string }) {
  const rows = [
    { label: "FROM:", value: from },
    { label: "TO:", value: to },
    { label: "DATE:", value: date },
    { label: "TOTAL:", value: total },
  ].filter((r): r is { label: string; value: string } => Boolean(r.value));

  if (rows.length === 0) return null;

  return (
    <div style={{
      margin: "0 0.65rem 0.3rem",
      border: `1px dashed ${B.accentBorder}`,
      borderRadius: "3px",
      padding: "0.38rem 0.5rem",
      background: B.receiptBg,
      flexShrink: 0,
    }}>
      {rows.map((row, i) => (
        <div key={i}>
          {i > 0 && <div style={{ borderTop: `1px dashed ${B.accentBorder}`, margin: "0.22rem 0", opacity: 0.6 }} />}
          <ReceiptRow label={row.label} value={row.value} />
        </div>
      ))}
    </div>
  );
}

// ─── Canvas shell ─────────────────────────────────────────────────────────────

export const CanvasShell = forwardRef<
  HTMLDivElement,
  { cssRatio: string; maxWidth: number; children: ReactNode; bg?: CSSProperties["background"] }
>(function CanvasShell({ cssRatio, maxWidth, children, bg }, ref) {
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        maxWidth,
        aspectRatio: cssRatio,
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 6px 28px oklch(0.28 0.03 55 / 0.18), 0 1px 4px oklch(0.28 0.03 55 / 0.08)",
        background: bg ?? B.parchment,
      }}
    >
      {children}
    </div>
  );
});

// ─── Canvas components ────────────────────────────────────────────────────────
//
// Gold standard: InstagramSquareCanvas (D).
// All presets share: BrandHeader → VCrease → category → note text → receipt? → footer.
// Only aspect ratio, font scale, title visibility, and receipt eligibility differ.

// ── D: Instagram Square / Facebook Square (gold standard) ─────────────────────

export const InstagramSquareCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function InstagramSquareCanvas({ renderPlan }, ref) {
    const { mainText, categoryLabel, showReceipt, receiptFrom, receiptTo, receiptDate, receiptTotal } = renderPlan;
    const fontSize = getNoteSize(mainText.length);
    return (
      <CanvasShell ref={ref} cssRatio="1/1" maxWidth={336}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: B.parchment }}>
          <BrandHeader />
          <VCrease />
          <div style={{ padding: "0.42rem 1rem 0.12rem", flexShrink: 0 }}>
            <span style={{ fontFamily: F.label, fontSize: "0.4rem", letterSpacing: "0.14em", textTransform: "uppercase", color: B.inkMuted }}>
              {categoryLabel}
            </span>
          </div>
          <div style={{ flex: 1, padding: "0.12rem 1rem 0.32rem", minHeight: 0, display: "flex", alignItems: "center" }}>
            <p style={{ fontFamily: F.note, fontSize, lineHeight: 1.28, color: B.ink, whiteSpace: "pre-line" }}>
              {mainText}
            </p>
          </div>
          {showReceipt && (
            <ReceiptBlock from={receiptFrom} to={receiptTo} date={receiptDate} total={receiptTotal} />
          )}
          <div style={{ padding: "0.4rem 1rem 0.5rem", borderTop: `1px solid ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>
      </CanvasShell>
    );
  },
);

// ── B: WhatsApp Status ────────────────────────────────────────────────────────

export const WhatsAppStatusCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function WhatsAppStatusCanvas({ renderPlan }, ref) {
    const { mainText, categoryLabel } = renderPlan;
    const fontSize = getNoteSize(mainText.length);
    return (
      <CanvasShell ref={ref} cssRatio="9/16" maxWidth={272}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: B.parchment }}>
          <BrandHeader />
          <VCrease />
          <div style={{ padding: "0.55rem 1rem 0.2rem", flexShrink: 0 }}>
            <span style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.13em", textTransform: "uppercase", color: B.inkMuted }}>
              {categoryLabel}
            </span>
          </div>
          <div style={{ flex: 1, padding: "0.2rem 1rem 0.5rem", minHeight: 0, display: "flex", alignItems: "center" }}>
            <p style={{ fontFamily: F.note, fontSize, lineHeight: 1.3, color: B.ink, whiteSpace: "pre-line" }}>
              {mainText}
            </p>
          </div>
          <div style={{ padding: "0.5rem 1rem 0.65rem", borderTop: `1px solid ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>
      </CanvasShell>
    );
  },
);

// ── C: Instagram Story ────────────────────────────────────────────────────────

export const InstagramStoryCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function InstagramStoryCanvas({ renderPlan }, ref) {
    const { mainText, categoryLabel } = renderPlan;
    const fontSize = getNoteSize(mainText.length);
    return (
      <CanvasShell
        ref={ref}
        cssRatio="9/16"
        maxWidth={272}
        bg={`linear-gradient(170deg, ${B.cream} 0%, ${B.parchment} 55%, oklch(0.92 0.025 75) 100%)`}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
          <BrandHeader />
          <VCrease bg={B.cream} />
          <div style={{ padding: "0.6rem 1rem 0.2rem", flexShrink: 0 }}>
            <span style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.11em", textTransform: "uppercase", color: B.inkMuted, border: `1px dashed ${B.accentBorder}`, borderRadius: "999px", padding: "0.15rem 0.5rem" }}>
              {categoryLabel}
            </span>
          </div>
          <div style={{ flex: 1, padding: "0.3rem 1rem 0.5rem", minHeight: 0, display: "flex", alignItems: "center" }}>
            <p style={{ fontFamily: F.note, fontSize, lineHeight: 1.3, color: B.ink, whiteSpace: "pre-line" }}>
              {mainText}
            </p>
          </div>
          <div style={{ padding: "0.5rem 1rem 0.7rem", borderTop: `1px dashed ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>
      </CanvasShell>
    );
  },
);

// ── E: LinkedIn Portrait ──────────────────────────────────────────────────────

export const LinkedInPortraitCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function LinkedInPortraitCanvas({ renderPlan }, ref) {
    const { mainText, title, categoryLabel, showReceipt, receiptFrom, receiptTo, receiptDate, receiptTotal } = renderPlan;
    const fontSize = getNoteSize(mainText.length);
    return (
      <CanvasShell ref={ref} cssRatio="4/5" maxWidth={304} bg={B.cream}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
          <BrandHeader compact />
          <VCrease bg={B.cream} />
          <div style={{ flex: 1, padding: "0.6rem 1rem 0.3rem", display: "flex", flexDirection: "column", minHeight: 0 }}>
            <p style={{ fontFamily: F.display, fontSize: "0.92rem", lineHeight: 1.15, color: B.ink, marginBottom: "0.28rem", flexShrink: 0 }}>
              {title}
            </p>
            <p style={{ fontFamily: F.label, fontSize: "0.4rem", letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkMuted, marginBottom: "0.5rem", flexShrink: 0 }}>
              {categoryLabel}
            </p>
            <p style={{ fontFamily: F.note, fontSize, lineHeight: 1.3, color: B.ink, flex: 1, whiteSpace: "pre-line", minHeight: 0 }}>
              {mainText}
            </p>
          </div>
          {showReceipt && (
            <ReceiptBlock from={receiptFrom} to={receiptTo} date={receiptDate} total={receiptTotal} />
          )}
          <div style={{ padding: "0.4rem 1rem 0.5rem", borderTop: `1px solid ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>
      </CanvasShell>
    );
  },
);

// ── F: Pinterest Pin ──────────────────────────────────────────────────────────

export const PinterestPinCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function PinterestPinCanvas({ renderPlan }, ref) {
    const { mainText, title, categoryLabel, showReceipt, receiptFrom, receiptTo, receiptDate, receiptTotal } = renderPlan;
    const fontSize = getNoteSize(mainText.length);
    return (
      <CanvasShell
        ref={ref}
        cssRatio="2/3"
        maxWidth={256}
        bg={`linear-gradient(175deg, ${B.cream} 0%, ${B.parchment} 50%, oklch(0.94 0.022 76) 100%)`}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
          <BrandHeader />
          <VCrease bg={B.cream} />
          <div style={{ padding: "0.5rem 1rem 0.15rem", flexShrink: 0 }}>
            <span style={{ fontFamily: F.label, fontSize: "0.4rem", letterSpacing: "0.1em", textTransform: "uppercase", color: B.inkMuted, border: `1px dashed ${B.accentBorder}`, borderRadius: "999px", padding: "0.12rem 0.48rem" }}>
              {categoryLabel}
            </span>
          </div>
          <div style={{ padding: "0.15rem 1rem 0.25rem", flexShrink: 0 }}>
            <p style={{ fontFamily: F.display, fontSize: "0.88rem", lineHeight: 1.16, color: B.ink }}>
              {title}
            </p>
          </div>
          <div style={{ flex: 1, padding: "0 1rem 0.3rem", minHeight: 0 }}>
            <p style={{ fontFamily: F.note, fontSize, lineHeight: 1.28, color: B.ink, whiteSpace: "pre-line" }}>
              {mainText}
            </p>
          </div>
          {showReceipt && (
            <ReceiptBlock from={receiptFrom} to={receiptTo} date={receiptDate} total={receiptTotal} />
          )}
          <div style={{ padding: "0.45rem 1rem 0.6rem", borderTop: `1px dashed ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>
      </CanvasShell>
    );
  },
);
