import { useState } from "react";

import { moodOptions } from "@/data/momentPhrases";

interface MoodSelectorProps {
  onSelect?: (phrase: string, showSupportLink: boolean) => void;
}

// Session-only mood signal. Not saved anywhere — it exists only to change
// how today's note lands for the person reading it right now.
export function MoodSelector({ onSelect }: MoodSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    const option = moodOptions.find((o) => o.value === value);
    if (!option) return;
    setSelected(value);
    onSelect?.(option.phrase, !!option.showSupportLink);
  };

  return (
    <section className="space-y-3 py-2">
      <span className="eyebrow-copy">Before you read</span>
      <p className="text-base leading-7 text-foreground">How are you arriving today?</p>
      <div className="flex flex-wrap gap-2">
        {moodOptions.map((option) => {
          const isActive = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              aria-pressed={isActive}
              className={[
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card/60 text-muted-foreground hover:bg-secondary hover:text-foreground",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
