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
  buildFilename,
  buildRenderPlan,
  formatBrandedShareText,
  formatSocialCaption,
} from "@/lib/note-render-engine";
import { trackEvent } from "@/lib/analytics";
import type { NoteEntry } from "@/lib/note-data";

export { Share2 as ShareIcon };

type DownloadState = "idle" | "downloading" | "success" | "error" | "manual";

// "FB" and "LN" are modal-only virtual presets — they reuse the InstagramSquare canvas
// with different filenames. C (Instagram Story) and F (Pinterest) are hidden until live.
type ModalPreset = "A" | "B" | "D" | "FB" | "LN" | "P";

// Ordered list of formats shown in the modal. displayId is what the user sees (A-E, P).
// id is the internal key used for state, canvas routing, and analytics.
const VISIBLE_PRESETS: ReadonlyArray<{
  id: ModalPreset;
  displayId: string;
  label: string;
  sub: string | null;
  rec: string;
}> = [
  { id: "A",  displayId: "A", label: "Send Quietly",     sub: null,   rec: "Private · no image" },
  { id: "B",  displayId: "B", label: "WhatsApp Status",  sub: "9:16", rec: "Best for WhatsApp Status" },
  { id: "D",  displayId: "C", label: "Instagram Square", sub: "1:1",  rec: "Recommended for mobile" },
  { id: "FB", displayId: "D", label: "Facebook Post",    sub: "1:1",  rec: "Recommended for Facebook" },
  { id: "LN", displayId: "E", label: "LinkedIn Post",    sub: "1:1",  rec: "Recommended for LinkedIn" },
];

// Analytics-friendly names for each preset
const ANALYTICS_PRESET: Record<ModalPreset, string> = {
  A:  "send_quietly",
  B:  "whatsapp_status",
  D:  "instagram_square",
  FB: "facebook_post",
  LN: "linkedin_post",
  P:  "full_note_keepsake",
};

