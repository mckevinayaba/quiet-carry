import type { CSSProperties, ReactNode } from "react";

import { ReceiptBlock } from "@/components/receipt-block";
import type { NoteEntry } from "@/lib/note-data";
import { cn } from "@/lib/utils";

// V2 frame colour tokens (envelope brow)
const KRAFT = "oklch(0.86 0.036 72)";
const PAPER = "oklch(0.97 0.018 80)";
const INK = "oklch(0.28 0.03 55)";
const INK_FAINT = "oklch(0.65 0.03 58)";
const ACCENT = "oklch(0.48 0.1 50)";

interface NoteCardProps {
  note: NoteEntry;
  categoryLabel?: string;
  eyebrow?: string; // kept for API compat, now rendered in the brow
  actions?: ReactNode;
  className?: string;
  compact?: boolean; // kept for API compat
  showReceipt?: boolean;
}

export function NoteCard({
  note,
  categoryLabel,
  actions,
  className,
  showReceipt = true,
}: NoteCardProps) {
  return (
    <article className={cn("space-y-4", className)}>
      <div className="note-surface overflow-hidden">

        {/* ── Slim envelope brow ── */}
        <div
          style={{
            background: KRAFT,
            padding: "0.875rem 1.5rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: INK,
            }}
          >
            The Note You Needed Today
          </span>
          <HeartSVG style={{ width: 18, height: 18, color: ACCENT, flexShrink: 0 }} />
        </div>

        {/* V-fold crease hint */}
        <svg
          viewBox="0 0 200 14"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 14, background: KRAFT }}
          aria-hidden="true"
        >
          <polygon points="0,14 100,0 200,14" fill={PAPER} />
          <polyline
            points="0,14 100,0 200,14"
            fill="none"
            stroke={INK_FAINT}
            strokeWidth="0.6"
            opacity="0.4"
          />
        </svg>

        {/* ── Note body ── */}
        <div style={{ padding: "1.75rem 1.75rem 0" }}>
          {categoryLabel ? (
            <p className="eyebrow-copy" style={{ marginBottom: "0.5rem" }}>
              {categoryLabel}
            </p>
          ) : null}
          <p
            style={{
              fontFamily: "var(--font-note)",
              fontSize: "clamp(1.45rem, 3.8vw, 2rem)",
              lineHeight: 1.08,
              color: INK,
              whiteSpace: "pre-line",
            }}
          >
            {note.mainText}
          </p>
        </div>

        {/* ── Receipt inside the frame ── */}
        {showReceipt ? (
          <div style={{ padding: "0.25rem 1.25rem 0.5rem" }}>
            <ReceiptBlock
              from={note.receiptFrom}
              to={note.receiptTo}
              date={note.receiptDate}
              total={note.receiptTotal}
            />
            <div
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.55rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: INK_FAINT,
                textAlign: "right",
                padding: "0.5rem 0 0.75rem",
              }}
            >
              MAD ©
            </div>
          </div>
        ) : null}

      </div>

      {actions ? <div className="grid gap-3">{actions}</div> : null}
    </article>
  );
}

function HeartSVG({ style }: { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={style} aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
