import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { poseidonPagina, pantheon } from "../data/gods";
import DustCanvas from "./DustCanvas";
import NotaCritica from "./NotaCritica";
import Colofao from "./Colofao";

// Página do Poseidon — as 7 cenas aprovadas no Canva
// ("Olimpo — Poseidon Handoff Definitivo 01–07", DAHQhUC2TAw).
// Contrato de cada handoff:
//   ui-over-art: true · scroll-driven: true · safe-area: 48px
//   do-not-regenerate-art: true · preserve-composition: true · preserve-main-characters: true
//
// Identidade de movimento: a Atena é ordem e geometria — push-ins estáveis, linhas
// retas. O Poseidon é o oposto: nada aqui fica parado. Toda arte carrega um SWELL
// contínuo (respiração vertical lenta, como maré) por baixo do transform dirigido
// pelo scroll, e o preto do véu é frio/azulado no lugar do preto quente da Atena.
// Não é a página da Atena pintada de azul.

const {
  gold: GOLD,
  goldBright: BRIGHT,
  goldDeep: DEEP,
  mar: MAR,
  espuma: ESPUMA,
  preto: PRETO,
} = poseidonPagina;

// Tronos que já têm página própria — os demais entram como item inerte no menu.
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

// A timeline do Canva é descrita em segundos (0.0–0.8s, 0.8–1.8s, …). Numa página
// dirigida por scroll, esperar 3.8s pelo texto seria ilegível: comprimimos a escala
// preservando a ORDEM e as proporções de cada etapa aprovada. Mesma escala da
// página da Atena, para as duas terem o mesmo ritmo de leitura.
const ESCALA = 0.4;
const t = (segundos) => +(segundos * ESCALA).toFixed(2);

const EASE = [0.2, 0.7, 0.2, 1];

// Paleta do aparato crítico. O dourado da UI é contrato de navegação e fica nos
// botões; a identidade do Poseidon é a espuma sobre o preto frio, e é ela que
// governa numeral, lede, termo grego e bibliografia. Não é a nota da Atena
// pintada de verde: o fundo também muda de temperatura.
const PALETA_NOTA = { accent: ESPUMA, borda: `${MAR}`, fundo: "#060A0C" };

// Véus de legibilidade. Cada cena declara de que lado a copy está (lido na tela
// definitiva do Canva) e o véu nasce do lado oposto ao dos personagens — é o que
// permite "não cortar rostos, tridente e símbolos narrativos".
const VEUS = {
  left: `linear-gradient(90deg, rgba(${PRETO},0.92) 0%, rgba(${PRETO},0.62) 18%, rgba(${PRETO},0.26) 38%, rgba(${PRETO},0.04) 58%, rgba(${PRETO},0) 72%)`,
  // Sobe até ~60% da altura porque o kicker das cenas 04 e 06 cai sobre céu ocre
  // claro. Os personagens dessas duas cenas ficam todos ACIMA dessa faixa
  // (Laomedonte, Poseidon, Apolo, o monstro e a oliveira), então o reforço
  // compra legibilidade sem escurecer ninguém.
  bottom: `linear-gradient(0deg, rgba(${PRETO},0.94) 0%, rgba(${PRETO},0.76) 20%, rgba(${PRETO},0.42) 40%, rgba(${PRETO},0.18) 60%, rgba(${PRETO},0.04) 76%, rgba(${PRETO},0) 88%)`,
  // Alcança mais longe que os outros dois: na Cena 03 a copy desce até ~55% da
  // altura, justamente sobre o mar claro, e o parágrafo perdia contraste.
  "top-left": `linear-gradient(160deg, rgba(${PRETO},0.92) 0%, rgba(${PRETO},0.72) 22%, rgba(${PRETO},0.44) 42%, rgba(${PRETO},0.16) 60%, rgba(${PRETO},0) 76%)`,
};

/* ─────────────────────────── navegação ─────────────────────────── */

