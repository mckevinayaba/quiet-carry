# Analytics

## Provider

[Plausible](https://plausible.io) — open source, cookie-free, GDPR compliant without consent banners. No personal data is collected, no cross-site tracking, IP addresses are anonymized server-side.

---

## Environment variables

| Variable | Required | Example | Purpose |
|---|---|---|---|
| `VITE_PLAUSIBLE_DOMAIN` | Yes (to enable) | `thenoteyouneeded.today` | The domain registered in your Plausible account |
| `VITE_ENABLE_PLAUSIBLE` | Yes (to enable) | `true` | Explicit opt-in flag |

Both must be set for analytics to activate. If either is missing or empty, all tracking calls are silently dropped.

Add these to your Cloudflare Workers (or Lovable deployment) environment variables. Do **not** commit them to `.env` files in version control.

---

## How to enable

1. Create a site in your [Plausible dashboard](https://plausible.io/sites).
2. Set the domain to `thenoteyouneeded.today` (the canonical root — `www` redirects here). Plausible should be registered against the root domain.
3. Add `VITE_PLAUSIBLE_DOMAIN` and `VITE_ENABLE_PLAUSIBLE=true` to your deployment environment.
4. Deploy. The Plausible script is injected into the server-rendered HTML with `defer`.

**Development** — analytics never fire in development regardless of env vars. Events are logged to `console.info` only.

---

## Events tracked

| Event | When |
|---|---|
| `note_opened` | User opens a note |
| `category_selected` | User selects an emotional category |
| `note_kept` | User saves a note to their shelf |
| `note_sent` | User shares/copies a note |
| `reflection_started` | User begins a private reflection |
| `reflection_saved` | User saves a reflection |
| `collection_clicked` | User clicks into a collection |
| `account_prompt_shown` | Account creation prompt is shown |
| `waitlist_opened` | Waitlist modal opens |
| `waitlist_submitted` | Waitlist email submitted |
| `volume_waitlist_clicked` | Volume 1 waitlist CTA clicked |
| `account_waitlist_clicked` | Account waitlist CTA clicked |
| `feedback_opened` | Feedback modal opens |
| `feedback_submitted` | Feedback submitted |

---

## Allowed event properties

Only the following metadata keys are forwarded to Plausible. All other keys are stripped by `sanitizePayload()` before any data leaves the browser.

- `noteId`
- `category`
- `categorySlug`
- `collectionId`
- `source`
- `context`
- `route`
- `actionCount`
- `from`

---

## What must never appear in analytics payloads

The following must never be added to any `trackEvent()` call as payload values, and must never be added to `SAFE_PAYLOAD_KEYS` in `src/lib/analytics.ts`:

- Reflection text
- Feedback text
- Email addresses
- Note body text or `mainText`
- `sendableText` or any note content
- Any text the user writes privately
- Any personally identifiable information

This is a hard privacy boundary. The platform is private-first by design.
