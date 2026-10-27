// Fonte única de verdade do site. Copy derivada de olimpo-frontend-spec.md +
// olimpo-landing-por-deus.md + olimpo-producao-v2.md. Passo 0a.
// (11 deuses ganham 3 beats; Zeus é o arco de 4 atos.)

export const A = "/assets"; // raiz servida

export const hero = {
  kicker: "PANTEÃO OLÍMPICO · MMXXVI",
  title: "OLIMPO",
  subtitle: "Doze tronos. Doze modos de ter poder — e de perdê-lo.",
  video: `${A}/videos/v-zhero-pro.mp4`,
  loadingPhrase: "Antes dos homens, houve os que não morrem.",
};

// Arco do Zeus — 6 beats em XILOGRAVURA (roteiro do Gabriel). A história é desenhada;
// o busto foto-real (v-zhero-pro) é só a invocação/atmosfera. Scroll dirige as cenas.
export const zeus = {
  code: "z",
  nameGr: "Ζεύς",
  nameLat: "Zeus",
  numeral: "I",
  accent: "#F2F2F2",
  epithet: "O rei que venceu o pai — e passou a eternidade com medo do filho.",
  thesis:
    "Zeus derrubou Cronos para escapar de uma profecia e se tornou soberano do cosmos. E mesmo assim viveu o resto da eternidade repetindo o medo do pai — engolindo, acorrentando, punindo — porque quem toma um trono sabe, melhor que ninguém, que um trono pode ser tomado.",
  busto: `${A}/videos/v-zhero-pro.mp4`, // invocação foto-real
  trono: `${A}/videos/v-zeus-trono.mp4`, // xilogravura de abertura
  atos: [
    {
      n: "BEAT I",
      titulo: "Nascimento e fuga de Cronos",
      video: `${A}/videos/v-zeus-b1.mp4`,
      texto:
        "Cronos devorava cada filho ao nascer, com medo da profecia de que um deles o destronaria — como ele próprio havia destronado o pai. Quando Zeus nasceu, Reia enganou o marido com uma pedra enrolada em panos e escondeu o bebê numa caverna de Creta. O rei dos deuses começou a existir como um segredo.",
    },
    {
      n: "BEAT II",
      titulo: "Titanomaquia",
      video: `${A}/videos/v-zeus-b2.mp4`,
      texto:
        "Adulto, Zeus forçou Cronos a devolver os irmãos engolidos e libertou os gigantes presos no Tártaro. Os Hecatônquiros de cem braços — entre eles Briareu — despejaram montanhas sobre os Titãs. Dez anos de guerra. O poder de Zeus foi conquistado, não herdado.",
    },
    {
      n: "BEAT III",
      titulo: "A divisão do cosmos",
      video: `${A}/videos/v-zeus-b3.mp4`,
      texto:
        "Vencidos os Titãs, os três irmãos dividiram o mundo: Zeus ficou com o céu, Poseidon com o mar, Hades com o mundo dos mortos. A terra ficou de todos. É aqui que Zeus deixa de ser apenas o vencedor e se torna soberano.",
    },
    {
      n: "BEAT IV",
      titulo: "Métis e o nascimento de Atena",
      video: `${A}/videos/v-zeus-b4.mp4`,
      texto:
        "Veio outra profecia: Métis, a prudência, geraria um filho maior que o pai. Zeus fez com ela o que Cronos fizera com ele — engoliu-a inteira. Meses depois, uma dor rachou seu crânio e Atena saltou de dentro, adulta e armada. O medo do pai voltou, idêntico, na cabeça do filho.",
    },
    {
      n: "BEAT V",
      titulo: "Prometeu e o fogo",
      video: `${A}/videos/v-zeus-b5.mp4`,
      texto:
        "Zeus governava também os mortais. Quando Prometeu roubou o fogo dos deuses para dá-lo aos homens, Zeus o acorrentou a uma rocha e mandou criar Pandora — e o jarro de onde todos os males escaparam sobre o mundo. O conhecimento tem dono, e desafiá-lo tem preço.",
    },
    {
      n: "BEAT VI",
      titulo: "A revolta e Briareu",
      video: `${A}/videos/v-zeus-b6.mp4`,
      texto:
        "No auge do poder, os próprios deuses se voltaram contra ele: Hera, Poseidon e Atena acorrentaram Zeus. Foi a nereida Tétis quem chamou Briareu — o mesmo gigante que o fez vencer os Titãs — e ele rompeu as correntes. Nem o rei do Olimpo, que derrotou Cronos e os Titãs, estava a salvo dentro da própria casa.",
    },
  ],
  fecho:
    "O poder que venceu o pai passa a vida com medo do filho. Cada um dos outros onze tronos guarda uma contradição assim.",
};

// Página própria de Poseidon (/poseidon). Identidade visual distinta: o deus
// SUBMERSO. Copy derivada dos 4 vídeos (videos-poseidon.md):
//   Vídeo 1 (Hero submerso)     → Abertura   → v-po-hero.mp4
//   Vídeo 2 (golpe do tridente) → O mito     → v-po-golpe.mp4  (painel vaso PO-03)
//   Vídeo 3 (perda de Atenas)   → O clímax   → v-po-derrota.mp4
//   Vídeo 4 (loop de fundo)     → atmosfera  → v-po-loop.mp4
// Enquanto os .mp4 novos não são gerados, a página cai no que já existe
// (v-po.mp4, o retrato que respira / po-02.png). Regra de composição: água,
// profundidade, nada nivelado — expressa por luz cáustica e camadas, não por "tilt".
export const poseidon = {
  code: "po",
  nameGr: "Ποσειδῶν",
  nameLat: "Poseidon",
  numeral: "III",
  accent: "#1F4A3D", // verde-garrafa
  accentBright: "#3E8F74", // cáustica / espuma
  seal: `${A}/poseidon/po-01.png`,
  busto: `${A}/videos/v-po-hero.mp4`, // o busto submerso foto-real (invocação)
  epithet: "O senhor do mar que perdeu a cidade que mais quis.",
  thesis:
    "Poseidon tinha tudo que deveria bastar: o mar, os cavalos, o terremoto, um tridente capaz de rachar a terra. E ainda assim perdeu a única disputa que quis vencer — não por força menor, mas porque ofereceu o que impressiona, contra quem ofereceu o que permanece.",
  atos: [
    {
      n: "BEAT I",
      titulo: "A divisão do mundo",
      frase: "Quando o mundo foi dividido, ele recebeu tudo aquilo que não permanece imóvel.",
      video: `${A}/videos/v-poseidon-b1.mp4`,
      texto:
        "Depois da Titanomaquia, os três irmãos dividem o universo: Zeus fica com o céu, Hades com o mundo dos mortos, e Poseidon com o mar. Não um subordinado — um dos três grandes soberanos, senhor de tudo o que se move e nunca fica parado.",
    },
    {
      n: "BEAT II",
      titulo: "O Sacudidor da Terra",
      frase: "O chão também tremia quando o mar obedecia.",
      video: `${A}/videos/v-poseidon-b2.mp4`,
      texto:
        "Poseidon não governa só o oceano: domina terremotos, tempestades, fontes, cavalos e naufrágios. A mesma força que ergue uma onda pode fazer a terra perder o chão. Por isso o chamam de Sacudidor da Terra.",
    },
    {
      n: "BEAT III",
      titulo: "A cidade que escolheu Atena",
      frase: "O deus que perdeu uma cidade para uma árvore.",
      video: `${A}/videos/v-poseidon-b3.mp4`,
      texto:
        "Poseidon e Atena disputam uma cidade. Ele golpeia a Acrópole com o tridente e faz jorrar água salgada — e, em algumas versões, oferece o cavalo. Atena planta uma oliveira. A cidade escolhe a árvore, e leva o nome dela até hoje: Atenas. A força impressiona por um dia; a raiz alimenta por milênios.",
    },
    {
      n: "BEAT IV",
      titulo: "Odisseu e a vingança do mar",
      frase: "Um homem feriu seu filho — e o mar fechou todos os caminhos.",
      video: `${A}/videos/v-poseidon-b4.mp4`,
      still: `${A}/storyboard/poseidon-b4.png`, // Seedance insiste em rotacionar; estampa nivelada
      texto:
        "Odisseu cega Polifemo, filho de Poseidon. O ciclope pede vingança, e Poseidon transforma a volta para casa numa viagem de anos — tempestades, navios afundados, todos os caminhos fechados. Um homem feriu seu filho, e o mar inteiro se fechou contra ele.",
    },
    {
      n: "BEAT V",
      titulo: "As muralhas de Troia",
      frase: "O deus construiu as muralhas — e depois enviou o mar contra elas.",
      video: `${A}/videos/v-poseidon-b5.mp4`,
      texto:
        "Obrigados a servir o rei Laomedonte, Poseidon e Apolo erguem as muralhas de Troia. Quando terminam, o rei se recusa a pagar. Poseidon envia um monstro marinho contra a cidade que ele mesmo construiu. Ele ergue, protege — e afunda o que o trai.",
    },
  ],
  fecho:
    "O deus imenso que tinha tudo — e mesmo assim perdeu a cidade que mais quis. A força racha a terra por um dia; a raiz que fica alimenta por milênios.",
};

