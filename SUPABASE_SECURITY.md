# Supabase Security Reference

Scope: `waitlist` and `feedback` tables only.  
All other data (notes, reflections, saved shelf) is stored in `localStorage` on the user's device and never reaches Supabase.

---

## Tables

### `waitlist`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Auto-generated primary key |
| `email` | TEXT NOT NULL | Validated by DB constraint + client Zod check |
| `source` | TEXT NOT NULL | One of `'volume'`, `'account'`, `'landing'` (CHECK constraint) |
| `context` | TEXT | Optional context string |
| `user_agent` | TEXT | Browser user-agent string |
| `page_path` | TEXT | URL path at time of submission |
| `created_at` | TIMESTAMPTZ | Auto-set to `now()` |

**Unique index:** `(lower(email), source)` — same email can join multiple sources but not the same source twice. Duplicate inserts return success (23505 treated as OK in client code).

---

### `feedback`

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Auto-generated primary key |
| `message` | TEXT NOT NULL | 1–1000 chars (client + DB constraint) |
| `source` | TEXT NOT NULL | Defaults to `'app'` |
| `user_agent` | TEXT | Browser user-agent string |
| `page_path` | TEXT | URL path at time of submission |
| `event_context` | JSONB | Reserved for future structured context |
| `created_at` | TIMESTAMPTZ | Auto-set to `now()` |

---

## RLS policy summary

Row Level Security is enabled on both tables. The default PostgreSQL behavior when RLS is on is **deny all** unless a policy explicitly permits the operation.

### `waitlist`

| Operation | Role | Allowed | Policy |
|---|---|---|---|
| INSERT | `anon`, `authenticated` | ✅ Yes | `anyone can join the waitlist` — requires valid email format |
| SELECT | `anon`, `authenticated` | ❌ No | `deny public select on waitlist` (`USING (false)`) |
| UPDATE | `anon`, `authenticated` | ❌ No | `deny public update on waitlist` (`USING (false)`) |
| DELETE | `anon`, `authenticated` | ❌ No | `deny public delete on waitlist` (`USING (false)`) |
| ALL | `service_role` | ✅ Yes | Bypasses RLS — Supabase dashboard / server only |

### `feedback`

| Operation | Role | Allowed | Policy |
|---|---|---|---|
| INSERT | `anon`, `authenticated` | ✅ Yes | `anyone can leave feedback` — requires 1–4000 char message |
| SELECT | `anon`, `authenticated` | ❌ No | `deny public select on feedback` (`USING (false)`) |
| UPDATE | `anon`, `authenticated` | ❌ No | `deny public update on feedback` (`USING (false)`) |
| DELETE | `anon`, `authenticated` | ❌ No | `deny public delete on feedback` (`USING (false)`) |
| ALL | `service_role` | ✅ Yes | Bypasses RLS — Supabase dashboard / server only |

> The explicit DENY policies are belt-and-suspenders over PostgreSQL's implicit deny. They make the intent visible in the Supabase dashboard and prevent accidental future grants from opening up reads.

---

## Client vs service role separation

| Key | Exposed to browser | Where used |
|---|---|---|
| `VITE_SUPABASE_URL` | ✅ Yes (safe, public) | `client.ts` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | ✅ Yes (safe, anon key) | `client.ts` |
| `SUPABASE_URL` | ❌ Server only | `client.server.ts` |
| `SUPABASE_SERVICE_ROLE_KEY` | ❌ Server only | `client.server.ts` |

`client.server.ts` is a `.server.ts` file — TanStack Start's import protection plugin (`tanstack-start-core:import-protection`) prevents it from being included in the client bundle. The service role key never reaches the browser.

---

## What the public client can and cannot do

**Can do:**
- Insert a new waitlist entry with a valid email and known source
- Insert a feedback message of 1–1000 characters
- Receive a unique-constraint success for duplicate waitlist entries

**Cannot do:**
- Read any waitlist entries (including their own)
- Read any feedback entries (including their own)
- Update or delete any row in either table
- Access any other table from the client SDK

---

## Environment variables required

### Client-side (set in Lovable / deployment)

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-public-key>
```

### Server-side only (never expose to browser, never commit)

```
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-secret-key>
```

---

## Security warnings

1. **Never commit `.env` files.** The `.gitignore` should exclude all `.env*` files.
2. **Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code or `VITE_` prefixed variables.** The service role key bypasses all RLS and grants full database access.
3. **The anon key (`VITE_SUPABASE_PUBLISHABLE_KEY`) is safe to expose.** It is scoped to what RLS permits, which for these tables is INSERT-only.
4. **Email addresses are stored in the `waitlist` table.** They are admin-readable only. They are never returned to the client, never sent to analytics, and never logged to the browser console in production.
5. **Feedback messages are stored in the `feedback` table.** Same protections apply.
6. **Do not add SELECT operations on these tables from `waitlist.ts`.** Any admin reads must go through the service role client in a `.server.ts` file, never the public client.

---

## How to verify policies manually

In the Supabase dashboard:

1. Go to **Table Editor → waitlist → Policies**. You should see:
   - `anyone can join the waitlist` (INSERT, anon + authenticated)
   - `deny public select on waitlist` (SELECT, anon + authenticated)
   - `deny public update on waitlist` (UPDATE, anon + authenticated)
   - `deny public delete on waitlist` (DELETE, anon + authenticated)

2. Go to **Table Editor → feedback → Policies**. You should see:
   - `anyone can leave feedback` (INSERT, anon + authenticated)
   - `deny public select on feedback` (SELECT, anon + authenticated)
   - `deny public update on feedback` (UPDATE, anon + authenticated)
   - `deny public delete on feedback` (DELETE, anon + authenticated)

3. To test using the SQL editor (runs as service role — use with care):
   ```sql
   -- Should return rows (service role bypasses RLS)
   SELECT count(*) FROM public.waitlist;
   SELECT count(*) FROM public.feedback;
   ```

4. To test that anon SELECT is blocked, use the Supabase API tester or a browser console with the anon key:
   ```js
   // Should return data: [], count: 0, status: 200 with empty results
   // (RLS deny policies return empty, not an error, for SELECT)
   const { data, error } = await supabase.from('waitlist').select('*');
   ```
   Expected: `data = []` — the deny policy returns no rows rather than an error, which is correct PostgreSQL RLS behavior.

---

## Pending dashboard action

After deploying the migration `20260617000001_harden_rls_policies.sql`, run this once from the Supabase SQL editor to validate the new message length constraint against existing rows:

```sql
ALTER TABLE public.feedback VALIDATE CONSTRAINT feedback_message_max_1000;
```

This is safe to run at any time and does not lock the table.

---

## What this codebase does NOT do (scope boundary)

- No notes, categories, reflections, or saved shelf data ever reaches Supabase
- No user accounts or authentication are implemented yet
- No SELECT queries run against waitlist or feedback from the public client
- No private user text (reflection content, feedback message, email) is sent to analytics
