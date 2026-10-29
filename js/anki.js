/*
  FACULDADE DE BOLSO · cartas de revisão espaçada (tipo Anki, algoritmo SM-2)
  ---------------------------------------------------------------------------
  Usado no hub (aba Revisão) e nas oficinas (painel "Cartas" + carta surpresa).
  Tudo fica em localStorage "fdb-anki" (mesma origem → hub e oficinas
  compartilham). A sincronização com a conta (Supabase) é feita pelo hub.

  Nas oficinas:  <script src="../../dados/cartas.js"></script>
                 <script src="../../js/anki.js" data-materia="fis1"></script>
*/
(function(){
'use strict';
const KEY='fdb-anki', DAY=864e5, MIN=6e4, HOUR=36e5;
const me=document.currentScript;
const MAT=me&&me.dataset.materia||'';
const NOMES={gaal:'GAAL',fis1:'Física I',calc2:'Cálculo II',qg:'Química',cm2:'Materiais II',dt2:'Desenho II'};
const nomeMat=id=>{ const F=window.FACULDADE; if(F&&F.periodos){ for(const p of F.periodos) for(const m of p.materias||[]) if(m.id===id) return m.sigla } return NOMES[id]||id };
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=s=>esc(s).replace(/([A-Za-z]{1,3}[₀-₉]?)\u20D7/g,'<span class="ak-vec">$1</span>');
const ls={ get(k,d){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d }catch(e){ return d } }, set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)) }catch(e){} } };
const ss={ get(k,d){ try{ const v=sessionStorage.getItem(k); return v?JSON.parse(v):d }catch(e){ return d } }, set(k,v){ try{ sessionStorage.setItem(k,JSON.stringify(v)) }catch(e){} } };
const dkey=(d=new Date())=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const ontem=()=>{ const d=new Date(); d.setDate(d.getDate()-1); return dkey(d) };

/* ===== estado ===== */
function norm(s){ s=s&&typeof s==='object'?s:{}; s.rv=s.rv||{}; s.custom=s.custom||[]; s.stats=s.stats||{}; s.prefs=s.prefs||{}; return s }
let S=norm(ls.get(KEY,{}));
function save(){ S.t=Date.now(); ls.set(KEY,S); emit() }
addEventListener('storage',e=>{ if(e.key===KEY){ S=norm(ls.get(KEY,{})); emit() } });
const subs=new Set(); function emit(){ subs.forEach(f=>{ try{ f() }catch(e){} }) }

/* ===== cartas ===== */
function todas(mats){ const base=window.FDB_CARTAS||[]; const own=S.custom.filter(c=>!c.del).map(c=>({...c,own:true}));
  return [...base,...own].filter(c=>!mats||!mats.length||mats.includes(c.m)) }
const rev=id=>S.rv[id];
const isDue=(c,now=Date.now())=>{ const r=rev(c.id); return !!r&&r.due<=now };
const isNew=c=>!rev(c.id);
function stats(){ const st=S.stats, d=dkey(); if(st.day!==d){ st.day=d; st.n=0; st.dayPts=0; st.novas=0 } st.pts=st.pts||0; st.streak=st.streak||0; return st }
const meta=()=>S.prefs.meta||20, novasDia=()=>S.prefs.novas||15;
function streakAtual(){ const st=stats(); return (st.goalDay===dkey()||st.goalDay===ontem())?st.streak:0 }
function fila(mats){ const now=Date.now(), cs=todas(mats), st=stats();
  const due=cs.filter(c=>isDue(c,now)).sort((a,b)=>rev(a.id).due-rev(b.id).due);
  const livres=Math.max(0,novasDia()-(st.novas||0)), novas=cs.filter(isNew).slice(0,livres);
  return {due,novas,lista:[...due,...embaralha(novas)]} }
function embaralha(a){ a=[...a]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]] } return a }

