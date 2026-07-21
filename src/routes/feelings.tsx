import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { CategoryCard } from "@/components/category-card";
import { RouteErrorBoundary } from "@/components/route-error";
import { ShareNote } from "@/components/share-note";
import { trackEvent } from "@/lib/analytics";
import { categories } from "@/lib/note-data";

export const Route = createFileRoute("/feelings")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "What are you carrying today? | The Note You Needed Today" },
      { name: "description", content: "Choose the closest feeling. You do not have to explain it yet." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "The Note You Needed Today" },
      { property: "og:title", content: "What are you carrying today? | The Note You Needed Today" },
      { property: "og:description", content: "Choose the closest feeling. You do not have to explain it yet." },
      { property: "og:image", content: "https://thenoteyouneeded.today/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "What are you carrying today? | The Note You Needed Today" },
      { name: "twitter:description", content: "Choose the closest feeling. You do not have to explain it yet." },
      { name: "twitter:image", content: "https://thenoteyouneeded.today/og-image.png" },
    ],
  }),
  component: FeelingsPage,
});

const GROUPS: { label: string; slugs: string[] }[] = [
  {
    label: "What you carry inside",
    slugs: [
      "im-fine-but-not-really",
      "the-pain-i-made-look-easy",
      "shame-got-there-first",
      "the-body-remembers",
      "body-is-tired",
      "loneliness-no-one-sees",
    ],
  },
  {
    label: "What life put on you",
    slugs: [
      "money-that-never-stretched",
      "job-that-ended",
      "dream-that-delayed",
    ],
  },
  {
    label: "What relationships did",
    slugs: [
      "the-words-that-stayed",
      "family-that-hurt",
      "marriage-that-became-a-memory",
      "love-that-left",
      "the-apology-that-never-came",
      "people-who-watched-you-bleed",
      "people-who-wanted-your-fall",
    ],
  },
  {
    label: "What loss left behind",
    slugs: [
      "grief-that-lives-in-habits",
      "distance-is-also-healing",
    ],
  },
  {
    label: "What staying requires",
    slugs: [
      "remember-who-you-are",
      "when-staying-feels-hard",
    ],
  },
];

function FeelingsPage() {
  const navigate = useNavigate();

  return (
    <AppLayout className="space-y-8 pb-8">
      <section className="space-y-3 py-2">
        <div className="stitched-label">Choose gently</div>
        <h1 className="font-display text-5xl leading-none text-foreground">
          What are you carrying today?
        </h1>
        <p className="max-w-md text-base leading-7 text-muted-foreground">
          Choose the closest feeling. You do not have to explain it yet.
        </p>
      </section>

      <div className="space-y-10">
        {GROUPS.map((group) => {
          const grouped = group.slugs
            .map((slug) => categories.find((c) => c.slug === slug))
            .filter(Boolean) as typeof categories;

          return (
            <section key={group.label} className="space-y-3">
              <p className="eyebrow-copy">{group.label}</p>
              <div className="grid gap-3">
                {grouped.map((category) => (
                  <CategoryCard
                    key={category.slug}
                    category={category}
                    onSelect={() => {
                      trackEvent("category_selected", { category: category.slug });
                      navigate({
                        to: "/note/$categorySlug",
                        params: { categorySlug: category.slug },
                      });
                    }}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="space-y-3 pt-4">
        <p className="eyebrow-copy">Know someone who needs this?</p>
        <h2 className="font-display text-2xl leading-tight text-foreground">
          Send them here. No explanation needed.
        </h2>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Sometimes the best thing you can do is quietly pass someone the door.
        </p>
        <ShareNote
          noteTitle="The Note You Needed Today — Feelings"
          wallpaperLine="Every feeling has a room. Choose the one that knows your name today."
          caption={`Sometimes you just need words for what you are carrying.\n\nFind the note you need today.\nthenoteyouneeded.today/feelings`}
          url="https://thenoteyouneeded.today/feelings"
          context="feelings"
        />
      </section>
    </AppLayout>
  );
}
