import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { CategoryCard } from "@/components/category-card";
import { RouteErrorBoundary } from "@/components/route-error";
import { trackEvent } from "@/lib/analytics";
import { categories } from "@/lib/note-data";

export const Route = createFileRoute("/feelings")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "What are you carrying today?" },
      {
        name: "description",
        content: "Choose the feeling closest to what you are carrying quietly.",
      },
      { property: "og:title", content: "What are you carrying today?" },
      {
        property: "og:description",
        content: "Choose the feeling closest to what you are carrying quietly.",
      },
    ],
  }),
  component: FeelingsPage,
});

function FeelingsPage() {
  const navigate = useNavigate();

  return (
    <AppLayout className="space-y-5 pb-8">
      <section className="space-y-3 py-2">
        <div className="stitched-label">Choose gently</div>
        <h1 className="font-display text-5xl leading-none text-foreground">What are you carrying today?</h1>
        <p className="max-w-md text-base leading-7 text-muted-foreground">
          Choose the closest feeling. You do not have to explain it yet.
        </p>
      </section>

      <section className="grid gap-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            onSelect={() => {
              trackEvent("category_selected", { category: category.slug });
              navigate({ to: "/note/$categorySlug", params: { categorySlug: category.slug } });
            }}
          />
        ))}
      </section>
    </AppLayout>
  );
}
