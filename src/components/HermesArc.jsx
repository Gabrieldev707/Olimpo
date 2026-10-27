import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { hermes, pantheon } from "../data/gods";
import Colofao from "./Colofao";
import DustCanvas from "./DustCanvas";
import NotaCritica from "./NotaCritica";

const GOLD = hermes.gold;
const BRIGHT = hermes.goldBright;
const DEEP = hermes.goldDeep;
const EASE = [0.2, 0.7, 0.2, 1];
const PALETA_NOTA = {
  accent: GOLD,
  borda: `${DEEP}aa`,
  fundo: "#080706",
};
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

const VERTICAL = {
  start: "justify-start pt-[11vh]",
  center: "justify-center",
  end: "justify-end pb-[13vh]",
};

function useIrPara(reduce) {
  return useCallback(
    (alvo) => {
      const id = alvo.startsWith("#") ? alvo.slice(1) : alvo;
      const elemento = document.getElementById(id);
      if (!elemento) return;
      elemento.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      window.setTimeout(
        () => elemento.focus({ preventScroll: true }),
        reduce ? 0 : 600,
      );
    },
    [reduce],
  );
}

function useCenaAtiva(ids) {
  const [ativa, setAtiva] = useState(ids[0]);
  const [algumaVisivel, setAlgumaVisivel] = useState(true);
  const chave = ids.join("|");

  useEffect(() => {
    const lista = chave.split("|");
    const elementos = lista.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elementos.length) return undefined;
    const visiveis = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visiveis.set(entry.target.id, entry.intersectionRatio));
        let melhorId = null;
        let melhorRatio = 0;
        visiveis.forEach((ratio, id) => {
          if (ratio > melhorRatio) {
            melhorRatio = ratio;
            melhorId = id;
          }
        });
        if (melhorId) setAtiva(melhorId);
        setAlgumaVisivel(melhorRatio > 0);
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75] },
    );

    elementos.forEach((elemento) => observer.observe(elemento));
    return () => {
      observer.disconnect();
      visiveis.clear();
    };
  }, [chave]);

  return { ativa, algumaVisivel };
}

function Rastro({ intensidade = 0.08 }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity: intensidade }}
    >
      <div
        className="hm-rastro absolute inset-[-30%]"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, transparent 0, transparent 30px, ${BRIGHT} 31px, transparent 33px, transparent 96px)`,
        }}
      />
    </div>
  );
}

function Cabecalho({ onMenu, railVisivel, aberto }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between px-6 py-5 md:px-12 md:py-6 lg:px-16">
      <Link
        to="/"
        className="pointer-events-auto -my-2 inline-flex min-h-12 items-center font-ui text-[0.68rem] tracking-[0.32em] transition-colors hover:text-gesso"
        style={{ color: GOLD }}
      >
        OLIMPO <span className="ml-[0.6em] text-gesso/45">/ HERMES</span>
      </Link>
      <button
        type="button"
        onClick={onMenu}
        className={`hm-btn pointer-events-auto inline-flex gap-2 ${railVisivel ? "lg:hidden" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={aberto}
        aria-controls="hm-menu"
      >
        <span aria-hidden className="flex flex-col gap-[3px]">
          <i className="block h-px w-4 bg-current" />
          <i className="block h-px w-4 bg-current" />
          <i className="block h-px w-4 bg-current" />
        </span>
        MENU
      </button>
    </header>
  );
}

