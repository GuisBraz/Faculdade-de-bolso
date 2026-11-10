/* Faculdade de Bolso · Química Geral · Módulo 3 (parte 2)
   Estequiometria (limitante, pureza, rendimento), soluções, oxirredução, pilhas e índice do Estudo Dirigido 3.
   Usa parseF, MM, prettyF e BY definidos na página. Sem bibliotecas externas. */
(function(){
'use strict';
const g=id=>document.getElementById(id);
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const nf=(v,d=3)=>{ if(!isFinite(v)) return '—'; const a=Math.abs(v); if(a!==0&&(a<1e-3||a>=1e6)){ const e=Math.floor(Math.log10(a)); return (v/Math.pow(10,e)).toLocaleString('pt-BR',{maximumFractionDigits:2})+' × 10'+String(e).replace(/[-\d]/g,c=>'⁻⁰¹²³⁴⁵⁶⁷⁸⁹'['-0123456789'.indexOf(c)]) }
  return Number(v.toPrecision(d)).toLocaleString('pt-BR',{maximumFractionDigits:6}) };
const num=s=>{ const v=parseFloat(String(s).replace(/\s/g,'').replace(',','.')); return isFinite(v)&&v>=0?v:NaN };
const pf=f=>(typeof prettyF==='function'?prettyF(f):f);
const mm=f=>MM(f);
function tela(cv){ const x=cv.getContext('2d'); return ()=>{ const r=cv.getBoundingClientRect(), d=Math.min(2,devicePixelRatio||1), w=Math.round(r.width), h=Math.round(r.height);
  if(!w||!h) return null; if(cv.width!==w*d||cv.height!==h*d){ cv.width=w*d; cv.height=h*d } x.setTransform(d,0,0,d,0,0); return {x,W:w,H:h} } }
const visivel=el=>el&&el.offsetParent!==null&&!document.hidden;
function laco(el,passo){ let on=false, t0=0; const f=t=>{ if(!visivel(el)){ on=false; return } const dt=Math.min(.05,(t-(t0||t))/1000); t0=t; if(passo(dt,t)!==false) requestAnimationFrame(f); else on=false };
  return ()=>{ if(on) return; on=true; t0=0; requestAnimationFrame(f) } }
const sinal=v=>{ const r=Math.round(v*100)/100; const t=Number.isInteger(r)?String(Math.abs(r)):Math.abs(r).toLocaleString('pt-BR',{maximumFractionDigits:2}); return r>0?'+'+t:r<0?'−'+t:'0' };

/* ===================== LIMITANTE ===================== */
const RX=[{n:'NaOH + CO₂ (ED3 · 5)',r:[['NaOH',2],['CO2',1]],p:[['Na2CO3',1],['H2O',1]],d:[1.70,1.00],u:'mol'},
  {n:'H₂SO₄ + KOH (ED3 · 6)',r:[['H2SO4',1],['KOH',2]],p:[['K2SO4',1],['H2O',2]],d:[10,15],u:'g'},
  {n:'Amônia',r:[['N2',1],['H2',3]],p:[['NH3',2]],d:[28,9],u:'g'},
  {n:'Água',r:[['H2',2],['O2',1]],p:[['H2O',2]],d:[4,32],u:'g'},
  {n:'Alto-forno',r:[['Fe2O3',1],['CO',3]],p:[['Fe',2],['CO2',3]],d:[1000,600],u:'g'},
  {n:'Al + Cl₂',r:[['Al',2],['Cl2',3]],p:[['AlCl3',2]],d:[2,2],u:'mol'}];
function limW(){ const P=g('m3LimP'); if(!P) return; let R=RX[0], u=R.u;
  P.innerHTML=RX.map((r,i)=>'<button data-i="'+i+'">'+r.n+'</button>').join('');
  const lado=l=>l.map(([f,c])=>(c>1?'<b>'+c+'</b> ':'')+pf(f)).join(' + ');
  const monta=()=>{ P.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('sel',RX[i]===R)); g('m3LimE').innerHTML=lado(R.r)+' → '+lado(R.p);
    g('m3LimI').innerHTML=R.r.map(([f],i)=>'<label>'+pf(f)+'<input type="text" inputmode="decimal" id="m3LimV'+i+'" value="'+String(R.d[i]).replace('.',',')+'"></label>').join('')+'<div class="dinch"><button data-u="g">em gramas</button><button data-u="mol">em mol</button></div>';
    R.r.forEach((_,i)=>g('m3LimV'+i).oninput=calc); g('m3LimI').querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>{ u=b.dataset.u; calc() }); calc() };
  const calc=()=>{ g('m3LimI').querySelectorAll('[data-u]').forEach(b=>b.classList.toggle('sel',b.dataset.u===u)); const pu=+g('m3LimPu').value/100, re=+g('m3LimRe').value/100; g('m3LimPv').textContent=Math.round(pu*100)+' %'; g('m3LimRv').textContent=Math.round(re*100)+' %';
    const v=R.r.map((_,i)=>num(g('m3LimV'+i).value)); if(v.some(isNaN)){ g('m3LimO').textContent='Digite as duas quantidades.'; g('m3LimB').innerHTML=''; return }
    const n=R.r.map(([f],i)=>(u==='g'?v[i]/mm(f):v[i])*(i===0?pu:1)), ext=R.r.map(([,c],i)=>n[i]/c), li=ext[0]<=ext[1]?0:1, ex=1-li, xi=ext[li], emp=Math.abs(ext[0]-ext[1])<1e-9*Math.max(1,ext[0]);
    const usa=R.r.map(([,c])=>c*xi), sob=n.map((a,i)=>Math.max(0,a-usa[i])), prod=R.p.map(([f,c])=>({f,n:c*xi*re,nt:c*xi})), mx=Math.max(...ext,1e-12);
    const barra=(rot,frac,cls,txt)=>'<div class="m3-bar"><span>'+rot+'</span><div><i class="'+cls+'" style="width:'+Math.max(0,Math.min(100,frac*100))+'%"></i></div><small>'+txt+'</small></div>';
    g('m3LimB').innerHTML=R.r.map(([f,c],i)=>'<div class="m3-barg"><b>'+pf(f)+(i===li&&!emp?' · limitante':emp?'':' · em excesso')+'</b>'+barra('tem',ext[i]/mx,'a',nf(n[i])+' mol')+barra('reage',usa[i]/c/mx,'b',nf(usa[i])+' mol')+barra('sobra',sob[i]/c/mx,'c',nf(sob[i])+' mol = '+nf(sob[i]*mm(f))+' g')+'</div>').join('')+
      '<div class="m3-barg"><b>Produtos</b>'+prod.map(p=>barra(pf(p.f),p.n/R.p.find(q=>q[0]===p.f)[1]/mx,'d',nf(p.n)+' mol = '+nf(p.n*mm(p.f))+' g')).join('')+'</div>';
    g('m3LimO').innerHTML=(pu<1?'Pureza: só '+Math.round(pu*100)+' % do '+pf(R.r[0][0])+' reage.<br>':'')+'Mol disponível: '+R.r.map(([f],i)=>pf(f)+' = '+nf(n[i])+(u==='g'?' ('+nf(v[i]*(i===0?pu:1))+' g ÷ '+nf(mm(f),4)+' g/mol)':'')).join(' · ')+
      '<br>Teste n ÷ coeficiente: '+R.r.map(([f,c],i)=>pf(f)+' → '+nf(n[i])+' ÷ '+c+' = <b>'+nf(ext[i])+'</b>').join(' · ')+
      '<br>'+(emp?'<b>Proporção exata</b>: os dois acabam juntos.':'<b style="color:var(--c1)">Limitante: '+pf(R.r[li][0])+'</b> (menor valor). Sobra de '+pf(R.r[ex][0])+': <b>'+nf(sob[ex])+' mol = '+nf(sob[ex]*mm(R.r[ex][0]))+' g</b>.')+
      '<br>Produto: '+prod.map(p=>'<b>'+nf(p.n)+' mol de '+pf(p.f)+'</b> ('+nf(p.n*mm(p.f))+' g)').join(' · ')+(re<1?'<br>Rendimento de '+Math.round(re*100)+' %: o teórico seria '+prod.map(p=>nf(p.nt*mm(p.f))+' g de '+pf(p.f)).join(' e ')+'.':'') };
  P.querySelectorAll('button').forEach(b=>b.onclick=()=>{ R=RX[+b.dataset.i]; u=R.u; monta() }); g('m3LimPu').oninput=g('m3LimRe').oninput=calc; monta() }

