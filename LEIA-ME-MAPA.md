# Projeto de mapa — como usar

## Arquivos
- `index.html` — o jogo (já lê o mapa personalizado).
- `editor-mapa.html` — o editor visual (abre no navegador, funciona no celular).

## Fluxo rápido
1. Abra `editor-mapa.html` (no mesmo endereço do jogo).
2. Escolha uma ferramenta embaixo: Selecionar/Mover, Parede, Moita, Animal, Torre, Apagar.
   - Parede: arraste de um ponto a outro. Moita/Animal/Torre: toque no mapa.
   - Selecionar: toque num item para editar números (posição, tamanho, alcance, vida...).
   - Apagar: toque no item. Desfazer: botão ↶.
   - Espelhar: com a opção ligada, tudo que você cria/move/apaga no lado azul vira cópia no vermelho (e vice-versa).
3. Alcance do Nexus: toque no 💎, mude "Alcance do Nexus". O círculo tracejado mostra o alcance real.
4. **▶ Testar no jogo** grava o mapa neste aparelho e abre o jogo com ele.
5. Para valer para todos os jogadores: **📤 Exportar**, copie o JSON e cole em `window.NM_MAP=` no começo do `index.html` (no lugar de `null`).
6. **⟲ Mapa padrão** restaura o mapa original (e apaga o teste salvo).

## Formato do JSON (versao 1)
```
{
 "versao":1,
 "paredes":[[x,z,comprimento,angulo_rad,espessura,decorativa(0/1)], ...],
 "moitas":[[x,z,raio], ...],
 "acampamentos":[{"x":0,"z":11,"tipo":"boss"}, ...],
 "torres":[{"team":"b|r","lane":-1|0|1,"tier":1|2,"x":-7,"z":-12.55,"range":3.9,"hp":1800}, ...],
 "nexus":{"b":{"x":-23.5,"z":0,"range":7.5},"r":{"x":23.5,"z":0,"range":7.5}}
}
```
- Coordenadas em "unidades base" (o jogo multiplica por 1,5). Limite da arena: x ±25,8 / z ±26,2.
- Tipos de animal: pequeno, medio, grande, buff_azul, buff_vermelho, boss, rio.
- lane: -1 topo, 0 meio, 1 baixo. tier 1 = torre externa; tier 2 = interna (só fica vulnerável quando a externa da mesma rota cai).
- Alcance: o jogo multiplica o valor por 1,15 (torre) e 1,4 (Nexus). O círculo do editor já mostra o valor final.
- Se uma lista não existir no JSON, o jogo usa o padrão daquela parte. Se existir (mesmo vazia), ela substitui o padrão. Ex.: `"acampamentos":[]` = mapa sem animais.

## Observações
- O Nexus não pode ser apagado, só movido. Sem torres (`"torres":[]`) o Nexus fica vulnerável de início.
- Ao mudar o `index.html` ou o editor, troque o `VERSION` em `sw.js` (ex.: `neomundi-v3`) para o app avisar "Nova versão".
