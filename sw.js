// 更新 index.html 內容後，請把版本號 +1，離線快取才會換新。
const CACHE_VERSION = "busan-handbook-v45";

const PRECACHE_URLS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/jagalchi-locker-station-cutaway.jpg",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/apple-touch-icon.png",
  "assets/shopping/01-banila-co.jpg",
  "assets/shopping/02-fwee.jpg",
  "assets/shopping/03-mediheal-pad.jpg",
  "assets/shopping/04-mediheal-nmf.jpg",
  "assets/shopping/05-torriden.jpg",
  "assets/shopping/06-isoi.jpg",
  "assets/shopping/07-unove.jpg",
  "assets/shopping/08-longtake.jpg",
  "assets/shopping/09-cu-dubai.jpg",
  "assets/shopping/10-imint.jpg",
  "assets/shopping/11-nongshim.jpg",
  "assets/shopping/12-orion-sun.jpg",
  "assets/shopping/13-orion-potato.jpg",
  "assets/shopping/14-nobrand.jpg",
  "assets/shopping/15-orion-taiyaki.jpg",
  "assets/shopping/16-crown.jpg",
  "assets/shopping/17-binch.jpg",
  "assets/shopping/18-marketo.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) return;

  // 頁面本身走「先網路、斷線用快取」，內容更新才即時。
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put("index.html", copy));
          return response;
        })
        .catch(() => caches.match("index.html"))
    );
    return;
  }

  // 其他資源（插圖、圖示）走「先快取、沒有才抓網路」。
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
