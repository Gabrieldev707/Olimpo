// Geração de vídeos via Seedance (BytePlus ModelArk) — OLIMPO / Afrodite + Apolo.
//
// Uso:
//   node tools/seedance.mjs b1 b2 b3 b4 b5 hero   # gera os jobs listados
//   node tools/seedance.mjs all                   # todos
//   node tools/seedance.mjs ap-b1 ap-b2 ap-b3 ap-b4 ap-b5 heroAp   # Apolo
//
// Submete todas as tasks em paralelo, faz polling até succeeded/failed e
// baixa os mp4 para assets/videos/. Requer SEEDANCE_API_KEY e
// SEEDANCE_API_BASE no .env (ver .env.example).

import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

dotenv.config();

const KEY = process.env.SEEDANCE_API_KEY;
const BASE = process.env.SEEDANCE_API_BASE;
if (!KEY || !BASE) {
  console.error("ERRO: SEEDANCE_API_KEY / SEEDANCE_API_BASE ausentes no .env");
  process.exit(1);
}

// Pro Fast primeiro (mesma linha dos VASO aprovados); se o endpoint recusar
// (modelo inexistente ou sem suporte ao modo), cai para o Pro 1.0 e o 1.5.
const MODELS = ["seedance-1-0-pro-fast-251015", "seedance-1-0-pro-250528", "seedance-1-5-pro-251215"];

const OUT_DIR = path.resolve("assets/videos");

// Direção visual comum dos 5 beats (afrodite-videos-5-beats.md): pintura grega
// de figuras vermelhas animada, flat 2D, 9:16, movimento cerimonial mínimo.
const VASO_PARAMS = "--ratio 9:16 --duration 10 --resolution 720p --camerafixed true";

// Trava de paleta: a 1ª rodada fugiu do estilo (fundo laranja/creme, cores
// naturais). Reforço explícito de que só existem DUAS cores no quadro.
const STYLE_LOCK = `STRICT TWO-COLOR PALETTE: the entire panel uses only matte black and terracotta-orange. The background is always deep matte black, never orange, never cream, never white, never beige. Figures, drapery, objects and ornaments are terracotta-orange with fine black line details only. No green, no natural skin tones, no full-color illustration, no red roses in natural color, no blue, no yellow except terracotta tones.

`;

// Estilo do b1 — o único beat que saiu com a moldura de meandro completa e a
// paleta certa (nota 8.5 do Gabriel). Os b2–b5 originais vieram sem borda ou
// fora da paleta; os jobs *v2 reaproveitam os corpos narrativos aprovados com
// ESTE bloco de abertura no lugar.
const B1_STYLE = `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, matte black background, terracotta-orange figures, crisp black outlines, fine black interior linework, archaic Greek proportions, decorative meander border. The scene is fully framed like a finished vase panel: a continuous Greek meander band runs along the entire top edge and the entire bottom edge of the panel, enclosing the scene completely.

`;

