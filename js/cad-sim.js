/* Faculdade de Bolso · Desenho I · simulador de AutoCAD no navegador
   Linha de comando de verdade (LINE, CIRCLE, RECTANG, POLYGON, PLINE, MOVE, COPY, ROTATE, SCALE, MIRROR,
   OFFSET, TRIM, EXTEND, FILLET, EXPLODE, ERASE, DIST, ID, LIST, UNDO, ZOOM), coordenadas absolutas,
   relativas (@x,y) e polares (@d<a), entrada direta de distância, ORTHO, OSNAP e GRID.
   Uso: CadSim.montar(elemento, {desafios:[...]})  · sem bibliotecas externas. */
(function(){
'use strict';
const EPS=1e-9, TOL=0.02, RAD=Math.PI/180;
const fmt=v=>{ const r=Math.round(v*10000)/10000; return String(Object.is(r,-0)?0:r) };
const fmtA=a=>{ let d=a/RAD; d=((d%360)+360)%360; return fmt(Math.round(d*100)/100)+'°' };
const dist=(a,b)=>Math.hypot(b[0]-a[0],b[1]-a[1]);
const ang=(a,b)=>Math.atan2(b[1]-a[1],b[0]-a[0]);
const norm=a=>{ a%=2*Math.PI; return a<0?a+2*Math.PI:a };
const inArc=(t,a0,a1)=>{ t=norm(t-a0); return t<=norm(a1-a0)+1e-9 };
const clone=o=>JSON.parse(JSON.stringify(o));
const END={end:1};

/* ---------- geometria ---------- */
function segs(e){ if(e.t==='l') return [[e.a,e.b]]; if(e.t==='p'){ const s=[]; for(let i=0;i<e.pts.length-1;i++) s.push([e.pts[i],e.pts[i+1]]); if(e.cl&&e.pts.length>2) s.push([e.pts[e.pts.length-1],e.pts[0]]); return s } return [] }
function llInt(p,q,r,s,inf){ const d=(q[0]-p[0])*(s[1]-r[1])-(q[1]-p[1])*(s[0]-r[0]); if(Math.abs(d)<EPS) return null;
  const t=((r[0]-p[0])*(s[1]-r[1])-(r[1]-p[1])*(s[0]-r[0]))/d, u=((r[0]-p[0])*(q[1]-p[1])-(r[1]-p[1])*(q[0]-p[0]))/d;
  if(!inf&&(u<-1e-9||u>1+1e-9)) return null; return {t,u,p:[p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])]} }
function lcInt(p,q,c,r){ const dx=q[0]-p[0], dy=q[1]-p[1], fx=p[0]-c[0], fy=p[1]-c[1], A=dx*dx+dy*dy, B=2*(fx*dx+fy*dy), C=fx*fx+fy*fy-r*r, D=B*B-4*A*C;
  if(D<0||A<EPS) return []; const sq=Math.sqrt(D); return [(-B-sq)/(2*A),(-B+sq)/(2*A)].filter((t,i,a)=>i===0||Math.abs(t-a[0])>1e-9).map(t=>({t,p:[p[0]+t*dx,p[1]+t*dy]})) }
function ccInt(c1,r1,c2,r2){ const d=dist(c1,c2); if(d<EPS||d>r1+r2+1e-9||d<Math.abs(r1-r2)-1e-9) return [];
  const a=(r1*r1-r2*r2+d*d)/(2*d), h=Math.sqrt(Math.max(0,r1*r1-a*a)), m=[c1[0]+a*(c2[0]-c1[0])/d,c1[1]+a*(c2[1]-c1[1])/d];
  const o=[-(c2[1]-c1[1])/d*h,(c2[0]-c1[0])/d*h]; return h<1e-9?[m]:[[m[0]+o[0],m[1]+o[1]],[m[0]-o[0],m[1]-o[1]]] }
/* parâmetros de interseção de um alvo (linha: t ∈ [0,1]; círculo/arco: ângulo) com os outros objetos */
function cortes(alvo,ents,ext){ const out=[];
  for(const o of ents){ if(o===alvo) continue;
    if(alvo.t==='l'){ const [p,q]=[alvo.a,alvo.b];
      for(const [r,s] of segs(o)){ const k=llInt(p,q,r,s,true); if(k&&k.u>=-1e-9&&k.u<=1+1e-9) out.push(k.t) }
      if(o.t==='c'||o.t==='a') for(const k of lcInt(p,q,o.c,o.r)) if(o.t==='c'||inArc(ang(o.c,k.p),o.a0,o.a1)) out.push(k.t) }
    else { const c=alvo.c, r=alvo.r;
      for(const [p,q] of segs(o)) for(const k of lcInt(p,q,c,r)) if(k.t>=-1e-9&&k.t<=1+1e-9) out.push(ang(c,k.p));
      if(o.t==='c'||o.t==='a') for(const p of ccInt(c,r,o.c,o.r)) if(o.t==='c'||inArc(ang(o.c,p),o.a0,o.a1)) out.push(ang(c,p)) } }
  return ext?out:out }
function pertoDe(e,w){ if(e.t==='l'||e.t==='p'){ let m=1e9; for(const [a,b] of segs(e)){ const dx=b[0]-a[0], dy=b[1]-a[1], L=dx*dx+dy*dy; let t=L?((w[0]-a[0])*dx+(w[1]-a[1])*dy)/L:0; t=Math.max(0,Math.min(1,t)); m=Math.min(m,dist(w,[a[0]+t*dx,a[1]+t*dy])) } return m }
  if(e.t==='c') return Math.abs(dist(w,e.c)-e.r);
  if(e.t==='a'){ const t=ang(e.c,w); if(inArc(t,e.a0,e.a1)) return Math.abs(dist(w,e.c)-e.r); const p0=[e.c[0]+e.r*Math.cos(e.a0),e.c[1]+e.r*Math.sin(e.a0)], p1=[e.c[0]+e.r*Math.cos(e.a1),e.c[1]+e.r*Math.sin(e.a1)]; return Math.min(dist(w,p0),dist(w,p1)) } return 1e9 }
function transf(e,f,espelho){ const n=clone(e);
  if(n.t==='l'){ n.a=f(n.a); n.b=f(n.b) } else if(n.t==='p'){ n.pts=n.pts.map(f) }
  else { const c=f(n.c), q=f([n.c[0]+n.r,n.c[1]]); const k=dist(c,q)/n.r||1;
    if(n.t==='a'){ const p0=f([e.c[0]+e.r*Math.cos(e.a0),e.c[1]+e.r*Math.sin(e.a0)]), p1=f([e.c[0]+e.r*Math.cos(e.a1),e.c[1]+e.r*Math.sin(e.a1)]);
      if(espelho){ n.a0=ang(c,p1); n.a1=ang(c,p0) } else { n.a0=ang(c,p0); n.a1=ang(c,p1) } }
    n.c=c; n.r=e.r*k } return n }
function areaPoly(p){ let s=0; for(let i=0;i<p.length;i++){ const a=p[i], b=p[(i+1)%p.length]; s+=a[0]*b[1]-b[0]*a[1] } return s/2 }
function dentro(p,w){ let ins=false; for(let i=0,j=p.length-1;i<p.length;j=i++){ const a=p[i], b=p[j]; if(((a[1]>w[1])!==(b[1]>w[1]))&&(w[0]<(b[0]-a[0])*(w[1]-a[1])/(b[1]-a[1])+a[0])) ins=!ins } return ins }

