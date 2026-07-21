import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
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
import { InstallModal, type DeferredInstallPrompt } from "@/components/install-modal";
import { trackEvent } from "@/lib/analytics";
import { isValidEmail, saveFeedbackEntry, saveWaitlistEntry, type WaitlistSource } from "@/lib/waitlist";
import { onMeaningfulGuestAction, shouldShowAccountPrompt } from "@/lib/note-storage";
import {
  isIOS,
  isStandalone,
  markInstallSeen,
  onInstallPromptRequested,
  shouldShowInstallPrompt,
} from "@/lib/pwa-install";

interface ModalCtx {
  openWaitlist: (source: WaitlistSource) => void;
  openFeedback: () => void;
  openInstallPrompt: () => void;
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
  const [installOpen, setInstallOpen] = useState(false);
  const [afterKeptNote, setAfterKeptNote] = useState(false);
  // Keep deferred prompt in both ref (for capture) and state (so modal prop is never stale)
  const deferredPromptRef = useRef<DeferredInstallPrompt | null>(null);
  const [deferredPromptReady, setDeferredPromptReady] = useState<DeferredInstallPrompt | null>(null);
  const isIOSDevice = useRef(typeof window !== "undefined" ? isIOS() : false);

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

  const openInstallPrompt = useCallback(() => {
    if (!shouldShowInstallPrompt()) return;
    if (isStandalone()) return;
    setAfterKeptNote(false);
    setInstallOpen(true);
    markInstallSeen();
  }, []);

  // Capture Android Chrome native install prompt — store in both ref and state
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const evt = e as DeferredInstallPrompt;
      deferredPromptRef.current = evt;
      setDeferredPromptReady(evt);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Show install prompt when any page requests it
  useEffect(() => {
    const unsub = onInstallPromptRequested(() => {
      if (!shouldShowInstallPrompt()) return;
      if (isStandalone()) return;
      setAfterKeptNote(false);
      setInstallOpen(true);
      markInstallSeen();
    });
    return unsub;
  }, []);

  // Account prompt + install prompt after meaningful guest actions
  useEffect(() => {
    return onMeaningfulGuestAction((count) => {
      if (!accountPromptDismissed && shouldShowAccountPrompt(count)) {
        setAccountPromptOpen(true);
        trackEvent("account_prompt_shown", { actionCount: count });
        return;
      }
      // Show install prompt after first meaningful action (note kept / reflection saved)
      if (count === 1 && shouldShowInstallPrompt() && !isStandalone()) {
        setAfterKeptNote(true);
        setInstallOpen(true);
        markInstallSeen();
      }
    });
  }, [accountPromptDismissed]);

  const value = useMemo<ModalCtx>(
    () => ({ openWaitlist, openFeedback, openInstallPrompt }),
    [openWaitlist, openFeedback, openInstallPrompt],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      <WaitlistDialog source={waitlistSource} onClose={() => setWaitlistSource(null)} />
      <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <InstallModal
        open={installOpen}
        afterKeptNote={afterKeptNote}
        isIOS={isIOSDevice.current}
        deferredPrompt={deferredPromptReady}
        onClose={() => setInstallOpen(false)}
      />
      <AccountPromptDialog
        open={accountPromptOpen}
        onDismiss={() => {
          setAccountPromptOpen(false);
          setAccountPromptDismissed(true);
        }}
        onJoin={() => {
          setAccountPromptOpen(false);
          setAccountPromptDismissed(true);
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

  const title = "Volume 1 is almost ready";
  const description =
    "The Things We Do Not Say Out Loud is the first digital collection from The Note You Needed Today. It will include designed notes, mobile wallpapers, captions, journal prompts, and private letters for the things people carry quietly. Leave your email and we will tell you when it is ready.";

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
                setError(
                  res.error === "throttled"
                    ? "You have already joined recently. Please wait a moment before trying again."
                    : "Something went wrong. Please try again.",
                );
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
  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setText("");
      setWish("");
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
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              if (!text.trim()) return;
              if (text.trim().length > 1000) {
                setError("Please keep your feedback under 1000 characters.");
                return;
              }
              const res = await saveFeedbackEntry(text, wish.trim() || undefined);
              if (!res.ok) {
                setError(
                  res.error === "throttled"
                    ? "You have already sent feedback recently. Please wait a moment before trying again."
                    : "Something went wrong. Please try again.",
                );
                return;
              }
              trackEvent("feedback_submitted");
              setSubmitted(true);
            }}
          >
            <div className="space-y-1.5">
              <label className="sr-only" htmlFor="feedback-text">Your feedback</label>
              <Textarea
                id="feedback-text"
                className="min-h-32"
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
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="feedback-wish">
                What is a sentence you wish someone had written for you?
              </label>
              <Textarea
                id="feedback-wish"
                className="min-h-20"
                placeholder="Optional — one sentence is enough"
                maxLength={400}
                value={wish}
                onChange={(event) => setWish(event.target.value)}
              />
            </div>
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
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onDismiss(); }}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-display text-2xl leading-none">
            <Heart className="heart-mark" aria-hidden="true" />
            Keep them safe across devices
          </DialogTitle>
          <DialogDescription className="text-base leading-7 text-muted-foreground">
            Your notes are being kept on this device. Create a private account to keep them safe across devices.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="paper" onClick={onDismiss}>
            Not now
          </Button>
          <Button
            type="button"
            variant="note"
            onClick={() => {
              onJoin();
              router.navigate({ to: "/account" });
            }}
          >
            Create private account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
