# POSEIDON — Especificação completa da landing page

## 1. Objetivo

Criar a landing page/dossiê de Poseidon dentro do projeto **Olimpo**, mantendo o mesmo universo editorial, arqueológico e mitológico da página de Atena, mas com identidade própria.

A página não deve parecer uma simples versão azul da página de Atena.

**Atena representa:** ordem, estratégia, geometria rígida, linhas retas e estabilidade.

**Poseidon deve representar:** instabilidade, profundidade, movimento, pressão, terremotos, tempestades, arrogância e uma força impossível de controlar completamente.

A interface deve parecer viva, como se estivesse sendo pressionada, deslocada e parcialmente submersa pelo oceano.

---

# 2. Conceito narrativo

## História principal

A história central será a disputa entre Poseidon e Atena pela proteção da cidade que futuramente receberia o nome de Atenas.

Poseidon golpeia a pedra da Acrópole com seu tridente. A terra se abre e das profundezas surge água salgada. Em algumas tradições, seu presente também está ligado ao nascimento do primeiro cavalo.

Atena oferece uma oliveira.

A água de Poseidon representa força, domínio, guerra, velocidade e poder imediato. A oliveira de Atena representa alimento, madeira, óleo, sombra, continuidade e prosperidade.

Os habitantes escolhem Atena.

> **Força impressiona. Sabedoria constrói.**

Poseidon não deve ser retratado apenas como um vilão irritado. A narrativa precisa mostrar a tragédia de uma divindade colossal que não entende por que os mortais preferiram estabilidade em vez de poder.

---

# 3. Direção visual geral

## 3.1 Mármore ou gesso fotorrealista

Usar principalmente em:

- hero;
- bustos;
- retratos;
- vídeos atmosféricos;
- momentos de presença divina.

Características:

- mármore envelhecido;
- rachaduras;
- marcas de cinzel;
- sal acumulado;
- erosão marítima;
- cracas discretas;
- olhos esculpidos sem pupilas;
- iluminação dramática;
- fundo escuro.

## 3.2 Pintura grega de figuras vermelhas

Usar principalmente em:

- narrativa dos mitos;
- golpe do tridente;
- disputa com Atena;
- emblemas;
- selos;
- ilustrações explicativas.

Características:

- fundo preto fosco;
- figuras em terracota;
- contornos pretos;
- linhas internas finas;
- borda grega de meandro;
- composição completamente plana;
- sem perspectiva;
- sem volume realista;
- sem formato físico de vaso;
- sem curvatura cerâmica.

## 3.3 Glifos e símbolos

Usar em:

- selo;
- navegação;
- ícones;
- marcadores;
- detalhes decorativos;
- transições entre seções.

---

# 4. Paleta de cores

Manter as cores globais do projeto:

- preto de vaso;
- terracota;
- creme de mármore;
- branco envelhecido.

Adicionar a paleta própria de Poseidon:

- azul-petróleo profundo;
- verde marítimo escuro;
- cinza de tempestade;
- branco de espuma;
- bronze oxidado.

Evitar:

- azul neon;
- ciano futurista;
- estética de aquário;
- praia tropical;
- fantasia genérica;
- brilho mágico excessivo;
- gradientes muito coloridos;
- visual de landing page SaaS.

O resultado deve parecer um artefato arqueológico encontrado no fundo do mar.

---

# 5. Estrutura da página

1. Hero monumental;
2. Ficha do deus;
3. Introdução narrativa;
4. Mito da disputa com Atena;
5. Momento interativo do golpe do tridente;
6. Contraste entre água e oliveira;
7. Seção “Por que isso importa”;
8. Selo de Poseidon;
9. Seção “Sob a superfície”;
10. Navegação dos doze tronos;
11. Rodapé.

---

# 6. Hero

## Conteúdo

**Dossiê:**

> Olimpo · Dossiê Nº 03 · Panteão Olímpico

**Nome grego:**

> ΠΟΣΕΙΔΩΝ

**Nome:**

> Poseidon

**Título principal:**

> O deus que golpeou a terra — e perdeu uma cidade para uma árvore.

**Texto de abertura:**

> Senhor do mar, dos terremotos e dos cavalos. Seu domínio começa onde a estabilidade termina.

**Microtexto de rolagem:**

> Desça até as profundezas.

## Composição

