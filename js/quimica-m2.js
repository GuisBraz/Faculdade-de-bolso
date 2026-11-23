/* Faculdade de Bolso · Química Geral · Módulo 2
   Ligações (montador de sais, eletronegatividade), geometria molecular em 3D (RPENV)
   e forças intermoleculares (duelo de pontos de ebulição). Sem bibliotecas externas. */
(function(){
'use strict';
const g=id=>document.getElementById(id);
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const SUB=n=>n>1?String(n).replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d]):'';
const SUP=q=>{ const a=Math.abs(q); return (a>1?String(a).replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]):'')+(q>0?'⁺':'⁻') };
const mdc=(a,b)=>b?mdc(b,a%b):a;
const visivel=el=>el&&el.offsetParent!==null&&!document.hidden;

/* ===================== MONTADOR DE SAIS ===================== */
const CAT=[['Li',1,'lítio'],['Na',1,'sódio'],['K',1,'potássio'],['Mg',2,'magnésio'],['Ca',2,'cálcio'],['Ba',2,'bário'],['Al',3,'alumínio'],['Fe',2,'ferro(II)'],['Fe',3,'ferro(III)'],['Cu',1,'cobre(I)'],['Cu',2,'cobre(II)'],['Pb',4,'chumbo(IV)']];
const ANI=[['F',-1,'fluoreto'],['Cl',-1,'cloreto'],['Br',-1,'brometo'],['I',-1,'iodeto'],['H',-1,'hidreto'],['O',-2,'óxido'],['S',-2,'sulfeto'],['Se',-2,'seleneto'],['N',-3,'nitreto'],['P',-3,'fosfeto']];
function salW(){ const C=g('m2SalC'), A=g('m2SalA'), O=g('m2SalO'); if(!C) return; let ci=6, ai=5;
  C.innerHTML=CAT.map((c,i)=>'<button data-i="'+i+'">'+c[0]+SUP(c[1])+'</button>').join('');
  A.innerHTML=ANI.map((a,i)=>'<button data-i="'+i+'">'+a[0]+SUP(a[1])+'</button>').join('');
  const calc=()=>{ C.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('sel',i===ci)); A.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('sel',i===ai));
    const [m,q,nm]=CAT[ci], [x,qa,na]=ANI[ai], a=-qa, b=q, d=mdc(a,b), p=a/d, r=b/d;
    const cru=m+SUB(a)+x+SUB(b), fin=m+SUB(p)+x+SUB(r);
    O.innerHTML='<div class="m2-cross"><span class="c">'+m+'<sup>'+SUP(q)+'</sup></span><span class="a">'+x+'<sup>'+SUP(qa)+'</sup></span></div>'+
      '<b>1. Cruze as cargas</b> (sem o sinal): a carga de um vira o índice do outro → <b>'+cru+'</b><br>'+
      (d>1?'<b>2. Simplifique</b> os índices (÷ '+d+') → <b>'+fin+'</b><br>':'<b>2. Simplificar?</b> '+a+' e '+b+' não têm divisor comum → fica assim<br>')+
      '<b>3. Confira a carga total</b>: '+p+' × ('+(q>0?'+':'')+q+') + '+r+' × (−'+(-qa)+') = '+(p*q+r*qa)+' ✓<br>'+
      '<span class="m2-big">'+fin+'</span> · '+na+' de '+nm };
  C.onclick=e=>{ const b=e.target.closest('button'); if(b){ ci=+b.dataset.i; calc() } };
  A.onclick=e=>{ const b=e.target.closest('button'); if(b){ ai=+b.dataset.i; calc() } };
  calc() }

