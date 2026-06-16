import { Heart, LockKeyhole, Mail, NotebookPen, Palette, Sparkles, Unlock } from "lucide-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { ActionButton } from "@/components/action-button";
import { AppLayout } from "@/components/app-layout";
import { NoteCard } from "@/components/note-card";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { getCategoryBySlug, getNoteByCategorySlug, getSimilarNotes } from "@/lib/note-data";
import {
  getGuestActionCount,
  incrementGuestActionCount,
  keepNote,
  logSentNote,
  shouldShowAccountPrompt,
} from "@/lib/note-storage";

export const Route = createFileRoute("/note/$categorySlug")({
  loader: ({ params }) => {
    const category = getCategoryBySlug(params.categorySlug);
    const note = getNoteByCategorySlug(params.categorySlug);
    if (!category || !note) throw notFound();
    return { category, note };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.note.title} | The Note You Needed Today` },
      { name: "description", content: loaderData.category.subtitle },
      { property: "og:title", content: `${loaderData.note.title} | The Note You Needed Today` },
      { property: "og:description", content: loaderData.category.subtitle },
    ],
  }),
  component: NotePage,
});

function NotePage() {
  const { category, note } = Route.useLoaderData();
  const [message, setMessage] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const similar = useMemo(() => getSimilarNotes(category.slug), [category.slug]);

  useEffect(() => {
    trackEvent("note_opened", { noteId: note.id, category: category.slug });
  }, [category.slug, note.id]);

  const registerGuestAction = () => {
    const count = incrementGuestActionCount();
    if (shouldShowAccountPrompt(count) && !showPrompt) {
      setShowPrompt(true);
      trackEvent("account_prompt_shown", { actionCount: count });
    }
  };

  const handleKeep = () => {
    keepNote(note);
    registerGuestAction();
    trackEvent("note_kept", { noteId: note.id });
    setMessage("Kept. You can come back to this when you need it.");
  };

  const handleSend = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: note.title, text: note.sendableText });
      } else if (typeof navigator !== "undefined"?.valueOf()) {
        await navigator.clipboard.writeText(note.sendableText);
      }
    } catch {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(note.sendableText);
      }
    }

    logSentNote(note);
    registerGuestAction();
    trackEvent("note_sent", { noteId: note.id });
    setMessage("Sent quietly. If sharing is not available, the note text was copied.");
  };

  return (
    <AppLayout className="space-y-5 pb-8">
      <section className="space-y-3 py-2">
        <div className="stitched-label">{category.title}</div>
        <h1 className="font-display text-5xl leading-none text-foreground">The Note You Needed Today</h1>
        <p className="text-base leading-7 text-muted-foreground">{category.subtitle}</p>
      </section>

      {message ? <div className="paper-panel text-base text-foreground">{message}</div> : null}

      <NoteCard
        categoryLabel={category.title}
        note={note}
        actions={
          <>
            <ActionButton hint="Keep it privately on this device" icon={LockKeyhole} onClick={handleKeep}>
              Keep this Note
            </ActionButton>
            <ActionButton hint="Share or copy softly" icon={Mail} onClick={handleSend}>
              Send this Quietly
            </ActionButton>
            <ActionButton asChild hint="Write privately from what this opened" icon={NotebookPen}>
              <Link to="/write/$categorySlug" params={{ categorySlug: category.slug }}>
                Write from This
              </Link>
            </ActionButton>
            <ActionButton hint="Open a nearby note" icon={Sparkles}>
              Read Similar Notes
            </ActionButton>
            <ActionButton hint="Save this note image later" icon={Palette}>
              Save as Wallpaper
            </ActionButton>
            <ActionButton asChild hint="Explore the deeper collection" icon={Unlock}>
              <Link to="/collections">Unlock Full Collection</Link>
            </ActionButton>
          </>
        }
      />

      <section className="space-y-3">
        <h2 className="font-display text-4xl leading-none">Read Similar Notes</h2>
        <div className="grid gap-3">
          {similar.map((entry) => (
            <article key={entry.id} className="paper-panel space-y-3">
              <p className="eyebrow-copy">{entry.title}</p>
              <p className="font-note text-[1.8rem] leading-none text-foreground">
                {entry.mainText.split("\n").slice(0, 3).join(" ")}
              </p>
              <Button asChild variant="paper">
                <Link to="/note/$categorySlug" params={{ categorySlug: entry.categorySlug }}>
                  Open note
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      {showPrompt || getGuestActionCount() >= 3 ? (
        <section className="paper-panel space-y-3">
          <div className="flex items-center gap-3">
            <Heart className="heart-mark" aria-hidden="true" />
            <h2 className="font-display text-3xl leading-none">Keep this private, safely</h2>
          </div>
          <p className="text-base leading-7 text-muted-foreground">
            Create a private account so your notes and shelves do not get lost. No public profile.
            No comments. No followers.
          </p>
          <Button asChild variant="note">
            <Link to="/account">Create a private account</Link>
          </Button>
        </section>
      ) : null}
    </AppLayout>
  );
}
