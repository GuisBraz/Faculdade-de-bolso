/*
  FACULDADE DE BOLSO · aulas organizadas por prova
  ------------------------------------------------------------
  Cada matéria: módulos = provas (1, 2, 3). Dentro de cada módulo, as aulas
  na ordem em que entram (Aula 1, 2, 3…). Cada aula aponta para a seção da
  oficina da matéria (pag + "#" + id).
  Para incluir uma aula nova: acrescente [id, título, resumo] no módulo certo.
  Módulo vazio = prova ainda sem conteúdo no site.
*/
window.FDB_AULAS = {
  calc2: { pag: "materias/calc2/oficina-de-calculo-2.html", simbolo: "∫", lista: "lista", lab: "lab", quiz: "quiz", cola: "cola",
    modulos: { 1: [], 2: [
      ["funcoes", "Funções de 2 variáveis", "Domínio, imagem e gráfico"],
      ["nivel", "Curvas de nível", "f(x, y) = k e mapas de contorno"],
      ["parciais", "Derivadas parciais", "Uma variável por vez"],
      ["ordem", "Derivadas de 2ª ordem", "fxx, fxy, Clairaut, morro, vale e sela"],
      ["cadeia", "Regra da cadeia", "Casos I e II, diagrama de árvore"],
      ["gradiente", "Gradiente", "Derivada direcional e taxa máxima"],
      ["extremos", "Máximos e mínimos", "Pontos críticos, teste D e otimização"]
    ], 3: [] },
    lab_nome: "Laboratório 3D de superfícies", lab_desc: "Digite qualquer f(x, y) e veja a superfície, as curvas de nível e o gradiente." },
  fis1: { pag: "materias/fis1/oficina-de-fisica.html", simbolo: "F", lista: "problemas", lab: "lab", quiz: "quiz", cola: "cola",
    modulos: { 1: [], 2: [
      ["forcas", "Forças e vetores", "Decompor e somar forças"],
      ["newton", "Leis de Newton", "Inércia, F = ma, ação e reação"],
      ["aplic", "Aplicações", "Peso, normal, tração, rampa, polia"],
      ["atrito", "Atrito", "Estático, cinético e o ângulo crítico"],
      ["arrasto", "Arrasto", "Velocidade terminal"],
      ["circular", "Movimento circular", "Curvas e loops"],
      ["potencial", "Energia potencial", "U = mgy, U = ½kx² e forças conservativas"],
      ["conserva", "Conservação da energia", "K + U constante, tobogãs e molas"],
      ["mola", "Sistema massa-mola", "Lei de Hooke e o ciclo da mola"],
      ["curva", "Curva de energia potencial", "Retorno, equilíbrio e F = −dU/dx"],
      ["termica", "Energia térmica e potência", "Atrito, ΔEt e P = ΔE/Δt"]
    ], 3: [] },
    lab_nome: "Laboratório de forças", lab_desc: "Plano inclinado ao vivo: mude massa, ângulo e atrito e veja as forças." },
  gaal: { pag: "materias/gaal/oficina-de-gaal.html", simbolo: "⊥", lista: "lista", lab: "lab", quiz: "quiz", cola: "cola",
    modulos: { 1: [], 2: [
      ["kit", "Vetores e os 3 produtos", "Escalar, vetorial e misto"],
      ["retas", "Retas", "Ponto + direção em 4 formas de equação"],
      ["planos", "Planos", "Ponto + normal, e como achar a normal"],
      ["posicoes", "Posições relativas", "Paralelas, concorrentes e reversas"],
      ["angulos", "Ângulos", "Entre retas, planos e reta–plano"],
      ["distancias", "Distâncias", "Ponto, reta e plano"]
    ], 3: [] },
    lab_nome: "Laboratório 3D de retas e planos", lab_desc: "Monte retas e planos no espaço e veja interseções, ângulos e distâncias." },
  qg: { pag: "materias/qg/oficina-de-quimica.html", simbolo: "⚗", lista: null, lab: "lab", quiz: "quiz", cola: "cola",
    modulos: { 1: [], 2: [
      ["reacoes", "Reações e equações", "Equação química, conservação da massa e balanceamento"],
      ["massa", "Medidas de massa", "u, g/mol e massa molecular"],
      ["mol", "O mol", "Avogadro e 1 mol de qualquer espécie"],
      ["conv", "Transformações", "gramas ↔ mol ↔ partículas"]
    ], 3: [] },
    lab_nome: "Laboratório de descobertas", lab_desc: "Junte átomos da tabela periódica e descubra 325 substâncias reais.", lab_estrela: true },
  usin: { pag: "materias/usinagem/oficina-de-usinagem.html", simbolo: "⚙", continua: true,
    lab_nome: "Simulador CNC e máquinas 3D", lab_desc: "Furadeira, torno, mandrilhadora e centro de usinagem em 3D, com calculadoras." },
  ingl: { pag: "materias/ingles/oficina-de-ingles.html", simbolo: "Aa", continua: true,
    lab_nome: "Arcade de inglês", lab_desc: "Jogos de memória, corrida, forca, fala e ditado com as palavras das fases.", lab_hash: "arcade" }
};
/* laboratórios planejados (ainda não construídos) */
window.FDB_LABS_FUTUROS = [
  { mat: "fis1", nome: "Oficina de Newton", desc: "Monte blocos, rampas, molas e polias numa bancada, aperte Soltar e veja as forças agindo. Cada montagem clássica vai para o álbum." },
  { mat: "calc2", nome: "Escultor de superfícies", desc: "Monte funções com peças e esculpa superfícies 3D; colecione paraboloides, selas e vulcões e vença desafios de gradiente." },
  { mat: "gaal", nome: "Hangar 3D", desc: "Lance retas e planos no espaço e descubra paralelas, reversas e interseções; acerte alvos com a reta certa." },
  { mat: "usin", nome: "Chão de fábrica", desc: "Receba uma peça, escolha máquina, ferramenta e parâmetros e veja a usinagem acontecer, com tempo, custo e desgaste." },
  { mat: "ingl", nome: "Escritório internacional", desc: "Situações reais de trabalho em inglês: e-mail a fornecedor, catálogo, reunião. Monte as frases e avance na história." }
];
