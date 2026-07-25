# OLIMPO — Frontend Spec (design system + copy global)

## Norte visual (DNA das referências favoritas)

Destilado de **cybercafe.tw · razorpay/sprint/26 · thorgal.com · reimaginegenesis.com**:

1. **Arte é a página.** Full-bleed, 100vh, sem card, sem moldura. O texto vive *sobre* a arte
   com overlay escuro — nunca ao lado dela num grid 50/50.
2. **Tipografia gigante e confiante.** O nome do deus ocupa a tela. Display pesado (Cinzel),
   corpo com serifa fina e elegante (Cormorant), UI quase invisível (Inter, tracking largo).
3. **Ritmo reverente.** Poucos elementos, muito silêncio. Cada seção respira. Entradas lentas
   (600–1000ms), nunca "saltitante". O drama vem da atmosfera, não de movimento grande.
4. **Atmosfera sempre presente.** Grain fixo (opacity < 0.03), poeira em canvas (≤30 partículas),
   névoa/luz volumétrica. A tela nunca é "limpa" — é um lugar antigo, com pó no ar.
5. **Transição é um momento.** Fade-to-black entre seções com 1 frase italic. Nunca corte seco.
6. **Escuro do começo ao fim.** Base `#0A0A0A`. A cor de acento do deus é um respingo, não um tema.
7. **Scroll conduz a história.** Reveal por scroll (IntersectionObserver / Framer `whileInView`),
   sticky quando o texto narra sobre uma imagem parada.

## Paleta (CSS vars)

```
--preto:     #0A0A0A   /* fundo dominante */
--terracota: #D98F4E   /* acento principal / figuras de vaso */
--gesso:     #E8DCC4   /* texto claro / mármore */
--ocre:      #8C5A2B   /* sombra / envelhecimento */
--bronze:    #B08D57   /* detalhe / hover / borda */
```
Acento por deus: ver `olimpo-landing-por-deus.md`. Sobre a base preta, nunca troca a base.

## Tipografia

- **Display:** Cinzel Decorative — nome dos deuses, "OLIMPO", numerais. Peso 700/900.
- **Corpo:** Cormorant Garamond — narrativa, epítetos (italic), frases de transição. 400/500, italic.
- **UI:** Inter — kickers, labels, "ATO I", numeração, créditos. 400/500, `letter-spacing` largo, UPPERCASE.
- Escala fluida com `clamp()`. Hero: `clamp(3.5rem, 14vw, 12rem)`. H2 de seção: `clamp(2rem, 6vw, 5rem)`.

## Leis inegociáveis (repetidas do doc do usuário)

Imagem=fundo 100vh + overlay · toda seção com 1 camada atmosférica · transição = fade-to-black
com frase · sem emoji (só SVG) · sem `border-radius` (exceto Afrodite) · sem cor fora da paleta ·
nenhuma seção com o mesmo layout · sem localStorage/sessionStorage.

---

## COPY — Loading

- Fundo preto puro. `OLIMPO` micro em Cinzel no centro, `%` contando em Inter, barra fina terracota.
- Frase que aparece uma vez, Cormorant italic: *"Antes dos homens, houve os que não morrem."*
- Ao chegar em 100%: fade lento (900ms) pro Hero, a barra vira a linha do "SCROLL".

## COPY — Hero

- Fundo: `v-z3.mp4` (o raio do ciclope) em loop, muted, `playsinline`, overlay 60%.
- `OLIMPO` em Cinzel gigante, revelado **letra a letra** (stagger 60ms).
- Subtítulo Cormorant italic: *"Doze tronos. Doze modos de ter poder — e de perdê-lo."*
- Kicker Inter em cima: `PANTEÃO OLÍMPICO · MMXXVI`
- Rodapé: `SCROLL` + linha vertical que pulsa. Meandro (`g-02.svg`) discreto nos 4 cantos.

## COPY — Arco do Zeus (4 atos)

Tese do arco: **o poder de Zeus não é de nascença — foi salvo por uma mentira, forjado por
prisioneiros, e devolvido depois de uma mutilação.** Câmera sempre em contra-plongée.

**ATO I — A pedra** · fundo `v-z1` (mãos tremendo) · painel `z-02`
> Cronos devorava cada filho ao nascer — um pai comendo o próprio futuro para que nenhum herdeiro
> o destronasse. Quando Zeus nasceu, Reia escondeu o bebê em Creta e entregou ao marido uma pedra
> enrolada em panos. Cronos engoliu sem olhar. O rei dos deuses foi salvo não por força, mas por
> um embrulho e um truque. A primeira arma do Olimpo foi uma mentira.

**ATO II — Os Curetes** · fundo `v-z2` (tocha pulsando) · painel `z-04`
> Para que Cronos não ouvisse o choro na caverna, guerreiros dançavam batendo lança contra escudo,
> sem parar, por anos. O barulho virou esconderijo. Zeus cresceu dentro de um ruído — protegido
> por um ritmo que nunca podia parar.

**ATO III — A forja do raio** · fundo `v-z3` (o raio) · painel `z-06`
> Zeus só venceu a guerra contra os Titãs quando libertou os Ciclopes presos no Tártaro. Em
> gratidão, os três ferreiros de um olho só — Trovão, Relâmpago e Brilho — forjaram o raio e o
> entregaram a ele. O raio, símbolo máximo do seu poder, foi presente de prisioneiros soltos.
> Não nasceu com ele. Foi conquistado libertando os esquecidos.

**ATO IV — Tifão** · fundo `v-z4` (fumaça do Etna) · painel `z-08`
> O último inimigo tinha cem cabeças de dragão. Numa versão, Tifão vence primeiro: arranca os
> tendões das mãos e dos pés de Zeus e o deixa aleijado numa caverna. Hermes rouba os tendões de
> volta. Só então Zeus retorna e enterra o monstro sob o Etna — e é por isso que o vulcão ainda
> cospe fogo. O rei dos deuses foi derrotado e mutilado antes de reinar.

**Fecho do arco (transição pro Panteão):**
> *Este é só um dos doze. Cada trono guarda uma história assim — de poder que veio torto.*
