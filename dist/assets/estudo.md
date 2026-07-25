# OLIMPO — estudo das ressalvas

As 4 ressalvas que ficaram registradas em assets aprovados. Nenhuma **bloqueia** —
todos os 47 assets estão instalados. São ajustes de fidelidade ao mito ou à direção
de arte. Aqui está o que é cada uma, o quanto pesa, e como resolver.

Ordenadas da mais fácil de resolver para a mais estrutural.

---

## 1. AF-01 → borda de ondas em vez de meandro — **pode ser resolvida no vídeo, você tem razão**

**O que é:** o selo da Afrodite pede `wave border, curved lines only` (a regra dela é
"curvas, nenhuma linha reta"). A versão do lote 2 já corrigiu isso — veio com borda de
ondas. **Esta ressalva já caiu.** Ficou aqui só porque você levantou o ponto da borda.

**Sobre "a borda pode ser resolvida pelo vídeo":** sim, e é uma boa intuição — mas com
um limite. O que o vídeo resolve é **borda estática que ganha vida**: numa animação VASO,
o template manda `the black background and meander border stay completely static`. Ou seja,
hoje a borda fica **parada** de propósito. Se você quiser, dá pra inverter isso em casos
pontuais e fazer a borda **fluir** — ondas da Afrodite ondulando de leve, o meandro do
Hermes "correndo" na diagonal. Isso é um efeito, não um conserto: só vale quando a borda
JÁ está correta na imagem. Uma borda errada (reta onde devia ser curva) continua errada
no vídeo — o movimento não troca a forma, só a anima. Então: borda certa + movimento = ótimo;
borda errada → tem que refazer a imagem, o vídeo não salva.

**Veredito:** nada a fazer na imagem. Anotar como ideia de animação para a Afrodite.

---

## 2. DI-01 → borda regular em vez de irregular

**O que é:** o selo do Dionísio pede `irregular border` — porque a regra dele é quebrar o
grid dos outros onze. Veio com meandro regular, igual aos demais. Perde a assinatura visual
que separa o Dionísio de todo o resto.

**Peso:** baixo-médio. Sozinho, ninguém nota. Mas o projeto inteiro se apoia em "cada deus
tem uma regra de composição, e se todas forem iguais o trabalho se perde" (§7 do doc). O
Dionísio é justamente o que deveria destoar — e não destoa.

**Como resolver:** duas saídas. (a) Regerar o selo pedindo borda deliberadamente torta /
interrompida / com a videira invadindo o meandro. (b) **Resolver no vídeo** (liga com o item 1):
o V-DI já anima o Dionísio; dá pra fazer a hera **crescer por cima da borda** e quebrá-la em
movimento — aí a irregularidade nasce da animação, não da imagem. Esta é a mais barata e a mais
"dele". Recomendo (b).

---

## 3. AT-03 → ferreiro com martelo, o mito pede machado

**O que é:** o painel do nascimento de Atena. Zeus tem uma dor de cabeça insuportável e
**Hefesto abre o crânio dele com um machado** (πέλεκυς, *pelekys*) — e Atena salta armada.
Na imagem o ferreiro segura um **martelo**, não o machado.

**Peso:** médio — é erro de mito, não de estilo. Quem conhece a história percebe: o machado
é o instrumento canônico do parto de Atena em toda a iconografia grega (a cena aparece em
vasos de figuras-negras desde o séc. VI aC, sempre com o *pelekys*). Martelo lê como forja
comum, e apaga o gesto exato do mito.

**Fonte:** o machado de Hefesto no nascimento de Atena está em Píndaro (*Olímpica* 7) e é o
padrão nos vasos áticos. Não é interpretação — é o atributo fixo da cena.

**Como resolver:** regerar o AT-03 trocando `a smith with an axe` (que já está no prompt!)
por uma ênfase mais forte — o prompt original **já pede machado**, o modelo é que trocou por
martelo. Basta reforçar: `a smith holding a large double-headed axe (labrys), not a hammer`.
Barato, uma linha.

---

## 4. HR-03 → não honra a simetria obsessiva de Hera

**O que é:** a regra de composição da Hera é "simetria obsessiva, tudo espelhado" — porque o
mito dela é sobre **legitimidade e ordem dinástica**, não ciúme (ver nota do doc). O painel de
Io e Argos veio numa composição narrativa comum, assimétrica, sem o espelhamento que deveria
ser a identidade visual dela.

**Peso:** médio. É a ressalva mais "estrutural" das quatro, porque não é um objeto errado
(martelo/machado) nem uma borda — é a **gramática da composição inteira** do painel. Corrigir
exige repensar o enquadramento, não trocar um detalhe.

**A tensão real:** simetria total briga com narrativa. Io virando vaca + Argos de cem olhos +
pavão é uma *cena*, e cena pede assimetria (alguém faz algo a alguém). O selo da Hera (HR-01,
aprovado) já carrega a simetria radial perfeita — a mandala de olhos de pavão. Talvez o painel
não precise ser espelhado se o selo já cumpre a regra.

**Como resolver:** decisão de direção, não de prompt. Duas opções:
- (a) Aceitar como está — o selo HR-01 já dá a simetria da Hera; o painel pode ser narrativo.
- (b) Regerar o painel com composição espelhada: Argos e o pavão em eixo central, Io e Hera
  como reflexos de cada lado. Mais fiel à regra, menos fiel à ação do mito.

Recomendo (a): não regerar. É a única das quatro onde "corrigir" pode piorar.

---

## Resumo

| Ressalva | Peso | Ação recomendada |
|---|---|---|
| 1. AF-01 borda | — | Já resolvida no lote 2. Nada a fazer. |
| 2. DI-01 borda irregular | baixo-médio | Resolver no **vídeo** (hera quebra a borda). |
| 3. AT-03 martelo→machado | médio | Regerar, 1 linha no prompt. Erro de mito. |
| 4. HR-03 simetria | médio | **Não** regerar — o selo HR-01 já cumpre a regra. |

Ou seja: só **uma** vale regerar imagem (AT-03). Duas se resolvem no vídeo ou já se
resolveram. Uma é melhor deixar como está.

---

## Fontes reais consultadas

- Hesíodo, *Teogonia* (c. 730–700 aC) — nascimento de Zeus, a pedra em panos, os Ciclopes
  Brontes / Steropes / Arges forjando o raio.
- Apolodoro, *Biblioteca* 1.6.3 — Tifão arranca os tendões de Zeus; Hermes e Egipã os roubam
  de volta; o Etna lançado sobre Tifão.
- Nono, *Dionisíaca* — variante: Cadmo engana Tifão pedindo os tendões "para cordas de uma lira".
- Píndaro, *Olímpica* 7 — o machado de Hefesto no nascimento de Atena.
- Convenção iconográfica ática — o *pelekys* (machado) como atributo fixo da cena de Atena.
