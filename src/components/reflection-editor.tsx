import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

interface ReflectionEditorProps {
  categorySlug: string;
  excerpt: string;
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onSave: () => void;
}

export function ReflectionEditor({
  categorySlug,
  excerpt,
  prompt,
  value,
  onChange,
  onClear,
  onSave,
}: ReflectionEditorProps) {
  return (
    <div className="space-y-5">
      <section className="paper-panel space-y-3">
        <p className="eyebrow-copy">Note excerpt</p>
        <p className="font-note text-[2rem] leading-tight text-foreground">{excerpt}</p>
      </section>

      <section className="paper-panel space-y-4">
        <div className="space-y-2">
          <p className="eyebrow-copy">Prompt</p>
          <h2 className="text-balance font-display text-3xl leading-none text-foreground">{prompt}</h2>
        </div>

        <label className="sr-only" htmlFor="reflection-input">
          Private reflection
        </label>
        <textarea
          id="reflection-input"
          className="note-textarea min-h-64 w-full resize-none"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Start here. No need to make it beautiful. Just make it honest."
          value={value}
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <Button onClick={onSave} variant="note">
            Save Reflection
          </Button>
          <Button onClick={onClear} type="button" variant="paper">
            Clear
          </Button>
          <Button asChild type="button" variant="ghost">
            <Link to="/note/$categorySlug" params={{ categorySlug }}>
              Back to Note
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
