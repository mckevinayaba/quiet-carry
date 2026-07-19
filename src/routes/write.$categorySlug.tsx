import { ArrowLeft } from "lucide-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary, WriteNotFound } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { ReflectionEditor } from "@/components/reflection-editor";
import { trackEvent } from "@/lib/analytics";
import { getNoteByCategorySlug } from "@/lib/note-data";
import { registerMeaningfulGuestAction, saveReflection } from "@/lib/note-storage";

export const Route = createFileRoute("/write/$categorySlug")({
  loader: ({ params }) => {
    const note = getNoteByCategorySlug(params.categorySlug);
    if (!note) throw notFound();
    return { note };
  },
  errorComponent: RouteErrorBoundary,
  notFoundComponent: WriteNotFound,
  head: ({ loaderData }) => ({
    meta: [
      { title: `Write from ${loaderData?.note.title ?? "this note"}` },
      { name: "description", content: "Write privately from the note that found you." },
      { property: "og:title", content: `Write from ${loaderData?.note.title ?? "this note"}` },
      { property: "og:description", content: "Write privately from the note that found you." },
    ],
  }),
  component: WritePage,
});

function WritePage() {
  const { note } = Route.useLoaderData();
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    trackEvent("reflection_started", { noteId: note.id });
  }, [note.id]);

  return (
    <AppLayout className="space-y-5 pb-8">
      <section className="space-y-3 py-2">
        <Link
          to="/note/$categorySlug"
          params={{ categorySlug: note.categorySlug }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to Note
        </Link>
        <div className="stitched-label">Write from this note</div>
        <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl">Write from this note</h1>
        <p className="text-base leading-7 text-muted-foreground">
          No one will see this unless you choose to share it.
        </p>
      </section>

      <div className="paper-panel space-y-1 text-sm leading-6 text-muted-foreground">
        <p className="text-foreground">Your notes and reflections are private on this device.</p>
        <p>No public profile. No comments. No followers.</p>
      </div>

      {message ? (
        <div className="paper-panel space-y-3 text-base leading-7 text-foreground" role="status">
          <p>{message}</p>
          {saved ? (
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
                <Link to="/shelf">View in Shelf</Link>
              </Button>
              <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
                <Link to="/note/$categorySlug" params={{ categorySlug: note.categorySlug }}>
                  Back to Note
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}

      <ReflectionEditor
        categorySlug={note.categorySlug}
        excerpt={note.mainText.split("\n").slice(0, 4).join(" ")}
        onChange={(next) => setValue(next)}
        onClear={() => {
          setValue("");
          setMessage(null);
          setSaved(false);
        }}
        onSave={() => {
          if (!value.trim()) return;
          saveReflection(note, value.trim());
          trackEvent("reflection_saved", { noteId: note.id });
          setMessage(
            "Saved privately on this device. Create a private account to keep your reflections safe across devices.",
          );
          setSaved(true);
          registerMeaningfulGuestAction();
        }}
        prompt={note.journalPrompt}
        value={value}
      />
    </AppLayout>
  );
}
