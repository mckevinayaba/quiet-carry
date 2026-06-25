import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/unsubscribe")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [{ title: "Unsubscribe | The Note You Needed Today" }],
  }),
  component: UnsubscribePage,
});

function UnsubscribePage() {
  const [status, setStatus] = useState<"loading" | "done" | "error" | "missing">("loading");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
      setStatus("missing");
      return;
    }

    supabase.functions
      .invoke("unsubscribe-daily-letter", { body: { id } })
      .then(({ data, error }) => {
        if (error || data?.ok === false) {
          setStatus("error");
        } else {
          setStatus("done");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <AppLayout className="flex min-h-[60vh] items-center justify-center pb-12">
      <div className="paper-panel max-w-md space-y-4 p-8 text-center">
        {status === "loading" ? (
          <p className="text-base leading-7 text-muted-foreground">One moment…</p>
        ) : status === "done" ? (
          <>
            <h1 className="font-display text-3xl leading-tight text-foreground">
              You won&apos;t hear from us again.
            </h1>
            <p className="text-base leading-7 text-muted-foreground">
              No more quiet letters. If you ever want them back, you can subscribe again from the
              homepage.
            </p>
          </>
        ) : status === "missing" ? (
          <p className="text-base leading-7 text-muted-foreground">
            This unsubscribe link is missing some information. If you need help, reply to any
            letter you received and we&apos;ll remove you manually.
          </p>
        ) : (
          <p className="text-base leading-7 text-muted-foreground">
            Something went wrong. Reply to any letter you received with the word &quot;stop&quot;
            and we will remove you manually.
          </p>
        )}
      </div>
    </AppLayout>
  );
}
