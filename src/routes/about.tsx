import { ArrowLeft, Heart } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    links: [
      { rel: "canonical", href: "https://thenoteyouneeded.today/about" },
    ],
    meta: [
      { title: "About | The Note You Needed Today" },
      {
        name: "description",
        content:
          "The Note You Needed Today helps people find, keep, send, and share words for what they carry quietly.",
      },
      { property: "og:title", content: "About | The Note You Needed Today" },
      {
        property: "og:description",
        content:
          "The Note You Needed Today helps people find, keep, send, and share words for what they carry quietly.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AppLayout className="space-y-10 pb-12">
      <AboutInner />
    </AppLayout>
  );
}

function AboutInner() {
  return (
    <>
      {/* Back */}
      <section className="space-y-3 py-2">
        <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
          <Link to="/">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back to Home
          </Link>
        </Button>
        <div className="stitched-label">About</div>
        <h1 className="font-display text-5xl leading-none text-foreground">
          The Note You Needed Today
        </h1>
      </section>

      {/* Opening */}
      <section className="mx-auto max-w-2xl space-y-5 text-base leading-8 text-foreground">
        <p>
          The Note You Needed Today was created for the moments people carry quietly.
        </p>
        <p>
          The moments when you are not ready to explain everything.
        </p>
        <p>
          The moments when someone asks, "How are you?" and the honest answer is too heavy to say
          out loud.
        </p>
      </section>

      {/* What it is not */}
      <div className="paper-panel space-y-5 text-base leading-8">
        <p className="font-display text-2xl leading-snug text-foreground">
          This is not a quote site.
        </p>
        <p className="text-muted-foreground">
          It is not here to rush your healing, decorate your pain, or tell you to be strong before
          you have been heard.
        </p>
        <p className="text-foreground">
          The Note exists to help you find words for what you are carrying.
        </p>
      </div>

      {/* Some notes are for */}
      <section className="space-y-4">
        <ul className="space-y-2 text-base leading-8 text-foreground">
          {[
            "Some notes are for grief.",
            "Some are for shame.",
            "Some are for the apology that never came.",
            "Some are for the love that left.",
            "Some are for the days you keep saying, “I’m fine,” even when you are not.",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3">
              <Heart className="heart-mark mt-1.5 size-3.5 shrink-0" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="text-base leading-8 text-muted-foreground">
          Each note is written to feel specific, because pain is not generic.
        </p>
      </section>

      {/* What you can do */}
      <section className="paper-panel space-y-4">
        <span className="eyebrow-copy">What you can do here</span>
        <ul className="space-y-2 text-base leading-8 text-foreground">
          {[
            "Read a note.",
            "Keep it for later.",
            "Send it quietly to someone.",
            "Download it as a card.",
            "Or simply sit with it until the words feel less heavy.",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why the receipt */}
      <section className="space-y-5">
        <div className="space-y-1">
          <span className="eyebrow-copy">Why the receipt?</span>
          <h2 className="font-display text-3xl leading-tight text-foreground">
            Because sometimes pain feels like something was taken from you.
          </h2>
        </div>

        {/* Receipt visual — four named fields */}
        <div className="space-y-3">
          {[
            {
              label: "FROM",
              description: "Where the wound, pressure, silence, loss, or emotional debt came from.",
              example: "A version of yourself. A safe place. A truth you were not allowed to say.",
            },
            {
              label: "TO",
              description: "The part of you that needed the note.",
              example: "The part of you that is still counting what it cost.",
            },
            {
              label: "DATE",
              description: "The emotional moment when something became clear, heavy, honest, or ready to be released.",
              example: "The moment it became too much to carry alone.",
            },
            {
              label: "TOTAL",
              description: "The truth strong enough to screenshot.",
              example: "A love you paid for with silence. A strength people kept spending without asking what it cost you.",
            },
          ].map(({ label, description, example }) => (
            <div key={label} className="receipt-block space-y-2 p-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="font-label text-xs font-bold tracking-widest text-foreground">{label}</span>
                <span className="text-sm leading-6 text-muted-foreground">{description}</span>
              </div>
              <p className="font-mono text-sm leading-6 text-foreground">{example}</p>
            </div>
          ))}
        </div>

        <p className="text-base leading-8 text-foreground">
          The receipt names the emotional transaction. What was carried. Who it was for. When it
          became too much. And what it really cost.
        </p>
      </section>

      {/* Who is MAD */}
      <section className="paper-panel space-y-4">
        <div className="space-y-1">
          <span className="eyebrow-copy">Who is MAD?</span>
          <h2 className="font-display text-3xl leading-tight text-foreground">
            MAD is the human signature behind the notes.
          </h2>
        </div>
        <p className="text-base leading-8 text-muted-foreground">
          It is not a brand mask.
        </p>
        <p className="text-base leading-8 text-foreground">
          It is a reminder that these words were shaped with care, feeling, memory, and attention.
        </p>
        <p className="text-base leading-8 text-muted-foreground">
          Every note signed MAD is written for the part of you that needed language before it
          needed advice.
        </p>
        <div className="pt-1">
          <span className="font-label text-2xl tracking-widest text-foreground">MAD ©</span>
        </div>
      </section>

      {/* What you can find here */}
      <section className="space-y-5">
        <div className="space-y-1">
          <span className="eyebrow-copy">What you can find here</span>
          <h2 className="font-display text-3xl leading-tight text-foreground">
            A library of emotional language.
          </h2>
        </div>
        <p className="text-base leading-8 text-muted-foreground">
          The Note is a library of emotional language for the things people carry quietly.
        </p>
        <p className="text-base leading-8 text-foreground">
          Here, you will find notes, prompts, keepsakes, private letters, daily reminders, and
          words you can return to when life feels too heavy to explain.
        </p>
        <ul className="space-y-2 text-base leading-8 text-muted-foreground">
          {[
            "Some words are meant to be kept.",
            "Some are meant to be sent.",
            "Some are meant to be shared.",
            "Some are simply meant to sit with you until you feel less alone.",
          ].map((line) => (
            <li key={line} className="flex items-start gap-3">
              <Heart className="heart-mark mt-1.5 size-3.5 shrink-0" aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What this is not */}
      <section className="paper-panel space-y-4 border-l-4 border-l-border">
        <div className="space-y-1">
          <span className="eyebrow-copy">What this is not</span>
          <h2 className="font-display text-2xl leading-tight text-foreground">
            A language space. Not a substitute for care.
          </h2>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          The Note You Needed Today is not therapy, medical advice, or crisis support. It does not
          replace professional help, counselling, emergency care, or community support.
        </p>
        <p className="text-sm leading-7 text-foreground">
          It is a language space. A place to pause. A place to feel seen. A place to find the
          words you could not reach alone.
        </p>
        <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
          <Link to="/support">Safety &amp; Support</Link>
        </Button>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-2xl space-y-4 py-4 text-center">
        <p className="font-display text-2xl leading-snug text-foreground">
          If one note finds you at the right time, keep it.
        </p>
        <p className="font-display text-2xl leading-snug text-muted-foreground">
          If it reminds you of someone, send it quietly.
        </p>
        <p className="font-display text-2xl leading-snug text-foreground">
          If it says what you could not say, let it speak.
        </p>
        <div className="flex justify-center gap-3 pt-4">
          <Button asChild variant="note" className="min-h-12">
            <Link to="/feelings">Find your note</Link>
          </Button>
          <Button asChild variant="paper" className="min-h-12">
            <Link to="/shelf">Your Shelf</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
