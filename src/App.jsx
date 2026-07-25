import { useState } from "react";
import Loading from "./components/Loading";
import Grain from "./components/Grain";
import Hero from "./components/Hero";
import ZeusArc from "./components/ZeusArc";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Grain />
      {!ready && <Loading onDone={() => setReady(true)} />}
      <main>
        <Hero />
        <ZeusArc />
        {/* Passo 3+: Panteão, deuses bespoke... */}
      </main>
    </>
  );
}
