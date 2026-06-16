## QA Plan: The Note You Needed Today MVP

I'll run an end-to-end QA pass with Playwright against the live preview, capture screenshots of each flow, then apply targeted fixes. No new features.

### Phase 1 — Automated QA pass (Playwright)

Drive a headless browser through every guest flow and capture screenshots + console output:

1. **Home** loads, both CTAs navigate, Today's Note renders.
2. **Feelings** lists all 10 categories, each card opens the correct note.
3. **Note page** for each of the 10 categories: title, body, receipt block (FROM/TO/DATE/TOTAL), journal prompt area, three action buttons.
4. **Keep this Note** → confirmation message → Shelf shows it under "Notes I kept" → survives page refresh.
5. **Send this Quietly** → clipboard fallback fires (headless has no Web Share) → confirmation message → appears under "Notes I sent quietly".
6. **Write from This** → `/write/:slug` loads with correct prompt → save reflection → confirmation → appears under "Reflections I wrote" → survives refresh.
7. **Account prompt** appears after 3 guest actions; "Not now" dismisses it.
8. **Collections** lists Volume 1 with price R149, Get Volume 1 links to selar.com, all 4 "coming soon" entries visible.
9. **Account page** shows trust copy + guest CTAs.
10. **Bottom nav** all 5 links work, active state shows on current route.
11. **Mobile viewport** (375×812) screenshot of each main page to verify readability, no overflow.
12. **Console**: capture and report any errors/warnings across the run.
13. **Analytics**: assert each of the 8 required `[analytics]` events fires via `console.info` interception.

### Phase 2 — Known gaps to fix (found during code review)

These are visible from the current code and will be fixed regardless of what QA surfaces:

- **Note page missing two buttons** the spec calls for:
  - "Read Similar Notes" → currently similar notes render inline as cards with no header CTA. Add a clearly-labeled jump/anchor button so the section is reachable from the action stack.
  - "Unlock Full Collection" → currently absent. Add a button linking to `/collections`.
  - "Save as Wallpaper" — spec says "if currently included". It is not implemented, so leave it out (no dead button).
- **Account page dead buttons**: "Create Private Account" and "Sign In" do nothing. Re-label as "Create Private Account (coming soon)" / "Sign In (coming soon)" and disable, per spec ("Do not let users enter a broken auth flow").
- **Home page Today's Note**: spec lists Keep / Send / Write buttons on home. Currently only "Open this note" is shown. Either add the three action buttons on home or update the home section to a single "Open this note" CTA that matches the actual UI — I'll add the three actions so the spec passes.
- **Receipt block on home**: featured note currently shows without receipt; add `<ReceiptBlock />` so home matches Note page.
- **Send-quietly copy**: spec wants "Copied. Send it to someone who may need words today." in both the share-API and clipboard paths. Currently the share-API path uses different copy. Normalize.

### Phase 3 — Fix anything QA surfaces

Anything Playwright reveals (runtime errors, broken nav, lost localStorage, missing analytics events, mobile overflow) gets fixed in the same pass.

### Phase 4 — QA report

Final reply to you will include:
- What was tested
- What was broken
- What was fixed
- What remains as placeholder / coming soon (account auth, "Save as Wallpaper")
- Known limitations (Web Share API only on supporting browsers; guest data is localStorage-only and per-device)

### Out of scope
No new features, no auth implementation, no schema changes, no redesign.