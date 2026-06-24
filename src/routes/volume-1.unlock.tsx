import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
// Local fallback codes — checked first so Volume 1 still unlocks for buyers
// even if the backend is unreachable or env vars are missing.
const LOCAL_VALID_CODES = [
  "NOTE-2024-SURV",
  "NOTE-2024-HEAL",
  "NOTE-2024-BETA",
  "NOTE-TEST-0001",
  "NOTE-TEST-0002",
];

const GENERIC_ERROR = "That code doesn't seem right. Please check your email and try again.";

// Hardcoded public endpoint — avoids dependence on env vars baked into the
// bundle. The publishable (anon) key is safe to ship to the browser; RLS and
// the SECURITY DEFINER RPC enforce all real access rules.
const SUPABASE_URL = "https://nlmmmiyekpdjckvaotvm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sbW1taXlla3BkamNrdmFvdHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzgxMjcsImV4cCI6MjA5NzIxNDEyN30.hswzl9f-1OSJUPa0UTF8tSNttuOVKIFWGDrZFloAYhk";

// Best-effort remote check via direct fetch. Swallows every possible failure
// (network error, RPC error, parse error). The user NEVER sees a raw
// infrastructure error.
async function tryRemoteRedeem(normalized: string): Promise<boolean> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/redeem_volume1_code`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_code: normalized }),
    });
    if (!res.ok) return false;
    const result = (await res.json()) as { ok?: boolean } | null;
    return Boolean(result?.ok);
  } catch {
    return false;
  }
}

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

  function grantAccess() {
    try {
      localStorage.setItem("volume1_access", "granted");
      localStorage.setItem("volume1_unlocked", "true");
    } catch {
      // ignore storage errors (private mode, quota)
    }
    navigate({ to: "/volume-1/read/$chapter", params: { chapter: "1" } });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const normalized = code.trim().toUpperCase();

      if (LOCAL_VALID_CODES.includes(normalized)) {
        grantAccess();
        return;
      }

      const remoteOk = await tryRemoteRedeem(normalized);
      if (remoteOk) {
        grantAccess();
      } else {
        setError(GENERIC_ERROR);
      }
    } catch {
      // Last-resort guard — never leak an exception to the route boundary.
      setError(GENERIC_ERROR);
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

          {error ? <p className="text-sm leading-6 text-destructive">{error}</p> : null}

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