// Página própria de Hermes (/hermes). O hero de gesso abre a página; o antigo
// vídeo de hero vira manifesto. As seis cenas aprovadas sustentam a narrativa,
// e os cinco vídeos de XILOGRAVURA entram como pranchas dentro do aparato crítico.
// Identidade: diagonais, âmbar, velocidade e travessia — nunca peso de guerreiro.
export const hermes = {
  code: "hm",
  nameGr: "Ἑρμῆς",
  nameLat: "Hermes",
  numeral: "XI",
  gold: "#D9A441",
  goldBright: "#F0C674",
  goldDeep: "#9C6A24",
  preto: "8,7,6",
  hero: {
    id: "hermes-hero",
    art: `${A}/hermes/hermes_hero_gesso.png`,
    alt: "Hermes jovem em forma de estátua de mármore, com pétaso alado e caduceu, avança entre ruínas enquanto aponta o caminho para além do quadro.",
    focus: { desktop: "54% 48%", tablet: "58% 46%", mobile: "61% 44%" },
    tabletArt: "68vw",
    mobileArt: "86vw",
    kicker: "TRONO XI · ἙΡΜΗΣ",
    titulo: "HERMES",
    subtitulo: "O deus das passagens — entre verdade e mentira, vivos e mortos.",
    paragrafo:
      "Mensageiro dos deuses, senhor dos caminhos e guia das almas. Onde existe uma fronteira, Hermes encontra a abertura.",
    marcas: [
      { label: "MOVIMENTO", hint: "o caminho que não permanece" },
      { label: "ASTÚCIA", hint: "a saída antes do confronto" },
      { label: "PASSAGEM", hint: "entre Olimpo, terra e Hades" },
    ],
    ctas: [
      { label: "SEGUIR O MENSAGEIRO", to: "#hermes-manifesto", variant: "solid" },
      { label: "LER O PRIMEIRO ATO", to: "#hermes-scene-01", variant: "ghost" },
    ],
    timeline: { art: 0, push: 0.7, rastro: 1.4, ui: 2.1 },
  },
  manifesto: {
    id: "hermes-manifesto",
    video: `${A}/videos/v-hermes-hero.mp4`,
    poster: `${A}/hermes/h-hero.png`,
    kicker: "O DEUS DAS PASSAGENS",
    titulo: "ENTRE UM MUNDO E OUTRO, SEMPRE EXISTE UMA PASSAGEM.",
    texto:
      "Hermes atravessa aquilo que os outros deuses governam à distância: estradas, portas, acordos, mensagens e a fronteira que separa os vivos dos mortos.",
  },
  cenas: [
    {
      id: "hermes-scene-01",
      kind: "capitulo",
      capitulo: "I",
      art: `${A}/hermes/o_abrigo_da_luz_celestial.png`,
      alt: "Dentro de uma caverna, Maia observa Hermes recém-nascido, inteiramente envolto em tecidos; uma tartaruga se aproxima do berço e antecipa a criação da lira.",
      focus: { desktop: "50% 48%", tablet: "52% 48%", mobile: "55% 48%" },
      tabletArt: "62vw",
      mobileArt: "68vw",
      copy: { cols: "lg:col-span-5", align: "start", vertical: "center", veu: "left" },
      kicker: "ATO I · A CAVERNA DE CILENE",
      titulo: "NASCIDO AO AMANHECER. IMPACIENTE ANTES DO MEIO-DIA.",
      subtitulo: "Maia tentou escondê-lo do Olimpo. O mundo o encontrou primeiro.",
      paragrafo:
        "Hermes mal permanece no berço. À porta da caverna, uma tartaruga oferece o primeiro sinal de sua natureza: tudo o que ele encontra pode atravessar a fronteira entre uma coisa e outra.",
      timeline: { fundo: 0, foco: 0.7, detalhe: 1.5, ui: 2.4 },
    },
    {
      id: "hermes-scene-02",
      kind: "capitulo",
      capitulo: "II",
      art: `${A}/hermes/a_noite_de_hermes_com_o_gado.png`,
      alt: "Hermes conduz o rebanho roubado de Apolo por uma paisagem montanhosa durante a noite, sob uma lua crescente e diante de templos distantes.",
      focus: { desktop: "50% 50%", tablet: "50% 50%", mobile: "47% 50%" },
      tabletArt: "60vw",
      mobileArt: "66vw",
      copy: { cols: "lg:col-start-3 lg:col-span-8", align: "center", vertical: "end", veu: "bottom" },
      kicker: "ATO II · O RASTRO IMPOSSÍVEL",
      titulo: "O REBANHO PARTIU. AS PEGADAS FICARAM APONTANDO PARA TRÁS.",
      subtitulo: "Não bastava roubar o gado. Era preciso roubar também o caminho.",
      paragrafo:
        "Ao anoitecer, Hermes separa cinquenta vacas do rebanho de Apolo, conduz os animais de costas e cobre os próprios pés com sandálias de ramos. A prova permanece no chão — mas conta a história errada.",
      timeline: { fundo: 0, foco: 0.8, detalhe: 1.6, ui: 2.5 },
    },
    {
      id: "hermes-scene-03",
      kind: "capitulo",
      capitulo: "III",
      art: `${A}/hermes/hermes_apresenta_a_lira_a_apolo.png`,
      alt: "Hermes oferece uma única lira a Apolo, que a recebe com a mão estendida; o gado reaparece ao fundo como parte da reconciliação.",
      focus: { desktop: "50% 46%", tablet: "50% 48%", mobile: "50% 48%" },
      tabletArt: "60vw",
      mobileArt: "66vw",
      copy: { cols: "lg:col-start-3 lg:col-span-8", align: "center", vertical: "end", veu: "bottom" },
      kicker: "ATO III · A PRIMEIRA TROCA",
      titulo: "APOLO VEIO BUSCAR O GADO. SAIU LEVANDO A MÚSICA.",
      subtitulo: "A lira transformou o flagrante em acordo.",
      paragrafo:
        "Diante de Zeus, a mentira já não basta. Hermes toca o instrumento que inventou, e a cólera de Apolo muda de natureza. A lira passa para as mãos do deus da música; o rebanho deixa de ser apenas objeto de disputa.",
      timeline: { fundo: 0, foco: 0.8, detalhe: 1.7, ui: 2.6 },
    },
    {
      id: "hermes-scene-04",
      kind: "capitulo",
      capitulo: "IV",
      art: `${A}/hermes/o_herói_e_o_gigante_adormecido.png`,
      alt: "Hermes toca a lira diante de Argos Panoptes adormecido; o gigante tem muitos olhos espalhados pelo corpo, e Io aparece ao lado em forma de vaca.",
      focus: { desktop: "50% 48%", tablet: "50% 50%", mobile: "54% 50%" },
      tabletArt: "62vw",
      mobileArt: "70vw",
      copy: { cols: "lg:col-start-3 lg:col-span-8", align: "center", vertical: "end", veu: "bottom" },
      kicker: "ATO IV · ARGEIFONTES",
      titulo: "CEM OLHOS VIGIAVAM IO. HERMES NÃO PRECISOU ENFRENTAR NENHUM.",
      subtitulo: "A música realizou o que a força anunciaria cedo demais.",
      paragrafo:
        "Argos Panoptes guardava Io, transformada em vaca. Hermes se aproxima como viajante, prolonga a conversa e toca até a vigilância ceder. A vitória chega antes do golpe.",
      timeline: { fundo: 0, foco: 0.8, detalhe: 1.6, ui: 2.5 },
    },
    {
      id: "hermes-scene-05",
      kind: "capitulo",
      capitulo: "V",
      art: `${A}/hermes/guia_das_almas_para_o_portal.png`,
      alt: "Hermes abre o caminho para uma fila de almas que segue entre ruínas e névoa em direção a um portal luminoso no limite do mundo dos mortos.",
      focus: { desktop: "50% 48%", tablet: "50% 48%", mobile: "44% 50%" },
      tabletArt: "62vw",
      mobileArt: "72vw",
      copy: { cols: "lg:col-start-8 lg:col-span-5", align: "start", vertical: "start", veu: "top-right" },
      kicker: "ATO V · ΨΥΧΟΠΟΜΠΟΣ",
      titulo: "ATÉ OS MORTOS PRECISAVAM DE ALGUÉM QUE SOUBESSE O CAMINHO.",
      subtitulo: "Hermes não julga as almas. Ele as conduz.",
      paragrafo:
        "Com o bastão nas mãos, reúne os mortos e segue à frente. A travessia passa pelo oceano, pelas portas do Sol e pelo povo dos sonhos, até o prado onde permanecem as sombras.",
      timeline: { fundo: 0, foco: 0.8, detalhe: 1.8, ui: 2.7 },
    },
    {
      id: "hermes-scene-06",
      kind: "capitulo",
      capitulo: "VI",
      art: `${A}/hermes/o_mensageiro_entre_dois_mundos.png`,
      alt: "Hermes atravessa uma fenda entre dois mundos: à esquerda, templos, montanhas e vegetação; à direita, ruínas escuras, água subterrânea e o caminho para o submundo.",
      focus: { desktop: "50% 48%", tablet: "50% 50%", mobile: "50% 50%" },
      tabletArt: "62vw",
      mobileArt: "72vw",
      copy: { cols: "lg:col-span-5", align: "start", vertical: "center", veu: "left" },
      kicker: "EPÍLOGO · O LIMIAR",
      titulo: "NENHUM REINO O CONTÉM POR INTEIRO.",
      subtitulo: "Olimpo, terra e Hades são territórios. Para Hermes, são percurso.",
      paragrafo:
        "Ele leva ordens dos deuses, acompanha viajantes, protege trocas e entra no domínio dos mortos. Seu poder não está em possuir um lugar, mas em poder deixá-lo — e alcançar o próximo.",
      timeline: { fundo: 0, foco: 0.8, detalhe: 1.7, ui: 2.6 },
    },
  ],
  notas: [
    {
      id: "hm-nota-01",
      apos: "hermes-scene-01",
      numeral: "I",
      titulo: "Nasceu pela manhã. Ao meio-dia, a lira já existia.",
      resumo: "O hino não descreve uma infância: descreve um único dia que já contém o deus inteiro.",
      painel: {
        poster: `${A}/hermes/hermes_lira_gado_e_caduceu.png`,
        legenda:
          "Prancha visual: lira, rebanho e caduceu reúnem os sinais que Hermes conquista antes que seu primeiro dia termine.",
      },
      blocos: [
        {
          texto:
            "Maia vivia numa caverna profunda e evitava a companhia dos deuses. É ali que Hermes nasce. O poema o apresenta de imediato como astuto, ladrão, condutor de gado, portador de sonhos e vigia da noite — os títulos vêm antes das façanhas.",
          fonte: { autor: "Hino Homérico a Hermes", obra: "Hino IV", loc: "1–18" },
        },
        {
          texto:
            "Ao atravessar a porta, ele encontra a tartaruga viva e a saúda como um sinal de boa sorte. Depois transforma o casco em caixa de ressonância, prende sete cordas e faz da criatura a primeira lira.",
          fonte: { autor: "Hino Homérico a Hermes", obra: "Hino IV", loc: "22–61" },
        },
        {
          texto:
            "A imagem preserva o instante anterior: a tartaruga ainda é presságio, não instrumento. É a passagem que interessa — matéria encontrada, forma inventada, som que ainda não existia.",
        },
      ],
    },
    {
      id: "hm-nota-02",
      apos: "hermes-scene-02",
      numeral: "II",
      titulo: "As pegadas apontavam para o lugar errado",
      resumo: "Hermes não apagou a prova. Fez a prova mentir.",
      painel: {
        src: `${A}/videos/v-hermes-b1`,
        poster: `${A}/hermes/v-hermes-b1-poster.jpg`,
        formatos: ["mp4"],
        legenda:
          "Prancha audiovisual: Hermes conduz o rebanho de Apolo durante a noite e faz do caminho parte do engano.",
      },
      blocos: [
        {
          texto:
            "Ao pôr do sol, Hermes separa cinquenta vacas do rebanho divino. Faz os animais caminhar de costas, inverte os sinais dos cascos e amarra ramos de tamargueira e murta sob os próprios pés.",
          fonte: { autor: "Hino Homérico a Hermes", obra: "Hino IV", loc: "68–86" },
        },
        {
          texto:
            "Quando Apolo encontra o rastro, vê pegadas de gado voltadas para o prado de onde as vacas haviam saído. O caminho existe, mas aponta para a origem — não para o destino.",
          fonte: { autor: "Hino Homérico a Hermes", obra: "Hino IV", loc: "201–226" },
        },
        {
          texto:
            "De volta à caverna, Hermes se enrola nos panos e nega tudo: diz que nasceu ontem, tem os pés macios e só conhece vacas por ouvir falar. A primeira defesa do deus da linguagem é uma performance.",
          fonte: { autor: "Hino Homérico a Hermes", obra: "Hino IV", loc: "235–278" },
        },
      ],
    },
    {
      id: "hm-nota-03",
      apos: "hermes-scene-03",
      numeral: "III",
      titulo: "A acusação terminou numa troca",
      resumo: "A lira não absolveu Hermes. Mudou aquilo que Apolo desejava.",
      painel: {
        src: `${A}/videos/v-hermes-b2`,
        poster: `${A}/hermes/v-hermes-b2-poster.jpg`,
        formatos: ["mp4"],
        legenda:
          "Prancha audiovisual: a invenção da lira converte a disputa pelo gado numa aliança entre os dois filhos de Zeus.",
      },
      blocos: [
        {
          texto:
            "Hermes toma a lira e canta a origem dos deuses. O som atinge Apolo antes de qualquer argumento: o deus ri de alegria e deseja aquela música.",
          fonte: { autor: "Hino Homérico a Hermes", obra: "Hino IV", loc: "414–433" },
        },
        {
          texto:
            "A troca é explícita. Hermes entrega a lira; Apolo põe em suas mãos o chicote brilhante e lhe confia o cuidado dos rebanhos. O objeto roubado e o objeto inventado entram no mesmo acordo.",
          fonte: { autor: "Hino Homérico a Hermes", obra: "Hino IV", loc: "433–502" },
        },
        {
          texto:
            "Zeus se alegra e faz dos dois amigos. A integração de Hermes ao Olimpo não acontece apesar da astúcia, mas por meio dela: ele converte conflito em vínculo.",
          fonte: { autor: "Hino Homérico a Hermes", obra: "Hino IV", loc: "503–512" },
        },
      ],
    },
    {
      id: "hm-nota-04",
      apos: "hermes-scene-04",
      numeral: "IV",
      titulo: "Duas mortes para o mesmo gigante",
      resumo: "A música pertence à versão mais famosa — mas não à mais antiga que chegou até nós.",
      painel: {
        src: `${A}/videos/v-hermes-b3`,
        poster: `${A}/hermes/v-hermes-b3-poster.jpg`,
        formatos: ["mp4"],
        legenda:
          "Prancha audiovisual: Hermes prolonga a música até que a vigilância de Argos ceda e Io possa ser libertada.",
      },
      blocos: [
        {
          texto:
            "Na Biblioteca de Apolodoro, Zeus ordena que Hermes roube a vaca. Como o segredo é denunciado, Hermes mata Argos com uma pedra; daí o epíteto Argeifontes.",
          fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "II.1.3" },
        },
        {
          texto:
            "A cena da música, da conversa prolongada e dos olhos vencidos pelo sono vem da narrativa de Ovídio. É ela que organiza a imagem: a astúcia reduz cem sentinelas a um corpo adormecido.",
          fonte: { autor: "Ovídio", obra: "Metamorfoses", loc: "I.668–723" },
        },
      ],
      ressalva: {
        rotulo: "DUAS TRADIÇÕES",
        texto:
          "Ovídio escreve em latim, séculos depois das fontes gregas. Sua versão não deve apagar a pedra de Apolodoro; as duas são mantidas porque mostram como o mesmo epíteto recebeu narrativas diferentes.",
        fonte: { autor: "Ovídio", obra: "Metamorfoses", loc: "I.668–723" },
      },
    },
    {
      id: "hm-nota-05",
      apos: "hermes-scene-05",
      numeral: "V",
      titulo: "O deus que conhece a estrada dos mortos",
      resumo: "A Odisseia começa o último canto com Hermes reunindo almas.",
      termo: {
        grego: "ψυχοπομπός",
        translit: "psychopompós",
        glosa: "condutor de almas",
      },
      painel: {
        src: `${A}/videos/v-hermes-b4`,
        poster: `${A}/hermes/v-hermes-b4-poster.jpg`,
        formatos: ["mp4"],
        legenda:
          "Prancha audiovisual: o mensageiro conduz uma passagem que nenhum mortal poderia percorrer sozinho.",
      },
      blocos: [
        {
          texto:
            "Hermes chama as almas com o bastão de ouro. Elas o seguem como morcegos que guincham dentro de uma caverna, descendo juntas para a morada dos mortos.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "XXIV.1–10" },
        },
        {
          texto:
            "O percurso tem geografia própria: as águas do Oceano, a Rocha Branca, as portas do Sol, o povo dos sonhos e, por fim, o prado de asfódelos onde habitam as sombras.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "XXIV.10–14" },
        },
        {
          texto:
            "O Hino a Hermes encerra atribuindo a ele uma função exclusiva: ser o mensageiro designado para Hades. A passagem não é exceção em sua história; é ofício.",
          fonte: { autor: "Hino Homérico a Hermes", obra: "Hino IV", loc: "568–573" },
        },
      ],
    },
    {
      id: "hm-nota-06",
      apos: "hermes-scene-06",
      numeral: "VI",
      titulo: "Seu domínio não é um lugar",
      resumo: "Hermes recebeu aquilo que existe entre os reinos: mensagem, troca e passagem.",
      painel: {
        src: `${A}/videos/v-hermes-b5`,
        poster: `${A}/hermes/v-hermes-b5-poster.jpg`,
        formatos: ["mp4"],
        legenda:
          "Prancha audiovisual: Hermes aparece onde uma mensagem, uma fuga ou um resgate precisa atravessar limites.",
      },
      blocos: [
        {
          texto:
            "Apolo reconhece nele uma função entre os mortais: estabelecer atos de troca. O deus do comércio nasce no mesmo acordo que encerra o roubo.",
          fonte: { autor: "Hino Homérico a Hermes", obra: "Hino IV", loc: "513–520" },
        },
        {
          texto:
            "Quando Deméter se recusa a retornar ao convívio dos deuses, Zeus envia Hermes ao Érebo. Ele entra no domínio de Hades, entrega a ordem e conduz Perséfone de volta à luz.",
          fonte: { autor: "Hino Homérico a Deméter", obra: "Hino II", loc: "334–385" },
        },
        {
          texto:
            "Na Ilíada, é também Hermes quem retira Ares do jarro de bronze onde os Aloídas o mantiveram preso por treze meses. Informação e entrada silenciosa resolvem o que a força não resolveu.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "V.385–391" },
          remissao: { label: "Ares · quem o retirou do jarro", to: "/ares#ares-scene-06" },
        },
      ],
    },
  ],
  legado: {
    id: "hermes-legado",
    kicker: "LEGADO · AQUELE QUE SEMPRE CHEGA",
    titulo: "NENHUMA FRONTEIRA O RETÉM",
    texto:
      "Hermes aparece quando alguém precisa atravessar, entregar, negociar, escapar ou encontrar o caminho. Seu poder não ergue muralhas: descobre a abertura.",
  },
  colofao: {
    creditos: [
      { papel: "Texto e pesquisa", valor: "Gabriel" },
      { papel: "Desenvolvimento", valor: "React · Vite · Tailwind" },
      {
        papel: "Ilustrações",
        valor: "geradas com IA, sob direção e composição do autor",
      },
    ],
    nota:
      "As sete imagens e as pranchas audiovisuais são leituras de fontes antigas, não reconstituições históricas. Onde as tradições divergem, o aparato mantém a divergência visível.",
  },
};

// Página própria de Hefesto (/hefesto). História em XILOGRAVURA (5 beats), busto foto-real
// como invocação. Identidade: brasa, cobre, forja — chiaroscuro, calor, faíscas.
export const hefesto = {
  code: "he",
  nameGr: "Ἥφαιστος",
  nameLat: "Hefesto",
  numeral: "X",
  accent: "#D96C1F", // brasa
  accentBright: "#F0862E",
  busto: `${A}/videos/v-hefesto-hero.mp4`,
  epithet: "O deus que caiu do céu e construiu o que o céu precisava.",
  thesis:
    "Aquilo que o Olimpo rejeitou foi exatamente o que o sustentou. Hefesto caiu do céu e, do fundo da própria dor, forjou tudo o que o céu precisava — as armas, os tronos, os escudos. O único deus que trabalha, e o único de quem todos dependem.",
  atos: [
    {
      n: "BEAT I",
      titulo: "A queda do Olimpo",
      frase: "O deus que caiu antes de poder pertencer.",
      video: `${A}/videos/v-hefesto-b1.mp4`,
      texto:
        "Hefesto é lançado do Olimpo — em algumas versões por Hera, envergonhada de um filho imperfeito; em outras por Zeus. A queda o fere e deixa uma marca permanente na perna. Antes mesmo de poder pertencer, ele já carrega no corpo a violência do próprio céu que o rejeitou.",
    },
    {
      n: "BEAT II",
      titulo: "A forja escondida",
      frase: "Onde os outros tinham tronos, ele construiu uma oficina.",
      video: `${A}/videos/v-hefesto-b2.mp4`,
      texto:
        "Longe do Olimpo, Hefesto transforma a dor em técnica. Fogo, martelo, bigorna, metal batido. Enquanto os outros deuses governam por beleza, guerra ou autoridade, ele governa por capacidade — o único que cria, o único que trabalha.",
    },
    {
      n: "BEAT III",
      titulo: "O trono de Hera",
      frase: "O presente que se tornou prisão.",
      video: `${A}/videos/v-hefesto-b3.mp4`,
      texto:
        "Hefesto forja um trono magnífico e o envia de presente a Hera — a mãe que o expulsou. Quando ela se senta, laços invisíveis a prendem, e nenhum deus consegue soltá-la. O Olimpo é obrigado a negociar e a trazê-lo de volta. A vingança dele não tem punho: tem engenharia.",
    },
    {
      n: "BEAT IV",
      titulo: "O ferreiro dos deuses",
      frase: "Tudo o que os deuses empunhavam passou por suas mãos.",
      video: `${A}/videos/v-hefesto-b4.mp4`,
      texto:
        "Armas, armaduras, joias, tronos, escudos, autômatos de bronze, obras impossíveis. O raio de Zeus, o tridente de Poseidon, a égide de Atena — tudo saiu da forja dele. O deus rejeitado se tornou o indispensável: ninguém empunha nada divino que ele não tenha feito.",
    },
    {
      n: "BEAT V",
      titulo: "A rede invisível",
      frase: "O que ele não venceu pela força, venceu pela invenção.",
      video: `${A}/videos/v-hefesto-b5.mp4`,
      texto:
        "Ao descobrir o caso entre Afrodite, sua esposa, e Ares, o deus da guerra, Hefesto forja uma rede metálica quase invisível e impossível de romper. Quando os dois se encontram, ficam presos diante de todos os deuses. O ferreiro humilhado venceu o deus da guerra sem desferir um só golpe.",
    },
  ],
  fecho: "O fogo feriu seu corpo — e forjou seu poder. Aquilo que caiu foi o que sustentou o céu.",
};

