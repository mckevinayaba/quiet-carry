import { forwardRef } from "react";
import type { CSSProperties, ReactNode } from "react";

import { getCategoryBySlug, type NoteEntry } from "@/lib/note-data";
import { buildShareText } from "@/lib/share";

// ─── Constants ────────────────────────────────────────────────────────────────

export const PRODUCT_DOMAIN = "thenoteyouneeded.today";
export const PRODUCT_URL = "https://thenoteyouneeded.today/";

export const B = {
  parchment: "#f7f1e8",
  cream: "#fff9f2",
  kraft: "oklch(0.86 0.036 72)",
  kraftDark: "oklch(0.78 0.044 68)",
  ink: "oklch(0.28 0.03 55)",
  inkMuted: "oklch(0.52 0.04 55)",
  inkFaint: "oklch(0.70 0.03 58)",
  accent: "oklch(0.48 0.1 50)",
  accentBorder: "oklch(0.68 0.08 52 / 0.32)",
} as const;

export const F = {
  display: "var(--font-display)",
  note: "var(--font-note)",
  label: "var(--font-label)",
} as const;

export type PresetId = "A" | "B" | "C" | "D" | "E" | "F";

export interface PresetMeta {
  id: PresetId;
  label: string;
  sub: string;
  ratio: string | null;
}

export const PRESETS: PresetMeta[] = [
  { id: "A", label: "Send Quietly",       sub: "WhatsApp · SMS · Email",   ratio: null   },
  { id: "B", label: "WhatsApp Status",    sub: "Vertical story",            ratio: "9:16" },
  { id: "C", label: "Instagram Story",    sub: "Vertical story",            ratio: "9:16" },
  { id: "D", label: "Instagram Square",   sub: "Square post",               ratio: "1:1"  },
  { id: "E", label: "LinkedIn Portrait",  sub: "Editorial portrait",        ratio: "4:5"  },
  { id: "F", label: "Pinterest Pin",      sub: "Tall poster",               ratio: "2:3"  },
];

// Preset IDs that support PNG download
export const DOWNLOADABLE_PRESETS: PresetId[] = ["B", "C", "D", "E", "F"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatBrandedShareText(note: NoteEntry): string {
  return buildShareText(note.sendableText);
}

export function getExcerpt(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const candidate = text.slice(0, maxChars);
  const lastNewline = candidate.lastIndexOf("\n");
  const lastPeriod  = candidate.lastIndexOf(".");
  const lastSpace   = candidate.lastIndexOf(" ");
  const natural = Math.max(lastNewline, lastPeriod);
  const cut = natural > 40 ? natural : lastSpace;
  return (cut > 0 ? candidate.slice(0, cut + 1) : candidate).trimEnd() + "…";
}

export function getCategoryLabel(note: NoteEntry): string {
  return getCategoryBySlug(note.categorySlug)?.title ?? note.categorySlug;
}

/** Caption for image posts — separate from private share text. */
export function buildCaptionText(note: NoteEntry): string {
  return [
    "The Note You Needed Today",
    "",
    note.title,
    "",
    "Find words for what you carry quietly:",
    PRODUCT_URL,
    "",
    "#TheNoteYouNeededToday #SmallNotesForQuietThings",
  ].join("\n");
}

/** Build a clean download filename for a preset export. */
export function buildFilename(note: NoteEntry, preset: PresetId): string {
  const noteSlug = note.id.replace(/^note-/, "");
  const presetSlug: Record<PresetId, string> = {
    A: "private-text",
    B: "whatsapp-status",
    C: "instagram-story",
    D: "instagram-square",
    E: "linkedin-portrait",
    F: "pinterest-pin",
  };
  return `the-note-you-needed-today-${noteSlug}-${presetSlug[preset]}.png`;
}

// ─── Atoms ────────────────────────────────────────────────────────────────────

export function CtaDomain() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <span
        style={{
          fontFamily: F.label,
          fontSize: "0.38rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: B.inkFaint,
          lineHeight: 1,
        }}
      >
        Read the full note at
      </span>
      <span
        style={{
          fontFamily: F.label,
          fontSize: "0.42rem",
          letterSpacing: "0.12em",
          color: B.inkMuted,
          lineHeight: 1,
        }}
      >
        {PRODUCT_DOMAIN}
      </span>
    </div>
  );
}

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
      <span
        style={{
          fontFamily: F.label,
          fontSize: "0.42rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: B.inkMuted,
          lineHeight: 1,
        }}
      >
        MAD
      </span>
      <HeartSVG style={{ width: 5, height: 5, color: B.accent }} />
    </div>
  );
}

