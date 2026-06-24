import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { volumeOneSelarUrl } from "@/lib/note-data";

export const Route = createFileRoute("/gift")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    links: [{ rel: "canonical", href: "https://thenoteyouneeded.today/gift" }],
    meta: [
      { title: "Gift Volume 1 | The Note You Needed Today" },
      {
        name: "description",
        content:
          "Give someone the words they have been waiting to hear. Gift Volume 1 — their access code arrives by email.",
      },
    ],
  }),
  component: GiftPage,
});

function GiftPage() {
  useEffect(() => {
    trackEvent("gift_page_viewed");
  }, []);

  return (
    <AppLayout className="flex min-h-[70vh] items-center justify-center pb-12">
      <div className="paper-panel w-full max-w-lg space-y-6 p-8 text-center">
        <div className="stitched-label mx-auto inline-flex">Volume 1</div>
        <h1 className="font-display text-4xl leading-[1.05] text-foreground">
          Give someone the words they have been waiting to hear.
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          Volume 1. One-time purchase. Their access code arrives by email.
        </p>
        <Button asChild variant="note" size="lg" className="min-h-12 w-full sm:w-auto">
          <a
            href={volumeOneSelarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("gift_purchase_clicked")}
          >
            Buy as a gift — R149
            <ArrowRight aria-hidden />
          </a>
        </Button>
      </div>
    </AppLayout>
  );
}