/* ===================== SOLUÇÕES ===================== */
function bequer(x,cx,base,w,h,frac,alpha,rot,dots,seed){ const top=base-h, ly=base-h*frac;
  x.fillStyle='rgba(30,98,201,'+alpha+')'; x.fillRect(cx-w/2+2,ly,w-4,base-ly-2);
  if(dots){ let s=seed||7; const rnd=()=>{ s=(s*16807)%2147483647; return s/2147483647 }; x.fillStyle='rgba(14,31,56,.55)'; for(let i=0;i<dots;i++){ x.beginPath(); x.arc(cx-w/2+6+rnd()*(w-12),ly+4+rnd()*Math.max(1,base-ly-10),1.7,0,7); x.fill() } }
  x.strokeStyle=css('--ink')||'#223'; x.lineWidth=2.5; x.beginPath(); x.moveTo(cx-w/2-5,top); x.lineTo(cx-w/2,top+5); x.lineTo(cx-w/2,base); x.lineTo(cx+w/2,base); x.lineTo(cx+w/2,top+5); x.lineTo(cx+w/2+5,top); x.stroke();
  x.fillStyle=css('--ink2')||'#556'; x.font='700 12px Inter,sans-serif'; x.textAlign='center'; x.fillText(rot,cx,base+16) }
