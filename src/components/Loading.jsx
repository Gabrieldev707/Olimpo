import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { hero } from "../data/gods";

// Tela de carregamento: preto, % em Cinzel, barra fina terracota, frase italic,
// fade pro Hero ao terminar.
export default function Loading({ onDone }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let cur = 0;
    const id = setInterval(() => {
      // avanço orgânico, desacelera no fim
      cur += Math.max(1, Math.round((100 - cur) * 0.06));
      if (cur >= 100) {
        cur = 100;
        clearInterval(id);
        setTimeout(() => setGone(true), 500);
        setTimeout(() => onDone?.(), 1400);
      }
      setPct(cur);
    }, 90);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-preto"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div className="font-display text-xs tracking-[0.6em] text-gesso/70">OLIMPO</div>

          <div className="mt-8 font-display text-6xl tabular-nums text-gesso md:text-7xl">
            {String(pct).padStart(2, "0")}
          </div>

          <div className="mt-8 h-px w-56 overflow-hidden bg-gesso/10">
            <div
              className="h-full bg-terracota transition-[width] duration-200 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>

          <motion.p
            className="mt-10 max-w-xs px-6 text-center font-body text-lg italic text-gesso/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1.2 }}
          >
            {hero.loadingPhrase}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
