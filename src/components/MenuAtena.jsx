import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { atena, pantheon } from "../data/gods";

const { gold: GOLD, goldBright: BRIGHT, goldDeep: DEEP } = atena;
const EASE = [0.2, 0.7, 0.2, 1];

const BOTAO_BASE =
  "at-btn inline-flex min-h-12 items-center justify-center gap-2 px-6 font-ui text-[0.62rem] tracking-[0.3em]";

// Menu da Atena — três zonas em vez de duas.
//
//   esquerda:      CENAS + APARATO CRÍTICO
//   direita/topo:  a GRAVURA da cena sob o cursor
//   direita/base:  OS DOZE TRONOS
//
// A prévia existe por dois motivos. O primeiro é que a versão anterior era uma
// lista de texto num site inteiramente visual, e deixava a metade inferior
// direita vazia. O segundo é que ela não custa nada: as artes já estão no
// catálogo e no cache do navegador. Passar por uma nota mostra a arte da cena a
// que ela pertence — a nota não tem imagem própria, e é isso que ela comenta.

function useTravaDeFoco(aberto, painel, onFechar) {
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onFechar();
        return;
      }
      if (e.key !== "Tab") return;
      const foco = painel.current?.querySelectorAll("a[href], button:not([disabled])");
      if (!foco?.length) return;
      const primeiro = foco[0];
      const ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    painel.current?.querySelector("button, a[href]")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [aberto, painel, onFechar]);
}

