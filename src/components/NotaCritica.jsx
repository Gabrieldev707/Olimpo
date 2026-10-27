import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "motion/react";
import { citar } from "../data/gods";
import PainelVaso from "./PainelVaso";

const EASE = [0.2, 0.7, 0.2, 1];

// Nota crítica — a camada de conhecimento das páginas, em section própria entre
// as cenas. O registro é o de uma EDIÇÃO COMENTADA, deliberadamente diferente
// do registro cinematográfico das cenas: aqui não há arte sangrando, não há
// véu, não há movimento dirigido por scroll. A quebra de ritmo é o ponto — o
// leitor sai do filme e entra no aparato, e sabe disso pelo desenho.
//
// A decisão estrutural é a MARGEM: em ≥lg a página vira três colunas
// (numeral · prosa · marginália) e as fontes saem de dentro do texto para a
// coluna externa, alinhadas ao parágrafo que sustentam. A prosa passa a correr
// sem interrupção e a metade direita, que antes era vazio, ganha função. Abaixo
// de lg não há margem: a fonte volta para baixo do parágrafo.
//
// A `paleta` é injetada porque cada deus tem a sua: a Atena é preto quente +
// dourado, o Poseidon é preto frio + espuma. O componente não conhece nenhum
// dos dois.
//
// Nada aqui é "curiosidade": cada bloco carrega `fonte`, e `ressalva` existe
// para as fontes frágeis, que são declaradas como frágeis em vez de omitidas.

function Fonte({ children, className = "" }) {
  return (
    <p className={`font-ui text-[0.58rem] leading-[1.7] tracking-[0.16em] text-gesso/35 ${className}`}>
      {children}
    </p>
  );
}

