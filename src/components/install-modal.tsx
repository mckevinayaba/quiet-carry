import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { isIOS, isSamsungInternet, markInstallAccepted, markInstallDismissed } from "@/lib/pwa-install";
import type { DeferredInstallPrompt } from "@/lib/pwa-install";

interface InstallModalProps {
  open: boolean;
  onClose: () => void;
  onPromptUsed?: () => void;
  afterKeptNote?: boolean;
  deferredPrompt: DeferredInstallPrompt | null;
}

export function InstallModal({
  open,
  onClose,
  onPromptUsed,
  afterKeptNote,
  deferredPrompt,
}: InstallModalProps) {
  const [showFallback, setShowFallback] = useState(false);

  // Detect platform once on first render — stable within a session
  const ios = typeof window !== "undefined" ? isIOS() : false;
  const samsung = typeof window !== "undefined" ? isSamsungInternet() : false;

  const body = afterKeptNote
    ? "This note is now on your shelf. Add The Note to your phone so the words are close when the day gets heavy."
    : "Keep a quiet place for the words you may need again.";

  async function handleInstall() {
    if (!deferredPrompt) return;
    console.log("[PWA] install prompt clicked — calling native prompt");
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`[PWA] user choice: ${outcome}`);
      if (outcome === "accepted") {
        markInstallAccepted();
      } else {
        markInstallDismissed();
      }
      onPromptUsed?.();
      onClose();
    } catch (err) {
      console.log("[PWA] prompt() threw — showing fallback instructions", err);
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

  // ── iOS Safari ──────────────────────────────────────────────────────────────
  if (ios) {
    console.log("[PWA] fallback instructions shown (iOS Safari)");
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
              To add The Note to your iPhone, tap{" "}
              <strong className="text-foreground">Share</strong>, then{" "}
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

  // ── Android/desktop: native prompt available ────────────────────────────────
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

  // ── Manual fallback — no native prompt (or prompt() threw) ─────────────────
  const androidInstruction = samsung
    ? "To add The Note to your phone, tap the browser menu, then choose Add page to or Add to Home screen."
    : "To add The Note to your phone, tap the browser menu, then choose Install app or Add to Home screen.";

  console.log("[PWA] fallback instructions shown (no native prompt)");

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
        <div className="space-y-3">
          <div className="paper-panel space-y-2">
            <p className="eyebrow-copy">{samsung ? "Samsung Internet" : "On Android"}</p>
            <p className="text-sm leading-6 text-muted-foreground">{androidInstruction}</p>
          </div>
          <div className="paper-panel space-y-2">
            <p className="eyebrow-copy">On iPhone</p>
            <p className="text-sm leading-6 text-muted-foreground">
              To add The Note to your iPhone, tap{" "}
              <strong className="text-foreground">Share</strong>, then{" "}
              <strong className="text-foreground">Add to Home Screen</strong>.
            </p>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            Open this site in your phone browser and choose{" "}
            <strong className="text-foreground">Add to Home Screen</strong> from the browser menu.
          </p>
        </div>
        <Button variant="paper" onClick={handleNotNow} className="w-full">
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}
