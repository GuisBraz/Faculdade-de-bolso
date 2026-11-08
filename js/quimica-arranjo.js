/* Faculdade de Bolso · Química · arranjo molecular das fichas do laboratório de descobertas.
   Desenha a fórmula estrutural plana, a estrutura de Lewis, a fórmula em bastão, o modelo 3D
   (bola e vareta / preenchimento) e os retículos cristalinos (iônico, metálico e covalente).
   Dados: dados/quimica-estruturas.js (window.FDB_EST). Sem bibliotecas externas. */
(function(){
'use strict';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const CPK={H:'#EDEDED',C:'#4A4F57',N:'#3B5BF0',O:'#E3342B',F:'#86D94C',Cl:'#22B022',Br:'#A62929',I:'#8A1E9A',S:'#E6BE1F',P:'#FF8A1A',B:'#F0A8A8',Si:'#D2AA80',
 Na:'#A95CF0',K:'#8E40D4',Li:'#C77DFF',Cs:'#5E2694',Mg:'#4FBF2A',Ca:'#57C26A',Ba:'#2FAE5A',Sr:'#36C46B',Be:'#B8E04A',Al:'#B9A4A4',Fe:'#DD6A36',Cu:'#C88033',Zn:'#7D80B0',
 Ag:'#BFC4CC',Au:'#F2C21B',Pb:'#5B5E68',Hg:'#AFAFCB',Ti:'#AEB3BA',Ni:'#55C055',Sn:'#6F8A8A',W:'#2C8FD1',Pt:'#C9CBDA',Cr:'#8A99C7',Co:'#EB8AA0',Mn:'#9C7AC7',U:'#1D8BF0',
 Zr:'#7FCFCF',Mo:'#54B5B5',Ga:'#C28F8F',As:'#B57FE0',Cd:'#F2C77E',Te:'#D47A00',He:'#BFF2F2',Ne:'#9FD8F0',Ar:'#78C8DC','*':'#9AA3AD'};
const VDW={H:1.2,C:1.7,N:1.55,O:1.52,F:1.47,Cl:1.75,Br:1.85,I:1.98,S:1.8,P:1.8,B:1.92,Si:2.1,Mg:1.73,He:1.4,Ne:1.54,Ar:1.88,'*':1.2};
const ION={Li:.76,Na:1.02,K:1.38,Cs:1.67,Mg:.72,Ca:1,Ba:1.35,Sr:1.18,Al:.54,Fe:.7,Cu:.73,Zn:.74,Ti:.6,Mn:.53,Sn:.69,U:1,Ni:.69,Ag:1.15,Hg:1.02,Zr:.84,W:.6,Pb:1.19,Cr:.62,Co:.55,Mo:.65,
 NH4:1.48,O:1.4,F:1.33,Cl:1.81,Br:1.96,I:2.2,S:1.84,OH:1.37,S2:1.9};
const TXT={N:'#2F5BD9',O:'#D2352B',S:'#A8780A',Cl:'#1E8F2E',F:'#2E8B3A',Br:'#A12A2A',I:'#7B2A9A',P:'#D96A00',B:'#B4505A',Si:'#9A6A30'};
const NOME={H:'hidrogênio',C:'carbono',N:'nitrogênio',O:'oxigênio',S:'enxofre',P:'fósforo',Cl:'cloro',F:'flúor',Br:'bromo',I:'iodo',B:'boro',Si:'silício'};
const GEO={'2,0':'linear','3,0':'trigonal plana','2,1':'angular','4,0':'tetraédrica','3,1':'piramidal','2,2':'angular','5,0':'bipirâmide trigonal','6,0':'octaédrica','4,1':'gangorra','3,2':'forma de T','4,2':'quadrado planar'};
const SUBD='₀₁₂₃₄₅₆₇₈₉', SUPD='⁰¹²³⁴⁵⁶⁷⁸⁹';
const sub=s=>String(s).replace(/\d/g,d=>SUBD[d]);
const chg=q=>q?((Math.abs(q)>1?String(Math.abs(q)).replace(/\d/g,d=>SUPD[d]):'')+(q>0?'⁺':'⁻')):'';
const nf=(v,d=1)=>Number(v).toLocaleString('pt-BR',{maximumFractionDigits:d});
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim()||'#888';
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
let anim=null; const stop=()=>{ if(anim){ anim.stop(); anim=null } };

/* ================= 2D: estrutural, Lewis e bastão ================= */
function svg2D(A,B,P,mode){ P=P.slice();
  const lewis=mode==='lewis'||mode==='skel-lewis', skel=mode.startsWith('skel');
  const n=A.length, S=n>24?30:38, X=i=>P[2*i]*S, Y=i=>P[2*i+1]*S;
  const nb=A.map(()=>[]); B.forEach(([i,j,o])=>{ nb[i].push(j); nb[j].push(i) });
  // componentes (íons separados)
  const comp=A.map((_,i)=>i); const f=i=>comp[i]===i?i:(comp[i]=f(comp[i])); B.forEach(([i,j])=>{ comp[f(i)]=f(j) });
  const groups={}; A.forEach((_,i)=>(groups[f(i)]=groups[f(i)]||[]).push(i));
  const G0=Object.values(groups); if(G0.length>1){ const ord=G0.map(g=>{ const q=g.reduce((s,i)=>s+A[i][1],0); return {g,q,k:q>0?0:q<0?1:2} }).sort((u,v)=>u.k-v.k);
    let cx=0,cy=0,rowH=0; const maxW=(n>30?16:12); P=P.slice();
    ord.forEach(({g})=>{ let a0=1e9,b0=1e9,a1=-1e9,b1=-1e9; g.forEach(i=>{ a0=Math.min(a0,P[2*i]);a1=Math.max(a1,P[2*i]);b0=Math.min(b0,P[2*i+1]);b1=Math.max(b1,P[2*i+1]) });
      const w=a1-a0, h=b1-b0; if(cx>0&&cx+w>maxW){ cx=0; cy+=rowH+1.9; rowH=0 }
      g.forEach(i=>{ P[2*i]=P[2*i]-a0+cx; P[2*i+1]=P[2*i+1]-b0+cy }); cx+=w+2.1; rowH=Math.max(rowH,h) }) }
  const brack={}; Object.values(groups).forEach(g=>{ const q=g.reduce((s,i)=>s+A[i][1],0); const nonmetal=g.some(i=>TXT[A[i][0]]||A[i][0]==='C'||A[i][0]==='H'); if(lewis&&q&&(g.length>1||(q<0&&nonmetal))) g.forEach(i=>brack[i]=q) });
  const show=i=>{ const [s,q,h]=A[i]; if(!skel) return true; return !(s==='C'&&!q&&nb[i].length>0) };
  const lab=i=>{ const [s,q,h]=A[i]; let t=s==='*'?'':s; if(skel&&h&&s!=='C')t+=h>1?'H'+sub(h):'H'; if(skel&&s==='C'&&!nb[i].length)t+='H'+sub(h); if(skel&&s==='O'&&h===2&&!nb[i].length)t='H₂O'; if(!brack[i]&&q)t+=chg(q); return t };
  const pad=lewis?30:20; let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9; for(let i=0;i<n;i++){ x0=Math.min(x0,X(i));x1=Math.max(x1,X(i));y0=Math.min(y0,Y(i));y1=Math.max(y1,Y(i)) }
  x0-=pad;y0-=pad;x1+=pad;y1+=pad; if(x1-x0<120){const c=(x0+x1)/2;x0=c-60;x1=c+60} if(y1-y0<80){const c=(y0+y1)/2;y0=c-40;y1=c+40}
  let g='';
  // ligações
  B.forEach(([i,j,o])=>{ let ax=X(i),ay=Y(i),bx=X(j),by=Y(j); const L=Math.hypot(bx-ax,by-ay)||1, ux=(bx-ax)/L, uy=(by-ay)/L;
    if(A[i][0]==='*'||A[j][0]==='*'){ g+='<line x1="'+ax+'" y1="'+ay+'" x2="'+bx+'" y2="'+by+'" class="b2 dum"/>'; return }
    const si=show(i)?(lab(i).length>2?13:10):0, sj=show(j)?(lab(j).length>2?13:10):0; ax+=ux*si; ay+=uy*si; bx-=ux*sj; by-=uy*sj;
    const px=-uy, py=ux, offs=o===1?[0]:o===2?[-2.6,2.6]:[-4.2,0,4.2];
    offs.forEach(d=>{ g+='<line x1="'+(ax+px*d).toFixed(1)+'" y1="'+(ay+py*d).toFixed(1)+'" x2="'+(bx+px*d).toFixed(1)+'" y2="'+(by+py*d).toFixed(1)+'" class="b2"/>' }) });
  // pontas de polímero
  A.forEach((a,i)=>{ if(a[0]==='*') g+='<text x="'+X(i)+'" y="'+Y(i)+'" class="lb2 dumt">n</text>' });
  // pares isolados (Lewis)
  if(lewis) A.forEach((a,i)=>{ if(!show(i))return; const np=a[3], rad=(TXT[a[0]]||a[0]==='C'||a[0]==='H')?a[2]:0; if(!np&&!rad)return;
    const used=nb[i].map(j=>Math.atan2(Y(j)-Y(i),X(j)-X(i))); const lp=[]; const w=lab(i).replace(/[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]/g,'').length;
    const cand=[]; for(let k=0;k<24;k++)cand.push(k*Math.PI/12);
    const pick=()=>{ let best=0,bv=-1; cand.forEach(c=>{ const all=used.concat(lp); let m=all.length?Math.min(...all.map(u=>{ let d=Math.abs(c-u)%(2*Math.PI); return d>Math.PI?2*Math.PI-d:d })):9; const hz=Math.abs(Math.cos(c)); m+= (all.length?0:(1-hz)*.01) ; if(m>bv+1e-6){bv=m;best=c} }); lp.push(best); return best };
    const put=(ang,two)=>{ const rx=w>1?17:13, ry=13; const cx=X(i)+Math.cos(ang)*rx, cy=Y(i)+Math.sin(ang)*ry, px=-Math.sin(ang)*3.3, py=Math.cos(ang)*3.3;
      g+=two?'<circle cx="'+(cx+px).toFixed(1)+'" cy="'+(cy+py).toFixed(1)+'" r="1.9" class="lp"/><circle cx="'+(cx-px).toFixed(1)+'" cy="'+(cy-py).toFixed(1)+'" r="1.9" class="lp"/>':'<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="2.2" class="lp rad"/>' };
    if(!used.length&&np===4){ [0,Math.PI/2,Math.PI,3*Math.PI/2].forEach(a=>put(a,true)); return }
    let rx=0,ry=0; used.forEach(u=>{ rx+=Math.cos(u); ry+=Math.sin(u) });
    if(used.length&&Math.hypot(rx,ry)>.3){ const t0=Math.atan2(-ry,-rx), sp=np===1?[0]:np===2?[-1.05,1.05]:np===3?[-1.57,0,1.57]:[-2.2,-.75,.75,2.2];
      const free=c=>used.every(u=>{ let d=Math.abs(c-u)%(2*Math.PI); d=d>Math.PI?2*Math.PI-d:d; return d>.55 });
      sp.forEach(o=>{ const c=t0+o; if(free(c)){ lp.push(c); put(c,true) } else put(pick(),true) }) }
    else for(let k=0;k<np;k++)put(pick(),true);
    for(let k=0;k<rad;k++)put(pick(),false) });
  // rótulos
  A.forEach((a,i)=>{ if(!show(i)||a[0]==='*')return; const t=lab(i), col=TXT[a[0]]?' style="fill:'+TXT[a[0]]+'"':(a[0]==='C'||a[0]==='H'?'':' style="fill:var(--c3)"');
    g+='<text x="'+X(i).toFixed(1)+'" y="'+Y(i).toFixed(1)+'" class="lb2"'+col+'>'+esc(t)+'</text>' });
  // colchetes de íons
  if(lewis) Object.values(groups).forEach(gr=>{ if(brack[gr[0]]===undefined)return; let a=1e9,b=1e9,c=-1e9,d=-1e9; gr.forEach(i=>{ a=Math.min(a,X(i));c=Math.max(c,X(i));b=Math.min(b,Y(i));d=Math.max(d,Y(i)) });
    a-=21;c+=21;b-=21;d+=21; const q=brack[gr[0]];
    g+='<path d="M'+(a+5)+' '+b+'h-5v'+(d-b)+'h5M'+(c-5)+' '+b+'h5v'+(d-b)+'h-5" class="br2"/><text x="'+(c+4)+'" y="'+(b+3)+'" class="lb2 qq">'+chg(q)+'</text>'; if(c+16>x1)x1=c+16; if(a-4<x0)x0=a-4; if(b-6<y0)y0=b-6; if(d+4>y1)y1=d+4 });
  return '<svg class="m2d" viewBox="'+x0.toFixed(0)+' '+y0.toFixed(0)+' '+(x1-x0).toFixed(0)+' '+(y1-y0).toFixed(0)+'" style="max-width:'+Math.min(640,(x1-x0)*1.45).toFixed(0)+'px" role="img">'+g+'</svg>' }

/* ================= 3D: visualizador próprio ================= */
function viewer(cv,M,opt){ const x=cv.getContext('2d'); let yaw=opt.yaw??.5, pitch=opt.pitch??-.25, zoom=1, auto=!RM&&opt.auto!==false, raf=0, dead=false, drag=null, t0=performance.now();
  let R=.5; M.at.forEach(a=>{ R=Math.max(R,Math.hypot(a.x,a.y,a.z)+(a.r||0)) });
  const rot=(p)=>{ const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch); let X=p.x*cy+p.z*sy, Z=-p.x*sy+p.z*cy; let Y=p.y*cp-Z*sp; Z=p.y*sp+Z*cp; return {x:X,y:Y,z:Z} };
  const draw=(now)=>{ if(dead)return; const r=cv.getBoundingClientRect(), d=Math.min(2,devicePixelRatio||1); if(!r.width||document.hidden){ raf=setTimeout(()=>{ raf=requestAnimationFrame(draw) },500); return }
    if(cv.width!==Math.round(r.width*d)||cv.height!==Math.round(r.height*d)){ cv.width=Math.round(r.width*d); cv.height=Math.round(r.height*d) }
    x.setTransform(d,0,0,d,0,0); const W=r.width,H=r.height; x.clearRect(0,0,W,H);
    if(M.tick)M.tick((now-t0)/1000);
    if(auto){ yaw+=.006 }
    const sc=Math.min(W,H)/((M.ann&&opt.ann!==false?3.2:2.3)*R)*zoom, cam=R*5;
    const P=M.at.map(a=>{ const q=rot(a); const k=cam/(cam-q.z); return {sx:W/2+q.x*sc*k, sy:H/2-q.y*sc*k, z:q.z, k, a} });
    const items=[];
    if(M.box) M.box.forEach(([i,j])=>items.push({z:(P[i].z+P[j].z)/2-.001,box:1,i,j}));
    if(opt.sticks!==false) (M.bd||[]).forEach(b=>items.push({z:Math.min(P[b[0]].z,P[b[1]].z)-.002,b}));
    P.forEach((p,i)=>{ if(!(p.a.hide)) items.push({z:p.z,p}) });
    items.sort((u,v)=>u.z-v.z);
    const ink=css('--ink2');
    for(const it of items){
      if(it.box){ const a=P[it.i],b=P[it.j]; x.strokeStyle=ink; x.globalAlpha=.35; x.lineWidth=1; x.setLineDash([4,4]); x.beginPath(); x.moveTo(a.sx,a.sy); x.lineTo(b.sx,b.sy); x.stroke(); x.setLineDash([]); x.globalAlpha=1; continue }
      if(it.b){ const [i,j,o]=it.b, a=P[i], b=P[j]; const dx=b.sx-a.sx, dy=b.sy-a.sy, L=Math.hypot(dx,dy)||1, px=-dy/L, py=dx/L; const w=(opt.bw||.16)*sc*(a.k+b.k)/2;
        const offs=o===2?[-.62,.62]:o===3?[-.95,0,.95]:[0], ww=o>1?w*.55:w;
        offs.forEach(off=>{ const ox=px*off*w, oy=py*off*w, mx=(a.sx+b.sx)/2, my=(a.sy+b.sy)/2;
          [[a,mx,my],[b,mx,my]].forEach(([e,ex,ey])=>{ x.strokeStyle=it.b.c||e.a.col; x.lineWidth=ww; x.lineCap='round'; x.beginPath(); x.moveTo(e.sx+ox,e.sy+oy); x.lineTo(ex+ox,ey+oy); x.stroke();
            x.strokeStyle='rgba(0,0,0,.18)'; x.lineWidth=Math.max(1,ww*.25); x.beginPath(); x.moveTo(e.sx+ox+px*ww*.3,e.sy+oy+py*ww*.3); x.lineTo(ex+ox+px*ww*.3,ey+oy+py*ww*.3); x.stroke() }) }); continue }
      const p=it.p, rr=Math.max(1.5,p.a.r*sc*p.k);
      const gr=x.createRadialGradient(p.sx-rr*.35,p.sy-rr*.35,rr*.08,p.sx,p.sy,rr); gr.addColorStop(0,'#fff'); gr.addColorStop(.3,p.a.col); gr.addColorStop(1,shade(p.a.col,-.45));
      x.globalAlpha=p.a.alpha||1; x.fillStyle=gr; x.beginPath(); x.arc(p.sx,p.sy,rr,0,7); x.fill(); x.globalAlpha=1;
      if(opt.lab&&p.a.lab&&rr>8){ x.fillStyle=lum(p.a.col)>.6?'#13233A':'#fff'; x.font='600 '+Math.min(15,Math.max(9,rr*.75))+'px system-ui,sans-serif'; x.textAlign='center'; x.textBaseline='middle'; x.fillText(p.a.lab,p.sx,p.sy+.5) } }
    if(M.ann&&opt.ann!==false) annot(x,P,M,rot,sc,cam,W,H);
    raf=(auto||M.tick)&&!RM?requestAnimationFrame(draw):0 };
  const go=()=>{ if(!raf&&!dead) raf=requestAnimationFrame(draw) };
  cv.style.touchAction='none';
  cv.onpointerdown=e=>{ drag=[e.clientX,e.clientY]; auto=false; cv.setPointerCapture(e.pointerId) };
  cv.onpointermove=e=>{ if(!drag)return; yaw+=(e.clientX-drag[0])*.01; pitch=Math.max(-1.5,Math.min(1.5,pitch+(e.clientY-drag[1])*.01)); drag=[e.clientX,e.clientY]; raf||draw(performance.now()) };
  cv.onpointerup=cv.onpointercancel=()=>{ drag=null };
  cv.onwheel=e=>{ e.preventDefault(); zoom=Math.max(.5,Math.min(3,zoom*(e.deltaY>0?.9:1.1))); raf||draw(performance.now()) };
  draw(performance.now());
  return { stop(){ dead=true; cancelAnimationFrame(raf) }, set(o){ Object.assign(opt,o); raf||draw(performance.now()) }, spin(v){ auto=v&&!RM; go() }, zoom(f){ zoom=Math.max(.5,Math.min(3,zoom*f)); raf||draw(performance.now()) }, redraw(){ raf||draw(performance.now()) } } }
function shade(h,f){ const n=parseInt(h.slice(1),16); let r=n>>16,g=n>>8&255,b=n&255; const t=f<0?0:255,p=Math.abs(f); r=Math.round((t-r)*p+r); g=Math.round((t-g)*p+g); b=Math.round((t-b)*p+b); return 'rgb('+r+','+g+','+b+')' }
function lum(h){ const n=parseInt(h.slice(1),16); return ((n>>16)*.299+(n>>8&255)*.587+(n&255)*.114)/255 }
function annot(x,P,M,rot,sc,cam,W,H){ const N=M.ann, at=M.at, c1=css('--c1');
  const proj=v=>{ const q=rot(v); const k=cam/(cam-q.z); return [W/2+q.x*sc*k,H/2-q.y*sc*k] };
  let lin=null; x.save(); x.font='700 13px system-ui,sans-serif'; x.textAlign='center'; x.textBaseline='middle';
  const tag=(t,px,py)=>{ const w=x.measureText(t).width+10; x.fillStyle=css('--sheet'); x.globalAlpha=.88; x.fillRect(px-w/2,py-10,w,20); x.globalAlpha=1; x.strokeStyle=c1; x.lineWidth=1; x.strokeRect(px-w/2,py-10,w,20); x.fillStyle=c1; x.fillText(t,px,py) };
  if(N.a.length===3&&N.g!=null){ const [i,c,j]=N.a, C=at[c], I=at[i], J=at[j]; const u=norm(sub3(I,C)), v=norm(sub3(J,C)); const rad=Math.min(len(sub3(I,C)),len(sub3(J,C)))*.5;
    const om=Math.acos(Math.max(-1,Math.min(1,dot(u,v)))); x.strokeStyle=c1; x.lineWidth=2; x.setLineDash([4,3]); x.beginPath();
    let perp=null; if(om>3.1){ perp=norm(cross(u,{x:0,y:0,z:1})); if(len(cross(u,{x:0,y:0,z:1}))<.1)perp=norm(cross(u,{x:0,y:1,z:0})); lin=perp }
    for(let s=0;s<=24;s++){ const t=s/24; let d; if(perp){ const a=t*Math.PI; d=add3(scale3(u,Math.cos(a)),scale3(perp,Math.sin(a))) } else { const a=om*t; d=add3(scale3(u,Math.sin(om-a)/Math.sin(om)),scale3(v,Math.sin(a)/Math.sin(om))) }
      const [px,py]=proj(add3(C,scale3(d,rad))); s?x.lineTo(px,py):x.moveTo(px,py) } x.stroke(); x.setLineDash([]);
    let mid=perp?perp:norm(add3(u,v)); const [tx,ty]=proj(add3(C,scale3(mid,rad*1.75))); tag(nf(N.g)+'°',tx,ty) }
  const [a0,b0]=N.a.length===3?[N.a[1],N.a[0]]:[N.a[0],N.a[1]]; const A0=at[a0],B0=at[b0]; const m=scale3(add3(A0,B0),.5);
  let off=norm(cross(sub3(B0,A0),{x:0,y:0,z:1})); if(N.a.length===3){ const cen=at[N.a[1]], other=at[N.a[2]]; const o2=norm(sub3(sub3(B0,cen),scale3(norm(sub3(other,cen)),0))); off=norm(cross(cross(sub3(B0,A0),sub3(other,A0)),sub3(B0,A0))); if(dot(off,sub3(other,A0))>0)off=scale3(off,-1) }
  if(lin)off=scale3(lin,-1); if(len(off)<.1||isNaN(off.x))off={x:0,y:1,z:0};
  const [lx,ly]=proj(add3(m,scale3(off,1.05))); const [p1x,p1y]=proj(A0),[p2x,p2y]=proj(B0); const [m1x,m1y]=proj(m);
  x.strokeStyle=c1; x.lineWidth=1.2; x.beginPath(); x.moveTo(m1x,m1y); x.lineTo(lx,ly); x.stroke(); tag(nf(N.l)+' pm',lx,ly);
  x.restore() }
const sub3=(a,b)=>({x:a.x-b.x,y:a.y-b.y,z:a.z-b.z}), add3=(a,b)=>({x:a.x+b.x,y:a.y+b.y,z:a.z+b.z}), scale3=(a,k)=>({x:a.x*k,y:a.y*k,z:a.z*k}), dot=(a,b)=>a.x*b.x+a.y*b.y+a.z*b.z,
  cross=(a,b)=>({x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x}), len=a=>Math.hypot(a.x,a.y,a.z), norm=a=>{ const l=len(a)||1; return scale3(a,1/l) };

/* ================= modelos 3D ================= */
function molModel(E,fill){ const X=E.X; const at=E.A.map((a,i)=>({x:X[3*i],y:X[3*i+1],z:X[3*i+2],col:CPK[a[0]]||'#C0C0C0',lab:a[0]==='*'?'':a[0],hide:a[0]==='*',
  r:fill?(VDW[a[0]]||2):(a[0]==='H'?.25:Math.min(.42,.22+(VDW[a[0]]||2)*.09))}));
  return {at,bd:fill?[]:E.B.filter(b=>E.A[b[0]][0]!=='*'&&E.A[b[1]][0]!=='*'),ann:fill?null:(E.N?{...E.N}:null)} }
const CUBE=[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[1,5],[2,6],[3,7]];
function cubeBox(at,h){ const s=at.length; for(let i=0;i<8;i++)at.push({x:(i&1?h:-h),y:(i&2?h:-h),z:(i&4?h:-h),r:0,hide:true,col:'#000'}); return CUBE.map(([a,b])=>[s+a,s+b]) }
function fcc(){ const p=[]; for(let i=0;i<8;i++)p.push([i&1,i>>1&1,i>>2&1]); [[.5,.5,0],[.5,.5,1],[.5,0,.5],[.5,1,.5],[0,.5,.5],[1,.5,.5]].forEach(q=>p.push(q)); return p }
function bondsByDist(at,dmax,dmin=0,filt){ const b=[]; for(let i=0;i<at.length;i++)for(let j=i+1;j<at.length;j++){ if(at[i].hide||at[j].hide)continue; if(filt&&!filt(at[i],at[j]))continue; const d=Math.hypot(at[i].x-at[j].x,at[i].y-at[j].y,at[i].z-at[j].z); if(d<dmax&&d>dmin)b.push([i,j,1]) } return b }
const ionLab=(s,q)=>sub(s)+chg(q);
function ions(E){ const F=(E.F||[]).filter(f=>f[0]!=='H2O'); return {cat:F.filter(f=>f[1]>0),an:F.filter(f=>f[1]<0),agua:(E.F||[]).filter(f=>f[0]==='H2O').reduce((s,f)=>s+f[2],0)} }
function sprite(at,bd,lab,q,x,y,z,rad,open){ // íon (simples ou poliatômico)
  const m=lab.match(/^([A-Z][a-z]?)/), el=lab==='NH4'?'N':lab==='OH'?'O':lab==='HCO3'?'C':m?m[1]:'C';
  const r=(ION[lab]||ION[el]||1.6)*rad;
  if(!open||/^[A-Z][a-z]?$/.test(lab)||lab.length>9){ at.push({x,y,z,r,col:CPK[el]||'#9AA3AD',lab:lab.length>5?'':ionLab(lab,q),ion:lab}); return }
  // poliatômico: centro + vizinhos
  const c=at.length; at.push({x,y,z,r:.075,col:CPK[el]||'#999',lab:'',ion:lab});
  const lig=lab==='NH4'?['H',4]:lab==='OH'?['H',1]:(()=>{ const k=lab.match(/O(\d?)/); return ['O',k?(+k[1]||1):0] })(); let n=Math.min(4,lig[1]);
  if(/^(N3|C2|S2)$/.test(lab)){ const e=lab[0]==='S'?'S':lab[0]; [-1,1].forEach(s=>{ at.push({x:x+s*.13,y,z,r:.07,col:CPK[e],lab:''}); bd.push([c,at.length-1,1]) }); at[c].hide=lab!=='N3'; return }
  const D=n===1?[[1,0,0]]:n===2?[[.8,.6,0],[-.8,.6,0]]:n===3?[[1,0,0],[-.5,.87,0],[-.5,-.87,0]]:[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]].map(v=>v.map(t=>t/1.732));
  D.forEach(v=>{ at.push({x:x+v[0]*.15,y:y+v[1]*.15,z:z+v[2]*.15,r:lig[0]==='H'?.04:.06,col:CPK[lig[0]],lab:''}); bd.push([c,at.length-1,1]) }) }

