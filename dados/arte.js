/*
  FACULDADE DE BOLSO · Oficina de Desenho artístico (só para quem tem conta)
  ------------------------------------------------------------
  Curso do zero ao artista: 4 trilhas (Papel → Digital → Animação → Artista).
  Cada aula: ideia em linguagem simples, desenho passo a passo (fig), uma ferramenta
  interativa quando ajuda (tool), sessão de 30 min e versão "dia corrido" de 10 min.
  Estilo anime: só o ESTILO (proporções, olhos, cabelo, cores). Nada de copiar
  personagens existentes: todo personagem do curso é seu.
*/
window.FDB_ARTE = {
trilhas: [
  { id: 'papel', nome: 'Papel', ic: '✏️', cor: '#C2417A', sub: 'Lápis e papel, do primeiro risco à ilustração completa. É aqui que mora 80 % do aprendizado.' },
  { id: 'digital', nome: 'Digital', ic: '🖌️', cor: '#2F6FD0', sub: 'Quando tiver um celular com caneta ou uma mesa digitalizadora: camadas, lineart, cel shading e pintura.' },
  { id: 'anima', nome: 'Animação', ic: '🎞️', cor: '#0C8587', sub: 'Fazer o desenho se mexer: flipbook no caderno, timing, quique da bola e caminhada.' },
  { id: 'artista', nome: 'Artista', ic: '⭐', cor: '#D9531A', sub: 'Personagens próprios, mangá e quadrinhos, estilo pessoal, portfólio e rotina de quem vive desenhando.' }
],
/* material mínimo: o curso inteiro da trilha Papel cabe nisto */
material: [
  ['Lápis HB', 'esboço claro, linhas de construção'],
  ['Lápis 2B', 'linhas finais e sombras médias'],
  ['Lápis 6B (ou 4B)', 'os escuros fortes'],
  ['Borracha comum + borracha limpa-tipos (ou miolo de pão)', 'apagar e clarear sem rasgar'],
  ['Papel sulfite A4 ou caderno de desenho', 'sulfite é barato: gaste sem dó'],
  ['Apontador ou estilete', 'ponta fina para detalhe, ponta chata (deitada) para sombra']
],
aulas: [
/* ===================== TRILHA 1 · PAPEL ===================== */
{ id: 'p01', tr: 'papel', niv: 'Básico', t: 'Material, pegada e postura', r: 'Como segurar o lápis e por que desenhar com o braço, não com o pulso.',
  ideia: [
    'Desenhar é uma habilidade de <b>mão + olho + paciência</b>, não um dom. Todo artista que você admira começou fazendo riscos tortos. O que muda é a quantidade de horas.',
    'Existem duas pegadas: a de <b>escrever</b> (perto da ponta, para detalhes pequenos) e a <b>por cima</b> (lápis deitado, segurando mais atrás, para linhas longas e sombras). Use as duas.',
    'Linha longa sai do <b>ombro e do cotovelo</b>. Se você move só o pulso, toda linha vira um arco curto e tremido. Gire a folha à vontade: a folha se mexe, o braço fica confortável.'],
  fig: 'linhas',
  s30: [['Aquecimento', 5, 'Encha meia folha com riscos soltos: retas, ondas, espirais. Sem apagar nada.'], ['Exercício', 20, 'Faça 3 linhas de 20 pontos ligando A a B (pontos marcados antes). Primeira linha com o pulso, segunda com o cotovelo, terceira com o ombro. Compare.'], ['Fechamento', 5, 'Circule as 5 linhas mais retas da folha e escreva a data no canto.']],
  s10: ['Riscos soltos por 2 min', '20 linhas de ponto a ponto usando o braço', 'Data na folha e foto no celular'],
  ok: ['Segurei o lápis das duas formas', 'Fiz linhas longas sem mexer só o pulso', 'Datei a folha (vai virar seu "antes")'],
  erro: 'Apertar demais o lápis. O esboço é <b>leve</b>: se marcar o papel, você não consegue corrigir depois.' },

{ id: 'p02', tr: 'papel', niv: 'Básico', t: 'Linhas, curvas e elipses', r: 'O treino de base: linha fantasma, linha confiante e elipses soltas.',
  ideia: [
    'O truque da <b>linha fantasma</b>: marque o começo e o fim, passe o lápis no ar por cima do caminho 2 ou 3 vezes e só então encoste e risque de uma vez, rápido.',
    'Linha rápida sai reta e limpa. Linha lenta treme. Prefira uma linha rápida um pouco errada a uma lenta "certa".',
    '<b>Elipses</b> são círculos vistos de lado: estão em copos, rodas, olhos, cilindros. Desenhe girando o braço várias voltas sobre o mesmo lugar e depois reforce a melhor.'],
  fig: 'linhas',
  s30: [['Aquecimento', 5, 'Página de elipses: 3 voltas cada, de todos os tamanhos.'], ['Exercício', 20, 'Linha fantasma: 30 pares de pontos espalhados na folha, ligue cada par em um gesto. Depois 20 curvas em "S" de ponta a ponta.'], ['Fechamento', 5, 'Repita 5 elipses bem devagar e 5 bem rápido. Qual ficou melhor?']],
  s10: ['1 min de elipses', '15 linhas fantasma', '5 curvas em S'],
  ok: ['Ensaio no ar antes de riscar', 'Minhas linhas rápidas estão mais retas que as lentas', 'Elipses com as pontas arredondadas (sem bico)'],
  erro: 'Elipse com "bico" nas pontas (formato de olho/folha). A elipse é arredondada nas duas pontas.' },

{ id: 'p03', tr: 'papel', niv: 'Básico', t: 'Formas básicas viram objetos', r: 'Tudo é feito de círculo, quadrado, triângulo e suas versões 3D.',
  ideia: [
    'Olhe uma caneca: é um <b>cilindro</b> + uma alça em forma de "C". Um carro: caixas. Uma pessoa: esferas e cilindros. Quem desenha bem enxerga as formas simples por baixo de tudo.',
    'Comece sempre pelo <b>grande</b> (a forma geral) e só depois vá para o pequeno (detalhes). Detalhe em cima de forma errada é trabalho jogado fora.',
    'Linhas de construção são leves (HB, mão solta). A linha final vem por cima, mais escura (2B).'],
  fig: 'caneca',
  s30: [['Aquecimento', 5, 'Página de círculos, quadrados e triângulos soltos.'], ['Exercício', 20, 'Escolha 4 objetos da casa (caneca, celular, garrafa, controle). Para cada um: 1) só as formas básicas, 2) a forma final por cima.'], ['Fechamento', 5, 'Apague as construções de um deles e compare com o objeto real.']],
  s10: ['Formas soltas', '2 objetos em formas básicas', 'Reforce a linha final de um'],
  ok: ['Encontrei as formas simples de cada objeto', 'Construção leve, linha final mais escura', 'Fui do grande para o pequeno'],
  erro: 'Começar pelo detalhe (o desenho da caneca) antes de acertar o cilindro inteiro.' },

{ id: 'p04', tr: 'papel', niv: 'Básico', t: 'Volume: cubo, cilindro, esfera e cone', r: 'Fazer as formas parecerem sólidas, girando no espaço.',
  ideia: [
    'Uma forma 2D vira 3D quando você mostra <b>mais de um lado</b>: o cubo mostra frente, topo e lateral; o cilindro mostra a elipse do topo.',
    'Desenhe as formas <b>transparentes</b>, como se fossem de vidro: você vê as arestas de trás e percebe se a forma está torta.',
    'Linhas de contorno (cross-contour) ajudam: linhas que "abraçam" a forma como uma fita mostram para onde ela vira.'],
  fig: 'cubo2pf',
  s30: [['Aquecimento', 5, 'Elipses e linhas fantasma.'], ['Exercício', 20, '10 cubos transparentes em ângulos diferentes, 5 cilindros deitados e em pé, 5 esferas com linhas de contorno.'], ['Fechamento', 5, 'Pinte de leve o lado de cada cubo que ficaria mais escuro se a luz viesse de cima.']],
  s10: ['Elipses', '5 cubos transparentes', '3 cilindros'],
  ok: ['Meus cubos mostram 3 faces', 'Topo do cilindro é elipse (não retângulo)', 'Linhas de contorno abraçando a esfera'],
  erro: 'Cubo com as arestas de trás maiores que as da frente: o que está longe fica menor.' },

{ id: 'p05', tr: 'papel', niv: 'Básico', t: 'Perspectiva de 1 ponto', r: 'Linha do horizonte, ponto de fuga e a ilusão de profundidade.',
  ideia: [
    'A <b>linha do horizonte</b> é a altura dos seus olhos. O <b>ponto de fuga</b> é onde todas as linhas que vão "para dentro" do desenho se encontram, como os trilhos de um trem.',
    'Na perspectiva de 1 ponto, a frente das caixas fica de frente para você (quadrado perfeito) e só as linhas de profundidade vão até o ponto.',
    'Abaixo do horizonte você vê o <b>topo</b> das coisas; acima, você vê a <b>parte de baixo</b>. Teste no simulador abaixo.'],
  fig: 'cubo1pf', tool: 'perspectiva',
  s30: [['Aquecimento', 5, 'Linhas retas longas (régua só para o horizonte).'], ['Exercício', 20, 'Um horizonte e um ponto de fuga no meio. Desenhe 9 caixas: 3 acima, 3 na linha, 3 abaixo. Depois um corredor (paredes, chão, teto, uma porta).'], ['Fechamento', 5, 'Brinque no simulador e descreva o que muda quando o horizonte sobe.']],
  s10: ['Horizonte + ponto', '6 caixas', 'Uma porta no corredor'],
  ok: ['Todas as linhas de profundidade vão até o ponto', 'As frentes das caixas são quadrados retos', 'Entendi o que vejo acima e abaixo do horizonte'],
  erro: 'Linhas de profundidade "quase" no ponto. Se uma escapa, a caixa entorta. Use a régua até pegar o jeito.' },

{ id: 'p06', tr: 'papel', niv: 'Intermediário', t: 'Perspectiva de 2 e 3 pontos', r: 'Caixas de quina, prédios e ângulos dramáticos.',
  ideia: [
    'Com <b>2 pontos de fuga</b> você olha a caixa pela quina: as verticais continuam verticais e os dois lados fogem para pontos diferentes no horizonte.',
    'Coloque os pontos <b>bem afastados</b> (até fora da folha). Pontos muito perto deixam tudo distorcido, como foto de lente olho de peixe.',
    'Com <b>3 pontos</b> as verticais também fogem (para cima ou para baixo): é a visão de formiga olhando um prédio, ótima para cenas de ação.'],
  fig: 'cubo2pf', tool: 'perspectiva',
  s30: [['Aquecimento', 5, 'Cubos transparentes à mão livre.'], ['Exercício', 20, 'Horizonte com 2 pontos nas bordas da folha. Desenhe uma rua: 4 prédios de alturas diferentes, janelas e uma calçada. Janelas também vão para os pontos!'], ['Fechamento', 5, 'No simulador, aproxime os pontos e veja a distorção.']],
  s10: ['Horizonte + 2 pontos', '3 caixas de quina', 'Janelas em uma delas'],
  ok: ['Verticais retas', 'Cada lado vai para o seu ponto', 'Pontos afastados, sem distorção'],
  erro: 'Esquecer que as janelas, portas e linhas do chão também obedecem aos pontos de fuga.' },

{ id: 'p07', tr: 'papel', niv: 'Básico', t: 'Valores: do branco ao preto', r: 'Escala de tons, hachura, hachura cruzada e esfumado.',
  ideia: [
    '<b>Valor</b> é o quanto algo é claro ou escuro. É o que faz o desenho ter volume e impacto. Uma regra dos artistas: <i>se o valor está certo, a cor quase não importa</i>.',
    'Monte uma <b>escala de 5 tons</b>: branco do papel, claro, médio, escuro e o preto mais forte do 6B. Depois tente 9.',
    'Três jeitos de escurecer: <b>hachura</b> (linhas paralelas), <b>hachura cruzada</b> (linhas cruzando) e <b>esfumado</b> (lápis deitado, camadas leves, sem esfregar o dedo: a gordura mancha).'],
  fig: 'valores', tool: 'valores',
  s30: [['Aquecimento', 5, 'Página de hachuras: rápidas, paralelas, na mesma direção.'], ['Exercício', 20, 'Escala de 5 e de 9 tons em cada técnica (hachura, cruzada, esfumado). Passe o lápis só na direção que a hachura pede.'], ['Fechamento', 5, 'Faça o teste do olho na ferramenta: o mesmo cinza parece diferente dependendo do fundo.']],
  s10: ['Hachuras soltas', 'Uma escala de 5 tons', 'Teste do olho'],
  ok: ['Minha escala vai do branco ao preto sem pular degraus', 'Hachura com linhas paralelas e retas', 'Esfumado em camadas, sem borrar com o dedo'],
  erro: 'Desenhos "acinzentados": medo de usar o preto. Sem escuros fortes, nada tem volume.' },

{ id: 'p08', tr: 'papel', niv: 'Básico', t: 'Luz e sombra na esfera', r: 'As 5 zonas da luz que valem para qualquer objeto (e rosto).',
  ideia: [
    'Toda forma iluminada tem as mesmas zonas: <b>brilho</b> (onde a luz bate em cheio), <b>luz</b>, <b>meio-tom</b>, <b>sombra própria</b> (o lado de costas para a luz, com uma faixa mais escura chamada núcleo) e a <b>sombra projetada</b> no chão.',
    'Dentro da sombra existe a <b>luz refletida</b>: um pouco de luz que volta do chão. Ela é mais clara que a sombra, mas <i>nunca</i> tão clara quanto a parte iluminada.',
    'A sombra projetada é mais escura e mais definida perto do objeto e vai ficando clara e borrada longe dele.'],
  fig: 'esfera', tool: 'esfera',
  s30: [['Aquecimento', 5, 'Escala de 5 tons.'], ['Exercício', 20, 'Uma esfera grande com luz vindo de cima à direita, com as 5 zonas. Depois uma maçã ou laranja de verdade, com a luz de uma janela ou lanterna.'], ['Fechamento', 5, 'No simulador, mude a luz e confira se você acertou o lado da sombra.']],
  s10: ['Escala rápida', 'Esfera com as 5 zonas', 'Confira no simulador'],
  ok: ['Brilho do lado da luz', 'Núcleo escuro entre a luz e a luz refletida', 'Sombra projetada do lado oposto da luz'],
  erro: 'Luz refletida forte demais: a esfera parece de vidro. Ela é sutil.' },

{ id: 'p09', tr: 'papel', niv: 'Intermediário', t: 'Desenho de observação', r: 'Desenhar o que você vê, não o que acha que vê: medir com o lápis.',
  ideia: [
    'O cérebro desenha <b>símbolos</b> (olho = amêndoa, árvore = pirulito). Observar é desligar o símbolo e copiar formas, ângulos e tamanhos reais.',
    '<b>Medir com o lápis</b>: braço esticado, um olho fechado, o lápis vira régua. Compare: "a garrafa tem 3 vezes a altura da tampa". Ângulos também: alinhe o lápis com a borda e copie a inclinação.',
    '<b>Espaço negativo</b>: desenhe o formato do vazio entre as coisas (entre a alça e a caneca, entre as pernas da cadeira). É mais fácil de acertar e corrige o objeto.'],
  fig: 'caneca',
  s30: [['Aquecimento', 5, '5 desenhos de 1 min do mesmo objeto, de ângulos diferentes.'], ['Exercício', 20, 'Monte uma natureza-morta com 3 objetos (caneca, fruta, pano). Meça as proporções com o lápis, desenhe e faça as sombras.'], ['Fechamento', 5, 'Desenhe só o espaço negativo de uma cadeira.']],
  s10: ['3 desenhos de 1 min', 'Um objeto medido com o lápis', 'Sombra principal'],
  ok: ['Medi as proporções antes de desenhar', 'Usei o espaço negativo para corrigir', 'Desenhei o que vi, não o símbolo'],
  erro: 'Desenhar olhando mais para o papel do que para o objeto. Olhe para o objeto 70 % do tempo.' },

{ id: 'p10', tr: 'papel', niv: 'Intermediário', t: 'Texturas e materiais', r: 'Madeira, metal, tecido, pedra, vidro: cada um reflete a luz de um jeito.',
  ideia: [
    '<b>Metal</b> polido tem contrastes fortes: preto do lado do branco, reflexos em faixas. <b>Tecido</b> tem transições suaves. <b>Madeira</b> tem veios que seguem a forma. <b>Pedra</b> tem rachaduras e manchas irregulares.',
    'Textura não é desenhar cada detalhe: é mostrar <b>alguns</b> detalhes no lugar certo (na transição luz-sombra) e deixar o resto implícito.',
    'Vidro e água: quase tudo é reflexo e distorção do que está atrás, com brilhos bem brancos.'],
  fig: 'texturas',
  s30: [['Aquecimento', 5, 'Hachuras e esfumado.'], ['Exercício', 20, '4 quadrados de 6 cm: madeira, metal, tecido e pedra. Depois uma colher de metal de verdade.'], ['Fechamento', 5, 'Marque com um X onde a textura mais aparece em cada quadrado.']],
  s10: ['Hachura rápida', '2 texturas', 'Um reflexo de metal'],
  ok: ['Metal com contraste forte', 'Tecido com sombras suaves', 'Detalhes concentrados na transição luz-sombra'],
  erro: 'Encher toda a área de textura igual: fica "papel de parede". Varie e deixe respiro.' },

{ id: 'p11', tr: 'papel', niv: 'Intermediário', t: 'Figura humana: proporção', r: 'Medindo o corpo em "cabeças": adulto, anime, criança e chibi.',
  ideia: [
    'A unidade de medida do corpo é a <b>cabeça</b>. Um adulto realista tem cerca de <b>7,5 a 8 cabeças</b> de altura. Heróis de quadrinho, 8 a 9. Personagens de anime adultos ficam entre 7 e 8; adolescentes, 6 a 7; crianças, 4 a 5; <b>chibi</b>, 2 a 3.',
    'Marcos que quase não mudam: o <b>quadril</b> fica no meio do corpo, o cotovelo na cintura, a ponta dos dedos no meio da coxa e o ombro tem cerca de 2 cabeças de largura no homem (um pouco menos na mulher).',
    'Comece pelo <b>boneco de palito</b> com bolinhas nas juntas: ele resolve a pose. Depois "veste" com cilindros e caixas (manequim).'],
  fig: 'boneco', tool: 'proporcao',
  s30: [['Aquecimento', 5, 'Bonecos de palito em poses diferentes, 30 s cada.'], ['Exercício', 20, 'Use a ferramenta: desenhe a mesma figura em 8, 6 e 3 cabeças, marcando as linhas de cada cabeça antes.'], ['Fechamento', 5, 'Vista um dos bonecos com cilindros (manequim).']],
  s10: ['5 bonecos de palito', 'Uma figura de 8 cabeças com as marcações', 'Uma chibi'],
  ok: ['Marquei as cabeças antes de desenhar', 'Quadril no meio da altura', 'Cotovelo na altura da cintura'],
  erro: 'Braços curtos demais (é o erro mais comum de todos). A mão chega no meio da coxa.' },

{ id: 'p12', tr: 'papel', niv: 'Intermediário', t: 'Gesto e linha de ação', r: 'Poses vivas: desenhos rápidos de 30 s, 1 min e 2 min.',
  ideia: [
    'A <b>linha de ação</b> é uma curva única que atravessa o corpo e mostra a energia da pose (em "C" ou em "S"). Se ela é reta, o personagem parece duro como um robô.',
    '<b>Desenho de gesto</b> é rápido de propósito: 30 segundos não dão tempo de detalhe, então você aprende a pegar o movimento. Use fotos de pose (sites de referência de pose) ou pessoas na rua.',
    'Exagere! Na dúvida, entorte mais a coluna, abra mais as pernas. O exagero lê melhor no papel.'],
  fig: 'boneco',
  s30: [['Aquecimento', 5, 'Linhas de ação: 20 curvas em C e S.'], ['Exercício', 20, '10 gestos de 30 s + 5 de 1 min + 2 de 2 min, olhando referências de pose.'], ['Fechamento', 5, 'Escolha o melhor gesto e transforme em manequim.']],
  s10: ['Linhas de ação', '10 gestos de 30 s', 'Um de 2 min'],
  ok: ['Comecei cada pose pela linha de ação', 'Não parei para detalhar', 'Exagerei a curva'],
  erro: 'Desenhar o contorno do corpo (a "silhueta") em vez do movimento por dentro.' },

{ id: 'p13', tr: 'papel', niv: 'Avançado', t: 'Anatomia simplificada, mãos e pés', r: 'Tronco em caixas, membros em cilindros, mãos em blocos.',
  ideia: [
    'O tronco são duas massas: a <b>caixa torácica</b> (um ovo) e a <b>pelve</b> (uma caixa ou "cueca"), ligadas pela coluna, que dobra e torce.',
    'Braços e pernas são cilindros que <b>afinam</b> perto das juntas (pulso, tornozelo). Os músculos aparecem como curvas: mais cheias de um lado, mais retas do outro, alternando.',
    '<b>Mãos</b>: palma = quadrado com o canto do polegar, dedos = 3 blocos cada, o dedo médio é o maior. <b>Pés</b>: uma cunha (calcanhar alto, dedos baixos).'],
  fig: 'mao',
  s30: [['Aquecimento', 5, 'Cilindros e caixas soltos.'], ['Exercício', 20, '10 mãos da sua própria mão esquerda (em blocos primeiro) em poses diferentes. 4 pés em cunha.'], ['Fechamento', 5, 'Um tronco torcido: caixa torácica virada para um lado, pelve para o outro.']],
  s10: ['Blocos soltos', '4 mãos em blocos', '2 pés em cunha'],
  ok: ['Mão em blocos antes do contorno', 'Dedo médio maior', 'Membros afinando nas juntas'],
  erro: 'Dedos como salsichas iguais. Eles têm 3 partes, tamanhos diferentes e dobram em arco.' },

{ id: 'p14', tr: 'papel', niv: 'Intermediário', t: 'O rosto realista', r: 'Olhos no meio da cabeça: as proporções que todo rosto respeita.',
  ideia: [
    'O erro número 1 é pôr os olhos alto demais. Os olhos ficam na <b>metade da altura da cabeça</b> (do topo do crânio ao queixo). A testa é grande!',
    'Entre os olhos cabe <b>mais um olho</b>. A base do nariz fica na metade entre os olhos e o queixo; a boca, a 1/3 entre o nariz e o queixo. As orelhas vão da linha dos olhos até a base do nariz.',
    'Para o rosto virar, use a <b>cruz de construção</b>: a linha vertical do meio e a linha dos olhos curvam junto com a cabeça (como numa bola).'],
  fig: 'rosto',
  s30: [['Aquecimento', 5, '10 cabeças só com oval + cruz, viradas para lados diferentes.'], ['Exercício', 20, '3 rostos de frente seguindo as proporções; depois um de 3/4 usando a cruz curva.'], ['Fechamento', 5, 'Olhe no espelho e confira as proporções no seu rosto.']],
  s10: ['5 ovais com cruz', 'Um rosto de frente', 'Conferir no espelho'],
  ok: ['Olhos na metade da cabeça', 'Um olho de distância entre os olhos', 'Orelhas entre olhos e nariz'],
  erro: 'Olhos no alto e testa pequena: o rosto fica com cara de criança sem querer.' },

{ id: 'p15', tr: 'papel', niv: 'Intermediário', t: 'Expressões', r: 'Sobrancelhas, olhos e boca contam o que o personagem sente.',
  ideia: [
    'As <b>sobrancelhas</b> são as estrelas: para baixo no meio = raiva; para cima no meio = tristeza ou preocupação; bem altas = surpresa.',
    'A <b>boca</b> e os <b>olhos</b> completam: alegria fecha um pouco os olhos (bochecha sobe); surpresa abre tudo; tristeza puxa os cantos da boca para baixo.',
    'No anime as expressões são símbolos: gota de suor (sem graça), veia na testa (raiva), bochechas riscadas (vergonha). Use com moderação.'],
  fig: 'expressoes',
  s30: [['Aquecimento', 5, 'Círculos com a cruz.'], ['Exercício', 20, 'Uma folha com 12 cabeças simples e 12 emoções: alegria, raiva, tristeza, surpresa, medo, nojo, vergonha, tédio, desconfiança, cansaço, orgulho, gargalhada.'], ['Fechamento', 5, 'Faça caretas no espelho e corrija 2 delas.']],
  s10: ['Círculos', '6 emoções', 'Uma do espelho'],
  ok: ['As sobrancelhas mudam em cada emoção', 'Dá para saber a emoção sem legenda', 'Usei o espelho'],
  erro: 'Mudar só a boca. Cubra a boca com o dedo: a emoção ainda aparece?' },

{ id: 'p16', tr: 'papel', niv: 'Intermediário', t: 'Estilo anime: o rosto', r: 'Olhos maiores e mais baixos, nariz mínimo, queixo marcado.',
  ideia: [
    'O anime simplifica o rosto real: <b>olhos grandes</b> e um pouco abaixo da metade, <b>nariz</b> reduzido a um traço ou sombra, <b>boca</b> pequena e o <b>queixo</b> em ponta suave.',
    'Construção: um <b>círculo</b> (crânio) + o <b>queixo</b> desenhado embaixo como um "V" arredondado. A cruz continua valendo para virar o rosto.',
    'Quanto mais jovem o personagem, maiores e mais baixos os olhos e mais redondo o rosto. Teste na ferramenta de rosto. Aqui você aprende o <b>estilo</b>: crie sempre personagens seus.'],
  fig: 'rostoAnime', tool: 'rosto',
  s30: [['Aquecimento', 5, '10 círculos + queixo em ângulos diferentes.'], ['Exercício', 20, '4 rostos de frente variando idade (criança, jovem, adulto, mais velho) e 2 de 3/4. Use a ferramenta para comparar.'], ['Fechamento', 5, 'Escolha um e dê um nome: é seu primeiro personagem.']],
  s10: ['5 círculos + queixo', 'Um rosto de frente', 'Um de 3/4'],
  ok: ['Olhos grandes e um pouco abaixo da metade', 'Nariz mínimo', 'Queixo saindo do círculo'],
  erro: 'Olhos colados um no outro ou muito separados. Mantenha um olho de distância.' },

{ id: 'p17', tr: 'papel', niv: 'Intermediário', t: 'Estilo anime: olhos e cabelo', r: 'O olho expressivo e o cabelo em grandes massas.',
  ideia: [
    '<b>Olho anime</b>: a linha de cima é grossa e escura (cílios juntos numa linha só), a íris é alta e oval, a pupila escura, e os <b>brilhos</b> brancos mostram de onde vem a luz. A linha de baixo é curta e fina.',
    '<b>Cabelo</b>: o cabelo nasce num crânio maior que a cabeça (tem volume!). Pense em <b>massas grandes</b> primeiro e só depois divida em mechas. Mechas são curvas em "S" que afinam na ponta.',
    'A sombra do cabelo fica embaixo das mechas e na parte de trás. Deixe uma faixa de brilho em arco no alto da cabeça.'],
  fig: 'olho', fig2: 'cabelo',
  s30: [['Aquecimento', 5, 'Curvas em S que afinam na ponta.'], ['Exercício', 20, '6 pares de olhos em estilos diferentes (feliz, sério, sonolento, cansado...). 3 penteados no mesmo rosto: curto, longo, preso.'], ['Fechamento', 5, 'Sombra embaixo das mechas de um penteado.']],
  s10: ['Curvas em S', '2 pares de olhos', '1 penteado em massas'],
  ok: ['Brilhos do mesmo lado nos dois olhos', 'Cabelo com volume acima do crânio', 'Mechas afinando na ponta'],
  erro: 'Desenhar fio por fio. Cabelo é massa: poucas linhas certas valem mais que mil fios.' },

{ id: 'p18', tr: 'papel', niv: 'Avançado', t: 'Estilo anime: corpo e roupas', r: 'Proporções do estilo, dobras de tecido e como a roupa segue o corpo.',
  ideia: [
    'O corpo no anime segue a anatomia, só simplifica: pescoço fino, pernas um pouco mais longas, mãos e pés menores. Use o manequim por baixo sempre.',
    '<b>Dobras</b> nascem de <b>pontos de tensão</b>: ombro, cotovelo, cintura, joelho, onde o tecido é puxado ou dobrado. As dobras irradiam desses pontos.',
    'Tecido pendurado forma dobras em "cone" que descem; tecido comprimido (cotovelo dobrado) forma dobras em zigue-zague.'],
  fig: 'dobras',
  s30: [['Aquecimento', 5, 'Gestos de 30 s.'], ['Exercício', 20, 'Desenhe seu personagem da aula de rosto de corpo inteiro (7 cabeças), com uma roupa simples: camiseta, calça e tênis. Marque os pontos de tensão.'], ['Fechamento', 5, 'Uma manga dobrada observando a sua própria camisa.']],
  s10: ['3 gestos', 'Corpo inteiro em manequim', 'Roupa com 2 pontos de tensão'],
  ok: ['Manequim por baixo da roupa', 'Dobras saindo dos pontos de tensão', 'Roupa acompanha o volume do corpo'],
  erro: 'Roupa "colada" sem volume, ou dobras espalhadas ao acaso.' },

{ id: 'p19', tr: 'papel', niv: 'Intermediário', t: 'Cenários: paisagem', r: 'Primeiro plano, plano do meio e fundo: a profundidade da natureza.',
  ideia: [
    'Divida a paisagem em <b>3 planos</b>: o primeiro plano (perto, escuro, com detalhes), o plano do meio e o fundo (longe, claro, simples).',
    '<b>Perspectiva atmosférica</b>: o ar entre você e as montanhas apaga o contraste. Quanto mais longe, mais claro e menos detalhado.',
    'Árvores: comece pela massa da copa (uma nuvem de folhas) e o tronco; folhas só nas bordas da copa. Nuvens: formas grandes com a parte de baixo mais reta.'],
  fig: 'paisagem',
  s30: [['Aquecimento', 5, '10 árvores em massa (copa + tronco), 1 min cada.'], ['Exercício', 20, 'Uma paisagem 15 × 10 cm com montanhas ao fundo, árvores no meio e pedras/grama na frente. Valores: fundo claro, frente escura.'], ['Fechamento', 5, 'Vire o desenho de cabeça para baixo: os planos ainda se separam?']],
  s10: ['5 árvores em massa', 'Paisagem em 3 planos (miniatura)', 'Escureça a frente'],
  ok: ['Fundo mais claro que a frente', 'Detalhe só no primeiro plano', 'Três planos visíveis'],
  erro: 'Detalhar as montanhas do fundo tanto quanto a grama da frente: some a profundidade.' },

{ id: 'p20', tr: 'papel', niv: 'Avançado', t: 'Cenários: cidade e interiores', r: 'Ruas e quartos em perspectiva, do esboço à cena com personagem.',
  ideia: [
    'Cenário urbano é perspectiva aplicada: horizonte, 2 pontos, caixas grandes (prédios) e depois as subdivisões (janelas, portas, placas).',
    'Para pôr um <b>personagem</b> na cena: se o horizonte passa na altura dos olhos de alguém de pé, a cabeça de todas as pessoas de pé fica na linha do horizonte, perto ou longe.',
    'Interiores: um quarto é uma caixa vista por dentro. Móveis são caixas menores apoiadas no chão (que também vão para os pontos).'],
  fig: 'cubo2pf', tool: 'perspectiva',
  s30: [['Aquecimento', 5, 'Caixas de quina.'], ['Exercício', 20, 'Seu quarto em perspectiva de 1 ponto (parede do fundo de frente): cama, janela, armário. Depois uma esquina de rua com 2 pontos.'], ['Fechamento', 5, 'Coloque 3 pessoas de alturas iguais em distâncias diferentes, cabeças no horizonte.']],
  s10: ['Caixas', 'Um quarto em 1 ponto', 'Uma pessoa na cena'],
  ok: ['Móveis obedecendo aos pontos', 'Pessoas com a cabeça no horizonte', 'Do grande (paredes) para o pequeno (objetos)'],
  erro: 'Personagem flutuando porque os pés não estão na perspectiva do chão.' },

{ id: 'p21', tr: 'papel', niv: 'Avançado', t: 'Composição e thumbnails', r: 'Onde colocar as coisas no quadro para o olho passear.',
  ideia: [
    '<b>Regra dos terços</b>: divida o quadro em 3 × 3. Os cruzamentos são lugares fortes para o assunto principal; o horizonte numa das linhas, não no meio.',
    'Faça <b>thumbnails</b>: 6 a 10 miniaturas de 4 × 3 cm, só com manchas de valor, antes de qualquer desenho grande. É o jeito mais barato de errar.',
    'Guie o olho com <b>contraste</b> (o ponto mais claro ao lado do mais escuro atrai) e com linhas que apontam para o assunto (estrada, braço, olhar).'],
  fig: 'tercos',
  s30: [['Aquecimento', 5, 'Retângulos 4 × 3 com grade de terços.'], ['Exercício', 20, '8 thumbnails da mesma cena (um personagem num cenário): mude câmera, horizonte e posição. Escolha o melhor.'], ['Fechamento', 5, 'Desenhe o escolhido maior, só com valores.']],
  s10: ['4 retângulos', '4 thumbnails', 'Escolha um'],
  ok: ['Assunto fora do centro', 'Fiz várias opções antes de escolher', 'Maior contraste no ponto principal'],
  erro: 'Ir direto para o desenho grande e descobrir no fim que a composição não funciona.' },

{ id: 'p22', tr: 'papel', niv: 'Avançado', t: 'Cor no papel: lápis de cor', r: 'Teoria das cores e camadas leves (quando quiser investir uns lápis).',
  ideia: [
    'O <b>círculo cromático</b> mostra quais cores combinam: <b>complementares</b> (opostas: azul e laranja) dão contraste; <b>análogas</b> (vizinhas) dão harmonia; <b>tríade</b> dá variedade equilibrada. Teste na ferramenta.',
    'Lápis de cor se usa em <b>camadas leves</b>: a cor nasce da mistura de várias passadas. Sombra não é preto: é a cor mais escura e mais fria (ou a complementar por cima).',
    'Antes de colorir, decida a <b>paleta</b>: 3 a 5 cores. Menos cores, mais unidade.'],
  fig: 'valores', tool: 'cores',
  s30: [['Aquecimento', 5, 'Escala de valor com uma cor só.'], ['Exercício', 20, 'Escolha uma paleta na ferramenta (complementar). Pinte uma esfera e um objeto simples só com essas cores, em 3 camadas.'], ['Fechamento', 5, 'Compare com a mesma esfera em grafite: os valores batem?']],
  s10: ['Escala de uma cor', 'Paleta na ferramenta', 'Esfera colorida'],
  ok: ['Usei uma paleta escolhida antes', 'Sombra feita com cor (não preto)', 'Camadas leves'],
  erro: 'Apertar o lápis de cor logo na primeira camada: a cera fecha o papel e nada mais pega.' },

{ id: 'p23', tr: 'papel', niv: 'Avançado', t: 'Arte-final com caneta', r: 'Peso de linha, nanquim e o lápis por baixo.',
  ideia: [
    'Arte-final (lineart) é passar a limpo o esboço. Com uma caneta preta fina (0,3 a 0,8) você já começa.',
    '<b>Peso de linha</b>: linhas mais <b>grossas</b> embaixo das formas, no lado da sombra e no contorno externo; mais <b>finas</b> no lado da luz e nos detalhes internos. Isso sozinho já dá volume.',
    'Linhas que se cruzam ganham uma "gotinha" de tinta no encontro. Pontas de linhas (cabelo, dobras) <b>afinam</b>: comece pressionando e solte.'],
  fig: 'lineart',
  s30: [['Aquecimento', 5, 'Linhas de caneta que afinam na ponta.'], ['Exercício', 20, 'Passe a caneta num desenho antigo seu, aplicando peso de linha. Espere secar e apague o lápis.'], ['Fechamento', 5, 'Compare uma linha uniforme com a de peso variável.']],
  s10: ['Linhas afinando', 'Arte-final de um rosto', 'Apague o lápis'],
  ok: ['Linhas mais grossas no lado da sombra', 'Pontas afinando', 'Esperei a tinta secar antes de apagar'],
  erro: 'Passar a caneta devagar com medo: a linha treme. Linha fantasma vale aqui também.' },

{ id: 'p24', tr: 'papel', niv: 'Avançado', t: 'Projeto: ilustração completa', r: 'Seu personagem original num cenário, do thumbnail à arte-final.',
  ideia: [
    'Junte tudo: personagem seu + cenário + luz + composição. Divida em sessões de 30 min ao longo de uma semana.',
    'Ordem: <b>1)</b> thumbnails, <b>2)</b> esboço grande solto, <b>3)</b> construção (perspectiva, manequim), <b>4)</b> desenho limpo, <b>5)</b> valores/sombras, <b>6)</b> arte-final.',
    'Guarde a ilustração ao lado do seu primeiro desenho datado (aula 1). Essa comparação é o melhor motivador que existe.'],
  fig: 'tercos',
  s30: [['Sessão 1', 30, 'Thumbnails + escolha.'], ['Sessões 2 a 3', 30, 'Esboço e construção.'], ['Sessões 4 a 6', 30, 'Desenho limpo, valores e arte-final.']],
  s10: ['Planeje a sessão do dia', 'Avance uma etapa só', 'Foto do progresso'],
  ok: ['Personagem 100 % meu', 'Cenário em perspectiva', 'Valores com claro e escuro fortes', 'Comparei com o desenho da aula 1'],
  erro: 'Querer terminar num dia só. Ilustração boa é feita em etapas.' },

/* ===================== TRILHA 2 · DIGITAL ===================== */
{ id: 'd01', tr: 'digital', niv: 'Básico', t: 'Equipamento e programas', r: 'O que você precisa (e o que não precisa) para desenhar no digital.',
  ideia: [
    'Não comece comprando nada caro. Três caminhos: <b>1)</b> <b>celular ou tablet com caneta</b> (uma caneta capacitiva barata já serve para começar); <b>2)</b> <b>mesa digitalizadora sem tela</b> ligada ao computador, a opção de entrada mais barata e muito usada por profissionais; <b>3)</b> tablet com caneta ativa ou mesa com tela, quando você já souber que vai seguir.',
    'Programas gratuitos: <b>Krita</b> (computador, completo, feito para pintura), <b>ibis Paint X</b> e <b>MediBang</b> (celular/tablet, ótimos para anime e quadrinhos), <b>FlipaClip</b> (animação no celular). Pagos e muito usados: Clip Studio Paint e Procreate.',
    'O que vale do papel continua valendo: o digital é só uma ferramenta nova. Quem desenha bem no papel aprende o digital em semanas.'],
  fig: 'camadas',
  s30: [['Pesquisa', 10, 'Veja o que você já tem: celular, computador. Instale um programa gratuito.'], ['Exploração', 15, 'Teste os pincéis: lápis, caneta, pincel macio. Desenhe linhas e círculos.'], ['Anotação', 5, 'Anote o atalho de desfazer, zoom e girar a tela.']],
  s10: ['Instale um app gratuito', 'Teste 3 pincéis', 'Ache o desfazer'],
  ok: ['Tenho um app instalado', 'Sei desfazer, dar zoom e girar', 'Testei os pincéis básicos'],
  erro: 'Achar que o equipamento caro vai desenhar por você. Fundamentos primeiro.' },

{ id: 'd02', tr: 'digital', niv: 'Básico', t: 'Camadas', r: 'O superpoder do digital: rascunho, lineart, cor, sombra e luz separados.',
  ideia: [
    'Camadas são folhas transparentes empilhadas. A ordem padrão de baixo para cima: <b>rascunho</b> → <b>cor base</b> → <b>sombra</b> → <b>luz</b> → <b>lineart</b> (em cima de tudo) ou a lineart logo acima do rascunho.',
    '<b>Máscara de recorte</b> (clipping): a camada de cima só pinta onde a de baixo tem tinta. É assim que você sombreia sem sair da cor base.',
    'Abaixe a <b>opacidade</b> do rascunho e desenhe a lineart numa camada nova por cima: é o papel vegetal digital.'],
  fig: 'camadas',
  s30: [['Aquecimento', 5, 'Linhas e círculos digitais.'], ['Exercício', 20, 'Uma esfera com 4 camadas: rascunho, cor base, sombra (máscara de recorte) e brilho. Ligue e desligue cada uma.'], ['Fechamento', 5, 'Dê nome às camadas.']],
  s10: ['Linhas', 'Esfera em 3 camadas', 'Nomeie as camadas'],
  ok: ['Uso uma camada para cada etapa', 'Sei usar máscara de recorte', 'Rascunho com opacidade baixa'],
  erro: 'Pintar tudo numa camada só: aí qualquer correção estraga o resto.' },

{ id: 'd03', tr: 'digital', niv: 'Intermediário', t: 'Lineart digital', r: 'Estabilizador, linha com peso e o hábito de girar a tela.',
  ideia: [
    'Ative o <b>estabilizador</b> (suavização) do pincel: ele segura o tremido da mão. Valores médios bastam; muito alto deixa a linha atrasada.',
    'Use um pincel com <b>pressão</b> controlando a espessura: pressão leve = linha fina, forte = grossa. Sem caneta de pressão, use um pincel com afinamento nas pontas.',
    '<b>Gire a tela</b> para que a linha fique na direção mais confortável da sua mão, e aproxime o zoom só o necessário. Linha no zoom muito alto fica tremida.'],
  fig: 'lineart',
  s30: [['Aquecimento', 5, 'Linhas longas com e sem estabilizador.'], ['Exercício', 20, 'Faça a lineart de um esboço seu do papel (fotografado) com peso de linha.'], ['Fechamento', 5, 'Esconda o rascunho e veja a lineart sozinha.']],
  s10: ['Linhas com estabilizador', 'Lineart de um rosto', 'Esconda o rascunho'],
  ok: ['Estabilizador ligado', 'Peso de linha variando', 'Girei a tela em vez de torcer o braço'],
  erro: 'Refazer a mesma linha 20 vezes com o desfazer. Use a linha fantasma: ensaie e risque de uma vez.' },

{ id: 'd04', tr: 'digital', niv: 'Intermediário', t: 'Cor base e cel shading', r: 'A sombra de borda dura, típica do anime.',
  ideia: [
    '<b>Cel shading</b> é a sombra com bordas definidas, como nos desenhos animados: cor base chapada + uma camada de sombra (às vezes duas) + brilho.',
    'Passo a passo: <b>1)</b> cor base em cada parte (pele, cabelo, roupa) em camadas separadas; <b>2)</b> camada de sombra em <b>Multiplicar</b> com máscara de recorte, cor arroxeada clara; <b>3)</b> pinte a sombra com pincel duro seguindo a luz; <b>4)</b> brilho em camada <b>Tela</b> (screen) ou com branco.',
    'A forma da sombra conta a forma do objeto: na esfera é um crescente, no cabelo segue as mechas, no rosto fica embaixo da franja e do queixo.'],
  fig: 'cel',
  s30: [['Aquecimento', 5, 'Esferas com sombra de borda dura.'], ['Exercício', 20, 'Pinte o rosto do seu personagem em cel shading: cor base, uma sombra e um brilho.'], ['Fechamento', 5, 'Troque a cor da sombra (azulada, avermelhada) e compare.']],
  s10: ['2 esferas', 'Cor base do rosto', 'Uma sombra em multiplicar'],
  ok: ['Cores base chapadas e em camadas separadas', 'Sombra em multiplicar com recorte', 'Luz vindo de um lado só'],
  erro: 'Sombra cinza ou preta: deixa a pele suja. Use uma cor fria e levemente saturada.' },

{ id: 'd05', tr: 'digital', niv: 'Avançado', t: 'Pintura suave e iluminação', r: 'Pincel macio, modos de camada e luz colorida.',
  ideia: [
    'Pintura suave usa pincel com borda macia para transições (bochechas, céu) e pincel duro para bordas que precisam de definição. Misture os dois.',
    '<b>Modos de camada</b>: <b>Multiplicar</b> escurece (sombras), <b>Tela</b>/<b>Adicionar</b> clareia (luzes, brilhos, fogo), <b>Sobrepor</b> muda o clima da cor geral.',
    'A luz tem <b>cor</b>: sol de fim de tarde é laranja, então as sombras puxam para o azul/roxo. Isso dá clima na hora. Uma <b>luz de borda</b> (rim light) atrás do personagem separa ele do fundo.'],
  fig: 'esfera', tool: 'esfera',
  s30: [['Aquecimento', 5, 'Gradientes suaves com pincel macio.'], ['Exercício', 20, 'Pinte o mesmo personagem em 2 climas: meio-dia (luz branca) e pôr do sol (luz laranja, sombra roxa).'], ['Fechamento', 5, 'Adicione uma luz de borda em camada adicionar.']],
  s10: ['Gradientes', 'Um clima de luz', 'Luz de borda'],
  ok: ['Sombras com cor, não preto', 'Usei multiplicar e tela', 'Luz de borda separando do fundo'],
  erro: 'Abusar do pincel macio: tudo fica borrado. Bordas duras nos lugares certos dão acabamento.' },

{ id: 'd06', tr: 'digital', niv: 'Avançado', t: 'Cenários digitais', r: 'Réguas de perspectiva, céus e o fundo que conta a história.',
  ideia: [
    'Krita, Clip Studio e outros têm <b>réguas de perspectiva</b>: você define os pontos de fuga e o pincel trava nas direções certas.',
    'Pinte do <b>fundo para a frente</b>: céu, montanhas, prédios, primeiro plano. Fundo com menos contraste e mais azulado (perspectiva atmosférica).',
    'Use foto só como <b>referência</b> (olhando ao lado). Colar foto dos outros na sua arte (fotobash) exige foto sua ou de banco livre: respeite os direitos de quem fotografou.'],
  fig: 'paisagem', tool: 'perspectiva',
  s30: [['Aquecimento', 5, 'Céus: 3 céus em 2 min cada (dia, entardecer, noite).'], ['Exercício', 20, 'Um cenário de rua com régua de perspectiva, pintado em valores primeiro e depois com cor.'], ['Fechamento', 5, 'Ponha seu personagem pequeno na cena.']],
  s10: ['Um céu', 'Caixas na régua', 'Cor do fundo'],
  ok: ['Usei régua de perspectiva', 'Pintei do fundo para a frente', 'Fundo mais claro e azulado'],
  erro: 'Detalhar demais o fundo e competir com o personagem.' },

{ id: 'd07', tr: 'digital', niv: 'Avançado', t: 'Fluxo de ilustração digital', r: 'Do thumbnail ao arquivo final para postar.',
  ideia: [
    'O fluxo profissional: <b>thumbnail</b> → <b>esboço</b> → <b>lineart</b> → <b>cores base</b> → <b>sombras</b> → <b>luzes</b> → <b>ajustes finais</b> (curvas, níveis, saturação) → <b>exportar</b>.',
    'Trabalhe em resolução boa (por exemplo 3000 px no lado maior, 300 dpi se for imprimir) e exporte em PNG para postar. Guarde o arquivo com camadas.',
    'Vire a tela (espelhar horizontal) de vez em quando: os erros de proporção saltam aos olhos.'],
  fig: 'camadas',
  s30: [['Sessões 1 a 2', 30, 'Thumbnail, esboço e lineart.'], ['Sessões 3 a 4', 30, 'Cores, sombras e luz.'], ['Sessão 5', 30, 'Ajustes, espelhar, exportar.']],
  s10: ['Uma etapa do fluxo', 'Espelhe a tela', 'Salve com camadas'],
  ok: ['Segui o fluxo inteiro', 'Espelhei para achar erros', 'Exportei e guardei o arquivo com camadas'],
  erro: 'Esquecer de salvar com camadas e perder a chance de corrigir depois.' },

/* ===================== TRILHA 3 · ANIMAÇÃO ===================== */
{ id: 'a01', tr: 'anima', niv: 'Básico', t: 'Os 12 princípios da animação', r: 'As regras que fazem o desenho parecer vivo.',
  ideia: [
    'Os animadores clássicos resumiram o movimento em 12 princípios. Os mais importantes para começar: <b>comprimir e esticar</b> (squash &amp; stretch), <b>antecipação</b> (o movimento contrário antes do principal), <b>acelerar e desacelerar</b> (ease in/out) e <b>arcos</b> (quase tudo se move em curva).',
    'Os outros: encenação clara, ação direta × pose a pose, continuidade e sobreposição (cabelo e roupa param depois do corpo), ação secundária, timing, exagero, desenho sólido e apelo.',
    'Você não precisa decorar: vai sentir cada um nos exercícios desta trilha.'],
  fig: 'squash',
  s30: [['Observação', 10, 'Veja vídeos em câmera lenta de uma bola quicando e de alguém pulando. Note o achatamento e a preparação.'], ['Exercício', 15, 'Desenhe 6 quadros de uma bola: no ar (esticada), no chão (achatada), subindo (normal).'], ['Fechamento', 5, 'Desenhe um personagem simples agachando antes de pular (antecipação).']],
  s10: ['Bola esticada e achatada', 'Uma antecipação', 'Anote 3 princípios'],
  ok: ['Entendi comprimir e esticar', 'Sei o que é antecipação', 'Notei os arcos'],
  erro: 'Mudar o volume da bola ao achatar: ela fica mais larga quando achata (o volume se mantém).' },

{ id: 'a02', tr: 'anima', niv: 'Básico', t: 'Flipbook no caderno', r: 'Sua primeira animação de verdade, só com papel.',
  ideia: [
    'Um <b>flipbook</b> é uma pilha de desenhos que você folheia rápido. Use um bloquinho de post-it ou o canto das páginas de um caderno velho.',
    'Desenhe de trás para frente (a última página primeiro): assim você enxerga o desenho anterior através do papel, que funciona como <b>papel de cebola</b> (onion skin).',
    'Comece com algo simples: uma bola quicando em 12 a 20 páginas. Mude pouco de uma página para a outra. Na ferramenta abaixo dá para testar no celular com o dedo.'],
  fig: 'bola', tool: 'flipbook',
  s30: [['Preparação', 5, 'Separe 20 folhas pequenas ou o canto de um caderno.'], ['Exercício', 20, 'Bola quicando: uma descida, um quique e uma subida. Use o papel transparente para ver a anterior.'], ['Fechamento', 5, 'Folheie, filme no celular em câmera lenta e veja os pulos.']],
  s10: ['8 folhas', 'Uma bola caindo', 'Folheie'],
  ok: ['Fiz pelo menos 12 quadros', 'Usei a página anterior como guia', 'Filmei o resultado'],
  erro: 'Mudar demais entre os quadros: a bola "teleporta". Passos pequenos.' },

{ id: 'a03', tr: 'anima', niv: 'Intermediário', t: 'Timing e espaçamento', r: 'Quantos quadros e onde: a diferença entre pesado e leve, lento e rápido.',
  ideia: [
    '<b>Timing</b> = quantos quadros dura a ação (mais quadros = mais lento). <b>Espaçamento</b> = a distância entre um desenho e o próximo (perto = devagar, longe = rápido).',
    'A bola caindo <b>acelera</b>: desenhos juntinhos no alto e cada vez mais afastados perto do chão. Subindo, o contrário: desacelera e para no topo.',
    'Os desenhos principais são as <b>poses-chave</b> (keys); os do meio são os <b>intervalos</b> (inbetweens). Animadores planejam as chaves primeiro.'],
  fig: 'bola', tool: 'flipbook',
  s30: [['Aquecimento', 5, 'Desenhe uma "régua de espaçamento" com 9 marcas ficando mais afastadas.'], ['Exercício', 20, 'Anime 2 bolas na ferramenta: uma de pingue-pongue (leve, quica muito) e uma de boliche (pesada, quica pouco).'], ['Fechamento', 5, 'Compare as velocidades: 8 e 12 quadros por segundo.']],
  s10: ['Régua de espaçamento', 'Uma bola pesada', 'Teste os quadros por segundo'],
  ok: ['Bola acelera ao cair', 'Bola pesada quica menos', 'Planejei as poses-chave'],
  erro: 'Espaçamento igual entre todos os quadros: o movimento fica robótico.' },

{ id: 'a04', tr: 'anima', niv: 'Avançado', t: 'Ciclo de caminhada', r: 'As 4 poses que fazem qualquer personagem andar.',
  ideia: [
    'Um passo tem 4 poses-chave: <b>contato</b> (pernas abertas, calcanhar toca o chão), <b>recuo</b> (o corpo desce, a perna da frente recebe o peso), <b>passagem</b> (uma perna passa pela outra) e <b>elevação</b> (o corpo sobe, empurrando).',
    'Os <b>braços</b> vão ao contrário das pernas: perna direita na frente, braço esquerdo na frente. A cabeça sobe e desce numa onda suave.',
    'Repita o passo espelhado e você tem um ciclo que gira para sempre. Mudar a altura e o ritmo muda a personalidade: andar feliz, cansado, apressado.'],
  fig: 'caminhada', tool: 'flipbook',
  s30: [['Aquecimento', 5, 'Bonecos de palito nas 4 poses.'], ['Exercício', 20, 'Anime um boneco de palito andando: 4 poses de um passo + 4 do outro passo, em 8 quadros.'], ['Fechamento', 5, 'Mude para um andar triste (cabeça baixa, passos curtos).']],
  s10: ['4 poses', 'Um passo animado', 'Mude a personalidade'],
  ok: ['As 4 poses estão claras', 'Braços opostos às pernas', 'Cabeça sobe e desce'],
  erro: 'Esquecer o sobe e desce do corpo: o personagem parece deslizar.' },

{ id: 'a05', tr: 'anima', niv: 'Avançado', t: 'Animação digital', r: 'Papel de cebola, quadros por segundo e exportar o vídeo.',
  ideia: [
    'Apps como <b>FlipaClip</b> (celular, gratuito) e <b>Krita</b> (computador) têm linha do tempo, <b>papel de cebola</b> (mostra o quadro anterior e o próximo em transparência) e exportação em vídeo ou GIF.',
    'Desenho animado clássico usa 24 quadros por segundo, mas desenhando "em dois" (cada desenho dura 2 quadros = 12 desenhos por segundo). Para começar, 8 a 12 desenhos por segundo já ficam ótimos.',
    'Fluxo: poses-chave → intervalos → limpeza da linha → cor (se quiser) → som.'],
  fig: 'caminhada', tool: 'flipbook',
  s30: [['Aquecimento', 5, 'Teste o papel de cebola na ferramenta.'], ['Exercício', 20, 'Uma ação simples: personagem acena (5 a 8 desenhos).'], ['Fechamento', 5, 'Exporte e assista em repetição.']],
  s10: ['Papel de cebola', '4 desenhos de um aceno', 'Assistir em repetição'],
  ok: ['Usei o papel de cebola', 'Escolhi a velocidade em desenhos por segundo', 'Exportei um vídeo ou GIF'],
  erro: 'Começar com uma cena gigante. Animação boa é curta: 2 a 5 segundos.' },

{ id: 'a06', tr: 'anima', niv: 'Avançado', t: 'Projeto: curta de 5 segundos', r: 'Uma ideia, um personagem, uma ação com começo, meio e fim.',
  ideia: [
    'Escolha uma ação com <b>antecipação, ação e reação</b>: o personagem se agacha, pula e cai sentado; ou abre uma caixa e se assusta.',
    'Planeje com um <b>storyboard</b> de 3 a 5 quadros, depois um <b>animatic</b> (as poses-chave com o tempo certo). Só então anime os intervalos.',
    'Cinco segundos a 12 desenhos por segundo são 60 desenhos: em sessões de 30 min, é um projeto de 2 a 3 semanas.'],
  fig: 'squash', tool: 'flipbook',
  s30: [['Sessão 1', 30, 'Ideia e storyboard.'], ['Sessões 2 a 4', 30, 'Poses-chave e animatic.'], ['Sessões 5 em diante', 30, 'Intervalos, limpeza e exportar.']],
  s10: ['Planeje o dia', 'Avance 5 desenhos', 'Assista o trecho'],
  ok: ['Tem antecipação, ação e reação', 'Fiz storyboard antes', 'Terminei e exportei'],
  erro: 'Animar os intervalos antes de aprovar as poses-chave.' },

/* ===================== TRILHA 4 · ARTISTA ===================== */
{ id: 'r01', tr: 'artista', niv: 'Intermediário', t: 'Design de personagem', r: 'Silhueta, formas, cores e a folha de modelo.',
  ideia: [
    'Um bom personagem é reconhecível pela <b>silhueta</b> (só a sombra preta). Pinte seu personagem de preto: dá para saber quem é?',
    '<b>Formas contam personalidade</b>: círculos = amigável, fofo; quadrados = forte, estável; triângulos = ágil, perigoso. Misture com intenção.',
    'Monte a <b>folha de modelo</b>: o personagem de frente, de lado e de costas (turnaround), 3 expressões e a paleta de cores. Isso mantém o desenho igual toda vez.'],
  fig: 'silhueta',
  s30: [['Aquecimento', 5, '12 silhuetas pretas pequenas, sem detalhes.'], ['Exercício', 20, 'Escolha 2 silhuetas e transforme em personagens. Defina forma dominante, 3 cores e um traço marcante (acessório, cabelo).'], ['Fechamento', 5, 'Escreva 3 frases sobre quem ele é.']],
  s10: ['6 silhuetas', 'Um personagem a partir de uma', '3 frases sobre ele'],
  ok: ['Silhueta reconhecível', 'Forma dominante escolhida', 'Folha de modelo com frente e lado'],
  erro: 'Detalhe demais e silhueta fraca. Personagens icônicos são simples.' },

{ id: 'r02', tr: 'artista', niv: 'Intermediário', t: 'Mangá e quadrinhos', r: 'Quadros, ordem de leitura, balões e ritmo da página.',
  ideia: [
    'Quadrinhos ocidentais são lidos da <b>esquerda para a direita</b>; o <b>mangá</b> japonês, da <b>direita para a esquerda</b>. Escolha um e mantenha a página inteira nele.',
    'Tamanho do quadro = tempo e importância: quadro grande para o momento forte, quadros pequenos para ação rápida. Varie os <b>planos</b>: geral (onde estamos), médio (o que fazem), close (o que sentem).',
    'Balões seguem a ordem de leitura e não devem cobrir rostos. Escreva o texto antes de desenhar e reserve espaço para ele.'],
  fig: 'manga',
  s30: [['Aquecimento', 5, 'Rostos em 3 planos (geral, médio, close).'], ['Exercício', 20, 'Uma página de 4 a 6 quadros com seu personagem: uma piada curta ou uma surpresa. Thumbnails primeiro.'], ['Fechamento', 5, 'Peça para alguém ler sem explicar: entendeu a ordem?']],
  s10: ['3 planos', 'Thumbnail de 1 página', 'Balões no lugar'],
  ok: ['Ordem de leitura clara', 'Variei os planos', 'Balões sem cobrir rostos'],
  erro: 'Todos os quadros iguais, todos em plano médio: a página fica monótona.' },

{ id: 'r03', tr: 'artista', niv: 'Avançado', t: 'Construindo seu estilo', r: 'Estilo não se escolhe: nasce de muitas influências e muita prática.',
  ideia: [
    'Estilo é a soma das suas escolhas: como você simplifica olhos, cabelo, mãos; que formas e cores prefere. Ele aparece sozinho com o volume de desenhos.',
    'Estude vários artistas (no mínimo 3 diferentes): copie <b>para estudar</b>, no caderno, e anote o que você gostou em cada um (o olho de um, a cor de outro). Essas cópias são estudo: não poste como se fossem suas, nem desenhe personagens dos outros para vender.',
    'Depois desenhe <b>seus</b> personagens misturando o que aprendeu. Repetindo isso por meses, nasce um jeito que é só seu.'],
  fig: 'rostoAnime', tool: 'rosto',
  s30: [['Pesquisa', 10, 'Escolha 3 artistas que você admira e anote 2 coisas de cada.'], ['Estudo', 15, 'Desenhe o mesmo rosto do seu personagem 3 vezes, cada vez aplicando a solução de um artista.'], ['Fechamento', 5, 'Faça a 4ª versão misturando as 3.']],
  s10: ['Escolha um artista', 'Estude 1 elemento', 'Aplique no seu personagem'],
  ok: ['Estudei pelo menos 3 influências', 'Anotei o que peguei de cada', 'Apliquei no MEU personagem'],
  erro: 'Copiar um só artista: aí você vira cópia dele, não você.' },

{ id: 'r04', tr: 'artista', niv: 'Avançado', t: 'Portfólio e redes', r: 'O que mostrar, como organizar e como crescer com constância.',
  ideia: [
    'Portfólio é <b>curadoria</b>: 10 a 15 trabalhos <b>bons</b> valem mais que 50 medianos. Mostre o que você quer ser chamado para fazer (personagens, cenários, mangá).',
    'Nas redes, <b>constância</b> ganha de perfeição: postar 1 a 2 vezes por semana, mostrar processo (esboço → final, timelapse) e desafios.',
    'Guarde seu "antes e depois": o progresso inspira quem está começando e prova a sua evolução.'],
  fig: 'tercos',
  s30: [['Seleção', 15, 'Separe seus 10 melhores desenhos até hoje.'], ['Organização', 10, 'Agrupe por tema e fotografe/escaneie com boa luz.'], ['Plano', 5, 'Defina um dia fixo da semana para postar.']],
  s10: ['Escolha 3 melhores', 'Fotografe com boa luz', 'Defina o dia de postar'],
  ok: ['Selecionei só os melhores', 'Fotos com boa luz, sem sombra', 'Tenho um dia fixo para postar'],
  erro: 'Esperar estar "bom o suficiente" para começar a mostrar. Comece e melhore em público.' },

{ id: 'r05', tr: 'artista', niv: 'Básico', t: 'A rotina de 30 minutos', r: 'Como encaixar o desenho numa semana cheia e não parar.',
  ideia: [
    'A melhor rotina é a que você <b>cumpre</b>. 30 minutos todo dia valem mais que 4 horas no sábado. Nos dias corridos, faça a versão de <b>10 minutos</b> de cada aula: o que importa é não quebrar a corrente.',
    'Estrutura de cada sessão: <b>5 min de aquecimento</b> (linhas, elipses, formas), <b>20 min de exercício</b> da aula, <b>5 min de fechamento</b> (revisar, datar, foto).',
    'Leve um <b>caderninho</b> (sketchbook) na mochila: fila, ônibus e intervalo viram desenhos de observação. Marque os dias desenhados no diário da página inicial.'],
  fig: 'linhas', tool: 'timer',
  s30: [['Planeje', 10, 'Escolha o horário fixo do dia (ex.: depois do almoço ou antes de dormir).'], ['Comece', 15, 'Faça a primeira sessão da trilha Papel com o cronômetro.'], ['Registre', 5, 'Marque o dia no diário.']],
  s10: ['Escolha o horário', 'Sessão relâmpago', 'Marque no diário'],
  ok: ['Tenho um horário fixo', 'Sei a versão de 10 min para dias corridos', 'Marquei o dia no diário'],
  erro: 'Ficar uma semana sem desenhar porque não tinha 1 hora livre. 10 minutos contam.' }
],
quiz: [
  ['Para fazer uma linha longa e reta, o movimento deve sair principalmente:', ['Do pulso', 'Dos dedos', 'Do ombro e do cotovelo', 'Tanto faz'], 2, 'O pulso faz arcos curtos. Ombro e cotovelo dão linhas longas e firmes.'],
  ['A "linha fantasma" é:', ['Uma linha apagada', 'Ensaiar o movimento no ar e depois riscar de uma vez', 'Linha feita com régua', 'A linha do horizonte'], 1, 'Marque os pontos, ensaie no ar e risque rápido: a linha sai mais reta.'],
  ['A linha do horizonte representa:', ['O chão', 'A altura dos olhos de quem observa', 'O fim do papel', 'O topo das montanhas'], 1, 'O horizonte é sempre na altura dos seus olhos.'],
  ['Na perspectiva de 2 pontos, as linhas verticais:', ['Vão para um terceiro ponto', 'Continuam verticais', 'Ficam inclinadas para a esquerda', 'Somem'], 1, 'Só na de 3 pontos as verticais também fogem.'],
  ['Dentro da sombra própria de uma esfera aparece a luz refletida. Ela é:', ['Mais clara que a parte iluminada', 'Um pouco mais clara que a sombra, mas mais escura que a luz', 'Preta', 'Branca'], 1, 'É sutil: luz que volta do chão. Se ficar forte demais, a esfera parece de vidro.'],
  ['Num rosto realista, os olhos ficam:', ['No terço de cima', 'Na metade da altura da cabeça', 'Logo abaixo do cabelo', 'Perto do nariz'], 1, 'A testa é grande. Olhos na metade é a correção mais comum.'],
  ['Um adulto realista mede cerca de:', ['4 cabeças', '5,5 cabeças', '7,5 a 8 cabeças', '12 cabeças'], 2, 'Anime adolescente fica em 6 a 7; chibi, 2 a 3.'],
  ['A ponta dos dedos, com o braço relaxado, chega:', ['Na cintura', 'No meio da coxa', 'No joelho', 'No quadril'], 1, 'Braço curto demais é o erro mais comum.'],
  ['Sobrancelhas descendo para o meio indicam:', ['Tristeza', 'Raiva', 'Surpresa', 'Sono'], 1, 'Subindo no meio = tristeza/preocupação; bem altas = surpresa.'],
  ['Na perspectiva atmosférica, o que está longe fica:', ['Mais escuro e detalhado', 'Mais claro e com menos contraste', 'Igual ao primeiro plano', 'Vermelho'], 1, 'O ar entre você e o fundo apaga o contraste.'],
  ['Azul e laranja são cores:', ['Análogas', 'Complementares', 'Monocromáticas', 'Neutras'], 1, 'Opostas no círculo cromático: contraste máximo.'],
  ['No peso de linha, a linha mais grossa vai:', ['No lado da luz', 'No lado da sombra e embaixo das formas', 'Só nos olhos', 'Em todo lugar igual'], 1, 'Grossa na sombra, fina na luz: volume só com a linha.'],
  ['No digital, a camada de sombra do cel shading costuma ficar em modo:', ['Tela (screen)', 'Multiplicar', 'Normal com preto', 'Adicionar'], 1, 'Multiplicar escurece mantendo a cor de baixo. Tela/adicionar é para luz.'],
  ['Na animação, desenhos mais afastados entre si significam:', ['Movimento mais lento', 'Movimento mais rápido', 'Pausa', 'Nada muda'], 1, 'Espaçamento longe = rápido; perto = devagar.'],
  ['A antecipação é:', ['O último quadro', 'Um movimento contrário antes da ação principal', 'O som da animação', 'O cenário'], 1, 'Agachar antes de pular, puxar o braço antes de jogar.'],
  ['No ciclo de caminhada, os braços:', ['Vão junto com a perna do mesmo lado', 'Vão ao contrário das pernas', 'Ficam parados', 'Sobem e descem juntos'], 1, 'Perna direita na frente, braço esquerdo na frente.'],
  ['O mangá japonês é lido:', ['Da esquerda para a direita', 'Da direita para a esquerda', 'De baixo para cima', 'Em qualquer ordem'], 1, 'Por isso a ordem dos quadros e balões começa à direita.'],
  ['Para criar o seu estilo:', ['Copiar um único artista para sempre', 'Estudar várias influências e aplicar nos seus próprios personagens', 'Nunca olhar arte dos outros', 'Usar só o digital'], 1, 'Copiar para estudar, criar com o que aprendeu.']
]
};
