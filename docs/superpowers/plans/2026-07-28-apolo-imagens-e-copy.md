# Apolo — imagens e copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Exibir integralmente as artes das notas de Apolo e remover toda sobreposição de copy sobre as imagens dos cinco atos.

**Architecture:** `NotaCritica` recebe uma opção explícita para renderizar um pôster estático em proporção nativa, usada somente por `ApoloArc`. Os atos de Apolo deixam de usar arte absoluta com véu e passam a ter três blocos em fluxo normal: imagem 16:9, faixa editorial de texto e navegação.

**Tech Stack:** React 19, Tailwind CSS v4, Motion.

## Global Constraints

- Copy e comentários do repositório permanecem em pt-BR.
- Não adicionar biblioteca de animação.
- Manter `prefers-reduced-motion`.
- Não alterar o comportamento visual das notas de outros deuses.
- Validar com `npm run build`.

---

### Task 1: Painéis integrais nas notas de Apolo

**Files:**
- Modify: `src/components/NotaCritica.jsx`
- Modify: `src/components/ApoloArc.jsx`

**Interfaces:**
- Consumes: `nota.painel.poster` e `nota.painel.legenda`.
- Produces: prop opcional `painelIntegral: boolean` em `NotaCritica`.

- [ ] **Step 1: Registrar a condição estrutural que falha hoje**

Run:

```powershell
rg -n "aspect-\\[1920/1088\\]|object-cover|PainelVaso" src/components/NotaCritica.jsx src/components/PainelVaso.jsx
```

Expected: o painel compartilhado usa proporção panorâmica e `object-cover`, incompatíveis com os pôsteres quadrados de Apolo.

- [ ] **Step 2: Implementar o modo integral**

Em `NotaCritica`, adicionar `painelIntegral = false` à assinatura. Quando ativo, renderizar:

```jsx
<img
  src={nota.painel.poster}
  alt={nota.painel.legenda}
  className="block h-auto w-full"
/>
```

Quando inativo, manter `PainelVaso` sem mudanças.

- [ ] **Step 3: Ativar somente na página de Apolo**

Na montagem das notas em `ApoloArc`, passar:

```jsx
<NotaCritica
  nota={nota}
  irPara={irPara}
  paleta={PALETA_NOTA}
  painelIntegral
/>
```

- [ ] **Step 4: Verificar o isolamento**

Run:

```powershell
rg -n "painelIntegral" src/components/NotaCritica.jsx src/components/ApoloArc.jsx src/components
```

Expected: a prop é definida em `NotaCritica` e ativada somente em `ApoloArc`.

### Task 2: Atos com imagem e texto em blocos separados

**Files:**
- Modify: `src/components/ApoloArc.jsx`

**Interfaces:**
- Consumes: `cena.art`, `cena.alt`, `cena.focus`, `cena.copy.cols` e a progressão de scroll existente.
- Produces: estrutura de ato em fluxo `Arte → CopyCena → NavCena`.

- [ ] **Step 1: Registrar as sobreposições atuais**

Run:

```powershell
rg -n "lg:absolute lg:inset-0|<Veu|ap-copy|lg:absolute lg:inset-x-0 lg:bottom-0" src/components/ApoloArc.jsx
```

Expected: arte absoluta, véu, copy sobreposta e navegação absoluta aparecem no componente atual.

- [ ] **Step 2: Tornar a arte um bloco panorâmico próprio**

Alterar `Arte` para usar um contêiner em fluxo normal:

```jsx
className="relative aspect-video w-full overflow-hidden bg-[#070706]"
```

Manter a imagem, foco, movimento e efeitos solares. Remover os dois véus.

- [ ] **Step 3: Mover a copy para uma faixa editorial**

Em `Cena`, substituir a camada sobreposta por:

```jsx
<div className="relative z-10 border-t border-gesso/10 bg-[#070706] px-6 py-12 md:px-12 md:py-14 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:px-16 lg:py-16">
  <div className={cena.copy.cols}>
    <CopyCena cena={cena} surge={surge} />
  </div>
</div>
```

Remover o uso de `VERTICAL` e da classe de sombra `ap-copy`.

- [ ] **Step 4: Colocar a navegação no fluxo**

Remover as classes absolutas de desktop de `NavCena` e manter uma borda superior consistente em todas as larguras.

- [ ] **Step 5: Remover código sem uso**

Excluir `VERTICAL` e a função `Veu`, que deixam de ter consumidores.

- [ ] **Step 6: Verificar a estrutura**

Run:

```powershell
rg -n "function Veu|VERTICAL|<Veu|lg:absolute lg:inset-0|ap-copy" src/components/ApoloArc.jsx
```

Expected: nenhum resultado.

### Task 3: Validação final

**Files:**
- Verify: `src/components/NotaCritica.jsx`
- Verify: `src/components/ApoloArc.jsx`

**Interfaces:**
- Consumes: implementação das Tasks 1 e 2.
- Produces: build de produção válido.

- [ ] **Step 1: Conferir os cinco pôsteres de nota**

Run:

```powershell
Get-ChildItem public/assets/apolo/nota_*.png | Select-Object Name,Length
```

Expected: cinco arquivos de imagem não vazios.

- [ ] **Step 2: Executar o build**

Run:

```powershell
npm run build
```

Expected: Vite encerra com código 0.

- [ ] **Step 3: Revisar o diff restrito**

Run:

```powershell
git diff -- src/components/NotaCritica.jsx src/components/ApoloArc.jsx
```

Expected: apenas o modo integral das notas e a separação entre imagem, texto e navegação.
