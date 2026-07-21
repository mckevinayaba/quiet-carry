import { useEffect, useRef, useState } from "react";
import { AtSign, Briefcase, Camera, Link2, Mail, MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export type ShareContext = "note" | "today" | "volume1" | "feelings" | "homepage";

export interface ShareNoteProps {
  noteTitle: string;
  wallpaperLine: string;
  caption: string;
  url?: string;
  context: ShareContext;
  /** When true, render trigger as a full-width left-aligned action button (note page style) */
  asActionButton?: boolean;
}

const TRIGGER_LABELS: Record<ShareContext, string> = {
  note: "Send this quietly →",
  today: "Send today’s note →",
  volume1: "Share Volume 1 →",
  feelings: "Share this space →",
  homepage: "Share The Note →",
};

export function ShareNote({
  noteTitle,
  wallpaperLine,
  caption,
  url,
  context,
  asActionButton = false,
}: ShareNoteProps) {
  const [open, setOpen] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy link");
  const [instagramLabel, setInstagramLabel] = useState("Copy for Instagram");
  const [instagramHint, setInstagramHint] = useState(false);

  const resolvedUrl =
    url ??
    (typeof window !== "undefined"
      ? window.location.href
      : "https://thenoteyouneeded.today");

  const line = wallpaperLine || "Find words for what you carry quietly.";
  const resolvedCaption =
    caption ||
    `From The Note You Needed Today.\nFind words for what you carry quietly.\n${resolvedUrl}`;

  const whatsappText = `${line}\n\n${resolvedUrl}\n\nFrom The Note You Needed Today.\nFind words for what you carry quietly.`;
  const tweetText = `${line} — from @TheNoteNeeded`;
  const emailSubject = `${noteTitle} — The Note You Needed Today`;
  const emailBody = `${line}\n\n${resolvedUrl}\n\nFrom The Note You Needed Today. Find words for what you carry quietly.`;

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Lock body scroll while panel is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function handleOpen() {
    setOpen(true);
    trackEvent("share_panel_opened", { context });
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(resolvedUrl);
      setCopyLabel("Link copied");
      trackEvent("share_option_clicked", { context, option: "copy_link" });
      setTimeout(() => setCopyLabel("Copy link"), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  async function handleCopyCaption() {
    try {
      await navigator.clipboard.writeText(resolvedCaption);
      setInstagramLabel("Caption copied");
      setInstagramHint(true);
      trackEvent("share_option_clicked", { context, option: "instagram" });
      setTimeout(() => {
        setInstagramLabel("Copy for Instagram");
        setInstagramHint(false);
      }, 4000);
    } catch {
      // clipboard unavailable
    }
  }

  const options: Array<{
    key: string;
    icon: typeof Mail;
    label: string;
    hint?: string;
    href?: string;
    onClick?: () => void;
  }> = [
    {
      key: "whatsapp",
      icon: MessageSquare,
      label: "Send on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
    },
    {
      key: "copy_link",
      icon: Link2,
      label: copyLabel,
      onClick: handleCopyLink,
    },
    {
      key: "twitter",
      icon: AtSign,
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(resolvedUrl)}`,
    },
    {
      key: "instagram",
      icon: Camera,
      label: instagramLabel,
      hint: instagramHint
        ? "Paste this into your Instagram caption. Add the link in your bio."
        : undefined,
      onClick: handleCopyCaption,
    },
    {
      key: "linkedin",
      icon: Briefcase,
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resolvedUrl)}`,
    },
    {
      key: "email",
      icon: Mail,
      label: "Send by email",
      href: `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
    },
  ];

  const itemClass =
    "flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-left text-foreground transition-colors hover:bg-muted/40";

  return (
    <>
      {/* Trigger */}
      {asActionButton ? (
        <button
          type="button"
          onClick={handleOpen}
          className="flex min-h-14 w-full items-start justify-start gap-3 rounded-none border border-border bg-card px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
        >
          <MessageSquare className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span className="flex flex-col items-start gap-0.5">
            <span>{TRIGGER_LABELS[context]}</span>
            <span className="text-xs text-muted-foreground">
              Send softly, without noise
            </span>
          </span>
        </button>
      ) : (
        <Button variant="paper" onClick={handleOpen} className="min-h-11">
          {TRIGGER_LABELS[context]}
        </Button>
      )}

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      />

      {/* Panel — bottom sheet on all sizes, centered on sm+ */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Send this quietly"
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 overflow-y-auto rounded-t-2xl border border-border bg-card shadow-2xl transition-transform duration-300 ease-out",
          "sm:inset-x-auto sm:left-1/2 sm:bottom-6 sm:-translate-x-1/2 sm:w-full sm:max-w-sm sm:rounded-2xl",
          open
            ? "translate-y-0 sm:translate-y-0 pointer-events-auto"
            : "translate-y-full sm:translate-y-[calc(100%+1.5rem)] pointer-events-none",
        )}
      >
        <div className="space-y-4 p-6 pb-8 sm:pb-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-display text-2xl leading-tight text-foreground">
                Send this quietly
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">
                No explanation needed. Just a note, from you to them.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="mt-1 shrink-0 rounded-full p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          {/* Options */}
          <ul className="space-y-0.5" role="list">
            {options.map((opt) => {
              const Icon = opt.icon;
              const inner = (
                <>
                  <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="flex flex-col gap-0.5">
                    <span>{opt.label}</span>
                    {opt.hint ? (
                      <span className="text-xs leading-5 text-muted-foreground">{opt.hint}</span>
                    ) : null}
                  </span>
                </>
              );

              if (opt.href) {
                return (
                  <li key={opt.key}>
                    <a
                      href={opt.href}
                      target={opt.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className={itemClass}
                      onClick={() =>
                        trackEvent("share_option_clicked", { context, option: opt.key })
                      }
                    >
                      {inner}
                    </a>
                  </li>
                );
              }

              return (
                <li key={opt.key}>
                  <button type="button" onClick={opt.onClick} className={itemClass}>
                    {inner}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
