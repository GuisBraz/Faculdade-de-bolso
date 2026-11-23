/* Faculdade de Bolso · Desenho I (AutoCAD) · widgets das aulas
   tela do AutoCAD clicável · conversor de coordenadas · calculadora de folha/escala ·
   calculadora de planificação · monta os simuladores (js/cad-sim.js) */
(function(){
'use strict';
const g=id=>document.getElementById(id);
const br=(v,d)=>{ if(!isFinite(v)) return '—'; const s=(Math.round(v*Math.pow(10,d))/Math.pow(10,d)).toFixed(d).replace(/\.?0+$/,''); return s.replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g,'.') };
const num=s=>{ const v=parseFloat(String(s).replace(/\./g,'').replace(',','.')); return isFinite(v)?v:NaN };
const numP=s=>{ const t=String(s).trim(); return parseFloat(/,/.test(t)?t.replace(/\./g,'').replace(',','.'):t) };

/* ---------- 1 · a tela ---------- */
const REG=[[1,'Menu do aplicativo e barra de acesso rápido','O "A" vermelho abre Novo, Abrir, Salvar, Exportar e Imprimir. Ao lado ficam os atalhos rápidos (salvar, desfazer, plotar) e o nome do arquivo.'],
  [2,'Faixa de opções (Ribbon)','As abas Home, Insert, Annotate, Parametric, View, Manage… Cada aba tem painéis: Draw (desenho), Modify (modificar), Annotation (texto e cota), Layers. Tudo o que está ali também existe como comando digitado.'],
  [3,'Área gráfica (Model)','Onde se desenha, em tamanho real e sem limite de tamanho. O cursor vira uma cruz; no canto fica o ícone UCS, que mostra para onde apontam X e Y. Em cima à direita, o ViewCube e a barra de navegação.'],
  [4,'Linha de comando','A "conversa" com o AutoCAD: você digita o comando e ele pergunta o próximo passo. Se ela sumir, Ctrl+9 traz de volta. F2 abre o histórico completo.'],
  [5,'Barra de status','As abas Model/Layout e os botões de precisão: Grid (F7), Snap (F9), Ortho (F8), Polar (F10), OSNAP (F3), OTRACK (F11), espessura de linha, escala de anotação. Em versões antigas ela também mostra as coordenadas do cursor.']];
function tela(){ const box=g('cadTela'), out=g('cadTelaO'); if(!box) return;
  const bolha=(n,x,y)=>'<g class="cad-n" data-n="'+n+'" tabindex="0" role="button" aria-label="Região '+n+'"><circle cx="'+x+'" cy="'+y+'" r="19"/><text x="'+x+'" y="'+(y+6)+'" text-anchor="middle">'+n+'</text></g>';
  box.innerHTML='<svg viewBox="0 0 600 380" class="cad-tela" role="img" aria-label="Tela do AutoCAD">'+
    '<rect x="0" y="0" width="600" height="380" rx="8" fill="#2B323B"/>'+
    '<rect x="0" y="0" width="600" height="26" rx="8" fill="#1D232A"/><rect x="8" y="5" width="22" height="16" rx="3" fill="#C2272D"/><text x="19" y="17" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">A</text>'+
    [44,62,80,98].map(x=>'<rect x="'+x+'" y="8" width="12" height="10" rx="2" fill="#5B6875"/>').join('')+'<text x="300" y="17" text-anchor="middle" fill="#AEB8C4" font-size="11">Autodesk AutoCAD · Drawing1.dwg</text>'+
    '<rect x="0" y="26" width="600" height="18" fill="#252C34"/>'+['Home','Insert','Annotate','Parametric','View','Manage'].map((t,i)=>'<text x="'+(16+i*62)+'" y="39" fill="'+(i?'#9AA6B2':'#fff')+'" font-size="10">'+t+'</text>').join('')+
    '<rect x="0" y="44" width="600" height="58" fill="#3A434E"/>'+['Draw','Modify','Annotation','Layers','Block','Properties'].map((t,i)=>'<g><rect x="'+(8+i*98)+'" y="50" width="90" height="34" rx="3" fill="#46515D"/>'+[0,1,2,3].map(k=>'<rect x="'+(14+i*98+k*20)+'" y="55" width="15" height="15" rx="2" fill="#6A7887"/>').join('')+'<text x="'+(53+i*98)+'" y="96" text-anchor="middle" fill="#C9D2DB" font-size="9">'+t+'</text></g>').join('')+
    '<rect x="0" y="102" width="600" height="220" fill="#212830"/>'+
    Array.from({length:30},(_,i)=>'<line x1="'+(i*20)+'" y1="102" x2="'+(i*20)+'" y2="322" stroke="#2A333D"/>').join('')+Array.from({length:11},(_,i)=>'<line x1="0" y1="'+(102+i*20)+'" x2="600" y2="'+(102+i*20)+'" stroke="#2A333D"/>').join('')+
    '<path d="M40 300 h34 M40 300 v-34" stroke="#C0504D" stroke-width="2"/><path d="M40 300 v-34" stroke="#4FA34F" stroke-width="2"/><text x="78" y="304" fill="#C0504D" font-size="10">X</text><text x="36" y="262" fill="#4FA34F" font-size="10">Y</text>'+
    '<path d="M200 260 h120 v-60 l-60 -40 l-60 40 z" fill="none" stroke="#F2F4F7" stroke-width="2"/><circle cx="260" cy="225" r="12" fill="none" stroke="#F2F4F7" stroke-width="2"/>'+
    '<path d="M420 190 h40 M440 170 v40" stroke="#fff" stroke-width="1"/><rect x="436" y="186" width="8" height="8" fill="none" stroke="#fff"/>'+
    '<rect x="540" y="112" width="44" height="44" rx="4" fill="#3A434E"/><text x="562" y="138" text-anchor="middle" fill="#AEB8C4" font-size="9">TOP</text>'+
    '<rect x="40" y="326" width="520" height="20" rx="4" fill="#1A1F25"/><text x="50" y="340" fill="#C9D2DB" font-size="10" font-family="monospace">Command: LINE  Specify first point:</text>'+
    '<rect x="0" y="350" width="600" height="30" fill="#252C34"/><text x="12" y="369" fill="#fff" font-size="10">Model</text><text x="52" y="369" fill="#9AA6B2" font-size="10">Layout1  Layout2  +</text>'+
    ['#','⊞','∟','◎','◇','⊕','≡'].map((t,i)=>'<text x="'+(360+i*28)+'" y="370" fill="'+([1,4].includes(i)?'#5AA9FF':'#9AA6B2')+'" font-size="13">'+t+'</text>').join('')+
    bolha(1,40,15)+bolha(2,300,72)+bolha(3,140,170)+bolha(4,330,336)+bolha(5,520,365)+'</svg>';
  const mostra=n=>{ const r=REG[n-1]; out.innerHTML='<b>'+r[0]+' · '+r[1]+'</b><br>'+r[2]; box.querySelectorAll('.cad-n').forEach(x=>x.classList.toggle('on',+x.dataset.n===n)) };
  box.querySelectorAll('.cad-n').forEach(b=>{ b.onclick=()=>mostra(+b.dataset.n); b.onkeydown=e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); mostra(+b.dataset.n) } } }) }

