import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { pantheon } from "../data/gods";

// Mapeia o código do deus para a rota da página dele (quando já existe).
const ROUTES = {
  po: "/poseidon",
  hm: "/hermes",
  he: "/hefesto",
  af: "/afrodite",
  ap: "/apolo",
  di: "/dionisio",
  // z: o arco de Zeus já vive na home; os demais ganham rota ao ter página.
};

// O Panteão — dashboard dos 12 tronos. Cada selo é um VASO 1:1; quem já tem
// página é um Link ativo; quem ainda não tem fica em repouso (opacity baixa).
export default function Pantheon() {
  return (
    <section id="panteao" aria-label="O Panteão" className="relative border-t border-gesso/5 bg-preto py-24">
      <div className="mx-auto max-w-6xl px-8">
        <div className="text-center">
          <div className="font-ui text-[0.65rem] tracking-[0.55em] text-bronze">OS DOZE TRONOS</div>
          <h2 className="mt-4 font-display text-3xl text-gesso md:text-5xl">O Panteão</h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg italic text-gesso/60">
            Cada trono guarda uma história de poder que veio torto. Toque num selo para entrar.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {pantheon.map((g, i) => {
            const to = ROUTES[g.code];
            const inner = (
              <>
                <div
                  className="relative aspect-square overflow-hidden border transition-all duration-500 group-hover:-translate-y-1"
                  style={{ borderColor: `${g.accent}44` }}
                >
                  <img
                    src={g.seal}
                    alt={g.nameLat}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-all duration-500 ${
                      to ? "opacity-90 group-hover:opacity-100 group-hover:scale-105" : "opacity-35 grayscale"
                    }`}
                  />
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 0 1px ${g.accent}` }}
                  />
                </div>
                <div className="mt-3 text-center">
                  <div className="font-ui text-[0.5rem] tracking-[0.3em] text-bronze/80">{g.numeral}</div>
                  <div className={`mt-1 font-display text-sm md:text-base ${to ? "text-gesso" : "text-gesso/40"}`}>
                    {g.nameLat}
                  </div>
                </div>
              </>
            );

            return (
              <motion.div
                key={g.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.6 }}
              >
                {to ? (
                  <Link to={to} className="group block" aria-label={`Entrar no arco de ${g.nameLat}`}>
                    {inner}
                  </Link>
                ) : (
                  <div className="group cursor-default" aria-hidden>
                    {inner}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
