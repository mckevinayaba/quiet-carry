// Kill-switch service worker for The Note You Needed Today.
// The previous SW cached HTML/assets aggressively and left installed PWAs
// hanging on stale chunks. This replacement wipes its own caches, takes
// control of open clients, reloads them once, and unregisters itself.
// Keep this file at /sw.js for at least one release cycle so returning
// browsers actually pick it up and evict the old registration.

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const names = await caches.keys();
        // Only delete this app's own caches (origin-scoped). Leave any
        // third-party messaging worker caches alone.
        const ours = names.filter((n) => n.startsWith("tnynyt-"));
        await Promise.allSettled(ours.map((n) => caches.delete(n)));
        await self.clients.claim();
        const clients = await self.clients.matchAll({ type: "window" });
        await Promise.allSettled(clients.map((c) => c.navigate(c.url)));
      } finally {
        await self.registration.unregister();
      }
    })(),
  );
});

// Pass everything through to the network — never serve from cache.
self.addEventListener("fetch", () => {});
