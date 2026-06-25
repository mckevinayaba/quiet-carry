import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { categories } from "@/lib/note-data";

const BASE_URL = "https://thenoteyouneeded.today";

interface SitemapEntry {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/feelings", changefreq: "weekly", priority: "0.9" },
          { path: "/today", changefreq: "daily", priority: "0.8" },
          { path: "/collections", changefreq: "monthly", priority: "0.8" },
          { path: "/volume-1", changefreq: "monthly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          { path: "/support", changefreq: "monthly", priority: "0.7" },
          // Each feeling/category has its own dedicated, unique-content page —
          // these are the actual content pages search engines should index.
          ...categories.map((category) => ({
            path: `/note/${category.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((entry) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${entry.path}</loc>`,
            entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : null,
            entry.priority ? `    <priority>${entry.priority}</priority>` : null,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