function useIrPara(reduce) {
  return useCallback(
    (alvo) => {
      const id = String(alvo).replace(/^#/, "");
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      // O foco acompanha o scroll: quem navega por teclado continua no lugar certo.
      el.focus({ preventScroll: true });
    },
    [reduce],
  );
}

// Qual cena ocupa a tela agora — alimenta o aria-current do índice e do menu.
// Recebe os ids reais (poseidon-scene-0N) em vez de montá-los por convenção.
// Devolve também `algumaVisivel`: com as notas e o colofão intercalados há telas
// em que NENHUMA cena está visível, e sem esse sinal o rail dos doze tronos
// reaparece por cima do aparato. `ativa` continua grudento de propósito — é ele
// que marca a cena atual no menu.
function useCenaAtiva(ids) {
  const [ativa, setAtiva] = useState(0);
  const [algumaVisivel, setAlgumaVisivel] = useState(true);
  const chave = ids.join("|");

  useEffect(() => {
    const lista = chave.split("|");
    const secoes = lista.map((id) => document.getElementById(id)).filter(Boolean);
    if (!secoes.length) return;

    const visiveis = new Map();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visiveis.set(e.target.id, e.intersectionRatio);
        let melhorId = null;
        let melhorRatio = 0;
        for (const [id, ratio] of visiveis) {
          if (ratio > melhorRatio) {
            melhorRatio = ratio;
            melhorId = id;
          }
        }
        if (melhorId) setAtiva(Math.max(0, lista.indexOf(melhorId)));
        setAlgumaVisivel(melhorRatio > 0);
      },
      { threshold: [0, 0.15, 0.35, 0.55, 0.75] },
    );

    secoes.forEach((s) => obs.observe(s));
    return () => {
      obs.disconnect();
      visiveis.clear();
    };
  }, [chave]);

  return { ativa, algumaVisivel };
}

/* ─────────────────────────── botões ─────────────────────────── */

// Alvo mínimo de 48px, hover dourado luminoso, transição de 200ms e foco visível —
// exigências da seção COMPONENTES / ESTADOS do handoff. As cores vivem em `.po-btn`
// (src/index.css) para que :hover e :focus-visible funcionem de verdade.
const BOTAO_BASE =
  "po-btn inline-flex min-h-12 items-center justify-center gap-2 px-6 font-ui text-[0.62rem] tracking-[0.3em]";

function BotaoCena({ children, onClick, ariaLabel, className = "" }) {
  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className={`${BOTAO_BASE} ${className}`}>
      {children}
    </button>
  );
}

// ← VOLTAR / PRÓXIMA CENA → : barra inferior de cada cena.
function NavCena({ cenas, index, irPara }) {
  const anterior = index > 0 ? cenas[index - 1] : null;
  const proxima = index < cenas.length - 1 ? cenas[index + 1] : null;

  return (
    <nav
      aria-label={`Navegação da cena ${index + 1} de ${cenas.length}`}
      className="relative z-20 flex items-center justify-between gap-4 px-6 pb-8 md:px-12 md:pb-12 lg:px-16"
    >
      {anterior ? (
        <BotaoCena onClick={() => irPara(anterior.id)} ariaLabel={`Voltar para a cena ${index}: ${anterior.titulo}`}>
          ← VOLTAR
        </BotaoCena>
      ) : (
        // Cena 01 não tem anterior: o slot fica vazio em vez de virar controle
        // morto, e o espaçador preserva o alinhamento da barra.
        <span aria-hidden className="min-h-12" />
      )}

      {proxima ? (
        <BotaoCena onClick={() => irPara(proxima.id)} ariaLabel={`Ir para a cena ${index + 2}: ${proxima.titulo}`}>
          PRÓXIMA CENA →
        </BotaoCena>
      ) : (
        // Epílogo: o handoff da Cena 07 pede "texto e CTA para o próximo deus
        // abaixo". Mantido o destino que o arco anterior do Poseidon já usava.
        <Link to="/hefesto" className={BOTAO_BASE}>
          TRONO X · HEFESTO →
        </Link>
      )}
    </nav>
  );
}

/* ─────────────────────────── chrome ─────────────────────────── */

function Cabecalho({ onAbrirMenu, menuNoTopo, aberto }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-start justify-between px-6 py-5 md:px-12 md:py-6 lg:px-16">
      <Link
        to="/"
        className="pointer-events-auto -my-2 flex min-h-12 items-center gap-[0.5em] font-ui text-[0.68rem] tracking-[0.32em] transition-colors duration-200 hover:text-[color:var(--po-bright)]"
        style={{ color: GOLD, "--po-bright": BRIGHT }}
      >
        OLIMPO <span className="text-gesso/45">/ POSEIDON</span>
      </Link>

      <button
        type="button"
        onClick={onAbrirMenu}
        aria-haspopup="dialog"
        aria-expanded={aberto}
        aria-controls="po-menu"
        className={`pointer-events-auto ${BOTAO_BASE} ${menuNoTopo ? "" : "lg:hidden"}`}
      >
        {/* Ícone de três linhas + o texto MENU, como na tela definitiva. */}
        <span aria-hidden className="flex flex-col gap-[3px]">
          <span className="block h-px w-4 bg-current" />
          <span className="block h-px w-4 bg-current" />
          <span className="block h-px w-4 bg-current" />
        </span>
        MENU
      </button>
    </header>
  );
}

