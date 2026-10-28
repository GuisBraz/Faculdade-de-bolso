/*
  FACULDADE DE BOLSO · provas e avaliações
  ------------------------------------------------------------
  Um objeto por avaliação. Campos:
    materia   → id da matéria (o mesmo de dados/materias.js)
    titulo    → nome da avaliação
    data      → "AAAA-MM-DD"
    valor     → pontos (opcional)
    tipo      → "prova" (padrão), "trabalho" ou "reserva"
                (reserva = segunda chamada / exame: só aparece em cinza)
    conteudo  → o que cai (opcional)
    material  → caminho de um material do hub para estudar (opcional)
    nota      → sua nota, depois de sair (opcional)
  Fonte: cronogramas 2º/2026 enviados pelas professoras.
  Os cronogramas avisam que as datas podem sofrer pequenas alterações.
*/
window.PROVAS = [
  // ---------- GAAL · Prof.ª Gabriela Oliveira ----------
  { materia: "gaal", titulo: "1ª Prova", data: "2026-09-25", valor: 30,
    conteudo: "Matrizes, determinantes, sistemas lineares, vetores, produto escalar, vetorial e misto." },
  { materia: "gaal", titulo: "2ª Prova", data: "2026-11-06", valor: 30,
    conteudo: "Retas e planos, interseções, posições relativas, perpendicularidade, medidas angulares e distâncias.",
    material: "materias/gaal/oficina-de-gaal.html" },
  { materia: "gaal", titulo: "3ª Prova", data: "2026-12-04", valor: 30,
    conteudo: "Cônicas (parábola, elipse, hipérbole), espaços e subespaços vetoriais, combinação linear, dependência linear, base e mudança de base." },
  { materia: "gaal", titulo: "Segunda chamada", data: "2026-12-11", valor: 30, tipo: "reserva" },
  { materia: "gaal", titulo: "Exame especial", data: "2026-12-21", valor: 100, tipo: "reserva" },

  // ---------- Cálculo II · Prof.ª Gabriela Oliveira ----------
  { materia: "calc2", titulo: "1ª Prova", data: "2026-10-08", valor: 30,
    conteudo: "Integral definida e TFC, substituição, por partes, frações parciais, área entre curvas e volume de sólidos de revolução (discos e cascas)." },
  { materia: "calc2", titulo: "2ª Prova", data: "2026-11-12", valor: 30,
    conteudo: "Funções de várias variáveis, curvas de nível, derivadas parciais, regra da cadeia, derivadas direcionais e gradiente, extremos e teste da derivada segunda." },
  { materia: "calc2", titulo: "3ª Prova", data: "2026-12-09", valor: 30,
    conteudo: "Integrais duplas: somas de Riemann, Teorema de Fubini e regiões gerais." },
  { materia: "calc2", titulo: "Segunda chamada", data: "2026-12-16", valor: 30, tipo: "reserva" },
  { materia: "calc2", titulo: "Exame especial", data: "2026-12-21", tipo: "reserva" },

  // ---------- Química Geral · Prof.ª Paula Sevenini Pinto ----------
  { materia: "qg", titulo: "1ª Avaliação + Estudo dirigido 1", data: "2026-09-14", valor: 33,
    conteudo: "Avaliação (28 pts) e estudo dirigido (5 pts)." },
  { materia: "qg", titulo: "2ª Avaliação + Estudo dirigido 2", data: "2026-10-26", valor: 33,
    conteudo: "Avaliação (28 pts) e estudo dirigido (5 pts)." },
  { materia: "qg", titulo: "3ª Avaliação + Estudo dirigido 3", data: "2026-12-11", valor: 34,
    conteudo: "Avaliação (29 pts) e estudo dirigido (5 pts)." },
  { materia: "qg", titulo: "Exame final", data: "2026-12-18", tipo: "reserva" }
];
