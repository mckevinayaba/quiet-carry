## Goal

Send magic-link and other auth emails from your own domain (e.g. `notify@thenoteyouneeded.today`) instead of the default Lovable sender. This also fixes the deliverability question from earlier — branded sender = far less likely to land in spam.

## What you do (one click)

No email domain is currently configured for this project. You'll click the button below; it opens a small dialog where you confirm the sending subdomain. Since the domain was bought through Lovable, the NS delegation gets wired up automatically — no DNS records to copy.

<presentation-actions>
<presentation-open-email-setup>Set up email domain</presentation-open-email-setup>
</presentation-actions>

## What I do after that (automatic, same turn)

1. Provision email infrastructure (send queue, suppression list, unsubscribe tokens, processing job).
2. Scaffold the six auth email templates (magic link, email change, signup, recovery, invite, reauthentication) as branded React Email components.
3. Apply the site's warm parchment / dark-ink visual language so the emails feel like the app — not a generic system message.
4. Deploy the auth email hook so Lovable Cloud starts routing auth emails through it.

## After that

- DNS verification runs in the background (up to ~72h, usually minutes). Until it completes, auth emails keep sending via the default Lovable sender — nothing breaks.
- Once verified, every magic link arrives from your domain.
- You can monitor status anytime in Cloud → Emails.

## Not in scope (per your answer)

Transactional emails (daily letter, Selar receipts, unsubscribe page sender) stay on their current path. We can branch those onto the same domain later if you want — say the word.

## Build errors

The TypeScript errors in `src/lib/account-sync.ts` you pasted earlier are still outstanding. I'll fix those in a separate turn so this email setup stays focused — flag if you want them bundled instead.
