import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/safety-support")({
  loader: () => {
    throw redirect({ to: "/support", replace: true });
  },
  component: () => null,
});