/* ---------- 2 · conversor de coordenadas ---------- */
function conversor(){ const I=g('cadCvI'), D=g('cadCvD'), O=g('cadCvO'); if(!I) return;
  const calc=()=>{ const s=I.value.replace(/\s+/g,''); let dx, dy, m;
    if((m=s.match(/^@?(-?\d*\.?\d+)<(-?\d*\.?\d+)$/))){ const d=+m[1], a=+m[2]*Math.PI/180; dx=d*Math.cos(a); dy=d*Math.sin(a) }
    else if((m=s.match(/^@?(-?\d*\.?\d+),(-?\d*\.?\d+)$/))){ dx=+m[1]; dy=+m[2] }
    else { O.innerHTML=/\d,\d+,/.test(s)?'Vírgula a mais: no AutoCAD o decimal é <b>ponto</b> (5.6).':'Escreva <b>@ΔX,ΔY</b> (ex.: @80,30) ou <b>@d&lt;ângulo</b> (ex.: @20&lt;315).'; D.innerHTML=''; return }
    const d=Math.hypot(dx,dy); let a=Math.atan2(dy,dx)*180/Math.PI; if(a<0) a+=360; const f=v=>String(Math.round(v*1000)/1000);
    O.innerHTML='<b>Relativa:</b> @'+f(dx)+','+f(dy)+'<br><b>Polar:</b> @'+f(d)+'&lt;'+f(a)+'<br><span class="cad-cap">ΔX = d·cos θ = '+br(dx,3)+' · ΔY = d·sen θ = '+br(dy,3)+' · d = √(ΔX² + ΔY²) = '+br(d,3)+' · θ = '+br(a,2)+'°</span>';
    const S=Math.max(Math.abs(dx),Math.abs(dy),1), k=70/S, x2=100+dx*k, y2=100-dy*k, ar=Math.min(a,359.9)*Math.PI/180;
    D.innerHTML='<svg viewBox="0 0 200 200" width="170" height="170" role="img" aria-label="Vetor do deslocamento"><line x1="10" y1="100" x2="190" y2="100" stroke="currentColor" stroke-opacity=".25"/><line x1="100" y1="10" x2="100" y2="190" stroke="currentColor" stroke-opacity=".25"/>'+
      '<path d="M100 100 L'+x2+' 100 L'+x2+' '+y2+'" fill="none" stroke="#1E62C9" stroke-dasharray="4 3" stroke-width="1.5"/>'+
      '<path d="M122 100 A22 22 0 '+(a>180?1:0)+' 0 '+(100+22*Math.cos(ar))+' '+(100-22*Math.sin(ar))+'" fill="none" stroke="#2A8C46" stroke-width="2"/>'+
      '<line x1="100" y1="100" x2="'+x2+'" y2="'+y2+'" stroke="#E0601A" stroke-width="3"/><circle cx="100" cy="100" r="4" fill="currentColor"/><circle cx="'+x2+'" cy="'+y2+'" r="4" fill="#E0601A"/>'+
      '<text x="'+((100+x2)/2)+'" y="'+(dy>0?114:94)+'" text-anchor="middle" font-size="11" fill="#1E62C9">ΔX</text><text x="'+(x2+(dx>=0?6:-6))+'" y="'+((100+y2)/2)+'" text-anchor="'+(dx>=0?'start':'end')+'" font-size="11" fill="#1E62C9">ΔY</text>'+
      '<text x="128" y="'+(a>180?122:90)+'" font-size="11" fill="#2A8C46">θ</text><text x="104" y="116" font-size="10" fill="currentColor">último ponto</text></svg>' };
  I.addEventListener('input',calc); calc() }