function IndiceTronos({ visivel }) {
  return (
    <aside
      aria-hidden={!visivel}
      aria-label="Os doze tronos"
      className={`pointer-events-none fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 ease-out lg:block xl:right-12 ${
        visivel ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-right font-ui text-[0.6rem] tracking-[0.34em]" style={{ color: GOLD }}>
        11 <span className="text-gesso/35">/ 12</span>
      </div>
      <div className="ml-auto mt-3 h-px w-10" style={{ background: DEEP }} />
      <ol className="mt-2 text-right">
        {pantheon.map((deus) => {
          const atual = deus.code === "hm";
          const rota = ROTAS[deus.code];
          const rotulo = (
            <span className="font-ui text-[0.6rem] tracking-[0.26em]">
              {deus.nameLat.toUpperCase()}
            </span>
          );

          return (
            <li key={deus.code} className="hm-rail-item flex-row-reverse gap-2">
              <span
                aria-hidden
                className="inline-block h-1 w-1 shrink-0 rounded-full"
                style={{ background: atual ? BRIGHT : "rgba(232,220,196,0.22)" }}
              />
              {rota && !atual ? (
                <Link
                  to={rota}
                  tabIndex={visivel ? undefined : -1}
                  className={`hm-rail-item text-gesso/45 transition-colors hover:text-[color:var(--hm-bright)] focus-visible:outline-1 focus-visible:outline-offset-4 ${
                    visivel ? "pointer-events-auto" : ""
                  }`}
                  style={{ "--hm-bright": BRIGHT, outlineColor: BRIGHT }}
                >
                  {rotulo}
                </Link>
              ) : (
                <span
                  aria-current={atual ? "page" : undefined}
                  className={`hm-rail-item ${atual ? "" : "text-gesso/25"}`}
                  style={atual ? { color: BRIGHT } : undefined}
                  title={!rota ? "Trono ainda sem página própria" : undefined}
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

function MenuOverlay({ aberto, onFechar, irPara, cenaAtiva }) {
  const painel = useRef(null);
  const itens = [
    { id: hermes.hero.id, label: "Hero de Hermes", numeral: "00" },
    { id: hermes.manifesto.id, label: "Manifesto", numeral: "M" },
    ...hermes.cenas.map((cena) => ({
      id: cena.id,
      label: cena.titulo,
      numeral: cena.capitulo,
    })),
    { id: hermes.legado.id, label: hermes.legado.titulo, numeral: "∞" },
  ];

  useEffect(() => {
    if (!aberto) return undefined;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onFechar();
        return;
      }
      if (event.key !== "Tab") return;
      const focaveis = painel.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!focaveis?.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (event.shiftKey && document.activeElement === primeiro) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    window.setTimeout(() => painel.current?.querySelector("button")?.focus(), 0);
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", onKey);
    };
  }, [aberto, onFechar]);

  if (!aberto) return null;

  return (
    <motion.div
      id="hm-menu"
      className="fixed inset-0 z-[100] bg-[#080706]/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Índice do arco de Hermes"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onFechar();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        ref={painel}
        onMouseDown={(event) => event.stopPropagation()}
        className="mx-auto flex h-full max-w-6xl flex-col overflow-y-auto px-6 py-6 md:px-12 lg:px-16"
      >
        <div className="flex items-center justify-between">
          <div className="font-ui text-[0.68rem] tracking-[0.32em]" style={{ color: GOLD }}>
            OLIMPO <span className="text-gesso/45">/ HERMES</span>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="hm-btn inline-flex"
          >
            FECHAR ×
          </button>
        </div>

        <div className="mt-10 grid flex-1 gap-10 pb-10 md:mt-14 md:grid-cols-2 md:gap-16">
          <nav aria-label="Capítulos de Hermes">
            <h2 className="font-ui text-[0.6rem] tracking-[0.34em] text-gesso/40">
              PASSAGENS
            </h2>
            <ol className="mt-5">
              {itens.map((item) => {
                const selecionado = cenaAtiva === item.id;
                return (
                  <li key={item.id} className="border-b border-gesso/10">
                    <button
                      type="button"
                      onClick={() => {
                        onFechar();
                        window.setTimeout(() => irPara(item.id), 50);
                      }}
                      aria-current={selecionado ? "true" : undefined}
                      className="group grid min-h-12 w-full grid-cols-[2.4rem_1fr_auto] items-center gap-3 py-2 text-left focus-visible:outline-1 focus-visible:outline-offset-4"
                      style={{ outlineColor: BRIGHT }}
                    >
                      <span
                        className="font-ui text-[0.58rem] tracking-[0.22em]"
                        style={{ color: selecionado ? BRIGHT : GOLD }}
                      >
                        {item.numeral}
                      </span>
                      <span
                        className={`font-body text-base leading-tight transition-colors md:text-lg ${
                          selecionado ? "text-gesso" : "text-gesso/65 group-hover:text-gesso"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span aria-hidden style={{ color: GOLD }}>
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <nav aria-label="Os doze tronos">
            <h2 className="font-ui text-[0.6rem] tracking-[0.34em] text-gesso/40">
              OS DOZE TRONOS
            </h2>
            <ol className="mt-5 grid grid-cols-2 gap-x-6">
              {pantheon.map((deus) => {
                const atual = deus.code === "hm";
                const rota = ROTAS[deus.code];
                const rotulo = (
                  <span className="font-ui text-[0.62rem] tracking-[0.24em]">
                    {deus.nameLat.toUpperCase()}
                  </span>
                );

                return (
                  <li key={deus.code} className="flex">
                    {rota && !atual ? (
                      <Link
                        to={rota}
                        onClick={onFechar}
                        className="flex min-h-12 w-full items-center text-gesso/55 transition-colors hover:text-[color:var(--hm-bright)] focus-visible:outline-1 focus-visible:outline-offset-4"
                        style={{ "--hm-bright": BRIGHT, outlineColor: BRIGHT }}
                      >
                        {rotulo}
                      </Link>
                    ) : (
                      <span
                        aria-current={atual ? "page" : undefined}
                        className={`flex min-h-12 w-full items-center ${
                          atual ? "" : "text-gesso/25"
                        }`}
                        style={atual ? { color: BRIGHT } : undefined}
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
    </motion.div>
  );
}

function Hero({ irPara }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 45]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);
  const h = hermes.hero;

  return (
    <section
      id={h.id}
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${h.id}-titulo`}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#080706] focus:outline-none"
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: artY, "--hm-focus": h.focus.desktop }}
      >
        <picture>
          <img
            src={h.art}
            alt={h.alt}
            className="hm-hero-art h-full w-full object-cover"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080706] via-[#080706]/42 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-[#080706]/35" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 67% 38%, rgba(240,198,116,0.12), transparent 32%)",
          }}
        />
        <Rastro intensidade={0.055} />
        <DustCanvas count={18} color="217,164,65" />
      </motion.div>

      <motion.div
        className="relative z-10 grid flex-1 grid-cols-12 items-end px-6 pb-20 pt-32 md:px-12 lg:items-center lg:px-16 lg:pb-12"
        style={{ y: copyY, opacity: copyOpacity }}
      >
        <div className="col-span-12 max-w-xl lg:col-span-6">
          <motion.p
            className="font-ui text-[0.58rem] tracking-[0.38em]"
            style={{ color: BRIGHT }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: reduce ? 0.2 : 0.8, ease: EASE }}
          >
            {h.kicker}
          </motion.p>
          <motion.h1
            id={`${h.id}-titulo`}
            className="mt-5 font-display font-black leading-[0.82] text-gesso"
            style={{ fontSize: "clamp(4.4rem, 12vw, 10rem)", letterSpacing: "-0.035em" }}
            initial={{ opacity: 0, x: -26, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.28, duration: reduce ? 0.2 : 1.05, ease: EASE }}
          >
            {h.titulo}
          </motion.h1>
          <motion.p
            className="mt-7 max-w-lg font-body text-xl italic leading-snug text-gesso/85 md:text-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: reduce ? 0.2 : 0.8, ease: EASE }}
          >
            {h.subtitulo}
          </motion.p>
          <motion.p
            className="mt-4 max-w-md font-body text-base leading-relaxed text-gesso/60 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.68, duration: reduce ? 0.2 : 0.8 }}
          >
            {h.paragrafo}
          </motion.p>

          <motion.dl
            className="mt-8 grid max-w-lg grid-cols-3 border-y border-gesso/10 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.86, duration: reduce ? 0.2 : 0.8 }}
          >
            {h.marcas.map((marca) => (
              <div key={marca.label} className="border-l border-gesso/10 pl-3 first:border-0 first:pl-0">
                <dt className="font-ui text-[0.52rem] tracking-[0.22em]" style={{ color: GOLD }}>
                  {marca.label}
                </dt>
                <dd className="mt-1 hidden font-body text-xs italic text-gesso/35 sm:block">
                  {marca.hint}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: reduce ? 0.2 : 0.7 }}
          >
            {h.ctas.map((cta) => (
              <button
                key={cta.to}
                type="button"
                onClick={() => irPara(cta.to)}
                className={`hm-btn inline-flex ${cta.variant === "solid" ? "hm-btn--solid" : ""}`}
              >
                {cta.label}
              </button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <button
        type="button"
        onClick={() => irPara(h.manifesto ?? hermes.manifesto.id)}
        className="absolute bottom-5 right-6 z-20 hidden min-h-11 items-center gap-3 font-ui text-[0.52rem] tracking-[0.3em] text-gesso/40 lg:inline-flex"
      >
        ATRAVESSAR <span aria-hidden style={{ color: GOLD }}>↓</span>
      </button>
    </section>
  );
}

function Manifesto() {
  const ref = useRef(null);
  const video = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.45 });
  const m = hermes.manifesto;

  useEffect(() => {
    if (reduce || !video.current) return;
    if (inView) {
      video.current.play().catch(() => {});
    } else {
      video.current.pause();
    }
  }, [inView, reduce]);

  return (
    <section
      id={m.id}
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${m.id}-titulo`}
      className="relative flex min-h-[92svh] items-end overflow-hidden bg-[#080706] px-6 pb-20 pt-28 focus:outline-none md:px-12 lg:px-16"
    >
      {reduce ? (
        <img src={m.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <video
          ref={video}
          src={m.video}
          poster={m.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 bg-[#080706]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/20 to-[#080706]/35" />
      <Rastro intensidade={0.04} />
      <motion.div
        className="relative z-10 max-w-4xl"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: reduce ? 0.2 : 1, ease: EASE }}
      >
        <p className="font-ui text-[0.58rem] tracking-[0.4em]" style={{ color: BRIGHT }}>
          {m.kicker}
        </p>
        <h2
          id={`${m.id}-titulo`}
          className="mt-5 max-w-4xl font-display leading-[0.96] text-gesso"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.6rem)" }}
        >
          {m.titulo}
        </h2>
        <p className="mt-7 max-w-xl font-body text-lg leading-relaxed text-gesso/75 md:text-xl">
          {m.texto}
        </p>
      </motion.div>
    </section>
  );
}

function Veu({ tipo }) {
  if (tipo === "bottom") {
    return (
      <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/15 to-transparent lg:from-[#080706]/95 lg:via-transparent" />
    );
  }
  if (tipo === "top-right") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(225deg, rgba(8,7,6,0.94) 0%, rgba(8,7,6,0.62) 31%, transparent 67%)",
        }}
      />
    );
  }
  return (
    <div className="absolute inset-0 bg-gradient-to-r from-[#080706] via-[#080706]/64 to-transparent" />
  );
}

function CenaFX({ id }) {
  if (id === "hermes-scene-02") {
    return (
      <div
        aria-hidden
        className="hm-lua pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 61% 18%, rgba(240,198,116,0.2), transparent 19%)",
        }}
      />
    );
  }
  if (id === "hermes-scene-05" || id === "hermes-scene-06") {
    return (
      <div
        aria-hidden
        className="hm-limiar pointer-events-none absolute inset-y-0 left-[48%] w-[20%] mix-blend-screen"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(240,198,116,0.2), transparent)",
          filter: "blur(22px)",
        }}
      />
    );
  }
  return <DustCanvas count={10} color="217,164,65" />;
}

