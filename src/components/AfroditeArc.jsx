import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { afrodite, A } from "../data/gods";
import ScrollScrubVideo from "./ScrollScrubVideo";
import DustCanvas from "./DustCanvas";

const ACCENT = afrodite.accent; // cobre-rosa
const BRIGHT = afrodite.accentBright;

// EFEITO — maré rosé: um brilho quente que respira de baixo pra cima, como espuma
// subindo pela praia. A regra de composição dela: curvas, nenhuma linha reta —
// único deus com border-radius.
function TideGlow({ strong = false }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
      style={{
        background: `radial-gradient(ellipse 70% 90% at 50% 125%, ${BRIGHT} 0%, rgba(201,132,116,0.22) 34%, transparent 64%)`,
        opacity: strong ? 0.5 : 0.28,
        animation: "af-tide 5.5s ease-in-out infinite",
        transformOrigin: "50% 100%",
      }}
    />
  );
}

// EFEITO — duas curvas de espuma deslizando devagar. SVG periódico em 200% de
// largura: o loop de translateX(-50%) emenda sem corte.
function FoamCurves({ opacity = 0.1 }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" style={{ opacity }}>
      <svg
        className="absolute bottom-0 left-0 h-1/2 w-[200%]"
        style={{ animation: "af-wave-drift 16s linear infinite" }}
        viewBox="0 0 800 400"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d="M0 220 C 133 150, 266 290, 400 220 C 533 150, 666 290, 800 220" stroke={BRIGHT} strokeWidth="1.5" />
        <path d="M0 300 C 133 250, 266 350, 400 300 C 533 250, 666 350, 800 300" stroke={ACCENT} strokeWidth="1" opacity="0.7" />
      </svg>
    </div>
  );
}

