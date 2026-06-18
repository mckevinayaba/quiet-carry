/**
 * Full Note Portrait Postcard — 4:5
 *
 * DOM: 432×540  →  Export: 1080×1350 (pixelRatio 2.5)
 *
 * Layout zones (canvas y-coordinates):
 *   0   –  44   Header strip (kraft, stitched brand name)
 *   44  –  78   Title area   (DO IT ANYWAY label)
 *   78  – 404   Content area (two columns of note text, overflow hidden)
 *   404 – 494   Receipt zone (4 rows, absolute, always visible)
 *   494 – 540   Envelope base (46px)
 *
 * Receipt right padding reserves 68px for MAD patch (no overlap).
 * Text columns use overflow:hidden — never push receipt off-screen.
 *
 * Font readability at export:
 *   9px DOM × 2.5 = 22.5px in PNG
 *   On Instagram mobile (612px display from 1080px PNG): ~12.7px  ✓ readable
 *   Receipt 8.5px DOM × 2.5 = 21.25px PNG → ~12px on mobile  ✓
 */

import { forwardRef } from "react";
import type { CSSProperties } from "react";
import type { NoteEntry } from "@/lib/note-data";

// Split mainText into two roughly equal halves by paragraph for the two columns
function splitNoteForColumns(mainText: string): [string, string] {
  const paragraphs = mainText.split("\n\n");
  if (paragraphs.length <= 2) return [mainText, ""];
  const mid = Math.ceil(paragraphs.length / 2);
  return [paragraphs.slice(0, mid).join("\n\n"), paragraphs.slice(mid).join("\n\n")];
}

// ─── Brand tokens ──────────────────────────────────────────────────────────────

const B = {
  parchment:      "#f4eddc",
  parchmentLight: "#faf5ea",
  parchmentDark:  "#e8dcc8",
  kraft:          "#c9a96e",
  kraftLight:     "#d6b87a",
  kraftDark:      "#b8935a",
  kraftDeep:      "#9e7840",
  ink:            "#2e2010",
  inkMuted:       "#6b5540",
  inkFaint:       "#a08060",
  accent:         "#8b4513",
  receiptBg:      "#fdf7ec",
  navy:           "#1a2d4a",
  navyMid:        "#243b5e",
  rust:           "#7a3020",
  rustMid:        "#9b4530",
  denim:          "#2d4a6e",
  denimLight:     "#3d5e8a",
} as const;

const F = {
  display: "var(--font-display)",
  note:    "var(--font-note)",
  label:   "var(--font-label)",
} as const;

// ─── Note text ─────────────────────────────────────────────────────────────────

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
  from:  "Every room where your pain was visible but your effort was ignored.",
  to:    "The part of you that keeps rising without applause.",
  date:  "The day you stop waiting for familiar people to confirm your worth.",
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

function NavyPatch({ w, h, style }: { w: number; h: number; style?: CSSProperties }) {
  const xs = Array.from({ length: Math.ceil(w / 5) + 1 }, (_, i) => i * 5);
  const ys = Array.from({ length: Math.ceil(h / 5) + 1 }, (_, i) => i * 5);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={style} aria-hidden="true">
      <rect width={w} height={h} fill={B.navy} rx="2" />
      {ys.map(y => <line key={`h${y}`} x1="0" y1={y} x2={w} y2={y} stroke={B.navyMid} strokeWidth="0.6" opacity="0.5" />)}
      {xs.map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2={h} stroke={B.navyMid} strokeWidth="0.6" opacity="0.5" />)}
      <rect x="2.5" y="2.5" width={w-5} height={h-5} fill="none" stroke="rgba(210,200,190,0.5)" strokeWidth="1" strokeDasharray="3.5 2.5" rx="1" />
      <rect x="5" y="5" width={w-10} height={h-10} fill="none" stroke="rgba(210,200,190,0.22)" strokeWidth="0.6" strokeDasharray="3 4" rx="1" />
    </svg>
  );
}

