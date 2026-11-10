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
function header(){ const h=$$('header').find(x=>!x.classList.contains('phead')&&!x.classList.contains('top'))||$('.fdb-hh'); if(!h) return;
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
    const box=document.createElement('div'); box.className='fdb-toc'; box.setAttribute('role','navigation'); box.setAttribute('aria-label','Nesta aula');
    box.innerHTML='<div class="fdb-tt"><b>Nesta aula</b>'+tt.map(t=>'<span>'+t+'</span>').join('')+'</div><div class="fdb-ch">'+hs.map(h=>'<a href="#'+h.id+'" data-toc>'+h.textContent.replace(/^\s*\d+\s*·\s*/,'')+'</a>').join('')+'</div>';
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
  if(!document.body.classList.contains('fdb-mat')) ini.appendChild(duo) }

/* ---------- rodapé fixo ---------- */
function foot(){ const f=$('body > footer')||$('main > footer'); if(!f||f.classList.contains('ffix')) return;
  f.className='ffix'; f.removeAttribute('style');
  f.innerHTML='<span>Faculdade de Bolso · IFMG · Campus Betim - Desenvolvido por Guilherme dos Santos Braz</span><a href="https://www.linkedin.com/in/guilherme-santos-66b8162a0" target="_blank" rel="noopener">LinkedIn</a>' }

/* ---------- superfície 3D do hub ---------- */
function surface(cv){ const x=cv.getContext('2d'); let t=0, raf=0;
  const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const mix=(a,b,k)=>{ const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)); const A=p(a),B=p(b); return 'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*k)).join(',')+')' };
  let vis=true, cor=null; if('IntersectionObserver' in window) new IntersectionObserver(es=>{ vis=es[0].isIntersecting; if(vis&&!raf&&!RM) raf=requestAnimationFrame(draw) }).observe(cv);
  addEventListener('fdb:aba',()=>{ cor=null }); new MutationObserver(()=>{ cor=null }).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme','class']}); matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{ cor=null });
  const draw=()=>{ raf=0; if(!vis||document.hidden){ if(document.hidden) raf=setTimeout(()=>{ raf=0; draw() },700); return } const r=cv.getBoundingClientRect(), d=Math.min(2,devicePixelRatio||1); if(!r.width){ raf=setTimeout(()=>{ raf=0; draw() },500); return }
    const cw=Math.round(r.width*d), ch=Math.round(r.height*d); if(cv.width!==cw||cv.height!==ch){ cv.width=cw; cv.height=ch } x.setTransform(d,0,0,d,0,0); const W=r.width,H=r.height; x.clearRect(0,0,W,H);
    const N=26, S=Math.min(W,H)*.36, a=.75+t*.15, c=Math.cos(a), s=Math.sin(a), el=.55, ce=Math.cos(el), se=Math.sin(el);
    const f=(u,v)=>Math.sin(u*1.25+t)*Math.cos(v*1.1)*.9+Math.sin(u*.6-v*.8)*.35;
    const P=(u,v)=>{ const z=f(u,v); const X=u*c-v*s, Y=u*s+v*c; return [W/2+X*S/3, H/2+ (Y*se - z*ce)*S/3*1.05, Y, z] };
    const L=-3, st=6/N, q=[]; for(let i=0;i<N;i++)for(let j=0;j<N;j++){ const u=L+i*st, v=L+j*st; const p=[P(u,v),P(u+st,v),P(u+st,v+st),P(u,v+st)]; q.push({p,d:(p[0][2]+p[2][2])/2,z:(p[0][3]+p[2][3])/2}) }
    q.sort((A,B)=>A.d-B.d); if(!cor) cor=[css('--c2')||'#1E62C9',css('--c1')||'#F26B1D']; const c1=cor[0], c2=cor[1];
    for(const k of q){ const z=(k.z+1.25)/2.5; x.beginPath(); k.p.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])); x.closePath();
      x.fillStyle=mix(c1.length===7?c1:'#1E62C9',c2.length===7?c2:'#F26B1D',Math.max(0,Math.min(1,z))); x.globalAlpha=.92; x.fill(); x.globalAlpha=.35; x.strokeStyle='#0E1F38'; x.lineWidth=.6; x.stroke(); x.globalAlpha=1 }
    if(!RM){ t+=.006; raf=requestAnimationFrame(draw) } };
  draw() }
