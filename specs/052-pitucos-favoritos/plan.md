# Plan 052
- `lib/favoritos.mjs` (+ `.d.mts`): lógica pura (alternar, leer/validar, serializar, tope 100). Pruebas en `tests/favoritos.test.mjs`.
- `components/FavoritosProvider.tsx`: contexto con `useState`; carga en `useEffect` tras hidratar y guarda solo después de cargar (mismo patrón que `PedidoProvider`). Sin Zustand ni dependencias nuevas.
- `components/Catalogo.tsx`: botón `.corazon` sobre la foto, esquina superior derecha (no tapa nombre ni precio).
- `components/PanelFavoritos.tsx`: `BotonFavoritos` en la cabecera (única entrada, visible en toda página y en móvil sin barra extra; la barra fija inferior solo existe con pedido) + diálogo Radix. Hoja inferior en móvil, columna lateral desde 1024 px (`.hoja-lateral`).
- Cabecera: logo a h-11 bajo 420 px para que quepan los dos enlaces y el corazón.
- Motion: solo `scale`/`fill` del corazón, dentro de `prefers-reduced-motion: no-preference`.
- `/privacidad` con párrafo nuevo; `public/sw.js` `VERSION` = `pitucos-v3`.
- Guía de plataforma (mwg): botón de alternancia = `<button aria-pressed>` nativo; diálogo = Radix (ya resuelto en el repo).
