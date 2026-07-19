import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Permanently delete the calling user's auth account.
 * Rows in user_saved_notes and user_reflections cascade-delete via their FK
 * to auth.users(id) ON DELETE CASCADE.
 */
export const deleteMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(context.userId);
    if (error) {
      console.error("[deleteMyAccount] failed", error);
      throw new Error("Could not delete account. Please try again.");
    }
    return { ok: true as const };
  });