O hero deve ocupar aproximadamente `100svh`.

Poseidon deve aparecer como uma presença monumental, não como um personagem centralizado comum.

Usar:

- vídeo ou imagem da estátua ocupando uma lateral;
- rosto parcialmente escondido;
- tridente funcionando como eixo vertical;
- título grande e quebrado em linhas;
- letras gregas ao fundo;
- partículas de sal e sedimentos;
- pequenas linhas onduladas;
- profundidade criada por camadas;
- áreas amplas de escuridão.

## Vídeo

```text
public/assets/poseidon/videos/poseidon-hero.mp4
```

Fallback:

```text
public/assets/poseidon/posters/poseidon-hero.webp
```

Configuração:

```jsx
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster="/assets/poseidon/posters/poseidon-hero.webp"
/>
```

Não usar áudio automático.

---

# 7. Efeitos do hero

## 7.1 Vertical Parallax

Camadas diferentes movem-se em velocidades diferentes durante o scroll.

- fundo: movimento mínimo;
- letras gregas: movimento lento;
- estátua: movimento médio;
- texto principal: movimento leve;
- partículas: movimento independente.

Usar `useScroll`, `useTransform` e `motion.div`.

## 7.2 Sinking Hero

Quando o usuário começa a rolar, o hero deve parecer afundar.

- estátua desce lentamente;
- contraste diminui;
- camada azul-petróleo aumenta;
- conteúdo perde nitidez discretamente;
- título sofre pequeno deslocamento;
- bordas escurecem.

Não usar blur forte.

## 7.3 Underwater Refraction

Simular refração marítima discreta nas bordas da estátua, títulos decorativos, linhas de fundo e hover de imagens.

Pode ser criado com máscara CSS, filtro, pseudo-elemento e deslocamento de poucos pixels.

Não distorcer texto essencial.

## 7.4 Underwater Caustics

Padrões de luz semelhantes aos reflexos sob a água.

Aplicar sobre mármore, fundo do vídeo, placas arqueológicas e selo.

Usar textura, `mix-blend-mode: screen`, animação lenta de `background-position` e opacidade baixa.

## 7.5 Cinematic Vignette

Escurecimento gradual nas bordas do hero com gradiente radial.

## 7.6 Film Grain Overlay

Ruído visual sutil para integrar vídeos, imagens e fundos e evitar aspecto digital limpo demais.

Usar textura pequena repetida, baixa opacidade e `pointer-events: none`.

---

# 8. Ficha do deus

## Cabeçalho

> Ficha do deus

> § 01 — Identidade

## Informações

- **Domínio:** Mar — terremotos · tempestades · cavalos
- **Símbolos:** Tridente — golfinho · touro · cavalo
- **Acento:** Azul-petróleo — profundidade sobre preto-vaso
- **Composição:** Instabilidade controlada — ondas · diagonais · deslocamento
- **Cidade disputada:** Atenas — perdeu para a oliveira de Atena
- **Irmãos:** Zeus e Hades — céu · mar · mundo inferior
- **Temperamento:** Imprevisível — calmaria que pode se tornar catástrofe
- **Epíteto:** Sacudidor da Terra — o mar também se move sob o solo

Os cards devem parecer placas arqueológicas submersas, usando diferenças discretas de altura, bordas irregulares, sal, linhas diagonais e assimetria controlada.

## Efeitos

### Staggered Reveal

Cards entram progressivamente com opacidade, deslocamento vertical e atraso curto usando `staggerChildren` e `whileInView`.

### Submerged Card

O card parece emergir de uma camada escura usando máscara vertical, overlay azul-petróleo e mudança de contraste.

### Floating Drift

Movimento contínuo entre `2px` e `5px`, lento e desativado em `prefers-reduced-motion`.

---

# 9. Seção principal do mito

## Cabeçalho

> A cidade que escolheu outra deusa

> § 02 — O mito

## Abertura visual

```text
public/assets/poseidon/videos/poseidon-tridente.mp4
```

Fallback:

```text
public/assets/poseidon/posters/poseidon-tridente.webp
```

## Texto narrativo

> Uma cidade ainda sem nome procurava um patrono. Não bastava dominá-la: era necessário oferecer algo que justificasse ser lembrado por ela.