function solW(){ const cv=g('m3Sol'); if(!cv) return; const fit=tela(cv), N=g('m3SolN'), V=g('m3SolV');
  const draw=()=>{ const T=fit(); const n=+N.value/100, v=+V.value, C=n/(v/1000); g('m3SolNv').textContent=nf(n)+' mol'; g('m3SolVv').textContent=v+' mL';
    g('m3SolO').innerHTML='C = n / V = '+nf(n)+' mol ÷ '+nf(v/1000)+' L = <b>'+nf(C)+' mol/L</b><br><small>Se o soluto fosse NaOH (40,00 g/mol): '+nf(n*40)+' g dissolvidos. Se fosse NaCl (58,44 g/mol): '+nf(n*58.44)+' g.</small>';
    if(!T) return; const {x,W,H}=T; x.clearRect(0,0,W,H); const bw=Math.min(190,W*.3), bh=H-54;
    bequer(x,W*.3,H-26,bw,bh,v/1000,Math.min(.9,.06+C*.11),v+' mL de solução',Math.min(400,Math.round(n*200)),11);
    x.fillStyle=css('--ink')||'#223'; x.textAlign='left'; x.font='800 22px Inter,sans-serif'; x.fillText(nf(C)+' mol/L',W*.55,H*.4); x.font='600 12px Inter,sans-serif'; x.fillStyle=css('--ink2')||'#556';
    x.fillText('cada ponto = 0,005 mol de soluto',W*.55,H*.4+22); x.fillText(C<.1?'bem diluída':C<1?'diluída':C<5?'concentrada':'muito concentrada',W*.55,H*.4+40) };
  N.oninput=V.oninput=draw; return draw }
function dilW(){ const cv=g('m3Dil'); if(!cv) return; const fit=tela(cv), Cc=g('m3DilC'), A=g('m3DilA'), F=g('m3DilF');
  const draw=()=>{ const c1=+Cc.value, v1=+A.value, v2=Math.max(+F.value,v1), c2=c1*v1/v2, n=c1*v1/1000; g('m3DilCv').textContent=nf(c1)+' mol/L'; g('m3DilAv').textContent=nf(v1)+' mL'; g('m3DilFv').textContent=v2+' mL';
    g('m3DilO').innerHTML='Mol na alíquota: n = C₁ · V₁ = '+nf(c1)+' × '+nf(v1/1000)+' L = <b>'+nf(n)+' mol</b> (não muda)<br>C₂ = C₁ · V₁ / V₂ = '+nf(c1)+' × '+nf(v1)+' ÷ '+v2+' = <b>'+nf(c2)+' mol/L</b> · diluiu '+nf(v2/v1)+' vezes';
    const T=fit(); if(!T) return; const {x,W,H}=T; x.clearRect(0,0,W,H); const bw=Math.min(150,W*.24), bh=H-54, dots=Math.min(300,Math.round(n*120));
    bequer(x,W*.2,H-26,bw,bh,Math.max(.06,v1/1000*3),Math.min(.9,.06+c1*.05),'alíquota: '+nf(v1)+' mL · '+nf(c1)+' mol/L',dots,5);
    bequer(x,W*.75,H-26,bw,bh,v2/1000,Math.min(.9,.03+c2*.05),'final: '+v2+' mL · '+nf(c2)+' mol/L',dots,9);
    x.strokeStyle='#F26B1D'; x.fillStyle='#F26B1D'; x.lineWidth=3; const ax=W*.2+bw/2+18, bx=W*.75-bw/2-18, y=H*.45; x.beginPath(); x.moveTo(ax,y); x.lineTo(bx-8,y); x.stroke(); x.beginPath(); x.moveTo(bx,y); x.lineTo(bx-12,y-7); x.lineTo(bx-12,y+7); x.fill();
    x.font='700 12px Inter,sans-serif'; x.textAlign='center'; x.fillText('+ água',(ax+bx)/2,y-10); x.fillStyle=css('--ink2')||'#556'; x.fillText('mesmos '+nf(n)+' mol',(ax+bx)/2,y+20) };
  Cc.oninput=A.oninput=F.oninput=draw; return draw }

