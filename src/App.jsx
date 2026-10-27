import { useState } from "react";
// HashRouter: rotas tipo #/poseidon funcionam em qualquer host estático
// (sem precisar de rewrite SPA no servidor). Troque para BrowserRouter se
// configurar fallback para index.html no deploy.
import { HashRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Grain from "./components/Grain";
import Hero from "./components/Hero";
import ZeusArc from "./components/ZeusArc";
import PoseidonArc from "./components/PoseidonArc";
import HermesArc from "./components/HermesArc";
import HefestoArc from "./components/HefestoArc";
import AfroditeArc from "./components/AfroditeArc";
import ApoloArc from "./components/ApoloArc";
import AtenaArc from "./components/AtenaArc";
import AresArc from "./components/AresArc";
import DionisioArc from "./components/DionisioArc";
import Pantheon from "./components/Pantheon";
import ScrollToTop from "./components/ScrollToTop";

// Home: Hero + dashboard do Panteão + o arco de Zeus (instância máxima).
function Home() {
  return (
    <main>
      <Hero />
      <Pantheon />
      <ZeusArc />
    </main>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <HashRouter>
      <Grain />
      {!ready && <Loading onDone={() => setReady(true)} />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poseidon" element={<PoseidonArc />} />
        <Route path="/hermes" element={<HermesArc />} />
        <Route path="/hefesto" element={<HefestoArc />} />
        <Route path="/afrodite" element={<AfroditeArc />} />
        <Route path="/apolo" element={<ApoloArc />} />
        <Route path="/atena" element={<AtenaArc />} />
        <Route path="/ares" element={<AresArc />} />
        <Route path="/dionisio" element={<DionisioArc />} />
        {/* demais tronos entram aqui conforme ganham página própria */}
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
