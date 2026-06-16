import { Heart } from "lucide-react";
import type { ReactNode } from "react";

import { ReceiptBlock } from "@/components/receipt-block";
import type { NoteEntry } from "@/lib/note-data";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  note: NoteEntry;
  categoryLabel?: string;
  eyebrow?: string;
  actions?: ReactNode;
  className?: string;
  compact?: boolean;
  showReceipt?: boolean;
}

export function NoteCard({
  note,
  categoryLabel,
  eyebrow = "The Note You Needed Today",
  actions,
  className,
  compact = false,
  showReceipt = true,
}: NoteCardProps) {
  return (
    <article className={cn("space-y-4", className)}>
      <div className="note-surface">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="stitched-label">{eyebrow}</div>
            <Heart className="text-accent-foreground/80" aria-hidden="true" />
          </div>

          {categoryLabel ? <p className="eyebrow-copy">{categoryLabel}</p> : null}

          <div className={cn("note-copy", compact && "text-[1.65rem] leading-[1.1]")}>{note.mainText}</div>
        </div>
      </div>

      {showReceipt ? (
        <ReceiptBlock
          from={note.receiptFrom}
          to={note.receiptTo}
          date={note.receiptDate}
          total={note.receiptTotal}
        />
      ) : null}

      {actions ? <div className="grid gap-3">{actions}</div> : null}
    </article>
  );
}