function hub(){ const top=$('header.top'); if(!top||$('.fdb-hsurf')) return; const tt=$('.tt',top);
  if(tt&&!$('.eyebrow',tt)) tt.insertAdjacentHTML('afterbegin','<div class="eyebrow">Bem-vindo à sua faculdade de bolso</div>');
  const cv=document.createElement('canvas'); cv.className='fdb-hsurf'; cv.setAttribute('aria-hidden','true'); top.insertBefore(cv,top.children[1]||null); surface(cv) }


/* ---------- qual matéria é esta página ---------- */
const PASTA={calc2:'calc2',fis1:'fis1',gaal:'gaal',qg:'qg',usinagem:'usin',ingles:'ingl'};
const NOMEM={calc2:['Cálculo','II'],fis1:['Física','I'],gaal:['GAAL',''],qg:['Química',''],usin:['Usinagem',''],ingl:['Inglês','']};
function labJogo(id){ return (window.FDB_LABS||[]).find(l=>l.mat===id)||null }
/* oficinas sem módulos: põe o laboratório-jogo no menu do topo */
function labNoMenu(){ const id=matDaPagina(), L=labJogo(id), nav=$('header nav#nav'); if(!L||!nav||document.body.classList.contains('fdb-mat')||$('a.fdb-lj',nav)) return;
  const a=document.createElement('a'); a.className='fdb-lj'; a.href='../../'+L.url; a.textContent=L.ic+' '+L.nome; nav.appendChild(a) }
