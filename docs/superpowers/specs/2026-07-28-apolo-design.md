# Apolo — design editorial aprovado

## Objetivo

Transformar `/apolo` numa página editorial imersiva com a mesma arquitetura
aprovada em Hermes: hero, manifesto, capítulos, notas críticas intercaladas,
legado, colofão, índice dos doze tronos e menu navegável por nomes.

O arco não usa os vídeos `v-apolo-b1…b5`. As notas usam as novas imagens
estáticas de figuras vermelhas e as cenas usam as novas xilogravuras
horizontais.

## Direção visual

- **Assunto:** Apolo como deus da luz, da medida, da música e da profecia.
- **Tarefa da página:** mostrar que a mesma precisão que organiza também pune.
- **Paleta:** preto solar `#070706`, ouro `#E5C687`, ouro claro `#F4E2B0`,
  bronze profundo `#A87424` e marfim `#F6E8C8`.
- **Tipografia:** as famílias já definidas no projeto; display monumental para
  teses, corpo clássico para narrativa e UI espaçada para aparato e navegação.
- **Assinatura:** um eixo vertical de luz e halos lineares, sempre controlados.
  Hermes atravessa na diagonal; Apolo ordena pelo centro.
- **Movimento:** push-in lento nas imagens e respiração luminosa. Nenhum vídeo,
  nenhuma nova biblioteca e nenhuma animação quando
  `prefers-reduced-motion: reduce`.

## Arquitetura narrativa

1. **Hero** — nova imagem solar de Apolo com lira e arco.
2. **Manifesto** — retrato de gesso `ap-02.png`, sem vídeo.
3. **Nascimento em Delos** — xilogravura + nota de figuras vermelhas.
4. **A serpente de Delfos** — xilogravura + nota de figuras vermelhas.
5. **Dafne e o loureiro** — xilogravura + nota de figuras vermelhas.
6. **Mársias e o desafio** — xilogravura + nota de figuras vermelhas.
7. **Cassandra e a profecia ignorada** — xilogravura + nota de figuras vermelhas.
8. **Legado** — verdade, medida e distância.
9. **Colofão** — bibliografia derivada das notas e passagem ao Panteão.

## Mapeamento de assets

### Hero e cenas

| Origem | Nome canônico | Uso |
|---|---|---|
| `02_01_35 AM (1)` | `apolo_hero_da_luz_e_da_musica.png` | hero |
| `ap-02.png` | mantido | manifesto |
| `02_01_35 AM (2)` | `o_nascimento_de_apolo_em_delos.png` | capítulo I |
| `02_01_36 AM (3)` | `apolo_derrota_piton_em_delfos.png` | capítulo II |
| `02_01_37 AM (5)` | `dafne_se_torna_loureiro.png` | capítulo III |
| `02_01_37 AM (6)` | `o_concurso_de_apolo_e_marsias.png` | capítulo IV |
| `02_01_36 AM (4)` | `cassandra_diante_da_profecia.png` | capítulo V |

### Notas

| Origem | Nome canônico | Nota |
|---|---|---|
| `nascimento.png` | `nota_nascimento_em_delos.png` | I |
| `02_01_25 AM (2)` | `nota_apolo_e_piton.png` | II |
| `02_01_26 AM (4)` | `nota_dafne_e_o_loureiro.png` | III |
| `02_01_26 AM (5)` | `nota_apolo_e_marsias.png` | IV |
| `02_01_25 AM (3)` | `nota_cassandra_e_o_oraculo.png` | V |

Todos os nomes canônicos devem existir em `assets/apolo/` e em
`public/assets/apolo/` com bytes idênticos.

## Conteúdo e fontes

- Nascimento e Delos: `Hino Homérico a Apolo`, 1–18 e 19–126.
- Delfos: `Hino Homérico a Apolo`, 179–374, e `Biblioteca`, I.4.1.
- Dafne: Ovídio, `Metamorfoses`, I.452–567. A nota declara que essa forma da
  narrativa é romana e tardia.
- Mársias: Apolodoro, `Biblioteca`, I.4.2.
- Cassandra: Apolodoro, `Biblioteca`, III.12.5.

As notas separam o que a fonte afirma da leitura visual. Divergências e fontes
tardias permanecem visíveis, seguindo o padrão crítico de Atena, Poseidon e
Hermes.

## Navegação

- Cabeçalho fixo `OLIMPO / APOLO`.
- Índice vertical `06 / 12` nas duas primeiras telas em desktop.
- Botão `MENU` permanente no mobile e, no desktop, após o manifesto.
- Menu em duas colunas: passagens do arco e os doze tronos.
- Nomes com página existente usam `react-router-dom`; tronos ainda sem página
  aparecem desabilitados.
- Clicar num capítulo fecha o menu, rola até a seção e move o foco.

## Responsividade e acessibilidade

- Desktop: arte full-bleed e copy em grade de doze colunas.
- Mobile: arte acima da copy, sem cortar atributos essenciais.
- Textos alternativos descrevem personagens, instrumentos e ação.
- Alvos interativos têm no mínimo 48 px e foco visível.
- O menu prende o foco, fecha com Escape e devolve o foco ao gatilho.
- A preferência de movimento reduzido elimina animações não essenciais.

## Critérios de aceitação

- Nenhum `v-apolo-b*.mp4` aparece na página.
- Cinco capítulos e cinco notas estáticas aparecem na ordem definida.
- O hero, manifesto, cenas, notas, legado e colofão são navegáveis pelo menu.
- O índice dos doze tronos funciona como em Hermes, Poseidon e Atena.
- Todos os assets respondem HTTP 200.
- `npm run build` termina com código zero.
- Desktop e mobile não apresentam overlay de erro, imagens quebradas ou
  conteúdo oculto pela navegação fixa.