/* ===== SM-2 ===== */
const NOTAS=[[0,'Errei','bad'],[3,'Difícil','warn'],[4,'Bom','ok'],[5,'Fácil','ac']];
function proximo(id,q,now=Date.now()){ const r={ef:2.5,n:0,iv:0,lapses:0,...(rev(id)||{})};
  if(q<3){ r.n=0; r.iv=0; r.lapses=(r.lapses||0)+1; r.due=now+10*MIN }
  else { r.n+=1; let iv;
    if(r.n===1) iv=q===5?3:1; else if(r.n===2) iv=q===3?3:q===5?8:6; else iv=Math.round(r.iv*r.ef*(q===3?.8:q===5?1.3:1));
    r.iv=Math.max(1,iv); r.ef=Math.max(1.3,r.ef+.1-(5-q)*(.08+(5-q)*.02)); r.due=now+r.iv*DAY-2*HOUR }
  r.last=now; r.t=now; return r }
const fmtIv=ms=>ms<HOUR?Math.max(1,Math.round(ms/MIN))+' min':ms<DAY?Math.round(ms/HOUR)+' h':Math.round(ms/DAY)+' d';
let combo=0;
function avaliar(id,q){ const now=Date.now(), novo=!rev(id), r=proximo(id,q,now); S.rv[id]=r; const st=stats();
  st.n=(st.n||0)+1; if(novo) st.novas=(st.novas||0)+1;
  combo=q>=3?combo+1:0; const pts=(q===0?0:q===3?5:q===4?10:12)+(q>=3?Math.min(5,combo-1):0); st.pts+=pts; st.dayPts=(st.dayPts||0)+pts;
  if(st.n>=meta()&&st.goalDay!==dkey()){ st.streak=st.goalDay===ontem()?(st.streak||0)+1:1; st.goalDay=dkey(); st.best=Math.max(st.best||0,st.streak) }
  save(); return {r,pts} }

/* ===== cartas próprias ===== */
function criar(m,t,f,v){ const c={id:'u-'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),m,t:t||'Minhas cartas',f,v,mt:Date.now()}; S.custom.push(c); save(); return c }
function apagar(id){ const c=S.custom.find(x=>x.id===id); if(c){ c.del=true; c.mt=Date.now(); delete S.rv[id]; save() } }

/* ===== mesclagem (usada na sincronização) ===== */
function mesclar(a,b){ a=norm(JSON.parse(JSON.stringify(a||{}))); b=norm(b||{}); const o=norm({});
  new Set([...Object.keys(a.rv),...Object.keys(b.rv)]).forEach(k=>{ const x=a.rv[k], y=b.rv[k]; o.rv[k]=!x?y:!y?x:((y.t||0)>(x.t||0)?y:x) });
  const cm={}; [...a.custom,...b.custom].forEach(c=>{ const p=cm[c.id]; if(!p||(c.mt||0)>(p.mt||0)) cm[c.id]=c }); o.custom=Object.values(cm);
  const sa=a.stats, sb=b.stats; o.stats=(sb.day||'')>(sa.day||'')?{...sb}:(sa.day||'')>(sb.day||'')?{...sa}:{...sa,n:Math.max(sa.n||0,sb.n||0),dayPts:Math.max(sa.dayPts||0,sb.dayPts||0),novas:Math.max(sa.novas||0,sb.novas||0)};
  o.stats.pts=Math.max(sa.pts||0,sb.pts||0); o.stats.best=Math.max(sa.best||0,sb.best||0);
  o.prefs={...a.prefs,...b.prefs,...((a.t||0)>=(b.t||0)?a.prefs:{})}; o.t=Math.max(a.t||0,b.t||0); return o }
function substituir(novo){ S=norm(novo); ls.set(KEY,S); emit() }

