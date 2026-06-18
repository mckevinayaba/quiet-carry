/**
 * Full Note Postcard Spread — v2
 *
 * DOM: 720×450  →  Export: 2160×1350 (pixelRatio 3).
 *
 * Layout zones (canvas y-coordinates):
 *   0   – 56   Header strip (kraft, stitched)
 *   56  – 408  Content area (left panel | center fold | right panel)
 *   408 – 450  Envelope base (42px, subtle)
 *
 * Right panel internal zones (absolute):
 *   top: 0, bottom: 116px  → note text (overflow: hidden)
 *   bottom: 0, height: 110px  → receipt (always visible)
 *
 * MAD patch: canvas absolute, bottom: 46px, right: 10px
 *   → above envelope, right of receipt, no overlap
 */

import { forwardRef } from "react";
import type { CSSProperties, ReactNode } from "react";

// ─── Brand tokens ──────────────────────────────────────────────────────────────

const B = {
  parchment: "#f4eddc",
  parchmentLight: "#faf5ea",
  parchmentDark: "#e8dcc8",
  kraft: "#c9a96e",
  kraftLight: "#d6b87a",
  kraftDark: "#b8935a",
  kraftDeep: "#9e7840",
  ink: "#2e2010",
  inkMuted: "#6b5540",
  inkFaint: "#a08060",
  accent: "#8b4513",
  accentBorder: "rgba(100, 60, 20, 0.28)",
  receiptBg: "#fdf7ec",
  navy: "#1a2d4a",
  navyMid: "#243b5e",
  navyLight: "#2f4d7a",
  rust: "#7a3020",
  rustMid: "#9b4530",
  denim: "#2d4a6e",
  denimLight: "#3d5e8a",
} as const;

const F = {
  display: "var(--font-display)",
  note: "var(--font-note)",
  label: "var(--font-label)",
} as const;

// ─── Postcard text (spec-exact) ────────────────────────────────────────────────

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

// ─── SVG atoms ─────────────────────────────────────────────────────────────────

function HeartSVG({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/** Navy woven fabric patch with double stitching */
function NavyPatch({ w, h, style }: { w: number; h: number; style?: CSSProperties }) {
  const xs = Array.from({ length: Math.ceil(w / 6) + 1 }, (_, i) => i * 6);
  const ys = Array.from({ length: Math.ceil(h / 6) + 1 }, (_, i) => i * 6);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={style} aria-hidden="true">
      <rect width={w} height={h} fill={B.navy} rx="2" />
      {ys.map(y => <line key={`h${y}`} x1="0" y1={y} x2={w} y2={y} stroke={B.navyMid} strokeWidth="0.7" opacity="0.55" />)}
      {xs.map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2={h} stroke={B.navyMid} strokeWidth="0.7" opacity="0.55" />)}
      {/* outer stitching */}
      <rect x="3" y="3" width={w-6} height={h-6} fill="none" stroke="rgba(210,200,190,0.55)" strokeWidth="1" strokeDasharray="4 3" rx="1" />
      {/* inner stitching */}
      <rect x="6" y="6" width={w-12} height={h-12} fill="none" stroke="rgba(210,200,190,0.25)" strokeWidth="0.6" strokeDasharray="3 4" rx="1" />
    </svg>
  );
}

/** Rust/terracotta woven fabric patch */
function RustPatch({ w, h, style }: { w: number; h: number; style?: CSSProperties }) {
  const xs = Array.from({ length: Math.ceil(w / 7) + 1 }, (_, i) => i * 7);
  const ys = Array.from({ length: Math.ceil(h / 7) + 1 }, (_, i) => i * 7);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={style} aria-hidden="true">
      <rect width={w} height={h} fill={B.rust} rx="2" />
      {ys.map(y => <line key={`h${y}`} x1="0" y1={y} x2={w} y2={y} stroke={B.rustMid} strokeWidth="0.6" opacity="0.5" />)}
      {xs.map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2={h} stroke={B.rustMid} strokeWidth="0.6" opacity="0.5" />)}
      <rect x="3" y="3" width={w-6} height={h-6} fill="none" stroke="rgba(240,200,180,0.45)" strokeWidth="0.9" strokeDasharray="3.5 3" rx="1" />
    </svg>
  );
}