// Página própria de Afrodite (/afrodite). 5 beats — o desejo como força que aproxima,
// rompe juramentos e provoca guerras. Identidade: cobre-rosa, curvas, nenhuma linha
// reta (único deus com border-radius). Assets: invocação usa v-af-hero (GESSO i2v
// do retrato af-02, Seedance); os 5 beats usam v-afrodite-b1..b5 (VASO 9:16, 10s,
// Seedance t2v — prompts em afrodite-videos-5-beats.md).
export const afrodite = {
  code: "af",
  nameGr: "Ἀφροδίτη",
  nameLat: "Afrodite",
  numeral: "IX",
  accent: "#C98474", // cobre-rosa
  accentBright: "#E8AC97",
  busto: `${A}/videos/v-af-hero-v4.mp4`, // retrato GESSO animado (16:9, busto à direita)
  bustoPoster: `${A}/videos/v-af-hero-v4-poster.jpg`, // primeiro frame instantâneo do hero
  epithet: "A que nasceu da espuma — mais antiga que qualquer juramento.",
  thesis:
    "Afrodite não governa o amor tranquilo. Ela governa o desejo: a força que aproxima corpos, rompe juramentos, produz vida e provoca guerras. Tudo o que ela toca cria atração, disputa, ciúme ou perda.",
  atos: [
    {
      n: "BEAT I",
      titulo: "A que nasceu da espuma",
      frase: "Antes que alguém pudesse prometer amor, o desejo já havia nascido.",
      video: `${A}/videos/v-afrodite-b1.mp4`, // VASO 9:16 — nascimento da espuma
      texto:
        "Cronos mutila Urano e lança seus restos ao mar. Da espuma formada sobre as águas surge Afrodite, já adulta — ela não tem infância, não aprende a ser desejável: nasce como a própria manifestação do desejo. O mar a conduz a Citera e depois a Chipre; onde pisa, flores surgem, e as Horas a vestem e a conduzem até os deuses. O desejo existe antes de qualquer regra que tente controlá-lo.",
      nota: "Homero conta outra versão — filha de Zeus e Dione. A espuma é a versão de Hesíodo: mais antiga, mais violenta, mais forte.",
    },
    {
      n: "BEAT II",
      titulo: "O casamento sem desejo",
      frase: "A deusa que despertava o desejo em todos foi entregue a uma união que não desejava.",
      video: `${A}/videos/v-afrodite-b2.mp4`, // VASO 9:16 — casamento sem desejo
      texto:
        "A deusa capaz de despertar desejo em deuses e mortais é unida a Hefesto, o ferreiro do Olimpo. Ele é trabalho, técnica, permanência, metal. Ela é impulso, atração, instabilidade, movimento. Não é a bela obrigada a casar com o feio — é algo mais profundo: o deus que fabrica vínculos permanentes foi unido à deusa de tudo aquilo que não aceita permanecer preso.",
      transicao: "A aliança metálica do casamento se estica — e vira os primeiros fios da rede de Hefesto.",
    },
    {
      n: "BEAT III",
      titulo: "Ares e a rede invisível",
      frase: "O desejo e a guerra foram aprisionados por uma obra de precisão.",
      video: `${A}/videos/v-afrodite-b3.mp4`, // VASO 9:16 — Ares e a rede
      texto:
        "Afrodite envolve-se com Ares, o deus do impulso guerreiro. Hélio, que tudo observa do alto, revela o encontro a Hefesto. O ferreiro não enfrenta Ares pela força: forja uma rede tão fina que parece invisível e tão resistente que nenhum deus consegue rompê-la. Quando os dois se encontram, a rede se fecha — e Hefesto chama os demais deuses para testemunhar. Desejo, impulso e técnica: a inteligência captura aquilo que a força não consegue controlar.",
      links: [
        { tag: "TRONO X · HEFESTO", label: "A rede que nenhum deus conseguiu romper", to: "/hefesto" },
        { tag: "TRONO VIII · ARES", label: "A força capturada sem combate", to: "/ares" }, // rota entra quando a página do Ares existir
      ],
    },
    {
      n: "BEAT IV",
      titulo: "Adônis e a beleza que morreu",
      frase: "Ela podia fazer qualquer coração desejá-la — mas não podia ordenar que um coração continuasse batendo.",
      video: `${A}/videos/v-afrodite-b4.mp4`, // VASO 9:16 — Adônis
      texto:
        "Adônis é um jovem mortal de beleza extraordinária, e Afrodite tenta protegê-lo dos perigos da caça. Apesar dos avisos, ele enfrenta um javali e é mortalmente ferido. Ela corre até ele — e chega tarde demais. O sangue do jovem mistura-se à terra e dá origem à anêmona. É aqui que a deusa encontra o que seu poder não domina: ela pode gerar desejo, mas não pode obrigar a vida a permanecer.",
      transicao: "Uma das flores nascidas do sangue doura-se — e vira a maçã da Discórdia.",
    },
    {
      n: "BEAT V",
      titulo: "A promessa que incendiou Troia",
      frase: "Afrodite prometeu uma mulher. O preço foi uma cidade.",
      video: `${A}/videos/v-afrodite-b5.mp4`, // VASO 9:16 — a maçã de Troia
      texto:
        "No casamento de Peleu e Tétis, Éris lança uma maçã dourada destinada 'à mais bela'. Hera promete poder e domínio; Atena, sabedoria e vitória; Afrodite, o amor da mulher mais bela do mundo. Páris escolhe Afrodite. A mulher prometida é Helena, esposa de Menelau — e a escolha leva Páris a Esparta, a um juramento rompido e a mil navios. Ela não empunhou arma nenhuma: ofereceu desejo, e os mortais o transformaram em exércitos e destruição.",
    },
  ],
  fecho:
    "Afrodite não ordena que alguém ame. Ela cria a distância entre aquilo que uma pessoa possui e aquilo que passa a desejar. Dessa distância nascem encontros, filhos, poemas, traições e guerras.",
  fechoFinal: "Nenhuma muralha é forte o bastante quando o desejo já entrou na cidade.",
};

// Página própria de Apolo (/apolo). 5 beats VASO (roteiro: apollo-videos-5-beats.md)
// — a luz como ordem, precisão e frieza divina. Tema central: verdade sem escuta
// (o beat V, Cassandra, é o principal — conecta ao núcleo de Troia). Identidade:
// dourado-solar, simetria, linhas retas (contraponto às curvas de Afrodite).
// Assets: hero GESSO i2v do retrato ap-02 (v-ap-hero.mp4); beats v-apolo-b1..b5.
export const apolo = {
  code: "ap",
  nameGr: "Ἀπόλλων",
  nameLat: "Apolo",
  numeral: "VI",
  gold: "#E5C687",
  goldBright: "#F4E2B0",
  goldDeep: "#A87424",
  preto: "7,7,6",
  hero: {
    id: "apolo-hero",
    art: `${A}/apolo/apolo_hero_da_luz_e_da_musica.png`,
    alt: "Apolo em forma de estátua iluminada, sentado entre ruínas com uma lira na mão e o arco ao lado; um disco de luz se abre atrás de sua cabeça.",
    focus: { desktop: "50% 48%", tablet: "45% 48%", mobile: "42% 48%" },
    kicker: "TRONO VI · ἈΠΌΛΛΩΝ",
    titulo: "APOLO",
    subtitulo: "A luz que revela — e a medida que não admite contestação.",
    paragrafo:
      "Arqueiro, músico e senhor do oráculo. Em Apolo, beleza e precisão pertencem à mesma distância divina.",
    marcas: [
      { label: "LUZ", hint: "aquilo que torna visível" },
      { label: "MÚSICA", hint: "a ordem convertida em som" },
      { label: "PROFECIA", hint: "a verdade antes do acontecimento" },
    ],
    ctas: [
      { label: "SEGUIR A LUZ", to: "#apolo-manifesto", variant: "solid" },
      { label: "LER O PRIMEIRO ATO", to: "#apolo-scene-01", variant: "ghost" },
    ],
  },
  manifesto: {
    id: "apolo-manifesto",
    art: `${A}/apolo/ap-02.png`,
    alt: "Rosto de uma estátua de Apolo coroada de louros, com olhos vazios e um sol intenso surgindo atrás da cabeça.",
    focus: { desktop: "50% 36%", tablet: "50% 32%", mobile: "50% 28%" },
    kicker: "O DEUS DA MEDIDA",
    titulo: "TODA LUZ PROJETA UMA SENTENÇA.",
    texto:
      "Apolo cura e envia a peste, inspira a música e pune o desafino, revela o futuro e decide se a verdade encontrará escuta. Sua ordem nunca é neutra.",
  },
  cenas: [
    {
      id: "apolo-scene-01",
      kind: "capitulo",
      capitulo: "I",
      art: `${A}/apolo/o_nascimento_de_apolo_em_delos.png`,
      alt: "Leto segura Apolo recém-nascido no centro de uma ilha rochosa; Ártemis e outras deusas a cercam enquanto a luz do bebê alcança o mar e templos distantes.",
      focus: { desktop: "50% 48%", tablet: "50% 48%", mobile: "51% 48%" },
      copy: { cols: "lg:col-start-3 lg:col-span-8", align: "center", vertical: "end", veu: "bottom" },
      kicker: "ATO I · DELOS",
      titulo: "ANTES DE ILUMINAR O MUNDO, PRECISOU ENCONTRAR ONDE NASCER.",
      subtitulo: "Nenhuma terra ousava receber Leto. A ilha mais pobre aceitou o risco.",
      paragrafo:
        "Delos era rochosa, pequena e temia ser abandonada assim que o deus visse a luz. Leto jurou que ali existiria o primeiro altar de Apolo. A ilha recebeu o nascimento — e conquistou um lugar no centro do culto.",
    },
    {
      id: "apolo-scene-02",
      kind: "capitulo",
      capitulo: "II",
      art: `${A}/apolo/apolo_derrota_piton_em_delfos.png`,
      alt: "Apolo tensiona o arco diante de uma serpente colossal nas ruínas de Delfos; a flecha e o halo solar formam uma única linha de luz.",
      focus: { desktop: "50% 48%", tablet: "52% 48%", mobile: "55% 48%" },
      copy: { cols: "lg:col-span-5", align: "start", vertical: "center", veu: "left" },
      kicker: "ATO II · O ORÁCULO",
      titulo: "O SANTUÁRIO JÁ TINHA UMA VOZ. APOLO TOMOU O LUGAR.",
      subtitulo: "Antes do trípode e da sacerdotisa, havia uma serpente guardando a passagem.",
      paragrafo:
        "A tradição posterior chama o guardião de Píton e atribui o oráculo a Têmis. Apolo mata a serpente com suas flechas e assume Delfos. A profecia passa a falar sob sua medida.",
    },
    {
      id: "apolo-scene-03",
      kind: "capitulo",
      capitulo: "III",
      art: `${A}/apolo/dafne_se_torna_loureiro.png`,
      alt: "Apolo alcança Dafne no instante em que os braços da ninfa se tornam ramos de loureiro e os pés criam raízes junto ao rio.",
      focus: { desktop: "50% 48%", tablet: "50% 48%", mobile: "53% 48%" },
      copy: { cols: "lg:col-start-8 lg:col-span-5", align: "start", vertical: "start", veu: "top-right" },
      kicker: "ATO III · DAFNE",
      titulo: "O DEUS QUE ACERTA À DISTÂNCIA NÃO CONSEGUIU SER AMADO.",
      subtitulo: "A perseguição terminou quando o corpo de Dafne deixou de ser alcançável.",
      paragrafo:
        "Ferido pelo desejo, Apolo corre; ferida pela repulsa, Dafne foge. Quando ele se aproxima, a ninfa pede que sua forma seja destruída. Pele vira casca, braços viram ramos — e o loureiro nasce da recusa.",
    },
    {
      id: "apolo-scene-04",
      kind: "capitulo",
      capitulo: "IV",
      art: `${A}/apolo/o_concurso_de_apolo_e_marsias.png`,
      alt: "Apolo toca a lira diante de Mársias, que responde com uma flauta dupla; as Musas observam o concurso entre ruínas e loureiros.",
      focus: { desktop: "50% 48%", tablet: "50% 48%", mobile: "48% 48%" },
      copy: { cols: "lg:col-start-3 lg:col-span-8", align: "center", vertical: "end", veu: "bottom" },
      kicker: "ATO IV · MÁRSIAS",
      titulo: "A REGRA DO CONCURSO JÁ CONTINHA A PUNIÇÃO.",
      subtitulo: "A música foi julgada dentro de uma medida escolhida pelo próprio deus.",
      paragrafo:
        "Mársias aceita que o vencedor faça o que quiser com o derrotado. Apolo vira a lira e continua tocando; a flauta não pode repetir o gesto. A superioridade divina se confirma por uma regra impossível — e o castigo ultrapassa a música.",
    },
    {
      id: "apolo-scene-05",
      kind: "capitulo",
      capitulo: "V",
      art: `${A}/apolo/cassandra_diante_da_profecia.png`,
      alt: "Apolo permanece junto ao templo enquanto Cassandra ergue os braços diante de uma multidão que se afasta; o brilho do oráculo divide os dois.",
      focus: { desktop: "50% 48%", tablet: "50% 48%", mobile: "46% 48%" },
      copy: { cols: "lg:col-span-5", align: "start", vertical: "center", veu: "left" },
      kicker: "ATO V · CASSANDRA",
      titulo: "O DOM PERMANECEU. A CREDIBILIDADE FOI RETIRADA.",
      subtitulo: "Ela continuaria dizendo a verdade — e esse seria exatamente o castigo.",
      paragrafo:
        "Cassandra aprende a profetizar e recusa Apolo. O deus não desfaz o conhecimento: retira de suas palavras o poder de persuadir. Ela vê a queda de Troia e a própria morte com clareza, cercada por pessoas que escutam sem acreditar.",
    },
  ],
  notas: [
    {
      id: "ap-nota-01",
      apos: "apolo-scene-01",
      numeral: "I",
      titulo: "Delos aceitou o que as outras terras recusaram",
      resumo: "A ilha não oferece riqueza. Oferece um lugar — em troca de memória e culto.",
      painel: {
        poster: `${A}/apolo/nota_nascimento_em_delos.png`,
        legenda:
          "Prancha de figuras vermelhas: Leto recebe o recém-nascido em Delos, acompanhada por uma arqueira que reúne a presença de Ártemis ao mesmo quadro.",
      },
      blocos: [
        {
          texto:
            "O hino abre separando os nascimentos: Ártemis em Ortígia e Apolo na rochosa Delos, junto à palmeira e às águas do Inopo.",
          fonte: { autor: "Hino Homérico a Apolo", obra: "Hino III", loc: "1–18" },
        },
        {
          texto:
            "Delos teme que o deus despreze seu solo pobre e a afunde no mar. Leto responde com um juramento: ali ficará o primeiro altar perfumado de Apolo e ali os povos levarão sacrifícios.",
          fonte: { autor: "Hino Homérico a Apolo", obra: "Hino III", loc: "19–88" },
        },
        {
          texto:
            "O parto dura nove dias e nove noites. Hera retém Ilítia no Olimpo; as deusas enviam Íris para trazê-la, e só então o nascimento acontece.",
          fonte: { autor: "Hino Homérico a Apolo", obra: "Hino III", loc: "89–126" },
        },
      ],
    },
    {
      id: "ap-nota-02",
      apos: "apolo-scene-02",
      numeral: "II",
      titulo: "A serpente muda de nome conforme a fonte",
      resumo: "O monstro do hino e o Píton de Apolodoro ocupam a mesma imagem, mas não são narrados do mesmo modo.",
      termo: {
        grego: "Πύθων",
        translit: "Pýthōn",
        glosa: "Píton · a serpente associada a Delfos",
      },
      painel: {
        poster: `${A}/apolo/nota_apolo_e_piton.png`,
        legenda:
          "Prancha de figuras vermelhas: Apolo tensiona o arco diante de Píton; templo, sol e loureiro condensam sua tomada de Delfos.",
      },
      blocos: [
        {
          texto:
            "Na parte pítica do Hino a Apolo, o deus mata junto à fonte uma dragonesa que causava males aos homens. O poema não lhe dá o nome Píton.",
          fonte: { autor: "Hino Homérico a Apolo", obra: "Hino III", loc: "300–374" },
        },
        {
          texto:
            "A Biblioteca apresenta outra forma: Têmis já profetizava em Delfos, a serpente Píton impediu Apolo de chegar à fenda, e ele a matou para assumir o oráculo.",
          fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "I.4.1" },
        },
        {
          texto:
            "A imagem combina as tradições deliberadamente. O nome vem de Apolodoro; a conquista sagrada e a paisagem pítica são lidas junto ao hino.",
        },
      ],
    },
    {
      id: "ap-nota-03",
      apos: "apolo-scene-03",
      numeral: "III",
      titulo: "A Dafne que vemos é a de Ovídio",
      resumo: "A metamorfose mais conhecida chega por um poema latino, séculos depois da Grécia arcaica.",
      painel: {
        poster: `${A}/apolo/nota_dafne_e_o_loureiro.png`,
        legenda:
          "Prancha de figuras vermelhas: Apolo interrompe a perseguição diante do corpo de Dafne já convertido em loureiro.",
      },
      blocos: [
        {
          texto:
            "A narrativa começa com duas flechas de Cupido: uma acende o desejo em Apolo; a outra produz em Dafne a recusa do amor.",
          fonte: { autor: "Ovídio", obra: "Metamorfoses", loc: "I.452–473" },
        },
        {
          texto:
            "Dafne pede ao pai que lhe permita permanecer sem casamento. Apolo a vê, deseja e passa a interpretar cada traço como algo destinado à posse.",
          fonte: { autor: "Ovídio", obra: "Metamorfoses", loc: "I.474–503" },
        },
        {
          texto:
            "Quando a fuga termina, Dafne pede que a forma responsável por seu perigo seja destruída. O corpo endurece em casca e folhas; Apolo declara o loureiro sua árvore.",
          fonte: { autor: "Ovídio", obra: "Metamorfoses", loc: "I.504–567" },
        },
      ],
      ressalva: {
        rotulo: "FONTE ROMANA",
        texto:
          "Ovídio escreve em latim no início do Império. A página mantém sua versão porque ela formou a imagem moderna de Dafne, sem apresentá-la como um relato grego arcaico.",
        fonte: { autor: "Ovídio", obra: "Metamorfoses", loc: "I.452–567" },
      },
    },
    {
      id: "ap-nota-04",
      apos: "apolo-scene-04",
      numeral: "IV",
      titulo: "A regra impossível garantia a vitória",
      resumo: "O concurso não terminou apenas porque Apolo tocava melhor; terminou quando ele escolheu uma prova que a flauta não podia cumprir.",
      painel: {
        poster: `${A}/apolo/nota_apolo_e_marsias.png`,
        legenda:
          "Prancha de figuras vermelhas: Apolo e Mársias apresentam lira e flauta diante das Musas que julgam a disputa.",
      },
      blocos: [
        {
          texto:
            "Mársias encontra as flautas que Atena havia abandonado e desafia Apolo. Os dois concordam que o vencedor poderá fazer o que quiser com o derrotado.",
          fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "I.4.2" },
        },
        {
          texto:
            "Apolo vira a lira de cabeça para baixo e continua tocando; exige que Mársias faça o mesmo. Como a flauta depende da boca e da posição dos tubos, a repetição é impossível.",
          fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "I.4.2" },
        },
        {
          texto:
            "A prancha interrompe a narrativa antes do esfolamento. A violência permanece no texto como consequência da regra, não como espetáculo.",
        },
      ],
    },
    {
      id: "ap-nota-05",
      apos: "apolo-scene-05",
      numeral: "V",
      titulo: "A maldição não apagou a profecia",
      resumo: "Cassandra enxerga corretamente. O fracasso foi transferido para quem a escuta.",
      painel: {
        poster: `${A}/apolo/nota_cassandra_e_o_oraculo.png`,
        legenda:
          "Prancha de figuras vermelhas: Apolo entrega o loureiro da profecia a Cassandra diante do trípode; o gesto já contém dom e ruptura.",
      },
      blocos: [
        {
          texto:
            "Apolodoro resume o acordo com crueldade precisa: Apolo ensina a arte profética para obter os favores de Cassandra; depois da recusa, retira da profecia o poder de persuadir.",
          fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "III.12.5" },
        },
        {
          texto:
            "Na tragédia de Ésquilo, Cassandra conta que já possuía a arte quando rompeu a promessa. Desde então, diz ela, não conseguia persuadir ninguém de coisa alguma.",
          fonte: { autor: "Ésquilo", obra: "Agamêmnon", loc: "1202–1213" },
        },
        {
          texto:
            "A mesma cena prova a maldição diante do público: Cassandra anuncia a morte de Agamêmnon com clareza; o coro compreende as palavras, mas não consegue agir.",
          fonte: { autor: "Ésquilo", obra: "Agamêmnon", loc: "1242–1255" },
          remissao: {
            label: "Poseidon · as muralhas de Troia",
            to: "/poseidon#poseidon-scene-06",
          },
        },
      ],
    },
  ],
  legado: {
    id: "apolo-legado",
    kicker: "LEGADO · A LUZ E A DISTÂNCIA",
    titulo: "VER NÃO É O MESMO QUE SER OUVIDO",
    texto:
      "Apolo transforma precisão em autoridade: a flecha encontra o alvo, a lira estabelece a medida e o oráculo revela aquilo que virá. Mas seus mitos perguntam quem controla a regra — e quanto custa contrariá-la.",
  },
  colofao: {
    creditos: [
      { papel: "Texto e pesquisa", valor: "Gabriel" },
      { papel: "Desenvolvimento", valor: "React · Vite · Tailwind" },
      {
        papel: "Ilustrações",
        valor: "geradas com IA, sob direção e composição do autor",
      },
    ],
    nota:
      "As imagens são leituras editoriais de fontes antigas, não reconstituições históricas. As pranchas de figuras vermelhas organizam o aparato crítico; as xilogravuras apresentam o mito como cena.",
  },
};

