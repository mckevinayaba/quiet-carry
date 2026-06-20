import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  volume1Chapters,
  closingReceipt,
  getMarginNote,
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
// Main reader
// ---------------------------------------------------------------------------

export function VolumeReader({ chapter, chapterNumber }: VolumeReaderProps) {
  const isLastChapter = chapterNumber === CHAPTER_COUNT;
  const isQuietAnger = !!chapter.isExclusive;

  return (
    <div>
      {/* Mobile: chapter indicator bar + back link */}
      <MobileChapterNav currentChapter={chapterNumber} />

      {/* Chapter cover — full-screen opening moment */}
      <ChapterCover chapter={chapter} chapterNumber={chapterNumber} isQuietAnger={isQuietAnger} />

      {/* Reading body: desktop sidebar + content column */}
      <div className="flex">
        {/* Desktop sidebar — sticky, xl+ only */}
        <aside className="hidden xl:block shrink-0" style={{ width: "160px", paddingTop: "72px" }}>
          <div className="sticky top-8 pr-4">
            <DesktopChapterNav currentChapter={chapterNumber} />
          </div>
        </aside>

        {/* Reading column */}
        <div
          className="flex-1 min-w-0 mx-auto xl:mx-0"
          style={{ maxWidth: "680px", padding: "72px 24px 80px" }}
        >
          <ChapterIntroLetter introLetter={chapter.introLetter} />

          {/* Notes */}
          <div style={{ marginTop: "80px", display: "flex", flexDirection: "column", gap: "64px" }}>
            {chapter.notes.map((note, idx) => {
              const marginNote = getMarginNote(note.id);
              return (
                <div key={note.id} style={{ position: "relative" }}>
                  <NoteArticle note={note} index={idx + 1} isQuietAnger={isQuietAnger} />

                  {marginNote && (
                    <>
                      {/* Desktop: float in right margin */}
                      <div
                        className="hidden xl:block"
                        style={{
                          position: "absolute",
                          top: "2rem",
                          left: "calc(100% + 2.5rem)",
                          width: "136px",
                        }}
                      >
                        <MarginNoteEl text={marginNote.text} />
                      </div>
                      {/* Mobile: inline below note body */}
                      <div
                        className="xl:hidden"
                        style={{
                          marginTop: "16px",
                          paddingLeft: "18px",
                          borderLeft: "1.5px solid color-mix(in oklab, var(--border) 55%, transparent)",
                        }}
                      >
                        <MarginNoteEl text={marginNote.text} />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Private letter */}
          <PrivateLetterSection text={chapter.privateLetter} />

          {/* Closing receipt — Chapter 5 only */}
          {isLastChapter && <ClosingReceiptDestination />}

          {/* Chapter prev / next */}
          <ChapterPrevNext currentChapter={chapterNumber} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile chapter navigation bar
// ---------------------------------------------------------------------------

function MobileChapterNav({ currentChapter }: { currentChapter: number }) {
  const chapter = volume1Chapters.find((c) => c.number === currentChapter);

  return (
    <div
      className="xl:hidden"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid var(--color-border)",
        gap: "12px",
      }}
    >
      <Link
        to="/volume-1"
        style={{
          fontFamily: "var(--font-label)",
          fontSize: "11px",
          color: "var(--color-muted-foreground)",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          flexShrink: 0,
        }}
      >
        <ArrowLeft size={12} aria-hidden /> Vol. 1
      </Link>

      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "13px",
          color: "var(--color-foreground)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          flex: 1,
          textAlign: "center",
        }}
      >
        {String(currentChapter).padStart(2, "0")} — {chapter?.title}
      </span>

      <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
        {currentChapter > 1 && (
          <Link
            to="/volume-1/read/$chapter"
            params={{ chapter: String(currentChapter - 1) }}
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "11px",
              color: "var(--color-muted-foreground)",
              textDecoration: "none",
              padding: "4px 6px",
            }}
            aria-label="Previous chapter"
          >
            <ArrowLeft size={12} aria-hidden />
          </Link>
        )}
        {currentChapter < CHAPTER_COUNT && (
          <Link
            to="/volume-1/read/$chapter"
            params={{ chapter: String(currentChapter + 1) }}
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "11px",
              color: "var(--color-muted-foreground)",
              textDecoration: "none",
              padding: "4px 6px",
            }}
            aria-label="Next chapter"
          >
            <ArrowRight size={12} aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Desktop sidebar — vertical chapter index
// ---------------------------------------------------------------------------

function DesktopChapterNav({ currentChapter }: { currentChapter: number }) {
  return (
    <nav aria-label="Chapter index">
      <Link
        to="/volume-1"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontFamily: "var(--font-label)",
          fontSize: "10px",
          color: "var(--color-muted-foreground)",
          textDecoration: "none",
          marginBottom: "28px",
          opacity: 0.7,
        }}
      >
        <ArrowLeft size={11} aria-hidden /> Volume 1
      </Link>

      <div
        style={{
          fontFamily: "var(--font-label)",
          fontSize: "8px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-muted-foreground)",
          opacity: 0.45,
          marginBottom: "14px",
        }}
      >
        Contents
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
        {volume1Chapters.map((ch) => {
          const isActive = ch.number === currentChapter;
          return (
            <li key={ch.number}>
              <Link
                to="/volume-1/read/$chapter"
                params={{ chapter: String(ch.number) }}
                style={{
                  display: "block",
                  padding: "7px 10px",
                  paddingLeft: isActive ? "12px" : "10px",
                  textDecoration: "none",
                  borderLeft: isActive
                    ? "2px solid var(--primary)"
                    : "2px solid transparent",
                  transition: "border-color 300ms, padding-left 300ms",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-label)",
                    fontSize: "9px",
                    color: "var(--color-muted-foreground)",
                    opacity: 0.55,
                    marginBottom: "2px",
                  }}
                >
                  {String(ch.number).padStart(2, "0")}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.88rem",
                    lineHeight: 1.3,
                    color: isActive ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {ch.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Chapter cover — full-screen opening moment
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
  const entryLines = ["Read slowly.", "Take your time.", "Enter when ready.", "Read slowly."];
  const entryPrompt = entryLines[(chapterNumber - 1) % entryLines.length];

  return (
    <div
      className="-mx-4 sm:-mx-6"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "80px 32px 80px",
        background: isQuietAnger
          ? "color-mix(in oklab, var(--paper-deep) 55%, var(--background))"
          : undefined,
        animation: "vol-fade-up 0.9s ease forwards",
      }}
    >
      {/* Ghost chapter number */}
      <span
        aria-hidden
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(6.5rem, 22vw, 15rem)",
          color: "transparent",
          WebkitTextStroke: "1px color-mix(in oklab, var(--foreground) 11%, transparent)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          userSelect: "none",
          display: "block",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        {String(chapterNumber).padStart(2, "0")}
      </span>

      {/* Chapter title */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          fontWeight: 400,
          color: "var(--color-foreground)",
          textAlign: "center",
          letterSpacing: "-0.01em",
          lineHeight: 1.05,
          marginBottom: "14px",
          animation: "vol-fade-up 0.9s ease 0.15s forwards",
          opacity: 0,
        }}
      >
        {chapter.title}
      </h1>

      {/* Chapter tagline */}
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.15rem",
          fontStyle: "italic",
          color: "var(--color-muted-foreground)",
          textAlign: "center",
          marginBottom: "64px",
          animation: "vol-fade-up 0.9s ease 0.28s forwards",
          opacity: 0,
        }}
      >
        {chapter.tagline}
      </p>

      {/* Chapter artifact */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "var(--color-muted-foreground)",
          animation: "vol-fade-up 0.9s ease 0.42s forwards",
          opacity: 0,
        }}
      >
        <ChapterArtifact chapter={chapter.title as ChapterTitle} isQuietAnger={isQuietAnger} />
      </div>

      {/* Quiet Anger exclusive note */}
      {isQuietAnger && (
        <p
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "10px",
            color: "var(--color-muted-foreground)",
            opacity: 0.5,
            marginTop: "32px",
            textAlign: "center",
            letterSpacing: "0.05em",
            animation: "vol-fade-up 0.9s ease 0.5s forwards",
          }}
        >
          Five exclusive notes — written only for Volume 1.
        </p>
      )}

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          animation: "vol-fade-up 0.9s ease 0.65s forwards",
          opacity: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "12px",
            fontStyle: "italic",
            color: "var(--color-muted-foreground)",
            opacity: 0.65,
            letterSpacing: "0.06em",
          }}
        >
          {entryPrompt}
        </span>
        <ChevronDown
          size={15}
          aria-hidden
          style={{
            color: "var(--color-muted-foreground)",
            opacity: 0.45,
            animation: "vol-bounce 2.2s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chapter intro letter — literary, no label, first paragraph slightly larger
// ---------------------------------------------------------------------------

function ChapterIntroLetter({ introLetter }: { introLetter: string }) {
  const paragraphs = introLetter.split("\n\n").filter(Boolean);

  return (
    <section style={{ maxWidth: "600px", marginTop: "8px" }}>
      {paragraphs.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: i === 0 ? "1.2rem" : "1.08rem",
            fontWeight: i === 0 ? 500 : 400,
            lineHeight: 1.9,
            color: `color-mix(in oklab, var(--foreground) ${i === 0 ? "95%" : "88%"}, transparent)`,
            marginBottom: i < paragraphs.length - 1 ? "22px" : 0,
            whiteSpace: "pre-line",
          }}
        >
          {para}
        </p>
      ))}

      {/* MAD seal after letter */}
      <div style={{ marginTop: "48px", display: "flex", alignItems: "center", gap: "14px" }}>
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "var(--primary)",
            opacity: 0.22,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "13px",
              fontStyle: "italic",
              color: "var(--color-foreground)",
              lineHeight: 1,
            }}
          >
            M
          </span>
        </span>
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "9px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-muted-foreground)",
            opacity: 0.45,
          }}
        >
          MAD
        </span>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Note article — reads like manuscript, receipt as premium object
