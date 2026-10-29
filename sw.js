/* FACULDADE DE BOLSO · service worker (app instalável + uso offline do que já foi aberto)
   Páginas e scripts: rede primeiro (sempre a versão nova), cache se estiver offline.
   Nada do Supabase (outro domínio) passa por aqui. */
const V = 'fdb-v1';
const BASE = ['./', 'index.html', 'js/hub.js', 'js/boot.js', 'js/anki.js', 'js/vendor/supabase-2.117.3.js',
  'dados/materias.js', 'dados/cartas.js', 'dados/config.js', 'manifest.webmanifest', 'icons/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(BASE)).then(() => self.skipWaiting())) });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())) });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  const img = /\.(png|jpe?g|svg|webp|gif|woff2?)$/i.test(u.pathname);
  if (img) { e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); return res }))); return }
  e.respondWith(fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(V).then(x => x.put(r, c)) } return res })
    .catch(() => caches.match(r).then(m => m || (r.mode === 'navigate' ? caches.match('index.html') : Response.error()))));
});
