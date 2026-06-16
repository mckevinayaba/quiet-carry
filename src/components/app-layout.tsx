import { BookHeart, House, Layers2, NotebookPen, UserRound } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home", icon: House },
  { to: "/feelings", label: "Carry", icon: BookHeart },
  { to: "/shelf", label: "Shelf", icon: NotebookPen },
  { to: "/collections", label: "Collections", icon: Layers2 },
  { to: "/account", label: "Account", icon: UserRound },
] as const;

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen pb-28">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 pb-4 pt-4 sm:px-6">
        <Link to="/" className="stitched-label max-w-[15rem] text-center text-xs sm:text-sm">
          The Note You Needed Today
        </Link>
        <Link className="eyebrow-copy" to="/support">
          Before you go further
        </Link>
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
