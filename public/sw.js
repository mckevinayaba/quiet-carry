// Service worker for The Note You Needed Today
// Strategy:
//   Navigation (HTML)         → network-first, fall back to /offline.html
//   Hashed static assets      → cache-first (safe: fingerprinted filenames)
//   Cross-origin (fonts, etc) → network-only (never cache)
//   Supabase / analytics      → network-only

const CACHE = "tnynyt-v1";
const OFFLINE_URL = "/offline.html";

// Fingerprinted asset pattern: /assets/name-HASH.ext
const ASSET_RE = /\/assets\/[^/]+-[A-Za-z0-9_-]{7,}\.(js|css|woff2?)(\?|$)/;

// ── Install ──────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(OFFLINE_URL))
  );
  self.skipWaiting();
});

// ── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

// ── Fetch ────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET; skip cross-origin (Supabase, Plausible, Google Fonts CDN)
  if (request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  // Navigation: network-first, offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL).then(
          (r) => r ?? new Response("Offline", { status: 503 })
        )
      )
    );
    return;
  }

  // Fingerprinted static assets: cache-first (safe, immutable)
  if (ASSET_RE.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then((c) => c.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Everything else (icons, manifest, sw.js itself): network-only
});
