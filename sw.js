// Stale-while-revalidate: the cached copy answers right away, even on a slow
// network or offline, and the network refreshes it for the next visit.
const CACHE = "typewriter-v8";
const ASSETS = [
  "./",
  "index.html",
  "app-style.css",
  "favicon.svg",
  "favicon-dark.svg",
  "manifest.webmanifest",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches
      .keys()
      .then(keys =>
        // The origin (19h47.github.io) is shared with other projects: only
        // this app's old caches go.
        Promise.all(
          keys
            .filter(key => key.startsWith("typewriter-") && key !== CACHE)
            .map(key => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", e => {
  const { request } = e;
  if (
    request.method !== "GET" ||
    new URL(request.url).origin !== location.origin
  ) {
    return;
  }
  e.respondWith(
    caches
      .match(request, { ignoreSearch: true })
      .then(cached => cached ?? fetch(request)),
  );
  e.waitUntil(
    caches
      .open(CACHE)
      .then(cache => cache.add(request))
      .catch(() => {}),
  );
});
