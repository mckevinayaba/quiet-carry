import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, NotebookPen } from "lucide-react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Button } from "@/components/ui/button";
import { notes } from "@/lib/note-data";
import {
  deleteReflectEntry,
  getReflectEntries,
  saveReflectEntry,
} from "@/lib/reflect-storage";
import type { ReflectEntry } from "@/lib/reflect-storage";

export const Route = createFileRoute("/reflect")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    meta: [
      { title: "Reflect | The Note You Needed Today" },
      {
        name: "description",
        content: "A private space to write what you are carrying. Seen by no one.",
      },
    ],
  }),
  component: ReflectPage,
});

function todaysPrompt(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return notes[dayOfYear % notes.length].journalPrompt;
}

type Mode = "home" | "writing" | "reading";

function ReflectPage() {
  const [entries, setEntries] = useState<ReflectEntry[]>([]);
  const [mode, setMode] = useState<Mode>("home");
  const [activeId, setActiveId] = useState<string | null>(null);
  const prompt = useMemo(() => todaysPrompt(), []);

  useEffect(() => {
    setEntries(getReflectEntries());
  }, []);

  const activeEntry = entries.find((entry) => entry.id === activeId) ?? null;

  const handleSave = (title: string, body: string) => {
    if (!body.trim()) {
      setMode("home");
      return;
    }
    saveReflectEntry(title, body);
    setEntries(getReflectEntries());
    setMode("home");
  };

  const handleDelete = (id: string) => {
    deleteReflectEntry(id);
    setEntries(getReflectEntries());
    setMode("home");
    setActiveId(null);
  };

  return (
    <AppLayout className="space-y-6 pb-8">
      <section className="space-y-1 py-2">
        <div className="stitched-label">Reflect</div>
      </section>

      {mode === "writing" ? (
        <WritingMode prompt={prompt} onSave={handleSave} onDiscard={() => setMode("home")} />
      ) : mode === "reading" && activeEntry ? (
        <ReadingMode
          entry={activeEntry}
          onBack={() => setMode("home")}
          onWriteNew={() => setMode("writing")}
          onDelete={() => handleDelete(activeEntry.id)}
        />
      ) : entries.length === 0 ? (
        <EmptyState onBegin={() => setMode("writing")} />
      ) : (
        <EntriesList
          entries={entries}
          onWriteNew={() => setMode("writing")}
          onRead={(id) => {
            setActiveId(id);
            setMode("reading");
          }}
        />
      )}
    </AppLayout>
  );
}

// ---------------------------------------------------------------------------
// State 1 — first visit, no entries
// ---------------------------------------------------------------------------

function EmptyState({ onBegin }: { onBegin: () => void }) {
  return (
    <section className="flex flex-col items-center gap-6 py-20 text-center">
      <NotebookPen className="size-8 text-muted-foreground/60" aria-hidden />
      <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
        Your private space.
      </h1>
      <p className="max-w-md text-base italic leading-7 text-muted-foreground">
        Nothing you write here will ever be seen by anyone else. This is yours.
      </p>
      <Button variant="note" className="min-h-12" onClick={onBegin}>
        Begin writing
      </Button>
    </section>
  );
}

// ---------------------------------------------------------------------------
// State 2 — writing mode
// ---------------------------------------------------------------------------

function WritingMode({
  prompt,
  onSave,
  onDiscard,
}: {
  prompt: string;
  onSave: (title: string, body: string) => void;
  onDiscard: () => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const today = useMemo(
    () => new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
    [],
  );

  return (
    <section className="space-y-5 py-2">
      <span className="text-xs text-muted-foreground/70">{today}</span>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Give this a name, or leave it blank."
        className="w-full border-none bg-transparent font-display text-2xl leading-tight text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
      />

      <p className="text-sm italic leading-6 text-muted-foreground/70">
        If you need a place to start: {prompt}
      </p>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write what you are carrying today."
        rows={16}
        autoFocus
        className="w-full resize-none border-none bg-transparent font-display text-lg leading-8 text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
        style={{ minHeight: "40vh" }}
      />

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
        <Button variant="note" className="min-h-11" onClick={() => onSave(title, body)}>
          Keep this privately
        </Button>
        <button
          type="button"
          onClick={onDiscard}
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Leave without saving
        </button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// State 3 — entries list
// ---------------------------------------------------------------------------

function EntriesList({
  entries,
  onWriteNew,
  onRead,
}: {
  entries: ReflectEntry[];
  onWriteNew: () => void;
  onRead: (id: string) => void;
}) {
  return (
    <section className="space-y-6 py-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Your reflections are saved on this device. Account sync is coming soon.
        </p>
        <Button variant="note" size="sm" className="min-h-9 shrink-0 text-sm" onClick={onWriteNew}>
          Write a new entry
        </Button>
      </div>

      <ul className="space-y-3">
        {entries.map((entry) => (
          <li key={entry.id} className="paper-panel flex items-center justify-between gap-4 p-4">
            <div className="space-y-1">
              <span className="block text-xs text-muted-foreground/70">
                {new Date(entry.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <p className="font-display text-lg italic leading-snug text-muted-foreground">
                {entry.title || entry.body.slice(0, 60)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRead(entry.id)}
              className="shrink-0 text-sm text-foreground underline-offset-4 hover:underline"
            >
              Read
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Reading mode — full entry
// ---------------------------------------------------------------------------

function ReadingMode({
  entry,
  onBack,
  onWriteNew,
  onDelete,
}: {
  entry: ReflectEntry;
  onBack: () => void;
  onWriteNew: () => void;
  onDelete: () => void;
}) {
  return (
    <section className="space-y-6 py-2">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> Back
      </button>

      <div className="space-y-3">
        <span className="text-xs text-muted-foreground/70">
          {new Date(entry.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        {entry.title ? (
          <h1 className="font-display text-3xl leading-tight text-foreground">{entry.title}</h1>
        ) : null}
        <p
          className="font-display text-lg leading-8 text-foreground/90"
          style={{ whiteSpace: "pre-line" }}
        >
          {entry.body}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
        <Button variant="note" className="min-h-11" onClick={onWriteNew}>
          Write a new entry
        </Button>
        <button
          type="button"
          onClick={onDelete}
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Delete this entry
        </button>
      </div>
    </section>
  );
}