function lattice(E,a,kind,open){ const at=[],bd=[]; let box=null, tick=null; const els=Object.keys(a.c);
  const I=ions(E); const fc=I.cat.reduce((s,f)=>s+f[2],0), fa=I.an.reduce((s,f)=>s+f[2],0);
  const pickW=(L,s)=>{ const tot=L.reduce((t,f)=>t+f[2],0); let k=(s*0.6180339)%1*tot; for(const f of L){ if(k<f[2])return f; k-=f[2] } return L[0] };
  const ra=I.an.length?(ION[I.an[0][0]]||1.6):1.4, rc=I.cat.length?(ION[I.cat[0][0]]||1):1, fit=.5/(ra+rc), sc=open?fit*.42:fit;
  const ionAt=(f,x,y,z)=>sprite(at,bd,f[0],f[1],x,y,z,sc,open);
  if(kind==='nacl'||kind==='gen'||kind==='sol'){ const N=kind==='nacl'?3:3, h=(N-1)/2, frac=fc/(fc+fa); let ce=0,ae=0;
    const sites=[]; for(let i=0;i<N;i++)for(let j=0;j<N;j++)for(let k=0;k<N;k++)sites.push([i,j,k]);
    sites.forEach(([i,j,k],s)=>{ const even=(i+j+k)%2===0; let isC;
      if(kind==='nacl')isC=even; else if(frac<=.5){ if(even){ ce++; isC=Math.floor(ce*2*frac)>Math.floor((ce-1)*2*frac) } else isC=false } else { if(!even){ ae++; isC=!(Math.floor(ae*2*(1-frac))>Math.floor((ae-1)*2*(1-frac))) } else isC=true }
      let x=(i-h)*.5,y=(j-h)*.5,z=(k-h)*.5; if(kind==='sol'){ x+=Math.sin(s*7.1)*.12; y+=Math.cos(s*3.3)*.12; z+=Math.sin(s*5.7)*.12 }
      ionAt(isC?pickW(I.cat,s):pickW(I.an,s),x,y,z) });
    if(kind==='nacl'&&open)bd.push(...bondsByDist(at,.55,.4,(p,q)=>p.ion!==q.ion&&!!p.ion&&!!q.ion));
    if(kind!=='sol')box=cubeBox(at,h*.5);
    if(kind==='sol'){ const base=at.map(p=>({...p})); for(let w=0;w<10;w++){ const x=Math.sin(w*2.3)*.55,y=Math.cos(w*1.7)*.55,z=Math.sin(w*4.1)*.55; at.push({x,y,z,r:.09,col:CPK.O,lab:''},{x:x+.1,y:y+.06,z,r:.055,col:CPK.H,lab:''},{x:x-.1,y:y+.06,z,r:.055,col:CPK.H,lab:''}); base.push(...at.slice(-3).map(p=>({...p}))); bd.push([at.length-3,at.length-2,1],[at.length-3,at.length-1,1]) }
      tick=t=>{ at.forEach((p,i)=>{ const b=base[i], g=Math.floor(i/1); p.x=b.x+Math.sin(t*.9+g*1.3)*.04; p.y=b.y+Math.cos(t*.8+g*2.1)*.04; p.z=b.z+Math.sin(t*.7+g*.7)*.04 }) } }
  } else if(kind==='cscl'){ for(let i=0;i<8;i++)ionAt(I.an[0],(i&1?.5:-.5),(i&2?.5:-.5),(i&4?.5:-.5)); ionAt(I.cat[0],0,0,0); box=cubeBox(at,.5);
    if(open)for(let i=0;i<8;i++)bd.push([at.length-1,i,1]);
  } else if(kind==='fluorita'||kind==='zns'){ const anti=fc>fa; const big=kind==='zns'?null:(anti?I.cat:I.an), fccT=kind==='zns'?I.cat:(anti?I.an:I.cat);
    const fs=fcc(); fs.forEach((p,s)=>ionAt(pickW(fccT,s),p[0]-.5,p[1]-.5,p[2]-.5)); const nF=at.length;
    const T=kind==='zns'?[[.25,.25,.25],[.75,.75,.25],[.75,.25,.75],[.25,.75,.75]]:[[.25,.25,.25],[.75,.25,.25],[.25,.75,.25],[.75,.75,.25],[.25,.25,.75],[.75,.25,.75],[.25,.75,.75],[.75,.75,.75]];
    const L=kind==='zns'?I.an:big; T.forEach((p,s)=>{ const k=at.length; ionAt(pickW(L,s),p[0]-.5,p[1]-.5,p[2]-.5); for(let j=0;j<nF;j++){ const d=Math.hypot(at[j].x-at[k].x,at[j].y-at[k].y,at[j].z-at[k].z); if(d<.45&&(open||kind==='zns'))bd.push([k,j,1]) } });
    box=cubeBox(at,.5);
  } else if(kind==='rutilo'){ const c=.64,u=.305; const M=[[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1],[1,0,1],[0,1,1],[1,1,1],[.5,.5,.5]], O=[[u,u,0],[1-u,1-u,0],[u,u,1],[1-u,1-u,1],[.5+u,.5-u,.5],[.5-u,.5+u,.5]];
    M.forEach(p=>ionAt(I.cat[0],p[0]-.5,(p[2]-.5)*c,p[1]-.5)); const nM=at.length; O.forEach(p=>ionAt(I.an[0],p[0]-.5,(p[2]-.5)*c,p[1]-.5));
    if(open)for(let i=0;i<nM;i++)for(let j=nM;j<at.length;j++){ const d=Math.hypot(at[i].x-at[j].x,at[i].y-at[j].y,at[i].z-at[j].z); if(d<.47)bd.push([i,j,1]) }
    const s=at.length; [[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]].forEach(([x0,z0])=>[-c/2,c/2].forEach(y0=>at.push({x:x0,y:y0,z:z0,r:0,hide:true,col:'#000'}))); box=[[0,2],[2,4],[4,6],[6,0],[1,3],[3,5],[5,7],[7,1],[0,1],[2,3],[4,5],[6,7]].map(([p,q])=>[s+p,s+q]);
  } else if(kind==='camadas'){ const hx=[]; for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++)hx.push([i*.5+j*.25,j*.433]);
    const c2=I.cat.length>1?I.cat[0]:null, cM=I.cat.length>1?I.cat[1]:I.cat[0];
    [-.55,.55].forEach((z0,L)=>{ hx.forEach(([x,y])=>ionAt(I.an[0],x,z0-.18,y)); hx.forEach(([x,y])=>ionAt(I.an[0],x+.25,z0+.18,y+.144)); hx.forEach(([x,y],s)=>{ if((s+L)%(Math.ceil(fc/(fa||1)*2)||1)===0||fc>=fa/2) ionAt(cM,x+.125,z0,y+.072) }) });
    if(c2) hx.forEach(([x,y])=>ionAt(c2,x,0,y));
  } else if(kind==='bcc'||kind==='fcc'||kind==='hcp'||kind==='liq'||kind==='cplx'||kind==='mar'){ const el=els[0], col=CPK[el]||'#B0B0B0';
    const rr=kind==='fcc'?.354:kind==='bcc'?.433:.5; const R=open?rr*.55:rr; let pos=[];
    if(kind==='fcc')pos=fcc().map(p=>[p[0]-.5,p[1]-.5,p[2]-.5]);
    else if(kind==='bcc'||kind==='cplx'){ for(let i=0;i<8;i++)pos.push([(i&1)-.5,(i>>1&1)-.5,(i>>2&1)-.5]); pos.push([0,0,0]) }
    else if(kind==='hcp'){ const c=.816; for(let k=0;k<6;k++){ const a=k*Math.PI/3; pos.push([Math.cos(a),-c,Math.sin(a)],[Math.cos(a),c,Math.sin(a)]) } pos.push([0,-c,0],[0,c,0]); for(let k=0;k<3;k++){ const a=k*2*Math.PI/3+Math.PI/6; pos.push([Math.cos(a)*.577,0,Math.sin(a)*.577]) } pos=pos.map(p=>p.map(v=>v*.5)) }
    else if(kind==='liq'){ for(let s=0;s<38;s++){ const u=(s*0.618)%1, v=(s*0.381+.2)%1, w=Math.cbrt((s+1)/38); const th=u*6.283, ph=Math.acos(2*v-1); pos.push([Math.sin(ph)*Math.cos(th)*w*.85,Math.cos(ph)*w*.85,Math.sin(ph)*Math.sin(th)*w*.85]) } }
    else if(kind==='mar'){ for(let i=0;i<4;i++)for(let j=0;j<3;j++)for(let k=0;k<2;k++)pos.push([(i-1.5)*.42,(j-1)*.42,(k-.5)*.42]) }
    pos.forEach(p=>at.push({x:p[0],y:p[1],z:p[2],r:kind==='mar'?.13:kind==='liq'?.15:R,col,lab:kind==='mar'?el+'⁺':el}));
    if(kind==='cplx'&&els.length>1){ const m=els[1]; [[0,0,-.5],[0,-.5,0],[-.5,0,0]].forEach(p=>at.push({x:p[0],y:p[1],z:p[2],r:.12,col:CPK[m],lab:m})) }
    if(kind==='fcc'||kind==='bcc'||kind==='cplx')box=cubeBox(at,.5);
    if(kind==='hcp'){ box=[]; for(let k=0;k<6;k++){ box.push([2*k,2*((k+1)%6)],[2*k+1,2*((k+1)%6)+1],[2*k,2*k+1]) } }
    if(kind==='liq'||kind==='mar'){ const base=at.map(p=>({...p})); const ne=kind==='mar'?34:0; for(let e=0;e<ne;e++){ at.push({x:0,y:0,z:0,r:.045,col:'#2FA8FF',lab:'',e:[Math.sin(e*12.9898)*43758.5453%1,e*0.737%1,e*0.413%1]}) }
      tick=t=>{ at.forEach((p,i)=>{ if(p.e){ const [a1,a2,a3]=p.e.map(v=>Math.abs(v)); p.x=Math.sin(t*(.5+a1)+a2*20)*.72; p.y=Math.sin(t*(.4+a2)+a3*20)*.45; p.z=Math.sin(t*(.6+a3)+a1*20)*.22; return } const b=base[i]; if(kind==='liq'){ p.x=b.x+Math.sin(t*1.3+i)*.05; p.y=b.y+Math.cos(t*1.1+i*1.7)*.05; p.z=b.z+Math.sin(t*.9+i*.6)*.05 } else { p.x=b.x+Math.sin(t*6+i)*.008 } }) } }
  } else if(kind==='diamante'||kind==='sio2'){ const el=els.includes('Si')?'Si':'C'; const pts=fcc().concat([[.25,.25,.25],[.75,.75,.25],[.75,.25,.75],[.25,.75,.75]]).map(p=>[p[0]-.5,p[1]-.5,p[2]-.5]);
    pts.forEach(p=>at.push({x:p[0],y:p[1],z:p[2],r:open?.09:.2,col:CPK[el],lab:el}));
    const bb=bondsByDist(at,.45); if(kind==='sio2'){ bb.forEach(([i,j])=>{ at.push({x:(at[i].x+at[j].x)/2,y:(at[i].y+at[j].y)/2,z:(at[i].z+at[j].z)/2,r:open?.075:.17,col:CPK.O,lab:'O'}); bd.push([i,at.length-1,1],[j,at.length-1,1]) }) } else bd.push(...bb);
    box=cubeBox(at,.5);
  } else if(kind==='grafite'||kind==='bn'){ const b=.28;
    const lay=[[-.42,0],[0,b],[.42,0]];
    // corrige vizinhos do favo: hexágono real
    const hexes=[]; const a0=b; for(let q=-3;q<=3;q++)for(let r=-3;r<=3;r++){ const cx=a0*1.5*q, cz=a0*1.732*(r+q/2); if(Math.hypot(cx,cz)<.75)hexes.push([cx,cz]) }
    lay.forEach(([y,sh],L)=>{ const map=new Map(); const key=(x,z)=>Math.round(x*1000)+','+Math.round(z*1000); const idx=(x,z,t)=>{ const k=key(x,z); if(!map.has(k)){ const e=kind==='bn'?(((t+L)%2)?'N':'B'):'C'; at.push({x:x+(L===1?a0:0),y,z,r:open?.07:.13,col:CPK[e],lab:''}); map.set(k,at.length-1) } return map.get(k) };
      hexes.forEach(([cx,cz])=>{ const v=[]; for(let k=0;k<6;k++){ const an=k*Math.PI/3; v.push(idx(cx+a0*Math.cos(an),cz+a0*Math.sin(an),k%2)) } for(let k=0;k<6;k++){ const p=v[k],q=v[(k+1)%6]; if(!bd.some(d=>(d[0]===p&&d[1]===q)||(d[0]===q&&d[1]===p)))bd.push([p,q,1]) } }) });
  } else if(kind==='silicato'||kind==='vidro'){ const met=els.filter(e=>!['Si','O','H'].includes(e)); const tet=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]].map(v=>v.map(t=>t/1.732));
    const C=kind==='vidro'?[[-.45,.2,-.3],[.1,-.35,.2],[.5,.25,-.1],[-.2,.45,.45],[.35,-.1,-.5],[-.5,-.4,.35],[.15,.5,-.45]]:[[-.4,-.4,-.4],[.4,-.4,-.4],[-.4,.4,-.4],[.4,.4,-.4],[-.4,-.4,.4],[.4,-.4,.4],[-.4,.4,.4],[.4,.4,.4]];
    C.forEach((c,s)=>{ const k=at.length; at.push({x:c[0],y:c[1],z:c[2],r:.08,col:CPK.Si,lab:''}); const ang=kind==='vidro'?s*1.7:0; tet.forEach(v=>{ const x=v[0]*Math.cos(ang)-v[2]*Math.sin(ang), z=v[0]*Math.sin(ang)+v[2]*Math.cos(ang); at.push({x:c[0]+x*.2,y:c[1]+v[1]*.2,z:c[2]+z*.2,r:.085,col:CPK.O,lab:''}); bd.push([k,at.length-1,1]) }) });
    const M=kind==='vidro'?[[0,0,0],[-.1,.1,-.55],[.55,-.45,.4],[-.55,.5,-.2]]:[[0,0,0],[0,0,-.4],[0,0,.4],[-.4,0,0],[.4,0,0]];
    M.forEach((p,s)=>{ const e=met.length?met[s%met.length]:'Na'; at.push({x:p[0],y:p[1],z:p[2],r:.13,col:CPK[e]||'#B0B0B0',lab:e}) }); if(kind==='silicato')box=cubeBox(at,.62);
  } else if(kind==='rnacl'||kind==='rzns'||kind==='rgen'){ const [e1,e2]=els; const f1=[e1,1,1], f2=[e2,-1,1];
    if(kind==='rnacl'){ for(let i=0;i<3;i++)for(let j=0;j<3;j++)for(let k=0;k<3;k++){ const e=(i+j+k)%2?e2:e1; at.push({x:(i-1)*.5,y:(j-1)*.5,z:(k-1)*.5,r:open?.1:.24,col:CPK[e],lab:e}) } box=cubeBox(at,.5); bd.push(...bondsByDist(at,.55,.1,(p,q)=>p.lab!==q.lab)) }
    else { fcc().forEach(p=>at.push({x:p[0]-.5,y:p[1]-.5,z:p[2]-.5,r:open?.1:.2,col:CPK[e1],lab:e1})); [[.25,.25,.25],[.75,.75,.25],[.75,.25,.75],[.25,.75,.75]].forEach(p=>at.push({x:p[0]-.5,y:p[1]-.5,z:p[2]-.5,r:open?.1:.2,col:CPK[e2],lab:e2})); bd.push(...bondsByDist(at,.45,.1,(p,q)=>p.lab!==q.lab)); box=cubeBox(at,.5) } }
  return {at,bd,box,tick} }

