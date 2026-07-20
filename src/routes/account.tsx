import { createFileRoute, Link } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/account")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Your Private Account" },
      {
        name: "description",
        content:
          "A private account area is coming soon. Save notes, access Volume 1, and return to what you needed.",
      },
      { property: "og:title", content: "Your Private Account" },
      {
        property: "og:description",
        content:
          "A private account area is coming soon. Save notes, access Volume 1, and return to what you needed.",
      },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <AppLayout className="space-y-5 pb-8">
      <section className="space-y-3 py-2">
        <div className="stitched-label">Your account</div>
        <h1 className="font-display text-5xl leading-none text-foreground">
          Your private space is coming.
        </h1>
      </section>

      <section className="paper-panel space-y-5 p-6 sm:p-8">
        <p className="text-base leading-7 text-muted-foreground">
          We are building a quiet account area where you can save notes to your private shelf,
          access Volume 1, and return to what you needed whenever you need it.
        </p>
        <p className="text-base leading-7 text-muted-foreground">It will be ready soon.</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="note" className="min-h-11">
            <Link to="/">Return home</Link>
          </Button>
          <Button asChild variant="paper" className="min-h-11">
            <Link to="/feelings">Keep reading notes</Link>
          </Button>
        </div>
      </section>
    </AppLayout>
  );
}
