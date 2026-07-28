# Apolo — imagens integrais e copy sem sobreposição

## Objetivo

Preservar a leitura das artes de Apolo. As imagens das notas devem exibir a
moldura grega completa; as imagens panorâmicas dos atos não devem ser cobertas
por títulos, parágrafos ou véus escuros.

## Notas críticas

- Manter a arte na proporção quadrada original.
- Trocar o recorte por uma exibição integral, sem `object-cover`.
- Remover a borda fina aplicada pelo componente ao redor da mídia.
- Manter legenda e prosa abaixo da imagem, sem sobreposição.
- Não alterar o comportamento das notas de outros deuses.

## Atos principais

- Cada ato começa com uma prancha panorâmica 16:9 em largura total.
- A imagem ocupa uma área própria, sem copy e sem os véus usados para dar
  contraste ao texto sobreposto.
- Os efeitos solares continuam sobre a arte quando não escondem personagens.
- Título, subtítulo e parágrafo passam para uma faixa editorial preta logo
  abaixo da imagem.
- A navegação fica no final dessa faixa textual.
- Em telas pequenas, a ordem permanece imagem, texto e navegação.

## Responsividade e movimento

- A imagem panorâmica conserva sua proporção em desktop e mobile.
- Não introduzir nova biblioteca de animação.
- Manter o respeito a `prefers-reduced-motion`.
- A mudança deve ficar restrita à página de Apolo e à apresentação de seus
  painéis de nota.

## Validação

- Confirmar que as cinco molduras das notas aparecem completas.
- Confirmar que nenhuma copy cobre as cinco artes dos atos.
- Confirmar que não existe borda clara externa nas artes das notas.
- Executar `npm run build`.