function matDaPagina(){ const m=location.pathname.match(/materias\/([a-z0-9]+)\//); return m?PASTA[m[1]]:null }
const TEMA=id=>!id?'geral':/^calc/.test(id)?'calc':/^(fis|labf)/.test(id)?'fis':/^(qg|labq)/.test(id)?'qg':id==='gaal'?'gaal':/^(usin|usi|labu|pf)/.test(id)?'usin':id==='ingl'?'ingl':/^(dt|desenho)/.test(id)?'desenho':'geral';

/* ---------- logo e título da oficina ---------- */
function brandOficina(){ const id=matDaPagina(); if(!id) return; const a=$('header .brand a[href="#inicio"]')||$('header .brand .logo'); if(!a) return;
  const A=(window.FDB_AULAS||{})[id]||{}, nm=NOMEM[id]||['',''];
  a.innerHTML='<span class="fdb-logo" aria-hidden="true">'+(A.simbolo||'◆')+'</span><span class="fdb-lt">Oficina de<br><b>'+nm[0]+(nm[1]?' <em>'+nm[1]+'</em>':'')+'</b></span>';
  a.style.display='flex'; a.style.alignItems='center'; a.style.gap='10px' }

/* ---------- aulas agrupadas por módulo (prova) no menu ---------- */
function eyebrows(){ const id=matDaPagina(), A=(window.FDB_AULAS||{})[id]; if(!A||!A.modulos) return;
  [1,2,3].forEach(n=>(A.modulos[n]||[]).forEach(([v],i)=>{ const k=i+1; const sec=document.getElementById('v-'+v); const e=sec&&sec.querySelector(':scope > .eyebrow'); if(!e) return;
    const resto=e.textContent.replace(/^\s*Módulo\s*\d+\s*·?\s*/i,'').replace(/^Aula de /i,'aula de ');
    e.textContent='Módulo '+n+' · Aula '+k+(resto?' · '+resto:'') })) }
function aulasPorModulo(){ const id=matDaPagina(), A=(window.FDB_AULAS||{})[id]; const pan=$('.fdb-am'); if(!A||!A.modulos||!pan) return;
  const links=$$('a[data-m]',pan); const byId=Object.fromEntries(links.map(a=>[a.dataset.m,a])); pan.innerHTML='';
  [1,2,3].forEach(n=>{ const L=A.modulos[n]||[]; const h=document.createElement('div'); h.className='fdb-amh'; h.textContent='Módulo '+n+' · '+n+'ª prova'+(L.length?'':' · em breve'); pan.appendChild(h);
    L.forEach(([v,t],i)=>{ const k=i+1, a=byId[v]; if(!a) return; delete byId[v]; a.innerHTML='<small>Aula '+k+'</small> '+t; pan.appendChild(a) }) });
  Object.values(byId).forEach(a=>pan.appendChild(a));
  const b=$('.fdb-ab'); if(b) b.firstChild.textContent='▶ Aulas ' }

/* ---------- atalhos vindos do hub: ?ir=pratica | exercicios ---------- */
function irPara(){ const ir=new URLSearchParams(location.search).get('ir'); if(!ir) return;
  setTimeout(()=>{ const sec=$$('section.view').find(x=>!x.hidden); if(!sec) return;
    const alvo=ir==='pratica'?$('.cv,.calc,.dot2d,canvas,[type=range]',sec):($('.qitem',sec)||$$('h3',sec).find(h=>/exerc/i.test(h.textContent)));
    if(alvo){ (alvo.closest('.calc,.cv,.labgrid2,.qitem')||alvo).scrollIntoView({behavior:RM?'auto':'smooth',block:'start'}) }
    else if(ir==='exercicios'){ const A=(window.FDB_AULAS||{})[matDaPagina()]; if(A&&A.lista) location.hash=A.lista } },500) }

/* ---------- último estudo (o hub mostra "Continuar de onde parou") ---------- */
function lembrar(){ const id=matDaPagina(); if(!id) return; const nm=NOMEM[id]||['',''];
  const go=()=>{ const sec=$$('section.view').find(x=>!x.hidden); const h=sec&&$('h2',sec); const v=location.hash.slice(1)||'inicio';
    const t=nm[0]+(nm[1]?' '+nm[1]:'')+(v!=='inicio'&&h?' · '+h.textContent.replace(/:.*/,'').trim():'');
    store.set('fdb-last',JSON.stringify({u:location.pathname.replace(/^.*?(materias\/)/,'$1')+(v!=='inicio'?'#'+v:''),t,d:Date.now()})) };
  addEventListener('hashchange',()=>setTimeout(go,50)); setTimeout(go,300) }

/* ---------- papel de parede a lápis ---------- */
const DOO={
 eixos:'<path d="M60 75V8M60 75l52 26M60 75 8 101"/><path d="M60 8l-4 9M60 8l4 9M112 101l-9-1M8 101l9-1"/>',
 malha:(()=>{ let d=''; for(let i=0;i<7;i++){ let a='',b=''; for(let j=0;j<=12;j++){ const x=j*10, y=i*9+Math.sin(j*.6+i*.5)*6; a+=(j?'L':'M')+(x+i*4).toFixed(1)+' '+(y+20).toFixed(1); } d+='<path d="'+a+'"/>' } for(let j=0;j<=12;j+=2){ let a=''; for(let i=0;i<7;i++){ const x=j*10+i*4, y=i*9+Math.sin(j*.6+i*.5)*6+20; a+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1) } d+='<path d="'+a+'"/>' } return d })(),
 curvas:'<ellipse cx="60" cy="55" rx="50" ry="30"/><ellipse cx="60" cy="55" rx="34" ry="20"/><ellipse cx="60" cy="55" rx="18" ry="10"/><path d="M60 55l26-24M86 31l-9 1M86 31l-2 9"/>',
 integral:'<path d="M70 10c-12-6-20 2-22 20l-8 60c-2 16-10 22-22 16"/><path d="M78 60h30M78 72h22"/>',
 tangente:'<path d="M5 95C30 90 50 20 80 25s30 50 38 60"/><path d="M30 90 112 10"/><circle cx="62" cy="40" r="3"/>',
 mola:'<path d="M60 0v12l-22 6 44 10-44 10 44 10-44 10 44 10-44 10 22 6v10"/><rect x="38" y="96" width="44" height="26"/><path d="M20 0h80"/><path d="M20 0l-8 8M40 0l-8 8M60 0l-8 8M80 0l-8 8M100 0l-8 8"/>',
 rampa:'<path d="M5 105h115L5 35z"/><path d="M42 50l26 15-12 21-26-15z" transform="rotate(0)"/><path d="M50 70v30M50 100l-4-8M50 100l4-8"/><path d="M58 64l20-34M78 30l-8 4M78 30l0 9"/><path d="M22 105a18 18 0 0 0-4-12"/>',
 polia:'<circle cx="60" cy="22" r="16"/><circle cx="60" cy="22" r="3"/><path d="M60 0v6M44 22v58M76 22v40"/><rect x="32" y="80" width="24" height="24"/><rect x="66" y="62" width="20" height="20"/><path d="M40 0h40"/>',
 dcl:'<rect x="40" y="40" width="40" height="34"/><path d="M60 40V6M60 6l-5 9M60 6l5 9M60 74v40M60 114l-5-9M60 114l5-9M80 57h36M116 57l-9-5M116 57l-9 5M40 57H6M6 57l9-5M6 57l9 5"/>',
 pendulo:'<path d="M20 4h80M60 4l30 80"/><circle cx="92" cy="90" r="10"/><path d="M60 4v90" stroke-dasharray="4 5"/><path d="M60 40a36 36 0 0 0 14-3"/>',
 benzeno:'<path d="M60 8l40 23v46L60 100 20 77V31z"/><path d="M66 18l28 16M94 70l-28 16M28 70V38"/>',
 lewis:'<text x="2" y="70" font-size="40">H–O–H</text><circle cx="58" cy="30" r="2.6"/><circle cx="68" cy="30" r="2.6"/><circle cx="58" cy="88" r="2.6"/><circle cx="68" cy="88" r="2.6"/>',
 frasco:'<path d="M48 6h24M52 6v32L22 98a8 8 0 0 0 7 12h62a8 8 0 0 0 7-12L68 38V6"/><path d="M32 78h56"/><circle cx="50" cy="90" r="3"/><circle cx="66" cy="84" r="2"/>',
 atomo:'<circle cx="60" cy="60" r="5"/><ellipse cx="60" cy="60" rx="50" ry="18"/><ellipse cx="60" cy="60" rx="50" ry="18" transform="rotate(60 60 60)"/><ellipse cx="60" cy="60" rx="50" ry="18" transform="rotate(120 60 60)"/>',
 vetores:'<path d="M10 100 70 30M70 30l-11 3M70 30l-2 11M10 100h90M100 100l-10-5M100 100l-10 5M10 100 40 20" /><path d="M70 30l30 70" stroke-dasharray="4 5"/>',
 plano:'<path d="M5 70 45 40h75L80 70z"/><path d="M62 55V5M62 5l-5 9M62 5l5 9"/><text x="70" y="22" font-size="18">n</text>',
 retas:'<path d="M0 90 120 20M0 20l120 75M10 110l100-100" />',
 broca:'<path d="M50 0h20v40H50z"/><path d="M52 40l-2 50 10 25 10-25-2-50"/><path d="M50 50l20 10M50 65l20 10M50 80l20 10"/>',
 engrenagem:'<circle cx="60" cy="60" r="30"/><circle cx="60" cy="60" r="10"/>'+Array.from({length:12},(_,i)=>{ const a=i*Math.PI/6; const x=60+Math.cos(a)*36, y=60+Math.sin(a)*36; return '<rect x="'+(x-5).toFixed(1)+'" y="'+(y-5).toFixed(1)+'" width="10" height="10" transform="rotate('+(i*30)+' '+x.toFixed(1)+' '+y.toFixed(1)+')"/>' }).join(''),
 cota:'<rect x="10" y="30" width="100" height="50"/><circle cx="60" cy="55" r="14"/><path d="M10 100h100M10 94v12M110 94v12M14 100l8-3M14 100l8 3M106 100l-8-3M106 100l-8 3"/><text x="40" y="122" font-size="18">100</text>',
 torno:'<rect x="5" y="40" width="30" height="50"/><path d="M35 55h70v20H35z"/><path d="M80 75l10 25h-25z"/><path d="M5 100h115"/>',
 balao:'<path d="M10 15h100a10 10 0 0 1 10 10v40a10 10 0 0 1-10 10H50l-22 20 4-20H10A10 10 0 0 1 0 65V25a10 10 0 0 1 10-10z"/>',
 livro:'<path d="M5 20c20-8 40-8 55 0v80c-15-8-35-8-55 0zM115 20c-20-8-40-8-55 0v80c15-8 35-8 55 0z"/><path d="M15 40h35M15 55h35M70 40h35M70 55h35"/>',
 lapis:'<path d="M10 110l10-35 70-70 25 25-70 70z"/><path d="M80 15l25 25M20 75l25 25"/>',
 check:'<rect x="10" y="10" width="100" height="100" rx="6"/><path d="M25 35l8 8 14-16M25 65l8 8 14-16M25 95l8 8 14-16M60 35h40M60 65h40M60 95h30"/>',
 compasso:'<circle cx="60" cy="12" r="8"/><path d="M55 18 22 112M65 18l33 94M38 70h44"/>',
 relogio:'<circle cx="60" cy="60" r="48"/><path d="M60 60V25M60 60l25 15"/>'+Array.from({length:12},(_,i)=>{ const a=i*Math.PI/6; return '<path d="M'+(60+Math.cos(a)*42).toFixed(1)+' '+(60+Math.sin(a)*42).toFixed(1)+'L'+(60+Math.cos(a)*48).toFixed(1)+' '+(60+Math.sin(a)*48).toFixed(1)+'"/>' }).join(''),
 calendario:'<rect x="8" y="20" width="104" height="90" rx="6"/><path d="M8 42h104M32 10v20M88 10v20"/>'+Array.from({length:12},(_,i)=>'<rect x="'+(18+(i%4)*24)+'" y="'+(52+Math.floor(i/4)*18)+'" width="14" height="10"/>').join(''),
 cartas:'<rect x="10" y="20" width="70" height="90" rx="8" transform="rotate(-10 45 65)"/><rect x="40" y="14" width="70" height="90" rx="8" transform="rotate(8 75 59)"/><text x="62" y="70" font-size="30">?</text>'
};
const TXT={
 calc:['∇f = (∂f/∂x, ∂f/∂y)','z = f(x, y)','f(x, y) = k','∂²f/∂x∂y','D = fxx·fyy − (fxy)²','∫∫ f dA','lim h→0'],
 fis:['F = m · a','P = m · g','Fel = −k · x','fat = μ · N','ΣF = 0','Em = K + U','Ação = −Reação','v = v₀ + a·t'],
 gaal:['u × v','u · v = |u||v| cos θ','ax + by + cz + d = 0','X = P + t·v','[u, v, w]','|n|'],
 qg:['2 H₂ + O₂ → 2 H₂O','n = m / MM','6,022 × 10²³','CH₄ + 2 O₂ → CO₂ + 2 H₂O','NaCl','H₂SO₄','18 g/mol'],
 usin:['Vc = π·D·n / 1000','n = 1000·Vc / (π·D)','vf = fz · z · n','Ø 50 h7','Ra 1,6','t = L / (f · n)'],
 ingl:['Hello!','I am · you are','Do you…?','I have been…','If I had…','made of steel','What’s up?'],
 desenho:['1:1','A3','vista frontal','Ø 20','R 5','45°'],
 geral:['Estude hoje','∑','π','Δ','√2','x²','F = m·a','H₂O']
};
const DSET={calc:['eixos','malha','curvas','integral','tangente'],fis:['mola','rampa','polia','dcl','pendulo'],gaal:['eixos','vetores','plano','retas'],qg:['benzeno','lewis','frasco','atomo'],
 usin:['broca','engrenagem','cota','torno'],ingl:['balao','livro'],desenho:['cota','compasso','eixos'],geral:['malha','atomo','mola','livro','compasso','engrenagem']};
const ABA={aulas:{d:['livro','lapis','compasso'],t:['Aula 1','Módulo 2','2ª prova','resumo','anotações']},oficinas:{d:['engrenagem','malha','mola','frasco'],t:['modelos 3D','teste aqui','F = m·a','∇f']},
 exercicios:{d:['check','lapis'],t:['E1','gabarito','passo 1 → 2 → 3','✓ certo','refaça']},labs:{d:['frasco','atomo','engrenagem','mola'],t:['experimente','descubra','álbum','combinar']},
 sobre:{d:['compasso','livro','engrenagem'],t:['IFMG','Betim','engenharia mecânica','estude hoje']},horario:{d:['relogio','calendario'],t:['19:00','21:00','seg · ter · qua','A202']},
 provas:{d:['calendario','check','lapis'],t:['2ª prova','revisar!','12/11','valor: 30 pts']},revisao:{d:['cartas','check'],t:['de novo','bom','fácil','repetição espaçada']}};
function rng(seed){ let h=2166136261; for(const c of String(seed)){ h^=c.charCodeAt(0); h=Math.imul(h,16777619) } return ()=>{ h=Math.imul(h^(h>>>15),2246822507); h=Math.imul(h^(h>>>13),3266489909); h^=h>>>16; return (h>>>0)/4294967296 } }
function escX(t){ return String(t).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])) }
function wall(seed,doodles,texts){ let el=$('.fdb-wall'); if(!el){ el=document.createElement('div'); el.className='fdb-wall'; el.setAttribute('aria-hidden','true'); document.body.prepend(el); document.body.classList.add('fdb-has-wall') }
  const r=rng(seed), W=1600, H=1000, items=[];
  const pool=[...doodles.map(d=>({d})),...texts.map(t=>({t}))]; for(let i=pool.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]] }
  const cells=[]; for(let y=0;y<4;y++)for(let x=0;x<5;x++) cells.push([x,y]); for(let i=cells.length-1;i>0;i--){ const j=Math.floor(r()*(i+1)); [cells[i],cells[j]]=[cells[j],cells[i]] }
  pool.slice(0,cells.length).forEach((it,i)=>{ const [cx,cy]=cells[i]; const x=cx*W/5+30+r()*(W/5-180), y=cy*H/4+30+r()*(H/4-130), rot=(r()-.5)*16;
    if(it.d&&DOO[it.d]){ const s=1+r()*.7; items.push('<g transform="translate('+x.toFixed(0)+' '+y.toFixed(0)+') rotate('+rot.toFixed(1)+') scale('+s.toFixed(2)+')">'+DOO[it.d]+'</g>') }
    else if(it.t){ const fs=(28+r()*14).toFixed(0); items.push('<text x="'+x.toFixed(0)+'" y="'+(y+40).toFixed(0)+'" font-size="'+fs+'" transform="rotate('+rot.toFixed(1)+' '+x.toFixed(0)+' '+y.toFixed(0)+')">'+escX(it.t)+'</text>') } });
  el.innerHTML='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMin slice" width="100%" height="100%"><defs><filter id="fdbLapis" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="'+Math.floor(r()*99)+'"/><feDisplacementMap in="SourceGraphic" scale="1.6"/></filter></defs>'+
    '<g filter="url(#fdbLapis)" style="fill:none;stroke:var(--ink);stroke-opacity:.12;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;font-family:Caveat,\'Segoe Print\',cursive;font-weight:500"><g style="fill:var(--ink);fill-opacity:.12;stroke:none">'+items.filter(x=>x.startsWith('<text')).join('')+'</g>'+items.filter(x=>!x.startsWith('<text')).join('')+'</g></svg>' }
