# OLIMPO — Documento de Produção v2

Guia completo pra rodar no Claude Code com Higgsfield MCP (ou Gemini quando estourar limite).
**45 imagens catalogadas + 16 vídeos.** Cada asset tem ID, função, aspecto e prompt fechado.

---

## 0. Setup

```bash
claude mcp add --transport http --scope user higgsfield https://mcp.higgsfield.ai/mcp
```

Autentica no navegador → volta pro terminal → confirma com `/mcp`.

### Estrutura de pastas

```
/assets
  /_global      → G-01 … G-06
  /zeus         → Z-01 … Z-08
  /hera         → HR-01 … HR-03
  /poseidon     → PO-01 … PO-03
  ...
```

Nome do arquivo = ID em minúsculo. `z-01.png`, `z-01.mp4`.

---

## 1. As três linguagens visuais

Não misturar. Cada asset pertence a **uma** linguagem, indicada na tabela.

### Linguagem GESSO — estátua / mármore

Onde: hero, vídeos principais, retratos de deus.
É a linguagem do movimento. Mármore não tem pele, íris nem sangue — por isso o modelo não erra nela como erra em humano.

```
[GESSO]
weathered ancient greek marble statue, carved stone surface with visible
chisel marks, hairline cracks and chipped edges, patina and lichen in the
crevices, blank pupil-less carved eyes, sun-bleached cream and grey stone
with warm ochre staining, dramatic single-source raking light, deep shadow,
museum darkness background, shallow depth of field, cinematic photography,
photorealistic, film grain, no color on the stone itself
```

**Regra crítica:** a estátua é sempre **danificada**. Braço faltando, nariz lascado, rachadura. Estátua perfeita parece render de banco de imagem; estátua quebrada parece sobrevivente de 2500 anos. Sempre incluir o dano no prompt.

### Linguagem VASO — figura-vermelha / xilografia

Onde: painéis de mito, selos, ícones.
É a linguagem da narrativa. Chapada, 2D, sem risco de "derreter".

```
[VASO]
ancient greek red-figure vase painting, flat terracotta orange figures on
matte black background, clean confident black line work, internal anatomy
and drapery rendered as fine parallel incised lines, absolutely flat, no
shading, no gradient, no perspective, no depth, figures in strict profile or
three-quarter view, greek meander key border framing the panel, archaic
proportions, flat 2D panel artwork on a black rectangular background, NOT a
photograph of a physical vessel, no vase silhouette, no ceramic curvature, no
handles, no specular highlight, no studio background, no 3D object — the image
IS the painting, not an object with a painting on it
```

Referência: anexar `assets/_ref/vaso-ref.jpg` como reference image em **todo** prompt VASO. Trava o estilo muito melhor que texto.

### Linguagem GLIFO — grafismo / UI

Onde: bordas, divisores, texturas de fundo, ícones de interface.

```
[GLIFO]
single color flat vector graphic, terracotta orange on black, greek meander
key pattern, archaic greek alphabet letterforms, geometric, no shading, no
texture, seamless tileable, high contrast, ornamental border design
```

---

## 2. Paleta global

| Nome | Hex | Uso |
|---|---|---|
| Preto vaso | `#0D0D0D` | Fundo dominante do site |
| Terracota | `#D98F4E` | Cor de acento principal, figuras de vaso |
| Gesso | `#E8DCC4` | Texto, mármore claro |
| Ocre | `#8C5A2B` | Sombra, envelhecimento |
| Bronze | `#B08D57` | Detalhe, hover, borda |

Cada deus tem **uma** cor de acento própria (na ficha dele), sempre aplicada sobre essa base. Nunca troca a base.

---

## 3. CATÁLOGO — Globais (6 imagens)

| ID | Ling. | Aspecto | Função |
|---|---|---|---|
| G-01 | GESSO | 21:9 | Hero principal |
| G-02 | GLIFO | 1:1 tile | Borda de meandro (repetível) |
| G-03 | GESSO | 21:9 | Seção "colunata" (folhas caindo) |
| G-04 | GESSO | 16:9 | Textura de mármore de fundo |
| G-05 | VASO | 1:1 | Mapa do Olimpo (dashboard) |
| G-06 | GLIFO | 21:9 | Friso de rodapé |