/* ===================== ELETRONEGATIVIDADE ===================== */
/* escala de Pauling da tabela do livro (Brown, figura 8.7) */
const EN={H:2.1,Li:1.0,Be:1.5,B:2.0,C:2.5,N:3.0,O:3.5,F:4.0,Na:0.9,Mg:1.2,Al:1.5,Si:1.8,P:2.1,S:2.5,Cl:3.0,K:0.8,Ca:1.0,Br:2.8,I:2.5,Cs:0.7};
function dxW(){ const A=g('m2DxA'), B=g('m2DxB'), O=g('m2DxO'); if(!A) return; let a='H', b='F'; const ks=Object.keys(EN);
  const bt=k=>'<button data-k="'+k+'">'+k+' <small>'+String(EN[k]).replace('.',',')+'</small></button>';
  A.innerHTML=ks.map(bt).join(''); B.innerHTML=ks.map(bt).join('');
  const calc=()=>{ A.querySelectorAll('button').forEach(x=>x.classList.toggle('sel',x.dataset.k===a)); B.querySelectorAll('button').forEach(x=>x.classList.toggle('sel',x.dataset.k===b));
    const d=Math.abs(EN[a]-EN[b]), dd=Math.round(d*10)/10, ti=dd===0?['apolar','Covalente apolar','ok']:dd<2?['polar','Covalente polar','c2']:['ion','Iônica (predominante)','c1'];
    const neg=EN[a]>EN[b]?a:b, pos=neg===a?b:a, pct=Math.min(100,d/3.3*100);
    O.innerHTML='<div class="m2-dxl"><span class="'+(dd===0?'':'p')+'">'+(dd===0?'':'δ+ ')+(dd===0?a:pos)+'</span><i class="'+ti[0]+'"></i><span class="'+(dd===0?'':'n')+'">'+(dd===0?b:neg)+(dd===0?'':' δ−')+'</span></div>'+
      '<div class="m2-dxbar"><i style="left:'+pct+'%"></i><span>0 · apolar</span><span>polar</span><span>2,0 · iônica →</span></div>'+
      'Δχ = |'+String(EN[a]).replace('.',',')+' − '+String(EN[b]).replace('.',',')+'| = <b>'+String(dd).replace('.',',')+'</b> → <b class="'+ti[2]+'">'+ti[1]+'</b>'+
      (dd===0?'<br>Os dois puxam os elétrons igual: o par fica bem no meio.':'<br>O par de elétrons fica mais perto do <b>'+neg+'</b> (mais eletronegativo): ele fica com a ponta negativa δ−.') };
  A.onclick=e=>{ const x=e.target.closest('button'); if(x){ a=x.dataset.k; calc() } };
  B.onclick=e=>{ const x=e.target.closest('button'); if(x){ b=x.dataset.k; calc() } };
  calc() }

/* ===================== GEOMETRIA 3D (RPENV) ===================== */
const s3=Math.sqrt(3)/2, t=1/Math.sqrt(3);
const DIR={2:[[1,0,0],[-1,0,0]],3:[[0,1,0],[s3,-.5,0],[-s3,-.5,0]],4:[[0,1,0],[0.943,-.333,0],[-.471,-.333,.816],[-.471,-.333,-.816]],
  5:[[1,0,0],[-.5,0,s3],[-.5,0,-s3],[0,1,0],[0,-1,0]],6:[[0,1,0],[0,-1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]]};
/* ordem dos domínios para pares isolados: 5 → equatoriais primeiro; 6 → opostos */
const ARR={2:'linear',3:'trigonal plana',4:'tetraédrico',5:'bipirâmide trigonal',6:'octaédrico'};
const ANG={2:'180°',3:'120°',4:'109,5°',5:'90° e 120°',6:'90°'};
const MOL=[{f:'CO₂',c:'C',l:['O','O'],p:0,g:'linear',o:[2,2]},{f:'BF₃',c:'B',l:['F','F','F'],p:0,g:'trigonal plana'},{f:'SO₂',c:'S',l:['O','O'],p:1,g:'angular',o:[2,1]},
  {f:'CH₄',c:'C',l:['H','H','H','H'],p:0,g:'tetraédrica'},{f:'NH₃',c:'N',l:['H','H','H'],p:1,g:'piramidal trigonal',a:'≈ 107°'},{f:'H₂O',c:'O',l:['H','H'],p:2,g:'angular',a:'≈ 104,5°'},
  {f:'CH₂Cl₂',c:'C',l:['H','H','Cl','Cl'],p:0,g:'tetraédrica'},{f:'PCl₅',c:'P',l:['Cl','Cl','Cl','Cl','Cl'],p:0,g:'bipirâmide trigonal'},{f:'SF₄',c:'S',l:['F','F','F','F'],p:1,g:'gangorra'},
  {f:'ClF₃',c:'Cl',l:['F','F','F'],p:2,g:'forma de T'},{f:'XeF₂',c:'Xe',l:['F','F'],p:3,g:'linear'},{f:'SF₆',c:'S',l:['F','F','F','F','F','F'],p:0,g:'octaédrica'},
  {f:'BrF₅',c:'Br',l:['F','F','F','F','F'],p:1,g:'pirâmide de base quadrada'},{f:'XeF₄',c:'Xe',l:['F','F','F','F'],p:2,g:'quadrado plana'}];
