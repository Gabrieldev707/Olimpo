import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { zeus } from "../data/gods";
import ScrollScrubVideo from "./ScrollScrubVideo";
import DustCanvas from "./DustCanvas";

const ACCENT = zeus.accent; // branco elétrico

// Abertura do arco — a xilogravura do trono ao fundo, a tese por cima.
function ArcIntro() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <video
        src={zeus.trono}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full scale-[1.08] object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-preto/75" />
      <DustCanvas count={14} />
      <div className="relative z-10 mx-auto max-w-3xl px-8 text-center">
        <div className="font-ui text-xs tracking-[0.5em] text-bronze">TRONO I · ΖΕΥΣ</div>
        <h2 className="mt-6 font-display leading-tight text-gesso" style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}>
          O arco de Zeus
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-balance font-body text-xl italic leading-relaxed text-gesso/70 md:text-2xl">
          {zeus.thesis}
        </p>
        <div className="mx-auto mt-10 h-10 w-px bg-gesso/30" />
      </div>
    </section>
  );
}

// Um beat = xilogravura full-bleed scrubada pelo scroll + narrativa que revela. Texto alterna o lado.
function Beat({ act, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scrub = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const textOpacity = useTransform(scrollYProgress, [0, 0.14, 0.8, 0.94], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.16], [40, 0]);
  const black = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [1, 0, 0, 1]);
  const flip = index % 2 === 1;

  return (
    <section ref={ref} className="relative h-[270vh]">
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden bg-preto pb-[11vh]">
        <ScrollScrubVideo src={act.video} progress={scrub} className="scale-[1.08]" />

        {/* leve escurecida geral + scrim de baixo pra leitura */}
        <div className="absolute inset-0 bg-preto/25" />
        <div
          className="absolute inset-x-0 bottom-0 h-[62%]"
          style={{ background: "linear-gradient(0deg, rgba(10,10,10,0.97) 6%, rgba(10,10,10,0.45) 52%, transparent 100%)" }}
        />
        <motion.div aria-hidden className="absolute inset-0 z-20 bg-preto" style={{ opacity: black }} />

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className={`relative z-10 mx-auto w-full max-w-6xl px-8 md:px-16 ${flip ? "flex justify-end" : ""}`}
        >
          <div className={`max-w-2xl ${flip ? "text-right" : ""}`}>
            <div className="font-ui text-xs tracking-[0.5em] text-bronze">{act.n}</div>
            <h3 className="mt-3 font-display leading-none" style={{ color: ACCENT, fontSize: "clamp(1.9rem, 5vw, 3.4rem)" }}>
              {act.titulo}
            </h3>
            <div className={`mt-5 h-px w-24 bg-bronze ${flip ? "ml-auto" : ""}`} />
            <p className="mt-5 font-body text-lg leading-relaxed text-gesso/90 md:text-xl">{act.texto}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Fecho() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center bg-preto px-8 py-24">
      <p className="max-w-2xl text-balance text-center font-body text-2xl italic leading-relaxed text-gesso/70 md:text-3xl">
        {zeus.fecho}
      </p>
    </section>
  );
}

export default function ZeusArc() {
  return (
    <section id="zeus" aria-label="O arco de Zeus">
      <ArcIntro />
      {zeus.atos.map((act, i) => (
        <Beat key={act.n} act={act} index={i} />
      ))}
      <Fecho />
    </section>
  );
}