**G-01 — Hero**
```
[GESSO] + a colossal marble statue of Zeus seen from extreme low angle,
head and shoulders only, crown of the head lost above frame, one side of the
face in deep shadow, large crack running down the cheek, storm-dark museum
void behind, dust suspended in the light shaft, extreme worm's-eye view from
directly below, camera at ground level looking steeply upward, thick heavy
carved beard in deep drilled curls, top of the head cropped out of frame, 21:9
```

**G-02 — Borda meandro**
```
[GLIFO] + classic greek meander key border strip, horizontal, seamless
tileable on both ends, thick lines, single row
```

**G-03 — Colunata (a seção que tu descreveu)**
```
[GESSO] + a row of weathered doric marble columns receding in perspective,
open roofless interior, late golden afternoon light raking between the
columns, dry olive leaves scattered across the stone floor, some suspended
mid-air falling, dust motes, empty of people, 21:9
```

**G-04 — Textura**
```
[GESSO] + extreme close-up of aged marble surface, veining, hairline cracks,
faint lichen, even soft light, flat-on frontal view, no subject, texture
study, seamless, 16:9
```

**G-05 — Mapa do Olimpo**
```
[VASO] + a schematic map of Mount Olympus as an ancient vase painting,
twelve small throne symbols arranged in a circle around a central peak,
meander border framing the whole composition, decorative, flat, 1:1
```

**G-06 — Friso de rodapé**
```
[GLIFO] + horizontal decorative frieze band, alternating palmette and lotus
motif, archaic greek letterforms integrated at intervals, seamless
tileable, 21:9
```

---

## 4. ZEUS — arco completo (8 imagens + 5 vídeos)

Zeus é a peça central. Quatro atos em scroll narrativo. É o único deus com arco.

**Cor de acento:** branco elétrico `#F2F2F2`
**Regra de composição:** contra-plongée sempre. A câmera nunca está no nível dele.

| ID | Ling. | Aspecto | Cena |
|---|---|---|---|
| Z-01 | GESSO | 3:4 | Retrato / card |
| Z-02 | VASO | 3:4 | Ato I — a pedra |
| Z-03 | GESSO | 16:9 | Ato I — cena em estátua |
| Z-04 | VASO | 3:4 | Ato II — os Curetes |
| Z-05 | GESSO | 16:9 | Ato II — a caverna |
| Z-06 | VASO | 3:4 | Ato III — a forja do raio |
| Z-07 | GESSO | 16:9 | Ato III — o primeiro raio |
| Z-08 | GESSO | 16:9 | Ato IV — Tifão sob o Etna |

### Ato I — A pedra (Reia engana Cronos)

Cronos devorava cada filho ao nascer. Reia pare Zeus escondido em Creta e entrega ao marido uma pedra enrolada em panos. Cronos engole sem olhar.
**O plano:** as mãos oferecendo o embrulho. A pedra é a protagonista, não o bebê.

**Z-02**
```
[VASO] + a seated colossal male figure reaching out to receive a swaddled
bundle from a standing female figure, the bundle clearly stone-shaped and
heavy, her other hand hidden behind her back, strict profile view, meander
border, 3:4
```

**Z-03**
```
[GESSO] + a marble relief carving of two hands offering a wrapped stone
bundle, the wrapping cloth carved in deep folds, the recipient's hand entering
frame from shadow, extreme close-up, single raking light from the left,
the stone bundle catching the light, 16:9
```

### Ato II — Os Curetes

Pra Cronos não ouvir o choro do bebê na caverna, guerreiros dançam batendo lança em escudo, sem parar, por anos. O som vira esconderijo.

**Z-04**
```
[VASO] + a ring of armed dancing warriors striking round shields with
spears, arranged in a circle, an empty cradle at the center of the ring,
rhythmic repetition of figures, meander border, 3:4
```

**Z-05**
```
[GESSO] + interior of a cave sanctuary, marble statues of armored warriors
standing in a circle facing inward, an empty carved stone cradle at the
center, torchlight from below, deep shadows on the cave ceiling, 16:9
```

### Ato III — A forja do raio

Zeus só vence a Titanomaquia quando liberta os Ciclopes do Tártaro. Em gratidão, eles forjam o raio. **O raio foi conquistado libertando prisioneiros — não é dele de nascença.** É o melhor material do site.

