import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { InstallModal } from "@/components/install-modal";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { useAppModals } from "@/components/app-modals";
import { supabase } from "@/integrations/supabase/client";
import { deleteMyAccount } from "@/lib/account.functions";
import { getKeptNotes, getReflections } from "@/lib/note-storage";

export const Route = createFileRoute("/account")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Your Private Account" },
      { name: "description", content: "Private account placeholder for saved notes, reflections, and future sync." },
      { property: "og:title", content: "Your Private Account" },
      { property: "og:description", content: "Private account placeholder for saved notes, reflections, and future sync." },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return (
    <AppLayout className="space-y-5 pb-8">
      <AccountInner />
    </AppLayout>
  );
}

function AccountInner() {
  const { openWaitlist, openFeedback } = useAppModals();
  const [savedCount, setSavedCount] = useState(0);
  const [reflectionCount, setReflectionCount] = useState(0);
  const [installOpen, setInstallOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const deleteAccount = useServerFn(deleteMyAccount);

  useEffect(() => {
    setSavedCount(getKeptNotes().length);
    setReflectionCount(getReflections().length);
    supabase.auth.getUser().then(({ data }) => {
      setSignedIn(!!data.user);
      setEmail(data.user?.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session?.user);
      setEmail(session?.user?.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete your account and everything on it? This cannot be undone. Your saved notes and reflections will be removed.",
    );
    if (!confirmed) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteAccount();
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setDeleteError("Something went wrong. Please try again in a moment.");
      setDeleting(false);
    }
  }

  return (
    <>
      <InstallModal open={installOpen} onClose={() => setInstallOpen(false)} />

      <section className="space-y-3 py-2">
        <div className="stitched-label">Private account</div>
        <h1 className="font-display text-5xl leading-none">Your Private Account</h1>
      </section>

      <section className="paper-panel space-y-4">
        <p className="text-base leading-7 text-muted-foreground">
          You can use The Note without an account. Private accounts are coming soon so your notes,
          shelves, and reflections can stay safe across devices.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button variant="note" onClick={() => openWaitlist("account")}>
            Join the private account waitlist
          </Button>
          <Button asChild variant="paper">
            <Link to="/support">Safety and support</Link>
          </Button>
        </div>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>No public profile.</p>
          <p>No followers.</p>
          <p>No comments.</p>
          <p>No pressure.</p>
        </div>
      </section>

      <section className="paper-panel space-y-2">
        <p className="eyebrow-copy">Current guest activity</p>
        <p className="text-base leading-7 text-muted-foreground">
          Saved notes on this device: {savedCount}. Reflections on this device: {reflectionCount}.
        </p>
      </section>

      <section className="paper-panel space-y-3">
        <h2 className="font-display text-2xl leading-none">Share feedback</h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Tell us what felt right, what felt confusing, or what note you needed but could not find.
        </p>
        <Button variant="paper" onClick={openFeedback}>
          Share feedback
        </Button>
      </section>

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

      {signedIn && (
        <section className="paper-panel space-y-3 border-destructive/30">
          <div className="stitched-label">Your account</div>
          <h2 className="font-display text-2xl leading-none">Delete your account</h2>
          {email && (
            <p className="text-sm leading-6 text-muted-foreground">Signed in as {email}.</p>
          )}
          <p className="text-sm leading-6 text-muted-foreground">
            This permanently removes your account, your saved notes, and your reflections. It cannot be undone.
          </p>
          {deleteError && (
            <p className="text-sm leading-6 text-destructive">{deleteError}</p>
          )}
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Delete my account"}
          </Button>
        </section>
      )}
    </>
  );
}