// ─── Canvas Shell (bare aspect-ratio container, ref-forwarded) ────────────────

interface CanvasShellProps {
  cssRatio: string;
  maxWidth: number;
  children: ReactNode;
  bg?: CSSProperties["background"];
}

export const CanvasShell = forwardRef<HTMLDivElement, CanvasShellProps>(
  function CanvasShell({ cssRatio, maxWidth, children, bg }, ref) {
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
          boxShadow:
            "0 6px 28px oklch(0.28 0.03 55 / 0.18), 0 1px 4px oklch(0.28 0.03 55 / 0.08)",
          background: bg ?? B.parchment,
        }}
      >
        {children}
      </div>
    );
  },
);

// ─── Canvases (all ref-forwarded for PNG export) ──────────────────────────────

export const WhatsAppStatusCanvas = forwardRef<HTMLDivElement, { note: NoteEntry }>(
  function WhatsAppStatusCanvas({ note }, ref) {
    return (
      <CanvasShell ref={ref} cssRatio="9/16" maxWidth={272}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            background: B.parchment,
          }}
        >
          <div style={{ background: B.kraft, padding: "0.7rem 1rem 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: F.label, fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: B.ink }}>
                The Note You Needed Today
              </span>
              <HeartSVG style={{ width: 11, height: 11, color: B.accent }} />
            </div>
          </div>
          <svg viewBox="0 0 200 10" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 10, background: B.kraft }} aria-hidden="true">
            <polygon points="0,10 100,0 200,10" fill={B.parchment} />
            <polyline points="0,10 100,0 200,10" fill="none" stroke={B.inkFaint} strokeWidth="0.5" opacity="0.4" />
          </svg>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0.9rem 1.1rem", overflow: "hidden" }}>
            <p style={{ fontFamily: F.label, fontSize: "0.44rem", letterSpacing: "0.13em", textTransform: "uppercase", color: B.inkMuted, marginBottom: "0.6rem", flexShrink: 0 }}>
              {getCategoryLabel(note)}
            </p>
            <p style={{ fontFamily: F.note, fontSize: "0.9rem", lineHeight: 1.18, color: B.ink, whiteSpace: "pre-line", overflow: "hidden" }}>
              {getExcerpt(note.mainText, 420)}
            </p>
          </div>
          <div style={{ padding: "0.55rem 1rem 0.7rem", borderTop: `1px solid ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>
      </CanvasShell>
    );
  },
);

export const InstagramStoryCanvas = forwardRef<HTMLDivElement, { note: NoteEntry }>(
  function InstagramStoryCanvas({ note }, ref) {
    return (
      <CanvasShell
        ref={ref}
        cssRatio="9/16"
        maxWidth={272}
        bg={`linear-gradient(170deg, ${B.cream} 0%, ${B.parchment} 58%, oklch(0.92 0.025 75) 100%)`}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ background: B.kraft, padding: "0.75rem 1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", borderBottom: `1px dashed ${B.accentBorder}`, flexShrink: 0 }}>
            <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
            <span style={{ fontFamily: F.label, fontSize: "0.48rem", letterSpacing: "0.2em", textTransform: "uppercase", color: B.ink }}>
              The Note You Needed Today
            </span>
            <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
          </div>
          <div style={{ padding: "0.7rem 1rem 0.1rem", flexShrink: 0 }}>
            <span style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.11em", textTransform: "uppercase", color: B.inkMuted, border: `1px dashed ${B.accentBorder}`, borderRadius: "999px", padding: "0.15rem 0.5rem" }}>
              {getCategoryLabel(note)}
            </span>
          </div>
          <div style={{ flex: 1, padding: "0.65rem 1rem", overflow: "hidden" }}>
            <p style={{ fontFamily: F.note, fontSize: "0.88rem", lineHeight: 1.2, color: B.ink, whiteSpace: "pre-line", overflow: "hidden" }}>
              {getExcerpt(note.mainText, 440)}
            </p>
          </div>
          <div style={{ padding: "0.6rem 1rem 0.8rem", borderTop: `1px dashed ${B.accentBorder}`, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <CtaDomain />
              <MadMark />
            </div>
          </div>
        </div>
      </CanvasShell>
    );
  },
);

export const InstagramSquareCanvas = forwardRef<HTMLDivElement, { note: NoteEntry }>(
  function InstagramSquareCanvas({ note }, ref) {
    return (
      <CanvasShell ref={ref} cssRatio="1/1" maxWidth={336}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: B.parchment }}>
          <div style={{ background: B.kraft, padding: "0.6rem 1.1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <span style={{ fontFamily: F.label, fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: B.ink }}>
              The Note You Needed Today
            </span>
            <HeartSVG style={{ width: 11, height: 11, color: B.accent }} />
          </div>
          <div style={{ flex: 1, padding: "1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
            <p style={{ fontFamily: F.label, fontSize: "0.44rem", letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkMuted, marginBottom: "0.55rem", flexShrink: 0 }}>
              {getCategoryLabel(note)}
            </p>
            <p style={{ fontFamily: F.display, fontSize: "0.88rem", lineHeight: 1.18, color: B.ink, marginBottom: "0.7rem", flexShrink: 0 }}>
              {note.title}
            </p>
            <p style={{ fontFamily: F.note, fontSize: "0.74rem", lineHeight: 1.22, color: B.ink, whiteSpace: "pre-line", overflow: "hidden" }}>
              {getExcerpt(note.mainText, 260)}
            </p>
          </div>
          <div style={{ padding: "0.55rem 1.1rem", borderTop: `1px solid ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>
      </CanvasShell>
    );
  },
);