export default function MenuAtena({ aberto, onFechar, cenas, notas, cenaAtiva, irPara }) {
  const painel = useRef(null);
  const reduce = useReducedMotion();
  const [focado, setFocado] = useState(null); // id da cena em hover/foco
  useTravaDeFoco(aberto, painel, onFechar);

  // A prévia é exclusiva do desktop, e `hidden lg:block` não bastaria: o <img>
  // continuaria no DOM e o celular baixaria uma gravura em tamanho cheio para
  // nunca mostrá-la. Aqui ela simplesmente não é renderizada.
  const [ehDesktop, setEhDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const aplicar = () => setEhDesktop(mq.matches);
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);

  // Mapa id-da-cena → arte, para a prévia resolver tanto cena quanto nota.
  const porId = useMemo(() => Object.fromEntries(cenas.map((c) => [c.id, c])), [cenas]);
  const previa = porId[focado] ?? cenas[cenaAtiva] ?? cenas[0];

  // Entrada escalonada: o menu era a única coisa da página que aparecia de uma
  // vez só, destoando de todo o resto, que é coreografado.
  const surge = (i) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.15 : 0.5, delay: reduce ? 0 : 0.05 + i * 0.05, ease: EASE },
  });

  const aoFocar = (id) => ({
    onMouseEnter: () => setFocado(id),
    onFocus: () => setFocado(id),
    onMouseLeave: () => setFocado(null),
    onBlur: () => setFocado(null),
  });

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.35, ease: EASE }}
          className="fixed inset-0 z-[80] overflow-y-auto bg-[#060605]/97 backdrop-blur-sm"
        >
          <div
            ref={painel}
            className="mx-auto flex min-h-full max-w-6xl flex-col px-6 py-6 md:px-12 md:py-10"
          >
            <motion.div {...surge(0)} className="flex items-center justify-between">
              <span className="font-ui text-[0.68rem] tracking-[0.32em]" style={{ color: GOLD }}>
                OLIMPO <span className="text-gesso/45">/ ATENA</span>
              </span>
              <button type="button" onClick={onFechar} className={BOTAO_BASE}>
                FECHAR ✕
              </button>
            </motion.div>

            <div className="mt-10 grid flex-1 gap-10 md:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
              {/* ── esquerda: cenas + aparato ── */}
              <div className="space-y-10">
                <motion.nav {...surge(1)} aria-label="Cenas da Atena">
                  <h2 className="font-ui text-[0.6rem] tracking-[0.34em] text-gesso/40">CENAS</h2>
                  <ol className="mt-5 space-y-1">
                    {cenas.map((c, i) => {
                      const atual = i === cenaAtiva;
                      return (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => {
                              onFechar();
                              irPara(c.id);
                            }}
                            {...aoFocar(c.id)}
                            aria-current={atual ? "true" : undefined}
                            className="flex min-h-12 w-full items-baseline gap-4 text-left transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-4"
                            style={{
                              color: atual || focado === c.id ? BRIGHT : undefined,
                              outlineColor: BRIGHT,
                            }}
                          >
                            <span
                              className="font-ui text-[0.6rem] tracking-[0.26em]"
                              style={{ color: atual ? BRIGHT : GOLD }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`font-body text-lg leading-tight md:text-xl ${
                                atual || focado === c.id ? "" : "text-gesso/70"
                              }`}
                            >
                              {c.kind === "hero"
                                ? "Hero da Atena"
                                : c.kind === "manifesto"
                                  ? "Manifesto"
                                  : c.titulo}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                </motion.nav>

                {/* O aparato precisa ser descoberto: uma camada de conhecimento
                    que só existe para quem rola devagar não existe. */}
                <motion.nav {...surge(2)} aria-label="Aparato crítico">
                  <h2 className="font-ui text-[0.6rem] tracking-[0.34em] text-gesso/40">
                    APARATO CRÍTICO <span className="text-gesso/25">· {notas.length} NOTAS</span>
                  </h2>
                  <ol className="mt-5 space-y-1">
                    {notas.map((n) => (
                      <li key={n.id}>
                        <button
                          type="button"
                          onClick={() => {
                            onFechar();
                            irPara(n.id);
                          }}
                          {...aoFocar(n.apos)}
                          className="flex min-h-11 w-full items-baseline gap-4 text-left transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-4"
                          style={{ outlineColor: BRIGHT }}
                        >
                          <span
                            className="font-ui text-[0.6rem] tracking-[0.26em]"
                            style={{ color: GOLD }}
                          >
                            {n.numeral}
                          </span>
                          <span
                            className={`font-body text-base leading-tight md:text-lg ${
                              focado === n.apos ? "text-gesso" : "text-gesso/60"
                            }`}
                          >
                            {n.titulo}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </motion.nav>
              </div>

              {/* ── direita: prévia + tronos ── */}
              <div className="space-y-10">
                {ehDesktop && (
                <motion.figure {...surge(1)} aria-hidden>
                  <div
                    className="relative aspect-[16/9] w-full overflow-hidden border"
                    style={{ borderColor: `${DEEP}55` }}
                  >
                    {/* Crossfade, não `mode="wait"`: esperar o fade-out terminar
                        antes de entrar somava ~0,9s por troca e fazia o menu
                        parecer travado ao percorrer a lista. */}
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={previa.id}
                        src={previa.art}
                        alt=""
                        initial={{ opacity: 0, scale: 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduce ? 0.1 : 0.3, ease: EASE }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </AnimatePresence>
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 45%, rgba(6,6,5,0.85) 100%)",
                      }}
                    />
                  </div>
                  <figcaption className="mt-3 font-ui text-[0.55rem] tracking-[0.28em] text-gesso/40">
                    {previa.capitulo ? `CAP. ${previa.capitulo} · ` : ""}
                    {previa.titulo}
                  </figcaption>
                </motion.figure>
                )}

                <motion.nav {...surge(2)} aria-label="Os doze tronos">
                  <h2 className="font-ui text-[0.6rem] tracking-[0.34em] text-gesso/40">
                    OS DOZE TRONOS
                  </h2>
                  <ol className="mt-5 grid grid-cols-2 gap-x-6">
                    {pantheon.map((g) => {
                      const atual = g.code === "at";
                      const rota = ROTAS[g.code];
                      const rotulo = (
                        <span className="font-ui text-[0.62rem] tracking-[0.26em]">
                          {g.nameLat.toUpperCase()}
                        </span>
                      );
                      return (
                        <li key={g.code} className="flex">
                          {rota && !atual ? (
                            <Link
                              to={rota}
                              onClick={onFechar}
                              className="flex min-h-12 w-full items-center text-gesso/55 transition-colors duration-200 hover:text-[color:var(--at-bright)] focus-visible:outline-1 focus-visible:outline-offset-4"
                              style={{ "--at-bright": BRIGHT, outlineColor: BRIGHT }}
                            >
                              {rotulo}
                            </Link>
                          ) : (
                            <span
                              aria-current={atual ? "page" : undefined}
                              className={`flex min-h-12 w-full items-center ${atual ? "" : "text-gesso/25"}`}
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
                </motion.nav>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Tronos que já têm página própria — os demais entram como item inerte.
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
