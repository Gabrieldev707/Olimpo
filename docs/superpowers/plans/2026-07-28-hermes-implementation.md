# Página de Hermes — plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finalizar `#/hermes` com hero de gesso, manifesto em vídeo, seis cenas narrativas, cinco notas audiovisuais e colofão no padrão aprovado de Atena e Poseidon.

**Architecture:** A configuração ampliada de `hermes` em `src/data/gods.js` continuará sendo a fonte única de copy, mídia e direção responsiva. `HermesArc.jsx` renderizará cenas, notas e navegação a partir desses dados, reutilizando `NotaCritica`, `PainelVaso` e `Colofao`; `PainelVaso` ganhará uma opção compatível para painéis somente em MP4.

**Tech Stack:** React 19, React Router 7, Vite 8, Tailwind CSS 4, Motion 12, ffmpeg/ffprobe para pôsteres derivados.

## Global Constraints

- Toda copy e comentário novo deve permanecer em pt-BR.
- Não adicionar bibliotecas.
- Não redesenhar Atena ou Poseidon.
- Não alterar nem reencodificar os vídeos existentes.
- Não gerar novas ilustrações; pôsteres devem ser quadros extraídos dos próprios vídeos.
- Manter `prefers-reduced-motion`.
- `src/data/gods.js` é a fonte única de copy e caminhos de assets.
- Todo asset servido deve existir também em `public/assets/`.
- Validar com `npm run build`; o projeto não possui scripts de lint ou testes.
- Preservar todas as mudanças preexistentes do worktree.

---

## Estrutura de arquivos

- `src/data/gods.js`: configuração completa `hermes`, incluindo cenas, notas, manifesto e colofão.
- `src/components/HermesArc.jsx`: composição da página, navegação, arte responsiva, manifesto e efeitos.
- `src/components/PainelVaso.jsx`: reprodução de painéis com lista opcional de formatos.
- `src/index.css`: controles, copy e keyframes exclusivos com prefixo `hm-`.
- `assets/hermes/`: imagens com nomes canônicos e pôsteres derivados.
- `public/assets/hermes/`: espelho das imagens e pôsteres.

### Task 1: Normalizar e espelhar os assets aprovados

**Files:**
- Create: `assets/hermes/hermes_hero_gesso.png`
- Create: `assets/hermes/hermes_apresenta_a_lira_a_apolo.png`
- Create: `assets/hermes/guia_das_almas_para_o_portal.png`
- Create: `assets/hermes/o_mensageiro_entre_dois_mundos.png`
- Create: `assets/hermes/v-hermes-b1-poster.jpg`
- Create: `assets/hermes/v-hermes-b2-poster.jpg`
- Create: `assets/hermes/v-hermes-b3-poster.jpg`
- Create: `assets/hermes/v-hermes-b4-poster.jpg`
- Create: `assets/hermes/v-hermes-b5-poster.jpg`
- Create: arquivos correspondentes em `public/assets/hermes/`

**Interfaces:**
- Consumes: imagens aprovadas atuais e `assets/videos/v-hermes-b1.mp4` a `v-hermes-b5.mp4`.
- Produces: URLs estáveis sob `/assets/hermes/` para `gods.js`.

- [ ] **Step 1: Criar cópias canônicas sem modificar os originais**

```powershell
Copy-Item -LiteralPath 'assets/hermes/ChatGPT Image Jul 28, 2026, 12_34_33 AM (1).png' -Destination 'assets/hermes/hermes_hero_gesso.png'
Copy-Item -LiteralPath 'assets/hermes/ChatGPT Image Jul 28, 2026, 12_58_44 AM (1).png' -Destination 'assets/hermes/hermes_apresenta_a_lira_a_apolo.png'
Copy-Item -LiteralPath 'assets/hermes/guia de passagem.png' -Destination 'assets/hermes/guia_das_almas_para_o_portal.png'
Copy-Item -LiteralPath 'assets/hermes/ChatGPT Image Jul 28, 2026, 12_58_44 AM (2).png' -Destination 'assets/hermes/o_mensageiro_entre_dois_mundos.png'
```

- [ ] **Step 2: Extrair um pôster do primeiro quadro de cada beat**

```powershell
1..5 | ForEach-Object {
  ffmpeg -y -ss 0 -i "assets/videos/v-hermes-b$_.mp4" -frames:v 1 -q:v 2 "assets/hermes/v-hermes-b$_-poster.jpg"
}
```

Expected: cinco JPEGs 16:9 sem texto incorporado.

- [ ] **Step 3: Espelhar as sete imagens narrativas/hero e cinco pôsteres**