/* ---------- 3 · calculadora de folha e escala ---------- */
const FOLHA={A4:[297,210],A3:[420,297],A2:[594,420],A1:[841,594],A0:[1189,841]};
const ESC=[[10,1],[5,1],[2,1],[1,1],[1,2],[1,5],[1,10],[1,20],[1,50],[1,100],[1,200],[1,500],[1,1000]];
function escala(){ const L=g('cadEsL'), H=g('cadEsH'), F=g('cadEsF'), G=g('cadEsG'), O=g('cadEsO'); if(!L) return;
  const calc=()=>{ const l=numP(L.value), h=numP(H.value), [fw,fh]=FOLHA[F.value], fol=+G.value; if(!(l>0&&h>0)){ O.textContent='Digite largura e altura em mm.'; return }
    const mE=25, m=F.value==='A0'||F.value==='A1'?10:7, carimbo=F.value==='A4'?45:55, uw=fw-mE-m, uh=fh-2*m-carimbo;
    const lw=l*fol, lh=h*fol, n=Math.max(lw/uw,lh/uh); const e=ESC.find(([a,b])=>b/a>=n-1e-9)||ESC[ESC.length-1], N=e[1]/e[0];
    const nome=e[0]+':'+e[1], xp=e[0]/e[1];
    O.innerHTML='Área útil da '+F.value+' (paisagem, margens '+mE+'/'+m+', carimbo ≈ '+carimbo+'): <b>'+uw+' × '+uh+'</b> mm<br>'+
      'Desenho com folga: '+br(lw,0)+' × '+br(lh,0)+' → n ≥ máx('+br(lw/uw,2)+' ; '+br(lh/uh,2)+') = <b>'+br(n,2)+'</b><br>'+
      'Escala da norma: <b class="c1">'+nome+'</b> · viewport: <b>Z ↵ '+String(Math.round(xp*10000)/10000)+'XP</b><br>'+
      'Texto 2,5 mm no papel → <b>'+br(2.5*N,2)+'</b> no model (ou annotative 2,5) · DIMSCALE = <b>'+br(N,4)+'</b><br>'+
      'No papel o desenho ocupa '+br(l/N,0)+' × '+br(h/N,0)+' mm'+(n>1000?'<br><b class="bad">Grande demais até para 1:1000 nessa folha: escolha uma folha maior.</b>':'') };
  [L,H].forEach(x=>x.addEventListener('input',calc)); [F,G].forEach(x=>x.addEventListener('change',calc)); calc() }

