export const PRODUCT_URL = "https://thenoteyouneeded.today/";

/**
 * Wraps a note's sendableText in a branded share envelope.
 * Used by both the landing page and note-detail pages for
 * "Send this Quietly". Never includes private reflection text.
 *
 * TODO: Future improvement — generate downloadable/shareable branded
 * note images (PNG/JPEG) for WhatsApp, Instagram Stories, and status
 * updates so the recipient sees a beautifully formatted card instead
 * of plain text. For now, branded text + link is the MVP approach.
 */
export function buildShareText(sendableText: string): string {
  return (
    `I found this on The Note You Needed Today and thought of you.\n\n` +
    `${sendableText}\n\n` +
    `Read more notes here:\n${PRODUCT_URL}\n\n` +
    `Small notes for what people carry quietly.`
  );
}
