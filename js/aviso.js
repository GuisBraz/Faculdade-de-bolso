/* FACULDADE DE BOLSO · aviso de atualização
   Quem está com o site aberto recebe um aviso quando sai uma versão nova.
   Compara versao.json (sem cache) com a versão carregada: a cada 60 s, ao voltar para a aba e ao reconectar. */
(function () {
  const SRC = (document.currentScript && document.currentScript.src) || location.href;
  const URLV = new URL('../versao.json', SRC);
  let atual = null, avisado = null;
  async function ler() {
    try { const r = await fetch(URLV.href + '?t=' + Date.now(), { cache: 'no-store' }); if (!r.ok) return null; return await r.json() } catch (e) { return null }
  }
  function css() {
    if (document.getElementById('fdbAvisoCss')) return;
    const st = document.createElement('style'); st.id = 'fdbAvisoCss';
    st.textContent = '#fdbAviso{position:fixed;left:50%;bottom:18px;transform:translate(-50%,140%);z-index:99999;max-width:min(560px,calc(100vw - 24px));background:#0f172a;color:#f8fafc;border:1px solid #334155;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.35);padding:12px 14px;display:flex;gap:12px;align-items:center;font:500 14px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;transition:transform .35s ease}' +
      '#fdbAviso.on{transform:translate(-50%,0)}#fdbAviso .tx{flex:1;min-width:0}#fdbAviso b{display:block;font-size:14px}#fdbAviso small{display:block;color:#cbd5e1;font-size:12.5px;margin-top:2px}' +
      '#fdbAviso button{font:700 13px system-ui,sans-serif;border:0;border-radius:8px;padding:8px 12px;cursor:pointer}#fdbAviso .go{background:#f97316;color:#fff}#fdbAviso .x{background:transparent;color:#cbd5e1;padding:8px}' +
      '@media (prefers-reduced-motion: reduce){#fdbAviso{transition:none}}';
    document.head.appendChild(st);
  }
  function mostrar(v) {
    css(); let el = document.getElementById('fdbAviso');
    if (!el) { el = document.createElement('div'); el.id = 'fdbAviso'; el.setAttribute('role', 'status'); el.setAttribute('aria-live', 'polite'); document.body.appendChild(el) }
    el.innerHTML = '<span aria-hidden="true" style="font-size:20px">✨</span><div class="tx"><b>O site foi atualizado</b><small></small></div><button class="go" type="button">Recarregar</button><button class="x" type="button" aria-label="Fechar aviso">✕</button>';
    el.querySelector('small').textContent = v.msg || 'Tem conteúdo novo. Recarregue para ver.';
    el.querySelector('.go').onclick = () => location.reload();
    el.querySelector('.x').onclick = () => el.classList.remove('on');
    requestAnimationFrame(() => el.classList.add('on'));
  }
  async function checar() {
    const v = await ler(); if (!v || !v.v) return;
    if (atual === null) { atual = v.v; return }
    if (v.v !== atual && v.v !== avisado) { avisado = v.v; mostrar(v) }
  }
  checar();
  setInterval(() => { if (!document.hidden) checar() }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) checar() });
  addEventListener('online', checar);
})();