// Divisor curvo — no lugar da linha reta dos outros deuses.
function CurveDivider({ flip = false }) {
  return (
    <svg className={`mt-4 h-4 w-32 ${flip ? "lg:ml-auto" : ""}`} viewBox="0 0 128 16" fill="none" aria-hidden>
      <path
        d="M2 10 C 24 2, 40 14, 64 8 C 88 2, 104 14, 126 6"
        stroke={BRIGHT}
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${BRIGHT})` }}
      />
    </svg>
  );
}

// INVOCAÇÃO — o retrato GESSO em vídeo (luz respirando sobre o gesso), como
// nas páginas aprovadas. Poster = af-02 para primeiro frame instantâneo.
function Invocacao() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative flex h-[100svh] items-center justify-start overflow-hidden bg-preto">
      <video
        src={afrodite.busto}
        poster={afrodite.bustoPoster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-preto/55" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.85) 100%)" }} />
      <TideGlow strong />
      <FoamCurves opacity={0.12} />
      <DustCanvas count={18} color="232,172,151" />

      {/* Texto à esquerda: o busto do vídeo v4 ocupa o terço direito — título
          centralizado cobria o rosto dela. */}
      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-start pl-[7vw] pr-8 text-left">
        <motion.div
          className="font-ui text-[0.65rem] tracking-[0.6em] text-gesso/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          TRONO {afrodite.numeral} · {afrodite.nameGr}
        </motion.div>
        <motion.h1
          className="mt-6 font-display font-black leading-none text-gesso"
          style={{ fontSize: "clamp(3rem, 11vw, 9rem)", letterSpacing: "0.03em" }}
          initial={{ opacity: 0, filter: "blur(14px)", scale: 1.06 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ delay: 0.35, duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {afrodite.nameLat.toUpperCase()}
        </motion.h1>
        <motion.p
          className="mt-8 max-w-xl text-balance font-body text-xl italic leading-relaxed text-gesso/75 md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1.4 }}
        >
          {afrodite.epithet}
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1.2 }}
      >
        <span className="font-ui text-[0.6rem] tracking-[0.4em]" style={{ color: BRIGHT }}>
          SIGA A ESPUMA
        </span>
        <span className="block h-10 w-px origin-top" style={{ background: BRIGHT, animation: "olimpo-pulse-line 2.2s ease-in-out infinite" }} />
      </motion.div>
    </section>
  );
}

// TESE — o desejo como força, não como sentimento tranquilo. Fundo vivo: o mar
// noturno onde ela nasceu (v-af-tese, loop seamless ping-pong). O templo dela
// (v-af-templo, VASO 9:16) coroa a seção; a espuma rosé do mar emenda com o
// beat I (nascimento da espuma) e o gradiente inferior apaga tudo no preto.
function Tese() {
  return (
    <section className="relative overflow-hidden border-t border-gesso/5 bg-preto py-20">
      <video
        src={`${A}/videos/v-af-tese.mp4`}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-preto/55" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-preto" />
      <TideGlow />
      <div className="relative z-10 flex flex-col items-center px-8">
        <div className="relative aspect-[9/16] h-[34svh] shrink-0 md:h-[40svh]">
          <div
            className="absolute inset-0 overflow-hidden rounded-[1.75rem] border"
            style={{ borderColor: `${BRIGHT}55`, boxShadow: `0 0 70px ${BRIGHT}26` }}
          >
            <video
              src={`${A}/videos/v-af-templo.mp4`}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="mt-10 max-w-2xl text-center">
          <div className="font-ui text-[0.6rem] tracking-[0.5em]" style={{ color: BRIGHT }}>
            O DESEJO ANTES DAS REGRAS
          </div>
          <p className="mt-8 text-balance font-body text-2xl italic leading-relaxed text-gesso/80 md:text-3xl">{afrodite.thesis}</p>
        </div>
      </div>
    </section>
  );
}

// UM BEAT — painel VASO 9:16 emoldurado (a moldura curva é dela; os vídeos sem
// borda própria ganham uma) ao lado do texto. O vídeo vai INTEIRO — nada de
// object-cover em tela cheia, que cropava e estourava a resolução (704px de
// largura esticados pra viewport). Cena scrubada pelo scroll como sempre.
// Campos extras do arco dela: `nota` (marginalia histórica), `transicao` (ponte
// pro beat seguinte) e `links` (conexões com outros tronos, em pílulas curvas).
function Beat({ act, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Entrada da seção (topo entrando na tela → topo no topo): o véu preto sai
  // DURANTE a entrada, não depois — era o buraco preto entre a TESE e o beat I.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  // Spring mais macia + vídeos re-encodados com keyframes densos (ver
  // tools/reencode-scrub): o seek deixa de "travar" no scrub.
  const scrub = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.5 });

  const textOpacity = useTransform(scrollYProgress, [0, 0.12, 0.8, 0.94], [0, 1, 1, 0]);
  const blackIn = useTransform(enter, [0, 0.45, 1], [1, 0.25, 0]);
  const blackOut = useTransform(scrollYProgress, [0.88, 1], [0, 1]);
  const flip = index % 2 === 1;
  const textY = useTransform(scrollYProgress, [0, 0.14], [40, 0]);

  return (
    <section ref={ref} className="relative h-[270vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden bg-preto">
        <TideGlow />
        <FoamCurves opacity={0.07} />

        <div
          className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-6 md:gap-10 md:px-16 lg:flex-row ${
            flip ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Painel do vídeo: 9:16 inteiro, sem crop. Moldura curva = a regra de
              composição dela (único deus com border-radius). */}
          <div className="relative aspect-[9/16] h-[30svh] shrink-0 sm:h-[42svh] lg:h-[88svh]">
            <div
              className="absolute inset-0 overflow-hidden rounded-[1.75rem] border"
              style={{ borderColor: `${BRIGHT}55`, boxShadow: `0 0 70px ${BRIGHT}26` }}
            >
              {act.still ? (
                <img src={act.still} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <ScrollScrubVideo src={act.video} progress={scrub} />
              )}
            </div>
          </div>

          <motion.div style={{ opacity: textOpacity, y: textY }} className={`max-w-2xl ${flip ? "lg:text-right" : ""}`}>
            <div className="font-ui text-xs tracking-[0.5em] text-bronze">{act.n}</div>
            <h3 className="mt-3 font-display leading-none text-gesso" style={{ fontSize: "clamp(1.8rem, 4.6vw, 3.2rem)" }}>
              {act.titulo}
            </h3>
            <CurveDivider flip={flip} />
            <p className="mt-4 font-body text-base italic leading-snug md:text-xl" style={{ color: ACCENT }}>
              {act.frase}
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-gesso/90 md:text-xl">{act.texto}</p>

            {act.nota && <p className="mt-4 font-body text-sm italic leading-relaxed text-gesso/50 md:text-base">{act.nota}</p>}

            {act.links && (
              <div className={`mt-6 flex flex-wrap gap-3 ${flip ? "lg:justify-end" : ""}`}>
                {act.links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="group flex flex-col rounded-full border px-6 py-3 transition-colors hover:bg-gesso/5"
                    style={{ borderColor: `${BRIGHT}55` }}
                  >
                    <span className="font-ui text-[0.55rem] tracking-[0.35em]" style={{ color: BRIGHT }}>
                      {l.tag}
                    </span>
                    <span className="mt-1 font-body text-base italic text-gesso/75 transition-colors group-hover:text-gesso">{l.label} →</span>
                  </Link>
                ))}
              </div>
            )}

            {act.transicao && <p className="mt-6 font-body text-sm italic leading-relaxed text-gesso/60 md:text-lg">— {act.transicao}</p>}
          </motion.div>
        </div>

        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-preto" style={{ opacity: blackIn }} />
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-preto" style={{ opacity: blackOut }} />
      </div>
    </section>
  );
}

// FECHO — a colunata G-03 (GESSO, luz dourada, folhas caindo) em deriva lenta
// atrás do texto de fechamento.
function Fecho() {
  return (
    <section className="relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden bg-preto px-8 py-24">
      <img
        src={`${A}/_global/g-03.png`}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        style={{ animation: "af-drift 44s ease-in-out infinite" }}
      />
      <div className="absolute inset-0 bg-preto/60" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 20%, rgba(10,10,10,0.8) 100%)" }}
      />
      <TideGlow />
      <FoamCurves opacity={0.08} />

      <div className="relative z-10 max-w-2xl text-center">
        <p className="text-balance font-body text-2xl italic leading-relaxed text-gesso/75 md:text-3xl">{afrodite.fecho}</p>
        <p className="mt-8 text-balance font-body text-xl italic leading-relaxed md:text-2xl" style={{ color: BRIGHT }}>
          {afrodite.fechoFinal}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="rounded-full border border-gesso/20 px-6 py-3 font-ui text-[0.65rem] tracking-[0.35em] text-gesso/70 transition-colors hover:border-gesso/50 hover:text-gesso"
          >
            ← O PANTEÃO
          </Link>
          <Link
            to="/hefesto"
            className="rounded-full border px-6 py-3 font-ui text-[0.65rem] tracking-[0.35em] transition-colors"
            style={{ borderColor: `${BRIGHT}55`, color: BRIGHT }}
          >
            TRONO X · HEFESTO →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AfroditeArc() {
  return (
    <main id="afrodite" aria-label="O arco de Afrodite" className="relative bg-preto">
      <Invocacao />
      <Tese />
      {afrodite.atos.map((act, i) => (
        <Beat key={act.n} act={act} index={i} />
      ))}
      <Fecho />
    </main>
  );
}
