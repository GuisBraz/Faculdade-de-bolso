/* Faculdade de Bolso · Química Geral · Módulo 1 (1ª prova)
   Matéria, modelos atômicos, luz, Bohr, números quânticos, configuração eletrônica, propriedades periódicas e treino.
   Depende do EL (tabela periódica) definido na página. Sem bibliotecas externas. */
(function(){
'use strict';
const g=id=>document.getElementById(id);
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const ELS=(typeof EL!=='undefined'?EL:[]);
const sym=z=>(ELS[z-1]||{}).sym||'?', nome=z=>(ELS[z-1]||{}).nome||'?';
const SUP={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','+':'⁺','-':'⁻'};
const sup=s=>String(s).split('').map(c=>SUP[c]||c).join('');
const NF1={}; const nf=(v,d=2)=>(NF1[d]||(NF1[d]=new Intl.NumberFormat('pt-BR',{maximumFractionDigits:d}))).format(Number(v));
function sci(v,d=2){ if(v===0) return '0'; const e=Math.floor(Math.log10(Math.abs(v))); const m=v/Math.pow(10,e); if(e>=-2&&e<=4) return nf(v,d+1); return nf(m,d)+' × 10'+sup(e) }
/* canvas nítido: DPR máx. 2, tamanho pela largura e pelo aspect-ratio do CSS */
function tela(cv){ const x=cv.getContext('2d'); return ()=>{ const r=cv.getBoundingClientRect(), d=Math.min(2,devicePixelRatio||1), w=Math.round(r.width), h=Math.round(r.height);
  if(!w||!h) return null; if(cv.width!==w*d||cv.height!==h*d){ cv.width=w*d; cv.height=h*d } x.setTransform(d,0,0,d,0,0); return {x,W:w,H:h} } }
const visivel=el=>el&&el.offsetParent!==null&&!document.hidden;
/* laço de animação que só roda com o elemento visível */
function laco(el,passo){ let on=false, t0=0; const f=t=>{ if(!visivel(el)){ on=false; return } const dt=Math.min(.05,(t-(t0||t))/1000); t0=t; if(passo(dt,t)!==false) requestAnimationFrame(f); else on=false };
  return ()=>{ if(on) return; on=true; t0=0; requestAnimationFrame(f) } }
/* cor de um comprimento de onda visível (nm) */
function corLambda(nm){ let r=0,gg=0,b=0; if(nm>=380&&nm<440){ r=-(nm-440)/60; b=1 } else if(nm<490){ gg=(nm-440)/50; b=1 } else if(nm<510){ gg=1; b=-(nm-510)/20 } else if(nm<580){ r=(nm-510)/70; gg=1 } else if(nm<645){ r=1; gg=-(nm-645)/65 } else if(nm<=750){ r=1 }
  let f=1; if(nm<420) f=.3+.7*(nm-380)/40; else if(nm>700) f=.3+.7*(750-nm)/50; if(nm<380||nm>750) return null;
  const c=v=>Math.round(255*Math.pow(Math.max(0,v*f),.8)); return 'rgb('+c(r)+','+c(gg)+','+c(b)+')' }
function nomeCor(nm){ return nm<450?'violeta':nm<485?'azul':nm<500?'ciano':nm<565?'verde':nm<590?'amarelo':nm<625?'laranja':'vermelho' }
function regiao(m){ return m<1e-11?'raios gama':m<1e-8?'raios X':m<380e-9?'ultravioleta':m<=750e-9?'luz visível':m<1e-3?'infravermelho':m<1e-1?'micro-ondas':'ondas de rádio' }
const H=6.626e-34, C=3.00e8, RH=2.18e-18, EV=1.602e-19;

/* ===================== configuração eletrônica ===================== */
const LL='spdf';
const ORD=[]; for(let n=1;n<=7;n++) for(let l=0;l<Math.min(n,4);l++) ORD.push([n,l]);
ORD.sort((a,b)=>(a[0]+a[1])-(b[0]+b[1])||a[0]-b[0]);
const ORDF=ORD.filter(([n,l])=>!(n===7&&l>1)&&!(n===6&&l>2)&&!(n===5&&l>3)); /* até 7p */
const EXC={24:{'4s':-1,'3d':1},29:{'4s':-1,'3d':1},41:{'5s':-1,'4d':1},42:{'5s':-1,'4d':1},44:{'5s':-1,'4d':1},45:{'5s':-1,'4d':1},46:{'5s':-2,'4d':2},47:{'5s':-1,'4d':1},
  57:{'4f':-1,'5d':1},58:{'4f':-1,'5d':1},64:{'4f':-1,'5d':1},78:{'6s':-1,'5d':1},79:{'6s':-1,'5d':1}};
const cap=l=>2*(2*l+1), nome2=([n,l])=>n+LL[l];
function preenche(e){ const m={}; let r=e; for(const s of ORDF){ if(r<=0) break; const k=Math.min(r,cap(s[1])); m[nome2(s)]=k; r-=k } return m }
function config(z,q=0){ const m=preenche(z); if(EXC[z]&&!q||EXC[z]&&q>0) for(const k in EXC[z]) m[k]=(m[k]||0)+EXC[z][k];
  if(q>0){ let r=q; const occ=Object.keys(m).filter(k=>m[k]>0).sort((a,b)=>(+b[0])-(+a[0])||LL.indexOf(b[1])-LL.indexOf(a[1]));
    for(const k of occ){ while(r>0&&m[k]>0){ m[k]--; r-- } } }
  if(q<0){ let r=-q; for(const s of ORDF){ const k=nome2(s), c=cap(s[1]), h=m[k]||0; if(h<c&&r>0){ const a=Math.min(r,c-h); m[k]=h+a; r-=a } if(r<=0) break } }
  Object.keys(m).forEach(k=>{ if(!m[k]) delete m[k] }); return m }
const ordem=m=>ORDF.map(nome2).filter(k=>m[k]);
const txtCfg=(m,ks)=>(ks||ordem(m)).map(k=>k+sup(m[k])).join(' ');
const NOBRES=[[86,'Rn'],[54,'Xe'],[36,'Kr'],[18,'Ar'],[10,'Ne'],[2,'He']];
function condensada(m){ const tot=Object.values(m).reduce((a,b)=>a+b,0);
  for(const [zn,s] of NOBRES){ if(zn>=tot) continue; const core=preenche(zn); if(Object.keys(core).every(k=>m[k]===core[k])) return '['+s+'] '+txtCfg(m,ordem(m).filter(k=>!(k in core))) }
  return txtCfg(m) }
function desemp(m){ let u=0; for(const k in m){ const o=2*LL.indexOf(k[1])+1, e=m[k]; u+=e<=o?e:2*o-e } return u }
function camadas(m){ const c=[]; for(const k in m){ const n=+k[0]; c[n-1]=(c[n-1]||0)+m[k] } return c.map(v=>v||0) }
function valencia(m){ const ns=Object.keys(m).map(k=>+k[0]); const n=Math.max(...ns); return {n,e:Object.keys(m).filter(k=>+k[0]===n).reduce((a,k)=>a+m[k],0)} }
/* lê o que a pessoa digitou ("[Ne]3s2 3p3", "1s2 2s2…") e devolve o mapa */
function leCfg(s){ s=String(s).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,c=>'0123456789'['⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)]).replace(/\s+/g,'').toLowerCase(); const m={};
  const core=s.match(/^\[(he|ne|ar|kr|xe|rn)\]/); if(core){ const zn={he:2,ne:10,ar:18,kr:36,xe:54,rn:86}[core[1]]; Object.assign(m,preenche(zn)); s=s.slice(core[0].length) }
  const re=/([1-7])(?:(s)([12])|(p)([1-6])|(d)(10|[1-9])|(f)(1[0-4]|[1-9]))/g; let t, used=0; while((t=re.exec(s))){ const l=t[2]||t[4]||t[6]||t[8], c=+(t[3]||t[5]||t[7]||t[9]); m[t[1]+l]=(m[t[1]+l]||0)+c; used+=t[0].length } if(used!==s.length) return null;
  return m }
const igualCfg=(a,b)=>{ const ks=new Set([...Object.keys(a),...Object.keys(b)]); for(const k of ks) if((a[k]||0)!==(b[k]||0)) return false; return true };

/* ===================== dados periódicos (Z 1–54) ===================== */
/* raio covalente (pm, Cordero 2008) · 1ª energia de ionização (kJ/mol) · afinidade eletrônica ΔE (kJ/mol, null = ânion instável) */
const RAIO=[31,28,128,96,84,76,71,66,57,58,166,141,121,111,107,105,102,106,203,176,170,160,153,139,139,132,126,124,132,122,122,120,119,120,120,116,220,195,190,175,164,154,147,146,142,139,145,144,142,139,139,138,139,140];
const EI=[1312,2372,520,900,801,1086,1402,1314,1681,2081,496,738,578,787,1012,1000,1251,1521,419,590,633,659,651,653,717,762,760,737,745,906,579,762,947,941,1140,1351,403,549,600,640,652,684,702,710,720,804,731,868,558,709,834,869,1008,1170];
const AE=[-73,null,-60,null,-27,-122,null,-141,-328,null,-53,null,-42,-134,-72,-200,-349,null,-48,-2,-18,-8,-51,-65,null,-15,-64,-112,-118,null,-29,-119,-78,-195,-325,null,-47,-5,-30,-41,-86,-72,-53,-101,-110,-54,-126,null,-29,-107,-101,-190,-295,null];
function pos(z){ if(z===1) return [1,1]; if(z===2) return [1,18]; const P=[[3,10,2],[11,18,3],[19,36,4],[37,54,5]];
  for(const [a,b,p] of P){ if(z<a||z>b) continue; const i=z-a; if(p<=3) return [p,i<2?i+1:i+10]; return [p,i+1] } return null }
const ZEF=z=>{ const m=config(z), v=valencia(m); return z-(z-v.e) };

/* ===================== MATÉRIA: jogo de classificar ===================== */
const ITENS=[['O₂ (oxigênio)','ss'],['Fe (barra de ferro puro)','ss'],['Diamante (C)','ss'],['O₃ (ozônio)','ss'],['Ar (argônio da solda TIG)','ss'],
  ['H₂O (água pura)','sc'],['NaCl (sal)','sc'],['CO₂','sc'],['Fe₂O₃ (ferrugem)','sc'],['CaCO₃ (calcário)','sc'],
  ['Ar atmosférico','mo'],['Aço inox 304','mo'],['Água com sal dissolvido','mo'],['Gasolina','mo'],['Latão (Cu + Zn)','mo'],
  ['Água e óleo','me'],['Concreto','me'],['Granito','me'],['Areia com limalha de ferro','me'],['Óleo de corte com cavaco','me']];
const CXS=[['ss','🔵 Substância simples'],['sc','🟣 Substância composta'],['mo','🥤 Mistura homogênea'],['me','🥗 Mistura heterogênea']];
function sortW(){ const pool=g('m1Pool'), bins=g('m1Bins'), out=g('m1SortO'); if(!pool) return; let sel=null, ok=0, err=0, rest=[];
  const novo=()=>{ rest=ITENS.slice().sort(()=>Math.random()-.5).slice(0,10); ok=err=0; sel=null; draw(); bins.querySelectorAll('.m1-bin ul').forEach(u=>u.innerHTML=''); out.textContent='Escolha um item.' };
  bins.innerHTML=CXS.map(([k,t])=>'<button class="m1-bin" data-k="'+k+'"><b>'+t+'</b><ul></ul></button>').join('');
  const draw=()=>{ pool.innerHTML=rest.map((it,i)=>'<button class="m1-it'+(sel===i?' sel':'')+'" data-i="'+i+'">'+it[0]+'</button>').join('')||'<span class="m1-fim">🎉 Tudo separado! '+ok+' de primeira, '+err+' tentativa(s) errada(s).</span>';
    pool.querySelectorAll('.m1-it').forEach(b=>b.onclick=()=>{ sel=+b.dataset.i; draw(); out.textContent='Agora toque na caixa de “'+rest[sel][0]+'”.' }) };
  bins.querySelectorAll('.m1-bin').forEach(b=>b.onclick=()=>{ if(sel===null) return; const it=rest[sel];
    if(it[1]===b.dataset.k){ ok++; b.querySelector('ul').insertAdjacentHTML('beforeend','<li>'+it[0]+'</li>'); rest.splice(sel,1); sel=null; out.textContent='✓ Certo!'; b.classList.add('ok'); setTimeout(()=>b.classList.remove('ok'),400) }
    else { err++; out.textContent='✗ Não é essa caixa.'; b.classList.add('no'); setTimeout(()=>b.classList.remove('no'),400) } draw() });
  g('m1SortR').onclick=novo; novo() }
function symFlip(){ const box=g('m1Sym'); if(!box) return; const L=[['K','Potássio','kalium'],['B','Boro',''],['Cl','Cloro',''],['Ne','Neônio',''],['Mg','Magnésio',''],['Fe','Ferro','ferrum'],['Cu','Cobre','cuprum'],['Pb','Chumbo','plumbum'],['Na','Sódio','natrium'],['Cr','Cromo',''],['Ni','Níquel',''],['Mn','Manganês','']];
  box.innerHTML=L.map(([s,n,l])=>'<button class="m1-fc"><span class="a">'+n+'</span><span class="b"><b>'+s+'</b>'+(l?'<i>'+l+'</i>':'')+'</span></button>').join('');
  box.querySelectorAll('.m1-fc').forEach(b=>b.onclick=()=>b.classList.toggle('on')) }

/* ===================== MODELOS: linha do tempo ===================== */
const MOD=[['Demócrito','400 a.C.','<circle cx="30" cy="30" r="18" fill="#B9A27A"/>','Átomo = “indivisível” (a- negação + tomos, divisão). O mundo seria átomos e vazio. Ideia filosófica, sem experimento.','não testável'],
  ['Dalton','1803','<circle cx="30" cy="30" r="18" fill="#8D99A8"/><circle cx="24" cy="24" r="5" fill="#fff" opacity=".5"/>','Bola de bilhar: maciça, indivisível e indestrutível. Átomos do mesmo elemento são iguais; compostos são combinações em proporção fixa.','não explica a eletricidade nem por que os elementos são diferentes'],
  ['Thomson','1897–1904','<circle cx="30" cy="30" r="19" fill="#F2C2A0"/><g fill="#1E62C9"><circle cx="22" cy="22" r="3"/><circle cx="37" cy="25" r="3"/><circle cx="27" cy="36" r="3"/><circle cx="39" cy="38" r="3"/><circle cx="18" cy="32" r="3"/></g>','“Pudim de passas”: massa positiva com elétrons incrustados. Veio dos raios catódicos (partículas negativas com massa, q/m = 1,76 × 10⁸ C/g).','não explica a estabilidade nem os isótopos'],
  ['Rutherford','1911','<circle cx="30" cy="30" r="4" fill="#F26B1D"/><ellipse cx="30" cy="30" rx="22" ry="9" fill="none" stroke="#8D99A8"/><ellipse cx="30" cy="30" rx="22" ry="9" fill="none" stroke="#8D99A8" transform="rotate(60 30 30)"/><circle cx="52" cy="30" r="2.5" fill="#1E62C9"/>','Núcleo minúsculo, denso e positivo; elétrons numa eletrosfera enorme e quase vazia. Veio da folha de ouro.','pela física clássica o elétron giraria, emitiria luz e cairia no núcleo'],
  ['Bohr','1913','<circle cx="30" cy="30" r="4" fill="#F26B1D"/><g fill="none" stroke="#8D99A8"><circle cx="30" cy="30" r="10"/><circle cx="30" cy="30" r="17"/><circle cx="30" cy="30" r="24"/></g><circle cx="47" cy="30" r="2.5" fill="#1E62C9"/>','Órbitas circulares com energia quantizada. O elétron só emite ou absorve luz ao pular de órbita: explica as linhas do hidrogênio.','só funciona para o hidrogênio e ignora o elétron como onda'],
  ['Schrödinger','1926','<g fill="#1E62C9" opacity=".25"><circle cx="30" cy="30" r="20"/></g><g fill="#1E62C9" opacity=".35"><circle cx="30" cy="30" r="13"/></g><g fill="#1E62C9" opacity=".5"><circle cx="30" cy="30" r="7"/></g><circle cx="30" cy="30" r="3" fill="#F26B1D"/>','Modelo atual: o elétron é uma onda ψ. Não há trajetória; ψ² é a probabilidade de encontrá-lo. As regiões prováveis são os orbitais.','é o modelo usado hoje']];
function tlW(){ const box=g('m1Tl'), out=g('m1TlO'); if(!box) return; let i=MOD.length-1;
  const draw=()=>{ box.innerHTML=MOD.map((m,k)=>'<button class="'+(k===i?'sel':'')+'" data-k="'+k+'"><svg viewBox="0 0 60 60" aria-hidden="true">'+m[2]+'</svg><b>'+m[0]+'</b><small>'+m[1]+'</small></button>').join('');
    box.querySelectorAll('button').forEach(b=>b.onclick=()=>{ i=+b.dataset.k; draw() });
    const m=MOD[i]; out.innerHTML='<b>'+m[0]+' ('+m[1]+')</b><br>'+m[3]+'<br><span style="color:var(--bad,#C73A2C)">Limitação: '+m[4]+'</span>' };
  draw() }

/* ===================== RUTHERFORD ===================== */
function ruW(){ const cv=g('m1Ru'); if(!cv) return; const fit=tela(cv); let modo='r', P=[], cont={a:0,d:0,v:0}, flash=[];
  const nucY=H=>{ const ys=[]; for(let y=18;y<H-10;y+=36) ys.push(y); return ys };
  const desenha=()=>{ const T=fit(); if(!T) return; const {x,W,H:Hh}=T, fx=W*.55; x.fillStyle='#0E1F38'; x.fillRect(0,0,W,Hh);
    x.strokeStyle='rgba(255,255,255,.08)'; x.lineWidth=14; x.beginPath(); x.arc(fx,Hh/2,Math.min(W,Hh)*.62,0,7); x.stroke();
    x.fillStyle='#4A5A72'; x.fillRect(16,Hh/2-24,46,48); x.fillStyle='#F26B1D'; x.font='700 11px Inter,sans-serif'; x.textAlign='center'; x.fillText('fonte α',39,Hh/2+38);
    x.fillStyle='rgba(227,162,26,.18)'; x.fillRect(fx-7,0,14,Hh);
    nucY(Hh).forEach(y=>{ if(modo==='r'){ x.fillStyle='#E3A21A'; x.beginPath(); x.arc(fx,y,2.5,0,7); x.fill() } else { x.fillStyle='rgba(242,194,160,.45)'; x.beginPath(); x.arc(fx,y,17,0,7); x.fill(); x.fillStyle='#6FA3F2'; for(let k=0;k<4;k++){ x.beginPath(); x.arc(fx-8+k*5,y-6+(k%2)*10,1.6,0,7); x.fill() } } });
    flash.forEach(f=>{ x.fillStyle='rgba(120,255,160,'+Math.min(1,f.l/30)+')'; x.beginPath(); x.arc(f.x,f.y,2.2,0,7); x.fill() });
    P.forEach(p=>{ x.strokeStyle='rgba(242,107,29,.55)'; x.lineWidth=1; x.beginPath(); p.tr.forEach((q,k)=>k?x.lineTo(q[0],q[1]):x.moveTo(q[0],q[1])); x.stroke(); if(p.vivo){ x.fillStyle='#FF9A5C'; x.beginPath(); x.arc(p.x,p.y,2.4,0,7); x.fill() } });
    x.fillStyle='#fff'; x.textAlign='left'; x.font='700 12px Inter,sans-serif'; x.fillText(modo==='r'?'folha de ouro (núcleos ●)':'folha de ouro (pudins de Thomson)',fx+12,16) };
  const out=()=>{ const t=cont.a+cont.d+cont.v; g('m1RuO').innerHTML=t?'Atravessaram retas: <b>'+cont.a+'</b> ('+nf(cont.a/t*100,0)+'%) · desviaram: <b>'+cont.d+'</b> · <b style="color:#F26B1D">voltaram: '+cont.v+'</b>'+(modo==='t'&&!cont.v?'<br>No pudim de Thomson a carga positiva está espalhada: força fraca demais para fazer a alfa voltar.':modo==='r'&&cont.v?'<br>As que voltaram passaram muito perto de um núcleo: toda a carga positiva concentrada num ponto.':''):'Aperte Disparar.' };
  const anda=laco(cv,dt=>{ const T=fit(); if(!T) return false; const {W,H:Hh}=T, fx=W*.55, ys=nucY(Hh), v=420*dt*(RM?6:1);
    P.forEach(p=>{ if(!p.vivo) return; if(!p.passou&&p.x>=fx){ p.passou=true; let ny=ys.reduce((a,b)=>Math.abs(b-p.y)<Math.abs(a-p.y)?b:a), b=p.y-ny;
        let th; if(modo==='r'){ const D=.45; th=2*Math.atan(D/(2*Math.max(.05,Math.abs(b)))) } else th=(Math.random()*.03);
        th*=Math.sign(b)||1; const ang=th; p.vx=Math.cos(ang); p.vy=Math.sin(ang); const deg=Math.abs(th)*180/Math.PI; p.tipo=deg>90?'v':deg>8?'d':'a' }
      p.x+=p.vx*v; p.y+=p.vy*v; p.tr.push([p.x,p.y]); if(p.tr.length>60) p.tr.shift();
      if(p.x<0||p.x>W||p.y<0||p.y>Hh||Math.hypot(p.x-fx,p.y-Hh/2)>Math.min(W,Hh)*.62&&p.passou){ p.vivo=false; cont[p.tipo||'a']++; flash.push({x:p.x,y:p.y,l:240}); out() } });
    flash.forEach(f=>f.l--); flash=flash.filter(f=>f.l>0); P=P.filter(p=>p.vivo||p.tr.length&&Math.random()<.995); if(P.length>260) P=P.slice(-260);
    if(fila>0){ for(let k=0;k<3&&fila>0;k++,fila--) P.push({x:62,y:Hh/2+(Math.random()-.5)*Math.min(Hh*.9,240),vx:1,vy:0,vivo:true,tr:[],passou:false}); P.forEach(p=>{ if(p.tr.length===0) p.y=Hh*.05+Math.random()*Hh*.9 }) }
    desenha(); return fila>0||P.some(p=>p.vivo)||flash.length>0 });
  let fila=0;
  g('m1RuGo').onclick=()=>{ fila+=200; anda() }; g('m1RuZ').onclick=()=>{ P=[]; flash=[]; cont={a:0,d:0,v:0}; fila=0; out(); desenha() };
  g('m1RuM').querySelectorAll('button').forEach(b=>b.onclick=()=>{ modo=b.dataset.m; g('m1RuM').querySelectorAll('button').forEach(o=>o.classList.toggle('sel',o===b)); P=[]; flash=[]; cont={a:0,d:0,v:0}; fila=0; out(); desenha() });
  out(); return desenha }

/* ===================== MONTE UM ÁTOMO ===================== */
function atW(){ const cv=g('m1At'); if(!cv) return; const fit=tela(cv); const S={p:6,n:6,e:6}; let fase=0;
  const LIM={p:[1,54],n:[0,80],e:[0,60]};
  const st=g('m1AtSt'); st.innerHTML=[['p','Prótons','#E8644B'],['n','Nêutrons','#8D99A8'],['e','Elétrons','#1E62C9']].map(([k,t,c])=>'<div><span style="color:'+c+'">●</span> '+t+'<button data-k="'+k+'" data-d="-1" aria-label="menos">−</button><b id="m1At_'+k+'"></b><button data-k="'+k+'" data-d="1" aria-label="mais">+</button></div>').join('');
  st.querySelectorAll('button').forEach(b=>b.onclick=()=>{ const k=b.dataset.k; S[k]=Math.max(LIM[k][0],Math.min(LIM[k][1],S[k]+ +b.dataset.d)); upd() });
  const EXS=[['⁴⁰Ca',20,20,20],['⁸⁸Sr',38,50,38],['⁵⁹Co',27,32,27],['⁶⁰Co (gamagrafia)',27,33,27],['¹²C',6,6,6],['¹⁴C (datação)',6,8,6],['Na⁺',11,12,10],['Cl⁻',17,18,18],['Fe³⁺',26,30,23],['O²⁻',8,8,10]];
  g('m1AtEx').innerHTML=EXS.map((e,i)=>'<button data-i="'+i+'">'+e[0]+'</button>').join(''); g('m1AtEx').querySelectorAll('button').forEach(b=>b.onclick=()=>{ const e=EXS[+b.dataset.i]; S.p=e[1]; S.n=e[2]; S.e=e[3]; upd() });
  const draw=()=>{ const T=fit(); if(!T) return; const {x,W,H:Hh}=T, cx=W/2, cy=Hh/2; x.clearRect(0,0,W,Hh);
    const q=S.p-S.e, m=S.e>0?(q>=0?config(S.p,q):config(S.p,q)):{}, sh=camadas(m), R=Math.min(W,Hh)/2-14, nN=S.p+S.n, rn=Math.max(9,Math.sqrt(nN)*3.2);
    sh.forEach((c,i)=>{ const r=rn+12+(R-rn-12)*(i+1)/Math.max(sh.length,1); x.strokeStyle='rgba(30,98,201,.25)'; x.lineWidth=1; x.beginPath(); x.arc(cx,cy,r,0,7); x.stroke();
      for(let k=0;k<c;k++){ const a=k/c*Math.PI*2+fase*(1.2/(i+1)); x.fillStyle='#1E62C9'; x.beginPath(); x.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,3.6,0,7); x.fill() } });
    let rng=1; const rnd=()=>{ rng=(rng*16807)%2147483647; return rng/2147483647 };
    for(let k=0;k<nN;k++){ const rr=rn*Math.sqrt(rnd()), a=rnd()*7; const isP=k<S.p; x.fillStyle=isP?'#E8644B':'#8D99A8'; x.beginPath(); x.arc(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,4.2,0,7); x.fill(); x.strokeStyle='rgba(0,0,0,.25)'; x.stroke() } };
  const upd=()=>{ ['p','n','e'].forEach(k=>g('m1At_'+k).textContent=S[k]); const A=S.p+S.n, q=S.p-S.e, s=sym(S.p);
    const tipo=q===0?'átomo neutro':q>0?'cátion (perdeu '+q+' e⁻)':'ânion (ganhou '+(-q)+' e⁻)';
    g('m1AtN').innerHTML='<span class="m1-nucl"><sup>'+A+'</sup><sub>'+S.p+'</sub>'+s+(q?'<sup class="q">'+(Math.abs(q)>1?Math.abs(q):'')+(q>0?'+':'−')+'</sup>':'')+'</span>';
    g('m1AtO').innerHTML='<b>'+nome(S.p)+'</b> · '+tipo+'<br>Z = '+S.p+' · A = '+S.p+' + '+S.n+' = <b>'+A+'</b> · N = '+S.n+(S.e>0&&Math.abs(q)<=8?'<br>Configuração: '+condensada(config(S.p,q)):Math.abs(q)>8?'<br><span style="color:var(--bad,#C73A2C)">Carga muito alta: íon assim não existe na prática.</span>':''); draw() };
  const gira=laco(cv,dt=>{ fase+=dt*.8; draw(); return !RM });
  upd(); return ()=>{ draw(); gira() } }

/* ===================== ESPECTRO ===================== */
function spW(){ const cv=g('m1Sp'), R=g('m1SpR'); if(!cv) return; const fit=tela(cv);
  const lam=()=>Math.pow(10,-12+15*R.value/1000);
  const BANDS=[[-12,-11,'γ','#8E5AD8'],[-11,-8,'raios X','#6E86D8'],[-8,Math.log10(380e-9),'UV','#9A7CE0'],[Math.log10(380e-9),Math.log10(750e-9),'',''],[Math.log10(750e-9),-3,'infravermelho','#C2554A'],[-3,-1,'micro-ondas','#C98A3A'],[-1,3,'rádio','#7C8A5A']];
  const draw=()=>{ const T=fit(); if(!T) return; const {x,W,H:Hh}=T, L=lam(), lg=Math.log10(L); x.clearRect(0,0,W,Hh);
    const by=Hh-34, bh=22, X=v=>(v+12)/15*W;
    BANDS.forEach(([a,b,t,c])=>{ if(!t){ const gr=x.createLinearGradient(X(a),0,X(b),0); for(let k=0;k<=10;k++) gr.addColorStop(k/10,corLambda(380+37*k)||'#000'); x.fillStyle=gr } else x.fillStyle=c; x.fillRect(X(a),by,X(b)-X(a),bh);
      if(t&&X(b)-X(a)>34){ x.fillStyle='#fff'; x.font='700 10px Inter,sans-serif'; x.textAlign='center'; x.fillText(t,(X(a)+X(b))/2,by+15) } });
    x.fillStyle=css('--ink')||'#111'; x.beginPath(); x.moveTo(X(lg),by-2); x.lineTo(X(lg)-7,by-12); x.lineTo(X(lg)+7,by-12); x.fill();
    const nm=L*1e9, cor=corLambda(nm)||(L<380e-9?'#8E5AD8':'#C2554A'); const cyc=Math.max(.6,Math.min(40,(15-(lg+12))*2.6+.6)); x.strokeStyle=cor; x.lineWidth=2.4; x.beginPath();
    for(let i=0;i<=W;i+=2){ const y=(by-18)/2+Math.sin(i/W*cyc*Math.PI*2)*((by-30)/2); i?x.lineTo(i,y):x.moveTo(i,y) } x.stroke();
    const nu=C/L, E=H*nu; g('m1SpO').innerHTML='λ = <b>'+(L<1e-6?sci(nm)+' nm':L<1?sci(L)+' m':sci(L)+' m')+'</b> · ν = '+sci(nu)+' Hz · E do fóton = <b>'+sci(E)+' J</b> ('+sci(E/EV)+' eV)<br>Região: <b>'+regiao(L)+'</b>'+(corLambda(nm)?' · cor: <b style="color:'+cor+'">'+nomeCor(nm)+'</b>':'') };
  R.oninput=draw; const EXS=[['Gama do ⁶⁰Co',0.93e-12],['Raio X (radiografia)',0.1e-9],['UV-C germicida',254e-9],['Laser verde',532e-9],['Laser vermelho',650e-9],['Controle remoto',940e-9],['Micro-ondas (forno)',0.122],['Rádio FM',3]];
  g('m1SpEx').innerHTML=EXS.map((e,i)=>'<button data-i="'+i+'">'+e[0]+'</button>').join(''); g('m1SpEx').querySelectorAll('button').forEach(b=>b.onclick=()=>{ R.value=(Math.log10(EXS[+b.dataset.i][1])+12)/15*1000; draw() });
  return draw }

/* ===================== EFEITO FOTOELÉTRICO ===================== */
function feW(){ const cv=g('m1Fe'); if(!cv) return; const fit=tela(cv), L=g('m1FeL'), I=g('m1FeI'), PHI=2.28; let fot=[], ele=[], acc=0, sai=0, chegou=0;
  const info=()=>{ const nm=+L.value, E=1240/nm, ke=E-PHI; g('m1FeLv').textContent=nm+' nm ('+nomeCor(nm)+')'; g('m1FeIv').textContent=I.value;
    g('m1FeO').innerHTML='Energia de cada fóton: E = hc/λ = <b>'+nf(E,2)+' eV</b> · função trabalho do sódio φ = 2,28 eV (limiar 544 nm)<br>'+(ke>0?'<b style="color:var(--ok,#22884A)">Sai elétron!</b> E<sub>c</sub> = hν − φ = '+nf(ke,2)+' eV':'<b style="color:var(--bad,#C73A2C)">Nenhum elétron sai</b>: falta '+nf(-ke,2)+' eV por fóton. Aumentar a intensidade não resolve.')+'<br><small>Fótons que chegaram: '+chegou+' · elétrons ejetados: '+sai+'</small>' };
  const anda=laco(cv,dt=>{ const T=fit(); if(!T) return false; const {x,W,H:Hh}=T, nm=+L.value, E=1240/nm, ke=E-PHI, cor=corLambda(nm)||'#9A7CE0', px=W*.62;
    acc+=dt*(+I.value)*6; while(acc>1){ acc--; fot.push({t:0,y:Hh*.25+Math.random()*Hh*.5}) }
    x.clearRect(0,0,W,Hh); x.fillStyle=css('--paper')||'#eee'; x.fillRect(0,0,W,Hh);
    x.fillStyle='#4A5A72'; x.beginPath(); x.moveTo(20,Hh*.2); x.lineTo(70,Hh*.35); x.lineTo(70,Hh*.65); x.lineTo(20,Hh*.8); x.fill(); x.fillStyle=cor; x.globalAlpha=.25; x.beginPath(); x.moveTo(70,Hh*.35); x.lineTo(px,Hh*.15); x.lineTo(px,Hh*.85); x.lineTo(70,Hh*.65); x.fill(); x.globalAlpha=1;
    x.fillStyle='#A9B3BF'; x.fillRect(px,Hh*.1,16,Hh*.8); x.fillStyle=css('--ink2')||'#555'; x.font='700 11px Inter,sans-serif'; x.textAlign='center'; x.fillText('Na',px+8,Hh*.95);
    fot.forEach(f=>{ f.t+=dt*1.6; const fx=70+(px-70)*f.t; x.strokeStyle=cor; x.lineWidth=2; x.beginPath(); for(let k=0;k<14;k++){ const xx=fx-14+k; const yy=f.y+Math.sin(k*1.4)*3; k?x.lineTo(xx,yy):x.moveTo(xx,yy) } x.stroke();
      if(f.t>=1){ f.ok=1; chegou++; if(ke>0){ sai++; ele.push({x:px+18,y:f.y,vx:60+90*Math.sqrt(ke),vy:(Math.random()-.5)*60}) } } });
    fot=fot.filter(f=>!f.ok); ele.forEach(e=>{ e.x+=e.vx*dt; e.y+=e.vy*dt; x.fillStyle='#1E62C9'; x.beginPath(); x.arc(e.x,e.y,3.2,0,7); x.fill(); x.fillStyle='#fff'; x.font='700 7px Inter'; x.fillText('−',e.x,e.y+2.5) }); ele=ele.filter(e=>e.x<W+5);
    if(Math.random()<.15) info(); return !RM });
  L.oninput=I.oninput=()=>{ sai=chegou=0; info(); anda() }; info(); return anda }

/* ===================== LINHAS DO HIDROGÊNIO ===================== */
function linhas(){ const b=g('m1Lines'); if(!b) return; const L=[656,486,434,410], X=nm=>(nm-380)/(750-380)*100;
  b.innerHTML='<div class="m1-sp1"><span>Luz branca: espectro contínuo</span></div><div class="m1-sp2"><span>Hidrogênio: só 4 linhas visíveis</span>'+L.map(nm=>'<i style="left:'+X(nm)+'%;background:'+corLambda(nm)+'" title="'+nm+' nm"></i><em style="left:'+X(nm)+'%">'+nm+'</em>').join('')+'</div>' }

/* ===================== BOHR ===================== */
function boW(){ const cv=g('m1Bo'), ce=g('m1BoE'); if(!cv) return; const fit=tela(cv), fitE=tela(ce); let ni=6, nf2=2, n=1, ang=0, anim=null;
  const rr=k=>.12+.88*(k*k-1)/35, En=k=>-RH/(k*k);
  const chips=(id,get,set)=>{ const b=g(id); b.innerHTML=[1,2,3,4,5,6].map(k=>'<button data-n="'+k+'">'+k+'</button>').join(''); const up=()=>b.querySelectorAll('button').forEach(o=>o.classList.toggle('sel',+o.dataset.n===get())); b.querySelectorAll('button').forEach(o=>o.onclick=()=>{ set(+o.dataset.n); up(); info(); n=ni; drawE() }); up(); return up };
  const serie=k=>['Lyman (UV)','Balmer (visível)','Paschen (IV)','Brackett (IV)','Pfund (IV)','Humphreys'][k-1];
  const info=()=>{ if(ni===nf2){ g('m1BoO').innerHTML='Escolha órbitas diferentes.'; return } const dE=En(nf2)-En(ni), lam=H*C/Math.abs(dE), nm=lam*1e9, cor=corLambda(nm);
    g('m1BoO').innerHTML='E<sub>'+ni+'</sub> = '+sci(En(ni))+' J → E<sub>'+nf2+'</sub> = '+sci(En(nf2))+' J<br>ΔE = <b>'+sci(dE)+' J</b> → '+(dE<0?'<b>emite</b>':'<b>absorve</b>')+' um fóton<br>λ = hc/|ΔE| = <b>'+nf(nm,0)+' nm</b> · '+regiao(lam)+(cor?' · <b style="color:'+cor+'">'+nomeCor(nm)+'</b>':'')+(dE<0?'<br>Série de '+serie(nf2):'') };
  const draw=(ph)=>{ const T=fit(); if(!T) return; const {x,W,H:Hh}=T, cx=W/2, cy=Hh/2, R=Math.min(W,Hh)/2-10; x.clearRect(0,0,W,Hh);
    for(let k=1;k<=6;k++){ x.strokeStyle=k===ni||k===nf2?'rgba(242,107,29,.7)':'rgba(30,98,201,.25)'; x.lineWidth=k===ni||k===nf2?1.6:1; x.beginPath(); x.arc(cx,cy,R*rr(k),0,7); x.stroke(); x.fillStyle=css('--ink2')||'#555'; x.font='600 10px Inter,sans-serif'; x.textAlign='left'; x.fillText('n='+k,cx+R*rr(k)*.707+2,cy-R*rr(k)*.707-2) }
    x.fillStyle='#E8644B'; x.beginPath(); x.arc(cx,cy,5,0,7); x.fill();
    const r=ph?R*(rr(ni)+(rr(nf2)-rr(ni))*ph.k):R*rr(n); const ex=cx+Math.cos(ang)*r, ey=cy+Math.sin(ang)*r; x.fillStyle='#1E62C9'; x.beginPath(); x.arc(ex,ey,5,0,7); x.fill();
    if(ph&&ph.f!=null){ const nm=H*C/Math.abs(En(nf2)-En(ni))*1e9, cor=corLambda(nm)||'#9A7CE0', emite=nf2<ni; const d=emite?ph.f*R*1.2:(1-ph.f)*R*1.2, a=ang+.6;
      x.strokeStyle=cor; x.lineWidth=2.5; x.beginPath(); for(let k=0;k<30;k++){ const s=d+k*1.6, yy=Math.sin(k*.9)*4; const px=ex+Math.cos(a)*s-Math.sin(a)*yy, py=ey+Math.sin(a)*s+Math.cos(a)*yy; k?x.lineTo(px,py):x.moveTo(px,py) } x.stroke() }
    x.fillStyle=css('--ink2')||'#555'; x.textAlign='center'; x.font='600 10px Inter,sans-serif'; x.fillText('raios fora de escala (r ∝ n²)',cx,Hh-4) };
  const drawE=(k)=>{ const T=fitE(); if(!T) return; const {x,W,H:Hh}=T, y=E=>14+(Hh-40)*(E/(-RH)); x.clearRect(0,0,W,Hh);
    x.fillStyle=css('--ink2')||'#555'; x.font='600 10px Inter,sans-serif'; x.textAlign='left'; x.fillText('E = 0 (livre)',4,10); x.setLineDash([3,3]); x.strokeStyle='rgba(0,0,0,.2)'; x.beginPath(); x.moveTo(0,14); x.lineTo(W,14); x.stroke(); x.setLineDash([]);
    for(let q=1;q<=6;q++){ const yy=y(En(q)); x.strokeStyle=q===ni||q===nf2?'#F26B1D':css('--ink')||'#222'; x.lineWidth=q===ni||q===nf2?2.2:1.2; x.beginPath(); x.moveTo(W*.18,yy); x.lineTo(W*.95,yy); x.stroke(); if(q<=3||q===6){ x.fillStyle=css('--ink2')||'#555'; x.fillText('n='+q,2,yy+3) } }
    x.fillText(sci(En(1),2)+' J',W*.4,y(En(1))-4);
    if(ni!==nf2){ const nm=H*C/Math.abs(En(nf2)-En(ni))*1e9; seta(x,W*.58,y(En(ni)),W*.58,y(En(nf2)),corLambda(nm)||'#F26B1D') } };
  function seta(x,x0,y0,x1,y1,c){ x.strokeStyle=c; x.fillStyle=c; x.lineWidth=3; x.beginPath(); x.moveTo(x0,y0); x.lineTo(x1,y1); x.stroke(); const s=y1>y0?1:-1; x.beginPath(); x.moveTo(x1,y1); x.lineTo(x1-6,y1-9*s); x.lineTo(x1+6,y1-9*s); x.fill() }
  const upI=chips('m1BoI',()=>ni,v=>ni=v), upF=chips('m1BoF',()=>nf2,v=>nf2=v);
  const gira=laco(cv,(dt,t)=>{ ang+=dt*(2.2/Math.max(1,(anim?ni:n))); if(anim){ anim.t+=dt; const k=Math.min(1,anim.t/.6); const emite=nf2<ni; const ph=emite?{k,f:k>=1?Math.min(1,(anim.t-.6)/.9):null}:{k:anim.t<.9?0:Math.min(1,(anim.t-.9)/.6),f:anim.t<.9?anim.t/.9:null}; draw(ph); if(anim.t>1.6){ anim=null; n=nf2; drawE() } } else draw(); return !RM||!!anim });
  g('m1BoGo').onclick=()=>{ if(ni===nf2) return; n=ni; anim={t:0}; gira() };
  info(); return ()=>{ draw(); drawE(); gira() } }

/* ===================== ORBITAIS EM 3D ===================== */
function laguerre(k,a,x){ if(k===0) return 1; let L0=1, L1=1+a-x; for(let i=1;i<k;i++){ const L2=((2*i+1+a-x)*L1-(i+a)*L0)/(i+1); L0=L1; L1=L2 } return L1 }
const ANG={s:()=>1,pz:(x,y,z,r)=>z/r,px:(x,y,z,r)=>x/r,py:(x,y,z,r)=>y/r,dz2:(x,y,z,r)=>(3*z*z-r*r)/(r*r),dxy:(x,y,z,r)=>x*y/(r*r),dxz:(x,y,z,r)=>x*z/(r*r),dx2y2:(x,y,z,r)=>(x*x-y*y)/(r*r),fz3:(x,y,z,r)=>z*(5*z*z-3*r*r)/(r*r*r),fxyz:(x,y,z,r)=>x*y*z/(r*r*r)};
const ORBS=[['1s',1,0,'s'],['2s',2,0,'s'],['2p_z',2,1,'pz'],['2p (os 3)',2,1,'p3'],['3s',3,0,'s'],['3p_z',3,1,'pz'],['3d_z²',3,2,'dz2'],['3d_xy',3,2,'dxy'],['3d_x²−y²',3,2,'dx2y2'],['4f_z³',4,3,'fz3'],['4f_xyz',4,3,'fxyz']];
const ORBINFO={'1s':'esfera, nenhum nó: o orbital do hidrogênio no estado fundamental','2s':'esfera com 1 nó radial (uma casca vazia por dentro): n − l − 1 = 1','2p_z':'dois lóbulos ao longo de z, com um plano nodal (xy) no núcleo','2p (os 3)':'p_x, p_y e p_z juntos: 3 orientações = m_l −1, 0, +1. Juntos formam uma distribuição esférica','3s':'esfera com 2 nós radiais','3p_z':'lóbulos p com 1 nó radial extra','3d_z²':'dois lóbulos em z e um "anel" (donut) no plano xy','3d_xy':'quatro lóbulos entre os eixos x e y','3d_x²−y²':'quatro lóbulos sobre os eixos x e y','4f_z³':'orbital f: formatos ainda mais complexos (7 orientações)','4f_xyz':'oito lóbulos, um em cada octante'};
const CACHE={};
function nuvem(n,l,a,N){ const key=n+a+N; if(CACHE[key]) return CACHE[key]; const R=n*n*2.6+4, f=ANG[a], psi=(x,y,z)=>{ const r=Math.hypot(x,y,z)||1e-6, rho=2*r/n; return Math.pow(rho,l)*Math.exp(-rho/2)*laguerre(n-l-1,2*l+1,rho)*f(x,y,z,r) };
  let mx=0; for(let i=0;i<30000;i++){ const x=(Math.random()*2-1)*R,y=(Math.random()*2-1)*R,z=(Math.random()*2-1)*R; const p=psi(x,y,z); mx=Math.max(mx,p*p) }
  const pts=[]; let t=0; while(pts.length<N&&t<1.6e6){ t++; const x=(Math.random()*2-1)*R,y=(Math.random()*2-1)*R,z=(Math.random()*2-1)*R; const p=psi(x,y,z); if(Math.random()*mx*.55<p*p) pts.push([x/R,y/R,z/R,p>0?1:0]) }
  return CACHE[key]=pts }
function orbW(){ const cv=g('m1Orb'); if(!cv) return; const fit=tela(cv); let sel=0, yaw=.6, pit=-.35, drag=null, pts=[], auto=true;
  const P=g('m1OrbP'); P.innerHTML=ORBS.map((o,i)=>'<button data-i="'+i+'">'+o[0].replace('_','<sub>').replace(/$/,o[0].includes('_')?'</sub>':'')+'</button>').join('');
  const pick=i=>{ sel=i; const o=ORBS[i]; P.querySelectorAll('button').forEach((b,k)=>b.classList.toggle('sel',k===i));
    if(o[3]==='p3'){ pts=[...nuvem(2,1,'px',1300).map(p=>[...p.slice(0,3),2]),...nuvem(2,1,'py',1300).map(p=>[...p.slice(0,3),3]),...nuvem(2,1,'pz',1300).map(p=>[...p.slice(0,3),4])] } else pts=nuvem(o[1],o[2],o[3],3800);
    g('m1OrbO').innerHTML='<b>'+o[0].replace('_',' ')+'</b> · n = '+o[1]+', l = '+o[2]+' ('+LL[o[2]]+') · '+ORBINFO[o[0]]+'<br><small>Cores = sinal da função de onda (fase + e −), importante quando os orbitais se juntam nas ligações.</small>'; draw() };
  const COR=['#1E62C9','#F26B1D','#E8644B','#22884A','#1E62C9'];
  const draw=()=>{ const T=fit(); if(!T) return; const {x,W,H:Hh}=T, s=Math.min(W,Hh)*.48, cx=W/2, cy=Hh/2; x.clearRect(0,0,W,Hh);
    const cyw=Math.cos(yaw),syw=Math.sin(yaw),cp=Math.cos(pit),sp=Math.sin(pit);
    const pr=(X,Y,Z)=>{ const x1=X*cyw+Y*syw, y1=-X*syw+Y*cyw; const y2=y1*cp-Z*sp, z2=y1*sp+Z*cp; return [cx+x1*s,cy-z2*s,y2] };
    [['x',1,0,0],['y',0,1,0],['z',0,0,1]].forEach(([t,a,b,c])=>{ const p0=pr(-a,-b,-c), p1=pr(a,b,c); x.strokeStyle='rgba(120,130,150,.45)'; x.lineWidth=1; x.beginPath(); x.moveTo(p0[0],p0[1]); x.lineTo(p1[0],p1[1]); x.stroke(); x.fillStyle=css('--ink2')||'#666'; x.font='700 12px Inter,sans-serif'; x.fillText(t,p1[0]+4,p1[1]) });
    for(const p of pts){ const q=pr(p[0],p[1],p[2]); x.fillStyle=COR[p[3]]; x.globalAlpha=.32+.4*(q[2]+1)/2; x.fillRect(q[0]-1.2,q[1]-1.2,2.4,2.4) } x.globalAlpha=1;
    x.fillStyle='#E8644B'; x.beginPath(); x.arc(cx,cy,3,0,7); x.fill() };
  cv.onpointerdown=e=>{ drag=[e.clientX,e.clientY]; auto=false; cv.setPointerCapture(e.pointerId) };
  cv.onpointermove=e=>{ if(!drag) return; yaw+=(e.clientX-drag[0])*.01; pit=Math.max(-1.5,Math.min(1.5,pit+(e.clientY-drag[1])*.01)); drag=[e.clientX,e.clientY]; draw() };
  cv.onpointerup=cv.onpointercancel=()=>{ drag=null };
  P.querySelectorAll('button').forEach(b=>b.onclick=()=>pick(+b.dataset.i));
  const gira=laco(cv,dt=>{ if(auto) yaw+=dt*.35; draw(); return auto&&!RM });
  pick(0); return ()=>{ draw(); gira() } }

/* ===================== VERIFICADOR DE NÚMEROS QUÂNTICOS ===================== */
function qnW(){ const b=g('m1Qn'); if(!b) return; const S={n:4,l:2,ml:-1,ms:.5};
  const LIM={n:[1,7],l:[0,6],ml:[-6,6]};
  b.innerHTML=[['n','n'],['l','l'],['ml','m<sub>l</sub>']].map(([k,t])=>'<div><small>'+t+'</small><button data-k="'+k+'" data-d="-1">−</button><b id="m1Qn_'+k+'"></b><button data-k="'+k+'" data-d="1">+</button></div>').join('')+'<div><small>m<sub>s</sub></small><button id="m1QnS" class="m1-spin"></button></div>';
  b.querySelectorAll('button[data-k]').forEach(o=>o.onclick=()=>{ const k=o.dataset.k; S[k]=Math.max(LIM[k][0],Math.min(LIM[k][1],S[k]+ +o.dataset.d)); upd() });
  g('m1QnS').onclick=()=>{ S.ms=-S.ms; upd() };
  const upd=()=>{ ['n','l','ml'].forEach(k=>g('m1Qn_'+k).textContent=(k==='ml'&&S[k]>0?'+':'')+S[k]); g('m1QnS').textContent=(S.ms>0?'+½ ↑':'−½ ↓');
    const err=[]; if(S.l>S.n-1) err.push('l = '+S.l+' não pode: com n = '+S.n+' o l vai só até '+(S.n-1)+' (n − 1).'); if(Math.abs(S.ml)>S.l) err.push('m<sub>l</sub> = '+S.ml+' não pode: com l = '+S.l+' o m<sub>l</sub> vai de −'+S.l+' a +'+S.l+'.');
    g('m1QnO').innerHTML=err.length?'<b style="color:var(--bad,#C73A2C)">✗ Proibido</b><br>'+err.join('<br>'):'<b style="color:var(--ok,#22884A)">✓ Permitido</b>: é um elétron no subnível <b>'+S.n+(LL[S.l]||'?')+'</b>'+(S.l<=3?' (um dos '+(2*S.l+1)+' orbitais '+LL[S.l]+')':'')+'.' };
  const EXS=[['{4, 2, −1, +½}',4,2,-1,.5],['{5, 0, −1, +½}',5,0,-1,.5],['{4, 4, −1, +½}',4,4,-1,.5],['5s: {5, 0, 0, +½}',5,0,0,.5],['{2, 1, +1, −½}',2,1,1,-.5],['{3, 3, 0, +½}',3,3,0,.5]];
  g('m1QnEx').innerHTML=EXS.map((e,i)=>'<button data-i="'+i+'">'+e[0]+'</button>').join(''); g('m1QnEx').querySelectorAll('button').forEach(o=>o.onclick=()=>{ const e=EXS[+o.dataset.i]; S.n=e[1]; S.l=e[2]; S.ml=e[3]; S.ms=e[4]; upd() });
  upd() }

/* ===================== DIAGRAMA DE PAULING ===================== */
function pauW(){ const sv=g('m1Pau'); if(!sv) return; const POS={}; let h='';
  for(let n=1;n<=7;n++) for(let l=0;l<4&&l<n;l++){ if(n===7&&l>1||n===6&&l>2||n===5&&l>3) continue; const x=30+l*72, y=24+(n-1)*40; POS[n+LL[l]]=[x,y]; h+='<g class="m1-ps" data-k="'+n+LL[l]+'"><rect x="'+(x-22)+'" y="'+(y-14)+'" width="44" height="26" rx="8"/><text x="'+x+'" y="'+(y+4)+'" text-anchor="middle">'+n+LL[l]+'</text></g>' }
  let d=''; for(let s=1;s<=8;s++){ const ks=ORDF.map(nome2).filter(k=>+k[0]+LL.indexOf(k[1])===s); if(ks.length<1) continue; const a=POS[ks[0]], b=POS[ks[ks.length-1]]; if(ks.length>1) d+='<line x1="'+(a[0]+16)+'" y1="'+(a[1]-12)+'" x2="'+(b[0]-16)+'" y2="'+(b[1]+12)+'" class="m1-pl" marker-end="url(#m1ar)"/>' }
  sv.innerHTML='<defs><marker id="m1ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#F26B1D"/></marker></defs>'+d+h;
  const ord=g('m1Ord'); ord.innerHTML=ORDF.map(nome2).map(k=>'<span data-k="'+k+'">'+k+'<small>'+cap(LL.indexOf(k[1]))+'</small></span>').join('');
  let tm=0; g('m1PauGo').onclick=()=>{ clearTimeout(tm); const ks=ORDF.map(nome2); sv.querySelectorAll('.m1-ps').forEach(e=>e.classList.remove('on')); ord.querySelectorAll('span').forEach(e=>e.classList.remove('on')); let i=0;
    const st=()=>{ const k=ks[i]; sv.querySelector('[data-k="'+k+'"]')?.classList.add('on'); ord.querySelector('[data-k="'+k+'"]')?.classList.add('on'); if(++i<ks.length) tm=setTimeout(st,RM?0:260) }; st() } }

/* ===================== MONTADOR DE CONFIGURAÇÃO ===================== */
function cfgW(){ const Z=g('m1CfZ'); if(!Z) return; let q=0, tm=0; const cv=g('m1CfC'), fit=tela(cv);
  const Q=g('m1CfQ'); Q.innerHTML='<div><button data-d="-1">−</button><b id="m1CfQv"></b><button data-d="1">+</button></div>'; Q.querySelectorAll('button').forEach(b=>b.onclick=()=>{ q=Math.max(-3,Math.min(4,q+ +b.dataset.d)); upd(true) });
  const EXS=[['C',6,0],['N',7,0],['Fe',26,0],['Fe³⁺',26,3],['Cr',24,0],['Cr³⁺',24,3],['Cu',29,0],['Br',35,0],['I',53,0],['Mg²⁺',12,2],['P³⁻',15,-3],['Cl⁻',17,-1],['Ar',18,0],['Au',79,0]];
  g('m1CfEx').innerHTML=EXS.map((e,i)=>'<button data-i="'+i+'">'+e[0]+'</button>').join(''); g('m1CfEx').querySelectorAll('button').forEach(b=>b.onclick=()=>{ const e=EXS[+b.dataset.i]; Z.value=e[1]; q=e[2]; upd(true) });
  const caixas=(m,lim)=>{ let left=lim, h=''; for(const k of ordem(m)){ const l=LL.indexOf(k[1]), o=2*l+1, e=m[k]; let use=Math.min(e,Math.max(0,left)); left-=e; const box=Array(o).fill(0);
      for(let i=0;i<use;i++){ box[i<o?i:i-o]+= 1 } h+='<div class="m1-sub"><div class="m1-bx">'+box.map((c,i)=>'<span>'+(c>=1?'<i class="u">↑</i>':'')+(c>=2?'<i class="d">↓</i>':'')+'</span>').join('')+'</div><small>'+k+sup(e)+'</small></div>' } return h };
  const draw=m=>{ const T=fit(); if(!T) return; const {x,W,H:Hh}=T, sh=camadas(m), cx=W/2, cy=Hh/2, R=Hh/2-8; x.clearRect(0,0,W,Hh); const L='KLMNOPQ';
    sh.forEach((c,i)=>{ const r=14+(R-14)*(i+1)/sh.length; x.strokeStyle='rgba(30,98,201,.3)'; x.beginPath(); x.ellipse(cx,cy,r*1.9,r,0,0,7); x.stroke(); for(let k=0;k<c;k++){ const a=k/c*7-1.57; x.fillStyle=i===sh.length-1?'#F26B1D':'#1E62C9'; x.beginPath(); x.arc(cx+Math.cos(a)*r*1.9,cy+Math.sin(a)*r,3,0,7); x.fill() }
      x.fillStyle=css('--ink2')||'#555'; x.font='700 10px Inter,sans-serif'; x.fillText(L[i]+' '+c,cx+r*1.9+3,cy+3) });
    x.fillStyle='#E8644B'; x.beginPath(); x.arc(cx,cy,9,0,7); x.fill(); x.fillStyle='#fff'; x.textAlign='center'; x.font='700 9px Inter,sans-serif'; x.fillText(sym(+Z.value),cx,cy+3); x.textAlign='left' };
  const upd=(anim)=>{ clearTimeout(tm); const z=+Z.value; const qq=Math.min(q,z); const m=config(z,qq), e=z-qq; g('m1CfZv').textContent=z+' · '+nome(z)+' ('+sym(z)+')'; g('m1CfQv').textContent=q===0?'neutro':(q>0?'+':'−')+Math.abs(q);
    const u=desemp(m), v=valencia(m), exc=!qq&&EXC[z];
    g('m1CfO').innerHTML='<b>'+sym(z)+(q?sup((Math.abs(q)>1?Math.abs(q):'')+(q>0?'+':'-')):'')+'</b> · '+e+' elétrons<br>Completa: <b>'+txtCfg(m)+'</b><br>Condensada: <b>'+condensada(m)+'</b><br>Camada de valência: n = '+v.n+' com <b>'+v.e+' e⁻</b> · desemparelhados: <b>'+u+'</b> → '+(u?'<b>paramagnético</b>':'<b>diamagnético</b>')+(exc?'<br><span style="color:var(--c1)">⚠ Exceção: o esperado seria '+condensada(preenche(z))+'. Subnível d meio cheio/cheio é mais estável.</span>':'');
    const B=g('m1CfB'); if(anim&&!RM&&e<=40){ let k=0; const st=()=>{ k=Math.min(e,k+1); B.innerHTML=caixas(m,k); if(k<e) tm=setTimeout(st,Math.max(25,700/e)) }; st() } else B.innerHTML=caixas(m,e); draw(m) };
  Z.oninput=()=>upd(false); upd(false); return ()=>upd(false) }

/* ===================== MAPA DE CALOR ===================== */
function ptW(){ const box=g('m1Pt'); if(!box) return; let prop='raio', A=null, B=null;
  const PROPS={raio:['Raio atômico','pm',z=>RAIO[z-1],['#FFE7C2','#F26B1D']],ei:['Energia de ionização','kJ/mol',z=>EI[z-1],['#DCE8FA','#1E62C9']],ae:['Afinidade eletrônica','kJ/mol',z=>AE[z-1],['#E4F4E8','#22884A']],zef:['Z efetiva (simples)','',z=>ZEF(z),['#F1E6FA','#6447BE']],met:['Metal × ametal','',z=>z,null]};
  g('m1PrP').innerHTML=Object.entries(PROPS).map(([k,v])=>'<button data-k="'+k+'">'+v[0]+'</button>').join('');
  g('m1PrP').querySelectorAll('button').forEach(b=>b.onclick=()=>{ prop=b.dataset.k; draw() });
  const mix=(a,b,t)=>{ const h=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)); const A1=h(a),B1=h(b); return 'rgb('+A1.map((v,i)=>Math.round(v+(B1[i]-v)*t)).join(',')+')' };
  const CATC={ak:'#E8644B',ae:'#E89A3C',tr:'#D4B23A',pt:'#8FB45A',md:'#3FA68A',nm:'#4F8FD8',ha:'#7C6AD8',ng:'#B05AC8',la:'#C46AA0',ac:'#A06A5A'};
  const metal=z=>{ const c=(ELS[z-1]||{}).cat; return ['ak','ae','tr','pt','la','ac'].includes(c)?'metal':c==='md'?'semimetal':c==='ng'?'gás nobre':'ametal' };
  const draw=()=>{ g('m1PrP').querySelectorAll('button').forEach(b=>b.classList.toggle('sel',b.dataset.k===prop)); const P=PROPS[prop], vals=[]; for(let z=1;z<=54;z++){ const v=P[2](z); if(v!=null) vals.push(prop==='ae'?-v:v) } const mn=Math.min(...vals), mx=Math.max(...vals);
    let h=''; for(let z=1;z<=54;z++){ const [p,c]=pos(z), v=P[2](z); let bg;
      if(prop==='met') bg=CATC[(ELS[z-1]||{}).cat]||'#ccc'; else bg=v==null?'repeating-linear-gradient(45deg,#ddd 0 4px,#f4f4f4 4px 8px)':mix(P[3][0],P[3][1],((prop==='ae'?-v:v)-mn)/(mx-mn||1));
      h+='<button style="grid-row:'+p+';grid-column:'+c+';background:'+bg+'" class="'+(z===A||z===B?'sel':'')+'" data-z="'+z+'"><b>'+sym(z)+'</b><small>'+(prop==='met'?z:v==null?'—':nf(v,prop==='zef'?0:0))+'</small></button>' }
    box.innerHTML=h; box.querySelectorAll('button').forEach(b=>b.onclick=()=>{ const z=+b.dataset.z; if(A&&!B&&z!==A) B=z; else { A=z; B=null } draw() });
    g('m1Leg').innerHTML=prop==='met'?'<span>vermelho/laranja/amarelo/verde-claro: metais · verde-água: semimetais · azul: ametais · roxo: halogênios · lilás: gases nobres</span>':'<span>'+P[0]+(P[1]?' ('+P[1]+')':'')+': claro = menor · escuro = '+(prop==='ae'?'mais negativa':'maior')+(prop==='ae'?' · hachurado = ânion instável (ΔE > 0)':'')+'</span>';
    g('m1PrO').innerHTML=cmp() };
  const cmp=()=>{ if(!A) return 'Toque num elemento (e depois em outro para comparar).'; const P=PROPS[prop], f=z=>{ const v=P[2](z); return v==null?'ânion instável':nf(v,0)+' '+P[1] };
    const d=z=>'<b>'+nome(z)+' ('+sym(z)+')</b>: Z = '+z+' · '+condensada(config(z))+' · raio '+RAIO[z-1]+' pm · EI '+EI[z-1]+' kJ/mol · AE '+(AE[z-1]==null?'instável':AE[z-1]+' kJ/mol')+' · '+metal(z);
    if(!B) return d(A); const [pa,ca]=pos(A), [pb,cb]=pos(B); let why='';
    if(prop==='raio'){ const M=RAIO[A-1]>RAIO[B-1]?A:B, m=M===A?B:A; why=sym(M)+' é maior. '+(pos(M)[0]!==pos(m)[0]?'Está num período mais abaixo: tem mais camadas (n maior).':'Mesmo período: '+sym(M)+' está mais à esquerda, menos prótons puxando a mesma camada (Z<sub>ef</sub> menor).') }
    else if(prop==='ei'){ const M=EI[A-1]>EI[B-1]?A:B, m=M===A?B:A; why='É mais difícil tirar um elétron do '+sym(M)+'. '+(pos(M)[0]!==pos(m)[0]&&ca===cb?'Mesmo grupo: ele está mais acima, o elétron fica mais perto do núcleo.':pos(M)[0]===pos(m)[0]?'Mesmo período: Z<sub>ef</sub> maior segura mais o elétron'+((M===4&&m===5)||(M===7&&m===8)?' (aqui é uma das irregularidades: subnível cheio/meio cheio é mais estável).':'.'):'Combine as duas tendências: cresce para cima e para a direita.') }
    else if(prop==='ae'){ const a=AE[A-1], b=AE[B-1]; if(a==null&&b==null) why='Nenhum dos dois forma ânion estável.'; else { const M=(a??1)<(b??1)?A:B; why=sym(M)+' libera mais energia ao ganhar o elétron (afinidade mais negativa): '+(ca!==cb?'está mais perto dos halogênios.':'no mesmo grupo a diferença é pequena; o menor costuma atrair mais.') } }
    else if(prop==='zef'){ why='Z<sub>ef</sub> ≈ Z − elétrons internos: '+sym(A)+' = '+ZEF(A)+' · '+sym(B)+' = '+ZEF(B)+'. Cresce no período; no grupo quase não muda.' }
    else why=sym(A)+': '+metal(A)+' · '+sym(B)+': '+metal(B)+'. Caráter metálico cresce ↓ e ←.';
    return d(A)+'<br>'+d(B)+'<br><b>'+P[0]+'</b>: '+sym(A)+' '+f(A)+' × '+sym(B)+' '+f(B)+'<br>👉 '+why };
  draw() }

/* ===================== SÉRIES DE ÍONS ===================== */
function isoW(){ const cv=g('m1Iso'); if(!cv) return; const fit=tela(cv); let s=0;
  const SER=[['Isoeletrônica de 10 e⁻',[['O²⁻',8,10,140],['F⁻',9,10,133],['Na⁺',11,10,102],['Mg²⁺',12,10,72],['Al³⁺',13,10,54]],'Todos com 10 elétrons (como o Ne). Mais prótons → nuvem mais puxada → menor.'],
    ['Isoeletrônica de 18 e⁻',[['S²⁻',16,18,184],['Cl⁻',17,18,181],['K⁺',19,18,138],['Ca²⁺',20,18,100]],'Mesma ideia com 18 elétrons (como o Ar).'],
    ['Ferro e seus íons',[['Fe',26,26,126],['Fe²⁺',26,24,78],['Fe³⁺',26,23,65]],'Mesmos 26 prótons, menos elétrons: encolhe (ED1 questão 16a).'],
    ['Grupo 2 (M²⁺)',[['Be²⁺',4,2,45],['Mg²⁺',12,10,72],['Ca²⁺',20,18,100],['Sr²⁺',38,36,118]],'Mesma carga, cada vez mais camadas: cresce descendo (ED1 questão 16c).']];
  g('m1IsoP').innerHTML=SER.map((v,i)=>'<button data-i="'+i+'">'+v[0]+'</button>').join(''); g('m1IsoP').querySelectorAll('button').forEach(b=>b.onclick=()=>{ s=+b.dataset.i; draw() });
  const draw=()=>{ g('m1IsoP').querySelectorAll('button').forEach((b,i)=>b.classList.toggle('sel',i===s)); const T=fit(); if(!T) return; const {x,W,H:Hh}=T, L=SER[s][1], mx=Math.max(...L.map(e=>e[3])), sc=(Hh/2-18)/mx, w=W/L.length;
    x.clearRect(0,0,W,Hh); L.forEach(([t,p,e,r],i)=>{ const cx=w*(i+.5), cy=Hh/2-6, rr=r*sc; const gr=x.createRadialGradient(cx-rr*.3,cy-rr*.3,rr*.1,cx,cy,rr); gr.addColorStop(0,'#fff'); gr.addColorStop(1,p>e?'#F26B1D':p<e?'#1E62C9':'#8D99A8'); x.fillStyle=gr; x.beginPath(); x.arc(cx,cy,rr,0,7); x.fill();
      x.fillStyle=css('--ink')||'#222'; x.textAlign='center'; x.font='800 13px Inter,sans-serif'; x.fillText(t,cx,cy+4); x.font='600 10px Inter,sans-serif'; x.fillStyle=css('--ink2')||'#555'; x.fillText(p+' p⁺ · '+e+' e⁻ · '+r+' pm',cx,Hh-6) });
    g('m1IsoO').innerHTML=SER[s][2]+' <small>(raios iônicos em pm; laranja = cátion, azul = ânion, cinza = átomo)</small>' };
  return draw }
function ieW(){ const cv=g('m1Ie'); if(!cv) return; const fit=tela(cv); const V=[578,1817,2745,11577];
  return ()=>{ const T=fit(); if(!T) return; const {x,W,H:Hh}=T, mx=12000, bw=W/6; x.clearRect(0,0,W,Hh);
    V.forEach((v,i)=>{ const h=(Hh-40)*v/mx, X=bw*(i+1); x.fillStyle=i<3?'#1E62C9':'#C73A2C'; x.fillRect(X-bw*.3,Hh-22-h,bw*.6,h); x.fillStyle=css('--ink')||'#222'; x.textAlign='center'; x.font='700 12px Inter,sans-serif'; x.fillText(nf(v,0),X,Hh-26-h); x.font='600 11px Inter,sans-serif'; x.fillText('I'+'₁₂₃₄'[i],X,Hh-6) });
    x.fillStyle='#C73A2C'; x.textAlign='left'; x.font='700 12px Inter,sans-serif'; x.fillText('salto! o 4º elétron sai do cerne [Ne]',bw*1.6,26) } }

/* ===================== ÍNDICE DO ED1 ===================== */
const EDQ=[[1,'materia','Definições: matéria, substâncias, misturas, átomo, elemento'],[2,'materia','Símbolos químicos'],[3,'modelos','Evidências de cada modelo atômico'],[4,'modelos','Partículas subatômicas'],[5,'modelos','Tabela de prótons, nêutrons, elétrons e A'],[6,'luz','Energia quantizada e fóton de 526 nm'],[7,'bohr','Transições do hidrogênio'],[8,'luz','Energia do laser e nº de fótons'],[9,'quanticos','Números quânticos proibidos'],[10,'quanticos','Subníveis e orbitais de n = 4'],[11,'config','Fundamental ou excitado'],[12,'config','Configurações de átomos e íons'],[13,'config','Que elemento tem esta configuração'],[14,'config','Quadrículas e magnetismo'],[15,'periodicas','Ordem de energia de ionização'],[16,'periodicas','Variações de raio atômico e iônico'],[17,'periodicas','Série isoeletrônica e Z efetiva'],[18,'periodicas','Afinidade eletrônica']];
function edW(){ const b=g('m1Edi'); if(!b) return; b.innerHTML=EDQ.map(([n,v,t])=>'<a href="#'+v+'" data-q="'+n+'"><span>'+n+'</span>'+t+'</a>').join('');
  b.querySelectorAll('a').forEach(a=>a.onclick=e=>{ e.preventDefault(); const n=a.dataset.q, v=a.getAttribute('href'); location.hash=v; setTimeout(()=>{ const q=[...document.querySelectorAll(v.replace('#','#v-')+' .ex .q')].find(q=>q.textContent.includes('questão '+n+':')); if(q){ q.parentElement.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'}); q.parentElement.classList.add('m1-pisca'); setTimeout(()=>q.parentElement.classList.remove('m1-pisca'),1800) } },120) }) }

/* ===================== TREINO ===================== */
const rnd=a=>a[Math.random()*a.length|0], ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const lerNum=s=>{ s=String(s).trim().replace(/\s/g,'').replace(/×|x|\*/gi,'x').replace(',','.'); let m=s.match(/^([-+]?\d*\.?\d+)(?:x10\^?([-+−]?\d+)|e([-+−]?\d+))?$/i); if(!m) return NaN; const e=(m[2]||m[3]||'0').replace('−','-'); return parseFloat(m[1])*Math.pow(10,+e) };
const perto=(a,b)=>isFinite(a)&&Math.abs(a-b)<=Math.abs(b)*.02+1e-300;
const GEN={
  part:()=>{ const ops=[[26,30,0],[26,30,3],[17,18,-1],[11,12,1],[8,8,-2],[20,20,2],[29,34,0],[47,61,1],[35,44,-1],[13,14,3],[16,16,-2],[53,74,0]], [z,n,q]=rnd(ops), A=z+n, e=z-q;
    return {t:'part',q:'Quantos prótons, nêutrons e elétrons tem <span class="m1-nucl"><sup>'+A+'</sup><sub></sub>'+sym(z)+(q?'<sup class="q">'+(Math.abs(q)>1?Math.abs(q):'')+(q>0?'+':'−')+'</sup>':'')+'</span>? Responda “p, n, e” (ex.: 26, 30, 23).',ok:s=>{ const v=String(s).split(/[^\d]+/).filter(Boolean).map(Number); return v.length===3&&v[0]===z&&v[1]===n&&v[2]===e },dica:'Z vem da tabela; n = A − Z; carga +q tira q elétrons, −q põe.',res:z+', '+n+', '+e} },
  foton:()=>{ const nm=ri(250,700), E=H*C/(nm*1e-9); return {t:'luz',q:'Qual a energia (em J) de um fóton de λ = '+nm+' nm?',ok:s=>perto(lerNum(s),E),dica:'E = hc/λ, com λ em metros (nm × 10⁻⁹).',res:sci(E,2)+' J'} },
  freq:()=>{ const nu=ri(30,90)/10*1e14, lam=C/nu; return {t:'luz',q:'Uma radiação tem ν = '+sci(nu,1)+' Hz. Qual o λ em nm?',ok:s=>perto(lerNum(s),lam*1e9),dica:'λ = c/ν e depois passe de m para nm (÷ 10⁻⁹).',res:nf(lam*1e9,0)+' nm'} },
  bohrL:()=>{ let a=ri(3,6), b=ri(1,a-1); const dE=RH*(1/(b*b)-1/(a*a)), lam=H*C/dE*1e9; return {t:'bohr',q:'Hidrogênio: o elétron cai de n = '+a+' para n = '+b+'. Qual o λ do fóton emitido, em nm?',ok:s=>perto(lerNum(s),lam),dica:'ΔE = 2,18 × 10⁻¹⁸ (1/n_f² − 1/n_i²); λ = hc/|ΔE|.',res:nf(lam,0)+' nm'} },
  bohrE:()=>{ const n=ri(1,7), E=-RH/(n*n); return {t:'bohr',q:'Qual a energia (em J) do elétron do hidrogênio em n = '+n+'?',ok:s=>perto(lerNum(s),E),dica:'Eₙ = −2,18 × 10⁻¹⁸ / n². Não esqueça o sinal.',res:sci(E,2)+' J'} },
  qn:()=>{ const n=ri(1,5), l=ri(0,Math.min(4,n)), ml=ri(-l-1,l+1), ok=l<=n-1&&Math.abs(ml)<=l; return {t:'quanticos',q:'O conjunto {'+n+', '+l+', '+(ml>0?'+':'')+ml+', +½} é permitido?',esc:['permitido','proibido'],ok:s=>s===(ok?'permitido':'proibido'),dica:'Confira l ≤ n − 1 e |m_l| ≤ l.',res:ok?'permitido ('+n+LL[l]+')':'proibido'} },
  orb:()=>{ const n=ri(2,5); return {t:'quanticos',q:'Quantos orbitais existem na camada n = '+n+'?',ok:s=>+String(s).trim()===n*n,dica:'Some 2l + 1 para l = 0 … n − 1 (ou use n²).',res:String(n*n)} },
  cfg:()=>{ const ops=[[rnd([3,5,7,9,11,12,13,14,15,16,17,19,20,22,23,25,26,27,28,30,31,33,34,35,37,38,50,53]),0],[12,2],[15,-3],[17,-1],[26,2],[26,3],[24,3],[8,-2],[11,1],[29,0],[24,0],[29,1]], [z,q]=rnd(ops), m=config(z,q);
    return {t:'config',q:'Escreva a configuração eletrônica (completa ou condensada) de <b>'+sym(z)+(q?sup((Math.abs(q)>1?Math.abs(q):'')+(q>0?'+':'-')):'')+'</b> (Z = '+z+').',ok:s=>{ const r=leCfg(s); return !!r&&igualCfg(r,m) },dica:'Siga o diagrama de Pauling; íon positivo: tire do maior n primeiro. Lembre das exceções Cr e Cu.',res:condensada(m)} },
  elem:()=>{ const z=rnd([5,6,8,11,13,16,19,20,23,26,30,31,35,38,47,50,52,53]); return {t:'config',q:'Que elemento tem a configuração <b>'+condensada(config(z))+'</b>? Responda o símbolo.',ok:s=>String(s).trim().toLowerCase()===sym(z).toLowerCase(),dica:'Z = elétrons do gás nobre entre colchetes + os de fora.',res:sym(z)+' ('+nome(z)+')'} },
  desemp:()=>{ const z=rnd([5,6,7,8,9,12,15,16,22,24,25,26,27,28,29,30,33,34]), m=config(z); return {t:'config',q:'Quantos elétrons desemparelhados tem o átomo de '+nome(z)+' ('+sym(z)+') no estado fundamental?',ok:s=>+String(s).trim()===desemp(m),dica:'Desenhe as quadrículas da valência e use a regra de Hund.',res:desemp(m)+' → '+(desemp(m)?'paramagnético':'diamagnético')} },
  ordem:()=>{ const GR=[[3,11,19,37],[4,12,20,38],[9,17,35,53],[8,16,34,52],[7,15,33,51]], PER=[[3,4,5,6,7,8,9],[11,12,13,14,15,16,17],[19,20,31,32,33,34,35]];
    const src=Math.random()<.5?rnd(GR):rnd(PER), pk=src.slice().sort(()=>Math.random()-.5).slice(0,3), pr=Math.random()<.5?'raio':'ei', arr=pk.slice().sort((a,b)=>pr==='raio'?RAIO[b-1]-RAIO[a-1]:EI[b-1]-EI[a-1]);
    return {t:'periodicas',q:'Coloque em ordem <b>decrescente</b> de '+(pr==='raio'?'raio atômico':'energia de ionização')+': '+pk.map(sym).join(', ')+'. Escreva os símbolos em ordem (ex.: Na K Li).',ok:s=>{ const v=String(s).split(/[^A-Za-z]+/).filter(Boolean).map(t=>t.toLowerCase()); return v.join()===arr.map(z=>sym(z).toLowerCase()).join() },dica:pr==='raio'?'Raio cresce para baixo e para a esquerda.':'Energia de ionização cresce para cima e para a direita.',res:arr.map(sym).join(' > ')} }};
const TOP=[['tudo','Tudo'],['part','Partículas'],['luz','Luz'],['bohr','Bohr'],['quanticos','Números quânticos'],['config','Configuração'],['periodicas','Periódicas']];
function trW(){ const box=g('m1TrQ'); if(!box) return; let top='tudo', cur=null, tent=0, S={ok:0,tot:0};
  try{ S=Object.assign(S,JSON.parse(localStorage.getItem('qg-m1-treino')||'{}')) }catch(e){}
  const save=()=>{ try{ localStorage.setItem('qg-m1-treino',JSON.stringify(S)) }catch(e){} g('m1TrS').textContent='Seu placar neste aparelho: '+S.ok+' certas de '+S.tot+' tentativas.' };
  g('m1TrT').innerHTML=TOP.map(([k,t])=>'<button data-k="'+k+'">'+t+'</button>').join(''); g('m1TrT').querySelectorAll('button').forEach(b=>b.onclick=()=>{ top=b.dataset.k; nova() });
  const nova=()=>{ g('m1TrT').querySelectorAll('button').forEach(b=>b.classList.toggle('sel',b.dataset.k===top)); const gens=Object.values(GEN).filter(f=>{ const t=f().t; return top==='tudo'||t===top });
    cur=rnd(gens)(); tent=0; box.innerHTML=cur.q; g('m1TrO').innerHTML=''; const inp=g('m1TrIn'); inp.value='';
    if(cur.esc){ inp.parentElement.hidden=true; g('m1TrC').innerHTML=cur.esc.map(e=>'<button class="ghost" data-e="'+e+'">'+e+'</button>').join(''); g('m1TrC').querySelectorAll('button').forEach(b=>b.onclick=()=>checa(b.dataset.e)) } else { inp.parentElement.hidden=false; g('m1TrC').innerHTML=''; } };
  const checa=v=>{ if(!cur||String(v).trim()==='') return; tent++; const ok=cur.ok(v); S.tot++; if(ok) S.ok++; save();
    g('m1TrO').innerHTML=ok?'<b style="color:var(--ok,#22884A)">✓ Certo!</b>':'<b style="color:var(--bad,#C73A2C)">✗ Errado.</b>' };
  g('m1TrOk').onclick=()=>checa(g('m1TrIn').value); g('m1TrIn').onkeydown=e=>{ if(e.key==='Enter') checa(e.target.value) };
  g('m1TrD').onclick=()=>{ if(cur) g('m1TrO').innerHTML='💡 '+cur.dica };
  g('m1TrV').onclick=()=>{ if(cur) g('m1TrO').innerHTML='Resposta: <b>'+cur.res+'</b>' };
  g('m1TrN').onclick=nova; save(); nova() }

/* ===================== boot ===================== */
sortW(); symFlip(); tlW(); linhas(); qnW(); pauW(); ptW(); edW(); trW();
const DRAW={modelos:[ruW(),atW()],luz:[spW(),feW()],bohr:[boW()],quanticos:[orbW()],config:[cfgW()],periodicas:[isoW(),ieW()]};
const show=()=>{ const h=location.hash.slice(1); (DRAW[h]||[]).forEach(f=>{ try{ f&&f() }catch(e){ console.error(e) } }) };
addEventListener('hashchange',()=>requestAnimationFrame(show)); let rz=0; addEventListener('resize',()=>{ clearTimeout(rz); rz=setTimeout(show,150) }); requestAnimationFrame(show);
window.FDB_Q1={config,condensada,leCfg,igualCfg,desemp};
})();
