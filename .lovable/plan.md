# Custom Domain Setup Plan

## Step 1 — You: buy the domain in Lovable

1. **Project Settings → Project section → Domains** → **Buy new domain**
2. Search candidates. Suggested (in priority order):
   - `thenoteyouneededtoday.com` — matches brand name exactly, best for memorability and SEO
   - `noteyouneededtoday.com` — shorter fallback
   - `thenoteyouneeded.com` — shortest, still on-brand
   - `quietwords.co` / `quietcarry.co` — short, brandable, cheaper TLD
3. Complete purchase. Lovable auto-connects it and provisions SSL.
4. In Domains settings, set **Root (`yourdomain.com`)** as **Primary** so `www` redirects to root.

No code changes needed for the domain to start serving the site — it'll work the moment SSL provisions.

## Step 2 — Me: update the codebase once the domain is known

Tell me the domain you bought and I will, in one pass:

1. **Open Graph + Twitter metadata** (`src/routes/__root.tsx` and per-route `head()`) — replace `quiet-words-today.lovable.app` references with the new canonical URL so social shares show the right domain.
2. **Canonical tag** — add `<link rel="canonical">` pointing to the new root.
3. **`src/routes/sitemap[.]xml.ts`** — switch base URL to the new domain.
4. **`public/robots.txt`** — update the `Sitemap:` line.
5. **`README.md`** — replace the "Live (private beta)" URL.
6. **Plausible analytics** (`VITE_PLAUSIBLE_DOMAIN` in `.env`) — set to the new apex so analytics report under the real domain. Document it in README env section.
7. **JSON-LD / structured data** if present — point `url` to the new domain.
8. Verify the build is clean and the published Lovable URL still works (it keeps working alongside the custom domain).

## Step 3 — Verification (after DNS goes live)

- Visit `https://yourdomain.com` — should load the site over HTTPS
- Visit `https://www.yourdomain.com` — should 301 to root
- Share the URL in a Slack/iMessage preview to confirm OG image + title render
- Confirm Plausible (if enabled) starts recording under the new domain

## Notes

- **No DNS work on your side** — buying through Lovable means DNS is auto-configured. SSL usually provisions within minutes.
- **Email DNS (MX/SPF/DKIM/DMARC)** — only needed if you later send mail from `@yourdomain.com`. Managed under **⋯ → Configure → Manage DNS records** when ready.
- **Lovable URL stays live** — `quiet-words-today.lovable.app` continues to work; the custom domain becomes the canonical/primary.

## Open question

**What domain name do you want to buy?** Once you tell me (or buy it and share the name), I'll run Step 2 in a single build pass.
