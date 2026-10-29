# Faculdade de Bolso

Hub de estudos do curso de Engenharia Mecânica (IFMG · Campus Betim). Todas as matérias organizadas por período, cada uma com os materiais de estudo criados ao longo do curso.

**Site:** https://guisbraz.github.io/Faculdade-de-bolso/

As 65 matérias dos 10 períodos (2.805 h) já estão cadastradas; cada uma ganha materiais conforme o curso avança.

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
{ id: "calc1", sigla: "Cálculo I", nome: "Cálculo I", ch: 75,
  icone: "calculo", area: "a", professor: "", arquivos: [] }
```

`area` define a cor (lista em `areas`, no topo do arquivo). Para marcar o período que está cursando, use `atual: true` no período.

Ícones: `vetor, calculo, fisica, quimica, programacao, desenho, cubo, engrenagem, materiais, estatistica, termo, fluidos, eletrica, estrutura, viga, onda, regua, prensa, manometro, malha, pistao, fluxo, usinagem, solda, injecao, fabrica, chip, robo, chave, selo, balanca, moeda, folha, capacete, gestao, pessoas, texto, pesquisa, livro`.

## Acompanhar o progresso

No site, toque em **Dar baixa nas matérias** (barra "Ir para") e marque cada matéria como não cursada, cursando, aprovada ou reprovada. Dá também na página de cada matéria. As marcações ficam salvas no navegador; use **Copiar backup** / **Restaurar** para levá-las a outro aparelho.

O valor padrão vem do campo `status` em `dados/materias.js`. Cada matéria em `dados/materias.js` pode ter um `status`:

| status | efeito |
|---|---|
| `"aprovada"` | conta na porcentagem do curso (pela carga horária) |
| `"reprovada"` | o cartão fica vermelho e aparece no contador "a refazer" |
| `"cursando"` | marcada como em andamento |
| sem status | ainda não cursada |

Quando todas as matérias de um período estão aprovadas ou reprovadas, o período é recolhido automaticamente (clique para abrir). Ao refazer uma matéria reprovada, mude o status para `"cursando"` ou mova o objeto para o período em que vai cursá-la.

## Oficinas acumulativas

Cada matéria tem **uma oficina aberta por prova**:

1. Durante as aulas, o conteúdo novo vai sendo revisado e **acrescentado à oficina aberta** (cada inclusão fica registrada em `atualizacoes`).
2. Na data da prova (`ate`), a oficina **fecha sozinha** e vai para "Oficinas anteriores", continuando disponível para revisão.
3. Depois da prova, começa uma **oficina nova** para a próxima prova (novo arquivo em `materias/<id>/`, novo `ciclo`).

```js
{ titulo: "Oficina de GAAL", tipo: "site", caminho: "materias/gaal/oficina-de-gaal.html",
  ciclo: "2ª Prova", ate: "2026-11-06",
  atualizacoes: [{ data: "2026-10-28", texto: "Criada: retas, planos, ..." }] }
```

## Horário

A aba **Horário** mostra a grade semanal (dados em `dados/horario.js`), destacando o dia de hoje e a aula atual ou a próxima. Na página inicial, a faixa **Hoje** lista as aulas do dia.

Na página inicial só aparece o **período em andamento**; os anteriores e os próximos ficam recolhidos nos botões abaixo dele (ou pela barra "Ir para").

## Provas

A aba **Provas** mostra a contagem regressiva da próxima prova, todas as datas por mês e alertas no topo do hub quando uma prova está a 14 dias ou menos (laranja com 7 dias, vermelho com 2). O botão **Adicionar ao calendário** baixa um `.ics` com lembretes 7 dias e 1 dia antes.

- Provas de cronogramas oficiais ficam em `dados/provas.js`.
- Provas sem cronograma podem ser incluídas pelo formulário da própria aba (salvas no navegador e incluídas no backup).

## Atalho

**Esc** volta um nível: dentro de uma oficina, de um módulo para o início dela e depois para o hub; no hub, da matéria ou das provas para a página inicial.

## Materiais

| Matéria | Material |
|---|---|
| GAAL | [Oficina de GAAL](materias/gaal/oficina-de-gaal.html): retas, planos, posições, ângulos e distâncias com laboratório 3D, lista resolvida e quiz |
| Física I | [Oficina de Física](materias/fis1/oficina-de-fisica.html): Halliday caps. 5, 6 e 8 (Força e Movimento I e II; Energia Potencial e Conservação da Energia) com simuladores de plano inclinado, elevador, curva, montanha-russa e curva de U(x), problemas resolvidos e quiz |
