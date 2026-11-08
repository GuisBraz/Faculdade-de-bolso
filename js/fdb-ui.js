/* Faculdade de Bolso · interface v2 (todas as páginas)
   - cabeçalho retrátil: some ao rolar para baixo, volta ao rolar para cima; botão recolhe o menu
   - índice automático em cada módulo ("Neste módulo" + o que tem nele)
   - início das oficinas: cartão de progresso, acesso rápido, sobre e como estudar
   - superfície 3D azul→laranja no topo do hub */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const store={get(k){ try{ return localStorage.getItem(k) }catch(e){ return null } },set(k,v){ try{ localStorage.setItem(k,v) }catch(e){} }};
const ICON={up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"/></svg>'};

/* ---------- cabeçalho retrátil ---------- */
function header(){ const h=$$('header').find(x=>!x.classList.contains('phead')&&!x.classList.contains('top')); if(!h) return;
  const brand=$('.brand',h);
  if(brand&&$('nav',h)){ const b=document.createElement('button'); b.type='button'; b.className='fdb-tog'; b.innerHTML=ICON.up;
    const sync=()=>{ const m=h.classList.contains('fdb-min'); b.setAttribute('aria-label',m?'Mostrar o menu':'Recolher o menu'); b.title=m?'Mostrar o menu':'Recolher o menu' };
    if(store.get('fdb-hmin')==='1') h.classList.add('fdb-min'); sync();
    b.onclick=()=>{ h.classList.toggle('fdb-min'); store.set('fdb-hmin',h.classList.contains('fdb-min')?'1':'0'); sync() };
    brand.appendChild(b) }
  const peek=document.createElement('button'); peek.type='button'; peek.className='fdb-peek'; peek.innerHTML='☰ Menu'; document.body.appendChild(peek);
  let last=scrollY, hid=false;
  const set=v=>{ if(v===hid) return; hid=v; h.classList.toggle('fdb-hide',v); peek.classList.toggle('on',v) };
  peek.onclick=()=>set(false);
  addEventListener('scroll',()=>{ const y=scrollY, d=y-last; if(y<90) set(false); else if(d>8) set(true); else if(d<-8) set(false); last=y },{passive:true});
  addEventListener('hashchange',()=>set(false));
  h.addEventListener('focusin',()=>set(false)) }

/* ---------- índice de cada módulo ---------- */
function slug(t){ return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,50) }
function tocs(){ $$('section.view').forEach(sec=>{ if(sec.id==='v-inicio'||$('.fdb-toc',sec)) return; const hs=$$(':scope > h3',sec); if(hs.length<3) return;
    const n=s=>$$(s,sec).length; const f=n('.fx'), d3=n('.cv'), sim=n('.calc')+n('.cv.sim')+n('[type=range]')/2|0, ex=n('.ex'), q=n('.qitem');
    const tt=[f&&'📐 '+f+' fórmula'+(f>1?'s':''), d3&&'🧊 '+d3+' modelo'+(d3>1?'s':'')+' 3D/2D', sim&&'🎛️ interativo', ex&&'🧪 '+ex+' exemplo'+(ex>1?'s':''), q&&'✍️ '+q+' exercício'+(q>1?'s':'')].filter(Boolean);
    hs.forEach(h=>{ if(!h.id) h.id=sec.id.replace('v-','')+'-'+slug(h.textContent) });
    const box=document.createElement('div'); box.className='fdb-toc'; box.setAttribute('role','navigation'); box.setAttribute('aria-label','Neste módulo');
    box.innerHTML='<div class="fdb-tt"><b>Neste módulo</b>'+tt.map(t=>'<span>'+t+'</span>').join('')+'</div><div class="fdb-ch">'+hs.map(h=>'<a href="#'+h.id+'" data-toc>'+h.textContent.replace(/^\s*\d+\s*·\s*/,'')+'</a>').join('')+'</div>';
    const after=$(':scope > .lede',sec)||$(':scope > h2',sec); if(after) after.after(box); else sec.prepend(box);
    box.addEventListener('click',e=>{ const a=e.target.closest('[data-toc]'); if(!a) return; e.preventDefault(); const t=document.getElementById(a.getAttribute('href').slice(1)); t&&t.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'}) }) }) }

/* ---------- início das oficinas ---------- */
function G(n){ try{ return Function('return typeof '+n+'!=="undefined"?'+n+':undefined')() }catch(e){ return undefined } }
function home(){ const ini=$('#v-inicio'), hero=$('#v-inicio > .hero'), M=G('MODS'); if(!ini||!hero||!Array.isArray(M)) return;
  const top=document.createElement('div'); top.className='fdb-top'; hero.before(top); top.appendChild(hero);
  const pc=document.createElement('aside'); pc.className='pcard'; pc.setAttribute('aria-label','Seu progresso'); top.appendChild(pc);
  const h3=$$(':scope > h3',ini).find(h=>/trilha/i.test(h.textContent)); if(h3) h3.textContent='Acesso rápido';
  const cta=$('.btns a.btn',hero), ctaTxt=cta?cta.textContent:'', ctaHref=cta?cta.getAttribute('href'):'';
  const upd=()=>{ const done=G('done')||{}; const n=M.filter(m=>done[m[0]]).length, p=Math.round(n/M.length*100), nx=M.find(m=>!done[m[0]]);
    const C=2*Math.PI*46;
    pc.innerHTML='<h4><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="7" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>Progresso da disciplina</h4>'+
      '<div class="row"><div class="ring"><svg viewBox="0 0 110 110"><circle cx="55" cy="55" r="46" fill="none" stroke="var(--line)" stroke-width="11"/><circle cx="55" cy="55" r="46" fill="none" stroke="var(--c1)" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+(C*p/100).toFixed(1)+' '+C.toFixed(1)+'"/></svg><b>'+p+'%</b></div>'+
      '<div class="md"><span>Módulos concluídos</span><strong>'+n+' de '+M.length+'</strong></div></div>'+
      (nx?'<a class="nx" href="#'+nx[0]+'"><div><small>Próximo tópico</small><span>'+nx[1]+'</span></div><i aria-hidden="true">›</i></a>':'<a class="nx" href="#quiz"><div><small>Tudo estudado 🎉</small><span>Teste no quiz</span></div><i aria-hidden="true">›</i></a>');
    if(cta){ if(n&&nx){ cta.textContent='▶ Continuar de onde parou'; cta.setAttribute('href','#'+nx[0]) } else { cta.textContent=ctaTxt; cta.setAttribute('href',ctaHref) } } };
  upd(); const pt=$('#progtxt'); if(pt) new MutationObserver(upd).observe(pt,{childList:true,characterData:true,subtree:true});
  const sub=($('header .brand a[href="#inicio"]')||{}).textContent||'esta matéria';
  const duo=document.createElement('div'); duo.className='fdb-duo';
  duo.innerHTML='<div class="fdb-card"><h3>Sobre a oficina</h3><p>Uma jornada completa por '+sub.replace(/^\s*Oficina de\s*/i,'')+', unindo teoria, prática e visualização: cada assunto explicado do zero em linguagem simples, cada fórmula com o significado de cada letra, exemplos da caldeiraria e da usinagem e modelos para girar e mexer.</p>'+
    '<div class="fdb-feat"><span><i>📘</i>Conteúdo completo</span><span><i>🧊</i>Visualização 3D</span><span><i>✓</i>Exercícios resolvidos</span></div></div>'+
    '<div class="fdb-card"><h3>Como estudar?</h3><ol class="fdb-steps"><li>Leia o módulo na ordem: explicação, fórmula com cada letra explicada e exemplos práticos.</li><li>Mexa nos modelos 3D e nos simuladores até ver o que cada variável faz.</li><li>Resolva os exercícios antes de abrir o gabarito; tire as dúvidas com a professora.</li><li>Marque o módulo como estudado e acompanhe seu progresso aqui no início.</li></ol>'+
    '<svg class="deco" viewBox="0 0 100 140" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><circle cx="50" cy="16" r="9"/><path d="M45 24 18 132M55 24l27 108M30 82h40"/></svg></div>';
  ini.appendChild(duo) }

/* ---------- rodapé ---------- */
function foot(){ const f=$('body > footer'); if(!f||$('.fdb-foot',f)) return; const w=document.createElement('div'); w.className='fdb-foot';
  const l=document.createElement('div'); while(f.firstChild) l.appendChild(f.firstChild); w.appendChild(l);
  w.insertAdjacentHTML('beforeend','<div class="tl">Estude hoje,<br>conquiste amanhã.</div>'); f.appendChild(w) }

/* ---------- superfície 3D do hub ---------- */
function surface(cv){ const x=cv.getContext('2d'); let t=0, raf=0;
  const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const mix=(a,b,k)=>{ const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)); const A=p(a),B=p(b); return 'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*k)).join(',')+')' };
  const draw=()=>{ const r=cv.getBoundingClientRect(), d=devicePixelRatio||1; if(!r.width){ raf=requestAnimationFrame(draw); return }
    cv.width=r.width*d; cv.height=r.height*d; x.setTransform(d,0,0,d,0,0); const W=r.width,H=r.height; x.clearRect(0,0,W,H);
    const N=26, S=Math.min(W,H)*.36, a=.75+t*.15, c=Math.cos(a), s=Math.sin(a), el=.55, ce=Math.cos(el), se=Math.sin(el);
    const f=(u,v)=>Math.sin(u*1.25+t)*Math.cos(v*1.1)*.9+Math.sin(u*.6-v*.8)*.35;
    const P=(u,v)=>{ const z=f(u,v); const X=u*c-v*s, Y=u*s+v*c; return [W/2+X*S/3, H/2+ (Y*se - z*ce)*S/3*1.05, Y, z] };
    const L=-3, st=6/N, q=[]; for(let i=0;i<N;i++)for(let j=0;j<N;j++){ const u=L+i*st, v=L+j*st; const p=[P(u,v),P(u+st,v),P(u+st,v+st),P(u,v+st)]; q.push({p,d:(p[0][2]+p[2][2])/2,z:(p[0][3]+p[2][3])/2}) }
    q.sort((A,B)=>A.d-B.d); const c1=css('--c2')||'#1E62C9', c2=css('--c1')||'#F26B1D';
    for(const k of q){ const z=(k.z+1.25)/2.5; x.beginPath(); k.p.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])); x.closePath();
      x.fillStyle=mix(c1.length===7?c1:'#1E62C9',c2.length===7?c2:'#F26B1D',Math.max(0,Math.min(1,z))); x.globalAlpha=.92; x.fill(); x.globalAlpha=.35; x.strokeStyle='#0E1F38'; x.lineWidth=.6; x.stroke(); x.globalAlpha=1 }
    if(!RM){ t+=.006; raf=requestAnimationFrame(draw) } };
  draw() }
