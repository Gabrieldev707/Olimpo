import { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { dionisioPagina } from "../data/gods";
import NotaCritica from "./NotaCritica";
import Colofao from "./Colofao";

const COBRE = "#D8A061";
const FUNDO = "#080605";
const EASE = [0.2, 0.7, 0.2, 1];
const PALETA_NOTA = { accent: "#D98F4E", borda: "#8C5A2B", fundo: FUNDO };

function irPara(id, reduzir) {
  const secao = document.getElementById(id);
  if (!secao) return;
  secao.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" });
  secao.focus({ preventScroll: true });
}

function ImagemEmScroll({ src, alt, principal = false, foco = "center" }) {
  const ref = useRef(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const escala = useTransform(scrollYProgress, [0, 1], [1.06, 1.14]);
  const y = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  return (
    <div ref={ref} className="relative h-[54svh] min-h-[20rem] w-full overflow-hidden md:absolute md:inset-0 md:h-full md:min-h-0">
      <motion.img
        src={src}
        alt={alt}
        loading={principal ? "eager" : "lazy"}
        fetchPriority={principal ? "high" : undefined}
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
        style={{ objectPosition: foco, ...(reduzir ? {} : { scale: escala, y }) }}
      />
    </div>
  );
}

function Hero() {
  const h = dionisioPagina.hero;
  const reduzir = useReducedMotion();
  return (
    <section id={h.id} tabIndex={-1} aria-labelledby={`${h.id}-titulo`} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#080605] focus:outline-none">
      <ImagemEmScroll src={h.art} alt={h.alt} principal foco="66% center" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[54svh] bg-gradient-to-t from-[#080605] via-transparent to-[#080605]/30 md:inset-0 md:h-auto md:bg-gradient-to-r md:from-[#080605]/95 md:via-[#080605]/50 md:to-transparent" />
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-20 pt-10 md:justify-center md:px-12 md:pt-28 lg:px-16">
        <motion.div className="max-w-xl" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduzir ? 0.01 : 1, ease: EASE }}>
          <p className="font-ui text-[0.6rem] tracking-[0.36em]" style={{ color: COBRE }}>TRONO XII · O DEUS DA TRANSFORMAÇÃO</p>
          <h1 id={`${h.id}-titulo`} className="mt-5 font-display font-black leading-[0.9] text-gesso" style={{ fontSize: "clamp(2.4rem, 10vw, 8.5rem)", letterSpacing: "-0.035em" }}>{h.titulo}</h1>
          <p className="mt-7 font-body text-2xl italic leading-snug text-gesso md:text-3xl">{h.subtitulo}</p>
          <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-gesso/75 md:text-xl">{h.texto}</p>
        </motion.div>
      </div>
      <button type="button" onClick={() => irPara(dionisioPagina.atos[0].id, reduzir)} className="absolute bottom-5 right-6 z-20 inline-flex min-h-11 items-center gap-3 font-ui text-[0.55rem] tracking-[0.28em] text-gesso/70 md:right-12 lg:right-16">
        COMEÇAR A HISTÓRIA <span aria-hidden style={{ color: COBRE }}>↓</span>
      </button>
    </section>
  );
}

function Ato({ ato, indice }) {
  const ref = useRef(null);
  const reduzir = useReducedMotion();
  const visivel = useInView(ref, { amount: 0.2, once: true });
  const esquerda = ato.posicao === "left";
  const proximo = dionisioPagina.atos[indice + 1];

  return (
    <section id={ato.id} ref={ref} tabIndex={-1} aria-labelledby={`${ato.id}-titulo`} className="relative flex min-h-[100svh] flex-col overflow-hidden focus:outline-none" style={{ background: FUNDO }}>
      <ImagemEmScroll src={ato.art} alt={ato.alt} foco={indice === 3 ? "48% center" : "center"} />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[54svh] bg-gradient-to-t from-[#080605] via-transparent to-[#080605]/15 md:inset-0 md:h-auto md:bg-gradient-to-t md:from-[#080605] md:via-[#080605]/90 md:to-transparent" />
      <div className={`relative z-10 flex flex-1 flex-col justify-center px-6 pb-8 pt-8 md:justify-end md:px-12 md:pb-12 md:pt-20 lg:px-16 ${esquerda ? "md:items-start" : "md:items-end"}`}>
        <motion.div className="max-w-[35rem]" initial={{ opacity: 0, y: 22 }} animate={visivel ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} transition={{ duration: reduzir ? 0.01 : 0.85, ease: EASE }}>
          <p className="font-ui text-[0.58rem] tracking-[0.35em]" style={{ color: COBRE }}>ATO {ato.numeral}</p>
          <h2 id={`${ato.id}-titulo`} className="mt-4 font-display leading-[1.02] text-gesso" style={{ fontSize: "clamp(2.2rem, 3.5vw, 4.1rem)" }}>{ato.titulo}</h2>
          <p className="mt-6 font-body text-xl italic leading-snug md:text-2xl" style={{ color: COBRE }}>{ato.chamada}</p>
          <p className="mt-5 max-w-[31rem] font-body text-lg leading-relaxed text-gesso/80 md:text-xl">{ato.texto}</p>
        </motion.div>
      </div>
      <nav aria-label={`Navegação após o ato ${ato.numeral}`} className="relative z-10 flex items-center justify-between gap-4 px-6 pb-6 font-ui text-[0.54rem] tracking-[0.22em] md:px-12 md:pb-8 lg:px-16">
        <button type="button" onClick={() => irPara(indice ? dionisioPagina.atos[indice - 1].id : dionisioPagina.hero.id, reduzir)} className="inline-flex min-h-11 items-center text-gesso/55 hover:text-gesso">← VOLTAR</button>
        <button type="button" onClick={() => irPara(proximo?.id ?? dionisioPagina.conclusao.id, reduzir)} className="inline-flex min-h-11 items-center text-right hover:text-gesso" style={{ color: COBRE }}>{proximo ? `ATO ${proximo.numeral}` : "DESFECHO"} →</button>
      </nav>
    </section>
  );
}

function Conclusao() {
  const fim = dionisioPagina.conclusao;
  return (
    <section id={fim.id} tabIndex={-1} aria-labelledby={`${fim.id}-titulo`} className="relative flex min-h-[75svh] flex-col items-center justify-center bg-[#080605] px-6 py-24 text-center focus:outline-none">
      <div aria-hidden className="absolute left-1/2 top-0 h-24 w-px bg-gradient-to-b from-transparent to-[#D8A061]/70" />
      <p className="font-ui text-[0.58rem] tracking-[0.36em]" style={{ color: COBRE }}>DIONÍSIO · XII</p>
      <h2 id={`${fim.id}-titulo`} className="mt-6 max-w-4xl font-display leading-[1.02] text-gesso" style={{ fontSize: "clamp(2.5rem, 6vw, 5.8rem)" }}>{fim.titulo}</h2>
      <p className="mt-8 max-w-2xl font-body text-xl italic leading-relaxed text-gesso/75 md:text-2xl">{fim.texto}</p>
      <Link to="/" className="mt-12 inline-flex min-h-12 items-center border-b border-[#D8A061]/60 font-ui text-[0.58rem] tracking-[0.3em] text-gesso/75 hover:text-gesso">VOLTAR AO PANTEÃO →</Link>
    </section>
  );
}

export default function DionisioArc() {
  const reduzir = useReducedMotion();
  return (
    <main id="dionisio" aria-label="O arco de Dionísio" className="relative bg-[#080605]">
      <button type="button" onClick={() => irPara(dionisioPagina.hero.id, reduzir)} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[#080605] focus:px-4 focus:py-3">Pular para o conteúdo</button>
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <Link to="/" className="pointer-events-auto inline-flex min-h-11 items-center font-ui text-[0.65rem] tracking-[0.32em] text-gesso/90">OLIMPO</Link>
        <span className="font-ui text-[0.52rem] tracking-[0.3em] text-gesso/70">DIONÍSIO · XII</span>
      </header>
      <Hero />
      <NotaCritica nota={dionisioPagina.notas[0]} irPara={(alvo) => irPara(alvo, reduzir)} paleta={PALETA_NOTA} />
      {dionisioPagina.atos.map((ato, indice) => (
        <Fragment key={ato.id}>
          <Ato ato={ato} indice={indice} />
          <NotaCritica nota={dionisioPagina.notas[indice + 1]} irPara={(alvo) => irPara(alvo, reduzir)} paleta={PALETA_NOTA} painelIntegral />
        </Fragment>
      ))}
      <Conclusao />
      <Colofao
        deus={dionisioPagina}
        paleta={PALETA_NOTA}
        botaoClasse="border-b border-[#D8A061]/60 text-gesso/75 hover:text-gesso"
        onVoltarTopo={() => irPara(dionisioPagina.hero.id, reduzir)}
        passagem={{
          kicker: "A HISTÓRIA CONTINUA · VOLTA AO CENTRO",
          frase: "Dionísio desfaz as fronteiras. O Panteão reúne os tronos que ele atravessa.",
          label: "VER O PANTEÃO →",
          to: "/",
          topo: `#${dionisioPagina.hero.id}`,
        }}
      />
    </main>
  );
}
