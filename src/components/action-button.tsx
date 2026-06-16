import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends ButtonProps {
  icon?: LucideIcon;
  hint?: string;
}

export function ActionButton({
  children,
  className,
  icon: Icon,
  hint,
  size = "lg",
  variant = "paper",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      className={cn("min-h-14 w-full items-start justify-start px-4 py-3 text-left", className)}
      size={size}
      variant={variant}
      {...props}
    >
      {Icon ? <Icon className="mt-0.5" aria-hidden="true" /> : null}
      <span className="flex flex-col items-start gap-0.5">
        <span>{children}</span>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </span>
    </Button>
  );
}
