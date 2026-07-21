import { ArrowLeft, BookOpenText, ImageDown, Layers2, LockKeyhole, NotebookPen, Share2 } from "lucide-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { ActionButton } from "@/components/action-button";
import { ShareNote } from "@/components/share-note";
import { ShareNoteModal } from "@/components/share-note-modal";
import { AppLayout } from "@/components/app-layout";
import { NoteCard } from "@/components/note-card";
import { NoteNotFound, RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { getCategoryBySlug, getNoteByCategorySlug, getSimilarNotes } from "@/lib/note-data";
import { requestInstallPrompt } from "@/lib/pwa-install";
import {
  getKeptNotes,
  keepNote,
  registerMeaningfulGuestAction,
} from "@/lib/note-storage";

export const Route = createFileRoute("/note/$categorySlug")({
  loader: ({ params }) => {
    const category = getCategoryBySlug(params.categorySlug);
    const note = getNoteByCategorySlug(params.categorySlug);
    if (!category || !note) throw notFound();
    return { category, note };
  },
  errorComponent: RouteErrorBoundary,
  notFoundComponent: NoteNotFound,
  head: ({ loaderData }) => {
    const noteTitle = loaderData?.note.title ?? "Note";
    const ogDescription =
      loaderData?.note.hookLine ||
      loaderData?.note.shareExcerpt ||
      loaderData?.category.subtitle ||
      "Find words for what you carry quietly.";
    const canonicalUrl = `https://thenoteyouneeded.today/note/${loaderData?.note.categorySlug ?? ""}`;
    const ogImage = "https://thenoteyouneeded.today/og-image.png";
    return {
      links: [{ rel: "canonical", href: canonicalUrl }],
      meta: [
        { title: `${noteTitle} | The Note You Needed Today` },
        { name: "description", content: ogDescription },
        { property: "og:type", content: "article" },
        { property: "og:site_name", content: "The Note You Needed Today" },
        { property: "og:title", content: `${noteTitle} | The Note You Needed Today` },
        { property: "og:description", content: ogDescription },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${noteTitle} | The Note You Needed Today` },
        { name: "twitter:description", content: ogDescription },
        { name: "twitter:image", content: ogImage },
      ],
    };
  },
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
  const [captionLabel, setCaptionLabel] = useState("Copy caption for sharing");
  const similar = useMemo(() => getSimilarNotes(category.slug), [category.slug]);

  useEffect(() => {
    trackEvent("note_opened", { noteId: note.id, category: category.slug });
    setActionResult(null);
    setIsKept(getKeptNotes().some((n) => n.noteId === note.id));
    // Gently invite install after reading a note (fires after 4s to let them read first)
    const id = setTimeout(() => requestInstallPrompt(), 4000);
    return () => clearTimeout(id);
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

  const handleCopyCaption = async () => {
    const caption =
      note.longCaption ||
      note.shortCaption ||
      `From The Note You Needed Today.\nFind words for what you carry quietly.\nhttps://thenoteyouneeded.today/note/${note.categorySlug}`;
    try {
      await navigator.clipboard.writeText(caption);
      setCaptionLabel("Caption copied");
      trackEvent("note_caption_copied", { noteId: note.id });
      setTimeout(() => setCaptionLabel("Copy caption for sharing"), 2000);
    } catch {
      // clipboard unavailable
    }
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

      <div className="space-y-3">
        <ShareNote
          noteTitle={note.title}
          wallpaperLine={note.hookLine || note.shareExcerpt || ""}
          caption={note.longCaption || note.shortCaption || ""}
          context="note"
          url={`https://thenoteyouneeded.today/note/${note.categorySlug}`}
          asActionButton
        />
        <button
          type="button"
          onClick={handleCopyCaption}
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {captionLabel}
        </button>
      </div>

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