export const LinkedInPortraitCanvas = forwardRef<HTMLDivElement, { note: NoteEntry }>(
  function LinkedInPortraitCanvas({ note }, ref) {
    return (
      <CanvasShell ref={ref} cssRatio="4/5" maxWidth={304} bg={B.cream}>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "1.25rem 1.25rem 1rem" }}>
          <div style={{ paddingBottom: "0.6rem", borderBottom: `1px solid ${B.accentBorder}`, marginBottom: "0.8rem", flexShrink: 0 }}>
            <span style={{ fontFamily: F.label, fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: B.inkMuted }}>
              The Note You Needed Today
            </span>
          </div>
          <p style={{ fontFamily: F.display, fontSize: "1.05rem", lineHeight: 1.15, color: B.ink, marginBottom: "0.5rem", flexShrink: 0 }}>
            {note.title}
          </p>
          <p style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkMuted, marginBottom: "0.7rem", flexShrink: 0 }}>
            {getCategoryLabel(note)}
          </p>
          <p style={{ fontFamily: F.note, fontSize: "0.78rem", lineHeight: 1.26, color: B.ink, flex: 1, whiteSpace: "pre-line", overflow: "hidden" }}>
            {getExcerpt(note.mainText, 380)}
          </p>
          <div style={{ marginTop: "0.7rem", paddingTop: "0.5rem", borderTop: `1px solid ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>
      </CanvasShell>
    );
  },
);

export const PinterestPinCanvas = forwardRef<HTMLDivElement, { note: NoteEntry }>(
  function PinterestPinCanvas({ note }, ref) {
    return (
      <CanvasShell
        ref={ref}
        cssRatio="2/3"
        maxWidth={256}
        bg={`linear-gradient(175deg, ${B.cream} 0%, ${B.parchment} 50%, oklch(0.94 0.022 76) 100%)`}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ background: B.kraft, padding: "0.75rem 1rem 0.6rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
              <span style={{ fontFamily: F.label, fontSize: "0.46rem", letterSpacing: "0.2em", textTransform: "uppercase", color: B.ink }}>
                The Note You Needed Today
              </span>
              <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
            </div>
            <span style={{ fontFamily: F.label, fontSize: "0.4rem", letterSpacing: "0.1em", textTransform: "uppercase", color: B.inkMuted, border: `1px dashed ${B.accentBorder}`, borderRadius: "999px", padding: "0.12rem 0.48rem" }}>
              {getCategoryLabel(note)}
            </span>
          </div>
          <div style={{ padding: "0.9rem 1rem 0.5rem", flexShrink: 0 }}>
            <p style={{ fontFamily: F.display, fontSize: "0.88rem", lineHeight: 1.16, color: B.ink }}>
              {note.title}
            </p>
          </div>
          <div style={{ flex: 1, padding: "0 1rem 0.4rem", overflow: "hidden" }}>
            <p style={{ fontFamily: F.note, fontSize: "0.76rem", lineHeight: 1.2, color: B.ink, whiteSpace: "pre-line", overflow: "hidden" }}>
              {getExcerpt(note.mainText, 520)}
            </p>
          </div>
          <div style={{ padding: "0.55rem 1rem 0.7rem", borderTop: `1px dashed ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>
      </CanvasShell>
    );
  },
);
