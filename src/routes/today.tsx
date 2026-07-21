import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { MoodSelector } from "@/components/mood-selector";
import { NoteCard } from "@/components/note-card";
import { RouteErrorBoundary } from "@/components/route-error";
import { ShareNote } from "@/components/share-note";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug, featuredNote } from "@/lib/note-data";

export const Route = createFileRoute("/today")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Today's Note | The Note You Needed Today" },
      { name: "description", content: "One note. Written for the part of you that has been quiet." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "The Note You Needed Today" },
      { property: "og:title", content: "Today's Note | The Note You Needed Today" },
      { property: "og:description", content: "One note. Written for the part of you that has been quiet." },
      { property: "og:image", content: "https://thenoteyouneeded.today/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Today's Note | The Note You Needed Today" },
      { name: "twitter:description", content: "One note. Written for the part of you that has been quiet." },
      { name: "twitter:image", content: "https://thenoteyouneeded.today/og-image.png" },
    ],
  }),
  component: TodayPage,
});

interface Moment {
  phrase: string;
  showSupport: boolean;
}

function TodayPage() {
  const note = featuredNote;
  const category = getCategoryBySlug(note.categorySlug);
  const [moment, setMoment] = useState<Moment | null>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  const handleMoodSelect = (phrase: string, showSupport: boolean) => {
    setMoment({ phrase, showSupport });
    requestAnimationFrame(() => {
      noteRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <AppLayout className="space-y-6 pb-8">
      <section className="space-y-1 py-2">
        <div className="stitched-label">Today&apos;s Note</div>
      </section>

      <MoodSelector onSelect={handleMoodSelect} />

      <div ref={noteRef} className="space-y-4">
        {moment ? (
          <p className="px-1 text-sm italic leading-6 text-muted-foreground" style={{ whiteSpace: "pre-line" }}>
            {moment.phrase}
          </p>
        ) : null}

        <NoteCard note={note} categoryLabel={category?.title} />

        {moment?.showSupport ? (
          <p className="px-1 text-sm leading-6 text-muted-foreground">
            If you need more than a note right now →{" "}
            <Link to="/support" className="underline underline-offset-4">
              Safety &amp; Support
            </Link>
          </p>
        ) : null}

        <Button asChild variant="paper" className="min-h-11">
          <Link to="/note/$categorySlug" params={{ categorySlug: note.categorySlug }}>
            Open this note
          </Link>
        </Button>
      </div>

      <div className="space-y-3 pt-2">
        <p className="eyebrow-copy">Send today's note</p>
        <p className="text-sm leading-6 text-muted-foreground">
          If this note found you at the right time, pass it to someone who may need it today.
        </p>
        <ShareNote
          noteTitle={note.title}
          wallpaperLine={note.hookLine || note.shareExcerpt || ""}
          caption={note.longCaption || note.shortCaption || ""}
          context="today"
          url={`https://thenoteyouneeded.today/note/${note.categorySlug}`}
        />
      </div>
    </AppLayout>
  );
}