function hub(){ const top=$('header.top'); if(!top||$('.fdb-hsurf')) return; const tt=$('.tt',top);
  if(tt&&!$('.eyebrow',tt)) tt.insertAdjacentHTML('afterbegin','<div class="eyebrow">Bem-vindo à sua faculdade de bolso</div>');
  const cv=document.createElement('canvas'); cv.className='fdb-hsurf'; cv.setAttribute('aria-hidden','true'); top.insertBefore(cv,top.children[1]||null); surface(cv) }

/* ---------- menu "Aulas": junta os módulos num botão ---------- */
function aulas(){ const nav=$('header nav#nav'); if(!nav) return; const ms=$$(':scope > a[data-m]',nav); if(ms.length<4) return;
  const wrap=document.createElement('div'); wrap.className='fdb-aulas';
  wrap.innerHTML='<button type="button" class="fdb-ab" aria-expanded="false">▶ Aulas <small>'+ms.length+'</small> <span aria-hidden="true">▾</span></button><div class="fdb-am" hidden></div>';
  ms[0].before(wrap); const pan=$('.fdb-am',wrap), bt=$('.fdb-ab',wrap); ms.forEach(a=>pan.appendChild(a));
  const open=v=>{ pan.hidden=!v; bt.setAttribute('aria-expanded',v); if(v&&innerWidth<=640){ const h=wrap.closest('header'); pan.style.top=(h?h.getBoundingClientRect().bottom:60)+6+'px' } else pan.style.top='' };
  bt.onclick=e=>{ e.stopPropagation(); open(pan.hidden) };
  document.addEventListener('click',e=>{ if(!wrap.contains(e.target)) open(false) });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') open(false) });
  const sync=()=>{ open(false); const on=ms.some(a=>a.getAttribute('href')===location.hash); bt.classList.toggle('on',on); if(on) setTimeout(()=>{ const sx=scrollX,sy=scrollY; bt.scrollIntoView({block:'nearest',inline:'center'}); scrollTo(sx,sy) },30) };
  addEventListener('hashchange',sync); sync() }

function boot(){ aulas(); header(); tocs(); home(); foot(); hub() }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
