import { useRef, useState } from "react";
import { Download, Share2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  B,
  F,
  InstagramSquareCanvas,
} from "@/components/share-canvases";
import {
  PRESETS,
  buildFilename,
  buildRenderPlan,
  formatBrandedShareText,
  formatSocialCaption,
  type PresetId,
} from "@/lib/note-render-engine";
import { trackEvent } from "@/lib/analytics";
import type { NoteEntry } from "@/lib/note-data";

export { Share2 as ShareIcon };

type DownloadState = "idle" | "downloading" | "success" | "error" | "manual";

// Presets that are live now vs coming soon
const ACTIVE_PRESETS: PresetId[] = ["A", "D"];

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
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");

  const canvasRef = useRef<HTMLDivElement>(null);
  const squareRenderPlan = buildRenderPlan(note, "D");

  function selectPreset(id: PresetId) {
    if (!ACTIVE_PRESETS.includes(id)) return;
    setPreset(id);
    setDownloadState("idle");
    trackEvent("share_preset_selected", {
      noteId: note.id,
      categorySlug: note.categorySlug,
      preset: id,
      contentMode: buildRenderPlan(note, id).contentMode,
      source: "modal",
    });
  }

  async function handleCopyText() {
    await navigator.clipboard.writeText(formatBrandedShareText(note));
    trackEvent("share_text_copied", { noteId: note.id, categorySlug: note.categorySlug, preset, source: "modal" });
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy share text"), 2500);
  }

  async function handleNativeShare() {
    const text = formatBrandedShareText(note);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        trackEvent("share_native_opened", { noteId: note.id, categorySlug: note.categorySlug, preset, source: "modal" });
        setShareStatus("Shared.");
        setTimeout(() => setShareStatus(null), 2500);
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
      setShareStatus("Copied to clipboard.");
      setTimeout(() => setShareStatus(null), 2500);
    }
  }

  async function handleCopyCaption() {
    await navigator.clipboard.writeText(formatSocialCaption(note));
    trackEvent("share_caption_copied", { noteId: note.id, categorySlug: note.categorySlug, preset, source: "modal" });
    setCaptionLabel("Copied!");
    setTimeout(() => setCaptionLabel("Copy caption"), 2500);
  }

  async function handleDownload() {
    if (!canvasRef.current) return;
    setDownloadState("downloading");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(canvasRef.current, { pixelRatio: 4, cacheBust: true });
      const filename = buildFilename(note, "D");
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      setDownloadState(isIOS ? "manual" : "success");
      if (!isIOS) setTimeout(() => setDownloadState("idle"), 3000);
      trackEvent("share_image_downloaded", {
        noteId: note.id, categorySlug: note.categorySlug, preset: "D",
        contentMode: squareRenderPlan.contentMode, source: "modal",
      });
    } catch {
      setDownloadState("error");
      setTimeout(() => setDownloadState("idle"), 4000);
      trackEvent("share_image_download_failed", { noteId: note.id, categorySlug: note.categorySlug, preset: "D", source: "modal" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
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
          {PRESETS.map((p) => {
            const isActive = ACTIVE_PRESETS.includes(p.id);
            const isSelected = preset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => selectPreset(p.id)}
                disabled={!isActive}
                style={{ fontFamily: F.label, letterSpacing: "0.07em", opacity: isActive ? 1 : 0.45 }}
                className={[
                  "flex flex-col items-start gap-0.5 rounded-xl border px-2.5 py-1.5 text-left transition-colors",
                  isSelected && isActive
                    ? "border-foreground bg-foreground text-background"
                    : isActive
                    ? "border-border bg-card text-muted-foreground hover:border-foreground/40"
                    : "border-border bg-card text-muted-foreground cursor-not-allowed",
                ].join(" ")}
              >
                <span className="text-[0.65rem] font-medium">{p.id}. {p.label}</span>
                {isActive ? (
                  p.ratio && <span className="text-[0.55rem] opacity-60">{p.ratio}</span>
                ) : (
                  <span className="text-[0.52rem] opacity-50">Coming soon</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Canvas preview */}
        <div className="flex flex-col items-center gap-3">
          {preset === "A" && (
            <div
              className="paper-panel w-full"
              style={{ fontFamily: F.note, fontSize: "0.9rem", lineHeight: 1.75, color: B.ink, whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: "200px", overflowY: "auto" }}
            >
              {formatBrandedShareText(note)}
            </div>
          )}
          {preset === "D" && (
            <div style={{ width: "88%", margin: "0 auto" }}>
              <InstagramSquareCanvas ref={canvasRef} renderPlan={squareRenderPlan} />
            </div>
          )}
        </div>

        {/* Receipt / excerpt badge */}
        {preset === "D" && (
          <div className="space-y-1">
            {squareRenderPlan.contentMode !== "full" && (
              <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                {squareRenderPlan.contentMode === "carousel_required"
                  ? "Excerpt shown · full note too long for one card"
                  : "Excerpt shown · full note available on site"}
              </p>
            )}
            {squareRenderPlan.showReceipt && (
              <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                Receipt included
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          {preset === "A" ? (
            <>
              {shareStatus && <p className="text-sm text-muted-foreground">{shareStatus}</p>}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="note" onClick={handleCopyText}>{copyLabel}</Button>
                <Button variant="paper" onClick={handleNativeShare}>Share now</Button>
              </div>
            </>
          ) : preset === "D" ? (
            <>
              <Button
                variant="note"
                onClick={handleDownload}
                disabled={downloadState === "downloading"}
                className="flex items-center justify-center gap-2"
              >
                <Download className="size-4" aria-hidden="true" />
                {downloadState === "downloading" ? "Creating image…"
                  : downloadState === "success" ? "Image downloaded"
                  : "Download PNG"}
              </Button>
              {downloadState === "error" && (
                <p className="text-sm text-destructive">We could not create the image. Please try again.</p>
              )}
              {downloadState === "manual" && (
                <p className="text-sm text-muted-foreground">Your image is ready. Long press or open it to save.</p>
              )}
              {downloadState === "idle" && (
                <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.06em" }}>
                  Download the image, then post it to Instagram, Facebook, or WhatsApp.
                </p>
              )}
            </>
          ) : null}

          {preset !== "A" && (
            <Button variant="paper" onClick={handleCopyCaption}>{captionLabel}</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
