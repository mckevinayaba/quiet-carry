import { createFileRoute, redirect } from "@tanstack/react-router";

import { RouteErrorBoundary } from "@/components/route-error";
import { featuredNote } from "@/lib/note-data";

export const Route = createFileRoute("/today")({
  loader: () => {
    throw redirect({
      to: "/note/$categorySlug",
      params: { categorySlug: featuredNote.categorySlug },
    });
  },
  errorComponent: RouteErrorBoundary,
  component: () => null,
});
