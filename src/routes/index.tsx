import { Heart, LockKeyhole, Mail, NotebookPen } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

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

function HomePage() {
  return (
    <AppLayout className="space-y-8 pb-8">
      <section className="space-y-5 py-3">
        <div className="stitched-label">Private first emotional language</div>
        <div className="space-y-4">
          <h1 className="max-w-md text-balance font-display text-5xl leading-[1.05] text-foreground sm:text-6xl">
            The Note You Needed Today
          </h1>
          <p className="max-w-md font-display text-2xl leading-snug text-foreground">
            Find words for what you carry quietly.
          </p>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            For the feelings you cannot always explain. For the pain you made look easy. For the
            words that stayed. For the days when “I’m fine” is not the truth.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild size="lg" variant="note" className="min-h-14 text-base">
            <Link to="/feelings">What are you carrying today?</Link>
          </Button>
          <Button asChild size="lg" variant="paper" className="min-h-14 text-base">
            <Link to="/note/$categorySlug" params={{ categorySlug: featuredNote.categorySlug }}>
              Read today’s note
            </Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-3xl leading-none">Today’s Note</h2>
          <Heart className="heart-mark" aria-hidden="true" />
        </div>
        <article className="space-y-4">
          <div className="note-surface">
            <div className="space-y-4">
              <div className="stitched-label">The Note You Needed Today</div>
              <div className="note-copy">{featuredNote.mainText}</div>
            </div>
          </div>
          <div className="grid gap-3">
            <Button asChild variant="note" className="min-h-14 justify-start text-left text-base">
              <Link to="/note/$categorySlug" params={{ categorySlug: featuredNote.categorySlug }}>
                <LockKeyhole aria-hidden="true" />
                <span>Open this note</span>
              </Link>
            </Button>
          </div>
        </article>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl leading-none">How it works</h2>
        <div className="grid gap-3">
          {[
            { step: "Choose what you are carrying.", icon: Heart },
            { step: "Receive one note.", icon: Mail },
            { step: "Keep it, send it, or write from it privately.", icon: NotebookPen },
          ].map(({ step, icon: Icon }, index) => (
            <div key={step} className="paper-panel flex items-start gap-4">
              <div className="icon-seal shrink-0">{index + 1}</div>
              <div className="flex min-w-0 flex-1 items-start gap-3 pt-1">
                <Icon className="mt-1 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <p className="text-base leading-7 text-foreground">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="paper-panel space-y-3">
        <h2 className="font-display text-3xl leading-none">This is not social media.</h2>
        <p className="max-w-md text-base leading-7 text-muted-foreground">
          No likes. No public comments. No followers. No performance. Just private words for what
          you are carrying.
        </p>
      </section>

      <section className="paper-panel space-y-4">
        <div className="stitched-label">Volume 1</div>
        <div className="space-y-2">
          <h2 className="font-display text-3xl leading-none">The Things We Do Not Say Out Loud</h2>
          <p className="text-base leading-7 text-muted-foreground">
            A digital collection of notes, wallpapers, captions, prompts, and private letters for
            heavy days.
          </p>
        </div>
        <Button asChild variant="note" className="min-h-12">
          <Link to="/collections">Unlock Volume 1</Link>
        </Button>
      </section>
    </AppLayout>
  );
}
