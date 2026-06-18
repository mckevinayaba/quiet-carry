import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { ReactNode } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import {
  B,
  F,
  InstagramSquareCanvas,
  InstagramStoryCanvas,
  LinkedInPortraitCanvas,
  PinterestPinCanvas,
  WhatsAppStatusCanvas,
} from "@/components/share-canvases";
import {
  PRESETS,
  buildRenderPlan,
  formatBrandedShareText,
  type PresetId,
} from "@/lib/note-render-engine";
import { notes, type NoteEntry } from "@/lib/note-data";
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
  const renderPlan = buildRenderPlan(note, preset);

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
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      setShareStatus("Copied to clipboard.");
      setTimeout(() => setShareStatus(null), 2500);
    }
  }

  return (
    <AppLayout className="space-y-6 pb-12">

      <section className="space-y-2">
        <div className="stitched-label">Design preview · not live</div>
        <h1 className="font-display text-4xl leading-none">Social Export Preview</h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Internal preview of the Note Render Engine. Shows content mode and layout warnings.
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
              {p.ratio && <span className="text-[0.6rem] opacity-60">{p.ratio}</span>}
            </button>
          ))}
        </div>
      </section>

      {/* Engine diagnostic panel */}
      <div
        className="rounded-2xl border p-4 space-y-2 text-xs"
        style={{ borderColor: B.accentBorder, background: B.cream, fontFamily: F.label, letterSpacing: "0.07em" }}
      >
        <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", color: B.inkMuted }}>
          Render Engine · Diagnostic
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1" style={{ color: B.ink }}>
          <span style={{ color: B.inkMuted }}>Preset</span>
          <span>{renderPlan.preset.label} ({renderPlan.preset.layoutType})</span>
          <span style={{ color: B.inkMuted }}>Content mode</span>
          <span style={{ fontWeight: renderPlan.contentMode !== "full" ? 600 : 400, color: renderPlan.contentMode === "carousel_required" ? "oklch(0.55 0.14 30)" : renderPlan.contentMode === "excerpt" ? "oklch(0.52 0.10 55)" : B.ink }}>
            {renderPlan.contentMode}
          </span>
          <span style={{ color: B.inkMuted }}>Text budget</span>
          <span>{renderPlan.preset.maxChars} chars</span>
          <span style={{ color: B.inkMuted }}>Rendered chars</span>
          <span>{renderPlan.mainText.length}</span>
          <span style={{ color: B.inkMuted }}>socialExcerpt</span>
          <span>{note.socialExcerpt ? `yes (${note.socialExcerpt.length} chars)` : "none"}</span>
          <span style={{ color: B.inkMuted }}>showReceipt</span>
          <span style={{ fontWeight: renderPlan.showReceipt ? 600 : 400 }}>{renderPlan.showReceipt ? "yes" : "no"}</span>
        </div>
        {renderPlan.layoutWarnings.length > 0 && (
          <div className="mt-2 space-y-1">
            {renderPlan.layoutWarnings.map((w, i) => (
              <p key={i} style={{ color: "oklch(0.55 0.12 40)", fontSize: "0.7rem" }}>⚠ {w}</p>
            ))}
          </div>
        )}
      </div>

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
            <WhatsAppStatusCanvas renderPlan={renderPlan} />
          </PreviewShell>
        )}
        {preset === "C" && (
          <PreviewShell displayLabel="Preset C · Instagram Story · 9:16">
            <InstagramStoryCanvas renderPlan={renderPlan} />
          </PreviewShell>
        )}
        {preset === "D" && (
          <PreviewShell displayLabel="Preset D · Instagram Square · 1:1">
            <InstagramSquareCanvas renderPlan={renderPlan} />
          </PreviewShell>
        )}
        {preset === "E" && (
          <PreviewShell displayLabel="Preset E · LinkedIn Portrait · 4:5">
            <LinkedInPortraitCanvas renderPlan={renderPlan} />
          </PreviewShell>
        )}
        {preset === "F" && (
          <PreviewShell displayLabel="Preset F · Pinterest Pin · 2:3">
            <PinterestPinCanvas renderPlan={renderPlan} />
          </PreviewShell>
        )}
      </div>

      <div
        className="rounded-2xl border border-dashed p-4 text-center text-xs text-muted-foreground"
        style={{ borderColor: "oklch(0.75 0.03 60 / 0.5)", fontFamily: F.label, letterSpacing: "0.08em", textTransform: "uppercase" }}
      >
        Internal preview · not shown to users
      </div>

    </AppLayout>
  );
}

// ─── Preset A ────────────────────────────────────────────────────────────────

function PrivateShareText({ note, copyLabel, shareStatus, onCopy, onShare }: {
  note: NoteEntry; copyLabel: string; shareStatus: string | null; onCopy: () => void; onShare: () => void;
}) {
  return (
    <div className="w-full space-y-4">
      <p className="text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Preset A — Private Share Text · WhatsApp · SMS · Messenger · Email
      </p>
      <div className="paper-panel" style={{ fontFamily: F.note, fontSize: "0.95rem", lineHeight: 1.75, color: B.ink, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {formatBrandedShareText(note)}
      </div>
      {shareStatus && <p className="text-sm text-muted-foreground">{shareStatus}</p>}
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button variant="note" onClick={onCopy} className="w-full sm:flex-1">{copyLabel}</Button>
        <Button variant="paper" onClick={onShare} className="w-full sm:flex-1">Preview native share</Button>
      </div>
    </div>
  );
}

// ─── Preview shell ─────────────────────────────────────────────────────────────

function PreviewShell({ displayLabel, children }: { displayLabel: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center gap-2.5">
      {children}
      <p style={{ fontFamily: F.label, fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", color: B.inkFaint }}>
        {displayLabel}
      </p>
      <button disabled aria-disabled="true" style={{ fontFamily: F.label, fontSize: "0.56rem", letterSpacing: "0.12em", textTransform: "uppercase", color: B.inkFaint, border: `1px dashed ${B.inkFaint}`, borderRadius: "999px", padding: "0.35rem 0.9rem", background: "transparent", cursor: "not-allowed", opacity: 0.55 }}>
        Download PNG — coming soon
      </button>
    </div>
  );
}