/* ---------- 4 · planificação ---------- */
function plan(){ const T=g('cadPlT'), I=g('cadPlI'), D=g('cadPlD'), O=g('cadPlO'); if(!T) return; let tipo='cil';
  const campos={cil:[['De','Diâmetro externo (mm)','1000'],['t','Espessura (mm)','12.5'],['H','Altura (mm)','1500']],cone:[['D','Ø médio boca maior (mm)','600'],['d','Ø médio boca menor (mm)','300'],['h','Altura do cone (mm)','400']]};
  const monta=()=>{ T.querySelectorAll('button').forEach(b=>b.classList.toggle('sel',b.dataset.t===tipo));
    I.innerHTML=campos[tipo].map(c=>'<label>'+c[1]+'<input data-k="'+c[0]+'" type="text" inputmode="decimal" value="'+c[2]+'"></label>').join(''); I.querySelectorAll('input').forEach(x=>x.addEventListener('input',calc)); calc() };
  const v=k=>numP(I.querySelector('[data-k="'+k+'"]').value);
  const calc=()=>{ if(tipo==='cil'){ const De=v('De'), t=v('t'), H=v('H'); if(!(De>0&&t>=0&&H>0&&t<De)){ O.textContent='Confira os valores.'; D.innerHTML=''; return }
      const Dm=De-t, C=Math.PI*Dm, err=Math.PI*De-C;
      O.innerHTML='D<sub>m</sub> = '+br(De,2)+' − '+br(t,2)+' = <b>'+br(Dm,2)+'</b><br>comprimento = π × '+br(Dm,2)+' = <b class="c1">'+br(C,1)+' mm</b><br>chapa: <b>'+br(C,1)+' × '+br(H,1)+'</b><br><span class="cad-cap">pelo diâmetro externo daria '+br(C+err,1)+' (sobra de '+br(err,1)+' = π·t)</span>';
      const k=Math.min(220/C,110/H); D.innerHTML='<svg viewBox="0 0 260 150" width="100%" style="max-width:300px"><rect x="20" y="'+(130-H*k)+'" width="'+(C*k)+'" height="'+(H*k)+'" fill="rgba(30,98,201,.1)" stroke="#1E62C9" stroke-width="2"/><text x="'+(20+C*k/2)+'" y="146" text-anchor="middle" font-size="11" fill="#E0601A">π·Dm = '+br(C,1)+'</text><text x="'+(20+C*k/2)+'" y="'+(134-H*k/2)+'" text-anchor="middle" font-size="11" fill="currentColor">H = '+br(H,0)+'</text></svg>'; return }
    const Dd=v('D'), d=v('d'), h=v('h'); if(!(Dd>d&&d>=0&&h>0)){ O.textContent='A boca maior precisa ser maior que a menor, e a altura maior que zero.'; D.innerHTML=''; return }
    const gq=Math.hypot(h,(Dd-d)/2), R=Dd*gq/(Dd-d), r=R-gq, th=180*Dd/R;
    O.innerHTML='g = √(h² + ((D − d)/2)²) = <b>'+br(gq,1)+'</b><br>R = D·g/(D − d) = <b class="c1">'+br(R,1)+'</b> · r = R − g = <b class="c1">'+br(r,1)+'</b><br>θ = 180° × D / R = <b class="c1">'+br(th,2)+'°</b>'+(th>360?'<br><b class="bad">θ passa de 360°: divida em '+Math.ceil(th/360)+' partes ou mais.</b>':th>180?'<br>Setor grande: muita gente divide em 2 partes iguais ('+br(th/2,2)+'° cada).':'')+'<br><span class="cad-cap">confere: arco maior = R·θ = '+br(R*th*Math.PI/180,1)+' = π·D = '+br(Math.PI*Dd,1)+'</span>';
    const T2=Math.min(th,359.9)*Math.PI/180, k=110/R, cx=130, cy=140, a0=Math.PI/2-T2/2, a1=Math.PI/2+T2/2;
    const P=(rr,a)=>[cx+rr*k*Math.cos(a),cy-rr*k*Math.sin(a)], A=P(R,a0), B=P(R,a1), a=P(r,a1), b=P(r,a0), big=T2>Math.PI?1:0;
    D.innerHTML='<svg viewBox="0 0 260 160" width="100%" style="max-width:300px"><path d="M'+A[0]+' '+A[1]+' A'+(R*k)+' '+(R*k)+' 0 '+big+' 0 '+B[0]+' '+B[1]+' L'+a[0]+' '+a[1]+' A'+(r*k)+' '+(r*k)+' 0 '+big+' 1 '+b[0]+' '+b[1]+' Z" fill="rgba(30,98,201,.1)" stroke="#1E62C9" stroke-width="2"/>'+
      '<line x1="'+cx+'" y1="'+cy+'" x2="'+A[0]+'" y2="'+A[1]+'" stroke="currentColor" stroke-dasharray="3 3" stroke-opacity=".5"/><line x1="'+cx+'" y1="'+cy+'" x2="'+B[0]+'" y2="'+B[1]+'" stroke="currentColor" stroke-dasharray="3 3" stroke-opacity=".5"/><circle cx="'+cx+'" cy="'+cy+'" r="3" fill="currentColor"/>'+
      '<text x="'+cx+'" y="'+(cy-8)+'" text-anchor="middle" font-size="11" fill="#E0601A">θ = '+br(th,1)+'°</text></svg>' };
  T.onclick=e=>{ const b=e.target.closest('button'); if(b){ tipo=b.dataset.t; monta() } };
  monta() }

