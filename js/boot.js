/*
  FACULDADE DE BOLSO · inicialização
  ------------------------------------------------------------
  Decide o modo do hub e carrega os dados antes de js/hub.js:
  - sem dados/config.js preenchido → modo "local" (como sempre foi: dados dos arquivos)
  - com Supabase configurado → tela de login; depois
      admin      → dados pessoais vêm do banco (tabela "privado", só o admin lê)
      visitante  → matérias do curso com oficina, cartas e exercícios
      sem login  → igual ao visitante, mas sem o que é "soLogin" (Inglês, Desenho artístico)
  Velocidade: quem já entrou neste aparelho abre o hub NA HORA com a cópia guardada; a biblioteca
  do Supabase (218 KB) carrega em segundo plano. Sem login também não espera a biblioteca:
  ela só carrega quando a pessoa abre a tela de "Entrar".
  O progresso (status, provas manuais, módulos, quiz, cartas) sincroniza com a conta
  pela tabela "estado". Nada pessoal fica no código público.
*/
(function(){
'use strict';
const CFG=window.FDB_CONFIG||{};
const $=id=>document.getElementById(id);
const carregar=src=>new Promise((ok,erro)=>{ const s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=()=>erro(new Error('Falha ao carregar '+src)); document.body.appendChild(s) });
let hubIniciado=null;
const iniciarHub=()=>{ if(hubIniciado) return hubIniciado; tirarAviso(); return hubIniciado=carregar('js/hub.js') };
/* nunca deixar a tela em branco: aviso de carregamento, limite de tempo para a rede e um "plano B" */
const limite=(p,ms,reserva)=>Promise.race([Promise.resolve(p).catch(()=>reserva),new Promise(ok=>setTimeout(()=>ok(reserva),ms))]);
const TEMPO={sessao:4000,consulta:2500,total:10000};
let aviso=null;
function porAviso(){ if(aviso||!document.body) return; aviso=document.createElement('div'); aviso.id='bootAviso'; aviso.setAttribute('role','status');
  aviso.style.cssText='position:fixed;inset:0;display:grid;place-items:center;z-index:50;pointer-events:none;font:600 15px system-ui,sans-serif;color:#C9D4E3';
  aviso.innerHTML='<div style="text-align:center"><div style="width:34px;height:34px;margin:0 auto 12px;border:3px solid rgba(255,255,255,.18);border-top-color:#F07A2E;border-radius:50%;animation:bootgira 0.9s linear infinite"></div>Carregando a Faculdade de Bolso…<div id="bootAvisoSub" style="font-weight:400;font-size:13px;opacity:.7;margin-top:6px"></div></div><style>@keyframes bootgira{to{transform:rotate(360deg)}}</style>';
  document.body.appendChild(aviso) }
function tirarAviso(){ if(aviso){ aviso.remove(); aviso=null } }

/* app instalável */
if('serviceWorker' in navigator && location.protocol==='https:') addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

if(!CFG.url||!CFG.anonKey){
  window.FDB_MODE='local';
  iniciarHub();
  return;
}

/* ===== modo com conta ===== */
const mostrarLogin=on=>{ $('auth').hidden=!on; $('app').hidden=on; document.querySelector('.topbar').hidden=on };
mostrarLogin(false); $('app').hidden=true; document.querySelector('.topbar').hidden=true;
const CACHE_P='fdb-privado-cache', CACHE_PAPEL='fdb-papel-cache';
const lerC=k=>{ try{ return JSON.parse(localStorage.getItem(k)||'null') }catch(e){ return null } }, gravarC=(k,v)=>{ try{ localStorage.setItem(k,JSON.stringify(v)) }catch(e){} };
const sessaoGuardada=()=>{ try{ for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(/^sb-.*-auth-token$/.test(k)){ const v=JSON.parse(localStorage.getItem(k)); if(v&&v.user) return v.user } } }catch(e){} return null };
/* link do e-mail (confirmar conta, nova senha): a biblioteca precisa ler a URL antes de tudo */
const URL_AUTH=/(access_token=|refresh_token=|type=recovery|[?&]code=|error_description=)/.test(location.hash+location.search);

/* biblioteca do Supabase: carregada uma vez, só quando alguém precisa dela */
let sb=null, libP=null;
const lib=()=>libP||(libP=carregar(CFG.lib||'js/vendor/supabase-2.117.3.js').then(()=>{
  sb=window.supabase.createClient(CFG.url,CFG.anonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  window.FDB_SB=sb;
  sb.auth.onAuthStateChange(ev=>{ if(ev==='SIGNED_OUT') location.reload(); if(ev==='PASSWORD_RECOVERY') novaSenha() });
  return sb }).catch(e=>{ libP=null; throw e }));

/* sem login: matérias do curso com oficina + cartas e exercícios, progresso só neste aparelho */
function publico(){ window.FDB_MODE='visitante'; window.FDB_SEMLOGIN=true; mostrarLogin(false); const c=$('conta'); c.hidden=false;
  c.innerHTML='<button type="button" id="entrarBtn">Entrar</button>'; $('entrarBtn').onclick=telaLogin;
  /* página que é só para quem tem login manda para cá com ?entrar */
  if(/[?&]entrar\b/.test(location.search)){ try{ history.replaceState(null,'',location.pathname+location.hash) }catch(e){} telaLogin(true) }
  iniciarHub() }

/* ----- tela de login ----- */
let criando=false;
const msg=(t,tipo)=>{ const m=$('aMsg'); m.textContent=t; m.className='mono amsg'+(tipo?' '+tipo:'') };
function telaLogin(soLogin){ mostrarLogin(true); $('aEmail').focus();
  if(soLogin===true) msg('Essa parte do site é só para quem tem conta. Entre para continuar.');
  lib().catch(()=>msg('Não foi possível carregar o login. Confira a internet e tente de novo.','err')) }
$('aMode').textContent='Voltar sem entrar'; $('authSub').textContent='Acesso do administrador. Para estudar não precisa de conta: volte e use o site normalmente.';
$('aMode').onclick=()=>{ mostrarLogin(false); msg('') };
$('authForm').onsubmit=async e=>{ e.preventDefault(); const email=$('aEmail').value.trim(), password=$('aPass').value; $('aGo').disabled=true; msg(criando?'Criando conta…':'Entrando…');
  try{ const sb=await lib();
    if(criando){ const {data,error}=await sb.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}}); if(error) throw error;
      if(data.session) return entrar(data.session.user); msg('Conta criada. Confirme pelo link que chegou no seu e-mail e depois entre aqui.','ok') }
    else { const {error}=await sb.auth.signInWithPassword({email,password}); if(error) throw error; location.reload() }
  }catch(err){ msg(traduz(err),'err') } finally{ $('aGo').disabled=false } };
