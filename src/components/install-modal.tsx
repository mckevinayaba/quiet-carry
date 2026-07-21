import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeferredPrompt = (Event & { prompt: () => Promise<void> }) | null;

interface InstallModalProps {
  open: boolean;
  onClose: () => void;
  deferredPrompt?: DeferredPrompt;
}

export function InstallModal({ open, onClose, deferredPrompt }: InstallModalProps) {
  async function handleNativeInstall() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
    }
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl leading-none">
            Add The Note to your phone
          </DialogTitle>
          <DialogDescription className="text-base leading-7 text-muted-foreground">
            Keep a quiet place for the words you may need again.
          </DialogDescription>
        </DialogHeader>

        {deferredPrompt ? (
          <div className="space-y-4">
            <p className="text-sm leading-6 text-muted-foreground">
              Add this site to your home screen for quiet, offline access — no app store needed.
            </p>
            <div className="flex flex-col gap-2">
              <Button variant="note" onClick={handleNativeInstall} className="w-full">
                Add to Home Screen
              </Button>
              <Button variant="paper" onClick={onClose} className="w-full">
                Not now
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="paper-panel space-y-2">
              <p className="eyebrow-copy">On Android</p>
              <p className="text-sm leading-6 text-muted-foreground">
                Open this site in Chrome and tap <strong className="text-foreground">Install</strong> or{" "}
                <strong className="text-foreground">Add to Home Screen</strong> when prompted.
              </p>
            </div>

            <div className="paper-panel space-y-2">
              <p className="eyebrow-copy">On iPhone</p>
              <p className="text-sm leading-6 text-muted-foreground">
                Open this site in Safari, tap the{" "}
                <strong className="text-foreground">Share button</strong> (the box with an arrow), then
                choose <strong className="text-foreground">Add to Home Screen</strong>.
              </p>
            </div>

            <Button variant="paper" onClick={onClose} className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