/** Lace corner patch — creamy off-white */
function LacePatch({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 55 55" style={style} aria-hidden="true">
      <rect width="55" height="55" fill="#f0e8d8" rx="1" opacity="0.85" />
      {/* lace grid */}
      {[0,5,10,15,20,25,30,35,40,45,50,55].map(n => (
        <line key={`h${n}`} x1="0" y1={n} x2="55" y2={n} stroke="#c8b89a" strokeWidth="0.5" opacity="0.6" />
      ))}
      {[0,5,10,15,20,25,30,35,40,45,50,55].map(n => (
        <line key={`v${n}`} x1={n} y1="0" x2={n} y2="55" stroke="#c8b89a" strokeWidth="0.5" opacity="0.6" />
      ))}
      {/* lace flower at each grid intersection */}
      {[10,25,40].flatMap(cx => [10,25,40].map(cy => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" fill="none" stroke="#c8b89a" strokeWidth="0.6" opacity="0.5" />
      )))}
      <rect x="2" y="2" width="51" height="51" fill="none" stroke="#b8a888" strokeWidth="0.8" strokeDasharray="3 2.5" />
    </svg>
  );
}

/** Pressed chrysanthemum flower (botanical accent) */
function PressedChrysanthemum({ style }: { style?: CSSProperties }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * (360 / 16));
  const innerPetals = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 60 70" style={style} aria-hidden="true">
      {/* stem */}
      <line x1="30" y1="65" x2="30" y2="42" stroke="#5a6e3a" strokeWidth="1.5" />
      {/* leaves */}
      <ellipse cx="22" cy="56" rx="6" ry="10" fill="#5a6e3a" opacity="0.45" transform="rotate(-20 22 56)" />
      <ellipse cx="38" cy="50" rx="5" ry="9" fill="#5a6e3a" opacity="0.4" transform="rotate(20 38 50)" />
      {/* outer ring of petals */}
      {petals.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 30 + 16 * Math.cos(rad);
        const cy = 28 + 16 * Math.sin(rad);
        return (
          <ellipse key={`op${i}`} cx={cx} cy={cy} rx="4.5" ry="2.2"
            fill="#9b5a2a" opacity="0.55"
            transform={`rotate(${deg} ${cx} ${cy})`}
          />
        );
      })}
      {/* middle ring */}
      {innerPetals.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 30 + 10 * Math.cos(rad);
        const cy = 28 + 10 * Math.sin(rad);
        return (
          <ellipse key={`ip${i}`} cx={cx} cy={cy} rx="3.5" ry="1.8"
            fill="#b06830" opacity="0.65"
            transform={`rotate(${deg} ${cx} ${cy})`}
          />
        );
      })}
      {/* inner ring */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 30 + 5 * Math.cos(rad);
        const cy = 28 + 5 * Math.sin(rad);
        return (
          <ellipse key={`ir${i}`} cx={cx} cy={cy} rx="2.5" ry="1.5"
            fill="#c87840" opacity="0.75"
            transform={`rotate(${deg} ${cx} ${cy})`}
          />
        );
      })}
      {/* center */}
      <circle cx="30" cy="28" r="4" fill="#6b3a18" opacity="0.8" />
      <circle cx="30" cy="28" r="2" fill="#8b5020" opacity="0.9" />
    </svg>
  );
}

