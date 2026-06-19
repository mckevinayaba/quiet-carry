# Embedded Distribution Roadmap
## The Note You Needed Today

> **Strategic principle:** Do not wait for users to search for The Note.  
> Put The Note inside the emotional behaviours users already have.

---

## A. Definition

Embedded distribution means The Note travels through the actions people are already taking — not through new habits they have to build.

People already:
- Send support messages when someone is hurting
- Share WhatsApp Statuses when they feel something deeply
- Post on Instagram when a moment deserves words
- Save quotes that speak to what they carry quietly
- Write reflections in journals or notes apps
- Buy things that help them process emotion
- Install apps that matter to them
- Join communities of people who feel similarly

Embedded distribution means The Note becomes part of each of those moments. The user does not need to think "let me go to The Note You Needed Today." They are already doing the behaviour. The Note is already there.

---

## B. Product Thesis

**The Note is not only content. Each note is a distribution asset.**

Every note should be able to become:

| Form | Where it travels |
|---|---|
| Private message | WhatsApp, SMS, email, iMessage |
| WhatsApp Status image | WhatsApp Status (9:16) |
| Instagram Story | Instagram (9:16) |
| Instagram or Facebook post | Feed (4:5 portrait or 1:1 square) |
| LinkedIn reflection card | LinkedIn (4:5 portrait) |
| Pinterest pin | Pinterest (2:3 tall poster) |
| Downloadable postcard | Phone camera roll, printed |
| Caption | Copied with one tap for any post |
| Journal prompt | Write from This flow |
| Paid collection item | Selar — Volume 1 and beyond |
| Link back to the platform | Every export carries the domain |

A user who receives a WhatsApp message with one line of a note is a potential visitor. A user who sees a postcard on Instagram is a potential visitor. A user who downloads an image from the app is a distribution node.

Every exported asset must carry `thenoteyouneeded.today`. Not as noise — as a quiet attribution that invites rather than announces.

---

## C. Current State

What exists today:

| Feature | Status | Notes |
|---|---|---|
| Landing page | Live | Emotional entry point, waitlist CTA |
| Feelings index (`/feelings`) | Live | Category-based browsing |
| Note pages (`/note/:slug`) | Live | Full note, receipt, action buttons |
| Keep This Note | Live | LocalStorage shelf, no auth required |
| Send this Quietly | Live | Native share or clipboard copy |
| Write from This | Live | Private reflection editor |
| Shelf (`/shelf`) | Live | Kept notes, local only |
| Collections (`/collections`) | Live | Volume 1 listed, no purchase yet |
| Waitlist | Live | Supabase-backed |
| Feedback | Live | Supabase-backed |
| Plausible analytics | Live | Privacy-first, no personal data |
| Share modal — Preset A (private text) | Live | Branded share text |
| Share modal — Preset D (Instagram Square) | Live | html-to-image export, 1:1 |
| Share modal — Preset P (Portrait postcard) | Live | Full note, 4:5, html-to-image export |
| `/share-preview` (internal) | Live | Design preview for all presets |
| `/postcard-preview` (internal) | Live | Portrait postcard preview |
| Custom domain | Live | `thenoteyouneeded.today` |
| PWA manifest | Exists | `site.webmanifest` with icons |
| Service worker | Exists | Network-first nav, cache-first assets, offline fallback |
| Install modal | Exists | Manual instructions for Android + iPhone |
| Presets B, C, E, F | Built, marked "Coming soon" | WhatsApp Status, Instagram Story, LinkedIn, Pinterest — canvases exist in render engine but not wired to live canvas components |
| Selar connection | Not built | Collections page has placeholder CTA |
| Auth / cloud shelf | Not built | Intentionally deferred |
| Payments | Not built | Intentionally deferred |
| Email distribution | Not built | Deferred to Phase 2 |
| Canva integration | Not built | Deferred to Phase 3–4 |
| Multilingual support | Not built | Deferred to Phase 3 |

---

## D. Immediate Embedded Distribution Priorities

### Priority 1 — Fix the visual share engine

**Why first:** The share image is the primary distribution loop. Every WhatsApp message, every Instagram post, every downloaded postcard is a node that can bring a new user back to the platform. If the images are broken, cut, or visually weak, the distribution loop is broken.

Current problems to fix:
- Presets B, C, E, F are marked "Coming soon" but the render engine already has their definitions. The gap is live canvas components + export wiring.
- The Square (D) canvas works but the `portraitFontSize` bug in `share-canvases.tsx` causes a non-string error on `/share-preview` (clears on reload — pre-existing).
- The Portrait postcard (P) is now live but only tested on one note. Notes without receipt data, very long notes, and very short notes need visual QA.

**What "fixed" means:**
- All presets produce clean, readable exports with no cut text
- The domain `thenoteyouneeded.today` appears on every image
- No Lovable URL appears on any image
- No private reflection content appears in any shared asset

### Priority 2 — Make PWA install feel intentional