function RustPatch({ w, h, style }: { w: number; h: number; style?: CSSProperties }) {
  const xs = Array.from({ length: Math.ceil(w / 6) + 1 }, (_, i) => i * 6);
  const ys = Array.from({ length: Math.ceil(h / 6) + 1 }, (_, i) => i * 6);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={style} aria-hidden="true">
      <rect width={w} height={h} fill={B.rust} rx="2" />
      {ys.map(y => <line key={`h${y}`} x1="0" y1={y} x2={w} y2={y} stroke={B.rustMid} strokeWidth="0.5" opacity="0.45" />)}
      {xs.map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2={h} stroke={B.rustMid} strokeWidth="0.5" opacity="0.45" />)}
      <rect x="2.5" y="2.5" width={w-5} height={h-5} fill="none" stroke="rgba(240,200,180,0.4)" strokeWidth="0.8" strokeDasharray="3 2.5" rx="1" />
    </svg>
  );
}

function LavenderBundle({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 90" style={style} aria-hidden="true">
      {[14,18,22,26,30].map((x,i) => (
        <line key={`s${i}`} x1={x} y1="84" x2={x+(i-2)*1.2} y2="14" stroke="#6b7a4a" strokeWidth="1" opacity={0.65+i*0.05} />
      ))}
      <path d="M12,66 Q20,70 28,66" fill="none" stroke="#9b8050" strokeWidth="1.4" />
      {([
        [14,[16,22,28]], [18,[11,17,23,29]], [22,[9,15,21,27,33]],
        [26,[11,17,23,29]], [30,[16,22,28]],
      ] as [number, number[]][]).map(([x,ys],si) =>
        ys.map((y,bi) => (
          <ellipse key={`b${si}${bi}`}
            cx={x+(bi%2===0?-2.5:2.5)} cy={y} rx="2" ry="4"
            fill="oklch(0.62 0.13 280)" opacity={0.68+bi*0.04}
          />
        ))
      )}
    </svg>
  );
}