/** Lavender bundle (multiple stalks) */
function LavenderBundle({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 50 100" style={style} aria-hidden="true">
      {/* stems */}
      {[18, 22, 26, 30, 34].map((x, i) => (
        <line key={`s${i}`} x1={x} y1="92" x2={x + (i-2)*1.5} y2="18" stroke="#6b7a4a" strokeWidth="1" opacity={0.7 + i*0.05} />
      ))}
      {/* binding */}
      <path d="M16,72 Q25,76 34,72" fill="none" stroke="#9b8050" strokeWidth="1.5" />
      <path d="M16,75 Q25,79 34,75" fill="none" stroke="#9b8050" strokeWidth="1.2" />
      {/* buds on each stem */}
      {[
        [18, [18,25,32]], [22, [12,19,26,33]], [26, [10,17,24,31,38]],
        [30, [12,19,26,33]], [34, [18,25,32]],
      ].map(([x, ys], si) =>
        (ys as number[]).map((y, bi) => (
          <ellipse key={`b${si}${bi}`}
            cx={(x as number) + (bi%2===0?-3:3)} cy={y} rx="2.5" ry="4.5"
            fill="oklch(0.62 0.13 280)" opacity={0.7 + bi*0.04}
          />
        ))
      )}
    </svg>
  );
}

/** Masking tape strip */
function Tape({ w, h, style }: { w: number; h: number; style?: CSSProperties }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={style} aria-hidden="true">
      <rect width={w} height={h} fill="rgba(220,205,170,0.58)" />
      {/* grain lines */}
      {Array.from({ length: Math.ceil(w / 5) }, (_, i) => (
        <line key={i} x1={i*5} y1="0" x2={i*5 + 2} y2={h} stroke="rgba(180,160,120,0.25)" strokeWidth="0.8" />
      ))}
      <rect width={w} height={h} fill="none" stroke="rgba(180,160,120,0.35)" strokeWidth="0.5" />
    </svg>
  );
}

/** Postage stamp */
function PostageStamp({ style }: { style?: CSSProperties }) {
  const perf = (count: number, total: number, axis: "h" | "v", pos: number) =>
    Array.from({ length: count }, (_, i) => {
      const p = (i / (count - 1)) * total;
      return axis === "h"
        ? <circle key={i} cx={p} cy={pos} r="2.2" fill={B.parchment} />
        : <circle key={i} cx={pos} cy={p} r="2.2" fill={B.parchment} />;
    });
  return (
    <svg viewBox="0 0 52 66" style={style} aria-hidden="true">
      <rect x="4" y="4" width="44" height="58" fill={B.parchmentDark} />
      <rect x="7" y="7" width="38" height="52" fill="none" stroke={B.inkFaint} strokeWidth="0.7" />
      {perf(10, 44, "h", 4)} {perf(10, 44, "h", 62)}
      {perf(9, 58, "v", 4)} {perf(9, 58, "v", 48)}
      {/* flower motif */}
      {[0,51,102,153,204,255,306].map((deg,i) => {
        const r = (deg*Math.PI)/180;
        return <ellipse key={i} cx={26+8*Math.cos(r)} cy={30+8*Math.sin(r)} rx="3.5" ry="1.8"
          fill={B.accent} opacity="0.45" transform={`rotate(${deg} ${26+8*Math.cos(r)} ${30+8*Math.sin(r)})`} />;
      })}
      <circle cx="26" cy="30" r="4" fill={B.accent} opacity="0.6" />
      <text x="26" y="50" textAnchor="middle" fontFamily={F.label} fontSize="5" fill={B.inkMuted} letterSpacing="0.5">20¢</text>
    </svg>
  );
}

