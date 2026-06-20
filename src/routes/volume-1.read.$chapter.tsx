import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import {
  volume1Chapters,
  closingReceipt,
  getChapter,
  CHAPTER_COUNT,
} from "@/data/volume1";
import type { Volume1Note, Volume1Chapter } from "@/data/volume1";

export const Route = createFileRoute("/volume-1/read/$chapter")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [{ title: "Volume 1 | The Note You Needed Today" }],
  }),
  component: ChapterPage,
});

function ChapterPage() {
  const { chapter: chapterParam } = Route.useParams();
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  const chapterNumber = parseInt(chapterParam, 10);
  const chapter = getChapter(chapterNumber);

  // Gate: client-side localStorage check. SSR always renders null (loading).
  useEffect(() => {
    const isUnlocked = localStorage.getItem("volume1_unlocked") === "true";
    if (!isUnlocked) {
      navigate({ to: "/volume-1/unlock" });
    } else {
      setUnlocked(true);
    }
  }, [navigate]);

  // Invalid chapter number — redirect to chapter 1.
  useEffect(() => {
    if (unlocked && (!chapter || isNaN(chapterNumber))) {
      navigate({ to: "/volume-1/read/$chapter", params: { chapter: "1" } });
    }
  }, [unlocked, chapter, chapterNumber, navigate]);

  // Show nothing during SSR / gate check to prevent flash.
  if (!unlocked || !chapter) return null;

  return (
    <AppLayout className="space-y-0 pb-16">
      <ChapterReader chapter={chapter} chapterNumber={chapterNumber} />
    </AppLayout>
  );
}

