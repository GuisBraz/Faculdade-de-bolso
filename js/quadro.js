/* FACULDADE DE BOLSO · janelinhas das oficinas
   1) Cola: toque numa caixinha de fórmula → explicação de cada termo (dados/cola-explica.js).
   2) Lista resolvida: botão "Ver no quadro" → a resolução escrita linha por linha, como no quadro.
   Uso: <script src="../../dados/cola-explica.js"></script><script src="../../js/quadro.js" data-materia="fis1"></script>
        FDB_QUADRO.lista('#probBox', [{titulo, tag, enun, secoes:[{h, passos:[], resp}]}]) */
(function () {
  const ME = document.currentScript, MAT = ME && ME.dataset.materia;
  const RM = matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- fontes e estilo ---------- */
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
.fdbq-bd{overflow:auto;padding:18px 22px 26px;overscroll-behavior:contain}
/* quadro */
.fdbq-board{font-family:Kalam,"Segoe Print","Comic Sans MS",cursive;font-size:1.12rem;line-height:1.65}
.fdbq-board .h{font-family:Caveat,Kalam,cursive;font-weight:700;font-size:1.75rem;line-height:1.1;color:var(--c1,#E2591B);margin:14px 0 4px}
.fdbq-board .h:first-child{margin-top:0}
.fdbq-board .en{color:var(--ink2,#4B5C71);border-left:3px solid var(--c2,#0E8A82);padding:2px 0 2px 12px;margin:0 0 8px;font-size:1.02rem}
.fdbq-board .ln{margin:3px 0 3px 4px;padding-left:22px;position:relative}
.fdbq-board .ln::before{content:counter(q) ".";counter-increment:q;position:absolute;left:0;color:var(--c2,#0E8A82);font-weight:700}
.fdbq-board .sec{counter-reset:q}
.fdbq-board .ans{display:inline-block;margin:8px 0 4px 4px;padding:6px 14px;border:2.5px solid var(--c1,#E2591B);border-radius:8px;background:color-mix(in srgb,var(--c1,#E2591B) 9%,transparent);font-weight:700;color:var(--c1,#E2591B);font-size:1.22rem;transform:rotate(-.4deg)}
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
@media (max-width:640px){.fdbq-bg{padding:0;align-items:flex-end}.fdbq{border-radius:14px 14px 0 0;max-height:92vh}.fdbq-bd{padding:14px 16px 22px}.fdbq-terms{grid-template-columns:minmax(56px,38%) 1fr;gap:8px 10px}.fdbq-board{font-size:1.04rem}}
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
  function abrirQuadro(q) {
    const b = document.createElement('div'); b.className = 'fdbq-board';
    let h = '<div class="h w">' + (q.titulo || 'Resolução') + '</div>';
    if (q.enun) h += '<div class="en w">' + q.enun + '</div>';
    (q.secoes || []).forEach(s => {
      h += '<div class="sec">' + (s.h ? '<div class="h w">' + s.h + '</div>' : '') +
        (s.passos || []).map(p => '<div class="ln w">' + p + '</div>').join('') +
        (s.resp ? '<div><span class="ans w">' + s.resp + '</span></div>' : '') + '</div>';
    });
    b.innerHTML = vec(h);
    const bg = janela(q.tag || 'Resolução', b, '<button class="re" type="button">↻ Escrever de novo</button><button class="tu" type="button">Mostrar tudo</button>');
    bg.querySelector('.re').onclick = () => { bg.querySelector('.fdbq-bd').scrollTop = 0; escrever(b) };
    bg.querySelector('.tu').onclick = () => escrever(b, true);
    requestAnimationFrame(() => escrever(b));
  }
  function lista(sel, itens) {
    const box = typeof sel === 'string' ? document.querySelector(sel) : sel; if (!box) return;
    box.querySelectorAll('details.qitem').forEach((det, i) => {
      const q = itens[i]; if (!q) return; const body = det.querySelector('.body'); if (!body || body.querySelector('.fdbq-btn')) return;
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
        abrirQuadro({ titulo: 'Exemplo resolvido', tag: (eb ? eb.textContent.split('·')[0].trim() + ' · ' : '') + (h2 ? h2.textContent.split(':')[0].trim() : 'Exemplo'),
          enun: q ? q.innerHTML : '', secoes: [{ passos: lis, resp: ans ? ans.innerHTML : '' }] });
      };
      btns.appendChild(bt);
    });
  }
  window.FDB_QUADRO = { lista, abrirQuadro, abrirCola, fechar, exemplos };
  const ini = () => { ligarCola(); exemplos(); const L = window.FDB_QLISTA; if (L) lista(L.sel, L.itens) };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ini); else ini();
})();