> Poseidon avançou primeiro. Ergueu o tridente e golpeou a pedra da Acrópole. O chão se abriu com violência. Das profundezas surgiu água, como se o próprio mar tivesse atravessado a terra para responder ao chamado de seu senhor.

> Era uma demonstração impossível de ignorar. O deus podia romper montanhas, criar fontes e fazer o solo tremer. Em algumas versões, daquele golpe também nasceu o primeiro cavalo — velocidade, guerra e domínio transformados em carne.

> Então Atena aproximou-se sem tempestade. Não abriu a terra. Plantou uma oliveira.

> A árvore oferecia alimento, óleo, madeira, sombra e continuidade. Poseidon entregou a força de um instante. Atena entregou aquilo que permaneceria depois dele.

> O povo escolheu a deusa. A cidade recebeu o nome de Atenas.

> Poseidon perdeu diante dos mortais. Não porque seu presente fosse fraco, mas porque era poderoso demais para uma cidade que precisava sobreviver.

> **Força impressiona. Sabedoria constrói.**

## Efeitos

### Scroll Reveal

Parágrafos aparecem gradualmente com opacidade e pequeno deslocamento vertical.

### Image Wipe Reveal

A imagem ou vídeo é revelado como se uma camada de água estivesse recuando, usando `clip-path`, máscara CSS ou overlay animado.

### Horizontal Text Drift

Títulos decorativos deslocam entre `20px` e `40px` durante o scroll. Não aplicar em parágrafos.

### Sticky Scrollytelling

No desktop, o vídeo permanece fixo enquanto os textos avançam ao lado. No mobile, usar fluxo vertical normal.

---

# 10. Momento interativo do golpe do tridente

## Sequência

1. Superfície escura de pedra ocupa a tela;
2. Tridente se aproxima;
3. Impacto acontece no centro;
4. Rachadura atravessa a composição;
5. Água aparece por dentro da abertura;
6. Surge a frase “A terra também pertence ao mar”;
7. Pequena oliveira aparece;
8. Oliveira permanece imóvel;
9. Água continua em movimento.

> A terra também pertence ao mar.

## Efeitos

### Scroll-Driven Animation

Controlar toda a sequência pelo scroll com `useScroll` e `useTransform`.

Etapas:

- `0.00–0.20`: aproximação do tridente;
- `0.20–0.35`: impacto;
- `0.35–0.55`: rachadura;
- `0.55–0.70`: água;
- `0.70–0.85`: frase;
- `0.85–1.00`: oliveira.

### Trident Strike

O tridente desce rapidamente com `translateY`, pequena rotação e desaceleração forte.

### Controlled Screen Shake

Vibração curta entre `2px` e `5px`, inferior a `400ms`, apenas uma vez e desativada em `prefers-reduced-motion`.

### SVG Crack Draw

Rachadura desenhada progressivamente usando `pathLength`, `stroke-dasharray` ou `stroke-dashoffset`.

A rachadura deve parecer orgânica, não um raio elétrico.

### Water Mask Reveal

Água aparece dentro da rachadura com máscara SVG, `clip-path`, pseudo-elemento, gradiente animado ou vídeo curto.

### Ripple Distortion

Onda visual suave após o impacto. Aplicar apenas em áreas decorativas, nunca no texto principal.

### Olive Tree Growth Reveal

Se for SVG, usar `pathLength` no tronco e `scale`/`opacity` nas folhas. Se for imagem, usar máscara vertical e leve crescimento de escala.

---

# 11. Contraste entre Poseidon e Atena

## Lado de Poseidon

- tridente;
- água em movimento;
- rachadura;
- linhas curvas;
- ruído;
- instabilidade;
- azul-petróleo.

## Lado de Atena

- oliveira;
- linhas retas;
- composição estável;
- quase nenhum movimento;
- acento oliva;
- silêncio visual.

## Vídeo

```text
public/assets/poseidon/videos/poseidon-atenas.mp4
```

Fallback:

```text
public/assets/poseidon/posters/poseidon-atenas.webp
```

## Efeitos

### Split Contrast Composition

Divisão visual entre força e permanência, ruptura e construção, movimento e estabilidade.

### Focus Shift

O foco visual começa na água e termina na oliveira usando contraste, opacidade, iluminação e escala discreta.

---

# 12. Por que isso importa

Poseidon representa forças que os gregos admiravam e temiam.

