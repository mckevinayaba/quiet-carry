import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { ReflectionEditor } from "@/components/reflection-editor";
import { trackEvent } from "@/lib/analytics";
import { getNoteByCategorySlug } from "@/lib/note-data";
import { saveReflection } from "@/lib/note-storage";

export const Route = createFileRoute("/write/$categorySlug")({
  loader: ({ params }) => {
    const note = getNoteByCategorySlug(params.categorySlug);
    if (!note) throw notFound();
    return { note };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Write from ${loaderData.note.title}` },
      {
        name: "description",
        content: "Write privately from the note that found you.",
      },
      { property: "og:title", content: `Write from ${loaderData.note.title}` },
      { property: "og:description", content: "Write privately from the note that found you." },
    ],
  }),
  component: WritePage,
});

function WritePage() {
  const { note } = Route.useLoaderData();
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  return (
    <AppLayout className="space-y-5 pb-8">
      <section className="space-y-3 py-2">
        <div className="stitched-label">Write from this note</div>
        <h1 className="font-display text-5xl leading-none">Write from this note</h1>
        <p className="text-base leading-7 text-muted-foreground">
          No one will see this unless you choose to share it.
        </p>
      </section>

      {message ? <div className="paper-panel text-base text-foreground">{message}</div> : null}

      <ReflectionEditor
        categorySlug={note.categorySlug}
        excerpt={note.mainText.split("\n").slice(0, 4).join(" ")}
        onChange={(next) => setValue(next)}
        onClear={() => {
          setValue("");
          setMessage(null);
        }}
        onSave={() => {
          if (!value.trim()) return;
          saveReflection(note, value.trim());
          trackEvent("reflection_saved", { noteId: note.id });
          setMessage(
            "Saved privately. Your reflection is saved on this device. Create a private account if you want to keep it safe across devices.",
          );
        }}
        prompt={note.journalPrompt}
        value={value}
      />
    </AppLayout>
  );
}
