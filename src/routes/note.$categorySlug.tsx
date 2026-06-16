import { Heart, LockKeyhole, Mail, NotebookPen } from "lucide-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { ActionButton } from "@/components/action-button";
import { AppLayout } from "@/components/app-layout";
import { NoteCard } from "@/components/note-card";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { getCategoryBySlug, getNoteByCategorySlug, getSimilarNotes } from "@/lib/note-data";
import {
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
      { title: `${loaderData?.note.title ?? "Note"} | The Note You Needed Today` },
      {
        name: "description",
        content: loaderData?.category.subtitle ?? "A private note for what you carry quietly.",
      },
      { property: "og:title", content: `${loaderData?.note.title ?? "Note"} | The Note You Needed Today` },
      {
        property: "og:description",
        content: loaderData?.category.subtitle ?? "A private note for what you carry quietly.",
      },
    ],
  }),
  component: NotePage,
});

function NotePage() {
  const { category, note } = Route.useLoaderData();
  const [message, setMessage] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissedPrompt, setDismissedPrompt] = useState(false);
  const similar = useMemo(() => getSimilarNotes(category.slug), [category.slug]);

  useEffect(() => {
    trackEvent("note_opened", { noteId: note.id, category: category.slug });
    setMessage(null);
  }, [category.slug, note.id]);

  const registerGuestAction = () => {
    const count = incrementGuestActionCount();
    if (shouldShowAccountPrompt(count) && !showPrompt && !dismissedPrompt) {
      setShowPrompt(true);
      trackEvent("account_prompt_shown", { actionCount: count });
    }
  };

  const handleKeep = () => {
    keepNote(note);
    trackEvent("note_kept", { noteId: note.id });
    setMessage("Kept. You can come back to this when you need it.");
    registerGuestAction();
  };

  const handleSend = async () => {
    let copied = false;
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title: note.title, text: note.sendableText });
      } else if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(note.sendableText);
        copied = true;
      }
    } catch {
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(note.sendableText);
          copied = true;
        }
      } catch {
        /* noop */
      }
    }

    logSentNote(note);
    trackEvent("note_sent", { noteId: note.id });
    setMessage(
      copied
        ? "Copied. Send it to someone who may need words today."
        : "Sent quietly. Pass it to someone who may need words today.",
    );
    registerGuestAction();
  };

  return (
    <AppLayout className="space-y-6 pb-8">
      <section className="space-y-3 py-2">
        <div className="stitched-label">{category.title}</div>
        <h1 className="font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
          {note.title}
        </h1>
        <p className="text-base leading-7 text-muted-foreground">{category.subtitle}</p>
      </section>

      {message ? (
        <div className="paper-panel text-base leading-7 text-foreground" role="status">
          {message}
        </div>
      ) : null}

      <NoteCard
        categoryLabel={category.title}
        note={note}
        actions={
          <>
            <ActionButton hint="Save it privately for later" icon={LockKeyhole} onClick={handleKeep}>
              Keep this Note
            </ActionButton>
            <ActionButton hint="Share softly, without noise" icon={Mail} onClick={handleSend}>
              Send this Quietly
            </ActionButton>
            <ActionButton
              asChild
              hint="Begin a private reflection"
              icon={NotebookPen}
              onClick={() => trackEvent("reflection_started", { noteId: note.id })}
            >
              <Link to="/write/$categorySlug" params={{ categorySlug: category.slug }}>
                Write from This
              </Link>
            </ActionButton>
          </>
        }
      />

      {showPrompt ? (
        <section className="paper-panel space-y-3">
          <div className="flex items-center gap-3">
            <Heart className="heart-mark" aria-hidden="true" />
            <h2 className="font-display text-2xl leading-none">Keep them safe across devices</h2>
          </div>
          <p className="text-base leading-7 text-muted-foreground">
            Your notes are being kept on this device. Create a private account if you want them safe
            across devices.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              variant="paper"
              className="min-h-12"
              onClick={() => {
                setShowPrompt(false);
                setDismissedPrompt(true);
              }}
            >
              Not now
            </Button>
            <Button asChild variant="note" className="min-h-12">
              <Link to="/account">Create private account</Link>
            </Button>
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="font-display text-2xl leading-none">Other notes you may need</h2>
        <div className="grid gap-3">
          {similar.map((entry) => (
            <article key={entry.id} className="paper-panel space-y-3">
              <p className="eyebrow-copy">{entry.title}</p>
              <p className="font-note text-2xl leading-tight text-foreground">
                {entry.mainText.split("\n").slice(0, 3).join(" ")}
              </p>
              <Button asChild variant="paper" className="min-h-12">
                <Link to="/note/$categorySlug" params={{ categorySlug: entry.categorySlug }}>
                  Open note
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
