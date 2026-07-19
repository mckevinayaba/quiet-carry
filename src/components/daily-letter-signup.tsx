import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToQuietLetter } from "@/lib/daily-letter";

export function DailyLetterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    const result = await subscribeToQuietLetter(email);
    setStatus(result.ok ? "done" : "error");
  };

  return (
    <section className="paper-panel space-y-4 p-6 sm:p-8">
      <span className="eyebrow-copy">A quiet letter, once a day</span>
      <p className="max-w-md text-base leading-7 text-muted-foreground">
        One note. Delivered to your inbox each morning. No marketing. No tracking. Just the note
        you needed.
      </p>

      {status === "done" ? (
        <p className="text-sm leading-6 text-foreground">
          You are on the quiet list. Check your inbox for a short confirmation.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="sm:max-w-xs"
            required
          />
          <Button type="submit" variant="note" className="min-h-11 shrink-0" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send me the quiet letter"}
          </Button>
        </form>
      )}

      {status === "error" ? (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again in a moment.
        </p>
      ) : null}
    </section>
  );
}