/* ===================== NOX ===================== */
const G1=['Li','Na','K','Rb','Cs'], G2=['Be','Mg','Ca','Sr','Ba'], FIXO={Al:3,Zn:2,Ag:1,F:-1};
function nox(f,q){ const c=parseF(f), els=Object.keys(c), st=[], N={};
  if(els.length===1){ const e=els[0]; N[e]=q/c[e]; st.push(q===0?'Regra 1: substância simples → Nox = 0.':'Regra 2: íon de um só elemento → Nox = carga'+(c[e]>1?' ÷ nº de átomos':'')+' = '+sinal(N[e])+'.'); return {c,N,st,ok:true} }
  els.forEach(e=>{ if(G1.includes(e)){ N[e]=1; st.push('Regra 3: '+e+' é do grupo 1 → +1.') } else if(G2.includes(e)){ N[e]=2; st.push('Regra 3: '+e+' é do grupo 2 → +2.') } else if(e in FIXO){ N[e]=FIXO[e]; st.push((e==='F'?'Regra 4: flúor é sempre −1.':e+' tem Nox fixo '+sinal(FIXO[e])+'.')) } });
  let un=els.filter(e=>!(e in N)), guard=0;
  while(un.length>1&&guard++<6){
    if(un.includes('H')){ N.H=1; st.push('Regra 5: hidrogênio → +1.') }
    else if(un.includes('O')){ N.O=-2; st.push('Regra 6: oxigênio → −2.') }
    else if(un.includes('S')&&c.O===4*c.S){ N.S=6; st.push('O grupo SO₄ é o sulfato (SO₄²⁻): S = +6.') }
    else if(un.includes('N')&&c.O===3*c.N){ N.N=5; st.push('O grupo NO₃ é o nitrato (NO₃⁻): N = +5.') }
    else if(un.includes('C')&&c.O===3*c.C){ N.C=4; st.push('O grupo CO₃ é o carbonato (CO₃²⁻): C = +4.') }
    else if(un.includes('P')&&c.O===4*c.P){ N.P=5; st.push('O grupo PO₄ é o fosfato (PO₄³⁻): P = +5.') }
    else { const h=['Cl','Br','I'].find(e=>un.includes(e)); if(h){ N[h]=-1; st.push(h+' é o mais eletronegativo aqui → −1 (haleto).') } else break }
    un=els.filter(e=>!(e in N)) }
  if(un.length>1) return {c,N,st,ok:false,un};
  if(un.length===1){ const e=un[0], soma=els.filter(k=>k!==e).reduce((s,k)=>s+N[k]*c[k],0); N[e]=(q-soma)/c[e];
    st.push('Regra 7: a soma tem que dar '+sinal(q)+'. '+els.map(k=>(c[k]>1?c[k]+' × ':'')+(k===e?'<b>'+e+'</b>':'('+sinal(N[k])+')')).join(' + ')+' = '+sinal(q)+' → <b>'+e+' = '+sinal(N[e])+'</b>.');
    if(e==='O'&&N[e]===-1) st.push('O = −1: é um <b>peróxido</b>.'); if(e==='H'&&N[e]===-1) st.push('H = −1: é um <b>hidreto metálico</b>.');
    if(!Number.isInteger(Math.round(N[e]*1000)/1000)) st.push('Valor fracionário: é o Nox <b>médio</b> (os átomos de '+e+' não são todos iguais no composto).') }
  else { const soma=els.reduce((s,k)=>s+N[k]*c[k],0); if(Math.abs(soma-q)>1e-9) st.push('⚠ A soma dá '+sinal(soma)+', não '+sinal(q)+': confira a carga.') }
  return {c,N,st,ok:true} }
function noxW(){ const F=g('m3NoxF'); if(!F) return; let q=0;
  const EXS=[['I2O5',0],['CO',0],['CO2',0],['N2H4',0],['H2S',0],['NO3',-1],['NO',0],['H2O2',0],['ClO2',0],['ClO2',-1],['Hg',2],['KMnO4',0],['Cr2O7',-2],['Fe2O3',0],['H2SO4',0],['PbO2',0],['PbSO4',0],['NaH',0]];
  const rot=(f,c)=>pf(f)+(c?'<sup>'+(Math.abs(c)>1?Math.abs(c):'')+(c>0?'+':'−')+'</sup>':'');
  g('m3NoxEx').innerHTML=EXS.map((e,i)=>'<button data-i="'+i+'">'+rot(e[0],e[1])+'</button>').join('');
  const calc=()=>{ g('m3NoxQ').textContent=q===0?'0':(Math.abs(q)+(q>0?'+':'−'));
    try{ const r=nox(F.value,q), els=Object.keys(r.c);
      g('m3NoxR').innerHTML=els.map(e=>'<div class="'+(r.N[e]>0?'pos':r.N[e]<0?'neg':'')+'"><small>'+(e in r.N?sinal(r.N[e]):'?')+'</small><b>'+e+(r.c[e]>1?'<sub>'+r.c[e]+'</sub>':'')+'</b></div>').join('')+(q?'<span class="q">carga '+sinal(q)+'</span>':'');
      g('m3NoxO').innerHTML=r.st.join('<br>')+(r.ok?'':'<br><b style="color:var(--bad,#C73A2C)">Sobraram '+r.un.join(' e ')+' sem regra fixa: aqui é preciso conhecer o composto (ou o íon) para decidir.</b>') }
    catch(e){ g('m3NoxR').innerHTML=''; g('m3NoxO').textContent=typeof e==='string'?e:'Não entendi a fórmula. Ex.: H2SO4, Fe2O3, NO3 com carga −1.' } };
  F.oninput=calc; g('m3NoxM').onclick=()=>{ q=Math.max(-4,q-1); calc() }; g('m3NoxP').onclick=()=>{ q=Math.min(4,q+1); calc() };
  g('m3NoxEx').querySelectorAll('button').forEach(b=>b.onclick=()=>{ const e=EXS[+b.dataset.i]; F.value=e[0]; q=e[1]; calc() }); calc() }