const CORA={H:'#E8EDF2',C:'#3A3F47',O:'#E0473A',N:'#3B6FD8',F:'#7CCB5C',Cl:'#3FAE5A',B:'#F2A27A',S:'#E9C43A',P:'#F08A2E',Xe:'#5BB8C9',Br:'#A0522D'};
const RAIO={H:.24,C:.34,O:.33,N:.33,F:.3,Cl:.4,B:.32,S:.42,P:.42,Xe:.48,Br:.44};
function polar(m){ if(m.l.some(x=>x!==m.l[0])) return true; const n=m.l.length+m.p;
  if(m.p===0) return false; if(n===5&&m.p===3) return false; if(n===6&&m.p===2) return false; return true }
function geoW(){ const P=g('m2GeoP'), cv=g('m2Geo'), O=g('m2GeoO'); if(!P||!cv) return; let M=MOL[5], rx=.42, ry=.5, arr=false, pares=true;
  P.innerHTML=MOL.map((m,i)=>'<button data-i="'+i+'">'+m.f+'</button>').join('');
  const ctx=cv.getContext('2d');
  const pos=()=>{ const n=M.l.length+M.p, D=DIR[n], L=[], E=[]; D.forEach((v,i)=>(i<M.p?E:L).push(v)); return {L,E,n} };
  const rot=v=>{ let [x,y,z]=v; const c=Math.cos(ry), s=Math.sin(ry); [x,z]=[x*c+z*s,-x*s+z*c]; const c2=Math.cos(rx), s2=Math.sin(rx); [y,z]=[y*c2-z*s2,y*s2+z*c2]; return [x,y,z] };
  const desenha=()=>{ const r=cv.getBoundingClientRect(), d=Math.min(2,devicePixelRatio||1), W=Math.round(r.width), H=Math.round(r.height); if(!W||!H) return;
    if(cv.width!==W*d||cv.height!==H*d){ cv.width=W*d; cv.height=H*d } ctx.setTransform(d,0,0,d,0,0); ctx.clearRect(0,0,W,H);
    const k=Math.min(W,H)*.3, cx=W/2, cy=H/2, ink=css('--ink')||'#13233A', {L,E}=pos();
    const pr=v=>{ const [x,y,z]=rot(v); const f=1/(1-z*.18); return [cx+x*k*1.05*f, cy-y*k*1.05*f, z, f] };
    const itens=[];
    L.forEach((v,i)=>itens.push({t:'a',v,e:M.l[i],o:(M.o||[])[i]||1}));
    E.forEach(v=>itens.push({t:'p',v}));
    itens.forEach(it=>it.z=rot(it.v)[2]);
    itens.sort((a,b)=>a.z-b.z);
    const centro=()=>{ const R=(RAIO[M.c]||.36)*k; const gr=ctx.createRadialGradient(cx-R*.35,cy-R*.35,R*.1,cx,cy,R); gr.addColorStop(0,'#fff'); gr.addColorStop(.25,CORA[M.c]||'#888'); gr.addColorStop(1,'#111');
      ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(cx,cy,R,0,7); ctx.fill(); ctx.fillStyle='#fff'; ctx.font='700 '+Math.round(R*.7)+'px Inter,system-ui,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(M.c,cx,cy+1) };
    let feito=false;
    if(arr){ const n=L.length+E.length; ctx.save(); ctx.strokeStyle=css('--c2')||'#1E62C9'; ctx.setLineDash([4,4]); ctx.globalAlpha=.55; ctx.lineWidth=1.2;
      const all=[...L,...E].map(pr); if(n===4){ for(let i=0;i<4;i++) for(let j=i+1;j<4;j++){ ctx.beginPath(); ctx.moveTo(all[i][0],all[i][1]); ctx.lineTo(all[j][0],all[j][1]); ctx.stroke() } }
      else if(n>2){ for(let i=0;i<all.length;i++) for(let j=i+1;j<all.length;j++){ const a=[...L,...E][i], b=[...L,...E][j], dp=a[0]*b[0]+a[1]*b[1]+a[2]*b[2]; if(dp>-.9&&dp<.6){ ctx.beginPath(); ctx.moveTo(all[i][0],all[i][1]); ctx.lineTo(all[j][0],all[j][1]); ctx.stroke() } } }
      ctx.restore() }
    itens.forEach(it=>{ if(!feito&&it.z>0){ centro(); feito=true }
      const [x,y,z,f]=pr(it.v);
      if(it.t==='p'){ if(!pares) return; const [x2,y2]=pr(it.v.map(c=>c*.62)); ctx.save(); ctx.globalAlpha=.32+.12*(z>0); ctx.fillStyle=css('--c3')||'#6447BE';
        const ang=Math.atan2(y2-cy,x2-cx), len=Math.hypot(x2-cx,y2-cy); ctx.translate(cx+(x2-cx)*.55,cy+(y2-cy)*.55); ctx.rotate(ang); ctx.beginPath(); ctx.ellipse(0,0,Math.max(len*.75,k*.18),k*.2*f,0,0,7); ctx.fill(); ctx.globalAlpha=1;
        ctx.fillStyle=ink; ctx.beginPath(); ctx.arc(len*.25,-4,2.6,0,7); ctx.arc(len*.25,4,2.6,0,7); ctx.fill(); ctx.restore(); return }
      const R=(RAIO[it.e]||.3)*k*f*.9; ctx.strokeStyle=ink; ctx.lineWidth=3.2*f; ctx.lineCap='round';
      const nx=-(y-cy), ny=(x-cx), nl=Math.hypot(nx,ny)||1;
      const off=it.o===2?[-3,3]:it.o===3?[-5,0,5]:[0];
      off.forEach(o=>{ ctx.beginPath(); ctx.moveTo(cx+nx/nl*o,cy+ny/nl*o); ctx.lineTo(x+nx/nl*o,y+ny/nl*o); ctx.stroke() });
      const gr=ctx.createRadialGradient(x-R*.35,y-R*.35,R*.1,x,y,R); gr.addColorStop(0,'#fff'); gr.addColorStop(.3,CORA[it.e]||'#999'); gr.addColorStop(1,'#222');
      ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(x,y,R,0,7); ctx.fill(); ctx.fillStyle=it.e==='H'?'#222':'#fff'; ctx.font='700 '+Math.round(R*.75)+'px Inter,system-ui,sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(it.e,x,y+1) });
    if(!feito) centro() };
  const info=()=>{ P.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('sel',MOL[i]===M)); const n=M.l.length+M.p, po=polar(M);
    O.innerHTML='<b>'+M.f+'</b> · átomo central <b>'+M.c+'</b><br>'+
      'domínios no central: <b>'+n+'</b> = '+M.l.length+' ligação(ões) + '+M.p+' par(es) isolado(s)<br>'+
      'arranjo (todos os domínios): <b class="c2">'+ARR[n]+'</b> · '+ANG[n]+'<br>'+
      'geometria (só os átomos): <b class="c1">'+M.g+'</b>'+(M.a?' · '+M.a:'')+'<br>'+
      (po?'<b class="bad">polar</b>: os vetores das ligações não se cancelam':'<b class="ok">apolar</b>: os vetores das ligações se cancelam') };
  let gira=!RM, drag=null, on=false;
  const loop=()=>{ if(!visivel(cv)){ on=false; return } if(gira&&!drag) ry+=.008; desenha(); requestAnimationFrame(loop) };
  const start=()=>{ if(on) return; on=true; requestAnimationFrame(loop) };
  P.onclick=e=>{ const b=e.target.closest('button'); if(!b) return; M=MOL[+b.dataset.i]; info(); desenha(); start() };
  cv.addEventListener('pointerdown',e=>{ drag=[e.clientX,e.clientY]; cv.setPointerCapture(e.pointerId) });
  cv.addEventListener('pointermove',e=>{ if(!drag) return; ry+=(e.clientX-drag[0])*.012; rx+=(e.clientY-drag[1])*.012; drag=[e.clientX,e.clientY]; desenha() });
  const solta=()=>{ drag=null }; cv.addEventListener('pointerup',solta); cv.addEventListener('pointercancel',solta);
  const bG=g('m2GeoG'), bA=g('m2GeoA'), bPa=g('m2GeoPa');
  if(bG) bG.onclick=()=>{ gira=!gira; bG.classList.toggle('sel',gira); start() };
  if(bA) bA.onclick=()=>{ arr=!arr; bA.classList.toggle('sel',arr); desenha() };
  if(bPa) bPa.onclick=()=>{ pares=!pares; bPa.classList.toggle('sel',pares); desenha() };
  if(bG) bG.classList.toggle('sel',gira); if(bPa) bPa.classList.add('sel');
  info(); addEventListener('hashchange',()=>setTimeout(()=>{ desenha(); start() },60)); addEventListener('resize',desenha);
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) start() });
  setTimeout(()=>{ desenha(); start() },80) }

