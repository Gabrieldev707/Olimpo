// Fonte única de verdade do site. Copy derivada de olimpo-frontend-spec.md +
// olimpo-landing-por-deus.md + olimpo-producao-v2.md. Passo 0a.
// (11 deuses ganham 3 beats; Zeus é o arco de 4 atos.)

export const A = "/assets"; // raiz servida

export const hero = {
  kicker: "PANTEÃO OLÍMPICO · MMXXVI",
  title: "OLIMPO",
  subtitle: "Doze tronos. Doze modos de ter poder — e de perdê-lo.",
  video: `${A}/videos/v-zhero.mp4`,
  loadingPhrase: "Antes dos homens, houve os que não morrem.",
};

// Arco do Zeus — instância máxima do motor (4 atos). Câmera sempre em contra-plongée.
export const zeus = {
  code: "z",
  nameGr: "Ζεύς",
  nameLat: "Zeus",
  numeral: "I",
  accent: "#F2F2F2",
  epithet: "O rei que foi salvo por uma pedra, e armado por prisioneiros.",
  thesis:
    "O poder de Zeus não é de nascença — foi salvo por uma mentira, forjado por prisioneiros e devolvido depois de uma mutilação.",
  atos: [
    {
      n: "ATO I",
      titulo: "A pedra",
      video: `${A}/videos/v-z1.mp4`,
      painel: `${A}/zeus/z-02.png`,
      painelVideo: `${A}/videos/v-pz1.mp4`,
      texto:
        "Cronos devorava cada filho ao nascer — um pai comendo o próprio futuro para que nenhum herdeiro o destronasse. Quando Zeus nasceu, Reia escondeu o bebê em Creta e entregou ao marido uma pedra enrolada em panos. Cronos engoliu sem olhar. O rei dos deuses foi salvo não por força, mas por um embrulho e um truque. A primeira arma do Olimpo foi uma mentira.",
    },
    {
      n: "ATO II",
      titulo: "Os Curetes",
      video: `${A}/videos/v-z2.mp4`,
      painel: `${A}/zeus/z-04.png`,
      painelVideo: `${A}/videos/v-pz2.mp4`,
      texto:
        "Para que Cronos não ouvisse o choro na caverna, guerreiros dançavam batendo lança contra escudo, sem parar, por anos. O barulho virou esconderijo. Zeus cresceu dentro de um ruído — protegido por um ritmo que nunca podia parar.",
    },
    {
      n: "ATO III",
      titulo: "A forja do raio",
      video: `${A}/videos/v-z3.mp4`,
      painel: `${A}/zeus/z-06.png`,
      painelVideo: `${A}/videos/v-p1.mp4`,
      texto:
        "Zeus só venceu a guerra contra os Titãs quando libertou os Ciclopes presos no Tártaro. Em gratidão, os três ferreiros de um olho só — Trovão, Relâmpago e Brilho — forjaram o raio e o entregaram a ele. O raio, símbolo máximo do seu poder, foi presente de prisioneiros soltos. Não nasceu com ele. Foi conquistado libertando os esquecidos.",
    },
    {
      n: "ATO IV",
      titulo: "Tifão",
      video: `${A}/videos/v-z4.mp4`,
      texto:
        "O último inimigo tinha cem cabeças de dragão. Numa versão, Tifão vence primeiro: arranca os tendões das mãos e dos pés de Zeus e o deixa aleijado numa caverna. Hermes rouba os tendões de volta. Só então Zeus retorna e enterra o monstro sob o Etna — e é por isso que o vulcão ainda cospe fogo. O rei dos deuses foi derrotado e mutilado antes de reinar.",
    },
  ],
  fecho: "Este é só um dos doze. Cada trono guarda uma história assim — de poder que veio torto.",
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
