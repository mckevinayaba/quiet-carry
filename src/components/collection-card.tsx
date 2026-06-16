import { ArrowUpRight, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { CollectionEntry } from "@/lib/note-data";

interface CollectionCardProps {
  collection: CollectionEntry;
  onClick?: () => void;
}

export function CollectionCard({ collection, onClick }: CollectionCardProps) {
  return (
    <article className="paper-panel space-y-4">
      <div className="space-y-3">
        <div className="stitched-label inline-flex">Collection</div>
        <div className="space-y-2">
          <h2 className="text-balance font-display text-4xl leading-none text-foreground">
            {collection.title}
          </h2>
          <p className="font-label text-xl text-muted-foreground">{collection.subtitle}</p>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">{collection.description}</p>
      </div>

      {collection.contents?.length ? (
        <ul className="grid gap-2 text-sm text-foreground">
          {collection.contents.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="heart-mark" aria-hidden="true">
                ♥
              </span>
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {collection.price ? (
        <p className="font-label text-lg text-foreground">{collection.price}</p>
      ) : null}

      {collection.comingSoon ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground">
          <Clock3 className="size-4" aria-hidden="true" />
          Coming soon
        </div>
      ) : (
        <Button asChild variant="note" className="min-h-12" onClick={onClick}>
          <a href={collection.ctaHref} rel="noreferrer" target="_blank">
            {collection.ctaLabel}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      )}
    </article>
  );
}
