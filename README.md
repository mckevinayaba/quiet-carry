# The Note You Needed Today

A private-first emotional language platform that helps people find words for what they carry quietly.

**Live (private beta):** https://quiet-words-today.lovable.app/  
**Repository:** [mckevinayaba/quiet-carry](https://github.com/mckevinayaba/quiet-carry)

---

## What this is

The Note You Needed Today is not a quote page. It is not social media. It is not therapy. It is not a generic journaling app.

It exists for the space between feeling something deeply and not having the words for it. Users choose a feeling, receive a quietly written note, and can keep it, send it to someone softly, or write a private reflection from it. Everything happens on-device by default — no public profile, no followers, no performance.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/start) 1.167 (SSR + file-based routing) |
| Router | [TanStack Router](https://tanstack.com/router) 1.168 (type-safe, file-based) |
| UI | React 19 + [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Styling | Tailwind CSS 4.2 with custom CSS variables |
| Backend | [Supabase](https://supabase.com/) (PostgreSQL, anon-insert RLS) |
| Analytics | [Plausible](https://plausible.io/) (privacy-respecting, opt-in via env vars) |
| Guest state | `localStorage` only — notes, reflections, shelf never leave the device |
| Deployment | [Lovable](https://lovable.dev/) → Cloudflare Workers (Nitro) |

---

## Install and run

This project uses **bun** as its primary package manager (see `bun.lock`). npm also works.

```bash
# Install
bun install
# or: npm install

# Development server
bun run dev
# or: npm run dev

# Production build
bun run build
# or: npm run build

# Preview production build locally
bun run preview
# or: npm run preview

# Lint
bun run lint
```

---

## Environment variables

Create a `.env` file at the project root. **Never commit `.env` to version control.**

### Required — Supabase (client-side)

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-public-key>
```

These are the public anon credentials. Safe to expose in the browser — all access is controlled by Row Level Security. See [SUPABASE_SECURITY.md](./SUPABASE_SECURITY.md).

### Required — Supabase (server-side only)

```env
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-secret-key>
```

> **Warning:** The service role key bypasses all RLS and grants full database access. It must only be used in `.server.ts` files and must never be assigned to a `VITE_`-prefixed variable. It is never included in the client bundle.

### Optional — Plausible analytics

```env
VITE_PLAUSIBLE_DOMAIN=thenoteyouneededtoday.com
VITE_ENABLE_PLAUSIBLE=true
```

Analytics fire only when **both** variables are set and the build is in production mode. If either is missing, all `trackEvent()` calls are silent no-ops. In development, events are always logged to `console.info` only and never sent to Plausible. See [ANALYTICS.md](./ANALYTICS.md).

---

## Project structure

```
src/
├── routes/                   # Pages (file-based routing)
│   ├── index.tsx             # Landing page
│   ├── feelings.tsx          # Category picker
│   ├── note.$categorySlug.tsx# Note reader
│   ├── write.$categorySlug.tsx # Reflection journal
│   ├── shelf.tsx             # Private saved notes
│   ├── collections.tsx       # Volume 1 waitlist
│   ├── account.tsx           # Account placeholder
│   ├── support.tsx           # Safety guidance
│   └── __root.tsx            # Root shell, head, error boundary
│
├── components/
│   ├── app-layout.tsx        # Nav + page shell
│   ├── app-modals.tsx        # Waitlist, feedback, account prompt dialogs
│   ├── route-error.tsx       # Route-level error + not-found components
│   ├── note-card.tsx         # Note display card
│   ├── receipt-block.tsx     # FROM/TO/DATE/TOTAL receipt metaphor
│   ├── reflection-editor.tsx # Private writing editor
│   ├── shelf-item.tsx        # Shelf list item
│   ├── category-card.tsx     # Feeling category card
│   ├── collection-card.tsx   # Collection product card
│   └── ui/                   # shadcn/ui primitives
│
├── lib/
│   ├── note-data.ts          # Note content, categories, collections (hardcoded)
│   ├── note-storage.ts       # localStorage guest state (shelf, reflections, sent)
│   ├── waitlist.ts           # Waitlist + feedback Supabase inserts + throttle
│   ├── analytics.ts          # Typed event system + Plausible adapter
│   └── utils.ts              # Tailwind merge utility
│
├── integrations/supabase/
│   ├── client.ts             # Public Supabase client (anon key)
│   ├── client.server.ts      # Admin Supabase client (service role — server only)
│   └── types.ts              # Auto-generated DB type definitions
│
└── styles.css                # Global styles, CSS variables, design tokens

supabase/
└── migrations/               # SQL migration files applied to Supabase

public/                       # Static assets
```

---

## Data model

| Data | Where it lives | Who can read it |
|---|---|---|
| Note content (10 notes) | Hardcoded in `note-data.ts` | Everyone |
| Category definitions (10) | Hardcoded in `note-data.ts` | Everyone |
| Collections (5 entries) | Hardcoded in `note-data.ts` | Everyone |
| Kept notes | `localStorage` (`tnynyt-kept-notes`) | Device only |
| Sent notes | `localStorage` (`tnynyt-sent-notes`) | Device only |
| Reflections | `localStorage` (`tnynyt-reflections`) | Device only |
| Guest action count | `localStorage` (`tnynyt-guest-meta`) | Device only |
| Submission throttle timestamps | `localStorage` (`tnynyt-last-*-submit`) | Device only |
| Waitlist entries | Supabase `waitlist` table | Admin only (service role) |
| Feedback messages | Supabase `feedback` table | Admin only (service role) |
| Analytics events | Plausible (when enabled) | Plausible dashboard only |

Notes, reflections, and shelf data never leave the user's device. There is no server-side sync yet.

---

## Security

See [SUPABASE_SECURITY.md](./SUPABASE_SECURITY.md) for the full RLS policy reference.

Summary:
- Anonymous users may **insert** waitlist and feedback entries only
- Anonymous users may **not** read, update, or delete any row in either table
- The service role key must never appear in client code or `VITE_`-prefixed variables
- Reflection text is never sent to analytics
- Feedback text is never sent to analytics
- Email addresses are never sent to analytics
- All analytics payloads are sanitised through an allowlist before leaving the browser

---

## Known placeholders

| Feature | Status |
|---|---|
| Private accounts | Coming soon — waitlist open |
| Cloud shelf sync (notes, reflections) | Coming soon — depends on auth |
| Payments / Volume 1 purchase | Not live — waitlist only, no Selar page yet |
| Social footer links (Instagram, Facebook, LinkedIn) | Not active — brand accounts not set up |
| "Find support near me" (Support page) | Coming soon — crisis line list being prepared |
| "Save as Wallpaper" | Not implemented |
| Real custom domain | TBC |

---

## Recommended next steps (private beta)

1. **Private beta with 10–20 real users** — observe flows, read feedback submissions
2. **Set up real social accounts** and update footer links
3. **Point a real domain** and update Plausible + Open Graph config
4. **Create Volume 1 Selar product page** and link it from Collections
5. **Route-level QA pass** on all 8 routes with the new error boundaries
6. **Auth + cloud shelf** — only after beta feedback confirms it is needed and how
