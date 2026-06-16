import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import type { SavedShelfNote } from "@/lib/note-storage";

interface ShelfItemProps {
  item: SavedShelfNote;
}

export function ShelfItem({ item }: ShelfItemProps) {
  return (
    <article className="paper-panel space-y-4">
      <div className="space-y-2">
        <p className="eyebrow-copy">{item.title}</p>
        <p className="font-note text-2xl leading-tight text-foreground">{item.firstLine}</p>
        <p className="text-sm text-muted-foreground">
          Saved {new Date(item.savedAt).toLocaleDateString()}
        </p>
      </div>
      <Button asChild variant="paper">
        <Link to="/note/$categorySlug" params={{ categorySlug: item.categorySlug }}>
          Open note
        </Link>
      </Button>
    </article>
  );
}