// Arco da Atena — 6 cenas aprovadas no Canva ("Olimpo — Atena Handoff Definitivo
// 01–06", DAHQhBxTdk8). Cada cena tem página ímpar = tela definitiva e página par =
// handoff técnico; a copy abaixo é a do bloco "CONTEÚDO EDITÁVEL — HTML/CSS" de
// cada handoff, e `timeline` reproduz a timeline aprovada, convertida em animação.
//
// `art` aponta para a BASE LIMPA de cada cena (scene-0N-clean). Regra do handoff:
// do-not-regenerate-art / preserve-composition — a arte nunca é redesenhada; toda
// vida vem de overlays e transform sobre a própria imagem.
//
// `focus` = object-position da arte por breakpoint (art direction do mobile: o
// Canva pede arte recortada em cima, texto abaixo — não só `cover`).
export const atena = {
  code: "at",
  nameGr: "Ἀθηνᾶ",
  nameLat: "Atena",
  numeral: "V",
  accent: "#6B7C3A", // oliva — mantém a coerência com o Panteão
  gold: "#D0A45F", // dourado do handoff (títulos, filetes)
  goldBright: "#E7C179", // dourado de hover/foco
  goldDeep: "#A87A35", // borda de botão em repouso
  epithet: "Deusa da sabedoria, estratégia e guerra justa",
  cenas: [
    {
      id: "scene-01",
      kind: "hero",
      art: `${A}/atena/at-s01.jpg`,
      alt: "Estátua monumental de Atena em mármore, lança na mão direita, escudo com a górgona ao lado e uma coruja pousada no ombro; ao fundo, a Acrópole sob um céu de tempestade rasgado por relâmpagos.",
      focus: { desktop: "50% 50%", mobile: "60% 50%" },
      mobileArt: "72vw",
      eyebrow: "TRONO V · Ἀθηνᾶ",
      titulo: "ATENA",
      subtitulo: "Deusa da sabedoria, estratégia e guerra justa",
      lead: "Sabedoria que protege. Estratégia que transforma.",
      paragrafo: "A deusa que venceu batalhas sem levantar a espada.",
      marcas: [
        { label: "SABEDORIA", hint: "a decisão antes do golpe" },
        { label: "ESTRATÉGIA", hint: "ler o tempo e a forma" },
        { label: "PROTEÇÃO", hint: "a cidade que resiste" },
      ],
      citacao: "A mente é a arma mais afiada de todas.",
      citacaoAutor: "ATENA",
      ctas: [
        { label: "CONHECER HISTÓRIA", to: "#scene-03", variant: "solid" },
        { label: "SÍMBOLOS E CULTOS", to: "#scene-02", variant: "ghost" },
      ],
      // 0.0–0.8s fundo entra em fade · 0.8–1.6s push-in sutil em Atena
      // 1.6–2.4s reflexos na lança, elmo e escudo · 2.4–3.2s UI estabiliza
      timeline: { art: 0, push: 0.8, fx: 1.6, ui: 2.4 },
    },
    {
      id: "scene-02",
      kind: "manifesto",
      art: `${A}/atena/at-s02.jpg`,
      alt: "Elmo coríntio, lança e escudo com a górgona apoiados numa pedra à noite; uma coruja observa do alto, entre névoa e a oliveira sagrada.",
      focus: { desktop: "50% 50%", mobile: "88% 50%" },
      mobileArt: "66vw",
      eyebrow: "MANIFESTO",
      titulo: "Atena não vence pela força. Ela vence antes da batalha começar.",
      subtitulo: "A estratégia nasce da leitura do tempo, da forma e do ponto exato onde agir.",
      paragrafo:
        "Deusa da sabedoria, da estratégia e da guerra justa, Atena não representa o impulso de atacar, mas a capacidade de compreender o momento exato de agir.",
      chamada: "TODA HISTÓRIA DE ATENA COMEÇA COM UMA ESCOLHA.",
      capitulos: [
        { label: "NASCIMENTO", to: "#scene-03" },
        { label: "CIDADE", to: "#scene-04" },
        { label: "ORGULHO", to: "#scene-05" },
        { label: "REFLEXO", to: "#scene-06" },
        { label: "RETORNO", to: "#scene-07" },
      ],
      rodape: ["DESÇA PARA CONHECER", "CADA ESCOLHA"],
      // 0.0–0.8s escurecer final do hero · 0.8–1.8s coruja entra do alto à direita
      // 1.8–2.8s fumaça e partículas lentas · 2.8–3.8s menu migra para a esquerda
      // 3.8s+ linha dourada abre a Cena 03
      timeline: { art: 0, owl: 0.8, smoke: 1.8, ui: 2.8, line: 3.8 },
    },
    {
      id: "scene-03",
      kind: "capitulo",
      capitulo: "I",
      art: `${A}/atena/at-s03.jpg`,
      alt: "Xilogravura dourada: Zeus monumental de frente, a testa aberta por uma fenda de luz, e Atena já adulta e armada surgindo do clarão acima dele; à direita Hefesto ergue o martelo, à esquerda colunas em ruína sob relâmpagos.",
      focus: { desktop: "50% 50%", mobile: "50% 50%" },
      mobileArt: "60vw",
      titulo: "NASCIDA DA MENTE DE ZEUS",
      subtitulo: "Antes de conhecer o mundo, Atena já existia como pensamento.",
      paragrafo:
        "Não nasceu indefesa. Surgiu adulta, armada e consciente — a inteligência transformada em força.",
      // 0.0–0.8s rachadura luminosa · 0.8–1.6s impacto único de Hefesto
      // 1.6–2.8s Atena surge em etapas · 2.8–3.8s Zeus permanece monumental
      timeline: { crack: 0, impact: 0.8, reveal: 1.6, hold: 2.8, ui: 3.8 },
    },
    {
      id: "scene-04",
      kind: "capitulo",
      capitulo: "II",
      art: `${A}/atena/at-s04.jpg`,
      alt: "Xilogravura dourada: Poseidon à esquerda cravando o tridente na rocha e fazendo jorrar o mar; ao centro a oliveira; à direita Atena de lança e escudo, com a cidade ao fundo.",
      focus: { desktop: "50% 50%", mobile: "50% 50%" },
      mobileArt: "58vw",
      titulo: "A CIDADE ESCOLHEU A SABEDORIA",
      subtitulo: "Poseidon ofereceu poder. Atena ofereceu futuro.",
      paragrafo:
        "A cidade não escolheu o presente mais impressionante, mas aquilo que continuaria servindo quando o espetáculo terminasse.",
      // 0.0–0.8s nuvens e mar começam · 0.8–1.8s tridente atinge a rocha
      // 1.8–2.8s ondas crescem sem cobrir Poseidon · 2.8–3.8s oliveira recebe luz quente
      timeline: { sea: 0, trident: 0.8, waves: 1.8, olive: 2.8, ui: 3.8 },
    },
    {
      id: "scene-05",
      kind: "capitulo",
      capitulo: "III",
      art: `${A}/atena/at-s05.jpg`,
      alt: "Xilogravura dourada: Atena à esquerda aponta para a tapeçaria de Aracne, que ocupa o centro com cenas dos deuses; Aracne à direita, entre fios e teias que tomam a oficina.",
      focus: { desktop: "50% 50%", mobile: "50% 50%" },
      mobileArt: "58vw",
      titulo: "ARACNE E A TAPEÇARIA PROIBIDA",
      subtitulo: "Aracne desafiou Atena não apenas com técnica, mas com verdade.",
      paragrafo:
        "Sua tapeçaria revelou os disfarces, abusos e falhas dos deuses. Ela não perdeu por tecer pior — perdeu por mostrar demais.",
      // 0.0–0.8s entrada lenta na oficina · 0.8–1.8s fios vibram
      // 1.8–2.8s tapeçaria ganha profundidade · 2.8–3.8s teias avançam lentamente
      timeline: { room: 0, threads: 0.8, depth: 1.8, webs: 2.8, ui: 3.8 },
    },
    {
      id: "scene-06",
      kind: "capitulo",
      capitulo: "IV",
      art: `${A}/atena/at-s06.jpg`,
      alt: "Xilogravura dourada: Atena à esquerda aponta o caminho; ao centro Perseu avança de costas para o alvo, guiando-se pelo reflexo no escudo polido; à direita Medusa, monumental, entre figuras petrificadas.",
      focus: { desktop: "50% 50%", mobile: "50% 50%" },
      mobileArt: "58vw",
      titulo: "O REFLEXO VENCEU MEDUSA",
      subtitulo: "Atena deu a Perseu o escudo polido como um espelho.",
      paragrafo:
        "Ele não enfrentou o olhar da monstruosidade. Venceu com reflexão, não com força. Assim, Medusa caiu e o perigo virou proteção.",
      // 0.0–0.8s fundo em fade · 0.8–1.8s reflexo percorre o escudo
      // 1.8–2.8s Perseu avança sem olhar diretamente · 2.8–3.8s Medusa permanece indireta
      timeline: { art: 0, mirror: 0.8, advance: 1.8, medusa: 2.8, ui: 3.8 },
    },
    // Ato V — fecha o ciclo. Canva "Olimpo — Atena / Ato V — O Retorno a Ítaca"
    // (DAHQm_6Zrmw). motion-tone do contrato: contemplative-final-act — nada de
    // impacto aqui, o movimento é o mais lento de toda a página.
    {
      id: "scene-07",
      kind: "capitulo",
      capitulo: "V",
      art: `${A}/atena/at-s07.jpg`,
      alt: "Xilogravura dourada: Odisseu de pé sobre as rochas, arco na mão, olhando Ítaca ao amanhecer; a cidade e um navio à esquerda sobre o mar, e Atena atrás dele à direita, translúcida, como presença que guia.",
      focus: { desktop: "50% 50%", mobile: "76% 50%" },
      mobileArt: "66vw",
      titulo: "O RETORNO A ÍTACA",
      subtitulo: "Atena guiou Odisseu de volta à sua terra.",
      paragrafo:
        "Com paciência que vence o tempo e sabedoria que antecipa o destino, Atena conduziu Odisseu entre disfarces, estratégias e silêncio. Não pela força, mas pela mente, ele retomou o que era seu. O ciclo se fecha.",
      // 0.0–0.8s horizonte e mar entram em fade lento · 0.8–1.8s luz do amanhecer
      // cresce atrás de Ítaca · 1.8–2.8s parallax sutil entre Odisseu, Atena e cidade
      // 2.8–3.8s leve brilho dourado contorna Atena · 3.8s+ texto e navegação estabilizam
      timeline: { horizonte: 0, amanhecer: 0.8, parallax: 1.8, halo: 2.8, ui: 3.8 },
    },
  ],

  // ─────────────────────── aparato crítico ───────────────────────
  // As notas são SECTIONS próprias, intercaladas entre as cenas — nunca overlay
  // sobre a arte. A página tem dois públicos: quem rola pelo filme (a nav
  // "PRÓXIMA CENA" pula de cena em cena e ignora as notas) e quem quer a leitura
  // comentada (encontra as notas rolando, ou pelo menu).
  //
  // Regra editorial, e ela não é decorativa: TODA afirmação tem fonte nomeada, e
  // quando a fonte é frágil isso é dito em `ressalva`. Num portfólio que entrega
  // conhecimento, um fato errado custa mais caro que nenhum fato — e a hesitação
  // declarada é justamente o que distingue pesquisa de chute.
  //
  // `apos` = id da cena depois da qual a nota entra.
  notas: [
    {
      id: "nota-01",
      apos: "scene-01",
      numeral: "I",
      titulo: "Como se lê esta imagem",
      resumo: "Arte grega era um código. O deus se reconhecia pelo objeto, não pelo rosto.",
      blocos: [
        {
          texto:
            "O elmo e a lança são de Atena Prómakhos, “a que combate à frente” — a deusa em posição de guarda, nunca de investida.",
          fonte: { autor: "Pausânias", obra: "Descrição da Grécia", loc: "I.28.2" },
        },
        {
          texto:
            "A coruja vem do epíteto homérico glaukôpis, que se traduz por “de olhos brilhantes” ou “de olhos de coruja”. A escolha entre as duas é disputada até hoje — e é dessa ambiguidade que nasce o pássaro.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "passim" },
        },
        {
          texto:
            "O rosto no centro da égide é o gorgoneion: a cabeça decepada da Medusa. Ele não é um ornamento.",
          remissao: { label: "Capítulo IV", to: "#scene-06" },
        },
        {
          texto: "A oliveira é o presente que lhe deu a cidade.",
          remissao: { label: "Capítulo II", to: "#scene-04" },
        },
        {
          texto:
            "A estátua que estas imagens evocam existiu: a Atena Partenos de Fídias, cerca de onze metros de ouro e marfim, dentro do Partenon. Perdeu-se na Antiguidade — só a conhecemos por cópias romanas e por descrição escrita.",
          fonte: { autor: "Pausânias", obra: "Descrição da Grécia", loc: "I.24.5–7" },
        },
      ],
    },
    {
      id: "nota-02",
      apos: "scene-03",
      numeral: "II",
      titulo: "Métis, a mãe engolida",
      resumo: "Atena não nasce da cabeça de Zeus por prodígio. Nasce porque Zeus comeu a mãe dela.",
      termo: {
        grego: "μῆτις",
        translit: "mêtis",
        glosa: "astúcia · inteligência prática · o saber achar a saída",
      },
      blocos: [
        {
          texto:
            "Métis era uma titânide — a inteligência astuta em pessoa — e a primeira esposa de Zeus. Um oráculo avisou que o filho que ela gerasse o destronaria, como ele destronara Crono e Crono destronara Urano. Zeus a engoliu grávida. A filha nasceu depois, pela testa dele.",
          fonte: { autor: "Hesíodo", obra: "Teogonia", loc: "886–900" },
        },
        {
          texto:
            "μῆτις não é a sabedoria contemplativa, que os gregos chamavam de sophía. É inteligência prática: astúcia, senso de oportunidade, a capacidade de encontrar a saída. É a categoria que organiza todas as cenas seguintes — e é o nome próprio da mãe que Zeus tentou apagar.",
        },
        {
          texto:
            "O conceito foi reconstruído em detalhe por Marcel Detienne e Jean-Pierre Vernant, que mostraram como ele atravessa a cultura grega inteira, de Ulisses ao polvo.",
          fonte: { autor: "Detienne & Vernant", obra: "Les ruses de l’intelligence : la mètis des Grecs", loc: "1974" },
        },
      ],
    },
    {
      id: "nota-03",
      apos: "scene-04",
      numeral: "III",
      titulo: "A disputa e seus juízes",
      resumo: "Poseidon ofereceu água salgada a uma cidade cercada de mar.",
      blocos: [
        {
          texto:
            "Poseidon golpeou a rocha da Acrópole e fez brotar uma fonte — de água salgada. Atena plantou a oliveira. A oliveira venceu. Em algumas versões o presente de Poseidon é um cavalo, não a fonte.",
          fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "III.14.1" },
        },
        {
          texto:
            "Quem julgou muda conforme quem conta: Cécrops, o rei nascido meio serpente; os doze deuses reunidos; ou os próprios cidadãos.",
        },
        {
          texto:
            "Do lado de quem perdeu a história é outra — e Atenas guardou a marca do tridente dentro do seu templo mais sagrado.",
          remissao: { label: "Poseidon · o lado que perdeu", to: "/poseidon#po-nota-04" },
        },
      ],
      ressalva: {
        texto:
          "Há uma versão em que homens e mulheres votaram, as mulheres venceram por um voto, e Poseidon inundou a Ática em represália — as atenienses perderam então o direito de votar, de dar o próprio nome aos filhos e de serem chamadas atenienses. É boa demais para ser verdade, e provavelmente é: vem de Varrão, citado por Agostinho no século V d.C., quase mil anos depois da Atenas clássica. Quase certamente etiológica — uma explicação inventada mais tarde para justificar uma exclusão que já existia. Vale menos como história e mais como sintoma.",
        fonte: { autor: "Varrão, apud Agostinho", obra: "A Cidade de Deus", loc: "XVIII.9" },
      },
    },
    {
      id: "nota-04",
      apos: "scene-05",
      numeral: "IV",
      titulo: "O que a tapeçaria mostrava",
      resumo: "Aracne não perdeu no tear. Ovídio faz questão de dizer que a peça dela era impecável.",
      blocos: [
        {
          texto:
            "Atena teceu a própria vitória sobre Poseidon e, nos quatro cantos, mortais punidos por desafiarem deuses. Era um aviso, não um bordado.",
        },
        {
          texto:
            "Aracne teceu os deuses em flagrante: Zeus como touro levando Europa, como cisne com Leda, como chuva de ouro sobre Dânae. Vinte e uma cenas de disfarce e violência — um catálogo.",
        },
        {
          texto:
            "Nem a Inveja, escreve Ovídio, acharia defeito naquele trabalho. A deusa não pôde vencer no tear: rasgou a tapeçaria e bateu na moça com a lançadeira. Aracne se enforcou. Atena transformou a corda em teia e o corpo em aranha.",
          fonte: { autor: "Ovídio", obra: "Metamorfoses", loc: "VI.1–145" },
        },
      ],
    },
    {
      id: "nota-05",
      apos: "scene-06",
      numeral: "V",
      titulo: "Duas Medusas",
      resumo: "A distância entre as duas versões é a distância entre um monstro e uma vítima.",
      blocos: [
        {
          texto:
            "Em Hesíodo, Medusa nasce górgona: uma das três irmãs Fórcides, a única mortal entre elas. Não há culpa, não há castigo — ela é assim desde sempre.",
          fonte: { autor: "Hesíodo", obra: "Teogonia", loc: "270–283" },
        },
        {
          texto:
            "Em Ovídio, sete séculos depois, Medusa era uma mulher de beleza notável. Poseidon a violou dentro do templo de Atena. A deusa, ultrajada com a profanação do seu santuário, transformou os cabelos dela em serpentes. O castigo caiu sobre quem sofreu a violência.",
          fonte: { autor: "Ovídio", obra: "Metamorfoses", loc: "IV.790–803" },
        },
        {
          texto:
            "Ovídio é romano e tardio — não é “a versão grega”. Mas é a que o Ocidente herdou, e é por ela que quase todo mundo conhece Medusa hoje.",
        },
        {
          texto:
            "A cabeça decepada não sai da história: vai para a égide. O rosto no escudo da primeira cena é o dela.",
          remissao: { label: "Voltar ao Hero", to: "#scene-01" },
        },
      ],
    },
    {
      id: "nota-06",
      apos: "scene-07",
      numeral: "VI",
      titulo: "Mentor, e a palavra que ficou",
      resumo: "O ciclo fecha numa palavra que Zeus tentou engolir.",
      blocos: [
        {
          texto:
            "Para guiar Telêmaco e depois o próprio Odisseu, Atena assume a forma de um velho amigo da casa, chamado Méntor. É desse disfarce que vem a palavra mentor — em português, em inglês, em francês.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "II.267–295" },
        },
        {
          texto:
            "Ela nunca luta por ele. Disfarça, aconselha, atrasa, prepara. A ajuda de Atena nunca é força emprestada.",
        },
        {
          texto:
            "No canto XIII, já desmascarada, a deusa ouve Odisseu inventar mais uma mentira — e ri. Diz que é por isso que não consegue largá-lo: os dois são iguais, ambos sabem tramar. Ele é polýmētis, “o de muitos ardis”.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "XIII.291–299" },
        },
        {
          texto: "Polýmētis. A mesma raiz do nome da mãe dela.",
          remissao: { label: "Nota II · Métis", to: "#nota-02" },
        },
      ],
    },
  ],

  // Colofão. A bibliografia NÃO é digitada aqui: `bibliografia()` a deriva das
  // notas acima, para que citar uma fonte nova numa nota já a faça aparecer no
  // rodapé. Uma lista paralela dessincronizaria no primeiro texto que mudasse —
  // e numa página que se sustenta em citação, rodapé errado é pior que ausente.
  colofao: {
    creditos: [
      { papel: "Texto e pesquisa", valor: "Gabriel" },
      { papel: "Desenvolvimento", valor: "React · Vite · Tailwind" },
      {
        papel: "Ilustrações",
        valor: "geradas com IA, sob direção e composição do autor",
      },
    ],
    // A mesma ética das notas aplicada à própria página: o que é frágil, ou
    // apenas construído, é declarado em vez de omitido.
    nota:
      "As sete cenas são leituras de fontes antigas, não reconstituições históricas. Onde as fontes divergem, o aparato mostra as duas.",
  },
};