Copiar para `public/assets/hermes/`:

```text
hermes_hero_gesso.png
o_abrigo_da_luz_celestial.png
a_noite_de_hermes_com_o_gado.png
hermes_apresenta_a_lira_a_apolo.png
o_herói_e_o_gigante_adormecido.png
guia_das_almas_para_o_portal.png
o_mensageiro_entre_dois_mundos.png
v-hermes-b1-poster.jpg
v-hermes-b2-poster.jpg
v-hermes-b3-poster.jpg
v-hermes-b4-poster.jpg
v-hermes-b5-poster.jpg
```

- [ ] **Step 4: Verificar integridade**

Run:

```powershell
Get-ChildItem assets/hermes,public/assets/hermes -File |
  Where-Object { $_.Name -match 'hermes_hero|celestial|gado|lira_a_apolo|gigante|almas|dois_mundos|poster' } |
  Select-Object Directory,Name,Length
```

Expected: pares fonte/público com tamanho maior que zero.

### Task 2: Permitir painéis somente em MP4

**Files:**
- Modify: `src/components/PainelVaso.jsx:16-76`

**Interfaces:**
- Consumes: `formatos?: Array<"webm" | "mp4">`.
- Produces: `PainelVaso({ src, poster, legenda, borda, formatos = ["webm", "mp4"] })`.
- Compatibility: chamadas de Poseidon continuam gerando WebM seguido de MP4.

- [ ] **Step 1: Registrar a falha atual**

Confirmar que `PainelVaso` monta sempre `${src}.webm` e `${src}.mp4`, embora Hermes só possua MP4.

- [ ] **Step 2: Implementar fontes configuráveis**

Alterar a assinatura:

```jsx
export default function PainelVaso({
  src,
  poster,
  legenda,
  borda,
  formatos = ["webm", "mp4"],
}) {
```

Substituir as duas fontes fixas por:

```jsx
{formatos.map((formato) => (
  <source
    key={formato}
    src={`${src}.${formato}`}
    type={`video/${formato}`}
  />
))}
```

- [ ] **Step 3: Verificar compatibilidade por build**

Run: `npm run build`

Expected: build concluído sem erro de JSX; Poseidon mantém o valor padrão.

### Task 3: Transformar `hermes` em configuração editorial completa

**Files:**
- Modify: `src/data/gods.js:146-210`

**Interfaces:**
- Produces: `hermes.hero`, `hermes.manifesto`, `hermes.cenas`, `hermes.notas`, `hermes.colofao`.
- Consumed by: `HermesArc`, `NotaCritica`, `Colofao`, `bibliografia`.

- [ ] **Step 1: Substituir o modelo antigo de cinco atos**

Manter identidade:

```js
code: "hm",
nameGr: "Ἑρμῆς",
nameLat: "Hermes",
numeral: "XI",
gold: "#D9A441",
goldBright: "#F0C674",
goldDeep: "#9C6A24",
preto: "8,7,6",
```

Adicionar:

```js
hero: {
  art: `${A}/hermes/hermes_hero_gesso.png`,
  titulo: "HERMES",
  kicker: "TRONO XI · ἙΡΜΗΣ",
  subtitulo: "O deus das passagens — entre verdade e mentira, vivos e mortos.",
  paragrafo: "Mensageiro dos deuses, senhor dos caminhos e guia das almas.",
},
manifesto: {
  video: `${A}/videos/v-hermes-hero.mp4`,
  kicker: "O DEUS DAS PASSAGENS",
  titulo: "ENTRE UM MUNDO E OUTRO, SEMPRE EXISTE UMA PASSAGEM.",
},
```

- [ ] **Step 2: Declarar seis cenas na ordem aprovada**

Cada cena deve conter `id`, `kind`, `capitulo`, `art`, `alt`, `focus`, `copy`, `kicker`, `titulo`, `subtitulo`, `paragrafo` e `timeline`.

| ID | Arte | Tema |
|---|---|---|
| `hermes-scene-01` | `o_abrigo_da_luz_celestial.png` | Nascimento e tartaruga |
| `hermes-scene-02` | `a_noite_de_hermes_com_o_gado.png` | Roubo do gado |
| `hermes-scene-03` | `hermes_apresenta_a_lira_a_apolo.png` | Lira e reconciliação |
| `hermes-scene-04` | `o_herói_e_o_gigante_adormecido.png` | Argos e Io |
| `hermes-scene-05` | `guia_das_almas_para_o_portal.png` | Hermes Psicopompo |
| `hermes-scene-06` | `o_mensageiro_entre_dois_mundos.png` | Travessia entre mundos |

- [ ] **Step 3: Declarar seis notas críticas**