/* quem oxidou, quem reduziu: régua de Nox */
const RXS=[['Zn + Cu²⁺','Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)',['Zn',0,2],['Cu',2,0],'O zinco entrega 2 e⁻ ao cobre. É a reação da pilha de Daniell.'],
  ['Ferrugem','4 Fe(s) + 3 O₂(g) → 2 Fe₂O₃(s)',['Fe',0,3],['O',0,-2],'4 Fe × 3 = 12 e⁻ perdidos · 6 O × 2 = 12 e⁻ ganhos.'],
  ['Alto-forno','Fe₂O₃(s) + 3 CO(g) → 2 Fe(l) + 3 CO₂(g)',['C',2,4],['Fe',3,0],'O CO é o agente redutor que tira o oxigênio do minério.'],
  ['Aluminotermia','2 Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2 Fe(l)',['Al',0,3],['Fe',3,0],'Solda de trilhos: o alumínio reduz o óxido de ferro e libera muito calor.'],
  ['ED3 · 7a','I₂O₅(s) + 5 CO(g) → I₂(s) + 5 CO₂(g)',['C',2,4],['I',5,0],'5 C × 2 = 10 e⁻ perdidos · 2 I × 5 = 10 e⁻ ganhos.'],
  ['ED3 · 7b','2 Hg²⁺(aq) + N₂H₄(aq) → 2 Hg(l) + N₂(g) + 4 H⁺(aq)',['N',-2,0],['Hg',2,0],'2 N × 2 = 4 e⁻ perdidos · 2 Hg × 2 = 4 e⁻ ganhos.'],
  ['ED3 · 7c','3 H₂S(aq) + 2 H⁺(aq) + 2 NO₃⁻(aq) → 3 S(s) + 2 NO(g) + 4 H₂O(l)',['S',-2,0],['N',5,2],'3 S × 2 = 6 e⁻ perdidos · 2 N × 3 = 6 e⁻ ganhos.'],
  ['ED3 · 7d','Ba²⁺ + 2 OH⁻ + H₂O₂ + 2 ClO₂ → Ba(ClO₂)₂(s) + 2 H₂O + O₂(g)',['O',-1,0],['Cl',4,3],'2 O do H₂O₂ × 1 = 2 e⁻ perdidos · 2 Cl × 1 = 2 e⁻ ganhos.']];
function rxW(){ const P=g('m3RxP'); if(!P) return; let i=0; P.innerHTML=RXS.map((r,k)=>'<button data-i="'+k+'">'+r[0]+'</button>').join('');
  const regua=(el,a,b,cor,txt)=>{ const X=v=>24+(v+3)*27; let t=''; for(let v=-3;v<=7;v++) t+='<line x1="'+X(v)+'" y1="34" x2="'+X(v)+'" y2="42" stroke="currentColor" opacity=".4"/><text x="'+X(v)+'" y="56" text-anchor="middle" font-size="10" fill="currentColor" opacity=".7">'+sinal(v)+'</text>';
    const d=b>a?-8:8; return '<div class="m3-rg"><b style="color:'+cor+'">'+el+': '+sinal(a)+' → '+sinal(b)+' · '+txt+'</b><svg viewBox="0 0 320 62" role="img" aria-label="'+el+' de '+a+' para '+b+'"><line x1="16" y1="38" x2="304" y2="38" stroke="currentColor" opacity=".4"/>'+t+
      '<circle cx="'+X(a)+'" cy="38" r="6" fill="none" stroke="'+cor+'" stroke-width="2"/><path d="M'+X(a)+' 26 Q'+(X(a)+X(b))/2+' 2 '+X(b)+' 26" fill="none" stroke="'+cor+'" stroke-width="2.5"/><path d="M'+X(b)+' 30 l'+d+' -9 l'+(-d*.2)+' 7z" fill="'+cor+'"/><circle cx="'+X(b)+'" cy="38" r="6" fill="'+cor+'"/></svg></div>' };
  const draw=()=>{ P.querySelectorAll('button').forEach((b,k)=>b.classList.toggle('sel',k===i)); const r=RXS[i], o=r[2], d=r[3];
    g('m3Rx').innerHTML='<div class="m3-eq">'+r[1]+'</div>'+regua(o[0],o[1],o[2],'#C73A2C','oxidou (perdeu '+(o[2]-o[1])+' e⁻ por átomo)')+regua(d[0],d[1],d[2],'#1E62C9','reduziu (ganhou '+(d[1]-d[2])+' e⁻ por átomo)');
    g('m3RxO').innerHTML='Agente redutor: a espécie que contém o <b>'+o[0]+'</b> · agente oxidante: a que contém o <b>'+d[0]+'</b><br>'+r[4] };
  P.querySelectorAll('button').forEach(b=>b.onclick=()=>{ i=+b.dataset.i; draw() }); draw() }

