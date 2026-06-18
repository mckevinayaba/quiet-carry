/**
 * Full Note Postcard Spread — "Do It Anyway"
 *
 * Landscape canvas: 720×450 DOM → 2160×1350 PNG (pixelRatio 3).
 * Two-page letter spread on an open envelope base.
 * Design approval prototype — not wired into existing share flow.
 */

import { forwardRef } from "react";
import type { CSSProperties, ReactNode, ReactElement } from "react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────

const B = {
  parchment: "#f3ead6",
  parchmentLight: "#f8f0db",
  parchmentDark: "#e7dcc2",
  parchmentEdge: "#cdbf9c",
  ink: "#2a1f15",
  inkSoft: "#3a2c1f",
  inkMuted: "#5d4a36",
  accent: "#8a2a1a",
  rust: "#7a3020",
  rustLight: "#9b4530",
  rustDark: "#4f1e14",
  navy: "#1f2a44",
  navyLight: "#2d3b5c",
  navyDeep: "#141b30",
  denim: "#2f4566",
  kraft: "#b88a5c",
  kraftLight: "#c9a073",
  kraftDark: "#8e6539",
  kraftDeep: "#6b4a27",
  gold: "#caa14a",
} as const;

const F = {
  display: "'Cormorant Garamond', serif",
  note: "'Patrick Hand', cursive",
  label: "'Special Elite', serif",
} as const;

// ─── Spec text ────────────────────────────────────────────────────────────────

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

// ─── Atoms ────────────────────────────────────────────────────────────────────

