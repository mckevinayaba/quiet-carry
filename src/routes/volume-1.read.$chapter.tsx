import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { VolumeReader } from "@/components/volume-reader/VolumeReader";
import { getChapter } from "@/data/volume1";

export const Route = createFileRoute("/volume-1/read/$chapter")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [{ title: "Volume 1 | The Note You Needed Today" }],
  }),
  component: ChapterPage,
});

function ChapterPage() {
  const { chapter: chapterParam } = Route.useParams();
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  const chapterNumber = parseInt(chapterParam, 10);
  const chapter = getChapter(chapterNumber);

  // Gate check — localStorage is unavailable during SSR so we always start null.
  useEffect(() => {
    const isUnlocked = localStorage.getItem("volume1_unlocked") === "true";
    if (!isUnlocked) {
      navigate({ to: "/volume-1/unlock" });
    } else {
      setUnlocked(true);
    }
  }, [navigate]);

  // Invalid chapter number — redirect to chapter 1.
  useEffect(() => {
    if (unlocked && (!chapter || isNaN(chapterNumber))) {
      navigate({ to: "/volume-1/read/$chapter", params: { chapter: "1" } });
    }
  }, [unlocked, chapter, chapterNumber, navigate]);

  // Show nothing during SSR / gate check to prevent flash.
  if (!unlocked || !chapter) return null;

  return (
    <AppLayout className="pb-0">
      <VolumeReader chapter={chapter} chapterNumber={chapterNumber} />
    </AppLayout>
  );
}
