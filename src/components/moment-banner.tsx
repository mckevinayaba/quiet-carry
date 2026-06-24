import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { bannerByTimeOfDay, getTimeOfDay } from "@/data/momentPhrases";

// Ambient, time-of-day banner. No dismiss, no storage — it simply appears
// and scrolls away with the page. Resolved client-side only since it
// depends on the visitor's local clock.
export function MomentBanner() {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    setText(bannerByTimeOfDay[getTimeOfDay()]);
  }, []);

  if (!text) return null;

  return (
    <div className="py-3 text-center">
      <p className="font-display text-base italic leading-snug text-muted-foreground sm:text-lg">
        {text}
      </p>
      <Link
        to="/today"
        className="mt-1 inline-block text-xs text-muted-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
      >
        Read today&apos;s note for this moment →
      </Link>
    </div>
  );
}