// Índice vertical dos doze tronos, como na tela definitiva das duas primeiras
// cenas do Canva. Fica à direita e some a partir da Cena 03, quando o ☰ MENU
// assume sozinho o canto superior direito.
function IndiceTronos({ visivel }) {
  return (
    <aside
      aria-hidden={!visivel}
      aria-label="Os doze tronos"
      className={`pointer-events-none fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 ease-out lg:block xl:right-12 ${
        visivel ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-right font-ui text-[0.6rem] tracking-[0.34em]" style={{ color: GOLD }}>
        03 <span className="text-gesso/35">/ 12</span>
      </div>
      <div className="ml-auto mt-3 h-px w-10" style={{ background: DEEP }} />
      <ol className="mt-2 text-right">
        {pantheon.map((g) => {
          const atual = g.code === "po";
          const rota = ROTAS[g.code];
          const rotulo = (
            <span className="font-ui text-[0.6rem] tracking-[0.26em]">{g.nameLat.toUpperCase()}</span>
          );
          return (
            <li key={g.code} className="po-rail-item flex-row-reverse gap-2">
              <span
                aria-hidden
                className="inline-block h-1 w-1 shrink-0 rounded-full transition-colors duration-200"
                style={{ background: atual ? BRIGHT : "rgba(232,220,196,0.22)" }}
              />
              {rota && !atual ? (
                <Link
                  to={rota}
                  className={`po-rail-item text-gesso/45 transition-colors duration-200 hover:text-[color:var(--po-bright)] focus-visible:outline-1 focus-visible:outline-offset-4 ${
                    visivel ? "pointer-events-auto" : ""
                  }`}
                  style={{ "--po-bright": BRIGHT, outlineColor: BRIGHT }}
                  // Escondido não recebe Tab: o foco não some atrás de um item invisível.
                  tabIndex={visivel ? undefined : -1}
                >
                  {rotulo}
                </Link>
              ) : (
                <span
                  aria-current={atual ? "page" : undefined}
                  style={atual ? { color: BRIGHT } : undefined}
                  className={`po-rail-item ${atual ? "" : "text-gesso/25"}`}
                >
                  {rotulo}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

/* ─────────────────────────── menu overlay ─────────────────────────── */

function MenuOverlay({ aberto, onFechar, cenas, cenaAtiva, irPara }) {
  const painel = useRef(null);

  // Bloqueia o scroll do fundo e devolve exatamente como estava ao fechar.
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [aberto]);

  // ESC fecha; Tab circula dentro do painel (o foco não escapa para o fundo).
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
  }, [aberto, onFechar]);

  if (!aberto) return null;

  return (
    <div
      id="po-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      // Clique fora da área principal fecha, como pede o handoff.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onFechar();
      }}
      className="fixed inset-0 z-[80] overflow-y-auto backdrop-blur-sm"
      style={{ background: `rgba(${PRETO},0.97)` }}
    >
      <div
        ref={painel}
        onMouseDown={(e) => e.stopPropagation()}
        className="mx-auto flex min-h-full max-w-5xl flex-col px-6 py-6 md:px-12 md:py-10"
      >
        <div className="flex items-center justify-between">
          <span className="font-ui text-[0.68rem] tracking-[0.32em]" style={{ color: GOLD }}>
            OLIMPO <span className="text-gesso/45">/ POSEIDON</span>
          </span>
          <button type="button" onClick={onFechar} className={BOTAO_BASE}>
            FECHAR ✕
          </button>
        </div>

        <div className="mt-10 grid flex-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-16">
          <nav aria-label="Cenas do Poseidon">
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
                      aria-current={atual ? "true" : undefined}
                      className="flex min-h-12 w-full items-baseline gap-4 text-left transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-4"
                      style={{ color: atual ? BRIGHT : undefined, outlineColor: BRIGHT }}
                    >
                      <span
                        className="font-ui text-[0.6rem] tracking-[0.26em]"
                        style={{ color: atual ? BRIGHT : GOLD }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-body text-lg leading-tight md:text-xl ${atual ? "" : "text-gesso/70"}`}>
                        {c.kind === "hero" ? "Hero do Poseidon" : c.titulo}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <nav aria-label="Os doze tronos">
            <h2 className="font-ui text-[0.6rem] tracking-[0.34em] text-gesso/40">OS DOZE TRONOS</h2>
            <ol className="mt-5 grid grid-cols-2 gap-x-6">
              {pantheon.map((g) => {
                const atual = g.code === "po";
                const rota = ROTAS[g.code];
                const rotulo = (
                  <span className="font-ui text-[0.62rem] tracking-[0.26em]">{g.nameLat.toUpperCase()}</span>
                );
                return (
                  <li key={g.code} className="flex">
                    {rota && !atual ? (
                      <Link
                        to={rota}
                        onClick={onFechar}
                        className="flex min-h-12 w-full items-center text-gesso/55 transition-colors duration-200 hover:text-[color:var(--po-bright)] focus-visible:outline-1 focus-visible:outline-offset-4"
                        style={{ "--po-bright": BRIGHT, outlineColor: BRIGHT }}
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
          </nav>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── atmosfera por cena ─────────────────────────── */

// Camadas atmosféricas. Só montam quando a cena está na viewport e o usuário não
// pediu menos movimento — nada fica animando fora de tela. As coordenadas são
// percentuais calibrados sobre a composição real de cada base limpa, e cada cena
// usa um conjunto próprio de efeitos.
function CenaFX({ id }) {
  const luz = (estilo) => (
    <div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-screen" style={estilo} />
  );

  switch (id) {
    // 1.8–2.8 ondas e névoa ganham movimento · 2.8–3.6 reflexo percorre o tridente
    case "poseidon-scene-01":
      return (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%]"
            style={{
              background: "linear-gradient(0deg, rgba(62,143,116,0.2) 0%, transparent 76%)",
              filter: "blur(30px)",
              animation: "po-tide 19s ease-in-out infinite alternate",
            }}
          />
          {/* O reflexo sobe pelo tridente erguido, à direita do quadro. A máscara
              prende o brilho à haste e evita qualquer borda de container visível. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage: "radial-gradient(7% 26% at 78% 30%, #000 8%, transparent 76%)",
              WebkitMaskImage: "radial-gradient(7% 26% at 78% 30%, #000 8%, transparent 76%)",
            }}
          >
            <div
              className="absolute inset-x-0 h-[30%] mix-blend-screen"
              style={{
                background: "linear-gradient(0deg, transparent, rgba(236,246,255,0.6), transparent)",
                filter: "blur(7px)",
                animation: "po-glint 9s ease-in-out infinite",
              }}
            />
          </div>
          <DustCanvas count={16} color="176,206,198" />
        </>
      );

    // 0.8–1.8 parallax entre os três tronos · 1.8–2.8 o mar avança na base do trono
    // central · 2.8–3.6 constelações e poeira cósmica respiram
    case "poseidon-scene-02":
      return (
        <>
          {luz({
            background: "radial-gradient(42% 30% at 50% 12%, rgba(206,220,236,0.2) 0%, transparent 74%)",
            animation: "po-constelacao 15s ease-in-out infinite",
          })}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[26%] bottom-0 h-[26%] mix-blend-screen"
            style={{
              background: "radial-gradient(60% 70% at 50% 100%, rgba(62,143,116,0.34) 0%, transparent 74%)",
              animation: "po-tide 13s ease-in-out infinite alternate",
            }}
          />
          <DustCanvas count={22} color="200,214,230" />
        </>
      );

    // 0.8–1.8 Poseidon finca o tridente · 1.8–2.8 ondas à esquerda, rachaduras à
    // direita · 2.8–3.6 cavalos · 3.6+ luz do impacto pulsa de forma contida
    case "poseidon-scene-03":
      return (
        <>
          {/* Luz do impacto, presa ao ponto onde o tridente entra no chão. */}
          {luz({
            background: "radial-gradient(16% 26% at 50% 66%, rgba(255,236,186,0.5) 0%, transparent 74%)",
            animation: "po-impacto-luz 6.5s ease-in-out infinite",
          })}
          {/* Mar à esquerda e terra rachada à direita têm ritmos diferentes: é a
              cena que separa os dois domínios. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[36%] mix-blend-screen"
            style={{
              background: "radial-gradient(70% 60% at 22% 52%, rgba(62,143,116,0.24) 0%, transparent 76%)",
              animation: "po-swellfx 12s ease-in-out infinite alternate",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-[52%] right-0 w-[42%]"
            style={{
              background:
                "repeating-linear-gradient(74deg, transparent 0 34px, rgba(255,226,160,0.09) 35px, transparent 36px 70px)",
              animation: "po-fenda 17s ease-in-out infinite alternate",
            }}
          />
        </>
      );

    // 0.8–1.8 tridente atinge a rocha e a água salgada jorra · 1.8–2.8 oliveira
    // cresce · 2.8–3.6 luz quente permanece no lado de Atena
    case "poseidon-scene-04":
      return (
        <>
          {/* Jato salgado no lado do Poseidon (esquerda). */}
          {luz({
            background: "radial-gradient(9% 20% at 22% 62%, rgba(226,244,255,0.6) 0%, transparent 72%)",
            animation: "po-jato 8s ease-out infinite",
          })}
          {/* Luz quente do lado da Atena (direita) — permanece, como pede a timeline. */}
          {luz({
            background: "radial-gradient(22% 34% at 78% 44%, rgba(255,214,138,0.3) 0%, transparent 74%)",
            animation: "po-quente 14s ease-in-out infinite",
          })}
          {/* A oliveira, ao centro, apenas respira — folhas em movimento, sem deformar. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-[18%] left-[40%] w-[22%] mix-blend-screen"
            style={{
              background: "radial-gradient(50% 40% at 50% 42%, rgba(214,224,190,0.16) 0%, transparent 72%)",
              animation: "po-folhas 11s ease-in-out infinite alternate",
            }}
          />
        </>
      );

    // 0.8–1.8 Polifemo · 1.8–2.8 navio e vela · 2.8–3.8 onda cresce sem quebrar
    // 3.8+ espuma revela brevemente o tridente
    case "poseidon-scene-05":
      return (
        <>
          {/* Relâmpago da tempestade: curto, espaçado, nunca estroboscópico. */}
          {luz({
            background: "radial-gradient(56% 40% at 62% 12%, rgba(226,238,255,0.34) 0%, transparent 72%)",
            animation: "po-relampago 13s ease-out infinite",
          })}
          {/* A onda colossal, à direita, cresce e recua sem nunca quebrar. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-[44%] mix-blend-screen"
            style={{
              background: "radial-gradient(64% 66% at 74% 52%, rgba(62,143,116,0.26) 0%, transparent 76%)",
              animation: "po-onda 15s ease-in-out infinite alternate",
            }}
          />
          {/* Espuma revelando o tridente por um instante, ao pé da onda. */}
          {luz({
            background: "radial-gradient(8% 14% at 71% 74%, rgba(236,248,255,0.42) 0%, transparent 72%)",
            animation: "po-espuma 11s ease-in-out infinite",
          })}
        </>
      );

    // 0.8–1.8 Poseidon aponta, Apolo observa · 1.8–2.8 água cresce diante das
    // muralhas · 2.8–3.8 monstro emerge · 3.8+ relâmpagos sem encobrir personagens
    case "poseidon-scene-06":
      return (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[18%] bottom-0 h-[40%] mix-blend-screen"
            style={{
              background: "radial-gradient(60% 80% at 50% 100%, rgba(62,143,116,0.3) 0%, transparent 74%)",
              animation: "po-muralha 14s ease-in-out infinite alternate",
            }}
          />
          {/* O monstro à direita avança — luz que sobe da água, não deformação. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-[34%] right-0 w-[32%] mix-blend-screen"
            style={{
              background: "radial-gradient(56% 60% at 72% 56%, rgba(120,168,150,0.28) 0%, transparent 74%)",
              animation: "po-monstro 16s ease-in-out infinite alternate",
            }}
          />
          {/* Relâmpago mantido fraco e alto no quadro: os quatro protagonistas
              ficam abaixo dele e não podem ser encobertos. */}
          {luz({
            background: "radial-gradient(50% 24% at 44% 8%, rgba(226,238,255,0.26) 0%, transparent 72%)",
            animation: "po-relampago 17s ease-out infinite",
          })}
        </>
      );

    // 1.8–2.8 pequenas ondas nos degraus · 2.8–3.8 musgo, névoa e feixes respiram
    // 3.8+ tridente recebe um reflexo curto; a cena permanece silenciosa
    case "poseidon-scene-07":
      return (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] mix-blend-screen"
            style={{
              background: "radial-gradient(70% 80% at 50% 100%, rgba(198,216,210,0.22) 0%, transparent 76%)",
              animation: "po-tide 21s ease-in-out infinite alternate",
            }}
          />
          {/* Feixes de luz atravessando a tempestade — o efeito mais lento da página. */}
          {luz({
            background:
              "linear-gradient(196deg, transparent 30%, rgba(214,226,236,0.14) 44%, transparent 52%, rgba(214,226,236,0.1) 62%, transparent 72%)",
            animation: "po-feixes 28s ease-in-out infinite alternate",
          })}
          {/* Reflexo curto no tridente, à direita do trono. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage: "radial-gradient(6% 20% at 63% 26%, #000 8%, transparent 74%)",
              WebkitMaskImage: "radial-gradient(6% 20% at 63% 26%, #000 8%, transparent 74%)",
            }}
          >
            <div
              className="absolute inset-x-0 h-[26%] mix-blend-screen"
              style={{
                background: "linear-gradient(0deg, transparent, rgba(236,246,255,0.5), transparent)",
                filter: "blur(7px)",
                animation: "po-glint 16s ease-in-out infinite",
              }}
            />
          </div>
          <DustCanvas count={14} color="198,216,210" />
        </>
      );

    default:
      return null;
  }
}

/* ─────────────────────────── arte ─────────────────────────── */

// A base limpa da cena.
// · abaixo de lg (inclui o tablet em retrato, 768–1023px): faixa recortada no topo
//   com a copy abaixo. A arte é 16:9 e, esticada num viewport vertical, perderia
//   ~29% de cada lado — o recorte é planejado por cena via object-position.
// · lg+: full-bleed atrás do texto, com a composição inteira preservada.
function Arte({ cena, index, progresso, reduce, inView }) {
  // Amplitude baixa (≤10%): a arte é 16:9 e o `cover` já corta um pouco nas
  // laterais. Zoom agressivo perderia rostos, tridentes e os personagens que o
  // contrato manda preservar. Cada cena tem uma direção própria de movimento.
  const perfis = [
    { escala: [1.04, 1.12], x: ["0%", "0%"], y: ["0%", "-1.8%"] }, // 01 push-in lento no trono
    { escala: [1.1, 1.03], x: ["0%", "0%"], y: ["1.4%", "-1.4%"] }, // 02 os três tronos se afastam
    { escala: [1.05, 1.12], x: ["1.4%", "-1.4%"], y: ["0%", "0%"] }, // 03 do mar para a terra rachada
    { escala: [1.11, 1.04], x: ["-1.4%", "1.4%"], y: ["0%", "0%"] }, // 04 de Poseidon para a oliveira
    { escala: [1.04, 1.13], x: ["-1.6%", "1.6%"], y: ["0%", "0%"] }, // 05 o navio empurrado para a onda
    { escala: [1.12, 1.04], x: ["1.2%", "-1.2%"], y: ["-1%", "1%"] }, // 06 recuo diante das muralhas
    { escala: [1.09, 1.02], x: ["0.6%", "-0.6%"], y: ["0%", "0%"] }, // 07 recuo silencioso do epílogo
  ][index];

  const scale = useTransform(progresso, [0, 1], perfis.escala);
  const x = useTransform(progresso, [0, 1], perfis.x);
  const y = useTransform(progresso, [0, 1], perfis.y);
  const estatico = { scale: 1.02, x: "0%", y: "0%" };

  return (
    <div
      className="relative h-[var(--po-art-h)] w-full shrink-0 overflow-hidden md:h-[var(--po-art-h-md)] lg:absolute lg:inset-0 lg:h-full"
      style={{ "--po-art-h": cena.mobileArt, "--po-art-h-md": cena.tabletArt }}
    >
      <motion.div className="absolute inset-0" style={reduce ? estatico : { scale, x, y }}>
        {/* SWELL — a assinatura do Poseidon: uma respiração vertical lenta por
            baixo do transform do scroll, para a arte nunca parecer parada nem
            "colada" na tela. Fica numa camada interna para não brigar com o
            transform dirigido pelo scroll da camada de cima. Período diferente por
            cena, para o movimento nunca sincronizar de uma seção para a outra. */}
        <div
          className="h-full w-full"
          style={
            reduce
              ? undefined
              : { animation: `po-swell ${17 + index * 2}s ease-in-out ${index * 0.7}s infinite alternate` }
          }
        >
          <img
            src={cena.art}
            alt={cena.alt}
            width={1920}
            height={1080}
            decoding="async"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            draggable={false}
            className="h-full w-full object-cover [object-position:var(--po-pos-m)] md:[object-position:var(--po-pos-t)] lg:[object-position:var(--po-pos-d)]"
            style={{
              "--po-pos-m": cena.focus.mobile,
              "--po-pos-t": cena.focus.tablet,
              "--po-pos-d": cena.focus.desktop,
            }}
          />
        </div>
      </motion.div>

      {inView && !reduce && <CenaFX id={cena.id} />}

      {/* Abaixo de lg: a arte se dissolve no bloco de texto logo abaixo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background: `linear-gradient(180deg, rgba(${PRETO},0.42) 0%, rgba(${PRETO},0.04) 30%, rgba(${PRETO},0.84) 86%, var(--color-preto) 100%)`,
        }}
      />
      {/* lg+: véu do lado da copy. Cai rápido de propósito — os personagens que o
          contrato manda preservar ficam justamente sob o texto. A legibilidade é
          completada pelo text-shadow de `.po-copy`. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ background: VEUS[cena.copy.veu] }}
      />
      {/* Topo e rodapé: contraste para o cabeçalho e para a navegação inferior. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background: `linear-gradient(180deg, rgba(${PRETO},0.6) 0%, transparent 18%, transparent 74%, rgba(${PRETO},0.74) 100%)`,
        }}
      />
    </div>
  );
}

/* ─────────────────────────── cenas ─────────────────────────── */

const VERTICAL = {
  start: "lg:justify-start lg:pt-32",
  center: "lg:justify-center lg:pt-24",
  end: "lg:justify-end lg:pb-4",
};

function Cena({ cena, cenas, index, irPara }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const tl = cena.timeline;

  // Entrada encenada: cada bloco aparece na ordem da timeline aprovada.
  const surge = (atraso) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: reduce ? 0.2 : 0.9, delay: reduce ? 0 : atraso, ease: EASE },
  });

  return (
    <section
      id={cena.id}
      ref={ref}
      tabIndex={-1}
      aria-labelledby={`${cena.id}-titulo`}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-preto focus:outline-none"
    >
      <Arte cena={cena} index={index} progresso={scrollYProgress} reduce={reduce} inView={inView} />

      {/* Abaixo de lg empilha (arte → copy → nav) e a seção cresce além de 100svh
          se precisar; em lg+ a copy se posiciona sobre a arte no grid de 12 colunas.
          O padding lateral respeita a área segura de 48px do handoff. */}
      <div
        className={`po-copy relative z-10 flex flex-1 flex-col justify-center px-6 pb-10 pt-10 md:px-12 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:px-16 lg:pb-0 lg:pt-0 ${
          cena.copy.veu === "left" ? "lg:pr-40 xl:pr-48" : ""
        }`}
      >
        <div className={`flex flex-col ${VERTICAL[cena.copy.vertical]} ${cena.copy.cols}`}>
          <Copy cena={cena} surge={surge} tl={tl} centrado={cena.copy.align === "center"} primeira={index === 0} />
        </div>
      </div>

      <NavCena cenas={cenas} index={index} irPara={irPara} />
    </section>
  );
}

// O bloco de texto. O handoff lista exatamente estes quatro campos como
// CONTEÚDO EDITÁVEL — HTML/CSS; o que muda de cena para cena é ONDE ele fica
// (cena.copy) e a hierarquia tipográfica do hero.
function Copy({ cena, surge, tl, centrado, primeira }) {
  const Titulo = primeira ? motion.h1 : motion.h2;

  return (
    <div className={`${primeira ? "max-w-[36rem]" : "max-w-[46rem]"} ${centrado ? "lg:mx-auto lg:text-center" : ""}`}>
      <motion.div
        {...surge(t(tl.foco))}
        className="po-kicker font-ui text-[0.6rem] tracking-[0.42em]"
        style={{ color: BRIGHT }}
      >
        {cena.kicker}
      </motion.div>

      <Titulo
        id={`${cena.id}-titulo`}
        {...surge(t(tl.foco) + 0.12)}
        // 1.1 e não 1.02: capitais acentuadas (ÁRVORE, ENOSÍCTONO) encostavam na
        // linha de cima nos títulos de três linhas.
        className={`mt-5 font-display text-gesso ${primeira ? "font-black leading-[0.92]" : "leading-[1.1]"}`}
        style={
          primeira
            ? // Teto baixo de propósito: a 11vw a palavra POSEIDON atravessava a
              // coluna 6 e caía em cima da estátua. O handoff da Cena 01 é
              // explícito — texto nas colunas 1–5, Poseidon preservado nas 6–12.
              { fontSize: "clamp(2.6rem, 5.8vw, 5.6rem)", letterSpacing: "0.05em" }
            : { fontSize: "clamp(1.9rem, 4.4vw, 3.5rem)" }
        }
      >
        {cena.titulo}
      </Titulo>

      <motion.div
        {...surge(t(tl.agua))}
        className={`mt-6 h-px w-24 ${centrado ? "lg:mx-auto" : ""}`}
        style={{ background: `linear-gradient(90deg, ${ESPUMA}, ${GOLD})` }}
      />

      <motion.p
        {...surge(t(tl.agua) + 0.1)}
        className="mt-6 font-body text-xl italic leading-snug text-gesso/90 md:text-2xl"
      >
        {cena.subtitulo}
      </motion.p>

      <motion.p
        {...surge(t(tl.ui))}
        className={`mt-4 max-w-[42rem] font-body text-lg leading-relaxed text-gesso/75 md:text-xl ${
          centrado ? "lg:mx-auto" : ""
        }`}
      >
        {cena.paragrafo}
      </motion.p>
    </div>
  );
}

/* ─────────────────────────── página ─────────────────────────── */

export default function PoseidonArc() {
  const reduce = useReducedMotion();
  const irPara = useIrPara(reduce);
  const [menuAberto, setMenuAberto] = useState(false);
  const gatilhoMenu = useRef(null);
  const cenas = poseidonPagina.cenas;
  const notas = poseidonPagina.notas;
  const { ativa: cenaAtiva, algumaVisivel } = useCenaAtiva(cenas.map((c) => c.id));

  const abrirMenu = useCallback(() => {
    gatilhoMenu.current = document.activeElement;
    setMenuAberto(true);
  }, []);

  const fecharMenu = useCallback(() => {
    setMenuAberto(false);
    // Devolve o foco para quem abriu o menu.
    gatilhoMenu.current?.focus?.();
  }, []);

  // O índice vertical dos tronos só existe nas duas primeiras cenas (Canva);
  // a partir da Cena 03 o ☰ MENU assume sozinho o canto superior direito.
  // O rail pertence às cenas: sobre uma nota ou sobre o colofão não tem o que
  // marcar, e sumir ali reforça que o leitor saiu do filme e entrou no aparato.
  const railVisivel = cenaAtiva <= 1 && algumaVisivel && !menuAberto;

  return (
    <main id="poseidon" aria-label="A página do Poseidon" className="relative bg-preto">
      <a
        href="#poseidon-scene-01"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-preto focus:px-4 focus:py-3 focus:font-ui focus:text-[0.62rem] focus:tracking-[0.3em]"
        style={{ color: BRIGHT, border: `1px solid ${DEEP}` }}
      >
        IR PARA O CONTEÚDO
      </a>

      <Cabecalho onAbrirMenu={abrirMenu} menuNoTopo={!railVisivel} aberto={menuAberto} />
      <IndiceTronos visivel={railVisivel} />

      {/* Cena → nota → cena. A nav "PRÓXIMA CENA" continua pulando de cena em
          cena e ignora as notas de propósito: quem quer só o filme não é
          obrigado a atravessar o aparato. */}
      {cenas.map((cena, i) => {
        const nota = notas.find((n) => n.apos === cena.id);
        return (
          <Fragment key={cena.id}>
            <Cena cena={cena} cenas={cenas} index={i} irPara={irPara} />
            {nota && <NotaCritica nota={nota} irPara={irPara} paleta={PALETA_NOTA} />}
          </Fragment>
        );
      })}

      <Colofao
        deus={poseidonPagina}
        paleta={PALETA_NOTA}
        botaoClasse="po-btn"
        passagem={{
          kicker: "O TRONO PERMANECE · SEGUE O PRÓXIMO",
          frase: "Poseidon perdeu a cidade para uma árvore. A deusa que a plantou tem a própria história.",
          label: "TRONO V · ATENA →",
          to: "/atena",
          topo: "#poseidon-scene-01",
        }}
      />

      <MenuOverlay
        aberto={menuAberto}
        onFechar={fecharMenu}
        cenas={cenas}
        cenaAtiva={cenaAtiva}
        irPara={irPara}
      />
    </main>
  );
}