/* ===== estilo ===== */
const CSS=`
.ak-ov{position:fixed;inset:0;z-index:90;background:rgba(10,18,30,.55);display:grid;place-items:center;padding:16px;backdrop-filter:blur(2px)}
.ak-panel{width:min(760px,100%);max-height:min(88vh,900px);overflow:auto;background:var(--paper,var(--sheet));color:var(--ink);border:1.5px solid var(--ink);border-radius:14px;padding:18px clamp(14px,3vw,26px) 22px;box-shadow:0 20px 60px rgba(0,0,0,.35)}
.ak-hd{display:flex;align-items:center;gap:10px;justify-content:space-between;margin-bottom:12px}
.ak-hd h2{font-family:var(--f-disp);font-size:1.4rem;margin:0}
.ak-x{border:1.5px solid var(--line);background:var(--sheet);color:var(--ink);border-radius:8px;width:36px;height:36px;font-size:1.1rem;cursor:pointer;flex:none}
.ak-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.ak-tabs button,.ak-chip{font:600 .8rem var(--f-mono);padding:7px 12px;border-radius:999px;border:1.5px solid var(--line);background:var(--sheet);color:var(--ink2);cursor:pointer}
.ak-tabs button.on,.ak-chip.on{background:var(--ink);color:var(--sheet);border-color:var(--ink)}
.ak-card{background:var(--sheet);border:1.5px solid var(--line);border-top:4px solid var(--ak-c,var(--accent,var(--c1)));border-radius:12px;padding:18px 18px 16px}
.ak-tp{font:600 .68rem var(--f-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink2);display:flex;justify-content:space-between;gap:8px}
.ak-f{font-family:var(--f-disp);font-size:1.18rem;line-height:1.3;margin:10px 0 4px;font-weight:700}
.ak-v{font-size:1.02rem;line-height:1.5;border-top:1px dashed var(--line);margin-top:12px;padding-top:12px}
.ak-act{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.ak-act button,.ak-btn{font:700 .9rem var(--f-body);padding:9px 14px;border-radius:9px;border:1.5px solid var(--ink);background:var(--ink);color:var(--sheet);cursor:pointer}
.ak-btn.gh{background:transparent;color:var(--ink)}
.ak-act .g{flex:1 1 90px;display:grid;gap:1px;justify-items:center;background:var(--sheet);color:var(--ink);border-color:var(--line)}
.ak-act .g small{font:600 .68rem var(--f-mono);color:var(--ink2)}
.ak-act .g.bad{border-color:var(--bad)}.ak-act .g.bad b{color:var(--bad)}
.ak-act .g.warn b{color:#B7791F}.ak-act .g.ok{border-color:var(--ok)}.ak-act .g.ok b{color:var(--ok)}
.ak-act .g.ac b{color:var(--accent2,var(--c2))}
.ak-act .g:hover{border-color:var(--ink)}
.ak-kbd{font:600 .7rem var(--f-mono);color:var(--ink2);margin-top:8px}
.ak-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:6px 0 16px}
.ak-st{background:var(--sheet);border:1.5px solid var(--line);border-radius:10px;padding:10px 12px}
.ak-st b{display:block;font:800 1.6rem var(--f-disp);line-height:1.1}
.ak-st span{font:600 .68rem var(--f-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink2)}
.ak-st i{display:block;height:6px;border-radius:3px;background:var(--line);margin-top:6px;overflow:hidden}
.ak-st i em{display:block;height:100%;background:var(--ok)}
.ak-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:10px 0}
.ak-list{display:grid;gap:8px}
.ak-li{background:var(--sheet);border:1px solid var(--line);border-left:4px solid var(--ak-c,var(--accent,var(--c1)));border-radius:9px;padding:10px 12px}
.ak-li summary{cursor:pointer;font-weight:700;list-style:none;display:flex;justify-content:space-between;gap:10px}
.ak-li summary::-webkit-details-marker{display:none}
.ak-li summary small{font:600 .66rem var(--f-mono);color:var(--ink2);white-space:nowrap;align-self:center}
.ak-li p{margin:8px 0 0;color:var(--ink2)}
.ak-li .rm{font:600 .72rem var(--f-mono);background:none;border:0;color:var(--bad);cursor:pointer;padding:0;margin-top:6px}
.ak-form{display:grid;gap:10px}
.ak-form label{display:grid;gap:4px;font-weight:700;font-size:.88rem}
.ak-form textarea,.ak-form input,.ak-form select{font:1rem var(--f-body);padding:9px 11px;border:1.5px solid var(--line);border-radius:8px;background:var(--sheet);color:var(--ink);width:100%}
.ak-form textarea{min-height:70px;resize:vertical}
.ak-msg{font:600 .8rem var(--f-mono);color:var(--ok);min-height:1em}
.ak-empty{text-align:center;padding:26px 10px;color:var(--ink2)}
.ak-empty b{display:block;font-family:var(--f-disp);font-size:1.2rem;color:var(--ink);margin-bottom:4px}
.ak-vec{position:relative;display:inline-block}
.ak-vec::before{content:"→";position:absolute;left:0;right:0;top:-.62em;text-align:center;font-size:.72em;line-height:1}
.ak-pop{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:80;width:min(380px,calc(100vw - 32px));box-shadow:0 14px 40px rgba(0,0,0,.28);border-radius:12px;animation:akin .25s ease-out}
.ak-pop .ak-card{border-color:var(--ink)}
.ak-pop .ak-f{font-size:1.05rem}
.ak-pop .ak-act .g{flex-basis:70px;padding:7px 6px}
.ak-ph{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px}
.ak-ph .ak-x{width:30px;height:30px;font-size:.95rem}
.ak-more{display:flex;gap:12px;flex-wrap:wrap;margin-top:10px}
.ak-more button{background:none;border:0;padding:0;font:600 .72rem var(--f-mono);color:var(--ink2);cursor:pointer;text-decoration:underline}
.ak-done{font:700 .95rem var(--f-body);color:var(--ok);margin-top:10px}
.ak-navbtn{flex:none;font-size:.86rem;font-weight:700;color:var(--ink2);padding:6px 11px;border-radius:999px;border:1.5px dashed var(--line);background:transparent;cursor:pointer;white-space:nowrap;font-family:inherit}
.ak-navbtn b{font:700 .7rem var(--f-mono);background:var(--c1,var(--accent));color:var(--sheet);border-radius:999px;padding:1px 6px;margin-left:5px}
@keyframes akin{from{transform:translateY(16px);opacity:0}to{transform:none;opacity:1}}
@media (prefers-reduced-motion:reduce){.ak-pop{animation:none}}
`;
let cssOk=false; function css(){ if(cssOk)return; const s=document.createElement('style'); s.textContent=CSS; document.head.appendChild(s); cssOk=true }
const CORES={gaal:'#0C8587',fis1:'#6447BE'};
const corDe=m=>{ const F=window.FACULDADE; if(F&&F.periodos){ const ar=F.areas||{}; for(const p of F.periodos) for(const x of p.materias||[]) if(x.id===m) return x.cor||(ar[x.area]||{}).cor } return CORES[m] };

