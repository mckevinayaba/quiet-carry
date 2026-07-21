// Public quiet-letter signup endpoint.
// Inserts the subscriber and enqueues the confirmation email via Lovable Emails.
// No auth required — callable from the marketing site.

import * as React from "react";
import { render } from "@react-email/render";
import { createClient } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";
import { TEMPLATES } from "@/lib/email-templates/registry";

const SITE_NAME = "quiet-words-today";
const SENDER_DOMAIN = "notify.thenoteyouneeded.today";
const FROM_DOMAIN = "thenoteyouneeded.today";
const TEMPLATE_NAME = "quiet-letter-confirmation";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const Route = createFileRoute("/api/public/quiet-letter-subscribe")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseUrl || !serviceKey) {
          console.error("[quiet-letter-subscribe] missing env");
          return json({ ok: false, error: "server_misconfigured" }, 500);
        }

        let email = "";
        try {
          const body = await request.json();
          email = String(body?.email ?? "").trim().toLowerCase();
        } catch {
          return json({ ok: false, error: "invalid_json" }, 400);
        }

        if (!email || !EMAIL_RE.test(email)) {
          return json({ ok: false, error: "invalid_email" }, 400);
        }

        const supabase = createClient(supabaseUrl, serviceKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });

        // 1. Insert subscriber (23505 = already subscribed → treat as success, still send confirmation)
        const { error: insertError } = await supabase
          .from("daily_subscribers")
          .insert({ email });
        if (insertError && insertError.code !== "23505") {
          console.error("[quiet-letter-subscribe] insert failed", insertError);
          return json({ ok: false, error: "insert_failed" }, 500);
        }

        // 2. Suppression check — respect users who unsubscribed previously
        const { data: suppressed } = await supabase
          .from("suppressed_emails")
          .select("id")
          .eq("email", email)
          .maybeSingle();
        if (suppressed) {
          return json({ ok: true, suppressed: true });
        }

        // 3. Unsubscribe token (reuse or create)
        let unsubscribeToken: string;
        const { data: existing } = await supabase
          .from("email_unsubscribe_tokens")
          .select("token, used_at")
          .eq("email", email)
          .maybeSingle();

        if (existing && !existing.used_at) {
          unsubscribeToken = existing.token;
        } else {
          unsubscribeToken = generateToken();
          await supabase
            .from("email_unsubscribe_tokens")
            .upsert(
              { token: unsubscribeToken, email },
              { onConflict: "email", ignoreDuplicates: true },
            );
          const { data: stored } = await supabase
            .from("email_unsubscribe_tokens")
            .select("token")
            .eq("email", email)
            .maybeSingle();
          if (stored?.token) unsubscribeToken = stored.token;
        }

        // 4. Render template + enqueue
        const template = TEMPLATES[TEMPLATE_NAME];
        if (!template) {
          console.error("[quiet-letter-subscribe] template missing");
          return json({ ok: false, error: "template_missing" }, 500);
        }
        const element = React.createElement(template.component, {});
        const html = await render(element);
        const text = await render(element, { plainText: true });
        const subject =
          typeof template.subject === "function" ? template.subject({}) : template.subject;

        const messageId = crypto.randomUUID();
        const idempotencyKey = `quiet-letter-confirm-${email}`;

        await supabase.from("email_send_log").insert({
          message_id: messageId,
          template_name: TEMPLATE_NAME,
          recipient_email: email,
          status: "pending",
        });

        const { error: enqueueError } = await supabase.rpc("enqueue_email", {
          queue_name: "transactional_emails",
          payload: {
            message_id: messageId,
            to: email,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject,
            html,
            text,
            purpose: "transactional",
            label: TEMPLATE_NAME,
            idempotency_key: idempotencyKey,
            unsubscribe_token: unsubscribeToken,
            queued_at: new Date().toISOString(),
          },
        });

        if (enqueueError) {
          console.error("[quiet-letter-subscribe] enqueue failed", enqueueError);
          await supabase.from("email_send_log").insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: email,
            status: "failed",
            error_message: "Failed to enqueue email",
          });
          // Subscriber row is saved; surface partial success so UI stays calm.
          return json({ ok: true, queued: false });
        }

        return json({ ok: true, queued: true });
      },
    },
  },
});