**Z-06**
```
[VASO] + three one-eyed giant smiths at an anvil, hammering a jagged
lightning bolt into shape, broken chains on the ground at their feet, sparks
rendered as flat radiating lines, meander border, 3:4
```

**Z-07**
```
[GESSO] + a marble statue of a one-eyed giant holding up a newly forged
jagged lightning bolt, the bolt the only source of light in total darkness,
harsh white light carving out the stone face from below, broken shackle
still on the wrist, 16:9
```

### Ato IV — Tifão

O último inimigo, cem cabeças de dragão. Numa versão, **Tifão vence primeiro** — arranca os tendões de Zeus e o deixa aleijado numa caverna. Hermes rouba os tendões de volta. Só então Zeus retorna e enterra Tifão sob o Etna. É por isso que o vulcão ainda cospe fogo.

**Z-08**
```
[GESSO] + a colossal fallen marble statue half-buried under volcanic rock
and ash, only the shoulder and part of a monstrous many-horned head visible,
smoke seeping from the cracks between the stones, mountain slope, ash falling,
dusk, 16:9
```

**Z-01 — Retrato**
```
[GESSO] + bust of Zeus, thick carved beard in deep drilled curls, blank
carved eyes, nose chipped away, hairline crack across the brow, three-quarter
view, extreme low angle, single hard light from above, black void, 3:4
```

---

## 5. CATÁLOGO — Os outros 11 (33 imagens)

Cada deus: **selo** (VASO 1:1) + **retrato** (GESSO 3:4) + **painel de mito** (VASO 3:4).
Cada ficha traz o mito escolhido, a cor de acento e a regra de composição.

---

### HERA — HR-01/02/03
**Mito:** as bodas sagradas e a perseguição a Io, transformada em vaca e vigiada por Argos de cem olhos.
**Acento:** vinho `#6B1F2E` · **Composição:** simetria obsessiva, tudo espelhado.
**Por que importa:** casamento grego era aliança política entre casas. A fúria de Hera não é ciúme — é defesa de legitimidade dinástica.

- **HR-01 selo:** `[VASO] + peacock feather eye motif in radial mandala, pomegranate at center, diadem, 1:1`
- **HR-02 retrato:** `[GESSO] + bust of a crowned woman, high diadem carved with rosettes, severe closed mouth, blank eyes, perfectly frontal and symmetrical, chipped crown, 3:4`
- **HR-03 painel:** `[VASO] + a standing woman gesturing toward a cow, a giant covered entirely in eyes standing guard behind the animal, peacock at her feet, meander border, 3:4`

---

### POSEIDON — PO-01/02/03
**Mito:** a disputa por Atenas. Ele golpeia a Acrópole e faz brotar uma fonte de água salgada. Atena planta a oliveira e vence. O deus imenso que perdeu.
**Acento:** verde-garrafa `#1F4A3D` · **Composição:** horizonte inclinado, nada nivelado.

- **PO-01 selo:** `[VASO] + trident whose tines become breaking waves, horse head emerging from the crest, rope knot border, 1:1`
- **PO-02 retrato:** `[GESSO] + bust of a bearded sea god, hair and beard carved as curling waves, encrusted with barnacles and salt residue, eroded surface, one ear broken off, 3:4`
- **PO-03 painel:** `[VASO] + a bearded figure striking rock with a trident, water bursting out in flat radiating lines, a female figure opposite planting a small olive tree, meander border, 3:4`

---

### DEMÉTER — DE-01/02/03
**Mito:** o rapto de Perséfone. Deméter para o mundo de crescer por luto — fome universal como greve de uma mãe.
**Acento:** trigo `#C9A227` · **Composição:** horizonte baixo, muito vazio acima.

- **DE-01 selo:** `[VASO] + wheat sheaf bound with cord, crossed torches behind, split pomegranate at base, 1:1`
- **DE-02 retrato:** `[GESSO] + bust of a veiled woman, carved drapery over the head, downturned mouth, deep eye sockets, weathered and stained, wheat carved into the veil border, 3:4`
- **DE-03 painel:** `[VASO] + a chariot descending into a dark chasm carrying a struggling female figure, a woman above reaching down with a torch in each hand, flowers scattered, meander border, 3:4`