function PressedChrysanthemum({ style }: { style?: CSSProperties }) {
  const outer = Array.from({ length: 14 }, (_, i) => i * (360/14));
  const inner = Array.from({ length: 10 }, (_, i) => i * 36);
  return (
    <svg viewBox="0 0 52 60" style={style} aria-hidden="true">
      <line x1="26" y1="56" x2="26" y2="36" stroke="#5a6e3a" strokeWidth="1.3" />
      <ellipse cx="19" cy="49" rx="5" ry="8" fill="#5a6e3a" opacity="0.4" transform="rotate(-18 19 49)" />
      <ellipse cx="33" cy="44" rx="4" ry="7" fill="#5a6e3a" opacity="0.35" transform="rotate(18 33 44)" />
      {outer.map((deg,i) => {
        const r=(deg*Math.PI)/180;
        const cx=26+13*Math.cos(r), cy=24+13*Math.sin(r);
        return <ellipse key={`o${i}`} cx={cx} cy={cy} rx="4" ry="2" fill="#9b5a2a" opacity="0.52" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      {inner.map((deg,i) => {
        const r=(deg*Math.PI)/180;
        const cx=26+8*Math.cos(r), cy=24+8*Math.sin(r);
        return <ellipse key={`ip${i}`} cx={cx} cy={cy} rx="3" ry="1.6" fill="#b06830" opacity="0.65" transform={`rotate(${deg} ${cx} ${cy})`} />;
      })}
      <circle cx="26" cy="24" r="3.5" fill="#6b3a18" opacity="0.8" />
      <circle cx="26" cy="24" r="1.8" fill="#8b5020" opacity="0.9" />
    </svg>
  );
}

function Tape({ w, h, style }: { w: number; h: number; style?: CSSProperties }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={style} aria-hidden="true">
      <rect width={w} height={h} fill="rgba(220,205,170,0.55)" />
      {Array.from({ length: Math.ceil(w/5) }, (_,i) => (
        <line key={i} x1={i*5} y1="0" x2={i*5+2} y2={h} stroke="rgba(180,160,120,0.22)" strokeWidth="0.7" />
      ))}
      <rect width={w} height={h} fill="none" stroke="rgba(180,160,120,0.3)" strokeWidth="0.5" />
    </svg>
  );
}

function PostageStamp({ style }: { style?: CSSProperties }) {
  const perf = (count: number, total: number, axis: "h"|"v", pos: number) =>
    Array.from({ length: count }, (_, i) => {
      const p = (i/(count-1))*total;
      return axis==="h"
        ? <circle key={i} cx={p} cy={pos} r="1.8" fill={B.parchment} />
        : <circle key={i} cx={pos} cy={p} r="1.8" fill={B.parchment} />;
    });
  return (
    <svg viewBox="0 0 42 54" style={style} aria-hidden="true">
      <rect x="3" y="3" width="36" height="48" fill={B.parchmentDark} />
      <rect x="5.5" y="5.5" width="31" height="43" fill="none" stroke={B.inkFaint} strokeWidth="0.6" />
      {perf(8,36,"h",3)} {perf(8,36,"h",51)}
      {perf(8,48,"v",3)} {perf(8,48,"v",39)}
      {[0,51,102,153,204,255,306].map((deg,i) => {
        const r=(deg*Math.PI)/180;
        return <ellipse key={i} cx={21+7*Math.cos(r)} cy={25+7*Math.sin(r)} rx="2.8" ry="1.4"
          fill={B.accent} opacity="0.4" transform={`rotate(${deg} ${21+7*Math.cos(r)} ${25+7*Math.sin(r)})`} />;
      })}
      <circle cx="21" cy="25" r="3.5" fill={B.accent} opacity="0.55" />
      <text x="21" y="41" textAnchor="middle" fontFamily={F.label} fontSize="4.5" fill={B.inkMuted} letterSpacing="0.4">20¢</text>
    </svg>
  );
}

function DenimHeart({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 48 44" style={style} aria-hidden="true">
      <path d="M24 40 L3 20 C3 10 13 6 24 14 C35 6 45 10 45 20 Z" fill={B.denim} />
      {[0,5,10,15,20,25,30,35,40,45].flatMap(n => [
        <line key={`h${n}`} x1="0" y1={n} x2="48" y2={n} stroke={B.denimLight} strokeWidth="0.45" opacity="0.28" />,
        <line key={`v${n}`} x1={n} y1="0" x2={n} y2="44" stroke={B.denimLight} strokeWidth="0.45" opacity="0.28" />,
      ])}
      <path d="M24 40 L3 20 C3 10 13 6 24 14 C35 6 45 10 45 20 Z"
        fill="none" stroke="rgba(220,215,210,0.6)" strokeWidth="1.2" strokeDasharray="2.5 2" />
      <line x1="19" y1="21" x2="29" y2="27" stroke="#c8a050" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="29" y1="21" x2="19" y2="27" stroke="#c8a050" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ─── Receipt ───────────────────────────────────────────────────────────────────

export function PostcardReceipt({
  from, to, date, total, style,
}: {
  from?: string; to?: string; date?: string; total?: string;
  style?: CSSProperties;
}) {
  const rowStyle: CSSProperties = { display: "flex", gap: "5px", alignItems: "flex-start" };
  const labelStyle: CSSProperties = {
    fontFamily: F.label,
    fontSize: "9px",
    letterSpacing: "0.10em",
    color: B.navy,
    flexShrink: 0,
    minWidth: "44px",
    lineHeight: 1.35,
    textTransform: "uppercase",
    fontWeight: 700,
  };
  const valStyle: CSSProperties = {
    fontFamily: F.label,
    fontSize: "9px",
    fontWeight: 600,
    color: "#3a2510",
    lineHeight: 1.4,
  };
  const sep = <div style={{ margin: "3px 0", borderTop: "1px dashed rgba(100,60,20,0.2)" }} />;

  return (
    <div style={{
      background: B.receiptBg,
      border: "1.8px dashed rgba(26,45,74,0.40)",
      borderRadius: "3px",
      padding: "7px 10px 5px",
      boxShadow: "inset 0 0 0 3px rgba(26,45,74,0.07)",
      position: "relative",
      height: "100%",
      boxSizing: "border-box",
      ...style,
    }}>
      <div style={{ position: "absolute", inset: "4px", border: "0.8px dashed rgba(26,45,74,0.13)", borderRadius: "1.5px", pointerEvents: "none" }} />
      <div style={rowStyle}>
        <span style={labelStyle}>FROM:</span>
        <span style={valStyle}>{from ?? POSTCARD_RECEIPT.from}</span>
      </div>
      {sep}
      <div style={rowStyle}>
        <span style={labelStyle}>TO:</span>
        <span style={valStyle}>{to ?? POSTCARD_RECEIPT.to}</span>
      </div>
      {sep}
      <div style={rowStyle}>
        <span style={labelStyle}>DATE:</span>
        <span style={valStyle}>{date ?? POSTCARD_RECEIPT.date}</span>
      </div>
      {sep}
      <div style={rowStyle}>
        <span style={labelStyle}>TOTAL:</span>
        <span style={valStyle}>{total ?? POSTCARD_RECEIPT.total}</span>
      </div>
      <HeartSVG style={{ position: "absolute", bottom: "5px", right: "6px", width: "7px", height: "7px", color: B.accent, opacity: 0.65 }} />
    </div>
  );
}

// ─── Brand header ──────────────────────────────────────────────────────────────

export function PostcardBrandHeader() {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: "44px",
      background: `linear-gradient(180deg, ${B.kraft} 0%, ${B.kraftLight} 52%, ${B.kraftDark} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
      boxShadow: "0 3px 10px rgba(100,60,10,0.2), inset 0 1px 0 rgba(255,240,200,0.28)",
    }}>
      <div style={{ position: "absolute", inset: "3.5px", border: "1.3px dashed rgba(80,50,10,0.33)", borderRadius: "2px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: "6px", border: "0.7px dashed rgba(80,50,10,0.17)", borderRadius: "1px", pointerEvents: "none" }} />
      <HeartSVG style={{ width: 9, height: 9, color: B.accent, flexShrink: 0 }} />
      <span style={{
        fontFamily: F.label, fontSize: "11px", letterSpacing: "0.28em",
        textTransform: "uppercase", color: B.ink, lineHeight: 1,
        textShadow: "0 1px 2px rgba(255,240,200,0.35)",
      }}>
        The Note You Needed Today
      </span>
      <HeartSVG style={{ width: 9, height: 9, color: B.accent, flexShrink: 0 }} />
    </div>
  );
}

// ─── MAD signature patch ───────────────────────────────────────────────────────

export function PostcardSignature({ style }: { style?: CSSProperties }) {
  return (
    <div style={{
      position: "relative",
      background: B.parchmentLight,
      padding: "6px 9px 5px",
      boxShadow: "2px 3px 9px rgba(60,30,10,0.36), 0 1px 3px rgba(60,30,10,0.18)",
      borderRadius: "2px",
      transform: "rotate(-4deg)",
      ...style,
    }}>
      <div style={{ position: "absolute", inset: "3px", border: "1.3px dashed rgba(26,45,74,0.48)", borderRadius: "1px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: "6px", border: "0.6px dashed rgba(26,45,74,0.2)", borderRadius: "1px", pointerEvents: "none" }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
        <span style={{ fontFamily: F.display, fontSize: "21px", letterSpacing: "0.05em", color: B.ink, lineHeight: 1 }}>
          MAD
        </span>
        <svg viewBox="0 0 46 5" aria-hidden="true" style={{ width: "46px", height: "5px" }}>
          <path d="M1,2.5 Q11.5,1 23,2.5 Q34.5,4 45,2.5" fill="none" stroke={B.ink} strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <HeartSVG style={{ width: 8, height: 8, color: B.accent, marginTop: "1px" }} />
      </div>
    </div>
  );
}

// ─── DO IT ANYWAY label ────────────────────────────────────────────────────────

export function TitleLabel({ text = "Do It Anyway" }: { text?: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: B.navy,
      padding: "4.5px 10px 4.5px 9px",
      borderRadius: "2px",
      position: "relative",
      boxShadow: "2px 2px 7px rgba(10,20,40,0.42)",
      maxWidth: "calc(50% - 4px)",
    }}>
      <div style={{ position: "absolute", inset: "3px", border: "1px dashed rgba(180,200,230,0.42)", borderRadius: "1px", pointerEvents: "none" }} />
      <span style={{
        fontFamily: F.label, fontSize: "9px", letterSpacing: "0.18em",
        textTransform: "uppercase", color: "#e8ddd0", lineHeight: 1.2, position: "relative",
        overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
      }}>
        {text}
      </span>
      <HeartSVG style={{ width: 8, height: 8, color: "#d44c30", position: "relative", flexShrink: 0 }} />
    </div>
  );
}

// ─── Main canvas ───────────────────────────────────────────────────────────────

export const PostcardCanvas = forwardRef<HTMLDivElement, { note?: NoteEntry }>(
  function PostcardCanvas({ note }, ref) {

    const [leftText, rightText] = note
      ? splitNoteForColumns(note.mainText)
      : [POSTCARD_LEFT, POSTCARD_RIGHT];

    const titleText = note?.title ?? "Do It Anyway";

    const receiptFrom  = note?.shortReceiptFrom  ?? note?.receiptFrom;
    const receiptTo    = note?.shortReceiptTo    ?? note?.receiptTo;
    const receiptDate  = note?.shortReceiptDate  ?? note?.receiptDate;
    const receiptTotal = note?.shortReceiptTotal ?? note?.receiptTotal;
    const hasReceipt   = !!(receiptFrom || receiptTo || receiptTotal);

    const HEADER    = 44;
    const TITLE_H   = 34;
    const ENV_H     = 46;
    const RECEIPT_H = hasReceipt ? 110 : 0;

    const noteStyle: CSSProperties = {
      fontFamily: F.note,
      fontSize: "9px",
      fontWeight: 600,
      lineHeight: 1.48,
      color: "#1a0e06",
      whiteSpace: "pre-wrap",
    };

    return (
      <div
        ref={ref}
        style={{
          width: "432px",
          height: "540px",
          position: "relative",
          overflow: "hidden",
          background: B.parchment,
          borderRadius: "5px",
          boxShadow: "0 10px 48px rgba(60,30,10,0.3), 0 2px 8px rgba(60,30,10,0.15)",
          flexShrink: 0,
        }}
      >
        {/* Paper texture */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: [
            "radial-gradient(ellipse 60% 40% at 30% 48%, rgba(255,248,225,0.32) 0%, transparent 70%)",
            "radial-gradient(ellipse 45% 50% at 72% 30%, rgba(255,248,225,0.22) 0%, transparent 65%)",
            "linear-gradient(155deg, rgba(255,252,240,0.12) 0%, transparent 50%, rgba(200,170,120,0.07) 100%)",
          ].join(", "),
        }} />

        {/* Navy fabric corner — top-left */}
        <NavyPatch w={72} h={72} style={{ position: "absolute", top: -8, left: -8, width: 72, height: 72, transform: "rotate(-5deg)", opacity: 0.86 }} />

        {/* Rust fabric corner — top-right */}
        <RustPatch w={58} h={46} style={{ position: "absolute", top: -5, right: -6, width: 58, height: 46, transform: "rotate(6deg)", opacity: 0.8 }} />

        {/* Rust fabric corner — bottom-left */}
        <RustPatch w={50} h={40} style={{ position: "absolute", bottom: 28, left: -6, width: 50, height: 40, transform: "rotate(-3deg)", opacity: 0.68 }} />

        {/* Tape strips */}
        <Tape w={28} h={8} style={{ position: "absolute", top: HEADER + 6, left: 12, transform: "rotate(-8deg)", opacity: 0.88 }} />
        <Tape w={24} h={7} style={{ position: "absolute", top: HEADER + 3, right: 26, transform: "rotate(7deg)", opacity: 0.82 }} />

        {/* Chrysanthemum — left edge */}
        <PressedChrysanthemum style={{ position: "absolute", top: HEADER + 10, left: 4, width: 40, height: 48, opacity: 0.8 }} />

        {/* Lavender bundle — right edge */}
        <LavenderBundle style={{ position: "absolute", top: HEADER - 2, right: 3, width: 36, height: 76, opacity: 0.78 }} />

        {/* Postage stamp — bottom-left */}
        <PostageStamp style={{ position: "absolute", bottom: ENV_H + 4, left: 14, width: 32, height: 41, opacity: 0.82 }} />

        {/* Brand header */}
        <PostcardBrandHeader />

        {/* Title area */}
        <div style={{
          position: "absolute", top: `${HEADER}px`, left: 0, right: 0, height: `${TITLE_H}px`,
          display: "flex", alignItems: "center", paddingLeft: "52px",
        }}>
          <TitleLabel text={titleText} />
        </div>

        {/* Center fold line */}
        <div style={{
          position: "absolute", top: `${HEADER}px`, bottom: `${ENV_H}px`,
          left: "calc(50% - 1px)", width: "2px",
          background: `linear-gradient(180deg, ${B.kraftDark}99 0%, ${B.kraftDark}66 30%, ${B.kraftDark}66 70%, ${B.kraftDark}99 100%)`,
          opacity: 0.45,
        }} />
        <div style={{
          position: "absolute", top: `${HEADER}px`, bottom: `${ENV_H}px`,
          left: "50%", width: "12px",
          background: "linear-gradient(90deg, rgba(60,30,10,0.08) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* LEFT text column — overflow hidden at receipt boundary */}
        <div style={{
          position: "absolute",
          top: `${HEADER + TITLE_H}px`,
          left: 0,
          width: "calc(50% - 1px)",
          bottom: `${ENV_H + RECEIPT_H}px`,
          padding: "6px 10px 6px 18px",
          overflow: "hidden",
        }}>
          <p style={noteStyle}>{leftText}</p>
        </div>

        {/* RIGHT text column — overflow hidden at receipt boundary */}
        <div style={{
          position: "absolute",
          top: `${HEADER + TITLE_H}px`,
          right: 0,
          width: "calc(50% - 1px)",
          bottom: `${ENV_H + RECEIPT_H}px`,
          padding: "6px 16px 6px 10px",
          overflow: "hidden",
        }}>
          <p style={noteStyle}>{rightText}</p>
        </div>

        {/* Receipt — only shown when note has receipt data */}
        {hasReceipt && (
          <div style={{
            position: "absolute",
            bottom: `${ENV_H}px`,
            left: 0, right: 0,
            height: `${RECEIPT_H}px`,
            padding: "0 68px 0 14px",
          }}>
            <PostcardReceipt
              from={receiptFrom} to={receiptTo}
              date={receiptDate} total={receiptTotal}
            />
          </div>
        )}

        {/* Envelope base */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: `${ENV_H}px`,
          background: B.kraft,
          boxShadow: "inset 0 2px 8px rgba(60,30,10,0.14)",
        }}>
          <svg viewBox="0 0 432 46" preserveAspectRatio="none"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            aria-hidden="true"
          >
            <polygon points="0,0 216,46 0,46" fill={B.kraftDark} opacity="0.65" />
            <polygon points="432,0 216,46 432,46" fill={B.kraftDark} opacity="0.65" />
            <line x1="1" y1="0" x2="215" y2="46" stroke={B.kraftDeep} strokeWidth="0.7" opacity="0.5" />
            <line x1="431" y1="0" x2="217" y2="46" stroke={B.kraftDeep} strokeWidth="0.7" opacity="0.5" />
          </svg>
          <div style={{ position: "absolute", top: "3px", left: "7px", right: "7px", borderTop: "1px dashed rgba(80,50,10,0.28)" }} />
          <div style={{
            position: "absolute", bottom: "7px", left: "50%", transform: "translateX(-50%)",
            background: B.parchmentDark, border: "1px solid rgba(100,60,20,0.33)",
            borderRadius: "999px", padding: "2px 10px",
            display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap",
            boxShadow: "0 1px 4px rgba(60,30,10,0.18)",
          }}>
            <HeartSVG style={{ width: 5, height: 5, color: B.accent }} />
            <span style={{ fontFamily: F.label, fontSize: "6px", letterSpacing: "0.13em", color: B.inkMuted }}>
              thenoteyouneeded.today
            </span>
            <HeartSVG style={{ width: 5, height: 5, color: B.accent }} />
          </div>
        </div>

        {/* Denim heart — center fold, envelope edge */}
        <DenimHeart style={{
          position: "absolute", bottom: "18px", left: "50%", transform: "translateX(-50%)",
          width: "36px", height: "32px",
          filter: "drop-shadow(0 2px 5px rgba(20,30,60,0.32))",
        }} />

        {/* MAD signature patch
            Receipt right edge: 432 - 68 = 364px from left
            MAD left: 432 - 10 - 60 = 362px → ~2px gap, no overlap ✓ */}
        <PostcardSignature style={{
          position: "absolute",
          bottom: `${ENV_H + 2}px`,
          right: "10px",
          width: "60px",
        }} />

      </div>
    );
  },
);
