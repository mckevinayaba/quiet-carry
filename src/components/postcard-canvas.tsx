/**
 * Full Note Postcard Spread
 *
 * Landscape canvas: 720×450 DOM → 2160×1350 PNG (pixelRatio 3).
 * Two-panel letter spread on an open envelope base.
 * Design approval prototype — not wired into existing share flow.
 */

import { forwardRef } from "react";
import type { CSSProperties, ReactNode } from "react";

// ─── Brand tokens (local copy so this component is self-contained) ────────────

const B = {
  parchment: "#f7f1e8",
  parchmentDark: "#ede4d4",
  cream: "#fff9f2",
  kraft: "oklch(0.86 0.036 72)",
  kraftDark: "oklch(0.78 0.044 72)",
  kraftDeep: "oklch(0.68 0.048 72)",
  ink: "oklch(0.28 0.03 55)",
  inkMuted: "oklch(0.52 0.04 55)",
  inkFaint: "oklch(0.70 0.03 58)",
  accent: "oklch(0.48 0.1 50)",
  accentBorder: "oklch(0.68 0.08 52 / 0.32)",
  receiptBg: "oklch(0.97 0.012 75 / 0.60)",
  navy: "#1a2d4a",
  navyLight: "#243b5e",
  rust: "#7a3020",
  rustLight: "#9b4530",
  denim: "#2d4a6e",
} as const;

const F = {
  display: "var(--font-display)",
  note: "var(--font-note)",
  label: "var(--font-label)",
} as const;

// ─── Exact postcard text (spec-provided) ─────────────────────────────────────

export const POSTCARD_LEFT = `Trust me when I say this.

One of the hardest truths you will ever learn is that most people who know your story the most will not always be the first people to support you.

They know what you survived.
They know what you carried.
They know the pit you had to crawl out of.
They know the nights you had nothing.
They know the shame, the silence, the pressure, the betrayal, the rebuilding.

And still, many of them will wait.

They will wait until strangers clap for you.
They will wait until money validates you.
They will wait until the world starts calling you successful before they suddenly remember they always believed in you.`;

export const POSTCARD_RIGHT = `Do it anyway.

At some point, you have to stop expecting recognition from people who watched you bleed and still chose silence.

You have to become your own witness.
Your own cheerleader.
Your own proof.
Your own reason to keep going.

Even when nobody posts you.
Even when nobody checks on you.
Even when nobody says they are proud.
Even when you feel completely alone.

Do it anyway.

Because the dream was never given to the crowd.
It was given to you.`;

export const POSTCARD_RECEIPT = {
  from: "Every room where your pain was visible but your effort was ignored.",
  to: "The part of you that keeps rising without applause.",
  date: "The day you stop waiting for familiar people to confirm your worth.",
  total: "The proof that survival was already your qualification.",
};

// ─── Decorative SVG atoms ─────────────────────────────────────────────────────

