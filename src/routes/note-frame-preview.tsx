import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import { AppLayout } from "@/components/app-layout";
import { ReceiptBlock } from "@/components/receipt-block";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { featuredNote, getCategoryBySlug } from "@/lib/note-data";
import { buildShareText } from "@/lib/share";
import {
  getKeptNotes,
  keepNote,
  logSentNote,
  registerMeaningfulGuestAction,
} from "@/lib/note-storage";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/note-frame-preview")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Note Frame Preview — The Note You Needed Today" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NoteFramePreviewPage,
});

// ─── Constants ────────────────────────────────────────────────────────────────

const SAMPLE_NOTE = featuredNote;
const SAMPLE_CATEGORY = getCategoryBySlug(SAMPLE_NOTE.categorySlug)!;

// Brand colour tokens used in frame-specific styles
const C = {
  kraft: "oklch(0.86 0.036 72)",
  kraftDark: "oklch(0.78 0.044 68)",
  paper: "oklch(0.97 0.018 80)",
  ink: "oklch(0.28 0.03 55)",
  inkMuted: "oklch(0.52 0.04 55)",
  inkFaint: "oklch(0.65 0.03 58)",
  accent: "oklch(0.48 0.1 50)",
  accentBorder: "oklch(0.68 0.08 52 / 0.38)",
} as const;

type Variant = 1 | 2 | 3;

interface ActionResult {
  text: string;
  shelfLink?: boolean;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function NoteFramePreviewPage() {
  const [variant, setVariant] = useState<Variant>(1);
  const [isKept, setIsKept] = useState(false);
  const [actionResult, setActionResult] = useState<ActionResult | null>(null);

  useEffect(() => {
    setIsKept(getKeptNotes().some((n) => n.id === SAMPLE_NOTE.id));
  }, []);

  function handleKeep() {
    if (isKept) {
      setActionResult({ text: "Already kept in your Shelf.", shelfLink: true });
      return;
    }
    keepNote(SAMPLE_NOTE);
    setIsKept(true);
    registerMeaningfulGuestAction();
    trackEvent("note_kept", { note_id: SAMPLE_NOTE.id, source: "frame_preview" });
    setActionResult({ text: "Kept quietly in your Shelf.", shelfLink: true });
  }

  async function handleSend() {
    const text = buildShareText(SAMPLE_NOTE.sendableText);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        logSentNote(SAMPLE_NOTE);
        registerMeaningfulGuestAction();
        trackEvent("note_sent", { note_id: SAMPLE_NOTE.id, method: "share", source: "frame_preview" });
        setActionResult({ text: "Sent quietly." });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
      logSentNote(SAMPLE_NOTE);
      registerMeaningfulGuestAction();
      trackEvent("note_sent", { note_id: SAMPLE_NOTE.id, method: "clipboard", source: "frame_preview" });
      setActionResult({ text: "Copied to clipboard. Send it when you're ready." });
    }
  }

  const labels: Record<Variant, string> = {
    1: "Variant 1 — Classic Envelope",
    2: "Variant 2 — Clean Digital Frame",
    3: "Variant 3 — Editorial Premium",
  };

