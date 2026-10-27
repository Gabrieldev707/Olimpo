import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { atena, pantheon } from "../data/gods";
import DustCanvas from "./DustCanvas";
import NotaCritica from "./NotaCritica";
import Colofao from "./Colofao";
import MenuAtena from "./MenuAtena";

// Página da Atena — implementação das 6 cenas aprovadas no Canva
// ("Olimpo — Atena Handoff Definitivo 01–06"). Contrato de cada handoff:
//   ui-over-art: true · scroll-driven: true · safe-area: 48px
//   do-not-regenerate-art: true · preserve-composition: true
// A arte é sempre a BASE LIMPA da cena; nada é redesenhado. Todo movimento vem
// de transform/opacity sobre a própria imagem e de overlays atmosféricos.

const { gold: GOLD, goldBright: BRIGHT, goldDeep: DEEP } = atena;

// Tronos que já têm página própria — os demais entram como item inerte no menu.
const ROTAS = {
  z: "/",
  po: "/poseidon",
  at: "/atena",
  ae: "/ares",
  ap: "/apolo",
  af: "/afrodite",
  he: "/hefesto",
  hm: "/hermes",
};

// A timeline do Canva é descrita em segundos (0.0–0.8s, 0.8–1.6s, …). Numa página
// dirigida por scroll, esperar 3.8s pelo texto seria ilegível: comprimimos a escala
// preservando a ORDEM e as proporções de cada etapa aprovada.
const ESCALA = 0.4;
const t = (segundos) => +(segundos * ESCALA).toFixed(2);

const EASE = [0.2, 0.7, 0.2, 1];

// Paleta do aparato crítico: preto QUENTE e dourado — a identidade da Atena.
const PALETA_NOTA = { accent: GOLD, borda: `${DEEP}55`, fundo: "#070706" };

/* ─────────────────────────── navegação ─────────────────────────── */

function useIrPara(reduce) {
  return useCallback(
    (alvo) => {
      const id = String(alvo).replace(/^#/, "");
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      // O foco acompanha o scroll: quem navega por teclado continua no lugar certo.
      el.focus({ preventScroll: true });
    },
    [reduce],
  );
}

// Qual cena ocupa a tela agora — controla o lado do índice de tronos (o Canva
// move o menu da direita, na Cena 01, para a esquerda, na Cena 02) e o marcador
// de cena atual no menu.
// Devolve também `algumaVisivel`: com as notas e o colofão intercalados, existem
// telas em que NENHUMA cena está visível. Sem esse sinal, `ativa` fica congelado
// no último valor (0, se o leitor pular direto para o rodapé) e o rail dos doze
// tronos reaparece por cima do colofão. `ativa` continua "grudento" de propósito
// — é ele que marca a cena atual no menu.
function useCenaAtiva(total) {
  const [ativa, setAtiva] = useState(0);
  const [algumaVisivel, setAlgumaVisivel] = useState(true);

  useEffect(() => {
    const secoes = Array.from({ length: total }, (_, i) =>
      document.getElementById(`scene-0${i + 1}`),
    ).filter(Boolean);
    if (!secoes.length) return;

    let visiveis = new Map();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visiveis.set(e.target.id, e.intersectionRatio);
        let melhorId = null;
        let melhorRatio = 0;
        for (const [id, ratio] of visiveis) {
          if (ratio > melhorRatio) {
            melhorRatio = ratio;
            melhorId = id;
          }
        }
        if (melhorId) setAtiva(Number(melhorId.slice(-2)) - 1);
        setAlgumaVisivel(melhorRatio > 0);
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75] },
    );

    secoes.forEach((s) => obs.observe(s));
    return () => {
      obs.disconnect();
      visiveis = null;
    };
  }, [total]);

  return { ativa, algumaVisivel };
}

/* ─────────────────────────── botões ─────────────────────────── */

// Alvo mínimo de 48px, hover dourado, transição de 200ms e foco visível —
// exigências da seção NAVEGAÇÃO do handoff. As cores vivem em `.at-btn`
// (src/index.css) para que :hover e :focus-visible funcionem de verdade.
const BOTAO_BASE =
  "at-btn inline-flex min-h-12 items-center justify-center gap-2 px-6 font-ui text-[0.62rem] tracking-[0.3em]";

