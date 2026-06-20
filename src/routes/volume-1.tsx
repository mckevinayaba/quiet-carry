import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { useAppModals } from "@/components/app-modals";
import { trackEvent } from "@/lib/analytics";
import { volumeOneSelarUrl } from "@/lib/note-data";
import type { VolumeChapter } from "@/lib/note-data";

const CHAPTERS: {
  name: VolumeChapter;
  description: string;
  exclusiveNote?: string;
}[] = [
  {
    name: "Survival",
    description: "Money, body, exhaustion, staying.",
  },
  {
    name: "Unsaid Grief",
    description: "The losses that never received a funeral.",
  },
  {
    name: "Becoming Visible",
    description: "The parts of yourself you buried to survive.",
  },
  {
    name: "Starting Over",
    description: "The life that ended before the next one began.",
  },
  {
    name: "Quiet Anger",
    description: "The chapter nobody wants to admit they need.",
    exclusiveNote: "Five exclusive notes — written only for Volume 1. Not available anywhere on the free platform.",
  },
];

const CONTENTS = [
  "15 designed notes",
  "15 mobile wallpapers",
  "15 quiet captions",
  "15 journal prompts",
  "5 private letters",
  "Opening letter from MAD",
  "Safety and care page",
  "Closing receipt page",
];

export const Route = createFileRoute("/volume-1")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    links: [{ rel: "canonical", href: "https://thenoteyouneeded.today/volume-1" }],
    meta: [
      { title: "Volume 1 | The Note You Needed Today" },
      {
        name: "description",
        content:
          "A private collection of notes, wallpapers, captions, prompts, and letters for the things people carry quietly.",
      },
      { property: "og:title", content: "Volume 1 | The Note You Needed Today" },
      {
        property: "og:description",
        content:
          "When life is too heavy to explain, Volume 1 gives you words you can keep, return to, and quietly share.",
      },
    ],
  }),
  component: VolumeOnePage,
});

function VolumeOnePage() {
  return (
    <AppLayout className="space-y-14 pb-12">
      <VolumeOneContent />
    </AppLayout>
  );
}

function VolumeOneContent() {
  const { openWaitlist } = useAppModals();

  return (
    <>
      {/* Header */}
      <section className="space-y-4 py-2">
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
            <Link to="/collections">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Collections
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="stitched-label">Volume 1</div>
          <Heart className="heart-mark size-4" aria-hidden />
        </div>
        <h1 className="text-balance font-display text-4xl leading-[1.02] text-foreground sm:text-5xl">
          The Note You Needed Today,<br />Volume 1
        </h1>
        <p className="font-display text-2xl leading-snug text-muted-foreground sm:text-3xl">
          The Things We Do Not Say Out Loud
        </p>
        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          When life is too heavy to explain, Volume 1 gives you words you can keep, return to,
          and quietly share.
        </p>
      </section>

      {/* Who it is for */}
      <section className="paper-panel space-y-5 p-6 sm:p-8">
        <span className="eyebrow-copy">Who this is for</span>
        <ul className="space-y-4">
          {[
            "For the person who has carried too much quietly.",
            "For the person who does not need another motivational quote.",
            "For the person who needs language that feels honest before it feels comforting.",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3 text-base leading-7 text-foreground">
              <span className="heart-mark mt-0.5 shrink-0" aria-hidden>♥</span>
              {line}
            </li>
          ))}
        </ul>
      </section>

      {/* What's inside */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="eyebrow-copy">What is inside</span>
          <h2 className="text-balance font-display text-3xl leading-tight text-foreground sm:text-4xl">
            A handmade emotional artifact.
          </h2>
          <p className="max-w-lg text-base leading-7 text-muted-foreground">
            Not a generic ebook. A private keepsake — built with warm parchment, soft paper,
            receipt motifs, and a hand-drawn heart from MAD.
          </p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {CONTENTS.map((item) => (
            <li
              key={item}
              className="stitched-edge flex items-center gap-3 p-4 text-sm text-foreground"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Chapter arc */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="eyebrow-copy">The five chapters</span>
          <h2 className="text-balance font-display text-3xl leading-tight text-foreground sm:text-4xl">
            One emotional arc. Five places to land.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((chapter, idx) => (
            <div key={chapter.name} className="paper-panel space-y-3 p-5">
              <div className="flex items-center justify-between">
                <span className="font-label text-2xl text-muted-foreground">0{idx + 1}</span>
                <Heart className="heart-mark size-4" aria-hidden />
              </div>
              <h3 className="font-display text-2xl leading-tight text-foreground">
                {chapter.name}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">{chapter.description}</p>
              {chapter.exclusiveNote ? (
                <p className="text-xs leading-5 text-muted-foreground/70 italic">
                  {chapter.exclusiveNote}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Price + CTA */}
      <section className="relative -mx-4 overflow-hidden bg-[color:var(--paper-deep)]/60 px-4 py-14 sm:-mx-6 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <div className="stitched-label mx-auto inline-flex">Volume 1</div>
          <h2 className="text-balance font-display text-4xl leading-[1.02] sm:text-5xl">
            The Things We Do Not Say Out Loud
          </h2>
          <p className="font-label text-2xl text-foreground">R149 · $7–$9</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {volumeOneSelarUrl === "#volume-1-coming-soon" ? (
              <>
                <Button
                  variant="note"
                  className="min-h-12"
                  onClick={() => {
                    trackEvent("volume1_waitlist_clicked", { source: "volume1_page" });
                    openWaitlist("volume");
                  }}
                >
                  Join the quiet list for first access
                  <ArrowRight aria-hidden />
                </Button>
                <p className="text-sm text-muted-foreground">First access coming soon.</p>
              </>
            ) : (
              <Button asChild variant="note" className="min-h-12">
                <a
                  href={volumeOneSelarUrl}
                  onClick={() => trackEvent("volume1_purchase_clicked", { source: "volume1_page" })}
                >
                  Get Volume 1
                  <ArrowRight aria-hidden />
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Safety disclaimer */}
      <section className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-xs leading-6 text-muted-foreground">
          The Note You Needed Today is not therapy, medical advice, diagnosis, or crisis support.
          If you feel in immediate danger or cannot stay safe, contact emergency services, a local
          crisis line, or someone you trust now.
        </p>
        <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
          <Link to="/support">Safety &amp; Support</Link>
        </Button>
      </section>
    </>
  );
}
