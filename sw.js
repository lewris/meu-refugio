const CACHE = "meu-refugio-v5-links-diretos";
const FILES = ["./", "./index.html", "./oracoes.html", "./terco.html", "./santos.html", "./novena.html", "./biblia.html", "./intencoes.html", "./favoritas.html", "./manifest.json", "./icon.svg"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(Promise.all([caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))), self.clients.claim()])));
self.addEventListener("fetch", e => {
 if (e.request.method !== "GET") return;
 if (e.request.mode === "navigate") {
   e.respondWith(fetch(e.request).then(r => {if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(() => caches.match(e.request).then(r=>r||caches.match("./index.html"))));
   return;
 }
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