// Citação de uma fonte no corpo da nota: "Hesíodo, Teogonia 886–900".
export const citar = (f) => `${f.autor}, ${f.obra} ${f.loc}`;

// Bibliografia do colofão: autor + obra, sem localização, deduplicada e
// ordenada. Deriva das próprias notas — citar uma fonte nova numa nota já a faz
// aparecer no rodapé, e é impossível o rodapé divergir do que a página afirma.
export function bibliografia(deus) {
  const porChave = new Map();
  for (const nota of deus.notas) {
    for (const f of [...nota.blocos.map((b) => b.fonte), nota.ressalva?.fonte]) {
      if (f) porChave.set(`${f.autor}|${f.obra}`, { autor: f.autor, obra: f.obra });
    }
  }
  return [...porChave.values()].sort(
    (a, b) => a.autor.localeCompare(b.autor, "pt-BR") || a.obra.localeCompare(b.obra, "pt-BR"),
  );
}

// ─────────────────────────── POSEIDON — landing definitiva ───────────────────────────
// As 7 cenas aprovadas no Canva "Olimpo — Poseidon Handoff Definitivo 01–07"
// (DAHQhUC2TAw, 14 páginas: ímpar = tela definitiva, par = handoff técnico).
// Contrato repetido em todas as cenas:
//   ui-over-art: true · scroll-driven: true · safe-area: 48px
//   do-not-regenerate-art: true · preserve-composition: true · preserve-main-characters: true
// A arte é SEMPRE a base limpa; nada é redesenhado. Todo movimento vem de
// transform/opacity sobre a imagem e de overlays atmosféricos em camada separada.
//
// `copy` guarda a posição do texto lida na tela definitiva de cada cena — o handoff
// é explícito em NÃO repetir o mesmo bloco em todas ("adaptar à composição real
// desta arte"). `focus` traz um object-position por breakpoint, também vindo da
// seção RESPONSIVIDADE de cada handoff.
export const poseidonPagina = {
  code: "po",
  nameGr: "Ποσειδῶν",
  nameLat: "Poseidon",
  numeral: "III",
  // A UI segue o dourado do handoff ("hover dourado luminoso, sem glow exagerado"),
  // igual ao da Atena — é contrato de navegação, não identidade do deus.
  gold: "#D0A45F",
  goldBright: "#E7C179",
  goldDeep: "#A87A35",
  // A identidade do Poseidon vive na atmosfera: verde-garrafa, espuma e o preto
  // frio (azulado) que substitui o preto quente da Atena.
  mar: "#1F4A3D",
  espuma: "#3E8F74",
  preto: "5,8,10",
  cenas: [
    {
      id: "poseidon-scene-01",
      kind: "hero",
      art: `${A}/poseidon/po-s01.png`,
      alt: "Estátua colossal de mármore de Poseidon sentado no trono, à direita do quadro, com o tridente erguido na mão direita, barba longa e olhar voltado ao mar; ruínas e céu de tempestade ao fundo.",
      // Desktop: texto nas colunas 1–5, Poseidon preservado nas 6–12.
      copy: { cols: "lg:col-span-6", align: "start", vertical: "center", veu: "left" },
      focus: { desktop: "58% 46%", tablet: "64% 44%", mobile: "72% 46%" },
      tabletArt: "62vw",
      mobileArt: "88vw",
      kicker: "TRONO III · ΠΟΣΕΙΔΩΝ",
      titulo: "POSEIDON",
      subtitulo: "O deus de tudo aquilo que parece estável até começar a se mover.",
      paragrafo:
        "Senhor do mar, dos terremotos e dos cavalos. Um dos três soberanos que dividiram o cosmos.",
      // 0.0–0.8 céu e mar em fade · 0.8–1.8 push-in no trono · 1.8–2.8 ondas e névoa
      // 2.8–3.6 reflexo percorre o tridente · 3.6+ título, menu e navegação estabilizam
      timeline: { fundo: 0, foco: 0.8, agua: 1.8, detalhe: 2.8, ui: 3.6 },
    },
    {
      id: "poseidon-scene-02",
      kind: "capitulo",
      art: `${A}/poseidon/po-s02.png`,
      alt: "Três tronos de pedra sob uma cúpula estrelada: Zeus à esquerda, Poseidon ao centro com o tridente erguido, Hades à direita; o mar avança na base do trono central.",
      // Desktop: três tronos completos, Poseidon central como ponto focal — a copy
      // desce para o rodapé para não cobrir nenhum dos três.
      copy: { cols: "lg:col-start-3 lg:col-span-8", align: "center", vertical: "end", veu: "bottom" },
      focus: { desktop: "50% 42%", tablet: "50% 40%", mobile: "50% 42%" },
      tabletArt: "58vw",
      mobileArt: "82vw",
      kicker: "ATO I · A PARTILHA",
      titulo: "QUANDO O MUNDO FOI DIVIDIDO",
      subtitulo: "Três irmãos. Três sortes. Três reinos.",
      paragrafo:
        "O céu coube a Zeus. O mundo dos mortos, a Hades. A Poseidon, o mar — tudo aquilo que avança, recua, rompe e retorna.",
      // 0.0–0.8 céu estrelado emerge · 0.8–1.8 parallax entre os três tronos
      // 1.8–2.8 o mar avança na base do trono central · 2.8–3.6 constelações respiram
      timeline: { fundo: 0, foco: 0.8, agua: 1.8, detalhe: 2.8, ui: 3.6 },
    },
    {
      id: "poseidon-scene-03",
      kind: "capitulo",
      art: `${A}/poseidon/po-s03.png`,
      alt: "Xilogravura dourada: Poseidon finca o tridente no chão e a terra racha a partir do ponto de impacto; à esquerda o oceano se ergue em ondas, à direita dois cavalos empinam sobre o solo partido.",
      // Desktop: tridente no eixo central, mar e terra com pesos equivalentes —
      // a copy sobe para o topo esquerdo, sobre o mar, longe dos cavalos.
      copy: { cols: "lg:col-span-6", align: "start", vertical: "start", veu: "top-left" },
      focus: { desktop: "50% 50%", tablet: "48% 52%", mobile: "46% 50%" },
      tabletArt: "60vw",
      mobileArt: "84vw",
      kicker: "ATO II · ENOSÍCTONO",
      titulo: "O CHÃO TAMBÉM TREMIA QUANDO O MAR OBEDECIA",
      subtitulo: "O que no mar vira onda, na terra vira terremoto.",
      paragrafo:
        "O tridente une os dois domínios. À esquerda, o oceano se ergue. À direita, o solo racha e os cavalos sentem a terra perder o equilíbrio.",
      // 0.0–0.8 linhas da xilografia surgem · 0.8–1.8 Poseidon finca o tridente
      // 1.8–2.8 ondas à esquerda e rachaduras à direita · 2.8–3.6 cavalos se movem
      timeline: { fundo: 0, foco: 0.8, agua: 1.8, detalhe: 2.8, ui: 3.6 },
    },
    {
      id: "poseidon-scene-04",
      kind: "capitulo",
      art: `${A}/poseidon/po-s04.png`,
      alt: "Xilogravura dourada: Poseidon à esquerda ergue o tridente sobre a fonte de água salgada; ao centro a oliveira de Atena cresce diante da Acrópole; à direita Atena, de elmo, lança e escudo, observa.",
      // Desktop: Poseidon, oliveira e Atena inteiros; Acrópole visível. Copy no
      // rodapé central, entre os dois deuses, sem cobrir nenhum.
      copy: { cols: "lg:col-start-3 lg:col-span-8", align: "center", vertical: "end", veu: "bottom" },
      focus: { desktop: "50% 46%", tablet: "52% 48%", mobile: "56% 52%" },
      tabletArt: "58vw",
      mobileArt: "82vw",
      kicker: "ATO III · A DISPUTA POR ATENAS",
      titulo: "O DEUS QUE PERDEU UMA CIDADE PARA UMA ÁRVORE",
      subtitulo: "Força impressiona. Sabedoria constrói.",
      paragrafo:
        "Poseidon abriu uma fonte salgada. Atena plantou a oliveira. A cidade escolheu aquilo que continuaria servindo quando o espetáculo terminasse.",
      // 0.0–0.8 cidade e céu entram · 0.8–1.8 tridente atinge a rocha e a água jorra
      // 1.8–2.8 oliveira cresce · 2.8–3.6 luz quente no lado de Atena · 3.6+ água recua
      timeline: { fundo: 0, foco: 0.8, agua: 1.8, detalhe: 2.8, ui: 3.6 },
    },
    {
      id: "poseidon-scene-05",
      kind: "capitulo",
      art: `${A}/poseidon/po-s05.png`,
      alt: "Xilogravura dourada: Polifemo ergue os braços no alto do penhasco à esquerda; ao centro o navio de Odisseu avança entre as ondas; à direita uma onda colossal se curva sobre o mar.",
      // Desktop: Polifemo, navio e onda formam três pontos narrativos — a copy
      // ocupa o canto inferior esquerdo, abaixo do penhasco.
      copy: { cols: "lg:col-span-7", align: "start", vertical: "end", veu: "left" },
      focus: { desktop: "52% 50%", tablet: "52% 52%", mobile: "52% 54%" },
      tabletArt: "60vw",
      mobileArt: "84vw",
      kicker: "ATO IV · O RETORNO IMPOSSÍVEL",
      titulo: "UM HOMEM FERIU SEU FILHO — E O MAR FECHOU TODOS OS CAMINHOS",
      subtitulo: "A vingança de Poseidon transformou o retorno em uma viagem de anos.",
      paragrafo:
        "Polifemo pede justiça ao pai. No centro, o navio de Odisseu tenta avançar. À direita, uma onda colossal converte o oceano em uma prisão sem caminhos.",
      // 0.0–0.8 tempestade e penhasco surgem · 0.8–1.8 Polifemo ergue os braços
      // 1.8–2.8 navio balança · 2.8–3.8 onda cresce sem quebrar · 3.8+ espuma revela o tridente
      timeline: { fundo: 0, foco: 0.8, agua: 1.8, detalhe: 2.8, ui: 3.8 },
    },
    {
      id: "poseidon-scene-06",
      kind: "capitulo",
      art: `${A}/poseidon/po-s06.png`,
      alt: "Xilogravura dourada: Poseidon e Apolo à esquerda diante das muralhas de Troia; Laomedonte no alto da muralha; à direita um monstro marinho emerge da água contra a cidade.",
      // Desktop: Poseidon e Apolo à esquerda, Laomedonte no alto, monstro à direita.
      // A copy só cabe no rodapé central sem cobrir nenhum dos quatro.
      copy: { cols: "lg:col-start-3 lg:col-span-8", align: "center", vertical: "end", veu: "bottom" },
      // X baixo de propósito: centralizada, a arte cortava Apolo na borda esquerda,
      // e o handoff exige os quatro protagonistas. O que se perde à direita é a
      // ponta da cauda do monstro — a cabeça e o corpo continuam em quadro.
      focus: { desktop: "10% 48%", tablet: "16% 48%", mobile: "30% 50%" },
      tabletArt: "60vw",
      mobileArt: "86vw",
      kicker: "ATO V · O PREÇO DA DESLEALDADE",
      titulo: "O DEUS CONSTRUIU AS MURALHAS — E DEPOIS ENVIOU O MAR CONTRA ELAS",
      subtitulo: "Laomedonte recebeu a obra e recusou o pagamento.",
      paragrafo:
        "Poseidon e Apolo ergueram as muralhas de Troia. Diante da deslealdade do rei, o próprio mar retornou contra aquilo que os deuses haviam construído.",
      // 0.0–0.8 Troia entra em profundidade · 0.8–1.8 Poseidon aponta para Laomedonte
      // 1.8–2.8 água cresce diante das muralhas · 2.8–3.8 monstro marinho emerge
      timeline: { fundo: 0, foco: 0.8, agua: 1.8, detalhe: 2.8, ui: 3.8 },
    },
    {
      id: "poseidon-scene-07",
      kind: "capitulo",
      art: `${A}/poseidon/po-s07.png`,
      alt: "Poseidon idoso sentado num trono de pedra coberto de musgo e sal, com coroa marítima e o tridente na mão, sobre rochas batidas por pequenas ondas; céu de tempestade ao fundo.",
      // Desktop: texto à esquerda e Poseidon à direita; coroa, olhar e tridente
      // preservados. É o epílogo — o bloco de texto é o mais curto da página.
      copy: { cols: "lg:col-span-5", align: "start", vertical: "center", veu: "left" },
      focus: { desktop: "56% 42%", tablet: "58% 40%", mobile: "56% 40%" },
      tabletArt: "66vw",
      mobileArt: "92vw",
      kicker: "EPÍLOGO · O TRONO QUE PERMANECE",
      titulo: "O MAR AINDA SABE SEU NOME",
      subtitulo: "A história terminou. O poder não desapareceu.",
      paragrafo:
        "Entre sal, musgo e rachaduras, Poseidon permanece no trono. Velho, desgastado e ainda soberano — não esquecido, apenas distante.",
      // 0.0–0.8 mar e céu em fade lento · 0.8–1.8 push-in quase imperceptível no olhar
      // 1.8–2.8 pequenas ondas nos degraus · 2.8–3.8 musgo, névoa e feixes respiram
      timeline: { fundo: 0, foco: 0.8, agua: 1.8, detalhe: 2.8, ui: 3.8 },
    },
  ],

  // ─────────────────────── aparato crítico ───────────────────────
  // Mesmas regras do aparato da Atena: sections próprias entre as cenas, fonte
  // nomeada em toda afirmação, fonte frágil declarada como frágil.
  //
  // O que muda aqui é a PRANCHA. Quatro notas trazem um painel de vaso de
  // figuras vermelhas — como os próprios gregos representaram a cena. Não é
  // ilustração decorativa: é fonte visual, no mesmo espírito das fontes
  // textuais, e a mudança de linguagem (da gravura cinematográfica para a
  // cerâmica chapada) marca que o leitor saiu da leitura moderna e foi ver o
  // artefato. As notas sem prancha ficam sem prancha — numa edição há estampa
  // onde há estampa.
  notas: [
    {
      id: "po-nota-01",
      apos: "poseidon-scene-01",
      numeral: "I",
      titulo: "Como se lê esta imagem",
      resumo: "O tridente não é um cetro. É um arpão de pescar atum.",
      blocos: [
        {
          texto:
            "A τρίαινα — literalmente “a de três dentes” — é o instrumento com que se fisgava atum no Mediterrâneo. O deus do mar carrega a ferramenta de quem vivia dele, não uma insígnia de corte. É a diferença entre um rei do mar e um povo de pescadores que divinizou o próprio ofício.",
        },
        {
          texto:
            "O cavalo é atributo dele antes de ser de qualquer outro: Poseidon Hípios, criador do primeiro cavalo. Na Arcádia o culto ia mais longe — em Figália ele era representado com cabeça de cavalo.",
          fonte: { autor: "Pausânias", obra: "Descrição da Grécia", loc: "VIII.42" },
        },
        {
          texto:
            "O golfinho está ali por um serviço prestado: foi ele que encontrou Anfitrite, fugida ao pedido de casamento, e a convenceu a voltar. Poseidon o pôs entre as estrelas em pagamento.",
          fonte: { autor: "Eratóstenes", obra: "Catasterismos", loc: "31" },
        },
        {
          texto:
            "E o epíteto que Homero mais repete não fala de água: γαιήοχος, “o que sustenta a terra”. Antes de ser o deus do mar, ele é o deus daquilo sobre o que a terra se apoia.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "passim" },
        },
      ],
    },
    {
      id: "po-nota-02",
      apos: "poseidon-scene-02",
      numeral: "II",
      titulo: "Não foi herança. Foi sorteio.",
      resumo: "Os três irmãos não escolheram os seus reinos — tiraram a sorte.",
      painel: {
        src: `${A}/videos/v-po-vaso-divisao`,
        poster: `${A}/poseidon/v-po-vaso-divisao-poster.jpg`,
        legenda:
          "Painel de figuras vermelhas: os irmãos entronizados após a partilha. Zeus com o raio, Poseidon com o tridente, o cavalo de Hades ao fundo.",
      },
      blocos: [
        {
          texto:
            "Quem conta é o próprio Poseidon, na Ilíada: são três irmãos nascidos de Crono, e o mundo foi repartido em três por sorteio. Ele tirou o mar cinzento, Hades a treva, Zeus o céu amplo. A terra e o Olimpo ficaram comuns aos três — não são de ninguém.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "XV.187–193" },
        },
        {
          texto:
            "Ele diz isso no meio de uma recusa. Íris chega com uma ordem de Zeus e Poseidon responde que não obedece: são iguais em honra, o sorteio os fez pares, e o irmão mais velho não manda no mais novo. Acaba cedendo — mas deixa claro que cede por escolha, não por hierarquia.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "XV.185–199" },
        },
        {
          texto:
            "É a chave da personagem. Poseidon não é um subalterno revoltado: é um soberano que recebeu, por acaso, o reino que não fica parado.",
        },
      ],
    },
    {
      id: "po-nota-03",
      apos: "poseidon-scene-03",
      numeral: "III",
      titulo: "Pediam ao deus do terremoto que não tremesse",
      resumo: "O mesmo deus que sacode a terra recebia culto com o nome de “o que dá firmeza”.",
      termo: {
        grego: "ἐνοσίχθων",
        translit: "enosíkhthon",
        glosa: "o que sacode a terra",
      },
      painel: {
        src: `${A}/videos/v-po-vaso-terremoto`,
        poster: `${A}/poseidon/v-po-vaso-terremoto-poster.jpg`,
        legenda:
          "Painel de figuras vermelhas: o tridente atinge a rocha e o mar responde. A mesma força que ergue a onda abre a terra.",
      },
      blocos: [
        {
          texto:
            "Ἐνοσίχθων e ἐννοσίγαιος — “sacudidor da terra” — são epítetos que Homero usa mais do que qualquer outro para ele. Terremoto e maré são, para os gregos, o mesmo gesto visto de dois lugares.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "passim" },
        },
        {
          texto:
            "Heródoto conta que os tessálios atribuíam a Poseidon a abertura do vale de Tempe, por onde o rio Peneu escoa. E acrescenta, com secura: quem acredita que é Poseidon quem sacode a terra dirá que a fenda é obra dele. A frase registra, no século V a.C., que nem todo grego acreditava.",
          fonte: { autor: "Heródoto", obra: "Histórias", loc: "VII.129" },
        },
        {
          texto:
            "O detalhe mais revelador do culto é outro: ele também era invocado como Poseidon Asfálio, “o que dá segurança, o que não deixa cair”. Pedia-se ao deus do terremoto, pelo nome, que segurasse o chão. A religião grega não separava a ameaça da proteção — eram o mesmo endereço.",
          fonte: { autor: "Pausânias", obra: "Descrição da Grécia", loc: "III.11.9" },
        },
      ],
    },
    {
      id: "po-nota-04",
      apos: "poseidon-scene-04",
      numeral: "IV",
      titulo: "Atenas guardou a marca do perdedor",
      resumo: "A cidade que o recusou manteve o golpe do tridente dentro do seu templo mais sagrado.",
      painel: {
        src: `${A}/videos/v-po-vaso-disputa`,
        poster: `${A}/poseidon/v-po-vaso-disputa-poster.jpg`,
        legenda:
          "Painel de figuras vermelhas: à esquerda, Poseidon e o cavalo; à direita, Atena oferece a oliveira aos cidadãos.",
      },
      blocos: [
        {
          texto:
            "Poseidon golpeou a rocha da Acrópole e fez brotar uma fonte de água salgada; em outras versões, o presente foi o cavalo. Atena plantou a oliveira. A oliveira venceu.",
          fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "III.14.1" },
        },
        {
          texto:
            "Ele não aceitou o resultado: inundou a planície de Elêusis. A disputa não terminou em concórdia — terminou em represália.",
          fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "III.14.1" },
        },
        {
          texto:
            "E aqui está o que quase nunca se conta. Séculos depois, no Erecteion, ainda se mostravam aos visitantes as três marcas do tridente na rocha e um poço de água salgada. Pausânias registra que, quando soprava o vento sul, dava para ouvir o barulho de ondas dentro dele.",
          fonte: { autor: "Pausânias", obra: "Descrição da Grécia", loc: "I.26.5" },
        },
        {
          texto:
            "Atenas não apagou o deus que recusou. Construiu o templo mais sagrado da cidade em volta da cicatriz que ele deixou, e a manteve à vista. A mesma disputa, contada do outro lado, abre o capítulo da Atena.",
          remissao: { label: "Atena · a cidade escolheu", to: "/atena#scene-04" },
        },
      ],
    },
    {
      id: "po-nota-05",
      apos: "poseidon-scene-05",
      numeral: "V",
      titulo: "O deus do mar só conseguiu atrasar",
      resumo: "Odisseu não é perseguido por ter cegado o ciclope. É perseguido por ter dito o próprio nome.",
      blocos: [
        {
          texto:
            "Polifemo é filho de Poseidon. Cego e humilhado, ele só pode amaldiçoar quem o feriu se souber quem foi — e Odisseu, já a salvo e a caminho do navio, grita o próprio nome para trás, para que a façanha tenha dono.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "IX.502–536" },
        },
        {
          texto:
            "É a vaidade que arma a maldição, não a violência. Sem o nome, não há a quem punir. A Odisseia inteira nasce de um homem que não resistiu a assinar o que fez.",
        },
        {
          texto:
            "E há um limite: Zeus explica, na abertura do poema, que Poseidon não pode matá-lo — o destino de Odisseu é voltar. O deus que governa todos os caminhos de água só consegue fazer uma coisa contra ele: demorar. Dez anos de atraso são o máximo que a cólera de um dos três soberanos alcança.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "I.68–79" },
        },
      ],
    },
    {
      id: "po-nota-06",
      apos: "poseidon-scene-06",
      numeral: "VI",
      titulo: "A muralha caiu pela parte que um mortal construiu",
      resumo: "Poseidon ergueu os muros de Troia. Depois lutou contra a cidade que tinha erguido.",
      painel: {
        src: `${A}/videos/v-po-vaso-troia`,
        poster: `${A}/poseidon/v-po-vaso-troia-poster.jpg`,
        legenda:
          "Painel de figuras vermelhas: o monstro marinho enviado contra as muralhas de Troia, e o rei que não pagou.",
      },
      blocos: [
        {
          texto:
            "Poseidon conta o episódio ele mesmo, com raiva ainda intacta: ele e Apolo serviram Laomedonte por um ano, por um salário combinado. Ele levantou a muralha; Apolo apascentou os rebanhos. Ao fim do prazo, o rei negou o pagamento e os ameaçou de amarrá-los e vendê-los como escravos.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "XXI.441–457" },
        },
        {
          texto:
            "A resposta foi um monstro marinho. Para aplacá-lo, Laomedonte teve de expor a própria filha, Hesíone; Héracles a salvou em troca dos cavalos divinos do rei — e Laomedonte também não pagou Héracles, que voltou e destruiu a cidade uma primeira vez.",
          fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "II.5.9" },
        },
        {
          texto:
            "Píndaro guarda o detalhe mais bonito. Éaco, um mortal, foi chamado para ajudar na construção — e Apolo profetizou que a muralha cairia justamente pelo trecho erguido por mãos humanas. Troia não foi vencida onde os deuses trabalharam.",
          fonte: { autor: "Píndaro", obra: "Olímpicas", loc: "VIII.31–46" },
        },
        {
          texto:
            "Na guerra, Poseidon combate ao lado dos gregos, contra a cidade que ele próprio muralhou. Não guarda lealdade à obra: guarda rancor pela dívida.",
        },
      ],
    },
  ],

  colofao: {
    creditos: [
      { papel: "Texto e pesquisa", valor: "Gabriel" },
      { papel: "Desenvolvimento", valor: "React · Vite · Tailwind" },
      { papel: "Ilustrações", valor: "geradas com IA, sob direção e composição do autor" },
      {
        papel: "Painéis de vaso",
        valor: "gerados com IA no estilo das figuras vermelhas áticas — reconstituição, não peça de acervo",
      },
    ],
    nota:
      "As sete cenas são leituras de fontes antigas, não reconstituições históricas. Onde as fontes divergem, o aparato mostra as duas.",
  },
};