/* ---------- leitura de coordenadas ---------- */
function lerPonto(txt,ultimo,cursorDir){ const s=txt.replace(/\s+/g,'');
  let m=s.match(/^(@)?(-?\d*\.?\d+)<(-?\d*\.?\d+)$/);
  if(m){ const d=+m[2], a=+m[3]*RAD, base=m[1]?(ultimo||[0,0]):[0,0]; if(m[1]&&!ultimo) return {erro:'Não existe ponto anterior para o @.'}; return {p:[base[0]+d*Math.cos(a),base[1]+d*Math.sin(a)],tipo:m[1]?'polar relativa':'polar absoluta'} }
  m=s.match(/^(@)?(-?\d*\.?\d+),(-?\d*\.?\d+)$/);
  if(m){ if(m[1]&&!ultimo) return {erro:'Não existe ponto anterior para o @.'}; const base=m[1]?ultimo:[0,0]; return {p:[base[0]+(+m[2]),base[1]+(+m[3])],tipo:m[1]?'relativa':'absoluta'} }
  if(s==='@') return ultimo?{p:ultimo.slice(),tipo:'relativa'}:{erro:'Sem ponto anterior.'};
  m=s.match(/^(-?\d*\.?\d+)$/);
  if(m&&ultimo&&cursorDir!=null){ const d=+m[1]; return {p:[ultimo[0]+d*Math.cos(cursorDir),ultimo[1]+d*Math.sin(cursorDir)],tipo:'distância direta'} }
  if(/\d,\d+,\d/.test(s)) return {erro:'Coordenada com vírgula a mais. No AutoCAD o decimal é PONTO: 5.6 (e a vírgula separa X de Y).'};
  return null }

const ALIAS={L:'LINE',LINE:'LINE',C:'CIRCLE',CIRCLE:'CIRCLE',REC:'RECTANG',RECTANG:'RECTANG',RECTANGLE:'RECTANG',POL:'POLYGON',POLYGON:'POLYGON',PL:'PLINE',PLINE:'PLINE',
  E:'ERASE',ERASE:'ERASE',M:'MOVE',MOVE:'MOVE',CO:'COPY',CP:'COPY',COPY:'COPY',RO:'ROTATE',ROTATE:'ROTATE',SC:'SCALE',SCALE:'SCALE',MI:'MIRROR',MIRROR:'MIRROR',
  O:'OFFSET',OFFSET:'OFFSET',TR:'TRIM',TRIM:'TRIM',EX:'EXTEND',EXTEND:'EXTEND',F:'FILLET',FILLET:'FILLET',X:'EXPLODE',EXPLODE:'EXPLODE',
  DI:'DIST',DIST:'DIST',ID:'ID',LI:'LIST',LIST:'LIST',U:'UNDO',UNDO:'UNDO',Z:'ZOOM',ZOOM:'ZOOM',AA:'AREA',AREA:'AREA'};