// Remissão como referência de texto, não como botão. Um retângulo com borda
// seria o único componente de UI de site na página e derrubaria o registro de
// impresso — aqui ela é um verbete sublinhado, com área de toque de 44px.
function Remissao({ alvo, irPara, cor }) {
  const classe =
    "at-remissao mt-3 inline-flex min-h-11 items-center gap-2 font-ui text-[0.58rem] tracking-[0.24em]";

  // Remissão para OUTRA página (ex.: a mesma disputa contada do lado da Atena)
  // precisa do router — `irPara` só resolve âncoras dentro do documento atual.
  if (alvo.to.startsWith("/")) {
    return (
      <Link to={alvo.to} className={classe} style={{ color: cor }}>
        <span aria-hidden>↗</span> {alvo.label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => irPara(alvo.to)} className={classe} style={{ color: cor }}>
      <span aria-hidden>↗</span> {alvo.label}
    </button>
  );
}

export default function NotaCritica({ nota, irPara, paleta, painelIntegral = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.15, once: true });
  const { accent, borda, fundo } = paleta;

  const surge = (atraso) => ({
    initial: { opacity: 0, y: 14 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: reduce ? 0.2 : 0.7, delay: reduce ? 0 : atraso, ease: EASE },
  });

  // numeral · prosa · marginália
  const GRADE = "lg:grid lg:grid-cols-[3.5rem_minmax(0,40rem)_minmax(0,1fr)] lg:gap-x-10";

  return (
    <section
      id={nota.id}
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${nota.id}-titulo`}
      // Banda, não tela cheia: a nota é uma pausa entre duas cenas, e forçá-la a
      // 100svh dobraria o comprimento da página e mataria o ritmo.
      className="relative px-6 py-20 md:px-12 md:py-28 lg:px-16"
      style={{ background: fundo }}
    >
      {/* Filete de topo que esmaece nas pontas — uma borda sólida de ponta a
          ponta cortaria a página em duas como uma régua. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${borda}, transparent)` }}
      />

      <div className="mx-auto max-w-6xl">
        <div className={GRADE}>
          {/* Margem esquerda: numeral, como o fólio de uma edição. */}
          <motion.div {...surge(0)} className="lg:pt-2 lg:text-right">
            <div className="font-display text-xl leading-none" style={{ color: accent }}>
              {nota.numeral}
            </div>
            <div className="mt-2 font-ui text-[0.5rem] tracking-[0.3em] text-gesso/25">NOTA</div>
          </motion.div>

          <div>
            <motion.h2
              id={`${nota.id}-titulo`}
              {...surge(0.06)}
              className="mt-6 font-display leading-[1.12] text-gesso lg:mt-0"
              style={{ fontSize: "clamp(1.55rem, 3.2vw, 2.35rem)" }}
            >
              {nota.titulo}
            </motion.h2>

            {/* Lede: puxa o olho e separa o sumário da prosa corrida. */}
            <motion.p
              {...surge(0.12)}
              className="mt-5 font-body text-xl italic leading-snug md:text-2xl"
              style={{ color: accent }}
            >
              {nota.resumo}
            </motion.p>
          </div>

          <div aria-hidden />
        </div>

        {/* Prancha: como os próprios gregos representaram a cena. Entra como
            estampa de livro, na largura da coluna de prosa. */}
        {nota.painel && (
          <div className={GRADE}>
            <div aria-hidden />
            <motion.figure {...surge(0.16)} className="mt-10">
              {painelIntegral ? (
                <img
                  src={nota.painel.poster}
                  alt={nota.painel.legenda}
                  className="block h-auto w-full"
                />
              ) : (
                <PainelVaso {...nota.painel} borda={borda} />
              )}
              <figcaption className="mt-3 font-ui text-[0.55rem] leading-relaxed tracking-[0.2em] text-gesso/35">
                {nota.painel.legenda}
              </figcaption>
            </motion.figure>
            <div aria-hidden />
          </div>
        )}

        {/* O termo grego, quando a nota tem um. */}
        {nota.termo && (
          <div className={GRADE}>
            <div aria-hidden />
            <motion.dl {...surge(0.18)} className="mt-10 border-y py-7" style={{ borderColor: `${borda}88` }}>
              <dt className="font-display text-4xl leading-none md:text-5xl" style={{ color: accent }} lang="grc">
                {nota.termo.grego}
              </dt>
              <dd className="mt-3 font-ui text-[0.6rem] tracking-[0.28em] text-gesso/45">
                {nota.termo.translit}
              </dd>
              <dd className="mt-2 font-body text-lg text-gesso/70">{nota.termo.glosa}</dd>
            </motion.dl>
            <div aria-hidden />
          </div>
        )}

        {/* Prosa à esquerda, fonte na margem externa, alinhadas pelo topo do
            parágrafo que sustentam. */}
        {nota.blocos.map((b, i) => (
          <motion.div key={i} {...surge(0.22 + i * 0.05)} className={`${GRADE} mt-8`}>
            <div aria-hidden />
            <div>
              <p className="font-body text-lg leading-relaxed text-gesso/85 md:text-xl">{b.texto}</p>
              {b.fonte && <Fonte className="mt-2 lg:hidden">— {citar(b.fonte)}</Fonte>}
              {b.remissao && <Remissao alvo={b.remissao} irPara={irPara} cor={accent} />}
            </div>
            {b.fonte ? (
              <Fonte className="hidden lg:block lg:pt-2">{citar(b.fonte)}</Fonte>
            ) : (
              <div aria-hidden />
            )}
          </motion.div>
        ))}

        {/* Fonte frágil não é omitida: é marcada. Declarar a fragilidade é o que
            separa pesquisa de chute — e é informação, não ressalva legal. */}
        {nota.ressalva && (
          <div className={GRADE}>
            <div aria-hidden />
            <motion.aside
              {...surge(0.22 + nota.blocos.length * 0.05)}
              className="mt-12 border-l py-1 pl-6"
              style={{ borderColor: borda }}
            >
              <div className="font-ui text-[0.53rem] tracking-[0.3em]" style={{ color: accent }}>
                {nota.ressalva.rotulo ?? "FONTE TARDIA E CONTESTADA"}
              </div>
              <p className="mt-3 font-body text-lg leading-relaxed text-gesso/65">
                {nota.ressalva.texto}
              </p>
              <Fonte className="mt-2 lg:hidden">— {citar(nota.ressalva.fonte)}</Fonte>
            </motion.aside>
            <motion.div
              {...surge(0.24 + nota.blocos.length * 0.05)}
              className="mt-12 hidden lg:block lg:pt-6"
            >
              <Fonte>{citar(nota.ressalva.fonte)}</Fonte>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
