import { getCategoryBySlug, type NoteEntry } from "@/lib/note-data";
import { buildShareText } from "@/lib/share";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PresetId = "A" | "B" | "C" | "D" | "E" | "F";
export type ContentMode = "full" | "excerpt" | "carousel_required";
export type LayoutType =
  | "private_text"
  | "whatsapp_status"
  | "story_9_16"
  | "square_post"
  | "linkedin_portrait"
  | "pinterest_pin";

// ─── Preset definitions ───────────────────────────────────────────────────────

export interface PresetDefinition {
  id: PresetId;
  label: string;
  sub: string;
  layoutType: LayoutType;
  aspectRatio: string | null;
  ratio: string | null;          // display string e.g. "9:16"
  refWidth: number;              // preview canvas width in px
  outputWidth: number;
  outputHeight: number;
  maxChars: number;              // safe text budget
  carouselThreshold: number;     // above this length: carousel recommended
  showHeart: boolean;
  showMAD: boolean;
  showDomain: boolean;
}

export const PRESET_DEFINITIONS: Record<PresetId, PresetDefinition> = {
  A: {
    id: "A", label: "Send Quietly", sub: "WhatsApp · SMS · Email",
    layoutType: "private_text",
    aspectRatio: null, ratio: null, refWidth: 0,
    outputWidth: 0, outputHeight: 0,
    maxChars: 9999, carouselThreshold: 9999,
    showHeart: false, showMAD: false, showDomain: true,
  },
  B: {
    id: "B", label: "WhatsApp Status", sub: "Vertical story",
    layoutType: "whatsapp_status",
    aspectRatio: "9/16", ratio: "9:16", refWidth: 272,
    outputWidth: 1080, outputHeight: 1920,
    maxChars: 480, carouselThreshold: 750,
    showHeart: true, showMAD: true, showDomain: true,
  },
  C: {
    id: "C", label: "Instagram Story", sub: "Vertical story",
    layoutType: "story_9_16",
    aspectRatio: "9/16", ratio: "9:16", refWidth: 272,
    outputWidth: 1080, outputHeight: 1920,
    maxChars: 480, carouselThreshold: 750,
    showHeart: true, showMAD: true, showDomain: true,
  },
  D: {
    id: "D", label: "Instagram Square", sub: "Square post",
    layoutType: "square_post",
    aspectRatio: "1/1", ratio: "1:1", refWidth: 336,
    outputWidth: 1080, outputHeight: 1080,
    maxChars: 260, carouselThreshold: 420,
    showHeart: true, showMAD: true, showDomain: true,
  },
  E: {
    id: "E", label: "LinkedIn Portrait", sub: "Editorial portrait",
    layoutType: "linkedin_portrait",
    aspectRatio: "4/5", ratio: "4:5", refWidth: 304,
    outputWidth: 1080, outputHeight: 1350,
    maxChars: 380, carouselThreshold: 620,
    showHeart: false, showMAD: true, showDomain: true,
  },
  F: {
    id: "F", label: "Pinterest Pin", sub: "Tall poster",
    layoutType: "pinterest_pin",
    aspectRatio: "2/3", ratio: "2:3", refWidth: 256,
    outputWidth: 1000, outputHeight: 1500,
    maxChars: 540, carouselThreshold: 850,
    showHeart: true, showMAD: true, showDomain: true,
  },
};

/** Ordered list for UI preset selectors. */
export const PRESETS: PresetDefinition[] = Object.values(PRESET_DEFINITIONS);

/** Preset IDs that support PNG download. */
export const DOWNLOADABLE_PRESETS: PresetId[] = ["B", "C", "D", "E", "F"];

// ─── Render plan ──────────────────────────────────────────────────────────────

export interface RenderPlan {
  presetId: PresetId;
  preset: PresetDefinition;
  contentMode: ContentMode;
  mainText: string;
  title: string;
  categoryLabel: string;
  layoutWarnings: string[];
}

// ─── Engine ───────────────────────────────────────────────────────────────────

/** Truncate text at the cleanest natural boundary near maxChars. */
export function truncateAtBoundary(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const candidate = text.slice(0, maxChars);
  const lastNewline = candidate.lastIndexOf("\n");
  const lastPeriod  = candidate.lastIndexOf(".");
  const lastSpace   = candidate.lastIndexOf(" ");
  const natural = Math.max(lastNewline, lastPeriod);
  const cut = natural > 40 ? natural : lastSpace;
  return (cut > 0 ? candidate.slice(0, cut + 1) : candidate).trimEnd() + "…";
}

/**
 * Return the best text for a visual canvas:
 *   1. socialExcerpt if it exists and fits within budget + small grace
 *   2. mainText truncated to budget
 */
export function getBestVisualText(note: NoteEntry, maxChars: number): string {
  if (note.socialExcerpt) {
    if (note.socialExcerpt.length <= maxChars) return note.socialExcerpt;
    // Truncate socialExcerpt rather than falling back to mainText —
    // it has been crafted to read well even when cut.
    return truncateAtBoundary(note.socialExcerpt, maxChars);
  }
  return truncateAtBoundary(note.mainText, maxChars);
}

function resolveContentMode(note: NoteEntry, preset: PresetDefinition): ContentMode {
  const sourceLen = (note.socialExcerpt ?? note.mainText).length;
  if (sourceLen <= preset.maxChars) return "full";
  if (sourceLen > preset.carouselThreshold) return "carousel_required";
  return "excerpt";
}

export function buildRenderPlan(note: NoteEntry, presetId: PresetId): RenderPlan {
  const preset = PRESET_DEFINITIONS[presetId];
  const contentMode = resolveContentMode(note, preset);
  const mainText = getBestVisualText(note, preset.maxChars);
  const categoryLabel = getCategoryBySlug(note.categorySlug)?.title ?? note.categorySlug;

  const warnings: string[] = [];
  if (contentMode === "carousel_required") {
    warnings.push(
      `Note is ${(note.socialExcerpt ?? note.mainText).length} chars — exceeds carousel threshold (${preset.carouselThreshold}). Showing best excerpt; carousel recommended for full note.`,
    );
  } else if (contentMode === "excerpt") {
    warnings.push(
      `Note uses excerpt mode (${(note.socialExcerpt ?? note.mainText).length} chars > ${preset.maxChars} limit).`,
    );
  }

  return { presetId, preset, contentMode, mainText, title: note.title, categoryLabel, layoutWarnings: warnings };
}

// ─── Text formatters ──────────────────────────────────────────────────────────

export const PRODUCT_URL = "https://thenoteyouneeded.today/";
export const PRODUCT_DOMAIN = "thenoteyouneeded.today";

export function formatBrandedShareText(note: NoteEntry): string {
  return buildShareText(note.sendableText);
}

export function formatSocialCaption(note: NoteEntry): string {
  return [
    "The Note You Needed Today",
    "",
    note.title,
    "",
    "Find words for what you carry quietly:",
    PRODUCT_URL,
    "",
    "#TheNoteYouNeededToday #SmallNotesForQuietThings",
  ].join("\n");
}

export function buildFilename(note: NoteEntry, presetId: PresetId): string {
  const noteSlug = note.id.replace(/^note-/, "");
  const presetSlug: Record<PresetId, string> = {
    A: "private-text",
    B: "whatsapp-status",
    C: "instagram-story",
    D: "instagram-square",
    E: "linkedin-portrait",
    F: "pinterest-pin",
  };
  return `the-note-you-needed-today-${noteSlug}-${presetSlug[presetId]}.png`;
}
