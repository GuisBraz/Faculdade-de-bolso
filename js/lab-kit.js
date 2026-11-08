/* Faculdade de Bolso · kit comum dos laboratórios: canvas, progresso (álbum + missões), toast e confete */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const nf=(v,d=2)=>Number(v).toLocaleString('pt-BR',{maximumFractionDigits:d,minimumFractionDigits:0});
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function css(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim() }
/* canvas nítido e barato: DPR limitado a 2, redimensiona só quando o tamanho muda */
function tela(cv,aspect){ const x=cv.getContext('2d'); let W=0,H=0;
  const fit=()=>{ const r=cv.getBoundingClientRect(), d=Math.min(2,devicePixelRatio||1); const w=Math.round(r.width), h=Math.round(aspect?r.width/aspect:r.height);
    if(w!==W||h!==H){ W=w; H=h; cv.style.height=h+'px'; cv.width=w*d; cv.height=h*d } x.setTransform(d,0,0,d,0,0); return {W,H} };
  return {x,fit,get W(){return W},get H(){return H}} }
/* progresso salvo neste aparelho */
function progresso(chave,total){ let P={album:{},mis:{}}; try{ P=Object.assign(P,JSON.parse(localStorage.getItem('lab-'+chave)||'{}')) }catch(e){}
  const save=()=>{ try{ localStorage.setItem('lab-'+chave,JSON.stringify(P)) }catch(e){} badge() };
  const badge=()=>{ const b=$('stars'); if(b) b.textContent='★ '+Object.keys(P.mis).length+' / '+total };
  badge();
  return { P, album(k){ if(P.album[k]) return false; P.album[k]=Date.now(); save(); return true },
    missao(k){ if(P.mis[k]) return false; P.mis[k]=Date.now(); save(); return true }, save } }
let tt=0; function toast(m){ let t=$('toast'); if(!t){ t=document.createElement('div'); t.id='toast'; t.className='toast'; t.setAttribute('role','status'); document.body.appendChild(t) }
  t.textContent=m; t.classList.add('on'); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('on'),2600) }
function confete(){ if(RM) return; const c=document.createElement('canvas'); c.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:70'; document.body.appendChild(c);
  const x=c.getContext('2d'); c.width=innerWidth; c.height=innerHeight; const cores=['#F26B1D','#1E62C9','#22884A','#FFD27A','#6447BE'];
  const P=Array.from({length:90},()=>({x:innerWidth/2,y:innerHeight*.45,vx:(Math.random()-.5)*12,vy:-Math.random()*11-3,s:4+Math.random()*5,c:cores[Math.random()*5|0],r:Math.random()*6}));
  let n=0; const f=()=>{ x.clearRect(0,0,c.width,c.height); P.forEach(p=>{ p.vy+=.35; p.x+=p.vx; p.y+=p.vy; p.r+=.2; x.save(); x.translate(p.x,p.y); x.rotate(p.r); x.fillStyle=p.c; x.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6); x.restore() });
    if(++n<110) requestAnimationFrame(f); else c.remove() }; f() }
/* seta com ponta (usada em quase todos os labs) */
function seta(x,x0,y0,x1,y1,cor,larg=3,rot){ const a=Math.atan2(y1-y0,x1-x0), L=Math.hypot(x1-x0,y1-y0); if(L<2) return; const h=Math.min(12,L*.4);
  x.strokeStyle=cor; x.fillStyle=cor; x.lineWidth=larg; x.lineCap='round'; x.beginPath(); x.moveTo(x0,y0); x.lineTo(x1-Math.cos(a)*h*.6,y1-Math.sin(a)*h*.6); x.stroke();
  x.beginPath(); x.moveTo(x1,y1); x.lineTo(x1-Math.cos(a-.42)*h,y1-Math.sin(a-.42)*h); x.lineTo(x1-Math.cos(a+.42)*h,y1-Math.sin(a+.42)*h); x.closePath(); x.fill();
  if(rot){ x.font='700 13px Inter,system-ui,sans-serif'; x.fillStyle=cor; x.textAlign='center'; x.textBaseline='middle'; x.fillText(rot,x1+Math.cos(a)*14,y1+Math.sin(a)*14) } }
window.LAB={$,nf,RM,css,tela,progresso,toast,confete,seta};
})();