/* ===================================================================== */
function montar(raiz,op){ op=op||{};
  raiz.classList.add('cad');
  raiz.innerHTML='<div class="cad-top"><span class="cad-tt">'+(op.titulo||'Simulador de AutoCAD')+'</span>'+(op.desafios?'<select class="cad-ds" aria-label="Escolha o desafio"></select>':'')+'</div>'+
    (op.desafios?'<div class="cad-dsi"></div>':'')+
    '<div class="cad-area"><canvas class="cad-cv" aria-label="Área gráfica do simulador"></canvas><div class="cad-dyn" hidden></div><div class="cad-ucs">Y<br>↑<br>└→ X</div></div>'+
    '<div class="cad-log" aria-live="polite"></div>'+
    '<div class="cad-cmd"><span class="cad-pr">Command:</span><input class="cad-in" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="Linha de comando"></div>'+
    '<div class="cad-st"><span class="cad-xy">0, 0</span><button data-t="grid" class="on">GRID F7</button><button data-t="ortho">ORTHO F8</button><button data-t="osnap" class="on">OSNAP F3</button>'+
    '<span class="cad-sp"></span><button data-a="enter">Enter ↵</button><button data-a="esc">Esc</button><button data-a="u">Desfazer</button><button data-a="ze">Zoom tudo</button>'+(op.desafios?'<button data-a="ok" class="cad-ok">Conferir</button>':'')+'<button data-a="new">Limpar</button></div>'+
    (op.desafios?'<div class="cad-res" aria-live="polite"></div>':'');
  const cv=raiz.querySelector('.cad-cv'), ctx=cv.getContext('2d'), IN=raiz.querySelector('.cad-in'), PR=raiz.querySelector('.cad-pr'), LOG=raiz.querySelector('.cad-log'), XY=raiz.querySelector('.cad-xy'), DYN=raiz.querySelector('.cad-dyn');
  let ents=[], hist=[], view={s:4,ox:60,oy:300}, cur=null, curW=[0,0], snap=null, tog={grid:true,ortho:false,osnap:true};
  let cmd=null, pedido=null, ultimo=null, ultimoCmd=null, sel=[], alvo=null, mostraAlvo=true, W=0, H=0;

  const log=(t,cls)=>{ const d=document.createElement('div'); if(cls) d.className=cls; d.textContent=t; LOG.appendChild(d); while(LOG.children.length>60) LOG.firstChild.remove(); LOG.scrollTop=LOG.scrollHeight };
  const toS=p=>[view.ox+p[0]*view.s,view.oy-p[1]*view.s], toW=(x,y)=>[(x-view.ox)/view.s,(view.oy-y)/view.s];
  const guarda=()=>{ hist.push(clone(ents)); if(hist.length>80) hist.shift() };

  /* ---------- desenho ---------- */
  function tam(){ const r=cv.getBoundingClientRect(), d=Math.min(2,devicePixelRatio||1); W=Math.round(r.width); H=Math.round(r.height); if(!W||!H) return false;
    if(cv.width!==W*d||cv.height!==H*d){ cv.width=W*d; cv.height=H*d } ctx.setTransform(d,0,0,d,0,0); return true }
  function linhaE(e){ ctx.beginPath();
    if(e.t==='l'){ const a=toS(e.a), b=toS(e.b); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]) }
    else if(e.t==='p'){ e.pts.forEach((p,i)=>{ const s=toS(p); i?ctx.lineTo(s[0],s[1]):ctx.moveTo(s[0],s[1]) }); if(e.cl) ctx.closePath() }
    else if(e.t==='c'){ const c=toS(e.c); ctx.arc(c[0],c[1],e.r*view.s,0,2*Math.PI) }
    else if(e.t==='a'){ const c=toS(e.c); ctx.arc(c[0],c[1],e.r*view.s,-e.a0,-e.a1,true) }
    ctx.stroke() }
  function desenha(){ if(!tam()) return; ctx.fillStyle='#212830'; ctx.fillRect(0,0,W,H);
    if(tog.grid){ let g=1; const alvos=[1,2,5,10,20,50,100,200,500]; for(const k of alvos){ g=k; if(k*view.s>=14) break }
      const w0=toW(0,H), w1=toW(W,0); ctx.lineWidth=1;
      for(let x=Math.floor(w0[0]/g)*g;x<=w1[0];x+=g){ const X=toS([x,0])[0]; ctx.strokeStyle=Math.abs(x/(g*5)-Math.round(x/(g*5)))<1e-6?'#3A4552':'#2A333D'; ctx.beginPath(); ctx.moveTo(X,0); ctx.lineTo(X,H); ctx.stroke() }
      for(let y=Math.floor(w0[1]/g)*g;y<=w1[1];y+=g){ const Y=toS([0,y])[1]; ctx.strokeStyle=Math.abs(y/(g*5)-Math.round(y/(g*5)))<1e-6?'#3A4552':'#2A333D'; ctx.beginPath(); ctx.moveTo(0,Y); ctx.lineTo(W,Y); ctx.stroke() } }
    const o=toS([0,0]); ctx.strokeStyle='#C0504D'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(o[0],o[1]); ctx.lineTo(o[0]+34,o[1]); ctx.stroke(); ctx.strokeStyle='#4FA34F'; ctx.beginPath(); ctx.moveTo(o[0],o[1]); ctx.lineTo(o[0],o[1]-34); ctx.stroke();
    ctx.fillStyle='#8FA0B3'; ctx.font='10px sans-serif'; ctx.fillText('0,0',o[0]+4,o[1]+12);
    if(alvo&&mostraAlvo){ ctx.save(); ctx.setLineDash([6,5]); ctx.strokeStyle='rgba(120,200,140,.55)'; ctx.lineWidth=2; alvo.forEach(([a,b])=>linhaE({t:'l',a,b})); ctx.restore() }
    ctx.lineWidth=1.6; ents.forEach(e=>{ ctx.strokeStyle=sel.includes(e)?'#5AA9FF':'#F2F4F7'; if(sel.includes(e)) ctx.setLineDash([6,4]); linhaE(e); ctx.setLineDash([]) });
    /* prévia */
    if(pedido&&pedido.previa&&cur){ ctx.save(); ctx.strokeStyle='#F5C542'; ctx.lineWidth=1.3; ctx.setLineDash([5,4]); (pedido.previa(pontoCursor())||[]).forEach(linhaE); ctx.restore() }
    /* osnap */
    if(snap){ const s=toS(snap.p); ctx.strokeStyle='#F5C542'; ctx.lineWidth=2; ctx.beginPath();
      if(snap.k==='end') ctx.rect(s[0]-6,s[1]-6,12,12); else if(snap.k==='mid'){ ctx.moveTo(s[0],s[1]-7); ctx.lineTo(s[0]+7,s[1]+5); ctx.lineTo(s[0]-7,s[1]+5); ctx.closePath() }
      else if(snap.k==='cen') ctx.arc(s[0],s[1],7,0,7); else { ctx.moveTo(s[0]-6,s[1]-6); ctx.lineTo(s[0]+6,s[1]+6); ctx.moveTo(s[0]+6,s[1]-6); ctx.lineTo(s[0]-6,s[1]+6) }
      ctx.stroke(); ctx.fillStyle='#F5C542'; ctx.font='11px sans-serif'; ctx.fillText({end:'Endpoint',mid:'Midpoint',cen:'Center',int:'Intersection'}[snap.k],s[0]+10,s[1]-10) }
    /* cursor */
    if(cur){ ctx.strokeStyle='rgba(255,255,255,.75)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(cur[0]-22,cur[1]); ctx.lineTo(cur[0]+22,cur[1]); ctx.moveTo(cur[0],cur[1]-22); ctx.lineTo(cur[0],cur[1]+22); ctx.stroke(); ctx.strokeRect(cur[0]-4,cur[1]-4,8,8) } }

  /* ---------- osnap e cursor ---------- */
  function candidatos(){ const c=[];
    ents.forEach(e=>{ if(e.t==='l'){ c.push({p:e.a,k:'end'},{p:e.b,k:'end'},{p:[(e.a[0]+e.b[0])/2,(e.a[1]+e.b[1])/2],k:'mid'}) }
      else if(e.t==='p'){ e.pts.forEach(p=>c.push({p,k:'end'})); segs(e).forEach(([a,b])=>c.push({p:[(a[0]+b[0])/2,(a[1]+b[1])/2],k:'mid'})) }
      else { c.push({p:e.c,k:'cen'}); if(e.t==='a') c.push({p:[e.c[0]+e.r*Math.cos(e.a0),e.c[1]+e.r*Math.sin(e.a0)],k:'end'},{p:[e.c[0]+e.r*Math.cos(e.a1),e.c[1]+e.r*Math.sin(e.a1)],k:'end'}) } });
    for(let i=0;i<ents.length;i++) for(let j=i+1;j<ents.length;j++){ const a=ents[i], b=ents[j];
      for(const [p,q] of segs(a)){ for(const [r,s] of segs(b)){ const k=llInt(p,q,r,s,false); if(k&&k.t>=-1e-9&&k.t<=1+1e-9) c.push({p:k.p,k:'int'}) }
        if(b.t==='c'||b.t==='a') for(const k of lcInt(p,q,b.c,b.r)) if(k.t>=0&&k.t<=1&&(b.t==='c'||inArc(ang(b.c,k.p),b.a0,b.a1))) c.push({p:k.p,k:'int'}) }
      if((a.t==='c'||a.t==='a')) for(const [p,q] of segs(b)) for(const k of lcInt(p,q,a.c,a.r)) if(k.t>=0&&k.t<=1&&(a.t==='c'||inArc(ang(a.c,k.p),a.a0,a.a1))) c.push({p:k.p,k:'int'});
      if((a.t==='c'||a.t==='a')&&(b.t==='c'||b.t==='a')) ccInt(a.c,a.r,b.c,b.r).forEach(p=>c.push({p,k:'int'})) }
    return c }
  let cand=[];
  function acharSnap(sx,sy){ if(!tog.osnap||!pedido||!/pt|num/.test(pedido.want)) return null; let best=null, bd=13; const pri={end:0,int:1,mid:2,cen:3};
    for(const c of cand){ const s=toS(c.p), d=Math.hypot(s[0]-sx,s[1]-sy); if(d<bd-2||(best&&Math.abs(d-bd)<2&&pri[c.k]<pri[best.k])){ bd=d; best=c } }
    if(!best){ const w=toW(sx,sy); for(const e of ents) if((e.t==='c'||e.t==='a')&&pertoDe(e,w)*view.s<8){ best={p:e.c,k:'cen'}; break } }
    return best }
  function pontoCursor(){ if(snap) return snap.p.slice(); let w=curW.slice(); const f=pedido&&pedido.from;
    if(f&&tog.ortho){ if(Math.abs(w[0]-f[0])>=Math.abs(w[1]-f[1])) w[1]=f[1]; else w[0]=f[0] } return w }
  function dirCursor(){ const f=pedido&&pedido.from; if(!f||!cur) return null; const p=pontoCursor(); if(dist(f,p)<EPS) return null; return ang(f,p) }

  /* ---------- motor de comandos (geradores) ---------- */
  function iniciar(nome){ const g=CMDS[nome]; if(!g){ log('Comando desconhecido "'+nome+'". Veja a lista de comandos abaixo.','err'); return }
    ultimoCmd=nome; sel=[]; cmd=g(); log('Command: '+nome,'cmd'); passo(undefined) }
  function passo(v){ let r; try{ r=cmd.next(v) }catch(e){ log(String(e.message||e),'err'); fim(); return }
    if(r.done){ fim(); return } pedido=r.value; PR.textContent=pedido.msg; desenha() }
  function fim(){ cmd=null; pedido=null; sel=[]; PR.textContent='Command:'; DYN.hidden=true; cand=candidatos(); desenha() }
  function cancelar(){ if(cmd){ log('*Cancel*','err'); fim() } }
  function entrada(txt){ const t=txt.trim(), T=t.toUpperCase();
    if(!cmd){ if(!t){ if(ultimoCmd) iniciar(ultimoCmd); return } if(T==='U'||T==='UNDO'){ desfazer(); return } const n=ALIAS[T]; if(!n){ log('Command: '+t,'cmd'); log('Comando desconhecido "'+t+'".','err'); return } iniciar(n); return }
    log(pedido.msg+' '+t);
    if(!t){ passo(END); return }
    const w=pedido.want;
    if(pedido.opts&&pedido.opts.includes(T)){ passo(T); return }
    if(w==='pt'||w==='num'||w==='ptnum'){
      if(w!=='pt'&&/^-?\d*\.?\d+$/.test(t)){ passo(+t); return }
      const r=lerPonto(t,ultimo,dirCursor()); if(r&&r.erro){ log(r.erro,'err'); return } if(r){ if(w==='num'){ log('Digite um número.','err'); return } ultimo=r.p; passo(r.p); return }
      log('Não entendi "'+t+'". Ponto: x,y · @dx,dy · @distância<ângulo'+(pedido.opts?' · opções: '+pedido.opts.join('/'):''),'err'); return }
    if(w==='sel'){ if(T==='ALL'||T==='TODOS'){ ents.forEach(e=>{ if(!sel.includes(e)) sel.push(e) }); log(sel.length+' found'); desenha(); return } log('Clique nos objetos (ou digite ALL) e tecle Enter.','err'); return }
    if(w==='txt'){ passo(T); return }
    log('Clique num objeto.','err') }
  function clique(sx,sy){ const w=toW(sx,sy);
    if(!cmd){ const e=pegar(w); if(e){ log('Selecione um comando antes (ex.: E para apagar). Dica: no AutoCAD você também pode clicar e depois comandar.') } return }
    const want=pedido.want;
    if(want==='pt'||want==='ptnum'){ const p=pontoCursor(); ultimo=p; log(pedido.msg+' '+fmt(p[0])+','+fmt(p[1])); passo(p); return }
    if(want==='num'){ const p=pontoCursor(); if(pedido.from){ const d=dist(pedido.from,p); log(pedido.msg+' '+fmt(d)); passo(d) } return }
    if(want==='sel'){ const e=pegar(w); if(e&&!sel.includes(e)){ sel.push(e); log('1 found, '+sel.length+' total') } desenha(); return }
    if(want==='ent'){ const e=pegar(w); if(!e){ log('Nenhum objeto aí. Clique em cima da linha.','err'); return } passo({e,w}); return } }
  function pegar(w){ let best=null, bd=10/view.s; for(const e of ents){ const d=pertoDe(e,w); if(d<bd){ bd=d; best=e } } return best }
  function desfazer(){ if(cmd) cancelar(); if(!hist.length){ log('Nada para desfazer.','err'); return } ents=hist.pop(); log('Command: UNDO  ·  desfeito'); cand=candidatos(); desenha() }

  /* ---------- comandos ---------- */
  const pt=(msg,from,o)=>Object.assign({msg,want:'pt',from},o||{});
  const CMDS={
    *LINE(){ let p=yield pt('Specify first point:'); if(p===END) return; const p1=p; let n=0, feitos=[]; guarda();
      for(;;){ const r=yield pt(n>=2?'Specify next point or [Close/Undo]:':'Specify next point or [Undo]:',p,{opts:n>=2?['C','U']:['U'],previa:c=>[{t:'l',a:p,b:c}]});
        if(r===END) return; if(r==='U'){ if(feitos.length){ const e=feitos.pop(); ents.splice(ents.indexOf(e),1); p=e.a; ultimo=p; n--; cand=candidatos() } continue }
        if(r==='C'){ ents.push({t:'l',a:p,b:p1}); ultimo=p1; return }
        if(dist(p,r)<EPS){ log('Ponto igual ao anterior.','err'); continue } const e={t:'l',a:p,b:r}; ents.push(e); feitos.push(e); p=r; n++; cand=candidatos() } },
    *PLINE(){ let p=yield pt('Specify start point:'); if(p===END) return; const pts=[p]; guarda(); const e={t:'p',pts,cl:false}; ents.push(e);
      for(;;){ const r=yield pt('Specify next point or [Close/Undo]:',p,{opts:['C','U'],previa:c=>[{t:'l',a:p,b:c}]});
        if(r===END) break; if(r==='C'){ if(pts.length>2) e.cl=true; break } if(r==='U'){ if(pts.length>1){ pts.pop(); p=pts[pts.length-1] } continue } pts.push(r); p=r; cand=candidatos() }
      if(pts.length<2) ents.splice(ents.indexOf(e),1) },
    *CIRCLE(){ const c=yield pt('Specify center point for circle:'); if(c===END) return;
      let r=yield {msg:'Specify radius of circle or [Diameter]:',want:'num',from:c,opts:['D'],previa:q=>[{t:'c',c,r:Math.max(dist(c,q),1e-6)}]};
      if(r===END) return; if(r==='D'){ r=yield {msg:'Specify diameter of circle:',want:'num',from:c,previa:q=>[{t:'c',c,r:Math.max(dist(c,q),1e-6)/2}]}; if(r===END) return; r/=2 }
      if(!(r>0)){ log('O raio precisa ser maior que zero.','err'); return } guarda(); ents.push({t:'c',c,r}) },
    *RECTANG(){ const a=yield pt('Specify first corner point:'); if(a===END) return; const box=(a,b)=>({t:'p',cl:true,pts:[a,[b[0],a[1]],b,[a[0],b[1]]]});
      const b=yield pt('Specify other corner point:',a,{previa:c=>[box(a,c)]}); if(b===END) return; if(Math.abs(b[0]-a[0])<EPS||Math.abs(b[1]-a[1])<EPS){ log('Retângulo sem área.','err'); return } guarda(); ents.push(box(a,b)) },
    *POLYGON(){ let n=yield {msg:'Enter number of sides <4>:',want:'num'}; if(n===END) n=4; n=Math.round(n); if(n<3||n>1024){ log('Entre 3 e 1024 lados.','err'); return }
      const c=yield pt('Specify center of polygon:'); if(c===END) return; let io=yield {msg:'Enter an option [Inscribed in circle/Circumscribed about circle] <I>:',want:'txt',opts:['I','C']}; if(io===END) io='I';
      const pol=(q)=>{ const R0=dist(c,q), a0=ang(c,q), R=io==='C'?R0/Math.cos(Math.PI/n):R0, s=io==='C'?a0+Math.PI/n:a0; return {t:'p',cl:true,pts:Array.from({length:n},(_,i)=>[c[0]+R*Math.cos(s+i*2*Math.PI/n),c[1]+R*Math.sin(s+i*2*Math.PI/n)])} };
      let r=yield {msg:'Specify radius of circle:',want:'ptnum',from:c,previa:q=>[pol(q)]}; if(r===END) return; if(typeof r==='number'){ if(!(r>0)) return; r=io==='C'?[c[0],c[1]-r]:[c[0],c[1]+r] } guarda(); ents.push(pol(r)) },
    *ERASE(){ const s=yield* selecionar(); if(!s.length) return; guarda(); ents=ents.filter(e=>!s.includes(e)); log(s.length+' objeto(s) apagado(s)') },
    *MOVE(){ yield* moverCopiar(false) }, *COPY(){ yield* moverCopiar(true) },
    *ROTATE(){ const s=yield* selecionar(); if(!s.length) return; const b=yield pt('Specify base point:'); if(b===END) return;
      const rot=(a)=>p=>{ const x=p[0]-b[0], y=p[1]-b[1]; return [b[0]+x*Math.cos(a)-y*Math.sin(a),b[1]+x*Math.sin(a)+y*Math.cos(a)] };
      let a=yield {msg:'Specify rotation angle:',want:'ptnum',from:b,previa:q=>s.map(e=>transf(e,rot(ang(b,q))))}; if(a===END) return; a=typeof a==='number'?a*RAD:ang(b,a);
      guarda(); s.forEach(e=>{ ents[ents.indexOf(e)]=transf(e,rot(a)) }) },
    *SCALE(){ const s=yield* selecionar(); if(!s.length) return; const b=yield pt('Specify base point:'); if(b===END) return;
      const k=yield {msg:'Specify scale factor:',want:'num',from:b}; if(k===END) return; if(!(k>0)){ log('Fator tem que ser maior que zero.','err'); return }
      guarda(); s.forEach(e=>{ ents[ents.indexOf(e)]=transf(e,p=>[b[0]+(p[0]-b[0])*k,b[1]+(p[1]-b[1])*k]) }) },
    *MIRROR(){ const s=yield* selecionar(); if(!s.length) return; const a=yield pt('Specify first point of mirror line:'); if(a===END) return;
      const esp=(b)=>p=>{ const dx=b[0]-a[0], dy=b[1]-a[1], L=dx*dx+dy*dy||1, t=((p[0]-a[0])*dx+(p[1]-a[1])*dy)/L, f=[a[0]+t*dx,a[1]+t*dy]; return [2*f[0]-p[0],2*f[1]-p[1]] };
      const b=yield pt('Specify second point of mirror line:',a,{previa:q=>dist(a,q)>EPS?s.map(e=>transf(e,esp(q),true)):[]}); if(b===END) return;
      let er=yield {msg:'Erase source objects? [Yes/No] <N>:',want:'txt',opts:['Y','N','S']}; guarda(); const novos=s.map(e=>transf(e,esp(b),true));
      if(er==='Y'||er==='S') ents=ents.filter(e=>!s.includes(e)); ents.push(...novos) },
    *OFFSET(){ let d=yield {msg:'Specify offset distance <'+fmt(this_off)+'>:',want:'num'}; if(d===END) d=this_off; if(!(d>0)){ log('Distância tem que ser maior que zero.','err'); return } this_off=d;
      for(;;){ const r=yield {msg:'Select object to offset or <exit>:',want:'ent'}; if(r===END) return; const e=r.e;
        const lado=yield pt('Specify point on side to offset:'); if(lado===END) return; const n=offsetE(e,d,lado); if(n){ guarda(); ents.push(n); cand=candidatos() } } },
    *TRIM(){ log('Clique na parte que quer apagar. As outras linhas servem de "faca" (modo rápido do AutoCAD).');
      for(;;){ const r=yield {msg:'Select object to trim or [Undo]:',want:'ent',opts:['U']}; if(r===END) return; if(r==='U'){ desfazerSo(); continue } aparar(r.e,r.w) } },
    *EXTEND(){ for(;;){ const r=yield {msg:'Select object to extend or [Undo]:',want:'ent',opts:['U']}; if(r===END) return; if(r==='U'){ desfazerSo(); continue } estender(r.e,r.w) } },
    *FILLET(){ let R=yield {msg:'Current settings: Radius = '+fmt(this_fr)+'  ·  Select first object or [Radius]:',want:'ent',opts:['R']};
      if(R===END) return; if(R==='R'){ const v=yield {msg:'Specify fillet radius <'+fmt(this_fr)+'>:',want:'num'}; if(v!==END) this_fr=v; R=yield {msg:'Select first object:',want:'ent'}; if(R===END) return }
      const S=yield {msg:'Select second object:',want:'ent'}; if(S===END) return; concordar(R,S,this_fr) },
    *EXPLODE(){ const s=yield* selecionar(); if(!s.length) return; guarda(); let n=0; s.forEach(e=>{ if(e.t==='p'){ const i=ents.indexOf(e); ents.splice(i,1,...segs(e).map(([a,b])=>({t:'l',a,b}))); n++ } }); log(n?n+' polilinha(s) virou(aram) linhas soltas':'Só polilinhas (retângulo, polígono, PLINE) explodem aqui.') },
    *DIST(){ const a=yield pt('Specify first point:'); if(a===END) return; const b=yield pt('Specify second point:',a,{previa:c=>[{t:'l',a,b:c}]}); if(b===END) return;
      log('Distance = '+fmt(dist(a,b))+',  Angle in XY Plane = '+fmtA(ang(a,b))+',  Delta X = '+fmt(b[0]-a[0])+',  Delta Y = '+fmt(b[1]-a[1]),'ok') },
    *ID(){ const a=yield pt('Specify point:'); if(a===END) return; log('X = '+fmt(a[0])+'     Y = '+fmt(a[1]),'ok') },
    *LIST(){ const s=yield* selecionar(); s.forEach(e=>log(info(e),'ok')) },
    *AREA(){ const s=yield* selecionar(); let t=0; s.forEach(e=>{ const a=e.t==='c'?Math.PI*e.r*e.r:e.t==='p'&&e.cl?Math.abs(areaPoly(e.pts)):0; t+=a }); log('Area = '+fmt(t)+(s.some(e=>!(e.t==='c'||(e.t==='p'&&e.cl)))?' (só círculos e polilinhas fechadas têm área)':''),'ok') },
    *ZOOM(){ const o=yield {msg:'[All/Extents] <E>:',want:'txt',opts:['E','A']}; zoomTudo() }
  };
  let this_off=10, this_fr=0;
  function* selecionar(){ for(;;){ const r=yield {msg:'Select objects:',want:'sel'}; if(r===END) break } const s=sel.slice(); if(!s.length) log('Nada selecionado.','err'); return s }
  function* moverCopiar(copia){ const s=yield* selecionar(); if(!s.length) return; const b=yield pt('Specify base point or [Displacement]:',null,{opts:['D']}); if(b===END) return;
    let base=b, D=null; if(b==='D'){ const v=yield pt('Specify displacement <0,0>:'); if(v===END) return; D=v; base=[0,0] }
    const mov=(q)=>p=>[p[0]+q[0]-base[0],p[1]+q[1]-base[1]];
    if(D){ guarda(); s.forEach(e=>{ const n=transf(e,mov(D)); if(copia) ents.push(n); else ents[ents.indexOf(e)]=n }); return }
    for(;;){ const q=yield pt('Specify second point'+(copia?' or <exit>':'')+':',base,{previa:c=>s.map(e=>transf(e,mov(c))).concat([{t:'l',a:base,b:c}])}); if(q===END) return;
      guarda(); s.forEach(e=>{ const n=transf(e,mov(q)); if(copia) ents.push(n); else { ents[ents.indexOf(e)]=n; sel[sel.indexOf(e)]=n } }); cand=candidatos(); if(!copia) return } }
  function desfazerSo(){ if(hist.length){ ents=hist.pop(); cand=candidatos(); desenha() } }
  function info(e){ if(e.t==='l'){ const L=dist(e.a,e.b); return 'LINE  from '+fmt(e.a[0])+','+fmt(e.a[1])+'  to '+fmt(e.b[0])+','+fmt(e.b[1])+'  ·  Length = '+fmt(L)+'  Angle = '+fmtA(ang(e.a,e.b))+'  ΔX = '+fmt(e.b[0]-e.a[0])+'  ΔY = '+fmt(e.b[1]-e.a[1]) }
    if(e.t==='c') return 'CIRCLE  center '+fmt(e.c[0])+','+fmt(e.c[1])+'  ·  Radius = '+fmt(e.r)+'  Diameter = '+fmt(2*e.r)+'  Circumference = '+fmt(2*Math.PI*e.r)+'  Area = '+fmt(Math.PI*e.r*e.r);
    if(e.t==='a') return 'ARC  center '+fmt(e.c[0])+','+fmt(e.c[1])+'  ·  Radius = '+fmt(e.r)+'  Start angle = '+fmtA(e.a0)+'  End angle = '+fmtA(e.a1)+'  Length = '+fmt(e.r*norm(e.a1-e.a0));
    const P=segs(e).reduce((s,[a,b])=>s+dist(a,b),0); return 'LWPOLYLINE  '+(e.cl?'Closed':'Open')+'  ·  '+e.pts.length+' vértices  ·  '+(e.cl?'Area = '+fmt(Math.abs(areaPoly(e.pts)))+'  Perimeter = ':'Length = ')+fmt(P) }
  function offsetE(e,d,lado){
    if(e.t==='l'){ const a=ang(e.a,e.b), nx=-Math.sin(a), ny=Math.cos(a), s=Math.sign((lado[0]-e.a[0])*nx+(lado[1]-e.a[1])*ny)||1; return {t:'l',a:[e.a[0]+s*d*nx,e.a[1]+s*d*ny],b:[e.b[0]+s*d*nx,e.b[1]+s*d*ny]} }
    if(e.t==='c'||e.t==='a'){ const r=dist(e.c,lado)<e.r?e.r-d:e.r+d; if(r<=EPS){ log('Não dá: o raio ficaria zero ou negativo.','err'); return null } const n=clone(e); n.r=r; return n }
    if(e.t==='p'){ const P=e.pts, cw=e.cl?areaPoly(P)<0:false; let fora=e.cl?!dentro(P,lado):null;
      let s; if(e.cl){ s=(fora?1:-1)*(cw?-1:1) } else { const a=ang(P[0],P[1]); s=Math.sign((lado[0]-P[0][0])*-Math.sin(a)+(lado[1]-P[0][1])*Math.cos(a))||1 }
      const linhas=segs(e).map(([a,b])=>{ const t=ang(a,b), nx=-Math.sin(t)*(e.cl?-1:1), ny=Math.cos(t)*(e.cl?-1:1); return [[a[0]+s*d*nx,a[1]+s*d*ny],[b[0]+s*d*nx,b[1]+s*d*ny]] });
      const N=linhas.length, pts=[];
      for(let i=0;i<(e.cl?N:N+1);i++){ if(!e.cl&&i===0){ pts.push(linhas[0][0]); continue } if(!e.cl&&i===N){ pts.push(linhas[N-1][1]); continue }
        const A=linhas[(i-1+N)%N], B=linhas[i%N], k=llInt(A[0],A[1],B[0],B[1],true); pts.push(k?k.p:A[1]) }
      return {t:'p',cl:e.cl,pts} } }
  function aparar(e,w){ if(e.t==='p'){ log('No simulador, exploda a polilinha (X) antes de aparar. No AutoCAD de verdade o TRIM corta polilinha direto.','err'); return }
    const cs=cortes(e,ents);
    if(e.t==='l'){ const dx=e.b[0]-e.a[0], dy=e.b[1]-e.a[1], L=dx*dx+dy*dy, t=((w[0]-e.a[0])*dx+(w[1]-e.a[1])*dy)/L; const ts=cs.filter(x=>x>1e-6&&x<1-1e-6).sort((a,b)=>a-b);
      let ta=0, tb=1; for(const x of ts){ if(x<t) ta=x; else { tb=x; break } } guarda(); const i=ents.indexOf(e), P=t0=>[e.a[0]+t0*dx,e.a[1]+t0*dy], novos=[];
      if(ta>1e-6) novos.push({t:'l',a:e.a,b:P(ta)}); if(tb<1-1e-6) novos.push({t:'l',a:P(tb),b:e.b}); ents.splice(i,1,...novos); cand=candidatos(); return }
    const tw=ang(e.c,w);
    if(e.t==='c'){ const as=[...new Set(cs.map(a=>Math.round(norm(a)*1e9)/1e9))].sort((a,b)=>a-b); if(as.length<2){ guarda(); ents.splice(ents.indexOf(e),1); cand=candidatos(); return }
      let a0=as[as.length-1], a1=as[0]; for(let k=0;k<as.length;k++){ const x=as[k], y=as[(k+1)%as.length]; if(inArc(tw,x,y)){ a0=x; a1=y; break } }
      guarda(); ents.splice(ents.indexOf(e),1,{t:'a',c:e.c,r:e.r,a0:a1,a1:a0}); cand=candidatos(); return }
    if(e.t==='a'){ const span=norm(e.a1-e.a0), u=x=>norm(x-e.a0), tu=u(tw); const us=cs.map(u).filter(x=>x>1e-6&&x<span-1e-6).sort((a,b)=>a-b);
      let ua=0, ub=span; for(const x of us){ if(x<tu) ua=x; else { ub=x; break } } guarda(); const novos=[];
      if(ua>1e-6) novos.push({t:'a',c:e.c,r:e.r,a0:e.a0,a1:e.a0+ua}); if(ub<span-1e-6) novos.push({t:'a',c:e.c,r:e.r,a0:e.a0+ub,a1:e.a1}); ents.splice(ents.indexOf(e),1,...novos); cand=candidatos() } }
  function estender(e,w){ if(e.t!=='l'){ log('No simulador o EXTEND funciona em linhas. Exploda a polilinha (X) antes.','err'); return }
    const fimB=dist(w,e.b)<dist(w,e.a), cs=cortes(e,ents).filter(t=>fimB?t>1+1e-6:t<-1e-6); if(!cs.length){ log('Nenhuma fronteira na direção dessa ponta.','err'); return }
    const t=fimB?Math.min(...cs):Math.max(...cs), dx=e.b[0]-e.a[0], dy=e.b[1]-e.a[1], P=[e.a[0]+t*dx,e.a[1]+t*dy]; guarda(); const n=clone(e); if(fimB) n.b=P; else n.a=P; ents[ents.indexOf(e)]=n; cand=candidatos() }
  function concordar(A,B,R){ const a=A.e, b=B.e; if(a.t!=='l'||b.t!=='l'||a===b){ log('No simulador o FILLET funciona entre duas linhas diferentes.','err'); return }
    const k=llInt(a.a,a.b,b.a,b.b,true); if(!k){ log('Linhas paralelas: não se encontram.','err'); return } const P=k.p;
    const lado=(e,w)=>{ const u=[e.b[0]-e.a[0],e.b[1]-e.a[1]], L=Math.hypot(u[0],u[1]); u[0]/=L; u[1]/=L; const s=Math.sign((w[0]-P[0])*u[0]+(w[1]-P[1])*u[1])||1; return [u[0]*s,u[1]*s] };
    const u1=lado(a,A.w), u2=lado(b,B.w), th=Math.acos(Math.max(-1,Math.min(1,u1[0]*u2[0]+u1[1]*u2[1])));
    if(th<1e-6||Math.PI-th<1e-6){ log('Ângulo inválido para concordar.','err'); return }
    const d=R/Math.tan(th/2), T1=[P[0]+u1[0]*d,P[1]+u1[1]*d], T2=[P[0]+u2[0]*d,P[1]+u2[1]*d];
    const ajusta=(e,u,T)=>{ const n=clone(e), da=(e.a[0]-P[0])*u[0]+(e.a[1]-P[1])*u[1], db=(e.b[0]-P[0])*u[0]+(e.b[1]-P[1])*u[1]; if(da<db) n.a=T; else n.b=T; return n };
    guarda(); ents[ents.indexOf(a)]=ajusta(a,u1,T1); ents[ents.indexOf(b)]=ajusta(b,u2,T2);
    if(R>EPS){ const bi=[u1[0]+u2[0],u1[1]+u2[1]], bl=Math.hypot(bi[0],bi[1]), h=R/Math.sin(th/2), C=[P[0]+bi[0]/bl*h,P[1]+bi[1]/bl*h];
      let a0=ang(C,T1), a1=ang(C,T2); if(norm(a1-a0)>Math.PI){ const x=a0; a0=a1; a1=x } ents.push({t:'a',c:C,r:R,a0,a1}) }
    cand=candidatos() }
  function zoomTudo(){ let xs=[], ys=[]; const add=p=>{ xs.push(p[0]); ys.push(p[1]) };
    ents.forEach(e=>{ if(e.t==='l'){ add(e.a); add(e.b) } else if(e.t==='p') e.pts.forEach(add); else { add([e.c[0]-e.r,e.c[1]-e.r]); add([e.c[0]+e.r,e.c[1]+e.r]) } });
    if(alvo) alvo.forEach(([a,b])=>{ add(a); add(b) }); if(!xs.length){ xs=[-10,100]; ys=[-10,70] }
    if(!tam()) return; const x0=Math.min(...xs), x1=Math.max(...xs), y0=Math.min(...ys), y1=Math.max(...ys), w=Math.max(x1-x0,1), h=Math.max(y1-y0,1);
    view.s=Math.min((W-60)/w,(H-60)/h); view.ox=W/2-(x0+x1)/2*view.s; view.oy=H/2+(y0+y1)/2*view.s; desenha() }

  /* ---------- desafios ---------- */
  const DS=op.desafios||[];
  function carregar(i){ const d=DS[i]; if(!d) return; alvo=d.segs; ents=[]; hist=[]; sel=[]; if(cmd) fim(); LOG.innerHTML='';
    raiz.querySelector('.cad-dsi').innerHTML='<b>'+d.nome+'</b> · '+d.tipo+'<br>'+d.dica; log('Desafio: '+d.nome+'. '+d.inicio,'ok'); const R=raiz.querySelector('.cad-res'); R.textContent=''; R.className='cad-res'; requestAnimationFrame(zoomTudo) }
  function conferir(){ const R=raiz.querySelector('.cad-res'); if(!alvo) return;
    const meus=[]; ents.forEach(e=>segs(e).forEach(s=>meus.push(s))); ents.filter(e=>e.t==='c'||e.t==='a').length&&meus.push([[1e9,1e9],[1e9+1,1e9]]);
    const naReta=(p,[a,b])=>{ const dx=b[0]-a[0], dy=b[1]-a[1], L=Math.hypot(dx,dy); if(L<EPS) return false; const t=((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(L*L); if(t<-1e-6||t>1+1e-6) return false; return Math.abs((p[0]-a[0])*dy-(p[1]-a[1])*dx)/L<TOL };
    const cobre=(lista,s)=>[0,.25,.5,.75,1].every(f=>{ const p=[s[0][0]+f*(s[1][0]-s[0][0]),s[0][1]+f*(s[1][1]-s[0][1])]; return lista.some(m=>naReta(p,m)) });
    const testa=off=>{ const M=meus.map(([a,b])=>[[a[0]+off[0],a[1]+off[1]],[b[0]+off[0],b[1]+off[1]]]); return alvo.every(s=>cobre(M,s))&&M.every(m=>cobre(alvo,m)) };
    let ok=meus.length>0&&testa([0,0]);
    if(!ok&&meus.length){ const bx=l=>[Math.min(...l.flat().map(p=>p[0])),Math.min(...l.flat().map(p=>p[1]))]; const A=bx(alvo), Mb=bx(meus); ok=testa([A[0]-Mb[0],A[1]-Mb[1]]) }
    R.textContent=ok?'✓ Confere! Desenho igual ao da professora.':'✗ Ainda não confere.'; R.className='cad-res '+(ok?'ok':'bad') }

  /* ---------- eventos ---------- */
  IN.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); const v=IN.value; IN.value=''; entrada(v) }
    else if(e.key==='Escape'){ e.preventDefault(); e.stopPropagation(); IN.value=''; cancelar() }
    else if(e.key==='F8'){ e.preventDefault(); alterna('ortho') } else if(e.key==='F3'){ e.preventDefault(); alterna('osnap') } else if(e.key==='F7'){ e.preventDefault(); alterna('grid') } });
  const alterna=k=>{ tog[k]=!tog[k]; raiz.querySelector('[data-t="'+k+'"]').classList.toggle('on',tog[k]); log('<'+k.toUpperCase()+(tog[k]?' on>':' off>')); desenha() };
  raiz.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>alterna(b.dataset.t));
  raiz.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{ const a=b.dataset.a;
    if(a==='enter'){ const v=IN.value; IN.value=''; entrada(v) } else if(a==='esc'){ IN.value=''; cancelar() } else if(a==='u') desfazer(); else if(a==='ze') zoomTudo();
    else if(a==='new'){ if(cmd) fim(); guarda(); ents=[]; cand=[]; log('Desenho limpo. (Desfazer traz de volta.)'); desenha() } else if(a==='ok') conferir() });
  let ptrs=new Map(), arrasto=null, pinca=null;
  const pos=e=>{ const r=cv.getBoundingClientRect(); return [e.clientX-r.left,e.clientY-r.top] };
  cv.addEventListener('pointerdown',e=>{ cv.setPointerCapture(e.pointerId); const p=pos(e); ptrs.set(e.pointerId,p);
    if(ptrs.size===2){ const [a,b]=[...ptrs.values()]; pinca={d:Math.hypot(b[0]-a[0],b[1]-a[1]),m:[(a[0]+b[0])/2,(a[1]+b[1])/2],v:{...view}}; arrasto=null } else arrasto={p,v:{...view},mov:false,btn:e.button} });
  cv.addEventListener('pointermove',e=>{ const p=pos(e); if(ptrs.has(e.pointerId)) ptrs.set(e.pointerId,p);
    if(pinca&&ptrs.size===2){ const [a,b]=[...ptrs.values()], d=Math.hypot(b[0]-a[0],b[1]-a[1]), m=[(a[0]+b[0])/2,(a[1]+b[1])/2], k=d/pinca.d, w=[(pinca.m[0]-pinca.v.ox)/pinca.v.s,(pinca.v.oy-pinca.m[1])/pinca.v.s];
      view.s=Math.max(.02,Math.min(400,pinca.v.s*k)); view.ox=m[0]-w[0]*view.s; view.oy=m[1]+w[1]*view.s; desenha(); return }
    if(arrasto&&(Math.hypot(p[0]-arrasto.p[0],p[1]-arrasto.p[1])>6||arrasto.mov)){ arrasto.mov=true; view.ox=arrasto.v.ox+p[0]-arrasto.p[0]; view.oy=arrasto.v.oy+p[1]-arrasto.p[1] }
    cur=p; curW=toW(p[0],p[1]); snap=acharSnap(p[0],p[1]); const q=pontoCursor(); XY.textContent=fmt(Math.round(q[0]*100)/100)+', '+fmt(Math.round(q[1]*100)/100);
    if(pedido&&pedido.from&&e.pointerType==='mouse'){ const f=pedido.from; DYN.hidden=false; DYN.style.left=(p[0]+18)+'px'; DYN.style.top=(p[1]+18)+'px'; DYN.textContent=fmt(Math.round(dist(f,q)*100)/100)+' < '+fmtA(ang(f,q)) } else DYN.hidden=true;
    desenha() });
  const solta=e=>{ const p=pos(e); ptrs.delete(e.pointerId); if(pinca){ if(ptrs.size<2) pinca=null; arrasto=null; return }
    if(arrasto&&!arrasto.mov&&arrasto.btn===0){ cur=p; curW=toW(p[0],p[1]); snap=acharSnap(p[0],p[1]); clique(p[0],p[1]); if(e.pointerType==='mouse') IN.focus({preventScroll:true}) } arrasto=null };
  cv.addEventListener('pointerup',solta); cv.addEventListener('pointercancel',e=>{ ptrs.delete(e.pointerId); arrasto=null; pinca=null });
  cv.addEventListener('pointerleave',()=>{ cur=null; snap=null; DYN.hidden=true; desenha() });
  cv.addEventListener('wheel',e=>{ e.preventDefault(); const p=pos(e), w=toW(p[0],p[1]), k=e.deltaY<0?1.15:1/1.15; view.s=Math.max(.02,Math.min(400,view.s*k)); view.ox=p[0]-w[0]*view.s; view.oy=p[1]+w[1]*view.s; desenha() },{passive:false});
  cv.addEventListener('dblclick',e=>{ if(e.button===1) zoomTudo() });
  cv.addEventListener('contextmenu',e=>{ e.preventDefault(); const v=IN.value; IN.value=''; entrada(v) });
  addEventListener('resize',()=>desenha());
  if(DS.length){ const S=raiz.querySelector('.cad-ds'); S.innerHTML=DS.map((d,i)=>'<option value="'+i+'">'+(i+1)+'. '+d.nome+'</option>').join(''); S.onchange=()=>carregar(+S.value); carregar(0) }
  else log('Digite um comando e tecle Enter (ex.: L). Enter vazio repete o último comando; Esc cancela.');
  const api={ zoom:zoomTudo, desenha, carregar:i=>{ const S=raiz.querySelector('.cad-ds'); if(S){ S.value=i; carregar(i) } }, executar:linhas=>linhas.forEach(entrada), tela:p=>toS(p), ents:()=>clone(ents) };
  requestAnimationFrame(zoomTudo); return api }

