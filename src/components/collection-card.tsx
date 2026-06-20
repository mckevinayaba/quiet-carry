import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import type { CollectionEntry } from "@/lib/note-data";

interface CollectionCardProps {
  collection: CollectionEntry;
  onWaitlistClick?: () => void;
}

export function CollectionCard({ collection, onWaitlistClick }: CollectionCardProps) {
  const hasWaitlistCta = collection.comingSoon && collection.ctaLabel;

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
              <span className="heart-mark" aria-hidden="true">♥</span>
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        {collection.comingSoon ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground">
            <Clock3 className="size-4" aria-hidden="true" />
            Coming soon
          </span>
        ) : null}
        {collection.price ? (
          <p className="font-label text-lg text-foreground">{collection.price}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        {hasWaitlistCta ? (
          collection.ctaHref ? (
            <Button asChild variant="note" className="min-h-12">
              <a href={collection.ctaHref}>
                {collection.ctaLabel}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          ) : (
            <Button variant="note" className="min-h-12" onClick={onWaitlistClick}>
              {collection.ctaLabel}
              <ArrowRight aria-hidden="true" />
            </Button>
          )
        ) : null}
        {collection.detailHref ? (
          <Button asChild variant="paper" className="min-h-12">
            <Link to={collection.detailHref as never}>
              Explore Volume 1
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        ) : null}
      </div>
    </article>
  );
}
