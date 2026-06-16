import { Heart, Layers2, LockKeyhole, Mail, NotebookPen } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ActionButton } from "@/components/action-button";
import { AppLayout } from "@/components/app-layout";
import { ReceiptBlock } from "@/components/receipt-block";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { featuredNote } from "@/lib/note-data";
import {
  incrementGuestActionCount,
  keepNote,
  logSentNote,
  shouldShowAccountPrompt,
} from "@/lib/note-storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Note You Needed Today" },
      {
        name: "description",
        content: "Find words for what you carry quietly in a private-first emotional language platform.",
      },
      { property: "og:title", content: "The Note You Needed Today" },
      {
        property: "og:description",
        content: "Find words for what you carry quietly in a private-first emotional language platform.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [message, setMessage] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissedPrompt, setDismissedPrompt] = useState(false);

  useEffect(() => {
    trackEvent("note_opened", { noteId: featuredNote.id, category: featuredNote.categorySlug, source: "home" });
  }, []);

  const registerGuestAction = () => {
    const count = incrementGuestActionCount();
    if (shouldShowAccountPrompt(count) && !showPrompt && !dismissedPrompt) {
      setShowPrompt(true);
      trackEvent("account_prompt_shown", { actionCount: count });
    }
  };

  const handleKeep = () => {
    keepNote(featuredNote);
    trackEvent("note_kept", { noteId: featuredNote.id, source: "home" });
    setMessage("Kept. You can come back to this when you need it.");
    registerGuestAction();
  };

  const handleSend = async () => {
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title: featuredNote.title, text: featuredNote.sendableText });
      } else if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(featuredNote.sendableText);
      }
    } catch {
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          await navigator.clipboard.writeText(featuredNote.sendableText);
        }
      } catch {
        /* noop */
      }
    }
    logSentNote(featuredNote);
    trackEvent("note_sent", { noteId: featuredNote.id, source: "home" });
    setMessage("Copied. Send it to someone who may need words today.");
    registerGuestAction();
  };

  return (
    <AppLayout className="space-y-8 pb-8">
      <section className="space-y-5 py-3">
        <div className="stitched-label">Private first emotional language</div>
        <div className="space-y-4">
          <h1 className="max-w-md text-balance font-display text-5xl leading-[1.05] text-foreground sm:text-6xl">
            The Note You Needed Today
          </h1>
          <p className="max-w-md font-display text-2xl leading-snug text-foreground">
            Find words for what you carry quietly.
          </p>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            For the feelings you cannot always explain. For the pain you made look easy. For the
            words that stayed. For the days when “I’m fine” is not the truth.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button asChild size="lg" variant="note" className="min-h-14 text-base">
            <Link to="/feelings">What are you carrying today?</Link>
          </Button>
          <Button asChild size="lg" variant="paper" className="min-h-14 text-base">
            <Link to="/note/$categorySlug" params={{ categorySlug: featuredNote.categorySlug }}>
              Read today’s note
            </Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-3xl leading-none">Today’s Note</h2>
          <Heart className="heart-mark" aria-hidden="true" />
        </div>

        {message ? (
          <div className="paper-panel text-base leading-7 text-foreground" role="status">
            {message}
          </div>
        ) : null}

        <article className="space-y-4">
          <div className="note-surface">
            <div className="space-y-4">
              <div className="stitched-label">The Note You Needed Today</div>
              <div className="note-copy">{featuredNote.mainText}</div>
            </div>
          </div>

          <ReceiptBlock
            from={featuredNote.receiptFrom}
            to={featuredNote.receiptTo}
            date={featuredNote.receiptDate}
            total={featuredNote.receiptTotal}
          />

          <div className="grid gap-3">
            <ActionButton hint="Save it privately for later" icon={LockKeyhole} onClick={handleKeep}>
              Keep this Note
            </ActionButton>
            <ActionButton hint="Share softly, without noise" icon={Mail} onClick={handleSend}>
              Send this Quietly
            </ActionButton>
            <ActionButton
              asChild
              hint="Begin a private reflection"
              icon={NotebookPen}
              onClick={() => trackEvent("reflection_started", { noteId: featuredNote.id, source: "home" })}
            >
              <Link to="/write/$categorySlug" params={{ categorySlug: featuredNote.categorySlug }}>
                Write from This
              </Link>
            </ActionButton>
          </div>
        </article>

        {showPrompt ? (
          <section className="paper-panel space-y-3">
            <div className="flex items-center gap-3">
              <Heart className="heart-mark" aria-hidden="true" />
              <h3 className="font-display text-2xl leading-none">Keep them safe across devices</h3>
            </div>
            <p className="text-base leading-7 text-muted-foreground">
              Your notes are being kept on this device. Create a private account if you want them
              safe across devices.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                variant="paper"
                className="min-h-12"
                onClick={() => {
                  setShowPrompt(false);
                  setDismissedPrompt(true);
                }}
              >
                Not now
              </Button>
              <Button asChild variant="note" className="min-h-12">
                <Link to="/account">Create private account</Link>
              </Button>
            </div>
          </section>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl leading-none">How it works</h2>
        <div className="grid gap-3">
          {[
            { step: "Choose what you are carrying.", icon: Heart },
            { step: "Receive one note.", icon: Mail },
            { step: "Keep it, send it, or write from it privately.", icon: NotebookPen },
          ].map(({ step, icon: Icon }, index) => (
            <div key={step} className="paper-panel flex items-start gap-4">
              <div className="icon-seal shrink-0">{index + 1}</div>
              <div className="flex min-w-0 flex-1 items-start gap-3 pt-1">
                <Icon className="mt-1 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <p className="text-base leading-7 text-foreground">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="paper-panel space-y-3">
        <h2 className="font-display text-3xl leading-none">This is not social media.</h2>
        <p className="max-w-md text-base leading-7 text-muted-foreground">
          No likes. No public comments. No followers. No performance. Just private words for what
          you are carrying.
        </p>
      </section>

      <section className="paper-panel space-y-4">
        <div className="stitched-label">Volume 1</div>
        <div className="space-y-2">
          <h2 className="font-display text-3xl leading-none">The Things We Do Not Say Out Loud</h2>
          <p className="text-base leading-7 text-muted-foreground">
            A digital collection of notes, wallpapers, captions, prompts, and private letters for
            heavy days.
          </p>
        </div>
        <Button asChild variant="note" className="min-h-12">
          <Link to="/collections">
            <Layers2 aria-hidden="true" />
            <span>Get Volume 1</span>
          </Link>
        </Button>
      </section>
    </AppLayout>
  );
}
