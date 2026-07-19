# Beta Readiness Checklist
## The Note You Needed Today — thenoteyouneeded.today

**Status date:** 2026-06-19  
**Stage:** Quiet public beta (no paid marketing, no press)

---

## Core Experience

| Check | Status | Notes |
|---|---|---|
| Homepage explains the product | ✅ Pass | "Find words for what you carry quietly." visible in Hero; supporting line added before category grid |
| Category grid is visible and navigable | ✅ Pass | 10 categories live on homepage and /feelings |
| Note pages load and render correctly | ✅ Pass | 11 notes live across 10 categories |
| Today's Note on homepage | ✅ Pass | featuredNote displayed with Keep / Send / Write / Read today's note |
| Keep This Note → Shelf | ✅ Pass | localStorage persistence, deduplication, scroll-to-top confirmation |
| Send this Quietly | ✅ Pass | Native share API with clipboard fallback |
| Write from This | ✅ Pass | Private reflection editor |
| Similar notes on note pages | ✅ Pass | 3 related notes shown below each note |

---

## Share and Download

| Check | Status | Notes |
|---|---|---|
| Share modal opens | ✅ Pass | Opens from "Share this Note" and "Download as Keepsake" buttons |
| Preset A — Send Quietly | ✅ Pass | Branded share text, clipboard copy |
| Preset B — WhatsApp Status | ✅ Pass | 9:16 image export, 1080×1920 |
| Preset D — Instagram Square | ✅ Pass | 1:1 image export, 1080×1080, domain visible |
| Preset FB — Facebook Post | ✅ Pass | Reuses Instagram Square canvas, facebook-post filename |
| Preset LN — LinkedIn Post | ✅ Pass | Reuses Instagram Square canvas, linkedin-post filename |
| Preset P — Full Note Keepsake | ✅ Pass | Portrait 4:5, all 4 receipt rows visible in preview |
| Domain visible on all image exports | ✅ Pass | thenoteyouneeded.today on every exported image |
| Pinterest preset | ✅ Hidden | In render engine, not in modal UI — deferred |
| Instagram Story preset | ✅ Hidden | In render engine, not in modal UI — deferred |
| Download intent routing | ✅ Pass | "Download as Keepsake" opens modal directly on Preset P |

---

## Collections and Revenue

| Check | Status | Notes |
|---|---|---|
| Collections page loads | ✅ Pass | Volume 1 + 2 coming-soon entries |
| Volume 1 CTA button | ✅ Live | All "Get Volume 1" buttons point to Selar URL via `volumeOneSelarUrl` in `src/lib/note-data.ts` |
| Selar checkout | ✅ Connected | Fallback URL `https://selar.com/9114v4su35` is live; override with `VITE_SELAR_VOLUME1_URL` env var if URL changes |
| Admin test coupon | ⬜ Required | Create 100% discount coupon inside Selar dashboard before founder test checkout — see section below |

---

## Platform

| Check | Status | Notes |
|---|---|---|
| Custom domain | ✅ Pass | thenoteyouneeded.today |
| Waitlist | ✅ Pass | Supabase-backed, email validation, throttle protection |
| Feedback form | ✅ Pass | Supabase-backed |
| Shelf (/shelf) | ✅ Pass | LocalStorage, no auth required |
| Support page (/support) | ✅ Pass | |
| Analytics | ✅ Pass | Plausible, privacy-first |
| PWA manifest | ✅ Pass | site.webmanifest exists with icons |
| Service worker | ✅ Pass | Network-first nav, cache-first assets, offline fallback |
| Native PWA install prompt | ⚠️ Partial | Manual install instructions exist; beforeinstallprompt event not captured |
| No Lovable URL on any export | ✅ Pass | All canvases verified |
| No private content in exports | ✅ Pass | Write-from-this content is never included in share assets |

---

## Content

| Check | Status | Notes |
|---|---|---|
| Note count | 11 notes | Minimum for beta; aim for 30 before broader distribution |
| Emotional range | Moderate | Current notes cover shame, grief, invisibility, people who didn't show up — financial shame, physical survival, diaspora experience not yet covered |
| Receipt fields | ✅ All 11 notes have receipt fields | Required for Preset P keepsake |

---

## Known Limitations for Beta

1. **Only 11 notes.** Not enough for a strong return-visit reason. Add 10 more before promoting the product publicly.
2. **Selar not connected.** Volume 1 CTA is a placeholder. No revenue is possible until the real Selar link is swapped in.
3. **No cloud shelf.** Kept notes are localStorage only — clearing the browser loses them. Acceptable for beta; Cloud sync is Phase 3.
4. **No native PWA install prompt.** Users can install manually via browser menu but are not prompted automatically.
5. **No daily rotation logic.** Today's Note is the `featuredNote` constant in note-data.ts — manually updated. No automatic date-based rotation yet.
6. **No social proof.** No share counts, keep counts, or testimonials visible on the platform.

---

## What Should Wait Until After Beta

| Item | Why |
|---|---|
| Auth and cloud shelf | Not needed until note count makes losing your shelf painful |
| In-app payments / Stripe | Selar handles Volume 1; no reason to build this yet |
| Email infrastructure | Build the list first, send later |
| Canva integration | Phase 2-3; validate the content first |
| Multilingual | Phase 3; English engine must be stable and proven |
| Instagram Story preset | Not visually approved — keep hidden in modal |
| Pinterest preset | Deferred; not a current priority |
| Community features, public feeds, likes | Never — violates product rules |

---

## Launch Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Selar link not live | High | Swap before any distribution |
| 11 notes feels thin | Medium | Do not run paid ads until 25+ notes are live |
| No return mechanism beyond shelf | Medium | Today's Note is on homepage; add more notes regularly |
| PWA install prompt not native | Low | Manual instructions exist; acceptable for soft beta |

---

---

## Selar Admin Test Checkout

**Purpose:** Founder/admin only. Verify the full purchase and delivery flow before launch.
Selar handles checkout, payment, coupon application, receipts, product delivery, and customer access.
No payment or coupon logic lives in the app.

### Before your test checkout

- [ ] Log into Selar dashboard
- [ ] Create the Volume 1 product if not already done
- [ ] Upload the final digital files (PDF or download link)
- [ ] Create a private 100% discount coupon (suggested code: see your private notes — do not record here)
- [ ] Set coupon to single-use or admin-only; do not publish it

### Test checkout steps

- [ ] Open the Volume 1 CTA on the live site (mobile and desktop)
- [ ] Confirm it reaches the correct Selar product page
- [ ] Apply the admin coupon at checkout
- [ ] Confirm the price becomes R0.00
- [ ] Confirm the receipt email arrives at your address
- [ ] Confirm the download or access link in the email works
- [ ] Confirm the product file opens correctly

### After a clean test

- [ ] Mark this section complete in this file
- [ ] Do not share or publish the admin coupon code
- [ ] Do not hard-code any coupon into the app

### App CTA status

All "Get Volume 1" buttons use `volumeOneSelarUrl` from `src/lib/note-data.ts`.
No coupon code appears anywhere in the app UI.
To update the Selar URL: set `VITE_SELAR_VOLUME1_URL` in your deployment environment variables,
or update `SELAR_VOLUME1_FALLBACK_URL` in `src/lib/note-data.ts`.

---

## Recommended Next Steps

1. Complete Selar admin test checkout (see section above)
2. Email the waitlist with the Selar link once test passes
3. Write 10 more notes before any public distribution
4. Add native `beforeinstallprompt` capture after note count is above 25
