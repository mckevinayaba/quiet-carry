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

      {/* Immediate action block */}
      <section className="space-y-4 rounded-md border border-border bg-card p-6">
        <p className="text-base font-medium leading-7 text-foreground">
          Right now, please do one real-world thing before you continue.
        </p>
        <ul className="space-y-2 text-base leading-7 text-foreground">
          <li className="flex items-start gap-3">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
            Contact emergency services in your country.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
            Call a local crisis line.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
            Message someone you trust and say: "I am not safe being alone right now."
          </li>
        </ul>
        <p className="text-base leading-7 text-muted-foreground">
          If you can, move away from anything you could use to hurt yourself and go where another
          human being can see you.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          This page is not a replacement for live support. It is only a bridge toward it.
        </p>
      </section>

      {/* Disclaimer */}
      <section className="paper-panel space-y-4">
        <p className="text-base leading-7 text-muted-foreground">
          The Note You Needed Today is not therapy, diagnosis, or medical advice. It offers
          emotional language, reflection, and supportive words for everyday life. It does not
          replace professional help, counselling, emergency care, or crisis support.
        </p>
        <Button asChild variant="paper" className="min-h-11 self-start">
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Return Home
          </Link>
        </Button>
      </section>
    </AppLayout>
  );
}
