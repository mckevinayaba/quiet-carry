import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { ShelfItem } from "@/components/shelf-item";
import { Button } from "@/components/ui/button";
import type { SavedReflection, SavedShelfNote } from "@/lib/note-storage";
import { getKeptNotes, getReflections, getSentNotes } from "@/lib/note-storage";

export const Route = createFileRoute("/shelf")({
  head: () => ({
    meta: [
      { title: "My Private Shelf" },
      {
        name: "description",
        content: "Your kept notes, private reflections, and quietly sent notes.",
      },
      { property: "og:title", content: "My Private Shelf" },
      {
        property: "og:description",
        content: "Your kept notes, private reflections, and quietly sent notes.",
      },
    ],
  }),
  component: ShelfPage,
});

function EmptyShelf() {
  return (
    <div className="paper-panel space-y-4 text-left">
      <p className="text-base leading-7 text-muted-foreground">
        Nothing here yet. When a note finds you, keep it here.
      </p>
      <Button asChild variant="note">
        <Link to="/feelings">Find a note</Link>
      </Button>
    </div>
  );
}

function ShelfPage() {
  const [activeTab, setActiveTab] = useState<"kept" | "reflections" | "sent">("kept");
  const [kept, setKept] = useState<SavedShelfNote[]>([]);
  const [sent, setSent] = useState<SavedShelfNote[]>([]);
  const [reflections, setReflections] = useState<SavedReflection[]>([]);

  useEffect(() => {
    setKept(getKeptNotes());
    setSent(getSentNotes());
    setReflections(getReflections());
  }, []);

  return (
    <AppLayout className="space-y-5 pb-8">
      <section className="space-y-3 py-2">
        <div className="stitched-label">Private by default</div>
        <h1 className="font-display text-5xl leading-none">My Private Shelf</h1>
        <p className="text-base leading-7 text-muted-foreground">
          The notes you kept because they found you.
        </p>
      </section>

      <div className="grid grid-cols-3 gap-2">
        {[
          ["kept", "Notes I kept"],
          ["reflections", "Reflections I wrote"],
          ["sent", "Notes I sent quietly"],
        ].map(([value, label]) => (
          <button
            key={value}
            className={activeTab === value ? "paper-panel text-left" : "paper-panel text-left opacity-70"}
            onClick={() => setActiveTab(value as "kept" | "reflections" | "sent")}
            type="button"
          >
            <span className="text-sm leading-5">{label}</span>
          </button>
        ))}
      </div>

      {activeTab === "kept" && (kept.length ? kept.map((item) => <ShelfItem key={item.noteId} item={item} />) : <EmptyShelf />)}

      {activeTab === "sent" &&
        (sent.length ? sent.map((item) => <ShelfItem key={item.savedAt} item={item} />) : <EmptyShelf />)}

      {activeTab === "reflections" &&
        (reflections.length ? (
          <div className="grid gap-3">
            {reflections.map((item) => (
              <article key={item.id} className="paper-panel space-y-3">
                <p className="eyebrow-copy">{item.title}</p>
                <p className="font-note text-[1.8rem] leading-none text-foreground">{item.excerpt}</p>
                <p className="line-clamp-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
                <p className="text-sm text-muted-foreground">
                  Saved {new Date(item.savedAt).toLocaleDateString()}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <EmptyShelf />
        ))}
    </AppLayout>
  );
}
