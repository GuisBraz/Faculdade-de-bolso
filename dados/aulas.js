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
    modulos: { 1: [
      ["primitivas", "Primitivas", "A derivada ao contrário e o + C"],
      ["riemann", "Integral definida", "Somas de Riemann e área"],
      ["tfc", "Teorema Fundamental", "F(b) − F(a)"],
      ["subst", "Substituição", "u = o de dentro"],
      ["partes", "Integração por partes", "uv − ∫ v du e a ordem LIATE"],
      ["fracoes", "Frações parciais", "Os 4 casos e as constantes"],
      ["areacurvas", "Área entre curvas", "De cima menos de baixo"],
      ["discos", "Volume por discos", "Discos e arruelas"],
      ["cascas", "Volume por cascas", "2π · raio · altura e os dois métodos"]
    ], 2: [
      ["funcoes", "Funções de 2 variáveis", "Domínio, imagem e gráfico"],
      ["nivel", "Curvas de nível", "f(x, y) = k e mapas de contorno"],
      ["parciais", "Derivadas parciais", "Uma variável por vez"],
      ["ordem", "Derivadas de 2ª ordem", "fxx, fxy, Clairaut, morro, vale e sela"],
      ["cadeia", "Regra da cadeia", "Casos I e II, diagrama de árvore"],
      ["gradiente", "Gradiente", "Derivada direcional e taxa máxima"],
      ["extremos", "Máximos e mínimos", "Pontos críticos, teste D e otimização"]
    ], 3: [
      ["dupla", "Integral dupla", "Volume, propriedades e Fubini"],
      ["regioes", "Regiões gerais", "Tipo I e tipo II"],
      ["inverter", "Inverter a ordem", "Redesenhar os limites"]
    ] },
    temas: { 1: "Integrais: técnicas, áreas e volumes", 2: "Funções de várias variáveis e derivadas", 3: "Integrais duplas" },
    sobre: "Cálculo II começa onde o Cálculo I parou: a integral. Primeiro você aprende a integrar (primitivas, TFC e as técnicas) e usa isso para calcular áreas e volumes. Depois leva o cálculo para funções de várias variáveis, superfícies z = f(x, y), e no fim integra sobre regiões do plano (integrais duplas). É a matemática por trás do volume de um tanque, da temperatura numa chapa soldada e da otimização de um projeto.",
    lab_nome: "Laboratório 3D de superfícies", lab_desc: "Digite qualquer f(x, y) e veja a superfície, as curvas de nível e o gradiente." },
  fis1: { pag: "materias/fis1/oficina-de-fisica.html", simbolo: "F", lista: "problemas", lab: "lab", quiz: "quiz", cola: "cola",
    modulos: { 1: [
      ["unidades", "Medidas e unidades", "SI, prefixos e conversão"],
      ["posicao", "Posição e deslocamento", "Δx, velocidade e rapidez médias"],
      ["velinst", "Velocidade instantânea", "v = dx/dt e a regra do tombo"],
      ["acel", "Aceleração", "a = dv/dt e o sinal que engana"],
      ["muv", "Aceleração constante", "As 5 equações e a receita"],
      ["queda", "Queda livre", "a = −g e a bola jogada para cima"],
      ["graficos", "Gráficos", "Inclinação e área"],
      ["vetores", "Vetores", "Componentes, módulo e ângulo"],
      ["unitarios", "Vetores unitários", "î, ĵ, k̂ e soma por componentes"],
      ["produtos", "Produtos de vetores", "Escalar e vetorial"],
      ["mov2d", "Movimento em 2D e 3D", "Posição, velocidade e aceleração por eixo"],
      ["projetil", "Projéteis", "Dois movimentos independentes"],
      ["mcu", "Movimento circular uniforme", "a = v²/r e o período"],
      ["relativo", "Movimento relativo", "A velocidade depende de quem olha"]
    ], 2: [
      ["forcas", "Forças e vetores", "Decompor e somar forças"],
      ["newton", "Leis de Newton", "Inércia, F = ma, ação e reação"],
      ["aplic", "Aplicações", "Peso, normal, tração, rampa, polia"],
      ["atrito", "Atrito", "Estático, cinético e o ângulo crítico"],
      ["arrasto", "Arrasto", "Velocidade terminal"],
      ["circular", "Movimento circular", "Curvas e loops"],
      ["trabalho", "Energia cinética e trabalho", "K = ½mv², W = Fd cos φ e W = ΔK"],
      ["wpeso", "Trabalho do peso e da mola", "−mgh, Hooke e ½kx²"],
      ["wvar", "Força variável e potência", "Área do gráfico e P = W/Δt"],
      ["potencial", "Energia potencial", "U = mgy, U = ½kx² e forças conservativas"],
      ["conserva", "Conservação da energia", "K + U constante, tobogãs e molas"],
      ["mola", "Sistema massa-mola", "Lei de Hooke e o ciclo da mola"],
      ["curva", "Curva de energia potencial", "Retorno, equilíbrio e F = −dU/dx"],
      ["termica", "Energia térmica e potência", "Atrito, ΔEt e P = ΔE/Δt"]
    ], 3: [] },
    temas: { 1: "Movimento em linha reta, vetores e movimento no plano (cap. 2, 3 e 4)", 2: "Força, trabalho e energia (cap. 5 a 8)" },
    sobre: "Física I estuda o movimento e as suas causas: forças, as leis de Newton e a energia. É a base de toda a mecânica da engenharia, de estruturas e pontes rolantes a molas, polias, freios e máquinas.",
    lab_nome: "Laboratório de forças", lab_desc: "Plano inclinado ao vivo: mude massa, ângulo e atrito e veja as forças." },
  gaal: { pag: "materias/gaal/oficina-de-gaal.html", simbolo: "⊥", lista: "lista", lab: "lab", quiz: "quiz", cola: "cola",
    modulos: { 1: [
      ["matrizes", "Matrizes", "Tipos, operações e produto linha × coluna"],
      ["escada", "Escalonamento", "Operações elementares e forma escada"],
      ["inversa", "Inversa e determinante", "[A | I], Sarrus e det ≠ 0"],
      ["sistemas", "Sistemas lineares", "SPD, SPI, SI e discussão com parâmetros"],
      ["vetores", "Vetores", "Setas, coordenadas, norma e distância"],
      ["pescalar", "Produto escalar", "Ângulo, ortogonalidade e o CPF"],
      ["pvetorial", "Vetorial e misto", "Área do paralelogramo e volume"]
    ], 2: [
      ["kit", "Revisão de vetores", "O kit que retas e planos usam"],
      ["retas", "Retas", "Ponto + direção em 4 formas de equação"],
      ["planos", "Planos", "Ponto + normal, e como achar a normal"],
      ["posicoes", "Posições relativas", "Paralelas, concorrentes e reversas"],
      ["angulos", "Ângulos", "Entre retas, planos e reta–plano"],
      ["distancias", "Distâncias", "Ponto, reta e plano"]
    ], 3: [
      ["conicas", "Parábola e elipse", "Foco, diretriz e soma de distâncias"],
      ["hiperbole", "Hipérbole", "Diferença de distâncias e assíntotas"],
      ["subespacos", "Subespaços e espaço gerado", "Combinação linear, N(A), C(A) e o nó de barras"],
      ["base", "Base e dimensão", "LI e LD, base, dimensão e a base de um subespaço"],
      ["mudanca", "Mudança de base", "Coordenadas numa base e a matriz M"]
    ] },
    temas: { 1: "Matrizes, sistemas lineares e vetores", 2: "Retas e planos no espaço", 3: "Cônicas, subespaços, base e dimensão" },
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
    ], 2: [
      ["ligacoes", "Ligação iônica", "Octeto, símbolos de Lewis, fórmulas e energia de rede"],
      ["covalente", "Ligação covalente", "Estruturas de Lewis, carga formal, ressonância, polaridade e entalpia"],
      ["geometria", "Geometria molecular", "RPENV, arranjo × geometria e polaridade em 3D"],
      ["intermol", "Forças intermoleculares", "London, dipolo-dipolo, ligação de H e ponto de ebulição"],
      ["ed2", "Estudo dirigido 2", "As 17 questões resolvidas"]
    ], 3: [
      ["reacoes", "Reações e equações", "Equação química, conservação da massa e balanceamento"],
      ["massa", "Massa molar e mol", "u, g/mol, Avogadro e massa molecular"],
      ["conv", "Transformações", "gramas ↔ mol ↔ partículas"],
      ["esteq", "Estequiometria", "Limitante, excesso, pureza e rendimento"],
      ["solucoes", "Soluções", "Concentração em mol/L e diluição"],
      ["redox", "Oxirredução", "Nox, quem oxida e quem reduz"],
      ["pilhas", "Pilhas e baterias", "Ânodo, cátodo, fem e chumbo-ácido"],
      ["ed3", "Estudo dirigido 3", "As 12 questões da lista resolvidas"]
    ] },
    temas: { 1: "Estrutura atômica e tabela periódica", 2: "Ligações químicas, geometria e forças intermoleculares", 3: "Reações, estequiometria, soluções e eletroquímica" },
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
