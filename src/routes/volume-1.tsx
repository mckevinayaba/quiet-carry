import { createFileRoute, Outlet } from "@tanstack/react-router";

import { RouteErrorBoundary } from "@/components/route-error";

export const Route = createFileRoute("/volume-1")({
  errorComponent: RouteErrorBoundary,
  component: () => <Outlet />,
});