**Why second:** The manifest and service worker already exist. Install instructions exist in `install-modal.tsx`. But there is no proactive moment in the app that prompts the user to install. A user who installs The Note on their home screen is a retained user and a daily distribution surface.

What is missing:
- The `beforeinstallprompt` event is not being captured or used
- There is no Install button triggered by browser install eligibility
- The install modal shows manual instructions only — no native prompt on Android

### Priority 3 — Connect Volume 1 to Selar

**Why third:** The Collections page exists and Volume 1 is listed. The "Unlock" CTA goes nowhere. This is passive revenue infrastructure that is partially built but not connected.

What is needed:
- A Selar product URL for Volume 1
- Replace the placeholder CTA with a working link
- No app code changes required beyond swapping the href

### Priority 4 — Canva template pack (later)

A downloadable Canva template pack (not an app integration) allows creators to remix note content inside Canva. This is a Phase 2 distribution surface. It does not require any app changes — only a Canva template and a link from the Collections page.

### Priority 5 — Email daily note ritual (later)

A daily or weekly email with one note is a pull-back mechanism for users who found the platform but have not returned. This requires an email infrastructure decision (Resend or similar), a sending schedule, and a list of opted-in users. Phase 2.

### Priority 6 — Multilingual emotional localization (later)

Emotional language is deeply cultural. Nigerian English, Yoruba, Igbo, French West African, and other languages would expand the platform's reach significantly. This is a Phase 3 investment requiring content strategy, translation, and route handling. Do not attempt before the English-language engine is stable.

---

## E. Distribution Surfaces

| Surface | User behaviour | What The Note should provide | Build now or later |
|---|---|---|---|
| **WhatsApp direct messages** | User sends support to someone who is struggling | Branded share text with domain — one-tap copy | **Now** — Preset A is live |
| **WhatsApp Status** | User shares something that speaks to how they feel | 9:16 image (1080×1920) — Preset B | **Next** — canvas built, needs wiring |
| **Instagram Story** | User posts a story that speaks to an emotion | 9:16 image (1080×1920) — Preset C | **Next** — canvas built, needs wiring |
| **Instagram Feed (4:5)** | User posts an emotional image to their feed | 4:5 portrait postcard — Preset P (live) or Preset E | **Now** — P is live, E needs wiring |
| **Instagram Feed (square)** | User shares a shorter quote image | 1:1 square — Preset D (live) | **Now** — live |
| **Facebook Post** | User shares something emotionally resonant | Same image as Instagram — Preset D or P | **Now** — works with existing exports |
| **LinkedIn** | User shares a reflection on carrying difficulty | 4:5 portrait card — Preset E | **Next** — canvas built, needs wiring |
| **Pinterest** | User saves emotional content to a board | 2:3 tall pin — Preset F | **Next** — canvas built, needs wiring |
| **PWA home screen** | User installs app to return daily | Native install prompt + install modal | **Now** — infrastructure exists, needs prompt |
| **Selar** | User buys a collection of notes | Working checkout link to Volume 1 | **Soon** — swap placeholder CTA |
| **Email** | User receives a note they subscribed to | Daily or weekly note email | **Phase 2** |
| **Canva** | Creator remixes note into their design | Canva template pack (not app integration) | **Phase 2** |
| **Creator workflows** | Creator builds content around a note | Caption copy, multiple export formats | **Partial now** — caption copy exists |
| **Communities** | Note is shared in a group chat or forum | Same share text and images as above | **Now** — works with existing exports |
| **Workplaces** | Manager or colleague shares a note for team wellbeing | Same share text — possible B2B pack later | **Phase 4** |

---

## F. Product Rules

These rules govern everything built under embedded distribution. They are not aspirational. They are constraints.

**What The Note must never do:**
- Create public feeds of user activity
- Add likes, comments, or social reactions
- Make emotional pain performative or competitive
- Show private reflections in any public export
- Include personal data or emails in analytics
- Show a Lovable URL on any asset
- Cut note text mid-sentence in any export
- Produce broken or unreadable visual exports

**What every public share asset must do:**
- Carry the brand — kraft texture, MAD mark, typeface
- Carry the domain — `thenoteyouneeded.today`
- Be readable at mobile screen sizes
- Contain no cut text, no ellipsis overflow, no broken layout

**What every private share must feel like:**
- Intimate, not broadcast
- Safe enough to send to one specific person
- Containing no tracking pixels, no read receipts, no data collection

**What every export must guarantee:**
- Full readable text — never an excerpt unless user explicitly chooses it
- The domain as attribution — quiet, not loud
- The brand visual identity — consistent across all surfaces
- Download works on iOS, Android, and desktop

---

## G. Roadmap

### Phase 1 — Private Beta Foundation
*Focus: distribution engine works, platform is installable, first revenue*

- [ ] Fix share image engine — wire Presets B, C, E, F to live canvas components
- [ ] QA all presets across note types (with receipt, without receipt, long notes, short notes)
- [ ] Fix `portraitFontSize` bug in `share-canvases.tsx`
- [ ] Add native PWA install prompt (`beforeinstallprompt` capture)
- [ ] Connect Volume 1 on Selar — swap placeholder CTA with working link
- [ ] Launch private beta with waitlist invites