/* ===================== DUELO DE PONTOS DE EBULIÇÃO ===================== */
const DU=[['HF','20 °C','HCl','−85 °C',0,'HF faz ligação de hidrogênio (H ligado a F); o HCl só tem dipolo-dipolo.'],
  ['CH₄','−161 °C','CCl₄','77 °C',1,'Os dois são apolares (só London). O CCl₄ tem muito mais elétrons (74 contra 10): nuvem mais polarizável, London mais forte.'],
  ['H₂O','100 °C','H₂S','−60 °C',0,'Só a água faz ligação de hidrogênio. O S não está na lista F, O, N.'],
  ['F₂','−188 °C','I₂','184 °C',1,'Ambos apolares. O I₂ é muito maior (106 elétrons): London muito mais forte, por isso é sólido em temperatura ambiente.'],
  ['n-pentano','36 °C','neopentano','9,5 °C',0,'Mesma fórmula (C₅H₁₂). A cadeia reta encosta mais na vizinha (mais área de contato) → London mais forte. O neopentano é quase uma bolinha.'],
  ['etanol','78 °C','éter dimetílico','−24 °C',0,'Mesma fórmula (C₂H₆O). O etanol tem O–H → ligação de hidrogênio. No éter o O está entre dois C, sem H ligado a ele.'],
  ['NaCl','1413 °C','HCl','−85 °C',0,'NaCl é iônico: para ferver é preciso vencer a atração entre íons (ligação iônica), muito mais forte que qualquer força intermolecular.'],
  ['CH₃OH','65 °C','CH₃CH₂OH','78 °C',1,'Os dois fazem ligação de hidrogênio; o etanol tem cadeia maior → London a mais.'],
  ['Ne','−246 °C','Ar','−186 °C',1,'Gases nobres só têm London. O Ar tem mais elétrons (18 contra 10) → mais polarizável.'],
  ['acetona','56 °C','butano','−1 °C',0,'Massas quase iguais (58 g/mol). A acetona tem C=O polar → dipolo-dipolo; o butano é apolar.'],
  ['NH₃','−33 °C','PH₃','−88 °C',0,'NH₃ tem N–H → ligação de hidrogênio. O P não está na lista F, O, N.'],
  ['O₂','−183 °C','NO','−152 °C',1,'Tamanhos parecidos, mas o NO é polar (N e O têm eletronegatividades diferentes) → dipolo-dipolo a mais.']];