  return (
    <AppLayout className="space-y-6 pb-12">
      {/* Header */}
      <section className="space-y-2">
        <div className="stitched-label">Design preview · not live</div>
        <h1 className="font-display text-4xl leading-none">Note Frame Preview</h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Three variants for review. Current note pages are unchanged.
        </p>
      </section>

      {/* Variant tabs */}
      <div className="flex gap-2">
        {([1, 2, 3] as Variant[]).map((v) => (
          <button
            key={v}
            onClick={() => {
              setVariant(v);
              setActionResult(null);
            }}
            style={{ fontFamily: "var(--font-label)", letterSpacing: "0.1em" }}
            className={[
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              variant === v
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-muted-foreground hover:border-foreground/40",
            ].join(" ")}
          >
            V{v}
          </button>
        ))}
      </div>

      <p
        className="text-xs text-muted-foreground"
        style={{
          fontFamily: "var(--font-label)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginTop: 0,
        }}
      >
        {labels[variant]}
      </p>

      {/* Active variant */}
      {variant === 1 && <NoteFrameV1 isKept={isKept} />}
      {variant === 2 && <NoteFrameV2 isKept={isKept} />}
      {variant === 3 && <NoteFrameV3 isKept={isKept} />}

      {/* Action result message */}
      {actionResult && (
        <div className="paper-panel space-y-2 text-sm text-muted-foreground">
          <p>{actionResult.text}</p>
          {actionResult.shelfLink && (
            <Button asChild variant="paper" size="sm">
              <Link to="/shelf">View in Shelf</Link>
            </Button>
          )}
        </div>
      )}

      {/* Action buttons — shared across all variants */}
      <FrameActions isKept={isKept} onKeep={handleKeep} onSend={handleSend} />

      {/* Preview footer notice */}
      <div
        className="rounded-2xl border border-dashed p-4 text-center text-xs text-muted-foreground"
        style={{
          borderColor: "oklch(0.75 0.03 60 / 0.5)",
          fontFamily: "var(--font-label)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Design preview · not in main navigation
      </div>
    </AppLayout>
  );
}

// ─── Variant 1: Classic Envelope ──────────────────────────────────────────────
// The envelope is the dominant visual. Kraft paper flap with V-fold crease,
// heart + brand title centred in the flap, full note text in the paper body,
// receipt + MAD badge at the bottom.

function NoteFrameV1({ isKept: _ }: { isKept: boolean }) {
  return (
    <article className="note-surface overflow-hidden">

      {/* ── Envelope Flap ── */}
      <div style={{ background: C.kraft, paddingTop: "2rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        {/* Flap content: heart + brand title + category tag */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", paddingBottom: "1.5rem" }}>
          <HeartSVG style={{ width: 38, height: 38, color: C.accent }} />
          <div
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.ink,
              textAlign: "center",
            }}
          >
            The Note You Needed Today
          </div>
          <div
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.56rem",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: C.inkMuted,
              border: `1px dashed ${C.accentBorder}`,
              borderRadius: "999px",
              padding: "0.25rem 0.75rem",
            }}
          >
            {SAMPLE_CATEGORY.title}
          </div>
        </div>

        {/* V-fold crease: upward triangle of paper colour "shows through" the kraft flap */}
        <svg
          viewBox="0 0 200 30"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 30 }}
          aria-hidden="true"
        >
          <polygon points="0,30 100,0 200,30" fill={C.paper} />
          <polyline
            points="0,30 100,0 200,30"
            fill="none"
            stroke={C.inkFaint}
            strokeWidth="0.9"
            opacity="0.55"
          />
        </svg>
      </div>

      {/* ── Note Paper Body ── */}
      <div style={{ background: C.paper, padding: "1.5rem 1.5rem 0" }}>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            lineHeight: 1.07,
            color: C.ink,
            marginBottom: "1.25rem",
          }}
        >
          {SAMPLE_NOTE.title}
        </h2>
        <p className="note-copy" style={{ color: C.ink, whiteSpace: "pre-line" }}>
          {SAMPLE_NOTE.mainText}
        </p>
      </div>

      {/* ── Receipt + MAD Badge ── */}
      <div style={{ background: C.paper, padding: "0.25rem 1rem 1.25rem", position: "relative" }}>
        <ReceiptBlock
          from={SAMPLE_NOTE.receiptFrom}
          to={SAMPLE_NOTE.receiptTo}
          date={SAMPLE_NOTE.receiptDate}
          total={SAMPLE_NOTE.receiptTotal}
        />
        <div style={{ position: "absolute", bottom: "0.875rem", right: "0.875rem" }}>
          <MadPatch />
        </div>
      </div>

    </article>
  );
}

// ─── Variant 2: Clean Digital Frame ───────────────────────────────────────────
// The envelope is referenced, not literal. A slim kraft brow with a subtle
// V-hint anchors the identity. The note body has more air and slightly
// smaller text — optimised for readability on mobile at any note length.
// The receipt is clean and tabular. MAD appears as a minimal monogram.

