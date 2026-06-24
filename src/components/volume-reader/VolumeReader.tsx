import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  closingReceipt,
  getMarginNote,
  openingLetter,
  safetyAndCareNote,
  CHAPTER_COUNT,
} from "@/data/volume1";
import type { Volume1Chapter, Volume1Note } from "@/data/volume1";

interface VolumeReaderProps {
  chapter: Volume1Chapter;
  chapterNumber: number;
}

// ---------------------------------------------------------------------------
// Envelope-letter design tokens — scoped to this reading surface only.
// ---------------------------------------------------------------------------

const T = {
  outerBg: "#1C1208",
  kraft: "#C4903A",
  kraftBorder: "#8B6914",
  receiptBg: "#D4A84B",
  letterBg: "#FAF6EE",
  parchment: "#F5F0E8",
  ink: "#1a1208",
  muted: "#8B6914",
  redHeart: "#CC2200",
};

const courier = "'Courier New', Courier, monospace";

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
    <div style={{ background: T.outerBg, minHeight: "100vh" }}>
      <TopBar chapterTitle={chapter.title} currentChapter={chapterNumber} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 16px",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <ChapterIntroCard
            chapter={chapter}
            chapterNumber={chapterNumber}
            isQuietAnger={isQuietAnger}
          />

          {isFirstChapter && <PlainLetterCard text={openingLetter} />}

          <PlainLetterCard text={chapter.introLetter} firstParagraphEmphasis />

          {chapter.notes.map((note, idx) => {
            const marginNote = getMarginNote(note.id);
            return (
              <NoteEnvelope
                key={note.id}
                note={note}
                index={idx + 1}
                isQuietAnger={isQuietAnger}
                marginText={marginNote?.text}
              />
            );
          })}

          <PlainLetterCard text={chapter.privateLetter} dearReader />

          <ReceiptDivider chapterNumber={chapterNumber} />

          {isLastChapter && <PlainLetterCard text={safetyAndCareNote} />}
          {isLastChapter && <ClosingEnvelope />}

          <ChapterPrevNext currentChapter={chapterNumber} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Minimal top bar — unchanged behavior, only the back link + chapter label
// ---------------------------------------------------------------------------

function TopBar({ chapterTitle }: { chapterTitle: string; currentChapter: number }) {
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
        background: "color-mix(in oklab, #FAF6F1 92%, transparent)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid #E8DDD4",
      }}
    >
      <Link
        to="/volume-1"
        style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "13px",
          color: "#9C8478",
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
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "12px",
          fontVariant: "small-caps",
          letterSpacing: "0.08em",
          color: "#9C8478",
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
// Chapter intro — parchment block with an outlined chapter number
// ---------------------------------------------------------------------------

