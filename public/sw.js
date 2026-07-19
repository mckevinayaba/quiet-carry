// Service worker for The Note You Needed Today.
//
// History: an earlier version cached aggressively and left installed PWAs
// hanging on stale chunks. A kill-switch version replaced it, evicted the
// bad caches, and forced a reload on every activation to clear them out.
// That eviction already shipped and ran — forcing a reload on every
// activation from here on was itself causing hangs/reload loops on
// installed PWAs. This version is the stable long-term worker: it takes
// over cleanly, never caches, and never forces a reload.

const CACHE_PREFIX = "tnynyt-";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // One-time safety net: if any old cache from the original (bad)
      // service worker still exists on a returning device, clear it.
      const names = await caches.keys();
      const ours = names.filter((n) => n.startsWith(CACHE_PREFIX));
      await Promise.allSettled(ours.map((n) => caches.delete(n)));
      await self.clients.claim();
      // No reload, no navigate — just take over silently.
    })(),
  );
});

// Network-only. Never serve from cache, never go stale.
self.addEventListener("fetch", () => {});
