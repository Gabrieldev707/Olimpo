# AGENTS.md — OLIMPO

Site imersivo sobre os doze deuses do Olimpo. Copy e comentários em **pt-BR** — manter o idioma em qualquer artefato do repo.

## Stack

- Vite 8 + React 19 (`type: module`), roteamento com `react-router-dom` v7
- Tailwind CSS v4 via `@tailwindcss/vite` (sem `tailwind.config` — tema em CSS)
- Animação com `motion` (MotionValue, scroll-driven) — não adicionar outra lib de animação
- Geração de vídeo: script Node com `dotenv` + `openai` (Seedance/BytePlus, ver `tools/`)

## Comandos

```bash
npm run dev       # dev server (host: true)
npm run build     # build → dist/
npm run preview   # serve o build
node tools/seedance.mjs all   # gera vídeos (requer SEEDANCE_API_KEY/BASE no .env)
```

Não há testes nem linter configurados. Validar mudanças com `npm run build`.

## Estrutura

- `src/App.jsx` — rotas (`HashRouter`: `#/poseidon` etc., funciona em host estático sem rewrite). Home = Hero + Pantheon + ZeusArc; cada deus com página própria vira um `XxxArc.jsx` + rota.
- `src/data/gods.js` — **fonte única de verdade** de toda a copy e dos caminhos de assets. Mudança de texto/asset vai aqui, não nos componentes.
- `src/components/` — `Hero`, `Pantheon` (dashboard), um `*Arc.jsx` por deus, `ScrollScrubVideo` (efeito-assinatura: scroll controla `video.currentTime`), `DustCanvas`, `Grain`, `Loading`.
- `src/hooks/useInViewVideo.js` — play/pause de vídeo por visibilidade.
- `assets/` — catálogo de mídia fonte: `_<pasta>` = pastas de trabalho (`_global`, `_inbox`, `_ref`), demais = uma por deus, `assets/videos/` = mp4s. Status do catálogo em `assets/STATUS.md` (47/47 imagens aprovadas).
- `public/assets/` — **espelho de `assets/`** servido pelo Vite em `/assets`. Asset novo precisa estar aqui para aparecer no site. `public/*-storyboard.html` = storyboards estáticos de produção.
- `tools/seedance.mjs` — geração de vídeos (5 beats por deus, estilo vaso red-figure, 9:16). Credenciais no `.env` (ver `.env.example`).
- Docs de produção na raiz: `olimpo-producao-v2.md` (pipeline de assets), `olimpo-frontend-spec.md`, `olimpo-landing-por-deus.md`, e um `*.md` de roteiro por deus.
- `_watermarked/`, `scratchpad/`, `dist/` — saídas/rascunho, não editar como fonte.

## Convenções

- IDs de asset seguem o catálogo: `G-01…G-06` globais, `<SIGLA>-01 selo / -02 retrato / -03 painel` por deus (Zeus vai até Z-08). Arquivo = id minúsculo (`z-01.png`). Vídeos: `v-<deus>-b<n>.mp4`, `v-<deus>-hero.mp4`.
- Linguagens visuais do catálogo: **GESSO** (estátua), **VASO** (red-figure, só preto + terracota), **GLIFO** (vetor chapado). Vídeos de vaso têm trava de paleta estrita de 2 cores — ver `STYLE_LOCK` em `tools/seedance.mjs`.
- Respeitar `prefers-reduced-motion` em qualquer animação nova (padrão já usado em `ScrollScrubVideo`).
- Estátuas têm olhos vazios; composição e dano (lascas, fuligem) são intencionais — não "corrigir" assets.

## Armadilhas conhecidas

- Vídeo dirigido por scroll (`ScrollScrubVideo`) precisa de keyframes densos, senão o seek "trava": re-encodar com `-x264-params keyint=6:min-keyint=6:scenecut=0 -movflags +faststart` antes de publicar em `public/assets/videos/`.
- Vídeo de fundo em loop (ex.: `v-af-tese`) vira seamless com ping-pong ffmpeg: `split` + `reverse` + `concat`.
- `vite.config.js` ignora `**/*.md`, `scratchpad/`, `_watermarked/` no watcher — um `.md` travado (EBUSY) derrubava o dev server. Manter esse ignore.
- `DI-02` e `HM-03` estão em baixa resolução (896px); pedir originais antes do deploy (ver `assets/STATUS.md`).
- `G-04` (mármore) é claro demais — o front aplica overlay escuro sobre base preta.
- `.env` não é versionado; nunca commitar chaves.