### Phase 2 — Social Distribution and Retention
*Focus: more surfaces, bring users back*

- [ ] Carousel export for long notes (multi-image for notes that exceed single-card limit)
- [ ] Canva template pack — downloadable, no app integration
- [ ] Daily note email — Resend or similar, opt-in at waitlist or note page
- [ ] Caption auto-copy improvement — pre-filled hashtags, per-note copy
- [ ] Better social proof on landing page — share counts or testimonials

### Phase 3 — Auth, Premium, and Language
*Focus: retention infrastructure, international reach*

- [ ] Auth and cloud shelf — notes saved across devices
- [ ] Premium collections — gated volumes, Selar or Stripe
- [ ] Multilingual support — Nigerian English first, then French West African
- [ ] Creator tools — note attribution, remix credit, creator page

### Phase 4 — Platform and B2B
*Focus: The Note as infrastructure for others*

- [ ] Canva app integration — notes directly in Canva editor
- [ ] Community packs — themed note bundles for WhatsApp groups
- [ ] B2B emotional care packs — for workplaces, counsellors, educators
- [ ] API or embed layer — third-party integrations

---

## H. What Not to Build Yet

| Item | Why not yet |
|---|---|
| Auth | Phase 3 — LocalStorage shelf works fine for beta |
| Payments infrastructure | Phase 1 is Selar link swap only — no in-app checkout |
| Public feeds or social graph | Never — violates product rules |
| Likes / comments | Never — violates product rules |
| Canva app integration | Phase 4 — template pack first to validate demand |
| Multilingual content | Phase 3 — English engine must be stable first |
| B2B packs | Phase 4 — consumer product must prove itself first |
| Email infrastructure | Phase 2 — wait until opt-in list is meaningful |
| Push notifications | Phase 2 minimum — must feel invited, not interrupted |

---

## I. Product Led Distribution

The Note You Needed Today must not depend on the founder posting consistently or on paid marketing to grow. The product itself must create distribution through the way people use it.

When someone reads a note and feels seen, they do not need to be asked to share it. The emotional response does the work. The product must make it effortless to let that feeling travel — and every time it travels, it must carry something that brings the next person back.

### The Distribution Loop

```
Feel something
    ↓
Choose a category
    ↓
Read a note
    ↓
Feel seen
    ↓
Keep it, write from it, or share it
    ↓
Download a branded image or send a private note
    ↓
The shared asset carries The Note You Needed Today
and thenoteyouneeded.today
    ↓
Someone else discovers the platform
    ↓
They find their own note
    ↓
The loop repeats
```

This loop does not require the founder to be the distributor. It does not require ads. It requires the product to work well enough that people want to pass it on — and that every asset they pass on silently points back.

### Product Actions and Their Distribution Effects

| Product action | Distribution effect | What must be built |
|---|---|---|
| **Keep This Note** | Creates personal habit — users return to saved notes | Shelf (live); future account sync for cross-device access |
| **Send this Quietly** | Creates private one-to-one distribution — a note sent to one person can open the platform to a new user | Branded share text with domain (live) |
| **Share this Note** | Creates public social distribution — one post can reach hundreds | Downloadable branded images, all presets reliable |
| **Copy Caption** | Reduces friction for posting — users who want to post but do not know what to write | Platform-specific captions (live); per-note captions where relevant |
| **Download PNG** | Turns notes into portable emotional assets that live in camera rolls and get re-shared | Reliable render engine — no cut text, no broken layout, domain on every image |
| **PWA Install** | Turns the platform into a daily phone habit — home screen presence drives return visits | Installable web app (manifest and service worker live; native prompt needed) |
| **Volume 1** | Turns emotional value into a paid product — buyers become advocates | Selar checkout (link swap needed; no in-app payment infrastructure required) |
| **Language selector** | Expands global reach — emotional language is cultural, not universal | Approved multilingual note translations (Phase 3; English engine must be stable first) |

### Distribution Rules

**Every public share asset must:**
- Include the brand — kraft visual identity, MAD mark, consistent typeface
- Include the domain — `thenoteyouneeded.today` on every image, every time
- Be readable at mobile screen size — no text smaller than 12px at export resolution
- Contain no cut text — truncation is a distribution failure

**Every private share must:**
- Feel intimate, not broadcast
- Be safe to send to one specific person in a moment of pain
- Contain no tracking pixels, no read receipts, no data sent to any server

**What must never enter public distribution assets:**
- Private reflections written in the Write from This editor
- Email addresses or waitlist submissions
- Feedback form text
- Any user-generated content
- Any data tied to an individual user

The emotional honesty of the notes is the distribution engine. That honesty must be protected. The moment a user feels unsafe sharing something from this platform, the loop breaks.

---

*Document created: 2026-06-19*  
*Product: The Note You Needed Today — thenoteyouneeded.today*
