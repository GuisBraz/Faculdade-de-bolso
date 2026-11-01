/*
  FACULDADE DE BOLSO · curso de inglês do zero ao B1
  ------------------------------------------------------------
  Fonte única: a Oficina de Inglês lê daqui e as cartas de revisão
  (dados/cartas.js) são geradas a partir do vocabulário.
  ex.t: mc (escolha) · fill (complete; a = respostas aceitas) ·
        order (monte a frase) · listen (ouça e escreva)
*/
window.FDB_INGLES = {
niveis: [
  { id: "A1", nome: "A1 · Iniciante", desc: "Se apresentar, falar da rotina, da família e do trabalho com frases simples.", horas: "≈ 90–100 h" },
  { id: "A2", nome: "A2 · Básico", desc: "Contar o que aconteceu, fazer planos, comparar, pedir e dar informações no dia a dia.", horas: "≈ 180–200 h no total" },
  { id: "B1", nome: "B1 · Intermediário", desc: "Conversar sobre experiências, regras, hipóteses e processos; ler e escrever e-mails e textos simples de trabalho.", horas: "≈ 350–400 h no total" }
],
unidades: [
/* ======================= A1 ======================= */
{ id: "u01", nivel: "A1", titulo: "Hello!", meta: "Cumprimentar, se apresentar e soletrar o nome",
  gram: [
    { t: "Cumprimentos", h: "<p><i>Hi</i> e <i>Hello</i> servem para qualquer hora. Mais formal: <i>Good morning</i> (até meio-dia), <i>Good afternoon</i> (tarde), <i>Good evening</i> (noite, ao chegar). <i>Good night</i> é só para se despedir ou ir dormir.</p><p>Para se apresentar: <i>My name is Gui.</i> ou <i>I'm Gui.</i> Resposta clássica: <i>Nice to meet you.</i> → <i>Nice to meet you too.</i></p>" },
    { t: "Perguntas básicas", h: "<p><i>What's your name?</i> (Qual é o seu nome?) · <i>How are you?</i> (Como vai?) → <i>I'm fine, thanks. And you?</i> · <i>Where are you from?</i> → <i>I'm from Brazil.</i></p>" },
    { t: "Soletrar (spelling)", h: "<p>As letras com som mais diferente do português: <b>A</b> (êi), <b>E</b> (í), <b>I</b> (ái), <b>G</b> (djí), <b>J</b> (djêi), <b>H</b> (êitch), <b>R</b> (ár), <b>W</b> (dâbol-iú), <b>Y</b> (uái). Pergunta: <i>How do you spell it?</i></p>" }
  ],
  vocab: [["hello","olá"],["hi","oi"],["good morning","bom dia"],["good afternoon","boa tarde"],["good evening","boa noite (ao chegar)"],["goodbye","tchau, adeus"],["see you later","até mais"],["thank you / thanks","obrigado"],["please","por favor"],["sorry","desculpa"],["excuse me","com licença"],["nice to meet you","prazer em conhecer"],["name","nome"],["friend","amigo"]],
  frases: [["My name is Gui. What's your name?","Meu nome é Gui. Qual é o seu nome?"],["Nice to meet you.","Prazer em te conhecer."],["How are you? — I'm fine, thanks.","Como vai? — Estou bem, obrigado."],["I'm from Brazil.","Eu sou do Brasil."],["How do you spell your name?","Como se soletra o seu nome?"],["See you tomorrow!","Até amanhã!"]],
  ex: [
    { t: "mc", q: "Você chega no trabalho às 7h30. O que diz?", o: ["Good night","Good morning","Good evening"], a: 1, why: "Good morning vale até o meio-dia. Good night é só para despedida." },
    { t: "mc", q: "Alguém diz: \"Nice to meet you.\" A melhor resposta é…", o: ["Nice to meet you too.","I'm fine.","Goodbye."], a: 0 },
    { t: "fill", q: "My ___ is Guilherme.", a: ["name"], dica: "nome" },
    { t: "fill", q: "Where are you ___? — I'm from Brazil.", a: ["from"], dica: "de onde" },
    { t: "order", w: ["your","is","what","name"], a: "What is your name", tr: "Qual é o seu nome?" },
    { t: "listen", s: "Nice to meet you", tr: "Prazer em te conhecer" },
    { t: "listen", s: "How are you", tr: "Como vai você" }
  ] },
{ id: "u02", nivel: "A1", titulo: "To be: I am, you are", meta: "Usar o verbo to be (ser/estar) para falar de você e dos outros",
  gram: [
    { t: "O verbo to be", h: "<p>Em inglês, <b>ser</b> e <b>estar</b> são o mesmo verbo: <i>to be</i>.</p><table><tr><th>Afirmativa</th><th>Contraída</th><th>Negativa</th></tr><tr><td>I am</td><td>I'm</td><td>I'm not</td></tr><tr><td>You are</td><td>You're</td><td>You aren't</td></tr><tr><td>He / She / It is</td><td>He's / She's / It's</td><td>He isn't</td></tr><tr><td>We / They are</td><td>We're / They're</td><td>We aren't</td></tr></table><p><i>It</i> é para coisas e animais: <i>It's a lathe</i> (é um torno).</p>" },
    { t: "Perguntas: inverta", h: "<p>Para perguntar, o verbo vem antes da pessoa: <i>You are a student.</i> → <i>Are you a student?</i> Resposta curta: <i>Yes, I am. / No, I'm not.</i></p>" },
    { t: "Profissões levam a/an", h: "<p><i>I'm <b>a</b> technician. She's <b>an</b> engineer.</i> Use <b>an</b> antes de som de vogal (an engineer, an operator) e <b>a</b> antes de consoante (a welder, a student).</p>" }
  ],
  vocab: [["student","estudante"],["engineer","engenheiro"],["technician","técnico"],["welder","soldador"],["operator","operador"],["boss / manager","chefe / gerente"],["coworker","colega de trabalho"],["Brazilian","brasileiro"],["happy","feliz"],["tired","cansado"],["busy","ocupado"],["ready","pronto"],["here","aqui"],["there","lá"]],
  frases: [["I'm a process technician.","Sou técnico de processos."],["She isn't tired. She's busy.","Ela não está cansada. Está ocupada."],["Are you a student? — Yes, I am.","Você é estudante? — Sim, sou."],["They're welders.","Eles são soldadores."],["It's a big machine.","É uma máquina grande."],["We aren't ready.","Não estamos prontos."]],
  ex: [
    { t: "fill", q: "I ___ a mechanical engineering student.", a: ["am","'m"] },
    { t: "fill", q: "She ___ an engineer.", a: ["is","'s"] },
    { t: "fill", q: "They ___ welders.", a: ["are","'re"] },
    { t: "mc", q: "Qual está certa?", o: ["He are tired.","He is tired.","He am tired."], a: 1 },
    { t: "mc", q: "\"Você está pronto?\"", o: ["You are ready?","Are you ready?","Is you ready?"], a: 1, why: "Na pergunta o verbo vem primeiro: Are you…?" },
    { t: "mc", q: "Complete: I'm ___ operator.", o: ["a","an"], a: 1, why: "operator começa com som de vogal → an." },
    { t: "order", w: ["isn't","he","busy"], a: "He isn't busy", tr: "Ele não está ocupado." },
    { t: "listen", s: "We are not ready", tr: "Não estamos prontos" }
  ] },
{ id: "u03", nivel: "A1", titulo: "Numbers, days and time", meta: "Números, dias da semana e horas",
  gram: [
    { t: "Números", h: "<p>1–12: one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve. 13–19 terminam em <b>-teen</b> (thirteen, fifteen). Dezenas terminam em <b>-ty</b> (twenty, thirty, forty, fifty). Cuidado: <i>thirteen</i> (13, acento no fim) × <i>thirty</i> (30, acento no começo).</p><p>Medidas: <i>2.5 mm</i> se lê <i>two point five millimeters</i> (inglês usa <b>ponto</b> no decimal).</p>" },
    { t: "Horas", h: "<p><i>What time is it?</i> → <i>It's seven thirty</i> (7:30) ou <i>It's half past seven</i>. 7:15 = <i>a quarter past seven</i>; 7:45 = <i>a quarter to eight</i>. Use <b>at</b> com horário: <i>at 7:30</i>.</p>" },
    { t: "Dias", h: "<p>Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday — sempre com letra maiúscula. Use <b>on</b> com dias: <i>on Monday</i>. Fim de semana: <i>on the weekend</i> (EUA).</p>" }
  ],
  vocab: [["Monday","segunda-feira"],["Tuesday","terça-feira"],["Wednesday","quarta-feira"],["Thursday","quinta-feira"],["Friday","sexta-feira"],["Saturday","sábado"],["Sunday","domingo"],["weekend","fim de semana"],["today","hoje"],["tomorrow","amanhã"],["hour","hora"],["minute","minuto"],["half","metade, meia"],["quarter","quarto (15 min)"]],
  frases: [["What time is it? — It's half past seven.","Que horas são? — Sete e meia."],["I start work at 7:30.","Começo a trabalhar às 7h30."],["My classes are from Monday to Friday.","Minhas aulas são de segunda a sexta."],["The plate is twelve millimeters thick.","A chapa tem doze milímetros de espessura."],["See you on Thursday.","Te vejo na quinta."],["It's a quarter to eight.","São quinze para as oito."]],
  ex: [
    { t: "mc", q: "\"Thirty\" é…", o: ["13","30","33"], a: 1 },
    { t: "mc", q: "7:45 em inglês:", o: ["a quarter past seven","a quarter to eight","seven and forty"], a: 1 },
    { t: "fill", q: "I have class ___ Monday.", a: ["on"], dica: "preposição com dia" },
    { t: "fill", q: "The meeting is ___ 10 o'clock.", a: ["at"], dica: "preposição com hora" },
    { t: "fill", q: "O dia depois de Tuesday: ___", a: ["wednesday"] },
    { t: "order", w: ["time","is","what","it"], a: "What time is it", tr: "Que horas são?" },
    { t: "listen", s: "It is half past seven", tr: "São sete e meia" },
    { t: "listen", s: "Fifteen", tr: "Quinze" }
  ] },
{ id: "u04", nivel: "A1", titulo: "My family", meta: "Família e possessivos: my, your, his, her e o 's",
  gram: [
    { t: "Possessivos", h: "<table><tr><th>Pessoa</th><th>Possessivo</th></tr><tr><td>I</td><td>my (meu)</td></tr><tr><td>you</td><td>your (seu)</td></tr><tr><td>he</td><td>his (dele)</td></tr><tr><td>she</td><td>her (dela)</td></tr><tr><td>it</td><td>its (dele/dela, coisa)</td></tr><tr><td>we</td><td>our (nosso)</td></tr><tr><td>they</td><td>their (deles)</td></tr></table><p>Não muda com o plural: <i>my brother, my brothers</i>.</p>" },
    { t: "O 's de posse", h: "<p>Em vez de \"o carro do João\", inglês diz <i>João's car</i>: o dono vem primeiro, com <b>'s</b>. <i>My father's name</i> = o nome do meu pai. Plural terminado em s só leva o apóstrofo: <i>my parents' house</i>.</p>" },
    { t: "Cuidado: his × her", h: "<p>O possessivo concorda com o <b>dono</b>, não com a coisa: <i>Maria and her brother</i>, <i>Pedro and his sister</i>.</p>" }
  ],
  vocab: [["mother / mom","mãe"],["father / dad","pai"],["parents","pais"],["brother","irmão"],["sister","irmã"],["son","filho"],["daughter","filha"],["wife","esposa"],["husband","marido"],["girlfriend / boyfriend","namorada / namorado"],["grandmother","avó"],["grandfather","avô"],["uncle / aunt","tio / tia"],["cousin","primo(a)"]],
  frases: [["This is my sister. Her name is Ana.","Esta é minha irmã. O nome dela é Ana."],["My father's car is blue.","O carro do meu pai é azul."],["Their house is near my house.","A casa deles fica perto da minha."],["Is he your brother?","Ele é seu irmão?"],["Our family is big.","Nossa família é grande."],["What's your mother's name?","Qual é o nome da sua mãe?"]],
  ex: [
    { t: "mc", q: "Pedro and ___ wife.", o: ["her","his","their"], a: 1, why: "O dono é Pedro (he) → his." },
    { t: "mc", q: "Ana and ___ husband.", o: ["his","her","its"], a: 1 },
    { t: "fill", q: "Eles e a casa deles: They and ___ house.", a: ["their"] },
    { t: "fill", q: "O carro do meu pai: my ___ car.", a: ["father's","fathers'","father’s"] },
    { t: "order", w: ["name","what's","sister's","your"], a: "What's your sister's name", tr: "Qual é o nome da sua irmã?" },
    { t: "listen", s: "This is my brother", tr: "Este é meu irmão" },
    { t: "listen", s: "Our parents are at home", tr: "Nossos pais estão em casa" }
  ] },
{ id: "u05", nivel: "A1", titulo: "Things around me", meta: "This/that, plural, a/an e cores",
  gram: [
    { t: "This, that, these, those", h: "<table><tr><th></th><th>perto</th><th>longe</th></tr><tr><td>singular</td><td>this (este)</td><td>that (aquele)</td></tr><tr><td>plural</td><td>these (estes)</td><td>those (aqueles)</td></tr></table><p><i>This tool is new. Those bolts are old.</i></p>" },
    { t: "Plural", h: "<p>Regra geral: + <b>s</b> (tool → tools). Termina em s, sh, ch, x: + <b>es</b> (box → boxes, wrench → wrenches). Consoante + y: <b>ies</b> (battery → batteries). Irregulares: man → men, woman → women, child → children, foot → feet, tooth → teeth.</p>" },
    { t: "Adjetivo vem antes", h: "<p>Ao contrário do português: <i>a <b>red</b> car</i> (um carro vermelho), <i>a <b>big</b> plate</i>. O adjetivo nunca vai para o plural: <i>red cars</i>, nunca \"reds cars\".</p>" }
  ],
  vocab: [["tool","ferramenta"],["table","mesa"],["chair","cadeira"],["computer","computador"],["phone","celular"],["key","chave (de porta)"],["box","caixa"],["red","vermelho"],["blue","azul"],["green","verde"],["yellow","amarelo"],["black / white","preto / branco"],["gray","cinza"],["new / old","novo / velho"]],
  frases: [["This is my new phone.","Este é meu celular novo."],["Those boxes are heavy.","Aquelas caixas são pesadas."],["These tools are in the red box.","Estas ferramentas estão na caixa vermelha."],["Is that your key?","Aquela é a sua chave?"],["I have two children.","Tenho dois filhos."],["It's a gray machine.","É uma máquina cinza."]],
  ex: [
    { t: "mc", q: "Estas ferramentas (perto, plural):", o: ["This tools","These tools","Those tool"], a: 1 },
    { t: "mc", q: "Um carro azul:", o: ["a car blue","a blue car","a blues car"], a: 1 },
    { t: "fill", q: "Plural de box: ___", a: ["boxes"] },
    { t: "fill", q: "Plural de man: ___", a: ["men"] },
    { t: "fill", q: "Plural de battery: ___", a: ["batteries"] },
    { t: "order", w: ["those","heavy","are","boxes"], a: "Those boxes are heavy", tr: "Aquelas caixas são pesadas." },
    { t: "listen", s: "This is a red box", tr: "Esta é uma caixa vermelha" }
  ] },
{ id: "u06", nivel: "A1", titulo: "My daily routine", meta: "Present simple e advérbios de frequência",
  gram: [
    { t: "Present simple", h: "<p>Para rotina e fatos: <i>I work at 7:30. I study at night.</i> Com <b>he/she/it</b> o verbo ganha <b>-s</b>: <i>She work<b>s</b>. He stud<b>ies</b>. It go<b>es</b>.</i></p><p>Regras do -s: geral + s (works); termina em o, s, sh, ch, x: + es (goes, watches); consoante + y: ies (studies). <i>have</i> vira <b>has</b>.</p>" },
    { t: "Frequência", h: "<p><b>always</b> (sempre) · <b>usually</b> (geralmente) · <b>often</b> (frequentemente) · <b>sometimes</b> (às vezes) · <b>never</b> (nunca). Ficam antes do verbo principal: <i>I <b>always</b> wake up at 6.</i>, mas depois do to be: <i>I'm <b>always</b> tired on Friday.</i></p>" }
  ],
  vocab: [["wake up","acordar"],["get up","levantar"],["have breakfast","tomar café da manhã"],["go to work","ir trabalhar"],["start","começar"],["finish","terminar"],["have lunch","almoçar"],["study","estudar"],["go home","ir para casa"],["go to bed","ir dormir"],["always","sempre"],["usually","geralmente"],["sometimes","às vezes"],["never","nunca"]],
  frases: [["I wake up at six and go to work at seven thirty.","Acordo às seis e vou trabalhar às sete e meia."],["I have lunch at twelve thirty.","Almoço ao meio-dia e meia."],["She studies English every day.","Ela estuda inglês todo dia."],["He never works on Sunday.","Ele nunca trabalha no domingo."],["I usually get home at eleven.","Geralmente chego em casa às onze."],["My class finishes at ten forty.","Minha aula termina às dez e quarenta."]],
  ex: [
    { t: "fill", q: "He ___ (work) in a factory.", a: ["works"] },
    { t: "fill", q: "She ___ (study) at night.", a: ["studies"] },
    { t: "fill", q: "My brother ___ (go) to school by bus.", a: ["goes"] },
    { t: "fill", q: "He ___ (have) two cars.", a: ["has"] },
    { t: "mc", q: "Posição certa:", o: ["I wake up always at 6.","I always wake up at 6.","Always I wake up at 6."], a: 1 },
    { t: "order", w: ["never","on","I","work","Sunday"], a: "I never work on Sunday", tr: "Nunca trabalho no domingo." },
    { t: "listen", s: "I usually go to bed at midnight", tr: "Geralmente vou dormir à meia-noite" }
  ] },
{ id: "u07", nivel: "A1", titulo: "Do you…? Does she…?", meta: "Perguntas e negativas no present simple",
  gram: [
    { t: "Do e does", h: "<p>No present simple, pergunta e negativa usam um auxiliar: <b>do</b> (I, you, we, they) e <b>does</b> (he, she, it). Com does, o verbo principal <b>perde o -s</b>.</p><table><tr><th>Pergunta</th><th>Negativa</th></tr><tr><td>Do you work on Saturday?</td><td>I don't work on Saturday.</td></tr><tr><td>Does she speak English?</td><td>She doesn't speak English.</td></tr></table><p>Errado: <i>She doesn't speaks</i>. Certo: <i>She doesn't speak</i>.</p>" },
    { t: "Palavras de pergunta", h: "<p>What (o quê) · Where (onde) · When (quando) · What time (que horas) · Who (quem) · Why (por quê) → <i>Because…</i> (porque) · How (como). Ordem: <b>palavra + do/does + pessoa + verbo</b>: <i>Where do you work?</i></p>" }
  ],
  vocab: [["what","o que"],["where","onde"],["when","quando"],["who","quem"],["why","por que"],["because","porque"],["how","como"],["speak","falar (idioma)"],["live","morar"],["like","gostar"],["want","querer"],["need","precisar"],["know","saber, conhecer"],["understand","entender"]],
  frases: [["Where do you work? — I work in Contagem.","Onde você trabalha? — Trabalho em Contagem."],["Does he speak English? — No, he doesn't.","Ele fala inglês? — Não."],["I don't understand. Can you repeat, please?","Não entendi. Pode repetir, por favor?"],["What do you do? — I'm a technician.","O que você faz (profissão)? — Sou técnico."],["Why do you study at night? Because I work during the day.","Por que você estuda à noite? Porque trabalho de dia."],["She doesn't like coffee.","Ela não gosta de café."]],
  ex: [
    { t: "mc", q: "___ she live in Betim?", o: ["Do","Does","Is"], a: 1 },
    { t: "mc", q: "Qual está certa?", o: ["He doesn't works.","He don't work.","He doesn't work."], a: 2 },
    { t: "fill", q: "I ___ understand. (negativa)", a: ["don't","do not"] },
    { t: "fill", q: "___ do you live? — In Contagem.", a: ["where"] },
    { t: "fill", q: "\"What do you do?\" pergunta sobre a sua ___ (em português).", a: ["profissão","profissao","trabalho"] },
    { t: "order", w: ["do","where","work","you"], a: "Where do you work", tr: "Onde você trabalha?" },
    { t: "listen", s: "I don't understand", tr: "Não entendi" },
    { t: "listen", s: "Can you repeat please", tr: "Pode repetir, por favor" }
  ] },
{ id: "u08", nivel: "A1", titulo: "Food, shopping and there is", meta: "There is/are, some/any, how much/how many",
  gram: [
    { t: "There is / there are", h: "<p>Para dizer que <b>existe</b> (o \"tem\" do português): <i>There is a problem.</i> (tem um problema) · <i>There are three machines.</i> Pergunta: <i>Is there…? Are there…?</i></p>" },
    { t: "Contável e incontável", h: "<p>Contáveis têm plural (an apple, two apples). Incontáveis não: water, rice, money, information, equipment. Quantidade: <b>How many</b> + contável (How many bolts?), <b>How much</b> + incontável e preço (How much water? How much is it?).</p><p><b>some</b> em afirmativas (There are some bolts), <b>any</b> em perguntas e negativas (Are there any bolts? There isn't any water).</p>" }
  ],
  vocab: [["water","água"],["coffee","café"],["rice and beans","arroz e feijão"],["bread","pão"],["meat","carne"],["chicken","frango"],["fruit","fruta"],["milk","leite"],["sugar","açúcar"],["money","dinheiro"],["price","preço"],["cheap","barato"],["expensive","caro"],["bill / check","conta (restaurante)"]],
  frases: [["There is a restaurant near the factory.","Tem um restaurante perto da fábrica."],["Are there any bolts in the box?","Tem algum parafuso na caixa?"],["How much is it? — It's ten dollars.","Quanto custa? — Dez dólares."],["How many people work here?","Quantas pessoas trabalham aqui?"],["I'd like a coffee, please.","Eu gostaria de um café, por favor."],["There isn't any sugar.","Não tem açúcar nenhum."]],
  ex: [
    { t: "mc", q: "There ___ two welders in the shop.", o: ["is","are"], a: 1 },
    { t: "mc", q: "How ___ money do you need?", o: ["many","much"], a: 1, why: "money é incontável." },
    { t: "mc", q: "How ___ plates are there?", o: ["many","much"], a: 0 },
    { t: "fill", q: "Are there ___ questions? (alguma)", a: ["any"] },
    { t: "fill", q: "Eu gostaria de um café: I'd ___ a coffee.", a: ["like"] },
    { t: "order", w: ["is","how","it","much"], a: "How much is it", tr: "Quanto custa?" },
    { t: "listen", s: "There is a problem with the machine", tr: "Tem um problema com a máquina" }
  ] },
/* ======================= A2 ======================= */
{ id: "u09", nivel: "A2", titulo: "Can and can't", meta: "Habilidades, permissão e pedidos educados",
  gram: [
    { t: "Can", h: "<p><b>can</b> = poder / saber fazer. Igual para todas as pessoas, sem -s, e o verbo vem sem <i>to</i>: <i>He can weld. I can't drive.</i> Pergunta: <i>Can you help me?</i></p><p>Pronúncia: na frase afirmativa <i>can</i> fica fraco (\"kân\"); <i>can't</i> é forte e longo.</p>" },
    { t: "Pedidos educados", h: "<p><i>Can you…?</i> (informal) · <i>Could you…?</i> (mais educado) · <i>Can I…?</i> (pedir permissão). Ex.: <i>Could you send me the drawing, please?</i></p>" }
  ],
  vocab: [["can","poder, saber"],["can't","não poder"],["could","poderia"],["help","ajudar"],["drive","dirigir"],["read","ler"],["write","escrever"],["draw","desenhar"],["swim","nadar"],["cook","cozinhar"],["borrow","pegar emprestado"],["lend","emprestar"],["open / close","abrir / fechar"],["turn on / turn off","ligar / desligar"]],
  frases: [["Can you help me, please?","Pode me ajudar, por favor?"],["I can read drawings in AutoCAD.","Sei ler desenhos no AutoCAD."],["He can't come today.","Ele não pode vir hoje."],["Could you send me the file?","Você poderia me mandar o arquivo?"],["Can I borrow your pen?","Posso pegar sua caneta emprestada?"],["Turn off the machine, please.","Desligue a máquina, por favor."]],
  ex: [
    { t: "mc", q: "Qual está certa?", o: ["She cans weld.","She can weld.","She can to weld."], a: 1 },
    { t: "mc", q: "O pedido mais educado:", o: ["Send me the file.","Could you send me the file, please?","You send file."], a: 1 },
    { t: "fill", q: "I ___ swim. (não sei)", a: ["can't","cannot","can not"] },
    { t: "fill", q: "___ I open the window? (posso)", a: ["can","could","may"] },
    { t: "order", w: ["you","me","can","help"], a: "Can you help me", tr: "Pode me ajudar?" },
    { t: "listen", s: "Could you send me the drawing", tr: "Você poderia me mandar o desenho" }
  ] },
{ id: "u10", nivel: "A2", titulo: "What are you doing?", meta: "Present continuous × present simple",
  gram: [
    { t: "Present continuous", h: "<p>Para o que está acontecendo <b>agora</b>: to be + verbo com <b>-ing</b>. <i>I'm working. She's studying. They aren't listening.</i> Pergunta: <i>What are you doing?</i></p><p>Regras do -ing: write → writing (tira o e); cut → cutting, stop → stopping (dobra a consoante em sílaba curta); lie → lying.</p>" },
    { t: "Agora × sempre", h: "<p><i>I <b>work</b> at Sofir</i> (fato, rotina) × <i>I'<b>m working</b> on a new project</i> (agora, temporário). Palavras de agora: now, right now, at the moment, today. De rotina: every day, usually, on Mondays.</p><p>Alguns verbos quase nunca vão para -ing: know, like, want, need, understand (<i>I understand</i>, não \"I'm understanding\").</p>" }
  ],
  vocab: [["now","agora"],["at the moment","no momento"],["project","projeto"],["meeting","reunião"],["call","ligar, ligação"],["wait","esperar"],["listen","escutar"],["look for","procurar"],["work on","trabalhar em (projeto)"],["check","verificar"],["fix","consertar"],["build","construir"],["cut","cortar"],["weld","soldar"]],
  frases: [["What are you doing? — I'm checking the drawings.","O que você está fazendo? — Estou conferindo os desenhos."],["He's welding the flange right now.","Ele está soldando o flange agora."],["We're waiting for the material.","Estamos esperando o material."],["I usually work until five, but today I'm working late.","Geralmente trabalho até as cinco, mas hoje estou trabalhando até tarde."],["Are you listening?","Você está escutando?"],["They're building a new shed.","Eles estão construindo um galpão novo."]],
  ex: [
    { t: "fill", q: "Look! He ___ (cut) the plate.", a: ["is cutting","'s cutting"] },
    { t: "fill", q: "I ___ (write) an email now.", a: ["am writing","'m writing"] },
    { t: "mc", q: "Rotina:", o: ["I'm going to the gym every Monday.","I go to the gym every Monday."], a: 1 },
    { t: "mc", q: "Qual está certa?", o: ["I'm needing help.","I need help."], a: 1, why: "need quase nunca vai para -ing." },
    { t: "order", w: ["are","what","doing","you"], a: "What are you doing", tr: "O que você está fazendo?" },
    { t: "listen", s: "We are waiting for the material", tr: "Estamos esperando o material" }
  ] },
{ id: "u11", nivel: "A2", titulo: "Was and were", meta: "Passado do to be, datas e anos",
  gram: [
    { t: "Was / were", h: "<p>I / he / she / it → <b>was</b>; you / we / they → <b>were</b>. Negativa: wasn't, weren't. Pergunta: <i>Were you at work yesterday?</i></p>" },
    { t: "Expressões de passado", h: "<p>yesterday (ontem) · last week / last year (semana/ano passado) · two days <b>ago</b> (dois dias atrás) · in 2019. Anos: 2019 = <i>twenty nineteen</i>; 2006 = <i>two thousand six</i>. Datas: <i>October 28th</i> = <i>October the twenty-eighth</i>.</p>" },
    { t: "Ordinais", h: "<p>1st first · 2nd second · 3rd third · 4th fourth · 5th fifth · 12th twelfth · 20th twentieth · 21st twenty-first.</p>" }
  ],
  vocab: [["yesterday","ontem"],["last night","ontem à noite"],["last week","semana passada"],["ago","atrás"],["year","ano"],["month","mês"],["birthday","aniversário"],["born","nascido"],["first","primeiro"],["second","segundo"],["third","terceiro"],["late","atrasado"],["early","cedo"],["on time","no horário"]],
  frases: [["I was at work yesterday.","Eu estava no trabalho ontem."],["Were you at the meeting? — No, I wasn't.","Você estava na reunião? — Não."],["They were late this morning.","Eles chegaram atrasados hoje cedo."],["I was born in 2001.","Nasci em 2001."],["The delivery was two days ago.","A entrega foi dois dias atrás."],["My birthday is on May 3rd.","Meu aniversário é 3 de maio."]],
  ex: [
    { t: "fill", q: "She ___ tired yesterday.", a: ["was"] },
    { t: "fill", q: "We ___ at home last night.", a: ["were"] },
    { t: "fill", q: "Dois dias atrás: two days ___", a: ["ago"] },
    { t: "mc", q: "___ you at work on Saturday?", o: ["Was","Were","Did"], a: 1 },
    { t: "mc", q: "3rd =", o: ["three","third","thirty"], a: 1 },
    { t: "order", w: ["was","born","in","I","2001"], a: "I was born in 2001", tr: "Nasci em 2001." },
    { t: "listen", s: "They were late this morning", tr: "Eles chegaram atrasados hoje cedo" }
  ] },
{ id: "u12", nivel: "A2", titulo: "What did you do? (regulares)", meta: "Past simple com verbos regulares",
  gram: [
    { t: "Afirmativa: -ed", h: "<p>Verbo regular + <b>-ed</b>, igual para todas as pessoas: <i>I worked, she worked.</i> Ortografia: live → lived; stop → stopped; study → studied.</p>" },
    { t: "Pergunta e negativa: did", h: "<p>O auxiliar é <b>did</b> (para todos) e o verbo volta à forma normal: <i>Did you finish? — Yes, I did.</i> · <i>I didn't finish.</i> Errado: <i>I didn't finished</i>.</p>" },
    { t: "Pronúncia do -ed", h: "<p>Três sons: <b>/t/</b> depois de som surdo (worked, stopped, watched); <b>/d/</b> depois de som sonoro (lived, called, cleaned); <b>/ɪd/</b> só depois de t ou d (wanted, needed, started). Em <i>worked</i> não se fala \"workéd\".</p>" }
  ],
  vocab: [["worked","trabalhou"],["started","começou"],["finished","terminou"],["called","ligou"],["checked","verificou"],["changed","mudou, trocou"],["used","usou"],["needed","precisou"],["wanted","quis"],["watched","assistiu"],["arrived","chegou"],["stayed","ficou"],["tried","tentou"],["stopped","parou"]],
  frases: [["I finished the report yesterday.","Terminei o relatório ontem."],["Did you call the supplier? — Yes, I did.","Você ligou para o fornecedor? — Sim."],["We didn't use the new drill.","Não usamos a furadeira nova."],["The machine stopped at three o'clock.","A máquina parou às três horas."],["She studied for the test last weekend.","Ela estudou para a prova no fim de semana passado."],["They arrived late.","Eles chegaram atrasados."]],
  ex: [
    { t: "fill", q: "I ___ (work) on Saturday.", a: ["worked"] },
    { t: "fill", q: "She ___ (study) a lot last week.", a: ["studied"] },
    { t: "fill", q: "We ___ (not / finish) the job. Use a forma contraída.", a: ["didn't finish"] },
    { t: "mc", q: "Qual está certa?", o: ["Did you checked?","Did you check?","You did check?"], a: 1 },
    { t: "mc", q: "\"wanted\" termina com som de…", o: ["/t/","/d/","/ɪd/"], a: 2 },
    { t: "order", w: ["you","the","did","call","supplier"], a: "Did you call the supplier", tr: "Você ligou para o fornecedor?" },
    { t: "listen", s: "The machine stopped at three", tr: "A máquina parou às três" }
  ] },
{ id: "u13", nivel: "A2", titulo: "Irregular past", meta: "Os verbos irregulares mais usados",
  gram: [
    { t: "Os irregulares", h: "<p>Não seguem o -ed e precisam ser decorados. Os mais comuns: go → <b>went</b>, have → <b>had</b>, make → <b>made</b>, do → <b>did</b>, get → <b>got</b>, see → <b>saw</b>, come → <b>came</b>, take → <b>took</b>, give → <b>gave</b>, say → <b>said</b>, buy → <b>bought</b>, think → <b>thought</b>, send → <b>sent</b>, leave → <b>left</b>, find → <b>found</b>, cut → <b>cut</b>, put → <b>put</b>.</p>" },
    { t: "Com did, volta ao normal", h: "<p><i>I went</i> → <i>Did you <b>go</b>?</i> → <i>I didn't <b>go</b>.</i> O passado fica só no did.</p>" }
  ],
  vocab: [["went (go)","foi"],["had (have)","teve"],["made (make)","fez, fabricou"],["did (do)","fez"],["got (get)","conseguiu, recebeu"],["saw (see)","viu"],["came (come)","veio"],["took (take)","pegou, levou"],["gave (give)","deu"],["said (say)","disse"],["bought (buy)","comprou"],["sent (send)","enviou"],["left (leave)","saiu, deixou"],["found (find)","encontrou"]],
  frases: [["I went to the factory early.","Fui cedo para a fábrica."],["We had a meeting with the client.","Tivemos uma reunião com o cliente."],["He made a mistake in the drawing.","Ele cometeu um erro no desenho."],["Did you send the purchase request? — Yes, I sent it this morning.","Você enviou a requisição de compra? — Sim, enviei hoje cedo."],["I didn't see the email.","Não vi o e-mail."],["She bought a new laptop.","Ela comprou um notebook novo."]],
  ex: [
    { t: "fill", q: "Passado de go: ___", a: ["went"] },
    { t: "fill", q: "Passado de send: ___", a: ["sent"] },
    { t: "fill", q: "Passado de buy: ___", a: ["bought"] },
    { t: "fill", q: "I didn't ___ (see) the message.", a: ["see"] },
    { t: "mc", q: "\"Ele cometeu um erro\":", o: ["He did a mistake.","He made a mistake.","He maked a mistake."], a: 1, why: "mistake vai com make → made." },
    { t: "order", w: ["went","the","I","factory","to"], a: "I went to the factory", tr: "Fui para a fábrica." },
    { t: "listen", s: "We had a meeting with the client", tr: "Tivemos uma reunião com o cliente" }
  ] },
{ id: "u14", nivel: "A2", titulo: "Bigger, the biggest", meta: "Comparativos e superlativos",
  gram: [
    { t: "Adjetivos curtos", h: "<p>+ <b>-er than</b> / <b>the -est</b>: <i>big → bigger → the biggest</i>; <i>thick → thicker → the thickest</i>; <i>heavy → heavier → the heaviest</i>.</p>" },
    { t: "Adjetivos longos", h: "<p><b>more … than</b> / <b>the most …</b>: <i>expensive → more expensive → the most expensive</i>.</p>" },
    { t: "Irregulares e igualdade", h: "<p>good → better → the best · bad → worse → the worst · far → farther → the farthest. Igualdade: <i>as … as</i> — <i>This plate is <b>as</b> thick <b>as</b> that one.</i></p>" }
  ],
  vocab: [["big / small","grande / pequeno"],["long / short","comprido / curto"],["thick / thin","grosso / fino"],["heavy / light","pesado / leve"],["fast / slow","rápido / lento"],["strong / weak","forte / fraco"],["hard / soft","duro / mole"],["easy / difficult","fácil / difícil"],["good / better / best","bom / melhor / o melhor"],["bad / worse / worst","ruim / pior / o pior"],["cheaper","mais barato"],["safer","mais seguro"],["than","do que"],["the same as","igual a"]],
  frases: [["Steel is heavier than aluminum.","O aço é mais pesado que o alumínio."],["This is the biggest machine in the shop.","Esta é a maior máquina da oficina."],["The new process is faster and cheaper.","O processo novo é mais rápido e mais barato."],["Stainless steel is more expensive than carbon steel.","O inox é mais caro que o aço carbono."],["Today is better than yesterday.","Hoje está melhor que ontem."],["This plate is as thick as that one.","Esta chapa é tão grossa quanto aquela."]],
  ex: [
    { t: "fill", q: "Steel is ___ (heavy) than aluminum.", a: ["heavier"] },
    { t: "fill", q: "It's the ___ (big) machine in the factory.", a: ["biggest"] },
    { t: "fill", q: "This is ___ (expensive) than that.", a: ["more expensive"] },
    { t: "mc", q: "\"O melhor\":", o: ["the goodest","the best","the most good"], a: 1 },
    { t: "mc", q: "Tão rápido quanto:", o: ["as fast as","so fast than","fast as"], a: 0 },
    { t: "order", w: ["is","than","steel","heavier","aluminum"], a: "Steel is heavier than aluminum", tr: "O aço é mais pesado que o alumínio." },
    { t: "listen", s: "The new process is faster", tr: "O processo novo é mais rápido" }
  ] },
{ id: "u15", nivel: "A2", titulo: "Plans: going to and will", meta: "Falar do futuro",
  gram: [
    { t: "Going to", h: "<p>Para <b>planos</b> já decididos e para previsões com evidência: <i>I'm going to study English every day. Look at the sky, it's going to rain.</i></p>" },
    { t: "Will", h: "<p>Para decisões na hora, promessas, ofertas e previsões em geral: <i>I'll call you later. I'll help you. I think it will be difficult.</i> Negativa: <b>won't</b> (will not).</p>" },
    { t: "Present continuous para compromissos", h: "<p>Compromisso marcado: <i>I'm meeting the client on Friday.</i></p>" }
  ],
  vocab: [["plan","plano, planejar"],["next week","semana que vem"],["next year","ano que vem"],["soon","em breve"],["later","mais tarde"],["deadline","prazo"],["schedule","cronograma"],["promise","prometer"],["decide","decidir"],["travel","viajar"],["visit","visitar"],["learn","aprender"],["improve","melhorar"],["become","tornar-se"]],
  frases: [["I'm going to become an engineer.","Vou me tornar engenheiro."],["I'll send you the schedule later.","Te mando o cronograma mais tarde."],["The deadline is next Friday.","O prazo é sexta que vem."],["We won't finish today.","Não vamos terminar hoje."],["Are you going to travel next year?","Você vai viajar ano que vem?"],["I'm meeting the supplier tomorrow.","Vou me encontrar com o fornecedor amanhã."]],
  ex: [
    { t: "mc", q: "O telefone toca. \"Eu atendo!\"", o: ["I'm going to answer it.","I'll answer it."], a: 1, why: "Decisão na hora → will." },
    { t: "mc", q: "Plano decidido há meses:", o: ["I'm going to study engineering.","I will to study engineering."], a: 0 },
    { t: "fill", q: "Negativa de will (contraída): ___", a: ["won't"] },
    { t: "fill", q: "I'm going ___ learn English.", a: ["to"] },
    { t: "order", w: ["I'll","later","call","you"], a: "I'll call you later", tr: "Te ligo mais tarde." },
    { t: "listen", s: "The deadline is next Friday", tr: "O prazo é sexta que vem" }
  ] },
{ id: "u16", nivel: "A2", titulo: "Where is it? In the workshop", meta: "Preposições de lugar, direções e o chão de fábrica",
  gram: [
    { t: "Preposições de lugar", h: "<p><b>in</b> (dentro) · <b>on</b> (sobre, em cima) · <b>under</b> (embaixo) · <b>next to</b> (ao lado) · <b>between</b> (entre) · <b>behind</b> (atrás) · <b>in front of</b> (na frente) · <b>near</b> (perto). <i>The drawing is on the table. The bolts are in the box.</i></p>" },
    { t: "Direções", h: "<p><i>Go straight ahead. Turn left / right. It's on your left. Go past the warehouse. It's at the end of the corridor.</i></p>" }
  ],
  vocab: [["workshop / shop floor","oficina / chão de fábrica"],["warehouse","almoxarifado, depósito"],["office","escritório"],["shed","galpão"],["gate","portão"],["corridor","corredor"],["stairs","escada"],["left / right","esquerda / direita"],["straight ahead","em frente"],["next to","ao lado de"],["between","entre"],["behind","atrás de"],["in front of","na frente de"],["upstairs / downstairs","no andar de cima / de baixo"]],
  frases: [["The warehouse is next to the paint shop.","O almoxarifado fica ao lado da pintura."],["Go straight ahead and turn left.","Siga em frente e vire à esquerda."],["The drawings are on my desk.","Os desenhos estão na minha mesa."],["The office is upstairs.","O escritório fica no andar de cima."],["The crane is between the two sheds.","A ponte rolante fica entre os dois galpões."],["Excuse me, where is the restroom?","Com licença, onde fica o banheiro?"]],
  ex: [
    { t: "mc", q: "Os parafusos estão dentro da caixa:", o: ["on the box","in the box","under the box"], a: 1 },
    { t: "fill", q: "Vire à esquerda: Turn ___", a: ["left"] },
    { t: "fill", q: "The office is ___ the warehouse and the gate. (entre)", a: ["between"] },
    { t: "fill", q: "Almoxarifado em inglês: ___", a: ["warehouse"] },
    { t: "order", w: ["ahead","go","straight"], a: "Go straight ahead", tr: "Siga em frente." },
    { t: "listen", s: "The drawings are on my desk", tr: "Os desenhos estão na minha mesa" }
  ] },
/* ======================= B1 ======================= */
{ id: "u17", nivel: "B1", titulo: "Have you ever…?", meta: "Present perfect: experiências, for e since",
  gram: [
    { t: "Forma", h: "<p><b>have / has + particípio</b>. Regulares: o particípio é igual ao passado (worked). Irregulares têm uma 3ª forma: go-went-<b>gone</b>, see-saw-<b>seen</b>, do-did-<b>done</b>, be-was-<b>been</b>, make-made-<b>made</b>, write-wrote-<b>written</b>, take-took-<b>taken</b>.</p>" },
    { t: "Usos", h: "<p>1) <b>Experiência</b> sem dizer quando: <i>Have you ever used a CNC lathe? — Yes, I have. / No, I've never used one.</i></p><p>2) Algo que começou no passado e <b>continua</b>: <i>I've worked here <b>for</b> two years</i> (duração) · <i>I've worked here <b>since</b> 2023</i> (ponto de início).</p><p>3) Resultado recente: <i>I've finished the report</i> (já terminei). Com <b>already</b> (já), <b>yet</b> (ainda/já, em perguntas e negativas) e <b>just</b> (acabei de).</p>" }
  ],
  vocab: [["ever","alguma vez"],["never","nunca"],["already","já"],["yet","ainda (neg.) / já (perg.)"],["just","acabou de"],["for","há (duração)"],["since","desde"],["been (be)","estado, sido"],["done (do)","feito"],["seen (see)","visto"],["gone (go)","ido"],["written (write)","escrito"],["taken (take)","pegado, tomado"],["experience","experiência"]],
  frases: [["Have you ever been to the United States? — No, I haven't.","Você já foi aos Estados Unidos? — Não."],["I've worked at Sofir since 2023.","Trabalho na Sofir desde 2023."],["She has studied English for six months.","Ela estuda inglês há seis meses."],["Have you finished the drawing yet? — Not yet.","Você já terminou o desenho? — Ainda não."],["I've just sent the email.","Acabei de enviar o e-mail."],["I've never used that software.","Nunca usei aquele software."]],
  ex: [
    { t: "fill", q: "I've lived here ___ 2015.", a: ["since"] },
    { t: "fill", q: "I've lived here ___ ten years.", a: ["for"] },
    { t: "fill", q: "Particípio de write: ___", a: ["written"] },
    { t: "fill", q: "Have you finished ___? (já, pergunta)", a: ["yet"] },
    { t: "mc", q: "Experiência:", o: ["Did you ever weld aluminum?","Have you ever welded aluminum?"], a: 1 },
    { t: "order", w: ["just","I've","the","sent","email"], a: "I've just sent the email", tr: "Acabei de enviar o e-mail." },
    { t: "listen", s: "I have never used that software", tr: "Nunca usei aquele software" }
  ] },
{ id: "u18", nivel: "B1", titulo: "Perfect or past?", meta: "Present perfect × past simple",
  gram: [
    { t: "A regra de ouro", h: "<p>Disse <b>quando</b> (yesterday, last week, in 2020, two days ago)? → <b>past simple</b>: <i>I finished it yesterday.</i></p><p>Não importa quando, ou o período ainda não terminou (today, this week, ever, never, so far)? → <b>present perfect</b>: <i>I've finished it. I've had three meetings this week.</i></p><p>Pergunta com <b>When</b> → sempre past simple: <i>When did you start?</i></p>" }
  ],
  vocab: [["so far","até agora"],["recently","recentemente"],["this week","esta semana"],["lately","ultimamente"],["result","resultado"],["report","relatório"],["mistake","erro"],["problem","problema"],["solve","resolver"],["test","testar, teste"],["deliver","entregar"],["receive","receber"],["order","pedido; encomendar"],["supplier","fornecedor"]],
  frases: [["I've had three meetings today.","Tive três reuniões hoje (e o dia não acabou)."],["I had three meetings yesterday.","Tive três reuniões ontem."],["The supplier has delivered the plates.","O fornecedor entregou as chapas (já estão aqui)."],["When did they deliver them? — On Monday.","Quando eles entregaram? — Na segunda."],["We've solved the problem.","Resolvemos o problema."],["So far, everything has worked.","Até agora, tudo funcionou."]],
  ex: [
    { t: "mc", q: "I ___ the report yesterday.", o: ["have finished","finished"], a: 1, why: "yesterday → past simple." },
    { t: "mc", q: "___ you ever ___ to Europe?", o: ["Did / go","Have / been"], a: 1 },
    { t: "mc", q: "When ___ you start working here?", o: ["have","did"], a: 1 },
    { t: "fill", q: "Até agora: so ___", a: ["far"] },
    { t: "fill", q: "We ___ (solve) the problem. Já está resolvido; use a forma contraída.", a: ["'ve solved","have solved"] },
    { t: "listen", s: "The supplier has delivered the plates", tr: "O fornecedor entregou as chapas" }
  ] },
{ id: "u19", nivel: "B1", titulo: "Must, have to, should", meta: "Obrigação, proibição e conselho (segurança no trabalho)",
  gram: [
    { t: "Obrigação", h: "<p><b>must</b> e <b>have to</b> = ter que. <i>You must wear safety glasses. I have to finish this today.</i> <b>Don't have to</b> = não precisa (é opcional): <i>You don't have to come on Saturday.</i></p>" },
    { t: "Proibição", h: "<p><b>mustn't</b> = não pode de jeito nenhum: <i>You mustn't smoke here.</i> Cuidado: mustn't (proibido) é bem diferente de don't have to (não precisa).</p>" },
    { t: "Conselho", h: "<p><b>should / shouldn't</b> = deveria: <i>You should check the drawing again. You shouldn't lift that alone.</i></p>" }
  ],
  vocab: [["safety","segurança"],["wear","usar (roupa, EPI)"],["helmet / hard hat","capacete"],["safety glasses","óculos de proteção"],["gloves","luvas"],["ear protection","protetor auricular"],["boots","botinas"],["danger","perigo"],["warning","aviso, atenção"],["forbidden","proibido"],["allowed","permitido"],["lift","levantar, içar"],["load","carga"],["rule","regra"]],
  frases: [["You must wear a helmet in this area.","Você precisa usar capacete nesta área."],["You mustn't stand under the load.","É proibido ficar debaixo da carga."],["You don't have to wear gloves in the office.","No escritório não precisa usar luvas."],["You should check the welding procedure.","Você deveria conferir o procedimento de solda."],["I have to finish the report today.","Tenho que terminar o relatório hoje."],["Smoking is forbidden.","É proibido fumar."]],
  ex: [
    { t: "mc", q: "É proibido ficar sob a carga:", o: ["You don't have to stand under the load.","You mustn't stand under the load."], a: 1 },
    { t: "mc", q: "Não precisa vir no sábado:", o: ["You mustn't come on Saturday.","You don't have to come on Saturday."], a: 1 },
    { t: "fill", q: "Conselho: You ___ rest more.", a: ["should"] },
    { t: "fill", q: "Óculos de proteção: safety ___", a: ["glasses"] },
    { t: "order", w: ["must","a","wear","you","helmet"], a: "You must wear a helmet", tr: "Você precisa usar capacete." },
    { t: "listen", s: "You should check the procedure", tr: "Você deveria conferir o procedimento" }
  ] },
{ id: "u20", nivel: "B1", titulo: "If it rains…", meta: "First conditional e orações de tempo",
  gram: [
    { t: "First conditional", h: "<p>Para situações <b>possíveis/reais</b> no futuro: <b>If + present, will + verbo</b>. <i>If the material arrives today, we'll start tomorrow.</i> A vírgula só aparece quando o if vem primeiro.</p><p>Erro clássico: <i>If it <s>will rain</s></i> → certo: <i>If it <b>rains</b></i>.</p>" },
    { t: "When, as soon as, until", h: "<p>Mesma lógica (presente depois deles, mesmo falando do futuro): <i>I'll call you <b>when</b> I arrive. We'll test it <b>as soon as</b> it's ready. Wait <b>until</b> the paint dries.</i> <b>unless</b> = a menos que.</p>" }
  ],
  vocab: [["if","se"],["unless","a menos que"],["as soon as","assim que"],["until","até que"],["arrive","chegar"],["delay","atraso; atrasar"],["approve","aprovar"],["cancel","cancelar"],["ready","pronto"],["on time","no prazo"],["late","atrasado"],["cost","custo, custar"],["budget","orçamento"],["customer / client","cliente"]],
  frases: [["If the material arrives today, we'll start tomorrow.","Se o material chegar hoje, começamos amanhã."],["If we don't finish on time, the client will complain.","Se não terminarmos no prazo, o cliente vai reclamar."],["I'll call you as soon as I get the drawings.","Te ligo assim que receber os desenhos."],["Don't move the part until the weld cools down.","Não mexa na peça até a solda esfriar."],["We won't start unless the client approves the budget.","Não começamos a menos que o cliente aprove o orçamento."],["What will you do if it's delayed?","O que você vai fazer se atrasar?"]],
  ex: [
    { t: "mc", q: "If it ___ tomorrow, we'll stay inside.", o: ["will rain","rains"], a: 1 },
    { t: "fill", q: "If you study every day, you ___ improve. (vai)", a: ["will","'ll"] },
    { t: "fill", q: "I'll call you as ___ as I arrive.", a: ["soon"] },
    { t: "fill", q: "A menos que: ___", a: ["unless"] },
    { t: "order", w: ["if","arrives","the","material","today"], a: "If the material arrives today", tr: "Se o material chegar hoje" },
    { t: "listen", s: "I will call you as soon as I arrive", tr: "Te ligo assim que eu chegar" }
  ] },
{ id: "u21", nivel: "B1", titulo: "If I had…", meta: "Second conditional: hipóteses e conselhos",
  gram: [
    { t: "Second conditional", h: "<p>Para situações <b>imaginárias</b> ou improváveis no presente/futuro: <b>If + past, would + verbo</b>. <i>If I had more time, I would study more.</i> (não tenho tempo).</p><p>Com to be, o padrão é <b>were</b> para todos: <i>If I were you, I'd talk to the manager.</i> (conselho: se eu fosse você…)</p>" },
    { t: "First × second", h: "<p><i>If I <b>get</b> the job, I'll move.</i> (é possível) × <i>If I <b>won</b> the lottery, I'd buy a house.</i> (é sonho).</p>" }
  ],
  vocab: [["would","(condicional, -ria)"],["if I were you","se eu fosse você"],["lottery","loteria"],["win","ganhar (prêmio)"],["earn","ganhar (salário)"],["salary","salário"],["company","empresa"],["start a business","abrir um negócio"],["choose","escolher"],["afford","ter dinheiro para"],["move","mudar-se, mover"],["abroad","no exterior"],["dream","sonho, sonhar"],["imagine","imaginar"]],
  frases: [["If I had more time, I would study more.","Se eu tivesse mais tempo, estudaria mais."],["If I were you, I'd ask for help.","Se eu fosse você, pediria ajuda."],["What would you do if you lost your job?","O que você faria se perdesse o emprego?"],["If I could choose, I'd work with design.","Se eu pudesse escolher, trabalharia com projeto."],["If the company paid more, people wouldn't leave.","Se a empresa pagasse mais, as pessoas não sairiam."],["I'd start a business if I had the money.","Eu abriria um negócio se tivesse dinheiro."]],
  ex: [
    { t: "mc", q: "If I ___ rich, I'd travel the world.", o: ["am","were","will be"], a: 1 },
    { t: "fill", q: "If I had time, I ___ study more.", a: ["would","'d"] },
    { t: "fill", q: "If I ___ you, I'd call him. (fosse)", a: ["were"] },
    { t: "mc", q: "Sonho:", o: ["If I win the lottery, I'll buy a farm.","If I won the lottery, I'd buy a farm."], a: 1 },
    { t: "order", w: ["would","what","you","do"], a: "What would you do", tr: "O que você faria?" },
    { t: "listen", s: "If I were you I would ask for help", tr: "Se eu fosse você, pediria ajuda" }
  ] },
{ id: "u22", nivel: "B1", titulo: "It is made of steel", meta: "Voz passiva: descrever processos",
  gram: [
    { t: "Forma", h: "<p><b>to be + particípio</b>. O foco é o que acontece com a coisa, não quem faz: <i>The plates <b>are cut</b> by plasma. The tank <b>was painted</b> yesterday.</i> Quem fez, se importar, vem com <b>by</b>.</p>" },
    { t: "Processos", h: "<p>Ótimo para descrever fabricação: <i>First, the plates are cut. Then they are bent and welded. Finally, the part is inspected and painted.</i> Conectivos: first, then, next, after that, finally.</p>" },
    { t: "Made of / made in", h: "<p><i>It's made <b>of</b> stainless steel</i> (material) · <i>It's made <b>in</b> Brazil</i> (lugar) · <i>It's made <b>by</b> Sofir</i> (quem).</p>" }
  ],
  vocab: [["is cut","é cortado"],["is bent","é dobrado"],["is welded","é soldado"],["is drilled","é furado"],["is machined","é usinado"],["is painted","é pintado"],["is inspected","é inspecionado"],["is assembled","é montado"],["is shipped","é despachado"],["first","primeiro"],["then / next","depois / em seguida"],["finally","por fim"],["made of","feito de"],["process","processo"]],
  frases: [["The plates are cut on the plasma machine.","As chapas são cortadas na máquina de plasma."],["Then the parts are bent and welded.","Depois as peças são dobradas e soldadas."],["The welds are inspected by ultrasound.","As soldas são inspecionadas por ultrassom."],["The tank was painted yesterday.","O tanque foi pintado ontem."],["This flange is made of carbon steel.","Este flange é feito de aço carbono."],["The equipment will be shipped next week.","O equipamento será despachado semana que vem."]],
  ex: [
    { t: "fill", q: "The plates ___ cut by plasma. (são)", a: ["are"] },
    { t: "fill", q: "The tank ___ painted yesterday. (foi)", a: ["was"] },
    { t: "fill", q: "Particípio de bend: ___", a: ["bent"] },
    { t: "mc", q: "Feito de aço:", o: ["made in steel","made of steel","made by steel"], a: 1 },
    { t: "order", w: ["inspected","the","are","welds"], a: "The welds are inspected", tr: "As soldas são inspecionadas." },
    { t: "listen", s: "The parts are bent and welded", tr: "As peças são dobradas e soldadas" }
  ] },
{ id: "u23", nivel: "B1", titulo: "The machine that…", meta: "Orações relativas: who, which, that, where",
  gram: [
    { t: "Pronomes relativos", h: "<p><b>who</b> para pessoas · <b>which</b> para coisas · <b>that</b> para os dois (mais informal) · <b>where</b> para lugares · <b>whose</b> = cujo.</p><p><i>The welder <b>who</b> made this is very good. The machine <b>that</b> cuts the plates is broken. This is the shop <b>where</b> we paint the parts.</i></p>" },
    { t: "Definir com precisão", h: "<p>Muito útil para explicar algo quando falta a palavra: <i>It's a tool <b>that</b> you use to measure diameters</i> (o paquímetro: <i>caliper</i>).</p>" }
  ],
  vocab: [["who","que, quem (pessoas)"],["which","que, o qual (coisas)"],["that","que (pessoas e coisas)"],["where","onde"],["whose","cujo"],["caliper","paquímetro"],["micrometer","micrômetro"],["tape measure","trena"],["wrench","chave (de boca)"],["hammer","martelo"],["grinder","esmerilhadeira"],["crane","ponte rolante, guindaste"],["forklift","empilhadeira"],["device","dispositivo"]],
  frases: [["The man who works in the warehouse is called Paulo.","O homem que trabalha no almoxarifado se chama Paulo."],["A caliper is a tool that measures small dimensions.","Paquímetro é uma ferramenta que mede dimensões pequenas."],["This is the shop where we assemble the tanks.","Esta é a oficina onde montamos os tanques."],["The drawing which you sent has an error.","O desenho que você mandou tem um erro."],["She's the engineer whose project won the award.","Ela é a engenheira cujo projeto ganhou o prêmio."],["I need the device that holds the part.","Preciso do dispositivo que segura a peça."]],
  ex: [
    { t: "mc", q: "The operator ___ runs the lathe is on vacation.", o: ["which","who","where"], a: 1 },
    { t: "mc", q: "The crane ___ lifts the tanks is broken.", o: ["who","which","where"], a: 1 },
    { t: "fill", q: "This is the room ___ we have meetings.", a: ["where"] },
    { t: "fill", q: "Paquímetro em inglês: ___", a: ["caliper"] },
    { t: "order", w: ["a","that","measures","tool","diameters"], a: "a tool that measures diameters", tr: "uma ferramenta que mede diâmetros" },
    { t: "listen", s: "The drawing which you sent has an error", tr: "O desenho que você mandou tem um erro" }
  ] },
{ id: "u24", nivel: "B1", titulo: "He said that…", meta: "Reported speech, phrasal verbs e e-mails de trabalho",
  gram: [
    { t: "Discurso indireto", h: "<p>Contar o que alguém disse: o verbo \"volta\" um tempo. <i>\"I'm busy.\" → He said (that) he <b>was</b> busy. \"We will deliver on Friday.\" → They said they <b>would</b> deliver on Friday.</i> <b>tell</b> + pessoa: <i>She told me that…</i>; <b>say</b> sem pessoa: <i>She said that…</i></p>" },
    { t: "Phrasal verbs do trabalho", h: "<p>Verbo + partícula com sentido novo: <i>set up</i> (montar, configurar), <i>carry out</i> (executar), <i>find out</i> (descobrir), <i>follow up</i> (acompanhar), <i>put off</i> (adiar), <i>run out of</i> (ficar sem), <i>go over</i> (revisar), <i>fill in</i> (preencher).</p>" },
    { t: "E-mail curto e profissional", h: "<p><i>Hi John,</i> / <i>I hope you're well.</i> / <i>I'm writing to ask about…</i> / <i>Could you please send me…?</i> / <i>Please find attached the drawings.</i> / <i>Let me know if you have any questions.</i> / <i>Best regards, Guilherme</i>.</p>" }
  ],
  vocab: [["said (say)","disse"],["told (tell)","contou, disse a"],["asked","perguntou, pediu"],["set up","montar, configurar"],["carry out","executar, realizar"],["find out","descobrir"],["follow up","acompanhar, dar retorno"],["put off","adiar"],["run out of","ficar sem"],["go over","revisar"],["fill in","preencher"],["attached","anexo"],["regards","atenciosamente"],["let me know","me avise"]],
  frases: [["He said that the parts were ready.","Ele disse que as peças estavam prontas."],["She told me she would send the drawings.","Ela me disse que mandaria os desenhos."],["We ran out of electrodes.","Ficamos sem eletrodos."],["Please find attached the cutting report.","Segue em anexo o relatório de corte."],["Could you go over the bill of materials?","Você poderia revisar a lista de materiais?"],["Let me know if you have any questions.","Me avise se tiver alguma dúvida."]],
  ex: [
    { t: "fill", q: "\"I'm tired.\" → He said he ___ tired.", a: ["was"] },
    { t: "fill", q: "\"We will finish.\" → They said they ___ finish.", a: ["would"] },
    { t: "mc", q: "She ___ me that the meeting was cancelled.", o: ["said","told"], a: 1, why: "tell + pessoa." },
    { t: "fill", q: "Ficamos sem material: We ran ___ of material.", a: ["out"] },
    { t: "fill", q: "Segue em anexo: Please find ___ the report.", a: ["attached"] },
    { t: "order", w: ["know","let","me"], a: "Let me know", tr: "Me avise" },
    { t: "listen", s: "Please find attached the drawings", tr: "Segue em anexo os desenhos" }
  ] }
],

/* inglês técnico (caldeiraria e usinagem) */
tecnico: [
  ["steel plate","chapa de aço"],["carbon steel","aço carbono"],["stainless steel","aço inox"],["beam","viga"],["pipe","tubo"],["flange","flange"],["bolt","parafuso"],["nut","porca"],["washer","arruela"],["weld / welding","solda / soldagem"],["weld bead","cordão de solda"],["fillet weld","solda de filete"],["groove weld","solda de topo (chanfro)"],["electrode","eletrodo"],["filler metal","metal de adição"],["bevel","chanfro"],["grinding","esmerilhamento"],["drawing","desenho"],["bill of materials (BOM)","lista de materiais"],["tolerance","tolerância"],["thickness","espessura"],["width / length","largura / comprimento"],["diameter","diâmetro"],["lathe","torno"],["milling machine","fresadora"],["machining center","centro de usinagem"],["boring mill","mandrilhadora"],["drill press","furadeira de coluna"],["cutting tool","ferramenta de corte"],["feed rate","avanço"],["cutting speed","velocidade de corte"],["work order","ordem de produção"],["purchase request","requisição de compra"],["lead time","prazo de entrega"],["inspection","inspeção"],["non-destructive testing (NDT)","ensaio não destrutivo (END)"],["painting / coating","pintura / revestimento"],["assembly","montagem"],["shop drawing","desenho de fabricação"],["nesting","aninhamento (encaixe de peças na chapa)"]
],

/* pronúncia: o que mais pega para brasileiro */
pronuncia: [
  { t: "TH", h: "Ponta da língua entre os dentes. Sem som de voz em <i>think, three, thanks</i>; com voz em <i>this, the, that, mother</i>. Não troque por \"f\" ou \"d\".", ex: ["think","three","this","the weather"] },
  { t: "H aspirado", h: "O <i>h</i> no começo é um sopro, como o \"r\" de \"rato\" no sotaque mineiro: <i>house, help, hello</i>. Em <i>hour</i> e <i>honest</i> ele é mudo.", ex: ["house","help","hour"] },
  { t: "Sem \"i\" no fim", h: "Brasileiro tende a pôr vogal no fim: \"bigui\", \"stopi\". Termine seco na consoante: <i>big, stop, lab, work</i>.", ex: ["big","stop","work"] },
  { t: "O -ed do passado", h: "/t/ em worked, /d/ em lived, /ɪd/ só depois de t ou d: wanted, needed.", ex: ["worked","lived","wanted"] },
  { t: "R do inglês americano", h: "A língua não encosta em nada, fica dobrada para trás: <i>car, work, very</i>. No começo da palavra não é o \"rr\" forte do português.", ex: ["red","very","car"] },
  { t: "Vogal curta × longa", h: "<i>ship</i> (curto) × <i>sheep</i> (longo); <i>live</i> × <i>leave</i>; <i>full</i> × <i>fool</i>. Mudam o sentido.", ex: ["ship","sheep","live","leave"] },
  { t: "L no fim da sílaba", h: "Não vira \"u\": em <i>steel, tool, will</i> a língua toca atrás dos dentes no final.", ex: ["steel","tool","will"] }
],

/* nivelamento: cada questão indica a unidade em que o assunto aparece */
nivelamento: [
  { q: "___ name is Paulo. (o nome dele)", o: ["He","His","Her"], a: 1, u: "u04" },
  { q: "She ___ an engineer.", o: ["am","is","are"], a: 1, u: "u02" },
  { q: "___ you speak English?", o: ["Do","Does","Are"], a: 0, u: "u07" },
  { q: "He ___ in a factory.", o: ["work","works","working"], a: 1, u: "u06" },
  { q: "There ___ three bolts on the table.", o: ["is","are","be"], a: 1, u: "u08" },
  { q: "Look! They ___ the plate now.", o: ["cut","are cutting","cuts"], a: 1, u: "u10" },
  { q: "I ___ to the factory yesterday.", o: ["go","went","gone"], a: 1, u: "u13" },
  { q: "Steel is ___ than aluminum.", o: ["heavy","heavier","the heaviest"], a: 1, u: "u14" },
  { q: "Look at the clouds. It ___ rain.", o: ["is going to","will to","goes"], a: 0, u: "u15" },
  { q: "I've worked here ___ 2023.", o: ["for","since","ago"], a: 1, u: "u17" },
  { q: "When ___ you start this job?", o: ["have","did","do"], a: 1, u: "u18" },
  { q: "You ___ smoke here. It's forbidden.", o: ["don't have to","mustn't","shouldn't to"], a: 1, u: "u19" },
  { q: "If it ___ tomorrow, we'll cancel the visit.", o: ["will rain","rains","rained"], a: 1, u: "u20" },
  { q: "If I ___ you, I'd talk to the boss.", o: ["am","was being","were"], a: 2, u: "u21" },
  { q: "The plates ___ by plasma.", o: ["cut","are cut","are cutting"], a: 1, u: "u22" },
  { q: "The engineer ___ designed this is here.", o: ["which","who","where"], a: 1, u: "u23" }
]
};
