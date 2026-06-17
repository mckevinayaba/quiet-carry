import { ArrowLeft } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/support")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Before you go further" },
      {
        name: "description",
        content: "Important support and safety guidance for using The Note You Needed Today.",
      },
      { property: "og:title", content: "Before you go further" },
      {
        property: "og:description",
        content: "Important support and safety guidance for using The Note You Needed Today.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <AppLayout className="space-y-5 pb-8">
      <section className="space-y-3 py-2">
        <div className="stitched-label">Safety and support</div>
        <h1 className="font-display text-5xl leading-none">Before you go further</h1>
      </section>

      <section className="paper-panel space-y-4">
        <p className="text-base leading-7 text-muted-foreground">
          The Note You Needed Today is not therapy, diagnosis, or medical advice. It offers
          emotional language, reflection, and supportive words for everyday life.
        </p>
        <p className="text-base leading-7 text-muted-foreground">
          If you feel in immediate danger, feel like harming yourself, or cannot stay safe, please
          contact emergency services, a crisis line, or someone you trust now.
        </p>
        <Button variant="note" disabled aria-disabled="true">
          Find support near me (coming soon)
        </Button>
        <p className="text-xs leading-5 text-muted-foreground">
          A vetted list of crisis lines is being prepared. Until then, please reach out to local
          emergency services or someone you trust.
        </p>
        <Button asChild variant="paper" className="mt-2 min-h-11 self-start">
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Return Home
          </Link>
        </Button>
      </section>
    </AppLayout>
  );
}