$('aForgot').onclick=async()=>{ const email=$('aEmail').value.trim(); if(!email){ msg('Digite seu e-mail acima e toque de novo em "Esqueci minha senha".','err'); return }
  try{ const sb=await lib(); const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname}); msg(error?traduz(error):'Se esse e-mail tiver conta, chegou um link para criar uma senha nova.',error?'err':'ok') }
  catch(err){ msg(traduz(err),'err') } };
async function novaSenha(){ const p=prompt('Digite a nova senha (mínimo 8 caracteres):'); if(!p||p.length<8) return; const {error}=await sb.auth.updateUser({password:p}); alert(error?traduz(error):'Senha alterada.') }
function traduz(e){ const m=String(e&&e.message||e); if(/invalid login/i.test(m)) return 'E-mail ou senha incorretos.'; if(/not confirmed/i.test(m)) return 'Confirme o e-mail pelo link que enviamos antes de entrar.';
  if(/already registered|already been registered/i.test(m)) return 'Esse e-mail já tem conta. Use "Já tenho conta".'; if(/rate limit|too many/i.test(m)) return 'Muitas tentativas. Espere alguns minutos e tente de novo.';
  if(/password/i.test(m)&&/(short|least|weak)/i.test(m)) return 'Senha fraca: use pelo menos 8 caracteres, misturando letras e números.'; if(/signups? not allowed|disabled/i.test(m)) return 'Novas contas estão desativadas no momento.';
  if(/Falha ao carregar|Failed to fetch|NetworkError/i.test(m)) return 'Sem conexão com o servidor. Confira a internet e tente de novo.'; return m }

