import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { zeus } from "../data/gods";
import ScrollScrubVideo from "./ScrollScrubVideo";
import DustCanvas from "./DustCanvas";

const WHITE = "#F2F2F2"; // acento do Zeus

// Placa VASO (figura-vermelha) — a mini-história do mito. Vídeo animado quando existe,
// senão a estampa; sempre emoldurada e rotulada, nunca "jogada".
function VasoPanel({ painel, video, opacity }) {
  return (
    <motion.figure
      style={{ opacity }}
      className="absolute right-6 top-1/2 z-10 hidden w-[clamp(180px,17vw,290px)] -translate-y-1/2 lg:block xl:right-16"
    >
      <div className="relative border border-bronze/40 bg-preto/50 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
        {video ? (
          <video src={video} autoPlay muted loop playsInline className="block aspect-[3/4] w-full object-cover" />
        ) : (
          <img src={painel} alt="" className="block aspect-[3/4] w-full object-cover" />
        )}
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-terracota/10" />
      </div>
      <figcaption className="mt-3 text-center font-ui text-[0.58rem] tracking-[0.35em] text-bronze/80">
        {video ? "O MITO · VASO ANIMADO" : "O MITO · FIGURA VERMELHA"}
      </figcaption>
    </motion.figure>
  );
}

// Abertura do arco — a tese, contra-plongée.
function ArcIntro() {
  return (
    <div className="relative flex min-h-[80svh] items-center justify-center overflow-hidden border-t border-gesso/5 py-24">
      <DustCanvas count={16} />
      <div className="relative z-10 mx-auto max-w-3xl px-8 text-center">
        <div className="font-ui text-xs tracking-[0.5em] text-bronze">TRONO I · ΖΕΥΣ</div>
        <h2 className="mt-6 font-display text-4xl leading-tight text-gesso md:text-6xl">O arco de Zeus</h2>
        <p className="mx-auto mt-8 max-w-2xl text-balance font-body text-xl italic leading-relaxed text-gesso/70 md:text-2xl">
          {zeus.thesis}
        </p>
        <div className="mx-auto mt-10 h-10 w-px bg-gesso/30" />
      </div>
    </div>
  );
}

// Um ato = seção alta com stage sticky; o vídeo é scrubado no scroll e o texto revela.
function Act({ act }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scrub = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  const textOpacity = useTransform(scrollYProgress, [0, 0.14, 0.78, 0.94], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.16], [40, 0]);
  // fade-to-black nas bordas do ato (entra e sai do preto)
  const black = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [1, 0, 0, 1]);
  // zoom lento no fundo GESSO conforme o scroll — dá dinâmica mesmo em loop sutil
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1.02]);

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden pb-[11vh]">
        <motion.div style={{ scale: bgScale }} className="absolute inset-0">
          <ScrollScrubVideo src={act.video} progress={scrub} />
        </motion.div>

        {/* overlays: escurecimento geral + gradiente do lado do texto (contra-plongée à esquerda) */}
        <div className="absolute inset-0 bg-preto/45" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.94) 0%, rgba(10,10,10,0.6) 42%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{ background: "linear-gradient(0deg, rgba(10,10,10,0.85) 0%, transparent 100%)" }}
        />
        <motion.div aria-hidden className="absolute inset-0 z-20 bg-preto" style={{ opacity: black }} />

        {/* placa VASO do mito (vídeo animado quando existe; nem todo ato tem painel de vaso) */}
        {act.painel && <VasoPanel painel={act.painel} video={act.painelVideo} opacity={textOpacity} />}

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 mx-auto w-full max-w-6xl px-8 md:px-16"
        >
          <div className="max-w-xl">
            <div className="font-ui text-xs tracking-[0.5em] text-bronze">{act.n}</div>
            <h3 className="mt-4 font-display text-4xl leading-none md:text-6xl" style={{ color: WHITE }}>
              {act.titulo}
            </h3>
            <p className="mt-6 font-body text-lg leading-relaxed text-gesso/90 md:text-xl">{act.texto}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ArcFecho() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center bg-preto px-8">
      <p className="max-w-2xl text-balance text-center font-body text-2xl italic leading-relaxed text-gesso/70 md:text-3xl">
        {zeus.fecho}
      </p>
    </div>
  );
}

export default function ZeusArc() {
  return (
    <section id="zeus" aria-label="O arco de Zeus">
      <ArcIntro />
      {zeus.atos.map((act) => (
        <Act key={act.n} act={act} />
      ))}
      <ArcFecho />
    </section>
  );
}