// ─────────────────────────── ARES — landing definitiva ───────────────────────────
// Seis cenas aprovadas. O arco é uma queda em cinco etapas:
//   presença → confronto → desejo → exposição → aprisionamento → libertação
// Ares começa ocupando a paisagem inteira e termina sendo retirado de dentro de
// um jarro por outro deus. A página não o transforma em fraco — mostra que força
// bruta é UMA forma de poder, e que todas as outras a vencem.
//
// A copy foi escrita aqui (não veio de handoff do Canva, como Atena e Poseidon) e
// está ancorada nas mesmas fontes que o aparato cita.
//
// Regra de composição do deus (olimpo-landing-por-deus.md): "cortado,
// descentrado, primeiro plano obstruindo". A arte entra com crop mais duro e
// enquadramento fora do centro — o deus que nunca se vê inteiro.
export const aresPagina = {
  code: "ae",
  nameGr: "Ἄρης",
  nameLat: "Ares",
  numeral: "VIII",
  // A UI segue o dourado dos outros dois — é contrato de navegação. A identidade
  // do Ares é a ferrugem sobre um preto sujo, de fuligem.
  gold: "#D0A45F",
  goldBright: "#E7C179",
  goldDeep: "#A87A35",
  ferrugem: "#8C3A2B",
  brasa: "#C2603F",
  preto: "10,7,6",
  cenas: [
    {
      id: "ares-scene-01",
      kind: "hero",
      art: `${A}/ares/ae-s01.jpg`,
      alt: "Estátua colossal de Ares em mármore escurecido, lança erguida e escudo manchado de sangue, sobre uma cidade em ruínas e em chamas; ao fundo, a Acrópole ardendo sob nuvens de tempestade.",
      focus: { desktop: "62% 50%", mobile: "70% 50%" },
      mobileArt: "70vw",
      eyebrow: "TRONO VIII · Ἄρης",
      titulo: "ARES",
      subtitulo: "Deus da guerra bruta, do massacre e do pânico",
      lead: "Ele não promete vitória. Anuncia que a violência chegou.",
      paragrafo:
        "Os gregos precisaram de duas divindades para a guerra. A Atena couberam a estratégia, a disciplina e a cidade defendida. A Ares coube o resto — o instante em que o combate deixa de ter forma.",
      marcas: [
        { label: "FÚRIA", hint: "o combate sem plano" },
        { label: "PÂNICO", hint: "seus filhos abrem caminho" },
        { label: "RUÍNA", hint: "o que sobra depois" },
      ],
      citacao: "De todos os deuses que habitam o Olimpo, tu és o que mais odeio.",
      citacaoAutor: "ZEUS, AO PRÓPRIO FILHO · ILÍADA V.890",
      ctas: [
        { label: "CONHECER A QUEDA", to: "#ares-scene-02", variant: "solid" },
        { label: "COMO SE LÊ A IMAGEM", to: "#ae-nota-01", variant: "ghost" },
      ],
      timeline: { art: 0, push: 0.8, fx: 1.6, ui: 2.4 },
    },
    {
      id: "ares-scene-02",
      kind: "capitulo",
      capitulo: "I",
      art: `${A}/ares/ae-s02.jpg`,
      alt: "Gravura: Ares avança pela esquerda em meio a fumaça, ruínas e linhas desordenadas; à direita, Atena permanece imóvel, protegida pelo escudo da górgona, com a lança cruzando a dele e a coruja pousada sobre uma coluna.",
      focus: { desktop: "42% 50%", mobile: "34% 50%" },
      mobileArt: "60vw",
      titulo: "A FORÇA CONTRA O CÁLCULO",
      subtitulo: "Ele avança. Ela não precisa se mover.",
      paragrafo:
        "Ares tem força suficiente para começar qualquer batalha. Atena tem inteligência suficiente para decidir como ela termina. Em Troia, ela guia a lança de um mortal contra o deus da guerra — e ele deixa o campo aos gritos.",
      timeline: { fundo: 0, choque: 0.8, recuo: 1.8, hold: 2.8, ui: 3.8 },
    },
    {
      id: "ares-scene-03",
      kind: "capitulo",
      capitulo: "II",
      art: `${A}/ares/ae-s03.jpg`,
      alt: "Gravura: Ares de elmo e armadura, com Afrodite muito próxima; ela leva a mão ao rosto dele, entrando pela abertura do elmo, enquanto ele a segura pela cintura. Ao fundo, um terraço com colunas e a cidade iluminada.",
      focus: { desktop: "46% 46%", mobile: "44% 44%" },
      mobileArt: "60vw",
      titulo: "O QUE FEZ A GUERRA HESITAR",
      subtitulo: "Ele não tirou a armadura. Só parou.",
      paragrafo:
        "Não é uma cena de amor: é o instante anterior, com tudo o que o antecede — proximidade, segredo, perigo e o abandono da prudência. As armas continuam ali. Ares não deixa de ser a guerra por um segundo sequer.",
      timeline: { fundo: 0, aproxima: 0.8, hesita: 1.8, hold: 2.8, ui: 3.8 },
    },
    {
      id: "ares-scene-04",
      kind: "capitulo",
      capitulo: "III",
      art: `${A}/ares/ae-s04.jpg`,
      alt: "Gravura: Ares e Afrodite presos sob uma rede metálica finíssima. Ele ergue o braço tentando rompê-la; ela tenta se soltar. Hefesto segura a rede à esquerda, junto à forja, e os demais deuses observam ao fundo.",
      focus: { desktop: "40% 50%", mobile: "38% 50%" },
      mobileArt: "60vw",
      titulo: "VENCIDO POR UM FIO QUE NÃO SE VÊ",
      subtitulo: "Não foi derrotado por alguém mais forte.",
      paragrafo:
        "Hefesto não enfrenta o deus da guerra. Mede, calcula e forja laços finos demais para serem vistos e resistentes demais para serem rompidos. Depois chama os outros deuses para assistir. É a segunda vez que a força de Ares encontra um problema que o impacto não resolve.",
      timeline: { fundo: 0, rede: 0.8, luta: 1.8, plateia: 2.8, ui: 3.8 },
    },
    {
      id: "ares-scene-05",
      kind: "capitulo",
      capitulo: "IV",
      art: `${A}/ares/ae-s05.jpg`,
      alt: "Gravura: dois gigantes, Oto e Efialtes, forçam Ares para dentro de um grande jarro de bronze ornamentado com meandros gregos, fechado por correntes, argolas e um cadeado central. Ares ainda usa o elmo e resiste com os braços.",
      focus: { desktop: "50% 46%", mobile: "50% 44%" },
      mobileArt: "60vw",
      titulo: "TREZE MESES DENTRO DE UM JARRO",
      subtitulo: "Nem foram deuses. Foram dois garotos grandes demais.",
      paragrafo:
        "Oto e Efialtes, filhos de Aloeu, prenderam o deus da guerra num recipiente de bronze e o mantiveram ali mais de um ano. Ele definhou até quase morrer. O deus que ocupava o campo de batalha inteiro foi reduzido ao espaço de um pote.",
      timeline: { fundo: 0, forca: 0.8, tampa: 1.8, corrente: 2.8, ui: 3.8 },
    },
    {
      id: "ares-scene-06",
      kind: "capitulo",
      capitulo: "V",
      art: `${A}/ares/ae-s06.jpg`,
      alt: "Gravura: Hermes, de elmo e sandálias aladas e com o caduceu preso ao corpo, mantém a tampa do jarro aberta e puxa Ares pelo braço para fora. Ao fundo, os dois gigantes caídos e desacordados.",
      focus: { desktop: "50% 46%", mobile: "50% 44%" },
      mobileArt: "60vw",
      titulo: "QUEM O TIROU DE LÁ FOI A ASTÚCIA",
      subtitulo: "A libertação não veio da força dele.",
      paragrafo:
        "Uma madrasta conta o segredo, e Hermes entra sem ser visto. Nenhum golpe, nenhuma disputa: velocidade, informação e discrição. O ciclo se fecha como começou — a força de Ares resolvida por uma qualidade que não é a dele.",
      timeline: { fundo: 0, tampa: 0.8, puxa: 1.8, saida: 2.8, ui: 3.8 },
    },
  ],

  // ─────────────────────── aparato crítico ───────────────────────
  // Mesmas regras: fonte nomeada em toda afirmação, fonte frágil declarada.
  // O Ares é o melhor dos doze para isto — o desprezo por ele está ESCRITO, e as
  // remissões cruzadas ligam esta página à Atena, à Afrodite, ao Hefesto, ao
  // Hermes e ao Poseidon.
  notas: [
    {
      id: "ae-nota-01",
      apos: "ares-scene-01",
      numeral: "I",
      titulo: "Como se lê esta imagem",
      resumo: "Os epítetos que Homero dá a ele não elogiam nada.",
      blocos: [
        {
          texto:
            "O elmo, a lança e o escudo são os de qualquer hoplita — e isso é o ponto. Ares não tem atributo próprio como o tridente de Poseidon ou a coruja de Atena: ele é o equipamento de guerra sem mais nada. O que o distingue nas imagens é o sangue, não um símbolo.",
        },
        {
          texto:
            "Homero o chama de μιαιφόνος, “manchado de sangue”, e βροτολοιγός, “ruína dos mortais”. Não são insultos de inimigos: é como o poema o nomeia, do mesmo modo que chama Atena de “olhos de coruja”. O epíteto é a ficha técnica do deus.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "V.31 e V.844" },
        },
        {
          texto:
            "Quem o acompanha em campo são os próprios filhos: Fobos, o pânico, e Deimos, o terror. A guerra não chega sozinha — chega escoltada pelos efeitos que produz.",
          fonte: { autor: "Hesíodo", obra: "Teogonia", loc: "933–937" },
        },
      ],
    },
    {
      id: "ae-nota-02",
      apos: "ares-scene-02",
      numeral: "II",
      titulo: "“Tu és o que mais odeio”",
      resumo: "É o pai dele quem diz, e o poema não suaviza.",
      blocos: [
        {
          texto:
            "Ferido, Ares sobe ao Olimpo para se queixar. Zeus o ouve e responde que de todos os deuses que habitam o Olimpo ele é o mais odioso, porque só lhe agradam a discórdia, a guerra e as batalhas. Nenhum outro olímpico recebe isso na cara, do próprio pai.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "V.888–898" },
        },
        {
          texto:
            "Foi Atena quem guiou a lança de Diomedes, um mortal, contra ele. Atingido, o deus da guerra berra como nove ou dez mil homens juntos e foge do campo.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "V.855–863" },
        },
        {
          texto:
            "E não foi uma vez só. No canto XXI, os dois se enfrentam diretamente e Atena o derruba com uma pedra de marco — uma pedra de demarcar terreno. Ele cai cobrindo sete jeiras de chão.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "XXI.400–414" },
        },
        {
          texto:
            "É aqui que se vê por que os gregos precisaram de dois deuses para a guerra: um para o ofício, outro para o massacre. E deixaram registrado, duas vezes, qual dos dois vence.",
          remissao: { label: "Atena · a mente como arma", to: "/atena" },
        },
      ],
    },
    {
      id: "ae-nota-03",
      apos: "ares-scene-03",
      numeral: "III",
      titulo: "Os filhos deste casal são Pânico e Terror",
      resumo: "Guerra com desejo gera medo — e, na mesma linhagem, Harmonia.",
      blocos: [
        {
          texto:
            "A união de Ares e Afrodite não é um caso isolado no poema: Hesíodo a registra como linhagem. Dela nascem Fobos e Deimos, o pânico e o terror, que acompanham o pai em batalha.",
          fonte: { autor: "Hesíodo", obra: "Teogonia", loc: "933–937" },
        },
        {
          texto:
            "E nasce também Harmonia. A mesma união produz o que desorganiza e o que ordena — os gregos não separavam desejo e violência em compartimentos limpos, e a genealogia é o argumento.",
          fonte: { autor: "Hesíodo", obra: "Teogonia", loc: "937" },
        },
        {
          texto:
            "O episódio é cantado por Demódoco, um aedo cego, num banquete — ou seja: dentro da Odisseia, a história dos dois já é matéria de canção popular. Os deuses são o assunto do entretenimento dos mortais.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "VIII.266–366" },
          remissao: { label: "Afrodite · o desejo que decide", to: "/afrodite" },
        },
      ],
    },
    {
      id: "ae-nota-04",
      apos: "ares-scene-04",
      numeral: "IV",
      titulo: "Os deuses riram sem conseguir parar",
      resumo: "A punição de Ares não foi dor. Foi ridículo, diante de todo mundo.",
      blocos: [
        {
          texto:
            "Hélio vê o encontro e conta a Hefesto. O ferreiro forja laços finos como teia de aranha, invisíveis até para os deuses, e os arma sobre a própria cama. Quando os dois se deitam, a rede fecha.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "VIII.266–299" },
        },
        {
          texto:
            "Hefesto então chama os outros deuses para ver. Homero registra que se ergueu entre eles um riso inextinguível — ἄσβεστος γέλως. A vingança do artesão não é ferir o deus da guerra: é expô-lo.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "VIII.325–327" },
        },
        {
          texto:
            "E há um detalhe que quase nunca se conta. Apolo pergunta a Hermes se ele gostaria de estar naquela situação, preso daquele jeito. Hermes responde que sim, de bom grado — e que aguentaria correntes três vezes mais fortes.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "VIII.334–342" },
        },
        {
          texto:
            "A soltura é negociada como dívida: Poseidon se oferece como fiador do pagamento de Ares, e só então Hefesto abre a rede. Nem a humilhação termina em violência — termina em garantia financeira.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "VIII.344–358" },
          remissao: { label: "Hefesto · a técnica que vence a força", to: "/hefesto" },
        },
      ],
    },
    {
      id: "ae-nota-05",
      apos: "ares-scene-05",
      numeral: "V",
      titulo: "Contado para consolar Afrodite",
      resumo: "A humilhação de Ares aparece na Ilíada como exemplo reconfortante.",
      blocos: [
        {
          texto:
            "Oto e Efialtes, os Aloíadas, amarraram Ares e o mantiveram num jarro de bronze por treze meses. Homero diz que ali teria perecido, insaciável de guerra como era, se a madrasta deles, Eribeia, não tivesse avisado Hermes — que o roubou de dentro do jarro já exausto.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "V.385–391" },
        },
        {
          texto:
            "O contexto é o que dá o tom. Afrodite acaba de ser ferida por Diomedes e chora; sua mãe, Dione, a consola contando desgraças que outros deuses já sofreram. A prisão de Ares é o primeiro exemplo da lista — é a história que se conta a alguém para dizer “já aconteceu coisa pior”.",
          fonte: { autor: "Homero", obra: "Ilíada", loc: "V.382–404" },
        },
        {
          texto:
            "Os mesmos dois gigantes tentaram empilhar montanhas para escalar o céu e tomar o Olimpo. Não eram deuses: eram mortais crescendo depressa demais.",
          fonte: { autor: "Homero", obra: "Odisseia", loc: "XI.305–320" },
        },
      ],
    },
    {
      id: "ae-nota-06",
      apos: "ares-scene-06",
      numeral: "VI",
      titulo: "A colina do tribunal leva o nome dele",
      resumo: "Atenas julgava homicídios num morro batizado com o nome do primeiro réu.",
      blocos: [
        {
          texto:
            "Halirrótio, filho de Poseidon, violentou Alcipe, filha de Ares. Ares o matou. Poseidon o processou, e os deuses julgaram o caso numa colina de Atenas. Ares foi absolvido — e o morro passou a se chamar Areópago, “a rocha de Ares”.",
          fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "III.14.2" },
        },
        {
          texto:
            "O tribunal de homicídios de Atenas funcionou ali por séculos, com esse nome. A cidade que pertencia a Atena julgava seus assassinos numa rocha batizada em honra do deus que ela derrotou duas vezes — e que foi o primeiro a sentar no banco dos réus.",
          fonte: { autor: "Pausânias", obra: "Descrição da Grécia", loc: "I.28.5" },
        },
        {
          texto:
            "E então Roma o adota. Marte deixa de ser o deus que os gregos desprezavam e vira o segundo do panteão, atrás só de Júpiter: pai de Rômulo, ancestral do povo romano, com um mês do calendário no próprio nome.",
          fonte: { autor: "Lívio", obra: "História de Roma", loc: "I.4" },
        },
        {
          texto:
            "O mesmo deus. A Grécia o pôs no banco dos réus; Roma o pôs na certidão de nascimento.",
        },
      ],
    },
  ],

  colofao: {
    creditos: [
      { papel: "Texto e pesquisa", valor: "Gabriel" },
      { papel: "Desenvolvimento", valor: "React · Vite · Tailwind" },
      { papel: "Ilustrações", valor: "geradas com IA, sob direção e composição do autor" },
    ],
    nota:
      "As seis cenas são leituras de fontes antigas, não reconstituições históricas. Onde as fontes divergem, o aparato mostra as duas.",
  },
};

