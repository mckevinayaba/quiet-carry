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
    <section className="paper-panel space-y-6 p-6 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="space-y-3">
          <span className="eyebrow-copy">A morning ritual</span>
          <h2 className="text-balance font-display text-3xl leading-tight text-foreground sm:text-4xl">
            Come here before you text &ldquo;I&rsquo;m fine&rdquo; again.
          </h2>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            One quiet note each morning. No marketing. No tracking. Just the words you needed.
          </p>
        </div>

        <div className="space-y-3 lg:min-w-[22rem]">
          {status === "done" ? (
            <p className="text-base leading-7 text-foreground">
              You are on the quiet list.
              <br />
              <span className="text-sm text-muted-foreground">
                Check your inbox for a short confirmation.
              </span>
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                autoComplete="email"
                required
              />
              <Button
                type="submit"
                variant="note"
                className="min-h-12 w-full"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send me the quiet letter"}
              </Button>
            </form>
          )}

          {status === "error" ? (
            <p className="text-sm text-destructive">
              Something did not go through. Please try again, or email thenoteyouneededtoday@gmail.com.
            </p>
          ) : null}

          <p className="text-xs leading-5 text-muted-foreground">
            One email each morning. No noise. No public profile. Unsubscribe any time.
          </p>
        </div>
      </div>
    </section>
  );
}