/* ================= textos ================= */
const LTXT={
 nacl:'Retículo cúbico tipo sal-gema: cada cátion fica cercado por 6 ânions e cada ânion por 6 cátions, alternando nas três direções.',
 cscl:'Tipo cloreto de césio: um íon no centro do cubo cercado por 8 íons de sinal oposto nos vértices.',
 fluorita:'Tipo fluorita: cátions nos vértices e no centro das faces do cubo; os ânions ocupam os 8 “buracos” internos, cada um cercado por 4 cátions.',
 antifluorita:'Tipo antifluorita: o inverso da fluorita. Os ânions O²⁻ ficam nos vértices e faces do cubo e os cátions nos 8 “buracos” internos.',
 zns:'Tipo blenda (ZnS): cada íon fica ligado a 4 vizinhos de sinal oposto, num tetraedro. É o mesmo desenho do diamante, alternando os dois tipos.',
 rutilo:'Tipo rutilo: cada metal fica no centro de um octaedro de 6 oxigênios, e cada oxigênio é compartilhado por 3 metais.',
 camadas:'Estrutura em camadas: lâminas de cátions presas entre duas camadas de ânions, empilhadas. As lâminas seguram firme por dentro mas se separam fácil entre si.',
 gen:'Retículo iônico (esquema): cátions e ânions se alternam numa rede 3D, presos pela atração elétrica entre cargas opostas. A célula real desta substância é mais complexa; o desenho mostra a ideia e a proporção entre os íons.',
 sol:'Não é um sólido: em água, a amônia captura um H⁺ da água e forma íons NH₄⁺ e OH⁻ soltos, nadando entre as moléculas de água (as pequenas, vermelhas e brancas).',
 bcc:'Cúbico de corpo centrado (CCC): um átomo em cada vértice do cubo e um no centro. Cada átomo toca 8 vizinhos e o empacotamento ocupa 68 % do espaço.',
 fcc:'Cúbico de face centrada (CFC): átomos nos vértices e no centro de cada face. Cada átomo toca 12 vizinhos, o empacotamento mais denso possível (74 %). Metais CFC costumam ser bem maleáveis.',
 hcp:'Hexagonal compacto (HC): camadas de esferas empilhadas no padrão ABAB. Também tem 12 vizinhos e 74 % do espaço ocupado, mas desliza em menos direções que o CFC.',
 liq:'O mercúrio é líquido a 25 °C: os átomos continuam colados, mas sem posição fixa. Eles deslizam uns sobre os outros o tempo todo.',
 cplx:'A célula cristalina real tem muitos átomos e uma forma complicada. O desenho mostra a ideia geral: átomos metálicos bem empacotados, presos pela ligação metálica.',
 mar:'Ligação metálica: cada átomo libera seus elétrons de valência, que ficam livres circulando entre os cátions (o “mar de elétrons”, pontinhos azuis). Por isso metais conduzem eletricidade e calor, brilham e podem ser martelados sem quebrar.',
 diamante:'Rede covalente: cada átomo faz 4 ligações covalentes em tetraedro, e a rede segue em todas as direções sem fim.',
 grafite:'Camadas planas de hexágonos: cada carbono liga 3 vizinhos e sobra 1 elétron livre, que conduz eletricidade. Entre as camadas só há forças fracas, por isso elas deslizam: é o que deixa o traço no papel.',
 bn:'Nitreto de boro hexagonal: o mesmo favo de mel do grafite, mas alternando B e N. Por ser branco e escorregadio é chamado de “grafite branco”.',
 sio2:'Rede covalente: cada Si se liga a 4 O em tetraedro e cada O faz ponte entre 2 Si. SiO₂ não é uma molécula: é a proporção 1 Si : 2 O de uma rede gigante.',
 silicato:'O bloco de construção de todo silicato é o tetraedro SiO₄ (Si no centro, 4 O nos vértices). Os tetraedros ficam soltos, em cadeias, em folhas ou em redes 3D, e os cátions metálicos preenchem os espaços entre eles.',
 vidro:'Vidro é amorfo: os tetraedros SiO₄ se ligam sem ordem de longo alcance, como um “líquido congelado”. Na⁺ e Ca²⁺ ficam espalhados nos espaços e baixam o ponto de fusão.',
 rnacl:'Rede tipo sal-gema, mas com ligações com forte caráter covalente e metálico: cada átomo cercado por 6 do outro tipo. Resultado: um dos materiais mais duros que existem.',
 rzns:'Rede covalente tipo blenda: cada átomo ligado a 4 do outro elemento em tetraedro, como o diamante. É a estrutura típica dos semicondutores.',
 rgen:'Rede covalente (esquema): os átomos ficam presos uns aos outros por ligações covalentes fortes em todas as direções; não existe molécula isolada. O desenho simplifica a célula real.'};

