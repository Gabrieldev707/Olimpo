// ARQUIVADO — arco de vídeo do Poseidon (Fase 1), que ocupava /poseidon até o
// handoff definitivo do Canva ("Olimpo — Poseidon Handoff Definitivo 01–07").
// A rota /poseidon agora renderiza a landing de 7 cenas em PoseidonArc.jsx.
// Preservado intacto: continua lendo `poseidon.atos` e os vídeos v-poseidon-b1..b5,
// que seguem no catálogo. Não está importado em lugar nenhum — não entra no bundle.
// Apagar ou re-rotear é decisão do Gabriel.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { poseidon } from "../data/gods";
import ScrollScrubVideo from "./ScrollScrubVideo";
import DustCanvas from "./DustCanvas";

const ACCENT = poseidon.accent; // verde-garrafa
const BRIGHT = poseidon.accentBright; // cáustica / espuma

// Luz cáustica: faixas diagonais de luz que ondulam — a "superfície do mar" vista de baixo.
function Caustics() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-[-20%] opacity-[0.16] mix-blend-screen"
        style={{
          background: `repeating-linear-gradient(115deg, transparent 0px, transparent 60px, ${BRIGHT} 90px, transparent 130px)`,
          filter: "blur(14px)",
          animation: "po-caustics 9s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute inset-[-20%] opacity-[0.10] mix-blend-screen"
        style={{
          background: `repeating-linear-gradient(65deg, transparent 0px, transparent 90px, ${BRIGHT} 130px, transparent 190px)`,
          filter: "blur(22px)",
          animation: "po-caustics 13s ease-in-out infinite alternate-reverse",
        }}
      />
    </div>
  );
}

// Gradiente de profundidade — quanto mais fundo, mais escuro.
function Depth() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ background: "linear-gradient(180deg, rgba(9,26,24,0.3) 0%, rgba(10,10,10,0.55) 46%, rgba(5,8,8,0.85) 100%)" }}
    />
  );
}

// INVOCAÇÃO — o busto submerso.
function Invocacao() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-preto">
      <video src={poseidon.busto} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
      <Depth />
      <Caustics />
      <DustCanvas count={24} color="150,200,185" />

      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div className="font-ui text-[0.65rem] tracking-[0.6em] text-gesso/55" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1.1 }}>
          TRONO {poseidon.numeral} · {poseidon.nameGr}
        </motion.div>
        <motion.h1
          className="mt-6 font-display font-black leading-none text-gesso"
          style={{ fontSize: "clamp(3rem, 12vw, 9rem)", letterSpacing: "0.04em" }}
          initial={{ opacity: 0, filter: "blur(14px)", y: 30 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 0.4, duration: 1.3, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {poseidon.nameLat.toUpperCase()}
        </motion.h1>
        <motion.p className="mt-8 max-w-xl text-balance font-body text-xl italic leading-relaxed text-gesso/75 md:text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.4 }}>
          {poseidon.epithet}
        </motion.p>
      </motion.div>

      <motion.div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 1.2 }}>
        <span className="font-ui text-[0.6rem] tracking-[0.4em]" style={{ color: BRIGHT }}>
          SUBA À SUPERFÍCIE
        </span>
        <span className="block h-10 w-px origin-top" style={{ background: BRIGHT, animation: "olimpo-pulse-line 2.4s ease-in-out infinite" }} />
      </motion.div>
    </section>
  );
}

function Tese() {
  return (
    <section className="relative overflow-hidden border-t border-gesso/5 bg-preto py-28">
      <Caustics />
      <div className="relative z-10 mx-auto max-w-2xl px-8 text-center">
        <div className="font-ui text-[0.6rem] tracking-[0.5em]" style={{ color: BRIGHT }}>
          FORÇA IMPRESSIONA · SABEDORIA CONSTRÓI
        </div>
        <p className="mt-8 text-balance font-body text-2xl italic leading-relaxed text-gesso/80 md:text-3xl">{poseidon.thesis}</p>
      </div>
    </section>
  );
}

function Beat({ act, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scrub = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const textOpacity = useTransform(scrollYProgress, [0, 0.14, 0.8, 0.94], [0, 1, 1, 0]);
  const black = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [1, 0, 0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.16], [40, 0]);
  const flip = index % 2 === 1;

  return (
    <section ref={ref} className="relative h-[270vh]">
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden bg-preto pb-[11vh]">
        <ScrollScrubVideo src={act.video} progress={scrub} className="scale-[1.08]" />
        <div className="absolute inset-0 bg-preto/25" />
        <div
          className="absolute inset-0"
          style={{
            background: flip
              ? "linear-gradient(270deg, rgba(6,10,10,0.95) 0%, rgba(6,10,10,0.45) 46%, transparent 80%)"
              : "linear-gradient(90deg, rgba(6,10,10,0.95) 0%, rgba(6,10,10,0.45) 46%, transparent 80%)",
          }}
        />
        <Caustics />
        <motion.div aria-hidden className="absolute inset-0 z-20 bg-preto" style={{ opacity: black }} />

        <motion.div style={{ opacity: textOpacity, y: textY }} className={`relative z-10 mx-auto w-full max-w-6xl px-8 md:px-16 ${flip ? "flex justify-end" : ""}`}>
          <div className={`max-w-2xl ${flip ? "text-right" : ""}`}>
            <div className="font-ui text-xs tracking-[0.5em] text-bronze">{act.n}</div>
            <h3 className="mt-3 font-display leading-none text-gesso" style={{ fontSize: "clamp(1.8rem, 4.6vw, 3.2rem)" }}>
              {act.titulo}
            </h3>
            <div className={`mt-4 h-px w-24 ${flip ? "ml-auto" : ""}`} style={{ background: BRIGHT, boxShadow: `0 0 14px ${BRIGHT}` }} />
            <p className="mt-4 font-body text-lg italic leading-snug md:text-xl" style={{ color: BRIGHT }}>
              {act.frase}
            </p>
            <p className="mt-4 font-body text-lg leading-relaxed text-gesso/90 md:text-xl">{act.texto}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Fecho() {
  return (
    <section className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden bg-preto px-8 py-24">
      <Depth />
      <Caustics />
      <div className="relative z-10 max-w-2xl text-center">
        <p className="text-balance font-body text-2xl italic leading-relaxed text-gesso/75 md:text-3xl">{poseidon.fecho}</p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="border border-gesso/20 px-6 py-3 font-ui text-[0.65rem] tracking-[0.35em] text-gesso/70 transition-colors hover:border-gesso/50 hover:text-gesso">
            ← O PANTEÃO
          </Link>
          <Link to="/hefesto" className="border px-6 py-3 font-ui text-[0.65rem] tracking-[0.35em] transition-colors" style={{ borderColor: `${BRIGHT}55`, color: BRIGHT }}>
            TRONO X · HEFESTO →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function PoseidonArc() {
  return (
    <main id="poseidon" aria-label="O arco de Poseidon" className="relative bg-preto">
      <Invocacao />
      <Tese />
      {poseidon.atos.map((act, i) => (
        <Beat key={act.n} act={act} index={i} />
      ))}
      <Fecho />
    </main>
  );
}
