/* FACULDADE DE BOLSO · quadros escritos à mão de Cálculo II ("Ver no quadro")
   Mesmo formato de dados/quadros-gaal.js.
   Chaves: x0…x48 = exemplos das aulas (data-q na página) · Q + número = questões da lista (ex.: Q14).
   Figuras desenhadas aqui mesmo em SVG: P2 (plano xy), S3 (superfície 3D), ARV (árvore da cadeia) e esboços. */
(function () {
  const Q = window.FDB_QUADROS = window.FDB_QUADROS || {};
  const K = { ink: '#0E1F38', o: '#E0601A', b: '#1E62C9', g: '#22884A', r: '#C73A2C', p: '#6447BE', m: '#55667D' };
  const F = (a, b) => '<span class="fr"><span>' + a + '</span><span>' + b + '</span></span>';
  const n1 = v => (Math.round(v * 10) / 10).toFixed(1);
  const txt = (x, y, t, c, s, a) => '<text x="' + n1(x) + '" y="' + n1(y) + '" font-size="' + (s || 13) + '" fill="' + (c || K.ink) + '"' + (a ? ' text-anchor="' + a + '"' : '') + ' font-family="FDB Kalam,Kalam,cursive">' + t + '</text>';
  const seta = (x1, y1, x2, y2, c, w) => {
    const g = Math.atan2(y2 - y1, x2 - x1), h = 9;
    return '<line x1="' + n1(x1) + '" y1="' + n1(y1) + '" x2="' + n1(x2 - Math.cos(g) * 4) + '" y2="' + n1(y2 - Math.sin(g) * 4) + '" stroke="' + c + '" stroke-width="' + (w || 2.4) + '" stroke-linecap="round"/>'
      + '<path d="M' + n1(x2) + ',' + n1(y2) + ' L' + n1(x2 - h * Math.cos(g - .42)) + ',' + n1(y2 - h * Math.sin(g - .42)) + ' L' + n1(x2 - h * Math.cos(g + .42)) + ',' + n1(y2 - h * Math.sin(g + .42)) + ' z" fill="' + c + '"/>';
  };
  const svg = (W, H, inner, cls) => '<svg class="' + (cls || 'fig') + '" viewBox="0 0 ' + W + ' ' + H + '" role="img">' + inner + '</svg>';
  const lado = (...f) => '<div class="figr">' + f.join('') + '</div>';

  /* ---------- P2: plano xy com eixos, região, curvas, pontos e setas ---------- */
  function P2(o) {
    const W = o.w || 340, H = o.h || 250, pad = 24, [x0, x1] = o.x, [y0, y1] = o.y;
    const s = Math.min((W - 2 * pad) / (x1 - x0), (H - 2 * pad) / (y1 - y0));
    const cx = (W - (x1 - x0) * s) / 2, cy = (H - (y1 - y0) * s) / 2;
    const X = x => cx + (x - x0) * s, Y = y => H - cy - (y - y0) * s;
    let g = '';
    if (o.fill) {
      const n = o.n || 80, d = (x1 - x0) / n, ny = Math.ceil((y1 - y0) / d); let r = '';
      for (let j = 0; j < ny; j++) {
        const y = y0 + (j + .5) * d; let st = null;
        for (let i = 0; i <= n; i++) {
          const x = x0 + (i + .5) * d, inn = i < n && o.fill(x, y);
          if (inn && st === null) st = i;
          if (!inn && st !== null) { r += '<rect x="' + n1(X(x0 + st * d)) + '" y="' + n1(Y(y0 + (j + 1) * d)) + '" width="' + n1((i - st) * d * s + .7) + '" height="' + n1(d * s + .7) + '"/>'; st = null }
        }
      }
      g += '<g fill="' + (o.fc || 'rgba(30,98,201,.20)') + '">' + r + '</g>';
    }
    if (o.tk) for (let t = Math.ceil(x0 / o.tk) * o.tk; t <= x1; t += o.tk) if (Math.abs(t) > 1e-9) g += '<line x1="' + n1(X(t)) + '" y1="' + n1(Y(0) - 3) + '" x2="' + n1(X(t)) + '" y2="' + n1(Y(0) + 3) + '" stroke="' + K.m + '"/>' + txt(X(t), Y(0) + 15, String(t).replace('.', ','), K.m, 10, 'middle');
    if (o.tk) for (let t = Math.ceil(y0 / o.tk) * o.tk; t <= y1; t += o.tk) if (Math.abs(t) > 1e-9) g += '<line x1="' + n1(X(0) - 3) + '" y1="' + n1(Y(t)) + '" x2="' + n1(X(0) + 3) + '" y2="' + n1(Y(t)) + '" stroke="' + K.m + '"/>' + txt(X(0) - 6, Y(t) + 4, String(t).replace('.', ','), K.m, 10, 'end');
    const ax = o.ax || ['x', 'y'];
    if (y0 <= 0 && y1 >= 0) g += seta(X(x0), Y(0), X(x1) + 6, Y(0), K.ink, 1.3) + txt(X(x1) + 2, Y(0) - 7, ax[0], K.ink, 13, 'end');
    if (x0 <= 0 && x1 >= 0) g += seta(X(0), Y(y0), X(0), Y(y1) - 6, K.ink, 1.3) + txt(X(0) + 7, Y(y1) + 4, ax[1], K.ink, 13);
    const id = 'c' + Math.random().toString(36).slice(2, 8);
    g += '<clipPath id="' + id + '"><rect x="' + n1(X(x0)) + '" y="' + n1(Y(y1)) + '" width="' + n1((x1 - x0) * s) + '" height="' + n1((y1 - y0) * s) + '"/></clipPath><g clip-path="url(#' + id + ')">';
    (o.cv || []).forEach(c => {
      const pts = [], N = c.N || 160;
      for (let i = 0; i <= N; i++) {
        let p;
        if (c.p) { const t = c.t[0] + (c.t[1] - c.t[0]) * i / N; p = c.p(t) } else { const x = x0 + (x1 - x0) * i / N; p = [x, c.f(x)] }
        pts.push(isFinite(p[1]) && isFinite(p[0]) ? n1(X(p[0])) + ',' + n1(Y(p[1])) : null);
      }
      let d = '', on = false; pts.forEach(q => { if (q) { d += (on ? ' L' : ' M') + q; on = true } else on = false });
      g += '<path d="' + d + '" fill="none" stroke="' + (c.c || K.b) + '" stroke-width="' + (c.w || 2.2) + '"' + (c.d ? ' stroke-dasharray="7 5"' : '') + '/>';
      if (c.l) g += txt(X(c.l[0]), Y(c.l[1]), c.l[2], c.c || K.b, 12);
    });
    g += '</g>';
    (o.ar || []).forEach(a => { g += seta(X(a[0]), Y(a[1]), X(a[2]), Y(a[3]), a[4] || K.o); if (a[5]) g += txt(X(a[2]) + (a[6] || 6), Y(a[3]) + (a[7] || -6), a[5], a[4] || K.o, 13) });
    (o.pt || []).forEach(p => { g += '<circle cx="' + n1(X(p[0])) + '" cy="' + n1(Y(p[1])) + '" r="4.2" fill="' + (p[2] || K.o) + '"/>'; if (p[3]) g += txt(X(p[0]) + (p[4] || 7), Y(p[1]) + (p[5] || -7), p[3], p[2] || K.o, 12) });
    (o.tx || []).forEach(t => { g += txt(X(t[0]), Y(t[1]), t[2], t[3] || K.m, t[4] || 12, t[5]) });
    return svg(W, H, g);
  }

  /* ---------- S3: superfície z = f(x, y) em perspectiva (malha) ---------- */
  function S3(o) {
    const W = o.w || 360, H = o.h || 250, n = o.n || 18, [a, b] = o.x, [c, d] = o.y, zs = o.zs || 1;
    const ya = o.yaw != null ? o.yaw : -0.75, pi = o.pitch != null ? o.pitch : 0.55;
    const P = (x, y, z) => { const u = x * Math.cos(ya) - y * Math.sin(ya), dep = x * Math.sin(ya) + y * Math.cos(ya); return [u, -z * zs * Math.cos(pi) - dep * Math.sin(pi)] };
    const L = [], pts = [];
    const ok = (x, y) => { const z = o.f(x, y); return isFinite(z) && (!o.cut || o.cut(x, y)) ? z : NaN };
    for (let i = 0; i <= n; i++) for (const dir of [0, 1]) {
      const line = [];
      for (let j = 0; j <= 60; j++) {
        const x = dir ? a + (b - a) * i / n : a + (b - a) * j / 60, y = dir ? c + (d - c) * j / 60 : c + (d - c) * i / n, z = ok(x, y);
        line.push(isFinite(z) ? P(x, y, z) : null);
      }
      L.push(line);
    }
    const ex = [];
    L.forEach(l => l.forEach(p => p && ex.push(p)));
    const axl = o.axes === false ? [] : [[[0, 0, 0], [b * 1.25, 0, 0], 'x'], [[0, 0, 0], [0, d * 1.25, 0], 'y'], [[0, 0, 0], [0, 0, (o.zmax || 1) * 1.15], 'z']];
    axl.forEach(([p, q]) => { ex.push(P(...p)); ex.push(P(...q)) });
    (o.pt || []).forEach(p => ex.push(P(p[0], p[1], p[2] != null ? p[2] : o.f(p[0], p[1]))));
    const mnx = Math.min(...ex.map(p => p[0])), mxx = Math.max(...ex.map(p => p[0])), mny = Math.min(...ex.map(p => p[1])), mxy = Math.max(...ex.map(p => p[1]));
    const s = Math.min((W - 40) / (mxx - mnx), (H - 30) / (mxy - mny)), ox = (W - (mxx - mnx) * s) / 2 - mnx * s, oy = (H - (mxy - mny) * s) / 2 - mny * s;
    const T = p => [ox + p[0] * s, oy + p[1] * s];
    let g = '';
    axl.forEach(([p, q, l]) => { const A = T(P(...p)), B = T(P(...q)); g += seta(A[0], A[1], B[0], B[1], K.m, 1.2) + txt(B[0] + 4, B[1] - 3, l, K.m, 12) });
    L.forEach(l => { let dd = '', on = false; l.forEach(p => { if (p) { const q = T(p); dd += (on ? ' L' : ' M') + n1(q[0]) + ',' + n1(q[1]); on = true } else on = false }); g += '<path d="' + dd + '" fill="none" stroke="' + (o.c || K.b) + '" stroke-opacity=".5" stroke-width="1"/>' });
    (o.pt || []).forEach(p => { const z = p[2] != null ? p[2] : o.f(p[0], p[1]), q = T(P(p[0], p[1], z)); g += '<circle cx="' + n1(q[0]) + '" cy="' + n1(q[1]) + '" r="5" fill="' + (p[3] || K.o) + '" stroke="#fff" stroke-width="1.4"/>'; if (p[4]) g += txt(q[0] + (p[5] || 8), q[1] + (p[6] || -8), p[4], p[3] || K.o, 13) });
    return svg(W, H, g);
  }

  /* ---------- árvore da regra da cadeia ---------- */
  function ARV(top, mid, leaf) {
    const W = 300, H = 170, mx = mid.map((_, i) => W / 2 + (i - (mid.length - 1) / 2) * 120), lx = leaf.map((_, i) => W / 2 + (i - (leaf.length - 1) / 2) * 120);
    let g = '';
    mid.forEach((m, i) => { g += '<line x1="150" y1="34" x2="' + mx[i] + '" y2="78" stroke="' + K.ink + '" stroke-width="1.6"/>'; leaf.forEach((l, j) => { g += '<line x1="' + mx[i] + '" y1="98" x2="' + lx[j] + '" y2="140" stroke="' + K.b + '" stroke-width="1.6"/>' }) });
    const no = (x, y, t, c) => '<circle cx="' + x + '" cy="' + y + '" r="15" fill="#fff" stroke="' + c + '" stroke-width="2"/>' + txt(x, y + 5, t, c, 15, 'middle');
    g += no(150, 22, top, K.o); mid.forEach((m, i) => { g += no(mx[i], 88, m, K.ink) }); leaf.forEach((l, j) => { g += no(lx[j], 152, l, K.b) });
    return svg(W, H, g);
  }

  /* ---------- esboços ---------- */
  const CHAPA = (L, C, e) => svg(320, 170, '<path d="M40,110 L180,140 L290,95 L150,68 Z" fill="rgba(30,98,201,.12)" stroke="' + K.ink + '" stroke-width="2"/><path d="M40,110 L40,124 L180,154 L180,140 M180,154 L290,109 L290,95" fill="none" stroke="' + K.ink + '" stroke-width="2"/>'
    + txt(100, 145, L, K.o, 14, 'middle') + txt(248, 138, C, K.o, 14, 'middle') + txt(26, 124, e, K.b, 13, 'end'));
  const TANQUE = (r, h) => svg(260, 200, '<ellipse cx="110" cy="40" rx="60" ry="16" fill="rgba(30,98,201,.12)" stroke="' + K.ink + '" stroke-width="2"/><path d="M50,40 L50,160 A60,16 0 0 0 170,160 L170,40" fill="none" stroke="' + K.ink + '" stroke-width="2"/><path d="M50,160 A60,16 0 0 1 170,160" fill="none" stroke="' + K.ink + '" stroke-width="1.4" stroke-dasharray="5 4"/>'
    + seta(110, 40, 170, 40, K.o, 2) + txt(140, 32, r, K.o, 14, 'middle') + seta(190, 160, 190, 40, K.b, 2) + seta(190, 40, 190, 160, K.b, 2) + txt(200, 104, h, K.b, 14));
  const CONE = svg(260, 200, '<ellipse cx="110" cy="150" rx="70" ry="18" fill="rgba(30,98,201,.12)" stroke="' + K.ink + '" stroke-width="2"/><path d="M40,150 L110,24 L180,150" fill="none" stroke="' + K.ink + '" stroke-width="2"/><line x1="110" y1="24" x2="110" y2="150" stroke="' + K.m + '" stroke-dasharray="5 4"/>'
    + seta(110, 150, 196, 150, K.o, 2.2) + txt(150, 172, 'r ↑ 1,8 cm/s', K.o, 13, 'middle') + seta(214, 40, 214, 110, K.b, 2.2) + txt(206, 32, 'h ↓ 2,5 cm/s', K.b, 13, 'middle'));
  const CAIXA = (a, b, c, tampa) => svg(300, 190, (tampa === false ? '' : '<path d="M60,70 L200,70 L250,40 L110,40 Z" fill="rgba(30,98,201,.10)" stroke="' + K.ink + '" stroke-width="2"/>')
    + '<path d="M60,70 L60,160 L200,160 L200,70 M200,160 L250,130 L250,40 L200,70" fill="none" stroke="' + K.ink + '" stroke-width="2"/>' + (tampa === false ? '<path d="M60,70 L110,40 L250,40" fill="none" stroke="' + K.ink + '" stroke-width="2"/><path d="M60,70 L200,70" stroke="' + K.ink + '" stroke-width="2"/>' : '')
    + '<path d="M60,160 L110,130 L250,130 M110,130 L110,40" fill="none" stroke="' + K.m + '" stroke-dasharray="5 4"/>'
    + txt(130, 180, a, K.o, 14, 'middle') + txt(238, 158, b, K.o, 14, 'middle') + txt(48, 120, c, K.b, 14, 'end'));
  const BOLA = svg(240, 160, '<circle cx="80" cy="80" r="62" fill="none" stroke="' + K.ink + '" stroke-width="2"/><ellipse cx="80" cy="80" rx="62" ry="18" fill="none" stroke="' + K.ink + '" stroke-width="1.4" stroke-dasharray="5 4"/>'
    + '<circle cx="80" cy="80" r="2.5" fill="' + K.ink + '"/>' + txt(66, 98, 'centro', K.m, 11)
    + '<circle cx="104" cy="36" r="4" fill="' + K.o + '"/>' + txt(112, 34, '(1, 2, 2) · 120°', K.o, 13)
    + seta(104, 36, 127, 106, K.b, 2.4) + '<circle cx="128" cy="110" r="4" fill="' + K.b + '"/>' + txt(136, 114, '(2, 1, 3)', K.b, 13) + txt(122, 72, 'v', K.b, 13));
  /* rosa dos ventos da montanha (∇h = (−1, −3,2)) */
  const ROSA = (extra) => P2({ x: [-4, 4], y: [-4, 4], w: 300, h: 260, ax: ['', ''],
    ar: [[0, 0, -1, -3.2, K.ink, '∇h', 6, 12]].concat(extra || []), pt: [[0, 0, K.o, '(50, 80)', 6, 16]],
    tx: [[0.15, 3.6, 'N', K.m, 12], [0.15, -3.8, 'S', K.m, 12], [3.4, 0.25, 'L', K.m, 12], [-3.9, 0.25, 'O', K.m, 12]] });

  /* ---------- quadros ---------- */
  const q = {};

  /* ===== Aula 1 · funções de várias variáveis ===== */
  q.x0 = { t: 'Peso da chapa: P(L, C, e) = L·C·e·7850·9,8', r: 'Receita: tudo em metro → troca cada letra pelo número → volume × densidade × g',
    b: [CHAPA('C = 2 m', 'L = 1 m', 'e = 10 mm'),
      '#Unidades | tudo em metro',
      '10 mm = 10/1000 = «o|0,01 m»',
      '#Substitui',
      'P(1; 2; 0,01) = 1 · 2 · 0,01 · 7850 · 9,8',
      '#Conta em partes',
      'volume: 1 · 2 · 0,01 = «b|0,02 m³»',
      'massa: 0,02 · 7850 = «b|157 kg»',
      'peso: 157 · 9,8 = «o|1538,6 N»',
      '=P ≈ 1539 N (≈ 157 kg de massa)'] };
  q.x1 = { t: 'f(x, y) = 2x + y', r: 'Receita: troca x e y pelos números do par, sempre na ordem (x, y)',
    b: [{ c: [['*f(1, 3)', '2·1 + 3', ' = «o|5»'], ['*f(0, 0)', '2·0 + 0', ' = «o|0»'], ['*f(2, −4)', '2·2 + (−4)', ' = 4 − 4 = «o|0»']] },
      '~ pares diferentes podem dar o mesmo valor: (0, 0) e (2, −4) estão na mesma curva de nível',
      '=f(1, 3) = 5 · f(0, 0) = 0 · f(2, −4) = 0'] };
  q.x2 = { t: 'Domínio de t(f, n) = L / (f · n)', r: 'Receita: procura o que pode quebrar → divisão: denominador ≠ 0',
    b: ['#O que pode quebrar?', 'divisão → «r|f · n ≠ 0»',
      '#Produto = 0 quando um fator = 0', 'f ≠ 0 «b|e» n ≠ 0',
      P2({ x: [-3, 3], y: [-3, 3], ax: ['f', 'n'], fill: (x, y) => Math.abs(x) > .08 && Math.abs(y) > .08, fc: 'rgba(30,98,201,.16)', cv: [{ f: () => 0, c: K.r, d: 1 }, { p: t => [0, t], t: [-3, 3], c: K.r, d: 1 }], fill2: 0,
        tx: [[0.4, 2.5, 'fisicamente: f > 0 e n > 0', K.g, 12]], pt: [] }),
      '~ os eixos (tracejados) ficam de fora: neles f = 0 ou n = 0 → máquina parada',
      '=D = {(f, n) | f ≠ 0 e n ≠ 0} · na prática f > 0 e n > 0'] };
  q.x3 = { t: 'Tampo semiesférico z = √(R² − x² − y²)', r: 'Receita: raiz → o de dentro ≥ 0 → isola → reconhece a figura',
    b: ['#Raiz | dentro ≥ 0', 'R² − x² − y² ≥ 0', 'x² + y² ≤ «o|R²»',
      '~ é o círculo de raio R; com o "≤", o disco cheio',
      lado(P2({ x: [-1.5, 1.5], y: [-1.5, 1.5], w: 260, h: 230, fill: (x, y) => x * x + y * y <= 1, cv: [{ p: t => [Math.cos(t), Math.sin(t)], t: [0, 6.3], c: K.b }], ar: [[0, 0, 0.71, 0.71, K.o, 'R', 4, 4]] }),
        S3({ f: (x, y) => Math.sqrt(Math.max(0, 1 - x * x - y * y)), cut: (x, y) => x * x + y * y <= 1.0001, x: [-1, 1], y: [-1, 1], n: 16, zmax: 1, axes: false })),
      '=D = {x² + y² ≤ R²} · o disco da base do tampo'] };
  q.x4 = { t: 'Domínio de g(x, y) = ln(x − y)', r: 'Receita: ln → o de dentro > 0 (estritamente) → isola o y',
    b: ['#ln | dentro > 0', 'x − y > 0', '«o|y < x»',
      P2({ x: [-3, 3], y: [-3, 3], tk: 1, fill: (x, y) => y < x, cv: [{ f: x => x, c: K.r, d: 1, l: [1.6, 2.2, 'y = x'] }] }),
      '~ tracejado: a reta y = x fica de fora (é > e não ≥)',
      '=D = {(x, y) | y < x} · abaixo da reta'] };
  q.x5 = { t: 'f(x, y) = √(x + y + 1) / (x − 1)', r: 'Receita: valor → troca os números · domínio → cada "perigo" vira uma condição',
    b: ['#Valor', 'f(3, 2) = √(3 + 2 + 1)/(3 − 1) = «o|√6/2» ≈ 1,22',
      '#Domínio',
      { c: [['*raiz', 'x + y + 1 ≥ 0', '→ y ≥ −x − 1', '~ sobre e acima da reta'], ['*fração', 'x − 1 ≠ 0', '→ x ≠ 1', '~ tira a reta vertical']] },
      P2({ x: [-3, 3], y: [-3, 3], tk: 1, fill: (x, y) => y >= -x - 1 && Math.abs(x - 1) > .06, cv: [{ f: x => -x - 1, c: K.b, l: [-2.9, 2.3, 'y = −x − 1'] }, { p: t => [1, t], t: [-3, 3], c: K.r, d: 1, l: [1.1, -2.6, 'x = 1 (fora)'] }] }),
      '=f(3, 2) = √6/2 · D = {x + y + 1 ≥ 0 e x ≠ 1}'] };
  q.x6 = { t: 'f(x, y) = x · ln(y² − x)', r: 'Receita: valor → troca os números · domínio → ln: dentro > 0',
    b: ['#Valor', 'f(3, 2) = 3 · ln(2² − 3) = 3 · ln 1 = 3 · 0 = «o|0»',
      '#Domínio | ln: dentro > 0', 'y² − x > 0 → «o|x < y²»',
      P2({ x: [-2, 4], y: [-2.5, 2.5], tk: 1, fill: (x, y) => x < y * y, cv: [{ p: t => [t * t, t], t: [-2.5, 2.5], c: K.r, d: 1, l: [2.2, 2.1, 'x = y²'] }] }),
      '~ à esquerda da parábola deitada, sem a curva',
      '=f(3, 2) = 0 · D = {(x, y) | x < y²}'] };
  q.x7 = { t: 'g(x, y) = √(9 − x² − y²)', r: 'Receita: domínio → raiz ≥ 0 · imagem → menor e maior valor que a função atinge',
    b: ['#Domínio | raiz ≥ 0', '9 − x² − y² ≥ 0 → «o|x² + y² ≤ 9»', '~ disco de raio 3',
      '#Imagem | menor e maior valor',
      { c: [['*centro (0, 0)', '√9 = «o|3»', '~ topo'], ['*borda x² + y² = 9', '√0 = «o|0»', '~ chão']] },
      lado(P2({ x: [-4, 4], y: [-4, 4], w: 260, h: 240, tk: 1, fill: (x, y) => x * x + y * y <= 9, cv: [{ p: t => [3 * Math.cos(t), 3 * Math.sin(t)], t: [0, 6.3], c: K.b }] }),
        S3({ f: (x, y) => Math.sqrt(Math.max(0, 9 - x * x - y * y)), cut: (x, y) => x * x + y * y <= 9.001, x: [-3, 3], y: [-3, 3], n: 16, zmax: 3, pt: [[0, 0, null, K.o, 'topo 3']] })),
      '=D = {x² + y² ≤ 9} · Im = [0, 3] · meia esfera de raio 3'] };
  q.x8 = { t: 'Domínio de f(x, y, z) = ln(z − y) + xy·sen z', r: 'Receita: olha termo por termo → só o que pode quebrar restringe',
    b: [{ c: [['*ln(z − y)', 'z − y > 0', '→ «o|z > y»'], ['*xy·sen z', 'vale para tudo', '«g|sem restrição»']] },
      '~ x é livre: são os pontos acima do plano z = y',
      '=D = {(x, y, z) | z > y}'] };
  q.x9 = { t: 'f(x, y, z) = e<sup>√(z − x² − y²)</sup>', r: 'Receita: valor → troca · domínio → raiz ≥ 0 · imagem → de quanto a quanto a raiz vai',
    b: ['#Valor', 'f(2, −1, 6) = e<sup>√(6 − 4 − 1)</sup> = e<sup>√1</sup> = «o|e»',
      '#Domínio | raiz ≥ 0', 'z − x² − y² ≥ 0 → «o|z ≥ x² + y²»',
      S3({ f: (x, y) => x * x + y * y, x: [-1.5, 1.5], y: [-1.5, 1.5], n: 14, zs: .8, zmax: 4.5, pt: [[0, 0, 2.2, K.g, 'domínio: dentro e acima']] }),
      '#Imagem', 'raiz: de 0 até ∞ → e<sup>0</sup> = «o|1» até ∞',
      '=f = e · D = {z ≥ x² + y²} · Im = [1, ∞)'] };
  q.x10 = { t: '(a) Tanque: V = π r² h com r = 1 m e h = 3 m', r: 'Receita: substitui → só o r é ao quadrado',
    b: [TANQUE('r = 1', 'h = 3'), 'V = π · «b|1²» · 3 = «o|3π»', '3π ≈ 9,42 m³', '~ cuidado: elevar o h também (3² = 9) dá 28,27, errado', '=V = 3π ≈ 9,42 m³'] };
  q.x11 = { t: '(b) Caminho de volta: V = 12π m³ e r = 2 m', r: 'Receita: substitui o que tem → isola o que falta',
    b: [TANQUE('r = 2', 'h = ?'), '12π = π · 2² · h', '12π = 4π · h', '~ o π corta dos dois lados', '12 = 4h → h = 12/4 = «o|3 m»', '=h = 3 m'] };
  q.x12 = { t: '(c) Outros tanques com 12π m³', r: 'Receita: deixa uma letra livre → isola a outra → escolhe e calcula',
    b: ['12π = π r² h → «o|r² · h = 12»',
      { c: [['*isola h', 'h = 12/r²'], ['*isola r', 'r = √(12/h)']] },
      '#Escolhe e calcula',
      { c: [['*r = 1', 'h = 12'], ['*r = 2', 'h = 3'], ['*r = 3', 'h = 12/9 ≈ 1,33']] },
      P2({ x: [0, 4], y: [0, 13], w: 300, h: 230, ax: ['r', 'h'], cv: [{ f: r => 12 / (r * r), c: K.b, l: [2.3, 5, 'h = 12/r²'] }], pt: [[1, 12, K.o, '(1, 12)'], [2, 3, K.o, '(2, 3)'], [3, 1.333, K.o, '(3; 1,33)']] }),
      '~ h > 0: h = 0 divide por zero → o domínio aparecendo na prática',
      '=r² · h = 12 → infinitos tanques com 12π m³'] };

  /* ===== Aula 2 · curvas de nível ===== */
  q.x13 = { t: 'Curvas de nível de f(x, y) = 6 − 3x − 2y', r: 'Receita: iguala a k → isola o y → uma curva para cada k',
    b: ['6 − 3x − 2y = k', '−2y = k − 6 + 3x → «o|y = −(3/2)x + (6 − k)/2»',
      { c: [['*k = −6', 'y = −1,5x + 6'], ['*k = 0', 'y = −1,5x + 3'], ['*k = 6', 'y = −1,5x'], ['*k = 12', 'y = −1,5x − 3']] },
      P2({ x: [-4, 5], y: [-5, 7], w: 300, h: 260, tk: 2, cv: [-6, 0, 6, 12].map((k, i) => ({ f: x => -1.5 * x + (6 - k) / 2, c: [K.p, K.b, K.g, K.o][i], l: [[1, 5.6], [-0.9, 5.6], [-2.9, 5.6], [1.2, -4.3]][i].concat('k = ' + k) })) }),
      '~ mesma inclinação −3/2: retas paralelas e igualmente espaçadas (o gráfico é um plano)',
      '=4 retas paralelas de inclinação −3/2'] };
  q.x14 = { t: 'Curvas de nível de g(x, y) = √(9 − x² − y²)', r: 'Receita: iguala a k → eleva ao quadrado → reconhece a circunferência',
    b: ['√(9 − x² − y²) = k → eleva ao quadrado', '9 − x² − y² = k² → «o|x² + y² = 9 − k²»',
      { c: [['*k = 0', 'raio 3'], ['*k = 1', 'raio √8 ≈ 2,83'], ['*k = 2', 'raio √5 ≈ 2,24'], ['*k = 3', 'raio 0 → só o ponto']] },
      P2({ x: [-3.6, 3.6], y: [-3.6, 3.6], w: 280, h: 260, tk: 1, cv: [3, Math.sqrt(8), Math.sqrt(5)].map((r, i) => ({ p: t => [r * Math.cos(t), r * Math.sin(t)], t: [0, 6.3], c: [K.b, K.g, K.o][i] })), pt: [[0, 0, K.r, 'k = 3']] }),
      '~ cada vez mais juntas perto da borda: ali a meia esfera fica íngreme',
      '=circunferências concêntricas de raio √(9 − k²)'] };
  q.x15 = { t: 'Curvas de nível de h(x, y) = 4x² + y²', r: 'Receita: iguala a k → divide por k → reconhece a elipse',
    b: ['4x² + y² = k → divide por k', 'x²/(k/4) + y²/k = 1 → «o|elipses»',
      { c: [['*k = 0', 'só a origem'], ['*k = 4', 'x² + y²/4 = 1', 'semieixos 1 e 2'], ['*k = 16', 'x²/4 + y²/16 = 1', 'semieixos 2 e 4']] },
      P2({ x: [-4.5, 4.5], y: [-4.5, 4.5], w: 280, h: 260, tk: 1, cv: [[1, 2, K.b], [2, 4, K.o]].map(([a, b, c]) => ({ p: t => [a * Math.cos(t), b * Math.sin(t)], t: [0, 6.3], c })), pt: [[0, 0, K.r, 'k = 0']] }),
      '=elipses centradas na origem, mais altas que largas'] };
  q.x16 = { t: 'Pontos na borda de k = 4 (x² + y² = 4)', r: 'Receita: isola uma variável → escolhe x → calcula y (sem chute)',
    b: ['x² + y² = 4 → «o|y = ±√(4 − x²)»',
      { c: [['*x = 0', 'y = ±2'], ['*x = 1', 'y = ±√3 ≈ ±1,73'], ['*x = 2', 'y = 0']] },
      P2({ x: [-2.8, 2.8], y: [-2.6, 2.6], w: 280, h: 250, tk: 1, cv: [{ p: t => [2 * Math.cos(t), 2 * Math.sin(t)], t: [0, 6.3], c: K.b }], pt: [[0, 2, K.o], [0, -2, K.o], [1, 1.73, K.o, '(1; 1,73)'], [1, -1.73, K.o], [-1, 1.73, K.o], [-1, -1.73, K.o], [2, 0, K.o, '(2, 0)'], [-2, 0, K.o]] }),
      '~ o ± dá os dois lados (em cima e embaixo) · |x| ≤ 2, senão a raiz fica negativa',
      '=(0, ±2) · (±1; ±1,73) · (±2, 0)'] };
  q.x17 = { t: 'Isocusto: C(x, y) = 80x + 50y = 4000', r: 'Receita: trava o k → vira uma reta → acha pontos zerando uma variável',
    b: ['80x + 50y = «o|4000» → uma reta',
      { c: [['*só solda (y = 0)', '80x = 4000', 'x = «o|50 h»'], ['*só pintura (x = 0)', '50y = 4000', 'y = «o|80 h»'], ['*misto (x = 25)', '2000 + 50y = 4000', 'y = «o|40 h»']] },
      P2({ x: [0, 60], y: [0, 90], w: 300, h: 250, tk: 20, ax: ['x (solda)', 'y (pintura)'], cv: [{ f: x => (4000 - 80 * x) / 50, c: K.b }], pt: [[50, 0, K.o, '(50, 0)', -10, -10], [0, 80, K.o, '(0, 80)'], [25, 40, K.o, '(25, 40)']] }),
      '=a reta 80x + 50y = 4000 é a curva de mesmo custo'] };

  /* ===== Aula 3 · derivadas parciais ===== */
  q.x18 = { t: 'f(x, y) = 3x − 2y⁴', r: 'Receita: f<sub>x</sub> → y congelado · f<sub>y</sub> → x congelado',
    b: [{ c: [['*f<sub>x</sub> → y congelado', '3x → 3 / −2y⁴ → 0', 'f<sub>x</sub> = «o|3»'], ['*f<sub>y</sub> → x congelado', '3x → 0 / −2y⁴ → −2·4y³', 'f<sub>y</sub> = «o|−8y³»']] },
      '~ o −2 multiplica o 4y³: não esqueça o sinal (o gabarito esqueceu)',
      '=f<sub>x</sub> = 3 · f<sub>y</sub> = −8y³'] };
  q.x19 = { t: 'z = x · e<sup>3y</sup>', r: 'Receita: quem não é a variável vira número e fica multiplicando',
    b: [{ c: [['*z<sub>x</sub> → y congelado', 'e<sup>3y</sup> é número → fica', '(x)′ = 1', 'z<sub>x</sub> = «o|e<sup>3y</sup>»'], ['*z<sub>y</sub> → x congelado', 'x é número → fica', '(e<sup>3y</sup>)′ = e<sup>3y</sup>·«b|3»', 'z<sub>y</sub> = «o|3x e<sup>3y</sup>»']] },
      '~ o 3 vem da cadeia: (3y)′ = 3',
      '=z<sub>x</sub> = e<sup>3y</sup> · z<sub>y</sub> = 3x e<sup>3y</sup>'] };
  q.x20 = { t: 'z = (2x + 3y)<sup>10</sup>', r: 'Receita: cadeia → derivada de fora × derivada de dentro',
    b: ['#Fora | igual nas duas', '10(2x + 3y)<sup>9</sup>',
      { c: [['*z<sub>x</sub>', 'dentro em x: «b|2»', '10(2x + 3y)<sup>9</sup>·2', ' = «o|20(2x + 3y)<sup>9</sup>»'], ['*z<sub>y</sub>', 'dentro em y: «b|3»', '10(2x + 3y)<sup>9</sup>·3', ' = «o|30(2x + 3y)<sup>9</sup>»']] },
      '~ só muda a derivada de dentro',
      '=z<sub>x</sub> = 20(2x + 3y)<sup>9</sup> · z<sub>y</sub> = 30(2x + 3y)<sup>9</sup>'] };
  q.x21 = { t: 'f(x, y) = x²y + 3y', r: 'Receita: termo por termo, congelando a outra letra',
    b: [{ c: [['*f<sub>x</sub> → y congelado', 'x²y → 2x·y', '3y → 0', 'f<sub>x</sub> = «o|2xy»'], ['*f<sub>y</sub> → x congelado', 'x²y → x²', '3y → 3', 'f<sub>y</sub> = «o|x² + 3»']] },
      '=f<sub>x</sub> = 2xy · f<sub>y</sub> = x² + 3'] };
  q.x22 = { t: 'f(x, y) = ln(x² + y²) em (1, 2)', r: 'Receita: deriva com letras → só no fim troca o ponto',
    b: ['#ln | (dentro)′ ÷ dentro',
      { c: [['*f<sub>x</sub>', '2x/(x² + y²)'], ['*f<sub>y</sub>', '2y/(x² + y²)']] },
      '#No ponto (1, 2)', 'x² + y² = 1 + 4 = «b|5»', 'f<sub>x</sub>(1, 2) = 2/5 = «o|0,4»', 'f<sub>y</sub>(1, 2) = 4/5 = «o|0,8»',
      '=f<sub>x</sub>(1, 2) = 0,4 · f<sub>y</sub>(1, 2) = 0,8'] };
  q.x23 = { t: 'f(x, y) = x³ + x²y³ − 2y² em (2, 1)', r: 'Receita: deriva termo por termo → troca o ponto no fim',
    b: [{ c: [['*f<sub>x</sub> → y congelado', 'x³ → 3x² / x²y³ → 2xy³ / −2y² → 0', 'f<sub>x</sub> = 3x² + 2xy³', 'f<sub>x</sub>(2, 1) = 12 + 4 = «o|16»'], ['*f<sub>y</sub> → x congelado', 'x³ → 0 / x²y³ → 3x²y² / −2y² → −4y', 'f<sub>y</sub> = 3x²y² − 4y', 'f<sub>y</sub>(2, 1) = 12 − 4 = «o|8»']] },
      '=f<sub>x</sub>(2, 1) = 16 · f<sub>y</sub>(2, 1) = 8'] };
  q.x24 = { t: 'f(x, y) = 4 − x² − 2y² em (1, 1)', r: 'Receita: deriva → troca o ponto → sinal diz sobe/desce, número diz quão rápido',
    b: [{ c: [['*f<sub>x</sub> = −2x', 'f<sub>x</sub>(1, 1) = «o|−2»'], ['*f<sub>y</sub> = −4y', 'f<sub>y</sub>(1, 1) = «o|−4»']] },
      S3({ f: (x, y) => 4 - x * x - 2 * y * y, x: [-1.6, 1.6], y: [-1.4, 1.4], n: 14, zs: .7, zmax: 4, pt: [[1, 1, null, K.o, '(1, 1, 1)']] }),
      '~ em (1, 1): andando em x a superfície desce 2 por unidade; em y desce 4 (mais íngreme)',
      '=f<sub>x</sub>(1, 1) = −2 · f<sub>y</sub>(1, 1) = −4'] };
  q.x25 = { t: 'f(x, y, z) = e<sup>xy</sup> · ln z', r: 'Receita: três variáveis → congela as outras duas a cada vez',
    b: [{ c: [['*f<sub>x</sub>', 'y, z congelados', '(e<sup>xy</sup>)′ = «b|y»e<sup>xy</sup>', ' = «o|y e<sup>xy</sup> ln z»'], ['*f<sub>y</sub>', 'x, z congelados', '(e<sup>xy</sup>)′ = «b|x»e<sup>xy</sup>', ' = «o|x e<sup>xy</sup> ln z»'], ['*f<sub>z</sub>', 'e<sup>xy</sup> é número', '(ln z)′ = 1/z', ' = «o|e<sup>xy</sup>/z»']] },
      '=f<sub>x</sub> = y e<sup>xy</sup> ln z · f<sub>y</sub> = x e<sup>xy</sup> ln z · f<sub>z</sub> = e<sup>xy</sup>/z'] };
  q.x26 = { t: 'Placa: T(x, y) = 100 − 2x² − y² em (2, 1)', r: 'Receita: T<sub>x</sub> e T<sub>y</sub> → troca o ponto → °C por unidade',
    b: [{ c: [['*T<sub>x</sub> = −4x', 'T<sub>x</sub>(2, 1) = «o|−8»'], ['*T<sub>y</sub> = −2y', 'T<sub>y</sub>(2, 1) = «o|−2»']] },
      P2({ x: [-3, 3], y: [-3, 3], w: 280, h: 250, tk: 1, cv: [1, 2, 3].map((r, i) => ({ p: t => [r / Math.SQRT2 * Math.cos(t), r * Math.sin(t)], t: [0, 6.3], c: [K.o, K.p, K.b][i], d: 1 })), ar: [[2, 1, 1.2, 1, K.r, 'cai 8 em x', -40, -10], [2, 1, 2, .6, K.g, 'cai 2 em y', 6, 14]], pt: [[2, 1, K.ink, '(2, 1)', 6, -10]], tx: [[-0.6, 0.25, 'quente', K.o, 11]] }),
      '=em x cai 8 °C por unidade · em y cai 2 °C por unidade'] };
  q.x27 = { t: 'Custo: C(x, y) = 80x + 50y', r: 'Receita: a parcial é o "preço" de cada recurso',
    b: [{ c: [['*∂C/∂x', '80x → «o|80»', 'R$ 80 por hora de solda'], ['*∂C/∂y', '50y → «o|50»', 'R$ 50 por hora de pintura']] },
      '~ fixas porque C é linear: não importa quantas horas você já tem',
      '=∂C/∂x = R$ 80/h · ∂C/∂y = R$ 50/h'] };
  q.x28 = { t: 'Massa da chapa: m(L, C, e) = 7850 · L · C · e', r: 'Receita: deriva em e (L e C congelados) → converte para mm',
    b: [CHAPA('C = 2 m', 'L = 1 m', 'e'),
      '∂m/∂e = 7850 · L · C', '~ L e C congelados multiplicam e ficam',
      '1 m × 2 m: 7850 · 1 · 2 = «b|15 700 kg/m»', 'por mm: 15 700/1000 = «o|15,7 kg/mm»',
      '~ de 10 para 12,5 mm: +2,5 mm ≈ +39 kg',
      '=≈ 15,7 kg a cada 1 mm de espessura'] };
  q.x29 = { t: 'Chapa do costado: A(r, h) = 2πr · h', r: 'Receita: deriva → troca r = 2 e h = 3 → interpreta',
    b: [TANQUE('r = 2', 'h = 3'),
      { c: [['*∂A/∂h', '2πr', 'r = 2: «o|4π ≈ 12,6 m²/m»', '~ o perímetro: uma faixa a mais'], ['*∂A/∂r', '2πh', 'h = 3: «o|6π ≈ 18,8 m²/m»']] },
      '~ depende do ponto: tanque mais largo gasta mais chapa por metro de altura',
      '=∂A/∂h ≈ 12,6 m²/m · ∂A/∂r ≈ 18,8 m²/m'] };
  q.x30 = { t: 'Volume do tanque: V(r, h) = π r² h', r: 'Receita: deriva → troca r = 2 e h = 3 → compara',
    b: [{ c: [['*∂V/∂h', 'πr² (área da base)', 'r = 2: «o|4π ≈ 12,6 m³/m»'], ['*∂V/∂r', '2πrh', 'r = 2, h = 3: «o|12π ≈ 37,7 m³/m»']] },
      '~ mexer no raio rende 3× mais: ele entra ao quadrado',
      '=∂V/∂h ≈ 12,6 m³/m · ∂V/∂r ≈ 37,7 m³/m'] };

  /* ===== Aula 4 · derivadas de ordem superior ===== */
  q.x31 = { t: 'As quatro derivadas segundas de z = x e<sup>3y</sup>', r: 'Receita: 1ª ordem → deriva cada uma de novo em x e em y',
    b: ['#1ª ordem', 'z<sub>x</sub> = e<sup>3y</sup> · z<sub>y</sub> = 3x e<sup>3y</sup>',
      '#2ª ordem | deriva de novo',
      { c: [['*de z<sub>x</sub> = e<sup>3y</sup>', 'z<sub>xx</sub> = «o|0» (sem x)', 'z<sub>xy</sub> = «o|3e<sup>3y</sup>»'], ['*de z<sub>y</sub> = 3x e<sup>3y</sup>', 'z<sub>yx</sub> = «o|3e<sup>3y</sup>»', 'z<sub>yy</sub> = «o|9x e<sup>3y</sup>»']] },
      '~ mistas iguais «g|✓» (Clairaut)',
      '=z<sub>xx</sub> = 0 · z<sub>xy</sub> = z<sub>yx</sub> = 3e<sup>3y</sup> · z<sub>yy</sub> = 9x e<sup>3y</sup>'] };
  q.x32 = { t: 'Derivadas segundas de f(x, y) = x³ + x²y³ − 2y²', r: 'Receita: 1ª ordem → deriva de novo → confere as mistas',
    b: ['#1ª ordem', 'f<sub>x</sub> = 3x² + 2xy³ · f<sub>y</sub> = 3x²y² − 4y',
      '#2ª ordem',
      { c: [['*de f<sub>x</sub>', 'f<sub>xx</sub> = «o|6x + 2y³»', 'f<sub>xy</sub> = «o|6xy²»'], ['*de f<sub>y</sub>', 'f<sub>yx</sub> = «o|6xy²»', 'f<sub>yy</sub> = «o|6x²y − 4»']] },
      '~ f<sub>xy</sub> = f<sub>yx</sub> «g|✓»',
      '=f<sub>xx</sub> = 6x + 2y³ · f<sub>xy</sub> = f<sub>yx</sub> = 6xy² · f<sub>yy</sub> = 6x²y − 4'] };
  q.x33 = { t: 'f<sub>xyyz</sub> de f(x, y, z) = 1 − 2xy²z + x²y', r: 'Receita: deriva na ordem dos índices, uma letra por vez',
    b: ['x → f<sub>x</sub> = −2y²z + 2xy', 'y → f<sub>xy</sub> = −4yz + 2x', 'y → f<sub>xyy</sub> = −4z', 'z → f<sub>xyyz</sub> = «o|−4»', '=f<sub>xyyz</sub> = −4'] };
  q.x34 = { t: 'Chapa soldada · 1ª ordem', r: 'Receita: T<sub>x</sub> e T<sub>y</sub> → no ponto → onde as duas zeram é candidato',
    b: [{ c: [['*T<sub>x</sub> = −2x', '(1, 1): «o|−2 °C/m»'], ['*T<sub>y</sub> = −4y', '(1, 1): «o|−4 °C/m»']] },
      '~ em y cai 2× mais rápido: o calor flui mais forte nessa direção',
      '#Em (0, 0)', 'T<sub>x</sub> = 0 e T<sub>y</sub> = 0 → «b|candidato» (topo, fundo ou sela?)',
      S3({ f: (x, y) => 3 - x * x - 2 * y * y, x: [-1.5, 1.5], y: [-1.2, 1.2], n: 14, zs: .7, zmax: 3, pt: [[0, 0, null, K.o, '(0, 0)'], [1, 1, null, K.b, '(1, 1)']] }),
      '=(1, 1): −2 °C/m em x e −4 °C/m em y · (0, 0) é ponto crítico'] };
  q.x35 = { t: 'Chapa soldada · 2ª ordem', r: 'Receita: D = T<sub>xx</sub>·T<sub>yy</sub> − (T<sub>xy</sub>)² → sinal de D e de T<sub>xx</sub>',
    b: ['T<sub>xx</sub> = −2 · T<sub>yy</sub> = −4 · T<sub>xy</sub> = 0', 'D = (−2)(−4) − 0² = «o|8» > 0', 'T<sub>xx</sub> < 0 → «g|MÁXIMO» (morro)',
      S3({ f: (x, y) => 3 - x * x - 2 * y * y, x: [-1.5, 1.5], y: [-1.2, 1.2], n: 14, zs: .7, zmax: 3, pt: [[0, 0, null, K.r, 'mais quente']] }),
      '~ ponto frio no centro (T = 20 + x² + y²) daria vale: mínimo',
      '=(0, 0) é máximo: o ponto mais quente, a própria solda'] };
  q.x36 = { t: 'u(x, t) = cos(2x + 2ct) satisfaz u<sub>tt</sub> = c²u<sub>xx</sub>?', r: 'Receita: deriva 2× em x e 2× em t → compara',
    b: [{ c: [['*em x', 'u<sub>x</sub> = −2 sen(2x + 2ct)', 'u<sub>xx</sub> = «o|−4 cos(2x + 2ct)»'], ['*em t', 'u<sub>t</sub> = −2c sen(2x + 2ct)', 'u<sub>tt</sub> = «o|−4c² cos(2x + 2ct)»']] },
      '#Testa', 'c²·u<sub>xx</sub> = −4c² cos(2x + 2ct) = u<sub>tt</sub> «g|✓»',
      P2({ x: [0, 6.5], y: [-1.4, 1.4], w: 340, h: 170, ax: ['x', 'u'], cv: [{ f: x => Math.cos(2 * x), c: K.b, l: [5.4, 1.15, 't = 0'] }, { f: x => Math.cos(2 * x + 1), c: K.o, d: 1, l: [3.7, 1.15, 'depois'] }] }),
      '~ a onda anda para a esquerda mantendo a forma',
      '=Sim: u<sub>tt</sub> = c² u<sub>xx</sub>'] };

  /* ===== Aula 5 · regra da cadeia ===== */
  q.x37 = { t: 'z = x²y + 3xy⁴, x = sen 2t, y = cos t · dz/dt em t = 0', r: 'Receita: árvore → parciais × derivadas em t → troca t = 0 no fim',
    b: ['#Árvore | dz/dt = z<sub>x</sub>·x′ + z<sub>y</sub>·y′', ARV('z', ['x', 'y'], ['t']),
      { c: [['*parciais', 'z<sub>x</sub> = 2xy + 3y⁴', 'z<sub>y</sub> = x² + 12xy³'], ['*derivadas em t', 'x′ = 2 cos 2t', 'y′ = −sen t']] },
      '#Em t = 0', 'x = sen 0 = 0 · y = cos 0 = 1 · x′ = 2 · y′ = 0',
      'dz/dt = (0 + 3)·2 + (0 + 0)·0 = «o|6»', '=dz/dt = 6 em t = 0'] };
  q.x38 = { t: 'Gás ideal: P = 8,31 T/V', r: 'Receita: árvore → ∂P/∂T e ∂P/∂V → multiplica pelas taxas dadas',
    b: [ARV('P', ['T', 'V'], ['t']),
      { c: [['*∂P/∂T', '8,31/V', ' = 8,31/100', 'T′ = 0,1 K/s'], ['*∂P/∂V', '−8,31T/V²', ' = −8,31·300/100²', 'V′ = 0,2 L/s']] },
      'dP/dt = (8,31/100)(0,1) + (−8,31·300/10 000)(0,2)', ' = 0,00831 − 0,04986 ≈ «o|−0,042»',
      '=dP/dt ≈ −0,042 kPa/s (a pressão cai)'] };
  q.x39 = { t: 'Cone: V = πr²h/3', r: 'Receita: árvore → parciais → taxa com sinal (h diminui → negativo)',
    b: [CONE,
      { c: [['*∂V/∂r', '2πrh/3', 'r′ = «g|+1,8»'], ['*∂V/∂h', 'πr²/3', 'h′ = «r|−2,5»']] },
      'dV/dt = (2π·120·150/3)(1,8) + (π·120²/3)(−2,5)', ' = π(12 000·1,8 − 4 800·2,5) = π(21 600 − 12 000)', ' = «o|9 600π»',
      '=dV/dt = 9 600π ≈ 30 159 cm³/s (o volume aumenta)'] };
  q.x40 = { t: 'z = eˣ sen y, x = st², y = s²t', r: 'Receita: árvore com s e t → cada caminho até a variável é um termo',
    b: [ARV('z', ['x', 'y'], ['s', 't']),
      { c: [['*parciais de z', 'z<sub>x</sub> = eˣ sen y', 'z<sub>y</sub> = eˣ cos y'], ['*x = st²', 'x<sub>s</sub> = t²', 'x<sub>t</sub> = 2st'], ['*y = s²t', 'y<sub>s</sub> = 2st', 'y<sub>t</sub> = s²']] },
      '#∂z/∂s | caminhos até s', ' = eˣ sen y · «b|t²» + eˣ cos y · «b|2st»',
      '#∂z/∂t | caminhos até t', ' = eˣ sen y · «b|2st» + eˣ cos y · «b|s²»',
      '=∂z/∂s = t² e<sup>st²</sup> sen(s²t) + 2st e<sup>st²</sup> cos(s²t) · ∂z/∂t = 2st e<sup>st²</sup> sen(s²t) + s² e<sup>st²</sup> cos(s²t)'] };
  q.x41 = { t: 'Lei de Ohm: I = V/R', r: 'Receita: isola I → árvore → parciais × taxas',
    b: [ARV('I', ['V', 'R'], ['t']),
      { c: [['*∂I/∂V', '1/R = 1/400', 'V′ = −0,01'], ['*∂I/∂R', '−V/R²', 'V = 0,08·400 = «b|32 V»', 'R′ = 0,03']] },
      'dI/dt = (1/400)(−0,01) + (−32/400²)(0,03)', ' = −0,000025 − 0,000006 = «o|−0,000031»',
      '=dI/dt ≈ −3,1 × 10⁻⁵ A/s'] };

  /* ===== Aula 6 · gradiente ===== */
  q.x42 = { t: 'f(x, y) = x²y³ − 4y em (2, −1), direção v = ⟨2, 5⟩', r: 'Receita: gradiente → no ponto → u unitário → D<sub>u</sub>f = ∇f · u',
    b: ['#Gradiente', '∇f = ⟨2xy³ , 3x²y² − 4⟩', '∇f(2, −1) = ⟨2·2·(−1) , 3·4·1 − 4⟩ = «o|⟨−4, 8⟩»',
      '#Unitário', '|v| = √(4 + 25) = √29 → u = ⟨2, 5⟩/√29',
      P2({ x: [-5, 4], y: [-1.5, 8.5], w: 280, h: 260, tk: 2, ar: [[0, 0, -4, 8, K.o, '∇f', -30, 0], [0, 0, 2 * 3 / Math.sqrt(29) * 1.8, 5 * 3 / Math.sqrt(29) * 1.8, K.b, 'u']], pt: [[0, 0, K.ink, '(2, −1)', 6, 16]] }),
      '#D<sub>u</sub>f = ∇f · u', '(−4·2 + 8·5)/√29 = «o|32/√29»',
      '=D<sub>u</sub>f(2, −1) = 32/√29 ≈ 5,94'] };
  q.x43 = { t: 'Montanha · 4a) andando para o sul', r: 'Receita: direção → unitário? → D<sub>u</sub>h = ∇h · u → sinal diz sobe/desce',
    b: ['∇h(50, 80) = (−1, −3,2)', 'sul → u = (0, −1) · ‖u‖ = 1 «g|✓»',
      ROSA([[0, 0, 0, -2.4, K.b, 'u (sul)', 8, 8]]),
      'D<sub>u</sub>h = (−1, −3,2)·(0, −1) = 0 + 3,2 = «o|3,2» > 0',
      '=sobe, 3,2 m de altura a cada metro andado'] };
  q.x44 = { t: 'Montanha · 4b) andando para o noroeste', r: 'Receita: noroeste = (−1, 1) → normaliza → D<sub>u</sub>h',
    b: ['noroeste → v = (−1, 1) · ‖v‖ = √2', 'u = (−1/√2 , 1/√2)',
      ROSA([[0, 0, -1.8, 1.8, K.b, 'u (NO)', -50, -4]]),
      'D<sub>u</sub>h = (−1)(−1/√2) + (−3,2)(1/√2) = −2,2/√2', 'racionaliza: −1,1√2 ≈ «o|−1,56» < 0',
      '=desce, 1,56 m a cada metro'] };
  q.x45 = { t: 'Montanha · 4c) subida mais íngreme', r: 'Receita: subida máxima → direção do ∇h · taxa = ‖∇h‖',
    b: ['direção: «b|o próprio ∇h» = −1 î − 3,2 ĵ', ROSA(),
      'taxa máx = ‖∇h‖ = √(1 + 10,24) = √11,24 ≈ «o|3,35»',
      '=direção −î − 3,2ĵ · taxa ≈ 3,35 m/m'] };
  q.x46 = { t: 'Montanha · 4d) descida mais íngreme', r: 'Receita: descida máxima → −∇h · taxa = −‖∇h‖',
    b: ['direção: «b|−∇h» = î + 3,2 ĵ', ROSA([[0, 0, 1, 3.2, K.g, '−∇h', 6, 4]]),
      'taxa mín = −‖∇h‖ ≈ «o|−3,35»',
      '=direção î + 3,2ĵ · taxa ≈ −3,35 m/m'] };

  /* ===== Aula 7 · máximos e mínimos ===== */
  q.x47 = { t: 'f(x, y) = x² + y² − 2x − 6y + 14', r: 'Receita: zera as derivadas → testa a 2ª ordem em CADA ponto → classifica → calcula o valor',
    b: ['#Pontos críticos | f<sub>x</sub> = 0 e f<sub>y</sub> = 0',
      { c: [['*f<sub>x</sub> → y congelado', '2x − 2 = 0 → x = 1'], ['*f<sub>y</sub> → x congelado', '2y − 6 = 0 → y = 3']] },
      '→ «o|(1, 3)»',
      '#Teste do D | D = f<sub>xx</sub>·f<sub>yy</sub> − (f<sub>xy</sub>)²',
      'f<sub>xx</sub> = 2 · f<sub>yy</sub> = 2 · f<sub>xy</sub> = 0', 'D = 2·2 − 0² = 4 > 0 e f<sub>xx</sub> > 0 → «g|MÍNIMO»',
      '#Valor', 'f(1, 3) = 1 + 9 − 2 − 18 + 14 = «o|4»',
      S3({ f: (x, y) => (x - 1) ** 2 + (y - 3) ** 2 + 4, x: [-1, 3], y: [1, 5], n: 14, zs: .5, zmax: 12, pt: [[1, 3, null, K.g, 'mínimo (1, 3, 4)']] }),
      '~ completando quadrados: (x − 1)² + (y − 3)² + 4 → vale com fundo na altura 4',
      '=mínimo local 4 em (1, 3) · sem máximo e sem sela'] };
  q.x48 = { t: 'f(x, y) = x⁴ + y⁴ − 4xy + 1', r: 'Receita: zera as derivadas → testa a 2ª ordem em CADA ponto → classifica → calcula o valor',
    b: ['#Pontos críticos | f<sub>x</sub> = 0 e f<sub>y</sub> = 0',
      { c: [['*f<sub>x</sub>', '4x³ − 4y = 0 → y = x³'], ['*f<sub>y</sub>', '4y³ − 4x = 0 → x = y³']] },
      'substitui: (x³)³ − x = 0 → x⁹ − x = 0 → x(x⁸ − 1) = 0',
      '→ x = 0 ou x = ±1 → «o|(0, 0) · (1, 1) · (−1, −1)»',
      '#Teste do D | D = f<sub>xx</sub>·f<sub>yy</sub> − (f<sub>xy</sub>)²',
      'f<sub>xx</sub> = 12x² · f<sub>yy</sub> = 12y² · f<sub>xy</sub> = −4 → D = 144x²y² − 16',
      { c: [['*(0, 0)', 'D = −16 < 0', '→ «r|SELA»'], ['*(1, 1)', 'D = 128 > 0 e f<sub>xx</sub> = 12 > 0', '→ «g|MÍNIMO»'], ['*(−1, −1)', 'D = 128 > 0 e f<sub>xx</sub> = 12 > 0', '→ «g|MÍNIMO»']] },
      '#Valores', 'f(1, 1) = f(−1, −1) = 1 + 1 − 4 + 1 = «o|−1» · f(0, 0) = 1',
      S3({ f: (x, y) => Math.min(x ** 4 + y ** 4 - 4 * x * y + 1, 4), x: [-1.6, 1.6], y: [-1.6, 1.6], n: 18, zs: .55, zmax: 4, pt: [[1, 1, null, K.g, 'mín'], [-1, -1, null, K.g, 'mín'], [0, 0, null, K.r, 'sela']] }),
      '=sela em (0, 0) · mínimos −1 em (1, 1) e (−1, −1)'] };

  /* ===== Lista ===== */
  q.Q1a = Object.assign({}, q.x18, { t: '1a) f(x, y) = 3x − 2y⁴' });
  q.Q1b = Object.assign({}, q.x19, { t: '1b) z = x e<sup>3y</sup>' });
  q.Q1c = Object.assign({}, q.x20, { t: '1c) z = (2x + 3y)<sup>10</sup>' });
  q.Q1d = { t: '1d) f(x, y) = ln(x + √(x² + y²)) · f<sub>x</sub>(3, 4)', r: 'Receita: ln → (dentro)′ ÷ dentro → simplifica → troca o ponto',
    b: ['#ln | (dentro)′ ÷ dentro', 'u = x + √(x² + y²)',
      'u<sub>x</sub> = 1 + ' + F('x', '√(x² + y²)') + ' = ' + F('√(x² + y²) + x', '√(x² + y²)'),
      'f<sub>x</sub> = ' + F('u<sub>x</sub>', 'u') + ' = ' + F('√(x² + y²) + x', '√(x² + y²) · (x + √(x² + y²))') + ' = «o|' + F('1', '√(x² + y²)') + '»',
      '~ o de cima é igual ao u: cancela',
      'f<sub>y</sub> = ' + F('y', '√(x² + y²) · (x + √(x² + y²))'),
      '#No ponto (3, 4)', '√(9 + 16) = 5 → f<sub>x</sub>(3, 4) = «o|1/5»',
      '=f<sub>x</sub>(3, 4) = 1/5'] };
  q.Q2 = { t: '2) Chapa: T(x, y) = 60/(1 + x² + y²)', r: 'Receita: escreve com expoente −1 → cadeia → troca (1, 2) no fim',
    b: ['T = 60·(1 + x² + y²)<sup>−1</sup>',
      { c: [['*T<sub>x</sub>', '−60(1 + x² + y²)<sup>−2</sup>·«b|2x»', ' = −120x/(1 + x² + y²)²'], ['*T<sub>y</sub>', '−60(1 + x² + y²)<sup>−2</sup>·«b|2y»', ' = −120y/(1 + x² + y²)²']] },
      '#Em (1, 2)', '1 + 1 + 4 = 6 → 6² = «b|36»', 'T<sub>x</sub> = −120/36 = «o|−10/3»', 'T<sub>y</sub> = −240/36 = «o|−20/3»',
      P2({ x: [-3, 3], y: [-3, 3], w: 270, h: 250, tk: 1, cv: [1, 2, 2.6].map((r, i) => ({ p: t => [r * Math.cos(t), r * Math.sin(t)], t: [0, 6.3], c: [K.o, K.p, K.b][i], d: 1 })), pt: [[1, 2, K.ink, '(1, 2)']], tx: [[-0.6, 0.25, 'quente', K.o, 11]] }),
      '~ negativas: saindo do centro quente, a temperatura cai (mais rápido em y)',
      '=T<sub>x</sub>(1, 2) = −10/3 °C/m · T<sub>y</sub>(1, 2) = −20/3 °C/m'] };
  q.Q3 = { t: '3) z = sen x · cos y, x = πt, y = √t', r: 'Receita: árvore → parciais × derivadas em t',
    b: [ARV('z', ['x', 'y'], ['t']),
      { c: [['*parciais', 'z<sub>x</sub> = cos x · cos y', 'z<sub>y</sub> = −sen x · sen y'], ['*derivadas em t', 'x′ = π', 'y′ = ' + F('1', '2√t')]] },
      'dz/dt = z<sub>x</sub>·x′ + z<sub>y</sub>·y′',
      '=dz/dt = π cos x cos y − ' + F('sen x sen y', '2√t')] };
  q.Q4 = { t: '4) z = x²y³, x = s cos t, y = s sen t', r: 'Receita: árvore com s e t → cada caminho é um termo',
    b: [ARV('z', ['x', 'y'], ['s', 't']),
      { c: [['*parciais de z', 'z<sub>x</sub> = 2xy³', 'z<sub>y</sub> = 3x²y²'], ['*x = s cos t', 'x<sub>s</sub> = cos t', 'x<sub>t</sub> = −s sen t'], ['*y = s sen t', 'y<sub>s</sub> = sen t', 'y<sub>t</sub> = s cos t']] },
      '#∂z/∂s', ' = 2xy³ · «b|cos t» + 3x²y² · «b|sen t»',
      '~ trocando x e y: 2s⁴cos²t sen³t + 3s⁴cos²t sen³t = «o|5s⁴cos²t sen³t»',
      '#∂z/∂t', ' = 2xy³ · «b|(−s sen t)» + 3x²y² · «b|(s cos t)»',
      '=∂z/∂s = 2xy³ cos t + 3x²y² sen t · ∂z/∂t = −2sxy³ sen t + 3sx²y² cos t'] };
  q.Q5 = { t: '5) dz/dt em t = 3 com valores dados', r: 'Receita: acha o ponto (x, y) em t = 3 → fórmula da cadeia com números',
    b: [ARV('z', ['x', 'y'], ['t']),
      'em t = 3: x = g(3) = 2 · y = h(3) = 7 → ponto «b|(2, 7)»',
      '~ por isso a questão dá f<sub>x</sub> e f<sub>y</sub> em (2, 7)',
      'dz/dt = f<sub>x</sub>·g′ + f<sub>y</sub>·h′ = 6·5 + (−8)(−4)', ' = 30 + 32 = «o|62»',
      '=dz/dt = 62 em t = 3'] };
  q.Q6 = { t: '6) Inseto: x = √(1 + t), y = 2 + t/3', r: 'Receita: acha o ponto em t = 3 → derivadas em t → cadeia',
    b: ['em t = 3: x = √4 = 2 · y = 2 + 1 = 3 → «b|(2, 3)»',
      { c: [['*x′', '1/(2√(1 + t))', 't = 3: «o|1/4»'], ['*y′', '1/3', '«o|1/3»']] },
      P2({ x: [0, 3.5], y: [1.5, 5], w: 280, h: 230, tk: 1, cv: [{ p: t => [Math.sqrt(1 + t), 2 + t / 3], t: [0, 8], c: K.b, l: [2.4, 4.4, 'caminho'] }], ar: [[2, 3, 2 + 0.25 * 3, 3 + 3 / 3 * 1, K.o, 'velocidade', 6, 0]], pt: [[2, 3, K.ink, 't = 3', 6, 16]] }),
      'dT/dt = T<sub>x</sub>·x′ + T<sub>y</sub>·y′ = 4·(1/4) + 3·(1/3)', ' = 1 + 1 = «o|2»',
      '=dT/dt = 2 °C/s'] };
  q.Q7 = { t: '7) Caixa: ℓ = 1, w = h = 2 · ℓ′ = w′ = 2, h′ = −3', r: 'Receita: fórmula → derivada no tempo (cada letra tem a sua taxa) → troca os números',
    b: [CAIXA('ℓ = 1', 'w = 2', 'h = 2'),
      { c: [['*(a) volume', 'V = ℓwh', 'V′ = wh·ℓ′ + ℓh·w′ + ℓw·h′', ' = 4·2 + 2·2 + 2·(−3)', ' = «o|6 m³/s»'], ['*(b) área', 'S = 2(ℓw + ℓh + wh)', 'S′ = 2[(w + h)ℓ′ + (ℓ + h)w′ + (ℓ + w)h′]', ' = 2[4·2 + 3·2 + 3·(−3)]', ' = «o|10 m²/s»'], ['*(c) diagonal', 'D = √(ℓ² + w² + h²) = 3', 'D′ = (ℓℓ′ + ww′ + hh′)/D', ' = (2 + 4 − 6)/3', ' = «o|0 m/s»']] },
      '~ a diagonal fica parada: o que um lado ganha o outro perde',
      '=V′ = 6 m³/s · S′ = 10 m²/s · D′ = 0'] };
  q.Q8 = { t: '8) f(x, y) = 5xy² − 4x³y, P(1, 2), u = ⟨5/13, 12/13⟩', r: 'Receita: gradiente → no ponto → u unitário? → D<sub>u</sub>f = ∇f · u',
    b: ['#(a) Gradiente', { c: [['*f<sub>x</sub> → y congelado', '5y² − 12x²y'], ['*f<sub>y</sub> → x congelado', '10xy − 4x³']] },
      '∇f = «o|⟨5y² − 12x²y , 10xy − 4x³⟩»',
      '#(b) No ponto P(1, 2)', '⟨5·4 − 12·2 , 10·2 − 4⟩ = ⟨20 − 24 , 20 − 4⟩ = «o|⟨−4, 16⟩»',
      '#(c) D<sub>u</sub>f | u já é unitário?', '(5/13)² + (12/13)² = 25/169 + 144/169 = 1 «g|✓»',
      P2({ x: [-5, 3], y: [-1, 17], w: 260, h: 270, tk: 4, ar: [[0, 0, -4, 16, K.o, '∇f', -30, 0], [0, 0, 5 / 13 * 7, 12 / 13 * 7, K.b, 'u']], pt: [[0, 0, K.ink, 'P', 6, 16]] }),
      'D<sub>u</sub>f = −4·(5/13) + 16·(12/13) = (−20 + 192)/13 = «o|172/13»',
      '=(a) ⟨5y² − 12x²y, 10xy − 4x³⟩ · (b) ⟨−4, 16⟩ · (c) 172/13 ≈ 13,23'] };
  q.Q9 = { t: '9) f(x, y, z) = x e<sup>2yz</sup>, P(3, 0, 2), u = ⟨2/3, −2/3, 1/3⟩', r: 'Receita: três parciais → no ponto → D<sub>u</sub>f = ∇f · u',
    b: ['#(a) Gradiente', { c: [['*f<sub>x</sub>', 'e<sup>2yz</sup>'], ['*f<sub>y</sub>', 'x·e<sup>2yz</sup>·«b|2z»', ' = 2xz e<sup>2yz</sup>'], ['*f<sub>z</sub>', 'x·e<sup>2yz</sup>·«b|2y»', ' = 2xy e<sup>2yz</sup>']] },
      '#(b) No ponto', 'y = 0 → e<sup>0</sup> = «b|1»', '∇f(P) = ⟨1 , 2·3·2 , 0⟩ = «o|⟨1, 12, 0⟩»',
      '#(c) D<sub>u</sub>f', '~ u: 4/9 + 4/9 + 1/9 = 1 «g|✓»', '1·(2/3) + 12·(−2/3) + 0 = (2 − 24)/3 = «o|−22/3»',
      '=(a) ⟨e<sup>2yz</sup>, 2xz e<sup>2yz</sup>, 2xy e<sup>2yz</sup>⟩ · (b) ⟨1, 12, 0⟩ · (c) −22/3'] };
  q.Q10 = { t: '10) f(x, y) = 1 + 2x√y em (3, 4), v = ⟨4, −3⟩', r: 'Receita: gradiente no ponto → normaliza v → produto escalar',
    b: [{ c: [['*f<sub>x</sub>', '2√y', '(3, 4): «o|4»'], ['*f<sub>y</sub>', '2x · ' + F('1', '2√y') + ' = ' + F('x', '√y'), '(3, 4): «o|3/2»']] },
      '∇f(3, 4) = ⟨4 , 3/2⟩',
      '#Unitário', '|v| = √(16 + 9) = 5 → u = ⟨4/5 , −3/5⟩',
      P2({ x: [-1, 5], y: [-3, 2.5], w: 280, h: 230, tk: 1, ar: [[0, 0, 4, 1.5, K.o, '∇f', 4, -4], [0, 0, 4 / 5 * 3, -3 / 5 * 3, K.b, 'u', 6, 12]], pt: [[0, 0, K.ink, '(3, 4)', -46, -8]] }),
      'D<sub>u</sub>f = 4·(4/5) + (3/2)·(−3/5) = 16/5 − 9/10 = «o|23/10»',
      '=D<sub>u</sub>f = 23/10 = 2,3'] };
  q.Q11 = { t: '11) f = x eʸ + y eᶻ + z eˣ em (0, 0, 0), v = ⟨5, 1, −2⟩', r: 'Receita: três parciais → na origem → normaliza v',
    b: [{ c: [['*f<sub>x</sub>', 'eʸ + z eˣ', '→ 1'], ['*f<sub>y</sub>', 'x eʸ + eᶻ', '→ 1'], ['*f<sub>z</sub>', 'y eᶻ + eˣ', '→ 1']] },
      '~ na origem: e⁰ = 1 e os termos com x, y ou z somem',
      '∇f(0, 0, 0) = «o|⟨1, 1, 1⟩»', '|v| = √(25 + 1 + 4) = √30',
      'D<sub>u</sub>f = (5 + 1 − 2)/√30 = «o|4/√30»',
      '=D<sub>u</sub>f = 4/√30 ≈ 0,73'] };
  q.Q12 = { t: '12) f(x, y) = √(xy) em P(2, 8) na direção de Q(5, 4)', r: 'Receita: v = Q − P → normaliza → gradiente no ponto → produto escalar',
    b: [{ c: [['*f<sub>x</sub>', F('y', '2√(xy)'), 'P: 8/8 = «o|1»'], ['*f<sub>y</sub>', F('x', '2√(xy)'), 'P: 2/8 = «o|1/4»']] },
      '~ em P: √(2·8) = 4 → 2√(xy) = 8',
      '#Direção', 'v = Q − P = (5 − 2 , 4 − 8) = ⟨3, −4⟩ · |v| = 5 → u = ⟨3/5 , −4/5⟩',
      P2({ x: [0, 6], y: [2, 10], w: 260, h: 250, tk: 2, ar: [[2, 8, 5, 4, K.b, 'v', 6, 0]], pt: [[2, 8, K.o, 'P(2, 8)'], [5, 4, K.ink, 'Q(5, 4)']] }),
      'D<sub>u</sub>f = 1·(3/5) + (1/4)·(−4/5) = 3/5 − 1/5 = «o|2/5»',
      '=D<sub>u</sub>f = 2/5'] };
  q.Q13 = { t: '13) Taxa máxima de f(x, y) = sen(xy) em (1, 0)', r: 'Receita: taxa máxima = ‖∇f‖, na direção do próprio ∇f',
    b: [{ c: [['*f<sub>x</sub>', 'y·cos(xy)', '(1, 0): «o|0»'], ['*f<sub>y</sub>', 'x·cos(xy)', '(1, 0): «o|1»']] },
      '∇f(1, 0) = ⟨0, 1⟩', '‖∇f‖ = √(0 + 1) = «o|1»',
      '=taxa máxima 1, na direção ⟨0, 1⟩'] };
  q.Q14 = { t: '14) Bola de metal: T ∝ 1/distância', r: 'Receita: monta T com K → acha K pelo dado → vetor direção unitário → gradiente → D<sub>u</sub>T = ∇T · u⃗',
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
      '=D<sub>u</sub>T(1, 2, 2) = −40/(3√3) ≈ −7,7 °C/u.c.'] };
  q.Q15 = { t: '15) Potencial V = 5x² − 3xy + xyz em P(3, 4, 5)', r: 'Receita: gradiente no ponto → (a) u unitário e produto · (b) direção = ∇V · (c) taxa máx = ‖∇V‖',
    b: ['#Gradiente', { c: [['*V<sub>x</sub>', '10x − 3y + yz', '30 − 12 + 20 = «o|38»'], ['*V<sub>y</sub>', '−3x + xz', '−9 + 15 = «o|6»'], ['*V<sub>z</sub>', 'xy', '3·4 = «o|12»']] },
      '∇V(3, 4, 5) = ⟨38, 6, 12⟩',
      '#(a) direção de v = i + j − k', '|v| = √3 (não é unitário!) → u = ⟨1, 1, −1⟩/√3',
      'D<sub>u</sub>V = (38 + 6 − 12)/√3 = «o|32/√3» ≈ 18,48',
      '#(b) varia mais rápido | direção do ∇V', '«o|⟨38, 6, 12⟩»',
      '#(c) taxa máxima | ‖∇V‖', '√(1444 + 36 + 144) = √1624 = «o|2√406» ≈ 40,3',
      '~ compare: na direção de v deu 18,48 < 40,3',
      '=(a) 32/√3 · (b) ⟨38, 6, 12⟩ · (c) 2√406 ≈ 40,3'] };
  q.Q16a = { t: '16a) f(x, y) = 9 − 2x + 4y − x² − 4y²', r: 'Receita: zera as derivadas → testa a 2ª ordem em CADA ponto → classifica → calcula o valor',
    b: ['#Pontos críticos | f<sub>x</sub> = 0 e f<sub>y</sub> = 0',
      { c: [['*f<sub>x</sub> → y congelado', '−2x → −2 / x² → 2x', 'f<sub>x</sub> = −2 − 2x = 0', '→ «o|x = −1»'], ['*f<sub>y</sub> → x congelado', '4y → 4 / −4y² → −8y', 'f<sub>y</sub> = 4 − 8y = 0', '→ «o|y = 1/2»']] },
      'P = (−1, 1/2)',
      '#Derivadas de 2ª ordem', 'f<sub>xx</sub> = −2 · f<sub>yy</sub> = −8 · f<sub>xy</sub> = 0',
      '#Teste do D | D = f<sub>xx</sub>·f<sub>yy</sub> − (f<sub>xy</sub>)²', 'D = (−2)(−8) − 0 = 16 > 0 e f<sub>xx</sub> < 0 → «g|MÁXIMO»',
      '#Valor', 'f(−1, 1/2) = 9 + 2 + 2 − 1 − 1 = «o|11»',
      S3({ f: (x, y) => 9 - 2 * x + 4 * y - x * x - 4 * y * y, x: [-3, 1], y: [-0.5, 1.5], n: 14, zs: .25, zmax: 11, pt: [[-1, 0.5, null, K.g, 'máx (−1; 0,5; 11)']] }),
      '=máximo local f(−1, 1/2) = 11 · sem mínimo e sem sela'] };
  q.Q16b = { t: '16b) f(x, y) = x² + y² + x²y + 4', r: 'Receita: zera as derivadas → testa a 2ª ordem em CADA ponto → classifica → calcula o valor',
    b: ['#Pontos críticos | f<sub>x</sub> = 0 e f<sub>y</sub> = 0',
      { c: [['*f<sub>x</sub> → y congelado', 'x² → 2x / y² → 0 / x²y → 2xy / 4 → 0', 'f<sub>x</sub> = 2x + 2xy = «o|2x(1 + y)»', '2x(1 + y) = 0 → «o|x = 0» ou «o|y = −1»', '~ produto = 0 → um dos fatores é 0 (não divida por x!)'], ['*f<sub>y</sub> → x congelado', 'x² → 0 / y² → 2y / x²y → x² / 4 → 0', 'f<sub>y</sub> = «o|2y + x²»', '2y + x² = 0']] },
      'caso x = 0: 2y + 0 = 0 → y = 0 → «o|P₁ = (0, 0)»',
      'caso y = −1: −2 + x² = 0 → x² = 2 → x = ±√2 → «o|P₂ = (√2, −1)» e «o|P₃ = (−√2, −1)»',
      '~ três pontos críticos: agora testa um por um',
      '#Derivadas de 2ª ordem', 'f<sub>xx</sub> = «o|2 + 2y» · f<sub>yy</sub> = «o|2» · f<sub>xy</sub> = derivada de (2x + 2xy) em y = «b|2x»',
      '~ têm x e y dentro → precisa trocar o ponto antes do teste',
      '#Teste do D em cada ponto | D = f<sub>xx</sub>·f<sub>yy</sub> − (f<sub>xy</sub>)²',
      { c: [['*(0, 0)', 'f<sub>xx</sub> = 2 / f<sub>yy</sub> = 2 / f<sub>xy</sub> = 0', 'D = 2·2 − 0² = 4', 'D > 0 e f<sub>xx</sub> > 0 → «g|MÍNIMO»'], ['*(√2, −1) e (−√2, −1)', 'f<sub>xx</sub> = 2 + 2(−1) = 0 / f<sub>yy</sub> = 2 / f<sub>xy</sub> = ±2√2', 'D = 0·2 − (±2√2)² = 0 − 8 = −8', 'D < 0 → «r|SELA» (nos dois)']] },
      '#Valores', 'f(0, 0) = 0 + 0 + 0 + 4 = «o|4»', 'f(±√2, −1) = 2 + 1 + 2·(−1) + 4 = «o|5»',
      S3({ f: (x, y) => Math.min(x * x + y * y + x * x * y + 4, 9), x: [-2.2, 2.2], y: [-2, 1.4], n: 18, zs: .45, zmax: 9, pt: [[0, 0, null, K.g, 'mín 4'], [1.414, -1, null, K.r, 'sela'], [-1.414, -1, null, K.r, 'sela']] }),
      '=mínimo local = 4 em (0, 0) · pontos de sela em (√2, −1) e (−√2, −1), com f = 5 · não há máximo'] };
  q.Q16c = { t: '16c) f(x, y) = x³ − 12xy + 8y³', r: 'Receita: zera as derivadas → testa a 2ª ordem em CADA ponto → classifica → calcula o valor',
    b: ['#Pontos críticos | f<sub>x</sub> = 0 e f<sub>y</sub> = 0',
      { c: [['*f<sub>x</sub> → y congelado', 'x³ → 3x² / −12xy → −12y / 8y³ → 0', 'f<sub>x</sub> = «o|3x² − 12y»', '3x² − 12y = 0 → «o|y = x²/4»'], ['*f<sub>y</sub> → x congelado', 'x³ → 0 / −12xy → −12x / 8y³ → 24y²', 'f<sub>y</sub> = «o|−12x + 24y²»', '−12x + 24y² = 0 → «o|x = 2y²»']] },
      'substitui y = x²/4 dentro de x = 2y²:',
      'x = 2·(x²/4)² = 2·x⁴/16 = x⁴/8 → x⁴ − 8x = 0 → x(x³ − 8) = 0',
      '→ x = 0 ou x³ = 8 → x = 2',
      'x = 0 → y = 0 → «o|P₁ = (0, 0)» · x = 2 → y = 4/4 = 1 → «o|P₂ = (2, 1)»',
      '#Derivadas de 2ª ordem', 'f<sub>xx</sub> = «o|6x» · f<sub>yy</sub> = «o|48y» · f<sub>xy</sub> = derivada de (3x² − 12y) em y = «b|−12»',
      '#Teste do D em cada ponto | D = f<sub>xx</sub>·f<sub>yy</sub> − (f<sub>xy</sub>)²',
      { c: [['*(0, 0)', 'f<sub>xx</sub> = 0 / f<sub>yy</sub> = 0 / f<sub>xy</sub> = −12', 'D = 0·0 − (−12)² = −144', 'D < 0 → «r|SELA»'], ['*(2, 1)', 'f<sub>xx</sub> = 12 / f<sub>yy</sub> = 48 / f<sub>xy</sub> = −12', 'D = 12·48 − 144 = 576 − 144 = 432', 'D > 0 e f<sub>xx</sub> > 0 → «g|MÍNIMO»']] },
      '#Valores', 'f(0, 0) = «o|0»', 'f(2, 1) = 2³ − 12·2·1 + 8·1³ = 8 − 24 + 8 = «o|−8»',
      S3({ f: (x, y) => Math.max(Math.min(x ** 3 - 12 * x * y + 8 * y ** 3, 12), -10), x: [-1.5, 3], y: [-1, 1.8], n: 18, zs: .3, zmax: 12, pt: [[2, 1, null, K.g, 'mín −8'], [0, 0, null, K.r, 'sela']] }),
      '=mínimo local = −8 em (2, 1) · ponto de sela em (0, 0), com f = 0 · não há máximo'] };
  q.Q17 = { t: '17) Três números positivos com soma 100 e produto máximo', r: 'Receita: usa a soma para tirar uma variável → zera as derivadas → resolve o sistema',
    b: ['#Tira o z | x + y + z = 100', 'z = 100 − x − y', 'P = xy(100 − x − y) = 100xy − x²y − xy²',
      '#Zera as derivadas',
      { c: [['*P<sub>x</sub>', '100y − 2xy − y²', ' = y(100 − 2x − y) = 0'], ['*P<sub>y</sub>', '100x − x² − 2xy', ' = x(100 − x − 2y) = 0']] },
      '~ x, y > 0: não podem ser os fatores x ou y',
      { s: ['2x + y = 100', 'x + 2y = 100'], a: '→ subtrai: x − y = 0 → x = y → 3x = 100' },
      'x = y = «o|100/3» → z = 100 − 200/3 = «o|100/3»',
      '=os três valem 100/3 (produto máximo quando são iguais)'] };
  q.Q18 = { t: '18) Caixa de volume máximo com soma das 12 arestas = c', r: 'Receita: usa o vínculo para tirar o z → zera as derivadas → simetria',
    b: [CAIXA('x', 'y', 'z'),
      '#Vínculo | 4x + 4y + 4z = c', 'z = c/4 − x − y', 'V = xy(c/4 − x − y)',
      '#Zera as derivadas', { c: [['*V<sub>x</sub>', 'y(c/4 − 2x − y) = 0'], ['*V<sub>y</sub>', 'x(c/4 − x − 2y) = 0']] },
      { s: ['2x + y = c/4', 'x + 2y = c/4'], a: '→ x = y = «o|c/12»' },
      'z = c/4 − c/12 − c/12 = «o|c/12»',
      '=um cubo de aresta c/12'] };
  q.Q19 = { t: '19) Caixa sem tampa com 32 000 cm³ e menos papelão', r: 'Receita: vínculo do volume tira o z → área em x e y → zera as derivadas → testa o D',
    b: [CAIXA('x', 'y', 'z', false),
      '#Vínculo | xyz = 32 000', 'z = 32 000/(xy)',
      '#Área (sem tampa)', 'S = xy + 2xz + 2yz = «o|xy + 64 000/y + 64 000/x»',
      '#Zera as derivadas', { c: [['*S<sub>x</sub>', 'y − 64 000/x² = 0'], ['*S<sub>y</sub>', 'x − 64 000/y² = 0']] },
      'simetria: x = y → x³ = 64 000 → x = «o|40» → z = 32 000/1600 = «o|20»',
      '#Teste do D', 'S<sub>xx</sub> = 128 000/x³ = 2 · S<sub>yy</sub> = 2 · S<sub>xy</sub> = 1 → D = 4 − 1 = 3 > 0 e S<sub>xx</sub> > 0 → «g|MÍNIMO»',
      '=base quadrada de 40 cm × 40 cm e altura 20 cm'] };

  Q.calc2 = q;
})();