function NoteFrameV2({ isKept: _ }: { isKept: boolean }) {
  return (
    <article className="note-surface overflow-hidden">

      {/* ── Slim envelope brow ── */}
      <div
        style={{
          background: C.kraft,
          padding: "0.875rem 1.5rem 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.ink,
          }}
        >
          The Note You Needed Today
        </div>
        <HeartSVG style={{ width: 18, height: 18, color: C.accent, flexShrink: 0 }} />
      </div>

      {/* Thinner V-hint */}
      <svg
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 14, background: C.kraft }}
        aria-hidden="true"
      >
        <polygon points="0,14 100,0 200,14" fill={C.paper} />
        <polyline
          points="0,14 100,0 200,14"
          fill="none"
          stroke={C.inkFaint}
          strokeWidth="0.6"
          opacity="0.4"
        />
      </svg>

      {/* ── Note body: generous padding, cleaner hierarchy ── */}
      <div style={{ padding: "1.75rem 1.75rem 0" }}>
        <p className="eyebrow-copy" style={{ marginBottom: "0.5rem" }}>
          {SAMPLE_CATEGORY.title}
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.6rem, 4.5vw, 2.2rem)",
            lineHeight: 1.1,
            color: C.ink,
            marginBottom: "1.5rem",
          }}
        >
          {SAMPLE_NOTE.title}
        </h2>
        {/* Slightly reduced font size improves readability on long notes */}
        <p
          style={{
            fontFamily: "var(--font-note)",
            fontSize: "clamp(1.45rem, 3.8vw, 2rem)",
            lineHeight: 1.08,
            color: C.ink,
            whiteSpace: "pre-line",
          }}
        >
          {SAMPLE_NOTE.mainText}
        </p>
      </div>

      {/* ── Receipt ── */}
      <div style={{ padding: "0.25rem 1.25rem 0.5rem" }}>
        <ReceiptBlock
          from={SAMPLE_NOTE.receiptFrom}
          to={SAMPLE_NOTE.receiptTo}
          date={SAMPLE_NOTE.receiptDate}
          total={SAMPLE_NOTE.receiptTotal}
        />
        <div
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "0.55rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.inkFaint,
            textAlign: "right",
            padding: "0.5rem 0 0.75rem",
          }}
        >
          MAD ©
        </div>
      </div>

    </article>
  );
}

// ─── Variant 3: Editorial Premium ─────────────────────────────────────────────
// A layered composition: a kraft backing card at a slight angle sits beneath
// the main note card. A decorative label tape runs across the top. A wax seal
// sits in the bottom-right corner. The receipt appears as a receipt tape with
// a perforated top edge. Most expressive of the brand's collage identity.

