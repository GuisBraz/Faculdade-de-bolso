/* FACULDADE DE BOLSO · janelinhas das oficinas
   1) Cola: toque numa caixinha de fórmula → explicação de cada termo (dados/cola-explica.js).
   2) Lista resolvida: botão "Ver no quadro" → a resolução escrita linha por linha, como no quadro.
   Uso: <script src="../../dados/cola-explica.js"></script><script src="../../js/quadro.js" data-materia="fis1"></script>
        FDB_QUADRO.lista('#probBox', [{titulo, tag, enun, secoes:[{h, passos:[], resp}]}]) */
(function () {
  const ME = document.currentScript, MAT = ME && ME.dataset.materia;
  const RM = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- fontes e estilo ---------- */
  if (!document.getElementById('fdbQKalam')) {
    const base = ME && ME.src ? new URL('../fonts/', ME.src).href : '';
    const f = document.createElement('style'); f.id = 'fdbQKalam';
    f.textContent = "@font-face{font-family:'FDB Kalam';font-weight:400;font-display:swap;src:url('" + base + "kalam-latin-400-normal.woff2') format('woff2')}@font-face{font-family:'FDB Kalam';font-weight:700;font-display:swap;src:url('" + base + "kalam-latin-700-normal.woff2') format('woff2')}";
    document.head.appendChild(f);
  }
  if (!document.getElementById('fdbQFont')) {
    const l = document.createElement('link'); l.id = 'fdbQFont'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Caveat:wght@700&display=swap'; document.head.appendChild(l);
  }
  const st = document.createElement('style'); st.textContent = `
.fdbq-bg{position:fixed;inset:0;z-index:9000;background:rgba(8,16,28,.55);display:flex;align-items:center;justify-content:center;padding:18px;opacity:0;transition:opacity .2s}
.fdbq-bg.on{opacity:1}
.fdbq{background:var(--sheet,#fff);color:var(--ink,#13233A);width:min(880px,100%);max-height:min(90vh,980px);display:flex;flex-direction:column;border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,.35);border:1px solid var(--line,#CFD9E2);transform:translateY(14px);transition:transform .25s ease;overflow:hidden}
.fdbq-bg.on .fdbq{transform:none}
.fdbq-hd{display:flex;align-items:center;gap:10px;padding:12px 14px 12px 18px;border-bottom:1px solid var(--line,#CFD9E2)}
.fdbq-hd .tg{font-family:var(--f-mono,monospace);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;background:var(--ink,#13233A);color:var(--sheet,#fff);padding:3px 9px;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:60%}
.fdbq-hd .sp{flex:1}
.fdbq-hd button{font:700 .82rem var(--f-body,system-ui);border-radius:8px;padding:7px 11px;cursor:pointer;border:1.5px solid var(--line,#CFD9E2);background:transparent;color:var(--ink,#13233A)}
.fdbq-hd button.x{border:0;font-size:1.1rem;padding:6px 10px}
.fdbq-hd .tu kbd{font:600 .66rem var(--f-mono,monospace);border:1px solid var(--line,#CFD9E2);border-bottom-width:2px;border-radius:4px;padding:1px 5px;margin-left:4px;opacity:.75}
@media (hover:none),(max-width:560px){.fdbq-hd .tu kbd{display:none}}
.fdbq-bd{overflow:auto;padding:18px 22px 26px;overscroll-behavior:contain}
/* quadro */
.fdbq-board{--ink:#0E1F38;--ink2:#55667D;--line:#C3CDD9;--sheet:#E8EDF2;--paper:#E8EDF2;--c1:#E0601A;--c2:#1E62C9;--c3:#6447BE;--ok:#22884A;--bad:#C73A2C;--f-math:'FDB Kalam',Kalam,cursive;
 font-family:'FDB Kalam',Kalam,"Segoe Print","Comic Sans MS",cursive;font-size:1.1rem;line-height:1.6;color:var(--ink);
 background-color:#E8EDF2;background-image:radial-gradient(rgba(14,31,56,.045) 1px,transparent 1.3px),radial-gradient(rgba(255,255,255,.55) 1px,transparent 1.4px),linear-gradient(165deg,#F0F3F7 0%,#E6EBF1 55%,#DEE5EC 100%);background-size:9px 9px,13px 13px,100% 100%;background-position:0 0,4px 6px,0 0;
 border:9px solid #0E1F38;border-radius:12px;box-shadow:inset 0 0 50px rgba(14,31,56,.10);padding:22px 24px 16px;text-shadow:0 0 .7px rgba(14,31,56,.35)}
.fdbq-board .t{font-weight:700;font-size:1.7rem;line-height:1.15;margin:0 0 4px}
.fdbq-board .rc{font-size:.92rem;color:var(--ink2);margin:0 0 6px}
.fdbq-board .en{color:var(--ink2);border-left:3px dashed var(--c2);padding:2px 0 2px 12px;margin:8px 0 6px;font-size:1rem}
.fdbq-board .hd{display:flex;align-items:center;gap:9px;font-weight:700;font-size:1.2rem;margin:16px 0 6px;padding-bottom:2px;border-bottom:2px dashed rgba(14,31,56,.28);width:fit-content;max-width:100%}
.fdbq-board .n{flex:none;display:inline-grid;place-items:center;width:1.45em;height:1.45em;border:2.2px solid currentColor;border-radius:50%;font-weight:700;font-size:.9em;line-height:1}
.fdbq-board .ln{margin:5px 0;padding-left:2px}
.fdbq-board .ln.nb{display:flex;gap:9px;align-items:baseline}.fdbq-board .ln.nb .n{color:var(--c1);font-size:.82em;transform:translateY(.12em)}
.fdbq-board .bx{border:1.8px dashed rgba(14,31,56,.32);border-radius:10px;padding:8px 12px;margin:8px 0}
.fdbq-board b,.fdbq-board strong{color:var(--c1)}
.fdbq-board .it{color:var(--c2);font-weight:700}
.fdbq-board .ok{color:var(--ok);font-weight:700}
.fdbq-board .ar{color:var(--ink2)}
.fdbq-board .ans{display:block;margin:12px 0 6px;padding:8px 14px;border:2.6px solid var(--c1);border-radius:10px;background:rgba(242,107,29,.08);font-weight:700;font-size:1.16rem;color:var(--ink)}
.fdbq-board .ans b,.fdbq-board .ans strong{color:var(--c1)}
.fdbq-board .mx{border-color:var(--ink)}
.fdbq-board .co{color:var(--c1)}.fdbq-board .cg{color:var(--ok)}.fdbq-board .cr{color:var(--bad)}.fdbq-board .cb{color:var(--c2)}
.fdbq-board .fm{display:inline-block;margin-left:10px;padding:0 10px;border:2px solid var(--c1);border-radius:8px;font-size:.92em;font-weight:400;color:var(--ink)}
.fdbq-board .nt{font-size:.88rem;color:var(--ink2);margin:0 0 4px;line-height:1.4}
.fdbq-board .cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin:8px 0}
.fdbq-board .cols .bx{margin:0}
.fdbq-board .bh{color:var(--c2);font-size:.95rem}
.fdbq-board .sysw{display:flex;align-items:center;flex-wrap:wrap;gap:4px 12px;margin:6px 0}
.fdbq-board .sys{border-left:2.4px solid var(--ink);border-radius:14px 0 0 14px;padding:2px 0 2px 12px;line-height:1.5}
.fdbq-board .fin{margin:10px 0 6px;padding:8px 14px;border:2.6px solid var(--c1);border-radius:10px;background:rgba(242,107,29,.08);font-weight:700;font-size:1.1rem}
.fdbq-board .hd .fm{font-size:.8em}
.fdbq-board sub,.fdbq-board sup{font-size:.7em}
.fdbq-v{position:relative;display:inline-block;padding-top:.28em;line-height:1}.fdbq-v::after{content:"";position:absolute;left:5%;right:-8%;top:.08em;height:.14em;border-top:1.6px solid currentColor;background:linear-gradient(135deg,transparent 45%,currentColor 46%,currentColor 54%,transparent 55%) right/.3em .3em no-repeat}
.fdbq-board .w{clip-path:inset(0 100% 0 0);opacity:.2}
.fdbq-board .w.go{animation:fdbqW var(--d,.7s) steps(28,end) forwards}
@keyframes fdbqW{to{clip-path:inset(0 0 0 0);opacity:1}}
.fdbq-board .w.done{clip-path:none;opacity:1;animation:none}
/* cola */
.fdbq-eq{font-family:var(--f-math,"STIX Two Text",serif);font-size:1.6rem;text-align:center;padding:10px 0 14px;border-bottom:1px dashed var(--line,#CFD9E2);margin-bottom:12px;overflow-x:auto}
.fdbq-k{font-family:var(--f-mono,monospace);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--c2,#0E8A82);font-weight:700;margin:14px 0 6px}
.fdbq-terms{display:grid;grid-template-columns:minmax(80px,max-content) 1fr;gap:8px 16px;align-items:baseline}
.fdbq-terms dt{font-family:var(--f-math,"STIX Two Text",serif);font-style:italic;color:var(--c1,#E2591B);font-size:1.12rem;text-align:right}
.fdbq-terms dd{margin:0}
.fdbq-note{background:color-mix(in srgb,var(--c3,#6D4AD6) 9%,transparent);border-left:3px solid var(--c3,#6D4AD6);padding:8px 12px;border-radius:6px;margin-top:6px}
.fdbq-ex{background:color-mix(in srgb,var(--c2,#0E8A82) 9%,transparent);border-left:3px solid var(--c2,#0E8A82);padding:8px 12px;border-radius:6px;margin-top:6px;font-family:var(--f-mono,monospace);font-size:.9rem}
/* gatilhos */
.cola .fx.fdbq-on{cursor:pointer;transition:transform .12s,box-shadow .12s}
.cola .fx.fdbq-on:hover,.cola .fx.fdbq-on:focus-visible{transform:translateY(-2px);box-shadow:0 6px 18px rgba(19,35,58,.14);outline:none;border-color:var(--c1,#E2591B)}
.cola .fx.fdbq-on::after{content:"ⓘ toque para entender";position:absolute;right:8px;bottom:6px;font-family:var(--f-mono,monospace);font-size:.62rem;color:var(--ink2,#4B5C71);opacity:.75}
.fdbq-btn{font:700 .85rem var(--f-body,system-ui);display:inline-flex;align-items:center;gap:6px;border-radius:8px;padding:8px 12px;cursor:pointer;border:1.5px solid var(--c1,#E2591B);background:transparent;color:var(--c1,#E2591B);margin:12px 0 2px}
.fdbq-btn.fdbq-mini{margin:0;padding:7px 11px}
.fdbq-btn:hover{background:var(--c1,#E2591B);color:#fff}
@media (max-width:640px){.fdbq-bd{padding:10px 10px 18px}.fdbq-board{border-width:6px;padding:16px 14px 12px}.fdbq-board .t{font-size:1.4rem}.fdbq-terms{grid-template-columns:minmax(56px,38%) 1fr;gap:8px 10px}.fdbq-board{font-size:1.04rem}}
/* tela cheia: o quadro ocupa a janela toda */
.fdbq-bg{padding:0;align-items:stretch}
.fdbq{width:100%;max-width:none;height:100vh;height:100dvh;max-height:none;border-radius:0;border:0}
.fdbq-bd{flex:1;padding:14px clamp(10px,2.5vw,36px) 28px}
.fdbq-board{max-width:1320px;margin:0 auto;min-height:calc(100% - 4px);font-size:clamp(1.05rem,.85rem + .55vw,1.4rem)}
.fdbq-board .t{font-size:1.55em}.fdbq-board .hd{font-size:1.12em}
.fdbq-board svg.fig{display:block;width:100%;max-width:520px;height:auto;margin:8px 0}
.fdbq-board .figr{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
.fdbq-board .figr svg.fig{max-width:360px;flex:1 1 260px}
@media (prefers-reduced-motion: reduce){.fdbq-bg,.fdbq{transition:none}.fdbq-board .w{clip-path:none;opacity:1;animation:none}}
@media print{.fdbq-bg{display:none}}`;
  document.head.appendChild(st);

  /* ---------- janela ---------- */
  let aberto = null, antes = null;
  function fechar() { if (!aberto) return; const bg = aberto; aberto = null; bg.classList.remove('on'); setTimeout(() => bg.remove(), 200); document.documentElement.style.overflow = ''; if (antes && antes.focus) antes.focus() }
  function janela(tag, corpo, extraBtns) {
    fechar(); antes = document.activeElement;
    const bg = document.createElement('div'); bg.className = 'fdbq-bg';
    bg.innerHTML = '<div class="fdbq" role="dialog" aria-modal="true" aria-label="' + tag.replace(/"/g, '') + '"><div class="fdbq-hd"><span class="tg"></span><span class="sp"></span>' + (extraBtns || '') + '<button class="x" type="button" aria-label="Fechar">✕</button></div><div class="fdbq-bd"></div></div>';
    bg.querySelector('.tg').textContent = tag;
    bg.querySelector('.fdbq-bd').appendChild(corpo);
    bg.addEventListener('click', e => { if (e.target === bg) fechar() });
    bg.querySelector('.x').onclick = fechar;
    document.body.appendChild(bg); document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => bg.classList.add('on')); aberto = bg;
    setTimeout(() => { const b = bg.querySelector('.x'); b && b.focus({ preventScroll: true }) }, 30);
    return bg;
  }
  /* Esc fecha a janela antes de a oficina usar o Esc para voltar */
  addEventListener('keydown', e => { if (e.key === 'Escape' && aberto) { e.preventDefault(); e.stopImmediatePropagation(); fechar() } }, true);
  /* Enter corta a animação do quadro e mostra tudo de uma vez */
  addEventListener('keydown', e => { if (e.key === 'Enter' && aberto && !e.repeat) { const t = aberto.querySelector('.tu'); if (t) { e.preventDefault(); e.stopImmediatePropagation(); t.click() } } }, true);

  /* ---------- 1) cola ---------- */
  const sub = h => String(h || '').replace(/([A-Za-zμσΔ])_([A-Za-z0-9áíú,]+)/g, '$1<sub>$2</sub>');
  const vec = h => String(h || '').replace(/([A-Za-z][A-Za-z0-9ᵢᵣᵤᵥₐₑₒₓₕₖₗₘₙₚₛₜ₀-₉]{0,3})\u20D7/g, '<span class="fdbq-v">$1</span>');
  const norm = s => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();
  function abrirCola(fx, d) {
    const tag = fx.querySelector('.tag').textContent.trim();
    const c = document.createElement('div');
    const eq = fx.querySelector('.eq'); const eqh = eq ? eq.innerHTML : '';
    c.innerHTML = '<div class="fdbq-eq">' + eqh + '</div>' +
      '<p style="margin:0 0 4px">' + sub(d.o) + '</p>' +
      (d.t && d.t.length ? '<div class="fdbq-k">Cada termo</div><dl class="fdbq-terms">' + d.t.map(([a, b]) => '<dt>' + sub(a) + '</dt><dd>' + sub(b) + '</dd>').join('') + '</dl>' : '') +
      (d.d ? '<div class="fdbq-k">Cuidado</div><div class="fdbq-note">' + sub(d.d) + '</div>' : '') +
      (d.e ? '<div class="fdbq-k">Exemplo rápido</div><div class="fdbq-ex">' + sub(d.e) + '</div>' : '');
    janela(tag, c);
  }
  function ligarCola() {
    const DB = (window.FDB_COLA || {})[MAT]; if (!DB) return;
    const idx = {}; Object.keys(DB).forEach(k => idx[norm(k)] = DB[k]);
    document.querySelectorAll('#v-cola .cola .fx').forEach(fx => {
      const t = fx.querySelector('.tag'); if (!t) return; const d = idx[norm(t.textContent)]; if (!d) return;
      fx.classList.add('fdbq-on'); fx.tabIndex = 0; fx.setAttribute('role', 'button'); fx.setAttribute('aria-label', 'Explicar: ' + t.textContent.trim());
      fx.addEventListener('click', () => abrirCola(fx, d));
      fx.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirCola(fx, d) } });
    });
  }

  /* ---------- 2) quadro ---------- */
  function escrever(board, tudo) {
    const ws = [...board.querySelectorAll('.w')]; let t = 0;
    ws.forEach(w => { w.classList.remove('go', 'done'); w.style.animationDelay = ''; void w.offsetWidth });
    if (tudo || RM.matches) { ws.forEach(w => w.classList.add('done')); return }
    ws.forEach(w => { const len = (w.textContent || '').length, d = Math.min(1.6, Math.max(.35, len * .022)); w.style.setProperty('--d', d + 's'); w.style.animationDelay = t + 's'; w.classList.add('go'); t += d * .85 + .12 });
    setTimeout(() => ws.forEach(w => w.classList.add('done')), (t + 2) * 1000);
  }
  /* realces de giz: "a)" azul, ✓ verde, setas suaves */
  const giz = h => String(h || '').replace(/^\s*(\(?[a-h]\))\s*/, '<span class="it">$1</span> ').replace(/✓/g, '<span class="ok">✓</span>').replace(/(→|⇒|⇔)/g, '<span class="ar">$1</span>');
  /* quadro escrito à mão (dados/quadros-*.js) */
  const tinta = h => String(h || '').replace(/«([ogrb])\|([^»]*)»/g, (m, c, t) => '<span class="c' + c + '">' + t + '</span>');
  function lousa(q, B) {
    let h = '<div class="t w">' + tinta(B.t || q.titulo || 'Resolução') + '</div>';
    if (B.r) h += '<div class="rc w">' + tinta(B.r) + '</div>';
    if (q.enun && B.en !== false) h += '<div class="en w">' + q.enun + '</div>';
    let k = 0;
    const linha = x => {
      if (typeof x === 'string') {
        if (x[0] === '#') { const [a, f] = x.slice(1).split(' | '); return '<div class="hd w"><span class="n">' + (++k) + '</span><span>' + tinta(a) + (f ? '<span class="fm">' + tinta(f) + '</span>' : '') + '</span></div>' }
        if (x[0] === '~') return '<div class="nt w">' + tinta(x.slice(1).trim()) + '</div>';
        if (x[0] === '=') return '<div class="fin w">' + tinta(x.slice(1)) + '</div>';
        return '<div class="ln w">' + tinta(x) + '</div>';
      }
      if (x.c) return '<div class="cols">' + x.c.map(col => '<div class="bx">' + col.map(l => l[0] === '*' ? '<div class="bh w">' + tinta(l.slice(1)) + '</div>' : linha(l)).join('') + '</div>').join('') + '</div>';
      if (x.s) return '<div class="sysw w"><div class="sys">' + x.s.map(l => '<div>' + tinta(l) + '</div>').join('') + '</div>' + (x.a ? '<div>' + tinta(x.a) + '</div>' : '') + '</div>';
      return '';
    };
    h += (B.b || []).map(linha).join('');
    return h;
  }
  function abrirQuadro(q) {
    const b = document.createElement('div'); b.className = 'fdbq-board';
    if (q.board) { b.innerHTML = vec(lousa(q, q.board)); return mostrar(q, b) }
    const secs = q.secoes || [];
    let h = '<div class="t w">' + (q.titulo || 'Resolução') + '</div>';
    if (q.receita) h += '<div class="rc w">' + q.receita + '</div>';
    if (q.enun) h += '<div class="en w">' + q.enun + '</div>';
    const soUma = secs.length === 1 && !secs[0].h;
    let k = 0;
    secs.forEach(s => {
      const ps = s.passos || [];
      if (soUma) h += ps.map((p, i) => '<div class="ln nb w"><span class="n">' + (i + 1) + '</span><span>' + giz(p) + '</span></div>').join('');
      else {
        if (s.h) h += '<div class="hd w"><span class="n">' + (++k) + '</span><span>' + giz(s.h) + '</span></div>';
        if (ps.length) h += '<div class="bx">' + ps.map(p => '<div class="ln w">' + giz(p) + '</div>').join('') + '</div>';
      }
      if (s.resp) h += '<div class="ans w">' + s.resp + '</div>';
    });
    b.innerHTML = vec(h); mostrar(q, b);
  }
  function mostrar(q, b) {
    const bg = janela(q.tag || 'Resolução', b, '<button class="re" type="button">↻ De novo</button><button class="tu" type="button" title="Atalho: Enter">Mostrar tudo <kbd>Enter</kbd></button>');
    bg.querySelector('.re').onclick = () => { bg.querySelector('.fdbq-bd').scrollTop = 0; escrever(b) };
    bg.querySelector('.tu').onclick = () => escrever(b, true);
    requestAnimationFrame(() => escrever(b));
  }
  function lista(sel, itens) {
    const box = typeof sel === 'string' ? document.querySelector(sel) : sel; if (!box) return;
    box.querySelectorAll('details.qitem').forEach((det, i) => {
      const q = itens[i]; if (!q) return; const QB = (window.FDB_QUADROS || {})[MAT] || {}; if (!q.board && q.key && QB[q.key]) q.board = QB[q.key]; if (!q.board && QB['L' + (i + 1)]) q.board = QB['L' + (i + 1)]; const body = det.querySelector('.body'); if (!body || body.querySelector('.fdbq-btn')) return;
      const bt = document.createElement('button'); bt.type = 'button'; bt.className = 'fdbq-btn'; bt.innerHTML = '✍️ Ver resolução no quadro';
      bt.onclick = () => abrirQuadro(q); body.insertBefore(bt, body.firstChild);
    });
  }

  /* 3) exemplos resolvidos dos módulos ([data-ex]): botão no fim de cada exemplo, lido na hora do clique */
  function exemplos() {
    document.querySelectorAll('[data-ex]').forEach((ex, i) => {
      if (ex.querySelector('.fdbq-btn') || ex.closest('#probBox,#listaBox')) return;
      const btns = ex.querySelector('.btns'); if (!btns) return;
      const bt = document.createElement('button'); bt.type = 'button'; bt.className = 'fdbq-btn fdbq-mini'; bt.innerHTML = '✍️ Ver no quadro';
      bt.onclick = () => {
        const sec = ex.closest('section'), eb = sec && sec.querySelector('.eyebrow'), h2 = sec && sec.querySelector('h2');
        const q = ex.querySelector('.q'), lis = [...ex.querySelectorAll('ol>li')].map(l => l.innerHTML), ans = ex.querySelector('.ans');
        let tit = 'Exemplo resolvido', en = q ? q.innerHTML : ''; const m = en.match(/^\s*([^:<]{2,48}):\s*([\s\S]*)$/); if (m) { tit = m[1].trim(); en = m[2] }
        const QB = (window.FDB_QUADROS || {})[MAT] || {}, brd = ex.dataset.q && QB[ex.dataset.q];
        abrirQuadro({ board: brd || null, titulo: tit, tag: (eb ? eb.textContent.split('·')[0].trim() + ' · ' : '') + (h2 ? h2.textContent.split(':')[0].trim() : 'Exemplo'),
          enun: en, secoes: [{ passos: lis, resp: ans ? ans.innerHTML : '' }] });
      };
      btns.appendChild(bt);
    });
  }
  window.FDB_QUADRO = { lista, abrirQuadro, abrirCola, fechar, exemplos };
  const ini = () => { ligarCola(); exemplos(); const L = window.FDB_QLISTA; if (L) lista(L.sel, L.itens) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ini); else ini();
})();
