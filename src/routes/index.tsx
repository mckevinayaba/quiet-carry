import { Heart, LockKeyhole, Mail, NotebookPen } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { ActionButton } from "@/components/action-button";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { featuredNote } from "@/lib/note-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Note You Needed Today" },
      {
        name: "description",
        content: "Find words for what you carry quietly in a private-first emotional language platform.",
      },
      { property: "og:title", content: "The Note You Needed Today" },
      {
        property: "og:description",
        content: "Find words for what you carry quietly in a private-first emotional language platform.",
      },
    ],
  }),
  component: HomePage,
});

import { createFileRoute } from "@tanstack/react-router";

function HomePage() {
  return (
    <AppLayout className="space-y-6 pb-8">
      <section className="space-y-4 py-2">
        <div className="stitched-label">Private first emotional language</div>
        <div className="space-y-4">
          <h1 className="max-w-sm text-balance font-display text-6xl leading-none text-foreground">
            The Note You Needed Today
          </h1>
          <p className="max-w-md text-xl text-foreground">Find words for what you carry quietly.</p>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            For the feelings you cannot always explain. For the pain you made look easy. For the
            words that stayed. For the days when “I’m fine” is not the truth.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild size="lg" variant="note">
            <Link to="/feelings">What are you carrying today?</Link>
          </Button>
          <Button asChild size="lg" variant="paper">
            <Link to="/note/$categorySlug" params={{ categorySlug: featuredNote.categorySlug }}>
              Read today’s note
            </Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-4xl leading-none">Today’s Note</h2>
          <Heart className="heart-mark" aria-hidden="true" />
        </div>
        <article className="space-y-4">
          <div className="note-surface">
            <div className="space-y-4">
              <div className="stitched-label">The Note You Needed Today</div>
              <div className="note-copy">{`They asked,\n“How are you?”\nand this time,\nthey really meant it.\n\nBut the truth\nwas too heavy\nto carry out loud.\n\nI hope you heal\nfrom the fear\nof being honest\nwith people\nwho are safe enough\nto hear you.`}</div>
            </div>
          </div>
          <div className="grid gap-3">
            <ActionButton hint="Save it privately for later" icon={LockKeyhole}>
              Keep this Note
            </ActionButton>
            <ActionButton hint="Share softly, without noise" icon={Mail}>
              Send this Quietly
            </ActionButton>
            <ActionButton hint="Begin a private reflection" icon={NotebookPen}>
              Write from This
            </ActionButton>
          </div>
        </article>
      </section>

      <section className="paper-panel space-y-3">
        <h2 className="font-display text-4xl leading-none">This is not social media.</h2>
        <p className="max-w-md text-base leading-7 text-muted-foreground">
          No likes. No public comments. No followers. No performance. Just private words for what
          you are carrying.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-4xl leading-none">How it works</h2>
        <div className="grid gap-3">
          {[
            "Choose what you are carrying.",
            "Read the note you needed.",
            "Keep it, send it, or write from it.",
          ].map((step, index) => (
            <div key={step} className="paper-panel flex items-start gap-4">
              <div className="icon-seal">{index + 1}</div>
              <p className="pt-1 text-base leading-7 text-foreground">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="paper-panel space-y-4">
        <div className="stitched-label">Volume 1</div>
        <div className="space-y-2">
          <h2 className="font-display text-4xl leading-none">The Things We Do Not Say Out Loud</h2>
          <p className="text-base leading-7 text-muted-foreground">
            A digital collection of notes, wallpapers, captions, prompts, and private letters for
            heavy days.
          </p>
        </div>
        <Button asChild variant="note">
          <Link to="/collections">Unlock Volume 1</Link>
        </Button>
      </section>
    </AppLayout>
  );
}
