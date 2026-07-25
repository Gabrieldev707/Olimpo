import { useEffect, useRef } from "react";

// Poeira suspensa em canvas leve (Lei 2). Máx 30 partículas, deriva lenta pra cima.
// Respeita prefers-reduced-motion (desliga).
export default function DustCanvas({ count = 26, color = "232,220,196" }) {
  const ref = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h, dpr;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const n = Math.min(count, 30);
    const parts = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vy: -(Math.random() * 0.18 + 0.04),
      vx: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.4 + 0.1,
      tw: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.vy;
        p.x += p.vx;
        p.tw += 0.02;
        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, color]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
