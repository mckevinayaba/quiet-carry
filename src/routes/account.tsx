import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { InstallModal } from "@/components/install-modal";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSavedNoteIds, getUserReflections } from "@/lib/account-sync";
import { sendMagicLink, signOut, useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { getKeptNotes, getReflections } from "@/lib/note-storage";

export const Route = createFileRoute("/account")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Your Private Account" },
      { name: "description", content: "A private account for your saved notes and reflections." },
      { property: "og:title", content: "Your Private Account" },
      { property: "og:description", content: "A private account for your saved notes and reflections." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, loading } = useAuth();

  return (
    <AppLayout className="space-y-5 pb-8">
      <section className="space-y-3 py-2">
        <div className="stitched-label">Private account</div>
        <h1 className="font-display text-5xl leading-none">Your Private Account</h1>
      </section>

      {loading ? null : user ? <SignedInView userId={user.id} /> : <SignedOutView />}
    </AppLayout>
  );
}

// ---------------------------------------------------------------------------
// Signed out — magic link form
// ---------------------------------------------------------------------------

function SignedOutView() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [installOpen, setInstallOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    const result = await sendMagicLink(email);
    setStatus(result.ok ? "sent" : "error");
  };

  return (
    <>
      <InstallModal open={installOpen} onClose={() => setInstallOpen(false)} />

      <section className="paper-panel space-y-4">
        <p className="text-base leading-7 text-muted-foreground">
          A private account keeps your saved notes and reflections with you across devices.
        </p>

        {status === "sent" ? (
          <p className="text-base leading-7 text-foreground">
            Check your email. We sent you a link — click it and you&apos;re in.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              className="sm:max-w-xs"
              required
            />
            <Button type="submit" variant="note" className="min-h-11 shrink-0" disabled={status === "loading"}>
              {status === "loading" ? "Sending…" : "Create your private account"}
            </Button>
          </form>
        )}

        {status === "error" ? (
          <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
        ) : null}

        <p className="text-xs text-muted-foreground">
          No password to remember. We&apos;ll email you a link — clicking it signs you in. If you
          already have an account, enter the same email above to sign in.
        </p>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p>No public profile.</p>
          <p>No followers.</p>
          <p>No comments.</p>
          <p>No pressure.</p>
        </div>
      </section>

      <GuestActivitySummary />

      <section className="paper-panel space-y-3">
        <div className="stitched-label">Add to your phone</div>
        <h2 className="font-display text-2xl leading-none">Add The Note to your phone</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Keep a quiet place for the words you may need again.
        </p>
        <Button variant="paper" onClick={() => setInstallOpen(true)}>
          How to install
        </Button>
      </section>
    </>
  );
}

function GuestActivitySummary() {
  const [savedCount, setSavedCount] = useState(0);
  const [reflectionCount, setReflectionCount] = useState(0);

  useEffect(() => {
    setSavedCount(getKeptNotes().length);
    setReflectionCount(getReflections().length);
  }, []);

  return (
    <section className="paper-panel space-y-2">
      <p className="eyebrow-copy">Current guest activity</p>
      <p className="text-base leading-7 text-muted-foreground">
        Saved notes on this device: {savedCount}. Reflections on this device: {reflectionCount}.
      </p>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Signed in — real account data
// ---------------------------------------------------------------------------

function SignedInView({ userId }: { userId: string }) {
  const { user } = useAuth();
  const [savedCount, setSavedCount] = useState<number | null>(null);
  const [reflectionCount, setReflectionCount] = useState<number | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "confirm" | "loading" | "error">("idle");

  useEffect(() => {
    getSavedNoteIds(userId).then((ids) => setSavedCount(ids.length));
    getUserReflections(userId).then((entries) => setReflectionCount(entries.length));
  }, [userId]);

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long" })
    : null;

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    setEmailStatus("loading");
    const { error } = await supabase.auth.updateUser({ email: newEmail.trim() });
    setEmailStatus(error ? "error" : "sent");
  };

  const handleDeleteAccount = async () => {
    setDeleteStatus("loading");
    const { error } = await supabase.functions.invoke("delete-account");
    if (error) {
      setDeleteStatus("error");
    } else {
      await signOut();
    }
  };

  return (
    <>
      <section className="paper-panel space-y-3">
        <p className="text-base leading-7 text-foreground">You&apos;re signed in.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="Saved notes" value={savedCount} />
          <Stat label="Reflections" value={reflectionCount} />
          <Stat label="Member since" value={memberSince} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="paper" size="sm" className="min-h-9">
            <Link to="/shelf">View Shelf</Link>
          </Button>
          <Button asChild variant="paper" size="sm" className="min-h-9">
            <Link to="/reflect">View Reflect</Link>
          </Button>
          <Button variant="paper" size="sm" className="min-h-9" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </section>

      <section className="paper-panel space-y-3">
        <p className="eyebrow-copy">Manage email</p>
        {emailStatus === "sent" ? (
          <p className="text-sm leading-6 text-muted-foreground">
            Check your new inbox for a confirmation link to finish the change.
          </p>
        ) : (
          <form onSubmit={handleUpdateEmail} className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="new-email@example.com"
              className="sm:max-w-xs"
            />
            <Button type="submit" variant="paper" size="sm" className="min-h-9 shrink-0" disabled={emailStatus === "loading"}>
              Update email
            </Button>
          </form>
        )}
        {emailStatus === "error" ? (
          <p className="text-sm text-destructive">Could not update email. Please try again.</p>
        ) : null}
      </section>

      <section className="paper-panel space-y-3">
        <p className="eyebrow-copy">Delete account</p>
        <p className="text-sm leading-6 text-muted-foreground">
          This permanently removes your account, saved notes, and reflections. This cannot be
          undone.
        </p>
        {deleteStatus === "confirm" ? (
          <div className="flex flex-wrap gap-2">
            <Button variant="paper" size="sm" className="min-h-9 text-destructive" onClick={handleDeleteAccount}>
              Yes, delete everything
            </Button>
            <Button variant="paper" size="sm" className="min-h-9" onClick={() => setDeleteStatus("idle")}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="paper" size="sm" className="min-h-9" onClick={() => setDeleteStatus("confirm")}>
            Delete my account
          </Button>
        )}
        {deleteStatus === "error" ? (
          <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
        ) : null}
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number | string | null }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="font-display text-2xl text-foreground">{value ?? "—"}</p>
    </div>
  );
}
