import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    // Não observar markdown/scratchpad/pastas de entrega: um arquivo travado por
    // outro processo (EBUSY) derruba o watcher e mata o dev server. Pastas onde
    // caem artes recém-exportadas são as que mais disparam isso.
    //
    // O padrão genérico `*_imagens_*` cobre as pastas de entrega por deus
    // (atena_imagens_limpas_site_originais, poseidon_imagens_aprovadas,
    // ares_imagens_aprovadas, …). Listar uma a uma já derrubou o dev server três
    // vezes, sempre na pasta do deus seguinte — o asset novo chega antes do
    // ignore. As artes usadas pelo site vivem em `assets/` e `public/assets/`,
    // que continuam observadas.
    // Glob não basta no Windows: o chokidar entrega caminhos com barra INVERTIDA
    // (`C:\Dev\Olimpo\ares_imagens_aprovadas\ares_aprovadas\01-hero-ares.png`) e
    // `**/` não casa com `\`. Por isso pastas de entrega no primeiro nível eram
    // ignoradas e uma subpasta derrubava o dev server com EBUSY assim que uma
    // arte recém-exportada chegava ainda travada pelo processo que a gerou.
    // Um predicado é imune a separador e a profundidade.
    watch: {
      ignored: (caminho) => {
        const p = String(caminho).replace(/\\/g, "/");
        if (p.endsWith(".md")) return true;
        return p
          .split("/")
          .some((seg) => seg === "scratchpad" || seg === "_watermarked" || /_imagens_/.test(seg));
      },
    },
  },
})
