/*
  FACULDADE DE BOLSO · catálogo
  ------------------------------------------------------------
  Este é o único arquivo que precisa mudar para o site crescer.

  • Novo material: adicione um objeto em "arquivos" da matéria e
    coloque o arquivo em materias/<id-da-materia>/.
      { titulo, tipo, caminho, descricao, data: "AAAA-MM-DD", tags: [] }
    tipos: site, pdf, resumo, lista, prova, link
  • Oficinas acumulativas (uma por prova):
      ciclo: "2ª Prova"       → a prova que a oficina prepara
      ate: "AAAA-MM-DD"       → data da prova; depois dela a oficina fecha sozinha
      aberta: false           → fecha antes da data, se precisar
      atualizacoes: [{ data, texto }] → o que entrou a cada aula
  • Período atual: marque "atual: true" no período que está cursando.
  • Situação da matéria (campo "status"):
      "aprovada"  → conta no progresso
      "reprovada" → fica vermelha
      "cursando"  → em andamento
      (sem status = ainda não cursada)
    Quando TODAS as matérias de um período estiverem aprovadas ou
    reprovadas, o período é recolhido automaticamente.
  • "area" define a cor da matéria (veja AREAS abaixo).
  • "icone": nome de um ícone do index.html (ex.: calculo, vetor, solda).
*/
window.FACULDADE = {
  curso: "Engenharia Mecânica",
  instituicao: "IFMG · Campus Betim",
  areas: {
    a: { nome: "Matemática", cor: "#0C8587" },
    f: { nome: "Física", cor: "#6447BE" },
    q: { nome: "Química", cor: "#2E8B57" },
    d: { nome: "Desenho", cor: "#2F6FD0" },
    m: { nome: "Materiais", cor: "#9A5A2E" },
    e: { nome: "Mecânica", cor: "#D9531A" },
    t: { nome: "Térmica e fluidos", cor: "#C23A55" },
    p: { nome: "Fabricação", cor: "#8A6A14" },
    c: { nome: "Computação e automação", cor: "#4656C7" },
    h: { nome: "Humanas e gestão", cor: "#6B7486" }
  },
  periodos: [
    {
      numero: 1, ch: 285,
      materias: [
        { id: "soc", sigla: "Sociologia", nome: "Introdução à Sociologia", ch: 30, icone: "pessoas", area: "h", arquivos: [] },
        { id: "dt1", sigla: "Desenho I", nome: "Desenho Técnico I", ch: 60, icone: "desenho", area: "d", arquivos: [] },
        { id: "cm1", sigla: "Materiais I", nome: "Ciência dos Materiais I", ch: 30, icone: "materiais", area: "m", arquivos: [] },
        { id: "ieng", sigla: "Intro Eng.", nome: "Introdução à Engenharia", ch: 30, icone: "engrenagem", area: "e", arquivos: [] },
        { id: "calc1", sigla: "Cálculo I", nome: "Cálculo I", ch: 75, icone: "calculo", area: "a", arquivos: [] },
        { id: "icc1", sigla: "ICC I", nome: "Introdução à Ciência da Computação I", ch: 60, icone: "programacao", area: "c", arquivos: [] }
      ]
    },
    {
      numero: 2, ch: 300, atual: true,
      materias: [
        { id: "qg", sigla: "Química", nome: "Química Geral", ch: 60, icone: "quimica", area: "q", arquivos: [] },
        { id: "calc2", sigla: "Cálculo II", nome: "Cálculo II", ch: 60, icone: "calculo", area: "a", arquivos: [
            {
              titulo: "Oficina de Cálculo II · Várias Variáveis",
              tipo: "site",
              caminho: "materias/calc2/oficina-de-calculo-2.html",
              ciclo: "2ª Prova", ate: "2026-11-12",
              atualizacoes: [
                { data: "2026-10-29", texto: "Criada: funções de várias variáveis, curvas de nível, derivadas parciais, regra da cadeia, gradiente e máximos e mínimos, com a lista resolvida e cartas." }
              ],
              descricao: "Funções de várias variáveis do zero, com superfícies 3D, mapas de contorno, gradiente ao vivo, a lista de derivadas parciais e máximos e mínimos resolvida e quiz.",
              data: "2026-10-29",
              tags: ["derivadas parciais", "regra da cadeia", "gradiente", "máximos e mínimos", "curvas de nível", "prova"]
            }
          ] },
        { id: "fis1", sigla: "Física I", nome: "Física I", ch: 60, icone: "fisica", area: "f", arquivos: [
            {
              titulo: "Oficina de Física · Força, Movimento e Energia",
              tipo: "site",
              caminho: "materias/fis1/oficina-de-fisica.html",
              ciclo: "2ª Prova", ate: "2026-11-04",
              atualizacoes: [
                { data: "2026-10-28", texto: "Criada com os capítulos 5 e 6 (Força e Movimento I e II)." },
                { data: "2026-10-28", texto: "Incluído o capítulo 8 (Energia Potencial e Conservação da Energia)." },
                { data: "2026-10-28", texto: "Aula de 28/10: conservação geral da energia (formas de energia) e o exemplo de queda com 30 J (K + U)." },
                { data: "2026-10-28", texto: "Aula de 28/10: novo módulo Massa-mola — lei de Hooke (k em N/cm e N/m), ciclo −xm ↔ +xm, simulador de mola, v máx em x0 nas duas passagens, pista em U e PhET." },
                { data: "2026-10-29", texto: "Cartas de revisão (Anki): botão Cartas na oficina, carta surpresa nos módulos de teoria e 35 cartas de Física." }
              ],
              descricao: "Capítulos 5, 6 e 8 do Halliday: leis de Newton, atrito, arrasto, movimento circular, energia potencial e conservação da energia, com simuladores, 22 problemas resolvidos e quiz.",
              data: "2026-10-28",
              tags: ["newton", "atrito", "arrasto", "movimento circular", "energia", "conservação", "halliday"]
            }
          ] },
        { id: "cm2", sigla: "Materiais II", nome: "Ciência dos Materiais II", ch: 30, icone: "materiais", area: "m", arquivos: [] },
        { id: "dt2", sigla: "Desenho II", nome: "Desenho Técnico II – DAC", ch: 30, icone: "desenho", area: "d", arquivos: [] },
        { id: "gaal", sigla: "GAAL", nome: "Geometria Analítica e Álgebra Linear", ch: 60, icone: "vetor", area: "a", arquivos: [
            {
              titulo: "Oficina de GAAL",
              tipo: "site",
              caminho: "materias/gaal/oficina-de-gaal.html",
              ciclo: "2ª Prova", ate: "2026-11-06",
              atualizacoes: [
                { data: "2026-10-28", texto: "Criada: retas, planos, posições relativas, ângulos e distâncias, com a lista 4 resolvida." },
                { data: "2026-10-29", texto: "Cartas de revisão (Anki): botão Cartas na oficina, carta surpresa nos módulos de teoria e 29 cartas de GAAL." }
              ],
              descricao: "Retas, planos, posições relativas, ângulos e distâncias do zero, com laboratório 3D, calculadoras, a lista 4 resolvida e quiz.",
              data: "2026-10-28",
              tags: ["retas", "planos", "distâncias", "ângulos", "prova"]
            }
          ] }
      ]
    },
    {
      numero: 3, ch: 300,
      materias: [
        { id: "mg", sigla: "Mec. Geral", nome: "Mecânica Geral", ch: 30, icone: "estrutura", area: "e", arquivos: [] },
        { id: "calc3", sigla: "Cálculo III", nome: "Cálculo III", ch: 60, icone: "calculo", area: "a", arquivos: [] },
        { id: "dt3", sigla: "Desenho III", nome: "Desenho Técnico III – Modelamento", ch: 60, icone: "cubo", area: "d", arquivos: [] },
        { id: "labq", sigla: "Lab. Química", nome: "Laboratório de Química Geral", ch: 30, icone: "quimica", area: "q", arquivos: [] },
        { id: "fis2", sigla: "Física II", nome: "Física II", ch: 60, icone: "onda", area: "f", arquivos: [] },
        { id: "labf1", sigla: "Lab. Física I", nome: "Laboratório de Física I", ch: 30, icone: "fisica", area: "f", arquivos: [] },
        { id: "cm3", sigla: "Materiais III", nome: "Ciência dos Materiais III", ch: 30, icone: "materiais", area: "m", arquivos: [] }
      ]
    },
    {
      numero: 4, ch: 300,
      materias: [
        { id: "metro", sigla: "Metrologia", nome: "Metrologia", ch: 30, icone: "regua", area: "p", arquivos: [] },
        { id: "fis3", sigla: "Física III", nome: "Física III", ch: 30, icone: "eletrica", area: "f", arquivos: [] },
        { id: "ms1", sigla: "Sólidos I", nome: "Mecânica dos Sólidos I", ch: 60, icone: "viga", area: "e", arquivos: [] },
        { id: "adm", sigla: "Administração", nome: "Introdução à Administração", ch: 30, icone: "gestao", area: "h", arquivos: [] },
        { id: "mf", sigla: "Fluidos", nome: "Mecânica dos Fluidos", ch: 60, icone: "fluidos", area: "t", arquivos: [] },
        { id: "labf2", sigla: "Lab. Física II", nome: "Laboratório de Física II", ch: 30, icone: "fisica", area: "f", arquivos: [] },
        { id: "edo", sigla: "EDO", nome: "Equações Diferenciais Ordinárias", ch: 60, icone: "onda", area: "a", arquivos: [] }
      ]
    },
    {
      numero: 5, ch: 300,
      materias: [
        { id: "pf1", sigla: "Fabricação I", nome: "Processos de Fabricação I", ch: 30, icone: "prensa", area: "p", arquivos: [] },
        { id: "ms2", sigla: "Sólidos II", nome: "Mecânica dos Sólidos II", ch: 60, icone: "viga", area: "e", arquivos: [] },
        { id: "pe", sigla: "Estatística", nome: "Probabilidade e Estatística", ch: 30, icone: "estatistica", area: "a", arquivos: [] },
        { id: "shp", sigla: "Hidropneumática", nome: "Sistemas Hidropneumáticos", ch: 60, icone: "manometro", area: "t", arquivos: [] },
        { id: "eletro", sigla: "Eletrotécnica", nome: "Eletrotécnica", ch: 60, icone: "eletrica", area: "c", arquivos: [] },
        { id: "termo", sigla: "Termodinâmica", nome: "Termodinâmica", ch: 60, icone: "termo", area: "t", arquivos: [] }
      ]
    },
    {
      numero: 6, ch: 300,
      materias: [
        { id: "metc", sigla: "Metodologia", nome: "Metodologia Científica e Tecnológica", ch: 30, icone: "pesquisa", area: "h", arquivos: [] },
        { id: "ms3", sigla: "Sólidos III", nome: "Mecânica dos Sólidos III", ch: 60, icone: "viga", area: "e", arquivos: [] },
        { id: "tc", sigla: "Transf. Calor", nome: "Transferência de Calor", ch: 60, icone: "termo", area: "t", arquivos: [] },
        { id: "mne", sigla: "Métodos Num.", nome: "Métodos Numéricos para Engenharia", ch: 45, icone: "malha", area: "a", arquivos: [] },
        { id: "solt", sigla: "Soldagem T.", nome: "Processos de Fabricação III – Soldagem Teórica", ch: 30, icone: "solda", area: "p", arquivos: [] },
        { id: "em", sigla: "Elem. Máquinas", nome: "Elementos de Máquinas", ch: 45, icone: "engrenagem", area: "e", arquivos: [] },
        { id: "usi", sigla: "Usinagem", nome: "Processos de Fabricação II – Usinagem", ch: 30, icone: "usinagem", area: "p", arquivos: [] }
      ]
    },
    {
      numero: 7, ch: 300,
      materias: [
        { id: "etm", sigla: "Ensaios", nome: "Ensaios Tecnológicos de Materiais", ch: 60, icone: "materiais", area: "m", arquivos: [] },
        { id: "mot", sigla: "Motores", nome: "Motores de Combustão", ch: 60, icone: "pistao", area: "t", arquivos: [] },
        { id: "st", sigla: "Sist. Térmicos", nome: "Sistemas Térmicos – Máquinas de Calor e Fluxo", ch: 45, icone: "fluxo", area: "t", arquivos: [] },
        { id: "solp", sigla: "Soldagem P.", nome: "Processos de Fabricação III – Soldagem Prática", ch: 30, icone: "solda", area: "p", arquivos: [] },
        { id: "labu", sigla: "Lab. Usinagem", nome: "Processos de Fabricação IV – Lab. Usinagem", ch: 30, icone: "usinagem", area: "p", arquivos: [] },
        { id: "sust", sigla: "Sustentabilidade", nome: "Sustentabilidade e Tecnologia Ambiental", ch: 30, icone: "folha", area: "h", arquivos: [] },
        { id: "gee", sigla: "Gestão", nome: "Gestão Empresarial e Empreendedorismo", ch: 45, icone: "gestao", area: "h", arquivos: [] }
      ]
    },
    {
      numero: 8, ch: 210,
      materias: [
        { id: "dm", sigla: "Dinâmica", nome: "Dinâmica das Máquinas – Mecanismos e Vibrações", ch: 30, icone: "onda", area: "e", arquivos: [] },
        { id: "pf1e", sigla: "Ferramental I", nome: "Projeto de Ferramental I – Estampos", ch: 60, icone: "prensa", area: "p", arquivos: [] },
        { id: "inst", sigla: "Instrumentação", nome: "Instrumentação Industrial", ch: 30, icone: "manometro", area: "c", arquivos: [] },
        { id: "clp", sigla: "CLP", nome: "CLP – Controlador Lógico Programável", ch: 30, icone: "chip", area: "c", arquivos: [] },
        { id: "tcc1", sigla: "TCC I", nome: "TCC I", ch: 30, icone: "livro", area: "h", arquivos: [] },
        { id: "etica", sigla: "Ética", nome: "Ética, Profissão e Cidadania", ch: 30, icone: "balanca", area: "h", arquivos: [] }
      ]
    },
    {
      numero: 9, ch: 240,
      materias: [
        { id: "gp", sigla: "Projetos", nome: "Gerenciamento de Projetos I", ch: 30, icone: "gestao", area: "h", arquivos: [] },
        { id: "pf2", sigla: "Ferramental II", nome: "Projeto de Ferramental II – Injeção de Termoplásticos", ch: 60, icone: "injecao", area: "p", arquivos: [] },
        { id: "ii", sigla: "Instalações", nome: "Instalações Industriais", ch: 30, icone: "fabrica", area: "t", arquivos: [] },
        { id: "ef", sigla: "Elem. Finitos", nome: "Elementos Finitos", ch: 60, icone: "malha", area: "e", arquivos: [] },
        { id: "eecon", sigla: "Eng. Econômica", nome: "Engenharia Econômica", ch: 30, icone: "moeda", area: "h", arquivos: [] },
        { id: "tcc2", sigla: "TCC II", nome: "TCC II", ch: 30, icone: "livro", area: "h", arquivos: [] }
      ]
    },
    {
      numero: 10, ch: 270,
      materias: [
        { id: "manut", sigla: "Manutenção", nome: "Manutenção Mecânica", ch: 60, icone: "chave", area: "e", arquivos: [] },
        { id: "sq", sigla: "Qualidade", nome: "Sistemas da Qualidade", ch: 30, icone: "selo", area: "h", arquivos: [] },
        { id: "dir", sigla: "Direito", nome: "Direito e Legislação", ch: 30, icone: "balanca", area: "h", arquivos: [] },
        { id: "cnc", sigla: "CNC", nome: "Introdução ao CNC", ch: 30, icone: "usinagem", area: "c", arquivos: [] },
        { id: "esi", sigla: "Eng. Software", nome: "Engenharia de Software para Indústria", ch: 60, icone: "programacao", area: "c", arquivos: [] },
        { id: "rob", sigla: "Robótica", nome: "Introdução à Robótica", ch: 30, icone: "robo", area: "c", arquivos: [] },
        { id: "seg", sigla: "Segurança", nome: "Introdução à Segurança do Trabalho", ch: 30, icone: "capacete", area: "h", arquivos: [] }
      ]
    }
  ],

  /* Projetos complementares: matérias extras, fora dos semestres e da conta de progresso */
  extras: [
    { id: "usin", sigla: "Usinagem", nome: "Usinagem Básica", icone: "usinagem", area: "p", arquivos: [
        {
          titulo: "Oficina de Usinagem · do básico ao avançado",
          tipo: "site",
          caminho: "materias/usinagem/oficina-de-usinagem.html",
          ciclo: "Contínua",
          atualizacoes: [
            { data: "2026-10-29", texto: "Entrou no Faculdade de Bolso: visual das oficinas, cartas de revisão e simulador CNC mais leve (só redesenha quando algo muda)." }
          ],
          descricao: "Furadeira, torno, mandrilhadora e centro de usinagem em 3D, grandezas de corte, força e potência, desgaste, tolerâncias, CNC e código G com simulador, tempos e planejamento de processo.",
          data: "2026-10-29",
          tags: ["usinagem", "torno", "fresamento", "CNC", "código G", "tempo de máquina"]
        }
      ] }
  ]
};