/* ===== componente: uma carta ===== */
function cartaUI(el,c,op={}){ const cor=corDe(c.m); el.innerHTML='<div class="ak-card"'+(cor?' style="--ak-c:'+cor+'"':'')+'><div class="ak-tp"><span>'+esc(nomeMat(c.m))+' · '+esc(c.t||'')+'</span><span>'+(isNew(c)?'nova':'revisão')+'</span></div><div class="ak-f">'+fmt(c.f)+'</div><div class="ak-v" hidden>'+fmt(c.v)+'</div><div class="ak-act"><button type="button" class="ak-show">Mostrar resposta</button></div>'+(op.kbd?'<div class="ak-kbd">Espaço: mostrar · 1 a 4: avaliar</div>':'')+'</div>';
  const act=el.querySelector('.ak-act'), v=el.querySelector('.ak-v'); let aberta=false;
  const mostrar=()=>{ if(aberta)return; aberta=true; v.hidden=false; const now=Date.now();
    act.innerHTML=NOTAS.map(([q,l,k])=>'<button type="button" class="g '+k+'" data-q="'+q+'"><b>'+l+'</b><small>'+(q<3?'10 min':proximo(c.id,q,now).iv+' d')+'</small></button>').join('');
    act.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>nota(+b.dataset.q)) };
  const nota=q=>{ if(!aberta)return; const res=avaliar(c.id,q); op.onGrade&&op.onGrade(q,res) };
  el.querySelector('.ak-show').onclick=mostrar;
  return {mostrar,nota,get aberta(){ return aberta }} }

