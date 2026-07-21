import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export interface EmailLogRow {
  id: string;
  created_at: string;
  recipient_email: string;
  template_name: string;
  status: string;
  error_message: string | null;
}

export interface EmailStats {
  totalSubscribers: number;
  activeSubscribers: number;
  sent: number;
  pending: number;
  dlq: number;
  suppressed: number;
}

export const getEmailStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<EmailStats> => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const [subRes, logRes] = await Promise.all([
      supabaseAdmin.from("daily_subscribers").select("active", { count: "exact" }),
      supabaseAdmin.from("email_send_log").select("status"),
    ]);

    const subscribers = subRes.data ?? [];
    const logs = logRes.data ?? [];

    const count = (s: string) => logs.filter((r) => r.status === s).length;

    return {
      totalSubscribers: subscribers.length,
      activeSubscribers: subscribers.filter((r) => r.active).length,
      sent: count("sent"),
      pending: count("pending"),
      dlq: count("dlq"),
      suppressed: count("suppressed"),
    };
  },
);

export const getEmailLog = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      page: z.number().int().min(0).default(0),
      status: z.string().optional(),
    }),
  )
  .handler(async ({ data }): Promise<{ rows: EmailLogRow[]; total: number }> => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const PAGE_SIZE = 25;
    const from = data.page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabaseAdmin
      .from("email_send_log")
      .select("id, created_at, recipient_email, template_name, status, error_message", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (data.status && data.status !== "all") {
      query = query.eq("status", data.status);
    }

    const { data: rows, count } = await query;

    return { rows: (rows ?? []) as EmailLogRow[], total: count ?? 0 };
  });