function wallOficina(){ const id=matDaPagina(); if(!id) return; const tema=TEMA(id);
  const go=()=>{ const sec=$$('section.view').find(x=>!x.hidden); const v=(sec&&sec.id)||'inicio';
    const fx=sec?$$('.fx .eq',sec).map(e=>e.textContent.replace(/\s+/g,' ').trim()).filter(t=>t.length>2&&t.length<40).slice(0,4):[];
    const ds=DSET[tema]||DSET.geral, h=rng(v)(); const rot=Math.floor(h*ds.length); const sel=ds.slice(rot).concat(ds.slice(0,rot));
    const base=TXT[tema]||TXT.geral; wall(id+v,sel.concat(sel.slice(0,2)),fx.concat(base.slice(0,Math.max(4,9-fx.length)))) };
  addEventListener('hashchange',()=>setTimeout(go,30)); go() }
function wallHub(){ if(!$('.fdb-hh')) return; const go=()=>{ const ab=document.body.dataset.aba||'inicio', mat=document.body.dataset.mat||'';
    if(mat){ const t=TEMA(mat); wall('hub'+mat,DSET[t]||DSET.geral,TXT[t]||TXT.geral); return }
    const A=ABA[ab]; if(A){ wall('hub'+ab,A.d.concat(['malha']),A.t.concat(TXT.geral.slice(0,3))); return }
    wall('hubinicio',['malha','mola','atomo','benzeno','engrenagem','eixos','livro'],['∇f = (∂f/∂x, ∂f/∂y)','F = m · a','2 H₂ + O₂ → 2 H₂O','u × v','Vc = π·D·n / 1000','Hello!']) };
  addEventListener('fdb:aba',go); go() }


