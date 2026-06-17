import { createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { CollectionCard } from "@/components/collection-card";
import { useAppModals } from "@/components/app-modals";
import { trackEvent } from "@/lib/analytics";
import { collections } from "@/lib/note-data";

export const Route = createFileRoute("/collections")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Collections" },
      { name: "description", content: "Deeper notes for the things people carry quietly." },
      { property: "og:title", content: "Collections" },
      { property: "og:description", content: "Deeper notes for the things people carry quietly." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <AppLayout className="space-y-5 pb-8">
      <CollectionsInner />
    </AppLayout>
  );
}

function CollectionsInner() {
  const { openWaitlist } = useAppModals();

  return (
    <>
      <section className="space-y-3 py-2">
        <div className="stitched-label">Collections</div>
        <h1 className="font-display text-5xl leading-none">Collections</h1>
        <p className="text-base leading-7 text-muted-foreground">
          Deeper notes for the things people carry quietly.
        </p>
      </section>

      <div className="grid gap-4">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onWaitlistClick={() => {
              trackEvent("collection_clicked", { collectionId: collection.id });
              openWaitlist("volume");
            }}
          />
        ))}
      </div>
    </>
  );
}
