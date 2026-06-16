import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import type { EmotionalCategory } from "@/lib/note-data";

interface CategoryCardProps {
  category: EmotionalCategory;
  onSelect?: () => void;
}

export function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <Link
      to="/note/$categorySlug"
      params={{ categorySlug: category.slug }}
      onClick={onSelect}
      className="paper-panel block space-y-3 transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <h2 className="text-balance font-display text-3xl leading-none text-foreground">
            {category.title}
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">{category.subtitle}</p>
        </div>
        <div className="icon-seal shrink-0">
          <ArrowRight aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
