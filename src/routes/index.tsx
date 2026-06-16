import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";

export const Route = createFileRoute("/")({
  component: () => <AppLayout>Hello</AppLayout>,
});
