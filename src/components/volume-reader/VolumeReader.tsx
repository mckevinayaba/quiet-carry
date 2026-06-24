import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  volume1Chapters,
  closingReceipt,
  getMarginNote,
  openingLetter,
  safetyAndCareNote,
  CHAPTER_COUNT,
} from "@/data/volume1";
import type { Volume1Chapter, Volume1Note } from "@/data/volume1";
import { ChapterArtifact } from "./ChapterArtifact";
import type { ChapterTitle } from "./ChapterArtifact";
import { PremiumReceipt } from "./PremiumReceipt";

interface VolumeReaderProps {
  chapter: Volume1Chapter;
  chapterNumber: number;
}

// ---------------------------------------------------------------------------
// Scoped design tokens — restyle only this reading surface, not the site theme.
// ---------------------------------------------------------------------------

const vrVars: React.CSSProperties = {
  "--vr-bg": "#FAF6F1",
  "--vr-bg-cover": "#2C2420",
  "--vr-bg-letter": "#F5EFE6",
  "--vr-text": "#3D2B1F",
  "--vr-muted": "#9C8478",
  "--vr-accent": "#C4A882",
  "--vr-divider": "#E8DDD4",
  "--vr-display": "'Playfair Display', serif",
  "--vr-body": "'Lora', Georgia, serif",
} as React.CSSProperties;

// ---------------------------------------------------------------------------
// Main reader
// ---------------------------------------------------------------------------