/* ===== sessão de revisão (painel e jogo) ===== */
function sessaoUI(el,mats,op={}){ const f=fila(mats); let q=f.lista, i=0, cur=null, feitas=0, pts=0, certas=0; combo=0;
  const fim=()=>{ cur=null; el.innerHTML='<div class="ak-empty"><b>'+(feitas?'Sessão concluída':'Nada para revisar agora')+'</b>'+(feitas?feitas+' cartas · '+certas+' certas · +'+pts+' pontos':'As próximas revisões aparecem quando chegar a hora. Você pode ver todas as cartas ou criar as suas.')+'</div>'+(op.onEnd?'<div class="ak-row" style="justify-content:center"><button type="button" class="ak-btn gh ak-back">Voltar</button>'+(todas(mats).length?'<button type="button" class="ak-btn ak-extra">Praticar 10 aleatórias</button>':'')+'</div>':'');
    const b=el.querySelector('.ak-back'); if(b) b.onclick=op.onEnd; const x=el.querySelector('.ak-extra'); if(x) x.onclick=()=>{ q=embaralha(todas(mats)).slice(0,10); i=0; prox() } };
  const prox=()=>{ if(i>=q.length) return fim(); const c=q[i++]; const box=document.createElement('div'); el.innerHTML='<div class="ak-row" style="justify-content:space-between"><span class="ak-kbd" style="margin:0">'+i+' de '+q.length+(f.due.length?' · '+f.due.length+' para revisar':'')+'</span><span class="ak-kbd" style="margin:0">+'+pts+' pts</span></div>'; el.appendChild(box);
    cur=cartaUI(box,c,{kbd:matchMedia('(hover:hover)').matches,onGrade:(n,res)=>{ feitas++; pts+=res.pts; if(n>=3)certas++; else if(q.indexOf(c,i)<0) q.push(c); op.onProgress&&op.onProgress(); prox() }}) };
  prox();
  return {tecla(e){ if(!cur)return false; if(e.key===' '||e.key==='Enter'){ if(!cur.aberta){ cur.mostrar(); return true } } const m={'1':0,'2':3,'3':4,'4':5}[e.key]; if(m!=null&&cur.aberta){ cur.nota(m); return true } return false }} }

function listaUI(el,mats){ const cs=todas(mats); const now=Date.now();
  if(!cs.length){ el.innerHTML='<div class="ak-empty"><b>Ainda sem cartas</b>Crie a primeira na aba "Criar carta".</div>'; return }
  const grupos={}; cs.forEach(c=>{ const k=nomeMat(c.m)+' · '+(c.t||''); (grupos[k]=grupos[k]||[]).push(c) });
  el.innerHTML='<div class="ak-row"><input type="search" class="ak-busca" placeholder="Buscar nas cartas" aria-label="Buscar nas cartas" style="flex:1;font:1rem var(--f-body);padding:9px 11px;border:1.5px solid var(--line);border-radius:8px;background:var(--sheet);color:var(--ink)"></div><div class="ak-list">'+Object.entries(grupos).map(([g,l])=>'<div class="ak-kbd" style="margin:10px 0 0">'+esc(g)+'</div>'+l.map(c=>{ const r=rev(c.id), cor=corDe(c.m);
    const sit=!r?'nova':r.due<=now?'revisar agora':'em '+fmtIv(r.due-now);
    return '<details class="ak-li" data-txt="'+esc((c.f+' '+c.v+' '+(c.t||'')).toLowerCase())+'"'+(cor?' style="--ak-c:'+cor+'"':'')+'><summary><span>'+fmt(c.f)+'</span><small>'+sit+'</small></summary><p>'+fmt(c.v)+'</p>'+(c.own?'<button type="button" class="rm" data-id="'+esc(c.id)+'">apagar carta</button>':'')+'</details>' }).join('')).join('')+'</div>';
  el.querySelector('.ak-busca').oninput=e=>{ const t=e.target.value.toLowerCase().trim(); el.querySelectorAll('.ak-li').forEach(d=>d.hidden=!!t&&!d.dataset.txt.includes(t)) };
  el.querySelectorAll('.rm').forEach(b=>b.onclick=()=>{ apagar(b.dataset.id); listaUI(el,mats) }) }

