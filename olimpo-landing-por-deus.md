# OLIMPO — Landing por deus (estrutura do arco)

Todo deus é um **arco narrativo**, não uma ficha. Um só motor (`GodArc`): Zeus = 4 atos,
os outros 11 = 3 beats. Cada ato é 100vh, imagem/vídeo de fundo cobrindo tudo, texto por
cima com overlay escuro. A **regra de composição** do deus é aplicada em todos os atos —
é o que faz 11 seções com o mesmo motor parecerem 11 lugares diferentes.

## Os 3 beats (padrão dos 11)

| Ato | Nome | Fundo | Texto | Camada atmosférica |
|---|---|---|---|---|
| **I** | Invocação | vídeo do retrato GESSO (`v-<cod>`), a estátua respirando | nome ΓΡ gigante (Cinzel) + latino, epíteto (Cormorant italic), numeral romano em grafismo | poeira (canvas ≤30) |
| **II** | O mito | painel VASO animado (`v-p*` / novo), full-bleed | a narrativa do mito em 3-4 parágrafos; **feitos** como marginália numerada | film grain |
| **III** | O clímax | cena GESSO **nova** em vídeo — o momento real da vida dele | o "Por que isso importa" (a tese); **curiosidades** em cards sem borda com barra de acento | névoa / luz volumétrica |
| — | Transição | 60vh preto | 1 frase italic (ponte pro próximo) + selo minúsculo do próximo em opacity baixa | fade-to-black |

Zeus (4 atos) roda no mesmo motor: a pedra → os Curetes → a forja do raio → Tifão
(assets `z-03/05/07/08` + `v-z1..z4`, painéis `z-02/04/06`). É a instância máxima.

## Tabela mestre (código · numeral · acento · composição)

| Deus | Grego | Cód | Nº | Acento | Regra de composição |
|---|---|---|---|---|---|
| Zeus | Ζεύς | z | I | `#F2F2F2` branco elétrico | contra-plongée sempre; câmera nunca no nível dele |
| Hera | Ἥρα | hr | II | `#6B1F2E` vinho | simetria obsessiva, tudo espelhado |
| Poseidon | Ποσειδῶν | po | III | `#1F4A3D` verde-garrafa | horizonte inclinado, nada nivelado |
| Deméter | Δημήτηρ | de | IV | `#C9A227` trigo | horizonte baixo, muito vazio acima |
| Atena | Ἀθηνᾶ | at | V | `#6B7C3A` oliva | geometria rígida, ângulos retos, centro exato |
| Apolo | Ἀπόλλων | ap | VI | `#E5C687` ouro pálido | simetria radial, luz central ofuscante |
| Ártemis | Ἄρτεμις | ar | VII | `#B8BFC4` prata | sujeito distante e parcialmente obstruído |
| Ares | Ἄρης | ae | VIII | `#8C3A2B` ferrugem | cortado, descentrado, primeiro plano obstruindo |
| Afrodite | Ἀφροδίτη | af | IX | `#C98474` cobre-rosa | curvas, nenhuma linha reta (único com border-radius) |
| Hefesto | Ἥφαιστος | he | X | `#D96C1F` brasa | claro-escuro extremo, uma única fonte quente |
| Hermes | Ἑρμῆς | hm | XI | `#D9A441` âmbar | diagonais, limiares, sempre entre dois lugares |
| Dionísio | Διόνυσος | di | XII | `#5B2A6B` roxo | quebra as regras dos outros onze (dutch, foco errado) |

## Mapa de assets por deus (Ato I / II / III)

Retrato = `<cod>-02` · selo = `<cod>-01` · painel = `<cod>-03`. Vídeo de retrato = `v-<cod>`.
Vídeo de painel = existente (`v-p2/p3/p4`) ou a gerar (0b). Clímax GESSO = imagem+vídeo **novos** (0b).

| Deus | I: retrato→vídeo | II: painel (mito) →vídeo | III: clímax GESSO novo (0b) |
|---|---|---|---|
| Hera | hr-02 → v-hr ✅ | hr-03 → **gerar** | o trono de ouro que prende a própria mãe; simetria |
| Poseidon | po-02 → v-po ✅ | po-03 → **gerar** | o golpe na Acrópole / a fonte salgada; o deus que perdeu (tilt) |
| Deméter | de-02 → v-de ✅ | de-03 → **gerar** | o abismo que engole Perséfone; vazio alto |
| Atena | at-02 → v-at ✅ | at-03 → v-p2 ✅ | o salto armado do crânio aberto; grid rígido |
| Apolo | ap-02 → v-ap ✅ | ap-03 → **gerar** | Píton morta / a tomada do oráculo; glow radial |
| Ártemis | ar-02 → **gerar v-ar** | ar-03 → **gerar** | Actéon virando cervo, os cães saltando; obstruído |
| Ares | ae-02 → v-ae ✅ | ae-03 → **gerar** | a lança de Diomedes o fere, ele recua; cortado |
| Afrodite | af-02 → **gerar v-af** | af-03 → v-p3 ✅ | o nascimento da espuma; curvas |
| Hefesto | he-02 → v-he ✅ | he-03 → **gerar** | a queda do Olimpo / o trono-armadilha; chiaroscuro |
| Hermes | hm-02 → **gerar v-hm** | hm-03 → **gerar** | o gado levado ao contrário na noite; diagonal |
| Dionísio | di-02 → v-di ✅ | di-03 → v-p4 ✅ | as Bacantes despedaçando Penteu; quebra o grid |

✅ = já existe · **gerar** = entra no sprint 0b. Total 0b: 3 retratos + 8 painéis + 11 clímax.