function ChapterIntroCard({
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
        background: T.parchment,
        borderRadius: "8px",
        padding: "56px 24px",
        textAlign: "center",
      }}
    >
      <span
        aria-hidden
        style={{
          display: "block",
          fontFamily: courier,
          fontWeight: 100,
          fontSize: "clamp(48px, 12vw, 80px)",
          color: T.kraft,
          lineHeight: 1,
          marginBottom: "8px",
        }}
      >
        {String(chapterNumber).padStart(2, "0")}
      </span>

      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "32px",
          fontWeight: 400,
          color: T.ink,
          margin: "0 0 8px 0",
        }}
      >
        {chapter.title}
      </h1>

      <p
        style={{
          fontFamily: courier,
          fontStyle: "italic",
          fontSize: "14px",
          color: T.muted,
          margin: 0,
        }}
      >
        {chapter.tagline}
      </p>

      {isQuietAnger && (
        <p
          style={{
            fontFamily: courier,
            fontStyle: "italic",
            fontSize: "12px",
            color: T.muted,
            opacity: 0.8,
            marginTop: "20px",
          }}
        >
          Five exclusive notes — written only for Volume 1.
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Plain letter card — opening letter, chapter prose, "Dear reader," letter,
// and the safety & care note. Same parchment paper, lighter weight than the
// note envelopes since these run longer.
// ---------------------------------------------------------------------------

function PlainLetterCard({
  text,
  dearReader,
  firstParagraphEmphasis,
}: {
  text: string;
  dearReader?: boolean;
  firstParagraphEmphasis?: boolean;
}) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <div
      style={{
        background: T.letterBg,
        borderRadius: "4px",
        padding: "32px 28px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {dearReader && (
        <p
          style={{
            fontFamily: courier,
            fontStyle: "italic",
            fontSize: "15px",
            color: T.muted,
            marginTop: 0,
            marginBottom: "20px",
          }}
        >
          Dear reader,
        </p>
      )}

      {paragraphs.map((para, i) => (
        <p
          key={i}
          style={{
            fontFamily: courier,
            fontSize: firstParagraphEmphasis && i === 0 ? "17px" : "15px",
            fontWeight: firstParagraphEmphasis && i === 0 ? 700 : 400,
            lineHeight: 1.7,
            color: T.ink,
            whiteSpace: "pre-line",
            marginTop: 0,
            marginBottom: i < paragraphs.length - 1 ? "18px" : 0,
          }}
        >
          {para}
        </p>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Note envelope — kraft shell, parchment letter, dashed kraft receipt
// ---------------------------------------------------------------------------

function NoteEnvelope({
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
  const paragraphs = note.body.split("\n\n").filter(Boolean);

  return (
    <div
      style={{
        background: T.kraft,
        borderRadius: "8px",
        border: `4px solid ${T.kraftBorder}`,
        outline: `2px dashed ${T.kraftBorder}`,
        outlineOffset: "-10px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      {/* Letter card */}
      <div
        style={{
          background: T.letterBg,
          margin: "0 20px",
          padding: "32px 28px 56px",
          borderRadius: "4px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          position: "relative",
          zIndex: 2,
          top: "20px",
        }}
      >
        <p
          style={{
            fontFamily: courier,
            fontSize: "12px",
            letterSpacing: "0.2em",
            textAlign: "center",
            color: T.ink,
            marginTop: 0,
            marginBottom: "24px",
          }}
        >
          ♡ THE NOTE YOU NEEDED TODAY ♡
        </p>

        <NoteTitleTag text={note.title} index={index} />

        {paragraphs.map((para, i) => {
          const isHope = /^i hope/i.test(para.trim());
          return (
            <p
              key={i}
              style={{
                fontFamily: courier,
                fontSize: "20px",
                fontWeight: 700,
                fontStyle: isHope ? "italic" : "normal",
                color: T.ink,
                lineHeight: 1.7,
                whiteSpace: "pre-line",
                marginTop: 0,
                marginBottom: "20px",
              }}
            >
              {para}
            </p>
          );
        })}

        {note.safetyNote && (
          <p
            style={{
              fontFamily: courier,
              fontSize: "13px",
              lineHeight: 1.6,
              color: T.muted,
              borderLeft: `2px solid ${T.kraftBorder}`,
              paddingLeft: "12px",
              marginBottom: "20px",
            }}
          >
            This note touches on dark moments. If you are not safe right now, please move toward
            someone who can help.{" "}
            <Link to="/support" style={{ color: "inherit", textDecoration: "underline" }}>
              Safety &amp; Support
            </Link>
          </p>
        )}

        {marginText && (
          <p
            style={{
              fontFamily: courier,
              fontStyle: "italic",
              fontSize: "13px",
              color: T.muted,
              whiteSpace: "pre-line",
              marginBottom: 0,
            }}
          >
            {marginText}
          </p>
        )}

        {isQuietAnger && (
          <p
            style={{
              fontFamily: courier,
              fontStyle: "italic",
              fontSize: "11px",
              color: T.muted,
              textAlign: "right",
              marginTop: "12px",
              marginBottom: 0,
            }}
          >
            Exclusive to Volume 1
          </p>
        )}

        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: "14px",
            right: "20px",
            fontSize: "22px",
            color: T.ink,
          }}
        >
          ♡
        </span>
      </div>

      {/* Receipt */}
      <ReceiptSection from={note.from} to={note.to} date={note.date} total={note.total} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Title tag — small denim-style label, echoes the postcard "DO IT ANYWAY" tag
// ---------------------------------------------------------------------------

function NoteTitleTag({ text, index }: { text: string; index: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "#1a2a50",
        padding: "8px 14px",
        borderRadius: "3px",
        marginBottom: "24px",
        position: "relative",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.35)",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: "3px",
          border: "1px dashed rgba(200,190,170,0.4)",
          borderRadius: "2px",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          fontFamily: courier,
          fontSize: "11px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#e8ddd0",
          position: "relative",
        }}
      >
        {String(index).padStart(2, "0")} · {text}
      </span>
      <span aria-hidden style={{ color: T.redHeart, fontSize: "12px", position: "relative" }}>
        ♥
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Receipt section — FROM / TO / DATE / TOTAL rows + MAD signature
// ---------------------------------------------------------------------------

function ReceiptSection({
  from,
  to,
  date,
  total,
}: {
  from: string;
  to: string;
  date: string;
  total: string;
}) {
  const rows: [string, string][] = [
    ["FROM", from],
    ["TO", to],
    ["DATE", date],
    ["TOTAL", total],
  ];

  return (
    <div
      style={{
        background: T.receiptBg,
        padding: "24px 28px 76px",
        borderTop: `3px dashed ${T.kraftBorder}`,
        position: "relative",
      }}
    >
      {rows.map(([label, value], i) => (
        <div
          key={label}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "baseline",
            paddingBottom: "10px",
            marginBottom: "10px",
            borderBottom: i < rows.length - 1 ? `1px dashed ${T.kraftBorder}` : undefined,
          }}
        >
          <span
            style={{
              fontFamily: courier,
              fontSize: "15px",
              fontWeight: 900,
              color: T.ink,
              minWidth: "56px",
              flexShrink: 0,
            }}
          >
            {label}:
          </span>
          <span style={{ fontFamily: courier, fontSize: "13px", lineHeight: 1.5, color: T.ink }}>
            {value}
          </span>
        </div>
      ))}

      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: "44px",
          right: "26px",
          fontSize: "24px",
          color: T.redHeart,
        }}
      >
        ♥
      </span>

      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: "4px",
          right: "20px",
          fontFamily: "'Arial Black', Impact, sans-serif",
          fontSize: "40px",
          fontWeight: 900,
          color: T.ink,
          transform: "rotate(-3deg)",
        }}
      >
        MAD
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Receipt divider — between chapters
// ---------------------------------------------------------------------------

function ReceiptDivider({ chapterNumber }: { chapterNumber: number }) {
  return (
    <div
      style={{
        padding: "20px 0",
        borderTop: "1px dotted #6B5230",
        borderBottom: "1px dotted #6B5230",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: courier,
          fontSize: "12px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#C4A882",
          margin: 0,
        }}
      >
        — Chapter {chapterNumber} of {CHAPTER_COUNT} —
      </p>
      <p
        style={{
          fontFamily: courier,
          fontSize: "12px",
          color: "#C4A882",
          margin: "4px 0 0",
        }}
      >
        Received. Kept.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Closing envelope — final destination after Chapter 5
// ---------------------------------------------------------------------------

function ClosingEnvelope() {
  const paragraphs = closingReceipt.closing.split("\n\n").filter(Boolean);

  return (
    <div
      id="closing-receipt"
      style={{
        background: T.kraft,
        borderRadius: "8px",
        border: `4px solid ${T.kraftBorder}`,
        outline: `2px dashed ${T.kraftBorder}`,
        outlineOffset: "-10px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          background: T.letterBg,
          margin: "0 20px",
          padding: "32px 28px 56px",
          borderRadius: "4px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          position: "relative",
          top: "20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: courier,
            fontSize: "12px",
            letterSpacing: "0.2em",
            color: T.ink,
            marginTop: 0,
            marginBottom: "24px",
          }}
        >
          ♡ THE NOTE YOU NEEDED TODAY ♡
        </p>

        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: courier,
              fontSize: "17px",
              fontWeight: 700,
              fontStyle: /^with love/i.test(para.trim()) ? "italic" : "normal",
              color: T.ink,
              lineHeight: 1.7,
              whiteSpace: "pre-line",
              marginTop: 0,
              marginBottom: i < paragraphs.length - 1 ? "20px" : 0,
            }}
          >
            {para}
          </p>
        ))}

        <p style={{ marginTop: "20px", marginBottom: 0 }}>
          <Link
            to="/support"
            style={{
              fontFamily: courier,
              fontSize: "13px",
              fontStyle: "italic",
              color: T.muted,
              textDecoration: "underline",
            }}
          >
            If you need someone to speak to, visit our Safety &amp; Support page.
          </Link>
        </p>

        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: "14px",
            right: "20px",
            fontSize: "22px",
            color: T.ink,
          }}
        >
          ♡
        </span>
      </div>

      <ReceiptSection
        from={closingReceipt.from}
        to={closingReceipt.to}
        date={closingReceipt.date}
        total={closingReceipt.total}
      />
    </div>
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
        padding: "20px 4px 0",
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
