import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent } from "motion/react";

// Vídeo "scrubado" pelo scroll: a posição do scroll (progress 0..1) vira video.currentTime.
// A cena avança conforme você rola — o efeito-assinatura do site.
// prefers-reduced-motion: trava num frame médio e não scruba.
export default function ScrollScrubVideo({ src, progress, className = "" }) {
  const ref = useRef(null);
  const durRef = useRef(0);
  const reduce = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useMotionValueEvent(progress, "change", (v) => {
    const video = ref.current;
    const dur = durRef.current;
    if (!video || !dur || reduce.current || video.readyState < 2) return;
    // clamp longe do fim exato pra não piscar/reiniciar
    const t = Math.min(dur - 0.06, Math.max(0, v * dur));
    // evita seeks redundantes (economiza CPU)
    if (Math.abs(video.currentTime - t) > 0.016) video.currentTime = t;
  });

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      preload="auto"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      onLoadedMetadata={(e) => {
        durRef.current = e.currentTarget.duration || 0;
        // frame inicial (ou médio, se reduced motion)
        e.currentTarget.currentTime = reduce.current ? (durRef.current || 0) / 2 : 0;
        setReady(true);
      }}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 600ms ease" }}
    />
  );
}