function criarUI(el,mats){ const opts=(mats&&mats.length?mats:Object.keys(NOMES));
  el.innerHTML='<form class="ak-form"><label>Matéria <select name="m">'+opts.map(m=>'<option value="'+esc(m)+'">'+esc(nomeMat(m))+'</option>').join('')+'</select></label><label>Tópico <input name="t" placeholder="ex.: Planos" maxlength="40"></label><label>Frente (pergunta) <textarea name="f" required maxlength="400"></textarea></label><label>Verso (resposta) <textarea name="v" required maxlength="800"></textarea></label><div class="ak-row"><button class="ak-btn" type="submit">Criar carta</button><span class="ak-msg" aria-live="polite"></span></div></form>';
  const fm=el.querySelector('form'); fm.onsubmit=e=>{ e.preventDefault(); const d=new FormData(fm); const f=String(d.get('f')).trim(), v=String(d.get('v')).trim(); if(!f||!v)return;
    criar(String(d.get('m')),String(d.get('t')).trim(),f,v); fm.reset(); fm.querySelector('[name=m]').value=String(d.get('m')); el.querySelector('.ak-msg').textContent='Carta criada. Ela entra nas revisões como nova.' } }

/* ===== painel (overlay) ===== */
let painel=null, sess=null;
function abrirPainel(mats,aba='revisar'){ css(); fecharPainel(); const ov=document.createElement('div'); ov.className='ak-ov'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-modal','true'); ov.setAttribute('aria-label','Cartas de revisão');
  ov.innerHTML='<div class="ak-panel"><div class="ak-hd"><h2>Cartas · '+esc((mats||[]).map(nomeMat).join(', ')||'todas')+'</h2><button type="button" class="ak-x" aria-label="Fechar">✕</button></div><div class="ak-tabs"><button data-a="revisar">Revisar</button><button data-a="todas">Todas as cartas</button><button data-a="criar">Criar carta</button></div><div class="ak-body"></div></div>';
  document.body.appendChild(ov); painel=ov; const body=ov.querySelector('.ak-body');
  const ir=a=>{ ov.querySelectorAll('.ak-tabs button').forEach(b=>b.classList.toggle('on',b.dataset.a===a)); sess=null;
    if(a==='revisar'){ sess=sessaoUI(body,mats,{onEnd:()=>ir('todas')}) } else if(a==='todas') listaUI(body,mats); else criarUI(body,mats) };
  ov.querySelectorAll('.ak-tabs button').forEach(b=>b.onclick=()=>ir(b.dataset.a));
  ov.querySelector('.ak-x').onclick=fecharPainel; ov.addEventListener('click',e=>{ if(e.target===ov) fecharPainel() });
  ir(aba); ov.querySelector('.ak-x').focus() }
function fecharPainel(){ if(painel){ painel.remove(); painel=null; sess=null } }

