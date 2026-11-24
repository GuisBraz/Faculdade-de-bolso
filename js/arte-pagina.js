/* FACULDADE DE BOLSO · Oficina de Desenho artístico: rotas, aulas, diário e quiz */
(function(){
'use strict';
const D=window.FDB_ARTE, U=window.FDB_ARTE_UI, $=id=>document.getElementById(id);
const AU=D.aulas, TR=Object.fromEntries(D.trilhas.map(t=>[t.id,t]));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* progresso: arte-done guarda as aulas feitas e os dias desenhados (_dias); arte-quiz as respostas */
let done={}, qa={};
try{ done=JSON.parse(localStorage.getItem('arte-done')||'{}')||{}; qa=JSON.parse(localStorage.getItem('arte-quiz')||'{}')||{} }catch(e){}
done._dias=done._dias||{};
const save=()=>{ try{ localStorage.setItem('arte-done',JSON.stringify(done)); localStorage.setItem('arte-quiz',JSON.stringify(qa)) }catch(e){} };
const hoje=()=>{ const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0') };
const dkey=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
window.FDB_ARTE_DIA=()=>{ done._dias[hoje()]=1; save(); renderDiario() };

/* ---------- diário: sequência de dias e as últimas 5 semanas ---------- */
function seq(){ let n=0; const d=new Date(); if(!done._dias[dkey(d)]) d.setDate(d.getDate()-1); while(done._dias[dkey(d)]){ n++; d.setDate(d.getDate()-1) } return n }
function renderDiario(){ const box=$('diario'); if(!box) return; const n=seq(), tot=Object.keys(done._dias).length, fez=!!done._dias[hoje()];
  const d0=new Date(); d0.setDate(d0.getDate()-d0.getDay()-28); let cel='';
  ['D','S','T','Q','Q','S','S'].forEach(x=>cel+='<b>'+x+'</b>');
  for(let i=0;i<35;i++){ const d=new Date(d0); d.setDate(d0.getDate()+i); const k=dkey(d); cel+='<i class="'+(done._dias[k]?'on ':'')+(k===hoje()?'hj':'')+'" title="'+d.toLocaleDateString('pt-BR')+'"></i>' }
  box.innerHTML='<div class="big">'+n+'<small>'+(n===1?'dia seguido':'dias seguidos')+'</small></div><div><b style="font-family:var(--f-disp)">Diário de desenho</b> · '+tot+' '+(tot===1?'dia desenhado':'dias desenhados')+'<div class="cal" style="margin-top:8px">'+cel+'</div>'+
    '<div class="btns"><button type="button" id="hojeBtn" class="'+(fez?'ghost':'')+'">'+(fez?'✓ Desenhei hoje':'Desenhei hoje')+'</button>'+(prox()?'<a class="btn ghost" style="text-decoration:none;background:transparent;color:var(--ink)" href="#'+prox().id+'">Próxima aula: '+esc(prox().t)+' →</a>':'')+'</div></div>';
  $('hojeBtn').onclick=()=>{ if(done._dias[hoje()]) delete done._dias[hoje()]; else done._dias[hoje()]=1; save(); renderDiario() } }
const prox=()=>AU.find(a=>!done[a.id]);

/* ---------- início ---------- */
function renderInicio(){
  $('trilhas').innerHTML=D.trilhas.map(t=>{ const L=AU.filter(a=>a.tr===t.id), n=L.filter(a=>done[a.id]).length;
    return '<a class="trc" style="--tc:'+t.cor+'" href="#t-'+t.id+'"><span class="em">'+t.ic+'</span><b>'+t.nome+'</b><span>'+t.sub+'</span><div class="pb"><i style="width:'+(n/L.length*100)+'%"></i></div><small>'+n+' de '+L.length+' aulas</small></a>' }).join('');
  $('matl').innerHTML=D.material.map(m=>'<li><b>'+m[0]+'</b> · '+m[1]+'</li>').join('');
  const p=prox(); const c=$('contBtn'); if(p&&Object.keys(done).some(k=>k!=='_dias'&&done[k])){ c.href='#'+p.id; c.textContent='Continuar: '+p.t+' →' } else if(!p){ c.href='#t-artista'; c.textContent='Curso concluído! Rever as trilhas →' }
  renderDiario() }

/* ---------- lista de uma trilha ---------- */
function renderTrilha(id){ const t=TR[id], L=AU.filter(a=>a.tr===id); const sec=$('v-trilha'); sec.style.setProperty('--ac',t.cor);
  const niv=['Básico','Intermediário','Avançado'];
  sec.innerHTML='<div class="eyebrow" style="color:'+t.cor+'">Trilha '+(D.trilhas.indexOf(t)+1)+' de 4</div><h2>'+t.ic+' '+t.nome+'</h2><p class="lede">'+t.sub+'</p>'+
    niv.map(nv=>{ const A=L.filter(a=>a.niv===nv); if(!A.length) return ''; return '<h3>'+nv+' <span class="pill">'+A.length+' aulas</span></h3>'+A.map(a=>{ const k=L.indexOf(a)+1;
      return '<a class="aul'+(done[a.id]?' done':'')+'" href="#'+a.id+'"><span class="n">'+(done[a.id]?'✓':k)+'</span><b>'+esc(a.t)+'</b><span>'+esc(a.r)+'</span><em>'+(a.tool?'🛠️':'')+'</em></a>' }).join('') }).join('')+
    '<div class="nav2"><a href="#inicio">← Início</a>'+(D.trilhas[D.trilhas.indexOf(t)+1]?'<a href="#t-'+D.trilhas[D.trilhas.indexOf(t)+1].id+'">Próxima trilha: '+D.trilhas[D.trilhas.indexOf(t)+1].nome+' →</a>':'<a href="#quiz">Fazer o quiz →</a>')+'</div>' }

/* ---------- uma aula ---------- */
let toolDraw=null;
function renderAula(a){ const t=TR[a.tr], L=AU.filter(x=>x.tr===a.tr), k=L.indexOf(a), sec=$('v-aula'), gi=AU.indexOf(a), pv=AU[gi-1], nx=AU[gi+1]; sec.style.setProperty('--ac',t.cor);
  const tot=a.s30.reduce((s,f)=>s+f[1],0), longo=tot>30;
  sec.innerHTML='<div class="eyebrow" style="color:'+t.cor+'">'+t.ic+' Trilha '+t.nome+' · '+a.niv+' · Aula '+(k+1)+' de '+L.length+'</div><h2>'+esc(a.t)+'</h2><p class="lede">'+esc(a.r)+'</p>'+
    a.ideia.map(p=>'<p>'+p+'</p>').join('')+
    (a.fig?'<h3>Passo a passo</h3>'+U.figHTML(a.fig):'')+(a.fig2?U.figHTML(a.fig2):'')+
    (a.tool&&a.tool!=='timer'?'<div class="wid" id="aTool"></div>':'')+
    '<div class="ses"><h4>'+(longo?'Projeto em sessões de 30 min':'Sessão de hoje · 30 min')+'</h4><ul class="fases">'+a.s30.map(f=>'<li><span class="t">'+f[1]+' min</span><span><b>'+f[0]+'.</b> '+f[2]+'</span></li>').join('')+'</ul>'+
    '<div class="curto"><b>Dia corrido · 10 min:</b> '+a.s10.map((s,i)=>['2 min','7 min','1 min'][i]+' '+s.charAt(0).toLowerCase()+s.slice(1)).join(' → ')+'</div>'+
    '<div class="btns"><button type="button" id="s30">▶ Começar '+(longo?'uma sessão de 30 min':'a sessão de 30 min')+'</button><button type="button" class="ghost" id="s10">Dia corrido · 10 min</button></div><div id="sBox"></div></div>'+
    '<h3>Pronto quando…</h3><ul class="chk">'+a.ok.map((o,i)=>'<li><label><input type="checkbox" data-c="'+i+'"'+(((done['c_'+a.id]||0)>>i)&1?' checked':'')+'> <span>'+o+'</span></label></li>').join('')+'</ul>'+
    '<div class="cuid"><span class="k">Erro comum</span>'+a.erro+'</div>'+
    '<div class="done-btn"><button type="button" id="feito" class="'+(done[a.id]?'isdone':'')+'">'+(done[a.id]?'✓ Aula feita':'Marcar aula como feita')+'</button></div>'+
    '<div class="nav2">'+(pv?'<a href="#'+pv.id+'">← '+esc(pv.t)+'</a>':'<a href="#inicio">← Início</a>')+(nx?'<a href="#'+nx.id+'">'+(nx.tr!==a.tr?'Nova trilha: ':'')+esc(nx.t)+' →</a>':'<a href="#quiz">Fazer o quiz →</a>')+'</div>';
  const fases30=longo?[['Aquecimento',5,'Linhas e formas soltas.'],['Projeto',20,'Avance uma etapa do projeto.'],['Fechamento',5,'Foto do progresso e anote a próxima etapa.']]:a.s30;
  const fim=()=>{ window.FDB_ARTE_DIA() };
  $('s30').onclick=()=>U.sessao($('sBox'),fases30,fim);
  $('s10').onclick=()=>U.sessao($('sBox'),[['Aquecimento',2,a.s10[0]],['Exercício',7,a.s10[1]],['Fechamento',1,a.s10[2]]],fim);
  sec.querySelectorAll('.chk input').forEach(c=>c.onchange=()=>{ let m=0; sec.querySelectorAll('.chk input').forEach((x,i)=>{ if(x.checked) m|=1<<i }); done['c_'+a.id]=m; if(m===(1<<a.ok.length)-1&&!done[a.id]){ done[a.id]=true; $('feito').className='isdone'; $('feito').textContent='✓ Aula feita' } save(); prog() });
  $('feito').onclick=()=>{ done[a.id]=!done[a.id]; save(); $('feito').className=done[a.id]?'isdone':''; $('feito').textContent=done[a.id]?'✓ Aula feita':'Marcar aula como feita'; prog() };
  toolDraw=null; if(a.tool&&a.tool!=='timer'){ toolDraw=U.T[a.tool]($('aTool'))||null }
  else if(a.tool==='timer'){ /* a aula da rotina já tem o cronômetro */ } }

/* ---------- ferramentas ---------- */
let ferrDraws=[];
function renderFerr(){ const box=$('ferr'); if(box.dataset.ok) return; box.dataset.ok=1;
  ['esfera','perspectiva','proporcao','rosto','cores','valores','flipbook','timer'].forEach(k=>{ const d=document.createElement('div'); d.className='wid'; box.appendChild(d); const f=U.T[k](d); if(f) ferrDraws.push(f) }) }

/* ---------- quiz ---------- */
const QUIZ=D.quiz;
function renderQuiz(){ const box=$('quizBox'); box.innerHTML=QUIZ.map((q,i)=>'<div class="qz" data-i="'+i+'"><b>'+(i+1)+'. '+q[0]+'</b><div class="opts">'+q[1].map((o,j)=>'<button data-j="'+j+'">'+o+'</button>').join('')+'</div><div class="why" hidden></div></div>').join('');
  box.querySelectorAll('.qz').forEach(c=>{ const i=+c.dataset.i,q=QUIZ[i]; const bs=c.querySelectorAll('button');
    const show=j=>{ bs.forEach((b,k)=>{ b.disabled=true; if(k===q[2]) b.classList.add('right'); else if(k===j) b.classList.add('wrong') }); const w=c.querySelector('.why'); w.hidden=false; w.innerHTML=(j===q[2]?'<b style="color:var(--ok)">Certo!</b> ':'<b style="color:var(--bad)">Errado.</b> ')+q[3] };
    bs.forEach(b=>b.onclick=()=>{ const j=+b.dataset.j; qa[i]=j; show(j); score(); save() }); if(qa[i]!==undefined) show(qa[i]) }); score() }
function score(){ const n=Object.keys(qa).length, ok=Object.entries(qa).filter(([i,j])=>QUIZ[i]&&QUIZ[i][2]===j).length; $('scoreTxt').textContent=ok+' certas · '+n+' de '+QUIZ.length+' respondidas' }
$('quizReset').onclick=()=>{ qa={}; save(); renderQuiz() };

/* ---------- progresso e rotas ---------- */
function prog(){ const n=AU.filter(a=>done[a.id]).length; $('progtxt').textContent=n+'/'+AU.length+' aulas'; $('progbar').style.width=(n/AU.length*100)+'%' }
const VIEWS=['inicio','trilha','aula','ferramentas','quiz','cola'];
function route(){ let h=location.hash.slice(1)||'inicio', v='inicio', navOn='#inicio';
  const a=AU.find(x=>x.id===h);
  if(a){ v='aula'; renderAula(a); navOn='#t-'+a.tr }
  else if(/^t-/.test(h)&&TR[h.slice(2)]){ v='trilha'; renderTrilha(h.slice(2)); navOn='#'+h }
  else if(VIEWS.includes(h)&&h!=='aula'&&h!=='trilha'){ v=h; navOn='#'+h }
  if(v==='inicio') renderInicio(); if(v==='ferramentas') renderFerr();
  VIEWS.forEach(x=>$('v-'+x).hidden=x!==v);
  document.querySelectorAll('#nav a').forEach(l=>{ const on=l.getAttribute('href')===navOn; l.classList.toggle('on',on); if(on) l.scrollIntoView({block:'nearest',inline:'center'}) });
  window.scrollTo(0,0);
  requestAnimationFrame(()=>{ toolDraw&&v==='aula'&&toolDraw(); if(v==='ferramentas') ferrDraws.forEach(f=>f()) }) }
let rz=0; addEventListener('resize',()=>{ clearTimeout(rz); rz=setTimeout(()=>{ toolDraw&&toolDraw(); ferrDraws.forEach(f=>f()) },120) });
renderQuiz(); prog(); addEventListener('hashchange',route); route();
addEventListener('keydown',e=>{ if(e.key!=='Escape'||e.defaultPrevented) return; const el=document.activeElement; if(el&&/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)){ el.blur(); return }
  const h=location.hash.slice(1); const a=AU.find(x=>x.id===h); if(a){ location.hash='t-'+a.tr; return } if(h&&h!=='inicio'){ location.hash='inicio'; return } location.href='../../index.html#m-arte' });
})();
