import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import {
  B,
  F,
  InstagramSquareCanvas,
  PortraitEnvelopeCanvas,
} from "@/components/share-canvases";
import {
  buildFilename,
  buildRenderPlan,
  formatSocialCaption,
} from "@/lib/note-render-engine";
import { notes, type NoteEntry } from "@/lib/note-data";
import { trackEvent } from "@/lib/analytics";
import { Download } from "lucide-react";

export const Route = createFileRoute("/share-preview")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Share Card Preview — The Note You Needed Today" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SharePreviewPage,
});

type DownloadState = "idle" | "downloading" | "success" | "error" | "manual";

const APPROVAL_NOTE = notes.find((n) => n.id === "note-im-fine-but-not-really") as NoteEntry;

function SharePreviewPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const [captionLabel, setCaptionLabel] = useState("Copy caption + hashtags");

  const renderPlan = buildRenderPlan(APPROVAL_NOTE, "D");
  const portraitPlan = buildRenderPlan(APPROVAL_NOTE, "E");

  async function handleDownload() {
    if (!canvasRef.current) return;
    setDownloadState("downloading");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(canvasRef.current, { pixelRatio: 4, cacheBust: true });
      const filename = buildFilename(APPROVAL_NOTE, "D");
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
        noteId: APPROVAL_NOTE.id,
        categorySlug: APPROVAL_NOTE.categorySlug,
        preset: "D",
        contentMode: renderPlan.contentMode,
        source: "share_preview",
      });
    } catch {
      setDownloadState("error");
      setTimeout(() => setDownloadState("idle"), 4000);
      trackEvent("share_image_download_failed", {
        noteId: APPROVAL_NOTE.id,
        preset: "D",
        source: "share_preview",
      });
    }
  }

  async function handleCopyCaption() {
    await navigator.clipboard.writeText(formatSocialCaption(APPROVAL_NOTE));
    trackEvent("share_caption_copied", { noteId: APPROVAL_NOTE.id, preset: "D", source: "share_preview" });
    setCaptionLabel("Copied!");
    setTimeout(() => setCaptionLabel("Copy caption + hashtags"), 2500);
  }

  return (
    <AppLayout className="space-y-6 pb-12">

      {/* Page header */}
      <section className="space-y-2">
        <div className="stitched-label">Design approval preview · not live</div>
        <h1 className="font-display text-4xl leading-none">Gold Standard Square Card</h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Other formats are paused until this square card is approved.
        </p>
      </section>

      {/* Note label */}
      <section>
        <p className="eyebrow-copy">Note in preview</p>
        <p className="font-display text-xl leading-snug">{APPROVAL_NOTE.title}</p>
      </section>

      {/* Cards side by side */}
      <div className="space-y-2">
        <p className="eyebrow-copy">D · Square (excerpt + receipt)</p>
        <div style={{ maxWidth: 360, margin: "0 auto" }}>
          <InstagramSquareCanvas ref={canvasRef} renderPlan={renderPlan} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="eyebrow-copy">E · Portrait 4:5 (full note + receipt)</p>
        <div style={{ maxWidth: 360, margin: "0 auto" }}>
          <PortraitEnvelopeCanvas ref={portraitRef} renderPlan={portraitPlan} />
        </div>
      </div>

      {/* Diagnostics */}
      <div
        className="rounded-2xl border p-4 space-y-2 text-xs"
        style={{ borderColor: B.accentBorder, background: B.cream, fontFamily: F.label, letterSpacing: "0.07em" }}
      >
        <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", color: B.inkMuted }}>
          Render Engine · Diagnostic
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1" style={{ color: B.ink }}>
          <span style={{ color: B.inkMuted }}>Preset</span>
          <span>D · Instagram Square · 1:1</span>
          <span style={{ color: B.inkMuted }}>Content mode</span>
          <span style={{
            fontWeight: renderPlan.contentMode !== "full" ? 600 : 400,
            color: renderPlan.contentMode === "carousel_required"
              ? "oklch(0.55 0.14 30)"
              : renderPlan.contentMode === "excerpt"
              ? "oklch(0.52 0.10 55)"
              : B.ink,
          }}>
            {renderPlan.contentMode}
          </span>
          <span style={{ color: B.inkMuted }}>Text chars</span>
          <span>{renderPlan.mainText.length}</span>
          <span style={{ color: B.inkMuted }}>socialExcerpt</span>
          <span>{APPROVAL_NOTE.socialExcerpt ? `yes (${APPROVAL_NOTE.socialExcerpt.length} chars)` : "none"}</span>
          <span style={{ color: B.inkMuted }}>showReceipt</span>
          <span style={{ fontWeight: renderPlan.showReceipt ? 600 : 400 }}>{renderPlan.showReceipt ? "yes" : "no"}</span>
        </div>
        {renderPlan.layoutWarnings.map((w, i) => (
          <p key={i} style={{ color: "oklch(0.55 0.12 40)", fontSize: "0.7rem" }}>⚠ {w}</p>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          variant="note"
          onClick={handleDownload}
          disabled={downloadState === "downloading"}
          className="flex items-center justify-center gap-2"
        >
          <Download className="size-4" aria-hidden="true" />
          {downloadState === "downloading" ? "Creating PNG…"
            : downloadState === "success" ? "PNG downloaded"
            : "Download PNG"}
        </Button>
        {downloadState === "error" && (
          <p className="text-sm text-destructive">Could not create image. Please try again.</p>
        )}
        {downloadState === "manual" && (
          <p className="text-sm text-muted-foreground">Long press the image to save.</p>
        )}
        <Button variant="paper" onClick={handleCopyCaption}>{captionLabel}</Button>
      </div>

      <div
        className="rounded-2xl border border-dashed p-4 text-center text-xs text-muted-foreground"
        style={{ borderColor: "oklch(0.75 0.03 60 / 0.5)", fontFamily: F.label, letterSpacing: "0.08em", textTransform: "uppercase" }}
      >
        Internal preview · Do not share this URL
      </div>

    </AppLayout>
  );
}