/* ================= fórmulas ================= */
function gcdA(v){ const g=(a,b)=>b?g(b,a%b):a; return v.reduce(g) }
function fStr(c,div){ return Object.entries(c).map(([e,n])=>e+(n/div>1?sub(n/div):'')).join('') }
function formulas(E,a){ const c=a.c, v=Object.values(c), g=gcdA(v), t=E?E.t:'m';
  const orig=sub(a.f), mol=t==='m'?fStr(c,1):orig, min=g>1?fStr(c,g):(t==='m'?fStr(c,1):orig);
  let nota;
  if(Object.keys(c).length===1&&t!=='m') nota='Substância simples: um único elemento. '+(t==='a'?'Gás nobre: os átomos ficam soltos, sem formar moléculas.':'Não existe molécula: a fórmula mostra só o elemento.');
  else if(t==='m') nota=g>1?'Divida tudo pelo MDC = '+g+' → '+min+'. A fórmula molecular conta os átomos de <b>uma molécula</b>; a mínima mostra só a <b>proporção</b> (a molécula tem '+g+' × a fórmula mínima).':'O MDC dos índices é 1: a fórmula molecular já é a menor proporção possível, então mínima = molecular.';
  else nota='Em sólidos iônicos e redes não existe molécula isolada: a fórmula já é a <b>proporção</b> entre os átomos/íons (fórmula unitária)'+(g>1?'. Simplificando pelo MDC = '+g+': '+min+'.':', ou seja, já é a fórmula mínima.');
  return '<div class="frm"><div><span>Molecular'+(t==='m'?'':' / unitária')+'</span><b>'+mol+'</b></div><div><span>Mínima (empírica)</span><b>'+min+'</b></div><p>'+nota+'</p></div>' }

