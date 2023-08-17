const CACHE_NAME = "my-website-cache-v1";
const urlsToCache = [
  "./", // Cache the root URL (index.html)
  "./css/style.css",
  "./ui.js",
  "./app.js",
  "./notes.html",
  // Add more URLs of assets you want to cache here
];

// Install the service worker and cache the static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate the service worker and remove old caches if necessary
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Intercept network requests and serve cached assets if available
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached asset if found, otherwise fetch it from the network
      return response || fetch(event.request);
    })
  );
});
