import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Feather,
  Heart,
  Layers2,
  LockKeyhole,
  Mail,
  MessageSquareHeart,
  NotebookPen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { DailyLetterSignup } from "@/components/daily-letter-signup";
import { MomentBanner } from "@/components/moment-banner";
import { ReceiptBlock } from "@/components/receipt-block";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppModals } from "@/components/app-modals";
import { trackEvent } from "@/lib/analytics";
import { categories, featuredNote, volumeOneSelarUrl } from "@/lib/note-data";
import {
  getKeptNotes,
  keepNote,
  logSentNote,
  registerMeaningfulGuestAction,
} from "@/lib/note-storage";
import { buildShareText } from "@/lib/share";
import { isValidEmail, saveWaitlistEntry } from "@/lib/waitlist";

import heroCollage from "@/assets/hero-note-collage.jpg";
import manifestoWindow from "@/assets/manifesto-window.jpg";
import volumeCollage from "@/assets/volume-one-collage.jpg";

export const Route = createFileRoute("/")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    links: [{ rel: "canonical", href: "https://thenoteyouneeded.today/" }],
    meta: [
      { title: "The Note You Needed Today — Find words for what you carry quietly" },
      {
        name: "description",
        content:
          "Find words for what you carry quietly. A private-first emotional language platform for the feelings you cannot always explain.",
      },
      { property: "og:title", content: "The Note You Needed Today" },
      {
        property: "og:description",
        content:
          "Find words for what you carry quietly. A private-first emotional language platform.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <AppLayout className="space-y-24 pb-12 sm:space-y-32">
      <Landing />
    </AppLayout>
  );
}

function Landing() {
  return (
    <>
      <MomentBanner />
      <Hero />
      <CategoriesPreview />
      <TodaysNote />
      <HowItWorks />
      <DailyLetterSignup />
      <WelcomeManifesto />
      <PrivateByDesign />
      <VolumeOne />
      <Waitlist />
      <FeedbackBlock />
      <SiteFooter />
    </>
  );
}

/* -------------------------- Hero -------------------------- */

