import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { ReactNode } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { notes, type NoteEntry } from "@/lib/note-data";
import { trackEvent } from "@/lib/analytics";
import {
  B,
  F,
  PRESETS,
  type PresetId,
  formatBrandedShareText,
  InstagramSquareCanvas,
  InstagramStoryCanvas,
  LinkedInPortraitCanvas,
  PinterestPinCanvas,
  WhatsAppStatusCanvas,
} from "@/components/share-canvases";

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

// Three notes shown in the selector
const PREVIEW_NOTES: NoteEntry[] = [
  notes.find((n) => n.id === "note-im-fine-but-not-really"),
  notes.find((n) => n.id === "note-distance-is-also-healing"),
  notes.find((n) => n.id === "note-people-who-watched-you-bleed"),
].filter((n): n is NoteEntry => n !== undefined);

// ─── Page ─────────────────────────────────────────────────────────────────────

function SharePreviewPage() {
  const [noteIdx, setNoteIdx] = useState(0);
  const [preset, setPreset] = useState<PresetId>("B");
  const [copyLabel, setCopyLabel] = useState("Copy share text");
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const note = PREVIEW_NOTES[noteIdx];

  async function handleCopy() {
    await navigator.clipboard.writeText(formatBrandedShareText(note));
    trackEvent("share_text_copied", { noteId: note.id, source: "share_preview" });
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy share text"), 2500);
  }

  async function handleNativeShare() {
    const text = formatBrandedShareText(note);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        trackEvent("share_native_opened", { noteId: note.id, source: "share_preview" });
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
              <span className="text-xs font-medium">
                {p.id}. {p.label}
              </span>
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
        {preset === "B" && (
          <PreviewShell displayLabel="Preset B · WhatsApp Status · 9:16">
            <WhatsAppStatusCanvas note={note} />
          </PreviewShell>
        )}
        {preset === "C" && (
          <PreviewShell displayLabel="Preset C · Instagram Story · 9:16">
            <InstagramStoryCanvas note={note} />
          </PreviewShell>
        )}
        {preset === "D" && (
          <PreviewShell displayLabel="Preset D · Instagram Square · 1:1">
            <InstagramSquareCanvas note={note} />
          </PreviewShell>
        )}
        {preset === "E" && (
          <PreviewShell displayLabel="Preset E · LinkedIn Portrait · 4:5">
            <LinkedInPortraitCanvas note={note} />
          </PreviewShell>
        )}
        {preset === "F" && (
          <PreviewShell displayLabel="Preset F · Pinterest Pin · 2:3">
            <PinterestPinCanvas note={note} />
          </PreviewShell>
        )}
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
      <p
        className="text-xs text-muted-foreground"
        style={{ fontFamily: F.label, letterSpacing: "0.1em", textTransform: "uppercase" }}
      >
        Preset A — Private Share Text · WhatsApp · SMS · Messenger · Email
      </p>
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
      {shareStatus && <p className="text-sm text-muted-foreground">{shareStatus}</p>}
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

// ─── Preview shell (adds label + download button below each canvas) ────────────

function PreviewShell({
  displayLabel,
  children,
}: {
  displayLabel: string;
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2.5">
      {children}
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