function ChapterReader({
  chapter,
  chapterNumber,
}: {
  chapter: Volume1Chapter;
  chapterNumber: number;
}) {
  const isLastChapter = chapterNumber === CHAPTER_COUNT;
  const isQuietAnger = chapter.isExclusive;

  return (
    <div className={isQuietAnger ? "quiet-anger-chapter" : undefined}>
      {/* Back to Volume 1 */}
      <div className="py-4">
        <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
          <Link to="/volume-1">
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Volume 1
          </Link>
        </Button>
      </div>

      {/* Chapter menu */}
      <ChapterMenu currentChapter={chapterNumber} />

      {/* Chapter header */}
      <header className="space-y-4 py-10 border-b border-border">
        <span className="font-label text-3xl text-muted-foreground">
          0{chapterNumber}
        </span>
        <h1 className="font-display text-4xl leading-[1.02] text-foreground sm:text-5xl">
          {chapter.title}
        </h1>
        <p className="text-lg leading-7 text-muted-foreground italic">
          {chapter.tagline}
        </p>
        {chapter.isExclusive ? (
          <p className="text-xs leading-5 text-muted-foreground/70 italic">
            Five exclusive notes — written only for Volume 1. Not available anywhere on the free platform.
          </p>
        ) : null}
      </header>

      {/* Intro letter */}
      <section className="py-12 max-w-2xl space-y-4">
        <span className="eyebrow-copy">Opening</span>
        <div
          className="font-display text-lg leading-8 text-foreground/90 whitespace-pre-line"
          style={{ whiteSpace: "pre-line" }}
        >
          {chapter.introLetter}
        </div>
      </section>

      {/* Notes */}
      <div className="space-y-14 py-4">
        {chapter.notes.map((note, idx) => (
          <NoteEntry
            key={note.id}
            note={note}
            index={idx + 1}
            isExclusiveChapter={!!chapter.isExclusive}
          />
        ))}
      </div>

      {/* Private letter */}
      <section className="py-14 border-t border-border max-w-2xl space-y-6">
        <div className="flex items-center gap-2">
          <Heart className="heart-mark size-4" aria-hidden />
          <span className="eyebrow-copy">A private letter</span>
        </div>
        <div
          className="font-display text-lg leading-8 text-foreground/90"
          style={{ whiteSpace: "pre-line" }}
        >
          {chapter.privateLetter}
        </div>
      </section>

      {/* Closing receipt — only after Chapter 5 */}
      {isLastChapter ? <ClosingReceiptSection /> : null}

      {/* Chapter navigation */}
      <nav className="flex items-center justify-between py-10 border-t border-border">
        {chapterNumber > 1 ? (
          <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
            <Link
              to="/volume-1/read/$chapter"
              params={{ chapter: String(chapterNumber - 1) }}
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Chapter {chapterNumber - 1}
            </Link>
          </Button>
        ) : (
          <span />
        )}

        {chapterNumber < CHAPTER_COUNT ? (
          <Button asChild variant="note" size="sm" className="min-h-9 text-sm">
            <Link
              to="/volume-1/read/$chapter"
              params={{ chapter: String(chapterNumber + 1) }}
            >
              Chapter {chapterNumber + 1}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

function ChapterMenu({ currentChapter }: { currentChapter: number }) {
  return (
    <nav className="border-b border-border py-4 overflow-x-auto">
      <ul className="flex gap-1 min-w-max">
        {volume1Chapters.map((ch) => {
          const isActive = ch.number === currentChapter;
          return (
            <li key={ch.number}>
              <Link
                to="/volume-1/read/$chapter"
                params={{ chapter: String(ch.number) }}
                className={[
                  "inline-flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-label transition-colors",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                ].join(" ")}
              >
                <span className="text-[10px] opacity-60">0{ch.number}</span>
                {ch.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function NoteEntry({
  note,
  index,
  isExclusiveChapter,
}: {
  note: Volume1Note;
  index: number;
  isExclusiveChapter: boolean;
}) {
  return (
    <article
      className={[
        "paper-panel space-y-6 p-6 sm:p-8",
        isExclusiveChapter ? "border-foreground/20 bg-[color:var(--paper-deep)]/80" : "",
      ].join(" ")}
    >
      {/* Note header */}
      <header className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-label text-xs text-muted-foreground/70">
            Note {String(index).padStart(2, "0")}
            {note.isExclusive ? " · Exclusive" : ""}
          </span>
          <Heart className="heart-mark size-3.5" aria-hidden />
        </div>
        <h2 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
          {note.title}
        </h2>
      </header>

      {/* Safety cue */}
      {note.safetyNote ? (
        <div className="stitched-edge bg-muted/40 px-4 py-3">
          <p className="text-xs leading-5 text-muted-foreground">
            This note touches on dark moments. If you are not safe right now, please move toward someone who can help.{" "}
            <Link to="/support" className="underline underline-offset-2">
              Safety &amp; Support
            </Link>
          </p>
        </div>
      ) : null}

      {/* Body */}
      <div
        className="font-display text-lg leading-8 text-foreground/90"
        style={{ whiteSpace: "pre-line" }}
      >
        {note.body}
      </div>

      {/* Receipt block */}
      <div className="border-t border-border pt-5 space-y-2 font-label text-sm text-muted-foreground">
        <ReceiptRow label="FROM" value={note.from} />
        <ReceiptRow label="TO" value={note.to} />
        <ReceiptRow label="DATE" value={note.date} />
        <div className="border-t border-border pt-2">
          <ReceiptRow label="TOTAL" value={note.total} bold />
        </div>
      </div>
    </article>
  );
}

function ReceiptRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <span className="w-10 shrink-0 text-xs text-muted-foreground/60">{label}</span>
      <span className={bold ? "font-medium text-foreground" : ""}>{value}</span>
    </div>
  );
}

function ClosingReceiptSection() {
  return (
    <section className="py-14 border-t border-border space-y-8">
      <div className="flex items-center gap-2">
        <Heart className="heart-mark size-4" aria-hidden />
        <span className="eyebrow-copy">Closing receipt</span>
      </div>

      <div className="paper-panel max-w-xl space-y-4 p-6 sm:p-8">
        <div className="space-y-2 font-label text-sm text-muted-foreground">
          <ReceiptRow label="FROM" value={closingReceipt.from} />
          <ReceiptRow label="TO" value={closingReceipt.to} />
          <ReceiptRow label="DATE" value={closingReceipt.date} />
          <div className="border-t border-border pt-2">
            <ReceiptRow label="TOTAL" value={closingReceipt.total} bold />
          </div>
        </div>

        <p
          className="font-display text-base leading-7 text-muted-foreground/80"
          style={{ whiteSpace: "pre-line" }}
        >
          {closingReceipt.closing}
        </p>
      </div>
    </section>
  );
}
