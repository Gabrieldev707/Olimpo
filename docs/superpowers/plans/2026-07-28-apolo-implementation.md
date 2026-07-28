# Apolo Editorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** reconstruir `/apolo` com hero, manifesto estático, cinco capítulos,
cinco notas fotográficas, navegação completa, legado e colofão.

**Architecture:** `src/data/gods.js` permanece a fonte única de copy e assets.
`ApoloArc.jsx` consome esse objeto e compõe a página com os componentes
compartilhados `NotaCritica`, `PainelVaso` e `Colofao`. Assets recebem nomes
canônicos e são espelhados em `public/assets/apolo/`.

**Tech Stack:** Vite 8, React 19, React Router 7, Tailwind CSS 4 e Motion.

## Global Constraints

- Copy e comentários em pt-BR.
- Não adicionar bibliotecas.
- Não usar os vídeos `v-apolo-b1…b5`.
- Toda copy e caminho de asset vive em `src/data/gods.js`.
- Todo asset novo deve existir em `assets/` e `public/assets/`.
- Respeitar `prefers-reduced-motion`.
- Validar com `npm run build`; o projeto não possui testes ou linter.

---

### Task 1: Normalizar o catálogo visual

**Files:**
- Create: `assets/apolo/apolo_hero_da_luz_e_da_musica.png`
- Create: `assets/apolo/o_nascimento_de_apolo_em_delos.png`
- Create: `assets/apolo/apolo_derrota_piton_em_delfos.png`
- Create: `assets/apolo/dafne_se_torna_loureiro.png`
- Create: `assets/apolo/o_concurso_de_apolo_e_marsias.png`
- Create: `assets/apolo/cassandra_diante_da_profecia.png`
- Create: `assets/apolo/nota_*.png`
- Mirror: `public/assets/apolo/`

**Interfaces:**
- Consumes: os onze arquivos aprovados na pasta `assets/apolo/`.
- Produces: onze caminhos canônicos usados por `apolo` em `gods.js`.

- [ ] Copiar cada origem para o nome canônico definido na especificação.
- [ ] Espelhar os onze nomes em `public/assets/apolo/`.
- [ ] Comparar SHA-256 entre fonte e espelho; todos devem coincidir.

### Task 2: Estruturar os dados editoriais

**Files:**
- Modify: `src/data/gods.js`

**Interfaces:**
- Consumes: caminhos canônicos da Task 1 e fontes primárias da especificação.
- Produces: `apolo.hero`, `apolo.manifesto`, `apolo.cenas`,
  `apolo.notas`, `apolo.legado` e `apolo.colofao`.

- [ ] Substituir `busto`, `atos` e `fecho` pela estrutura editorial completa.
- [ ] Criar cinco cenas com `id`, arte, alt, foco, copy, posição e timeline.
- [ ] Criar cinco notas com painel estático, blocos citados e ressalvas.
- [ ] Criar legado e colofão compatíveis com `Colofao`.
- [ ] Executar `npm run build`; deve terminar com código zero.

### Task 3: Reconstruir a página do Apolo

**Files:**
- Modify: `src/components/ApoloArc.jsx`

**Interfaces:**
- Consumes: o novo objeto `apolo`, `pantheon`, `NotaCritica` e `Colofao`.
- Produces: a rota `/apolo` completa e navegável.

- [ ] Substituir o arco antigo baseado em `ScrollScrubVideo`.
- [ ] Implementar cabeçalho fixo, índice `06 / 12` e menu em duas colunas.
- [ ] Implementar hero e manifesto estático.
- [ ] Renderizar `Cena → NotaCritica` cinco vezes.
- [ ] Implementar legado e colofão.
- [ ] Garantir foco, Escape, clique externo e devolução de foco do menu.

### Task 4: Criar a identidade solar

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: classes `ap-*` usadas em `ApoloArc.jsx`.
- Produces: botões, rail, foco de imagens, eixo solar e efeitos responsivos.

- [ ] Criar `.ap-btn`, estados sólido/hover/foco e `.ap-rail-item`.
- [ ] Criar `.ap-copy`, `.ap-hero-art` e `.ap-scene-art`.
- [ ] Criar animações `ap-eixo`, `ap-halo` e `ap-oraculo`.
- [ ] Desativar os efeitos pelo media query global de movimento reduzido.

### Task 5: Verificar a experiência completa

**Files:**
- Verify: `src/components/ApoloArc.jsx`
- Verify: `src/data/gods.js`
- Verify: `public/assets/apolo/`

**Interfaces:**
- Consumes: página final servida pelo Vite.
- Produces: evidência de build, assets e interação.

- [ ] Executar `npm run build`; esperar código zero.
- [ ] Fazer HEAD dos doze assets usados; esperar HTTP 200.
- [ ] Abrir `#/apolo` em 1440×1000 e 390×844.
- [ ] Confirmar hero, manifesto, cinco cenas, cinco notas e nenhum vídeo.
- [ ] Confirmar rail no início, botão MENU depois e salto por nome.
- [ ] Confirmar ausência de `.vite-error-overlay` e imagens quebradas.
- [ ] Executar `git diff --check` nos arquivos modificados; esperar código zero.

