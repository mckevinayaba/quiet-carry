import type { CSSProperties, ReactNode } from "react";

import {
  DenimHeart,
  ENVELOPE_TOKENS as B,
  HeartSVG,
  LavenderBundle,
  PostcardSignature,
  Tape,
} from "@/components/postcard-canvas";

// ---------------------------------------------------------------------------
// EnvelopeLetterFrame — the responsive, website-safe version of the kraft
// envelope + stitched-letter aesthetic that powers the shareable postcards
// (see postcard-canvas.tsx). Same atoms, fluid layout instead of a fixed
// 432x540 export canvas.
// ---------------------------------------------------------------------------

export function EnvelopeLetterFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        background: `linear-gradient(160deg, ${B.kraftLight} 0%, ${B.kraft} 55%, ${B.kraftDark} 100%)`,
        borderRadius: "16px",
        padding: "32px 16px 40px",
        boxShadow: "0 16px 48px rgba(60,30,10,0.22), inset 0 1px 0 rgba(255,240,200,0.25)",
      }}
    >
      {/* Paper grain */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "16px",
          pointerEvents: "none",
          background: [
            "radial-gradient(ellipse 60% 40% at 25% 20%, rgba(255,248,225,0.22) 0%, transparent 70%)",
            "radial-gradient(ellipse 45% 50% at 78% 70%, rgba(255,248,225,0.16) 0%, transparent 65%)",
          ].join(", "),
        }}
      />

      {/* Decorative tape — top corners */}
      <Tape
        w={44}
        h={14}
        style={{
          position: "absolute",
          top: 10,
          left: 18,
          transform: "rotate(-7deg)",
          opacity: 0.9,
        }}
      />
      <Tape
        w={38}
        h={13}
        style={{
          position: "absolute",
          top: 6,
          right: 28,
          transform: "rotate(6deg)",
          opacity: 0.85,
        }}
      />

      {/* Dried lavender — right edge */}
      <LavenderBundle
        style={{
          position: "absolute",
          top: "18%",
          right: "-2%",
          width: "44px",
          height: "92px",
          opacity: 0.8,
        }}
      />

      {/* The letter itself */}
      <div
        style={{
          position: "relative",
          background: "#FFFFFF",
          borderRadius: "10px",
          boxShadow: "0 6px 28px rgba(44,36,32,0.14)",
        }}
      >
        {children}
      </div>

      {/* Denim heart — wax seal straddling the bottom edge */}
      <DenimHeart
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          width: "40px",
          height: "36px",
          filter: "drop-shadow(0 3px 7px rgba(20,30,60,0.4))",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Heart-flanked masthead — "♡ THE NOTE YOU NEEDED TODAY ♡"
// ---------------------------------------------------------------------------

export function EnvelopeMasthead({ style }: { style?: CSSProperties }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        ...style,
      }}
    >
      <HeartSVG style={{ width: 10, height: 10, color: B.accent, flexShrink: 0 }} />
      <span
        style={{
          fontFamily: "ui-monospace, 'Courier New', monospace",
          fontSize: "clamp(9.5px, 3vw, 12px)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: B.ink,
          whiteSpace: "nowrap",
        }}
      >
        The Note You Needed Today
      </span>
      <HeartSVG style={{ width: 10, height: 10, color: B.accent, flexShrink: 0 }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAD signature patch — drop-in for the plain italic "MAD" text
// ---------------------------------------------------------------------------

export function EnvelopeSignature({ style }: { style?: CSSProperties }) {
  return <PostcardSignature style={{ width: "64px", display: "block", ...style }} />;
}
