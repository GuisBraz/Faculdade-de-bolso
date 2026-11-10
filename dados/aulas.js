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
    temas: { 2: "Funções de várias variáveis e derivadas" },
    sobre: "Cálculo II leva o Cálculo I para funções de várias variáveis: em vez de uma curva y = f(x), você trabalha com superfícies z = f(x, y). É a matemática por trás da temperatura numa chapa soldada, da tensão numa viga, do volume de um tanque e da otimização de um projeto.",
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
    temas: { 2: "Força, movimento e energia" },
    sobre: "Física I estuda o movimento e as suas causas: forças, as leis de Newton e a energia. É a base de toda a mecânica da engenharia, de estruturas e pontes rolantes a molas, polias, freios e máquinas.",
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
    temas: { 2: "Vetores, retas e planos no espaço" },
    sobre: "Geometria Analítica e Álgebra Linear descreve pontos, vetores, retas e planos no espaço com equações. É a linguagem do CAD 3D, da robótica, da topografia e de qualquer conta que envolva direção e posição.",
    lab_nome: "Laboratório 3D de retas e planos", lab_desc: "Monte retas e planos no espaço e veja interseções, ângulos e distâncias." },
  qg: { pag: "materias/qg/oficina-de-quimica.html", simbolo: "⚗", lista: "ed3", lab: "lab", quiz: "quiz", cola: "cola",
    modulos: { 1: [
      ["materia", "Matéria e elementos", "Substâncias, misturas e símbolos"],
      ["modelos", "Modelos atômicos", "De Dalton a Schrödinger, Rutherford e as partículas"],
      ["luz", "Luz e fótons", "c = λν, E = hν e efeito fotoelétrico"],
      ["bohr", "Átomo de Bohr", "Órbitas, saltos e as linhas do hidrogênio"],
      ["quanticos", "Números quânticos", "n, l, mₗ, mₛ e orbitais em 3D"],
      ["config", "Configuração eletrônica", "Pauling, Hund, Pauli, íons e exceções"],
      ["periodicas", "Propriedades periódicas", "Raio, ionização, afinidade e Z efetiva"],
      ["ed1", "Estudo dirigido 1", "As 18 questões resolvidas e treino"]
    ], 2: [], 3: [
      ["reacoes", "Reações e equações", "Equação química, conservação da massa e balanceamento"],
      ["massa", "Massa molar e mol", "u, g/mol, Avogadro e massa molecular"],
      ["conv", "Transformações", "gramas ↔ mol ↔ partículas"],
      ["esteq", "Estequiometria", "Limitante, excesso, pureza e rendimento"],
      ["solucoes", "Soluções", "Concentração em mol/L e diluição"],
      ["redox", "Oxirredução", "Nox, quem oxida e quem reduz"],
      ["pilhas", "Pilhas e baterias", "Ânodo, cátodo, fem e chumbo-ácido"],
      ["ed3", "Estudo dirigido 3", "As 12 questões da lista resolvidas"]
    ] },
    temas: { 1: "Estrutura atômica e tabela periódica", 3: "Reações, estequiometria, soluções e eletroquímica" },
    sobre: "Química Geral estuda a matéria e as suas transformações: do que as coisas são feitas, como os átomos se combinam e quanto de cada substância reage. Na engenharia ela aparece na corrosão, na soldagem, na combustão, no tratamento de água e na escolha de materiais.",
    lab_nome: "Laboratório de descobertas", lab_desc: "Junte átomos da tabela periódica e descubra 325 substâncias reais.", lab_estrela: true },
  cm2: { pag: "materias/materiais/oficina-de-materiais.html", simbolo: "◈", lista: null, lab: null, quiz: "quiz", cola: "cola", unico: true,
    modulos: { 1: [
      ["ceramicos", "Materiais cerâmicos", "Propriedades e classificação pela aplicação"],
      ["compositos", "Materiais compósitos", "Matriz + fase dispersa, classificação e regra das misturas"]
    ] },
    temas: { 1: "Cerâmicos e compósitos" },
    sobre: "Ciência dos Materiais estuda por que cada material se comporta como se comporta: da ligação entre os átomos até a peça pronta. Na engenharia mecânica é ela que justifica a escolha entre aço, cerâmica, polímero ou compósito em cada aplicação." },
  usin: { pag: "materias/usinagem/oficina-de-usinagem.html", simbolo: "⚙", continua: true,
    lab_nome: "Simulador CNC e máquinas 3D", lab_desc: "Furadeira, torno, mandrilhadora e centro de usinagem em 3D, com calculadoras." },
  ingl: { pag: "materias/ingles/oficina-de-ingles.html", simbolo: "Aa", continua: true,
    lab_nome: "Arcade de inglês", lab_desc: "Jogos de memória, corrida, forca, fala e ditado com as palavras das fases.", lab_hash: "arcade" }
};
/* laboratórios-jogo (páginas próprias em labs/) · total = nº de missões, para mostrar o progresso */
window.FDB_LABS = [
  { mat: "fis1", nome: "Oficina de Newton", url: "labs/newton.html", chave: "newton", total: 8, ic: "🍎", desc: "Rampas, polias, molas, puxões e pêndulos: mexa nos controles, aperte Soltar e veja as forças e o diagrama de corpo livre ao vivo." },
  { mat: "calc2", nome: "Escultor de superfícies", url: "labs/superficies.html", chave: "superficies", total: 8, ic: "⛰️", desc: "Monte f(x, y) com peças, esculpa a superfície 3D, ache máximos, mínimos e selas e role a bolinha do gradiente." },
  { mat: "gaal", nome: "Hangar 3D", url: "labs/hangar.html", chave: "hangar", total: 8, ic: "✈️", desc: "Lance retas e planos no espaço, descubra paralelas, reversas e interseções e passe o voo pelos anéis." },
  { mat: "usin", nome: "Chão de fábrica", url: "labs/fabrica.html", chave: "fabrica", total: 8, ic: "🏭", desc: "Receba o pedido, escolha ferramenta, Vc, avanço e profundidade e veja a peça sair: tempo, custo, desgaste e acabamento." },
  { mat: "ingl", nome: "Escritório internacional", url: "labs/escritorio.html", chave: "escritorio", total: 8, ic: "💼", desc: "Primeiro dia, e-mail ao fornecedor, catálogo, reunião e segurança: monte as frases em inglês e avance na história." }
];
window.FDB_LABS_FUTUROS = [];