// ---------------------------------------------------------------------------

function NoteArticle({
  note,
  index,
  isQuietAnger,
}: {
  note: Volume1Note;
  index: number;
  isQuietAnger: boolean;
}) {
  return (
    <article
      className="vol-note-card"
      style={{
        padding: "28px 28px 0",
        background: isQuietAnger
          ? "color-mix(in oklab, var(--paper-deep) 70%, var(--card))"
          : undefined,
      }}
    >
      {/* Note header */}
      <header style={{ marginBottom: "20px" }}>
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "var(--color-muted-foreground)",
            opacity: 0.55,
            display: "block",
            marginBottom: "6px",
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            color: "var(--color-foreground)",
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
            borderLeft: "2px solid var(--color-border)",
            paddingLeft: "14px",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "11px",
              lineHeight: 1.7,
              color: "var(--color-muted-foreground)",
              margin: 0,
            }}
          >
            This note touches on dark moments. If you are not safe right now, please move toward
            someone who can help.{" "}
            <Link to="/support" style={{ color: "inherit", opacity: 0.8 }}>
              Safety &amp; Support
            </Link>
          </p>
        </div>
      )}

      {/* Note body */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.08rem",
          lineHeight: 1.88,
          color: `color-mix(in oklab, var(--foreground) 90%, transparent)`,
          whiteSpace: "pre-line",
          marginBottom: "28px",
        }}
      >
        {note.body}
      </div>

      {/* Premium receipt */}
      <div style={{ margin: "0 -28px" }}>
        <PremiumReceipt
          from={note.from}
          to={note.to}
          date={note.date}
          total={note.total}
          isQuietAnger={isQuietAnger}
        />
      </div>

      {/* Quiet Anger exclusive label */}
      {isQuietAnger && (
        <div
          style={{
            padding: "10px 28px 14px",
            textAlign: "right",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "9px",
              fontStyle: "italic",
              color: "var(--color-muted-foreground)",
              opacity: 0.45,
              letterSpacing: "0.05em",
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
// Margin note — discovered, not announced
// ---------------------------------------------------------------------------

function MarginNoteEl({ text }: { text: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "0.78rem",
        fontStyle: "italic",
        lineHeight: 1.7,
        color: "color-mix(in oklab, var(--color-muted-foreground) 75%, var(--accent))",
        transform: "rotate(2deg)",
        transformOrigin: "top left",
        whiteSpace: "pre-line",
        margin: 0,
      }}
    >
      {text}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Private letter section
// ---------------------------------------------------------------------------

function PrivateLetterSection({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <section
      style={{
        marginTop: "96px",
        paddingTop: "48px",
        borderTop: "1px solid var(--color-border)",
        maxWidth: "600px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "40px",
        }}
      >
        <span
          aria-hidden
          style={{
            display: "inline-flex",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "var(--primary)",
            opacity: 0.2,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "11px",
              fontStyle: "italic",
              color: "var(--color-foreground)",
              lineHeight: 1,
            }}
          >
            M
          </span>
        </span>
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-muted-foreground)",
            opacity: 0.5,
          }}
        >
          A private letter
        </span>
      </div>

      {paragraphs.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            lineHeight: 1.9,
            color: `color-mix(in oklab, var(--foreground) ${i === 0 ? "92%" : "85%"}, transparent)`,
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
// Closing receipt — final destination after Chapter 5
// ---------------------------------------------------------------------------

function ClosingReceiptDestination() {
  const paragraphs = closingReceipt.closing.split("\n\n").filter(Boolean);

  return (
    <section
      style={{
        marginTop: "96px",
        paddingTop: "96px",
        borderTop: "1px solid var(--color-border)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1rem",
          fontStyle: "italic",
          color: "var(--color-muted-foreground)",
          opacity: 0.65,
          marginBottom: "48px",
          letterSpacing: "0.02em",
        }}
      >
        You made it through.
      </p>

      <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "left" }}>
        <PremiumReceipt
          from={closingReceipt.from}
          to={closingReceipt.to}
          date={closingReceipt.date}
          total={closingReceipt.total}
          keepText="This is yours."
          isClosing
        />
      </div>

      {/* Closing text + MAD sign-off */}
      <div style={{ marginTop: "56px", maxWidth: "480px", margin: "56px auto 0" }}>
        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.98rem",
              fontStyle: "italic",
              lineHeight: 1.85,
              color: "var(--color-muted-foreground)",
              opacity: 0.75,
              marginBottom: i < paragraphs.length - 1 ? "16px" : 0,
              whiteSpace: "pre-line",
            }}
          >
            {para}
          </p>
        ))}

        {/* MAD monogram */}
        <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "var(--primary)",
              opacity: 0.22,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontStyle: "italic",
                color: "var(--color-foreground)",
                lineHeight: 1,
              }}
            >
              M
            </span>
          </span>
        </div>
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
        marginTop: "80px",
        paddingTop: "40px",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {currentChapter > 1 ? (
        <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
          <Link
            to="/volume-1/read/$chapter"
            params={{ chapter: String(currentChapter - 1) }}
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Chapter {currentChapter - 1}
          </Link>
        </Button>
      ) : (
        <span />
      )}

      {currentChapter < CHAPTER_COUNT ? (
        <Button asChild variant="note" size="sm" className="min-h-9 text-sm">
          <Link
            to="/volume-1/read/$chapter"
            params={{ chapter: String(currentChapter + 1) }}
          >
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
