# Página de Hermes — especificação de design

## Objetivo

Elevar a rota `#/hermes` ao mesmo nível editorial, visual e técnico das páginas aprovadas de Atena e Poseidon, preservando a identidade própria de Hermes: juventude, velocidade, inteligência, comunicação e passagem entre mundos.

A página deve reutilizar todos os vídeos existentes de Hermes e as seis imagens narrativas aprovadas. Nenhum vídeo ou imagem será regenerado, redesenhado ou substituído.

## Direção aprovada

A página seguirá uma estrutura editorial híbrida:

- arte estática aprovada como base das cenas narrativas;
- vídeo de hero como manifesto imediatamente após a abertura;
- vídeos dos cinco beats como pranchas audiovisuais dentro das notas críticas;
- copy sobre a arte no desktop;
- arte e copy empilhadas no mobile;
- navegação, aparato crítico e colofão coerentes com Atena e Poseidon;
- movimento baseado apenas em `motion`, transform e opacity;
- suporte completo a `prefers-reduced-motion`.

O hero será estático e usará `ChatGPT Image Jul 28, 2026, 12_34_33 AM (1).png`. O vídeo `v-hermes-hero.mp4`, atualmente usado no hero, será preservado e aparecerá logo depois da abertura como manifesto visual.

## Estrutura narrativa

### 1. Hero — Hermes em movimento

- Arte: `ChatGPT Image Jul 28, 2026, 12_34_33 AM (1).png`.
- Conteúdo: trono, nome, epíteto, introdução curta e CTA.
- Composição desktop: texto na área livre à esquerda; Hermes preservado no centro e à direita.
- Composição mobile: recorte dirigido para rosto, pétaso, caduceu e gesto; copy abaixo da imagem se o espaço vertical não comportar a sobreposição com legibilidade.
- Assinatura de movimento: deslocamento diagonal mínimo, rastro âmbar e entrada rápida da tipografia.

### 2. Manifesto em vídeo — o deus das passagens

- Vídeo: `v-hermes-hero.mp4`.
- Reprodução automática somente quando visível, sem áudio, em loop e com `playsInline`.
- Apresenta Hermes como deus do movimento, das fronteiras, das mensagens, das trocas e dos caminhos entre vivos e mortos.
- Mensagem em HTML sobre o vídeo: “Entre um mundo e outro, sempre existe uma passagem.”
- Mantém as linhas diagonais existentes de Hermes com intensidade reduzida.

### 3. Ato I — o nascimento de Hermes

- Arte: `o_abrigo_da_luz_celestial.png`.
- Tema: Maia, o bebê escondido e a tartaruga como prenúncio da lira.
- Fonte principal: *Hino Homérico a Hermes*.

### 4. Ato II — o roubo do gado de Apolo

- Arte: `a_noite_de_hermes_com_o_gado.png`.
- Tema: o rebanho conduzido à noite, as pegadas desviadas e a inteligência precoce.
- A nota crítica posterior recebe `v-hermes-b1.mp4` como prancha audiovisual.

### 5. Ato III — a lira entregue a Apolo

- Arte atual: `ChatGPT Image Jul 28, 2026, 12_58_44 AM (1).png`.
- Nome canônico servido: `hermes_apresenta_a_lira_a_apolo.png`.
- Tema: reconciliação, música, troca e transformação do conflito em aliança.
- A nota crítica posterior recebe `v-hermes-b2.mp4` como prancha audiovisual.

### 6. Ato IV — Hermes e Argos

- Arte: `o_herói_e_o_gigante_adormecido.png`.
- Tema: música, sono, Io como vaca e vitória pela astúcia.
- A nota crítica posterior recebe `v-hermes-b3.mp4` como prancha audiovisual.

### 7. Ato V — Hermes Psicopompo

- Arte atual: `guia de passagem.png`.
- Nome canônico servido: `guia_das_almas_para_o_portal.png`.
- Tema: Hermes conduzindo as almas até o limite do mundo dos mortos.
- A nota crítica posterior recebe `v-hermes-b4.mp4` como prancha audiovisual.

### 8. Seção conceitual — o deus que atravessa os mundos

- Arte atual: `ChatGPT Image Jul 28, 2026, 12_58_44 AM (2).png`.
- Nome canônico servido: `o_mensageiro_entre_dois_mundos.png`.
- Tema: Olimpo, terra e submundo como territórios conectados pela passagem de Hermes.
- A nota crítica posterior recebe `v-hermes-b5.mp4` como prancha audiovisual e abre o tema do legado.

### 9. Legado — aquele que sempre chega

- Síntese dos episódios em que Hermes cruza limites, entrega mensagens ou conduz alguém a salvo.

### 10. Colofão

- Fontes consolidadas, créditos e passagem para outro trono.
- Reutiliza `Colofao`.

## Uso dos vídeos

Os vídeos dos cinco beats não serão controlados por scrub. A inspeção técnica mostrou apenas um keyframe em cada arquivo, o que torna seeks frequentes suscetíveis a travamentos. Eles entrarão nas notas pelo mesmo padrão das pranchas audiovisuais de Poseidon.

Eles serão preservados sem reencodificação e usados assim:

- `preload="metadata"`;
- carregamento quando a prancha se aproxima da viewport;
- reprodução uma única vez ao entrar na tela;
- pausa ao sair, mantendo o ponto alcançado;
- apenas um vídeo em reprodução por vez;
- `muted`, `playsInline` e sem controles;
- pôster extraído do primeiro quadro do próprio vídeo para evitar tela preta e atender `prefers-reduced-motion`;
- falha de carregamento não remove a copy nem impede a navegação.

