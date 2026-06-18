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

// ─── Adaptive font size for the square card ───────────────────────────────────

function squareFontSize(length: number): string {
  if (length <= 100) return "1.05rem";
  if (length <= 180) return "0.92rem";
  if (length <= 300) return "0.82rem";
  if (length <= 420) return "0.70rem";
  return "0.60rem";
}

// ─── D: Instagram Square — GOLD STANDARD ─────────────────────────────────────
//
// Layout uses absolute-positioned safe zones so sections NEVER overlap.
//
//  Zone        top      height    note
//  ──────────  ───────  ────────  ──────────────────────────────────────────
//  Header      0%       13%       kraft brand strip
//  Crease      13%      2.5%      SVG V-fold
//  Category    15.5%    4.5%      category label
//  Text area   20%      57%†      note text, vertically centred
//  Receipt     77%      13%†      FROM / TO / TOTAL (hidden when not shown)
//  Footer      90%      10%       domain + MAD
//
// † When receipt is hidden the text area extends to 70% (20%→90%),
//   giving the note text generous breathing room.

export const InstagramSquareCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function InstagramSquareCanvas({ renderPlan }, ref) {
    const {
      mainText, categoryLabel,
      showReceipt, receiptFrom, receiptTo, receiptDate, receiptTotal,
    } = renderPlan;

    const fontSize = squareFontSize(mainText.length);
    // Split on double-newline so paragraph gaps render at 0.35em instead of a
    // full blank line, reducing visual height for notes with multiple stanzas.
    const paragraphs = mainText.split("\n\n");

    return (
      <CanvasShell ref={ref} cssRatio="1/1" maxWidth={336}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "13%",
          background: B.kraft,
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.45rem",
        }}>
          <HeartSVG style={{ width: 10, height: 10, color: B.accent }} />
          <span style={{ fontFamily: F.label, fontSize: "0.48rem", letterSpacing: "0.22em", textTransform: "uppercase", color: B.ink }}>
            The Note You Needed Today
          </span>
          <HeartSVG style={{ width: 10, height: 10, color: B.accent }} />
        </div>

        {/* ── V-fold crease ──────────────────────────────────────── */}
        <svg
          viewBox="0 0 200 9"
          preserveAspectRatio="none"
          style={{ position: "absolute", top: "13%", left: 0, right: 0, width: "100%", height: "2.5%", background: B.kraft }}
          aria-hidden="true"
        >
          <polygon points="0,9 100,0 200,9" fill={B.parchment} />
          <polyline points="0,9 100,0 200,9" fill="none" stroke={B.inkFaint} strokeWidth="0.5" opacity="0.35" />
        </svg>

        {/* ── Category ───────────────────────────────────────────── */}
        <div style={{
          position: "absolute", top: "15.5%", left: "6%", right: "6%", height: "4.5%",
          display: "flex", alignItems: "center",
        }}>
          <span style={{ fontFamily: F.label, fontSize: "0.38rem", letterSpacing: "0.14em", textTransform: "uppercase", color: B.inkMuted }}>
            {categoryLabel}
          </span>
        </div>

        {/* ── Note text ──────────────────────────────────────────── */}
        {/* overflow:hidden is a safety net — the engine pre-truncates mainText */}
        <div style={{
          position: "absolute",
          top: "20%",
          left: "6%", right: "6%",
          bottom: showReceipt ? "27%" : "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: F.note,
                fontSize,
                lineHeight: 1.28,
                color: B.ink,
                whiteSpace: "pre-line",
                margin: 0,
                marginBottom: i < paragraphs.length - 1 ? "0.35em" : 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* ── Receipt ────────────────────────────────────────────── */}
        {showReceipt && (
          <div style={{
            position: "absolute",
            bottom: "10%",
            left: "4%", right: "4%",
            height: "17%",
            border: `1px dashed ${B.accentBorder}`,
            borderRadius: "3px",
            padding: "1% 2.5%",
            background: B.receiptBg,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.2%",
          }}>
            {receiptFrom && (
              <div style={{ display: "flex", gap: "1%" }}>
                <span style={{ fontFamily: F.label, fontSize: "0.34rem", letterSpacing: "0.08em", color: B.ink, flexShrink: 0, minWidth: "12%" }}>FROM:</span>
                <span style={{ fontFamily: F.label, fontSize: "0.34rem", color: B.inkMuted, lineHeight: 1.35 }}>{receiptFrom}</span>
              </div>
            )}
            {receiptTo && (
              <>
                <div style={{ borderTop: `1px dashed ${B.accentBorder}`, opacity: 0.5 }} />
                <div style={{ display: "flex", gap: "1%" }}>
                  <span style={{ fontFamily: F.label, fontSize: "0.34rem", letterSpacing: "0.08em", color: B.ink, flexShrink: 0, minWidth: "12%" }}>TO:</span>
                  <span style={{ fontFamily: F.label, fontSize: "0.34rem", color: B.inkMuted, lineHeight: 1.35 }}>{receiptTo}</span>
                </div>
              </>
            )}
            {receiptDate && (
              <>
                <div style={{ borderTop: `1px dashed ${B.accentBorder}`, opacity: 0.5 }} />
                <div style={{ display: "flex", gap: "1%" }}>
                  <span style={{ fontFamily: F.label, fontSize: "0.34rem", letterSpacing: "0.08em", color: B.ink, flexShrink: 0, minWidth: "12%" }}>DATE:</span>
                  <span style={{ fontFamily: F.label, fontSize: "0.34rem", color: B.inkMuted, lineHeight: 1.35 }}>{receiptDate}</span>
                </div>
              </>
            )}
            {receiptTotal && (
              <>
                <div style={{ borderTop: `1px dashed ${B.accentBorder}`, opacity: 0.5 }} />
                <div style={{ display: "flex", gap: "1%" }}>
                  <span style={{ fontFamily: F.label, fontSize: "0.34rem", letterSpacing: "0.08em", color: B.ink, flexShrink: 0, minWidth: "12%" }}>TOTAL:</span>
                  <span style={{ fontFamily: F.label, fontSize: "0.34rem", color: B.inkMuted, lineHeight: 1.35 }}>{receiptTotal}</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "10%",
          borderTop: `1px solid ${B.accentBorder}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 6%",
          background: B.parchment,
        }}>
          <CtaDomain />
          <MadMark />
        </div>

      </CanvasShell>
    );
  },
);

// ─── Coming Soon stubs — B, C, E, F are paused pending square approval ────────

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

export const WhatsAppStatusCanvas = forwardRef<HTMLDivElement, { renderPlan: RenderPlan }>(
  function WhatsAppStatusCanvas(_props, ref) {
    return (
      <div ref={ref} style={{ width: "100%", maxWidth: 272, aspectRatio: "9/16" }}>
        <ComingSoonCanvas cssRatio="9/16" maxWidth={272} label="WhatsApp Status" ratio="9:16" />
      </div>
    );
  },
);

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
