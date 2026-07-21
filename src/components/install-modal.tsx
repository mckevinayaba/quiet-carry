import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { markInstallAccepted, markInstallDismissed } from "@/lib/pwa-install";

export type DeferredInstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

interface InstallModalProps {
  open: boolean;
  onClose: () => void;
  afterKeptNote?: boolean;
  isIOS: boolean;
  deferredPrompt: DeferredInstallPrompt | null;
}

export function InstallModal({
  open,
  onClose,
  afterKeptNote,
  isIOS,
  deferredPrompt,
}: InstallModalProps) {
  const [showFallback, setShowFallback] = useState(false);

  const body = afterKeptNote
    ? "This note is now on your shelf. Add The Note to your phone so the words are close when the day gets heavy."
    : "Keep a quiet place for the words you may need again.";

  async function handleInstall() {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        markInstallAccepted();
      } else {
        markInstallDismissed();
      }
      onClose();
    } catch {
      // prompt() failed — show manual instructions instead
      setShowFallback(true);
    }
  }

  function handleNotNow() {
    markInstallDismissed();
    setShowFallback(false);
    onClose();
  }

  function handleOpenChange(next: boolean) {
    if (!next) handleNotNow();
  }

  // iOS Safari — always show manual share instructions
  if (isIOS) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl leading-none">
              Add The Note to your phone
            </DialogTitle>
            <DialogDescription className="text-base leading-7 text-muted-foreground">
              {body}
            </DialogDescription>
          </DialogHeader>
          <div className="paper-panel space-y-2">
            <p className="eyebrow-copy">On iPhone or iPad</p>
            <p className="text-sm leading-6 text-muted-foreground">
              To add The Note to your iPhone, tap the{" "}
              <strong className="text-foreground">Share icon</strong>, then tap{" "}
              <strong className="text-foreground">Add to Home Screen</strong>.
            </p>
          </div>
          <Button variant="paper" onClick={handleNotNow} className="w-full">
            Done
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  // Android / desktop with native PWA install prompt available (and not fallen back)
  if (deferredPrompt && !showFallback) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl leading-none">
              Add The Note to your phone
            </DialogTitle>
            <DialogDescription className="text-base leading-7 text-muted-foreground">
              {body}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button variant="note" onClick={handleInstall} className="w-full min-h-12">
              Add to phone
            </Button>
            <Button variant="paper" onClick={handleNotNow} className="w-full">
              Not now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Android manual fallback — no native prompt available, or prompt() threw
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl leading-none">
            Add The Note to your phone
          </DialogTitle>
          <DialogDescription className="text-base leading-7 text-muted-foreground">
            {body}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="paper-panel space-y-2">
            <p className="eyebrow-copy">On Android</p>
            <p className="text-sm leading-6 text-muted-foreground">
              To add The Note to your phone, open this site in Chrome, tap the{" "}
              <strong className="text-foreground">browser menu</strong>, then choose{" "}
              <strong className="text-foreground">Add to Home screen</strong> or{" "}
              <strong className="text-foreground">Install app</strong>.
            </p>
          </div>
          <div className="paper-panel space-y-2">
            <p className="eyebrow-copy">On iPhone</p>
            <p className="text-sm leading-6 text-muted-foreground">
              To add The Note to your iPhone, tap the{" "}
              <strong className="text-foreground">Share icon</strong>, then tap{" "}
              <strong className="text-foreground">Add to Home Screen</strong>.
            </p>
          </div>
        </div>
        <Button variant="paper" onClick={handleNotNow} className="w-full">
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}