O mapeamento será:

- nota do roubo do gado: `v-hermes-b1.mp4`;
- nota da lira: `v-hermes-b2.mp4`;
- nota de Argos: `v-hermes-b3.mp4`;
- nota de Hermes Psicopompo: `v-hermes-b4.mp4`;
- nota da travessia e do legado: `v-hermes-b5.mp4`.

A nota do nascimento será textual, porque não existe um sexto beat correspondente. Os pôsteres serão quadros derivados dos próprios vídeos, não novas ilustrações.

## Arquitetura

### Dados

`src/data/gods.js` continuará sendo a fonte única de verdade. A configuração de Hermes será ampliada para declarar:

- cenas;
- caminhos de arte e vídeo;
- alt text;
- posições focais para desktop e mobile;
- posição e alinhamento da copy;
- timeline de entrada;
- notas críticas;
- colofão.

### Componente da página

`src/components/HermesArc.jsx` será reorganizado em unidades locais com responsabilidades claras:

- navegação e cena ativa;
- cabeçalho e menu;
- arte responsiva;
- copy da cena;
- efeitos atmosféricos;
- painel audiovisual das notas;
- manifesto em vídeo.

Serão reutilizados:

- `DustCanvas`;
- `NotaCritica`;
- `Colofao`;
- `PainelVaso`, com suporte opcional a fonte MP4 única;
- o controle de reprodução única já presente em `PainelVaso`;
- padrões de foco, navegação e responsividade já aprovados.

O comportamento padrão de `PainelVaso` continuará aceitando WebM e MP4 para Poseidon. Hermes declarará somente o MP4 disponível, sem gerar requisição 404 para um WebM inexistente. Não será criada uma abstração global que obrigue mudanças visuais em Atena ou Poseidon. Os menus dessas páginas têm diferenças estruturais e refatorá-los não é necessário para Hermes.

### Estilos

`src/index.css` receberá apenas classes e keyframes com prefixo `hm-`. Nenhuma regra global ou paleta de outra página será alterada.

## Identidade visual e movimento

- Paleta: preto profundo, gesso, bronze e âmbar.
- Tipografia: mantém `Cinzel Decorative`, `Cormorant Garamond` e `Inter`.
- Direção: diagonais, rastros, deslocamento lateral e mudanças de limiar.
- Movimento principal: a sensação de atravessar, não de combater.
- Hermes não terá peso, tremor ou impacto de guerreiro.
- A intensidade ficará concentrada nas transições de vídeo e no rastro do hero; as cenas narrativas terão movimento contido.

## Responsividade

### Desktop

- cenas com altura mínima de `100svh`;
- arte full-bleed;
- grade de doze colunas;
- copy posicionada conforme a área livre de cada composição;
- véu direcional em vez de overlay uniforme;
- menu e índice dos tronos seguindo o contrato de Atena/Poseidon.

### Tablet e mobile

- arte acima e copy abaixo quando a sobreposição comprometer a leitura;
- altura da arte definida por cena;
- `object-position` específico para preservar rostos, lira, tartaruga, gado, Io, Argos, almas e portal;
- navegação com alvos mínimos de 48 px;
- texto sem ultrapassar a largura da viewport;
- menu substitui o rail lateral.

## Conteúdo e fontes

A copy será séria, narrativa e acessível. Os principais eixos documentais serão:

- *Hino Homérico a Hermes* para nascimento, gado e lira;
- Apolodoro e a tradição de Hermes Argeifontes para Argos;
- *Odisseia* XXIV e a tradição de Hermes Psicopompo para a condução das almas;
- referências homéricas e hínicas para a função de mensageiro e guia.

As referências aparecerão em notas críticas compactas e no colofão. Divergências entre tradições serão declaradas em vez de resolvidas por invenção.

## Acessibilidade e falhas

- landmarks e títulos associados por `aria-labelledby`;
- alt text descritivo em todas as cenas;
- link “Ir para o conteúdo”;
- foco devolvido ao gatilho após fechar o menu;
- navegação por teclado;
- contraste garantido por véus direcionais e text-shadow contido;
- ausência de vídeo não esconde texto nem controles;
- `prefers-reduced-motion` elimina loops decorativos e transições dirigidas.

## Arquivos previstos

- `src/data/gods.js`;
- `src/components/HermesArc.jsx`;
- `src/components/PainelVaso.jsx`, apenas para aceitar uma lista opcional de formatos;
- `src/index.css`;
- `assets/hermes/`, para nomes canônicos das imagens aprovadas e pôsteres extraídos dos vídeos existentes;
- `public/assets/hermes/`, como espelho servido pelo Vite.

`src/App.jsx`, Atena e Poseidon não precisam ser alterados.

## Validação

1. Conferir visualmente todas as cenas e seus assets.
2. Confirmar que as seis imagens narrativas aparecem uma vez cada.
3. Confirmar hero estático e manifesto inicial com `v-hermes-hero.mp4`.
4. Confirmar os cinco vídeos de beats dentro das cinco notas correspondentes.
5. Inspecionar desktop em 1440 × 1000.
6. Inspecionar mobile em 390 × 844.
7. Testar navegação por teclado e reduced motion.
8. Verificar console, imports e caminhos de assets.
9. Executar `npm run build`.

O projeto não possui scripts de lint ou testes automatizados configurados; a ausência será registrada na entrega sem fingir que esses comandos existem.
