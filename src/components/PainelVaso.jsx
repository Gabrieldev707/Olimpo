import { useEffect, useRef, useState } from "react";

// Prancha de vaso dentro de uma nota crítica — o painel de figuras vermelhas que
// mostra como os próprios gregos representaram a cena. É a fonte visual do
// aparato, no mesmo espírito das fontes textuais.
//
// Mesmo contrato dos vídeos de cena: NUNCA em loop. Toca uma vez quando entra na
// tela, congela no último quadro e some da memória. Um painel de vaso repetindo
// em ciclo viraria GIF e destruiria a leitura de artefato — a coisa que ele
// precisa parecer é uma peça de cerâmica parada, que se moveu por um instante.
//
// prefers-reduced-motion recebe o pôster estático, e o vídeo nem é montado.

let tocandoAgora = null;

export default function PainelVaso({
  src,
  poster,
  legenda,
  borda,
  formatos = ["webm", "mp4"],
}) {
  const ref = useRef(null);
  const [perto, setPerto] = useState(false);
  const [tocou, setTocou] = useState(false);
  const [terminou, setTerminou] = useState(false);
  const [reduce] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reduce || !src) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setPerto(true), {
      rootMargin: "100% 0px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce, src]);

  useEffect(() => {
    if (reduce || !src || !perto || terminou) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        const v = el.querySelector("video");
        if (!v) return;
        if (e.isIntersecting) {
          if (tocandoAgora && tocandoAgora !== v) tocandoAgora.pause();
          tocandoAgora = v;
          v.play().then(() => setTocou(true)).catch(() => {});
        } else {
          v.pause();
          if (tocandoAgora === v) tocandoAgora = null;
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce, src, perto, terminou]);

  return (
    <div
      ref={ref}
      className="relative aspect-[1920/1088] w-full overflow-hidden border"
      style={{ borderColor: `${borda}88` }}
    >
      {/* O pôster é o primeiro quadro do próprio vídeo: nunca há preto nem
          salto entre a imagem parada e o início do movimento. */}
      <img src={poster} alt={legenda} className="absolute inset-0 h-full w-full object-cover" />

      {!reduce && src && perto && (
        <video
          muted
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden
          onEnded={() => setTerminou(true)}
          // Uma vez tocado, o vídeo NÃO volta a 0: o navegador segura o último
          // quadro e é ele que fica. Devolver a opacidade ao pôster no `ended`
          // faria o primeiro quadro reaparecer no fim — no painel da disputa,
          // por exemplo, a oliveira encolheria de volta a um broto.
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          style={{ opacity: tocou ? 1 : 0 }}
        >
          {formatos.map((formato) => (
            <source
              key={formato}
              src={`${src}.${formato}`}
              type={`video/${formato}`}
            />
          ))}
        </video>
      )}
    </div>
  );
}