const JOBS = {
  b1: {
    out: "v-afrodite-b1.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, matte black background, terracotta-orange figures, crisp black outlines, fine black interior linework, archaic Greek proportions, decorative meander border.

Depict the birth of Aphrodite from the sea according to the ancient myth. Aphrodite rises already adult from stylized sea foam at the center of the composition. She must not appear as a mermaid. Her body and drapery are rendered in terracotta red, with elegant black line details. Curved wave lines move slowly below her, while white foam is represented only through negative space and terracotta ornamental curls.

Two Horae approach from the sides carrying a veil and ornaments. Small flowers grow beneath Aphrodite's feet as she reaches the shore. A shell, myrtle branches, roses and two small doves may appear as symbolic attributes, but the composition must remain balanced and uncluttered.

Animate the scene minimally and ceremonially: waves move slowly, foam curls expand, Aphrodite rises in a controlled vertical motion, the veil moves gently, flowers unfold and the Horae take one slow step inward. The final pose must be stable and iconic.

Absolutely flat, no perspective, no depth, no realistic water, no realistic skin, no 3D body, no physical vase, no ceramic curvature, no handles, no gradients, no realistic lighting, no modern beauty styling, no fantasy glow, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  b2: {
    out: "v-afrodite-b2.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, flat 2D vertical panel, terracotta-orange figures on a matte black background, crisp black outlines, fine incised-style interior details, archaic Greek visual language, decorative meander border.

Create a symbolic wedding scene between Aphrodite and Hephaestus. Aphrodite stands on the right, identified by elegant drapery, a dove, roses, myrtle and a small mirror. Hephaestus stands on the left, identified by a craftsman's cap, beard, visibly marked or supported leg, hammer, tongs and a metal throne.

Do not portray the scene as romantic intimacy. The two gods must stand near each other while looking in different directions. Between them, place a symbolic metal ring or thin chain representing the marriage bond. Aphrodite's side contains soft floral curves. Hephaestus's side contains rigid geometric metal lines, tools and hammered patterns.

Animate minimally: the metal ring slowly closes, flowers unfold on Aphrodite's side, a small furnace line pulses on Hephaestus's side, and the thin chain stretches between them without bringing their bodies closer. At the end, the chain begins to divide into several fine metallic threads, preparing the visual transition to the invisible net.

CRITICAL: the ring and the chain are flat terracotta line-art like everything else, never photorealistic gold or 3D metal. The furnace flame is a small flat terracotta ornamental curl, never realistic fire. Every element in the panel shares the same flat vase-painting treatment.

Completely flat, no perspective, no depth, no romantic cinematic embrace, no photorealism, no 3D metal, no physical vase shape, no gradients, no realistic fire, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  b3: {
    out: "v-afrodite-b3.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, matte black background, terracotta-orange figures, crisp black contour lines, fine black interior details, archaic Greek proportions, Greek meander border.

Depict Aphrodite and Ares being trapped by the invisible metal net created by Hephaestus. Aphrodite and Ares occupy the center of the panel. Aphrodite is identified by flowing drapery, roses, myrtle and a dove motif. Ares is identified by helmet, spear, sword and shield.

Hephaestus stands at one side holding the end of a precisely constructed net. He wears a craftsman's cap and carries a hammer or tongs. At the top of the composition, include a small solar disk or the watching face of Helios, who revealed the affair. Along the outer edges, small simplified Olympian figures may appear as witnesses.

The net must begin almost invisible, represented by a few thin terracotta or black geometric lines. During the animation, more lines are drawn across the composition until a precise lattice closes around Aphrodite and Ares. Ares attempts one restrained movement, but his sword and shield remain caught. Aphrodite's flowers become intersected by the metallic geometry. Hephaestus pulls one line and the entire net tightens.

The animation must remain ceremonial rather than comic or erotic. Focus on the contrast between desire, force and technical precision.

Absolutely flat, no perspective, no depth, no realistic intimacy, no nudity emphasis, no physical vase, no ceramic curvature, no photorealistic metal, no cinematic camera, no gradients, no glowing magic, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  b4: {
    out: "v-afrodite-b4.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, terracotta-orange figures on matte black, refined black linework, archaic Greek proportions, decorative meander border.

Depict the death of Adonis and Aphrodite's grief. Adonis lies wounded on the ground after a hunt, identified as a beautiful young mortal carrying a broken spear. A wild boar moves away toward the edge of the composition. Aphrodite approaches from the opposite side with one arm extended, but she arrives too late.

Do not show graphic gore. Represent the blood through a few controlled terracotta-red droplets and ornamental lines reaching the earth. As each drop touches the ground, it transforms into an anemone-like flower. The flowers gradually spread around Adonis, turning the scene of death into a symbolic field of fragile beauty.

Animate minimally: the boar takes one slow step away, Aphrodite's drapery moves, her arm extends, the droplets fall one by one, and flowers unfold from the earth. After the flowers appear, all movement stops except for a single leaf or petal. The emotional tone must be solemn and restrained.

At the end, one central flower closes into a circular golden-terracotta shape that can visually transition into the apple of Discord in the next beat.

Flat graphic panel only, no perspective, no depth, no realistic blood, no photorealistic body, no melodramatic acting, no 3D objects, no physical vase shape, no gradients, no fantasy light, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  b5: {
    out: "v-afrodite-b5.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, matte black background, terracotta-orange figures, crisp black outlines, fine black interior linework, authentic archaic Greek visual language, decorative meander border.

Depict the Judgment of Paris as the central myth of Aphrodite. Paris stands at the center holding a golden-terracotta apple. Before him stand Hera, Athena and Aphrodite, each clearly identified by attributes rather than realistic facial differences.

Hera wears a crown and carries a royal sceptre. Athena wears a helmet and carries a spear and aegis. Aphrodite is accompanied by a dove, roses, myrtle and a flowing veil. A small figure of Eris may appear at the edge after throwing the apple into the scene.

Animate the sequence ceremonially. The apple enters the composition and stops in Paris's hand. Hera raises the sceptre, suggesting power. Athena lowers the spear beside him, suggesting victory and wisdom. Aphrodite extends a veil or ribbon, and within its curved line the distant figure of Helen appears like a vision. Paris slowly turns and offers the apple to Aphrodite.

After the choice, the background begins to change. A row of Greek ships appears as simple silhouettes. The walls of Troy rise behind the figures. Small controlled flames begin at the base of the walls. In the final moment, a faint horse silhouette appears inside or behind the city as a future omen, not as an event happening immediately.

The emotional meaning must be clear: Aphrodite offers desire, while the consequences expand beyond the original choice.

CRITICAL: the background remains deep matte black for the entire video. There is no sky, no clouds, no sunset, no gradient of any kind. The ships, the walls of Troy, the flames and the horse are flat terracotta silhouettes drawn on the black background, in the same vase-painting line treatment as the figures.

Absolutely flat, no perspective, no depth, no realistic fire, no full battle scene, no physical vase, no ceramic curvature, no 3D apple, no cinematic lighting, no gradients, no fantasy glow, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  // Beats v2 — mesmos roteiros aprovados, estilo do b1 (ver B1_STYLE acima).
  b2v2: {
    out: "v-afrodite-b2-v2.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Create a symbolic wedding scene between Aphrodite and Hephaestus. Aphrodite stands on the right, identified by elegant drapery, a dove, roses, myrtle and a small mirror. Hephaestus stands on the left, identified by a craftsman's cap, beard, visibly marked or supported leg, hammer, tongs and a metal throne.

Do not portray the scene as romantic intimacy. The two gods must stand near each other while looking in different directions. Between them, place a symbolic metal ring or thin chain representing the marriage bond. Aphrodite's side contains soft floral curves. Hephaestus's side contains rigid geometric metal lines, tools and hammered patterns.

Animate minimally: the metal ring slowly closes, flowers unfold on Aphrodite's side, a small furnace line pulses on Hephaestus's side, and the thin chain stretches between them without bringing their bodies closer. At the end, the chain begins to divide into several fine metallic threads, preparing the visual transition to the invisible net.

CRITICAL: the ring and the chain are flat terracotta line-art like everything else, never photorealistic gold or 3D metal. The furnace flame is a small flat terracotta ornamental curl, never realistic fire. Every element in the panel shares the same flat vase-painting treatment.

Completely flat, no perspective, no depth, no romantic cinematic embrace, no photorealism, no 3D metal, no physical vase shape, no gradients, no realistic fire, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  b3v2: {
    out: "v-afrodite-b3-v2.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Depict Aphrodite and Ares being trapped by the invisible metal net created by Hephaestus. Aphrodite and Ares occupy the center of the panel. Aphrodite is identified by flowing drapery, roses, myrtle and a dove motif. Ares is identified by helmet, spear, sword and shield.

Hephaestus stands at one side holding the end of a precisely constructed net. He wears a craftsman's cap and carries a hammer or tongs. At the top of the composition, include a small solar disk or the watching face of Helios, who revealed the affair. Along the outer edges, small simplified Olympian figures may appear as witnesses.

The net must begin almost invisible, represented by a few thin terracotta or black geometric lines. During the animation, more lines are drawn across the composition until a precise lattice closes around Aphrodite and Ares. Ares attempts one restrained movement, but his sword and shield remain caught. Aphrodite's flowers become intersected by the metallic geometry. Hephaestus pulls one line and the entire net tightens.

The animation must remain ceremonial rather than comic or erotic. Focus on the contrast between desire, force and technical precision.

Absolutely flat, no perspective, no depth, no realistic intimacy, no nudity emphasis, no physical vase, no ceramic curvature, no photorealistic metal, no cinematic camera, no gradients, no glowing magic, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  b4v2: {
    out: "v-afrodite-b4-v2.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Depict the death of Adonis and Aphrodite's grief. Adonis lies wounded on the ground after a hunt, identified as a beautiful young mortal carrying a broken spear. A wild boar moves away toward the edge of the composition. Aphrodite approaches from the opposite side with one arm extended, but she arrives too late.

Do not show graphic gore. Represent the blood through a few controlled terracotta-red droplets and ornamental lines reaching the earth. As each drop touches the ground, it transforms into an anemone-like flower. The flowers gradually spread around Adonis, turning the scene of death into a symbolic field of fragile beauty.

Animate minimally: the boar takes one slow step away, Aphrodite's drapery moves, her arm extends, the droplets fall one by one, and flowers unfold from the earth. After the flowers appear, all movement stops except for a single leaf or petal. The emotional tone must be solemn and restrained.

At the end, one central flower closes into a circular golden-terracotta shape that can visually transition into the apple of Discord in the next beat.

Flat graphic panel only, no perspective, no depth, no realistic blood, no photorealistic body, no melodramatic acting, no 3D objects, no physical vase shape, no gradients, no fantasy light, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  b5v2: {
    out: "v-afrodite-b5-v2.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Depict the Judgment of Paris as the central myth of Aphrodite. Paris stands at the center holding a golden-terracotta apple. Before him stand Hera, Athena and Aphrodite, each clearly identified by attributes rather than realistic facial differences.

Hera wears a crown and carries a royal sceptre. Athena wears a helmet and carries a spear and aegis. Aphrodite is accompanied by a dove, roses, myrtle and a flowing veil. A small figure of Eris may appear at the edge after throwing the apple into the scene.

Animate the sequence ceremonially. The apple enters the composition and stops in Paris's hand. Hera raises the sceptre, suggesting power. Athena lowers the spear beside him, suggesting victory and wisdom. Aphrodite extends a veil or ribbon, and within its curved line the distant figure of Helen appears like a vision. Paris slowly turns and offers the apple to Aphrodite.

After the choice, the background begins to change. A row of Greek ships appears as simple silhouettes. The walls of Troy rise behind the figures. Small controlled flames begin at the base of the walls. In the final moment, a faint horse silhouette appears inside or behind the city as a future omen, not as an event happening immediately.

The emotional meaning must be clear: Aphrodite offers desire, while the consequences expand beyond the original choice.

CRITICAL: the background remains deep matte black for the entire video. There is no sky, no clouds, no sunset, no gradient of any kind. The ships, the walls of Troy, the flames and the horse are flat terracotta silhouettes drawn on the black background, in the same vase-painting line treatment as the figures.

Absolutely flat, no perspective, no depth, no realistic fire, no full battle scene, no physical vase, no ceramic curvature, no 3D apple, no cinematic lighting, no gradients, no fantasy glow, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  // TESE — paisagem do mar onde ela nasceu: fundo vivo da seção "O DESEJO
  // ANTES DAS REGRAS". A espuma rosé emenda visualmente com o beat I
  // (nascimento da espuma). Depois vira loop seamless via ffmpeg ping-pong.
  tese: {
    out: "v-af-tese-raw.mp4",
    content: [
      {
        type: "text",
        text: `A dark open sea at night, seen from the shore, gentle slow waves rolling toward the viewer. White sea foam glows faintly with warm rose-copper light along the wave crests. The horizon sits very low; above it a vast pure black sky with a few fine dust-like stars. Minimalist cinematic composition, extremely slow ceremonial motion, matte dark tones, deep blacks, no people, no objects, no land, no moon, no text. Static locked camera, no camera movement. --ratio 16:9 --duration 5 --resolution 720p --camerafixed true`,
      },
    ],
  },
  // TEMPLO — painel VASO 9:16 do templo de Afrodite (roteiro do Gabriel).
  // Coroa a seção TESE da página dela (loop seamless via ffmpeg ping-pong).
  templo: {
    out: "v-af-templo-raw.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Depict a temple of Aphrodite as the central structure of the composition. The temple has elegant Greek columns, a triangular pediment, and a frontal altar with steps. Aphrodite appears subtly as a standing statue between the central columns. Around the temple: doves, roses, myrtle branches, a discrete seashell and marine ornaments, light decorative veils and fabrics draped between the columns. Symbols of the goddess of love and beauty.

Animate minimally and ceremonially: veils and fabrics sway gently, doves cross the scene slowly, flowers discreetly open near the altar, small wavy lines suggest a sea breeze, myrtle leaves stir lightly, a very subtle ornamental aura surrounds the temple's central area, fine graphic particles drift slowly. The temple remains firm and majestic throughout. The motion must feel sacred, beautiful, delicate and full of quiet desire — never fast, never comic.

CRITICAL: the scene inside the meander border has a deep matte black background like every other panel in this series. The temple, the statue, the doves, the flowers and all ornaments are terracotta-orange with fine black line details on matte black. The veils and fabrics are flat terracotta line-art too — never white, never translucent, never realistic chiffon, never gray.

Absolutely flat, no perspective, no depth, no 3D, no cinematic camera, no physical vase, no ceramic curvature, no photorealism, no cartoon, no anime, no medieval style, no rotating camera, no explosions, no fast movement, no exaggerated digital glow, no modern effects, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  // HERO GESSO — image-to-video do retrato aprovado af-02.png. Regra GESSO:
  // pedra não vira carne, olhos vazios, câmera travada, só luz e poeira.
  hero: {
    out: "v-af-hero-v2.mp4",
    content: [
      {
        type: "image_url",
        image_url: {
          url: `data:image/png;base64,${fs.readFileSync(path.resolve("assets/afrodite/af-02.png")).toString("base64")}`,
        },
      },
      {
        type: "text",
        // v1 virou "foto de museu" em 3:4 (crop/zoom no object-cover 16:9). v2:
        // 16:9 nativo, busto à direita (título fica à esquerda), claro-escuro,
        // luz quente rosé respirando de baixo como reflexo de mar à noite.
        text: `An ancient Greek marble bust of Aphrodite eroded by sea water, empty carved eye sockets, cracked surface with salt and foam residue, positioned on the right third of the frame, emerging from pure black darkness. Wide cinematic 16:9 composition with deep black empty space on the left side. A single warm rose-copper light slowly breathes across the sculpture from below, like moonlight reflected on dark sea water at night; slow shifting highlights and deep shadows, chiaroscuro. Fine dust particles drift through the light beam. Static locked camera, no camera movement. The stone never becomes flesh, the eyes remain empty carved stone, no blinking, no facial expression, no body movement. Slow, solemn, ceremonial. Pure black background, no museum, no room, no walls, no text. --ratio 16:9 --duration 5 --resolution 720p --camerafixed true`,
      },
    ],
  },
  hero2: {
    out: "v-af-hero-v3.mp4",
    content: [
      {
        type: "text",
        // v2 (i2v do af-02) falhou 2x: zoom na cara (sem espaço pro título) e o
        // modelo ESCULPIU pupilas — violação capital do catálogo (olhos vazios).
        // v3: t2v, sem imagem-base, com a trava de olhos explícita e o busto
        // pequeno no terço direito.
        text: `Cinematic wide 16:9 shot: an ancient Greek marble bust of Aphrodite, full head and shoulders visible, standing on the right third of the frame, small against a vast pure black void that fills the left two thirds. The marble is eroded by sea water, cracked, with salt residue. The eyes are completely EMPTY carved sockets — no pupils, no irises, no eyeballs, only shadowed hollow stone, like all classical Greek statues. A warm rose-copper light slowly breathes across the sculpture from below, like light reflected off dark sea water at night; deep chiaroscuro, fine dust particles drifting through the beam. Static locked camera, no camera movement, no zoom, no pan. The stone never becomes flesh, no blinking, no facial expression, no body movement. Slow, solemn, ceremonial. Pure black background, no museum, no room, no walls, no text. --ratio 16:9 --duration 5 --resolution 720p --camerafixed true`,
      },
    ],
  },
  // ── APOLO (apollo-videos-5-beats.md) — 5 beats VASO 9:16. Prompts verbatim
  // do roteiro; STYLE_LOCK é prependido automaticamente no run().
  "ap-b1": {
    out: "v-apolo-b1.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, matte black background, terracotta-orange figures, crisp black outlines, fine black interior linework, archaic Greek proportions, decorative meander border.

Depict the birth of Apollo on the island of Delos. Leto is at the center, seated or kneeling on the small island as she gives birth. The island must appear as a sacred rocky platform floating above stylized sea waves. Artemis may already be present as a young female figure standing nearby, associated with support and twinship. Apollo appears as a newborn divine presence but with symbolic dignity, not as a naturalistic infant scene. He may be shown seated in Leto’s arms or rising in an emblematic pose that already suggests divine identity.

Identify Apollo through future attributes suggested symbolically around him: a laurel branch, a small lyre, a bow motif, radiating linear ornaments. The sea below must move slowly, while Delos becomes more stable during the animation.

Animate minimally and ceremonially: wave lines move, the island steadies, Leto inclines slightly, Artemis takes one small step, and Apollo’s symbolic aura or laurel forms around him. The composition must end in a stable sacred tableau.

Absolutely flat, no perspective, no realistic infant anatomy, no 3D space, no modern halo effects, no photorealism, no physical vase, no gradients, no cinematic lighting, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  "ap-b2": {
    out: "v-apolo-b2.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, matte black background, terracotta-orange figures, crisp black outlines, fine black interior details, archaic Greek visual language, decorative meander border.

Depict Apollo slaying Python at Delphi. Apollo stands as a youthful beardless god holding a bow, identified by long hair, laurel elements and a controlled, upright posture. Python appears as a large sacred serpent coiled around or near the rocky omphalos area and the sanctuary space of Delphi. Include a tripod or sacred stand in the composition to signal Apollo’s future control of the oracle.

Animate the scene ceremonially: Python’s coils move slowly; Apollo raises the bow in a measured action; one arrow is released; the serpent recoils and loosens around the sanctuary; the tripod becomes more visible; laurel branches or sacred lines frame Apollo’s victorious stillness. The end state must show Apollo established before Delphi as its new divine master.

The emphasis should be on sacred conquest, not on frantic battle. No gore, no realistic snake physics, no cinematic action choreography.

Absolutely flat, no perspective, no depth, no photorealism, no 3D serpent, no physical vase shape, no gradients, no glowing fantasy beams, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  "ap-b3": {
    out: "v-apolo-b3.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, terracotta-orange figures on matte black, crisp black outlines, fine interior linework, archaic Greek proportions, decorative meander border.

Depict the transformation of Daphne into the laurel tree as Apollo pursues her. Apollo is shown as a youthful beardless god with flowing hair, identified by bow, laurel association and divine posture. Daphne appears in profile in motion, fleeing toward one side of the composition.

During the animation, Daphne’s body transforms in stages: her feet root into the earth, her legs stiffen into trunk form, her raised arms branch outward, and leaves unfold from her hair and fingers. Apollo’s motion must slow as he approaches. He must not violently seize her. Instead, he reaches forward and stops, confronted by the completed laurel tree. In the final state, Apollo touches or receives the laurel with solemn recognition.

The emotional meaning should be clear: Apollo desired possession, but received only the sacred sign of what he could not keep.

Absolutely flat, no perspective, no full naturalistic running cycle, no photorealistic body, no fantasy forest depth, no physical vase, no gradients, no cinematic blur, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  "ap-b4": {
    out: "v-apolo-b4.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, matte black background, terracotta-orange figures, black contour lines, fine black interior details, archaic Greek proportions, decorative meander border.

Depict the musical contest between Apollo and Marsyas. Apollo stands on one side holding the lyre, youthful, beardless and composed, identified by laurel and a noble posture. Marsyas stands opposite with the flute, more rustic and tense. A small group of Muses or judges may appear seated or standing at the upper or side edge of the composition.

Animate the scene through symbolic musical motion rather than literal sound effects. Apollo’s lyre produces ordered linear patterns or harmonious curved bands. Marsyas’s flute produces a different, more unstable set of lines. As the sequence progresses, Apollo’s side becomes visually more balanced and authoritative. Marsyas lowers his body or bends slightly, acknowledging defeat. The judges incline toward Apollo.

Do not depict graphic flaying or explicit bodily punishment. The purpose of the scene is to show the danger of challenging Apollo’s supremacy in music and divine order.

Absolutely flat, no perspective, no realistic concert staging, no photorealism, no physical vase object, no 3D instrument rendering, no gradients, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  "ap-b5": {
    out: "v-apolo-b5.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, matte black background, terracotta-orange figures, crisp black outlines, fine black interior linework, archaic Greek visual language, decorative meander border.

Depict Apollo and Cassandra in the moment that defines her prophetic curse. Apollo stands as a youthful divine figure, holding a laurel branch, lyre or staff-like sacred attribute. Cassandra stands before him as a noble Trojan woman. The composition must show both the gift of prophecy and its tragic reversal.

At first, Apollo extends one hand in a gesture of granting divine sight. Cassandra receives the gesture but does not fully yield to him. Then Apollo’s posture changes into controlled severity, indicating the curse: she will see the truth but never be believed.

After this, the animation must shift toward Cassandra’s visions. She points outward or upward while symbolic scenes of future Troy appear behind or above her: the Trojan horse as a silhouette, city walls, small flames, distressed figures, and people turning away from her warnings. Cassandra remains centrally isolated while others ignore her.

The emotional meaning must be unmistakable: Apollo gave vision, but removed persuasion. She knows what will happen and cannot stop it.

Absolutely flat, no perspective, no realistic fire, no full war scene, no photorealistic facial acting, no physical vase, no gradients, no fantasy glow, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  // b3 recusado pelo filtro de conteúdo nos 3 modelos (a perseguição de Dafne
  // lê como assédio). v2: reenquadrada como cena de METAMORFOSE — ela já está
  // se tornando árvore, Apolo parado à distância, sem perseguição nem contato.
  "ap-b3v2": {
    out: "v-apolo-b3.mp4",
    content: [
      {
        type: "text",
        text: `Ancient Greek red-figure vase painting animation, completely flat 2D vertical panel, terracotta-orange figures on matte black, crisp black outlines, fine interior linework, archaic Greek proportions, decorative meander border.

Depict the ancient myth of Daphne becoming the laurel tree, treated as a solemn sacred metamorphosis. The composition shows two separate static figures with clear space between them. On one side, Daphne stands upright in a graceful frontal pose as her body transforms in stages: her feet become roots entering the earth, her legs become a tree trunk, her raised arms become branches, and leaves unfold from her hair and fingertips. On the other side, Apollo stands still at a respectful distance, a youthful beardless god with bow and laurel, simply watching and finally extending one open hand toward the completed tree in a gesture of reverence.

Animate minimally and ceremonially: roots grow downward, branches grow upward, leaves unfold one by one, and Apollo slowly raises his hand to touch a single laurel branch. The final state is a stable sacred tableau: the laurel tree on one side, the god in quiet stillness on the other.

Absolutely flat, no perspective, no depth, no motion of pursuit, no physical contact between figures, no photorealistic body, no fantasy forest, no physical vase, no gradients, no cinematic blur, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  // ── APOLO v2 — b1, b3, b4 e b5 fugiram da trava de 2 cores (mar azul,
  // folhas verdes, roupas brancas, fogo realista). Mesma receita da Afrodite:
  // corpos narrativos aprovados + bloco B1_STYLE (moldura completa) no lugar
  // da abertura original. b2 saiu na paleta e fica como está. b3 mantém o
  // reenquadramento de metamorfose (o original foi barrado pelo filtro).
  "ap-b1v2": {
    out: "v-apolo-b1.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Depict the birth of Apollo on the island of Delos. Leto is at the center, seated or kneeling on the small island as she gives birth. The island must appear as a sacred rocky platform floating above stylized sea waves. Artemis may already be present as a young female figure standing nearby, associated with support and twinship. Apollo appears as a newborn divine presence but with symbolic dignity, not as a naturalistic infant scene. He may be shown seated in Leto’s arms or rising in an emblematic pose that already suggests divine identity.

Identify Apollo through future attributes suggested symbolically around him: a laurel branch, a small lyre, a bow motif, radiating linear ornaments. The sea below must move slowly, while Delos becomes more stable during the animation.

Animate minimally and ceremonially: wave lines move, the island steadies, Leto inclines slightly, Artemis takes one small step, and Apollo’s symbolic aura or laurel forms around him. The composition must end in a stable sacred tableau.

CRITICAL: the sea is NOT blue. The waves are black with terracotta-orange line work only, like every other element. Drapery is terracotta-orange with black lines, never white. The background stays deep matte black from edge to edge.

Absolutely flat, no perspective, no realistic infant anatomy, no 3D space, no modern halo effects, no photorealism, no physical vase, no gradients, no cinematic lighting, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  "ap-b3v3": {
    out: "v-apolo-b3.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Depict the ancient myth of Daphne becoming the laurel tree, treated as a solemn sacred metamorphosis. The composition shows two separate static figures with clear space between them. On one side, Daphne stands upright in a graceful frontal pose as her body transforms in stages: her feet become roots entering the earth, her legs become a tree trunk, her raised arms become branches, and leaves unfold from her hair and fingertips. On the other side, Apollo stands still at a respectful distance, a youthful beardless god with bow and laurel, simply watching and finally extending one open hand toward the completed tree in a gesture of reverence.

Animate minimally and ceremonially: roots grow downward, branches grow upward, leaves unfold one by one, and Apollo slowly raises his hand to touch a single laurel branch. The final state is a stable sacred tableau: the laurel tree on one side, the god in quiet stillness on the other.

CRITICAL: the laurel leaves are NOT green. Leaves, branches, roots, hair and drapery are all terracotta-orange line-art on the matte black panel, exactly like the figures. No natural colors anywhere.

Absolutely flat, no perspective, no depth, no motion of pursuit, no physical contact between figures, no photorealistic body, no fantasy forest, no physical vase, no gradients, no cinematic blur, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  "ap-b4v2": {
    out: "v-apolo-b4.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Depict the musical contest between Apollo and Marsyas. Apollo stands on one side holding the lyre, youthful, beardless and composed, identified by laurel and a noble posture. Marsyas stands opposite with the flute, more rustic and tense. A small group of Muses or judges may appear seated or standing at the upper or side edge of the composition.

Animate the scene through symbolic musical motion rather than literal sound effects. Apollo’s lyre produces ordered linear patterns or harmonious curved bands. Marsyas’s flute produces a different, more unstable set of lines. As the sequence progresses, Apollo’s side becomes visually more balanced and authoritative. Marsyas lowers his body or bends slightly, acknowledging defeat. The judges incline toward Apollo.

Do not depict graphic flaying or explicit bodily punishment. The purpose of the scene is to show the danger of challenging Apollo’s supremacy in music and divine order.

CRITICAL: the background of the scene inside the meander frame stays deep matte black — never orange, never tan. Figures and drapery are terracotta-orange with fine black lines, never white, never natural skin tones.

Absolutely flat, no perspective, no realistic concert staging, no photorealism, no physical vase object, no 3D instrument rendering, no gradients, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  "ap-b5v2": {
    out: "v-apolo-b5.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Depict Apollo and Cassandra in the moment that defines her prophetic curse. Apollo stands as a youthful divine figure, holding a laurel branch, lyre or staff-like sacred attribute. Cassandra stands before him as a noble Trojan woman. The composition must show both the gift of prophecy and its tragic reversal.

At first, Apollo extends one hand in a gesture of granting divine sight. Cassandra receives the gesture but does not fully yield to him. Then Apollo’s posture changes into controlled severity, indicating the curse: she will see the truth but never be believed.

After this, the animation must shift toward Cassandra’s visions. She points outward or upward while symbolic scenes of future Troy appear behind or above her: the Trojan horse as a silhouette, city walls, small flames, distressed figures, and people turning away from her warnings. Cassandra remains centrally isolated while others ignore her.

The emotional meaning must be unmistakable: Apollo gave vision, but removed persuasion. She knows what will happen and cannot stop it.

CRITICAL: the flames are small flat terracotta ornamental curls, never realistic orange-yellow fire. The background stays deep matte black for the entire video — the horse, the walls, the flames and the figures are flat terracotta silhouettes and line work on black, in the same vase-painting treatment. Drapery is terracotta, never white, never dark red.

Absolutely flat, no perspective, no realistic fire, no full war scene, no photorealistic facial acting, no physical vase, no gradients, no fantasy glow, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  // Rodada 3 — b3v3 ainda veio com folhas verdes e b5v2 com fundo laranja,
  // vestes brancas e fogo amarelo. Última tentativa: remover o motivo que
  // puxa a cor errada (rama verde → silhueta preta) e proibir as cores por
  // nome logo no corpo narrativo. Se ainda vazar, aceitar e registrar.
  "ap-b3v4": {
    out: "v-apolo-b3.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Depict the ancient myth of Daphne becoming the laurel tree, treated as a solemn sacred metamorphosis. Two separate static figures with clear space between them. On one side, Daphne stands upright in a graceful frontal pose as her body transforms in stages: her feet become roots, her legs become a trunk, her raised arms become branches, her hair becomes foliage. On the other side, Apollo stands still at a respectful distance, a youthful beardless god with bow, watching and finally extending one open hand toward the tree in reverence.

Animate minimally and ceremonially: roots grow downward, branches grow upward, and Apollo slowly raises his hand. The final state is a stable sacred tableau.

PALETTE RULES, ABSOLUTE: the tree is rendered like the figures — terracotta-orange lines and solid black, NOT green. No green anywhere in the panel. No white, no cream, no yellow, no brown, no skin tones. The interior background of the panel is solid deep matte black, identical to the area outside the figures. Every figure, tree, root and ornament is flat terracotta-orange with fine black interior lines.

Absolutely flat, no perspective, no depth, no motion of pursuit, no physical contact between figures, no photorealistic body, no fantasy forest, no physical vase, no gradients, no cinematic blur, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  "ap-b5v3": {
    out: "v-apolo-b5.mp4",
    content: [
      {
        type: "text",
        text: `${B1_STYLE}Depict Apollo and Cassandra in the moment that defines her prophetic curse. Apollo stands as a youthful divine figure holding a staff-like sacred attribute. Cassandra stands before him as a noble Trojan woman. The composition must show both the gift of prophecy and its tragic reversal.

At first, Apollo extends one hand in a gesture of granting divine sight. Cassandra receives the gesture but does not fully yield to him. Then Apollo’s posture changes into controlled severity, indicating the curse: she will see the truth but never be believed.

After this, the animation shifts toward Cassandra’s visions. She points outward while symbolic scenes of future Troy appear behind her as flat black silhouettes on the black background, drawn in terracotta outline only: the Trojan horse, city walls, small ornamental flame curls, and figures turning away from her. Cassandra remains centrally isolated.

The emotional meaning must be unmistakable: Apollo gave vision, but removed persuasion. She knows what will happen and cannot stop it.

PALETTE RULES, ABSOLUTE: solid deep matte black background inside the frame, never orange, never tan, never brown. Drapery and figures are flat terracotta-orange with black interior lines — no white robes, no cream, no dark red dress, no yellow-blond hair, no green leaves. Flames are small flat terracotta ornamental curls, never realistic yellow-orange fire.

Absolutely flat, no perspective, no realistic fire, no full war scene, no photorealistic facial acting, no physical vase, no gradients, no fantasy glow, no text, vertical 9:16. ${VASO_PARAMS}`,
      },
    ],
  },
  // HERO GESSO — image-to-video do retrato aprovado ap-02.png (contraluz com
  // rim glow, olhos vazios, simetria radial). Mesma regra dos outros heroes:
  // pedra não vira carne, olhos vazios, câmera travada, só luz e poeira. O nome
  // começa com "hero" pra run() NÃO prependir o STYLE_LOCK (trava é só VASO).
  heroAp: {
    out: "v-ap-hero.mp4",
    content: [
      {
        type: "image_url",
        image_url: {
          url: `data:image/png;base64,${fs.readFileSync(path.resolve("assets/apolo/ap-02.png")).toString("base64")}`,
        },
      },
      {
        type: "text",
        text: `An ancient Greek marble bust of Apollo, youthful and beardless, empty carved eye sockets, marble surface with fine cracks and chisel marks, positioned on the right third of the frame, emerging from pure black darkness. Wide cinematic 16:9 composition with deep black empty space on the left side. A single warm golden light slowly breathes across the sculpture from above, like sunlight at dawn; slow shifting highlights and deep shadows, chiaroscuro. Fine dust particles drift through the light beam. Static locked camera, no camera movement, no zoom, no pan. The stone never becomes flesh, the eyes remain empty carved stone, no blinking, no facial expression, no body movement. Slow, solemn, ceremonial. Pure black background, no museum, no room, no walls, no text. --ratio 16:9 --duration 5 --resolution 720p --camerafixed true`,
      },
    ],
  },
};

async function submit(job, model) {
  const res = await fetch(`${BASE}/contents/generations/tasks`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, content: job.content }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error?.message || `HTTP ${res.status}`);
    err.code = data?.error?.code;
    throw err;
  }
  return data.id;
}

async function poll(id) {
  for (;;) {
    await new Promise((r) => setTimeout(r, 15000));
    const res = await fetch(`${BASE}/contents/generations/tasks/${id}`, {
      headers: { Authorization: `Bearer ${KEY}` },
    });
    const data = await res.json();
    if (data.status === "succeeded") return data.content?.video_url;
    if (data.status === "failed") throw new Error(data.error?.message || "task failed");
    process.stdout.write(".");
  }
}

async function run(name) {
  const job = JOBS[name];
  // Beats VASO (jobs "b*") e o templo recebem a trava de paleta; heroes e a
  // paisagem da TESE, não.
  const content = job.content.map((c) =>
    c.type === "text" && (name.startsWith("b") || name.startsWith("templo")) ? { ...c, text: STYLE_LOCK + c.text } : c
  );
  let lastErr;
  for (const model of MODELS) {
    try {
      const id = await submit({ content }, model);
      console.log(`[${name}] task ${id} (${model})`);
      const url = await poll(id);
      const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
      fs.writeFileSync(path.join(OUT_DIR, job.out), buf);
      console.log(`\n[${name}] OK → assets/videos/${job.out} (${(buf.length / 1e6).toFixed(1)} MB)`);
      return;
    } catch (e) {
      lastErr = e;
      // Erro na SUBMISSÃO (modelo/modo/parâmetro recusado): tenta o próximo
      // modelo. Erro depois de aceita (polling/geração) não adianta re-submeter.
      console.log(`[${name}] ${model} recusou (${e.message}), tentando próximo…`);
      continue;
    }
  }
  console.error(`\n[${name}] FALHOU: ${lastErr?.message}`);
  process.exitCode = 1;
}

const names = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const modelArg = process.argv.slice(2).find((a) => a.startsWith("--model="));
if (modelArg) MODELS.splice(0, MODELS.length, modelArg.slice(8));
const selected = names.includes("all") || names.length === 0 ? Object.keys(JOBS) : names;
for (const n of selected) {
  if (!JOBS[n]) {
    console.error(`job desconhecido: ${n}`);
    process.exit(1);
  }
}
await Promise.all(selected.map(run));