/* ---------- 5 · simuladores ---------- */
function sims(){ if(!window.CadSim) return; const S=window.CadSim, D=S.DESAFIOS;
  const M2=[{nome:'Moldura (OFFSET)',tipo:'REC + OFFSET',inicio:'Retângulo de 100 × 60 com canto em 0,0, e outro 10 mm para dentro.',dica:'Um REC e um OFFSET resolvem.',segs:[[[0,0],[100,0]],[[100,0],[100,60]],[[100,60],[0,60]],[[0,60],[0,0]],[[10,10],[90,10]],[[90,10],[90,50]],[[90,50],[10,50]],[[10,50],[10,10]]]},
    {nome:'Cruz (TRIM)',tipo:'REC + EXPLODE + TRIM',inicio:'Cruz de 80 × 80, braços de 20, canto do quadrado envolvente em 0,0.',dica:'Dois retângulos cruzados, explode e apara o miolo.',segs:(()=>{ const p=[[30,0],[50,0],[50,30],[80,30],[80,50],[50,50],[50,80],[30,80],[30,50],[0,50],[0,30],[30,30]]; return p.map((q,i)=>[q,p[(i+1)%p.length]]) })()},
    {nome:'Peça 2.B por espelho (MIRROR)',tipo:'LINE + MIRROR',inicio:'Desenhe a metade da direita (de x = 25 a x = 65) e espelhe em x = 25.',dica:'O eixo de simetria é a vertical que passa por 25,0.',segs:D[5].segs}];
  const mk=(id,op)=>{ const el=g(id); if(el&&!el.dataset.ok){ el.dataset.ok=1; return S.montar(el,op) } };
  const apis={};
  apis.coord=mk('cadSimCoord',{titulo:'Simulador · coordenadas'});
  apis.t1=mk('cadSimT1',{titulo:'Desafios do Módulo 1',desafios:D});
  apis.t2=mk('cadSimT2',{titulo:'Desafios do Módulo 2',desafios:M2});
  apis.lab=mk('cadSimLab',{titulo:'Simulador livre'});
  window.FDB_CAD=apis;
  addEventListener('hashchange',()=>setTimeout(()=>Object.values(apis).forEach(a=>a&&a.zoom()),60)) }

function init(){ tela(); conversor(); escala(); plan(); sims() }
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