export function VolumeReader({ chapter, chapterNumber }: VolumeReaderProps) {
  const isLastChapter = chapterNumber === CHAPTER_COUNT;
  const isFirstChapter = chapterNumber === 1;
  const isQuietAnger = !!chapter.isExclusive;

  // Scroll to an in-page anchor (e.g. the closing receipt) when arriving via hash.
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div style={{ ...vrVars, background: "var(--vr-bg)", minHeight: "100vh" }}>
      <TopBar chapterTitle={chapter.title} />

      {/* Chapter cover — full-screen opening moment */}
      <ChapterCover chapter={chapter} chapterNumber={chapterNumber} isQuietAnger={isQuietAnger} />

      {/* Reading column */}
      <div
        className="mx-auto px-6 md:px-16"
        style={{ maxWidth: "680px", padding: "56px 24px 80px" }}
      >
        {isFirstChapter && <OpeningLetter />}

        <ChapterIntroLetter introLetter={chapter.introLetter} />

        {/* Notes */}
        <div style={{ marginTop: "64px", display: "flex", flexDirection: "column" }}>
          {chapter.notes.map((note, idx) => {
            const marginNote = getMarginNote(note.id);
            return (
              <NoteArticle
                key={note.id}
                note={note}
                index={idx + 1}
                isQuietAnger={isQuietAnger}
                marginText={marginNote?.text}
              />
            );
          })}
        </div>

        {/* Private letter */}
        <PrivateLetterSection text={chapter.privateLetter} />

        {/* Receipt divider — between chapters */}
        <ReceiptDivider chapterNumber={chapterNumber} />

        {/* Closing receipt — Chapter 5 only */}
        {isLastChapter && <SafetyCareNote />}
        {isLastChapter && <ClosingReceiptDestination />}

        {/* Chapter prev / next */}
        <ChapterPrevNext currentChapter={chapterNumber} />
      </div>

      <FloatingChapterIndex currentChapter={chapterNumber} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Minimal top bar — replaces all site nav for this route
// ---------------------------------------------------------------------------

function TopBar({ chapterTitle }: { chapterTitle: string }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "16px 24px",
        background: "color-mix(in oklab, var(--vr-bg) 92%, transparent)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid var(--vr-divider)",
      }}
    >
      <Link
        to="/volume-1"
        style={{
          fontFamily: "var(--vr-body)",
          fontSize: "13px",
          color: "var(--vr-muted)",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          flexShrink: 0,
        }}
      >
        <ArrowLeft size={13} aria-hidden /> Volume 1
      </Link>

      <span
        style={{
          fontFamily: "var(--vr-body)",
          fontSize: "12px",
          fontVariant: "small-caps",
          letterSpacing: "0.08em",
          color: "var(--vr-muted)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
        {chapterTitle}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chapter cover — full-screen, dark, ghost number
// ---------------------------------------------------------------------------

function ChapterCover({
  chapter,
  chapterNumber,
  isQuietAnger,
}: {
  chapter: Volume1Chapter;
  chapterNumber: number;
  isQuietAnger: boolean;
}) {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "80px 24px",
        background: "var(--vr-bg-cover)",
        textAlign: "center",
      }}
    >
      {/* Ghost chapter number */}
      <span
        aria-hidden
        style={{
          fontFamily: "var(--vr-display)",
          fontWeight: 100,
          fontSize: "clamp(60px, 15vw, 120px)",
          color: "transparent",
          WebkitTextStroke: "1px var(--vr-accent)",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          userSelect: "none",
          display: "block",
          marginBottom: "20px",
        }}
      >
        {String(chapterNumber).padStart(2, "0")}
      </span>

      {/* Chapter title */}
      <h1
        style={{
          fontFamily: "var(--vr-display)",
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 500,
          color: "#FAF6F1",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}
      >
        {chapter.title}
      </h1>

      {/* Chapter tagline */}
      <p
        style={{
          fontFamily: "var(--vr-body)",
          fontSize: "1rem",
          fontStyle: "italic",
          color: "var(--vr-accent)",
          marginBottom: "56px",
        }}
      >
        {chapter.tagline}
      </p>

      {/* Chapter artifact — recolored for the dark cover */}
      <div
        style={
          {
            display: "flex",
            justifyContent: "center",
            "--foreground": "var(--vr-accent)",
          } as React.CSSProperties
        }
      >
        <ChapterArtifact chapter={chapter.title as ChapterTitle} isQuietAnger={isQuietAnger} />
      </div>

      {isQuietAnger && (
        <p
          style={{
            fontFamily: "var(--vr-body)",
            fontSize: "11px",
            color: "var(--vr-accent)",
            opacity: 0.7,
            marginTop: "32px",
            letterSpacing: "0.04em",
          }}
        >
          Five exclusive notes — written only for Volume 1.
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Opening letter from MAD — shown once, before Chapter 1
// ---------------------------------------------------------------------------

function OpeningLetter() {
  const paragraphs = openingLetter.split("\n\n").filter(Boolean);

  return (
    <section
      style={{
        marginBottom: "56px",
        paddingBottom: "40px",
        borderBottom: "1px solid var(--vr-divider)",
      }}
    >
      {paragraphs.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: "var(--vr-body)",
            fontSize: i === paragraphs.length - 1 ? "16px" : "17px",
            fontStyle: i === paragraphs.length - 1 ? "italic" : undefined,
            lineHeight: 1.85,
            color: "var(--vr-text)",
            marginBottom: i < paragraphs.length - 1 ? "20px" : 0,
            whiteSpace: "pre-line",
          }}
        >
          {para}
        </p>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Chapter intro letter — opening prose of the chapter
// ---------------------------------------------------------------------------

function ChapterIntroLetter({ introLetter }: { introLetter: string }) {
  const paragraphs = introLetter.split("\n\n").filter(Boolean);

  return (
    <section style={{ marginTop: "8px" }}>
      {paragraphs.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: "var(--vr-body)",
            fontSize: i === 0 ? "1.15rem" : "1.05rem",
            lineHeight: 1.85,
            color: "var(--vr-text)",
            marginBottom: i < paragraphs.length - 1 ? "22px" : 0,
            whiteSpace: "pre-line",
          }}
        >
          {para}
        </p>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Note article — full-width parchment section with margin annotation
// ---------------------------------------------------------------------------

function NoteArticle({
  note,
  index,
  isQuietAnger,
  marginText,
}: {
  note: Volume1Note;
  index: number;
  isQuietAnger: boolean;
  marginText?: string;
}) {
  return (
    <article
      style={{
        padding: "48px 0 56px",
        borderTop: "1px solid var(--vr-divider)",
        background: isQuietAnger
          ? "color-mix(in oklab, var(--vr-accent) 6%, var(--vr-bg))"
          : "var(--vr-bg)",
      }}
    >
      {/* Note header */}
      <header style={{ marginBottom: "20px" }}>
        <span
          style={{
            fontFamily: "var(--vr-body)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "var(--vr-muted)",
            display: "block",
            marginBottom: "6px",
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <h2
          style={{
            fontFamily: "var(--vr-display)",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 500,
            lineHeight: 1.15,
            color: "var(--vr-text)",
            margin: 0,
          }}
        >
          {note.title}
        </h2>
      </header>

      {/* Safety cue */}
      {note.safetyNote && (
        <div
          style={{
            borderLeft: "2px solid var(--vr-accent)",
            paddingLeft: "14px",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--vr-body)",
              fontSize: "12px",
              lineHeight: 1.7,
              color: "var(--vr-muted)",
              margin: 0,
            }}
          >
            This note touches on dark moments. If you are not safe right now, please move toward
            someone who can help.{" "}
            <Link to="/support" style={{ color: "inherit", textDecoration: "underline" }}>
              Safety &amp; Support
            </Link>
          </p>
        </div>
      )}

      {/* Note body */}
      <div
        style={{
          fontFamily: "var(--vr-body)",
          fontSize: "19px",
          lineHeight: 1.85,
          color: "var(--vr-text)",
          whiteSpace: "pre-line",
          marginBottom: "24px",
        }}
      >
        {note.body}
      </div>

      {/* Margin annotation — signed */}
      {marginText && (
        <p
          style={{
            fontFamily: "var(--vr-body)",
            fontSize: "13px",
            fontStyle: "italic",
            lineHeight: 1.6,
            color: "var(--vr-muted)",
            whiteSpace: "pre-line",
            marginBottom: "28px",
          }}
        >
          {marginText}
          <br />— MAD
        </p>
      )}

      {/* Premium receipt */}
      <PremiumReceipt
        from={note.from}
        to={note.to}
        date={note.date}
        total={note.total}
        isQuietAnger={isQuietAnger}
      />

      {isQuietAnger && (
        <div style={{ paddingTop: "12px", textAlign: "right" }}>
          <span
            style={{
              fontFamily: "var(--vr-body)",
              fontSize: "11px",
              fontStyle: "italic",
              color: "var(--vr-muted)",
              letterSpacing: "0.03em",
            }}
          >
            Exclusive to Volume 1
          </span>
        </div>
      )}
    </article>
  );
}

// ---------------------------------------------------------------------------
// Private letter section — end of chapter
// ---------------------------------------------------------------------------

function PrivateLetterSection({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <section
      className="ml-4 md:ml-8"
      style={{
        marginTop: "64px",
        padding: "40px 28px",
        background: "var(--vr-bg-letter)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--vr-body)",
          fontSize: "16px",
          fontStyle: "italic",
          color: "var(--vr-muted)",
          marginBottom: "20px",
        }}
      >
        Dear reader,
      </p>

      {paragraphs.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: "var(--vr-body)",
            fontSize: "16px",
            lineHeight: 1.85,
            color: "var(--vr-text)",
            marginBottom: i < paragraphs.length - 1 ? "18px" : 0,
            whiteSpace: "pre-line",
          }}
        >
          {para}
        </p>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Receipt divider — between chapters
// ---------------------------------------------------------------------------

function ReceiptDivider({ chapterNumber }: { chapterNumber: number }) {
  return (
    <div
      style={{
        marginTop: "56px",
        padding: "20px 0",
        borderTop: "1px dotted var(--vr-divider)",
        borderBottom: "1px dotted var(--vr-divider)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "ui-monospace, 'Lora', Georgia, serif",
          fontSize: "12px",
          fontVariant: "small-caps",
          letterSpacing: "0.08em",
          color: "var(--vr-muted)",
          margin: 0,
        }}
      >
        — Chapter {chapterNumber} of {CHAPTER_COUNT} —
      </p>
      <p
        style={{
          fontFamily: "ui-monospace, 'Lora', Georgia, serif",
          fontSize: "12px",
          color: "var(--vr-muted)",
          margin: "4px 0 0",
        }}
      >
        Received. Kept.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Safety & care note — shown between Chapter 5 and the closing receipt
// ---------------------------------------------------------------------------

function SafetyCareNote() {
  const paragraphs = safetyAndCareNote.split("\n\n").filter(Boolean);

  return (
    <section
      style={{
        marginTop: "64px",
        maxWidth: "480px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "48px 32px",
        background: "var(--vr-bg-letter)",
        textAlign: "center",
      }}
    >
      {paragraphs.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: i === 0 ? "var(--vr-display)" : "var(--vr-body)",
            fontSize: i === 0 ? "13px" : "15px",
            letterSpacing: i === 0 ? "0.1em" : undefined,
            lineHeight: 1.8,
            color: i === paragraphs.length - 1 ? "var(--vr-muted)" : "var(--vr-text)",
            fontStyle: i === paragraphs.length - 1 ? "italic" : undefined,
            marginBottom: i < paragraphs.length - 1 ? "16px" : 0,
            whiteSpace: "pre-line",
          }}
        >
          {para}
        </p>
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Closing receipt — final destination after Chapter 5
// ---------------------------------------------------------------------------

function ClosingReceiptDestination() {
  const paragraphs = closingReceipt.closing.split("\n\n").filter(Boolean);

  return (
    <section
      id="closing-receipt"
      style={{
        marginTop: "64px",
        maxWidth: "480px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "64px 32px",
        background: "var(--vr-bg)",
        borderTop: "2px dashed var(--vr-accent)",
        borderBottom: "2px dashed var(--vr-accent)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "ui-monospace, 'Lora', Georgia, serif",
          fontSize: "12px",
          letterSpacing: "0.06em",
          color: "var(--vr-muted)",
          marginBottom: "20px",
        }}
      >
        THE NOTE YOU NEEDED TODAY
        <br />
        Volume 1 — The Things We Do Not Say Out Loud
      </p>

      <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "left" }}>
        <PremiumReceipt
          from={closingReceipt.from}
          to={closingReceipt.to}
          date={closingReceipt.date}
          total={closingReceipt.total}
          keepText="This is yours."
          isClosing
        />
      </div>

      <div
        style={{ marginTop: "40px", maxWidth: "460px", marginLeft: "auto", marginRight: "auto" }}
      >
        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--vr-body)",
              fontSize: "15px",
              fontStyle: "italic",
              lineHeight: 1.8,
              color: "var(--vr-muted)",
              marginBottom: i < paragraphs.length - 1 ? "14px" : 0,
              whiteSpace: "pre-line",
            }}
          >
            {para}
          </p>
        ))}

        <p style={{ marginTop: "28px" }}>
          <Link
            to="/support"
            style={{
              fontFamily: "var(--vr-body)",
              fontSize: "13px",
              fontStyle: "italic",
              color: "var(--vr-muted)",
              textDecoration: "underline",
            }}
          >
            If you need someone to speak to, visit our Safety &amp; Support page.
          </Link>
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Chapter prev / next navigation
// ---------------------------------------------------------------------------

function ChapterPrevNext({ currentChapter }: { currentChapter: number }) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "56px",
        paddingTop: "32px",
        borderTop: "1px solid var(--vr-divider)",
      }}
    >
      {currentChapter > 1 ? (
        <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
          <Link to="/volume-1/read/$chapter" params={{ chapter: String(currentChapter - 1) }}>
            <ArrowLeft className="size-3.5" aria-hidden />
            Chapter {currentChapter - 1}
          </Link>
        </Button>
      ) : (
        <span />
      )}

      {currentChapter < CHAPTER_COUNT ? (
        <Button asChild variant="note" size="sm" className="min-h-9 text-sm">
          <Link to="/volume-1/read/$chapter" params={{ chapter: String(currentChapter + 1) }}>
            Chapter {currentChapter + 1}
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Floating chapter index — fixed bottom-right, opens a drawer
// ---------------------------------------------------------------------------

function FloatingChapterIndex({ currentChapter }: { currentChapter: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open chapter index"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "16px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "var(--vr-bg-cover, #2C2420)",
            color: "#FAF6F1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            zIndex: 30,
          }}
        >
          <BookOpen size={18} aria-hidden />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        style={{
          background: "#FAF6F1",
          fontFamily: "'Lora', Georgia, serif",
        }}
      >
        <SheetHeader>
          <SheetTitle style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F" }}>
            Volume 1
          </SheetTitle>
        </SheetHeader>

        <nav style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <Link
            to="/volume-1"
            onClick={() => setOpen(false)}
            style={{
              padding: "10px 4px",
              fontFamily: "'Playfair Display', serif",
              fontSize: "1rem",
              color: "#3D2B1F",
              textDecoration: "none",
              borderBottom: "1px solid #E8DDD4",
            }}
          >
            Opening
          </Link>

          {volume1Chapters.map((ch) => (
            <Link
              key={ch.number}
              to="/volume-1/read/$chapter"
              params={{ chapter: String(ch.number) }}
              onClick={() => setOpen(false)}
              style={{
                padding: "10px 4px",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                color: ch.number === currentChapter ? "#3D2B1F" : "#9C8478",
                fontWeight: ch.number === currentChapter ? 600 : 400,
                textDecoration: "none",
                borderBottom: "1px solid #E8DDD4",
              }}
            >
              {String(ch.number).padStart(2, "0")} — {ch.title}
            </Link>
          ))}

          <Link
            to="/volume-1/read/$chapter"
            params={{ chapter: String(CHAPTER_COUNT) }}
            hash="closing-receipt"
            onClick={() => setOpen(false)}
            style={{
              padding: "10px 4px",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "1rem",
              color: "#9C8478",
              textDecoration: "none",
            }}
          >
            Closing Receipt
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
