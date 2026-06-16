import { BookHeart, House, Layers2, MessageSquareHeart, NotebookPen, UserRound } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { AppModalsProvider, useAppModals } from "@/components/app-modals";

const navItems = [
  { to: "/", label: "Home", icon: House },
  { to: "/feelings", label: "Feelings", icon: BookHeart },
  { to: "/shelf", label: "Shelf", icon: NotebookPen },
  { to: "/collections", label: "Collections", icon: Layers2 },
  { to: "/account", label: "Account", icon: UserRound },
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
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs leading-5 text-muted-foreground">
            We are building this slowly and carefully.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openFeedback}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              <MessageSquareHeart className="size-3.5" aria-hidden="true" />
              Share feedback
            </button>
            <Link className="eyebrow-copy" to="/support">
              Safety &amp; support
            </Link>
          </div>
        </div>
      </header>

      <main className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</main>

      <nav className="bottom-nav" aria-label="Primary">
        {navItems.map((item) => {
          const active = item.to === "/" ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              className={cn("bottom-nav-link", active && "bottom-nav-link-active")}
              to={item.to}
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