/* ===================== PILHA ===================== */
const MET=[['Ag',1,.799,'#C9CED6'],['Cu',2,.337,'#C87533'],['Ni',2,-.28,'#9AA08F'],['Fe',2,-.44,'#7A7F87'],['Cr',3,-.74,'#AEB8C4'],['Zn',2,-.763,'#8FA0B0'],['Pb',2,-.126,'#5E6670'],['Al',3,-1.66,'#C4CAD0'],['Mg',2,-2.37,'#D5D9DD'],['Au',3,1.5,'#E3B23C']];
const ion=m=>m[0]+(m[1]>1?['','','²','³'][m[1]]:'')+'⁺';
const volt=v=>(v>0?'+':v<0?'−':'')+Math.abs(v).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:3});
const gcd2=(a,b)=>b?gcd2(b,a%b):a;
function pilhaW(){ const cv=g('m3Pi'); if(!cv) return; const fit=tela(cv); let a=3, b=0, t=0;
  const chips=(id,get,set)=>{ const P=g(id); P.innerHTML=MET.map((m,i)=>'<button data-i="'+i+'">'+m[0]+'</button>').join(''); P.querySelectorAll('button').forEach(o=>o.onclick=()=>{ set(+o.dataset.i); sync(); info(); draw(); anda() }) };
  const sync=()=>{ g('m3PiA').querySelectorAll('button').forEach((o,i)=>o.classList.toggle('sel',i===a)); g('m3PiB').querySelectorAll('button').forEach((o,i)=>o.classList.toggle('sel',i===b)) };
  const info=()=>{ if(a===b){ g('m3PiO').innerHTML='Dois eletrodos iguais: não há diferença de potencial. Escolha metais diferentes.'; return } const A=MET[a], B=MET[b], cat=A[2]>B[2]?A:B, an=cat===A?B:A, fem=cat[2]-an[2], L=cat[1]*an[1]/gcd2(cat[1],an[1]), ka=L/an[1], kc=L/cat[1], k=v=>v>1?v+' ':'';
    g('m3PiO').innerHTML='<b style="color:#C73A2C">Ânodo (−), oxidação:</b> '+an[0]+'(s) → '+ion(an)+'(aq) + '+k(an[1])+'e⁻ &nbsp; E°<sub>red</sub> = '+volt(an[2])+' V<br><b style="color:#1E62C9">Cátodo (+), redução:</b> '+ion(cat)+'(aq) + '+k(cat[1])+'e⁻ → '+cat[0]+'(s) &nbsp; E°<sub>red</sub> = '+volt(cat[2])+' V<br>E°<sub>cel</sub> = '+volt(cat[2])+' − ('+volt(an[2])+') = <b>'+volt(fem).replace('+','')+' V</b><br>Global ('+L+' e⁻ trocados): <b>'+k(ka)+an[0]+'(s) + '+k(kc)+ion(cat)+'(aq) → '+k(ka)+ion(an)+'(aq) + '+k(kc)+cat[0]+'(s)</b><br><small>Elétrons no fio: do '+an[0]+' para o '+cat[0]+' · na ponte salina: ânions → lado do '+an[0]+', cátions → lado do '+cat[0]+'.</small>' };
  const draw=()=>{ const T=fit(); if(!T) return; const {x,W,H}=T; x.clearRect(0,0,W,H); const A=MET[a], B=MET[b], igual=a===b, catL=A[2]>B[2], bw=Math.min(230,W*.3), bh=H*.42, base=H-34, xl=W*.27, xr=W*.73, top=base-bh, wy=Math.max(26,H*.12);
    const lado=(cx,m,isCat)=>{ x.fillStyle='rgba(30,98,201,.16)'; x.fillRect(cx-bw/2+2,top+bh*.25,bw-4,bh*.75-2); x.strokeStyle=css('--ink')||'#223'; x.lineWidth=2.5; x.beginPath(); x.moveTo(cx-bw/2,top); x.lineTo(cx-bw/2,base); x.lineTo(cx+bw/2,base); x.lineTo(cx+bw/2,top); x.stroke();
      const ew=igual?26:isCat?32:20, ex=cx-(cx<W/2?bw*.2:-bw*.2); x.fillStyle=m[3]; x.fillRect(ex-ew/2,wy,ew,base-wy-16); x.strokeStyle='rgba(0,0,0,.35)'; x.lineWidth=1; x.strokeRect(ex-ew/2,wy,ew,base-wy-16);
      x.fillStyle='#0E1F38'; x.font='800 13px Inter,sans-serif'; x.textAlign='center'; x.fillText(m[0],ex,top+bh*.1);
      x.fillStyle=css('--ink2')||'#556'; x.font='600 11px Inter,sans-serif'; x.fillText('solução com '+ion(m),cx,base+14);
      if(!igual){ x.fillStyle=isCat?'#1E62C9':'#C73A2C'; x.font='800 12px Inter,sans-serif'; x.fillText(isCat?'CÁTODO (+)':'ÂNODO (−)',cx,base+29);
        for(let k=0;k<4;k++){ const ph=((t*.5+k/4)%1), dir=cx<W/2?1:-1, yy=top+bh*(.4+.13*k); const px=isCat?ex+dir*(ew/2+46*(1-ph)):ex+dir*(ew/2+46*ph); x.globalAlpha=isCat?ph:1-ph; x.fillStyle=m[3]; x.strokeStyle='#0E1F38'; x.beginPath(); x.arc(px,yy,5,0,7); x.fill(); x.stroke(); x.fillStyle='#0E1F38'; x.font='700 8px Inter'; x.fillText('+',px,yy+3); x.globalAlpha=1 } }
      return ex };
    const el=lado(xl,A,catL), er=lado(xr,B,!catL);
    /* ponte salina */
    const py=top+bh*.5, pa=xl+bw*.22, pb=xr-bw*.22; x.strokeStyle='rgba(227,162,26,.85)'; x.lineWidth=14; x.lineCap='round'; x.beginPath(); x.moveTo(pa,py); x.lineTo(pa,top-14); x.lineTo(pb,top-14); x.lineTo(pb,py); x.stroke(); x.lineCap='butt';
    x.fillStyle='#7A5A10'; x.font='700 10px Inter,sans-serif'; x.textAlign='center'; x.fillText('ponte salina',(pa+pb)/2,top-24);
    if(!igual){ for(let k=0;k<3;k++){ const ph=(t*.35+k/3)%1, xa=catL?pa+(pb-pa)*ph:pb-(pb-pa)*ph, xc=catL?pb-(pb-pa)*ph:pa+(pb-pa)*ph; x.fillStyle='#C73A2C'; x.font='800 11px Inter'; x.fillText('−',xa,top-17); x.fillStyle='#1E62C9'; x.fillText('+',xc,top-7) } }
    /* fio e voltímetro */
    x.strokeStyle='#0E1F38'; x.lineWidth=2.5; x.beginPath(); x.moveTo(el,wy); x.lineTo(el,wy-12); x.lineTo(er,wy-12); x.lineTo(er,wy); x.stroke();
    const fem=Math.abs(A[2]-B[2]); x.fillStyle='#0E1F38'; x.fillRect(W/2-44,wy-27,88,30); x.fillStyle='#7CFFB0'; x.font='800 15px "JetBrains Mono",monospace'; x.textAlign='center'; x.fillText(fem.toFixed(2).replace('.',',')+' V',W/2,wy-7);
    if(!igual){ const from=catL?er:el, to=catL?el:er; for(let k=0;k<5;k++){ const ph=(t*.6+k/5)%1, px=from+(to-from)*ph; if(Math.abs(px-W/2)<48) continue; x.fillStyle='#F26B1D'; x.beginPath(); x.arc(px,wy-12,4,0,7); x.fill(); x.fillStyle='#fff'; x.font='700 7px Inter'; x.fillText('−',px,wy-9.5) }
      x.fillStyle='#F26B1D'; x.font='700 11px Inter,sans-serif'; x.fillText(catL?'← e⁻':'e⁻ →',W/2,wy+16) } };
  const anda=laco(cv,dt=>{ t+=dt; draw(); return !RM&&a!==b });
  chips('m3PiA',()=>a,v=>a=v); chips('m3PiB',()=>b,v=>b=v); sync(); info(); return ()=>{ draw(); anda() } }