function HeartSVG({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/** Dark navy stitched fabric patch — used in corners */
function FabricPatchNavy({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 80 80" style={style} aria-hidden="true">
      <rect x="0" y="0" width="80" height="80" fill={B.navy} rx="2" />
      {/* crosshatch weave lines */}
      {[0,8,16,24,32,40,48,56,64,72,80].map(n => (
        <line key={`h${n}`} x1="0" y1={n} x2="80" y2={n} stroke={B.navyLight} strokeWidth="0.6" opacity="0.6" />
      ))}
      {[0,8,16,24,32,40,48,56,64,72,80].map(n => (
        <line key={`v${n}`} x1={n} y1="0" x2={n} y2="80" stroke={B.navyLight} strokeWidth="0.6" opacity="0.6" />
      ))}
      {/* stitched border */}
      <rect x="3" y="3" width="74" height="74" fill="none" stroke="oklch(0.80 0.02 240)" strokeWidth="1" strokeDasharray="4 3" rx="1" />
    </svg>
  );
}

/** Rust-red fabric patch */
function FabricPatchRust({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 70 50" style={style} aria-hidden="true">
      <rect x="0" y="0" width="70" height="50" fill={B.rust} rx="2" />
      {[0,7,14,21,28,35,42,49].map(n => (
        <line key={`h${n}`} x1="0" y1={n} x2="70" y2={n} stroke={B.rustLight} strokeWidth="0.6" opacity="0.5" />
      ))}
      {[0,7,14,21,28,35,42,49,56,63,70].map(n => (
        <line key={`v${n}`} x1={n} y1="0" x2={n} y2="50" stroke={B.rustLight} strokeWidth="0.6" opacity="0.5" />
      ))}
      <rect x="3" y="3" width="64" height="44" fill="none" stroke="oklch(0.75 0.05 30)" strokeWidth="0.8" strokeDasharray="3 2" rx="1" />
    </svg>
  );
}

/** Postage stamp — serrated edges via SVG */
function PostageStamp({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 54 68" style={style} aria-hidden="true">
      {/* Perforated border */}
      <rect x="4" y="4" width="46" height="60" fill={B.parchmentDark} stroke="none" />
      {/* Stamp inner frame */}
      <rect x="7" y="7" width="40" height="54" fill="none" stroke={B.inkFaint} strokeWidth="0.8" />
      {/* Perforations top */}
      {[6,10,14,18,22,26,30,34,38,42,46].map(x => (
        <circle key={`t${x}`} cx={x} cy="4" r="2.2" fill={B.parchment} />
      ))}
      {/* Perforations bottom */}
      {[6,10,14,18,22,26,30,34,38,42,46].map(x => (
        <circle key={`b${x}`} cx={x} cy="64" r="2.2" fill={B.parchment} />
      ))}
      {/* Perforations left */}
      {[8,14,20,26,32,38,44,50,56].map(y => (
        <circle key={`l${y}`} cx="4" cy={y} r="2.2" fill={B.parchment} />
      ))}
      {/* Perforations right */}
      {[8,14,20,26,32,38,44,50,56].map(y => (
        <circle key={`r${y}`} cx="50" cy={y} r="2.2" fill={B.parchment} />
      ))}
      {/* Stamp image: simple flower */}
      <circle cx="27" cy="30" r="10" fill="none" stroke={B.accent} strokeWidth="0.8" opacity="0.6" />
      {[0,60,120,180,240,300].map((deg, i) => (
        <ellipse key={i}
          cx={27 + 8 * Math.cos((deg * Math.PI) / 180)}
          cy={30 + 8 * Math.sin((deg * Math.PI) / 180)}
          rx="3.5" ry="2"
          fill={B.accent} opacity="0.5"
          transform={`rotate(${deg}, ${27 + 8 * Math.cos((deg * Math.PI) / 180)}, ${30 + 8 * Math.sin((deg * Math.PI) / 180)})`}
        />
      ))}
      <circle cx="27" cy="30" r="3.5" fill={B.accent} opacity="0.7" />
      {/* Denomination */}
      <text x="27" y="52" textAnchor="middle" fontFamily={F.label} fontSize="5" fill={B.inkMuted} letterSpacing="0.5">20¢</text>
    </svg>
  );
}

/** Dried lavender sprigs */
function LavenderSprig({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 30 80" style={style} aria-hidden="true">
      {/* stem */}
      <line x1="15" y1="75" x2="15" y2="10" stroke="oklch(0.62 0.06 160)" strokeWidth="1.2" />
      {/* flower buds */}
      {[10,17,24,31,38,45].map((y,i) => (
        <ellipse key={i} cx={15 + (i%2===0?-4:4)} cy={y} rx="3" ry="5" fill="oklch(0.65 0.12 280)" opacity="0.75" />
      ))}
      {/* side leaves */}
      <ellipse cx="9" cy="55" rx="3.5" ry="7" fill="oklch(0.62 0.06 160)" opacity="0.5" transform="rotate(-25 9 55)" />
      <ellipse cx="21" cy="60" rx="3.5" ry="7" fill="oklch(0.62 0.06 160)" opacity="0.5" transform="rotate(25 21 60)" />
    </svg>
  );
}

/** Dried rose (simplified) */
function DriedRose({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 70" style={style} aria-hidden="true">
      {/* stem */}
      <line x1="20" y1="65" x2="20" y2="28" stroke="oklch(0.58 0.06 140)" strokeWidth="1.5" />
      {/* leaves */}
      <ellipse cx="12" cy="48" rx="6" ry="10" fill="oklch(0.55 0.07 140)" opacity="0.45" transform="rotate(-20 12 48)" />
      <ellipse cx="28" cy="40" rx="5" ry="8" fill="oklch(0.55 0.07 140)" opacity="0.45" transform="rotate(20 28 40)" />
      {/* petals — concentric rough circles */}
      {[12,10,8,6,4].map((r,i) => (
        <circle key={i} cx="20" cy="20" r={r} fill="none"
          stroke="oklch(0.62 0.08 20)" strokeWidth="3.5" opacity={0.18 + i*0.08} />
      ))}
      <circle cx="20" cy="20" r="5" fill="oklch(0.70 0.09 20)" opacity="0.7" />
    </svg>
  );
}

/** Small stitched denim heart patch */
function DenimHeartPatch({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 60 55" style={style} aria-hidden="true">
      {/* heart fill */}
      <path d="M30 48 L5 25 C5 13 17 8 30 18 C43 8 55 13 55 25 Z" fill={B.denim} />
      {/* weave texture */}
      {[0,6,12,18,24,30,36,42,48,54,60].map(n => (
        <line key={`h${n}`} x1="0" y1={n} x2="60" y2={n} stroke="oklch(0.42 0.08 240)" strokeWidth="0.5" opacity="0.35" />
      ))}
      {[0,6,12,18,24,30,36,42,48,54,60].map(n => (
        <line key={`v${n}`} x1={n} y1="0" x2={n} y2="55" stroke="oklch(0.42 0.08 240)" strokeWidth="0.5" opacity="0.35" />
      ))}
      {/* stitching around heart */}
      <path d="M30 48 L5 25 C5 13 17 8 30 18 C43 8 55 13 55 25 Z"
        fill="none" stroke="oklch(0.88 0.02 240)" strokeWidth="1.2" strokeDasharray="3 2.5" />
      {/* center X stitch */}
      <line x1="25" y1="25" x2="35" y2="33" stroke={B.rust} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="35" y1="25" x2="25" y2="33" stroke={B.rust} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Tape strip */
function TapeStrip({ style }: { style?: CSSProperties }) {
  return (
    <div style={{
      background: "oklch(0.92 0.02 75 / 0.55)",
      border: "1px solid oklch(0.80 0.03 75 / 0.4)",
      ...style,
    }} aria-hidden="true" />
  );
}

// ─── Receipt block ────────────────────────────────────────────────────────────

export function PostcardReceipt({ style }: { style?: CSSProperties }) {
  const labelStyle: CSSProperties = {
    fontFamily: F.label, fontSize: "7.5px", letterSpacing: "0.12em",
    color: B.ink, flexShrink: 0, minWidth: "42px", lineHeight: 1.3,
    textTransform: "uppercase",
  };
  const valueStyle: CSSProperties = {
    fontFamily: F.label, fontSize: "7.5px", color: B.inkMuted, lineHeight: 1.35,
  };
  const sep = (
    <div style={{ borderTop: `1px dashed ${B.accentBorder}`, opacity: 0.6, margin: "3px 0" }} />
  );

  return (
    <div style={{
      border: `1px dashed ${B.accentBorder}`,
      borderRadius: "3px",
      padding: "7px 9px",
      background: B.receiptBg,
      display: "flex", flexDirection: "column", gap: 0,
      ...style,
    }}>
      <div style={{ display: "flex", gap: "5px" }}>
        <span style={labelStyle}>FROM:</span>
        <span style={valueStyle}>{POSTCARD_RECEIPT.from}</span>
      </div>
      {sep}
      <div style={{ display: "flex", gap: "5px" }}>
        <span style={labelStyle}>TO:</span>
        <span style={valueStyle}>{POSTCARD_RECEIPT.to}</span>
      </div>
      {sep}
      <div style={{ display: "flex", gap: "5px" }}>
        <span style={labelStyle}>DATE:</span>
        <span style={valueStyle}>{POSTCARD_RECEIPT.date}</span>
      </div>
      {sep}
      <div style={{ display: "flex", gap: "5px" }}>
        <span style={labelStyle}>TOTAL:</span>
        <span style={valueStyle}>{POSTCARD_RECEIPT.total}</span>
      </div>
    </div>
  );
}

// ─── Brand header ─────────────────────────────────────────────────────────────

export function PostcardBrandHeader() {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: "52px",
      background: B.kraft,
      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
      borderBottom: `2px dashed oklch(0.72 0.04 72 / 0.5)`,
    }}>
      {/* stitched outer border */}
      <div style={{
        position: "absolute", inset: "3px",
        border: `1.5px dashed oklch(0.65 0.04 72 / 0.45)`,
        borderRadius: "2px", pointerEvents: "none",
      }} />
      <HeartSVG style={{ width: 12, height: 12, color: B.accent }} />
      <span style={{
        fontFamily: F.label, fontSize: "13px", letterSpacing: "0.28em",
        textTransform: "uppercase", color: B.ink, lineHeight: 1,
      }}>
        The Note You Needed Today
      </span>
      <HeartSVG style={{ width: 12, height: 12, color: B.accent }} />
    </div>
  );
}

// ─── MAD signature ────────────────────────────────────────────────────────────

export function PostcardSignature({ style }: { style?: CSSProperties }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", ...style }}>
      <span style={{
        fontFamily: F.display, fontSize: "26px", letterSpacing: "0.04em",
        color: B.ink, lineHeight: 0.9,
      }}>
        MAD
      </span>
      {/* underline */}
      <div style={{
        width: "100%", height: "2px",
        background: `linear-gradient(90deg, transparent, ${B.ink} 30%, ${B.ink} 80%, transparent)`,
        marginTop: "2px",
      }} />
      <HeartSVG style={{ width: 10, height: 10, color: B.accent, marginTop: "3px" }} />
    </div>
  );
}