O mar permite viajar, comercializar, conquistar, pescar e sobreviver, mas também destrói navios sem aviso.

O terremoto pertence ao mesmo deus porque tanto o oceano quanto o solo aparentemente estável podem começar a se mover.

A derrota para Atena define sua linguagem visual:

- Atena é linha reta;
- Poseidon é ruptura;
- Atena constrói a cidade;
- Poseidon revela o que existe abaixo dela;
- Atena é o plano;
- Poseidon é aquilo que nenhum plano controla.

## Efeito

### Editorial Quote Reveal

A frase principal entra em destaque acompanhada por linha ou moldura que se desenha.

---

# 13. O selo

## Cabeçalho

> O selo

> § 03 — Emblema

## Elementos

- tridente central;
- duas ondas;
- cavalo ou cabeça de cavalo;
- golfinho;
- borda de meandro;
- terracota sobre preto;
- composição plana;
- sem efeito 3D.

## Texto

> O tridente separa e reúne os três domínios de seu poder: o mar, o terremoto e o cavalo. Ao redor dele, a água nunca forma um círculo perfeito. Diferente da geometria de Atena, o selo de Poseidon ameaça escapar da própria borda.

## Efeitos

### Seal Line Draw

Selo desenhado progressivamente com SVG.

### Subtle Seal Rotation

Rotação de até `2deg` no hover.

### Border Escape

Algumas linhas de onda ultrapassam discretamente a moldura.

---

# 14. Sob a superfície

## Cabeçalho

> Sob a superfície

> § 04 — O que o mar guarda

## O cavalo

Poseidon não representa somente o oceano. O cavalo compartilha a mesma energia: velocidade, espuma, força muscular e movimento impossível de interromper.

## O terremoto

Seu epíteto Enosichthon, “Sacudidor da Terra”, lembra que seu reino não termina na costa. O mar também existe sob aquilo que parece sólido.

## A ira

A fúria de Poseidon não deve ser tratada como simples raiva. Ela é uma mudança de estado: calmaria tornando-se catástrofe.

## Efeitos

### Layered Depth

Cada fragmento ocupa uma profundidade visual diferente.

### Depth Parallax

Camadas movem-se em velocidades distintas.

### Underwater Fade

Elementos parecem emergir da escuridão azul-petróleo.

### Current Drift

Linhas e partículas movem-se horizontalmente como uma corrente marítima lenta.

---

# 15. Vídeo de fundo

```text
public/assets/poseidon/videos/poseidon-loop.mp4
```

Fallback:

```text
public/assets/poseidon/posters/poseidon-loop.webp
```

Pode ser usado em “Sob a superfície”, transições, área anterior ao selo ou fundo final.

## Efeito

### Seamless Ambient Loop

O início e o fim devem possuir frames semelhantes, movimento lento, nenhum corte brusco e nenhum áudio.

---

# 16. Navegação dos doze tronos

Reutilizar o componente existente.

Poseidon deve aparecer como ativo.

**Tooltip de Poseidon:**

> O mar sob todas as coisas.

**Tooltip de Atena:**

> A cidade que ele não conquistou.

## Efeitos

### Active Throne Pulse

Pulsação discreta de opacidade no trono ativo.

### Myth Connection Line

Linha visual conectando Poseidon e Atena.

### Underline Draw

Linha desenhada sob o nome no hover e foco.

### Accessible Focus Ring

Estado de foco visível para teclado.

---

# 17. Transições entre seções

## Wave Section Divider

Separador com linha ondulada ou máscara discreta.

## Diagonal Section Cut

Algumas seções terminam em corte diagonal.

## Depth Fade Transition

Transição do preto para azul-petróleo profundo.

## Sediment Particle Transition

Partículas discretas atravessam a mudança de seção.

## Color Bleed

Azul-petróleo invade lentamente uma seção preta ou terracota. Usar com moderação.

---

# 18. Microinterações

## Underline Draw

Aplicar em links.

## Subtle Lift

Cards sobem cerca de `3px` no hover.

## Refraction Hover

Imagens recebem pequeno deslocamento e borda ondulada, sem prejudicar a leitura.

## Pressure Press

Botões reduzem para `scale(0.98)` ao clicar.

## Symbol Trace

Linhas dos símbolos são redesenhadas ou iluminadas no hover.

---

# 19. Tipografia e hierarquia

