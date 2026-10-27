import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { hefesto } from "../data/gods";
import ScrollScrubVideo from "./ScrollScrubVideo";
import DustCanvas from "./DustCanvas";

const ACCENT = hefesto.accent; // brasa
const BRIGHT = hefesto.accentBright; // cobre incandescente

// EFEITO — brilho de forja: um clarão quente que pulsa embaixo, como brasa respirando.
function ForgeGlow({ strong = false }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
      style={{
        background: `radial-gradient(ellipse 80% 100% at 50% 130%, ${BRIGHT} 0%, rgba(217,108,31,0.25) 30%, transparent 62%)`,
        opacity: strong ? 0.55 : 0.32,
        animation: "forge-pulse 4.5s ease-in-out infinite",
        transformOrigin: "50% 100%",
      }}
    />
  );
}

// INVOCAÇÃO — busto foto-real, luz de forja e faíscas subindo.
function Invocacao() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-preto">
      <video src={hefesto.busto} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full scale-[1.05] object-cover" />
      <div className="absolute inset-0 bg-preto/55" />
      <ForgeGlow strong />
      <DustCanvas count={22} color="240,134,46" />

      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div className="font-ui text-[0.65rem] tracking-[0.6em] text-gesso/60" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
          TRONO {hefesto.numeral} · {hefesto.nameGr}
        </motion.div>
        <motion.h1
          className="mt-6 font-display font-black leading-none text-gesso"
          style={{ fontSize: "clamp(3rem, 13vw, 10rem)", letterSpacing: "0.03em" }}
          initial={{ opacity: 0, filter: "blur(14px)", y: 30 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 0.35, duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {hefesto.nameLat.toUpperCase()}
        </motion.h1>
        <motion.p className="mt-8 max-w-xl text-balance font-body text-xl italic leading-relaxed text-gesso/75 md:text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1.4 }}>
          {hefesto.epithet}
        </motion.p>
      </motion.div>

      <motion.div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9, duration: 1.2 }}>
        <span className="font-ui text-[0.6rem] tracking-[0.4em]" style={{ color: BRIGHT }}>
          DESÇA À FORJA
        </span>
        <span className="block h-10 w-px origin-top" style={{ background: BRIGHT, animation: "olimpo-pulse-line 2.2s ease-in-out infinite" }} />
      </motion.div>
    </section>
  );
}

function Tese() {
  return (
    <section className="relative overflow-hidden border-t border-gesso/5 bg-preto py-28">
      <ForgeGlow />
      <div className="relative z-10 mx-auto max-w-2xl px-8 text-center">
        <div className="font-ui text-[0.6rem] tracking-[0.5em]" style={{ color: BRIGHT }}>
          O DEUS QUE O OLIMPO REJEITOU
        </div>
        <p className="mt-8 text-balance font-body text-2xl italic leading-relaxed text-gesso/80 md:text-3xl">{hefesto.thesis}</p>
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
              ? "linear-gradient(270deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.45) 46%, transparent 80%)"
              : "linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.45) 46%, transparent 80%)",
          }}
        />
        <ForgeGlow />
        <motion.div aria-hidden className="absolute inset-0 z-20 bg-preto" style={{ opacity: black }} />

        <motion.div style={{ opacity: textOpacity, y: textY }} className={`relative z-10 mx-auto w-full max-w-6xl px-8 md:px-16 ${flip ? "flex justify-end" : ""}`}>
          <div className={`max-w-2xl ${flip ? "text-right" : ""}`}>
            <div className="font-ui text-xs tracking-[0.5em] text-bronze">{act.n}</div>
            <h3 className="mt-3 font-display leading-none text-gesso" style={{ fontSize: "clamp(1.8rem, 4.6vw, 3.2rem)" }}>
              {act.titulo}
            </h3>
            <div className={`mt-4 h-px w-24 ${flip ? "ml-auto" : ""}`} style={{ background: BRIGHT, boxShadow: `0 0 16px ${BRIGHT}` }} />
            <p className="mt-4 font-body text-lg italic leading-snug md:text-xl" style={{ color: ACCENT }}>
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
      <ForgeGlow />
      <div className="relative z-10 max-w-2xl text-center">
        <p className="text-balance font-body text-2xl italic leading-relaxed text-gesso/75 md:text-3xl">{hefesto.fecho}</p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="border border-gesso/20 px-6 py-3 font-ui text-[0.65rem] tracking-[0.35em] text-gesso/70 transition-colors hover:border-gesso/50 hover:text-gesso">
            ← O PANTEÃO
          </Link>
          <Link to="/hermes" className="border px-6 py-3 font-ui text-[0.65rem] tracking-[0.35em] transition-colors" style={{ borderColor: `${BRIGHT}55`, color: BRIGHT }}>
            TRONO XI · HERMES →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HefestoArc() {
  return (
    <main id="hefesto" aria-label="O arco de Hefesto" className="relative bg-preto">
      <Invocacao />
      <Tese />
      {hefesto.atos.map((act, i) => (
        <Beat key={act.n} act={act} index={i} />
      ))}
      <Fecho />
    </main>
  );
}
