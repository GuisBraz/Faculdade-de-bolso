/* FACULDADE DE BOLSO · quadros escritos à mão de Cálculo II ("Ver no quadro")
   Mesmo formato de dados/quadros-gaal.js. Chaves: Q + número da questão da lista (ex.: Q14). */
(function () {
  const Q = window.FDB_QUADROS = window.FDB_QUADROS || {};
  const F = (a, b) => '<span class="fr"><span>' + a + '</span><span>' + b + '</span></span>';
  const BOLA = '<svg viewBox="0 0 220 150" style="width:220px;max-width:100%;display:block;margin:4px 0" aria-label="bola com os pontos (1,2,2) e (2,1,3)">'
    + '<circle cx="80" cy="78" r="62" fill="none" stroke="#0E1F38" stroke-width="2"/>'
    + '<ellipse cx="80" cy="78" rx="62" ry="18" fill="none" stroke="#0E1F38" stroke-width="1.4" stroke-dasharray="5 4"/>'
    + '<circle cx="80" cy="78" r="2.5" fill="#0E1F38"/><text x="66" y="96" font-size="11" fill="#55667D">centro</text>'
    + '<circle cx="104" cy="34" r="4" fill="#E0601A"/><text x="112" y="32" font-size="13" fill="#E0601A">(1, 2, 2) · 120°</text>'
    + '<circle cx="128" cy="108" r="4" fill="#1E62C9"/><text x="136" y="112" font-size="13" fill="#1E62C9">(2, 1, 3)</text>'
    + '<line x1="104" y1="34" x2="124" y2="100" stroke="#1E62C9" stroke-width="2.4"/><path d="M128,108 l-9,-6 l7,-3 z" fill="#1E62C9"/>'
    + '<text x="120" y="70" font-size="13" fill="#1E62C9">v</text></svg>';
  Q.calc2 = {
  Q14: { t: '14) Bola de metal: T ∝ 1/distância', r: 'Receita: monta T com K → acha K pelo dado → vetor direção unitário → gradiente → D<sub>u</sub>T = ∇T · u⃗',
    b: ['#Monta T e acha o K',
      'T(x, y, z) = ' + F('K', '√(x² + y² + z²)'),
      'T(1, 2, 2) = 120 «b|(dado no problema)»',
      'substituindo: ' + F('K', '√(1² + 2² + 2²)') + ' = 120 → ' + F('K', '3') + ' = 120 → «o|K = 360»',
      'T(x, y, z) = ' + F('360', '√(x² + y² + z²)') + ' = «o|360·(x² + y² + z²)<sup>−1/2</sup>»',
      '~ escreve com expoente: fica fácil derivar pela regra da potência',
      '#Direção | u⃗ = v⃗ / ‖v⃗‖',
      BOLA,
      { s: ['v⃗ = (2, 1, 3) − (1, 2, 2) = (1, −1, 1)', '‖v⃗‖ = √(1² + (−1)² + 1²) = √3', 'u⃗ = ' + F('v⃗', '‖v⃗‖') + ' = «o|(1/√3 , −1/√3 , 1/√3)»'], a: '' },
      '#Gradiente | ∇T = (T<sub>x</sub>, T<sub>y</sub>, T<sub>z</sub>)',
      'T<sub>x</sub> = 360·(−1/2)·(x² + y² + z²)<sup>−3/2</sup>·«b|2x»',
      '~ o −1/2 desce, o expoente vira −3/2 e a cadeia traz o 2x (o 2 corta com o 1/2)',
      '∇T = ( ' + F('−360x', '(x² + y² + z²)<sup>3/2</sup>') + ' , ' + F('−360y', '(x² + y² + z²)<sup>3/2</sup>') + ' , ' + F('−360z', '(x² + y² + z²)<sup>3/2</sup>') + ' )',
      '#Substitui no ponto | (1, 2, 2)',
      '1 + 4 + 4 = 9 → 9<sup>3/2</sup> = «o|27»',
      '∇T(1, 2, 2) = ( ' + F('−360·1', '27') + ' , ' + F('−360·2', '27') + ' , ' + F('−360·2', '27') + ' ) = «o|( −40/3 , −80/3 , −80/3 )»',
      '#Assim | D<sub>u</sub>T = ∇T · u⃗',
      'D<sub>u</sub>T(1, 2, 2) = (−40/3 , −80/3 , −80/3) · (1/√3 , −1/√3 , 1/√3)',
      ' = ' + F('−40 + 80 − 80', '3√3') + ' = «o|−40/(3√3)»',
      '~ negativo: indo para (2, 1, 3) a temperatura cai',
      '=D<sub>u</sub>T(1, 2, 2) = −40/(3√3) ≈ −7,7 °C/u.c.'] }
  };
})();