/* ----- depois de entrar ----- */
function avisoAtualizar(){ if(document.getElementById('fdbAtu')) return; const d=document.createElement('div'); d.id='fdbAtu'; d.setAttribute('role','status');
  d.style.cssText='position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:60;background:#13233A;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:10px 14px;font:600 14px system-ui,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.35);display:flex;gap:12px;align-items:center';
  d.innerHTML='Sua conta trouxe dados novos.<button type="button" style="background:#F07A2E;color:#fff;border:0;border-radius:8px;padding:6px 12px;font:700 13px system-ui;cursor:pointer">Atualizar</button><button type="button" aria-label="Fechar" style="background:none;border:0;color:#fff;font-size:18px;cursor:pointer;opacity:.7">×</button>';
  d.querySelectorAll('button')[0].onclick=()=>location.reload(); d.querySelectorAll('button')[1].onclick=()=>d.remove(); document.body.appendChild(d) }
function manterSync(user,papel){
  setInterval(()=>sync(user).then(()=>barraConta(user,papel)).catch(()=>{}),60*1000);
  document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') sync(user).catch(()=>{}); else sync(user).then(()=>barraConta(user,papel)).catch(()=>{}) }) }
/* caminho rápido: já entrou antes neste aparelho → hub na hora, conta conferida em segundo plano */
function entrarRapido(user,papel){
  const c=lerC(CACHE_P); if(papel==='admin'&&c&&c.uid===user.id) aplicarPrivado(c.rows||[]);
  window.FDB_MODE=papel==='admin'?'admin':'visitante';
  mostrarLogin(false); barraConta(user,papel); iniciarHub();
  (async()=>{
    try{ await lib() }catch(e){ console.warn('boot: biblioteca da conta não carregou; seguindo com a cópia guardada'); return }
    const r=await limite(sb.auth.getSession(),20000,null);
    if(r&&r.data&&!r.data.session){ [CACHE_P,CACHE_PAPEL].forEach(k=>{ try{ localStorage.removeItem(k) }catch(e){} }); location.reload(); return }
    const [rp,rv,puxou]=await Promise.all([
      limite(sb.from('perfis').select('papel').eq('id',user.id).maybeSingle(),20000,null),
      limite(sb.from('privado').select('chave,valor'),20000,null),
      limite(sync(user).catch(e=>{ console.warn('sync',e); return false }),20000,false)]);
    let mudou=!!puxou;
    if(rp&&rp.data&&rp.data.papel){ if(rp.data.papel!==papel) mudou=true; gravarC(CACHE_PAPEL,{uid:user.id,papel:rp.data.papel}) }
    if(rv&&!rv.error&&rv.data&&rv.data.length){ const novo=JSON.stringify(rv.data), velho=JSON.stringify((c&&c.rows)||null); if(novo!==velho){ if(papel==='admin') mudou=true; gravarC(CACHE_P,{uid:user.id,rows:rv.data}) } }
    barraConta(user,(rp&&rp.data&&rp.data.papel)||papel);
    if(mudou) avisoAtualizar();
    manterSync(user,papel);
  })() }
/* primeira entrada neste aparelho: espera só papel + dados pessoais (no máximo 2,5 s); o progresso sincroniza depois */
async function entrar(user){ msg('Carregando…'); porAviso();
  const cp=lerC(CACHE_PAPEL); let papel=(cp&&cp.uid===user.id&&cp.papel)||'visitante';
  const pp=limite(sb.from('perfis').select('papel').eq('id',user.id).maybeSingle(),TEMPO.consulta,null);
  const pv=limite(sb.from('privado').select('chave,valor'),TEMPO.consulta,null);
  const ps=sync(user).catch(e=>{ console.warn('sync',e); return false });
  const [rp,rv]=await Promise.all([pp,pv]);
  if(rp&&rp.data&&rp.data.papel){ papel=rp.data.papel; gravarC(CACHE_PAPEL,{uid:user.id,papel}) }
  if(papel==='admin'){
    if(rv&&!rv.error&&rv.data&&rv.data.length){ aplicarPrivado(rv.data); gravarC(CACHE_P,{uid:user.id,rows:rv.data}) }
    else { const c=lerC(CACHE_P); if(c&&c.uid===user.id) aplicarPrivado(c.rows||[]); console.warn('privado: usando a cópia guardada') } }
  window.FDB_MODE=papel==='admin'?'admin':'visitante';
  mostrarLogin(false); barraConta(user,papel);
  await iniciarHub();
  ps.then(puxou=>{ barraConta(user,papel); if(puxou) avisoAtualizar() });
  manterSync(user,papel);
}
function aplicarPrivado(rows){ const P={}; rows.forEach(r=>P[r.chave]=r.valor); const F=window.FACULDADE||{periodos:[]};
  if(P.horario) window.HORARIO=P.horario; if(P.provas) window.PROVAS=P.provas;
  if(P.perfil){ if(P.perfil.aluno) F.aluno=P.perfil.aluno }
  if(P.materias) F.periodos.forEach(p=>(p.materias||[]).forEach(m=>{ const x=P.materias[m.id]; if(x) Object.assign(m,x) })) }
let ultimo=null;
function barraConta(user,papel){ const c=$('conta'); c.hidden=false;
  c.innerHTML='<span title="'+esc(user.email||'')+'">'+(papel==='admin'?'admin':'visitante')+'</span>'+(ultimo?'<span class="sy">· salvo '+ultimo+'</span>':'')+'<button type="button" id="sair">Sair</button>';
  $('sair').onclick=async()=>{ try{ await lib() }catch(e){ limparLocal(); limparSessao(); location.reload(); return }
    await sync(user).catch(()=>{}); limparLocal(); await sb.auth.signOut() } }
function limparSessao(){ try{ for(let i=localStorage.length-1;i>=0;i--){ const k=localStorage.key(i); if(/^sb-.*-auth-token$/.test(k)) localStorage.removeItem(k) } }catch(e){} }
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ----- sincronização do progresso (tabela "estado") ----- */
const SYNC=/^(fdb-status|fdb-provas|fdb-anki|[a-z0-9]+-(done|quiz))$/, META='fdb-sync';
const lsGet=k=>{ try{ return localStorage.getItem(k) }catch(e){ return null } }, lsSet=(k,v)=>{ try{ localStorage.setItem(k,v) }catch(e){} };
const hash=s=>{ let h=5381; for(let i=0;i<s.length;i++) h=((h<<5)+h+s.charCodeAt(i))|0; return String(h) };
const chaves=()=>{ const o=[]; try{ for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(SYNC.test(k)) o.push(k) } }catch(e){} return o };
function limparLocal(){ chaves().forEach(k=>{ try{ localStorage.removeItem(k) }catch(e){} }); [META,CACHE_P,CACHE_PAPEL].forEach(k=>{ try{ localStorage.removeItem(k) }catch(e){} }) }
function juntar(k,r,l){ if(k==='fdb-anki'&&window.FDB_ANKI) return FDB_ANKI.mesclar(r,l);
  if(Array.isArray(r)&&Array.isArray(l)){ const m=new Map(); [...r,...l].forEach(x=>m.set(x&&x.mid||JSON.stringify(x),x)); return [...m.values()] }
  if(r&&l&&typeof r==='object'&&typeof l==='object') return {...r,...l}; return l }