function NoteFrameV3({ isKept: _ }: { isKept: boolean }) {
  return (
    <div className="relative" style={{ paddingBottom: "0.5rem" }}>

      {/* ── Backing layer ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: C.kraft,
          borderRadius: "28px 28px 20px 20px",
          transform: "rotate(-1.5deg) translateY(5px)",
          transformOrigin: "center top",
          boxShadow: "0 4px 20px oklch(0.28 0.03 55 / 0.13)",
          zIndex: 0,
        }}
      />

      {/* ── Main note card ── */}
      <article className="note-surface relative overflow-hidden" style={{ zIndex: 1 }}>

        {/* Floral accent — top-left corner */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", top: "1.25rem", left: "1.25rem", opacity: 0.28 }}
        >
          <FloralMark style={{ width: 22, height: 22, color: C.accent }} />
        </div>

        {/* ── Label tape across top ── */}
        <div
          style={{
            background: C.kraft,
            padding: "0.6rem 1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.625rem",
            borderBottom: `1px dashed ${C.accentBorder}`,
          }}
        >
          <HeartSVG style={{ width: 14, height: 14, color: C.accent }} />
          <span
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: C.ink,
            }}
          >
            The Note You Needed Today
          </span>
          <HeartSVG style={{ width: 14, height: 14, color: C.accent }} />
        </div>

        {/* ── Note content ── */}
        <div style={{ padding: "2rem 1.75rem 0" }}>
          <div className="stitched-label" style={{ marginBottom: "0.875rem", display: "inline-block" }}>
            {SAMPLE_CATEGORY.title}
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.4rem)",
              lineHeight: 1.07,
              color: C.ink,
              marginBottom: "1.5rem",
            }}
          >
            {SAMPLE_NOTE.title}
          </h2>
          <p className="note-copy" style={{ color: C.ink, whiteSpace: "pre-line" }}>
            {SAMPLE_NOTE.mainText}
          </p>
        </div>

        {/* ── Receipt tape ── */}
        <div style={{ margin: "1.75rem 1rem 0" }}>
          {/* Perforated top edge — suggests a receipt being torn off */}
          <div
            aria-hidden="true"
            style={{
              height: 8,
              borderRadius: "4px 4px 0 0",
              background: `repeating-linear-gradient(90deg, ${C.kraftDark} 0px, ${C.kraftDark} 6px, transparent 6px, transparent 12px)`,
              opacity: 0.6,
            }}
          />
          <ReceiptBlock
          from={SAMPLE_NOTE.receiptFrom}
          to={SAMPLE_NOTE.receiptTo}
          date={SAMPLE_NOTE.receiptDate}
          total={SAMPLE_NOTE.receiptTotal}
        />
        </div>

        {/* ── Wax seal (MAD) ── */}
        <div
          style={{
            padding: "0.75rem 1rem 1.5rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <WaxSeal />
        </div>

      </article>
    </div>
  );
}

// ─── Shared action buttons ────────────────────────────────────────────────────

function FrameActions({
  isKept,
  onKeep,
  onSend,
}: {
  isKept: boolean;
  onKeep: () => void;
  onSend: () => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
      <Button variant="note" onClick={onKeep} className="w-full sm:flex-1">
        {isKept ? "Kept in Shelf" : "Keep this Note"}
      </Button>
      <Button variant="paper" onClick={onSend} className="w-full sm:flex-1">
        Send this Quietly
      </Button>
      <Button variant="paper" asChild className="w-full sm:flex-1">
        <Link
          to="/write/$categorySlug"
          params={{ categorySlug: SAMPLE_NOTE.categorySlug }}
        >
          Write from This
        </Link>
      </Button>
    </div>
  );
}

// ─── SVG / decorative sub-components ─────────────────────────────────────────

function HeartSVG({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={style}
      className={className}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function FloralMark({
  style,
  className,
}: {
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      style={style}
      className={className}
      aria-hidden="true"
    >
      {/* Eight-pointed asterisk / floral mark */}
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  );
}

function MadPatch({ size = 52 }: { size?: number }) {
  return (
    <div
      aria-label="MAD"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1.5px dashed ${C.inkFaint}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        background: C.paper,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-label)",
          fontSize: "0.55rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: C.inkMuted,
          lineHeight: 1,
        }}
      >
        MAD
      </span>
      <span
        style={{
          fontFamily: "var(--font-label)",
          fontSize: "0.42rem",
          letterSpacing: "0.1em",
          color: C.inkFaint,
          lineHeight: 1,
        }}
      >
        ©2025
      </span>
    </div>
  );
}

function WaxSeal() {
  return (
    <div
      aria-label="MAD signature"
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 36% 36%, oklch(0.58 0.1 50), oklch(0.40 0.1 48))",
        boxShadow:
          "inset 0 2px 5px oklch(0 0 0 / 0.22), 0 1px 5px oklch(0 0 0 / 0.13)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-label)",
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "oklch(0.97 0.018 80)",
          lineHeight: 1,
        }}
      >
        MAD
      </span>
      <HeartSVG
        style={{ width: 9, height: 9, color: "oklch(0.97 0.018 80 / 0.7)" }}
      />
    </div>
  );
}
