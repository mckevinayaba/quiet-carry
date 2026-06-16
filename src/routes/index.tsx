import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Facebook,
  Feather,
  Heart,
  Instagram,
  Layers2,
  Linkedin,
  LockKeyhole,
  Mail,
  MessageSquareHeart,
  NotebookPen,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { ReceiptBlock } from "@/components/receipt-block";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppModals } from "@/components/app-modals";
import { trackEvent } from "@/lib/analytics";
import { categories, featuredNote } from "@/lib/note-data";
import {
  keepNote,
  logSentNote,
  registerMeaningfulGuestAction,
} from "@/lib/note-storage";
import { isValidEmail, saveWaitlistEntry } from "@/lib/waitlist";

import heroCollage from "@/assets/hero-note-collage.jpg";
import manifestoWindow from "@/assets/manifesto-window.jpg";
import volumeCollage from "@/assets/volume-one-collage.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Note You Needed Today — Find words for what you carry quietly" },
      {
        name: "description",
        content:
          "A private-first emotional language platform. For the feelings you cannot always explain. Join the private beta.",
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
      <Hero />
      <NotSocialMedia />
      <HowItWorks />
      <CategoriesPreview />
      <TodaysNote />
      <PrivateByDesign />
      <VolumeOne />
      <FounderManifesto />
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
              aria-label="Private Beta"
            >
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              Private Beta
            </span>
            <span className="eyebrow-copy">A private-first emotional language platform</span>
          </div>

          <div className="space-y-5">
            <h1 className="text-balance font-display text-[3.25rem] leading-[0.98] text-foreground sm:text-7xl lg:text-[5.25rem]">
              The Note You<br />
              Needed Today
            </h1>
            <p className="max-w-xl font-display text-2xl leading-snug text-foreground sm:text-3xl">
              Find words for what you carry quietly.
            </p>
            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              For the feelings you cannot always explain. For the pain you made look easy. For the
              words that stayed. For the days when “I’m fine” is not the truth.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="note" className="min-h-14 text-base">
              <a href="#waitlist">Join the Private Beta</a>
            </Button>
            <Button asChild size="lg" variant="paper" className="min-h-14 text-base">
              <Link to="/note/$categorySlug" params={{ categorySlug: featuredNote.categorySlug }}>
                Read Today’s Note
              </Link>
            </Button>
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            We are building this slowly and carefully.
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
          alt="A handmade collage: an opened vintage envelope, a handwritten note that reads ‘the truth was too heavy’, a typewritten FROM TO DATE TOTAL receipt, pressed flowers, a navy stitched fabric ribbon and a small hand-drawn heart"
          width={1536}
          height={2048}
          className="h-full w-full object-cover"
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
            <li key={line} className="opacity-90">{line}</li>
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
              <span className="font-label text-3xl text-muted-foreground">
                0{idx + 1}
              </span>
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
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl space-y-3">
          <span className="eyebrow-copy">What are you carrying today?</span>
          <h2 className="text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
            Ten quiet doors.
          </h2>
          <p className="text-base leading-7 text-muted-foreground">
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
              <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{c.subtitle}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* -------------------------- Today’s Note -------------------------- */

function TodaysNote() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    trackEvent("note_opened", {
      noteId: featuredNote.id,
      category: featuredNote.categorySlug,
      source: "landing",
    });
  }, []);

  const handleKeep = () => {
    keepNote(featuredNote);
    trackEvent("note_kept", { noteId: featuredNote.id, source: "landing" });
    setMessage("Kept. You can come back to this when you need it.");
    registerMeaningfulGuestAction();
  };

  const handleSend = async () => {
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title: featuredNote.title, text: featuredNote.sendableText });
      } else if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(featuredNote.sendableText);
      }
    } catch {
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(featuredNote.sendableText);
        }
      } catch {
        /* noop */
      }
    }
    logSentNote(featuredNote);
    trackEvent("note_sent", { noteId: featuredNote.id, source: "landing" });
    setMessage("Copied. Send it to someone who may need words today.");
    registerMeaningfulGuestAction();
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div className="space-y-4">
        <span className="eyebrow-copy">Today’s Note</span>
        <h2 className="text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
          One note. Written for the part of you that has been quiet.
        </h2>
        <p className="text-base leading-7 text-muted-foreground">
          Every day, a new note arrives. Keep it for yourself. Send it softly to someone. Or write
          your own reflection from it.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild variant="paper" className="min-h-11">
            <Link to="/feelings">Choose another feeling</Link>
          </Button>
        </div>
      </div>

      <article className="space-y-4">
        {message ? (
          <div className="paper-panel text-base leading-7 text-foreground" role="status">
            {message}
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
              <span>Keep this Note</span>
              <span className="text-[0.7rem] text-muted-foreground">Save it privately</span>
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
            onClick={() => trackEvent("reflection_started", { noteId: featuredNote.id, source: "landing" })}
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
  const { openWaitlist } = useAppModals();
  const inside = [
    "15 designed notes",
    "15 mobile wallpapers",
    "15 captions",
    "15 journal prompts",
    "5 private letters",
  ];
  return (
    <section className="paper-panel relative overflow-hidden p-6 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="stitched-label">Volume 1</div>
            <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              Coming soon
            </span>
          </div>
          <div className="space-y-2">
            <h2 className="text-balance font-display text-4xl leading-[1.02] sm:text-5xl">
              The Note You Needed Today, Volume 1
            </h2>
            <p className="font-display text-2xl leading-snug text-muted-foreground sm:text-3xl">
              The Things We Do Not Say Out Loud
            </p>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            A digital collection of emotional notes, mobile wallpapers, captions, journal prompts,
            and private letters for people healing quietly, starting over, grieving privately,
            feeling unseen, or carrying things they do not always know how to say.
          </p>
          <ul className="grid gap-1.5 text-sm text-foreground sm:grid-cols-2">
            {inside.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button variant="note" className="min-h-12" onClick={() => openWaitlist("volume")}>
              Join the Volume 1 waitlist
            </Button>
            <span className="font-label text-base text-foreground">R149 launch price</span>
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

/* -------------------------- Founder manifesto -------------------------- */

function FounderManifesto() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 text-center">
      <span className="eyebrow-copy">Why this exists</span>
      <h2 className="text-balance font-display text-4xl leading-[1.05] sm:text-5xl">
        The internet gave people more ways to be seen,<br className="hidden sm:block" />
        but fewer safe ways to be understood.
      </h2>
      <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
        The Note You Needed Today exists for the space between feeling something deeply and not
        having the words to say it.
      </p>
      <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
        It is for the things people carry quietly.
      </p>
    </section>
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
      setError("Something went wrong. Please try again.");
      return;
    }
    trackEvent("waitlist_submitted", { source: "landing" });
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative -mx-4 overflow-hidden px-4 py-16 sm:-mx-6 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_60%)]" />
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <span className="eyebrow-copy">The private beta</span>
        <h2 className="text-balance font-display text-4xl leading-[1.02] sm:text-6xl">
          Be first to experience<br />The Note You Needed Today.
        </h2>
        <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          Join the private beta and get early access to the platform and Volume 1.
        </p>

        {submitted ? (
          <div className="paper-panel mx-auto max-w-md text-base leading-7 text-foreground" role="status">
            <p>You are on the list. We will write to you when it is ready.</p>
            <p className="mt-1 text-sm text-muted-foreground">Saved privately on this device for now.</p>
          </div>
        ) : (
          <form
            ref={ref}
            onSubmit={onSubmit}
            className="paper-panel mx-auto flex max-w-xl flex-col gap-3 p-4 sm:flex-row sm:items-stretch"
          >
            <label htmlFor="hero-email" className="sr-only">Email address</label>
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
              Join the waitlist
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
            Tell us what felt right, what felt confusing, or what note you needed but could not find.
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
          <div className="flex items-center gap-2 pt-1">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="icon-seal !size-9 hover:opacity-80"
            >
              <Instagram className="size-4" aria-hidden />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="icon-seal !size-9 hover:opacity-80"
            >
              <Facebook className="size-4" aria-hidden />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="icon-seal !size-9 hover:opacity-80"
            >
              <Linkedin className="size-4" aria-hidden />
            </a>
          </div>
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
        </FooterCol>

        <FooterCol title="Care">
          <FooterAnchor href="#waitlist">Private Beta</FooterAnchor>
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
        <p>Built slowly and carefully.</p>
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