function Hero() {
  return (
    <section className="relative -mx-4 overflow-hidden px-4 pt-4 sm:-mx-6 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[120%] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--accent)_22%,transparent)_0%,transparent_55%)]" />
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground"
              aria-label="Now open quietly"
            >
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              Now open quietly
            </span>
          </div>

          <div className="space-y-5">
            <p className="max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              For the people who said "I'm fine" and meant "I don't know how to explain this."
            </p>
            <h1 className="text-balance font-display text-[3.25rem] leading-[0.98] text-foreground sm:text-7xl lg:text-[5.25rem]">
              The Note You
              <br />
              Needed Today
            </h1>
            <p className="max-w-xl font-display text-2xl leading-snug text-foreground sm:text-3xl">
              Find words for what you carry quietly.
            </p>
            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Not advice. Not performance. Just the note you needed before you knew how to ask.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="note" className="min-h-14 text-base">
              <Link to="/feelings">Find the note you need today</Link>
            </Button>
            <Button asChild size="lg" variant="paper" className="min-h-14 text-base">
              <Link to="/note/$categorySlug" params={{ categorySlug: featuredNote.categorySlug }}>
                Read today's note
              </Link>
            </Button>
          </div>

          <p className="text-xs leading-6 text-muted-foreground">
            No likes &middot; No comments &middot; No followers &middot; No performance &middot; Just private words.
          </p>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] border border-border shadow-[0_40px_80px_-40px_color-mix(in_oklab,var(--paper-shadow)_70%,transparent)] rotate-[-1.2deg]">
        <img
          src={heroCollage}
          alt="A handmade collage: an opened vintage envelope, a handwritten note that reads 'the truth was too heavy', a typewritten FROM TO DATE TOTAL receipt, pressed flowers, a navy stitched fabric ribbon and a small hand-drawn heart"
          width={1536}
          height={2048}
          className="h-full w-full object-cover object-[center_62%]"
        />
      </div>

      {/* Floating phone mockup — the calmer in-app reading view */}
      <div
        aria-hidden
        className="absolute -bottom-6 -left-2 hidden w-[17rem] rotate-[-4deg] sm:block lg:-left-12 lg:-bottom-10 lg:w-[19rem]"
      >
        <PhoneMockup />
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="rounded-[2.4rem] border border-border bg-foreground/90 p-2 shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--paper-shadow)_75%,transparent)]">
      <div className="rounded-[2rem] border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="stitched-label !px-2 !py-1 !text-[0.6rem]">Note</div>
          <Heart className="heart-mark size-4" aria-hidden />
        </div>
        <p className="font-note text-[1.45rem] leading-[1.05] text-[color:var(--paper-ink)]">
          I hope you heal from the truth you keep swallowing.
        </p>
        <div className="mt-4 grid gap-1.5">
          <div className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-[0.7rem] text-foreground">
            Keep this Note
          </div>
          <div className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-[0.7rem] text-foreground">
            Send this Quietly
          </div>
          <div className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-[0.7rem] text-foreground">
            Write from This
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Not social media -------------------------- */

function NotSocialMedia() {
  const lines = [
    "No likes.",
    "No public comments.",
    "No followers.",
    "No performance.",
    "Just private words for what you are carrying.",
  ];
  return (
    <section className="relative -mx-4 overflow-hidden bg-[color:var(--paper-ink)] px-4 py-20 text-[color:var(--background)] sm:-mx-6 sm:px-6 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.08] [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_45%),radial-gradient(circle_at_80%_80%,white_0,transparent_45%)]" />
      <div className="relative mx-auto max-w-3xl space-y-8 text-center">
        <span className="eyebrow-copy !text-[color:var(--background)]/70">A quieter promise</span>
        <h2 className="text-balance font-display text-5xl leading-[1.02] sm:text-6xl">
          This is not social media.
        </h2>
        <ul className="space-y-3 text-xl leading-9 sm:text-2xl">
          {lines.map((line) => (
            <li key={line} className="opacity-90">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------- How it works -------------------------- */

function HowItWorks() {
  const steps = [
    {
      icon: Heart,
      title: "Choose what you are carrying.",
      copy: "Pick the feeling underneath the day. We will meet you there, gently.",
    },
    {
      icon: Mail,
      title: "Receive the note you needed.",
      copy: "One quiet note. Written for the part of you that has been carrying too much.",
    },
    {
      icon: NotebookPen,
      title: "Keep it, send it, or write from it privately.",
      copy: "Save it to your private shelf. Send it to someone softly. Or write your own reflection.",
    },
  ];
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <span className="eyebrow-copy">How it works</span>
        <h2 className="max-w-2xl text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
          Three quiet steps. Nothing performative.
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, copy }, idx) => (
          <div key={title} className="paper-panel relative space-y-3 p-6">
            <div className="flex items-center justify-between">
              <span className="font-label text-3xl text-muted-foreground">0{idx + 1}</span>
              <Icon className="size-5 text-muted-foreground" aria-hidden />
            </div>
            <h3 className="font-display text-2xl leading-tight text-foreground">{title}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------- Categories preview -------------------------- */

function CategoriesPreview() {
  return (
    <section id="feelings" className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl space-y-3">
          <span className="eyebrow-copy">What are you carrying today?</span>
          <h2 className="text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
            Choose the door that knows your name today.
          </h2>
          <p className="text-base leading-7 text-foreground">
            Choose what you are feeling. Read the note. Keep it, send it, or share it when the words
            are too heavy to find alone.
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Every feeling has a room. Choose the one that knows your name today.
          </p>
        </div>
        <Button asChild variant="paper" className="min-h-11">
          <Link to="/feelings">
            See all feelings
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/note/$categorySlug"
            params={{ categorySlug: c.slug }}
            className="group stitched-edge space-y-2 p-5 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-balance font-display text-2xl leading-[1.1] text-foreground">
                {c.title}
              </h3>
              <ArrowRight
                className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{c.subtitle}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* -------------------------- Today's Note -------------------------- */

interface LandingActionResult {
  text: string;
  shelfLink?: boolean;
}

function TodaysNote() {
  const [actionResult, setActionResult] = useState<LandingActionResult | null>(null);
  const [isKept, setIsKept] = useState(false);

  useEffect(() => {
    trackEvent("note_opened", {
      noteId: featuredNote.id,
      category: featuredNote.categorySlug,
      source: "landing",
    });
    setIsKept(getKeptNotes().some((n) => n.noteId === featuredNote.id));
  }, []);

  const handleKeep = () => {
    if (isKept) {
      setActionResult({ text: "Already kept in your Shelf.", shelfLink: true });
      return;
    }
    keepNote(featuredNote);
    trackEvent("note_kept", { noteId: featuredNote.id, source: "landing" });
    setIsKept(true);
    setActionResult({
      text: "Kept. You can come back to this when you need it.",
      shelfLink: true,
    });
    registerMeaningfulGuestAction();
  };

  const handleSend = async () => {
    const shareText = buildShareText(featuredNote.sendableText);
    let shared = false;
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title: featuredNote.title, text: shareText });
        shared = true;
      } else if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(shareText);
        shared = true;
      }
    } catch {
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(shareText);
          shared = true;
        }
      } catch {
        // all sharing methods unavailable
      }
    }
    logSentNote(featuredNote);
    trackEvent("note_sent", { noteId: featuredNote.id, source: "landing" });
    setActionResult({
      text: shared
        ? "Copied. Send it to someone who may need words today."
        : "Copy the note manually.",
    });
    registerMeaningfulGuestAction();
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div className="space-y-4">
        <span className="eyebrow-copy">Today's Note</span>
        <h2 className="text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
          One note. Written for the part of you that has been quiet.
        </h2>
        <p className="text-base leading-7 text-muted-foreground">
          Today, start with one note. Keep it for yourself. Send it softly to someone. Or write your
          own reflection from it.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild variant="note" className="min-h-11">
            <Link to="/note/$categorySlug" params={{ categorySlug: featuredNote.categorySlug }}>
              Read today's note
            </Link>
          </Button>
          <Button asChild variant="paper" className="min-h-11">
            <Link to="/feelings">Choose another feeling</Link>
          </Button>
        </div>
      </div>

      <article className="space-y-4">
        {actionResult ? (
          <div className="paper-panel space-y-3 text-base leading-7 text-foreground" role="status">
            <p>{actionResult.text}</p>
            {actionResult.shelfLink ? (
              <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
                <Link to="/shelf">View in Shelf</Link>
              </Button>
            ) : null}
          </div>
        ) : null}

        <div className="note-surface">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="stitched-label">The Note You Needed Today</div>
              <Heart className="heart-mark" aria-hidden />
            </div>
            <div className="note-copy">{featuredNote.mainText}</div>
          </div>
        </div>

        <ReceiptBlock
          from={featuredNote.receiptFrom}
          to={featuredNote.receiptTo}
          date={featuredNote.receiptDate}
          total={featuredNote.receiptTotal}
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <Button
            variant="paper"
            className="min-h-14 items-start justify-start px-4 py-3 text-left"
            onClick={handleKeep}
          >
            <LockKeyhole aria-hidden />
            <span className="flex flex-col items-start gap-0.5">
              <span>{isKept ? "Kept in Shelf" : "Keep this Note"}</span>
              <span className="text-[0.7rem] text-muted-foreground">
                {isKept ? "Already in your Shelf" : "Save it privately"}
              </span>
            </span>
          </Button>
          <Button
            variant="paper"
            className="min-h-14 items-start justify-start px-4 py-3 text-left"
            onClick={handleSend}
          >
            <Mail aria-hidden />
            <span className="flex flex-col items-start gap-0.5">
              <span>Send this Quietly</span>
              <span className="text-[0.7rem] text-muted-foreground">Share softly</span>
            </span>
          </Button>
          <Button
            asChild
            variant="paper"
            className="min-h-14 items-start justify-start px-4 py-3 text-left"
            onClick={() =>
              trackEvent("reflection_started", { noteId: featuredNote.id, source: "landing" })
            }
          >
            <Link to="/write/$categorySlug" params={{ categorySlug: featuredNote.categorySlug }}>
              <NotebookPen aria-hidden />
              <span className="flex flex-col items-start gap-0.5">
                <span>Write from This</span>
                <span className="text-[0.7rem] text-muted-foreground">Begin a reflection</span>
              </span>
            </Link>
          </Button>
        </div>
      </article>
    </section>
  );
}

/* -------------------------- Private by design -------------------------- */

function PrivateByDesign() {
  const promises = [
    { icon: LockKeyhole, text: "Your notes are private." },
    { icon: ShieldCheck, text: "Your reflections are private." },
    { icon: Feather, text: "No public profile." },
    { icon: Heart, text: "No comment pressure." },
    { icon: Sparkles, text: "No performance." },
  ];
  return (
    <section className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="relative overflow-hidden rounded-[28px] border border-border shadow-[0_30px_60px_-40px_color-mix(in_oklab,var(--paper-shadow)_70%,transparent)]">
        <img
          src={manifestoWindow}
          alt="A person sitting alone by a window at dusk, holding a phone showing a quiet note"
          width={1280}
          height={1280}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-5">
        <span className="eyebrow-copy">Private by design</span>
        <h2 className="text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
          A quieter place to land.
        </h2>
        <p className="max-w-md text-base leading-7 text-muted-foreground">
          The internet rewards what is loud. We are building something for what stays unsaid.
        </p>
        <ul className="space-y-2.5">
          {promises.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-base text-foreground">
              <span className="icon-seal !size-9">
                <Icon className="size-4" aria-hidden />
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------- Volume 1 -------------------------- */

function VolumeOne() {
  return (
    <section className="paper-panel relative overflow-hidden p-6 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="stitched-label">Volume 1</div>
          </div>
          <div className="space-y-2">
            <h2 className="text-balance font-display text-4xl leading-[1.02] sm:text-5xl">
              Volume 1 is here.
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              15 notes. 5 chapters. Written for the weight you carry quietly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button asChild variant="paper" className="min-h-12">
              <Link to="/volume-1/preview">Read a free note →</Link>
            </Button>
            <Button asChild variant="note" className="min-h-12">
              <a
                href={volumeOneSelarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("volume1_purchase_clicked", { source: "homepage" })}
              >
                Get Volume 1 — R149 →
              </a>
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[24px] border border-border shadow-[0_30px_60px_-40px_color-mix(in_oklab,var(--paper-shadow)_70%,transparent)] rotate-[1deg]">
          <img
            src={volumeCollage}
            alt="A stack of handwritten notes tied with twine and a navy stitched fabric tag with a pressed flower, beside a kraft envelope sealed with a red MAD wax stamp"
            width={1536}
            height={1024}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* -------------------------- Welcome + Why This Exists -------------------------- */

function WelcomeManifesto() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mx-auto max-w-3xl space-y-0">
      {/* ── Envelope flap ── */}
      <div aria-hidden className="overflow-hidden">
        <div
          className="mx-auto h-16 w-full border-l border-r border-t border-border bg-[color:var(--paper-deep)]/20"
          style={{ clipPath: "polygon(0 100%, 50% 0%, 100% 100%)" }}
        />
      </div>

      {/* ── Welcome card ── */}
      <section
        aria-labelledby="welcome-heading"
        className="note-surface space-y-8 px-6 py-10 sm:px-12 sm:py-14"
      >
        <div className="flex items-start justify-between">
          <div className="stitched-label">Welcome</div>
          <Heart className="heart-mark size-5" aria-hidden />
        </div>

        <div className="space-y-3">
          <span className="eyebrow-copy">Find words for what you carry quietly.</span>
          <h2
            id="welcome-heading"
            className="text-balance font-display text-4xl leading-[1.02] sm:text-5xl"
          >
            Welcome to The Note You Needed Today
          </h2>
        </div>

        <div className="mx-auto max-w-2xl space-y-5 text-[1.0625rem] leading-[1.85] text-foreground">
          <p>Some days, you do not need advice.</p>

          <p>You do not need someone to tell you to be strong.</p>

          <p>
            You do not need another perfect quote from the internet pretending that pain is simple,
            healing is quick, and moving on is just a decision.
          </p>

          <p className="font-display text-2xl text-foreground sm:text-3xl">
            Some days, you need words.
          </p>

          <div className="space-y-2 text-muted-foreground">
            <p>Words for the thing you have been swallowing.</p>
            <p>Words for the grief that still follows you into normal days.</p>
            <p>Words for the betrayal that changed how you trust people.</p>
            <p>Words for the love that left but somehow stayed in your body.</p>
          </div>

          <p className="text-muted-foreground">
            Words for the money that never stretched, the job that ended, the family that hurt, the
            apology that never came, the dream that delayed, the marriage that became a memory, the
            body that is tired, and the loneliness nobody sees because you still know how to
            function.
          </p>

          <p>That is why this place exists.</p>

          <p className="font-display text-xl text-foreground sm:text-2xl">
            The Note You Needed Today was created for the moments people carry quietly.
          </p>

          <div className="space-y-2 text-muted-foreground">
            <p>The moments when you are not ready to explain everything.</p>
            <p>
              The moments when someone asks, "How are you?" and the honest answer feels too heavy to
              say out loud.
            </p>
            <p>
              The moments when you are smiling in public, answering messages, raising children,
              paying bills, attending meetings, helping others, showing up for everyone, and still
              trying not to collapse somewhere nobody can see.
            </p>
          </div>

          <p>Here, you can choose what you are carrying.</p>

          <ul className="space-y-1.5 text-muted-foreground">
            <li>You can read a note.</li>
            <li>You can keep it for later.</li>
            <li>You can send it quietly to someone who may need it.</li>
            <li>You can download it as a card.</li>
            <li>Or you can simply sit with it until the words feel less heavy.</li>
          </ul>

          <div className="space-y-2 border-l-2 border-border pl-5 text-muted-foreground">
            <p>This is not a quote site.</p>
            <p>This is not here to rush your healing.</p>
            <p>This is not here to decorate your pain.</p>
            <p>
              This is not here to tell you to forgive before you have been heard, move on before you
              have understood what happened, or be strong before anyone has asked what strength has
              already cost you.
            </p>
          </div>

          <p className="font-display text-xl text-foreground sm:text-2xl">
            This is a language space.
          </p>

          <p className="text-muted-foreground">
            A quiet place for the things people survive without always having the words to explain.
          </p>
        </div>
      </section>

      {/* ── Decorative receipt separator ── */}
      <div
        aria-hidden
        className="flex justify-center border-x border-border bg-[color:var(--paper-deep)]/10 px-6 py-5"
      >
        <div className="font-label text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
          <div className="flex gap-5">
            <span className="w-12 text-right opacity-50">FROM</span>
            <span>The things people carry quietly</span>
          </div>
          <div className="mt-1 flex gap-5">
            <span className="w-12 text-right opacity-50">TO</span>
            <span>The words they could not find</span>
          </div>
          <div className="mt-2 flex gap-5 border-t border-dashed border-border/60 pt-2">
            <span className="w-12 text-right opacity-50">TOTAL</span>
            <span>A place to feel seen</span>
          </div>
        </div>
      </div>

      {/* ── Why This Exists card ── */}
      <section
        aria-labelledby="why-heading"
        className="paper-panel space-y-8 rounded-t-none px-6 py-10 sm:px-12 sm:py-14"
      >
        <div className="space-y-3">
          <span className="eyebrow-copy">Why this exists</span>
          <h2
            id="why-heading"
            className="text-balance font-display text-4xl leading-[1.02] sm:text-5xl"
          >
            Why This Exists
          </h2>
        </div>

        <div className="mx-auto max-w-2xl space-y-5 text-[1.0625rem] leading-[1.85]">
          <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
            Most people are carrying things they will never fully explain.
          </p>

          <p className="text-muted-foreground">
            Not because they do not want to speak.
            <br />
            But because some pain is too complicated to summarize.
          </p>

          <div className="space-y-3 text-muted-foreground">
            <p>
              There is the pain of betrayal, when someone you trusted made you question your own
              judgment.
            </p>
            <p>
              There is the pain of heartbreak, when love leaves but your body keeps remembering.
            </p>
            <p>
              There is the pain of grief, when the world keeps moving and you are still standing in
              the place where someone disappeared.
            </p>
            <p>
              There is the pain of money that never stretches, when every month asks you to become a
              miracle worker with numbers that were never enough.
            </p>
            <p>
              There is the pain of family wounds, when the people who were supposed to protect you
              became the first place you learned to stay quiet.
            </p>
            <p>
              There is the pain of the job that ended, when the alarm still remembers a life your
              body no longer knows how to enter.
            </p>
            <p>
              There is the pain of the marriage that became a memory, when the house, the plans, the
              name, the future, and the ordinary routines all start sounding like something that
              belonged to another version of you.
            </p>
            <p>
              There is the pain of the apology that never came, when you are left holding the damage
              while the person who caused it continues as if nothing happened.
            </p>
            <p>
              There is the pain of the friendship that faded, the child you worry about, the parent
              you are losing, the body that is tired, the dream that keeps delaying, the shame that
              arrived before anyone asked what happened, and the loneliness that sits beside you even
              when people are around.
            </p>
          </div>

          <p className="font-display text-xl text-foreground sm:text-2xl">
            And then there is the pain nobody sees.
          </p>

          <div className="space-y-2 text-muted-foreground">
            <p>The pain you carry while answering messages.</p>
            <p>The pain you carry while going to work.</p>
            <p>The pain you carry while raising children.</p>
            <p>
              The pain you carry while being the responsible one, the strong one, the funny one, the
              dependable one, the one everybody assumes will manage.
            </p>
            <p>
              The pain you carry while showing up for people who never ask how much it costs you to
              keep showing up.
            </p>
            <p>
              The pain you carry while smiling in photos, attending meetings, paying bills, making
              plans, replying "I'm fine," and trying not to collapse in places where people expect
              you to be okay.
            </p>
          </div>

          {expanded ? (
            <>
              <div className="border-l-2 border-border pl-5">
                <p className="font-display text-xl text-foreground sm:text-2xl">
                  This is the uncomfortable truth.
                </p>
              </div>

              <div className="space-y-2 text-muted-foreground">
                <p className="text-foreground">A lot of people are not healing.</p>
                <p>They are functioning.</p>
                <p>They are surviving inside routines.</p>
                <p>They are laughing with wounds still open.</p>
                <p>They are giving advice from places where they are still bleeding.</p>
                <p>They are helping others breathe while they are quietly running out of air.</p>
                <p>
                  They are making pain look normal because life does not pause long enough for them
                  to fall apart.
                </p>
              </div>

              <p className="text-muted-foreground">
                And when life becomes heavy, the world often gives them small sentences that sound
                good but do not go deep enough.
              </p>

              <div className="space-y-1 border-l-2 border-border pl-5 text-muted-foreground">
                <p>Be strong.</p>
                <p>Move on.</p>
                <p>Let go.</p>
                <p>Everything happens for a reason.</p>
              </div>

              <p className="font-display text-xl text-foreground sm:text-2xl">
                But pain is not generic.
              </p>

              <div className="space-y-2 text-muted-foreground">
                <p>A betrayal does not feel like grief.</p>
                <p>A divorce does not feel like job loss.</p>
                <p>A family wound does not feel like loneliness.</p>
                <p>Financial shame does not feel like heartbreak.</p>
                <p>
                  A delayed dream does not feel like the body finally saying, "I cannot keep
                  carrying this."
                </p>
                <p>
                  The silence after someone dies does not feel like the silence after someone
                  abandons you while still alive.
                </p>
              </div>

              <p className="font-display text-xl text-foreground sm:text-2xl">
                Different wounds need different words.
              </p>

              <p className="text-muted-foreground">
                The Note You Needed Today exists because people need language for the things they
                carry quietly.
              </p>

              <div className="space-y-2 text-muted-foreground">
                <p>Not noise. Not performance. Not perfect healing.</p>
                <p className="text-foreground">Language.</p>
              </div>

              <div className="space-y-2 text-muted-foreground">
                <p>Words that make someone stop and say, "This is what I have been trying to explain."</p>
                <p>Words that can sit beside grief without rushing it.</p>
                <p>Words that can name betrayal without decorating it.</p>
                <p>Words that can hold heartbreak without begging someone to be okay too quickly.</p>
                <p>Words that can tell a tired person, "You are not weak. You have been carrying too much for too long."</p>
                <p>Words that can help someone understand that missing them is not the same as needing them back.</p>
                <p>Words that can remind someone that family can explain the wound, but it does not excuse it.</p>
                <p>Words that can tell someone who lost a job that the role ended, but they did not.</p>
                <p>Words that can tell someone ashamed of money that they were not careless, they were carrying more than the money could hold.</p>
                <p>Words that can be kept. Words that can be sent quietly. Words that can be shared when speaking feels impossible.</p>
                <p>Words that make people feel seen, then leave them with enough hope to breathe again.</p>
              </div>

              <p className="font-display text-xl text-foreground sm:text-2xl">
                This is why The Note exists.
              </p>

              <div className="space-y-2 text-muted-foreground">
                <p>For the things people survive in silence.</p>
                <p>For the truths they keep swallowing.</p>
                <p>For the pain they make look normal.</p>
                <p>For the wounds they do not always have the language to name.</p>
                <p className="text-foreground">
                  For the words they needed before they knew how to ask.
                </p>
              </div>

              <p className="text-muted-foreground">And maybe today, one note will find you.</p>

              <div className="space-y-2 text-muted-foreground">
                <p>Maybe it will not fix everything.</p>
                <p>Maybe it will not change what happened.</p>
                <p>
                  Maybe it will not take the grief away, bring the person back, pay the bill, heal
                  the family, return the job, restore the marriage, or make the loneliness disappear
                  by morning.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-foreground">
                  But maybe it will say the thing you have been carrying.
                </p>
                <p className="text-foreground">Maybe it will help you feel less alone inside it.</p>
                <p className="text-foreground">
                  Maybe it will give you one honest sentence to hold.
                </p>
              </div>

              <p className="font-display text-xl text-foreground sm:text-2xl">
                And maybe, for today, that is enough to breathe.
              </p>
            </>
          ) : (
            <div className="space-y-4 rounded-lg border border-border bg-[color:var(--paper-deep)]/10 px-5 py-4">
              <p className="text-sm leading-7 text-muted-foreground">
                A lot of people are not healing. They are functioning. Different wounds need
                different words. The Note exists to give language to what people carry quietly.
              </p>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-70"
              >
                Read the full story
              </button>
            </div>
          )}

          <div className="pt-4 text-center">
            <Button asChild size="lg" variant="note" className="min-h-14 text-base">
              <a href="#feelings">Find the note you need today</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------------------------- Waitlist -------------------------- */

function Waitlist() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter an email address that looks right.");
      return;
    }
    const res = await saveWaitlistEntry(email, "landing");
    if (!res.ok) {
      setError(
        res.error === "throttled"
          ? "You have already joined recently. Please wait a moment before trying again."
          : "Something went wrong. Please try again.",
      );
      return;
    }
    trackEvent("waitlist_submitted", { source: "landing" });
    setSubmitted(true);
  };

  return (
    <section
      id="waitlist"
      className="relative -mx-4 overflow-hidden px-4 py-16 sm:-mx-6 sm:px-6 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_60%)]" />
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <span className="eyebrow-copy">Volume 2 is coming</span>
        <h2 className="text-balance font-display text-4xl leading-[1.02] sm:text-6xl">
          Get the next note before anyone else.
        </h2>
        <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          One email when Volume 2 drops. Nothing else.
        </p>

        {submitted ? (
          <div
            className="paper-panel mx-auto max-w-md text-base leading-7 text-foreground"
            role="status"
          >
            <p>You are on the list. We will write to you when it is ready.</p>
          </div>
        ) : (
          <form
            ref={ref}
            onSubmit={onSubmit}
            className="paper-panel mx-auto flex max-w-xl flex-col gap-3 p-4 sm:flex-row sm:items-stretch"
          >
            <label htmlFor="hero-email" className="sr-only">
              Email address
            </label>
            <Input
              id="hero-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder="Email address"
              className="h-12 flex-1 rounded-full border-border bg-card px-4 text-base"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
            />
            <Button type="submit" variant="note" size="lg" className="min-h-12">
              I want to be first →
            </Button>
          </form>
        )}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <p className="text-xs text-muted-foreground">
          One quiet email. No spam. No public profile.
        </p>
      </div>
    </section>
  );
}

/* -------------------------- Feedback -------------------------- */

function FeedbackBlock() {
  const { openFeedback } = useAppModals();
  return (
    <section className="paper-panel mx-auto flex max-w-3xl flex-col items-center gap-3 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div className="flex items-start gap-3">
        <MessageSquareHeart className="mt-1 size-5 text-muted-foreground" aria-hidden />
        <div>
          <h3 className="font-display text-2xl leading-tight">Help us shape this carefully.</h3>
          <p className="text-sm leading-6 text-muted-foreground">
            Tell us what felt right, what felt confusing, or what note you needed but could not
            find.
          </p>
        </div>
      </div>
      <Button variant="paper" className="min-h-11 shrink-0" onClick={openFeedback}>
        Share feedback
      </Button>
    </section>
  );
}

/* -------------------------- Footer -------------------------- */

function SiteFooter() {
  const { openFeedback } = useAppModals();
  return (
    <footer className="-mx-4 border-t border-border bg-[color:var(--paper-deep)]/40 px-4 py-12 sm:-mx-6 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <div className="stitched-label">The Note You Needed Today</div>
          <p className="text-sm leading-6 text-muted-foreground">
            Find words for what you carry quietly. A private-first emotional language platform.
          </p>
        </div>

        <FooterCol title="Product">
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/feelings">Feelings</FooterLink>
          <FooterLink to="/collections">
            <span className="inline-flex items-center gap-1.5">
              <Layers2 className="size-3.5" aria-hidden />
              Collections
            </span>
          </FooterLink>
          <FooterLink to="/about">About</FooterLink>
        </FooterCol>

        <FooterCol title="Care">
          <FooterLink to="/volume-1">Volume 1</FooterLink>
          <FooterLink to="/gift">Gift Volume 1</FooterLink>
          <FooterLink to="/support">Safety &amp; Support</FooterLink>
          <button
            type="button"
            onClick={openFeedback}
            className="text-left text-sm leading-7 text-muted-foreground hover:text-foreground"
          >
            Feedback
          </button>
        </FooterCol>

        <FooterCol title="Contact">
          <a
            href="mailto:hello@thenoteyouneededtoday.com"
            className="text-sm leading-7 text-muted-foreground hover:text-foreground"
          >
            hello@thenoteyouneededtoday.com
          </a>
        </FooterCol>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} The Note You Needed Today</p>
        <p>Emotional language for what people carry quietly.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="eyebrow-copy">{title}</p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-sm leading-7 text-muted-foreground hover:text-foreground">
      {children}
    </Link>
  );
}

function FooterAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm leading-7 text-muted-foreground hover:text-foreground">
      {children}
    </a>
  );
}
