import { forwardRef } from "react";
import type { CSSProperties, ReactNode } from "react";

import type { RenderPlan } from "@/lib/note-render-engine";
import { PRODUCT_DOMAIN } from "@/lib/note-render-engine";

// ─── Brand tokens ─────────────────────────────────────────────────────────────

export const B = {
  parchment: "#f7f1e8",
  cream: "#fff9f2",
  kraft: "oklch(0.86 0.036 72)",
  kraftDark: "oklch(0.78 0.044 72)",
  kraftDeep: "oklch(0.72 0.048 72)",
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
      <span style={{ fontFamily: F.label, fontSize: "0.30rem", letterSpacing: "0.08em", textTransform: "uppercase", color: B.inkFaint, lineHeight: 1.2 }}>
        Read the full note and find more at
      </span>
      <span style={{ fontFamily: F.label, fontSize: "0.4rem", letterSpacing: "0.12em", color: B.inkMuted, lineHeight: 1 }}>
        {PRODUCT_DOMAIN}
      </span>
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

// ─── Adaptive font sizes ──────────────────────────────────────────────────────

// Takes full text so line count (not just char count) drives the size decision.
// Notes with many short \n-separated lines are visually denser than char count implies.
function squareFontSize(text: string): string {
  if (typeof text !== "string") return "0.72rem";
  const lines = text.split("\n").length;
  const len = text.length;
  if (lines > 14 || len > 420) return "0.60rem";
  if (lines > 10 || len > 300) return "0.72rem";
  if (lines > 7  || len > 180) return "0.82rem";
  if (lines > 4  || len > 100) return "0.92rem";
  return "1.05rem";
}

function portraitFontSize(text: string): string {
  if (typeof text !== "string") return "0.64rem";
  const lines = text.split("\n").length;
  const len = text.length;
  if (lines > 20 || len > 560) return "0.56rem";
  if (lines > 14 || len > 400) return "0.64rem";
  if (lines > 10 || len > 260) return "0.74rem";
  if (lines > 6  || len > 150) return "0.84rem";
  return "1.0rem";
}

function statusFontSize(text: string): string {
  if (typeof text !== "string") return "0.68rem";
  const lines = text.split("\n").length;
  const len = text.length;
  if (lines > 16 || len > 360) return "0.52rem";
  if (lines > 11 || len > 240) return "0.60rem";
  if (lines > 7  || len > 140) return "0.68rem";
  return "0.78rem";
}

// ─── Receipt rows (shared by both canvases) ───────────────────────────────────

function ReceiptRows({
  receiptFrom, receiptTo, receiptDate, receiptTotal,
  fontSize: fs,
}: {
  receiptFrom?: string; receiptTo?: string; receiptDate?: string; receiptTotal?: string;
  fontSize: string;
}) {
  const sep = <div style={{ borderTop: `1px dashed ${B.accentBorder}`, opacity: 0.5 }} />;
  const row = (label: string, value: string) => (
    <div style={{ display: "flex", gap: "1%" }}>
      <span style={{ fontFamily: F.label, fontSize: fs, letterSpacing: "0.08em", color: B.ink, flexShrink: 0, minWidth: "14%" }}>{label}</span>
      <span style={{ fontFamily: F.label, fontSize: fs, color: B.inkMuted, lineHeight: 1.3 }}>{value}</span>
    </div>
  );
  return (
    <>
      {receiptFrom && row("FROM:", receiptFrom)}
      {receiptTo && <>{sep}{row("TO:", receiptTo)}</>}
      {receiptDate && <>{sep}{row("DATE:", receiptDate)}</>}
      {receiptTotal && <>{sep}{row("TOTAL:", receiptTotal)}</>}
    </>
  );
}

// ─── D: Instagram Square — Envelope Card ─────────────────────────────────────
//
// Envelope aesthetic: kraft background, open top flap, inner parchment card,
// postmark stamp top-right, wax seal straddling card bottom edge.
//
//  Envelope zones (% of square)
//  ──────────────────────────────────────────────────────────────────
//  Top flap (kraft triangle)   0% → 20%   open flap pointing down
//  Inner card                  18% → 86%  parchment, inset 7% sides
//    ├─ Card header             0% → 13%  of card
//    ├─ V-crease               13% → 16%  of card
//    ├─ Category               16% → 23%  of card
//    ├─ Note text              23% → 68%† of card
//    ├─ Receipt                68% → 88%† of card (only if showReceipt)
//    └─ Footer                 88% → 100% of card
//  Wax seal                    centered, straddling card bottom edge
//  Postmark                    top-right, stamped on top of card corner

export const InstagramSquareCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function InstagramSquareCanvas({ renderPlan }, ref) {
    const {
      mainText: rawText, categoryLabel,
      showReceipt, receiptFrom, receiptTo, receiptDate, receiptTotal,
    } = renderPlan;

    const mainText = typeof rawText === "string" ? rawText : "";
    const fontSize = squareFontSize(mainText);
    const paragraphs = mainText.split("\n\n");

    return (
      <CanvasShell ref={ref} cssRatio="1/1" maxWidth={336} bg={B.kraft}>

        {/* ── Open envelope top flap ─────────────────────────────── */}
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "20%", display: "block" }}
          aria-hidden="true"
        >
          <polygon points="0,0 100,0 50,20" fill={B.kraftDark} />
          <polyline points="1,0 50,19 99,0" fill="none" stroke={B.kraftDeep} strokeWidth="0.8" opacity="0.7" />
        </svg>

        {/* ── Bottom envelope corners ────────────────────────────── */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          aria-hidden="true"
        >
          <polygon points="0,100 50,72 100,100" fill={B.kraftDark} />
          <polyline points="1,100 50,73 99,100" fill="none" stroke={B.kraftDeep} strokeWidth="0.5" opacity="0.5" />
        </svg>

        {/* ── Inner parchment card ───────────────────────────────── */}
        <div style={{
          position: "absolute",
          top: "14%",
          left: "6%", right: "6%",
          bottom: "11%",
          background: B.parchment,
          borderRadius: "3px",
          boxShadow: "0 4px 20px oklch(0.25 0.03 55 / 0.3), 0 1px 5px oklch(0.25 0.03 55 / 0.14)",
          overflow: "hidden",
        }}>

          {/* Card header */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "13%",
            background: B.kraft,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
          }}>
            <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
            <span style={{ fontFamily: F.label, fontSize: "0.43rem", letterSpacing: "0.2em", textTransform: "uppercase", color: B.ink }}>
              The Note You Needed Today
            </span>
            <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
          </div>

          {/* V-crease */}
          <svg
            viewBox="0 0 200 9"
            preserveAspectRatio="none"
            style={{ position: "absolute", top: "13%", left: 0, width: "100%", height: "3%", background: B.kraft }}
            aria-hidden="true"
          >
            <polygon points="0,9 100,0 200,9" fill={B.parchment} />
            <polyline points="0,9 100,0 200,9" fill="none" stroke={B.inkFaint} strokeWidth="0.5" opacity="0.35" />
          </svg>

          {/* Category */}
          <div style={{
            position: "absolute", top: "16%", left: "6%", right: "6%", height: "7%",
            display: "flex", alignItems: "center",
          }}>
            <span style={{ fontFamily: F.label, fontSize: "0.33rem", letterSpacing: "0.14em", textTransform: "uppercase", color: B.inkMuted }}>
              {categoryLabel}
            </span>
          </div>

          {/* Note text */}
          <div style={{
            position: "absolute",
            top: "21%",
            left: "6%", right: "6%",
            bottom: showReceipt ? "29%" : "11%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
          }}>
            {paragraphs.map((para, i) => (
              <p key={i} style={{
                fontFamily: F.note,
                fontSize,
                lineHeight: 1.28,
                color: B.ink,
                whiteSpace: "pre-line",
                margin: 0,
                marginBottom: i < paragraphs.length - 1 ? "0.35em" : 0,
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Receipt */}
          {showReceipt && (
            <div style={{
              position: "absolute",
              bottom: "11%",
              left: "4%", right: "4%",
              height: "18%",
              border: `1px dashed ${B.accentBorder}`,
              borderRadius: "3px",
              padding: "1.2% 2.5%",
              background: B.receiptBg,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1%",
            }}>
              <ReceiptRows
                receiptFrom={receiptFrom} receiptTo={receiptTo}
                receiptDate={receiptDate} receiptTotal={receiptTotal}
                fontSize="0.29rem"
              />
            </div>
          )}

          {/* Card footer */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0, height: "12%",
            borderTop: `1px solid ${B.accentBorder}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 5%",
            background: B.parchment,
          }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>

        {/* ── Postmark stamp (rendered after card, sits on top) ─── */}
        <svg
          viewBox="0 0 80 80"
          style={{
            position: "absolute", top: "6%", right: "3%",
            width: "21%", height: "21%",
            opacity: 0.62,
            transform: "rotate(-10deg)",
          }}
          aria-hidden="true"
        >
          <circle cx="40" cy="40" r="38" fill="oklch(0.94 0.018 75)" />
          <circle cx="40" cy="40" r="38" fill="none" stroke="oklch(0.38 0.05 55)" strokeWidth="2.5" />
          <circle cx="40" cy="40" r="27" fill="none" stroke="oklch(0.38 0.05 55)" strokeWidth="1" />
          <line x1="9" y1="34" x2="71" y2="34" stroke="oklch(0.38 0.05 55)" strokeWidth="1.5" />
          <line x1="9" y1="40" x2="71" y2="40" stroke="oklch(0.38 0.05 55)" strokeWidth="1.5" />
          <line x1="9" y1="46" x2="71" y2="46" stroke="oklch(0.38 0.05 55)" strokeWidth="1.5" />
          <text x="40" y="27" textAnchor="middle" fontFamily="var(--font-label)" fontSize="5.5" letterSpacing="1" fill="oklch(0.38 0.05 55)">THE NOTE</text>
          <text x="40" y="57" textAnchor="middle" fontFamily="var(--font-label)" fontSize="5.5" letterSpacing="1" fill="oklch(0.38 0.05 55)">TODAY</text>
        </svg>

        {/* ── Wax seal (straddling card bottom edge) ────────────── */}
        <div style={{
          position: "absolute",
          bottom: "11%",
          left: "50%",
          transform: "translateX(-50%) translateY(50%)",
          width: "11%",
          aspectRatio: "1/1",
          background: B.accent,
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 10px oklch(0.25 0.03 55 / 0.45)",
          border: `1.5px solid oklch(0.55 0.1 52)`,
        }}>
          <HeartSVG style={{ width: "52%", height: "52%", color: "oklch(0.92 0.015 75)" }} />
        </div>

      </CanvasShell>
    );
  },
);

// ─── E: Portrait Card (4:5) — Full Note Format ───────────────────────────────
//
// Taller envelope aesthetic — fits the full note text (~380 chars) with receipt.
// Same brand language as square: open flap, postmark, inner card, wax seal.
//
//  Portrait card zones (% of 4:5 height)
//  ──────────────────────────────────────────────────────────────────
//  Top flap                    0% → 15%   open flap
//  Inner card                  13% → 88%  parchment, inset 6% sides
//    ├─ Card header             0% → 10%  of card
//    ├─ V-crease               10% → 12%  of card
//    ├─ Category               12% → 18%  of card
//    ├─ Note text              18% → 72%† of card
//    ├─ Receipt                72% → 90%† of card (only if showReceipt)
//    └─ Footer                 90% → 100% of card
//  Wax seal                    centered, straddling card bottom
//  Postmark                    top-right

export const PortraitEnvelopeCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function PortraitEnvelopeCanvas({ renderPlan }, ref) {
    const {
      mainText: rawText, categoryLabel,
      showReceipt, receiptFrom, receiptTo, receiptDate, receiptTotal,
    } = renderPlan;

    const mainText = typeof rawText === "string" ? rawText : "";
    const fontSize = portraitFontSize(mainText);
    const paragraphs = mainText.split("\n\n");

    return (
      <CanvasShell ref={ref} cssRatio="4/5" maxWidth={336} bg={B.kraft}>

        {/* ── Open top flap ──────────────────────────────────────── */}
        <svg
          viewBox="0 0 100 15"
          preserveAspectRatio="none"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "15%", display: "block" }}
          aria-hidden="true"
        >
          <polygon points="0,0 100,0 50,15" fill={B.kraftDark} />
          <polyline points="1,0 50,14 99,0" fill="none" stroke={B.kraftDeep} strokeWidth="0.8" opacity="0.7" />
        </svg>

        {/* ── Bottom envelope corners ────────────────────────────── */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          aria-hidden="true"
        >
          <polygon points="0,100 50,80 100,100" fill={B.kraftDark} />
          <polyline points="1,100 50,81 99,100" fill="none" stroke={B.kraftDeep} strokeWidth="0.5" opacity="0.5" />
        </svg>

        {/* ── Inner parchment card ───────────────────────────────── */}
        <div style={{
          position: "absolute",
          top: "13%",
          left: "6%", right: "6%",
          bottom: "13%",
          background: B.parchment,
          borderRadius: "3px",
          boxShadow: "0 4px 20px oklch(0.25 0.03 55 / 0.3), 0 1px 5px oklch(0.25 0.03 55 / 0.14)",
          overflow: "hidden",
        }}>

          {/* Card header */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "10%",
            background: B.kraft,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
          }}>
            <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
            <span style={{ fontFamily: F.label, fontSize: "0.43rem", letterSpacing: "0.2em", textTransform: "uppercase", color: B.ink }}>
              The Note You Needed Today
            </span>
            <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
          </div>

          {/* V-crease */}
          <svg
            viewBox="0 0 200 9"
            preserveAspectRatio="none"
            style={{ position: "absolute", top: "10%", left: 0, width: "100%", height: "2.5%", background: B.kraft }}
            aria-hidden="true"
          >
            <polygon points="0,9 100,0 200,9" fill={B.parchment} />
            <polyline points="0,9 100,0 200,9" fill="none" stroke={B.inkFaint} strokeWidth="0.5" opacity="0.35" />
          </svg>

          {/* Category */}
          <div style={{
            position: "absolute", top: "12.5%", left: "5%", right: "5%", height: "5.5%",
            display: "flex", alignItems: "center",
          }}>
            <span style={{ fontFamily: F.label, fontSize: "0.33rem", letterSpacing: "0.14em", textTransform: "uppercase", color: B.inkMuted }}>
              {categoryLabel}
            </span>
          </div>

          {/* Note text — flex-start so text always starts from top and clips gracefully */}
          <div style={{
            position: "absolute",
            top: "18%",
            left: "5%", right: "5%",
            bottom: showReceipt ? "27%" : "9%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            overflow: "hidden",
          }}>
            {paragraphs.map((para, i) => (
              <p key={i} style={{
                fontFamily: F.note,
                fontSize,
                lineHeight: 1.32,
                color: B.ink,
                whiteSpace: "pre-line",
                margin: 0,
                marginBottom: i < paragraphs.length - 1 ? "0.4em" : 0,
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Receipt */}
          {showReceipt && (
            <div style={{
              position: "absolute",
              bottom: "9%",
              left: "4%", right: "4%",
              height: "18%",
              border: `1px dashed ${B.accentBorder}`,
              borderRadius: "3px",
              padding: "1.2% 2.5%",
              background: B.receiptBg,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1%",
            }}>
              <ReceiptRows
                receiptFrom={receiptFrom} receiptTo={receiptTo}
                receiptDate={receiptDate} receiptTotal={receiptTotal}
                fontSize="0.30rem"
              />
            </div>
          )}

          {/* Card footer */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0, height: "9%",
            borderTop: `1px solid ${B.accentBorder}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 5%",
            background: B.parchment,
          }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>

        {/* ── Postmark stamp ────────────────────────────────────── */}
        <svg
          viewBox="0 0 80 80"
          style={{
            position: "absolute", top: "4%", right: "3%",
            width: "17%", height: "17%",
            opacity: 0.62,
            transform: "rotate(-10deg)",
          }}
          aria-hidden="true"
        >
          <circle cx="40" cy="40" r="38" fill="oklch(0.94 0.018 75)" />
          <circle cx="40" cy="40" r="38" fill="none" stroke="oklch(0.38 0.05 55)" strokeWidth="2.5" />
          <circle cx="40" cy="40" r="27" fill="none" stroke="oklch(0.38 0.05 55)" strokeWidth="1" />
          <line x1="9" y1="34" x2="71" y2="34" stroke="oklch(0.38 0.05 55)" strokeWidth="1.5" />
          <line x1="9" y1="40" x2="71" y2="40" stroke="oklch(0.38 0.05 55)" strokeWidth="1.5" />
          <line x1="9" y1="46" x2="71" y2="46" stroke="oklch(0.38 0.05 55)" strokeWidth="1.5" />
          <text x="40" y="27" textAnchor="middle" fontFamily="var(--font-label)" fontSize="5.5" letterSpacing="1" fill="oklch(0.38 0.05 55)">THE NOTE</text>
          <text x="40" y="57" textAnchor="middle" fontFamily="var(--font-label)" fontSize="5.5" letterSpacing="1" fill="oklch(0.38 0.05 55)">TODAY</text>
        </svg>

        {/* ── Wax seal ──────────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          bottom: "13%",
          left: "50%",
          transform: "translateX(-50%) translateY(50%)",
          width: "9%",
          aspectRatio: "1/1",
          background: B.accent,
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 10px oklch(0.25 0.03 55 / 0.45)",
          border: `1.5px solid oklch(0.55 0.1 52)`,
        }}>
          <HeartSVG style={{ width: "52%", height: "52%", color: "oklch(0.92 0.015 75)" }} />
        </div>

      </CanvasShell>
    );
  },
);

// ─── B: WhatsApp Status — 9:16 Vertical Card ─────────────────────────────────
//
// Vertical envelope aesthetic for WhatsApp Status and Instagram Story.
// Uses excerpt only — no receipt (keeps the card clean for a status post).
//
//  Canvas zones (% of 9:16 height)
//  ──────────────────────────────────────────────────────────────────
//  Header strip             0% → 8%    kraft, brand name + hearts
//  V-crease                 8% → 10%   fold detail
//  Inner parchment card    10% → 93%   note content
//    ├─ Category label       3% → 8%   of card
//    ├─ Title                8% → 27%  of card (display font)
//    ├─ Separator line      27% → 27%
//    ├─ Note text           29% → 89%  of card
//    └─ Footer              89% → 100% of card (domain + MAD)
//  Bottom kraft strip      93% → 100%

export const WhatsAppStatusCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function WhatsAppStatusCanvas({ renderPlan }, ref) {
    const { mainText: rawText, title, categoryLabel } = renderPlan;
    const mainText = typeof rawText === "string" ? rawText : "";
    const paragraphs = mainText.split("\n\n").filter(Boolean);
    const fontSize = statusFontSize(mainText);

    return (
      <CanvasShell ref={ref} cssRatio="9/16" maxWidth={272} bg={B.kraft}>

        {/* ── Subtle paper texture ───────────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 50% at 30% 35%, rgba(255,248,225,0.14) 0%, transparent 70%)",
        }} />

        {/* ── Kraft header strip ─────────────────────────────────── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "8%",
          background: `linear-gradient(180deg, ${B.kraftDark} 0%, ${B.kraft} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.38rem",
          boxShadow: "0 2px 8px oklch(0.28 0.03 55 / 0.18)",
        }}>
          <div style={{ position: "absolute", inset: "3px 5px", border: `1px dashed ${B.accentBorder}`, borderRadius: "1.5px", opacity: 0.6, pointerEvents: "none" }} />
          <HeartSVG style={{ width: 7, height: 7, color: B.accent }} />
          <span style={{ fontFamily: F.label, fontSize: "0.38rem", letterSpacing: "0.22em", textTransform: "uppercase", color: B.ink }}>
            The Note You Needed Today
          </span>
          <HeartSVG style={{ width: 7, height: 7, color: B.accent }} />
        </div>

        {/* ── V-crease fold ──────────────────────────────────────── */}
        <svg
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          style={{ position: "absolute", top: "8%", left: 0, width: "100%", height: "2%", background: `linear-gradient(180deg, ${B.kraftDark} 0%, ${B.kraft} 100%)` }}
          aria-hidden="true"
        >
          <polygon points="0,10 50,0 100,10" fill={B.parchment} />
          <polyline points="0,10 50,0 100,10" fill="none" stroke={B.inkFaint} strokeWidth="0.5" opacity="0.35" />
        </svg>

        {/* ── Inner parchment card ───────────────────────────────── */}
        <div style={{
          position: "absolute",
          top: "10%", left: "5%", right: "5%", bottom: "7%",
          background: B.parchment,
          borderRadius: "3px",
          boxShadow: "0 4px 20px oklch(0.25 0.03 55 / 0.28), 0 1px 5px oklch(0.25 0.03 55 / 0.14)",
          overflow: "hidden",
        }}>

          {/* Category */}
          <div style={{
            position: "absolute", top: "3%", left: "6%", right: "6%", height: "5%",
            display: "flex", alignItems: "center",
          }}>
            <span style={{ fontFamily: F.label, fontSize: "0.32rem", letterSpacing: "0.14em", textTransform: "uppercase", color: B.inkMuted }}>
              {categoryLabel}
            </span>
          </div>

          {/* Title */}
          <div style={{
            position: "absolute", top: "8%", left: "6%", right: "6%", height: "19%",
            display: "flex", alignItems: "flex-start",
            overflow: "hidden",
          }}>
            <span style={{
              fontFamily: F.display, fontSize: "0.88rem", lineHeight: 1.08, color: B.ink,
              display: "block",
            }}>
              {title}
            </span>
          </div>

          {/* Separator */}
          <div style={{
            position: "absolute", top: "28%", left: "6%", right: "6%",
            borderTop: `1px solid ${B.accentBorder}`, opacity: 0.65,
          }} />

          {/* Note text */}
          <div style={{
            position: "absolute", top: "30%", left: "6%", right: "6%", bottom: "11%",
            display: "flex", flexDirection: "column", justifyContent: "flex-start",
            overflow: "hidden",
          }}>
            {paragraphs.map((para, i) => (
              <p key={i} style={{
                fontFamily: F.note,
                fontSize,
                lineHeight: 1.35,
                color: B.ink,
                whiteSpace: "pre-line",
                margin: 0,
                marginBottom: i < paragraphs.length - 1 ? "0.5em" : 0,
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Card footer */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0, height: "11%",
            borderTop: `1px solid ${B.accentBorder}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 5%",
            background: B.parchment,
          }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>

        {/* ── Postmark stamp ────────────────────────────────────── */}
        <svg
          viewBox="0 0 80 80"
          style={{
            position: "absolute", top: "3%", right: "3%",
            width: "15%", height: "8%",
            opacity: 0.6,
            transform: "rotate(-10deg)",
          }}
          aria-hidden="true"
        >
          <circle cx="40" cy="40" r="38" fill="oklch(0.94 0.018 75)" />
          <circle cx="40" cy="40" r="38" fill="none" stroke="oklch(0.38 0.05 55)" strokeWidth="2.5" />
          <circle cx="40" cy="40" r="27" fill="none" stroke="oklch(0.38 0.05 55)" strokeWidth="1" />
          <line x1="9" y1="34" x2="71" y2="34" stroke="oklch(0.38 0.05 55)" strokeWidth="1.5" />
          <line x1="9" y1="40" x2="71" y2="40" stroke="oklch(0.38 0.05 55)" strokeWidth="1.5" />
          <line x1="9" y1="46" x2="71" y2="46" stroke="oklch(0.38 0.05 55)" strokeWidth="1.5" />
          <text x="40" y="27" textAnchor="middle" fontFamily="var(--font-label)" fontSize="5.5" letterSpacing="1" fill="oklch(0.38 0.05 55)">THE NOTE</text>
          <text x="40" y="57" textAnchor="middle" fontFamily="var(--font-label)" fontSize="5.5" letterSpacing="1" fill="oklch(0.38 0.05 55)">TODAY</text>
        </svg>

        {/* ── Bottom kraft strip ─────────────────────────────────── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "7%",
          background: `linear-gradient(0deg, ${B.kraftDark} 0%, ${B.kraft} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: F.label, fontSize: "0.3rem", letterSpacing: "0.13em", color: B.inkMuted }}>
            thenoteyouneeded.today
          </span>
        </div>

      </CanvasShell>
    );
  },
);

// ─── Coming Soon stubs — C, E, F are paused pending approval ─────────────────

function ComingSoonCanvas({
  cssRatio, maxWidth, label, ratio,
}: { cssRatio: string; maxWidth: number; label: string; ratio?: string }) {
  return (
    <CanvasShell cssRatio={cssRatio} maxWidth={maxWidth}>
      <div style={{ position: "absolute", inset: 0, background: B.parchment, display: "flex", flexDirection: "column" }}>
        <div style={{ background: B.kraft, padding: "0.65rem 0.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", flexShrink: 0 }}>
          <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
          <span style={{ fontFamily: F.label, fontSize: "0.46rem", letterSpacing: "0.2em", textTransform: "uppercase", color: B.ink }}>
            The Note You Needed Today
          </span>
          <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
          <span style={{ fontFamily: F.label, fontSize: "0.5rem", letterSpacing: "0.16em", textTransform: "uppercase", color: B.inkMuted }}>
            {label}
          </span>
          {ratio && (
            <span style={{ fontFamily: F.label, fontSize: "0.38rem", color: B.inkFaint, letterSpacing: "0.1em" }}>
              {ratio}
            </span>
          )}
          <span style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.18em", textTransform: "uppercase", color: B.inkFaint, border: `1px dashed ${B.accentBorder}`, padding: "0.2rem 0.6rem", borderRadius: "999px" }}>
            Coming Soon
          </span>
        </div>
        <div style={{ padding: "0.4rem 0.8rem 0.5rem", borderTop: `1px solid ${B.accentBorder}`, display: "flex", justifyContent: "space-between", flexShrink: 0 }}>
          <CtaDomain />
          <MadMark />
        </div>
      </div>
    </CanvasShell>
  );
}

export const InstagramStoryCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function InstagramStoryCanvas(_props, ref) {
    return (
      <div ref={ref} style={{ width: "100%", maxWidth: 272, aspectRatio: "9/16" }}>
        <ComingSoonCanvas cssRatio="9/16" maxWidth={272} label="Instagram Story" ratio="9:16" />
      </div>
    );
  },
);

export const LinkedInPortraitCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function LinkedInPortraitCanvas(_props, ref) {
    return (
      <div ref={ref} style={{ width: "100%", maxWidth: 304, aspectRatio: "4/5" }}>
        <ComingSoonCanvas cssRatio="4/5" maxWidth={304} label="LinkedIn Portrait" ratio="4:5" />
      </div>
    );
  },
);

export const PinterestPinCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function PinterestPinCanvas(_props, ref) {
    return (
      <div ref={ref} style={{ width: "100%", maxWidth: 256, aspectRatio: "2/3" }}>
        <ComingSoonCanvas cssRatio="2/3" maxWidth={256} label="Pinterest Pin" ratio="2:3" />
      </div>
    );
  },
);
