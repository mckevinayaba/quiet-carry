import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { PostcardCanvas } from "@/components/postcard-canvas";
import { Download } from "lucide-react";

export const Route = createFileRoute("/postcard-preview")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Full Note Postcard Spread — The Note You Needed Today" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PostcardPreviewPage,
});

type DownloadState = "idle" | "downloading" | "success" | "error" | "manual";

function PostcardPreviewPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");

  async function handleDownload() {
    if (!canvasRef.current) return;
    setDownloadState("downloading");
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 2.5,
        cacheBust: true,
        width: 432,
        height: 540,
      });
      const link = document.createElement("a");
      link.download = "the-note-you-needed-today-do-it-anyway-portrait.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      setDownloadState(isIOS ? "manual" : "success");
      if (!isIOS) setTimeout(() => setDownloadState("idle"), 3000);
    } catch {
      setDownloadState("error");
      setTimeout(() => setDownloadState("idle"), 4000);
    }
  }

  return (
    <AppLayout className="space-y-6 pb-12">

      {/* Page header */}
      <section className="space-y-2">
        <div className="stitched-label">Design Preview · Not Live</div>
        <h1 className="font-display text-4xl leading-none">Full Note Postcard Spread</h1>
        <p className="text-sm leading-6 text-muted-foreground">
          A long-form postcard format for notes that deserve the full message.
        </p>
      </section>

      {/* Postcard preview — scale to 50% for screen, full 720×450 captured for export */}
      {/* Portrait 4:5 — show at natural width (432px fits most screens) */}
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <div style={{ margin: "0 auto", width: "fit-content" }}>
          <PostcardCanvas ref={canvasRef} />
        </div>
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
      </div>

      <p className="text-xs text-muted-foreground text-center" style={{ fontFamily: "var(--font-label)", letterSpacing: "0.08em" }}>
        This format is for full notes that should not be cut into excerpts.
      </p>

      <div
        className="rounded-2xl border border-dashed p-4 text-center text-xs text-muted-foreground"
        style={{ borderColor: "oklch(0.75 0.03 60 / 0.5)", fontFamily: "var(--font-label)", letterSpacing: "0.08em", textTransform: "uppercase" }}
      >
        Internal preview · Do not share this URL
      </div>

    </AppLayout>
  );
}