let rodando=null;
function sync(user){ if(rodando) return rodando; rodando=(async()=>{
  await lib();
  let puxou=false; let meta={}; try{ meta=JSON.parse(lsGet(META)||'{}') }catch(e){}
  if(meta.uid&&meta.uid!==user.id){ limparLocal(); meta={} } meta.uid=user.id; meta.snap=meta.snap||{}; meta.rts=meta.rts||{};
  const {data,error}=await sb.from('estado').select('chave,valor,atualizado'); if(error) throw error;
  const R={}; (data||[]).forEach(r=>R[r.chave]=r);
  const envio=[]; const todos=new Set([...chaves(),...Object.keys(R).filter(k=>SYNC.test(k))]);
  todos.forEach(k=>{ const L=lsGet(k), r=R[k], sujo=L!=null&&hash(L)!==meta.snap[k], mudou=!!r&&r.atualizado!==meta.rts[k];
    if(r&&!sujo){ if(mudou||L==null){ const v=JSON.stringify(r.valor); if(v!==L) puxou=true; lsSet(k,v); meta.snap[k]=hash(v); meta.rts[k]=r.atualizado; if(k==='fdb-anki'&&window.FDB_ANKI) FDB_ANKI.substituir(r.valor) } }
    else if(sujo){ let v; try{ v=JSON.parse(L) }catch(e){ return }
      if(r&&mudou){ v=juntar(k,r.valor,v); const s=JSON.stringify(v); if(s!==L) puxou=true; lsSet(k,s); if(k==='fdb-anki'&&window.FDB_ANKI) FDB_ANKI.substituir(v) }
      envio.push({usuario:user.id,chave:k,valor:v,atualizado:new Date().toISOString()}) } });
  if(envio.length){ const {data:up,error:e2}=await sb.from('estado').upsert(envio,{onConflict:'usuario,chave'}).select('chave,valor,atualizado'); if(e2) throw e2;
    (up||[]).forEach(r=>{ meta.rts[r.chave]=r.atualizado; meta.snap[r.chave]=hash(lsGet(r.chave)||JSON.stringify(r.valor)) }) }
  lsSet(META,JSON.stringify(meta)); ultimo=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  return puxou;
})().finally(()=>{ rodando=null }); return rodando }

