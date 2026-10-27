import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "motion/react";
import { bibliografia } from "../data/gods";

const EASE = [0.2, 0.7, 0.2, 1];

// Colofão — o fecho da página, no registro do aparato e não no de rodapé de
// site. A página inteira cita fonte por afirmação; o fecho natural disso é a
// bibliografia reunida. As notas citam no lugar, aqui se consolida.
//
// A lista NÃO é digitada: vem de `bibliografia(deus)`, derivada das próprias
// notas. Rodapé errado, numa página que se sustenta em citação, é pior que
// rodapé ausente.
//
// A declaração de como as imagens foram feitas é deliberada, e é a mesma ética
// das notas aplicada à própria página: o que é construído se declara.

export default function Colofao({ deus, paleta, passagem, botaoClasse = "at-btn", onVoltarTopo }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.2, once: true });
  const obras = bibliografia(deus);
  const { creditos, nota } = deus.colofao;
  const { accent, borda, fundo } = paleta;

  const surge = (atraso) => ({
    initial: { opacity: 0, y: 14 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : atraso, ease: EASE },
  });

  return (
    <footer
      ref={ref}
      aria-label="Colofão e fontes"
      className="relative px-6 pb-16 pt-20 md:px-12 md:pb-20 md:pt-28 lg:px-16"
      style={{ background: fundo }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${borda}, transparent)` }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Passagem para o próximo trono: o fecho do arco, não um botão solto. */}
        <motion.div
          {...surge(0)}
          className="flex flex-col gap-6 border-b pb-14 md:flex-row md:items-end md:justify-between"
          style={{ borderColor: `${borda}88` }}
        >
          <div>
            <div className="font-ui text-[0.55rem] tracking-[0.34em] text-gesso/30">
              {passagem.kicker}
            </div>
            <p className="mt-4 max-w-md font-body text-xl italic leading-snug text-gesso/70 md:text-2xl">
              {passagem.frase}
            </p>
          </div>
          <Link
            to={passagem.to}
            className={`${botaoClasse} inline-flex min-h-12 shrink-0 items-center justify-center gap-3 px-7 font-ui text-[0.62rem] tracking-[0.3em]`}
          >
            {passagem.label}
          </Link>
        </motion.div>

        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <motion.section {...surge(0.08)} aria-labelledby="colofao-fontes">
            <h2 id="colofao-fontes" className="font-ui text-[0.55rem] tracking-[0.34em] text-gesso/35">
              FONTES
            </h2>
            <ul className="mt-6 space-y-3">
              {obras.map((o) => (
                <li key={`${o.autor}|${o.obra}`} className="font-body text-base leading-snug text-gesso/60">
                  <span style={{ color: accent }}>{o.autor}</span>
                  <span className="text-gesso/25"> · </span>
                  <span className="italic">{o.obra}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-gesso/40">
              As localizações exatas (livro, canto e verso) acompanham cada afirmação no aparato
              crítico.
            </p>
          </motion.section>

          <motion.section {...surge(0.14)} aria-labelledby="colofao-creditos">
            <h2 id="colofao-creditos" className="font-ui text-[0.55rem] tracking-[0.34em] text-gesso/35">
              COLOFÃO
            </h2>
            <dl className="mt-6 space-y-4">
              {creditos.map((c) => (
                <div key={c.papel}>
                  <dt className="font-ui text-[0.55rem] tracking-[0.28em] text-gesso/30">
                    {c.papel.toUpperCase()}
                  </dt>
                  <dd className="mt-1 font-body text-base leading-snug text-gesso/65">{c.valor}</dd>
                </div>
              ))}
            </dl>
            <p
              className="mt-8 max-w-sm border-l py-1 pl-5 font-body text-sm leading-relaxed text-gesso/45"
              style={{ borderColor: `${borda}aa` }}
            >
              {nota}
            </p>
          </motion.section>
        </div>

        <motion.div
          {...surge(0.2)}
          className="mt-16 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: `${borda}66` }}
        >
          {/* Alvo de 48px sem caixa visível: os dois são links de navegação
              soltos no rodapé (não remissões dentro de frase, que o WCAG 2.5.8
              dispensa), e sem isto ficavam com 15px e 13px de altura. O
              inline-flex não desenha borda nem fundo, então o registro de
              impresso do colofão continua intacto. */}
          <Link
            to="/"
            className="-my-2 inline-flex min-h-12 items-center font-ui text-[0.62rem] tracking-[0.32em] transition-colors duration-200"
            style={{ color: accent }}
          >
            OLIMPO <span className="ml-[0.5em] text-gesso/35">/ O PANTEÃO</span>
          </Link>
          {onVoltarTopo ? (
            <button
              type="button"
              onClick={onVoltarTopo}
              className="-my-2 inline-flex min-h-12 items-center font-ui text-[0.55rem] tracking-[0.3em] text-gesso/35 transition-colors duration-200 hover:text-gesso/70"
            >
              ↑ VOLTAR AO INÍCIO
            </button>
          ) : (
            <a
              href={passagem.topo}
              className="-my-2 inline-flex min-h-12 items-center font-ui text-[0.55rem] tracking-[0.3em] text-gesso/35 transition-colors duration-200 hover:text-gesso/70"
            >
              ↑ VOLTAR AO INÍCIO
            </a>
          )}
        </motion.div>
      </div>
    </footer>
  );
}