// Dionísio: a sequência das gravuras acompanha a trajetória, da origem à apoteose.
export const dionisioPagina = {
  hero: {
    id: "dionisio-hero",
    art: `${A}/dionisio/di-hero.jpg`,
    alt: "Estátua de gesso de Dionísio reclinada sob videiras, com taça erguida diante de uma paisagem grega ao entardecer.",
    titulo: "DIONÍSIO",
    subtitulo: "O deus duas vezes nascido.",
    texto: "Filho de Zeus e da mortal Sêmele, Dionísio atravessa o mundo dos deuses e o dos homens. Vinho, êxtase e teatro são caminhos para a transformação — e para o perigo de perder o controle.",
  },
  atos: [
    {
      id: "dionisio-ato-1", numeral: "I", art: `${A}/dionisio/di-ato-1.png`,
      alt: "Gravura em cobre: Zeus segura Dionísio criança enquanto Hermes se aproxima sob um céu de relâmpagos.",
      titulo: "O DEUS DUAS VEZES NASCIDO",
      chamada: "Uma vida atravessa a morte antes de começar.",
      texto: "Filho de Zeus e da mortal Sêmele, Dionísio sobrevive ao esplendor divino que mata sua mãe. Zeus o salva ainda no ventre, costura a criança em sua coxa e a traz ao mundo pela segunda vez.",
      posicao: "left",
    },
    {
      id: "dionisio-ato-2", numeral: "II", art: `${A}/dionisio/di-ato-2.png`,
      alt: "Gravura em cobre: Hermes leva Dionísio criança por uma floresta até as ninfas que o receberão.",
      titulo: "O DEUS ESCONDIDO",
      chamada: "Para crescer, ele precisa desaparecer.",
      texto: "Ainda ameaçado por Hera, o menino é levado por Hermes à região de Nisa. Entre ninfas, montanhas e vegetação, cresce longe da ordem das cidades — no território que seu culto jamais deixará de evocar.",
      posicao: "right",
    },
    {
      id: "dionisio-ato-3", numeral: "III", art: `${A}/dionisio/di-ato-3.png`,
      alt: "Gravura em cobre: Dionísio revela seu poder no navio dos piratas, tomado por videiras, uvas e vinho.",
      titulo: "O NAVIO QUE FLORESCEU",
      chamada: "Os que tentaram prendê-lo perderam o chão.",
      texto: "Piratas capturam o jovem sem reconhecer o deus. As cordas se soltam; videiras tomam o mastro e vinho invade o convés. O navio se transforma diante deles. Em uma versão do mito, os marinheiros saltam ao mar e se tornam golfinhos.",
      posicao: "left",
    },
    {
      id: "dionisio-ato-4", numeral: "IV", art: `${A}/dionisio/di-ato-4.png`,
      alt: "Gravura em cobre: Dionísio observa as bacantes em frenesi dominarem Penteu numa paisagem montanhosa.",
      titulo: "PENTEU",
      chamada: "A cidade recusou o deus. O êxtase rompeu seus limites.",
      texto: "Em Tebas, o rei Penteu proíbe o culto e tenta controlar as mulheres que o seguem. Dionísio o conduz às montanhas, onde as bacantes o atacam em frenesi. Ágave, sua mãe, participa sem reconhecer o filho. A tragédia revela o perigo da perda de si.",
      posicao: "right",
    },
    {
      id: "dionisio-ato-5", numeral: "V", art: `${A}/dionisio/di-ato-5.png`,
      alt: "Gravura em cobre: Dionísio se aproxima de Ariadne sob um céu estrelado, ao lado de uma pantera.",
      titulo: "ARIADNE",
      chamada: "Depois do abandono, outra forma de destino.",
      texto: "Deixada por Teseu na ilha de Naxos, Ariadne encontra Dionísio. Em tradições antigas, torna-se sua esposa. A coroa associada a ela sobe ao céu como constelação: da perda nasce uma nova passagem ao divino.",
      posicao: "left",
    },
  ],
  notas: [
    {
      id: "di-nota-abertura", apos: "dionisio-hero", numeral: "XII",
      titulo: "Muito além do vinho",
      resumo: "Dionísio atravessa as fronteiras que os outros deuses parecem manter.",
      blocos: [
        { texto: "Hesíodo registra a contradição na origem: Sêmele é mortal; o filho que ela tem com Zeus é imortal. Antes de qualquer milagre, sua própria genealogia já une dois mundos.", fonte: { autor: "Hesíodo", obra: "Teogonia", loc: "940–942" } },
        { texto: "Nas Bacantes, de Eurípides, ele chega a Tebas para exigir reconhecimento. A peça apresenta o culto, o êxtase e a resistência da cidade; a festa e a ameaça nunca estão totalmente separadas.", fonte: { autor: "Eurípides", obra: "Bacantes", loc: "1–63" } },
        { texto: "As cenas a seguir acompanham essa tensão: um nascimento impossível, uma infância escondida, a revelação no mar, a ruína de Penteu e a elevação de Ariadne." },
      ],
    },
    {
      id: "di-nota-1", apos: "dionisio-ato-1", numeral: "I",
      titulo: "A promessa que Zeus não pôde retirar",
      resumo: "A exigência de Sêmele transforma uma revelação divina em nascimento impossível.",
      painel: { poster: `${A}/dionisio/di-nota-1.png`, legenda: "Ilustração contemporânea em linguagem de figuras vermelhas: Sêmele, Zeus e Dionísio criança; a cena reúne momentos sucessivos do mito." },
      blocos: [
        { texto: "Hera, disfarçada, convence Sêmele a pedir que Zeus apareça como se mostrava à própria esposa. Zeus havia jurado atender ao pedido; sua manifestação mata Sêmele.", fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "III.4.3" } },
        { texto: "Zeus retira o bebê antes do nascimento e o costura na coxa. O segundo parto explica o epíteto de “duas vezes nascido”; a imagem reúne, numa única composição, o desastre e a salvação.", fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "III.4.3" } },
        { texto: "A história não apaga a mãe mortal: a origem de Dionísio depende precisamente da passagem entre uma vida que termina e outra que continua." },
      ],
    },
    {
      id: "di-nota-2", apos: "dionisio-ato-2", numeral: "II",
      titulo: "Nisa não é um endereço preciso",
      resumo: "O esconderijo existe no mito como distância e proteção.",
      painel: { poster: `${A}/dionisio/di-nota-2.png`, legenda: "Ilustração contemporânea em linguagem de figuras vermelhas: Hermes entrega Dionísio criança às ninfas de Nisa." },
      blocos: [
        { texto: "Depois do segundo nascimento, Hera ainda representa perigo. Apolodoro conta que Hermes leva o menino às ninfas de Nisa, encarregadas de criá-lo.", fonte: { autor: "Apolodoro", obra: "Biblioteca", loc: "III.4.3" } },
        { texto: "As versões antigas situam Nisa em lugares diferentes. Nesta página, o nome indica o afastamento de Tebas e a criação do deus entre ninfas e vegetação, sem fingir uma localização geográfica única." },
        { texto: "É uma infância fora do palácio e da cidade. A paisagem natural não funciona como cenário: ela prepara a forma como Dionísio será reconhecido mais tarde." },
      ],
    },
    {
      id: "di-nota-3", apos: "dionisio-ato-3", numeral: "III",
      titulo: "As cordas não seguram um deus",
      resumo: "No Hino Homérico, o navio muda antes que os piratas compreendam quem capturaram.",
      painel: { poster: `${A}/dionisio/di-nota-3.png`, legenda: "Ilustração contemporânea em linguagem de figuras vermelhas: o navio dos piratas é tomado por videiras; golfinhos aparecem junto ao casco." },
      blocos: [
        { texto: "Os marinheiros veem um jovem e imaginam um cativo valioso. O piloto é o primeiro a suspeitar: as amarras não permanecem nos pulsos do prisioneiro.", fonte: { autor: "Hino Homérico", obra: "A Dionísio", loc: "7.1–24" } },
        { texto: "A videira se espalha pela vela; hera cobre o mastro. O texto também transforma Dionísio em leão e faz surgir uma ursa — a beleza vegetal vem acompanhada de terror.", fonte: { autor: "Hino Homérico", obra: "A Dionísio", loc: "7.34–47" } },
        { texto: "Os piratas saltam ao mar e viram golfinhos; o piloto é poupado. A revelação distingue quem reconheceu o deus daqueles que insistiram em tratá-lo como mercadoria.", fonte: { autor: "Hino Homérico", obra: "A Dionísio", loc: "7.48–59" } },
      ],
    },
    {
      id: "di-nota-4", apos: "dionisio-ato-4", numeral: "IV",
      titulo: "O rei que quis assistir de fora",
      resumo: "Penteu tenta vigiar o rito, mas acaba dentro da tragédia.",
      painel: { poster: `${A}/dionisio/di-nota-4.png`, legenda: "Ilustração contemporânea em linguagem de figuras vermelhas: Dionísio observa Penteu entre as bacantes; a violência é sugerida por gestos." },
      blocos: [
        { texto: "Penteu proíbe o culto e prende o estrangeiro que não reconhece como Dionísio. As mulheres deixam Tebas e vão ao monte Citéron; o rei deseja observá-las às escondidas.", fonte: { autor: "Eurípides", obra: "Bacantes", loc: "215–262; 810–861" } },
        { texto: "Dionísio o conduz ao lugar de onde poderá vê-las. Quando Penteu é descoberto, as bacantes o atacam. Ágave toma parte sem perceber que é seu filho.", fonte: { autor: "Eurípides", obra: "Bacantes", loc: "1043–1152" } },
        { texto: "O reconhecimento vem tarde, quando Ágave retorna à cidade. A peça força a pergunta que atravessa toda a página: o que resta da identidade quando o êxtase vence a percepção?", fonte: { autor: "Eurípides", obra: "Bacantes", loc: "1165–1297" } },
      ],
    },
    {
      id: "di-nota-5", apos: "dionisio-ato-5", numeral: "V",
      titulo: "Uma coroa entre as estrelas",
      resumo: "Ariadne recebe outra vida na tradição que a une a Dionísio.",
      painel: { poster: `${A}/dionisio/di-nota-5.png`, legenda: "Ilustração contemporânea em linguagem de figuras vermelhas: Dionísio oferece a mão a Ariadne em Naxos, sob a coroa celeste." },
      blocos: [
        { texto: "Hesíodo nomeia Ariadne, filha de Minos, como esposa de Dionísio e diz que Zeus a tornou imortal e livre da velhice. A transformação final já está na genealogia antiga.", fonte: { autor: "Hesíodo", obra: "Teogonia", loc: "947–949" } },
        { texto: "Em outra tradição, a coroa de Ariadne aparece no céu: Arato descreve a constelação como memorial colocado por Dionísio. A imagem desta nota reúne o encontro e seu sinal celeste.", fonte: { autor: "Arato", obra: "Fenômenos", loc: "71–73" } },
        { texto: "As tradições sobre Ariadne não contam todas o mesmo desfecho. Aqui seguimos a linha em que o abandono em Naxos abre a passagem para o mundo divino." },
      ],
    },
  ],
  conclusao: {
    id: "dionisio-fim",
    titulo: "O DEUS QUE DISSOLVE FRONTEIRAS.",
    texto: "Mortal e divino. Cidade e natureza. Razão e êxtase. Em Dionísio, nenhuma forma permanece intacta.",
  },
  colofao: {
    creditos: [
      { papel: "Texto e direção", valor: "Gabriel · Olimpo" },
      { papel: "Desenvolvimento", valor: "React · Vite · Tailwind" },
      { papel: "Ilustrações das notas", valor: "geradas com IA em linguagem de figuras vermelhas" },
    ],
    nota: "As pranchas das notas são interpretações visuais contemporâneas, não fotografias de vasos antigos. As passagens citadas sustentam a leitura narrativa.",
  },
};

