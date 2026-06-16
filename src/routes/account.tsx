import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { getKeptNotes, getReflections } from "@/lib/note-storage";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Private Account" },
      {
        name: "description",
        content: "Private account placeholder for saved notes, reflections, and future sync.",
      },
      { property: "og:title", content: "Your Private Account" },
      {
        property: "og:description",
        content: "Private account placeholder for saved notes, reflections, and future sync.",
      },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  const [signedIn] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [reflectionCount, setReflectionCount] = useState(0);

  useEffect(() => {
    setSavedCount(getKeptNotes().length);
    setReflectionCount(getReflections().length);
  }, []);

  return (
    <AppLayout className="space-y-5 pb-8">
      <section className="space-y-3 py-2">
        <div className="stitched-label">Private account</div>
        <h1 className="font-display text-5xl leading-none">Your Private Account</h1>
      </section>

      {!signedIn ? (
        <section className="paper-panel space-y-4">
          <p className="text-base leading-7 text-muted-foreground">
            You can use The Note without an account. But if you want your notes, shelves, and
            reflections to stay safe across devices, create a private account.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="note">Create Private Account</Button>
            <Button variant="paper">Sign In</Button>
          </div>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>No public profile.</p>
            <p>No followers.</p>
            <p>No comments.</p>
            <p>No pressure.</p>
          </div>
        </section>
      ) : (
        <section className="paper-panel space-y-4">
          <div className="grid gap-3 text-sm text-muted-foreground">
            <p>Email: private@example.com</p>
            <p>Saved notes count: {savedCount}</p>
            <p>Reflections count: {reflectionCount}</p>
            <p>Notification preference: Quiet reminders off</p>
          </div>
          <Button variant="paper">Sign out</Button>
        </section>
      )}

      <section className="paper-panel space-y-2">
        <p className="eyebrow-copy">Current guest activity</p>
        <p className="text-base leading-7 text-muted-foreground">
          Saved notes on this device: {savedCount}. Reflections on this device: {reflectionCount}.
        </p>
      </section>
    </AppLayout>
  );
}
