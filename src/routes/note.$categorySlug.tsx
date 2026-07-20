import { ArrowLeft, BookOpenText, ImageDown, Layers2, LockKeyhole, Mail, NotebookPen, Share2 } from "lucide-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { ActionButton } from "@/components/action-button";
import { ShareNoteModal } from "@/components/share-note-modal";
import { AppLayout } from "@/components/app-layout";
import { NoteCard } from "@/components/note-card";
import { NoteNotFound, RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { getCategoryBySlug, getNoteByCategorySlug, getSimilarNotes } from "@/lib/note-data";
import {
  getKeptNotes,
  keepNote,
  logSentNote,
  registerMeaningfulGuestAction,
} from "@/lib/note-storage";
import { buildShareText } from "@/lib/share";

export const Route = createFileRoute("/note/$categorySlug")({
  loader: ({ params }) => {
    const category = getCategoryBySlug(params.categorySlug);
    const note = getNoteByCategorySlug(params.categorySlug);
    if (!category || !note) throw notFound();
    return { category, note };
  },
  errorComponent: RouteErrorBoundary,
  notFoundComponent: NoteNotFound,
  head: ({ loaderData }) => ({
    links: [
      {
        rel: "canonical",
        href: `https://thenoteyouneeded.today/note/${loaderData?.note.categorySlug ?? ""}`,
      },
    ],
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
      {
        property: "og:url",
        content: `https://thenoteyouneeded.today/note/${loaderData?.note.categorySlug ?? ""}`,
      },
    ],
  }),
  component: NotePage,
});

interface ActionResult {
  text: string;
  shelfLink?: boolean;
}

function NotePage() {
  const { category, note } = Route.useLoaderData();
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);
  const [isKept, setIsKept] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareInitialPreset, setShareInitialPreset] = useState<"A" | "D" | "P">("A");
  const similar = useMemo(() => getSimilarNotes(category.slug), [category.slug]);

  useEffect(() => {
    trackEvent("note_opened", { noteId: note.id, category: category.slug });
    setActionResult(null);
    setIsKept(getKeptNotes().some((n) => n.noteId === note.id));
  }, [category.slug, note.id]);

  const handleKeep = () => {
    if (isKept) {
      setActionResult({ text: "Already kept in your Shelf.", shelfLink: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    keepNote(note);
    trackEvent("note_kept", { noteId: note.id });
    setIsKept(true);
    setActionResult({
      text: "Kept. You can come back to this when you need it.",
      shelfLink: true,
    });
    registerMeaningfulGuestAction();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSend = async () => {
    const shareText = buildShareText(note.sendableText);
    let shared = false;
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title: note.title, text: shareText });
        shared = true;
      } else if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(shareText);
        shared = true;
      }
    } catch {
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(shareText);
          shared = true;
        }
      } catch {
        // all sharing methods unavailable
      }
    }

    logSentNote(note);
    trackEvent("note_sent", { noteId: note.id });
    setActionResult({
      text: shared
        ? "Copied. Send it to someone who may need words today."
        : "Copy the note manually.",
    });
    registerMeaningfulGuestAction();
  };

  return (
    <AppLayout className="space-y-6 pb-8">
      <section className="space-y-3 py-2">
        <Link
          to="/feelings"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to Feelings
        </Link>
        <div className="stitched-label">{category.title}</div>
        <h1 className="font-display text-4xl leading-[1.05] text-foreground sm:text-5xl">
          {note.title}
        </h1>
        <p className="text-base leading-7 text-muted-foreground">{category.subtitle}</p>
      </section>

      {actionResult ? (
        <div className="paper-panel space-y-3 text-base leading-7 text-foreground" role="status">
          <p>{actionResult.text}</p>
          {actionResult.shelfLink ? (
            <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
              <Link to="/shelf">View in Shelf</Link>
            </Button>
          ) : null}
        </div>
      ) : null}

      <NoteCard
        categoryLabel={category.title}
        note={note}
        actions={
          <>
            <ActionButton
              hint={isKept ? "Already in your Shelf" : "Save it privately for later"}
              icon={LockKeyhole}
              onClick={handleKeep}
            >
              {isKept ? "Kept in Shelf" : "Keep this Note"}
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
            <ActionButton
              hint="Share as image or private message"
              icon={Share2}
              onClick={() => {
                setShareInitialPreset("A");
                setShareOpen(true);
                trackEvent("share_modal_opened", {
                  noteId: note.id,
                  categorySlug: category.slug,
                  source: "note_page",
                });
              }}
            >
              Share this Note
            </ActionButton>
            <ActionButton
              hint="Download full note as a keepsake portrait image"
              icon={ImageDown}
              onClick={() => {
                setShareInitialPreset("P");
                setShareOpen(true);
                trackEvent("share_modal_opened", {
                  noteId: note.id,
                  categorySlug: category.slug,
                  source: "note_page_portrait",
                });
              }}
            >
              Download as Keepsake
            </ActionButton>
            <ActionButton
              asChild
              hint="Three more notes for what you carry"
              icon={BookOpenText}
            >
              <a href="#similar-notes">Read Similar Notes</a>
            </ActionButton>
            <ActionButton
              asChild
              hint="Get the full Volume 1 collection"
              icon={Layers2}
              onClick={() => trackEvent("collection_clicked", { from: "note", noteId: note.id })}
            >
              <Link to="/volume-1">Get Volume 1</Link>
            </ActionButton>
          </>
        }
      />

      {note.safetyNote ? (
        <div className="paper-panel space-y-3 border-l-4 border-l-destructive/50">
          <p className="text-sm font-medium leading-6 text-foreground">
            If you are struggling right now, you do not have to carry this alone.
          </p>
          <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
            <Link to="/support">Find support now</Link>
          </Button>
        </div>
      ) : note.needsSafetyCue ? (
        <div className="paper-panel space-y-2 border-l-4 border-l-border">
          <p className="text-sm leading-6 text-muted-foreground">
            {note.safetyCueText ??
              "If this brought up something heavy, please pause. You do not have to carry it alone. Visit Safety & Support or reach out to someone you trust."}
          </p>
          <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
            <Link to="/support">Safety &amp; Support</Link>
          </Button>
        </div>
      ) : null}

      <ShareNoteModal
        note={note}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        initialPreset={shareInitialPreset}
      />

      <section id="similar-notes" className="space-y-3 scroll-mt-6">
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
