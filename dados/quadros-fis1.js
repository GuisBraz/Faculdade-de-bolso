/* FACULDADE DE BOLSO · quadros escritos à mão da Física I ("Ver no quadro")
   Mesmo modelo da GAAL e da Química: t = título, r = receita, b = blocos.
   Blocos: "#Título | fórmula" (etapa numerada) · "~ nota" · "=conclusão" · texto = linha
           {c:[[...],[...]]} caixas lado a lado ("*..." = título da caixa) · {s:[...], a:"..."} sistema com chave
   Realces: «o|laranja» «g|verde» «r|vermelho» «b|azul» · vetor: letra + ⃗ (ex.: v⃗) */
(function () {
  const Q = window.FDB_QUADROS = window.FDB_QUADROS || {};
  const TAB = rows => '<table style="border-collapse:collapse;margin:6px 0;font-size:1.05em">' + rows.map((r, i) => '<tr>' + r.map((c, j) => '<td style="padding:4px 14px;' + (i === 0 ? 'border-bottom:2px solid currentColor;font-weight:700;' : '') + (j === 0 ? 'font-size:.85em;opacity:.8;' : 'text-align:center;') + '">' + c + '</td>').join('') + '</tr>').join('') + '</table>';
  const FR = (a, b) => '<span style="display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.15"><span style="border-bottom:1.5px solid currentColor;padding:0 4px">' + a + '</span><span>' + b + '</span></span>';
  const O = '#E8692D', B = '#1E50B4', V = '#2E8B57', R = '#C0392B';
  const SV = (w, h, inner) => '<svg class="fig" viewBox="0 0 ' + w + ' ' + h + '" style="font-family:inherit">' + inner + '</svg>';
  const SETA = (x1, y1, x2, y2, c, w) => { const a = Math.atan2(y2 - y1, x2 - x1), s = 11; return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c + '" stroke-width="' + (w || 3) + '" stroke-linecap="round"/><path d="M' + x2 + ' ' + y2 + 'L' + (x2 - s * Math.cos(a - .42)).toFixed(1) + ' ' + (y2 - s * Math.sin(a - .42)).toFixed(1) + 'L' + (x2 - s * Math.cos(a + .42)).toFixed(1) + ' ' + (y2 - s * Math.sin(a + .42)).toFixed(1) + 'Z" fill="' + c + '"/>' };
  const TX = (x, y, t, c, s) => '<text x="' + x + '" y="' + y + '" fill="' + (c || 'currentColor') + '" font-size="' + (s || 16) + '">' + t + '</text>';

  Q.fis1 = {
  /* ================= MÓDULO 1 · unidades ================= */
  'fis-u1': { t: 'km/h → m/s', r: 'Receita: escreva as equivalências → multiplique por frações que valem 1 → corte as unidades',
    b: ['#Equivalências | 1 km = 1000 m · 1 h = 3600 s',
      '#Multiplicar por "1" | fator de conversão',
      '108 ' + FR('km', 'h') + ' × ' + FR('1000 m', '1 km') + ' × ' + FR('1 h', '3600 s'),
      '~ km corta com km, h corta com h → sobra m/s',
      FR('108 000', '3600') + ' m/s = «o|30 m/s»',
      '#Atalho | km/h ÷ 3,6 = m/s', '108 ÷ 3,6 = «o|30 m/s»', '~ volta: m/s × 3,6 = km/h',
      '=108 km/h = 30 m/s'] },
  'fis-u2': { t: 'm² → cm²', r: 'Receita: converta o comprimento → área é comprimento × comprimento → eleve o fator ao quadrado',
    b: ['#Comprimento | 1 m = 100 cm',
      '#Área | o fator vai ao quadrado', '1 m² = 100 cm × 100 cm = «b|10 000 cm²»', '~ não é 100! área tem duas dimensões',
      '#Conta | 2,5 × 10 000', '2,5 m² = «o|25 000 cm²» = 2,5 × 10⁴ cm²',
      '=2,5 m² = 25 000 cm²'] },

  /* ================= posição ================= */
  'fis-p1': { t: 'Carrinho: vai 12 m e volta 4 m', r: 'Receita: eixo + origem → posições → Δx = final − inicial → v_méd = Δx/Δt · s_méd = distância/Δt',
    b: [SV(460, 120, '<line x1="20" y1="80" x2="440" y2="80" stroke="currentColor" stroke-width="2"/>' + TX(430, 104, 'x', null, 15) + TX(36, 104, '0') + TX(330, 104, '12') + TX(236, 104, '8') +
        SETA(40, 50, 340, 50, B) + TX(150, 40, 'ida: +12 m (8 s)', B, 14) + SETA(340, 66, 250, 66, R) + TX(256, 60, '', R) + TX(262, 100, '', R) + TX(350, 70, 'volta: −4 m (4 s)', R, 14)),
      '#Posições | origem no início, frente = +', 'x₁ = 0 → vai até 12 m → volta até «b|x₂ = 8 m»',
      '#Deslocamento | Δx = x₂ − x₁', 'Δx = 8 − 0 = «o|8,0 m»', '~ só olha início e fim',
      '#Velocidade média | v_méd = Δx / Δt', 'Δt = 8 + 4 = 12 s → v_méd = 8 ÷ 12 = «o|0,67 m/s»',
      '#Rapidez média | distância total / Δt', 'distância = 12 + 4 = 16 m → s_méd = 16 ÷ 12 = «o|1,3 m/s»',
      '~ a rapidez é maior porque conta a ida e a volta',
      '=Δx = 8,0 m · v_méd ≈ 0,67 m/s · s_méd ≈ 1,3 m/s'] },
  'fis-p2': { t: 'De x = −3 m até x = 15 m', r: 'Receita: Δx = x₂ − x₁ (cuidado com o sinal) → Δt = t₂ − t₁ → v_méd = Δx/Δt',
    b: [{ c: [['*início', 'x₁ = −3,0 m', 't₁ = 1,0 s'], ['*fim', 'x₂ = 15 m', 't₂ = 4,0 s']] },
      '#Deslocamento | Δx = x₂ − x₁', 'Δx = 15 − (−3,0) = 15 + 3,0 = «b|18 m»', '~ menos com menos vira mais',
      '#Tempo | Δt = t₂ − t₁', 'Δt = 4,0 − 1,0 = «b|3,0 s»',
      '#Velocidade média | Δx / Δt', 'v_méd = 18 ÷ 3,0 = «o|6,0 m/s»', '~ positiva → andou no sentido +x',
      '=Δx = 18 m · v_méd = 6,0 m/s'] },

  /* ================= velocidade instantânea ================= */
  'fis-v1': { t: 'Elevador: x(t) = 3t² − 12t + 2', r: 'Receita: derive x(t) (regra do tombo) → substitua t → v = 0 dá o instante em que para',
    b: ['#Derivar | d(c·tⁿ)/dt = c·n·tⁿ⁻¹',
      { c: [['*3t²', '2 desce: 3·2·t', '→ «b|6t»'], ['*−12t', 't¹ → 1', '→ «b|−12»'], ['*+2', 'constante', '→ «b|0»']] },
      'v(t) = «o|6t − 12»',
      '#Substituir | t = 1 s e t = 3 s',
      { c: [['*t = 1 s', 'v = 6 − 12 = «o|−6 m/s»', '<small>sentido negativo</small>'], ['*t = 3 s', 'v = 18 − 12 = «o|+6 m/s»', '<small>sentido positivo</small>']] },
      '#Quando para? | v = 0', '6t − 12 = 0 → «o|t = 2 s»', '~ é o fundo do "vale" do gráfico x × t: ali ele inverte o sentido',
      '=v(1) = −6 m/s · v(3) = +6 m/s · para em t = 2 s'] },
  'fis-v2': { t: 'x(t) = 2t³: média × instantânea', r: 'Receita: média = Δx/Δt usando duas posições · instantânea = derivada no instante',
    b: ['#Velocidade média | (x₂ − x₁)/(t₂ − t₁)', 'x(1) = 2·1³ = 2 m · x(2) = 2·2³ = 16 m', 'v_méd = (16 − 2) ÷ (2 − 1) = «o|14 m/s»',
      '#Instantânea | v = dx/dt', 'v(t) = 2·3·t² = «b|6t²»', 'v(2) = 6·4 = «o|24 m/s»',
      '~ diferentes: ele está acelerando, então no fim anda mais rápido que a média',
      '=v_méd = 14 m/s · v(2 s) = 24 m/s'] },

  /* ================= aceleração ================= */
  'fis-a1': { t: 'Elevador: acelerando ou freando?', r: 'Receita: derive v(t) → compare o sinal de v com o de a → mesmo sinal = acelera · opostos = freia',
    b: ['#Aceleração | a = dv/dt', 'v(t) = 6t − 12 → a = «o|6 m/s²» (constante)',
      '#Comparar sinais | v × a',
      { c: [['*t = 1 s', 'v = «r|−6» · a = «g|+6»', 'sinais opostos', '→ «r|freando»'], ['*t = 3 s', 'v = «g|+6» · a = «g|+6»', 'mesmo sinal', '→ «g|acelerando»']] },
      '~ ele vinha para trás, parou em t = 2 s e voltou ganhando velocidade',
      '=a = 6 m/s² · t = 1 s freando · t = 3 s acelerando'] },
  'fis-a2': { t: '0 a 100 km/h em 10 s', r: 'Receita: passe para m/s → a_méd = Δv/Δt → divida por 9,8 para ter em g',
    b: ['#Unidade | km/h ÷ 3,6', '100 ÷ 3,6 = «b|27,8 m/s»',
      '#Aceleração média | Δv / Δt', 'a_méd = (27,8 − 0) ÷ 10 = «o|2,78 m/s²»', '~ a cada segundo ganha 2,78 m/s (≈ 10 km/h)',
      '#Em g | 1 g = 9,8 m/s²', '2,78 ÷ 9,8 = «o|0,28 g»',
      '=a_méd ≈ 2,8 m/s² ≈ 0,28 g'] },

  /* ================= MUV ================= */
  'fis-m1': { t: 'Carro freando de 20 m/s até parar', r: 'Receita: eixo → liste os 5 (Δx, v₀, v, a, t) → o que falta escolhe a equação',
    b: ['#Os 5 personagens | marque dados e pedidos',
      TAB([['Δx', 'v₀', 'v', 'a', 't'], ['«o|?»', '«b|20»', '«b|0»', '«b|−5,0»', '«o|?»']]),
      '~ freia → a com sinal oposto ao de v · "até parar" → v = 0',
      '#Tempo | ① v = v₀ + at (sem Δx)', '0 = 20 + (−5,0)t → 5t = 20 → «o|t = 4,0 s»',
      '#Distância | ③ v² = v₀² + 2aΔx (sem t)', '0 = 20² + 2(−5,0)Δx → 0 = 400 − 10Δx → «o|Δx = 40 m»',
      '#Conferir | ④ Δx = ½(v₀ + v)t', '½(20 + 0)·4,0 = 40 m «g|✓»',
      '=t = 4,0 s · distância de frenagem = 40 m'] },
  'fis-m2': { t: 'Empilhadeira: repouso, 1,5 m/s² por 6 s', r: 'Receita: "repouso" → v₀ = 0 → ① para v → ② para Δx',
    b: [TAB([['Δx', 'v₀', 'v', 'a', 't'], ['«o|?»', '«b|0»', '«o|?»', '«b|1,5»', '«b|6,0»']]),
      '#Velocidade | ① v = v₀ + at', 'v = 0 + 1,5 · 6,0 = «o|9,0 m/s»',
      '#Distância | ② Δx = v₀t + ½at²', 'Δx = 0 + ½ · 1,5 · 6,0² = 0,75 · 36 = «o|27 m»',
      '~ conferindo com ④: ½(0 + 9,0)·6,0 = 27 m «g|✓»',
      '=v = 9,0 m/s · andou 27 m'] },

  /* ================= queda livre ================= */
  'fis-q1': { t: 'Chave caindo de 20 m', r: 'Receita: eixo y para cima → a = −g → Δy negativo se terminou embaixo → 5 equações',
    b: [{ c: [['*dados', 'v₀ = 0 (repouso)', 'a = «b|−9,8 m/s²»', 'Δy = «b|−20 m»'], ['*pede', 't = ?', 'v = ?']] },
      '~ terminou 20 m abaixo da origem → Δy negativo',
      '#Tempo | ② Δy = v₀t + ½at²', '−20 = 0 − 4,9t² → t² = 20 ÷ 4,9 = 4,08', '«o|t ≈ 2,0 s»',
      '#Velocidade | ③ v² = v₀² + 2aΔy', 'v² = 0 + 2(−9,8)(−20) = 392', 'v = −√392 = «o|−19,8 m/s»', '~ escolhe a raiz negativa: está descendo',
      '=t ≈ 2,0 s · v ≈ 19,8 m/s para baixo'] },
  'fis-q2': { t: 'Bola jogada para cima a 12 m/s', r: 'Receita: no topo v = 0 → ③ dá a altura → ① dá o tempo de subida → no ar = 2 × subida',
    b: ['#Dados | eixo y para cima', 'v₀ = 12 m/s · a = −9,8 m/s² · no topo «b|v = 0»', '~ no topo a aceleração continua −9,8!',
      '#Altura | ③ v² = v₀² + 2aΔy', '0 = 144 − 19,6h → «o|h ≈ 7,3 m»',
      '#Tempo de subida | ① v = v₀ + at', '0 = 12 − 9,8t → t = «b|1,22 s»',
      '#Tempo no ar | sobe = desce', '2 × 1,22 = «o|2,4 s»',
      '=sobe 7,3 m · fica 2,4 s no ar'] },

  /* ================= gráficos ================= */
  'fis-g1': { t: 'Ponte rolante: área do gráfico v × t', r: 'Receita: área sob v × t = deslocamento (quebre em figuras) · inclinação = aceleração',
    b: [SV(460, 170, '<line x1="30" y1="140" x2="440" y2="140" stroke="currentColor" stroke-width="2"/><line x1="30" y1="140" x2="30" y2="14" stroke="currentColor" stroke-width="2"/>' +
        '<path d="M30 140 L110 50 L360 50 L400 140 Z" fill="' + B + '" fill-opacity=".15"/><path d="M30 140 L110 50 L360 50 L400 140" fill="none" stroke="' + B + '" stroke-width="3"/>' +
        TX(54, 126, 'A₁', O, 15) + TX(220, 104, 'A₂', O, 15) + TX(368, 126, 'A₃', O, 15) + TX(104, 160, '4', null, 13) + TX(350, 160, '14', null, 13) + TX(394, 160, '16', null, 13) + TX(6, 56, '2', null, 13) + TX(420, 160, 't', null, 14) + TX(10, 20, 'v', null, 14)),
      '#Áreas | triângulo · retângulo · triângulo',
      { c: [['*A₁ arrancada', '½ · 4,0 · 2,0', '→ «b|4,0 m»'], ['*A₂ meio', '(14 − 4) · 2,0', '→ «b|20 m»'], ['*A₃ frenagem', '½ · 2,0 · 2,0', '→ «b|2,0 m»']] },
      'Δx = 4,0 + 20 + 2,0 = «o|26 m»',
      '#Acelerações | inclinação = Δv / Δt',
      { c: [['*arrancada', '2,0 ÷ 4,0', '«o|0,50 m/s²»'], ['*meio', 'reta deitada', '«o|0»'], ['*frenagem', '(0 − 2,0) ÷ 2,0', '«o|−1,0 m/s²»']] },
      '=andou 26 m · a = 0,50 · 0 · −1,0 m/s²'] },

  /* ================= vetores ================= */
  'fis-ve1': { t: 'Componentes de 500 N a 30°', r: 'Receita: ângulo a partir de +x → Fₓ = F cos θ · F_y = F sen θ → confira com Pitágoras',
    b: [SV(420, 180, '<line x1="30" y1="150" x2="390" y2="150" stroke="currentColor" stroke-width="1.6"/><line x1="30" y1="150" x2="30" y2="14" stroke="currentColor" stroke-width="1.6"/>' +
        SETA(30, 150, 300, 30, O, 3.4) + SETA(30, 150, 300, 150, B, 3) + '<line x1="300" y1="150" x2="300" y2="34" stroke="' + V + '" stroke-width="3" stroke-dasharray="7 5"/>' +
        TX(140, 80, 'F = 500 N', O) + TX(130, 172, 'Fₓ', B) + TX(310, 96, 'F_y', V) + '<path d="M80 150 A50 50 0 0 0 76 130" fill="none" stroke="currentColor" stroke-width="1.6"/>' + TX(86, 144, '30°', null, 13)),
      '#Componentes | Fₓ = F cos θ · F_y = F sen θ',
      { c: [['*horizontal', 'Fₓ = 500 · cos 30°', '→ 500 · 0,866', '→ «o|433 N»'], ['*vertical', 'F_y = 500 · sen 30°', '→ 500 · 0,5', '→ «o|250 N»']] },
      '#Conferir | F = √(Fₓ² + F_y²)', '√(433² + 250²) = √250 000 = 500 N «g|✓»',
      '=Fₓ ≈ 433 N · F_y = 250 N'] },
  'fis-ve2': { t: 'aₓ = −3, a_y = 4: módulo e ângulo', r: 'Receita: Pitágoras → arctg(a_y/aₓ) → se aₓ < 0, some 180°',
    b: ['#Módulo | a = √(aₓ² + a_y²)', 'a = √(9 + 16) = √25 = «o|5,0 m»',
      '#Ângulo da calculadora | arctg(a_y / aₓ)', 'arctg(4,0 ÷ −3,0) = «r|−53,1°»', '~ a calculadora só devolve ângulos entre −90° e 90°',
      '#Quadrante | aₓ < 0 e a_y > 0 → 2º quadrante',
      { c: [['*rascunho', 'seta para a esquerda', 'e para cima'], ['*correção', '−53,1° + 180°', '→ «o|126,9°»']] },
      '=a = 5,0 m · θ ≈ 127° a partir de +x'] },

  /* ================= unitários ================= */
  'fis-un1': { t: 'a⃗ + b⃗ e a⃗ − b⃗ por componentes', r: 'Receita: some î com î e ĵ com ĵ → Pitágoras para o módulo → arctg para o ângulo',
    b: [{ c: [['*a⃗', '4,0 î − 3,0 ĵ'], ['*b⃗', '−1,0 î + 7,0 ĵ']] },
      '#Soma | rₓ = aₓ + bₓ · r_y = a_y + b_y', 'rₓ = 4,0 + (−1,0) = «b|3,0»', 'r_y = −3,0 + 7,0 = «b|4,0»', 'r⃗ = «o|3,0 î + 4,0 ĵ» (m)',
      '#Módulo e ângulo | √ e arctg', '|r⃗| = √(9 + 16) = «o|5,0 m»', 'θ = arctg(4,0 ÷ 3,0) = «o|53,1°»', '~ rₓ > 0: não precisa corrigir o quadrante',
      '#Subtração | dₓ = aₓ − bₓ · d_y = a_y − b_y', 'dₓ = 4,0 − (−1,0) = «b|5,0»', 'd_y = −3,0 − 7,0 = «b|−10»', 'd⃗ = «o|5,0 î − 10 ĵ» (m)',
      '=r⃗ = 3,0î + 4,0ĵ (5,0 m a 53°) · d⃗ = 5,0î − 10ĵ'] },
  'fis-un2': { t: 'Robô: 10 m leste + 8 m a 30° N do O', r: 'Receita: decomponha cada trecho (com sinal) → some por eixo → módulo e ângulo',
    b: [SV(420, 170, '<line x1="20" y1="140" x2="400" y2="140" stroke="currentColor" stroke-width="1.2" opacity=".5"/>' + SETA(60, 140, 330, 140, B) + SETA(330, 140, 145, 33, O) + SETA(60, 140, 145, 36, V, 2.6) +
        TX(170, 160, 'd₁ = 10 m', B, 14) + TX(250, 74, 'd₂ = 8 m', O, 14) + TX(40, 80, 'R', V, 16) + TX(370, 164, 'leste', null, 12)),
      '#Componentes | leste = +x · norte = +y',
      { c: [['*d₁', 'x = «b|10»', 'y = «b|0»'], ['*d₂ (30° N do O)', 'x = −8,0 cos 30° = «b|−6,93»', 'y = +8,0 sen 30° = «b|+4,0»']] },
      '~ oeste é −x: por isso o sinal negativo',
      '#Somar | por eixo', 'Rₓ = 10 − 6,93 = «b|3,07 m»', 'R_y = 0 + 4,0 = «b|4,0 m»',
      '#Módulo e direção | √ e arctg', '|R| = √(3,07² + 4,0²) = «o|5,0 m»', 'θ = arctg(4,0 ÷ 3,07) = «o|52,5°» ao norte do leste',
      '=deslocamento ≈ 5,0 m a 52° ao norte do leste'] },

  /* ================= produtos ================= */
  'fis-pr1': { t: 'Produto escalar e o ângulo', r: 'Receita: a⃗·b⃗ = aₓbₓ + a<sub>y</sub>b<sub>y</sub> + a<sub>z</sub>b<sub>z</sub> → módulos → cos φ = a⃗·b⃗ / (a b)',
    b: [{ c: [['*a⃗', '1 î + 2 ĵ + 2 k̂'], ['*b⃗', '4 î + 0 ĵ + 3 k̂']] },
      '#Produto escalar | multiplica par a par e soma', '1·4 + 2·0 + 2·3 = 4 + 0 + 6 = «o|10»', '~ resultado é um número, não uma seta',
      '#Módulos | √(x² + y² + z²)', 'a = √(1 + 4 + 4) = «b|3» · b = √(16 + 0 + 9) = «b|5»',
      '#Ângulo | a⃗·b⃗ = a b cos φ', 'cos φ = 10 ÷ (3 · 5) = 0,667', 'φ = arccos 0,667 = «o|48,2°»',
      '=a⃗·b⃗ = 10 · φ ≈ 48°'] },
  'fis-pr2': { t: 'Produto vetorial a⃗ × b⃗', r: 'Receita: no plano xy, a⃗ × b⃗ = (aₓb<sub>y</sub> − a<sub>y</sub>bₓ) k̂ → |a⃗ × b⃗| = a b sen φ → confira com o escalar',
    b: [{ c: [['*a⃗', '2 î + 1 ĵ'], ['*b⃗', '−1 î + 3 ĵ']] },
      '#Vetorial | (aₓb<sub>y</sub> − a<sub>y</sub>bₓ) k̂', '(2 · 3 − 1 · (−1)) k̂ = (6 + 1) k̂ = «o|7 k̂»', '~ aponta para fora do plano (eixo z): perpendicular aos dois',
      '#Módulos | a · b', 'a = √5 ≈ 2,24 · b = √10 ≈ 3,16 → a · b = √50 ≈ «b|7,07»',
      '#Dois caminhos para φ | sen e cos',
      { c: [['*pelo vetorial', 'sen φ = 7 ÷ 7,07', '→ 0,990'], ['*pelo escalar', 'a⃗·b⃗ = −2 + 3 = 1', 'cos φ = 1 ÷ 7,07 = 0,141', 'φ = «o|81,9°»']] },
      'sen 81,9° = 0,990 «g|✓» os dois concordam',
      '=a⃗ × b⃗ = 7k̂ · φ ≈ 82°'] },

  /* ================= 2D ================= */
  'fis-2d1': { t: 'Drone: r⃗(t) = 2t² î + (8t − t²) ĵ', r: 'Receita: cada eixo é um problema do cap. 2 → derive x e y separados → junte em vetor → módulo e ângulo',
    b: ['#Posição em t = 2 | substitua', 'x = 2·4 = 8 · y = 16 − 4 = 12 → r⃗ = «o|8 î + 12 ĵ» (m)',
      '#Velocidade | derive cada eixo',
      { c: [['*eixo x', 'x = 2t²', 'vₓ = «b|4t»', 't = 2 → 8'], ['*eixo y', 'y = 8t − t²', 'v_y = «b|8 − 2t»', 't = 2 → 4']] },
      'v⃗ = «o|8 î + 4 ĵ» m/s → |v| = √80 = 8,9 m/s · θ = arctg(4/8) = 26,6°',
      '#Aceleração | derive de novo',
      { c: [['*eixo x', 'aₓ = «b|4»'], ['*eixo y', 'a_y = «b|−2»']] },
      'a⃗ = «o|4 î − 2 ĵ» m/s² → |a| = √20 = 4,5 m/s², 26,6° abaixo de +x',
      '=r⃗ = 8î + 12ĵ · v⃗ = 8î + 4ĵ (8,9 m/s) · a⃗ = 4î − 2ĵ (4,5 m/s²)'] },
  'fis-2d2': { t: 'Drone: velocidade média de 0 a 2 s', r: 'Receita: Δr⃗ = r⃗₂ − r⃗₁ → v⃗_méd = Δr⃗ / Δt',
    b: ['#Posições | t = 0 e t = 2', 'r⃗(0) = 0 î + 0 ĵ · r⃗(2) = 8 î + 12 ĵ',
      '#Deslocamento | Δr⃗', 'Δr⃗ = «b|8 î + 12 ĵ» (m)',
      '#Velocidade média | Δr⃗ / Δt', 'v⃗_méd = (8 î + 12 ĵ) ÷ 2 = «o|4 î + 6 ĵ» m/s', '|v⃗_méd| = √(16 + 36) = «o|7,2 m/s»',
      '=v⃗_méd = 4î + 6ĵ m/s ≈ 7,2 m/s'] },

  /* ================= projéteis ================= */
  'fis-pj1': { t: 'Peça caindo da bancada', r: 'Receita: dois eixos → y é queda livre (acha t) → x é velocidade constante (usa o mesmo t)',
    b: [SV(440, 170, '<rect x="20" y="40" width="90" height="110" fill="none" stroke="currentColor" stroke-width="2"/><line x1="10" y1="150" x2="430" y2="150" stroke="currentColor" stroke-width="2"/>' +
        '<path d="M110 40 Q 190 44 260 150" fill="none" stroke="' + O + '" stroke-width="3" stroke-dasharray="6 5"/>' + SETA(110, 40, 175, 40, B) + TX(130, 30, 'v₀ₓ = 3,0', B, 14) +
        '<line x1="350" y1="40" x2="350" y2="150" stroke="' + V + '" stroke-width="1.6"/>' + TX(358, 100, '1,25 m', V, 14) + '<line x1="110" y1="162" x2="260" y2="162" stroke="' + O + '" stroke-width="1.6"/>' + TX(160, 168, '', O) + TX(166, 140, 'x = ?', O, 14)),
      { c: [['*x (velocidade constante)', 'v₀ₓ = 3,0 m/s', 'a = 0'], ['*y (queda livre)', 'v₀y = 0', 'a = −9,8 m/s²', 'Δy = −1,25 m']] },
      '#Tempo pelo eixo y | Δy = v₀y t − ½gt²', '−1,25 = 0 − 4,9t² → t² = 0,255 → «o|t = 0,505 s»',
      '#Distância pelo eixo x | x = v₀ₓ t', 'x = 3,0 × 0,505 = «o|1,52 m»', '~ o tempo é a ponte entre os dois eixos',
      '=t ≈ 0,51 s · cai a ≈ 1,5 m da bancada'] },
  'fis-pj2': { t: 'Chute a 20 m/s e 30°', r: 'Receita: decompor v₀ → topo: v_y = 0 → voo = 2 × subida → alcance = v₀ₓ · t_voo',
    b: [SV(460, 170, '<line x1="10" y1="150" x2="450" y2="150" stroke="currentColor" stroke-width="2"/><path d="M30 150 Q 230 -40 430 150" fill="none" stroke="' + O + '" stroke-width="3"/>' +
        SETA(30, 150, 110, 104, B) + SETA(30, 150, 110, 150, B, 2) + SETA(30, 150, 30, 104, V, 2) + TX(56, 116, 'v₀', B, 14) +
        '<line x1="230" y1="55" x2="230" y2="150" stroke="' + V + '" stroke-dasharray="5 4"/>' + TX(238, 104, 'H', V) + TX(220, 168, 'R', O) + SETA(200, 55, 262, 55, B, 2) + TX(266, 52, 'só vₓ no topo', B, 12)),
      '#Decompor | v₀ₓ = v₀ cos θ · v₀y = v₀ sen θ',
      { c: [['*x', 'v₀ₓ = 20 cos 30°', '→ «b|17,3 m/s»'], ['*y', 'v₀y = 20 sen 30°', '→ «b|10 m/s»']] },
      '#Altura máxima | H = v₀y² / 2g', 'H = 100 ÷ 19,6 = «o|5,1 m»',
      '#Tempo de voo | v_y = v₀y − gt', 'topo: 0 = 10 − 9,8t → 1,02 s → voo = 2 × 1,02 = «o|2,04 s»',
      '#Alcance | x = v₀ₓ · t', 'R = 17,3 × 2,04 = «o|35,3 m»', '~ pela fórmula: 20² · sen 60° ÷ 9,8 = 35,3 m «g|✓»',
      '=H ≈ 5,1 m · voo ≈ 2,0 s · alcance ≈ 35 m'] },

  /* ================= MCU ================= */
  'fis-c1': { t: 'Disco de corte: 230 mm a 6 600 rpm', r: 'Receita: raio em metros → rpm ÷ 60 = voltas/s → v = 2πr · f → a = v²/r',
    b: ['#Raio | diâmetro ÷ 2, em metros', 'r = 230 ÷ 2 = 115 mm = «b|0,115 m»',
      '#Frequência | rpm ÷ 60', 'f = 6 600 ÷ 60 = «b|110 voltas/s» → T = 1/110 = 0,00909 s',
      '#Rapidez | v = 2πr / T = 2πr · f', 'v = 2π · 0,115 · 110 = «o|79,5 m/s»', '~ ≈ 286 km/h na borda do disco',
      '#Aceleração centrípeta | a = v² / r', 'a = 79,5² ÷ 0,115 = 6 320 ÷ 0,115 ≈ «o|55 000 m/s²»', 'em g: 55 000 ÷ 9,8 ≈ «r|5 600 g»',
      '~ por isso disco trincado explode: o material precisa segurar essa aceleração',
      '=v ≈ 79 m/s · a ≈ 5,5 × 10⁴ m/s² (≈ 5 600 g)'] },
  'fis-c2': { t: 'Carro na curva: 50 m a 72 km/h', r: 'Receita: km/h → m/s → a = v²/r → direção: para o centro',
    b: ['#Unidade | ÷ 3,6', '72 ÷ 3,6 = «b|20 m/s»',
      '#Aceleração centrípeta | a = v² / r', 'a = 20² ÷ 50 = 400 ÷ 50 = «o|8,0 m/s²»',
      '#Em g | ÷ 9,8', '8,0 ÷ 9,8 = «o|0,82 g»', '~ aponta para o centro da curva, mesmo com o velocímetro parado',
      '=a = 8,0 m/s² (≈ 0,82 g) para o centro'] },

  /* ================= relativo ================= */
  'fis-r1': { t: 'Operador andando no trem', r: 'Receita: nomeie P, B, A → v_PA = v_PB + v_BA → cuidado com o sinal',
    b: ['#Quem é quem | P = operador · B = trem · A = plataforma', 'v_BA = «b|+20 m/s» (trem visto da plataforma)',
      '#Fórmula | v_PA = v_PB + v_BA', '~ os índices de dentro (B) se cancelam: P«b|B» + «b|B»A → PA',
      { c: [['*andando para a frente', 'v_PB = +1,5', 'v_PA = 1,5 + 20', '→ «o|21,5 m/s»'], ['*andando para trás', 'v_PB = −1,5', 'v_PA = −1,5 + 20', '→ «o|18,5 m/s»']] },
      '~ mesmo andando para trás, para quem está na plataforma ele ainda vai para a frente',
      '=21,5 m/s para a frente · 18,5 m/s para trás'] },
  'fis-r2': { t: 'Barco atravessando o rio', r: 'Receita: v⃗_PA = v⃗_PB + v⃗_BA (soma de vetores) → tempo pela componente que atravessa → deriva pela outra',
    b: [SV(440, 190, '<rect x="20" y="30" width="400" height="130" fill="' + B + '" fill-opacity=".08"/><line x1="20" y1="30" x2="420" y2="30" stroke="currentColor" stroke-width="2"/><line x1="20" y1="160" x2="420" y2="160" stroke="currentColor" stroke-width="2"/>' +
        SETA(80, 160, 80, 60, B) + TX(88, 104, '4,0 (motor)', B, 13) + SETA(80, 160, 155, 160, V, 2.6) + TX(100, 182, '3,0 (correnteza)', V, 13) + SETA(80, 160, 155, 60, O, 3.4) + TX(160, 90, '5,0 m/s', O, 14) +
        '<path d="M80 160 L320 30" stroke="' + O + '" stroke-dasharray="6 5" fill="none" stroke-width="1.6"/>' + TX(300, 24, 'chega 60 m rio abaixo', O, 13) + TX(380, 104, '80 m', null, 13)),
      '#Quem é quem | P = barco · B = água · A = margem',
      { c: [['*v⃗_PB (motor)', '0 î + 4,0 ĵ'], ['*v⃗_BA (correnteza)', '3,0 î + 0 ĵ']] },
      '#Somar vetores | v⃗_PA = v⃗_PB + v⃗_BA', 'v⃗_PA = «o|3,0 î + 4,0 ĵ» m/s → |v| = √(9 + 16) = «o|5,0 m/s»', 'θ = arctg(4,0 ÷ 3,0) = 53° do leste para o norte',
      '#Tempo | só o norte atravessa', 't = 80 ÷ 4,0 = «o|20 s»',
      '#Deriva | a correnteza leva para o leste', '3,0 × 20 = «o|60 m»',
      '=5,0 m/s a 53° do leste · 20 s · desce 60 m'] },

  /* ================= MÓDULO 2 · capítulo 7 ================= */
  'fis-t1': { t: 'Trabalho de cada força no carrinho', r: 'Receita: ache o ângulo φ de cada força com o deslocamento → W = F d cos φ → some tudo',
    b: [SV(440, 170, '<rect x="160" y="70" width="110" height="60" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="20" y1="130" x2="420" y2="130" stroke="currentColor" stroke-width="2"/>' +
        SETA(270, 90, 380, 30, O) + TX(330, 30, 'T = 120 N', O, 14) + SETA(160, 115, 80, 115, R) + TX(60, 106, 'f = 50 N', R, 14) + SETA(215, 130, 215, 165, B, 2.4) + TX(222, 165, 'P', B) + SETA(215, 70, 215, 30, V, 2.4) + TX(222, 38, 'N', V) +
        SETA(300, 155, 400, 155, 'currentColor', 1.6) + TX(330, 150, 'd = 6 m', null, 12)),
      '#Ângulos | φ entre a força e o deslocamento',
      TAB([['força', 'φ', 'W = F d cos φ'], ['corda 120 N', '30°', '120·6,0·0,866 = «g|+624 J»'], ['atrito 50 N', '180°', '50·6,0·(−1) = «r|−300 J»'], ['peso', '90°', '«b|0»'], ['normal', '90°', '«b|0»']]),
      '~ forças perpendiculares ao movimento não fazem trabalho',
      '#Total | soma de todos', 'W_total = 624 − 300 + 0 + 0 = «o|324 J»',
      '=W_corda ≈ 624 J · W_atrito = −300 J · W_P = W_N = 0 · total ≈ 324 J'] },
  'fis-t2': { t: 'Velocidade final pelo teorema W = ΔK', r: 'Receita: W_total = K_f − K_i → K = ½mv² → isole v',
    b: ['#Teorema | W_total = K_f − K_i', 'repouso → «b|K_i = 0»', '324 = K_f − 0 → «b|K_f = 324 J»',
      '#Energia cinética | K = ½ m v²', '½ · 40 · v² = 324 → 20 v² = 324', 'v² = 16,2 → «o|v ≈ 4,0 m/s»',
      '~ sem precisar de aceleração nem de tempo: só começo e fim',
      '=v ≈ 4,0 m/s'] },
  'fis-w1': { t: 'Ponte rolante erguendo 200 kg a 3 m', r: 'Receita: W_P = −mgh subindo → parte e termina parada: ΔK = 0 → W_cabo = −W_P',
    b: ['#Peso | P = m g', 'P = 200 · 9,8 = «b|1 960 N» (para baixo)',
      '#Trabalho do peso | subindo: φ = 180°', 'W_P = −mgh = −1 960 · 3,0 = «o|−5 880 J»', '~ o peso "tira" energia enquanto a peça sobe',
      '#Trabalho do cabo | W_cabo + W_P = ΔK = 0', 'W_cabo = −W_P = «o|+5 880 J»',
      '=W_P ≈ −5,9 kJ · W_cabo ≈ +5,9 kJ'] },
  'fis-w2': { t: 'Bloco batendo na mola', r: 'Receita: só a mola faz trabalho → W_mola = −½kx² (saindo do relaxado) → W = ΔK → isole x',
    b: [SV(440, 120, '<line x1="20" y1="90" x2="420" y2="90" stroke="currentColor" stroke-width="2"/><line x1="40" y1="30" x2="40" y2="90" stroke="currentColor" stroke-width="4"/>' +
        '<path d="M40 60 l12 -14 l12 28 l12 -28 l12 28 l12 -28 l12 28 l12 -28 l12 14" fill="none" stroke="' + V + '" stroke-width="2.4"/><rect x="190" y="50" width="60" height="40" fill="none" stroke="currentColor" stroke-width="2"/>' +
        SETA(260, 70, 330, 70, B) + TX(270, 60, 'v = 2,0 m/s', B, 13) + TX(60, 30, 'k = 200 N/m', V, 13) + TX(196, 112, '0,50 kg', null, 12)),
      '#Quem faz trabalho? | só a mola',
      '~ peso e normal são perpendiculares · sem atrito',
      '#Energias | K = ½mv²', { c: [['*início', 'K_i = ½ · 0,50 · 2,0²', '→ «b|1,0 J»'], ['*fim', 'parou', 'K_f = «b|0»']] },
      '#Trabalho da mola | W_mola = ½kxᵢ² − ½kx_f²', 'xᵢ = 0 (relaxada) → W_mola = «b|−½ k x²»',
      '#Teorema | W = ΔK', '−½ · 200 · x² = 0 − 1,0 → 100 x² = 1,0', 'x² = 0,010 → «o|x = 0,10 m»',
      '=a mola encolhe 0,10 m (10 cm)'] },
  'fis-f1': { t: 'Trabalho de força variável', r: 'Receita: área sob F × x (quebre em figuras) · com fórmula: integre F(x) entre os limites',
    b: ['#Pelo gráfico | área = trabalho',
      { c: [['*retângulo (0 a 2 m)', '10 · 2,0', '→ «b|20 J»'], ['*triângulo (2 a 4 m)', '½ · 2,0 · 10', '→ «b|10 J»']] },
      'W = 20 + 10 = «o|30 J»',
      '#Pela integral | W = ∫ F dx', 'W = ∫₀² 3x² dx', '~ regra: ∫ c·xⁿ dx = c·xⁿ⁺¹/(n + 1) → ∫3x² dx = 3·x³/3 = x³',
      'W = [x³]₀² = 2,0³ − 0³ = «o|8,0 J»',
      '=gráfico: 30 J · F = 3x²: 8,0 J'] },
  'fis-f2': { t: 'Potência do guincho', r: 'Receita: velocidade constante → F = peso → W = F d → P = W / Δt (confira com P = F v)',
    b: ['#Força do cabo | velocidade constante → F = P', 'F = 500 · 9,8 = «b|4 900 N»',
      '#Trabalho | W = F d', 'W = 4 900 · 12 = «b|58 800 J»',
      '#Potência média | P = W / Δt', 'P = 58 800 ÷ 20 = «o|2 940 W»',
      '#Conferir | P = F · v', 'v = 12 ÷ 20 = 0,60 m/s → 4 900 · 0,60 = 2 940 W «g|✓»',
      '#Em cv | ÷ 746', '2 940 ÷ 746 ≈ «o|3,9 cv»',
      '=P ≈ 2,9 kW ≈ 3,9 cv'] }
  };

  /* x_y → x com índice (no SVG vira tspan) */
  const SUBR = /([A-Za-zΔ\u20D7ₓ₀-₉])_([A-Za-zé0-9]+)/g;
  const fixs = v => typeof v === 'string' ? (v.startsWith('<svg') ? v.replace(SUBR, '$1<tspan baseline-shift="sub" font-size="72%">$2</tspan>') : v.replace(SUBR, '$1<sub>$2</sub>')) : Array.isArray(v) ? v.map(fixs) : (v && typeof v === 'object') ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fixs(x)])) : v;
  Object.keys(Q.fis1).forEach(k => { Q.fis1[k] = fixs(Q.fis1[k]) });
})();
