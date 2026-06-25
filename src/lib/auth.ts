// Private account auth — Supabase magic link only. No passwords, no social
// login, no display names anywhere in this app.

import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { migrateGuestDataToAccount } from "@/lib/account-sync";

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, session: null, loading: true });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setState({ user: data.session?.user ?? null, session: data.session, loading: false });
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setState({ user: session?.user ?? null, session, loading: false });

      if (event === "SIGNED_IN" && session?.user) {
        migrateGuestDataToAccount(session.user.id);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return state;
}

// Sends a magic link. Supabase creates the account automatically on first
// use — there is no separate "sign up" step with this flow.
export async function sendMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: {
      emailRedirectTo: `${window.location.origin}/account`,
    },
  });
  return { ok: !error, error: error?.message };
}

export async function signOut() {
  await supabase.auth.signOut();
}