/* ================= ficha: aba do arranjo ================= */
function contaLig(E){ let s=0,d=0,t=0; E.B.forEach(b=>{ if(E.A[b[0]][0]==='*'||E.A[b[1]][0]==='*')return; b[2]===1?s++:b[2]===2?d++:t++ }); const lp=E.A.reduce((x,a)=>x+a[3],0); return {s,d,t,lp} }
function geoTxt(E){ if(!E.G||!E.G.length)return ''; return E.G.map(([i,nb,lp])=>{ const g=GEO[nb+','+lp]; const s=E.A[i][0]; return '<li>'+(NOME[s]?'No '+NOME[s]:'No '+s)+(E.G.length>1?' (átomo '+(E.G.indexOf(E.G.find(q=>q[0]===i))+1)+')':'')+': '+nb+(nb>1?' ligações':' ligação')+' + '+lp+' par'+(lp!==1?'es':'')+' isolado'+(lp!==1?'s':'')+(g?' → geometria <b>'+g+'</b>':'')+'</li>' }).join('') }

function render(box,a){ stop(); const E=(window.FDB_EST||{})[a.n+'|'+a.f];
  if(!E){ box.innerHTML='<p class="vcap">Estrutura ainda não disponível para esta substância.</p>'; return }
  const tabs=[];
  if(E.t==='m'){
    if(E.P){ tabs.push(['est','Estrutural plana']); tabs.push(['lewis','Lewis']) } else { tabs.push(['skel','Estrutural (bastão)']); tabs.push(['skel-lewis','Lewis']) }
    if(E.S&&E.P) tabs.push(['skel','Bastão']);
    if(E.X){ tabs.push(['bv','3D bola e vareta']); tabs.push(['pe','3D preenchimento']) } }
  else if(E.t==='i'){ tabs.push(['ions','Íons (Lewis)']); tabs.push(['lat','Retículo 3D']) }
  else if(E.t==='met'){ tabs.push(['lat','Retículo 3D']); tabs.push(['mar','Mar de elétrons']) }
  else if(E.t==='rede'){ tabs.push(['lat','Retículo 3D']) }
  else if(E.t==='a'){ tabs.push(['lewis','Lewis']); tabs.push(['pe','3D']) }
  box.innerHTML='<h4 style="margin:16px 0 6px">🧩 Arranjo '+(E.t==='m'?'molecular':E.t==='a'?'do átomo':'cristalino')+'</h4>'+formulas(E,a)+
    '<div class="vtab" role="tablist">'+tabs.map((t,i)=>'<button role="tab" data-v="'+t[0]+'" class="'+(i?'':'on')+'">'+t[1]+'</button>').join('')+'</div><div class="vbox"></div>';
  const vb=box.querySelector('.vbox');
  const show=v=>{ stop(); box.querySelectorAll('.vtab button').forEach(b=>b.classList.toggle('on',b.dataset.v===v)); vb.innerHTML=''; view(vb,E,a,v) };
  box.querySelectorAll('.vtab button').forEach(b=>b.onclick=()=>show(b.dataset.v)); show(tabs[0][0]) }