/* ===== decide o caminho ===== */
const u0=sessaoGuardada(), cp0=lerC(CACHE_PAPEL);
/* plano B: se a conta não responder a tempo, abre o hub mesmo assim (o progresso sincroniza depois) */
setTimeout(()=>{ if(!hubIniciado){ console.warn('boot: Supabase demorou demais, abrindo sem esperar'); if(u0) window.FDB_MODE=window.FDB_MODE||'local'; else { window.FDB_MODE='visitante'; window.FDB_SEMLOGIN=true }
  $('auth').hidden=true; $('app').hidden=false; document.querySelector('.topbar').hidden=false; iniciarHub() } },TEMPO.total);
if(!URL_AUTH&&u0&&cp0&&cp0.uid===u0.id) entrarRapido(u0,cp0.papel);
else if(!URL_AUTH&&!u0) publico();
else { porAviso(); setTimeout(()=>{ const s=document.getElementById('bootAvisoSub'); if(s) s.textContent='A conta está demorando para responder…' },4000);
  lib().then(()=>limite(sb.auth.getSession(),TEMPO.sessao,'tempo')).then(r=>{ if(r==='tempo'||!r){ const u=sessaoGuardada(); return u?entrar(u):publico() } const s=r.data&&r.data.session; if(s) entrar(s.user); else publico() })
    .catch(e=>{ console.error(e); if(hubIniciado) return; if(u0) window.FDB_MODE='local'; else { window.FDB_MODE='visitante'; window.FDB_SEMLOGIN=true }
      $('auth').hidden=true; $('app').hidden=false; document.querySelector('.topbar').hidden=false; iniciarHub() }); }
})();
