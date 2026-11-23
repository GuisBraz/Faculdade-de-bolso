/* FACULDADE DE BOLSO · quadros escritos à mão de Desenho I / AutoCAD ("Ver no quadro")
   Mesmo modelo das outras matérias: t = título, r = receita, b = blocos.
   Blocos: "#Título | fórmula" · "~ nota" · "=conclusão" · {c:[[...],[...]]} caixas lado a lado
   Realces: «o|laranja» «g|verde» «r|vermelho» «b|azul» (azul = o que se digita) */
(function () {
  const Q = window.FDB_QUADROS = window.FDB_QUADROS || {};
  const O = '#E8692D', B = '#1E50B4', V = '#2E8B57';
  /* contorno com pontos numerados, encaixado numa caixa de 300 × 170 */
  const SH = (pts, o) => { o = o || {}; const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const W = o.w || 300, H = o.h || 170, k = Math.min((W - 50) / Math.max(x1 - x0, 1e-6), (H - 40) / Math.max(y1 - y0, 1e-6)), X = x => 25 + (x - x0) * k, Y = y => H - 20 - (y - y0) * k;
    const P = pts.map(p => X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1)).join(' ');
    const lab = o.sem ? '' : pts.map((p, i) => '<circle cx="' + X(p[0]).toFixed(1) + '" cy="' + Y(p[1]).toFixed(1) + '" r="2.6" fill="' + O + '"/><text x="' + (X(p[0]) + 4).toFixed(1) + '" y="' + (Y(p[1]) - 4).toFixed(1) + '" font-size="10" fill="' + B + '">' + (o.nomes ? o.nomes[i] : 'P' + (i + 1)) + '</text>').join('');
    const org = o.origem ? '<path d="M' + X(0) + ' ' + Y(0) + ' h22 M' + X(0) + ' ' + Y(0) + ' v-22" stroke="#999" stroke-width="1"/><text x="' + (X(0) + 3) + '" y="' + (Y(0) + 12) + '" font-size="9" fill="#777">0,0</text>' : '';
    return '<svg class="fig" viewBox="0 0 ' + W + ' ' + H + '" style="max-width:' + W + 'px">' + org + '<polygon points="' + P + '" fill="rgba(30,80,180,.07)" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' + lab + '</svg>' };
  const pol = (ini, passos) => { const p = [ini]; let c = ini; passos.forEach(([d, a]) => { c = [c[0] + d * Math.cos(a * Math.PI / 180), c[1] + d * Math.sin(a * Math.PI / 180)]; p.push(c) }); p.pop(); return p };
  const T = s => '«b|' + s + '»';
  const FLANGE = '<svg class="fig" viewBox="0 0 220 200" style="max-width:220px"><circle cx="110" cy="100" r="80" fill="rgba(30,80,180,.07)" stroke="currentColor" stroke-width="2"/><circle cx="110" cy="100" r="40" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="110" cy="100" r="60" fill="none" stroke="#C0392B" stroke-dasharray="10 3 2 3"/>' +
    [0, 1, 2, 3, 4, 5].map(i => { const a = Math.PI / 2 + i * Math.PI / 3; return '<circle cx="' + (110 + 60 * Math.cos(a)).toFixed(1) + '" cy="' + (100 - 60 * Math.sin(a)).toFixed(1) + '" r="8" fill="none" stroke="' + (i ? 'currentColor' : O) + '" stroke-width="2"/>' }).join('') +
    '<text x="110" y="196" text-anchor="middle" font-size="11" fill="' + B + '">Ø120 · Ø60 · PCD Ø90 · 6 × Ø12</text></svg>';
  const PORCA = (() => { const R = 60, a = 60 / Math.cos(Math.PI / 6); const p = [0, 1, 2, 3, 4, 5].map(i => { const t = Math.PI / 6 + i * Math.PI / 3; return (110 + a * Math.cos(t)).toFixed(1) + ',' + (95 - a * Math.sin(t)).toFixed(1) }).join(' ');
    return '<svg class="fig" viewBox="0 0 220 200" style="max-width:220px"><circle cx="110" cy="95" r="' + a.toFixed(1) + '" fill="none" stroke="#999" stroke-dasharray="4 3"/><circle cx="110" cy="95" r="' + R + '" fill="none" stroke="' + V + '" stroke-dasharray="4 3"/><polygon points="' + p + '" fill="rgba(30,80,180,.07)" stroke="currentColor" stroke-width="2"/><circle cx="110" cy="95" r="40" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<line x1="110" y1="95" x2="110" y2="35" stroke="' + V + '" stroke-width="2"/><text x="114" y="62" font-size="11" fill="' + V + '">a = 12</text><line x1="110" y1="95" x2="' + (110 + a * Math.cos(Math.PI / 6)).toFixed(1) + '" y2="' + (95 - a * Math.sin(Math.PI / 6)).toFixed(1) + '" stroke="' + O + '" stroke-width="2"/><text x="150" y="92" font-size="11" fill="' + O + '">R = 13,86</text><text x="110" y="192" text-anchor="middle" font-size="11" fill="' + B + '">chave 24 · furo Ø16</text></svg>' })();

  Q.dt1 = {
  'cad-01': { t: 'Lendo o prompt do CIRCLE', r: 'Receita: o que ele pede (Specify…) → opções [ ] pela maiúscula → padrão < > com Enter',
    b: ['~ CIRCLE Specify radius of circle or [Diameter] <5.0000>:', { c: [['*o que pede', 'o «b|raio»', '~ padrão < > = 5'], ['*opção [Diameter]', 'letra maiúscula «b|D»', '~ troca raio por diâmetro']] },
      '#Furo Ø12 | 2 caminhos', { c: [['*pela opção', T('D') + ' ↵', T('12') + ' ↵'], ['*pelo raio', T('6') + ' ↵', '~ 12 ÷ 2']] }, '=D ↵ 12 ↵ (ou 6 ↵)'] },
  'cad-02': { t: 'Casinha com coordenadas absolutas', r: 'Receita: L ↵ → cada ponto como X,Y medido da origem → C fecha',
    b: [SH([[0, 0], [40, 0], [40, 10], [30, 10], [30, 30], [20, 50], [10, 30], [10, 10], [0, 10]], { origem: 1 }), '#Comando | LINE', T('L') + ' ↵',
      '#Pontos | X,Y', T('0,0') + ' · ' + T('40,0') + ' · ' + T('40,10') + ' · ' + T('30,10') + ' · ' + T('30,30'), T('20,50') + ' (bico) · ' + T('10,30') + ' · ' + T('10,10') + ' · ' + T('0,10'), '~ cada um seguido de Enter',
      '#Fechar | Close', T('C') + ' ↵ → volta ao P1 e termina', '=9 pontos absolutos + C'] },
  'cad-03': { t: 'Seta de telhado com relativas', r: 'Receita: L ↵ → P1 → @ΔX,ΔY de cada trecho, lidos das cotas → C',
    b: [SH([[0, 0], [50, 0], [50, 20], [-10, 20], [70, 50], [150, 20], [90, 20], [90, 0], [140, 0], [140, -15], [0, -15]]), '#Base e alça | @ΔX,ΔY',
      T('@50,0') + ' · ' + T('@0,20') + ' · ' + T('@-60,0'), '~ − = esquerda ou para baixo', '#Telhado | 80 para o lado, 30 de altura', T('@80,30') + ' · ' + T('@80,-30'),
      '#Volta | lado direito e base', T('@-60,0') + ' · ' + T('@0,-20') + ' · ' + T('@50,0') + ' · ' + T('@0,-15') + ' · ' + T('@-140,0'), '~ o slide para aqui: falta o lado P11 → P1', T('C') + ' ↵', '=10 relativas + C'] },
  'cad-04': { t: 'Peixe com coordenadas polares', r: 'Receita: L ↵ → P1 → @comprimento<ângulo (0° à direita, anti-horário) → C',
    b: [SH(pol([0, 0], [[20, 315], [25, 0], [10, 300], [10, 240], [25, 180], [20, 225], [20, 90], [4, 0], [5.6, 90], [4, 180], [1, 0]])), '#Corpo de cima | @d<θ', T('@20<315') + ' · ' + T('@25<0'), '~ 315° = 45° abaixo do eixo, descendo para a direita',
      '#Ponta 120° | 300° e 240°', T('@10<300') + ' · ' + T('@10<240'), '#Corpo de baixo | voltando', T('@25<180') + ' · ' + T('@20<225') + ' · ' + T('@20<90'),
      '#Dentinho | 4 · 5,6 · 4', T('@4<0') + ' · ' + T('@5.6<90') + ' · ' + T('@4<180'), '~ decimal com «r|ponto»: 5.6', T('C') + ' ↵', '=10 polares + Close'] },
  'cad-05': { t: 'Porca M16 · chave 24', r: 'Receita: POL 6 → centro → C (circunscrito, pela chave) → raio = chave ÷ 2 → furo',
    b: [PORCA, '#Sextavado | POL', T('POL') + ' ↵ ' + T('6') + ' ↵ ' + T('50,50') + ' ↵', T('C') + ' ↵ (chave = face a face)', 'raio = 24 ÷ 2 = ' + T('12') + ' ↵',
      '#Furo | Ø16', T('C') + ' ↵ ' + T('50,50') + ' ↵ ' + T('D') + ' ↵ ' + T('16') + ' ↵', '#Confere os cantos | R = a / cos 30°', 'R = 12 / 0,866 = «o|13,86» → canto a canto 27,7', '=POL 6 · C · 12 + círculo Ø16'] },
  'cad-06': { t: 'Chapa 120 × 80 com 4 furos', r: 'Receita: REC com @ → centros = bordas ± 15 → CIRCLE (Enter repete)',
    b: [SH([[0, 0], [120, 0], [120, 80], [0, 80]], { sem: 1, origem: 1 }), '#Chapa | REC', T('REC') + ' ↵ ' + T('0,0') + ' ↵ ' + T('@120,80') + ' ↵',
      '#Centros | 15 das bordas', { c: [['*X', '15', '120 − 15 = «o|105»'], ['*Y', '15', '80 − 15 = «o|65»']] }, '(15,15) · (105,15) · (105,65) · (15,65)',
      '#Furos | Ø10', T('C') + ' ↵ ' + T('15,15') + ' ↵ ' + T('D') + ' ↵ ' + T('10') + ' ↵', '~ Enter vazio repete o CIRCLE para os outros 3', '=REC @120,80 + 4 furos Ø10'] },
  'cad-07': { t: 'Furo com FROM', r: 'Receita: comando → FROM → ponto base com OSNAP → @deslocamento',
    b: ['#Comando | CIRCLE', T('C') + ' ↵ · pede o centro', '#FROM | base + deslocamento', T('FROM') + ' ↵ · clica o canto inferior esquerdo «g|(Endpoint)»', T('@30,25') + ' ↵ → centro a 30 e 25 do canto',
      '#Diâmetro | 20', T('D') + ' ↵ ' + T('20') + ' ↵', '~ sem linha auxiliar para apagar depois', '=C · FROM · canto · @30,25 · D 20'] },
  'cad-08': { t: 'Furo no centro da chapa', r: 'Receita: 3 jeitos de achar o centro sem medir',
    b: [{ c: [['*M2P', T('C') + ' ↵ ' + T('M2P'), 'clica 2 cantos opostos', '→ meio exato'], ['*OTRACK (F11)', 'passa o mouse nos 2 «g|Midpoints»', 'clica no cruzamento das guias'], ['*polilinha', 'OSNAP «g|Geometric Center»', 'direto no centro']] },
      'raio: ' + T('5') + ' ↵', '=M2P · OTRACK · GCEN'] },
  'cad-09': { t: 'Flange com ARRAYPOLAR', r: 'Receita: círculos concêntricos → 1 furo no PCD → ARRAYPOLAR em volta do centro',
    b: [FLANGE, '#Discos | Ø120 e Ø60', T('C') + ' ↵ ' + T('0,0') + ' ' + T('D') + ' ' + T('120') + ' · ↵ ' + T('0,0') + ' ' + T('D') + ' ' + T('60'),
      '#1º furo | no topo do PCD', 'raio do PCD = 90 ÷ 2 = 45 → centro «o|0,45»', T('C') + ' ↵ ' + T('0,45') + ' ' + T('D') + ' ' + T('12'),
      '#Array | polar', T('ARRAYPOLAR') + ' · furo ↵ · centro ' + T('0,0') + ' · Items ' + T('6') + ' · 360°', '~ passo = 360° / 6 = 60°', '=6 furos Ø12 a cada 60°'] },
  'cad-10': { t: 'Moldura com cantos R10', r: 'Receita: REC com Fillet → OFFSET para dentro',
    b: ['#Chapa | REC → Fillet', T('REC') + ' ↵ ' + T('F') + ' ↵ ' + T('10') + ' ↵', T('0,0') + ' ↵ ' + T('@100,60') + ' ↵', '#Janela | OFFSET 10', T('O') + ' ↵ ' + T('10') + ' ↵ · clica a chapa · clica «g|dentro»',
      '~ a janela sai 80 × 40 e o raio interno vira 10 − 10 = 0', '=REC (Fillet 10) + OFFSET 10'] },
  'cad-11': { t: 'SCALE com Reference', r: 'Receita: SCALE → tudo → base → R → mede a linha conhecida → digita o tamanho certo',
    b: ['#Fórmula | fator = certa / atual', 'fator = 5000 / 1250 = «o|4»', '#No AutoCAD | o fator sai sozinho', T('SC') + ' ↵ ' + T('ALL') + ' ↵ ↵ · base: ponta da parede', T('R') + ' ↵ · clica as 2 pontas (1250)', 'new length: ' + T('5000') + ' ↵',
      '~ confira com DI na parede', '=SCALE · Reference · 5000'] },
  'cad-12': { t: 'Padrão de layers', r: 'Receita: LA → New → nome, cor, tipo de linha (Load), espessura → Current',
    b: ['#Gerenciador | LA', T('LA') + ' ↵ → New Layer', { c: [['*Contorno', 'cor 3 «g|verde»', 'Continuous', '0,5'], ['*Centro', 'cor 1 «r|vermelha»', 'ISO dash dot', '0,2'], ['*Tracejada', 'cor 2 amarela', 'ISO dash', '0,2']] },
      '~ Linetype → Load… para trazer ISO dash e ISO dash dot', '~ objetos sempre em ByLayer', '#Atual | ✓ Current', 'duplo clique no Contorno', '#Guardar | .dwt', 'Save As → Drawing Template', '=9 layers · Contorno atual · template salvo'] },
  'cad-13': { t: 'Corte da bucha de bronze', r: 'Receita: parede = (Dext − Dint)/2 → H → ANSI33 → Pick Points → eixo sem hachura',
    b: ['#Parede | (40 − 25)/2', '(40 − 25) / 2 = «b|7,5» → dois retângulos 50 × 7,5', '#Hachura | layer Hachura', T('H') + ' ↵ · pattern «o|ANSI33» (bronze)', 'Pick Points: dentro dos 2 retângulos ↵',
      '#Eixo de aço | regra da norma', 'eixo maciço em corte longitudinal: «r|NÃO hachura»', '=bucha ANSI33 · eixo sem hachura'] },
  'cad-14': { t: 'Cotando a peça 2.B', r: 'Receita: menores perto · maiores por fora · cada medida uma vez · sem cotar diagonal',
    b: [SH([[0, 0], [50, 0], [65, 20], [65, 50], [60, 50], [35, 20], [15, 20], [-10, 50], [-15, 50], [-15, 20]], { sem: 1 }), '#Horizontais | DLI + DCO', '15 · «o|50» · 15 em corrente, e «o|80» por fora',
      '#Verticais | lado direito', '«o|20» + «o|30» em corrente', '#Detalhes | vão e abas', 'vão «o|20» · altura do vão «o|20» · abas «o|5»', '~ diagonais ficam definidas pelos pontos: cotar seria repetir', '=50, 15, 15, 80, 20, 30, 20, 20, 5, 5'] },
  'cad-15': { t: 'Suporte em L: as 3 vistas', r: 'Receita: frontal → XLINE H/V → superior embaixo → linha a 45° → lateral à direita → TRIM e layers',
    b: ['#1º diedro | posição', { c: [['*frontal', 'em cima, à esquerda'], ['*lateral esq.', 'à «b|direita» da frontal'], ['*superior', '«b|embaixo» da frontal']] },
      '#Frontal | 40 × 30 + meio círculo R20', T('REC') + ' 0,0 @40,30 · ' + T('C') + ' 20,30 R 20 → TRIM metade de baixo', '#Chamadas | XLINE', T('XL') + ' ' + T('H') + ' / ' + T('V') + ' pelos cantos · layer auxiliar',
      '#Superior | aba R15 com Ø15', '40 × 20 + aba de 30 com ponta R15 · furo Ø15 a 30 da face de trás', '#Lateral | o L', T('XL') + ' ' + T('A') + ' 45 no canto → profundidades viram larguras', 'chapa 10 · base 10 · furo tracejado',
      '=frontal + superior + lateral, alinhadas'] },
  'cad-16': { t: 'Carimbo com atributos', r: 'Receita: desenha no layer 0 → ATTDEF para cada campo → campo de data → BLOCK com base no canto',
    b: ['#Fixo | layer 0', 'linhas + textos "TÍTULO", "ESCALA"…', '#Campos | ATT', { c: [['*NUM', 'Tag NUM', 'Prompt "Número"'], ['*TITULO', 'Tag TITULO'], ['*ESCALA', 'Tag ESCALA'], ['*DATA', 'Insert field → Date', '«g|atualiza sozinha»']] },
      '#Bloco | B', T('B') + ' ↵ nome «o|CARIMBO-A4» · base: canto inferior direito', '~ WBLOCK para usar em todo projeto', '=carimbo com 3 atributos + data automática'] },
  'cad-17': { t: 'Escala para 1800 × 650 numa A3', r: 'Receita: área útil → folga 30 % → n = maior razão → próxima escala da norma → XP e texto',
    b: ['#Área útil A3 | 420 × 297', '≈ «b|388 × 233» (margens 25/7 + carimbo)', '#Com folga | × 1,3', '1800 × 1,3 = 2340 · 650 × 1,3 = 845', '#n | maior razão', '2340 / 388 = «o|6,0» · 845 / 233 = 3,6',
      '#Norma | arredonda para cima', '6 → «o|1:10»', '#Configurar | viewport e texto', T('Z') + ' ↵ ' + T('0.1XP') + ' · texto 2,5 × 10 = «o|25» · DIMSCALE 10', '=1:10 · 0.1XP · texto 25 no model'] },
  'cad-18': { t: 'Chapa paramétrica', r: 'Receita: AUTOCONSTRAIN → FIX → cotas dimensionais com nome → fórmulas no PARAMETERS',
    b: ['#Prender | restrições', 'AUTOCONSTRAIN · GCFIX no canto', '#Fórmulas | PARAMETERS', { c: [['*parâmetro', 'L', 'altura', 'furo', 'borda'], ['*expressão', '120', 'L*0.6', 'L/8', '1.5*L/8']] },
      '#Teste | muda só L', { c: [['*L = 120', '120 × 72', 'Ø15 · a 22,5'], ['*L = 200', '200 × 120', 'Ø25 · a 37,5']] }, '=a peça se redesenha sozinha'] },
  'cad-19': { t: 'Virola Ø1000 × 12,5 × 1500', r: 'Receita: diâmetro médio → π·Dm → retângulo Dm·π × H',
    b: ['#Diâmetro médio | Dm = Dext − t', '1000 − 12,5 = «b|987,5»', '#Comprimento | π·Dm', 'π × 987,5 = «o|3102,3»', '#Chapa | retângulo', '3102,3 × 1500', '~ pelo externo daria 3141,6: «r|39,3 a mais» = π × 12,5', '=corte 3102,3 × 1500 mm'] },
  'cad-20': { t: 'Redução concêntrica Ø600 → Ø300', r: 'Receita: geratriz → R = D·g/(D − d) → r = R − g → θ = 180·D/R → desenha a coroa',
    b: ['#Geratriz | g = √(h² + ((D − d)/2)²)', '√(400² + 150²) = √182500 = «b|427,2»', '#Raios | R = D·g/(D − d)', 'R = 600 × 427,2 / 300 = «o|854,4»', 'r = 854,4 − 427,2 = «o|427,2»',
      '#Ângulo | θ = 180°·D/R', '180 × 600 / 854,4 = «o|126,4°»', '#No CAD | 2 círculos + 2 raios + TRIM', T('C') + ' 0,0 854.4 · ' + T('C') + ' 0,0 427.2', T('L') + ' 0,0 @900<90 · ' + T('L') + ' 0,0 @900<216.4', '~ confere: R·θ = 854,4 × 2,206 = 1885 = π × 600 ✓', '=coroa R 854,4 · r 427,2 · θ 126,4°'] },
  'cad-21': { t: 'Atalho FF = fillet raio 0', r: 'Receita: macro no CUI com ^C^C → opções separadas por espaço → ; = Enter',
    b: ['#Macro | CUI', T('^C^C_FILLET _R 0 ;_FILLET'), { c: [['*^C^C', 'cancela o que estiver rodando'], ['*_R 0', 'raio zero'], ['*;_FILLET', 'Enter e já começa de novo']] },
      '#Ou em LISP | 1 linha', T('(defun c:FF () (command "_.FILLET" "_R" 0 "_.FILLET"))'), '=FF fecha cantos com 1 atalho'] },
  'cad-22': { t: 'Limpando um DXF de 300 peças', r: 'Receita: QSELECT pela propriedade → Ctrl+1 muda tudo → OVERKILL → PURGE → AUDIT',
    b: ['#Selecionar | QSELECT', 'Text · Height · = · ' + T('3.5'), '#Mudar | Ctrl+1', 'Height: ' + T('2.5') + ' → todos juntos', '#Duplicatas | OVERKILL', T('OVERKILL') + ' ' + T('ALL') + ' ↵ ↵ OK', '#Arquivo | PURGE + AUDIT', 'Purge All · AUDIT → ' + T('Y'), '=menos de 1 minuto'] },

  'cad-t1-2': { t: 'Letra M em malha', r: 'Receita: conte os quadradinhos a partir da origem → X,Y de cada ponto → C',
    b: [SH([[3, 1], [7, 1], [7, 2], [6, 2], [7, 3], [7, 5], [6, 5], [5, 4], [4, 5], [3, 5], [3, 3], [4, 2], [3, 2]], { origem: 1 }), '#Pontos | absolutos',
      T('3,1') + ' ' + T('7,1') + ' ' + T('7,2') + ' ' + T('6,2') + ' ' + T('7,3') + ' ' + T('7,5') + ' ' + T('6,5'), T('5,4') + ' ' + T('4,5') + ' ' + T('3,5') + ' ' + T('3,3') + ' ' + T('4,2') + ' ' + T('3,2') + ' ' + T('C'), '=13 pontos + C'] },
  'cad-t1-3': { t: 'Letra L em malha', r: 'Receita: X,Y de cada ponto contando a malha → C',
    b: [SH([[3, 1], [3, 6], [4, 6], [4, 2], [5, 2], [6, 3], [7, 3], [7, 1]], { origem: 1 }), '#Pontos | absolutos', T('3,1') + ' ' + T('3,6') + ' ' + T('4,6') + ' ' + T('4,2') + ' ' + T('5,2') + ' ' + T('6,3') + ' ' + T('7,3') + ' ' + T('7,1') + ' ' + T('C'), '=8 pontos + C'] },
  'cad-t1-4': { t: 'Peça com rasgo em V (X = 25, Y = 15)', r: 'Receita: monte cada trecho pelas cotas → relativas a partir de 25,15 → C',
    b: [SH([[25, 15], [105, 15], [105, 30], [85, 50], [85, 65], [70, 65], [60, 55], [50, 55], [40, 65], [25, 65]]), '#Cotas | somas', 'em cima: 15 + 10 + 10 + 10 + 15 = 60 · total 80', 'direita: 15 + 20 + 15 = 50',
      '#Relativas | a partir de 25,15', T('@80,0') + ' ' + T('@0,15') + ' ' + T('@-20,20') + ' ' + T('@0,15') + ' ' + T('@-15,0'), T('@-10,-10') + ' ' + T('@-10,0') + ' ' + T('@-10,10') + ' ' + T('@-15,0') + ' ' + T('C'), '=10 pontos + C'] },
  'cad-t1-6': { t: 'Peça 2.B com relativas', r: 'Receita: siga P1 → P11 lendo ΔX e ΔY nas cotas',
    b: [SH([[0, 0], [50, 0], [65, 20], [65, 50], [60, 50], [35, 20], [15, 20], [-10, 50], [-15, 50], [-15, 20]]), '#Direita | sobe', T('@50,0') + ' ' + T('@15,20') + ' ' + T('@0,30') + ' ' + T('@-5,0'),
      '#Vão do meio | 20 de largura, a 20 do chão', T('@-25,-30') + ' ' + T('@-20,0') + ' ' + T('@-25,30'), '#Esquerda | desce', T('@-5,0') + ' ' + T('@0,-30') + ' ' + T('C'), '=10 trechos + C'] },
  'cad-t1-8': { t: 'Estrela de 6 pontas', r: 'Receita: triângulos equiláteros → lados de 30 → ângulo muda de 60° em 60°',
    b: [SH(pol([0, 0], [[30, 60], [30, 0], [30, 120], [30, 60], [30, 180], [30, 120], [30, 240], [30, 180], [30, 300], [30, 240], [30, 0], [30, 300]]), { sem: 1 }), '#Polares | todos com 30',
      T('@30<60') + ' ' + T('@30<0') + ' ' + T('@30<120') + ' ' + T('@30<60'), T('@30<180') + ' ' + T('@30<120') + ' ' + T('@30<240') + ' ' + T('@30<180'), T('@30<300') + ' ' + T('@30<240') + ' ' + T('@30<0') + ' ' + T('C'),
      '~ em cada par: 2ª direção = 1ª − 60° · o par seguinte começa 120° adiante', '=11 polares + C'] },
  'cad-t2-1': { t: 'Moldura', r: 'Receita: REC → OFFSET 10 para dentro',
    b: [T('REC') + ' ↵ ' + T('0,0') + ' ↵ ' + T('@100,60') + ' ↵', T('O') + ' ↵ ' + T('10') + ' ↵ · clica · clica dentro · ↵', '=2 retângulos: 100 × 60 e 80 × 40'] },
  'cad-t2-2': { t: 'Cruz com TRIM', r: 'Receita: 2 retângulos cruzados → EXPLODE → TRIM do miolo',
    b: [SH([[30, 0], [50, 0], [50, 30], [80, 30], [80, 50], [50, 50], [50, 80], [30, 80], [30, 50], [0, 50], [0, 30], [30, 30]], { sem: 1 }), '#Retângulos | horizontal e vertical', T('REC') + ' ' + T('0,30') + ' ' + T('@80,20') + ' · ' + T('REC') + ' ' + T('30,0') + ' ' + T('@20,80'),
      '#Soltar | X', T('X') + ' ' + T('ALL') + ' ↵ ↵', '#Aparar | 4 pedaços do miolo', T('TR') + ' → clica os 4 trechos dentro do quadrado 20 × 20', '=12 arestas do contorno'] },
  'cad-t2-3': { t: '2.B com MIRROR', r: 'Receita: metade da direita → MIRROR pelo eixo x = 25 → não apaga o original',
    b: ['#Metade | de x = 25 a 65', T('L') + ' ' + T('25,0') + ' ' + T('50,0') + ' ' + T('65,20') + ' ' + T('65,50') + ' ' + T('60,50') + ' ' + T('35,20') + ' ' + T('25,20') + ' ↵',
      '#Espelho | eixo vertical', T('MI') + ' ' + T('ALL') + ' ↵ ↵ · ' + T('25,0') + ' · ' + T('25,50') + ' · ' + T('N'), '~ largura total: 65 − (−15) = 80 ✓', '=peça inteira com metade do trabalho'] }
  };
})();
