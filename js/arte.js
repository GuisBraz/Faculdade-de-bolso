/* FACULDADE DE BOLSO · Oficina de Desenho artístico: desenhos passo a passo e ferramentas
   Todos os desenhos são originais e genéricos (estilo, nunca personagens existentes). */
(function(){
'use strict';
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const DPR=()=>Math.min(2,window.devicePixelRatio||1);
function fit(cv){ const r=cv.getBoundingClientRect(), d=DPR(); const W=Math.max(1,r.width), H=Math.max(1,r.height); if(cv.width!==Math.round(W*d)||cv.height!==Math.round(H*d)){ cv.width=Math.round(W*d); cv.height=Math.round(H*d) } const x=cv.getContext('2d'); x.setTransform(d,0,0,d,0,0); return {x,W,H} }

/* ================= desenhos passo a passo (viewBox 120 × 120) =================
   cada passo acrescenta traços; os anteriores ficam cinza e o novo fica colorido */
const H='stroke-dasharray="3 3"';
const FIG={
 linhas:[['Marque o começo e o fim','<circle cx="16" cy="62" r="3" fill="currentColor"/><circle cx="104" cy="22" r="3" fill="currentColor"/>'],
   ['Ensaie no ar 2 ou 3 vezes','<path d="M16 62L104 22" '+H+'/>'],
   ['Risque de uma vez, rápido','<path d="M16 62L104 22" stroke-width="2.6"/>'],
   ['Elipses: várias voltas, reforce a melhor','<ellipse cx="60" cy="94" rx="40" ry="13" opacity=".5"/><ellipse cx="60" cy="94" rx="38" ry="12"/><ellipse cx="61" cy="95" rx="39" ry="12.5" opacity=".5"/>']],
 caneca:[['Cilindro: duas elipses e duas retas','<ellipse cx="52" cy="28" rx="28" ry="8"/><path d="M24 28v62M80 28v62"/><path d="M24 90a28 8 0 0 0 56 0"/>'],
   ['Alça: duas curvas em C','<path d="M80 40c22 0 22 38 0 38M80 48c12 0 12 22 0 22"/>'],
   ['Boca com espessura','<ellipse cx="52" cy="28" rx="24" ry="6"/>'],
   ['Sombra do lado oposto à luz','<path d="M64 37v52M69 36v52M74 35v52M78 33v54"/>']],
 cubo1pf:[['Horizonte e ponto de fuga','<path d="M4 30H116"/><circle cx="60" cy="30" r="2.6" fill="currentColor"/>'],
   ['Frente: um quadrado reto','<rect x="20" y="60" width="36" height="36"/>'],
   ['Cantos até o ponto','<path d="M20 60L60 30M56 60L60 30M56 96L60 30M20 96L60 30" '+H+'/>'],
   ['Feche o fundo (mesmo formato, menor)','<path d="M36 48H57.6V69.6M20 60L36 48M56 60L57.6 48M56 96L57.6 69.6" stroke-width="2"/>']],
 cubo2pf:[['Horizonte com 2 pontos afastados','<path d="M2 40H118"/><circle cx="3" cy="40" r="2.6" fill="currentColor"/><circle cx="117" cy="40" r="2.6" fill="currentColor"/>'],
   ['A quina da frente, vertical','<path d="M60 60V100" stroke-width="2"/>'],
   ['Topo e base da quina até os pontos','<path d="M60 60L3 40M60 100L3 40M60 60L117 40M60 100L117 40" '+H+'/>'],
   ['Laterais verticais e o topo fechado','<path d="M35 51.4V74.1M88 50.3V71M35 51.4L60 60L88 50.3M35 74.1L60 100L88 71M35 51.4L64 47.4L88 50.3" stroke-width="2"/>']],
 esfera:[['Círculo e direção da luz','<circle cx="55" cy="60" r="32"/><circle cx="108" cy="12" r="6"/><path d="M100 20L86 34M86 34l2-7M86 34l7-2"/>'],
   ['Terminador: onde a luz acaba','<path d="M27 46C38 72 60 90 82 80" '+H+'/>'],
   ['Sombra própria (com o núcleo)','<path d="M27 46C38 72 60 90 82 80C74 89 64 92 55 92C37 92 23 78 23 60C23 55 25 50 27 46Z" fill="currentColor" opacity=".35" stroke="none"/><path d="M30 50C40 72 60 86 79 80" stroke-width="5" opacity=".55"/>'],
   ['Sombra projetada no chão','<ellipse cx="36" cy="100" rx="30" ry="6" fill="currentColor" opacity=".45" stroke="none"/>'],
   ['Brilho e luz refletida','<ellipse cx="68" cy="44" rx="6" ry="4.5" fill="var(--sheet)"/><path d="M29 68C34 80 44 87 56 89" stroke="var(--sheet)" stroke-width="3"/>']],
 valores:[['Escala de 5 tons','<rect x="6" y="10" width="21" height="21" fill="currentColor" fill-opacity="0"/><rect x="27" y="10" width="21" height="21" fill="currentColor" fill-opacity=".22"/><rect x="48" y="10" width="21" height="21" fill="currentColor" fill-opacity=".45"/><rect x="69" y="10" width="21" height="21" fill="currentColor" fill-opacity=".7"/><rect x="90" y="10" width="21" height="21" fill="currentColor"/>'],
   ['Hachura: linhas paralelas','<rect x="6" y="50" width="32" height="40"/><path d="M10 88L22 52M16 88L28 52M22 88L34 52M28 88L36 64M8 76L16 52"/>'],
   ['Hachura cruzada: mais escuro','<rect x="44" y="50" width="32" height="40"/><path d="M48 88L60 52M54 88L66 52M60 88L72 52M66 88L74 64M46 76L54 52M46 56L74 84M46 66L68 88M52 52L74 74M62 52L74 64"/>'],
   ['Esfumado: camadas leves','<rect x="82" y="50" width="32" height="40"/><rect x="82" y="50" width="32" height="13" fill="currentColor" fill-opacity=".12" stroke="none"/><rect x="82" y="63" width="32" height="14" fill="currentColor" fill-opacity=".35" stroke="none"/><rect x="82" y="77" width="32" height="13" fill="currentColor" fill-opacity=".65" stroke="none"/>']],
 rosto:[['Oval da cabeça','<ellipse cx="60" cy="60" rx="30" ry="42"/>'],
   ['Cruz: olhos na METADE','<path d="M60 18V102M30 60H90" '+H+'/>'],
   ['Olhos: um olho de distância entre eles','<path d="M38 60q7-6 14 0q-7 5-14 0M68 60q7-6 14 0q-7 5-14 0"/>'],
   ['Nariz no meio do caminho até o queixo; boca logo abaixo','<path d="M56 80q4 4 8 0M51 89q9 4 18 0"/>'],
   ['Orelhas (olhos → nariz), cabelo, pescoço','<path d="M30 58q-7 4-1 20M90 58q7 4 1 20M30 50q2-34 30-32q28-2 30 32M48 100v15M72 100v15"/>']],
 rostoAnime:[['Círculo (crânio) + queixo em V suave','<circle cx="60" cy="50" r="30"/><path d="M32 60q5 30 28 44q23-14 28-44"/>'],
   ['Cruz: olhos um pouco ABAIXO do meio','<path d="M60 18V104M30 64H90" '+H+'/>'],
   ['Olhos grandes','<path d="M37 60q8-7 18-1M65 59q10-6 18 1" stroke-width="2.6"/><ellipse cx="46" cy="68" rx="6" ry="8"/><ellipse cx="74" cy="68" rx="6" ry="8"/>'],
   ['Nariz e boca mínimos','<path d="M60 81l-2 3h3M55 92q5 3 10 0"/>'],
   ['Cabelo: massa acima do crânio + franja','<path d="M26 60Q24 16 60 16Q96 16 94 60M30 44L40 64L47 42L56 60L62 40L70 60L77 42L84 62L90 44"/>'],
   ['Brilhos nos olhos (mesmo lado)','<circle cx="49" cy="64" r="2.2" fill="currentColor"/><circle cx="77" cy="64" r="2.2" fill="currentColor"/>']],
 olho:[['Linha de cima grossa','<path d="M18 50Q55 30 102 48" stroke-width="5"/>'],
   ['Íris alta e oval','<ellipse cx="60" cy="63" rx="16" ry="22"/>'],
   ['Pupila e sombra da pálpebra','<ellipse cx="60" cy="65" rx="7" ry="11" fill="currentColor"/><path d="M45 52Q60 45 75 52" stroke-width="6" opacity=".45"/>'],
   ['Brilhos de onde vem a luz','<circle cx="67" cy="55" r="4.5" fill="var(--sheet)"/><circle cx="54" cy="75" r="2.2" fill="var(--sheet)"/>'],
   ['Linha de baixo curta e fina + cílio','<path d="M42 89Q60 93 80 87M102 48l9-7"/>']],
 cabelo:[['O cabelo nasce num crânio MAIOR','<circle cx="60" cy="60" r="28"/><circle cx="60" cy="56" r="37" '+H+'/>'],
   ['Grandes massas','<path d="M23 64Q19 20 60 16Q101 20 97 64M60 16Q47 40 30 68M60 16Q74 40 91 68"/>'],
   ['Mechas em S que afinam','<path d="M30 68Q35 84 25 100M91 68Q85 86 96 102M44 30Q41 52 50 64M76 30Q80 52 70 64"/>'],
   ['Sombra embaixo das mechas + faixa de brilho','<path d="M32 70l4 8M36 72l3 8M86 70l-4 8M82 72l-3 8M50 60l3 5M70 60l-3 5"/><path d="M38 34Q60 26 82 34" stroke-width="3" stroke="var(--sheet)"/><path d="M38 31Q60 23 82 31" '+H+'/>']],
 boneco:[['Linha de ação (uma curva só)','<path d="M50 8Q72 58 52 112" stroke-width="2"/>'],
   ['Cabeça, tórax e quadril','<circle cx="54" cy="18" r="8"/><path d="M47 28h22l-4 28h-14zM49 60h17l2 12h-21z"/>'],
   ['Braços e pernas em linhas','<path d="M49 31l-14 21l-6 20M68 31l12 19l14 6M52 72l-8 22l-4 18M65 72l8 20l12 12"/>'],
   ['Juntas: bolinhas (ombro, cotovelo, joelho)','<circle cx="49" cy="31" r="2.6"/><circle cx="68" cy="31" r="2.6"/><circle cx="35" cy="52" r="2.6"/><circle cx="80" cy="50" r="2.6"/><circle cx="44" cy="94" r="2.6"/><circle cx="73" cy="92" r="2.6"/>']],
 mao:[['Palma: um quadrado','<path d="M40 60h34l4 34h-38z"/>'],
   ['Polegar: uma cunha','<path d="M40 70l-16-10l-6 10l18 16"/>'],
   ['Dedos: 3 blocos cada, médio maior','<path d="M42 60v-22h7v22M51 60v-28h7v28M60 60v-25h7v25M69 60v-18h6v18M42 46h7M42 53h7M51 42h7M51 51h7M60 44h7M60 52h7M69 48h6M69 54h6"/>'],
   ['Arredonde as pontas e marque dobras','<path d="M42 38q3.5-4 7 0M51 32q3.5-4 7 0M60 35q3.5-4 7 0M69 42q3-4 6 0M46 84q12 4 24 0"/>']],
 dobras:[['Pontos de tensão (ombro, cotovelo)','<circle cx="22" cy="24" r="3.5" fill="currentColor"/><circle cx="98" cy="40" r="3.5" fill="currentColor"/>'],
   ['Dobras saem dos pontos','<path d="M22 24Q60 60 98 40M25 30Q55 72 95 46M28 36Q50 84 90 52"/>'],
   ['Tecido pendurado: dobras em cone','<path d="M38 72Q60 82 82 72M40 72L28 116M60 78L60 116M80 72L94 116M50 76L44 116M70 76L76 116"/>']],
 paisagem:[['Horizonte','<path d="M2 60H118"/>'],
   ['Fundo: claro e simples','<path d="M2 60L24 38L40 52L62 28L86 55L100 44L118 60" opacity=".45"/>'],
   ['Meio: árvores em massa','<path d="M22 82V68M80 84V66"/><path d="M12 70q2-16 10-14q10-4 12 8q4 8-6 10q-10 3-16-4z"/><path d="M68 68q2-20 12-18q12-2 13 10q5 9-7 12q-12 3-18-4z"/>'],
   ['Frente: escura e detalhada','<path d="M2 118Q30 88 60 102Q90 116 118 94V118Z" fill="currentColor" opacity=".6" stroke="none"/><path d="M14 104l2-8l2 8M24 100l2-9l2 9M96 102l2-9l2 9"/>']],
 tercos:[['O quadro','<rect x="6" y="20" width="108" height="80"/>'],
   ['Grade de terços','<path d="M42 20V100M78 20V100M6 46.7H114M6 73.3H114" '+H+'/>'],
   ['Assunto num cruzamento','<circle cx="78" cy="46.7" r="9"/><path d="M78 56v26M70 66l8-4l8 4M72 96l6-14l6 14"/>'],
   ['Horizonte numa linha (nunca no meio)','<path d="M6 73.3H114" stroke-width="2.2"/>']],
 texturas:[['Madeira: veios que seguem a forma','<rect x="6" y="6" width="50" height="50"/><path d="M10 14q20 6 42 0M10 24q14 10 24 4q10-6 18 2M10 36q20 4 42-2M10 48q22-6 42 2"/><ellipse cx="34" cy="28" rx="5" ry="3"/>'],
   ['Metal: contraste forte e faixas','<rect x="64" y="6" width="50" height="50"/><path d="M70 6v50M76 6v50" stroke-width="5" opacity=".75"/><path d="M90 6v50" stroke-width="9" opacity=".85"/><path d="M104 6v50" stroke-width="3" opacity=".4"/>'],
   ['Tecido: transições suaves','<rect x="6" y="64" width="50" height="50"/><path d="M10 72q14 18 6 38M26 68q8 24 2 42M42 70q-6 20 6 40" opacity=".6"/><path d="M14 74q10 16 6 34" stroke-width="4" opacity=".2"/>'],
   ['Pedra: rachaduras irregulares','<rect x="64" y="64" width="50" height="50"/><path d="M70 74l10 6l6 12l12-4l8 10M86 92l-4 14M96 70l2 18"/><path d="M74 100l6 2M100 102l4-3" stroke-width="3" opacity=".5"/>']],
 expressoes:[['Alegria: olhos fechando, boca aberta','<circle cx="20" cy="60" r="16"/><path d="M12 57q3-4 6 0M22 57q3-4 6 0M13 66q7 7 14 0M11 50l6-2M23 48l6 2"/>'],
   ['Raiva: sobrancelhas descem no meio','<circle cx="60" cy="60" r="16"/><path d="M50 51l8 4M70 51l-8 4M52 58h5M63 58h5M53 70q7-5 14 0"/>'],
   ['Tristeza: sobem no meio, boca cai','<circle cx="100" cy="60" r="16"/><path d="M91 53l7-3M109 53l-7-3M92 59q3 2 6 0M102 59q3 2 6 0M95 71q5-4 10 0M95 62v7"/>']],
 lineart:[['Linha toda igual: chapado','<path d="M14 60Q34 20 54 60Q34 100 14 60" stroke-width="1.4"/>'],
   ['Peso: grossa no lado da sombra','<path d="M66 60Q86 20 106 60" stroke-width="1.2"/><path d="M106 60Q86 100 66 60" stroke-width="4.5"/>'],
   ['Pontas afinando','<path d="M72 100q14-4 22-16" stroke-width="3"/><path d="M94 84q3-5 4-10" stroke-width="1.4"/><path d="M98 74q1-3 1-5" stroke-width=".7"/>']],
 cel:[['Cor base chapada','<circle cx="60" cy="60" r="34" fill="currentColor" fill-opacity=".22"/>'],
   ['Sombra de borda dura (multiplicar)','<path d="M60 26A34 34 0 0 0 60 94A24 34 0 0 1 60 26Z" fill="currentColor" fill-opacity=".5" stroke="none"/>'],
   ['Luz de borda','<path d="M88 40A34 34 0 0 1 91 76" stroke-width="3.5"/>'],
   ['Brilho','<ellipse cx="74" cy="42" rx="7" ry="4.5" fill="var(--sheet)"/>']],
 camadas:[['Rascunho (opacidade baixa)','<rect x="10" y="78" width="70" height="30" rx="3" opacity=".6"/><text x="16" y="97" font-size="9" fill="currentColor" stroke="none">rascunho</text>'],
   ['Cor base','<rect x="20" y="62" width="70" height="30" rx="3"/><text x="26" y="81" font-size="9" fill="currentColor" stroke="none">cor base</text>'],
   ['Sombra · multiplicar (recorte)','<rect x="30" y="46" width="70" height="30" rx="3"/><text x="34" y="65" font-size="8.5" fill="currentColor" stroke="none">sombra ×</text>'],
   ['Luz · tela/adicionar','<rect x="40" y="30" width="70" height="30" rx="3"/><text x="46" y="49" font-size="9" fill="currentColor" stroke="none">luz +</text>'],
   ['Lineart em cima de tudo','<rect x="48" y="14" width="70" height="30" rx="3" stroke-width="2.2"/><text x="54" y="33" font-size="9" fill="currentColor" stroke="none">lineart</text>']],
 bola:[['Trajetória em arcos','<path d="M8 18Q22 18 34 102Q48 50 62 102Q74 72 86 102Q96 88 106 102" '+H+'/><path d="M2 106H118"/>'],
   ['No alto: desenhos juntos (devagar)','<circle cx="10" cy="20" r="4"/><circle cx="16" cy="22" r="4"/><circle cx="21" cy="27" r="4"/>'],
   ['Perto do chão: afastados (rápido) e esticada','<circle cx="26" cy="40" r="4"/><circle cx="30" cy="62" r="4"/><ellipse cx="33" cy="86" rx="3" ry="6"/>'],
   ['No chão: achata','<ellipse cx="34" cy="102" rx="7" ry="3"/>']],
 squash:[['Bola parada','<circle cx="16" cy="40" r="10"/>'],
   ['Caindo: estica','<ellipse cx="44" cy="62" rx="7" ry="14"/>'],
   ['Bate: achata (mesmo volume)','<ellipse cx="76" cy="98" rx="15" ry="6"/><path d="M58 104H96"/>'],
   ['Volta ao normal subindo','<circle cx="104" cy="68" r="10"/>']],
 caminhada:[['Contato','<path d="M2 102H118"/><circle cx="15" cy="34" r="6"/><path d="M15 40V70M15 70L5 100M15 70L26 100M15 46L6 62M15 46L24 62"/>'],
   ['Recuo (corpo desce)','<circle cx="45" cy="38" r="6"/><path d="M45 44V73M45 73L40 88L36 100M45 73L52 100M45 50L38 64M45 50L52 64"/>'],
   ['Passagem','<circle cx="75" cy="35" r="6"/><path d="M75 41V71M75 71V100M75 71L80 84L74 92M75 47L73 64M75 47L78 64"/>'],
   ['Elevação (corpo sobe)','<circle cx="105" cy="31" r="6"/><path d="M105 37V67M105 67L98 100M105 67L113 82L118 92M105 43L98 58M105 43L112 58"/>']],
 manga:[['A página','<rect x="20" y="6" width="80" height="108"/>'],
   ['Quadros de tamanhos diferentes','<path d="M20 40H100M58 6V40M20 84H100M46 40V84"/>'],
   ['Ordem do mangá: direita → esquerda','<text x="76" y="27" font-size="13" fill="currentColor" stroke="none">1</text><text x="36" y="27" font-size="13" fill="currentColor" stroke="none">2</text><text x="70" y="66" font-size="13" fill="currentColor" stroke="none">3</text><text x="30" y="66" font-size="13" fill="currentColor" stroke="none">4</text><text x="56" y="103" font-size="13" fill="currentColor" stroke="none">5</text>'],
   ['Balões seguem a mesma ordem','<ellipse cx="88" cy="14" rx="9" ry="5"/><ellipse cx="34" cy="48" rx="10" ry="5"/>']],
 silhueta:[['Círculos: amigável','<circle cx="20" cy="46" r="9" fill="currentColor"/><path d="M6 104Q2 60 20 57Q38 60 34 104Z" fill="currentColor"/>'],
   ['Quadrados: forte, estável','<rect x="51" y="34" width="18" height="16" fill="currentColor"/><path d="M42 52H78V104H42Z" fill="currentColor"/>'],
   ['Triângulos: ágil, perigoso','<path d="M101 26L110 46H92Z" fill="currentColor"/><path d="M101 48L118 104H84Z" fill="currentColor"/>']]
};
function figHTML(k){ const P=FIG[k]; if(!P) return ''; return '<div class="passos">'+P.map((p,i)=>'<figure><svg viewBox="0 0 120 120" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" aria-hidden="true">'+
  P.slice(0,i).map(q=>'<g stroke="var(--ink2)" color="var(--ink2)" opacity=".55">'+q[1]+'</g>').join('')+'<g stroke="var(--ac)" color="var(--ac)">'+p[1]+'</g></svg><figcaption><b>'+(i+1)+'</b> '+p[0]+'</figcaption></figure>').join('')+'</div>' }

/* ================= ferramentas ================= */
const T={};
/* ---- valores: teste do olho (contraste simultâneo) e escala ---- */
T.valores=function(el){
  el.innerHTML='<h4>Teste do olho: valor é relativo</h4><p class="sub">Os dois quadrados do meio têm o mesmo cinza? Arraste para mudar o fundo e descubra.</p>'+
    '<div class="vtest"><div class="vb" id="vA"><i></i></div><div class="vb" id="vB"><i></i></div></div>'+
    '<label>Contraste do fundo <input type="range" id="vF" min="0" max="100" value="100"></label><div class="btns"><button type="button" id="vRev">Revelar</button></div><div class="wout" id="vO">Olhe com atenção antes de revelar.</div>'+
    '<h4 style="margin-top:18px">Monte a sua escala</h4><p class="sub">Quantos degraus você consegue separar? Compare com a escala do papel.</p><label>Degraus <input type="range" id="vN" min="3" max="11" step="2" value="5"></label><div class="vesc" id="vE"></div>';
  const g=128, F=el.querySelector('#vF'), A=el.querySelector('#vA'), B=el.querySelector('#vB');
  const up=()=>{ const f=+F.value/100, a=Math.round(g+(250-g)*f), b=Math.round(g-(g-12)*f); A.style.background='rgb('+a+','+a+','+a+')'; B.style.background='rgb('+b+','+b+','+b+')';
    A.firstChild.style.background=B.firstChild.style.background='rgb('+g+','+g+','+g+')' };
  F.oninput=up; up();
  el.querySelector('#vRev').onclick=()=>{ F.value=0; up(); el.querySelector('#vO').innerHTML='<b>São idênticos.</b> No fundo claro o cinza parece escuro; no fundo escuro parece claro. Por isso você compara os valores do desenho <b>entre si</b>, não com o branco do papel.' };
  const N=el.querySelector('#vN'), E=el.querySelector('#vE'); const esc=()=>{ const n=+N.value; E.innerHTML=Array.from({length:n},(_,i)=>{ const v=Math.round(250-(238*i/(n-1))); return '<span style="background:rgb('+v+','+v+','+v+')"><small style="color:'+(v<120?'#fff':'#000')+'">'+(i+1)+'</small></span>' }).join('') }; N.oninput=esc; esc() };

/* ---- esfera: luz e sombra ---- */
T.esfera=function(el){
  el.innerHTML='<h4>Simulador de luz na esfera</h4><p class="sub">Toque ou arraste no quadro para mudar de onde vem a luz. Ligue as zonas para ver os nomes.</p>'+
    '<div class="wgrid"><div class="cv" style="aspect-ratio:1/1"><canvas id="eC"></canvas></div><div class="wctl">'+
    '<label>Faixas de valor (simplificar como no papel) <input type="range" id="eB" min="0" max="5" value="0"></label><div class="row"><button type="button" class="ghost" id="eZ" aria-pressed="false">Mostrar as zonas</button></div>'+
    '<div class="wout" id="eO"></div></div></div>';
  const cv=el.querySelector('#eC'); let L={x:.6,y:-.6}, zonas=false; const Bn=el.querySelector('#eB');
  const draw=()=>{ const {x,W,H}=fit(cv); if(W<10) return; x.clearRect(0,0,W,H); const R=W*.3, cx=W*.47, cy=H*.45;
    let lz=Math.sqrt(Math.max(0,1-L.x*L.x-L.y*L.y)), ll=Math.hypot(L.x,L.y,lz); const lx=L.x/ll, ly=L.y/ll; lz/=ll;
    const dark=document.documentElement.dataset.theme==='dark'||(!document.documentElement.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches);
    x.fillStyle=dark?'#2a3646':'#d9dee4'; x.fillRect(0,cy+R*.95,W,H);
    /* sombra projetada: do lado oposto da luz, no chão */
    x.save(); x.fillStyle='rgba(0,0,0,.45)'; x.beginPath(); x.ellipse(cx-lx*R*1.1,cy+R*1.02,R*(1+Math.abs(lx)*.8),R*.22,0,0,7); x.filter='blur(4px)'; x.fill(); x.restore();
    const img=x.createImageData(Math.round(2*R),Math.round(2*R)), bands=+Bn.value;
    for(let j=0;j<img.height;j++) for(let i=0;i<img.width;i++){ const nx=(i-R)/R, ny=(j-R)/R, r2=nx*nx+ny*ny; if(r2>1) continue; const nz=Math.sqrt(1-r2);
      let d=nx*lx+ny*ly+nz*lz; let v=d>0?d:0; const refl=Math.max(0,ny)*.18*(d<0?1:0); v=.07+v*.85+refl; const h=Math.pow(Math.max(0,2*d*nz-lz),40)*.6; v=Math.min(1,v+h);
      if(bands) v=Math.round(v*(bands+1))/(bands+1); const c=Math.round(v*235)+10, o=(j*img.width+i)*4; img.data[o]=c; img.data[o+1]=c; img.data[o+2]=c; img.data[o+3]=255 }
    const tmp=document.createElement('canvas'); tmp.width=img.width; tmp.height=img.height; tmp.getContext('2d').putImageData(img,0,0); x.drawImage(tmp,cx-R,cy-R);
    x.strokeStyle=css('--c1')||'#D9531A'; x.lineWidth=2; x.beginPath(); x.moveTo(cx+lx*R*2.1,cy+ly*R*2.1); x.lineTo(cx+lx*R*1.3,cy+ly*R*1.3); x.stroke();
    x.fillStyle='#F7C548'; x.beginPath(); x.arc(cx+lx*R*2.2,cy+ly*R*2.2,9,0,7); x.fill();
    if(zonas){ x.font='600 12px system-ui'; x.textAlign='left'; const lab=(t,px,py,qx,qy)=>{ x.strokeStyle=x.fillStyle=css('--c2')||'#0C8587'; x.lineWidth=1; x.beginPath(); x.moveTo(px,py); x.lineTo(qx,qy); x.stroke(); x.fillText(t,qx+3,qy+4) };
      lab('brilho',cx+lx*R*.62,cy+ly*R*.62,Math.min(W-70,cx+R*1.05),cy-R*1.05);
      lab('meio-tom',cx,cy,Math.min(W-70,cx+R*1.15),cy-R*.2);
      lab('núcleo da sombra',cx-lx*R*.55,cy-ly*R*.55,6,cy+R*.15);
      lab('luz refletida',cx-lx*R*.85,cy-ly*R*.85+R*.1,6,cy+R*.62);
      lab('sombra projetada',cx-lx*R*1.1,cy+R*1.02,Math.max(6,cx-R*1.6),H-10) }
    el.querySelector('#eO').innerHTML='Luz vindo de <b>'+(ly<-.3?'cima':ly>.3?'baixo':'frente')+(lx>.3?' à direita':lx<-.3?' à esquerda':'')+'</b>. A sombra fica do lado oposto: <b>'+(lx>0?'esquerda':'direita')+'</b>.'+(bands?'<br>Com '+(bands+1)+' faixas a esfera fica parecida com o cel shading.':'') };
  const pick=e=>{ const r=cv.getBoundingClientRect(), p=e.touches?e.touches[0]:e; let px=(p.clientX-r.left)/r.width*2-0.94, py=(p.clientY-r.top)/r.height*2-0.9; const m=Math.hypot(px,py); if(m>.95){ px*=.95/m; py*=.95/m } L={x:px,y:py}; draw() };
  let dn=false; cv.addEventListener('pointerdown',e=>{ dn=true; cv.setPointerCapture(e.pointerId); pick(e) }); cv.addEventListener('pointermove',e=>{ if(dn) pick(e) }); cv.addEventListener('pointerup',()=>dn=false);
  Bn.oninput=draw; el.querySelector('#eZ').onclick=e=>{ zonas=!zonas; e.target.setAttribute('aria-pressed',zonas); e.target.textContent=zonas?'Esconder as zonas':'Mostrar as zonas'; draw() };
  return draw };

/* ---- perspectiva de 1 e 2 pontos ---- */
T.perspectiva=function(el){
  el.innerHTML='<h4>Simulador de perspectiva</h4><p class="sub">Arraste os pontos de fuga (laranja) e a caixa (centro azul). Mude a altura do horizonte e veja o que aparece: o topo ou a base da caixa.</p>'+
    '<div class="seg" id="pM"><button type="button" class="on" data-m="1">1 ponto</button><button type="button" data-m="2">2 pontos</button></div>'+
    '<div class="cv" style="aspect-ratio:16/10"><canvas id="pC"></canvas></div><div class="wctl"><label>Altura do horizonte <input type="range" id="pH" min="10" max="90" value="45"></label>'+
    '<label>Profundidade da caixa <input type="range" id="pD" min="10" max="60" value="30"></label><div class="wout" id="pO"></div></div>';
  const cv=el.querySelector('#pC'); let modo=1, V1={x:.5}, V2={x:.06}, V3={x:.94}, box={x:.3,y:.65}, drag=null;
  const draw=()=>{ const {x,W,H}=fit(cv); if(W<10) return; const hz=H*(+el.querySelector('#pH').value)/100, dep=(+el.querySelector('#pD').value)/100;
    x.clearRect(0,0,W,H); const ink=css('--ink')||'#13233A', ink2=css('--ink2')||'#4B5C71', ac=css('--c1')||'#D9531A', bl=css('--c2')||'#0C8587';
    x.strokeStyle=ink2; x.lineWidth=1.2; x.beginPath(); x.moveTo(0,hz); x.lineTo(W,hz); x.stroke(); x.fillStyle=ink2; x.font='11px system-ui'; x.fillText('horizonte (altura dos olhos)',6,hz-6);
    const s=Math.min(W,H)*.22, bx=box.x*W, by=box.y*H; const lerp=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
    const line=(a,b,dash,c,w)=>{ x.setLineDash(dash?[4,4]:[]); x.strokeStyle=c||ink; x.lineWidth=w||2; x.beginPath(); x.moveTo(a.x,a.y); x.lineTo(b.x,b.y); x.stroke(); x.setLineDash([]) };
    let vis='';
    if(modo===1){ const V={x:V1.x*W,y:hz}; const f=[{x:bx-s/2,y:by-s/2},{x:bx+s/2,y:by-s/2},{x:bx+s/2,y:by+s/2},{x:bx-s/2,y:by+s/2}]; const b=f.map(p=>lerp(p,V,dep));
      f.forEach(p=>line(p,V,true,ink2,1)); b.forEach((p,i)=>line(p,b[(i+1)%4],false,ink2,1.2)); f.forEach((p,i)=>line(p,b[i],false,ink,1.6)); f.forEach((p,i)=>line(p,f[(i+1)%4],false,ink,2.2));
      x.fillStyle=ac; x.beginPath(); x.arc(V.x,V.y,7,0,7); x.fill();
      vis=(by+s/2<hz?'Caixa <b>acima</b> do horizonte: você vê a <b>parte de baixo</b>.':by-s/2>hz?'Caixa <b>abaixo</b> do horizonte: você vê o <b>topo</b>.':'Caixa <b>cortando</b> o horizonte: não vê nem topo nem base.')+(bx<V.x-s/2?' Ela está à esquerda do ponto: aparece o lado direito.':bx>V.x+s/2?' Ela está à direita do ponto: aparece o lado esquerdo.':'') }
    else { const A={x:V2.x*W,y:hz}, B={x:V3.x*W,y:hz}; const t={x:bx,y:by-s/2}, u={x:bx,y:by+s/2}; const k=dep*.9;
      const lt=lerp(t,A,k), lu=lerp(u,A,k), rt=lerp(t,B,k), ru=lerp(u,B,k);
      [t,u].forEach(p=>{ line(p,A,true,ink2,1); line(p,B,true,ink2,1) }); [lt,lu].forEach(p=>line(p,B,true,ink2,.7)); [rt,ru].forEach(p=>line(p,A,true,ink2,.7));
      const X=(p1,p2,p3,p4)=>{ const d=(p1.x-p2.x)*(p3.y-p4.y)-(p1.y-p2.y)*(p3.x-p4.x); if(Math.abs(d)<1e-6) return p1; const a=p1.x*p2.y-p1.y*p2.x, b=p3.x*p4.y-p3.y*p4.x; return {x:(a*(p3.x-p4.x)-(p1.x-p2.x)*b)/d,y:(a*(p3.y-p4.y)-(p1.y-p2.y)*b)/d} };
      const bt=X(lt,B,rt,A), bu=X(lu,B,ru,A);
      line(bt,lt,false,ink2,1.2); line(bt,rt,false,ink2,1.2); line(bu,lu,false,ink2,1.2); line(bu,ru,false,ink2,1.2); line(bt,bu,false,ink2,1.2);
      line(t,u,false,ink,2.4); line(lt,lu,false,ink,2); line(rt,ru,false,ink,2); [[t,lt],[t,rt],[u,lu],[u,ru]].forEach(([p,q])=>line(p,q,false,ink,2));
      [A,B].forEach(p=>{ x.fillStyle=ac; x.beginPath(); x.arc(p.x,p.y,7,0,7); x.fill() });
      vis='As verticais continuam verticais; cada lado foge para o seu ponto. '+((B.x-A.x)<W*.55?'<b>Pontos perto demais</b>: veja a caixa distorcer. Afaste-os!':'Pontos bem afastados: caixa natural.') }
    x.fillStyle=bl; x.beginPath(); x.arc(bx,by,7,0,7); x.fill();
    el.querySelector('#pO').innerHTML=vis };
  const P=e=>{ const r=cv.getBoundingClientRect(); return {x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height,W:r.width,H:r.height} };
  cv.addEventListener('pointerdown',e=>{ const p=P(e), hz=(+el.querySelector('#pH').value)/100; const d=(a,b)=>Math.hypot((a.x-b.x)*p.W,(a.y-b.y)*p.H);
    const c=[['b',box,{x:box.x,y:box.y}]]; if(modo===1) c.push(['v1',V1,{x:V1.x,y:hz}]); else { c.push(['v2',V2,{x:V2.x,y:hz}]); c.push(['v3',V3,{x:V3.x,y:hz}]) }
    let best=null,bd=40; c.forEach(([k,o,pos])=>{ const dd=d(p,pos); if(dd<bd){ bd=dd; best=k } }); if(!best&&modo) best='b'; drag=best; cv.setPointerCapture(e.pointerId); mv(e) });
  const mv=e=>{ if(!drag) return; const p=P(e), cl=v=>Math.max(.02,Math.min(.98,v)); if(drag==='b'){ box.x=cl(p.x); box.y=cl(p.y) } else if(drag==='v1') V1.x=cl(p.x); else if(drag==='v2') V2.x=cl(p.x); else V3.x=cl(p.x); draw() };
  cv.addEventListener('pointermove',mv); cv.addEventListener('pointerup',()=>drag=null);
  el.querySelector('#pH').oninput=el.querySelector('#pD').oninput=draw;
  el.querySelectorAll('#pM button').forEach(b=>b.onclick=()=>{ modo=+b.dataset.m; el.querySelectorAll('#pM button').forEach(o=>o.classList.toggle('on',o===b)); box={x:modo===1?.3:.5,y:.65}; draw() });
  return draw };

/* ---- proporção do corpo em cabeças ---- */
T.proporcao=function(el){
  const TIP=[[8,'Adulto realista / herói'],[7,'Adulto (anime)'],[6,'Adolescente (anime)'],[4.5,'Criança'],[2.5,'Chibi']];
  el.innerHTML='<h4>Régua de cabeças</h4><p class="sub">Escolha o tipo de personagem e veja onde ficam o ombro, o quadril, o joelho e a mão.</p><div class="seg" id="rT">'+TIP.map((t,i)=>'<button type="button" data-i="'+i+'"'+(i===0?' class="on"':'')+'>'+t[0].toString().replace('.',',')+' cab.</button>').join('')+'</div>'+
    '<div class="wgrid"><div class="cv" style="aspect-ratio:3/4;max-height:70vh"><svg id="rS" viewBox="0 0 120 160" width="100%" height="100%"></svg></div><div class="wctl"><div class="wout" id="rO"></div></div></div>';
  const S=el.querySelector('#rS');
  const draw=i=>{ const [n,nome]=TIP[i], top=8, bot=152, u=(bot-top)/n, cx=60, hw=u*.42; let g='';
    for(let k=0;k<=Math.ceil(n);k++){ const y=top+k*u; if(y>bot+.1) break; g+='<path d="M10 '+y.toFixed(1)+'H110" stroke="var(--line)" stroke-dasharray="2 2"/><text x="2" y="'+(y+u/2+2).toFixed(1)+'" font-size="5" fill="var(--ink2)">'+(k<n?k+1:'')+'</text>' }
    const yH=top+u, quad=top+(bot-top)*(n<3?.62:.5), knee=quad+(bot-quad)*.5, sh=top+u*(n<3?1.05:1.35), sw=n<3?u*.62:u*(n>=7.5?1:.9);
    const chibi=n<3; const hip=sw*.8, elbow=sh+(quad-sh)*.55, hand=chibi?quad+(bot-quad)*.12:quad+(bot-quad)*.22;
    g+='<g fill="none" stroke="var(--ac)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+
      '<ellipse cx="'+cx+'" cy="'+(top+u/2)+'" rx="'+hw+'" ry="'+(u/2)+'"/>'+
      '<path d="M'+cx+' '+yH+'V'+quad+'"/><path d="M'+(cx-sw)+' '+sh+'H'+(cx+sw)+'M'+(cx-hip)+' '+quad+'H'+(cx+hip)+'"/>'+
      '<path d="M'+(cx-sw)+' '+sh+'L'+(cx-sw-2)+' '+elbow+'L'+(cx-sw-1)+' '+hand+'M'+(cx+sw)+' '+sh+'L'+(cx+sw+2)+' '+elbow+'L'+(cx+sw+1)+' '+hand+'"/>'+
      '<path d="M'+(cx-hip*.7)+' '+quad+'L'+(cx-hip*.75)+' '+knee+'L'+(cx-hip*.7)+' '+(bot-2)+'L'+(cx-hip*.7-6)+' '+bot+'M'+(cx+hip*.7)+' '+quad+'L'+(cx+hip*.75)+' '+knee+'L'+(cx+hip*.7)+' '+(bot-2)+'L'+(cx+hip*.7+6)+' '+bot+'"/></g>'+
      '<g fill="var(--c2)"><circle cx="'+(cx-sw-1)+'" cy="'+hand+'" r="2.2"/><circle cx="'+(cx+sw+2)+'" cy="'+elbow+'" r="1.8"/><circle cx="'+(cx-hip*.75)+'" cy="'+knee+'" r="1.8"/></g>';
    S.innerHTML=g;
    el.querySelector('#rO').innerHTML='<b>'+nome+'</b> · '+n.toString().replace('.',',')+' cabeças de altura<br>Quadril: '+(chibi?'mais para baixo (pernas curtas)':'no meio da altura')+'<br>Cotovelo: altura da cintura<br>Mão: '+(chibi?'no quadril':'no meio da coxa')+'<br>Joelho: no meio da perna<br><small>Comece marcando as linhas das cabeças no papel, depois o boneco de palito.</small>' };
  el.querySelectorAll('#rT button').forEach(b=>b.onclick=()=>{ el.querySelectorAll('#rT button').forEach(o=>o.classList.toggle('on',o===b)); draw(+b.dataset.i) }); draw(0) };

/* ---- círculo cromático e harmonias ---- */
T.cores=function(el){
  const M=[['comp','Complementares',[0,180]],['ana','Análogas',[-30,0,30]],['tri','Tríade',[0,120,240]],['split','Complementar dividida',[0,150,210]]];
  el.innerHTML='<h4>Círculo cromático</h4><p class="sub">Toque no círculo para escolher a cor principal. A harmonia monta a paleta sozinha.</p><div class="seg" id="cM">'+M.map((m,i)=>'<button type="button" data-i="'+i+'"'+(i===0?' class="on"':'')+'>'+m[1]+'</button>').join('')+'</div>'+
    '<div class="wgrid"><div class="cv" style="aspect-ratio:1/1;max-width:360px"><canvas id="cC"></canvas></div><div class="wctl"><div class="paleta" id="cP"></div><div class="wout" id="cO"></div></div></div>';
  const cv=el.querySelector('#cC'); let h=20, mi=0;
  const draw=()=>{ const {x,W,H}=fit(cv); if(W<10) return; x.clearRect(0,0,W,H); const cx=W/2, cy=H/2, R=Math.min(W,H)*.46, r=R*.55;
    for(let a=0;a<360;a+=2){ x.fillStyle='hsl('+a+',75%,55%)'; x.beginPath(); x.moveTo(cx+r*Math.cos((a-91)*Math.PI/180),cy+r*Math.sin((a-91)*Math.PI/180)); x.arc(cx,cy,R,(a-91)*Math.PI/180,(a+1.5-90)*Math.PI/180); x.arc(cx,cy,r,(a+1.5-90)*Math.PI/180,(a-91)*Math.PI/180,true); x.fill() }
    const hs=M[mi][2].map(d=>(h+d+360)%360);
    x.strokeStyle=css('--ink')||'#13233A'; x.lineWidth=2; x.beginPath(); hs.forEach((a,i)=>{ const p=[cx+(R+r)/2*Math.cos((a-90)*Math.PI/180),cy+(R+r)/2*Math.sin((a-90)*Math.PI/180)]; i?x.lineTo(...p):x.moveTo(...p) }); if(hs.length>2) x.closePath(); x.stroke();
    hs.forEach(a=>{ const p=[cx+(R+r)/2*Math.cos((a-90)*Math.PI/180),cy+(R+r)/2*Math.sin((a-90)*Math.PI/180)]; x.fillStyle='#fff'; x.beginPath(); x.arc(...p,9,0,7); x.fill(); x.fillStyle='hsl('+a+',75%,50%)'; x.beginPath(); x.arc(...p,6,0,7); x.fill() });
    el.querySelector('#cP').innerHTML=hs.map((a,i)=>'<span style="background:hsl('+a+',70%,'+(i?60:50)+'%)"></span>').join('')+'<span style="background:hsl('+h+',25%,22%)" title="sombra"></span><span style="background:hsl('+h+',40%,92%)" title="luz"></span>';
    el.querySelector('#cO').innerHTML={comp:'Opostas no círculo: <b>contraste máximo</b>. Use uma como principal (70 %) e a outra só nos destaques.',ana:'Vizinhas: <b>harmonia</b> e clima (fim de tarde, floresta). Escolha uma dominante.',tri:'Três cores equilibradas: <b>variedade</b>. Deixe uma dominar e baixe a força das outras duas.',split:'A principal + as duas vizinhas da complementar: contraste <b>sem brigar</b>. Ótima para personagens.'}[M[mi][0]]+'<br><small>Os dois últimos quadrados: uma sombra escura e uma luz quase branca da mesma família de cor.</small>' };
  const pick=e=>{ const r=cv.getBoundingClientRect(); const dx=e.clientX-r.left-r.width/2, dy=e.clientY-r.top-r.height/2; h=(Math.atan2(dy,dx)*180/Math.PI+90+360)%360; draw() };
  let dn=false; cv.addEventListener('pointerdown',e=>{ dn=true; cv.setPointerCapture(e.pointerId); pick(e) }); cv.addEventListener('pointermove',e=>{ if(dn) pick(e) }); cv.addEventListener('pointerup',()=>dn=false);
  el.querySelectorAll('#cM button').forEach(b=>b.onclick=()=>{ mi=+b.dataset.i; el.querySelectorAll('#cM button').forEach(o=>o.classList.toggle('on',o===b)); draw() });
  return draw };

/* ---- rosto: do realista ao anime ---- */
T.rosto=function(el){
  el.innerHTML='<h4>Do realista ao anime</h4><p class="sub">Mexa nos controles e veja como o estilo muda as proporções. O personagem é genérico: o seu vai ser diferente.</p>'+
    '<div class="wgrid"><div class="cv" style="aspect-ratio:1/1;max-height:60vh"><svg id="fS" viewBox="0 0 120 130" width="100%" height="100%"></svg></div><div class="wctl">'+
    '<label>Estilo: realista ↔ anime <input type="range" id="fA" min="0" max="100" value="60"></label><label>Idade: criança ↔ adulto <input type="range" id="fI" min="0" max="100" value="55"></label><label>Expressão <select id="fE"><option value="n">Neutra</option><option value="a">Alegre</option><option value="r">Brava</option><option value="t">Triste</option><option value="s">Surpresa</option></select></label><label><input type="checkbox" id="fG" checked> Mostrar as guias</label><div class="wout" id="fO"></div></div></div>';
  const S=el.querySelector('#fS');
  const draw=()=>{ const a=+el.querySelector('#fA').value/100, id=+el.querySelector('#fI').value/100, ex=el.querySelector('#fE').value, gd=el.querySelector('#fG').checked;
    const cx=60, top=12, chin=118-(1-id)*14, Hh=chin-top; const eyeY=top+Hh*(0.5+a*.06+(1-id)*.06);
    const w=26+(1-id)*4+a*2; const eyeW=7+a*5+(1-id)*3, eyeH=3+a*7+(1-id)*3, gap=eyeW*1.1+3; const noseY=eyeY+(chin-eyeY)*(.45-a*.05), mouthY=noseY+(chin-noseY)*(.42-a*.05);
    const jaw=`M${cx-w} ${top+Hh*.42}Q${cx-w+1} ${top+Hh*.8-a*4} ${cx-(8-a*5)} ${chin-2}Q${cx} ${chin+1} ${cx+(8-a*5)} ${chin-2}Q${cx+w-1} ${top+Hh*.8-a*4} ${cx+w} ${top+Hh*.42}`;
    let g='';
    if(gd) g+='<g stroke="var(--c2)" stroke-dasharray="2 2" stroke-width=".8" fill="none"><path d="M10 '+((top+chin)/2)+'H110"/><path d="M14 '+eyeY+'H106"/><path d="M60 6V124"/><path d="M22 '+noseY+'H98M22 '+mouthY+'H98"/></g><text x="2" y="'+((top+chin)/2-1)+'" font-size="4.5" fill="var(--c2)">metade</text><text x="86" y="'+(eyeY-2)+'" font-size="4.5" fill="var(--c2)">olhos</text>';
    g+='<g fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M'+(cx-w)+' '+(top+Hh*.42)+'A'+w+' '+(Hh*.42)+' 0 0 1 '+(cx+w)+' '+(top+Hh*.42)+'"/><path d="'+jaw+'"/>';
    const sob={n:[0,0],a:[-1,0],r:[3,-3],t:[-3,3],s:[-4,-4]}[ex];
    [-1,1].forEach(sd=>{ const ex0=cx+sd*gap/2+sd*eyeW/2, ey=eyeY; const open=ex==='a'?.35:ex==='s'?1.25:1;
      g+='<path d="M'+(ex0-eyeW)+' '+(ey-eyeH*open*.55)+'Q'+ex0+' '+(ey-eyeH*open*(1.1))+' '+(ex0+eyeW)+' '+(ey-eyeH*open*.45)+'" stroke-width="'+(1.6+a*1.6)+'"/>';
      if(ex!=='a'){ g+='<ellipse cx="'+ex0+'" cy="'+(ey+eyeH*.15)+'" rx="'+(eyeW*.42+a)+'" ry="'+(eyeH*.6*open)+'"/><ellipse cx="'+ex0+'" cy="'+(ey+eyeH*.2)+'" rx="'+(eyeW*.2)+'" ry="'+(eyeH*.32*open)+'" fill="var(--ink)"/>'+(a>.3?'<circle cx="'+(ex0+eyeW*.18)+'" cy="'+(ey-eyeH*.1)+'" r="'+(1+a*1.2)+'" fill="var(--sheet)" stroke="none"/>':'') }
      else g+='<path d="M'+(ex0-eyeW*.7)+' '+(ey+1)+'Q'+ex0+' '+(ey-eyeH*.6)+' '+(ex0+eyeW*.7)+' '+(ey+1)+'"/>';
      g+='<path d="M'+(ex0-sd*eyeW*.9)+' '+(ey-eyeH*1.05-4+sob[0]*.6*(sd<0?1:1))+'Q'+ex0+' '+(ey-eyeH*1.2-6)+' '+(ex0+sd*eyeW*.9)+' '+(ey-eyeH*1.05-4+sob[1])+'" stroke-width="1.3"/>' });
    g+=a<.5?'<path d="M'+(cx-4)+' '+noseY+'q4 3 8 0M'+cx+' '+(eyeY+4)+'L'+(cx-2)+' '+(noseY-2)+'"/>':'<path d="M'+cx+' '+(noseY-2)+'l-1.5 2.5h2"/>';
    const mw=(10-a*4)*(1-(1-id)*.2);
    g+={n:'<path d="M'+(cx-mw/2)+' '+mouthY+'q'+(mw/2)+' 2 '+mw+' 0"/>',a:'<path d="M'+(cx-mw*.7)+' '+(mouthY-1)+'q'+(mw*.7)+' '+(7)+' '+(mw*1.4)+' 0z"/>',r:'<path d="M'+(cx-mw/2)+' '+(mouthY+1)+'q'+(mw/2)+' -3 '+mw+' 0"/>',t:'<path d="M'+(cx-mw/2)+' '+(mouthY+1.5)+'q'+(mw/2)+' -4 '+mw+' 0"/>',s:'<ellipse cx="'+cx+'" cy="'+(mouthY+1)+'" rx="'+(mw*.3)+'" ry="'+(mw*.38)+'"/>'}[ex];
    g+='<path d="M'+(cx-w+1)+' '+(eyeY-2)+'q-6 4 -1 14M'+(cx+w-1)+' '+(eyeY-2)+'q6 4 1 14"/><path d="M'+(cx-w*.45)+' '+(chin-6)+'V128M'+(cx+w*.45)+' '+(chin-6)+'V128"/></g>';
    S.innerHTML=g;
    el.querySelector('#fO').innerHTML='Olhos a <b>'+Math.round((eyeY-top)/Hh*100)+' %</b> da altura (realista ≈ 50 %).<br>Olho com <b>'+Math.round(eyeW*2/(2*w)*100)+' %</b> da largura do rosto.<br>'+(a>=.5?'Nariz vira um traço'+(a>.3?'; brilhos nos olhos.':'.'):'Nariz com asas e ponte.') };
  ['fA','fI','fE','fG'].forEach(i=>el.querySelector('#'+i).oninput=el.querySelector('#'+i).onchange=draw); draw() };

/* ---- flipbook com papel de cebola ---- */
T.flipbook=function(el){
  el.innerHTML='<h4>Flipbook digital</h4><p class="sub">Desenhe com o dedo ou o mouse. O desenho anterior aparece em vermelho clarinho (papel de cebola). Faça uma bola quicando em 8 a 12 quadros e aperte Tocar.</p>'+
    '<div class="fbbar"><button type="button" class="ghost" id="fPrev" aria-label="Quadro anterior">◀</button><span id="fN" class="mono">1 / 1</span><button type="button" class="ghost" id="fNext" aria-label="Próximo quadro">▶</button><button type="button" id="fAdd">+ Quadro</button><button type="button" class="ghost" id="fDup">Duplicar</button><button type="button" class="ghost" id="fClr">Limpar</button><button type="button" class="ghost" id="fDel">Apagar quadro</button></div>'+
    '<div class="cv fbcv" style="aspect-ratio:4/3"><canvas id="fC"></canvas></div>'+
    '<div class="fbbar"><button type="button" id="fPlay">▶ Tocar</button><label class="mono">desenhos/s <input type="range" id="fFps" min="2" max="16" value="8"> <b id="fFv">8</b></label><label><input type="checkbox" id="fOn" checked> papel de cebola</label><button type="button" class="ghost" id="fBola">Exemplo: bola</button></div>';
  const cv=el.querySelector('#fC'); let F=[[]], cur=0, play=null, drawing=null;
  const draw=()=>{ const {x,W,H}=fit(cv); if(W<10) return; x.clearRect(0,0,W,H); x.fillStyle=css('--sheet')||'#fff'; x.fillRect(0,0,W,H);
    x.strokeStyle=css('--line')||'#ccd'; x.lineWidth=1; x.beginPath(); x.moveTo(0,H*.9); x.lineTo(W,H*.9); x.stroke();
    const st=(fr,c,a)=>{ x.globalAlpha=a; x.strokeStyle=c; x.lineWidth=3; x.lineCap=x.lineJoin='round'; fr.forEach(s=>{ x.beginPath(); s.forEach((p,i)=>i?x.lineTo(p[0]*W,p[1]*H):x.moveTo(p[0]*W,p[1]*H)); if(s.length===1) x.lineTo(s[0][0]*W+.1,s[0][1]*H); x.stroke() }); x.globalAlpha=1 };
    if(!play&&el.querySelector('#fOn').checked){ if(cur>0) st(F[cur-1],'#E0565B',.3); if(cur>1) st(F[cur-2],'#E0565B',.12) }
    st(F[cur],css('--ink')||'#13233A',1); el.querySelector('#fN').textContent=(cur+1)+' / '+F.length };
  const pos=e=>{ const r=cv.getBoundingClientRect(); return [(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height] };
  cv.addEventListener('pointerdown',e=>{ if(play) return; cv.setPointerCapture(e.pointerId); drawing=[pos(e)]; F[cur].push(drawing); draw() });
  cv.addEventListener('pointermove',e=>{ if(!drawing) return; drawing.push(pos(e)); draw() });
  ['pointerup','pointercancel'].forEach(t=>cv.addEventListener(t,()=>drawing=null));
  const q=i=>el.querySelector(i);
  q('#fPrev').onclick=()=>{ cur=(cur-1+F.length)%F.length; draw() }; q('#fNext').onclick=()=>{ cur=(cur+1)%F.length; draw() };
  q('#fAdd').onclick=()=>{ F.splice(cur+1,0,[]); cur++; draw() }; q('#fDup').onclick=()=>{ F.splice(cur+1,0,JSON.parse(JSON.stringify(F[cur]))); cur++; draw() };
  q('#fClr').onclick=()=>{ F[cur]=[]; draw() }; q('#fDel').onclick=()=>{ if(F.length>1){ F.splice(cur,1); cur=Math.min(cur,F.length-1) } else F=[[]]; draw() };
  q('#fFps').oninput=()=>{ q('#fFv').textContent=q('#fFps').value; if(play){ clearInterval(play); play=null; q('#fPlay').click() } };
  q('#fOn').onchange=draw;
  q('#fPlay').onclick=()=>{ if(play){ clearInterval(play); play=null; q('#fPlay').textContent='▶ Tocar'; draw(); return } q('#fPlay').textContent='■ Parar'; play=setInterval(()=>{ cur=(cur+1)%F.length; draw() },1000/+q('#fFps').value) };
  q('#fBola').onclick=()=>{ const ys=[.12,.14,.2,.3,.45,.66,.84,.86,.66,.46,.32,.22,.16],xs=ys.map((_,i)=>.1+i*.065); F=ys.map((y,i)=>{ const sq=i===7, st=i===6||i===8; const rx=sq?.07:st?.035:.05, ry=sq?.025:st?.07:.05*4/3; const c=[]; for(let a=0;a<=6.3;a+=.35) c.push([xs[i]+rx*Math.cos(a),(sq?.875:y)+ry*Math.sin(a)]); return [c] }); cur=0; draw() };
  return draw };

/* ---- cronômetro da sessão (30 min ou dia corrido de 10) ---- */
function sessao(el,fases,onFim){
  let i=0, rest=fases[0][1]*60, tk=null, alvo=0;
  const fmt=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(Math.floor(s%60)).padStart(2,'0');
  el.innerHTML='<div class="tm"><div class="tmf" id="tmF"></div><div class="tmt" id="tmT"></div><div class="tmd" id="tmD"></div><div class="tmb"><i id="tmB"></i></div><div class="btns"><button type="button" id="tmGo">Começar</button><button type="button" class="ghost" id="tmSk">Pular fase</button><button type="button" class="ghost" id="tmX">Fechar</button></div></div>';
  const q=s=>el.querySelector(s); const tot=fases.reduce((a,f)=>a+f[1],0)*60;
  const show=()=>{ q('#tmF').textContent='Fase '+(i+1)+' de '+fases.length+' · '+fases[i][0]; q('#tmT').textContent=fmt(Math.max(0,rest)); q('#tmD').textContent=fases[i][2]||'';
    const feito=fases.slice(0,i).reduce((a,f)=>a+f[1],0)*60+(fases[i][1]*60-rest); q('#tmB').style.width=Math.min(100,feito/tot*100)+'%' };
  const prox=()=>{ i++; if(i>=fases.length){ clearInterval(tk); tk=null; q('#tmF').textContent='Sessão concluída! 🎉'; q('#tmT').textContent='00:00'; q('#tmD').textContent='Date a folha, tire uma foto e marque o dia no diário.'; q('#tmB').style.width='100%'; q('#tmGo').hidden=q('#tmSk').hidden=true; try{ navigator.vibrate&&navigator.vibrate([200,100,200]) }catch(e){} onFim&&onFim(); return } rest=fases[i][1]*60; alvo=Date.now()+rest*1000; try{ navigator.vibrate&&navigator.vibrate(150) }catch(e){} show() };
  q('#tmGo').onclick=()=>{ if(tk){ clearInterval(tk); tk=null; q('#tmGo').textContent='Continuar'; return } alvo=Date.now()+rest*1000; q('#tmGo').textContent='Pausar'; tk=setInterval(()=>{ rest=(alvo-Date.now())/1000; if(rest<=0) prox(); else show() },250) };
  q('#tmSk').onclick=()=>{ if(!tk){ alvo=Date.now() } prox(); if(tk) alvo=Date.now()+rest*1000 };
  q('#tmX').onclick=()=>{ clearInterval(tk); el.innerHTML='' };
  show() }
T.timer=function(el){
  el.innerHTML='<h4>Cronômetro de sessão</h4><p class="sub">A estrutura de toda aula: aquecimento, exercício e fechamento.</p><div class="btns"><button type="button" id="t30">Sessão de 30 min</button><button type="button" class="ghost" id="t10">Dia corrido · 10 min</button></div><div id="tBox"></div>';
  el.querySelector('#t30').onclick=()=>sessao(el.querySelector('#tBox'),[['Aquecimento',5,'Linhas, elipses e formas soltas.'],['Exercício',20,'O exercício da aula do dia.'],['Fechamento',5,'Revise, date a folha e tire uma foto.']],()=>window.FDB_ARTE_DIA&&FDB_ARTE_DIA());
  el.querySelector('#t10').onclick=()=>sessao(el.querySelector('#tBox'),[['Aquecimento',2,'Riscos soltos.'],['Exercício',7,'A versão curta da aula.'],['Fechamento',1,'Data e foto.']],()=>window.FDB_ARTE_DIA&&FDB_ARTE_DIA()) };

window.FDB_ARTE_UI={FIG,figHTML,T,sessao};
})();
