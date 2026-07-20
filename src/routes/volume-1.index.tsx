import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { volumeOneSelarUrl } from "@/lib/note-data";
import { VOLUME1_CONTENTS } from "@/data/volume1";

const CHAPTERS: {
  number: number;
  name: string;
  chapterLine: string;
}[] = [
  {
    number: 1,
    name: "Survival",
    chapterLine: "You got through things nobody clapped for.",
  },
  {
    number: 2,
    name: "Unsaid Pain",
    chapterLine: "The truths you swallowed until they started living in your body.",
  },
  {
    number: 3,
    name: "Loss",
    chapterLine: "The grief that kept arriving without asking permission.",
  },
  {
    number: 4,
    name: "Betrayal",
    chapterLine: "The hurt people wanted you to forgive before they were willing to name.",
  },
  {
    number: 5,
    name: "Staying",
    chapterLine: "For the days when staying takes everything you have left.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Purchase",
    copy: "Click Get Volume 1. Complete payment via Selar — card, EFT, or mobile payment accepted.",
  },
  {
    step: "2",
    title: "Receive",
    copy: "Your unique access code arrives in your email within minutes of purchase.",
  },
  {
    step: "3",
    title: "Read",
    copy: "Enter your code at /volume-1/unlock. Volume 1 opens immediately. It's yours to return to, forever.",
  },
];

export const Route = createFileRoute("/volume-1/")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    links: [{ rel: "canonical", href: "https://thenoteyouneeded.today/volume-1" }],
    meta: [
      {
        title:
          "Volume 1: The Things We Do Not Say Out Loud | The Note You Needed Today",
      },
      {
        name: "description",
        content:
          "15 notes. 5 chapters. Written for the weight you carry quietly. A private digital collection for the grief, the apology that never came, the truth you kept swallowing.",
      },
      {
        property: "og:title",
        content: "Volume 1: The Things We Do Not Say Out Loud | The Note You Needed Today",
      },
      {
        property: "og:description",
        content:
          "Fifteen deeply written notes across five emotional chapters. The free note is for today. Volume 1 is for the weight that keeps returning.",
      },
    ],
  }),
  component: VolumeOneIndexPage,
});

function VolumeOneIndexPage() {
  return (
    <AppLayout className="space-y-14 pb-12">
      <VolumeOneContent />
    </AppLayout>
  );
}

