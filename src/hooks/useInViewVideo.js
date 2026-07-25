import { useEffect, useRef } from "react";

// Toca o vídeo só quando a seção entra no viewport; ao sair, pausa e reseta.
// Garante "1 vídeo por vez" e economiza CPU/rede (Passo 8, video-engineering).
export default function useInViewVideo(threshold = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play?.().catch(() => {});
        } else {
          el.pause?.();
          try {
            el.currentTime = 0;
          } catch {
            /* noop */
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