Mapeamento audiovisual:

```js
painel: {
  src: `${A}/videos/v-hermes-b1`,
  poster: `${A}/hermes/v-hermes-b1-poster.jpg`,
  formatos: ["mp4"],
  legenda: "Prancha audiovisual: Hermes conduz o rebanho de Apolo durante a noite.",
}
```

Aplicar o mesmo formato a b2–b5. A nota posterior à cena 01 não recebe `painel`.

Fontes mínimas:

```text
Hino Homérico a Hermes 1–61       nascimento e tartaruga
Hino Homérico a Hermes 68–154     roubo do gado
Hino Homérico a Hermes 418–502    lira, troca e reconciliação
Apolodoro, Biblioteca II.1.3      Hermes e Argos
Homero, Odisseia XXIV.1–14        condução das almas
Hino Homérico a Hermes 515–573    funções e atributos
```

Toda afirmação factual deve receber `fonte`; divergências devem ser explicitadas em `ressalva`.

- [ ] **Step 4: Declarar legado e colofão**

```js
legado: {
  kicker: "EPÍLOGO · AQUELE QUE SEMPRE CHEGA",
  titulo: "NENHUMA FRONTEIRA O RETÉM",
  texto: "Hermes aparece quando alguém precisa atravessar, entregar, negociar, escapar ou encontrar o caminho.",
},
colofao: {
  creditos: [
    { papel: "Texto e pesquisa", valor: "Gabriel" },
    { papel: "Desenvolvimento", valor: "React · Vite · Tailwind" },
    { papel: "Ilustrações", valor: "geradas com IA, sob direção e composição do autor" },
  ],
  nota: "As cenas são leituras de fontes antigas, não reconstituições históricas.",
},
```

- [ ] **Step 5: Verificar dados e bibliografia**

Run:

```powershell
rg -n "hermes-scene-0[1-6]|v-hermes-b[1-5]|formatos: \\[\"mp4\"\\]" src/data/gods.js
```

Expected: seis cenas, cinco painéis e cinco declarações MP4.

### Task 4: Reconstruir a página de Hermes no padrão editorial aprovado

**Files:**
- Modify: `src/components/HermesArc.jsx:1-189`

**Interfaces:**
- Consumes: `hermes` e `pantheon` de `gods.js`.
- Consumes: `DustCanvas`, `NotaCritica`, `Colofao`, Motion e React Router.
- Produces: rota `#/hermes` sem mudança em `App.jsx`.

- [ ] **Step 1: Criar navegação e controle de cena**

Implementar estas interfaces:

| Unidade | Contrato |
|---|---|
| `useIrPara(reduce)` | recebe um id ou hash, chama `scrollIntoView` com movimento condicionado e transfere o foco |
| `useCenaAtiva(ids)` | observa os ids e devolve `{ ativa, algumaVisivel }` usando a maior razão de interseção |
| `Cabecalho({ onAbrirMenu, menuNoTopo })` | mostra `OLIMPO / HERMES` e o botão de menu |
| `IndiceTronos({ visivel })` | mostra `11 / 12` e as rotas já disponíveis |
| `MenuOverlay({ aberto, onFechar, cenas, cenaAtiva, irPara })` | lista cenas e os doze tronos, com foco contido enquanto aberto |

Requisitos:

- alvo mínimo de 48 px;
- `aria-current` na cena e no trono;
- Escape fecha o menu;
- foco retorna ao botão que abriu;
- rail somente nas primeiras cenas e nunca sobre notas/colofão.

- [ ] **Step 2: Implementar hero estático**

```jsx
<section id="hermes-hero" aria-labelledby="hermes-hero-title">
  <ArteHero src={hermes.hero.art} />
  <CopyHero hero={hermes.hero} />
</section>
```

Desktop: copy à esquerda, figura preservada no centro/direita. Mobile: arte superior e copy inferior quando necessário.

- [ ] **Step 3: Implementar manifesto em vídeo**

O componente local `ManifestoVideo({ manifesto })` deve:

- montar `v-hermes-hero.mp4`;
- usar `muted`, `loop`, `playsInline`, `preload="metadata"`;
- tocar apenas quando visível;
- mostrar título HTML sobre o vídeo;
- usar imagem do hero como fallback/reduced motion.

- [ ] **Step 4: Implementar cena responsiva**

Assinaturas:

```jsx
function Cena({ cena, cenas, index, irPara })
function Arte({ cena, index, progresso, reduce, inView })
function Copy({ cena, surge, tl })
function CenaFX({ id })
```

Desktop usa grade de doze colunas e véu declarado em `cena.copy.veu`. Mobile empilha arte, copy e navegação.