/* ===== carta surpresa ===== */
let pop=null;
const POPK='fdb-ak-pop';
function popState(){ const p=ss.get(POPK,null); if(p) return p; const n={count:0,next:Date.now()+rand()}; ss.set(POPK,n); return n }
const rand=()=>(10+Math.random()*10)*MIN;
function mostrarPop(mats){ css(); const f=fila(mats); const c=(f.due[0])||embaralha(f.novas)[0]||embaralha(todas(mats))[0]; if(!c) return false;
  fecharPop(); const w=document.createElement('div'); w.className='ak-pop'; w.setAttribute('role','dialog'); w.setAttribute('aria-label','Carta surpresa');
  w.innerHTML='<div class="ak-card" style="padding:12px 14px 12px"><div class="ak-ph"><span class="ak-tp" style="flex:1"><span>Carta surpresa</span></span><button type="button" class="ak-x" aria-label="Fechar (Esc)">✕</button></div><div class="ak-in"></div><div class="ak-more"><button type="button" data-k="adiar">adiar 30 min</button><button type="button" data-k="off">desligar cartas surpresa</button></div></div>';
  document.body.appendChild(w); pop=w; const inner=w.querySelector('.ak-in');
  const ui=cartaUI(inner,c,{onGrade:(q,res)=>{ inner.innerHTML='<div class="ak-done">'+(q>=3?'✓ ':'')+'Anotado · +'+res.pts+' pts · volta em '+fmtIv(res.r.due-Date.now())+'</div>'; setTimeout(fecharPop,1600) }});
  inner.querySelector('.ak-card').style.cssText='border:0;padding:0;background:transparent';
  w.querySelector('.ak-x').onclick=fecharPop;
  w.querySelector('[data-k=adiar]').onclick=()=>{ const p=popState(); p.next=Date.now()+30*MIN; ss.set(POPK,p); fecharPop() };
  w.querySelector('[data-k=off]').onclick=()=>{ S.prefs.popup=false; save(); fecharPop() };
  const p=popState(); p.count++; p.next=Date.now()+rand(); ss.set(POPK,p); return true }
function fecharPop(){ if(pop){ pop.remove(); pop=null } }