// Os 12 tronos (para o dashboard "O Panteão" e a navegação).
// A copy completa dos 11 (3 beats cada) entra na sequência do Passo 0a.
export const pantheon = [
  { code: "z", nameGr: "Ζεύς", nameLat: "Zeus", numeral: "I", accent: "#F2F2F2", seal: `${A}/zeus/z-01.png` },
  { code: "hr", nameGr: "Ἥρα", nameLat: "Hera", numeral: "II", accent: "#6B1F2E", seal: `${A}/hera/hr-01.png` },
  { code: "po", nameGr: "Ποσειδῶν", nameLat: "Poseidon", numeral: "III", accent: "#1F4A3D", seal: `${A}/poseidon/po-01.png` },
  { code: "de", nameGr: "Δημήτηρ", nameLat: "Deméter", numeral: "IV", accent: "#C9A227", seal: `${A}/demeter/de-01.png` },
  { code: "at", nameGr: "Ἀθηνᾶ", nameLat: "Atena", numeral: "V", accent: "#6B7C3A", seal: `${A}/atena/at-01.png` },
  { code: "ap", nameGr: "Ἀπόλλων", nameLat: "Apolo", numeral: "VI", accent: "#E5C687", seal: `${A}/apolo/ap-01.png` },
  { code: "ar", nameGr: "Ἄρτεμις", nameLat: "Ártemis", numeral: "VII", accent: "#B8BFC4", seal: `${A}/artemis/ar-01.png` },
  { code: "ae", nameGr: "Ἄρης", nameLat: "Ares", numeral: "VIII", accent: "#8C3A2B", seal: `${A}/ares/ae-01.png` },
  { code: "af", nameGr: "Ἀφροδίτη", nameLat: "Afrodite", numeral: "IX", accent: "#C98474", seal: `${A}/afrodite/af-01.png` },
  { code: "he", nameGr: "Ἥφαιστος", nameLat: "Hefesto", numeral: "X", accent: "#D96C1F", seal: `${A}/hefesto/he-01.png` },
  { code: "hm", nameGr: "Ἑρμῆς", nameLat: "Hermes", numeral: "XI", accent: "#D9A441", seal: `${A}/hermes/hm-01.png` },
  { code: "di", nameGr: "Διόνυσος", nameLat: "Dionísio", numeral: "XII", accent: "#5B2A6B", seal: `${A}/dionisio/di-01.png` },
];
