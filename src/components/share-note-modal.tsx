import { useEffect, useRef, useState } from "react";
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
  WhatsAppStatusCanvas,
} from "@/components/share-canvases";
import { PostcardCanvas } from "@/components/postcard-canvas";
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
type ModalPreset = PresetId | "P";

// Presets that are live now vs coming soon
const ACTIVE_PRESETS: PresetId[] = ["A", "B", "D"];

// Format recommendation labels shown inside each preset button
const PRESET_RECOMMENDATION: Partial<Record<PresetId | "P", string>> = {
  D: "Recommended for mobile",
  B: "Best for WhatsApp Status",
  A: "Private · no image",
};

export function ShareNoteModal({
  note,
  open,
  onClose,
  initialPreset = "A",
}: {
  note: NoteEntry;
  open: boolean;
  onClose: () => void;
  initialPreset?: ModalPreset;
}) {
  const [preset, setPreset] = useState<ModalPreset>(initialPreset);
  const [copyLabel, setCopyLabel] = useState("Copy share text");
  const [captionLabel, setCaptionLabel] = useState("Copy caption");
  const [shareStatus, setShareStatus] = useState<string | null>(null);
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const [statusDownloadState, setStatusDownloadState] = useState<DownloadState>("idle");
  const [portraitDownloadState, setPortraitDownloadState] = useState<DownloadState>("idle");

  const canvasRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const squareRenderPlan = buildRenderPlan(note, "D");
  const statusRenderPlan = buildRenderPlan(note, "B");

  // When the modal opens, honour the caller's intent: jump straight to the requested preset
  // and reset all download states so the UI is clean.
  useEffect(() => {
    if (open) {
      setPreset(initialPreset);
      setDownloadState("idle");
      setStatusDownloadState("idle");
      setPortraitDownloadState("idle");
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function selectPreset(id: ModalPreset) {
    if (id !== "P" && !ACTIVE_PRESETS.includes(id as PresetId)) return;
    setPreset(id);
    setDownloadState("idle");
    setStatusDownloadState("idle");
    setPortraitDownloadState("idle");
    if (id !== "P") {
      trackEvent("share_preset_selected", {
        noteId: note.id,
        categorySlug: note.categorySlug,
        preset: id,
        contentMode: buildRenderPlan(note, id as PresetId).contentMode,
        source: "modal",
      });
    }
  }

  async function handleStatusDownload() {
    if (!statusRef.current) return;
    setStatusDownloadState("downloading");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(statusRef.current, {
        pixelRatio: 4, cacheBust: true,
      });
      const filename = buildFilename(note, "B");
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      setStatusDownloadState(isIOS ? "manual" : "success");
      if (!isIOS) setTimeout(() => setStatusDownloadState("idle"), 3000);
      trackEvent("share_image_downloaded", {
        noteId: note.id, categorySlug: note.categorySlug,
        preset: "B", contentMode: statusRenderPlan.contentMode, source: "modal",
      });
    } catch {
      setStatusDownloadState("error");
      setTimeout(() => setStatusDownloadState("idle"), 4000);
    }
  }

  async function handlePortraitDownload() {
    if (!portraitRef.current) return;
    setPortraitDownloadState("downloading");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(portraitRef.current, {
        pixelRatio: 2.5, cacheBust: true, width: 432, height: 540,
      });
      const slug = note.id.replace(/^note-/, "");
      const link = document.createElement("a");
      link.download = `the-note-you-needed-today-${slug}-portrait.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      setPortraitDownloadState(isIOS ? "manual" : "success");
      if (!isIOS) setTimeout(() => setPortraitDownloadState("idle"), 3000);
      trackEvent("share_image_downloaded", {
        noteId: note.id, categorySlug: note.categorySlug,
        preset: "P", contentMode: "full", source: "modal",
      });
    } catch {
      setPortraitDownloadState("error");
      setTimeout(() => setPortraitDownloadState("idle"), 4000);
    }
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
          {initialPreset === "P" && preset === "P" && (
            <p className="text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Full Note Keepsake selected
            </p>
          )}
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
                  <>
                    {p.ratio && <span className="text-[0.55rem] opacity-60">{p.ratio}</span>}
                    {PRESET_RECOMMENDATION[p.id] && (
                      <span className="text-[0.52rem] opacity-75">{PRESET_RECOMMENDATION[p.id]}</span>
                    )}
                  </>
                ) : (
                  <span className="text-[0.52rem] opacity-50">Coming soon</span>
                )}
              </button>
            );
          })}
          {/* Portrait postcard — always active */}
          <button
            onClick={() => selectPreset("P")}
            style={{ fontFamily: F.label, letterSpacing: "0.07em" }}
            className={[
              "flex flex-col items-start gap-0.5 rounded-xl border px-2.5 py-1.5 text-left transition-colors",
              preset === "P"
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-muted-foreground hover:border-foreground/40",
            ].join(" ")}
          >
            <span className="text-[0.65rem] font-medium">P. Full Note Keepsake</span>
            <span className="text-[0.55rem] opacity-60">4:5 · Keepsake</span>
            <span className="text-[0.52rem] opacity-75">Best for saving or printing</span>
          </button>
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
          {preset === "B" && (
            <div style={{ width: "52%", margin: "0 auto" }}>
              <WhatsAppStatusCanvas ref={statusRef} renderPlan={statusRenderPlan} />
            </div>
          )}
          {preset === "D" && (
            <div style={{ width: "88%", margin: "0 auto" }}>
              <InstagramSquareCanvas ref={canvasRef} renderPlan={squareRenderPlan} />
            </div>
          )}
          {preset === "P" && (
            <>
              {/* Off-screen full-size canvas captured by html-to-image */}
              <div style={{ position: "fixed", left: "-9999px", top: 0, pointerEvents: "none", userSelect: "none", zIndex: -1 }}>
                <PostcardCanvas ref={portraitRef} note={note} />
              </div>
              {/* Scaled preview — 56% of 432×540 — all receipt rows visible */}
              <div style={{ width: "242px", height: "303px", overflow: "hidden", margin: "0 auto", borderRadius: "4px", boxShadow: "0 4px 20px rgba(60,30,10,0.18)", flexShrink: 0 }}>
                <div style={{ transform: "scale(0.56)", transformOrigin: "top left", width: "432px", height: "540px" }}>
                  <PostcardCanvas note={note} />
                </div>
              </div>
              <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.06em" }}>
                Best for saving, printing, or reading later. For mobile sharing, use Instagram Square or WhatsApp Status.
              </p>
            </>
          )}
        </div>

        {/* Receipt / excerpt badge */}
        {preset === "B" && statusRenderPlan.contentMode !== "full" && (
          <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.07em", textTransform: "uppercase" }}>
            {statusRenderPlan.contentMode === "carousel_required"
              ? "Excerpt shown · full note too long for one card"
              : "Excerpt shown · full note available on site"}
          </p>
        )}
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
          ) : preset === "B" ? (
            <>
              <Button
                variant="note"
                onClick={handleStatusDownload}
                disabled={statusDownloadState === "downloading"}
                className="flex items-center justify-center gap-2"
              >
                <Download className="size-4" aria-hidden="true" />
                {statusDownloadState === "downloading" ? "Creating image…"
                  : statusDownloadState === "success" ? "Image downloaded"
                  : "Download WhatsApp Status PNG"}
              </Button>
              {statusDownloadState === "error" && (
                <p className="text-sm text-destructive">Could not create the image. Please try again.</p>
              )}
              {statusDownloadState === "manual" && (
                <p className="text-sm text-muted-foreground">Your image is ready. Long press or open it to save.</p>
              )}
              {statusDownloadState === "idle" && (
                <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.06em" }}>
                  1080×1920 PNG — post directly to WhatsApp Status or Instagram Story.
                </p>
              )}
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
          ) : preset === "P" ? (
            <>
              <Button
                variant="note"
                onClick={handlePortraitDownload}
                disabled={portraitDownloadState === "downloading"}
                className="flex items-center justify-center gap-2"
              >
                <Download className="size-4" aria-hidden="true" />
                {portraitDownloadState === "downloading" ? "Creating image…"
                  : portraitDownloadState === "success" ? "Image downloaded"
                  : "Download Full Note Keepsake PNG"}
              </Button>
              {portraitDownloadState === "error" && (
                <p className="text-sm text-destructive">Could not create the image. Please try again.</p>
              )}
              {portraitDownloadState === "manual" && (
                <p className="text-sm text-muted-foreground">Your image is ready. Long press or open it to save.</p>
              )}
              {portraitDownloadState === "idle" && (
                <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.06em" }}>
                  1080×1350 PNG — ready for Instagram, TikTok, and Facebook.
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
