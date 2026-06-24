// Content for the Quiet Daily Delivery system.
// Banner text, mood-selector phrases, and email subject rotation.
// Kept out of JSX so copy can be updated without touching components.

export type TimeOfDay = "morning" | "midday" | "evening" | "night";

export const bannerByTimeOfDay: Record<TimeOfDay, string> = {
  morning: "For the mornings that feel heavier before they feel lighter.",
  midday: "For the long middle of a day that started hard.",
  evening: "For the evenings that arrive before you are ready to stop.",
  night: "You are still here. That is the whole note tonight.",
};

export function getTimeOfDay(date: Date = new Date()): TimeOfDay {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "midday";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
}

export interface MoodOption {
  value: string;
  label: string;
  phrase: string;
  showSupportLink?: boolean;
}

export const moodOptions: MoodOption[] = [
  {
    value: "okay-just-heavy",
    label: "Okay, just heavy",
    phrase: "For the version of you that woke up already carrying something.",
  },
  {
    value: "long-day",
    label: "Long day",
    phrase: "You have been carrying this since morning.\nYou are allowed to put it down for a moment.",
  },
  {
    value: "difficult-day",
    label: "Difficult day",
    phrase: "For the day that was harder than anyone around you knew.",
  },
  {
    value: "terrible-day",
    label: "Terrible day",
    phrase: "For the kind of day that changes the shape of the week.",
  },
  {
    value: "staying-is-hard",
    label: "Staying is hard",
    phrase: "This is not a good day. You do not have to pretend it is.\nYou just have to stay.",
    showSupportLink: true,
  },
];

// Daily email subject rotation. Keyed by JS Date.getDay() (0 = Sunday).
export const dailyEmailSubjectByDay: Record<number, string> = {
  0: "For the quiet before the week begins again.",
  1: "For the mornings that feel heavier before they feel lighter.",
  2: "Before the day asks anything of you, this is for you.",
  3: "For the version of you that woke up already carrying something.",
  4: "You have been carrying this since morning.",
  5: "For the long middle of a week that asked a lot.",
  6: "The week is behind you. This is for what it left.",
};