- [ ] **Step 5: Intercalar cenas e notas**

```jsx
{cenas.map((cena, i) => {
  const nota = notas.find((item) => item.apos === cena.id);
  return (
    <Fragment key={cena.id}>
      <Cena cena={cena} cenas={cenas} index={i} irPara={irPara} />
      {nota && <NotaCritica nota={nota} irPara={irPara} paleta={PALETA_NOTA} />}
    </Fragment>
  );
})}
```

- [ ] **Step 6: Renderizar legado e colofão**

Adicionar `Legado` depois da sexta nota e reutilizar:

```jsx
<Colofao
  deus={hermes}
  paleta={PALETA_NOTA}
  botaoClasse="hm-btn"
  passagem={{
    kicker: "A PASSAGEM CONTINUA · SEGUE O PRÓXIMO",
    frase: "Dos caminhos de Hermes, o olhar retorna ao Panteão.",
    label: "VOLTAR AO PANTEÃO →",
    to: "/",
    topo: "#hermes-hero",
  }}
/>
```

- [ ] **Step 7: Verificar JSX**

Run: `npm run build`

Expected: importações resolvidas e rota compilada.

### Task 5: Implementar a identidade visual responsiva

**Files:**
- Modify: `src/index.css:78` e bloco novo após os controles de Poseidon/Atena.

**Interfaces:**
- Produces: `.hm-btn`, `.hm-copy`, `.hm-rail-item`, `.hm-video`, keyframes `hm-*`.

- [ ] **Step 1: Adicionar controles e legibilidade**

Criar `.hm-btn` com borda `#9C6A24`, texto `#F0C674`, hover âmbar contido, foco visível e altura mínima de 48 px.

Criar `.hm-copy` com text-shadow equivalente a Atena/Poseidon, sem alterar `.at-copy` ou `.po-copy`.

- [ ] **Step 2: Adicionar movimento exclusivo**

Criar:

```css
@keyframes hm-rastro {
  from { transform: translate3d(-8%, 8%, 0); opacity: 0; }
  30% { opacity: 0.45; }
  to { transform: translate3d(8%, -8%, 0); opacity: 0; }
}
@keyframes hm-limiar {
  from { transform: translateX(-110%); opacity: 0; }
  35% { opacity: 0.35; }
  to { transform: translateX(110%); opacity: 0; }
}
@keyframes hm-flutua {
  from { transform: translate3d(0, 0.45%, 0) scale(1); }
  to { transform: translate3d(0, -0.55%, 0) scale(1.008); }
}
```

Usar somente transform e opacity. Nenhuma animação deve simular peso ou impacto.

- [ ] **Step 3: Garantir reduced motion**

O media query global existente já reduz animações; classes `hm-*` não devem sobrescrevê-lo.

- [ ] **Step 4: Verificar CSS por build**

Run: `npm run build`

Expected: Tailwind processa todas as classes e gera CSS sem erro.

### Task 6: Validar conteúdo, mídia e responsividade

**Files:**
- Verify: `src/data/gods.js`
- Verify: `src/components/HermesArc.jsx`
- Verify: `src/components/PainelVaso.jsx`
- Verify: `src/index.css`
- Verify: `public/assets/hermes/`

**Interfaces:**
- Produces: evidência de build e inspeção visual.

- [ ] **Step 1: Executar validação técnica**

Run:

```powershell
npm run build
```

Expected: exit code 0.

- [ ] **Step 2: Iniciar o servidor local**

Run: `npm run dev -- --host 127.0.0.1 --port 5173`

- [ ] **Step 3: Inspecionar desktop**

Abrir `http://127.0.0.1:5173/#/hermes` em 1440 × 1000 e conferir:

- hero com gesso;
- manifesto com vídeo;
- seis imagens sem repetição;
- cinco vídeos dentro das notas;
- copy legível;
- menu, rail, notas, legado e colofão.

- [ ] **Step 4: Inspecionar mobile**

Redimensionar para 390 × 844 e conferir:

- ausência de rolagem horizontal;
- rostos e objetos narrativos preservados;
- arte acima da copy;
- menu acessível;
- botões com 48 px;
- vídeos sem autoplay simultâneo.

- [ ] **Step 5: Conferir console e rede**

Expected:

- nenhum erro de import;
- nenhum 404 para `.webm` de Hermes;
- nenhum asset de Hermes ausente;
- única mídia tocando por vez.

- [ ] **Step 6: Revisar o diff**

Run:

```powershell
git diff --check
git diff --stat
```

Confirmar que Atena, Poseidon e `App.jsx` não foram modificados.