---

### ATENA — AT-01/02/03
**Mito:** o nascimento — Zeus engole Métis, sofre dor de cabeça insuportável, Hefesto abre o crânio dele com um machado e Atena salta armada e adulta.
**Acento:** oliva `#6B7C3A` · **Composição:** geometria rígida, ângulos retos.

- **AT-01 selo:** `[VASO] + owl in strict frontal symmetry, crossed spear and olive branch behind, aegis shield, 1:1`
- **AT-02 retrato:** `[GESSO] + bust of a helmeted woman, corinthian helmet pushed back on the head, severe expression, blank eyes, chipped helmet crest, hard side light, 3:4`
- **AT-03 painel:** `[VASO] + a seated male figure with head split open, a small fully armed female warrior emerging from the crack, a smith with an axe standing beside, meander border, 3:4`

---

### APOLO — AP-01/02/03
**Mito:** ele mata a serpente Píton em Delfos e toma o oráculo pra si. A profecia que ele oferece é sempre ambígua.
**Acento:** ouro pálido `#E5C687` · **Composição:** simetria radial, luz central ofuscante.

- **AP-01 selo:** `[VASO] + lyre with strings radiating as sun rays, laurel wreath border, coiled serpent at base, 1:1`
- **AP-02 retrato:** `[GESSO] + bust of a beardless youth, long carved curls, idealized serene features, blank eyes, laurel wreath in stone, small chip on the lip, frontal, blinding light from directly behind creating rim glow, 3:4`
- **AP-03 painel:** `[VASO] + a youthful archer drawing a bow, a massive coiled serpent pierced by arrows below him, tripod and omphalos stone behind, meander border, 3:4`

---

### ÁRTEMIS — AR-01/02/03
**Mito:** Actéon a vê banhando-se, vira cervo e é devorado pelos próprios cães. A punição do olhar não autorizado.
**Acento:** prata `#B8BFC4` · **Composição:** sujeito distante e parcialmente obstruído.

- **AR-01 selo:** `[VASO] + crescent moon shaped as a drawn bow with nocked arrow, stag antlers framing, cypress border, 1:1`
- **AR-02 retrato:** `[GESSO] + bust of a young woman, hair bound up tightly, quiver strap carved across the shoulder, cold expression, blank eyes, partially obscured by carved foliage in the foreground, moonlight-toned, 3:4`
- **AR-03 painel:** `[VASO] + a bathing female figure turning sharply, a male figure with a stag's head recoiling, hounds leaping at him, water rendered as flat wave lines, meander border, 3:4`

---

### ARES — AE-01/02/03
**Mito:** Diomedes o fere na Ilíada — um mortal fura um deus, e Ares foge do campo berrando de dor.
**Acento:** ferrugem `#8C3A2B` · **Composição:** cortado, descentrado, primeiro plano obstruindo.
**Por que importa:** os gregos desprezavam Ares. Zeus diz na Ilíada que o odeia mais que todos os deuses. É o deus que a própria cultura rejeitava.

- **AE-01 selo:** `[VASO] + spear and round hoplite shield crossed, helmet with broken crest, vulture above, jagged border, 1:1`
- **AE-02 retrato:** `[GESSO] + bust of a helmeted warrior, full face-covering corinthian helmet, only shadow visible in the eye slits, deep gouges across the metal, off-center composition, harsh light, 3:4`
- **AE-03 painel:** `[VASO] + an armored god struck by a spear thrown by a smaller mortal warrior, the god recoiling backward with arms flung wide, a female figure guiding the mortal's arm, meander border, 3:4`

---

### AFRODITE — AF-01/02/03
**Mito:** o nascimento da espuma — ela surge do sangue de Urano castrado caído no mar. Desejo com origem em violência.
**Acento:** cobre-rosa `#C98474` · **Composição:** curvas, nenhuma linha reta.

- **AF-01 selo:** `[VASO] + scallop shell with dove above, roses and myrtle at base, wave border, curved lines only, 1:1`
- **AF-02 retrato:** `[GESSO] + bust of a woman with softly carved features, hair in loose waves, serene half-smile, blank eyes, surface worn smooth by water erosion, salt residue in the crevices, soft diffused light, 3:4`
- **AF-03 painel:** `[VASO] + a female figure rising from a large scallop shell on stylized waves, wind figures blowing from the sides, flat wave pattern below, meander border, 3:4`

