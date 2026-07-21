## What's actually happening

The "Sending..." state is not a UI bug — the signup call is failing on the sending side and the button never gets a clean success.

What I confirmed:
- The `subscribe-daily-letter` edge function is live and inserts into `daily_subscribers` fine.
- But every real send is failing at Resend with `422 validation_error: Invalid to field. Please use our testing email address instead of domains like example.com` — Resend is in **test mode** because `thenoteyouneeded.today` is not verified in the Resend account.
- It can't be verified there either: the email subdomain `notify.thenoteyouneeded.today` is already NS-delegated to Lovable Emails (which is fully set up and verified on this project). Resend and Lovable can't both own DNS on the same subdomain.
- Your test address (`mckevin.ayaba@gmail.com`) never even reached the function in the logs, so on the published site the call is also being dropped before/around that Resend call — either hanging on the fetch or blocked mid-flight. Either way, the current path can't deliver a confirmation email.

The current architecture also conflicts with the stack rules for this project (TanStack Start apps should not use Supabase edge functions for app-internal sends; Lovable Emails is the supported path and it's already provisioned here).

## The fix

Move the quiet-letter signup onto Lovable Emails, which is already verified on `notify.thenoteyouneeded.today`, and retire the Resend edge function.

### Steps

1. **Scaffold app email infrastructure** (idempotent — safe if already partially there): ensures the queue, send route, unsubscribe route, and template registry exist.
2. **Add a `quiet-letter-confirmation` React Email template** under `src/lib/email-templates/`, matching the current copy ("You are on the quiet list…", MAD signature). Register it in the template registry.
3. **Replace the signup endpoint** with a public TanStack server route at `src/routes/api/public/quiet-letter-subscribe.ts` that:
   - Validates the email.
   - Inserts into `daily_subscribers` using the admin client (treating unique-violation as success, same as today).
   - Enqueues the `quiet-letter-confirmation` template through the internal Lovable send route, with an idempotency key derived from the email.
   - Returns `{ ok: true }` even if enqueue fails (so the subscriber is still saved), and logs the error.
4. **Update `src/lib/daily-letter.ts`** to `fetch` that new `/api/public/quiet-letter-subscribe` endpoint instead of calling `supabase.functions.invoke("subscribe-daily-letter")`. Keep the 8s timeout and the same `SubscribeResult` shape so `DailyLetterSignup` doesn't need to change.
5. **Delete `supabase/functions/subscribe-daily-letter/`** so the Resend path is gone.
6. **Verify end to end**: submit the form from the preview, confirm a row in `daily_subscribers`, and confirm a `sent` row in `email_send_log` for the `quiet-letter-confirmation` template. If Resend/`RESEND_API_KEY` secret is no longer referenced anywhere, note that it can be removed.

### Out of scope

- The daily letter *sending* cron (`send-daily-note`) — separate flow, not touched here.
- Any redesign of the signup card. Copy and layout stay identical.
- Volume 1 unlock, feedback, waitlist — all untouched.

### Why this fixes "stays like that"

The button only clears when the request returns. The new endpoint runs entirely inside the app's own runtime (no cross-origin edge function, no Resend account dependency), returns quickly after the DB insert, and email delivery happens asynchronously through the already-verified Lovable Emails queue — so the UI reliably flips from "Sending…" to "You are on the quiet list."
