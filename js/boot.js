/*
  FACULDADE DE BOLSO · inicialização
  ------------------------------------------------------------
  Decide o modo do hub e carrega os dados antes de js/hub.js:
  - sem dados/config.js preenchido → modo "local" (como sempre foi: dados dos arquivos)
  - com Supabase configurado → tela de login; depois
      admin      → dados pessoais vêm do banco (tabela "privado", só o admin lê)
      visitante  → só o semestre atual, oficinas e cartas
  O progresso (status, provas manuais, módulos, quiz, cartas) sincroniza com a conta
  pela tabela "estado". Nada pessoal fica no código público.
*/
(function(){
'use strict';
const CFG=window.FDB_CONFIG||{};
const $=id=>document.getElementById(id);
const carregar=src=>new Promise((ok,erro)=>{ const s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=()=>erro(new Error('Falha ao carregar '+src)); document.body.appendChild(s) });
const iniciarHub=()=>carregar('js/hub.js');

/* app instalável */
if('serviceWorker' in navigator && location.protocol==='https:') addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

if(!CFG.url||!CFG.anonKey){
  window.FDB_MODE='local';
  carregar('dados/provas.js').catch(()=>{}).then(()=>carregar('dados/horario.js').catch(()=>{})).then(iniciarHub);
  return;
}

/* ===== modo com conta ===== */
const mostrarLogin=on=>{ $('auth').hidden=!on; $('app').hidden=on; document.querySelector('.topbar').hidden=on };
mostrarLogin(false); $('app').hidden=true; document.querySelector('.topbar').hidden=true;

carregar(CFG.lib||'js/vendor/supabase-2.117.3.js').then(()=>{
  const sb=window.supabase.createClient(CFG.url,CFG.anonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  window.FDB_SB=sb;
  sb.auth.getSession().then(({data})=>{ if(data&&data.session) entrar(data.session.user); else publico() });
  /* sem login: modo estudante público (oficinas do semestre + cartas, progresso só neste aparelho) */
  function publico(){ window.FDB_MODE='visitante'; mostrarLogin(false); const c=$('conta'); c.hidden=false;
    c.innerHTML='<button type="button" id="entrarBtn">Entrar</button>'; $('entrarBtn').onclick=telaLogin; iniciarHub() }
  sb.auth.onAuthStateChange((ev,sess)=>{ if(ev==='SIGNED_OUT') location.reload(); if(ev==='PASSWORD_RECOVERY') novaSenha() });

  /* ----- tela de login ----- */
  let criando=false;
  function telaLogin(){ mostrarLogin(true); $('aEmail').focus() }
  const msg=(t,tipo)=>{ const m=$('aMsg'); m.textContent=t; m.className='mono amsg'+(tipo?' '+tipo:'') };
  $('aMode').textContent='Voltar sem entrar'; $('authSub').textContent='Acesso do administrador. Para estudar não precisa de conta: volte e use o site normalmente.';
  $('aMode').onclick=()=>{ mostrarLogin(false); msg('') };
  const _antigo=()=>{ criando=!criando; $('aGo').textContent=criando?'Criar conta':'Entrar'; $('aMode').textContent=criando?'Já tenho conta':'Criar conta de visitante';
    document.querySelector('.authbox h1').textContent=criando?'Criar conta':'Entrar'; $('aPass').autocomplete=criando?'new-password':'current-password';
    $('authSub').textContent=criando?'Conta de visitante: acesso às oficinas do semestre e às cartas de revisão, com o seu próprio progresso. Use uma senha com pelo menos 8 caracteres.':'Use sua conta para ver as oficinas, as cartas de revisão e salvar o seu progresso em qualquer aparelho.'; msg('') };
  $('authForm').onsubmit=async e=>{ e.preventDefault(); const email=$('aEmail').value.trim(), password=$('aPass').value; $('aGo').disabled=true; msg(criando?'Criando conta…':'Entrando…');
    try{
      if(criando){ const {data,error}=await sb.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}}); if(error) throw error;
        if(data.session) return entrar(data.session.user); msg('Conta criada. Confirme pelo link que chegou no seu e-mail e depois entre aqui.','ok') }
      else { const {data,error}=await sb.auth.signInWithPassword({email,password}); if(error) throw error; location.reload() }
    }catch(err){ msg(traduz(err),'err') } finally{ $('aGo').disabled=false } };
  $('aForgot').onclick=async()=>{ const email=$('aEmail').value.trim(); if(!email){ msg('Digite seu e-mail acima e toque de novo em "Esqueci minha senha".','err'); return }
    const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname}); msg(error?traduz(error):'Se esse e-mail tiver conta, chegou um link para criar uma senha nova.',error?'err':'ok') };
  async function novaSenha(){ const p=prompt('Digite a nova senha (mínimo 8 caracteres):'); if(!p||p.length<8) return; const {error}=await sb.auth.updateUser({password:p}); alert(error?traduz(error):'Senha alterada.') }
  function traduz(e){ const m=String(e&&e.message||e); if(/invalid login/i.test(m)) return 'E-mail ou senha incorretos.'; if(/not confirmed/i.test(m)) return 'Confirme o e-mail pelo link que enviamos antes de entrar.';
    if(/already registered|already been registered/i.test(m)) return 'Esse e-mail já tem conta. Use "Já tenho conta".'; if(/rate limit|too many/i.test(m)) return 'Muitas tentativas. Espere alguns minutos e tente de novo.';
    if(/password/i.test(m)&&/(short|least|weak)/i.test(m)) return 'Senha fraca: use pelo menos 8 caracteres, misturando letras e números.'; if(/signups? not allowed|disabled/i.test(m)) return 'Novas contas estão desativadas no momento.'; return m }

  /* ----- depois de entrar ----- */
  async function entrar(user){ msg('Carregando…');
    let papel='visitante';
    try{ const {data}=await sb.from('perfis').select('papel').eq('id',user.id).maybeSingle(); if(data&&data.papel) papel=data.papel }catch(e){}
    if(papel==='admin'){ try{ const {data,error}=await sb.from('privado').select('chave,valor'); if(error) throw error; aplicarPrivado(data||[]) }catch(e){ console.warn('privado',e) } }
    window.FDB_MODE=papel==='admin'?'admin':'visitante';
    await sync(user).catch(e=>console.warn('sync',e));
    mostrarLogin(false); barraConta(user,papel);
    await iniciarHub();
    setInterval(()=>sync(user).then(()=>barraConta(user,papel)).catch(()=>{}),60*1000);
    document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='hidden') sync(user).catch(()=>{}); else sync(user).then(()=>barraConta(user,papel)).catch(()=>{}) });
  }
  function aplicarPrivado(rows){ const P={}; rows.forEach(r=>P[r.chave]=r.valor); const F=window.FACULDADE||{periodos:[]};
    if(P.horario) window.HORARIO=P.horario; if(P.provas) window.PROVAS=P.provas;
    if(P.perfil){ if(P.perfil.aluno) F.aluno=P.perfil.aluno }
    if(P.materias) F.periodos.forEach(p=>(p.materias||[]).forEach(m=>{ const x=P.materias[m.id]; if(x) Object.assign(m,x) })) }
  let ultimo=null;
  function barraConta(user,papel){ const c=$('conta'); c.hidden=false;
    c.innerHTML='<span title="'+esc(user.email||'')+'">'+(papel==='admin'?'admin':'visitante')+'</span>'+(ultimo?'<span class="sy">· salvo '+ultimo+'</span>':'')+'<button type="button" id="sair">Sair</button>';
    $('sair').onclick=async()=>{ await sync(user).catch(()=>{}); limparLocal(); await sb.auth.signOut() } }
  const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ----- sincronização do progresso (tabela "estado") ----- */
  const SYNC=/^(fdb-status|fdb-provas|fdb-anki|[a-z0-9]+-(done|quiz))$/, META='fdb-sync';
  const lsGet=k=>{ try{ return localStorage.getItem(k) }catch(e){ return null } }, lsSet=(k,v)=>{ try{ localStorage.setItem(k,v) }catch(e){} };
  const hash=s=>{ let h=5381; for(let i=0;i<s.length;i++) h=((h<<5)+h+s.charCodeAt(i))|0; return String(h) };
  const chaves=()=>{ const o=[]; try{ for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(SYNC.test(k)) o.push(k) } }catch(e){} return o };
  function limparLocal(){ chaves().forEach(k=>{ try{ localStorage.removeItem(k) }catch(e){} }); try{ localStorage.removeItem(META) }catch(e){} }
  function juntar(k,r,l){ if(k==='fdb-anki'&&window.FDB_ANKI) return FDB_ANKI.mesclar(r,l);
    if(Array.isArray(r)&&Array.isArray(l)){ const m=new Map(); [...r,...l].forEach(x=>m.set(x&&x.mid||JSON.stringify(x),x)); return [...m.values()] }
    if(r&&l&&typeof r==='object'&&typeof l==='object') return {...r,...l}; return l }
  let rodando=null;
  function sync(user){ if(rodando) return rodando; rodando=(async()=>{
    let meta={}; try{ meta=JSON.parse(lsGet(META)||'{}') }catch(e){}
    if(meta.uid&&meta.uid!==user.id){ limparLocal(); meta={} } meta.uid=user.id; meta.snap=meta.snap||{}; meta.rts=meta.rts||{};
    const {data,error}=await sb.from('estado').select('chave,valor,atualizado'); if(error) throw error;
    const R={}; (data||[]).forEach(r=>R[r.chave]=r);
    const envio=[]; const todos=new Set([...chaves(),...Object.keys(R).filter(k=>SYNC.test(k))]);
    todos.forEach(k=>{ const L=lsGet(k), r=R[k], sujo=L!=null&&hash(L)!==meta.snap[k], mudou=!!r&&r.atualizado!==meta.rts[k];
      if(r&&!sujo){ if(mudou||L==null){ const v=JSON.stringify(r.valor); lsSet(k,v); meta.snap[k]=hash(v); meta.rts[k]=r.atualizado; if(k==='fdb-anki'&&window.FDB_ANKI) FDB_ANKI.substituir(r.valor) } }
      else if(sujo){ let v; try{ v=JSON.parse(L) }catch(e){ return }
        if(r&&mudou){ v=juntar(k,r.valor,v); const s=JSON.stringify(v); lsSet(k,s); if(k==='fdb-anki'&&window.FDB_ANKI) FDB_ANKI.substituir(v) }
        envio.push({usuario:user.id,chave:k,valor:v,atualizado:new Date().toISOString()}) } });
    if(envio.length){ const {data:up,error:e2}=await sb.from('estado').upsert(envio,{onConflict:'usuario,chave'}).select('chave,valor,atualizado'); if(e2) throw e2;
      (up||[]).forEach(r=>{ meta.rts[r.chave]=r.atualizado; meta.snap[r.chave]=hash(lsGet(r.chave)||JSON.stringify(r.valor)) }) }
    lsSet(META,JSON.stringify(meta)); ultimo=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  })().finally(()=>{ rodando=null }); return rodando }
}).catch(e=>{ console.error(e); window.FDB_MODE='local'; $('app').hidden=false; document.querySelector('.topbar').hidden=false;
  carregar('dados/provas.js').catch(()=>{}).then(()=>carregar('dados/horario.js').catch(()=>{})).then(iniciarHub) });
})();