/* ---------- dentro da matéria: barra lateral, navegação de aulas e início com os 3 módulos ---------- */
const TOOLIC={lab:'🧪',lista:'📋',problemas:'📋',quiz:'❓',cola:'📄',tabela:'⚛️'};
function materia(){ const id=matDaPagina(), A=(window.FDB_AULAS||{})[id]; const h=$$('header').find(x=>!x.classList.contains('phead')); const nav=$('header nav#nav');
  if(!A||!A.modulos||!h||!nav) return false;
  document.body.classList.add('fdb-mat');
  const nm=NOMEM[id]||['',''], NOME=nm[0]+(nm[1]?' '+nm[1]:'');
  const aulas=[]; [1,2,3].forEach(n=>(A.modulos[n]||[]).forEach(([v,t,d],i)=>aulas.push({v,t,d,n,i:i+1})));
  const links=$$('a[href^="#"]',nav).map(a=>({h:a.getAttribute('href').slice(1),t:a.textContent.replace(/\s+/g,' ').trim()}));
  const tools=links.filter(l=>l.h&&l.h!=='inicio'&&!aulas.some(a=>a.v===l.h));
  const done=()=>G('done')||{}, LJ=labJogo(id);
  /* barra lateral */
  const side=document.createElement('aside'); side.className='fdb-side'; side.id='fdbSide'; side.setAttribute('aria-label','Menu da matéria'); side.hidden=false;
  const sc=document.createElement('div'); sc.className='fdb-scrim'; document.body.append(side,sc);
  const drawSide=()=>{ const d=done(), cur=location.hash.slice(1)||'inicio';
    side.innerHTML='<div class="sh"><span class="fdb-logo">'+(A.simbolo||'◆')+'</span><div><small>Oficina de</small><b>'+NOME+'</b></div><button type="button" class="sx" aria-label="Fechar menu">×</button></div>'+
      '<a class="sl hub" href="../../index.html">← Faculdade de Bolso</a>'+
      '<a class="sl'+(cur==='inicio'?' on':'')+'" href="#inicio">🏠 Início da matéria</a>'+
      [1,2,3].map(n=>{ const L=A.modulos[n]||[]; const tema=(A.temas||{})[n];
        return '<div class="sm"><div class="smh">Módulo '+n+' · '+n+'ª prova</div>'+(tema?'<div class="smt">'+tema+'</div>':'')+
          (L.length?L.map(([v,t],i)=>'<a class="sl au'+(cur===v?' on':'')+'" href="#'+v+'"><span class="sn">'+(d[v]?'✓':i+1)+'</span>'+t+'</a>').join(''):'<div class="sv">em breve</div>')+'</div>' }).join('')+
      (tools.length?'<div class="sm"><div class="smh">Ferramentas</div>'+tools.map(l=>'<a class="sl'+(cur===l.h?' on':'')+'" href="#'+l.h+'">'+(TOOLIC[l.h]||'🔧')+' '+l.t.replace(/^[^\wÀ-ú]+/,'')+'</a>').join('')+'<div class="scart"></div></div>':'')+
      (LJ?'<div class="sm"><div class="smh">Laboratório-jogo</div><a class="sl" href="../../'+LJ.url+'">'+LJ.ic+' '+LJ.nome+'</a></div>':'');
    const ak=$('.ak-navbtn'); if(ak) $('.scart',side).appendChild(ak);
    $('.sx',side).onclick=()=>abrir(false) };
  const abrir=v=>{ document.body.classList.toggle('fdb-side-on',v); store.set('fdb-side',v?'1':'0') };
  sc.onclick=()=>abrir(false); document.addEventListener('keydown',e=>{ if(e.key==='Escape') abrir(false) });
  side.addEventListener('click',e=>{ if(e.target.closest('a.sl')&&innerWidth<900) abrir(false) });
  /* topo: ☰ + logo + navegação das aulas */
  const brand=$('.brand',h); const tg=document.createElement('button'); tg.type='button'; tg.className='fdb-burger'; tg.setAttribute('aria-label','Abrir o menu da matéria'); tg.innerHTML='<span></span><span></span><span></span>';
  tg.onclick=()=>abrir(!document.body.classList.contains('fdb-side-on')); brand.prepend(tg);
  const ln=document.createElement('div'); ln.className='fdb-lnav'; brand.insertBefore(ln,$('.prog',brand)||null);
  const drawTop=()=>{ const cur=location.hash.slice(1)||'inicio', d=done(); const k=aulas.findIndex(a=>a.v===cur);
    if(k<0){ const t=cur==='inicio'?'Início da matéria':((tools.find(l=>l.h===cur)||{}).t||''); const first=aulas.find(a=>!d[a.v])||aulas[0];
      ln.innerHTML='<span class="lt">'+t+'</span>'+(cur==='inicio'&&first?'<a class="lgo" href="#'+first.v+'">Estudar: Módulo '+first.n+' · Aula '+first.i+' →</a>':cur!=='inicio'?'<a class="lgo" href="#inicio">← Início da matéria</a>':''); return }
    const a=aulas[k], mod=aulas.filter(x=>x.n===a.n), pv=aulas[k-1], nx=aulas[k+1];
    ln.innerHTML='<a class="lp'+(pv?'':' off')+'" href="#'+(pv?pv.v:'inicio')+'" aria-label="Aula anterior">←<span> '+(pv?'Anterior':'Início')+'</span></a>'+
      '<div class="lc"><span class="lm">Módulo '+a.n+'</span>'+mod.map(x=>'<a class="la'+(x.v===cur?' on':'')+(d[x.v]?' ok':'')+'" href="#'+x.v+'" title="'+x.t+'">Aula '+x.i+'</a>').join('')+'</div>'+
      '<a class="lp" href="#'+(nx?nx.v:'inicio')+'" aria-label="Próxima aula"><span>'+(nx?'Próxima ':'Concluir ')+'</span>→</a>';
    const on=$('.la.on',ln); if(on) on.scrollIntoView({block:'nearest',inline:'center'}) };
  /* início da matéria: o que é, módulos, ferramentas */
  const ini=$('#v-inicio');
  if(ini){ const trail=$('#trail'); if(trail){ trail.hidden=true; let p=trail.previousElementSibling; while(p&&(p.tagName==='P'||p.tagName==='H3')){ p.hidden=true; if(p.tagName==='H3') break; p=p.previousElementSibling } }
    const box=document.createElement('div'); box.className='fdb-matini';
    const anchor=$('.fdb-top',ini)||$('.hero',ini); (anchor||ini.firstChild).after(box);
    const drawIni=()=>{ const d=done();
      box.innerHTML='<div class="fdb-duo" style="margin-top:6px"><div class="fdb-card"><h3>O que é '+NOME+'?</h3><p>'+(A.sobre||'')+'</p></div>'+
        '<div class="fdb-card"><h3>Como estudar?</h3><ol class="fdb-steps"><li>Escolha o módulo da prova que está chegando.</li><li>Siga as aulas na ordem: explicação, fórmula com cada letra explicada e exemplos práticos.</li><li>Mexa nos modelos 3D e simuladores até ver o que cada variável faz.</li><li>Resolva os exercícios antes de abrir o gabarito e marque a aula como estudada.</li></ol></div></div>'+
        '<div class="sech"><h3>Módulos</h3><span class="mono" style="font-size:.78rem;color:var(--ink2)">um por prova</span></div><div class="fdb-mods">'+
        [1,2,3].map(n=>{ const L=A.modulos[n]||[]; const tema=(A.temas||{})[n]; const ok=L.filter(([v])=>d[v]).length;
          if(!L.length) return '<div class="fdb-mod vazio"><div class="mh"><span class="mn">Módulo '+n+'</span><span class="mp">'+n+'ª prova</span></div><b class="mt">Em breve</b><p>O conteúdo da '+n+'ª prova entra aqui assim que as aulas acontecerem.</p></div>';
          return '<div class="fdb-mod"><div class="mh"><span class="mn">Módulo '+n+'</span><span class="mp">'+n+'ª prova</span></div><b class="mt">'+(tema||'Conteúdo da '+n+'ª prova')+'</b>'+
            '<div class="mbar"><i style="width:'+(ok/L.length*100)+'%"></i></div><small class="mc">'+ok+' de '+L.length+' aulas estudadas</small>'+
            '<ol class="mau">'+L.map(([v,t],i)=>'<li><a href="#'+v+'"><span class="sn'+(d[v]?' ok':'')+'">'+(d[v]?'✓':i+1)+'</span>'+t+'</a></li>').join('')+'</ol>'+
            '<a class="btnh mgo" href="#'+((L.find(([v])=>!d[v])||L[0])[0])+'">'+(ok?'▶ Continuar o módulo':'▶ Começar o módulo')+'</a></div>' }).join('')+'</div>'+
        (tools.length?'<div class="sech"><h3>Ferramentas da oficina</h3></div><div class="qgrid">'+tools.map(l=>'<a class="qcard" href="#'+l.h+'"><span class="qi">'+(TOOLIC[l.h]||'🔧')+'</span><span class="qt"><b>'+l.t.replace(/^[^\wÀ-ú]+/,'')+'</b></span><span class="qa" aria-hidden="true">→</span></a>').join('')+(LJ?'<a class="qcard" href="../../'+LJ.url+'"><span class="qi">'+LJ.ic+'</span><span class="qt"><b>'+LJ.nome+'</b><small>laboratório-jogo</small></span><span class="qa" aria-hidden="true">→</span></a>':'')+'</div>':'') };
    drawIni(); const pt=$('#progtxt'); if(pt) new MutationObserver(()=>{ drawIni(); drawSide(); drawTop() }).observe(pt,{childList:true,characterData:true,subtree:true}) }
  drawSide(); drawTop(); addEventListener('hashchange',()=>{ drawSide(); drawTop() });
  return true }

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

function boot(){ brandOficina(); eyebrows(); const mt=materia(); if(!mt){ aulas(); aulasPorModulo(); labNoMenu() } header(); tocs(); home(); foot(); hub(); wallOficina(); wallHub(); irPara(); lembrar() }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
