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
  asChild,
  ...props
}: ActionButtonProps) {
  const inner = (
    <>
      {Icon ? <Icon className="mt-0.5" aria-hidden="true" /> : null}
      <span className="flex flex-col items-start gap-0.5">
        <span>{children}</span>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </span>
    </>
  );

  const buttonClassName = cn(
    "min-h-14 w-full items-start justify-start px-4 py-3 text-left",
    className,
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ children?: React.ReactNode }>;
    const merged = React.cloneElement(child, {
      children: (
        <>
          {Icon ? <Icon className="mt-0.5" aria-hidden="true" /> : null}
          <span className="flex flex-col items-start gap-0.5">
            <span>{child.props.children}</span>
            {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
          </span>
        </>
      ),
    });
    return (
      <Button asChild className={buttonClassName} size={size} variant={variant} {...props}>
        {merged}
      </Button>
    );
  }

  return (
    <Button className={buttonClassName} size={size} variant={variant} {...props}>
      {inner}
    </Button>
  );
}