function HeartSVG({ style, color = B.accent }: { style?: CSSProperties; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} style={style} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function HeartOutline({ style, color }: { style?: CSSProperties; color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

/** Denim weave fill with optional stitched dashed border. */
function denimSwatch(w: number, h: number, opts?: { borderColor?: string; rotate?: number }) {
  const lines: ReactElement[] = [];
  for (let n = 0; n <= h; n += 4)
    lines.push(<line key={`h${n}`} x1="0" y1={n} x2={w} y2={n} stroke={B.navyLight} strokeWidth="0.6" opacity="0.55" />);
  for (let n = 0; n <= w; n += 4)
    lines.push(<line key={`v${n}`} x1={n} y1="0" x2={n} y2={h} stroke={B.navyDeep} strokeWidth="0.5" opacity="0.45" />);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
      <rect x="0" y="0" width={w} height={h} fill={B.navy} />
      {lines}
      {/* frayed darker edge */}
      <rect x="0" y="0" width={w} height={h} fill="none" stroke={B.navyDeep} strokeWidth="1.2" opacity="0.7" />
      {opts?.borderColor && (
        <rect x="3" y="3" width={w - 6} height={h - 6} fill="none"
          stroke={opts.borderColor} strokeWidth="1.1" strokeDasharray="3.5 2.5" opacity="0.8" />
      )}
    </svg>
  );
}

/** Rust fabric square (corner accents). */
function RustFabric({ w, h, style }: { w: number; h: number; style?: CSSProperties }) {
  const lines: ReactElement[] = [];
  for (let n = 0; n <= h; n += 4)
    lines.push(<line key={`h${n}`} x1="0" y1={n} x2={w} y2={n} stroke={B.rustLight} strokeWidth="0.5" opacity="0.5" />);
  for (let n = 0; n <= w; n += 4)
    lines.push(<line key={`v${n}`} x1={n} y1="0" x2={n} y2={h} stroke={B.rustDark} strokeWidth="0.5" opacity="0.5" />);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={style} aria-hidden="true">
      <rect width={w} height={h} fill={B.rust} />
      {lines}
      <rect x="0" y="0" width={w} height={h} fill="none" stroke={B.rustDark} strokeWidth="1" opacity="0.7" />
    </svg>
  );
}

/** Lavender sprig — top-right botanical. */
function LavenderSprig({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 30 100" style={style} aria-hidden="true">
      <line x1="15" y1="98" x2="15" y2="20" stroke="#6e7a4a" strokeWidth="1.1" />
      {[20, 28, 36, 44, 52, 60].map((y, i) => (
        <ellipse key={i} cx={15 + (i % 2 === 0 ? -3 : 3)} cy={y} rx="3" ry="5" fill="#8a7ab5" opacity="0.8" />
      ))}
      {[40, 56, 72].map((y, i) => (
        <g key={i}>
          <ellipse cx={8} cy={y} rx="2.5" ry="6" fill="#6e7a4a" opacity="0.55" transform={`rotate(-22 8 ${y})`} />
          <ellipse cx={22} cy={y + 4} rx="2.5" ry="6" fill="#6e7a4a" opacity="0.55" transform={`rotate(22 22 ${y + 4})`} />
        </g>
      ))}
    </svg>
  );
}

/** Dried chrysanthemum cluster — bottom-left botanical. */
function DriedFlower({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 60 80" style={style} aria-hidden="true">
      <line x1="30" y1="78" x2="30" y2="38" stroke="#6b5235" strokeWidth="1.2" />
      <ellipse cx="22" cy="60" rx="4" ry="9" fill="#6e6238" opacity="0.55" transform="rotate(-25 22 60)" />
      <ellipse cx="38" cy="56" rx="4" ry="9" fill="#6e6238" opacity="0.55" transform="rotate(25 38 56)" />
      {/* layered petals */}
      {[...Array(14)].map((_, i) => {
        const a = (i * 360) / 14;
        const rad = (a * Math.PI) / 180;
        return (
          <ellipse key={i}
            cx={30 + 11 * Math.cos(rad)} cy={28 + 11 * Math.sin(rad)}
            rx="6" ry="2.6" fill="#a06030" opacity="0.85"
            transform={`rotate(${a} ${30 + 11 * Math.cos(rad)} ${28 + 11 * Math.sin(rad)})`} />
        );
      })}
      {[...Array(10)].map((_, i) => {
        const a = (i * 360) / 10 + 18;
        const rad = (a * Math.PI) / 180;
        return (
          <ellipse key={i}
            cx={30 + 6 * Math.cos(rad)} cy={28 + 6 * Math.sin(rad)}
            rx="4.5" ry="2" fill="#c47a3a" opacity="0.9"
            transform={`rotate(${a} ${30 + 6 * Math.cos(rad)} ${28 + 6 * Math.sin(rad)})`} />
        );
      })}
      <circle cx="30" cy="28" r="3" fill="#5e3a18" />
    </svg>
  );
}

/** Tiny baby's-breath cluster — small white flowers. */
function BabysBreath({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 80" style={style} aria-hidden="true">
      <g stroke="#7a6a48" strokeWidth="0.6" fill="none">
        <path d="M20 78 Q18 60 14 45 Q10 32 12 18" />
        <path d="M20 78 Q22 60 26 45 Q30 32 28 18" />
        <path d="M20 78 Q20 55 20 28" />
      </g>
      {[[12, 18], [28, 18], [20, 28], [14, 45], [26, 45], [18, 60], [22, 60], [16, 35], [24, 38], [20, 12], [10, 30], [30, 32]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#efe6cf" stroke="#b4a473" strokeWidth="0.4" />
      ))}
    </svg>
  );
}

/** Washi tape strip. */
function TapeStrip({ style, color = "rgba(220,200,165,0.75)" }: { style?: CSSProperties; color?: string }) {
  return (
    <div aria-hidden="true" style={{
      background: `linear-gradient(180deg, ${color}, rgba(200,180,140,0.65))`,
      borderTop: "1px solid rgba(255,255,255,0.35)",
      borderBottom: "1px solid rgba(120,100,70,0.25)",
      ...style,
    }} />
  );
}

