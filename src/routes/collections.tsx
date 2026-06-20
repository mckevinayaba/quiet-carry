import { ArrowLeft } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { CollectionCard } from "@/components/collection-card";
import { useAppModals } from "@/components/app-modals";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { collections } from "@/lib/note-data";

export const Route = createFileRoute("/collections")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    links: [
      { rel: "canonical", href: "https://thenoteyouneeded.today/collections" },
    ],
    meta: [
      { title: "Collections | The Note You Needed Today" },
      { name: "description", content: "Volume 1 and deeper collections for the things people carry quietly." },
      { property: "og:title", content: "Collections | The Note You Needed Today" },
      { property: "og:description", content: "Volume 1 and deeper collections for the things people carry quietly." },
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
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
            <Link to="/">
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="paper" size="sm" className="min-h-9 text-sm">
            <Link to="/today">Read Today's Note</Link>
          </Button>
        </div>
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
