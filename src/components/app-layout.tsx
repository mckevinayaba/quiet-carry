import {
  BookHeart,
  House,
  Layers2,
  MessageSquareHeart,
  NotebookPen,
  Sun,
  UserRound,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { AppModalsProvider, useAppModals } from "@/components/app-modals";

// Bottom nav — 5 daily-use items. Account lives in the header.
const bottomNavItems = [
  { to: "/", label: "Home", icon: House },
  { to: "/feelings", label: "Feelings", icon: BookHeart },
  { to: "/today", label: "Today", icon: Sun },
  { to: "/shelf", label: "Shelf", icon: NotebookPen },
  { to: "/collections", label: "Collections", icon: Layers2 },
] as const;

// Desktop nav — shown at sm+ breakpoint, hidden on mobile.
const desktopNavLinks = [
  { to: "/", label: "Home" },
  { to: "/feelings", label: "Feelings" },
  { to: "/today", label: "Today" },
  { to: "/shelf", label: "Shelf" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/support", label: "Safety & Support" },
] as const;

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  return (
    <AppModalsProvider>
      <AppLayoutShell className={className}>{children}</AppLayoutShell>
    </AppModalsProvider>
  );
}

function AppLayoutShell({ children, className }: AppLayoutProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { openFeedback } = useAppModals();

  return (
    <div className="min-h-screen pb-28">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 pb-3 pt-4 sm:px-6">
        {/* Top row: brand mark + Private Beta badge */}
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="stitched-label max-w-[14rem] text-center text-xs sm:text-sm">
            The Note You Needed Today
          </Link>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-muted-foreground"
            aria-label="Private Beta"
          >
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            Private Beta
          </span>
        </div>

        {/* Second row: tagline + utility links (mobile-visible) */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs leading-5 text-muted-foreground">
            Find words for what you carry quietly.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openFeedback}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              <MessageSquareHeart className="size-3.5" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">Share feedback</span>
            </button>
            <Link className="eyebrow-copy hidden sm:inline-flex" to="/support">
              Safety &amp; Support
            </Link>
            <Link
              to="/about"
              className="text-xs text-muted-foreground hover:text-foreground sm:hidden"
            >
              About
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground sm:hidden"
            >
              <UserRound className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Desktop nav — hidden on mobile, shown at sm+ */}
        <nav
          className="hidden items-center justify-between border-t border-border pt-2 sm:flex"
          aria-label="Primary navigation"
        >
          <div className="flex items-center gap-0.5">
            {desktopNavLinks.map((item) => {
              const active =
                item.to === "/" ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <Link
            to="/account"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              pathname.startsWith("/account")
                ? "bg-primary/10 text-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
            aria-current={pathname.startsWith("/account") ? "page" : undefined}
          >
            <UserRound className="size-3.5" aria-hidden="true" />
            Account
          </Link>
        </nav>
      </header>

      <main className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</main>

      {/* Bottom nav — mobile only (hidden at sm+) */}
      <nav className="bottom-nav sm:hidden" aria-label="Primary navigation">
        {bottomNavItems.map((item) => {
          const active =
            item.to === "/" ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              className={cn("bottom-nav-link", active && "bottom-nav-link-active")}
              to={item.to}
              aria-current={active ? "page" : undefined}
              aria-label={item.label}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
