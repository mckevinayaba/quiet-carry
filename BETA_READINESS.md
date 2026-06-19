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
| Volume 1 CTA button | ⚠️ Placeholder | "Get Volume 1" button renders; href is #volume-1-coming-soon — swap with real Selar URL before announcing |
| Selar checkout | ❌ Not connected | Replace ctaHref in collections array in note-data.ts when Selar URL is ready |

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

## Recommended Next Step

1. Get Selar URL → swap `ctaHref` in `src/lib/note-data.ts` for `volume-1` collection
2. Email the waitlist with the Selar link
3. Write 10 more notes before any public distribution
4. Add native `beforeinstallprompt` capture after note count is above 25