Manter a tipografia editorial do projeto.

## Hero

- título muito grande;
- letras gregas decorativas;
- largura controlada;
- quebras de linha intencionais.

## Títulos de seção

- numeração;
- marcador com `§`;
- contraste entre título e legenda;
- alinhamento variável.

## Corpo

- largura entre `55ch` e `70ch`;
- altura de linha ampla;
- contraste adequado.

## Destaques

Usar itálico, caixa alta pequena, linhas, molduras, terracota e branco de espuma. Evitar excesso de negrito.

---

# 20. Responsividade

## Desktop

- sticky storytelling;
- parallax completo;
- duas colunas;
- vídeos maiores;
- título monumental;
- navegação expandida.

## Tablet

- reduzir deslocamentos;
- diminuir complexidade do parallax;
- manter duas colunas quando houver espaço.

## Mobile

- layout vertical;
- remover sticky prolongado;
- reduzir ou desligar screen shake;
- simplificar o golpe do tridente;
- limitar partículas;
- reduzir título;
- impedir overflow horizontal;
- garantir áreas de toque confortáveis;
- manter a história compreensível sem efeitos.

---

# 21. Acessibilidade

Obrigatório:

- HTML semântico;
- contraste adequado;
- textos alternativos;
- navegação por teclado;
- foco visível;
- vídeos sem áudio;
- conteúdo não dependente de hover;
- fallback para vídeos;
- suporte a `prefers-reduced-motion`.

Quando `prefers-reduced-motion: reduce` estiver ativo:

- remover parallax;
- remover floating drift;
- remover screen shake;
- remover animações contínuas;
- trocar vídeos decorativos por poster quando necessário;
- manter apenas fades simples;
- preservar todo o conteúdo.

---

# 22. Desempenho

- não instalar bibliotecas novas;
- usar Motion já instalado;
- evitar listeners manuais pesados;
- usar `useScroll` e `useTransform`;
- carregar vídeos com `preload="metadata"`;
- usar posters;
- comprimir vídeos;
- usar WebP ou AVIF;
- evitar filtros SVG pesados em tela inteira;
- limitar partículas;
- animar principalmente `transform` e `opacity`;
- evitar animação contínua de `box-shadow`;
- não carregar assets fora da viewport sem necessidade.

---

# 23. Arquivos de vídeo

```text
public/assets/poseidon/videos/poseidon-hero.mp4
public/assets/poseidon/videos/poseidon-tridente.mp4
public/assets/poseidon/videos/poseidon-atenas.mp4
public/assets/poseidon/videos/poseidon-loop.mp4
```

Posters:

```text
public/assets/poseidon/posters/poseidon-hero.webp
public/assets/poseidon/posters/poseidon-tridente.webp
public/assets/poseidon/posters/poseidon-atenas.webp
public/assets/poseidon/posters/poseidon-loop.webp
```

Se os vídeos ainda não existirem:

- criar a estrutura dos caminhos;
- usar posters ou imagens existentes;
- não quebrar a página;
- não criar links externos;
- não inventar arquivos;
- deixar a substituição simples.

---

# 24. Checklist final de UI/UX

1. A página pertence claramente ao mesmo projeto da Atena?
2. Poseidon possui identidade própria?
3. A página parece mais do que um recolor azul?
4. O mito é compreensível para quem não conhece mitologia?
5. O hero transmite profundidade e ameaça?
6. A leitura continua boa?
7. Os efeitos reforçam a história?
8. Há excesso de movimento?
9. A oliveira recebe destaque suficiente?
10. O impacto do tridente parece elegante?
11. O mobile continua funcional?
12. O `prefers-reduced-motion` funciona?
13. Os vídeos possuem fallback?
14. A navegação por teclado funciona?
15. O build passa sem erros?

---

# 25. Instrução de implementação

Leia este documento integralmente.

Depois:

1. analise a estrutura atual do projeto;
2. localize a página de Atena;
3. reutilize os componentes e padrões adequados;
4. implemente a landing de Poseidon;
5. não instale novas dependências;
6. não remova código existente sem necessidade;
7. não faça commit nem push;
8. execute o build;
9. corrija os erros causados pelas alterações;
10. finalize apresentando os arquivos criados e modificados.

Não pare apenas no planejamento. Comece a implementação após a análise inicial.