/** Crochet doily — bottom-right reference detail. */
function Doily({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" style={style} aria-hidden="true">
      <g stroke="#d8c89c" strokeWidth="0.6" fill="none" opacity="0.85">
        {[...Array(12)].map((_, i) => {
          const a = (i * 360) / 12;
          return <line key={i} x1="50" y1="50" x2={50 + 50 * Math.cos((a * Math.PI) / 180)} y2={50 + 50 * Math.sin((a * Math.PI) / 180)} />;
        })}
        {[15, 25, 35, 45].map(r => <circle key={r} cx="50" cy="50" r={r} />)}
        {[...Array(16)].map((_, i) => {
          const a = (i * 360) / 16;
          const rad = (a * Math.PI) / 180;
          return <circle key={i} cx={50 + 42 * Math.cos(rad)} cy={50 + 42 * Math.sin(rad)} r="3" />;
        })}
      </g>
    </svg>
  );
}

// ─── Header strip (stitched parchment patch on denim) ─────────────────────────

function HeaderStrip() {
  return (
    <div style={{
      position: "absolute", top: 8, left: 80, right: 80, height: 36,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(180deg, ${B.parchmentLight}, ${B.parchmentDark})`,
      borderRadius: 2,
      boxShadow: "0 2px 6px rgba(60,40,20,0.25), inset 0 0 0 1px rgba(120,90,50,0.15)",
      zIndex: 5,
    }}>
      <div style={{
        position: "absolute", inset: 3,
        border: `1px dashed ${B.kraftDeep}`, opacity: 0.55,
        borderRadius: 1, pointerEvents: "none",
      }} />
      {/* frayed edges */}
      <div style={{ position: "absolute", left: -4, top: 4, bottom: 4, width: 8,
        background: `radial-gradient(circle, ${B.parchmentEdge}, transparent 70%)`, opacity: 0.7 }} />
      <div style={{ position: "absolute", right: -4, top: 4, bottom: 4, width: 8,
        background: `radial-gradient(circle, ${B.parchmentEdge}, transparent 70%)`, opacity: 0.7 }} />
      <HeartSVG style={{ width: 11, height: 11, marginRight: 14, color: B.ink }} color={B.ink} />
      <span style={{
        fontFamily: F.label, fontSize: 14, letterSpacing: "0.32em",
        textTransform: "uppercase", color: B.ink, lineHeight: 1,
      }}>
        The Note You Needed Today
      </span>
      <HeartSVG style={{ width: 11, height: 11, marginLeft: 14, color: B.ink }} color={B.ink} />
    </div>
  );
}

// ─── DO IT ANYWAY denim label ─────────────────────────────────────────────────

function TitleLabel() {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: B.navy, padding: "6px 14px", borderRadius: 2,
      position: "relative",
      boxShadow: "0 2px 4px rgba(0,0,0,0.25)",
    }}>
      <div style={{
        position: "absolute", inset: 3,
        border: `1.2px dashed ${B.parchmentDark}`, opacity: 0.75,
        borderRadius: 1, pointerEvents: "none",
      }} />
      <span style={{
        fontFamily: F.label, fontSize: 13, letterSpacing: "0.28em",
        textTransform: "uppercase", color: B.parchmentLight, lineHeight: 1,
        textShadow: "0 1px 0 rgba(0,0,0,0.3)",
      }}>
        Do It Anyway
      </span>
      <HeartSVG style={{ width: 10, height: 10 }} color={B.rustLight} />
    </div>
  );
}

// ─── Receipt block (denim-framed) ─────────────────────────────────────────────

export function PostcardReceipt({ style }: { style?: CSSProperties }) {
  const labelStyle: CSSProperties = {
    fontFamily: F.label, fontSize: 8, letterSpacing: "0.10em",
    color: B.ink, flexShrink: 0, width: 38, lineHeight: 1.3,
    textTransform: "uppercase",
  };
  const valueStyle: CSSProperties = {
    fontFamily: F.label, fontSize: 8, color: B.inkSoft, lineHeight: 1.35,
  };
  const row = (label: string, value: string) => (
    <div style={{ display: "flex", gap: 6, paddingBottom: 4 }}>
      <span style={labelStyle}>{label}</span>
      <span style={valueStyle}>{value}</span>
    </div>
  );
  const sep = <div style={{ borderTop: `1px dashed ${B.kraftDeep}`, opacity: 0.55, marginBottom: 4 }} />;

  return (
    <div style={{ position: "relative", padding: 5, background: B.navy, borderRadius: 3,
      boxShadow: "0 3px 8px rgba(0,0,0,0.25)", ...style }}>
      {/* denim border with stitch */}
      <div style={{ position: "absolute", inset: 3,
        border: `1.1px dashed ${B.parchmentDark}`, opacity: 0.7, borderRadius: 2, pointerEvents: "none" }} />
      <div style={{
        background: B.parchmentLight,
        padding: "9px 11px 7px",
        borderRadius: 2,
        boxShadow: "inset 0 0 0 0.5px rgba(120,90,50,0.25)",
      }}>
        {row("FROM:", POSTCARD_RECEIPT.from)}
        {sep}
        {row("TO:", POSTCARD_RECEIPT.to)}
        {sep}
        {row("DATE:", POSTCARD_RECEIPT.date)}
        {sep}
        <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
          <span style={labelStyle}>TOTAL:</span>
          <span style={valueStyle}>{POSTCARD_RECEIPT.total}</span>
          <HeartOutline style={{ width: 10, height: 10, marginLeft: "auto", flexShrink: 0 }} color={B.rust} />
        </div>
      </div>
    </div>
  );
}

// ─── MAD stitched patch ───────────────────────────────────────────────────────

function MadPatch({ style }: { style?: CSSProperties }) {
  return (
    <div style={{
      position: "relative",
      background: `linear-gradient(180deg, ${B.parchmentLight}, ${B.parchmentDark})`,
      padding: "6px 14px",
      borderRadius: 2,
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      ...style,
    }}>
      <div style={{
        position: "absolute", inset: 2,
        border: `1px dashed ${B.kraftDeep}`, opacity: 0.6,
        borderRadius: 1, pointerEvents: "none",
      }} />
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{
          fontFamily: F.note, fontSize: 17, color: B.ink, lineHeight: 1, letterSpacing: "0.08em",
        }}>MAD</span>
        <HeartOutline style={{ width: 9, height: 9 }} color={B.rust} />
      </div>
    </div>
  );
}

// ─── Wax-seal heart ───────────────────────────────────────────────────────────

function WaxSeal({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 60 56" style={style} aria-hidden="true">
      <defs>
        <radialGradient id="waxg" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#3b4d76" />
          <stop offset="60%" stopColor={B.navy} />
          <stop offset="100%" stopColor={B.navyDeep} />
        </radialGradient>
      </defs>
      <path d="M30 50 L6 27 C6 14 18 9 30 19 C42 9 54 14 54 27 Z" fill="url(#waxg)" />
      {/* edge highlight */}
      <path d="M30 50 L6 27 C6 14 18 9 30 19 C42 9 54 14 54 27 Z" fill="none"
        stroke="#0a0e1c" strokeWidth="0.8" opacity="0.7" />
      {/* inner gold heart */}
      <path d="M30 38 L18 27 C18 21 24 19 30 24 C36 19 42 21 42 27 Z"
        fill="none" stroke={B.gold} strokeWidth="1.6" strokeLinejoin="round" />
      {/* shine */}
      <ellipse cx="22" cy="22" rx="6" ry="3" fill="#fff" opacity="0.18" />
    </svg>
  );
}

// ─── Panels ───────────────────────────────────────────────────────────────────

function Panel({
  side, children,
}: { side: "left" | "right"; children: ReactNode }) {
  return (
    <div style={{
      position: "absolute",
      top: 56, bottom: 78,
      [side === "left" ? "left" : "right"]: 30,
      width: "calc(50% - 46px)",
      padding: 0,
      zIndex: 3,
    }}>
      {children}
    </div>
  );
}

// ─── Main canvas ──────────────────────────────────────────────────────────────

export const PostcardCanvas = forwardRef<HTMLDivElement, Record<string, unknown>>(
  function PostcardCanvas(_props, ref) {
    const noteTextStyle: CSSProperties = {
      fontFamily: F.note,
      fontSize: 10.2,
      lineHeight: 1.5,
      color: B.ink,
      whiteSpace: "pre-wrap",
      margin: 0,
    };

    return (
      <div
        ref={ref}
        style={{
          width: 720, height: 450, position: "relative", overflow: "hidden",
          background: "#3a2a1a",
          borderRadius: 6,
          boxShadow: "0 10px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)",
          flexShrink: 0,
        }}
      >
        {/* ── DENIM + RUST FABRIC BACKDROP ────────────────────── */}
        {/* Full denim base */}
        <div style={{ position: "absolute", inset: 0,
          background: `repeating-linear-gradient(0deg, ${B.navy} 0 3px, ${B.navyLight} 3px 4px),
                       repeating-linear-gradient(90deg, ${B.navyDeep} 0 3px, transparent 3px 4px)`,
          backgroundBlendMode: "multiply" }} />
        {/* Rust patch top-right */}
        <div style={{ position: "absolute", top: -10, right: -10, width: 200, height: 130,
          background: `repeating-linear-gradient(0deg, ${B.rust} 0 3px, ${B.rustLight} 3px 4px)`,
          transform: "rotate(-3deg)", boxShadow: "0 4px 10px rgba(0,0,0,0.3)" }} />
        {/* Rust patch bottom-right */}
        <div style={{ position: "absolute", bottom: -10, right: -10, width: 220, height: 160,
          background: `repeating-linear-gradient(0deg, ${B.rust} 0 3px, ${B.rustLight} 3px 4px)`,
          transform: "rotate(2deg)" }} />
        {/* Denim corner patch top-left */}
        <div style={{ position: "absolute", top: -15, left: -15, width: 180, height: 180,
          background: `repeating-linear-gradient(0deg, ${B.denim} 0 3px, ${B.navyLight} 3px 4px)`,
          transform: "rotate(-5deg)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(255,255,255,0.05)" }}>
          {/* visible stitching */}
          <div style={{ position: "absolute", inset: 10,
            border: `1.2px dashed ${B.parchmentDark}`, opacity: 0.6 }} />
        </div>

        {/* ── PARCHMENT PAPER (the two-page spread) ─────────── */}
        <div style={{
          position: "absolute", top: 18, left: 28, right: 28, bottom: 100,
          background: `linear-gradient(180deg, ${B.parchmentLight} 0%, ${B.parchment} 50%, ${B.parchmentDark} 100%)`,
          boxShadow: "0 6px 18px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(120,90,50,0.2)",
        }}>
          {/* paper texture */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse 60% 40% at 25% 30%, rgba(255,250,235,0.5) 0%, transparent 60%),
                         radial-gradient(ellipse 50% 60% at 80% 70%, rgba(180,150,100,0.18) 0%, transparent 60%),
                         radial-gradient(ellipse 30% 20% at 50% 95%, rgba(120,90,50,0.18) 0%, transparent 70%)` }} />
          {/* center fold seam */}
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: 2, background: `linear-gradient(180deg, ${B.parchmentEdge}, ${B.kraftDark}, ${B.parchmentEdge})`,
            opacity: 0.45 }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "calc(50% + 2px)", width: 14,
            background: "linear-gradient(90deg, rgba(60,40,20,0.18), transparent)" }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, right: "calc(50% + 2px)", width: 14,
            background: "linear-gradient(270deg, rgba(60,40,20,0.10), transparent)" }} />
          {/* deckle edges */}
          <div style={{ position: "absolute", inset: -1, border: `1px solid ${B.parchmentEdge}`, opacity: 0.5,
            pointerEvents: "none" }} />
        </div>

        {/* ── HEADER STRIP ───────────────────────────────────── */}
        <HeaderStrip />

        {/* ── BOTANICALS & TAPE ─────────────────────────────── */}
        <LavenderSprig style={{ position: "absolute", top: 50, right: 36, width: 26, height: 95,
          transform: "rotate(8deg)", zIndex: 4 }} />
        <TapeStrip style={{ position: "absolute", top: 122, right: 38, width: 22, height: 10,
          transform: "rotate(-12deg)", zIndex: 5 }} />

        <DriedFlower style={{ position: "absolute", top: 195, left: 8, width: 52, height: 70,
          transform: "rotate(-8deg)", zIndex: 4 }} />
        <BabysBreath style={{ position: "absolute", top: 110, left: 14, width: 30, height: 70,
          transform: "rotate(8deg)", zIndex: 4, opacity: 0.9 }} />
        <TapeStrip style={{ position: "absolute", top: 200, left: 20, width: 22, height: 10,
          transform: "rotate(15deg)", zIndex: 5 }} />

        {/* Doily peek bottom-right */}
        <Doily style={{ position: "absolute", bottom: 86, right: 30, width: 78, height: 78,
          opacity: 0.55, zIndex: 2 }} />

        {/* ── LEFT PANEL ─────────────────────────────────────── */}
        <Panel side="left">
          <div style={{ marginBottom: 10 }}>
            <TitleLabel />
          </div>
          <p style={noteTextStyle}>{POSTCARD_LEFT}</p>
        </Panel>

        {/* ── RIGHT PANEL ────────────────────────────────────── */}
        <Panel side="right">
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <p style={noteTextStyle}>{POSTCARD_RIGHT}</p>
            <div style={{ flexGrow: 1, minHeight: 6 }} />
            <PostcardReceipt />
          </div>
        </Panel>

        {/* ── ENVELOPE BASE ──────────────────────────────────── */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 110, zIndex: 6 }}>
          <svg viewBox="0 0 720 110" preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            aria-hidden="true">
            <defs>
              <linearGradient id="kraftG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={B.kraftLight} />
                <stop offset="100%" stopColor={B.kraftDark} />
              </linearGradient>
              <linearGradient id="flapG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={B.kraft} />
                <stop offset="100%" stopColor={B.kraftDeep} />
              </linearGradient>
            </defs>
            {/* Envelope body */}
            <rect x="0" y="20" width="720" height="90" fill="url(#kraftG)" />
            {/* Big front flap (V shape rising up to meet center seal) */}
            <polygon points="0,20 360,90 720,20 720,110 0,110" fill="url(#flapG)" />
            {/* Flap edge highlight */}
            <polyline points="0,20 360,90 720,20" fill="none" stroke={B.kraftDeep} strokeWidth="1.2" opacity="0.75" />
            {/* subtle texture noise lines */}
            {[...Array(20)].map((_, i) => (
              <line key={i} x1="0" y1={20 + i * 4.5} x2="720" y2={20 + i * 4.5}
                stroke={B.kraftDeep} strokeWidth="0.3" opacity="0.08" />
            ))}
          </svg>

          {/* Wax seal heart sitting on top of flap apex */}
          <div style={{ position: "absolute", left: "50%", bottom: 38, transform: "translateX(-50%)" }}>
            <WaxSeal style={{ width: 44, height: 42,
              filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.45))" }} />
          </div>

          {/* Domain label */}
          <div style={{
            position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
            display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
          }}>
            <HeartSVG style={{ width: 9, height: 9 }} color={B.rust} />
            <span style={{
              fontFamily: F.note, fontSize: 13, letterSpacing: "0.04em",
              color: B.parchmentLight, lineHeight: 1,
              textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            }}>
              thenoteyouneeded.today
            </span>
            <HeartSVG style={{ width: 9, height: 9 }} color={B.rust} />
          </div>

          {/* MAD signature patch — bottom-right corner of envelope */}
          <div style={{ position: "absolute", right: 18, bottom: 14, transform: "rotate(-3deg)" }}>
            <MadPatch />
          </div>
        </div>

      </div>
    );
  },
);