let ocupado=0;
const ZONAS='.calc,.sim,.cv,.simctl,.labgrid,.seg,input,textarea,select,[contenteditable]';
['pointerdown','input','keydown','wheel'].forEach(ev=>addEventListener(ev,e=>{ const t=e.target; if(t&&t.closest&&t.closest(ZONAS)&&!(t.closest('.ak-pop,.ak-ov'))) ocupado=Date.now() },{passive:true,capture:true}));
function automatico(op){ const mats=op.mats, teoria=op.teoria||(()=>true);
  setInterval(()=>{ if(S.prefs.popup===false||pop||painel||document.hidden) return; const p=popState(); if(p.count>=4||Date.now()<p.next) return;
    const a=document.activeElement; if(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
    if(Date.now()-ocupado<90*1000) return; if(!teoria()) return;
    mostrarPop(mats) },20*1000) }

/* ===== teclado: Esc fecha; espaço/1-4 no painel ===== */
addEventListener('keydown',e=>{ if(e.key==='Escape'&&(painel||pop)){ e.preventDefault(); e.stopImmediatePropagation(); if(painel) fecharPainel(); else fecharPop(); return }
  const a=document.activeElement; if(a&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
  const alvo=painel?sess:(jogo&&jogo.sess&&document.body.contains(jogo.el)&&jogo.el.offsetParent?jogo.sess:null);
  if(alvo&&alvo.tecla(e)) e.preventDefault() },true);

/* ===== jogo do hub (aba Revisão) ===== */
let jogo=null;
function montarJogo(el,mats){ css(); if(jogo&&jogo.el===el&&String(jogo.mats)===String(mats)){ if(!jogo.sess) jogo.render(); return } jogo={el,mats,sess:null};
  const painelJogo=()=>{ jogo.sess=null; const st=stats(), f=fila(mats), tot=todas(mats);
    const porMat=mats.map(m=>({m,n:todas([m]).length,d:fila([m]).due.length})).filter(x=>x.n);
    el.innerHTML='<div class="ak-stats"><div class="ak-st"><span>Hoje</span><b>'+(st.n||0)+'<small style="font-size:.9rem;color:var(--ink2)"> / '+meta()+'</small></b><i><em style="width:'+Math.min(100,(st.n||0)/meta()*100)+'%"></em></i></div><div class="ak-st"><span>Sequência</span><b>'+streakAtual()+'<small style="font-size:.9rem;color:var(--ink2)"> '+(streakAtual()===1?'dia':'dias')+'</small></b></div><div class="ak-st"><span>Pontos</span><b>'+(st.pts||0).toLocaleString('pt-BR')+'</b></div><div class="ak-st"><span>Para revisar</span><b>'+f.due.length+'<small style="font-size:.9rem;color:var(--ink2)"> + '+f.novas.length+' novas</small></b></div></div>'+
      '<div class="ak-row"><button type="button" class="ak-btn ak-go"'+(f.lista.length?'':' disabled')+'>'+(f.lista.length?'Começar revisão · '+f.lista.length+' cartas':'Tudo em dia')+'</button><button type="button" class="ak-btn gh ak-all">Todas as cartas</button><button type="button" class="ak-btn gh ak-new">Criar carta</button></div>'+
      '<p class="ak-kbd">Misturo as cartas de '+(porMat.map(x=>esc(nomeMat(x.m))+' ('+x.n+')').join(', ')||'nenhuma matéria ainda')+'. Meta do dia: '+meta()+' cartas; bater a meta em dias seguidos aumenta a sequência. Errei = volta em 10 min; Difícil, Bom e Fácil espaçam cada vez mais.</p>'+
      (porMat.length>1?'<div class="ak-row">'+porMat.map(x=>'<button type="button" class="ak-chip" data-m="'+esc(x.m)+'">Só '+esc(nomeMat(x.m))+(x.d?' · '+x.d:'')+'</button>').join('')+'</div>':'')+
      '<div class="ak-row"><label class="ak-kbd" style="margin:0;display:inline-flex;gap:6px;align-items:center"><input type="checkbox" class="ak-popchk"'+(S.prefs.popup===false?'':' checked')+'> cartas surpresa nas oficinas (a cada 10–20 min, no máx. 4 por visita, só na teoria)</label></div>';
    el.querySelector('.ak-go').onclick=()=>sessao(mats);
    el.querySelector('.ak-all').onclick=()=>abrirPainel(mats,'todas'); el.querySelector('.ak-new').onclick=()=>abrirPainel(mats,'criar');
    el.querySelectorAll('.ak-chip').forEach(b=>b.onclick=()=>sessao([b.dataset.m]));
    el.querySelector('.ak-popchk').onchange=e=>{ S.prefs.popup=e.target.checked; save() } };
  const sessao=ms=>{ el.innerHTML='<div class="ak-row"><button type="button" class="ak-btn gh ak-out">← Painel</button></div><div class="ak-s"></div>'; el.querySelector('.ak-out').onclick=painelJogo; jogo.sess=sessaoUI(el.querySelector('.ak-s'),ms,{onEnd:painelJogo}) };
  jogo.render=painelJogo; painelJogo();
  if(!jogoSub){ jogoSub=true; subs.add(()=>{ if(jogo&&!jogo.sess&&!painel&&jogo.el.offsetParent) jogo.render() }) } }
let jogoSub=false;

/* ===== oficina: botão "Cartas" na navegação + carta surpresa ===== */
function oficina(m){ const nav=document.getElementById('nav'); if(!nav||!m) return;
  const b=document.createElement('button'); b.type='button'; b.className='ak-navbtn'; nav.appendChild(b);
  const upd=()=>{ const n=fila([m]).due.length; b.innerHTML='Cartas'+(n?'<b>'+n+'</b>':'') }; upd(); subs.add(upd); setInterval(upd,60000);
  b.onclick=()=>abrirPainel([m]); css();
  const FORA=['','inicio','lab','problemas','lista','quiz','cola'];
  automatico({mats:[m],teoria:()=>!FORA.includes(location.hash.slice(1))}) }

window.FDB_ANKI={todas,fila,avaliar,criar,apagar,stats,streakAtual,abrirPainel,fecharPainel,mostrarPop,montarJogo,mesclar,substituir,estado:()=>S,KEY,
  contarDue:mats=>fila(mats).due.length, onChange:f=>subs.add(f)};
if(MAT){ if(document.readyState==='loading') addEventListener('DOMContentLoaded',()=>oficina(MAT)); else oficina(MAT) }
})();