---

### HEFESTO — HE-01/02/03
**Mito:** Hera o joga do Olimpo por ser deficiente. Ele constrói um trono dourado que prende a própria mãe, e só a liberta sob negociação.
**Acento:** brasa `#D96C1F` · **Composição:** claro-escuro extremo, uma única fonte quente.
**Por que importa:** o único olimpiano que trabalha, numa cultura aristocrática que desprezava trabalho manual. E o único deficiente.

- **HE-01 selo:** `[VASO] + hammer and anvil, crossed tongs behind, flame rising from the anvil face, tool border, 1:1`
- **HE-02 retrato:** `[GESSO] + bust of a bearded craftsman, working cap carved on the head, weathered lined face, blank eyes, soot staining in the crevices of the stone, lit only from below by warm forge light, 3:4`
- **HE-03 painel:** `[VASO] + a seated woman trapped in an ornate throne, invisible bonds holding her arms, a lame smith standing before her leaning on a staff, hammer in hand, meander border, 3:4`

---

### HERMES — HM-01/02/03
**Mito:** no dia em que nasce, rouba o gado de Apolo, apaga os rastros fazendo o gado andar de costas, e inventa a lira com um casco de tartaruga pra pagar pelo roubo.
**Acento:** âmbar `#D9A441` · **Composição:** diagonais, limiares, sempre entre dois lugares.

- **HM-01 selo:** `[VASO] + caduceus with two entwined serpents, winged sandals at base, tortoise shell lyre, herm marker border, 1:1`
- **HM-02 retrato:** `[GESSO] + bust of a young man wearing a winged travelling cap, sly slight smile, blank eyes, one wing of the cap broken off, three-quarter view turning as if caught mid-movement, diagonal light, 3:4`
- **HM-03 painel:** `[VASO] + an infant figure driving cattle backwards, hoofprints shown pointing the wrong direction, a tortoise shell lyre held up in one hand, meander border, 3:4`

---

### DIONÍSIO — DI-01/02/03
**Mito:** as Bacantes. Penteu tenta reprimir o culto e é despedaçado pelas próprias mãe e tias em transe, que o confundem com um leão.
**Acento:** roxo `#5B2A6B` · **Composição:** **quebra as regras dos outros onze.** Torto, assimétrico, foco errado.

- **DI-01 selo:** `[VASO] + thyrsus staff topped with pine cone, grape vines coiling asymmetrically, theatrical mask, deliberately off-center, irregular border, 1:1`
- **DI-02 retrato:** `[GESSO] + bust of a long-haired youth crowned with carved ivy and grape clusters, ambiguous serene-unsettling smile, blank eyes, tilted dutch angle, shallow chaotic focus, warm oversaturated light, 3:4`
- **DI-03 painel:** `[VASO] + frenzied female figures tearing apart a male figure, one holding up a severed head, ivy and thyrsus staves scattered, deliberately unbalanced composition, meander border, 3:4`

---

## 6. VÍDEOS (16)

**Regra de ouro:** todo vídeo nasce de uma imagem já aprovada (image-to-video). Nunca text-to-video.

### Vídeos GESSO — estátua viva (12)

Movimento pequeno e loopável. A estátua não "anda" — ela respira, racha, olha.

| ID | Base | Movimento |
|---|---|---|
| V-Z1 | Z-03 | mãos tremem levemente, o pano do embrulho se move, sombra avança |
| V-Z2 | Z-05 | luz de tocha pulsa em batida ritmada, sombras dos guerreiros oscilam |
| V-Z3 | Z-07 | o raio na mão intensifica e estala, sombras varrem a pedra |
| V-Z4 | Z-08 | fumaça sobe lenta das rachaduras, cinza cai, a pedra treme uma vez |
| V-HR | HR-02 | a estátua vira a cabeça exatamente 15 graus e trava |
| V-PO | PO-02 | água escorre pela pedra, luz caustica ondula na superfície |
| V-DE | DE-02 | geada avança pela pedra e depois recua, o véu de pedra se move |
| V-AT | AT-02 | poeira assenta, uma coruja pousa no ombro da estátua e vira a cabeça |
| V-AP | AP-02 | a luz de trás cresce até quase apagar a figura, depois recua |
| V-AE | AE-02 | rachadura se abre lentamente pelo elmo, poeira cai |
| V-HE | HE-02 | brasa pulsa em batida de martelo, faíscas sobem a cada pulso |
| V-DI | DI-02 | hera cresce visivelmente sobre a pedra, cor sangra e satura |

