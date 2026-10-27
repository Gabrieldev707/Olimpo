import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { aresPagina, pantheon } from "../data/gods";
import DustCanvas from "./DustCanvas";
import NotaCritica from "./NotaCritica";
import Colofao from "./Colofao";

// Página do Ares — as 6 cenas aprovadas. O arco é uma queda em cinco etapas:
// presença → confronto → desejo → exposição → aprisionamento → libertação.
//
// Identidade de movimento (olimpo-landing-por-deus.md: "cortado, descentrado,
// primeiro plano obstruindo"). A Atena é geometria e ordem, o Poseidon é maré
// que nunca para — o Ares é IMPACTO. O crop é mais duro e mais fora de centro
// que o dos outros dois, e a arte não respira: ela recebe um golpe curto quando
// a cena entra e depois fica imóvel. O deus que nunca se vê inteiro, e que só se
// move quando bate.

const {
  gold: GOLD,
  goldBright: BRIGHT,
  goldDeep: DEEP,
  ferrugem: FERRUGEM,
  brasa: BRASA,
  preto: PRETO,
} = aresPagina;

// Paleta do aparato crítico: ferrugem sobre preto de fuligem. O dourado fica nos
// botões, que são contrato de navegação e não identidade do deus.
const PALETA_NOTA = { accent: BRASA, borda: FERRUGEM, fundo: "#0A0706" };

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

// Mesma escala de tempo da Atena e do Poseidon, para as três terem o mesmo ritmo
// de leitura.
const ESCALA = 0.4;
const t = (segundos) => +(segundos * ESCALA).toFixed(2);

const EASE = [0.2, 0.7, 0.2, 1];

const BOTAO_BASE =
  "ae-btn inline-flex min-h-12 items-center justify-center gap-2 px-6 font-ui text-[0.62rem] tracking-[0.3em]";

/* ─────────────────────────── navegação ─────────────────────────── */

function useIrPara(reduce) {
  return useCallback(
    (alvo) => {
      const id = String(alvo).replace(/^#/, "");
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      el.focus({ preventScroll: true });
    },
    [reduce],
  );
}

// `algumaVisivel` existe porque notas e colofão são intercalados: há telas em que
// nenhuma cena está visível, e sem esse sinal `ativa` congela e o rail dos doze
// tronos reaparece por cima do aparato.
function useCenaAtiva(ids) {
  const [ativa, setAtiva] = useState(0);
  const [algumaVisivel, setAlgumaVisivel] = useState(true);
  const chave = ids.join("|");

  useEffect(() => {
    const lista = chave.split("|");
    const secoes = lista.map((id) => document.getElementById(id)).filter(Boolean);
    if (!secoes.length) return;

    const visiveis = new Map();
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
        if (melhorId) setAtiva(Math.max(0, lista.indexOf(melhorId)));
        setAlgumaVisivel(melhorRatio > 0);
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75] },
    );

    secoes.forEach((s) => obs.observe(s));
    return () => {
      obs.disconnect();
      visiveis.clear();
    };
  }, [chave]);

  return { ativa, algumaVisivel };
}

