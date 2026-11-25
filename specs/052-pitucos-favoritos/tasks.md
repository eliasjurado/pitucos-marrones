# Tasks 052
- [x] T01 Lógica pura en `lib/favoritos.mjs` con pruebas (6 nuevas; 17 en total pasan).
- [x] T02 `FavoritosProvider` (carga tras hidratar, tolerante a errores).
- [x] T03 Corazón en la tarjeta (CA1).
- [x] T04 Botón en cabecera + panel de favoritos con agregar al pedido, talla y vacío (CA2, CA3).
- [x] T05 Privacidad y service worker v3 (CA5, CA6).
- [x] T06 Compuerta UI: `tsc` 0, `npm test` 17/17, build OK, detector sin hallazgos nuevos, render 390 y 1440 mirado.

## Probado
Marcar/desmarcar, persistencia tras recarga, id inexistente descartado, agregar desde favoritos (error sin talla; con talla entra a `pitucos-pedido-v1`), vaciar y estado vacío, sin desborde horizontal a 390 y 1440, targets 44x44.
## No probado
Teléfono real; lector de pantalla; `localStorage` bloqueado en el navegador (cubierto solo por try/catch y pruebas de la lógica); navegación por teclado completa (foco de Radix confiado).