**Template de prompt de vídeo:**
```
animate this marble statue. [MOVIMENTO]. the camera does not move. the stone
does not become flesh. subtle, slow, loopable. cinematic, photorealistic,
film grain.
```

O `the stone does not become flesh` é importante — sem isso o modelo tende a "humanizar" a estátua e quebrar o efeito.

### Vídeos VASO — painel animado (4)

Movimento mínimo, tipo gif antigo. Só pros mitos mais fortes.

| ID | Base | Movimento |
|---|---|---|
| V-P1 | Z-06 | martelos sobem e descem, faíscas piscam |
| V-P2 | AT-03 | a rachadura no crânio abre, a figura emerge um pouco |
| V-P3 | AF-03 | ondas planas deslizam, a concha sobe e desce |
| V-P4 | DI-03 | figuras tremem em loop desalinhado |

**Template:**
```
animate this greek vase painting with minimal frame-by-frame motion. [MOVIMENTO].
keep the style absolutely flat, no added depth, no 3D, no shading. the black
background and meander border stay completely static. short seamless loop.
```

---

## 7. Animação por seção (front-end)

Cada section tem comportamento próprio. O layout conta a mesma história que a imagem.

| Seção | Fundo | Animação |
|---|---|---|
| Hero | V-Z3 (raio) | vídeo em loop, texto entra por fade |
| Colunata | G-03 | folhas caindo em CSS/canvas sobre a imagem estática |
| Olimpo (dashboard) | G-05 | 12 selos em círculo, hover acende, clique abre o deus |
| Arco do Zeus | Z-02→Z-08 | scroll narrativo, um ato por viewport |
| Deus individual | retrato GESSO | vídeo do deus em loop, painel VASO ao lado do texto |
| Rodapé | G-06 | friso estático |

**Regra de coerência:** cada seção de deus herda a **regra de composição** dele. A de Atena é rígida e alinhada. A de Hermes usa diagonais. A de Dionísio quebra o grid — desalinha de propósito. Se todas forem iguais, o trabalho de diferenciação das imagens se perde.

---

## 8. Ordem de execução

**Fase 1 — validação (não pular)**
1. Gera **G-01** → valida o bloco GESSO
2. Gera **AT-01** com a imagem de referência → valida o bloco VASO
3. Gera **G-02** → valida o bloco GLIFO
4. Ajusta os blocos se precisar. Só depois segue.

**Fase 2 — imagens em lote**
5. Todos os selos (11 + G-05) — rápidos e baratos
6. Todos os retratos GESSO (12)
7. Todos os painéis VASO (11)
8. Arco do Zeus (Z-02 … Z-08)
9. Globais restantes (G-03, G-04, G-06)

**Fase 3 — vídeos**
10. Um vídeo teste (V-Z3) → valida o template
11. Os 12 vídeos GESSO
12. Os 4 vídeos VASO

Vídeo é o mais caro em tempo e crédito. Sempre por último, com estilo já travado.

**Se acabar o crédito do Higgsfield:** os prompts são portáveis. Copia o bloco de estilo + o prompt do asset e roda no Gemini. Só manter a mesma imagem de referência pra não quebrar a coerência.

---

## 9. Checklist de qualidade

Antes de aprovar qualquer imagem:

- [ ] A estátua está **danificada**? (rachadura, lasca, membro faltando)
- [ ] Os olhos estão **vazios**, sem pupila?
- [ ] O painel VASO está **absolutamente chapado**, sem sombra nem profundidade?
- [ ] A borda de meandro está presente e fechada?
- [ ] A cor de acento do deus aparece, mas a base preta/terracota se mantém?
- [ ] Tem texto acidental na imagem? (modelo às vezes inventa letra grega errada — descartar)
- [ ] A regra de composição do deus foi respeitada?