/* ---------- desafios dos slides: contorno como lista de pontos (fechado) ---------- */
function contorno(pts){ const s=[]; for(let i=0;i<pts.length;i++) s.push([pts[i],pts[(i+1)%pts.length]]); return s }
function polar(ini,passos){ const p=[ini]; let c=ini; passos.forEach(([d,a])=>{ c=[c[0]+d*Math.cos(a*RAD),c[1]+d*Math.sin(a*RAD)]; p.push(c) }); return p }
const DESAFIOS=[
  {nome:'Casinha (absolutas)',tipo:'coordenadas absolutas',inicio:'Digite L e comece no ponto 0,0.',dica:'Cada ponto é X,Y medido a partir do 0,0. Slide 4.',segs:contorno([[0,0],[40,0],[40,10],[30,10],[30,30],[20,50],[10,30],[10,10],[0,10]])},
  {nome:'Letra M (absolutas)',tipo:'coordenadas absolutas',inicio:'Ponto inicial 3,1 (Start point). Cada quadradinho do slide vale 1.',dica:'Leia X e Y de cada ponto contando os quadradinhos a partir da origem. Slide 5.',segs:contorno([[3,1],[7,1],[7,2],[6,2],[7,3],[7,5],[6,5],[5,4],[4,5],[3,5],[3,3],[4,2],[3,2]])},
  {nome:'Letra L (absolutas)',tipo:'coordenadas absolutas',inicio:'Ponto inicial 3,1. Cada quadradinho vale 1.',dica:'Slide 6.',segs:contorno([[3,1],[3,6],[4,6],[4,2],[5,2],[6,3],[7,3],[7,1]])},
  {nome:'Peça com rasgo (X=25, Y=15)',tipo:'absolutas ou relativas',inicio:'O canto inferior esquerdo fica em 25,15.',dica:'Some as cotas: o rasgo de cima tem 10 de fundo; a diagonal da direita desce 20 em 20. Slide 7.',segs:contorno([[25,15],[105,15],[105,30],[85,50],[85,65],[70,65],[60,55],[50,55],[40,65],[25,65]])},
  {nome:'Seta de telhado (relativas)',tipo:'coordenadas relativas @x,y',inicio:'Primeiro ponto: clique ou digite 0,0. Depois só @.',dica:'Slide 9: a lista da professora termina em @-140,0 + Enter, mas falta fechar o lado esquerdo: use C (Close).',segs:contorno([[0,0],[50,0],[50,20],[-10,20],[70,50],[150,20],[90,20],[90,0],[140,0],[140,-15],[0,-15]])},
  {nome:'Peça 2.B (relativas)',tipo:'coordenadas relativas @x,y',inicio:'Comece no P1 (0,0) e vá até o P11.',dica:'Slide 10: P1→P2 @50,0 · P2→P3 sobe 20 e anda 15 · o topo está a 50 do chão.',segs:contorno([[0,0],[50,0],[65,20],[65,50],[60,50],[35,20],[15,20],[-10,50],[-15,50],[-15,20]])},
  {nome:'Peixe (polares)',tipo:'coordenadas polares @d<ângulo',inicio:'Comece no P1 (0,0).',dica:'Slide 13: ângulo sempre a partir do eixo X, no sentido anti-horário. 315° = descendo para a direita.',segs:contorno(polar([0,0],[[20,315],[25,0],[10,300],[10,240],[25,180],[20,225],[20,90],[4,0],[5.6,90],[4,180]]))},
  {nome:'Estrela de 6 pontas (polares)',tipo:'coordenadas polares',inicio:'Comece na ponta de baixo (bolinha vermelha), em 0,0. Todos os lados têm 30.',dica:'Slide 18: os ângulos vão alternando 60°, 0°, 120°, 60°, 180°, 120°…',segs:contorno(polar([0,0],[[30,60],[30,0],[30,120],[30,60],[30,180],[30,120],[30,240],[30,180],[30,300],[30,240],[30,0]]))}
];

window.CadSim={montar,DESAFIOS};
})();
