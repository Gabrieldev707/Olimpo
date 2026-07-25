import { motion } from "motion/react";
import { hero } from "../data/gods";
import DustCanvas from "./DustCanvas";

const A = "/assets";

// Meandro (g-02.svg) como faixa fina que se repete na horizontal — chave grega contínua.
function MeanderStrip({ className = "", flip = false }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-0 h-3 w-full opacity-30 ${className}`}
      style={{
        backgroundImage: `url(${A}/_global/g-02.svg)`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        transform: flip ? "scaleY(-1)" : undefined,
        filter: "sepia(1) saturate(1.7) hue-rotate(-8deg) brightness(0.95)",
      }}
    />
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const letter = {
  hidden: { opacity: 0, y: "0.35em", filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function Hero() {
  return (
    <section className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden">
      {/* vídeo de fundo */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={hero.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* overlay escuro + vinheta */}
      <div className="absolute inset-0 bg-preto/60" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(10,10,10,0.85) 100%)" }}
      />

      <DustCanvas count={22} />
      <MeanderStrip className="top-8" />
      <MeanderStrip className="bottom-24" flip />

      {/* conteúdo */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          className="mb-8 font-ui text-[0.7rem] font-light tracking-[0.55em] text-gesso/60"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1 }}
        >
          {hero.kicker}
        </motion.div>

        <motion.h1
          className="font-display font-black leading-none text-gesso"
          style={{ fontSize: "clamp(3.5rem, 15vw, 12rem)", letterSpacing: "0.02em" }}
          variants={container}
          initial="hidden"
          animate="show"
          aria-label={hero.title}
        >
          {hero.title.split("").map((c, i) => (
            <motion.span key={i} variants={letter} className="inline-block" aria-hidden>
              {c}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-balance font-body text-xl italic text-gesso/75 md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1.4 }}
        >
          {hero.subtitle}
        </motion.p>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
      >
        <span className="font-ui text-[0.6rem] tracking-[0.4em] text-gesso/50">ROLE</span>
        <span
          className="block h-10 w-px origin-top bg-gesso/50"
          style={{ animation: "olimpo-pulse-line 2.4s ease-in-out infinite" }}
        />
      </motion.div>
    </section>
  );
}
