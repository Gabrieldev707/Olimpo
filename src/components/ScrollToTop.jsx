import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Ao trocar de rota, rola pro topo — cada página de deus começa do início.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
