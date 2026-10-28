/*
  FACULDADE DE BOLSO · catálogo
  ------------------------------------------------------------
  Este é o único arquivo que precisa mudar para o site crescer.

  • Nova matéria: adicione um objeto em "materias" do período certo.
  • Novo material: adicione um objeto em "arquivos" da matéria e
    coloque o arquivo em materias/<id-da-materia>/.

  Ícones disponíveis (campo "icone"):
    vetor, calculo, fisica, quimica, programacao, desenho, engrenagem,
    materiais, estatistica, termo, fluidos, eletrica, estrutura,
    usinagem, solda, gestao, texto, pesquisa, livro
  Tipos de arquivo (campo "tipo"): site, pdf, resumo, lista, prova, link
*/
window.FACULDADE = {
  curso: "Engenharia Mecânica",
  instituicao: "IFMG · Campus Betim",
  aluno: "Guilherme Braz",
  periodos: [
    {
      numero: 1,
      materias: [
        {
          id: "gaal",
          sigla: "GAAL",
          nome: "Geometria Analítica e Álgebra Linear",
          icone: "vetor",
          cor: "#D9531A",
          professor: "Gabriela Oliveira",
          arquivos: [
            {
              titulo: "Oficina de GAAL",
              tipo: "site",
              caminho: "materias/gaal/oficina-de-gaal.html",
              descricao: "Retas, planos, posições relativas, ângulos e distâncias do zero, com laboratório 3D, calculadoras, a lista 4 resolvida e quiz.",
              data: "2026-10-28",
              tags: ["retas", "planos", "distâncias", "ângulos", "prova"]
            }
          ]
        }
      ]
    }
  ]
};