// ─── Title label (navy stitched) ──────────────────────────────────────────────

export function TitleLabel() {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: B.navy,
      padding: "5px 10px",
      borderRadius: "2px",
      position: "relative",
    }}>
      {/* stitched border */}
      <div style={{
        position: "absolute", inset: "3px",
        border: `1px dashed oklch(0.65 0.03 240 / 0.55)`,
        borderRadius: "1px", pointerEvents: "none",
      }} />
      <span style={{
        fontFamily: F.label, fontSize: "11px", letterSpacing: "0.22em",
        textTransform: "uppercase", color: "#e8ddd0", lineHeight: 1,
      }}>
        Do It Anyway
      </span>
      <HeartSVG style={{ width: 9, height: 9, color: B.rust }} />
    </div>
  );
}

// ─── Postcard panels ──────────────────────────────────────────────────────────

function PostcardPanel({
  side, children, style,
}: { side: "left" | "right"; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      position: "absolute",
      top: "52px",
      bottom: "58px",
      [side === "left" ? "left" : "right"]: 0,
      width: "calc(50% - 1px)",
      overflow: "hidden",
      padding: side === "left" ? "14px 16px 10px 22px" : "14px 22px 10px 16px",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Full postcard canvas ─────────────────────────────────────────────────────
//
//  DOM size:  720 × 450 px
//  Export:    pixelRatio 3 → 2160 × 1350 px
//
//  Zones:
//  Header          top:0      h:52px    kraft, stitched brand bar
//  Left panel      top:52     bot:58    title label + left text
//  Center fold     x:359      w:2px     subtle seam line
//  Right panel     top:52     bot:58    right text + receipt
//  Envelope base   bot:0      h:58px    kraft envelope fold
//  Decorative      scattered            patches, botanicals, stamp, wax

export const PostcardCanvas = forwardRef<HTMLDivElement, Record<string, never>>(
  function PostcardCanvas(_props, ref) {
    const noteTextStyle: CSSProperties = {
      fontFamily: F.note,
      fontSize: "10px",
      lineHeight: 1.58,
      color: B.ink,
      whiteSpace: "pre-wrap",
    };

    return (
      <div
        ref={ref}
        style={{
          width: "720px",
          height: "450px",
          position: "relative",
          overflow: "hidden",
          background: B.parchment,
          borderRadius: "6px",
          boxShadow: "0 8px 40px oklch(0.28 0.03 55 / 0.25), 0 2px 8px oklch(0.28 0.03 55 / 0.1)",
          flexShrink: 0,
        }}
      >

        {/* ── Paper texture gradient overlay ─────────────────── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 40% at 30% 50%, oklch(0.94 0.018 75 / 0.3) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 70% 30%, oklch(0.91 0.02 75 / 0.2) 0%, transparent 60%)",
        }} />

        {/* ── Decorative corner patches ──────────────────────── */}
        <FabricPatchNavy style={{ position: "absolute", top: -8, left: -8, width: 72, height: 72, transform: "rotate(-4deg)", opacity: 0.9, borderRadius: "2px" }} />
        <FabricPatchRust style={{ position: "absolute", top: -4, right: -6, width: 64, height: 48, transform: "rotate(5deg)", opacity: 0.85 }} />
        <FabricPatchNavy style={{ position: "absolute", bottom: 26, right: -10, width: 58, height: 70, transform: "rotate(3deg)", opacity: 0.75 }} />

        {/* ── Tape strips (holding botanical elements) ───────── */}
        <TapeStrip style={{ position: "absolute", top: 52, left: 18, width: 28, height: 8, transform: "rotate(-8deg)", borderRadius: "1px" }} />
        <TapeStrip style={{ position: "absolute", top: 180, right: 22, width: 26, height: 8, transform: "rotate(6deg)", borderRadius: "1px" }} />
        <TapeStrip style={{ position: "absolute", top: 56, right: 28, width: 22, height: 8, transform: "rotate(-5deg)", borderRadius: "1px" }} />

        {/* ── Botanical accents ──────────────────────────────── */}
        <LavenderSprig style={{ position: "absolute", top: 54, right: 8, width: 22, height: 70, opacity: 0.8 }} />
        <LavenderSprig style={{ position: "absolute", top: 46, right: 20, width: 18, height: 60, opacity: 0.65, transform: "rotate(12deg)" }} />
        <DriedRose style={{ position: "absolute", top: 52, left: 8, width: 32, height: 56, opacity: 0.75 }} />

        {/* ── Postage stamp (bottom left) ────────────────────── */}
        <PostageStamp style={{ position: "absolute", bottom: 62, left: 20, width: 40, height: 50, opacity: 0.88 }} />

        {/* ── Brand header ──────────────────────────────────── */}
        <PostcardBrandHeader />

        {/* ── Center fold line (seam between panels) ─────────── */}
        <div style={{
          position: "absolute", top: "52px", bottom: "58px",
          left: "50%", transform: "translateX(-50%)",
          width: "2px",
          background: `linear-gradient(180deg, ${B.kraftDark} 0%, oklch(0.72 0.04 72 / 0.6) 40%, oklch(0.72 0.04 72 / 0.6) 60%, ${B.kraftDark} 100%)`,
          opacity: 0.55,
        }} />
        {/* fold shadow left */}
        <div style={{
          position: "absolute", top: "52px", bottom: "58px",
          left: "calc(50% + 1px)",
          width: "12px",
          background: "linear-gradient(90deg, oklch(0.28 0.03 55 / 0.07) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* ── Left panel ────────────────────────────────────── */}
        <PostcardPanel side="left">
          <TitleLabel />
          <div style={{ height: "8px" }} />
          <p style={noteTextStyle}>{POSTCARD_LEFT}</p>
        </PostcardPanel>

        {/* ── Right panel ───────────────────────────────────── */}
        <PostcardPanel side="right" style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ ...noteTextStyle, flexShrink: 0 }}>{POSTCARD_RIGHT}</p>
          <div style={{ flexGrow: 1, minHeight: "8px" }} />
          <PostcardReceipt style={{ flexShrink: 0 }} />
        </PostcardPanel>

        {/* ── Envelope base ─────────────────────────────────── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "58px",
          background: B.kraft,
        }}>
          {/* V-fold flaps */}
          <svg viewBox="0 0 720 58" preserveAspectRatio="none"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            aria-hidden="true"
          >
            {/* Left flap */}
            <polygon points="0,0 360,58 0,58" fill={B.kraftDark} />
            {/* Right flap */}
            <polygon points="720,0 360,58 720,58" fill={B.kraftDark} />
            {/* Fold lines */}
            <line x1="0" y1="0" x2="360" y2="58" stroke={B.kraftDeep} strokeWidth="0.8" opacity="0.5" />
            <line x1="720" y1="0" x2="360" y2="58" stroke={B.kraftDeep} strokeWidth="0.8" opacity="0.5" />
          </svg>

          {/* Domain label */}
          <div style={{
            position: "absolute", bottom: "8px", left: "50%",
            transform: "translateX(-50%)",
            background: B.parchmentDark,
            border: `1px solid ${B.accentBorder}`,
            borderRadius: "999px",
            padding: "3px 12px",
            display: "flex", alignItems: "center", gap: "6px",
            whiteSpace: "nowrap",
          }}>
            <HeartSVG style={{ width: 7, height: 7, color: B.accent }} />
            <span style={{ fontFamily: F.label, fontSize: "7px", letterSpacing: "0.14em", color: B.inkMuted }}>
              thenoteyouneeded.today
            </span>
            <HeartSVG style={{ width: 7, height: 7, color: B.accent }} />
          </div>
        </div>

        {/* ── Denim heart patch (center, straddling envelope edge) */}
        <DenimHeartPatch style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "44px",
          height: "40px",
          filter: "drop-shadow(0 2px 6px oklch(0.28 0.03 55 / 0.3))",
        }} />

        {/* ── MAD signature (bottom-right, above envelope) ───── */}
        <PostcardSignature style={{
          position: "absolute",
          bottom: "62px",
          right: "22px",
        }} />

      </div>
    );
  },
);
