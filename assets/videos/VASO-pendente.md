# 4 vídeos VASO — prontos pra disparar (falta só crédito)

As 4 bases já estão **subidas e confirmadas** no Higgsfield. Quando o crédito voltar
(cada vídeo = 7.5 créditos, total ~30), é só disparar `generate_video` com o `media_id`
correspondente e o prompt abaixo. Não precisa subir nada de novo.

> Se os `media_id` tiverem expirado quando você voltar, eu re-subo em segundos —
> o upload não custa crédito.

## Template VASO (do doc §6, inalterado)
```
animate this greek vase painting with minimal frame-by-frame motion. [MOVIMENTO].
keep the style absolutely flat, no added depth, no 3D, no shading. the black
background and meander border stay completely static. short seamless loop.
```

## Os 4 jobs (modelo kling3_0, sound off, 5s)

| Vídeo | Base | media_id | Movimento |
|---|---|---|---|
| **V-P1** | Z-06 | `e6360443-174c-4491-84b2-522de14f5e49` | the smiths' hammers rise and fall on the anvil; the flat sparks blink on and off with each strike; nothing else moves |
| **V-P2** | AT-03 | `565b0693-fcd4-4f9e-a26b-ab1785e171ea` | the crack in the seated figure's skull slowly opens and the small armed warrior emerges a little further; then holds |
| **V-P3** | AF-03 | `6fc69437-1c69-42cc-99f0-1be036453b01` | the flat wave lines slide horizontally in a loop; the scallop shell rises and dips gently |
| **V-P4** | DI-03 | `cc71d10d-0ee9-4434-a107-dbc06f05ddf7` | the frenzied figures tremble and jitter in a deliberately misaligned loop, like an old flickering gif |

**Nota de estilo:** o VASO é o oposto do GESSO — aqui o risco é o modelo **adicionar
profundidade/3D** no que deve ser chapado. O `keep absolutely flat, no 3D, no shading` +
`meander border stays static` combate isso. Se algum sair com volume, baixar o cfg / reforçar
"flat 2D animation, paper cutout, no depth".

Com esses 4, o projeto fecha os **16 vídeos** (12 GESSO já prontos em `assets/videos/`).
