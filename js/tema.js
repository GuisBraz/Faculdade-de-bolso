/* Faculdade de Bolso · botão de tema claro/escuro
   - carrega no <head> (sem defer) para aplicar o tema antes de pintar a página
   - guarda a escolha em localStorage ('fdb-tema' = 'light' | 'dark'); sem escolha, segue o sistema
   - no escuro forçado, copia as regras de @media (prefers-color-scheme: dark) das folhas da página */
(function () {
  var K = 'fdb-tema', d = document.documentElement, mq = matchMedia('(prefers-color-scheme: dark)');
  function ler() { try { return localStorage.getItem(K) } catch (e) { return null } }
  function gravar(v) { try { localStorage.setItem(K, v) } catch (e) { } }
  function escuro() { var t = d.getAttribute('data-theme'); return t ? t === 'dark' : mq.matches }

  var t0 = ler(); if (t0 === 'dark' || t0 === 'light') d.setAttribute('data-theme', t0);

  /* espelho das regras escuras que só existem dentro do @media */
  function espelhar() {
    var el = document.getElementById('fdb-tema-esp');
    if (d.getAttribute('data-theme') !== 'dark' || mq.matches) { if (el) el.textContent = ''; return }
    var css = [];
    [].forEach.call(document.styleSheets, function (sh) {
      if (sh.ownerNode && sh.ownerNode.id === 'fdb-tema-esp') return;
      var rs; try { rs = sh.cssRules } catch (e) { return }
      (function varre(lista) {
        [].forEach.call(lista || [], function (r) {
          if (r.type === 4 && /prefers-color-scheme\s*:\s*dark/.test(r.conditionText || r.media.mediaText)) [].forEach.call(r.cssRules, function (x) { css.push(x.cssText) });
          else if (r.type === 4 || r.type === 12) varre(r.cssRules);
        });
      })(rs);
    });
    if (!el) { el = document.createElement('style'); el.id = 'fdb-tema-esp'; document.head.appendChild(el) }
    el.textContent = css.join('\n');
  }

  var ICO_SOL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>';
  var ICO_LUA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z"/></svg>';
  var btn;
  function pintar() {
    if (!btn) return; var e = escuro();
    btn.innerHTML = e ? ICO_SOL : ICO_LUA;
    btn.setAttribute('aria-label', e ? 'Mudar para o modo claro' : 'Mudar para o modo escuro');
    btn.title = e ? 'Modo claro' : 'Modo escuro';
  }
  function alternar() {
    var v = escuro() ? 'light' : 'dark';
    d.classList.add('fdb-tema-anim'); setTimeout(function () { d.classList.remove('fdb-tema-anim') }, 400);
    d.setAttribute('data-theme', v); gravar(v); espelhar(); pintar();
    try { dispatchEvent(new CustomEvent('fdb:tema', { detail: v })) } catch (e) { }
  }

  var st = document.createElement('style');
  st.textContent =
    '.fdb-tema{flex:none;display:inline-grid;place-items:center;width:38px;height:38px;border-radius:50%;border:1.5px solid rgba(255,255,255,.28);background:rgba(255,255,255,.06);color:#fff;cursor:pointer;padding:0;margin-left:10px;transition:background .15s,transform .15s}' +
    '.fdb-tema:hover{background:rgba(255,255,255,.16)}.fdb-tema:active{transform:scale(.92)}.fdb-tema svg{width:19px;height:19px}' +
    '.fdb-tema:focus-visible{outline:2px solid #FF7B3F;outline-offset:2px}' +
    '.fdb-tema.solto{position:fixed;top:max(10px,env(safe-area-inset-top,0px));right:max(12px,env(safe-area-inset-right,0px));z-index:900;background:#13233A;border-color:#13233A;box-shadow:0 4px 14px rgba(0,0,0,.18)}' +
    '.fdb-tema.claro{border-color:var(--line,#CFD9E2);color:var(--ink,#13233A);background:transparent}' +
    'html.fdb-tema-anim,html.fdb-tema-anim *{transition:background-color .3s,color .3s,border-color .3s!important}';
  document.head.appendChild(st);

  function colocar() {
    if (btn && btn.isConnected) return true;
    btn = btn || document.createElement('button'); btn.type = 'button'; btn.className = 'fdb-tema'; btn.onclick = alternar; pintar();
    var alvo, antes = null;
    var hr = document.querySelector('.hright'); // hub
    if (hr) { alvo = hr; antes = hr.querySelector('.umenu') }
    else if ((alvo = document.querySelector('header .brand'))) { antes = alvo.querySelector('.prog') }
    else if ((alvo = document.querySelector('header.lh .lhin'))) { btn.classList.add('claro') }
    if (!alvo) return false;
    alvo.insertBefore(btn, antes); return true;
  }
  var tentativas = 0;
  function tentar() {
    if (colocar()) return;
    if (++tentativas < 25) setTimeout(tentar, 120);
    else { btn.className = 'fdb-tema solto'; document.body.appendChild(btn) }
  }
  function iniciar() { espelhar(); tentar() }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
  addEventListener('load', espelhar);
  mq.addEventListener && mq.addEventListener('change', function () { espelhar(); pintar() });
  /* outra aba mudou o tema */
  addEventListener('storage', function (e) { if (e.key === K && (e.newValue === 'dark' || e.newValue === 'light')) { d.setAttribute('data-theme', e.newValue); espelhar(); pintar() } });
})();