/** Denim stitched heart (center fold detail) */
function DenimHeart({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 56 52" style={style} aria-hidden="true">
      <path d="M28 46 L4 24 C4 12 16 7 28 17 C40 7 52 12 52 24 Z" fill={B.denim} />
      {[0,6,12,18,24,30,36,42,48,54].flatMap(n => [
        <line key={`h${n}`} x1="0" y1={n} x2="56" y2={n} stroke={B.denimLight} strokeWidth="0.5" opacity="0.3" />,
        <line key={`v${n}`} x1={n} y1="0" x2={n} y2="52" stroke={B.denimLight} strokeWidth="0.5" opacity="0.3" />,
      ])}
      <path d="M28 46 L4 24 C4 12 16 7 28 17 C40 7 52 12 52 24 Z"
        fill="none" stroke="rgba(220,215,210,0.65)" strokeWidth="1.3" strokeDasharray="3 2.5" />
      {/* gold X stitch */}
      <line x1="22" y1="24" x2="34" y2="32" stroke="#c8a050" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="24" x2="22" y2="32" stroke="#c8a050" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Receipt ───────────────────────────────────────────────────────────────────

export function PostcardReceipt({ style }: { style?: CSSProperties }) {
  const rowStyle: CSSProperties = { display: "flex", gap: "5px", alignItems: "flex-start" };
  const labelStyle: CSSProperties = {
    fontFamily: F.label, fontSize: "7.2px", letterSpacing: "0.11em",
    color: B.navy, flexShrink: 0, minWidth: "40px", lineHeight: 1.35,
    textTransform: "uppercase", fontWeight: 700,
  };
  const valStyle: CSSProperties = {
    fontFamily: F.label, fontSize: "7.2px", color: B.inkMuted, lineHeight: 1.4,
  };
  const sep = <div style={{ margin: "3.5px 0", borderTop: `1px dashed rgba(100,60,20,0.22)` }} />;

  return (
    <div style={{
      background: B.receiptBg,
      // Navy stitched denim-style border — much more visible
      border: `2px dashed rgba(26,45,74,0.38)`,
      borderRadius: "3px",
      padding: "7px 9px 6px",
      boxShadow: "inset 0 0 0 3px rgba(26,45,74,0.08)",
      position: "relative",
      ...style,
    }}>
      {/* stitched inner inset effect */}
      <div style={{
        position: "absolute", inset: "4px",
        border: "1px dashed rgba(26,45,74,0.14)",
        borderRadius: "1px", pointerEvents: "none",
      }} />
      <div style={rowStyle}>
        <span style={labelStyle}>FROM:</span>
        <span style={valStyle}>{POSTCARD_RECEIPT.from}</span>
      </div>
      {sep}
      <div style={rowStyle}>
        <span style={labelStyle}>TO:</span>
        <span style={valStyle}>{POSTCARD_RECEIPT.to}</span>
      </div>
      {sep}
      <div style={rowStyle}>
        <span style={labelStyle}>DATE:</span>
        <span style={valStyle}>{POSTCARD_RECEIPT.date}</span>
      </div>
      {sep}
      <div style={rowStyle}>
        <span style={labelStyle}>TOTAL:</span>
        <span style={valStyle}>{POSTCARD_RECEIPT.total}</span>
      </div>
      {/* small heart accent at bottom-right */}
      <HeartSVG style={{
        position: "absolute", bottom: "5px", right: "6px",
        width: "8px", height: "8px", color: B.accent, opacity: 0.7,
      }} />
    </div>
  );
}

// ─── Brand header ──────────────────────────────────────────────────────────────

export function PostcardBrandHeader() {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: "56px",
      background: `linear-gradient(180deg, ${B.kraft} 0%, ${B.kraftLight} 50%, ${B.kraftDark} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
      boxShadow: "0 3px 12px rgba(100,60,10,0.22), inset 0 1px 0 rgba(255,240,200,0.3)",
    }}>
      {/* outer stitched frame */}
      <div style={{
        position: "absolute", inset: "4px",
        border: "1.5px dashed rgba(80,50,10,0.35)",
        borderRadius: "2px", pointerEvents: "none",
      }} />
      {/* inner stitched frame */}
      <div style={{
        position: "absolute", inset: "7px",
        border: "0.8px dashed rgba(80,50,10,0.2)",
        borderRadius: "1px", pointerEvents: "none",
      }} />
      <HeartSVG style={{ width: 11, height: 11, color: B.accent, flexShrink: 0 }} />
      <span style={{
        fontFamily: F.label,
        fontSize: "12.5px",
        letterSpacing: "0.30em",
        textTransform: "uppercase",
        color: B.ink,
        lineHeight: 1,
        textShadow: "0 1px 2px rgba(255,240,200,0.4)",
      }}>
        The Note You Needed Today
      </span>
      <HeartSVG style={{ width: 11, height: 11, color: B.accent, flexShrink: 0 }} />
    </div>
  );
}

// ─── MAD signature patch ───────────────────────────────────────────────────────

export function PostcardSignature({ style }: { style?: CSSProperties }) {
  return (
    <div style={{
      position: "relative",
      background: B.parchmentLight,
      padding: "7px 10px 5px",
      // kraft paper shadow for the "attached patch" look
      boxShadow: "2px 3px 10px rgba(60,30,10,0.38), 0 1px 3px rgba(60,30,10,0.2)",
      borderRadius: "2px",
      transform: "rotate(-4.5deg)",
      ...style,
    }}>
      {/* stitched navy border */}
      <div style={{
        position: "absolute", inset: "3px",
        border: `1.5px dashed rgba(26,45,74,0.5)`,
        borderRadius: "1px", pointerEvents: "none",
      }} />
      {/* inner stitching */}
      <div style={{
        position: "absolute", inset: "6px",
        border: `0.7px dashed rgba(26,45,74,0.22)`,
        borderRadius: "1px", pointerEvents: "none",
      }} />
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: "2px",
      }}>
        <span style={{
          fontFamily: F.display,
          fontSize: "24px",
          letterSpacing: "0.05em",
          color: B.ink,
          lineHeight: 1,
        }}>
          MAD
        </span>
        {/* hand-drawn underline */}
        <svg viewBox="0 0 52 6" aria-hidden="true" style={{ width: "52px", height: "6px" }}>
          <path d="M1,3 Q13,1 26,3 Q39,5 51,3" fill="none" stroke={B.ink} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <HeartSVG style={{ width: 9, height: 9, color: B.accent, marginTop: "1px" }} />
      </div>
    </div>
  );
}

// ─── DO IT ANYWAY label ────────────────────────────────────────────────────────

export function TitleLabel() {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "7px",
      background: B.navy,
      padding: "5px 12px 5px 10px",
      borderRadius: "2px",
      position: "relative",
      boxShadow: "2px 3px 8px rgba(10,20,40,0.45)",
    }}>
      {/* stitched outer border */}
      <div style={{
        position: "absolute", inset: "3.5px",
        border: "1.2px dashed rgba(180,200,230,0.45)",
        borderRadius: "1px", pointerEvents: "none",
      }} />
      {/* weave texture lines */}
      {[0,6,12,18,24].map(y => (
        <div key={y} style={{
          position: "absolute", left: 0, right: 0, top: `${y}px`, height: "1px",
          background: "rgba(255,255,255,0.04)",
        }} />
      ))}
      <span style={{
        fontFamily: F.label,
        fontSize: "11.5px",
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: "#e8ddd0",
        lineHeight: 1,
        position: "relative",
      }}>
        Do It Anyway
      </span>
      <HeartSVG style={{ width: 9, height: 9, color: "#d44c30", position: "relative" }} />
    </div>
  );
}

// ─── Main canvas ───────────────────────────────────────────────────────────────

export const PostcardCanvas = forwardRef<HTMLDivElement, Record<string, never>>(
  function PostcardCanvas(_props, ref) {

    const noteStyle: CSSProperties = {
      fontFamily: F.note,
      fontSize: "9px",
      lineHeight: 1.48,
      color: B.ink,
      whiteSpace: "pre-wrap",
    };

    // Content area: y 56 – 408  (352px tall)
    // Left/right panels stop 50px above canvas bottom (above envelope 42px)
    const HEADER = 56;
    const ENV_H = 42;
    const PANEL_BOTTOM = ENV_H + 8; // 8px buffer above envelope

    return (
      <div
        ref={ref}
        style={{
          width: "720px",
          height: "450px",
          position: "relative",
          overflow: "hidden",
          background: B.parchment,
          borderRadius: "5px",
          boxShadow: "0 10px 48px rgba(60,30,10,0.3), 0 2px 8px rgba(60,30,10,0.15)",
          flexShrink: 0,
        }}
      >

        {/* ── Warm paper texture ─────────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: [
            "radial-gradient(ellipse 55% 45% at 28% 52%, rgba(255,245,220,0.35) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 55% at 72% 28%, rgba(255,248,225,0.25) 0%, transparent 65%)",
            "linear-gradient(160deg, rgba(255,252,240,0.15) 0%, transparent 50%, rgba(200,170,120,0.08) 100%)",
          ].join(", "),
        }} />

        {/* ── Corner decoration: navy fabric — top-left ──────── */}
        <NavyPatch w={88} h={88} style={{
          position: "absolute", top: -10, left: -10,
          width: 88, height: 88,
          transform: "rotate(-5deg)", opacity: 0.88,
        }} />

        {/* ── Corner decoration: rust fabric — top-right ─────── */}
        <RustPatch w={72} h={56} style={{
          position: "absolute", top: -6, right: -8,
          width: 72, height: 56,
          transform: "rotate(6deg)", opacity: 0.82,
        }} />

        {/* ── Corner decoration: rust fabric — bottom-left ───── */}
        <RustPatch w={60} h={48} style={{
          position: "absolute", bottom: 26, left: -8,
          width: 60, height: 48,
          transform: "rotate(-3deg)", opacity: 0.72,
        }} />

        {/* ── Corner decoration: lace — bottom-right ─────────── */}
        <LacePatch style={{
          position: "absolute", bottom: 20, right: -6,
          width: 55, height: 55,
          transform: "rotate(4deg)", opacity: 0.7,
        }} />

        {/* ── Tape strips ────────────────────────────────────── */}
        <Tape w={34} h={9} style={{
          position: "absolute", top: HEADER + 8, left: 14,
          width: 34, height: 9,
          transform: "rotate(-9deg)", opacity: 0.9,
        }} />
        <Tape w={30} h={8} style={{
          position: "absolute", top: HEADER + 4, right: 32,
          width: 30, height: 8,
          transform: "rotate(7deg)", opacity: 0.85,
        }} />
        <Tape w={26} h={8} style={{
          position: "absolute", top: 170, right: 18,
          width: 26, height: 8,
          transform: "rotate(-5deg)", opacity: 0.8,
        }} />

        {/* ── Botanical: chrysanthemum — left side ───────────── */}
        <PressedChrysanthemum style={{
          position: "absolute", top: HEADER + 12, left: 6,
          width: 46, height: 54, opacity: 0.82,
        }} />

        {/* ── Botanical: lavender bundle — right side ─────────── */}
        <LavenderBundle style={{
          position: "absolute", top: HEADER - 4, right: 4,
          width: 44, height: 90, opacity: 0.8,
        }} />

        {/* ── Postage stamp — bottom left ────────────────────── */}
        <PostageStamp style={{
          position: "absolute", bottom: ENV_H + 6, left: 16,
          width: 38, height: 48, opacity: 0.84,
        }} />

        {/* ── Brand header ──────────────────────────────────── */}
        <PostcardBrandHeader />

        {/* ── Center fold line ──────────────────────────────── */}
        <div style={{
          position: "absolute", top: `${HEADER}px`, bottom: `${ENV_H}px`,
          left: "calc(50% - 1px)", width: "2px",
          background: `linear-gradient(180deg, ${B.kraftDark}99 0%, ${B.kraftDark}66 30%, ${B.kraftDark}66 70%, ${B.kraftDark}99 100%)`,
          opacity: 0.5,
        }} />
        {/* fold shadow (right side of seam) */}
        <div style={{
          position: "absolute", top: `${HEADER}px`, bottom: `${ENV_H}px`,
          left: "50%", width: "14px",
          background: "linear-gradient(90deg, rgba(60,30,10,0.09) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* ────────────────────── LEFT PANEL ─────────────────── */}
        <div style={{
          position: "absolute",
          top: `${HEADER}px`,
          left: 0,
          width: "calc(50% - 1px)",
          bottom: `${PANEL_BOTTOM}px`,
          padding: "12px 14px 10px 20px",
          overflow: "hidden",
        }}>
          <TitleLabel />
          <div style={{ height: "7px" }} />
          <p style={noteStyle}>{POSTCARD_LEFT}</p>
        </div>

        {/* ────────────────────── RIGHT PANEL ────────────────── */}
        {/* Text zone — clipped, never pushes receipt */}
        <div style={{
          position: "absolute",
          top: `${HEADER}px`,
          right: 0,
          width: "calc(50% - 1px)",
          // Reserve 116px at bottom for receipt, 10px padding
          bottom: `${PANEL_BOTTOM + 116}px`,
          padding: "12px 18px 0 14px",
          overflow: "hidden",
        }}>
          <p style={noteStyle}>{POSTCARD_RIGHT}</p>
        </div>

        {/* Receipt zone — absolutely placed, always visible */}
        <div style={{
          position: "absolute",
          right: 0,
          bottom: `${PANEL_BOTTOM}px`,
          width: "calc(50% - 1px)",
          height: "110px",
          padding: "0 80px 6px 14px", // right padding leaves room for MAD patch
        }}>
          <PostcardReceipt style={{ height: "100%" }} />
        </div>

        {/* ── Envelope base ─────────────────────────────────── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: `${ENV_H}px`,
          background: B.kraft,
          boxShadow: "inset 0 2px 8px rgba(60,30,10,0.15)",
        }}>
          {/* V-fold flaps — flatter angle, less intrusive */}
          <svg viewBox="0 0 720 42" preserveAspectRatio="none"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            aria-hidden="true"
          >
            <polygon points="0,0 360,42 0,42" fill={B.kraftDark} opacity="0.7" />
            <polygon points="720,0 360,42 720,42" fill={B.kraftDark} opacity="0.7" />
            <line x1="1" y1="0" x2="359" y2="42" stroke={B.kraftDeep} strokeWidth="0.8" opacity="0.55" />
            <line x1="719" y1="0" x2="361" y2="42" stroke={B.kraftDeep} strokeWidth="0.8" opacity="0.55" />
          </svg>
          {/* stitched edge at top of envelope */}
          <div style={{
            position: "absolute", top: "3px", left: "8px", right: "8px", height: "1px",
            borderTop: "1px dashed rgba(80,50,10,0.3)",
          }} />

          {/* Domain label — centered */}
          <div style={{
            position: "absolute", bottom: "7px", left: "50%",
            transform: "translateX(-50%)",
            background: B.parchmentDark,
            border: `1px solid rgba(100,60,20,0.35)`,
            borderRadius: "999px",
            padding: "2.5px 11px",
            display: "flex", alignItems: "center", gap: "5px",
            whiteSpace: "nowrap",
            boxShadow: "0 1px 4px rgba(60,30,10,0.2)",
          }}>
            <HeartSVG style={{ width: 6, height: 6, color: B.accent }} />
            <span style={{
              fontFamily: F.label, fontSize: "6.5px",
              letterSpacing: "0.14em", color: B.inkMuted,
            }}>
              thenoteyouneeded.today
            </span>
            <HeartSVG style={{ width: 6, height: 6, color: B.accent }} />
          </div>
        </div>

        {/* ── Denim heart patch (center, on envelope edge) ───── */}
        <DenimHeart style={{
          position: "absolute",
          bottom: "18px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "42px",
          height: "38px",
          filter: "drop-shadow(0 2px 5px rgba(20,30,60,0.35))",
        }} />

        {/* ── MAD signature patch ─────────────────────────────
             Positioned right of receipt, above envelope, no overlap.
             Receipt right edge: calc(50% + 80px) from right = canvas x ~640
             MAD left edge: canvas x = 720 - 10 - 66 = 644 → 4px gap ✓ */}
        <PostcardSignature style={{
          position: "absolute",
          bottom: `${PANEL_BOTTOM + 2}px`,
          right: "10px",
          width: "66px",
        }} />

      </div>
    );
  },
);