function Arte({ cena, index, progresso, reduce }) {
  const escala = useTransform(progresso, [0, 0.5, 1], [1.03, 1.08, 1.035]);
  const y = useTransform(progresso, [0, 1], [index % 2 ? -12 : 16, index % 2 ? 18 : -14]);

  return (
    <div
      className="relative h-[68vw] min-h-[24rem] overflow-hidden md:h-[58vw] lg:absolute lg:inset-0 lg:h-auto lg:min-h-0"
      style={{
        "--hm-focus-desktop": cena.focus.desktop,
        "--hm-focus-tablet": cena.focus.tablet,
        "--hm-focus-mobile": cena.focus.mobile,
      }}
    >
      <motion.img
        src={cena.art}
        alt={cena.alt}
        className="hm-scene-art absolute inset-0 h-full w-full object-cover"
        style={reduce ? undefined : { scale: escala, y }}
        loading={index === 0 ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-[#080706]/20 lg:hidden" />
      <div className="hidden lg:block">
        <Veu tipo={cena.copy.veu} />
      </div>
      <CenaFX id={cena.id} />
    </div>
  );
}

function CopyCena({ cena, surge }) {
  const centrado = cena.copy.align === "center";
  return (
    <div className={centrado ? "text-center" : ""}>
      <motion.p
        {...surge(0)}
        className="font-ui text-[0.58rem] tracking-[0.38em]"
        style={{ color: BRIGHT }}
      >
        {cena.kicker}
      </motion.p>
      <motion.h2
        id={`${cena.id}-titulo`}
        {...surge(0.08)}
        className="mt-4 font-display leading-[0.98] text-gesso"
        style={{ fontSize: "clamp(2.15rem, 4.5vw, 4.5rem)" }}
      >
        {cena.titulo}
      </motion.h2>
      <motion.p
        {...surge(0.16)}
        className="mt-6 font-body text-xl italic leading-snug md:text-2xl"
        style={{ color: GOLD }}
      >
        {cena.subtitulo}
      </motion.p>
      <motion.p
        {...surge(0.24)}
        className={`mt-5 font-body text-base leading-relaxed text-gesso/72 md:text-lg ${
          centrado ? "mx-auto max-w-2xl" : "max-w-xl"
        }`}
      >
        {cena.paragrafo}
      </motion.p>
    </div>
  );
}

function NavCena({ cenas, index, irPara }) {
  const anterior = cenas[index - 1];
  const proxima = cenas[index + 1];
  return (
    <nav
      className="relative z-20 flex items-center justify-between border-t border-gesso/10 px-6 py-3 md:px-12 lg:absolute lg:inset-x-0 lg:bottom-0 lg:border-0 lg:px-16 lg:py-5"
      aria-label={`Navegação do ato ${index + 1}`}
    >
      {anterior ? (
        <button
          type="button"
          onClick={() => irPara(anterior.id)}
          className="inline-flex min-h-11 items-center font-ui text-[0.52rem] tracking-[0.28em] text-gesso/40 transition-colors hover:text-gesso/75"
        >
          ← ATO {anterior.capitulo}
        </button>
      ) : (
        <span />
      )}
      {proxima ? (
        <button
          type="button"
          onClick={() => irPara(proxima.id)}
          className="inline-flex min-h-11 items-center font-ui text-[0.52rem] tracking-[0.28em] transition-colors"
          style={{ color: GOLD }}
        >
          ATO {proxima.capitulo} →
        </button>
      ) : (
        <button
          type="button"
          onClick={() => irPara(hermes.legado.id)}
          className="inline-flex min-h-11 items-center font-ui text-[0.52rem] tracking-[0.28em]"
          style={{ color: GOLD }}
        >
          LEGADO →
        </button>
      )}
    </nav>
  );
}

function Cena({ cena, cenas, index, irPara }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.23 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const surge = (atraso) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: {
      duration: reduce ? 0.2 : 0.85,
      delay: reduce ? 0 : atraso,
      ease: EASE,
    },
  });

  return (
    <section
      id={cena.id}
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${cena.id}-titulo`}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#080706] focus:outline-none"
    >
      <Arte cena={cena} index={index} progresso={scrollYProgress} reduce={reduce} />
      <div className="hm-copy relative z-10 flex flex-1 flex-col justify-center px-6 pb-10 pt-10 md:px-12 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:px-16 lg:pb-0 lg:pt-0">
        <div className={`flex flex-col ${VERTICAL[cena.copy.vertical]} ${cena.copy.cols}`}>
          <CopyCena cena={cena} surge={surge} />
        </div>
      </div>
      <NavCena cenas={cenas} index={index} irPara={irPara} />
    </section>
  );
}

function Legado({ irPara }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.35, once: true });
  const legado = hermes.legado;

  return (
    <section
      id={legado.id}
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${legado.id}-titulo`}
      className="relative flex min-h-[78svh] items-center overflow-hidden bg-[#080706] px-6 py-24 focus:outline-none md:px-12 lg:px-16"
    >
      <Rastro intensidade={0.05} />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-full w-px"
        style={{ background: `linear-gradient(transparent, ${GOLD}66, transparent)` }}
      />
      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: reduce ? 0.2 : 1, ease: EASE }}
      >
        <p className="font-ui text-[0.58rem] tracking-[0.4em]" style={{ color: BRIGHT }}>
          {legado.kicker}
        </p>
        <h2
          id={`${legado.id}-titulo`}
          className="mt-6 font-display leading-[0.94] text-gesso"
          style={{ fontSize: "clamp(2.8rem, 7vw, 6.6rem)" }}
        >
          {legado.titulo}
        </h2>
        <p className="mx-auto mt-8 max-w-2xl font-body text-xl italic leading-relaxed text-gesso/70 md:text-2xl">
          {legado.texto}
        </p>
        <button type="button" onClick={() => irPara(hermes.hero.id)} className="hm-btn mt-10 inline-flex">
          REVER O CAMINHO
        </button>
      </motion.div>
    </section>
  );
}

