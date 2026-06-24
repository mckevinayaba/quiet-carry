import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { MoodSelector } from "@/components/mood-selector";
import { NoteCard } from "@/components/note-card";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug, featuredNote } from "@/lib/note-data";

export const Route = createFileRoute("/today")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Today's Note | The Note You Needed Today" },
      { name: "description", content: "One quiet note for today, chosen for this moment." },
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
    </AppLayout>
  );
}
