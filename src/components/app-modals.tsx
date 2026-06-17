import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Heart } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { isValidEmail, saveFeedbackEntry, saveWaitlistEntry, type WaitlistSource } from "@/lib/waitlist";
import { onMeaningfulGuestAction, shouldShowAccountPrompt } from "@/lib/note-storage";

interface ModalCtx {
  openWaitlist: (source: WaitlistSource) => void;
  openFeedback: () => void;
}

const ModalContext = createContext<ModalCtx | null>(null);

export function useAppModals() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useAppModals must be used inside AppModalsProvider");
  return ctx;
}

export function AppModalsProvider({ children }: { children: ReactNode }) {
  const [waitlistSource, setWaitlistSource] = useState<WaitlistSource | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [accountPromptOpen, setAccountPromptOpen] = useState(false);
  const [accountPromptDismissed, setAccountPromptDismissed] = useState(false);

  const openWaitlist = useCallback((source: WaitlistSource) => {
    setWaitlistSource(source);
    trackEvent("waitlist_opened", { source });
    if (source === "volume") trackEvent("volume_waitlist_clicked");
    if (source === "account") trackEvent("account_waitlist_clicked");
  }, []);

  const openFeedback = useCallback(() => {
    setFeedbackOpen(true);
    trackEvent("feedback_opened");
  }, []);

  useEffect(() => {
    return onMeaningfulGuestAction((count) => {
      if (!accountPromptDismissed && shouldShowAccountPrompt(count)) {
        setAccountPromptOpen(true);
        trackEvent("account_prompt_shown", { actionCount: count });
      }
    });
  }, [accountPromptDismissed]);

  const value = useMemo<ModalCtx>(() => ({ openWaitlist, openFeedback }), [openWaitlist, openFeedback]);

  return (
    <ModalContext.Provider value={value}>
      {children}

      <WaitlistDialog source={waitlistSource} onClose={() => setWaitlistSource(null)} />
      <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <AccountPromptDialog
        open={accountPromptOpen}
        onDismiss={() => {
          setAccountPromptOpen(false);
          setAccountPromptDismissed(true);
        }}
        onJoin={() => {
          setAccountPromptOpen(false);
          openWaitlist("account");
        }}
      />
    </ModalContext.Provider>
  );
}

function WaitlistDialog({ source, onClose }: { source: WaitlistSource | null; onClose: () => void }) {
  const open = source !== null;
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setEmail("");
      setError(null);
      setSubmitted(false);
    }
  }, [open]);

  const isVolume = source === "volume";
  const title = isVolume ? "Volume 1 is almost ready" : "A private account is coming soon";
  const description = isVolume
    ? "The Things We Do Not Say Out Loud is the first digital collection from The Note You Needed Today. It will include designed notes, mobile wallpapers, captions, journal prompts, and private letters for the things people carry quietly. Leave your email and we will tell you when it is ready."
    : "Private accounts will let you keep your notes and reflections safe across devices. Leave your email and we will tell you when it is ready.";

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl leading-none">{title}</DialogTitle>
          <DialogDescription className="text-base leading-7 text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="paper-panel space-y-2 text-base leading-7 text-foreground" role="status">
            <p>You are on the list. We will send the note when it is ready.</p>
          </div>
        ) : (
          <form
            className="space-y-3"
            onSubmit={async (event) => {
              event.preventDefault();
              if (!isValidEmail(email)) {
                setError("Please enter an email address that looks right.");
                return;
              }
              const res = await saveWaitlistEntry(email, source ?? "volume");
              if (!res.ok) {
                setError("Something went wrong. Please try again.");
                return;
              }
              trackEvent("waitlist_submitted", { source });
              setSubmitted(true);
            }}
          >
            <label className="text-sm font-medium text-foreground" htmlFor="waitlist-email">
              Email address
            </label>
            <Input
              id="waitlist-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError(null);
              }}
              required
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <DialogFooter>
              <Button type="button" variant="paper" onClick={onClose}>
                Not now
              </Button>
              <Button type="submit" variant="note">
                Notify me
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FeedbackDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setText("");
      setSubmitted(false);
      setError(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl leading-none">
            Help us make this safer and more useful
          </DialogTitle>
          <DialogDescription className="text-base leading-7 text-muted-foreground">
            What felt right? What felt confusing? What note did you need but could not find?
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="paper-panel text-base leading-7 text-foreground" role="status">
            Thank you. Your words help us shape this gently.
          </div>
        ) : (
          <form
            className="space-y-3"
            onSubmit={async (event) => {
              event.preventDefault();
              if (!text.trim()) return;
              if (text.trim().length > 1000) {
                setError("Please keep your feedback under 1000 characters.");
                return;
              }
              const res = await saveFeedbackEntry(text);
              if (!res.ok) {
                setError("Something went wrong. Please try again.");
                return;
              }
              trackEvent("feedback_submitted");
              setSubmitted(true);
            }}
          >
            <label className="sr-only" htmlFor="feedback-text">Your feedback</label>
            <Textarea
              id="feedback-text"
              className="min-h-40"
              placeholder="Write your feedback here"
              maxLength={1000}
              value={text}
              onChange={(event) => {
                setText(event.target.value);
                if (error) setError(null);
              }}
            />
            <p className="text-right text-xs text-muted-foreground" aria-live="polite">
              {text.length}/1000
            </p>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <DialogFooter>
              <Button type="button" variant="paper" onClick={onClose}>
                Not now
              </Button>
              <Button type="submit" variant="note">
                Send feedback
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AccountPromptDialog({
  open,
  onDismiss,
  onJoin,
}: {
  open: boolean;
  onDismiss: () => void;
  onJoin: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onDismiss(); }}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-display text-2xl leading-none">
            <Heart className="heart-mark" aria-hidden="true" />
            Keep them safe across devices
          </DialogTitle>
          <DialogDescription className="text-base leading-7 text-muted-foreground">
            Your notes are being kept on this device. Create a private account if you want them safe across devices.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="paper" onClick={onDismiss}>
            Not now
          </Button>
          <Button type="button" variant="note" onClick={onJoin}>
            Create private account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
