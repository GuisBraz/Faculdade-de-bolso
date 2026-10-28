# Faculdade de Bolso

Hub de estudos do curso de Engenharia Mecânica (IFMG · Campus Betim). Todas as matérias organizadas por período, cada uma com os materiais de estudo criados ao longo do curso.

**Site:** https://guisbraz.github.io/Faculdade-de-bolso/

## Estrutura

```
index.html            → o hub (não precisa mexer)
dados/materias.js     → catálogo: períodos, matérias e materiais
materias/<id>/        → os arquivos de cada matéria
```

## Adicionar um material

1. Coloque o arquivo em `materias/<id-da-materia>/` (ex.: `materias/gaal/lista-5.html`).
2. Em `dados/materias.js`, dentro de `arquivos` da matéria, acrescente:

```js
{
  titulo: "Nome do material",
  tipo: "site",            // site, pdf, resumo, lista, prova ou link
  caminho: "materias/gaal/lista-5.html",
  descricao: "Uma frase sobre o conteúdo.",
  data: "2026-11-05",
  tags: ["assunto1", "assunto2"]
}
```

## Adicionar uma matéria

Em `dados/materias.js`, dentro de `materias` do período certo:

```js
{ id: "calc1", sigla: "Cálculo I", nome: "Cálculo Diferencial e Integral I",
  icone: "calculo", cor: "#0C8587", professor: "", arquivos: [] }
```

Ícones: `vetor, calculo, fisica, quimica, programacao, desenho, engrenagem, materiais, estatistica, termo, fluidos, eletrica, estrutura, usinagem, solda, gestao, texto, pesquisa, livro`.

## Materiais

| Matéria | Material |
|---|---|
| GAAL | [Oficina de GAAL](materias/gaal/oficina-de-gaal.html): retas, planos, posições, ângulos e distâncias com laboratório 3D, lista resolvida e quiz |