/* ===================== ÍNDICE DO ED3 ===================== */
function idxW(){ const b=g('m3Idx'); if(!b) return; const hs=[...document.querySelectorAll('#v-ed3 h3[data-q]')];
  b.innerHTML=hs.map(h=>'<button data-q="'+h.dataset.q+'"><span>'+h.dataset.q+'</span>'+h.textContent.replace(/^Questão \d+ · /,'')+'</button>').join('');
  b.querySelectorAll('button').forEach(o=>o.onclick=()=>{ const h=hs.find(k=>k.dataset.q===o.dataset.q); if(h) h.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'}) }) }


/* ===================== BALANCEAMENTO À MÃO (quadro branco) ===================== */
/* cada passo: [coeficientes, elemento em foco, nota, índices que mudaram] */
const MAO=[
 {n:'Metano',r:['CH4','O2'],p:['CO2','H2O'],s:[
  [[1,1,1,1],null,'Escreva a equação e monte a tabelinha embaixo de cada lado. Contando: só o C bate.',[]],
  [[1,1,1,1],'C','M: não tem metal. A: não tem ametal além de C, H, O. C: 1 = 1 ✓, não mexe.',[]],
  [[1,1,1,2],'H','H: 4 de um lado, 2 do outro. Coloque 2 na frente da H₂O: 2 × 2 = 4 ✓',[3]],
  [[1,2,1,2],'O','O: à direita 2 (CO₂) + 2 (2 H₂O) = 4. Para ter 4 à esquerda, 2 O₂ (2 × 2 = 4) ✓',[1]],
  [[1,2,1,2],'*','Confira tudo: C 1 = 1, H 4 = 4, O 4 = 4. Balanceada!',[]]]},
 {n:'Al + Cl₂ (quadro)',r:['Al','Cl2'],p:['AlCl3'],s:[
  [[1,1,1],null,'Monte a tabelinha. O Al bate, o Cl não.',[]],
  [[1,1,1],'Al','M (metal): Al 1 = 1 por enquanto. Segue para o ametal.',[]],
  [[1,3,2],'Cl','A (ametal): Cl 2 × 3. MMC de 2 e 3 = 6 → 3 Cl₂ (3 × 2 = 6) e 2 AlCl₃ (2 × 3 = 6).',[1,2]],
  [[2,3,2],'Al','Mexi no AlCl₃: o Al da direita virou 2! Volte ao metal: 2 Al na esquerda.',[0]],
  [[2,3,2],'*','Confira como no quadro: 2 Al ✓ 6 Cl ✓ dos dois lados.',[]]]},
 {n:'Propeno (slide)',r:['C3H6','O2'],p:['CO2','H2O'],s:[
  [[1,1,1,1],null,'0. Início: nada bate.',[]],
  [[1,1,3,1],'C','1. Carbono: 3 C na esquerda → 3 CO₂.',[2]],
  [[1,1,3,3],'H','2. Hidrogênio: 6 H na esquerda → 3 H₂O (3 × 2 = 6).',[3]],
  [[1,'9/2',3,3],'O','3. Oxigênio: direita 3 × 2 + 3 × 1 = 9. Com O₂ (2 por molécula) precisa de 9/2.',[1]],
  [[2,9,6,6],'O','Não quer fração? Multiplique TODOS os coeficientes por 2.',[0,1,2,3]],
  [[2,9,6,6],'*','Confira: C 6 = 6, H 12 = 12, O 18 = 18.',[]]]},
 {n:'Ferrugem',r:['Fe','O2'],p:['Fe2O3'],s:[
  [[1,1,1],null,'Monte a tabelinha: Fe e O não batem.',[]],
  [[2,1,1],'Fe','M (metal): Fe 1 × 2 → 2 Fe.',[0]],
  [[2,3,2],'O','O: 2 × 3. MMC = 6 → 3 O₂ e 2 Fe₂O₃.',[1,2]],
  [[4,3,2],'Fe','Mexi no Fe₂O₃: agora são 4 Fe na direita. Volte: 4 Fe.',[0]],
  [[4,3,2],'*','Confira: Fe 4 = 4, O 6 = 6.',[]]]},
 {n:'Fe(OH)₃ + H₂SO₄ (ED3 2f)',r:['Fe(OH)3','H2SO4'],p:['Fe2(SO4)3','H2O'],s:[
  [[1,1,1,1],null,'Tabelinha montada. Dica: o grupo SO₄ não se desmancha, dá para contar como bloco.',[]],
  [[2,1,1,1],'Fe','M (metal): Fe 1 × 2 → 2 Fe(OH)₃.',[0]],
  [[2,3,1,1],'S','A (ametal): S 1 × 3 → 3 H₂SO₄.',[1]],
  [[2,3,1,6],'H','H: esquerda 2 × 3 + 3 × 2 = 12. Direita só a água: 6 H₂O (6 × 2 = 12).',[3]],
  [[2,3,1,6],'O','O: esquerda 2 × 3 + 3 × 4 = 18 · direita 3 × 4 + 6 × 1 = 18 ✓ Já fechou.',[]],
  [[2,3,1,6],'*','Todos ✓. Balanceada!',[]]]},
 {n:'NH₄NO₃ (slide)',r:['NH4NO3'],p:['N2O','H2O'],s:[
  [[1,1,1],null,'Monte a tabelinha. Atenção: o N aparece duas vezes no NH₄NO₃ (some!).',[]],
  [[1,1,1],'N','A (ametal): N 2 = 2 ✓.',[]],
  [[1,1,2],'H','H: 4 × 2 → 2 H₂O.',[2]],
  [[1,1,2],'O','O: esquerda 3 · direita 1 + 2 = 3 ✓',[]],
  [[1,1,2],'*','Confira: N 2, H 4, O 3 dos dois lados.',[]]]},
 {n:'Al₄C₃ + H₂O (ED3 2d)',r:['Al4C3','H2O'],p:['Al(OH)3','CH4'],s:[
  [[1,1,1,1],null,'Tabelinha montada. Comece pela substância mais "cheia": Al₄C₃.',[]],
  [[1,1,4,1],'Al','M (metal): Al 4 × 1 → 4 Al(OH)₃.',[2]],
  [[1,1,4,3],'C','C: 3 × 1 → 3 CH₄.',[3]],
  [[1,12,4,3],'O','H aparece em dois produtos e O só em um: resolva o O primeiro. Direita 4 × 3 = 12 → 12 H₂O.',[1]],
  [[1,12,4,3],'H','H: esquerda 12 × 2 = 24 · direita 4 × 3 + 3 × 4 = 24 ✓',[]],
  [[1,12,4,3],'*','Todos ✓. Balanceada!',[]]]}];
const METC=['ak','ae','tr','pt','la','ac'];
const fr=v=>{ if(typeof v==='number') return v; const [a,b]=String(v).split('/').map(Number); return a/(b||1) };
const sub=f=>String(f).replace(/\d+/g,d=>d.split('').map(c=>'₀₁₂₃₄₅₆₇₈₉'[c]).join(''));
/* (os quadros são gerados a partir de MAO e escritos direto no HTML da aula) */

limW(); noxW(); rxW(); idxW();
const DRAW={solucoes:[solW(),dilW()],pilhas:[pilhaW()]};
const show=()=>{ const h=location.hash.slice(1); (DRAW[h]||[]).forEach(f=>{ try{ f&&f() }catch(e){ console.error(e) } }) };
addEventListener('hashchange',()=>requestAnimationFrame(show)); let rz=0; addEventListener('resize',()=>{ clearTimeout(rz); rz=setTimeout(show,150) }); requestAnimationFrame(show);
window.FDB_Q3={nox};
})();
