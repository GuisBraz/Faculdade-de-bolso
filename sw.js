/* FACULDADE DE BOLSO · service worker (app instalável + uso offline do que já foi aberto)
   Páginas e scripts: rede primeiro (sempre a versão nova); cache se estiver offline ou se a rede demorar demais.
   Nada do Supabase (outro domínio) passa por aqui. */
const V = 'fdb-v67';
const BASE = ['./', 'index.html', 'js/hub.js', 'js/boot.js', 'js/anki.js', 'js/aviso.js', 'js/vendor/supabase-2.117.3.js',
  'dados/materias.js', 'dados/cartas.js', 'dados/config.js', 'dados/aulas.js', 'css/fdb-v2.css', 'js/fdb-ui.js', 'manifest.webmanifest', 'icons/logo-icon-192.png', 'js/tema.js?v=1', 'js/so-login.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(BASE)).then(() => self.skipWaiting())) });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())) });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  const img = /\.(png|jpe?g|svg|webp|gif|woff2?)$/i.test(u.pathname);
  if (img) { e.respondWith(caches.match(r).then(m => { const net = fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(V).then(x => x.put(r, c)) } return res }).catch(() => m); return m || net })); return }
  if (u.pathname.endsWith('/versao.json')) return;
  /* rede primeiro, mas sem ficar preso: se a rede passar do limite e houver cópia guardada, usa a cópia
     (a rede continua e atualiza o cache para a próxima vez) */
  const nav = r.mode === 'navigate';
  const net = fetch(nav ? r : new Request(r, { cache: 'no-cache' })).then(res => { if (res.ok) { const c = res.clone(); caches.open(V).then(x => x.put(r, c)) } return res });
  e.waitUntil(net.catch(() => {}));
  e.respondWith(new Promise(ok => {
    let feito = false; const fim = x => { if (!feito) { feito = true; ok(x) } };
    const t = setTimeout(() => caches.match(r).then(m => { if (m) fim(m) }), nav ? 3000 : 2500);
    net.then(res => { clearTimeout(t); fim(res) })
      .catch(() => caches.match(r).then(m => fim(m || (nav ? caches.match('index.html') : Response.error()))));
  }));
});