function BotaoCena({ children, onClick, variant = "ghost", ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${BOTAO_BASE} ${variant === "solid" ? "ae-btn--solid" : ""}`}
    >
      {children}
    </button>
  );
}

function NavCena({ cenas, index, irPara }) {
  const anterior = index > 0 ? cenas[index - 1] : null;
  const proxima = index < cenas.length - 1 ? cenas[index + 1] : null;

  return (
    <nav
      aria-label={`Navegação da cena ${index + 1} de ${cenas.length}`}
      className="relative z-20 flex items-center justify-between gap-4 px-6 pb-8 md:px-12 md:pb-12 lg:px-16"
    >
      {anterior ? (
        <BotaoCena onClick={() => irPara(anterior.id)} ariaLabel={`Voltar para: ${anterior.titulo}`}>
          ← VOLTAR
        </BotaoCena>
      ) : (
        <span aria-hidden className="min-h-12" />
      )}

      {proxima ? (
        <BotaoCena onClick={() => irPara(proxima.id)} ariaLabel={`Ir para: ${proxima.titulo}`}>
          PRÓXIMA CENA →
        </BotaoCena>
      ) : (
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
        className="pointer-events-auto -my-2 flex min-h-12 items-center gap-[0.5em] font-ui text-[0.68rem] tracking-[0.32em] transition-colors duration-200"
        style={{ color: GOLD }}
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

function IndiceTronos({ visivel }) {
  return (
    <aside
      aria-hidden={!visivel}
      className={`pointer-events-none fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 ease-out lg:block xl:right-12 ${
        visivel ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="font-ui text-[0.6rem] tracking-[0.34em]" style={{ color: GOLD }}>
        08 <span className="text-gesso/35">/ 12</span>
      </div>
      <div className="mt-3 ml-auto h-px w-10" style={{ background: DEEP }} />
      <ol className="mt-2 text-right">
        {pantheon.map((g) => {
          const atual = g.code === "ae";
          const rota = ROTAS[g.code];
          const rotulo = (
            <span className="font-ui text-[0.6rem] tracking-[0.26em]">{g.nameLat.toUpperCase()}</span>
          );
          return (
            <li key={g.code} className="at-rail-item flex-row-reverse gap-2">
              <span
                aria-hidden
                className="inline-block h-1 w-1 shrink-0 rounded-full"
                style={{ background: atual ? BRASA : "rgba(232,220,196,0.22)" }}
              />
              {rota && !atual ? (
                <Link
                  to={rota}
                  className="at-rail-item pointer-events-auto text-gesso/45 transition-colors duration-200 hover:text-[color:var(--ae-b)]"
                  style={{ "--ae-b": BRASA }}
                >
                  {rotulo}
                </Link>
              ) : (
                <span
                  aria-current={atual ? "page" : undefined}
                  className={`at-rail-item ${atual ? "" : "text-gesso/25"}`}
                  style={atual ? { color: BRASA } : undefined}
                  title={atual ? undefined : "Trono ainda sem página própria"}
                >
                  {rotulo}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

function MenuAres({ aberto, onFechar, cenas, notas, cenaAtiva, irPara }) {
  const painel = useRef(null);

  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onFechar();
        return;
      }
      if (e.key !== "Tab") return;
      const foco = painel.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!foco?.length) return;
      const primeiro = foco[0];
      const ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    painel.current?.querySelector("button, a[href]")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [aberto, onFechar]);

  if (!aberto) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      className="fixed inset-0 z-[80] overflow-y-auto bg-[#080605]/97 backdrop-blur-sm"
    >
      <div ref={painel} className="mx-auto flex min-h-full max-w-6xl flex-col px-6 py-6 md:px-12 md:py-10">
        <div className="flex items-center justify-between">
          <span className="font-ui text-[0.68rem] tracking-[0.32em]" style={{ color: GOLD }}>
            OLIMPO <span className="text-gesso/45">/ ARES</span>
          </span>
          <button type="button" onClick={onFechar} className={BOTAO_BASE}>
            FECHAR ✕
          </button>
        </div>

        <div className="mt-10 grid flex-1 gap-10 md:mt-14 md:grid-cols-2 md:gap-16">
          <div className="space-y-10">
            <nav aria-label="Cenas do Ares">
              <h2 className="font-ui text-[0.6rem] tracking-[0.34em] text-gesso/40">CENAS</h2>
              <ol className="mt-5 space-y-1">
                {cenas.map((c, i) => {
                  const atual = i === cenaAtiva;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onFechar();
                          irPara(c.id);
                        }}
                        aria-current={atual ? "true" : undefined}
                        className="flex min-h-12 w-full items-baseline gap-4 text-left transition-colors duration-200"
                        style={{ color: atual ? BRASA : undefined }}
                      >
                        <span
                          className="font-ui text-[0.6rem] tracking-[0.26em]"
                          style={{ color: atual ? BRASA : GOLD }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`font-body text-lg leading-tight md:text-xl ${atual ? "" : "text-gesso/70"}`}>
                          {c.kind === "hero" ? "Hero do Ares" : c.titulo}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <nav aria-label="Aparato crítico">
              <h2 className="font-ui text-[0.6rem] tracking-[0.34em] text-gesso/40">
                APARATO CRÍTICO <span className="text-gesso/25">· {notas.length} NOTAS</span>
              </h2>
              <ol className="mt-5 space-y-1">
                {notas.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onFechar();
                        irPara(n.id);
                      }}
                      className="flex min-h-11 w-full items-baseline gap-4 text-left transition-colors duration-200"
                    >
                      <span className="font-ui text-[0.6rem] tracking-[0.26em]" style={{ color: GOLD }}>
                        {n.numeral}
                      </span>
                      <span className="font-body text-base leading-tight text-gesso/60 md:text-lg">
                        {n.titulo}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <nav aria-label="Os doze tronos">
            <h2 className="font-ui text-[0.6rem] tracking-[0.34em] text-gesso/40">OS DOZE TRONOS</h2>
            <ol className="mt-5 grid grid-cols-2 gap-x-6">
              {pantheon.map((g) => {
                const atual = g.code === "ae";
                const rota = ROTAS[g.code];
                const rotulo = (
                  <span className="font-ui text-[0.62rem] tracking-[0.26em]">{g.nameLat.toUpperCase()}</span>
                );
                return (
                  <li key={g.code} className="flex">
                    {rota && !atual ? (
                      <Link
                        to={rota}
                        onClick={onFechar}
                        className="flex min-h-12 w-full items-center text-gesso/55 transition-colors duration-200 hover:text-[color:var(--ae-b)]"
                        style={{ "--ae-b": BRASA }}
                      >
                        {rotulo}
                      </Link>
                    ) : (
                      <span
                        aria-current={atual ? "page" : undefined}
                        className={`flex min-h-12 w-full items-center ${atual ? "" : "text-gesso/25"}`}
                        style={atual ? { color: BRASA } : undefined}
                        title={atual ? undefined : "Trono ainda sem página própria"}
                      >
                        {rotulo}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── arte ─────────────────────────── */

function Arte({ cena, index, progresso, reduce, inView }) {
  // Crop mais duro e mais fora de centro que o da Atena (1.05–1.13) e o do
  // Poseidon: aqui vai a 1.22, e o `focus` de cada cena já está deslocado do
  // meio. É a regra "cortado, descentrado" — nunca se vê a cena inteira.
  const perfis = [
    { escala: [1.22, 1.12], x: ["3%", "-1%"] }, // 01 o colosso, saindo de quadro
    { escala: [1.14, 1.22], x: ["-3%", "2%"] }, // 02 o avanço contra Atena
    { escala: [1.2, 1.1], x: ["2%", "-2%"] }, // 03 a aproximação
    { escala: [1.12, 1.2], x: ["-2%", "2%"] }, // 04 a rede fecha
    { escala: [1.22, 1.14], x: ["0%", "0%"] }, // 05 o jarro: aperta e para
    { escala: [1.14, 1.06], x: ["0%", "0%"] }, // 06 a saída: o único que abre
  ][index];

  const scale = useTransform(progresso, [0, 1], perfis.escala);
  const x = useTransform(progresso, [0, 1], perfis.x);
  const estatico = { scale: 1.06, x: "0%" };

  return (
    <div
      className="relative h-[var(--ae-art-h)] w-full shrink-0 overflow-hidden md:absolute md:inset-0 md:h-full"
      style={{ "--ae-art-h": cena.mobileArt }}
    >
      <motion.div className="absolute inset-0" style={reduce ? estatico : { scale, x }}>
        {/* O golpe: curto, uma vez por entrada. O Poseidon respira, a Atena se
            aproxima — o Ares bate e para. */}
        <div
          className="h-full w-full"
          style={inView && !reduce ? { animation: "ae-golpe 0.5s ease-out 0.15s 1 both" } : undefined}
        >
          <img
            src={cena.art}
            alt={cena.alt}
            decoding="async"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            draggable={false}
            className="h-full w-full object-cover [object-position:var(--ae-pos-m)] md:[object-position:var(--ae-pos-d)]"
            style={{ "--ae-pos-m": cena.focus.mobile, "--ae-pos-d": cena.focus.desktop }}
          />
        </div>
      </motion.div>

      {inView && !reduce && <DustCanvas count={20} color="194,96,63" />}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background: `linear-gradient(180deg, rgba(${PRETO},0.5) 0%, rgba(${PRETO},0.05) 34%, rgba(${PRETO},0.88) 86%, rgb(${PRETO}) 100%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background: `linear-gradient(90deg, rgba(${PRETO},0.93) 0%, rgba(${PRETO},0.66) 16%, rgba(${PRETO},0.3) 36%, rgba(${PRETO},0.06) 54%, rgba(${PRETO},0) 68%, rgba(${PRETO},0.34) 100%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background: `linear-gradient(180deg, rgba(${PRETO},0.6) 0%, transparent 22%, transparent 70%, rgba(${PRETO},0.78) 100%)`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────── cenas ─────────────────────────── */

function Cena({ cena, cenas, index, irPara }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const tl = cena.timeline;

  const surge = (atraso) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: reduce ? 0.2 : 0.9, delay: reduce ? 0 : atraso, ease: EASE },
  });

  return (
    <section
      id={cena.id}
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${cena.id}-titulo`}
      className="relative flex min-h-[100svh] flex-col overflow-hidden focus:outline-none"
      style={{ background: `rgb(${PRETO})` }}
    >
      <Arte cena={cena} index={index} progresso={scrollYProgress} reduce={reduce} inView={inView} />

      <div className="ae-copy relative z-10 flex flex-1 flex-col justify-start px-6 pb-10 pt-10 md:justify-center md:px-12 md:pb-0 md:pt-28 lg:px-16 lg:pr-56 xl:pr-64">
        {cena.kind === "hero" ? (
          <Hero cena={cena} surge={surge} tl={tl} irPara={irPara} />
        ) : (
          <Capitulo cena={cena} surge={surge} tl={tl} />
        )}
      </div>

      {cena.kind === "capitulo" ? (
        <NavCena cenas={cenas} index={index} irPara={irPara} />
      ) : (
        <div className="relative z-10 h-8 md:h-12" />
      )}
    </section>
  );
}

function Hero({ cena, surge, tl, irPara }) {
  return (
    <div className="max-w-[38rem]">
      <motion.div
        {...surge(t(tl.art))}
        className="font-ui text-[0.62rem] tracking-[0.5em]"
        style={{ color: BRASA }}
      >
        {cena.eyebrow}
      </motion.div>

      <motion.h1
        id={`${cena.id}-titulo`}
        {...surge(t(tl.push))}
        className="mt-5 font-display font-black leading-[0.92] text-gesso"
        style={{ fontSize: "clamp(3.2rem, 13vw, 9rem)", letterSpacing: "0.02em" }}
      >
        {cena.titulo}
      </motion.h1>

      <motion.p {...surge(t(tl.push) + 0.12)} className="mt-5 font-body text-xl italic text-gesso/75 md:text-2xl">
        {cena.subtitulo}
      </motion.p>

      <motion.p
        {...surge(t(tl.fx))}
        className="mt-6 font-body text-2xl leading-snug md:text-3xl"
        style={{ color: BRASA }}
      >
        {cena.lead}
      </motion.p>

      <motion.p {...surge(t(tl.fx) + 0.1)} className="mt-5 font-body text-lg leading-relaxed text-gesso/80 md:text-xl">
        {cena.paragrafo}
      </motion.p>

      <motion.ul {...surge(t(tl.ui))} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        {cena.marcas.map((m) => (
          <li key={m.label}>
            <div className="font-ui text-[0.6rem] tracking-[0.3em]" style={{ color: FERRUGEM }}>
              {m.label}
            </div>
            <div className="mt-1 font-body text-base text-gesso/50">{m.hint}</div>
          </li>
        ))}
      </motion.ul>

      <motion.blockquote
        {...surge(t(tl.ui) + 0.12)}
        className="mt-8 border-l py-1 pl-5"
        style={{ borderColor: FERRUGEM }}
      >
        <p className="font-body text-lg italic leading-snug text-gesso/85 md:text-xl">“{cena.citacao}”</p>
        <footer className="mt-2 font-ui text-[0.55rem] tracking-[0.28em] text-gesso/40">
          {cena.citacaoAutor}
        </footer>
      </motion.blockquote>

      <motion.div {...surge(t(tl.ui) + 0.2)} className="mt-9 flex flex-wrap gap-4">
        {cena.ctas.map((c) => (
          <BotaoCena key={c.label} onClick={() => irPara(c.to)} variant={c.variant}>
            {c.label}
          </BotaoCena>
        ))}
      </motion.div>
    </div>
  );
}

function Capitulo({ cena, surge, tl }) {
  const chaves = Object.keys(tl);
  const dTitulo = t(tl[chaves[1]]);
  const dTexto = t(tl[chaves[2]]);
  const dUi = t(tl[chaves[chaves.length - 1]]);

  return (
    <div className="max-w-[34rem]">
      <motion.div {...surge(dTitulo)} className="font-display text-lg tracking-[0.3em]" style={{ color: BRASA }}>
        {cena.capitulo} <span className="text-gesso/30">—</span>
      </motion.div>

      <motion.h2
        id={`${cena.id}-titulo`}
        {...surge(dTitulo + 0.12)}
        className="mt-3 font-display leading-[1.08] text-gesso"
        style={{ fontSize: "clamp(2rem, 5.2vw, 4.1rem)" }}
      >
        {cena.titulo}
      </motion.h2>

      <motion.p {...surge(dTexto)} className="mt-6 font-body text-lg italic leading-snug md:text-xl" style={{ color: BRASA }}>
        {cena.subtitulo}
      </motion.p>

      <motion.p {...surge(dUi)} className="mt-4 font-body text-lg leading-relaxed text-gesso/80 md:text-xl">
        {cena.paragrafo}
      </motion.p>
    </div>
  );
}

/* ─────────────────────────── página ─────────────────────────── */

export default function AresArc() {
  const reduce = useReducedMotion();
  const irPara = useIrPara(reduce);
  const [menuAberto, setMenuAberto] = useState(false);
  const gatilhoMenu = useRef(null);
  const cenas = aresPagina.cenas;
  const notas = aresPagina.notas;
  const { ativa: cenaAtiva, algumaVisivel } = useCenaAtiva(cenas.map((c) => c.id));

  const abrirMenu = useCallback(() => {
    gatilhoMenu.current = document.activeElement;
    setMenuAberto(true);
  }, []);

  const fecharMenu = useCallback(() => {
    setMenuAberto(false);
    gatilhoMenu.current?.focus?.();
  }, []);

  const railVisivel = cenaAtiva <= 1 && algumaVisivel && !menuAberto;

  return (
    <main id="ares" aria-label="A página do Ares" className="relative" style={{ background: `rgb(${PRETO})` }}>
      <a
        href="#ares-scene-01"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:px-4 focus:py-3 focus:font-ui focus:text-[0.62rem] focus:tracking-[0.3em]"
        style={{ color: BRASA, background: `rgb(${PRETO})`, border: `1px solid ${FERRUGEM}` }}
      >
        IR PARA O CONTEÚDO
      </a>

      <Cabecalho onAbrirMenu={abrirMenu} menuNoTopo={!railVisivel} />
      <IndiceTronos visivel={railVisivel} />

      {/* Cena → nota → cena. A nav "PRÓXIMA CENA" pula de cena em cena e ignora
          as notas de propósito: quem quer só o filme não atravessa o aparato. */}
      {cenas.map((cena, i) => {
        const nota = notas.find((n) => n.apos === cena.id);
        return (
          <Fragment key={cena.id}>
            <Cena cena={cena} cenas={cenas} index={i} irPara={irPara} />
            {nota && <NotaCritica nota={nota} irPara={irPara} paleta={PALETA_NOTA} />}
          </Fragment>
        );
      })}

      <Colofao
        deus={aresPagina}
        paleta={PALETA_NOTA}
        botaoClasse="ae-btn"
        passagem={{
          kicker: "O CICLO SE FECHA · SEGUE O PRÓXIMO",
          frase: "A força que perdeu para a estratégia, para a técnica e para a astúcia. Duas delas têm página própria.",
          label: "TRONO V · ATENA →",
          to: "/atena",
          topo: "#ares-scene-01",
        }}
      />

      <MenuAres
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
