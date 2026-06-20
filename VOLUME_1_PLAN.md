# Volume 1 — Product Plan
## The Note You Needed Today, Volume 1: The Things We Do Not Say Out Loud

Internal planning document. Not user-facing.

---

## Product Title

The Note You Needed Today, Volume 1: The Things We Do Not Say Out Loud

---

## Product Promise

When life is too heavy to explain, Volume 1 gives you words you can keep, return to, and quietly share.

---

## Who It Is For

- For the person who has carried too much quietly.
- For the person who does not need another motivational quote.
- For the person who needs language that feels honest before it feels comforting.

---

## What Is Included

| Item | Count |
|------|-------|
| Designed notes | 15 |
| Mobile wallpapers | 15 |
| Quiet captions | 15 |
| Journal prompts | 15 |
| Private letters | 5 |
| Opening letter from MAD | 1 |
| Safety and care page | 1 |
| Closing receipt page | 1 |

**Visual world:** warm parchment, soft paper, stitched edges, receipt motif, open envelope feeling, MAD signature, small heart, kraft paper, navy and rust fabric accents. Handmade emotional artifact — not generic web cards.

---

## Chapter Structure

Each chapter = 1 emotional arc. Notes, wallpapers, captions, and prompts follow this arc.

| # | Chapter | Emotional Territory |
|---|---------|---------------------|
| 01 | Unsaid Grief | Loss, words that stayed, grief in habits, what was never said |
| 02 | Quiet Anger | Distance, people who watched you bleed, apologies that never came |
| 03 | Survival | Money, body, exhaustion, staying |
| 04 | Starting Over | Job loss, distance, what comes after |
| 05 | Becoming Visible | Dreams, recognition, identity, remembering who you are |

---

## Suggested Price

- **South Africa:** R149
- **Global:** $7–$9 USD

---

## Current Notes — Volume 1 Status

`volumeOneStatus` field is now in the `NoteEntry` interface. Current assignments:

### Included (15 notes)

| Note ID | Chapter |
|---------|---------|
| note-im-fine-but-not-really | Unsaid Grief |
| note-the-words-that-stayed | Unsaid Grief |
| note-grief-that-lives-in-habits | Unsaid Grief |
| note-shame-got-there-first | Unsaid Grief |
| note-family-that-hurt | Unsaid Grief |
| note-loneliness-no-one-sees | Unsaid Grief |
| note-the-pain-i-made-look-easy | Survival |
| note-money-that-never-stretched | Survival |
| note-body-is-tired | Survival |
| note-when-staying-feels-hard | Survival |
| note-distance-is-also-healing | Starting Over |
| note-job-that-ended | Starting Over |
| note-remember-who-you-are | Becoming Visible |
| note-dream-that-delayed | Becoming Visible |
| note-the-body-remembers | Survival (moved to free in final selection — see below) |

> **Note:** Quiet Anger currently has 0 included notes from the existing 20. Three new exclusive notes must be written for this chapter. Mark them `volumeOneStatus: "exclusive"` when ready.

### Free (web-only — not in Volume 1)

| Note ID | Chapter |
|---------|---------|
| note-the-apology-that-never-came | Unsaid Grief |
| note-people-who-wanted-your-fall | Becoming Visible |
| note-people-who-watched-you-bleed | Becoming Visible |
| note-marriage-that-became-a-memory | Unsaid Grief |
| note-love-that-left | Unsaid Grief |
| note-the-body-remembers | Survival |

---

## Exclusive Notes Still to Write (for Quiet Anger chapter)

Three new notes — not on the free website — written specifically for Volume 1:

Suggested emotional territory:
1. The person who did the emotional labor alone and is now done explaining why they left quietly
2. The person whose closest people watched them struggle and offered opinions instead of help
3. The person still waiting for someone to admit what they did — and realizing peace cannot wait for that

---

## Safety and Care Requirements

Every note in Volume 1 that has `emotionalIntensity: "heavy"` or `"crisisAdjacent"` must:
- Have `needsSafetyCue: true` or `safetyNote: true`
- Have a `safetyCueText` that matches the emotional territory of the note

The Volume 1 PDF/ebook must include:
- A dedicated Safety and Care page before the first note
- A link or reference to `thenoteyouneeded.today/support`
- The standard safety disclaimer:
  > "The Note You Needed Today is not therapy, medical advice, diagnosis, or crisis support. If you feel in immediate danger or cannot stay safe, contact emergency services, a local crisis line, or someone you trust now."

---

## Selar Setup Checklist

- [ ] Create Selar account at selar.co
- [ ] Set up product: "The Note You Needed Today, Volume 1"
- [ ] Set price: R149 (ZAR) + USD equivalent
- [ ] Upload product files (PDF, wallpapers, captions, prompts, private letters)
- [ ] Configure delivery email
- [ ] Copy the Selar product URL
- [ ] Replace `volumeOneSelarUrl` in `src/lib/note-data.ts`:
  ```ts
  export const volumeOneSelarUrl = "https://selar.co/YOUR-PRODUCT-SLUG";
  ```
  This single change activates the "Get Volume 1" button across the entire app.

---

## Route

`/volume-1` — created at `src/routes/volume-1.tsx`. Linked from:
- Homepage VolumeOne section ("Explore Volume 1" button)
- Collections page card (Volume 1 card)
- Footer (replaces "Private Beta" link)

---

## What Still Needs a Decision

1. **Final 15-note selection** — is the list above the right 15? Any swaps?
2. **Quiet Anger chapter** — which 3 exclusive notes get written first?
3. **note-the-body-remembers** — currently marked `free`. Swap it in for one of the 15?
4. **Selar account** — when is it being set up?
5. **Design production** — who designs the wallpapers, captions layout, and private letters?
6. **Opening letter** — MAD to write this after the structure is approved.
7. **Closing receipt page** — format TBD (likely: FROM / TO / DATE / TOTAL as emotional receipt for the whole collection).
8. **Price** — confirm R149 for ZA and $7 vs $9 for global.

---

*This document is for internal planning only. It does not appear in the app.*