export default function HermesArc() {
  const reduce = useReducedMotion();
  const [menuAberto, setMenuAberto] = useState(false);
  const gatilhoMenu = useRef(null);
  const irPara = useIrPara(reduce);
  const ids = [
    hermes.hero.id,
    hermes.manifesto.id,
    ...hermes.cenas.map((cena) => cena.id),
    hermes.legado.id,
  ];
  const { ativa: cenaAtiva, algumaVisivel } = useCenaAtiva(ids);
  const notas = new Map(hermes.notas.map((nota) => [nota.apos, nota]));
  const railVisivel =
    (cenaAtiva === hermes.hero.id || cenaAtiva === hermes.manifesto.id) &&
    algumaVisivel &&
    !menuAberto;

  const abrirMenu = useCallback(() => {
    gatilhoMenu.current = document.activeElement;
    setMenuAberto(true);
  }, []);

  const fecharMenu = useCallback(() => {
    setMenuAberto(false);
    gatilhoMenu.current?.focus?.();
  }, []);

  return (
    <main id="hermes" aria-label="O arco de Hermes" className="relative bg-[#080706]">
      <a
        href={`#${hermes.hero.id}`}
        className="sr-only z-[120] bg-gesso px-4 py-3 font-ui text-preto focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>

      <Cabecalho onMenu={abrirMenu} railVisivel={railVisivel} aberto={menuAberto} />
      <IndiceTronos visivel={railVisivel} />

      <Hero irPara={irPara} />
      <Manifesto />

      {hermes.cenas.map((cena, index) => {
        const nota = notas.get(cena.id);
        return (
          <Fragment key={cena.id}>
            <Cena cena={cena} cenas={hermes.cenas} index={index} irPara={irPara} />
            {nota && <NotaCritica nota={nota} irPara={irPara} paleta={PALETA_NOTA} />}
          </Fragment>
        );
      })}

      <Legado irPara={irPara} />

      <Colofao
        deus={hermes}
        paleta={PALETA_NOTA}
        botaoClasse="hm-btn"
        passagem={{
          kicker: "O CAMINHO CONTINUA · VOLTA AO CENTRO",
          frase: "Hermes atravessa todos os domínios. O Panteão reúne os tronos que ele conecta.",
          label: "VER O PANTEÃO →",
          to: "/",
          topo: `#${hermes.hero.id}`,
        }}
      />

      <MenuOverlay
        aberto={menuAberto}
        onFechar={fecharMenu}
        irPara={irPara}
        cenaAtiva={cenaAtiva}
      />
    </main>
  );
}