function dueloW(){ const B=g('m2Du'); if(!B) return; let i=0, ok=0, tot=0, resp=false; const ord=DU.map((_,k)=>k).sort(()=>Math.random()-.5);
  const Q=g('m2DuQ'), R=g('m2DuR'), S=g('m2DuS'), W=g('m2DuW'), N=g('m2DuN');
  const mostra=()=>{ const d=DU[ord[i%DU.length]]; resp=false; R.textContent=''; R.className='m2-dur'; W.hidden=true; W.dataset.on='0'; g('m2DuX').hidden=true;
    Q.innerHTML='<button data-k="0"><b>'+d[0]+'</b></button><span>ou</span><button data-k="1"><b>'+d[2]+'</b></button>' };
  Q.onclick=e=>{ const b=e.target.closest('button'); if(!b||resp) return; const d=DU[ord[i%DU.length]], k=+b.dataset.k; resp=true; tot++;
    const certo=k===d[4]; if(certo) ok++; b.classList.add(certo?'ok':'bad'); R.textContent=certo?'✓ Certo':'✗ Errado'; R.className='m2-dur '+(certo?'ok':'bad');
    S.textContent=ok+' de '+tot; W.hidden=false };
  W.onclick=()=>{ const d=DU[ord[i%DU.length]], X=g('m2DuX'); X.innerHTML='<b>'+d[0]+'</b> ferve a '+d[1]+' · <b>'+d[2]+'</b> a '+d[3]+'<br>'+d[5]; X.hidden=false };
  N.onclick=()=>{ i++; mostra() };
  mostra() }

/* desenhos de Lewis compartilhados com os quadros (dados/quadros-qg.js → window.FDB_LW) */
function lewis(){ const L=window.FDB_LW; if(!L) return false; document.querySelectorAll('[data-lw]').forEach(el=>{ if(!el.firstChild&&L[el.dataset.lw]) el.innerHTML=L[el.dataset.lw] }); return true }
function init(){ if(!lewis()) addEventListener('load',lewis); salW(); dxW(); geoW(); dueloW() }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
