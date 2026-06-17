import { useState } from "react";
import { Share2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import type { NoteEntry } from "@/lib/note-data";
import {
  B,
  F,
  PRESETS,
  type PresetId,
  buildCaptionText,
  formatBrandedShareText,
  InstagramSquareCanvas,
  InstagramStoryCanvas,
  LinkedInPortraitCanvas,
  PinterestPinCanvas,
  WhatsAppStatusCanvas,
} from "@/components/share-canvases";

export { Share2 as ShareIcon };

export function ShareNoteModal({
  note,
  open,
  onClose,
}: {
  note: NoteEntry;
  open: boolean;
  onClose: () => void;
}) {
  const [preset, setPreset] = useState<PresetId>("A");
  const [copyLabel, setCopyLabel] = useState("Copy share text");
  const [captionLabel, setCaptionLabel] = useState("Copy caption");
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  function selectPreset(id: PresetId) {
    setPreset(id);
    trackEvent("share_preset_selected", {
      noteId: note.id,
      categorySlug: note.categorySlug,
      preset: id,
      source: "modal",
    });
  }

  async function handleCopyText() {
    await navigator.clipboard.writeText(formatBrandedShareText(note));
    trackEvent("share_text_copied", {
      noteId: note.id,
      categorySlug: note.categorySlug,
      preset,
      source: "modal",
    });
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy share text"), 2500);
  }

  async function handleNativeShare() {
    const text = formatBrandedShareText(note);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        trackEvent("share_native_opened", {
          noteId: note.id,
          categorySlug: note.categorySlug,
          preset,
          source: "modal",
        });
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

  async function handleCopyCaption() {
    await navigator.clipboard.writeText(buildCaptionText(note));
    trackEvent("share_caption_copied", {
      noteId: note.id,
      categorySlug: note.categorySlug,
      preset,
      source: "modal",
    });
    setCaptionLabel("Copied!");
    setTimeout(() => setCaptionLabel("Copy caption"), 2500);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent className="max-h-[92vh] w-full overflow-y-auto bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-3xl leading-none">
            <Share2 className="size-5 shrink-0" aria-hidden="true" />
            Share this Note
          </DialogTitle>
          <DialogDescription className="text-base leading-7 text-muted-foreground">
            Choose how you want this note to travel.
          </DialogDescription>
        </DialogHeader>

        {/* Preset selector */}
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => selectPreset(p.id)}
              style={{ fontFamily: F.label, letterSpacing: "0.07em" }}
              className={[
                "flex flex-col items-start gap-0.5 rounded-xl border px-2.5 py-1.5 text-left transition-colors",
                preset === p.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/40",
              ].join(" ")}
            >
              <span className="text-[0.65rem] font-medium">
                {p.id}. {p.label}
              </span>
              {p.ratio && (
                <span className="text-[0.55rem] opacity-60">{p.ratio}</span>
              )}
            </button>
          ))}
        </div>

        {/* Canvas / text preview */}
        <div className="flex flex-col items-center gap-3">
          {preset === "A" && (
            <div
              className="paper-panel w-full"
              style={{
                fontFamily: F.note,
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: B.ink,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {formatBrandedShareText(note)}
            </div>
          )}
          {preset === "B" && <WhatsAppStatusCanvas note={note} />}
          {preset === "C" && <InstagramStoryCanvas note={note} />}
          {preset === "D" && <InstagramSquareCanvas note={note} />}
          {preset === "E" && <LinkedInPortraitCanvas note={note} />}
          {preset === "F" && <PinterestPinCanvas note={note} />}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {preset === "A" ? (
            <>
              {shareStatus && (
                <p className="text-sm text-muted-foreground">{shareStatus}</p>
              )}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="note" onClick={handleCopyText}>
                  {copyLabel}
                </Button>
                <Button variant="paper" onClick={handleNativeShare}>
                  Share now
                </Button>
              </div>
            </>
          ) : (
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
                padding: "0.5rem 1rem",
                background: "transparent",
                cursor: "not-allowed",
                opacity: 0.55,
                textAlign: "center",
              }}
            >
              Download PNG — coming soon
            </button>
          )}

          <Button variant="paper" onClick={handleCopyCaption}>
            {captionLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