function VolumeOneContent() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(localStorage.getItem("volume1_unlocked") === "true");
  }, []);

  function scrollToCta() {
    document.getElementById("volume1-cta")?.scrollIntoView({ behavior: "smooth" });
  }

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
          The Note You Needed Today,
          <br />
          Volume 1
        </h1>
        <p className="font-display text-2xl leading-snug text-muted-foreground sm:text-3xl">
          The Things We Do Not Say Out Loud
        </p>
        <p className="max-w-xl text-base leading-7 text-muted-foreground">
          15 notes. 5 chapters. Written for the weight you carry quietly.
        </p>
      </section>

      {/* Product description */}
      <section className="paper-panel space-y-5 p-6 sm:p-8">
        <div className="mx-auto max-w-2xl space-y-4 text-base leading-7 text-foreground">
          <p>
            Fifteen deeply written notes across five emotional chapters, created for the days when
            you need more than advice but cannot find the words yourself.
          </p>
          <p className="text-muted-foreground">
            This collection is for the grief that followed you into ordinary days, the apology that
            never came, the truth you kept swallowing, the relationship you survived, the money that
            never stretched, the body that got tired, and the parts of yourself that became
            exhausted from pretending.
          </p>
          <p className="font-display text-xl leading-snug text-foreground sm:text-2xl">
            The free note is for today.
            <br />
            Volume 1 is for the weight that keeps returning.
          </p>
        </div>
      </section>

      {/* What's inside */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="eyebrow-copy">What is inside</span>
          <h2 className="text-balance font-display text-3xl leading-tight text-foreground sm:text-4xl">
            A private digital collection you can return to.
          </h2>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {VOLUME1_CONTENTS.map((item) => (
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
            Five emotional chapters. Fifteen notes. Words for the things people often carry without
            knowing how to explain them.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((chapter) =>
            unlocked ? (
              <Link
                key={chapter.name}
                to="/volume-1/read/$chapter"
                params={{ chapter: String(chapter.number) }}
                className="paper-panel block space-y-3 p-5 transition-shadow hover:shadow-md"
              >
                <ChapterCardBody chapter={chapter} />
              </Link>
            ) : (
              <button
                key={chapter.name}
                type="button"
                onClick={scrollToCta}
                className="paper-panel block space-y-3 p-5 text-left transition-shadow hover:shadow-md"
              >
                <ChapterCardBody chapter={chapter} />
              </button>
            ),
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="eyebrow-copy">How it works</span>
          <h2 className="text-balance font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Three quiet steps.
          </h2>
        </div>
        <div className="flex flex-col gap-8 sm:flex-row">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="flex-1 space-y-3">
              <div
                className="flex items-center justify-center rounded-full font-display text-base"
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #C4A882",
                  color: "#C4A882",
                }}
              >
                {item.step}
              </div>
              <h3 className="font-display text-xl text-foreground">{item.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Price + CTA */}
      <section
        id="volume1-cta"
        className="relative -mx-4 overflow-hidden bg-[color:var(--paper-deep)]/60 px-4 py-14 sm:-mx-6 sm:px-6"
      >
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <div className="stitched-label mx-auto inline-flex">Volume 1</div>
          <h2 className="text-balance font-display text-4xl leading-[1.02] sm:text-5xl">
            The Things We Do Not Say Out Loud
          </h2>
          <p className="font-label text-2xl text-foreground">R149 · $7–$9</p>
          <div className="flex flex-col items-center gap-3">
            <Button asChild variant="note" className="min-h-12">
              <a
                href={volumeOneSelarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("volume1_purchase_clicked", { source: "volume1_page" })}
              >
                Get Volume 1 — R149
                <ArrowRight aria-hidden />
              </a>
            </Button>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Your purchase gives you access to Volume 1 and helps keep the daily note freely
              available to people who need words today.
            </p>
            <Button asChild variant="paper" className="min-h-12">
              <Link to="/volume-1/unlock">
                I already have a code
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Safety disclaimer */}
      <section className="mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-xs leading-6 text-muted-foreground">
          The Note You Needed Today is not therapy, medical advice, diagnosis, or crisis support. If
          you feel in immediate danger or cannot stay safe, contact emergency services, a local
          crisis line, or someone you trust now.
        </p>
        <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
          <Link to="/support">Safety &amp; Support</Link>
        </Button>
      </section>

      {/* Mobile sticky CTA — sits above the bottom nav below the sm breakpoint */}
      <div
        className="fixed inset-x-0 bottom-[72px] z-40 sm:bottom-0 md:hidden"
        style={{
          background: "#8B6F5E",
          padding: "16px 24px",
        }}
      >
        <a
          href={volumeOneSelarUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("volume1_purchase_clicked", { source: "volume1_sticky_bar" })}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            color: "#FAF6F1",
            fontFamily: "var(--font-label)",
            fontSize: "15px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Get Volume 1 — R149 →
        </a>
      </div>
    </>
  );
}

function ChapterCardBody({
  chapter,
}: {
  chapter: { number: number; name: string; chapterLine: string };
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="font-label text-2xl text-muted-foreground">0{chapter.number}</span>
        <Heart className="heart-mark size-4" aria-hidden />
      </div>
      <h3 className="font-display text-2xl leading-tight text-foreground">{chapter.name}</h3>
      <p className="text-sm leading-6 text-muted-foreground">{chapter.chapterLine}</p>
    </>
  );
}
