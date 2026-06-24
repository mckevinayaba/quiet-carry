import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/volume-1/unlock")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [{ title: "Unlock Volume 1 | The Note You Needed Today" }],
  }),
  component: UnlockPage,
});

function UnlockPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Live DB uses exact match — normalize to uppercase before sending.
      const normalized = code.trim().toUpperCase();
      const { data, error: rpcError } = await supabase.rpc("redeem_volume1_code", {
        input_code: normalized,
      });

      if (rpcError) throw rpcError;

      const result = data as { ok: boolean; reason?: string };

      if (result.ok) {
        localStorage.setItem("volume1_unlocked", "true");
        navigate({ to: "/volume-1/read/$chapter", params: { chapter: "1" } });
      } else {
        // reason is "not_found" or "already_redeemed" from the live RPC.
        setError(
          "This code was not found or has already been used. If you believe this is an error, contact hello@thenoteyouneededtoday.com",
        );
      }
    } catch (err) {
      console.error("redeem_volume1_code failed:", err);
      const msg = err instanceof Error ? err.message : String(err);
      setError(
        `Something went wrong: ${msg}. If the issue continues, contact hello@thenoteyouneededtoday.com`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout className="flex min-h-[70vh] items-center justify-center pb-12">
      <div className="paper-panel w-full max-w-md space-y-8 p-8">
        <div className="space-y-2 text-center">
          <div className="stitched-label mx-auto inline-flex">Volume 1</div>
          <h1 className="font-display text-3xl leading-tight text-foreground">
            Enter your access code
          </h1>
          <p className="text-sm leading-6 text-muted-foreground">
            Your code was included in your Selar delivery email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="code" className="sr-only">
              Access code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="NOTE-XXXX-XXXX"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              className="w-full rounded-none border border-border bg-background px-4 py-3 font-label text-lg tracking-widest text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>

          {error ? (
            <p className="text-sm leading-6 text-destructive">{error}</p>
          ) : null}

          <Button
            type="submit"
            variant="note"
            className="w-full min-h-12"
            disabled={loading || !code.trim()}
          >
            {loading ? "Checking…" : "Open Volume 1"}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
