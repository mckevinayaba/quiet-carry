import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InstallModalProps {
  open: boolean;
  onClose: () => void;
}

export function InstallModal({ open, onClose }: InstallModalProps) {
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
        </div>

        <Button variant="paper" onClick={onClose} className="mt-1 w-full">
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}