function legendIons(E){ const I=ions(E); const L=I.cat.concat(I.an); const lab=f=>ionLab(f[0],f[1]); const cnt=f=>(f[2]>1?f[2]+' ':'');
  return '<div class="ileg">'+L.map(f=>{ const m=f[0].match(/^([A-Z][a-z]?)/); const el=f[0]==='NH4'?'N':f[0]==='OH'?'O':f[0]==='HCO3'?'C':m?m[1]:'C'; return '<span><i style="background:'+(CPK[el]||'#999')+'"></i>'+lab(f)+'</span>' }).join('')+
   '<span class="pr">proporção '+L.map(f=>cnt(f)+lab(f)).join(' : ')+(I.agua?' + '+I.agua+' H₂O':'')+'</span></div>' }

function view(vb,E,a,v){
  if(v==='est'||v==='lewis'||v==='skel'||v==='skel-lewis'||v==='ions'){
    if(E.t==='a'){ const s=a.f; const np=s==='He'?1:4; vb.innerHTML='<div class="d2">'+svg2D([[s,0,0,np]],[],[0,0],'lewis')+'</div><p class="vcap">'+(s==='He'?'O hélio tem só 2 elétrons de valência (1 par): sua única camada já está cheia.':'Octeto completo: 8 elétrons de valência (4 pares). Por isso '+a.n.toLowerCase()+' não precisa se ligar a ninguém e existe como átomos soltos.')+'</p>'; return }
    const md=v==='ions'?'lewis':v; const src=(v.startsWith('skel')&&E.S)?E.S:(E.P?E:E.S); const mode=(src===E.S&&!v.startsWith('skel'))?'skel-lewis':md;
    vb.innerHTML='<div class="d2">'+svg2D(src.A,src.B,src.P,mode)+'</div>';
    let cap='';
    if(E.t==='i'){ cap=legendIons(E)+'<p class="vcap">Cada íon desenhado com seus elétrons de valência; os colchetes marcam a carga total do íon. '+(E.F.some(f=>f[1]<0&&f[0].length>2&&f[0]!=='OH')?'Dentro do íon poliatômico os átomos se ligam por ligações <b>covalentes</b>; entre os íons a ligação é <b>iônica</b> (atração entre + e −).':'Os íons se atraem por ligação <b>iônica</b>: o metal perdeu elétrons e o não metal ganhou, ficando ambos com a camada completa.')+'</p>' }
    else if(v==='est') cap='<p class="vcap">Fórmula estrutural plana: cada traço é uma ligação covalente (um par de elétrons compartilhado). Traço duplo = ligação dupla, triplo = tripla.</p>';
    else if(v==='lewis'||v==='skel-lewis'){ const k=contaLig(E); cap='<p class="vcap">Estrutura de Lewis: os pontinhos são os <b>pares de elétrons isolados</b> (que não participam de ligação)'+(E.A.some(x=>x[2])?' e o ponto sozinho é um <b>elétron desemparelhado</b> (a molécula é um radical)':'')+'. Contando: '+k.s+' ligaç'+(k.s===1?'ão simples':'ões simples')+(k.d?', '+k.d+' dupla'+(k.d>1?'s':''):'')+(k.t?', '+k.t+' tripla'+(k.t>1?'s':''):'')+' e '+k.lp+' par'+(k.lp!==1?'es':'')+' isolado'+(k.lp!==1?'s':'')+'.'+(v==='skel-lewis'?' Em moléculas grandes os H dos carbonos ficam implícitos.':'')+'</p>'+(E.G&&E.G.length?'<ul class="geo">'+geoTxt(E)+'</ul>':'') }
    else cap='<p class="vcap">Fórmula em bastão: cada vértice ou ponta de linha é um carbono, e os hidrogênios ligados a carbono ficam implícitos (cada C completa 4 ligações com H). Só os outros elementos são escritos.</p>';
    vb.insertAdjacentHTML('beforeend',cap); return }
  // 3D
  let M, opt={lab:true}, cap='', ctr='';
  if(v==='bv'||v==='pe'){
    if(E.t==='a'){ M={at:[{x:0,y:0,z:0,r:VDW[a.f]||1.5,col:CPK[a.f],lab:a.f}],bd:[]}; cap='Um átomo isolado: gases nobres não formam moléculas.' }
    else { M=molModel(E,v==='pe'); opt.lab=E.A.length<=40&&v==='bv'; const n=E.A.filter(x=>x[0]!=='*').length;
      if(v==='bv'&&E.N){ cap=E.N.g!=null?'Ângulo '+E.A[E.N.a[0]][0]+'–'+E.A[E.N.a[1]][0]+'–'+E.A[E.N.a[2]][0]+' = '+nf(E.N.g)+'° · ligação '+E.A[E.N.a[1]][0]+'–'+E.A[E.N.a[0]][0]+' = '+nf(E.N.l)+' pm':'Comprimento da ligação '+E.A[0][0]+'–'+E.A[1][0]+' = '+nf(E.N.l)+' pm'; cap+=E.N.e?' (valores experimentais).':' (≈ valores do modelo calculado).' ; cap+=' 1 pm = 10⁻¹² m.' }
      else if(v==='bv') cap='Bola e vareta: as bolas são os átomos e as varetas as ligações, mostrando os ângulos reais. '+(n>40?'São '+n+' átomos!':'');
      else cap='Preenchimento espacial: cada átomo com seu raio de van der Waals, mostrando o “volume” e a forma real da molécula.';
      if(E.A.some(x=>x[0]==='*')) cap+=' As pontas abertas continuam a cadeia do polímero (unidade que se repete n vezes).' } }
  else { // retículos
    let kind=E.L; if(v==='mar')kind='mar'; if(E.t==='rede'&&['nacl','zns','gen'].includes(kind))kind='r'+kind;
    let txt=LTXT[kind]; if(kind==='fluorita'){ const I=ions(E); if(I.cat.reduce((s,f)=>s+f[2],0)>I.an.reduce((s,f)=>s+f[2],0))txt=LTXT.antifluorita }
    if(kind==='diamante'&&a.f==='Si')txt='O silício cristaliza igual ao diamante: '+txt.charAt(0).toLowerCase()+txt.slice(1)+' É essa rede que, purificada, vira o chip dos computadores.';
    let open=true; const build=()=>lattice(E,a,kind,open);
    M=build(); opt.lab=kind!=='grafite'&&kind!=='bn'&&kind!=='silicato'&&kind!=='vidro'&&!(E.t==='i'&&M.at.length>60); opt.bw=.035; opt.sticks=true;
    cap=(E.t==='i'?legendIons(E):'')+txt;
    if(!['liq','mar','sol','vidro','grafite','bn','silicato'].includes(kind)) ctr='<label class="chk"><input type="checkbox" class="cmp"> tamanho real (esferas encostadas)</label>';
    vb._rebuild=c=>{ open=!c; const N=build(); M.at=N.at; M.bd=N.bd; M.box=N.box; M.tick=N.tick; opt.sticks=open; anim&&anim.redraw() } }
  vb.innerHTML='<div class="d3"><canvas aria-label="Modelo 3D de '+esc(a.n)+'. Arraste para girar."></canvas><div class="c3"><button class="ghost zi" aria-label="Aproximar">＋</button><button class="ghost zo" aria-label="Afastar">－</button><button class="ghost sp">'+(RM?'Girar':'Pausar')+'</button></div><span class="hint3">arraste para girar</span></div>'+
    (ctr?'<div class="ctr3">'+ctr+'</div>':'')+'<p class="vcap">'+cap+'</p>';
  const cv=vb.querySelector('canvas'); anim=viewer(cv,M,opt); let sp=!RM;
  vb.querySelector('.zi').onclick=()=>anim.zoom(1.2); vb.querySelector('.zo').onclick=()=>anim.zoom(1/1.2);
  vb.querySelector('.sp').onclick=e=>{ sp=!sp; anim.spin(sp); e.target.textContent=sp?'Pausar':'Girar' };
  cv.addEventListener('pointerdown',()=>{ sp=false; vb.querySelector('.sp').textContent='Girar' });
  const cmp=vb.querySelector('.cmp'); if(cmp)cmp.onchange=()=>vb._rebuild(cmp.checked) }

window.FDB_ARR={render,stop,svg2D};
})();
