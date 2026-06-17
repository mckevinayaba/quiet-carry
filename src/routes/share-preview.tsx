import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug, notes, type NoteEntry } from "@/lib/note-data";
import { buildShareText } from "@/lib/share";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/share-preview")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Social Export Preview — The Note You Needed Today" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SharePreviewPage,
});

// ─── Constants ────────────────────────────────────────────────────────────────

const PRODUCT_DOMAIN = "thenoteyouneeded.today";

// Three notes shown in the selector
const PREVIEW_NOTES: NoteEntry[] = [
  notes.find((n) => n.id === "note-im-fine-but-not-really"),
  notes.find((n) => n.id === "note-distance-is-also-healing"),
  notes.find((n) => n.id === "note-people-who-watched-you-bleed"),
].filter((n): n is NoteEntry => n !== undefined);

// Brand colour palette for the export canvases
const B = {
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

// Font shortcuts (CSS custom properties set by Tailwind)
const F = {
  display: "var(--font-display)",
  note: "var(--font-note)",
  label: "var(--font-label)",
} as const;

type PresetId = "A" | "B" | "C" | "D" | "E" | "F";

const PRESETS: Array<{
  id: PresetId;
  label: string;
  sub: string;
  ratio: string | null;
}> = [
  { id: "A", label: "Private Text",       sub: "WhatsApp · SMS · Email",    ratio: null  },
  { id: "B", label: "WhatsApp Status",    sub: "Vertical story",             ratio: "9:16" },
  { id: "C", label: "Instagram Story",    sub: "Vertical story",             ratio: "9:16" },
  { id: "D", label: "Instagram Square",   sub: "Square post",                ratio: "1:1"  },
  { id: "E", label: "LinkedIn Portrait",  sub: "Editorial portrait",         ratio: "4:5"  },
  { id: "F", label: "Pinterest Pin",      sub: "Tall poster",                ratio: "2:3"  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Delegates to buildShareText — ensures sendableText is wrapped with branded envelope. */
function formatBrandedShareText(note: NoteEntry): string {
  return buildShareText(note.sendableText);
}

/** Truncate at a clean line / sentence boundary near maxChars. */
function getExcerpt(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const candidate = text.slice(0, maxChars);
  const lastNewline = candidate.lastIndexOf("\n");
  const lastPeriod  = candidate.lastIndexOf(".");
  const lastSpace   = candidate.lastIndexOf(" ");
  const natural = Math.max(lastNewline, lastPeriod);
  const cut = natural > 40 ? natural : lastSpace;
  return (cut > 0 ? candidate.slice(0, cut + 1) : candidate).trimEnd() + "…";
}

function categoryLabel(note: NoteEntry): string {
  return getCategoryBySlug(note.categorySlug)?.title ?? note.categorySlug;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function SharePreviewPage() {
  const [noteIdx,       setNoteIdx]       = useState(0);
  const [preset,        setPreset]        = useState<PresetId>("B");
  const [copyLabel,     setCopyLabel]     = useState("Copy share text");
  const [shareStatus,   setShareStatus]   = useState<string | null>(null);

  const note = PREVIEW_NOTES[noteIdx];

  async function handleCopy() {
    await navigator.clipboard.writeText(formatBrandedShareText(note));
    trackEvent("share_text_copied", { note_id: note.id, source: "share_preview" });
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy share text"), 2500);
  }

  async function handleNativeShare() {
    const text = formatBrandedShareText(note);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        trackEvent("share_native_triggered", { note_id: note.id, source: "share_preview" });
        setShareStatus("Shared.");
        setTimeout(() => setShareStatus(null), 2500);
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
      setShareStatus("Copied to clipboard.");
      setTimeout(() => setShareStatus(null), 2500);
    }
  }

  return (
    <AppLayout className="space-y-6 pb-12">

      {/* Header */}
      <section className="space-y-2">
        <div className="stitched-label">Design preview · not live</div>
        <h1 className="font-display text-4xl leading-none">Social Export Preview</h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Preview how one note becomes platform-ready social assets while keeping
          The Note You Needed Today identity.
        </p>
      </section>

      {/* Note selector */}
      <section className="space-y-2">
        <p className="eyebrow-copy">Select note</p>
        <div className="flex flex-wrap gap-2">
          {PREVIEW_NOTES.map((n, i) => (
            <button
              key={n.id}
              onClick={() => setNoteIdx(i)}
              style={{ fontFamily: F.label, letterSpacing: "0.08em" }}
              className={[
                "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                noteIdx === i
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/40",
              ].join(" ")}
            >
              {n.title}
            </button>
          ))}
        </div>
      </section>

      {/* Preset selector */}
      <section className="space-y-2">
        <p className="eyebrow-copy">Export preset</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setPreset(p.id)}
              style={{ fontFamily: F.label, letterSpacing: "0.07em" }}
              className={[
                "flex flex-col items-start gap-0.5 rounded-2xl border px-3 py-2 text-left transition-colors",
                preset === p.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/40",
              ].join(" ")}
            >
              <span className="text-xs font-medium">{p.id}. {p.label}</span>
              {p.ratio && (
                <span className="text-[0.6rem] opacity-60">{p.ratio}</span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Active preset canvas */}
      <div className="flex flex-col items-center gap-3">
        {preset === "A" && (
          <PrivateShareText
            note={note}
            copyLabel={copyLabel}
            shareStatus={shareStatus}
            onCopy={handleCopy}
            onShare={handleNativeShare}
          />
        )}
        {preset === "B" && <WhatsAppStatusCanvas note={note} />}
        {preset === "C" && <InstagramStoryCanvas note={note} />}
        {preset === "D" && <InstagramSquareCanvas note={note} />}
        {preset === "E" && <LinkedInPortraitCanvas note={note} />}
        {preset === "F" && <PinterestPinCanvas note={note} />}
      </div>

      {/* Developer notice */}
      <div
        className="rounded-2xl border border-dashed p-4 text-center text-xs text-muted-foreground"
        style={{
          borderColor: "oklch(0.75 0.03 60 / 0.5)",
          fontFamily: F.label,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Preview only · Final export and download will be added after design approval
      </div>

    </AppLayout>
  );
}

// ─── Preset A: Private Share Text ─────────────────────────────────────────────

function PrivateShareText({
  note,
  copyLabel,
  shareStatus,
  onCopy,
  onShare,
}: {
  note: NoteEntry;
  copyLabel: string;
  shareStatus: string | null;
  onCopy: () => void;
  onShare: () => void;
}) {
  return (
    <div className="w-full space-y-4">
      {/* Label */}
      <p
        className="text-xs text-muted-foreground"
        style={{ fontFamily: F.label, letterSpacing: "0.1em", textTransform: "uppercase" }}
      >
        Preset A — Private Share Text · WhatsApp · SMS · Messenger · Email
      </p>

      {/* Text preview */}
      <div
        className="paper-panel"
        style={{
          fontFamily: F.note,
          fontSize: "0.95rem",
          lineHeight: 1.75,
          color: B.ink,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {formatBrandedShareText(note)}
      </div>

      {/* Actions */}
      {shareStatus && (
        <p className="text-sm text-muted-foreground">{shareStatus}</p>
      )}
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button variant="note" onClick={onCopy} className="w-full sm:flex-1">
          {copyLabel}
        </Button>
        <Button variant="paper" onClick={onShare} className="w-full sm:flex-1">
          Preview native share
        </Button>
      </div>
    </div>
  );
}

// ─── Canvas shell ─────────────────────────────────────────────────────────────

function CanvasShell({
  cssRatio,
  displayLabel,
  maxWidth,
  children,
  bg,
}: {
  cssRatio: string;
  displayLabel: string;
  maxWidth: number;
  children: ReactNode;
  bg?: CSSProperties["background"];
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2.5">
      <div
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

      {/* Canvas label */}
      <p
        style={{
          fontFamily: F.label,
          fontSize: "0.52rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: B.inkFaint,
        }}
      >
        {displayLabel}
      </p>

      {/* Download — coming soon */}
      <button
        disabled
        aria-disabled="true"
        style={{
          fontFamily: F.label,
          fontSize: "0.56rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: B.inkFaint,
          border: `1px dashed ${B.inkFaint}`,
          borderRadius: "999px",
          padding: "0.35rem 0.9rem",
          background: "transparent",
          cursor: "not-allowed",
          opacity: 0.55,
        }}
      >
        Download PNG — coming soon
      </button>
    </div>
  );
}

// ─── Preset B: WhatsApp Status (9:16) ─────────────────────────────────────────
// Intimate and personal. Envelope brow, large note text, domain footer.

function WhatsAppStatusCanvas({ note }: { note: NoteEntry }) {
  return (
    <CanvasShell cssRatio="9/16" displayLabel="Preset B · WhatsApp Status · 9:16" maxWidth={272}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: B.parchment }}>

        {/* Envelope brow */}
        <div style={{ background: B.kraft, padding: "0.7rem 1rem 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: F.label, fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: B.ink }}>
              The Note You Needed Today
            </span>
            <HeartSVG style={{ width: 11, height: 11, color: B.accent }} />
          </div>
        </div>
        {/* V crease */}
        <svg viewBox="0 0 200 10" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 10, background: B.kraft }} aria-hidden="true">
          <polygon points="0,10 100,0 200,10" fill={B.parchment} />
          <polyline points="0,10 100,0 200,10" fill="none" stroke={B.inkFaint} strokeWidth="0.5" opacity="0.4" />
        </svg>

        {/* Note */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0.9rem 1.1rem" }}>
          <p style={{ fontFamily: F.label, fontSize: "0.44rem", letterSpacing: "0.13em", textTransform: "uppercase", color: B.inkMuted, marginBottom: "0.6rem" }}>
            {categoryLabel(note)}
          </p>
          <p style={{ fontFamily: F.note, fontSize: "0.9rem", lineHeight: 1.18, color: B.ink, whiteSpace: "pre-line" }}>
            {getExcerpt(note.mainText, 290)}
          </p>
        </div>

        {/* Footer */}
        <div style={{ padding: "0.55rem 1rem 0.7rem", borderTop: `1px solid ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <CtaDomain />
          <MadMark />
        </div>
      </div>
    </CanvasShell>
  );
}

// ─── Preset C: Instagram Story (9:16) ─────────────────────────────────────────
// More dramatic than WhatsApp. Stitched header, gradient bg, collage CTA footer.

function InstagramStoryCanvas({ note }: { note: NoteEntry }) {
  return (
    <CanvasShell
      cssRatio="9/16"
      displayLabel="Preset C · Instagram Story · 9:16"
      maxWidth={272}
      bg={`linear-gradient(170deg, ${B.cream} 0%, ${B.parchment} 58%, oklch(0.92 0.025 75) 100%)`}
    >
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>

        {/* Stitched header */}
        <div style={{ background: B.kraft, padding: "0.75rem 1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", borderBottom: `1px dashed ${B.accentBorder}` }}>
          <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
          <span style={{ fontFamily: F.label, fontSize: "0.48rem", letterSpacing: "0.2em", textTransform: "uppercase", color: B.ink }}>
            The Note You Needed Today
          </span>
          <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
        </div>

        {/* Category pill */}
        <div style={{ padding: "0.7rem 1rem 0.1rem" }}>
          <span style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.11em", textTransform: "uppercase", color: B.inkMuted, border: `1px dashed ${B.accentBorder}`, borderRadius: "999px", padding: "0.15rem 0.5rem" }}>
            {categoryLabel(note)}
          </span>
        </div>

        {/* Note text */}
        <div style={{ flex: 1, padding: "0.65rem 1rem" }}>
          <p style={{ fontFamily: F.note, fontSize: "0.88rem", lineHeight: 1.2, color: B.ink, whiteSpace: "pre-line" }}>
            {getExcerpt(note.mainText, 310)}
          </p>
        </div>

        {/* CTA footer */}
        <div style={{ padding: "0.6rem 1rem 0.8rem", borderTop: `1px dashed ${B.accentBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <CtaDomain />
            <MadMark />
          </div>
        </div>
      </div>
    </CanvasShell>
  );
}

// ─── Preset D: Instagram Square (1:1) ─────────────────────────────────────────
// Balanced. Envelope brand strip, note title + excerpt centred, clean footer.

function InstagramSquareCanvas({ note }: { note: NoteEntry }) {
  return (
    <CanvasShell cssRatio="1/1" displayLabel="Preset D · Instagram Square · 1:1" maxWidth={336}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: B.parchment }}>

        {/* Brand strip */}
        <div style={{ background: B.kraft, padding: "0.6rem 1.1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: F.label, fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: B.ink }}>
            The Note You Needed Today
          </span>
          <HeartSVG style={{ width: 11, height: 11, color: B.accent }} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "1rem 1.1rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontFamily: F.label, fontSize: "0.44rem", letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkMuted, marginBottom: "0.55rem" }}>
            {categoryLabel(note)}
          </p>
          <p style={{ fontFamily: F.display, fontSize: "0.88rem", lineHeight: 1.18, color: B.ink, marginBottom: "0.7rem" }}>
            {note.title}
          </p>
          <p style={{ fontFamily: F.note, fontSize: "0.74rem", lineHeight: 1.22, color: B.ink, whiteSpace: "pre-line" }}>
            {getExcerpt(note.mainText, 185)}
          </p>
        </div>

        {/* Footer strip */}
        <div style={{ padding: "0.55rem 1.1rem", borderTop: `1px solid ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <CtaDomain />
          <MadMark />
        </div>
      </div>
    </CanvasShell>
  );
}

// ─── Preset E: LinkedIn Portrait (4:5) ────────────────────────────────────────
// Premium and editorial. Strong title, excerpt, minimal receipt rows, clean domain.

function LinkedInPortraitCanvas({ note }: { note: NoteEntry }) {
  return (
    <CanvasShell cssRatio="4/5" displayLabel="Preset E · LinkedIn Portrait · 4:5" maxWidth={304} bg={B.cream}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "1.25rem 1.25rem 1rem" }}>

        {/* Header */}
        <div style={{ paddingBottom: "0.6rem", borderBottom: `1px solid ${B.accentBorder}`, marginBottom: "0.8rem" }}>
          <span style={{ fontFamily: F.label, fontSize: "0.48rem", letterSpacing: "0.18em", textTransform: "uppercase", color: B.inkMuted }}>
            The Note You Needed Today
          </span>
        </div>

        {/* Note title */}
        <p style={{ fontFamily: F.display, fontSize: "1.05rem", lineHeight: 1.15, color: B.ink, marginBottom: "0.5rem" }}>
          {note.title}
        </p>

        {/* Category */}
        <p style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkMuted, marginBottom: "0.7rem" }}>
          {categoryLabel(note)}
        </p>

        {/* Note excerpt */}
        <p style={{ fontFamily: F.note, fontSize: "0.78rem", lineHeight: 1.26, color: B.ink, flex: 1, whiteSpace: "pre-line" }}>
          {getExcerpt(note.mainText, 255)}
        </p>

        {/* Minimal receipt rows */}
        {(note.receiptFrom || note.receiptTo) && (
          <div style={{ marginTop: "0.7rem", paddingTop: "0.55rem", borderTop: `1px solid ${B.accentBorder}` }}>
            {note.receiptFrom && (
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.3rem", alignItems: "flex-start" }}>
                <span style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.13em", textTransform: "uppercase", color: B.inkMuted, flexShrink: 0, minWidth: "2.2rem" }}>FROM</span>
                <span style={{ fontFamily: F.label, fontSize: "0.42rem", color: B.ink, lineHeight: 1.45 }}>{getExcerpt(note.receiptFrom, 85)}</span>
              </div>
            )}
            {note.receiptTo && (
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                <span style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.13em", textTransform: "uppercase", color: B.inkMuted, flexShrink: 0, minWidth: "2.2rem" }}>TO</span>
                <span style={{ fontFamily: F.label, fontSize: "0.42rem", color: B.ink, lineHeight: 1.45 }}>{getExcerpt(note.receiptTo, 85)}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: "0.7rem", paddingTop: "0.5rem", borderTop: `1px solid ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <CtaDomain />
          <MadMark />
        </div>
      </div>
    </CanvasShell>
  );
}

// ─── Preset F: Pinterest Pin (2:3) ────────────────────────────────────────────
// Collectible emotional poster. Decorative kraft header, full note, tall canvas.

function PinterestPinCanvas({ note }: { note: NoteEntry }) {
  return (
    <CanvasShell
      cssRatio="2/3"
      displayLabel="Preset F · Pinterest Pin · 2:3"
      maxWidth={256}
      bg={`linear-gradient(175deg, ${B.cream} 0%, ${B.parchment} 50%, oklch(0.94 0.022 76) 100%)`}
    >
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>

        {/* Decorative header */}
        <div style={{ background: B.kraft, padding: "0.75rem 1rem 0.6rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
            <span style={{ fontFamily: F.label, fontSize: "0.46rem", letterSpacing: "0.2em", textTransform: "uppercase", color: B.ink }}>
              The Note You Needed Today
            </span>
            <HeartSVG style={{ width: 8, height: 8, color: B.accent }} />
          </div>
          <span style={{ fontFamily: F.label, fontSize: "0.4rem", letterSpacing: "0.1em", textTransform: "uppercase", color: B.inkMuted, border: `1px dashed ${B.accentBorder}`, borderRadius: "999px", padding: "0.12rem 0.48rem" }}>
            {categoryLabel(note)}
          </span>
        </div>

        {/* Title */}
        <div style={{ padding: "0.9rem 1rem 0.5rem" }}>
          <p style={{ fontFamily: F.display, fontSize: "0.88rem", lineHeight: 1.16, color: B.ink }}>
            {note.title}
          </p>
        </div>

        {/* Note text */}
        <div style={{ flex: 1, padding: "0 1rem 0.4rem", overflow: "hidden" }}>
          <p style={{ fontFamily: F.note, fontSize: "0.76rem", lineHeight: 1.2, color: B.ink, whiteSpace: "pre-line" }}>
            {getExcerpt(note.mainText, 390)}
          </p>
        </div>

        {/* Footer */}
        <div style={{ padding: "0.55rem 1rem 0.7rem", borderTop: `1px dashed ${B.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <CtaDomain />
          <MadMark />
        </div>
      </div>
    </CanvasShell>
  );
}

// ─── Shared decorative atoms ──────────────────────────────────────────────────

function CtaDomain() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <span style={{ fontFamily: F.label, fontSize: "0.38rem", letterSpacing: "0.1em", textTransform: "uppercase", color: B.inkFaint, lineHeight: 1 }}>
        Read the full note at
      </span>
      <span style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.12em", color: B.inkMuted, lineHeight: 1 }}>
        {PRODUCT_DOMAIN}
      </span>
    </div>
  );
}

function HeartSVG({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function MadMark() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <span style={{ fontFamily: F.label, fontSize: "0.42rem", letterSpacing: "0.18em", textTransform: "uppercase", color: B.inkMuted, lineHeight: 1 }}>
        MAD
      </span>
      <HeartSVG style={{ width: 5, height: 5, color: B.accent }} />
    </div>
  );
}