// Download suffixes for square variants
const SQUARE_SUFFIX: Record<"D" | "FB" | "LN", string> = {
  D:  "instagram-square",
  FB: "facebook-post",
  LN: "linkedin-post",
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
  const [squareDownloadState, setSquareDownloadState] = useState<DownloadState>("idle");
  const [statusDownloadState, setStatusDownloadState] = useState<DownloadState>("idle");
  const [portraitDownloadState, setPortraitDownloadState] = useState<DownloadState>("idle");

  const squareRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  const squareRenderPlan = buildRenderPlan(note, "D");
  const statusRenderPlan = buildRenderPlan(note, "B");

  // Honour caller intent: jump to the requested preset and reset download state on open
  useEffect(() => {
    if (open) {
      setPreset(initialPreset);
      setSquareDownloadState("idle");
      setStatusDownloadState("idle");
      setPortraitDownloadState("idle");
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function selectPreset(id: ModalPreset) {
    setPreset(id);
    setSquareDownloadState("idle");
    setStatusDownloadState("idle");
    setPortraitDownloadState("idle");
    if (id !== "A") {
      trackEvent("share_preset_selected", {
        noteId: note.id,
        categorySlug: note.categorySlug,
        preset: ANALYTICS_PRESET[id],
        source: "modal",
      });
    }
  }

  // Square variants (D, FB, LN) all use the same canvas and render plan;
  // only the download filename and analytics event differ.
  async function handleSquareDownload(variant: "D" | "FB" | "LN") {
    if (!squareRef.current) return;
    setSquareDownloadState("downloading");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(squareRef.current, { pixelRatio: 4, cacheBust: true });
      const slug = note.id.replace(/^note-/, "");
      const filename = `the-note-you-needed-today-${slug}-${SQUARE_SUFFIX[variant]}.png`;
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      setSquareDownloadState(isIOS ? "manual" : "success");
      if (!isIOS) setTimeout(() => setSquareDownloadState("idle"), 3000);
      trackEvent("share_image_downloaded", {
        noteId: note.id, categorySlug: note.categorySlug,
        preset: ANALYTICS_PRESET[variant], contentMode: squareRenderPlan.contentMode, source: "modal",
      });
    } catch {
      setSquareDownloadState("error");
      setTimeout(() => setSquareDownloadState("idle"), 4000);
      trackEvent("share_image_download_failed", {
        noteId: note.id, categorySlug: note.categorySlug,
        preset: ANALYTICS_PRESET[variant], source: "modal",
      });
    }
  }

  async function handleStatusDownload() {
    if (!statusRef.current) return;
    setStatusDownloadState("downloading");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(statusRef.current, { pixelRatio: 4, cacheBust: true });
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
        preset: ANALYTICS_PRESET["B"], contentMode: statusRenderPlan.contentMode, source: "modal",
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
      link.download = `the-note-you-needed-today-${slug}-full-note-keepsake.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      setPortraitDownloadState(isIOS ? "manual" : "success");
      if (!isIOS) setTimeout(() => setPortraitDownloadState("idle"), 3000);
      trackEvent("share_image_downloaded", {
        noteId: note.id, categorySlug: note.categorySlug,
        preset: ANALYTICS_PRESET["P"], contentMode: "full", source: "modal",
      });
    } catch {
      setPortraitDownloadState("error");
      setTimeout(() => setPortraitDownloadState("idle"), 4000);
    }
  }

  async function handleCopyText() {
    await navigator.clipboard.writeText(formatBrandedShareText(note));
    trackEvent("share_text_copied", { noteId: note.id, categorySlug: note.categorySlug, preset: ANALYTICS_PRESET["A"], source: "modal" });
    setCopyLabel("Copied!");
    setTimeout(() => setCopyLabel("Copy share text"), 2500);
  }

  async function handleNativeShare() {
    const text = formatBrandedShareText(note);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        trackEvent("share_native_opened", { noteId: note.id, categorySlug: note.categorySlug, preset: ANALYTICS_PRESET["A"], source: "modal" });
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
    trackEvent("share_caption_copied", { noteId: note.id, categorySlug: note.categorySlug, preset: ANALYTICS_PRESET[preset], source: "modal" });
    setCaptionLabel("Copied!");
    setTimeout(() => setCaptionLabel("Copy caption"), 2500);
  }

  const isSquare = preset === "D" || preset === "FB" || preset === "LN";

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
          {VISIBLE_PRESETS.map((p) => {
            const isSelected = preset === p.id;
            return (
              <button
                key={p.id}
                onClick={() => selectPreset(p.id)}
                style={{ fontFamily: F.label, letterSpacing: "0.07em" }}
                className={[
                  "flex flex-col items-start gap-0.5 rounded-xl border px-2.5 py-1.5 text-left transition-colors",
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/40",
                ].join(" ")}
              >
                <span className="text-[0.65rem] font-medium">{p.displayId}. {p.label}</span>
                {p.sub && <span className="text-[0.55rem] opacity-60">{p.sub}</span>}
                <span className="text-[0.52rem] opacity-75">{p.rec}</span>
              </button>
            );
          })}
          {/* Full Note Keepsake — portrait postcard */}
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
          {/* D, FB, LN all render the same square canvas — only download differs */}
          {isSquare && (
            <div style={{ width: "88%", margin: "0 auto" }}>
              <InstagramSquareCanvas ref={squareRef} renderPlan={squareRenderPlan} />
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
                Best for saving, printing, or reading later. For mobile sharing, use Instagram Square.
              </p>
            </>
          )}
        </div>

        {/* Excerpt / receipt badges */}
        {preset === "B" && statusRenderPlan.contentMode !== "full" && (
          <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.07em", textTransform: "uppercase" }}>
            {statusRenderPlan.contentMode === "carousel_required"
              ? "Excerpt shown · full note too long for one card"
              : "Excerpt shown · full note available on site"}
          </p>
        )}
        {isSquare && (
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
          ) : isSquare ? (
            <>
              <Button
                variant="note"
                onClick={() => handleSquareDownload(preset as "D" | "FB" | "LN")}
                disabled={squareDownloadState === "downloading"}
                className="flex items-center justify-center gap-2"
              >
                <Download className="size-4" aria-hidden="true" />
                {squareDownloadState === "downloading" ? "Creating image…"
                  : squareDownloadState === "success" ? "Image downloaded"
                  : preset === "FB" ? "Download Facebook Post PNG"
                  : preset === "LN" ? "Download LinkedIn Post PNG"
                  : "Download Instagram Square PNG"}
              </Button>
              {squareDownloadState === "error" && (
                <p className="text-sm text-destructive">We could not create the image. Please try again.</p>
              )}
              {squareDownloadState === "manual" && (
                <p className="text-sm text-muted-foreground">Your image is ready. Long press or open it to save.</p>
              )}
              {squareDownloadState === "idle" && (
                <p className="text-center text-xs text-muted-foreground" style={{ fontFamily: F.label, letterSpacing: "0.06em" }}>
                  {preset === "FB" ? "1080×1080 PNG — post directly to Facebook." :
                   preset === "LN" ? "1080×1080 PNG — share to LinkedIn as a reflective post." :
                   "1080×1080 PNG — post directly to Instagram or Facebook."}
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
                  1080×1350 PNG — save, print, or share the full note.
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
