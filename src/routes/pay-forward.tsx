import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/pay-forward")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Pay a Note Forward — The Note You Needed Today" },
      {
        name: "description",
        content:
          "Someone needs this note. They just do not know it yet. Pay a note forward to someone carrying something heavy.",
      },
    ],
  }),
  component: PayForwardPage,
});

function PayForwardPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl space-y-16 py-10">
        <header className="space-y-5">
          <span className="eyebrow-copy">Pay a Note Forward</span>
          <h1 className="text-balance font-display text-5xl leading-[1.02] sm:text-6xl">
            Someone needs this note.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            They just do not know it yet. If a note found you at the right time, you can pass it to
            someone who is quietly carrying something heavy. No explanation needed. Just a note,
            from you to them.
          </p>
        </header>

        <section className="note-surface space-y-6 px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex items-start justify-between">
            <div className="stitched-label">How it works</div>
            <Heart className="heart-mark" aria-hidden />
          </div>
          <div className="space-y-4 text-base leading-7 text-foreground">
            <p>
              Choose a note from the platform that speaks to what someone you know might be
              carrying. Send it quietly &mdash; no grand gesture required.
            </p>
            <p className="text-muted-foreground">
              Or, if you have Volume 1, you can gift it to someone who needs the full collection.
              Words for the grief, the survival, the quiet anger, the becoming.
            </p>
          </div>
        </section>

        <section className="paper-panel space-y-6 p-6 sm:p-8">
          <div className="space-y-3">
            <span className="eyebrow-copy">Coming soon</span>
            <h2 className="font-display text-3xl leading-tight text-foreground">
              A dedicated gifting flow is on its way.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              We are building a way to send Volume 1 directly to someone who needs it &mdash;
              anonymously if you prefer, with a quiet note from you attached. Until then, you can
              share a note from the platform, or use the gift page to send Volume 1 today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              variant="note"
              className="min-h-11"
              onClick={() => trackEvent("pay_forward_started")}
            >
              <Link to="/gift">Gift Volume 1 now &rarr;</Link>
            </Button>
            <Button asChild variant="paper" className="min-h-11">
              <Link to="/feelings">Find a note to share</Link>
            </Button>
          </div>
        </section>

        <section className="space-y-4 text-center">
          <p className="font-display text-2xl text-foreground">
            Sometimes the most honest thing you can offer is a note that says what you could not.
          </p>
          <p className="text-sm text-muted-foreground">
            You do not have to explain why you are sending it. They will know.
          </p>
        </section>
      </div>
    </AppLayout>
  );
}
