import { Link } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export function RouteErrorBoundary({ error }: ErrorProps) {
  if (import.meta.env.DEV) console.error("[route-error]", error);

  return (
    <AppLayout className="pb-8">
      <div className="paper-panel mx-auto mt-10 max-w-xl space-y-5 p-8 text-center">
        <div className="stitched-label mx-auto w-fit">Something went wrong</div>
        <h1 className="font-display text-4xl leading-[1.05] text-foreground">
          This note did not open properly.
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          Something went wrong while opening this part of The Note. You can go back or return home.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="paper" onClick={() => window.history.back()}>
            Go back
          </Button>
          <Button asChild variant="note">
            <Link to="/">Return home</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

export function NoteNotFound() {
  return (
    <AppLayout className="pb-8">
      <div className="paper-panel mx-auto mt-10 max-w-xl space-y-5 p-8 text-center">
        <div className="stitched-label mx-auto w-fit">Note not found</div>
        <h1 className="font-display text-4xl leading-[1.05] text-foreground">
          We could not find this note.
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          The link may be incorrect or the note may have moved.
        </p>
        <Button asChild variant="note">
          <Link to="/feelings">Choose another feeling</Link>
        </Button>
      </div>
    </AppLayout>
  );
}

export function WriteNotFound() {
  return (
    <AppLayout className="pb-8">
      <div className="paper-panel mx-auto mt-10 max-w-xl space-y-5 p-8 text-center">
        <div className="stitched-label mx-auto w-fit">Note not found</div>
        <h1 className="font-display text-4xl leading-[1.05] text-foreground">
          We could not find the note you wanted to write from.
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          The link may be incorrect or the note may have moved.
        </p>
        <Button asChild variant="note">
          <Link to="/feelings">Choose another feeling</Link>
        </Button>
      </div>
    </AppLayout>
  );
}