function BotaoCena({ children, onClick, variant = "ghost", className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${BOTAO_BASE} ${variant === "solid" ? "at-btn--solid" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

// ← VOLTAR / PRÓXIMA CENA → : barra inferior das cenas de capítulo.
function NavCena({ cena, index, total, irPara }) {
  const anterior = index > 0 ? `scene-0${index}` : null;
  const proxima = index < total - 1 ? `scene-0${index + 2}` : null;

  return (
    <nav
      aria-label={`Navegação da cena ${index + 1}`}
      className="relative z-20 flex items-center justify-between gap-4 px-6 pb-8 md:px-12 md:pb-12 lg:px-16"
    >
      {anterior ? (
        <BotaoCena onClick={() => irPara(anterior)}>← VOLTAR</BotaoCena>
      ) : (
        <span aria-hidden className="min-h-12" />
      )}

      {proxima ? (
        <BotaoCena onClick={() => irPara(proxima)}>PRÓXIMA CENA →</BotaoCena>
      ) : (
        // Cena 06 encerra o arco aprovado: o slot da direita leva de volta ao
        // Panteão em vez de virar um controle morto.
        <Link to="/" className={BOTAO_BASE}>
          O PANTEÃO →
        </Link>
      )}
    </nav>
  );
}

/* ─────────────────────────── chrome ─────────────────────────── */

function Cabecalho({ onAbrirMenu, menuNoTopo }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between px-6 py-5 md:px-12 md:py-6 lg:px-16">
      <Link
        to="/"
        className="pointer-events-auto -my-2 flex min-h-12 items-center gap-[0.5em] font-ui text-[0.68rem] tracking-[0.32em] transition-colors duration-200 hover:text-[color:var(--at-bright)]"
        style={{ color: GOLD, "--at-bright": BRIGHT }}
      >
        OLIMPO <span className="text-gesso/45">/ DEUSES</span>
      </Link>

      <button
        type="button"
        onClick={onAbrirMenu}
        aria-haspopup="dialog"
        className={`pointer-events-auto ${BOTAO_BASE} ${menuNoTopo ? "" : "lg:hidden"}`}
      >
        ☰ MENU
      </button>
    </header>
  );
}

// Índice vertical dos doze tronos. No Canva ele aparece à direita na Cena 01,
// migra para a esquerda na Cena 02 e some a partir da Cena 03 (vira ☰ MENU).
function IndiceTronos({ visivel, lado }) {
  return (
    <aside
      aria-hidden={!visivel}
      className={`pointer-events-none fixed top-1/2 z-30 hidden -translate-y-1/2 transition-[opacity,transform] duration-500 ease-out lg:block ${
        lado === "left" ? "left-8 xl:left-12" : "right-8 xl:right-12"
      } ${visivel ? "opacity-100" : "pointer-events-none translate-x-0 opacity-0"}`}
    >
      <div className="font-ui text-[0.6rem] tracking-[0.34em]" style={{ color: GOLD }}>
        05 <span className="text-gesso/35">/ 12</span>
      </div>
      <div className="mt-3 h-px w-10" style={{ background: `${DEEP}` }} />
      <ol className={`mt-2 ${lado === "right" ? "text-right" : ""}`}>
        {pantheon.map((g) => {
          const atual = g.code === "at";
          const rota = ROTAS[g.code];
          const conteudo = (
            <span className="font-ui text-[0.6rem] tracking-[0.26em]">{g.nameLat.toUpperCase()}</span>
          );
          return (
            <li
              key={g.code}
              className="at-rail-item gap-2"
              style={{ flexDirection: lado === "right" ? "row-reverse" : "row" }}
            >
              <span
                aria-hidden
                className="inline-block h-1 w-1 shrink-0 rounded-full transition-colors duration-200"
                style={{ background: atual ? BRIGHT : "rgba(232,220,196,0.22)" }}
              />
              {rota && !atual ? (
                <Link
                  to={rota}
                  className="at-rail-item pointer-events-auto text-gesso/45 transition-colors duration-200 hover:text-[color:var(--at-bright)] focus-visible:outline-1 focus-visible:outline-offset-4"
                  style={{ "--at-bright": BRIGHT, outlineColor: BRIGHT }}
                >
                  {conteudo}
                </Link>
              ) : (
                <span
                  aria-current={atual ? "page" : undefined}
                  style={atual ? { color: BRIGHT } : undefined}
                  className={`at-rail-item ${atual ? "" : "text-gesso/25"}`}
                >
                  {conteudo}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

/* ─────────────────────────── menu overlay ─────────────────────────── */

/* ─────────────────────────── atmosfera por cena ─────────────────────────── */

// Camadas atmosféricas por cena. Só montam quando a cena está na viewport e o
// usuário não pediu menos movimento — nada fica animando fora de tela.
// As coordenadas são percentuais calibrados sobre a base limpa de cada cena.
function CenaFX({ id }) {
  const luz = (estilo) => (
    <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-screen" style={estilo} />
  );

  switch (id) {
    // 0.0–0.8 fundo · 0.8–1.6 push-in · 1.6–2.4 reflexos em lança, elmo e escudo
    case "scene-01":
      return (
        <>
          {luz({
            background: "radial-gradient(30% 24% at 38% 14%, rgba(255,244,214,0.6) 0%, transparent 70%)",
            animation: "at-storm 11s ease-in-out infinite",
          })}
          <div aria-hidden className="pointer-events-none absolute inset-y-[4%] left-[50%] w-[40%] overflow-hidden">
            <div
              className="absolute inset-y-[-20%] left-0 w-[26%] mix-blend-screen"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,248,226,0.5), transparent)",
                filter: "blur(9px)",
                animation: "at-glint 8.5s ease-in-out infinite",
              }}
            />
          </div>
          <DustCanvas count={18} color="232,220,196" />
        </>
      );

    // 0.8–1.8 coruja · 1.8–2.8 fumaça e partículas lentas
    case "scene-02":
      return (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%]"
            style={{
              background: "linear-gradient(0deg, rgba(196,178,142,0.24) 0%, transparent 78%)",
              filter: "blur(26px)",
              animation: "at-fog 34s ease-in-out infinite alternate",
            }}
          />
          {luz({
            background: "radial-gradient(11% 13% at 90% 61%, rgba(240,214,158,0.55) 0%, transparent 72%)",
            animation: "at-owl 7.5s ease-in-out infinite",
          })}
          <DustCanvas count={22} color="216,196,150" />
        </>
      );

    // 0.0–0.8 rachadura · 0.8–1.6 impacto único · 1.6–2.8 Atena surge
    case "scene-03":
      return (
        <>
          {luz({
            background: "radial-gradient(14% 30% at 50% 42%, rgba(255,232,168,0.68) 0%, transparent 72%)",
            animation: "at-crack 6s ease-in-out infinite",
          })}
          {[
            { left: "41%", delay: "0s", dur: "7s" },
            { left: "56%", delay: "2.4s", dur: "8.5s" },
            { left: "65%", delay: "4.1s", dur: "9.5s" },
          ].map((d) => (
            <div
              key={d.left}
              aria-hidden
              className="pointer-events-none absolute top-[34%] h-[10%] w-px mix-blend-screen"
              style={{
                left: d.left,
                background: "linear-gradient(180deg, transparent, rgba(255,226,160,0.8), transparent)",
                animation: `at-debris ${d.dur} linear ${d.delay} infinite`,
              }}
            />
          ))}
        </>
      );

    // 0.0–0.8 nuvens e mar · 0.8–1.8 tridente · 2.8–3.8 oliveira em luz quente
    case "scene-04":
      return (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[46%] mix-blend-screen"
            style={{
              background: "radial-gradient(60% 46% at 34% 62%, rgba(180,206,214,0.28) 0%, transparent 74%)",
              animation: "at-sea 26s ease-in-out infinite",
            }}
          />
          {luz({
            background: "radial-gradient(46% 22% at 52% 14%, rgba(214,206,182,0.22) 0%, transparent 76%)",
            animation: "at-sea 38s ease-in-out infinite reverse",
          })}
          {luz({
            background: "radial-gradient(8% 9% at 41% 73%, rgba(226,244,255,0.85) 0%, transparent 70%)",
            animation: "at-hit 9s ease-out infinite",
          })}
          {luz({
            background: "radial-gradient(16% 22% at 62% 44%, rgba(255,214,138,0.5) 0%, transparent 72%)",
            animation: "at-warm 10s ease-in-out infinite",
          })}
        </>
      );

    // 0.8–1.8 fios vibram · 2.8–3.8 teias avançam — nunca sobre a tapeçaria (centro)
    case "scene-05":
      return (
        <>
          {["left-0 w-[28%]", "right-0 w-[24%]"].map((pos, i) => (
            <div
              key={pos}
              aria-hidden
              className={`pointer-events-none absolute inset-y-0 ${pos} mix-blend-screen`}
              style={{
                background:
                  "repeating-linear-gradient(102deg, transparent 0 26px, rgba(226,206,158,0.16) 27px, transparent 28px 54px)",
                animation: `at-thread ${17 + i * 6}s ease-in-out infinite alternate`,
              }}
            />
          ))}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background:
                "radial-gradient(30% 30% at 4% 4%, rgba(214,198,158,0.16) 0%, transparent 60%), radial-gradient(30% 30% at 97% 96%, rgba(214,198,158,0.14) 0%, transparent 60%)",
              animation: "at-web 30s ease-in-out infinite alternate",
            }}
          />
          {luz({
            background: "radial-gradient(5% 6% at 62% 78%, rgba(240,222,170,0.4) 0%, transparent 70%)",
            animation: "at-owl 11s ease-in-out infinite",
          })}
        </>
      );

    // 0.8–1.8 o reflexo percorre o escudo · Atena guia · Medusa permanece indireta
    case "scene-06":
      return (
        <>
          {/* O reflexo percorre o escudo polido. A máscara radial prende o brilho
              ao disco do escudo e evita qualquer borda visível de container. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              maskImage: "radial-gradient(9% 17% at 66% 55%, #000 10%, transparent 74%)",
              WebkitMaskImage: "radial-gradient(9% 17% at 66% 55%, #000 10%, transparent 74%)",
            }}
          >
            <div
              className="absolute inset-y-0 left-[48%] w-[26%] mix-blend-screen"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,246,214,0.75), transparent)",
                filter: "blur(8px)",
                animation: "at-mirror 7s ease-in-out infinite",
              }}
            />
          </div>
          {luz({
            background: "radial-gradient(24% 32% at 28% 34%, rgba(255,222,158,0.3) 0%, transparent 74%)",
            animation: "at-warm 12s ease-in-out infinite",
          })}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[34%]"
            style={{ background: "radial-gradient(60% 50% at 80% 38%, rgba(10,12,18,0.34) 0%, transparent 72%)" }}
          />
        </>
      );

    // 0.8–1.8 amanhecer cresce atrás de Ítaca · 2.8–3.8 brilho dourado contorna Atena.
    // Último ato: tudo mais lento que nas cenas anteriores, sem impacto nenhum.
    case "scene-07":
      return (
        <>
          {luz({
            background: "radial-gradient(15% 22% at 52% 56%, rgba(255,226,158,0.6) 0%, transparent 74%)",
            animation: "at-warm 16s ease-in-out infinite",
          })}
          {/* Atena é presença que guia, não protagonista: o halo fica discreto. */}
          {luz({
            background: "radial-gradient(13% 30% at 83% 32%, rgba(246,226,176,0.34) 0%, transparent 72%)",
            animation: "at-owl 13s ease-in-out infinite",
          })}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-[52%] left-0 w-[62%] mix-blend-screen"
            style={{
              background: "radial-gradient(52% 60% at 32% 40%, rgba(214,214,196,0.16) 0%, transparent 76%)",
              animation: "at-sea 34s ease-in-out infinite",
            }}
          />
          <DustCanvas count={14} color="230,214,172" />
        </>
      );

    default:
      return null;
  }
}

/* ─────────────────────────── arte ─────────────────────────── */

// A base limpa da cena. Mobile: bloco recortado no topo (art direction do Canva —
// "arte vertical recortada, texto abaixo"). Desktop: full-bleed atrás do texto.
function Arte({ cena, index, progresso, reduce, inView }) {
  // Zoom contido: a arte é 1.196:1 e o viewport é bem mais largo, então o `cover`
  // já corta na vertical. Amplitude baixa (≤8%) evita perder cabeças, lança e
  // personagens — "preserve-composition" do contrato.
  const perfis = [
    { escala: [1.05, 1.13], x: ["0%", "0%"], y: ["0%", "-2%"] }, // 01 push-in monumental
    { escala: [1.12, 1.05], x: ["1%", "-1%"], y: ["0%", "0%"] }, // 02 recuo contemplativo
    { escala: [1.13, 1.05], x: ["0%", "0%"], y: ["1.5%", "-1.5%"] }, // 03 Zeus emerge
    { escala: [1.05, 1.11], x: ["-1.2%", "1.2%"], y: ["0%", "0%"] }, // 04 deriva lateral da disputa
    { escala: [1.11, 1.05], x: ["0%", "0%"], y: ["-1.2%", "1.2%"] }, // 05 entrada lenta na oficina
    { escala: [1.06, 1.12], x: ["1.2%", "-1.2%"], y: ["0%", "0%"] }, // 06 avanço até Medusa
    { escala: [1.1, 1.03], x: ["0.8%", "-0.8%"], y: ["0%", "0%"] }, // 07 recuo lento do último ato
  ][index];

  const scale = useTransform(progresso, [0, 1], perfis.escala);
  const x = useTransform(progresso, [0, 1], perfis.x);
  const y = useTransform(progresso, [0, 1], perfis.y);
  const estatico = { scale: 1.02, x: "0%", y: "0%" };

  return (
    <div
      className="relative h-[var(--at-art-h)] w-full shrink-0 overflow-hidden md:absolute md:inset-0 md:h-full"
      style={{ "--at-art-h": cena.mobileArt }}
    >
      <motion.div className="absolute inset-0" style={reduce ? estatico : { scale, x, y }}>
        {/* Impacto de Hefesto: curto e uma vez só a cada entrada — nunca tremor
            contínuo. Fica numa camada interna para não brigar com o transform
            dirigido pelo scroll da camada de cima. */}
        <div
          className="h-full w-full"
          style={
            cena.id === "scene-03" && inView && !reduce
              ? { animation: "at-impact 0.42s ease-out 0.32s 1 both" }
              : undefined
          }
        >
          <img
            src={cena.art}
            alt={cena.alt}
            decoding="async"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            draggable={false}
            className="h-full w-full object-cover [object-position:var(--at-pos-m)] md:[object-position:var(--at-pos-d)]"
            style={{ "--at-pos-m": cena.focus.mobile, "--at-pos-d": cena.focus.desktop }}
          />
        </div>
      </motion.div>

      {inView && !reduce && <CenaFX id={cena.id} />}

      {/* Mobile: a arte se dissolve no bloco de texto logo abaixo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,6,5,0.45) 0%, rgba(6,6,5,0.05) 34%, rgba(10,10,10,0.86) 86%, #0a0a0a 100%)",
        }}
      />
      {/* Desktop: véu à esquerda para a copy ficar legível sobre a arte. Cai rápido
          de propósito — Poseidon (cena 04) e Atena (cena 05) ficam justamente sob
          o texto e precisam continuar visíveis. A legibilidade é completada pelo
          text-shadow da copy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,6,5,0.9) 0%, rgba(6,6,5,0.6) 16%, rgba(6,6,5,0.28) 34%, rgba(6,6,5,0.06) 52%, rgba(6,6,5,0) 66%, rgba(6,6,5,0.3) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{ background: "linear-gradient(180deg, rgba(6,6,5,0.55) 0%, transparent 22%, transparent 72%, rgba(6,6,5,0.72) 100%)" }}
      />
    </div>
  );
}

/* ─────────────────────────── cenas ─────────────────────────── */

function Cena({ cena, index, total, irPara, abrirMenu }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const tl = cena.timeline;

  // Entrada encenada: cada bloco aparece na ordem da timeline aprovada.
  const surge = (atraso) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: reduce ? 0.2 : 0.9, delay: reduce ? 0 : atraso, ease: EASE },
  });

  const paddingLateral =
    cena.kind === "manifesto"
      ? "px-6 md:px-12 lg:pl-56 lg:pr-16 xl:pl-64"
      : "px-6 md:px-12 lg:px-16 lg:pr-56 xl:pr-64";

  return (
    <section
      id={cena.id}
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${cena.id}-titulo`}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-preto focus:outline-none"
    >
      <Arte cena={cena} index={index} progresso={scrollYProgress} reduce={reduce} inView={inView} />

      {/* Mobile empilha (arte → copy → nav) e a seção cresce além de 100svh se
          precisar; desktop centraliza a copy sobre a arte. */}
      <div
        className={`at-copy relative z-10 flex flex-1 flex-col justify-start pb-10 pt-10 md:justify-center md:pb-0 md:pt-28 ${paddingLateral}`}
      >
        {cena.kind === "hero" && <Hero cena={cena} surge={surge} tl={tl} irPara={irPara} />}
        {cena.kind === "manifesto" && <Manifesto cena={cena} surge={surge} tl={tl} irPara={irPara} />}
        {cena.kind === "capitulo" && <Capitulo cena={cena} surge={surge} tl={tl} />}
      </div>

      {cena.kind === "capitulo" && <NavCena index={index} total={total} irPara={irPara} />}
      {cena.kind === "hero" && <div className="relative z-10 h-8 md:h-12" />}

      {/* Cena 02 → 03: a linha dourada que abre a próxima cena (3.8s+ da timeline). */}
      {cena.kind === "manifesto" && (
        <div className="relative z-10 flex flex-col items-center gap-3 pb-8 md:pb-12">
          <div className="flex flex-col items-center gap-1 font-ui text-[0.55rem] tracking-[0.34em] text-gesso/40">
            {cena.rodape.map((linha) => (
              <span key={linha}>{linha}</span>
            ))}
          </div>
          <span
            aria-hidden
            className="block h-px w-40 origin-center md:w-64"
            style={{
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              animation: reduce ? undefined : "at-line 4.6s ease-in-out infinite",
            }}
          />
        </div>
      )}

    </section>
  );
}

// CENA 01 — Hero. Composição do Canva: título monumental à esquerda, marcas de
// atributo, citação e dois botões. Preserva Atena, lança, escudo e coruja à direita.
function Hero({ cena, surge, tl, irPara }) {
  return (
    <div className="max-w-[38rem]">
      <motion.div {...surge(t(tl.push))} className="font-ui text-[0.6rem] tracking-[0.42em]" style={{ color: GOLD }}>
        {cena.eyebrow}
      </motion.div>

      <motion.h1
        id={`${cena.id}-titulo`}
        {...surge(t(tl.push) + 0.12)}
        className="mt-5 font-display font-black leading-[0.92] text-gesso"
        style={{ fontSize: "clamp(3.4rem, 11vw, 8.5rem)", letterSpacing: "0.05em" }}
      >
        {cena.titulo}
      </motion.h1>

      <motion.p
        {...surge(t(tl.fx))}
        className="mt-4 font-ui text-[0.62rem] leading-relaxed tracking-[0.28em] text-gesso/55"
      >
        {cena.subtitulo.toUpperCase()}
      </motion.p>

      <motion.div {...surge(t(tl.fx) + 0.1)} className="mt-6 h-px w-24" style={{ background: GOLD }} />

      <motion.p {...surge(t(tl.ui))} className="mt-6 font-body text-xl italic leading-snug md:text-2xl" style={{ color: BRIGHT }}>
        {cena.lead}
      </motion.p>
      <motion.p {...surge(t(tl.ui) + 0.08)} className="mt-3 max-w-lg font-body text-lg leading-relaxed text-gesso/80 md:text-xl">
        {cena.paragrafo}
      </motion.p>

      <motion.ul {...surge(t(tl.ui) + 0.16)} className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
        {cena.marcas.map((m) => (
          <li key={m.label}>
            <div className="font-ui text-[0.58rem] tracking-[0.3em]" style={{ color: GOLD }}>
              {m.label}
            </div>
            <div className="mt-1 font-body text-sm text-gesso/45">{m.hint}</div>
          </li>
        ))}
      </motion.ul>

      <motion.figure {...surge(t(tl.ui) + 0.24)} className="mt-8 border-l pl-5" style={{ borderColor: `${DEEP}` }}>
        <blockquote className="font-body text-lg italic leading-snug text-gesso/75 md:text-xl">
          “{cena.citacao}”
        </blockquote>
        <figcaption className="mt-2 font-ui text-[0.55rem] tracking-[0.3em] text-gesso/35">
          — {cena.citacaoAutor}
        </figcaption>
      </motion.figure>

      <motion.div {...surge(t(tl.ui) + 0.32)} className="mt-9 flex flex-wrap gap-3">
        {cena.ctas.map((c) => (
          <BotaoCena key={c.label} variant={c.variant} onClick={() => irPara(c.to)}>
            {c.label}
          </BotaoCena>
        ))}
      </motion.div>
    </div>
  );
}

// CENA 02 — Manifesto. Atmosfera contemplativa; a coruja faz a transição e os
// cinco capítulos abrem o arco.
function Manifesto({ cena, surge, tl, irPara }) {
  return (
    <div className="max-w-[42rem]">
      <motion.div {...surge(t(tl.owl))} className="font-ui text-[0.6rem] tracking-[0.42em]" style={{ color: GOLD }}>
        {cena.eyebrow}
      </motion.div>

      <motion.h2
        id={`${cena.id}-titulo`}
        {...surge(t(tl.owl) + 0.12)}
        className="mt-5 font-display leading-[1.06] text-gesso"
        style={{ fontSize: "clamp(1.7rem, 4.4vw, 3.1rem)" }}
      >
        {cena.titulo}
      </motion.h2>

      <motion.p {...surge(t(tl.smoke))} className="mt-6 max-w-xl font-body text-lg leading-relaxed text-gesso/75 md:text-xl">
        {cena.paragrafo}
      </motion.p>

      <motion.p {...surge(t(tl.smoke) + 0.1)} className="mt-4 max-w-xl font-body text-lg italic leading-snug md:text-xl" style={{ color: BRIGHT }}>
        {cena.subtitulo}
      </motion.p>

      <motion.div {...surge(t(tl.ui))} className="mt-10 font-ui text-[0.58rem] tracking-[0.32em]" style={{ color: GOLD }}>
        {cena.chamada}
      </motion.div>

      <motion.ol {...surge(t(tl.ui) + 0.12)} className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        {cena.capitulos.map((c, i) => (
          <li key={c.label} className="flex items-center">
            {c.to ? (
              <button
                type="button"
                onClick={() => irPara(c.to)}
                className="at-capitulo-btn flex min-h-12 items-center gap-2"
              >
                <span className="font-ui text-[0.55rem] tracking-[0.24em] text-gesso/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="at-capitulo font-ui text-[0.6rem] tracking-[0.28em] text-gesso/65">{c.label}</span>
              </button>
            ) : (
              <span
                className="flex min-h-12 items-center gap-2 opacity-40"
                title="Capítulo ainda não aprovado no Canva"
              >
                <span className="font-ui text-[0.55rem] tracking-[0.24em] text-gesso/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-ui text-[0.6rem] tracking-[0.28em] text-gesso/40">{c.label}</span>
              </span>
            )}
          </li>
        ))}
      </motion.ol>
    </div>
  );
}

// CENAS 03–06 — capítulos. Numeral romano, título, parágrafo; nav embaixo.
function Capitulo({ cena, surge, tl }) {
  const chaves = Object.keys(tl);
  const dTitulo = t(tl[chaves[1]]);
  const dTexto = t(tl[chaves[2]]);
  const dUi = t(tl[chaves[chaves.length - 1]]);

  return (
    <div className="max-w-[34rem]">
      <motion.div {...surge(dTitulo)} className="font-display text-lg tracking-[0.3em]" style={{ color: GOLD }}>
        {cena.capitulo} <span className="text-gesso/30">—</span>
      </motion.div>

      <motion.h2
        id={`${cena.id}-titulo`}
        {...surge(dTitulo + 0.12)}
        // 1.08 e não 1.02: capitais acentuadas (ÍTACA) encostavam na linha de cima.
        className="mt-3 font-display leading-[1.08] text-gesso"
        style={{ fontSize: "clamp(2rem, 5.2vw, 4.1rem)" }}
      >
        {cena.titulo}
      </motion.h2>

      <motion.p {...surge(dTexto)} className="mt-6 font-body text-lg italic leading-snug md:text-xl" style={{ color: BRIGHT }}>
        {cena.subtitulo}
      </motion.p>

      <motion.p {...surge(dUi)} className="mt-4 font-body text-lg leading-relaxed text-gesso/80 md:text-xl">
        {cena.paragrafo}
      </motion.p>
    </div>
  );
}

/* ─────────────────────────── página ─────────────────────────── */

export default function AtenaArc() {
  const reduce = useReducedMotion();
  const irPara = useIrPara(reduce);
  const [menuAberto, setMenuAberto] = useState(false);
  const gatilhoMenu = useRef(null);
  const cenas = atena.cenas;
  const notas = atena.notas;
  const { ativa: cenaAtiva, algumaVisivel } = useCenaAtiva(cenas.length);

  const abrirMenu = useCallback(() => {
    gatilhoMenu.current = document.activeElement;
    setMenuAberto(true);
  }, []);

  const fecharMenu = useCallback(() => {
    setMenuAberto(false);
    // Devolve o foco para quem abriu o menu.
    gatilhoMenu.current?.focus?.();
  }, []);

  // O índice vertical dos tronos só existe nas duas primeiras cenas (Canva):
  // direita na Cena 01, esquerda na Cena 02.
  // O rail pertence às cenas. Sobre uma nota ou sobre o colofão ele não tem o
  // que marcar — e sumir ali reforça que o leitor saiu do filme e entrou no
  // aparato.
  const railVisivel = cenaAtiva <= 1 && algumaVisivel;
  const railLado = cenaAtiva === 1 ? "left" : "right";

  return (
    <main id="atena" aria-label="O arco da Atena" className="relative bg-preto">
      <a
        href="#scene-01"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-preto focus:px-4 focus:py-3 focus:font-ui focus:text-[0.62rem] focus:tracking-[0.3em]"
        style={{ color: BRIGHT, border: `1px solid ${DEEP}` }}
      >
        IR PARA O CONTEÚDO
      </a>

      <Cabecalho onAbrirMenu={abrirMenu} menuNoTopo={!railVisivel} />
      <IndiceTronos visivel={railVisivel && !menuAberto} lado={railLado} />

      {/* Cena → nota → cena. A nav "PRÓXIMA CENA" continua pulando de cena em
          cena e ignora as notas de propósito: quem quer só o filme não é
          obrigado a atravessar o aparato, quem quer a leitura comentada a
          encontra rolando ou pelo menu. */}
      {cenas.map((cena, i) => {
        const nota = notas.find((n) => n.apos === cena.id);
        return (
          <Fragment key={cena.id}>
            <Cena
              cena={cena}
              index={i}
              total={cenas.length}
              irPara={irPara}
              abrirMenu={abrirMenu}
            />
            {nota && <NotaCritica nota={nota} irPara={irPara} paleta={PALETA_NOTA} />}
          </Fragment>
        );
      })}

      <Colofao
        deus={atena}
        paleta={PALETA_NOTA}
        botaoClasse="at-btn"
        passagem={{
          kicker: "O CICLO SE FECHA · SEGUE O PRÓXIMO",
          frase: "Atena ofereceu a oliveira. O deus que ofereceu o mar tem a própria história.",
          label: "TRONO X · POSEIDON →",
          to: "/poseidon",
          topo: "#scene-01",
        }}
      />

      <MenuAtena
        aberto={menuAberto}
        onFechar={fecharMenu}
        cenas={cenas}
        notas={notas}
        cenaAtiva={cenaAtiva}
        irPara={irPara}
      />
    </main>
  );
}
