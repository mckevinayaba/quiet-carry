import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { AppLayout } from "@/components/app-layout";
import { RouteErrorBoundary } from "@/components/route-error";
import { Volume1FeaturedCard } from "@/components/volume1-featured-card";
import { CollectionTeaserCard, type CollectionTeaser } from "@/components/collection-teaser-card";
import { trackEvent } from "@/lib/analytics";
import { volumeOneSelarUrl } from "@/lib/note-data";

export const Route = createFileRoute("/collections")({
  errorComponent: RouteErrorBoundary,
  head: () => ({
    links: [{ rel: "canonical", href: "https://thenoteyouneeded.today/collections" }],
    meta: [
      { title: "Collections | The Note You Needed Today" },
      {
        name: "description",
        content: "Volume 1 and deeper collections for the things people carry quietly.",
      },
      { property: "og:title", content: "Collections | The Note You Needed Today" },
      {
        property: "og:description",
        content: "Volume 1 and deeper collections for the things people carry quietly.",
      },
    ],
  }),
  component: CollectionsPage,
});

const TEASERS: CollectionTeaser[] = [
  {
    id: "words-that-stayed",
    title: "The Words That Stayed",
    tagline: "For the sentences that broke something in you.",
    teasers: [
      "For the thing someone said that you still hear at 2am.",
      "For the apology that never came and the part of you still waiting.",
      "For the version of you that still flinches.",
    ],
  },
  {
    id: "distance-healing",
    title: "Distance Is Also Healing",
    tagline: "For boundaries, silence, and taking your presence back.",
    teasers: [
      "For the people you had to leave to survive.",
      "For the guilt of finally choosing yourself.",
      "For the silence that isn't cold — it's necessary.",
    ],
  },
  {
    id: "body-remembers",
    title: "The Body Remembers",
    tagline: "For anxiety, grief, fear, and survival that live beneath the skin.",
    teasers: [
      "For the mornings your chest is heavy before you even open your eyes.",
      "For the grief that lives in your shoulders and your jaw.",
      "For the body that kept going when the mind wanted to stop.",
    ],
  },
  {
    id: "days-you-almost-gave-up",
    title: "For the Days You Almost Gave Up",
    tagline: "For starting over, regret, identity, and remembering who you are.",
    teasers: [
      "For the version of you that crawled through years you don't talk about.",
      "For starting over at an age you didn't plan.",
      "For the quiet bravery nobody around you sees.",
    ],
  },
];

function CollectionsPage() {
  return (
    <AppLayout className="pb-8">
      <CollectionsInner />
    </AppLayout>
  );
}

function CollectionsInner() {
  const volume1Ref = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const el = volume1Ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setShowStickyBar(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        className="-mx-4 px-4 pt-20 pb-12 sm:-mx-6 sm:px-6"
        style={{ background: "#FAF6F1" }}
      >
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <span
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "12px",
              fontVariant: "small-caps",
              letterSpacing: "0.18em",
              color: "#9C8478",
            }}
          >
            Collections
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.1,
              color: "#2C2420",
            }}
          >
            Words for what the world doesn&apos;t have language for yet.
          </h1>
          <p
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "18px",
              fontStyle: "italic",
              color: "#8B7355",
            }}
          >
            Each collection is a handmade artifact — written for a specific kind of weight.
          </p>
          <div
            className="mx-auto"
            style={{ maxWidth: "680px", borderTop: "1px solid #E8DDD4", marginTop: "24px" }}
          />
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-6 py-8">
        <motion.div
          ref={volume1Ref}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          viewport={{ once: true }}
        >
          <Volume1FeaturedCard />
        </motion.div>

        {TEASERS.map((teaser, index) => (
          <motion.div
            key={teaser.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (index + 1) * 0.15 }}
            viewport={{ once: true }}
          >
            <CollectionTeaserCard teaser={teaser} />
          </motion.div>
        ))}
      </div>

      {/* Mobile sticky bar — appears while the Volume 1 card is in view, sits above the bottom nav below sm */}
      {showStickyBar && (
        <div
          className="fixed inset-x-0 bottom-[72px] z-40 sm:bottom-0 md:hidden"
          style={{
            background: "#2C2420",
            padding: "16px 24px",
          }}
        >
          <a
            href={volumeOneSelarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("volume1_purchase_clicked", { source: "collections_sticky_bar" })
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              background: "#8B6F5E",
              color: "#FAF6F1",
              borderRadius: "100px",
              padding: "14px",
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Get Volume 1 — R149 →
          </a>
        </div>
      )}
    </>
  );
}
