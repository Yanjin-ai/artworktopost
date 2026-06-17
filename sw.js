// Service worker: offline-capable, but always prefer fresh content when online.
const CACHE = 'artworkpost-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()).catch(()=>{}));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const isDoc = req.mode === 'navigate' || req.destination === 'document';
  if (isDoc) {
    // network-first: get updates immediately, fall back to cache offline
    e.respondWith(fetch(req).then(resp => {
      const copy = resp.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
      return resp;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
    return;
  }
  // other assets: cache-first (fonts, icons)
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(resp => {
    const copy = resp.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
    return resp;
  }).catch(() => caches.match('./index.html'))));
});
