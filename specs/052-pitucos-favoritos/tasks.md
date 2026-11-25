# Tasks 052
- [x] T01 Lógica pura en `lib/favoritos.mjs` con pruebas (6 nuevas; 17 en total pasan).
- [x] T02 `FavoritosProvider` (carga tras hidratar, tolerante a errores).
- [x] T03 Corazón en la tarjeta (CA1).
- [x] T04 Botón en cabecera + panel de favoritos con agregar al pedido, talla y vacío (CA2, CA3).
- [x] T05 Privacidad y service worker v3 (CA5, CA6).
- [x] T06 Compuerta UI: `tsc` 0, `npm test` 17/17, build OK, detector sin hallazgos nuevos, render 390 y 1440 mirado.

## Correcciones tras revisión (24-nov-2026)
- [x] T07 P1 acceso: barra fija inferior (móvil) con favoritos, también sin pedido; botón en la cabecera del aside (escritorio); un solo diálogo con estado en `FavoritosProvider`; corazón de cabecera se queda como segundo acceso.
- [x] T08 P2 `/privacidad`: "Ver en la tienda" en vez de "Agregar al pedido".
- [x] T09 P2 foco: `sobre-oscuro` en el `<header>` (anillo mostaza medido `rgb(247,183,77)`).
- [x] T10 WCAG 2.5.3: sin `aria-label` que pise el texto en "Agregar al pedido"; en el catálogo el nombre accesible ahora empieza con el texto visible.
- [x] T11 Aviso "En tu pedido: n, talla X" (deriva del pedido real).
- [x] T12 Estado vacío con "Ir a la tienda". (Corregido en la 2.ª revisión: la 1.ª versión usaba un temporizador y `onCloseAutoFocus` deshacía el desplazamiento al abrir desde la cabecera; no estaba realmente probado desde ese acceso.) Ahora `irATienda` (ref) se activa antes de cerrar y `onCloseAutoFocus` lleva a `#catalogo` y enfoca `#t-catalogo`.
- [x] T13 Origen del foco = `e.currentTarget` del acceso (Safari/iOS no enfoca al tocar); si el origen se desconecta (la barra cambia de variante) el foco vuelve al acceso de favoritos visible (`data-acceso-favoritos`).
- Probado tras cerrar (2 s, con `.focus()` antes del clic): desde cabecera y barra a 390 y desde cabecera y aside a 1440, `scrollY` 975 (390) y 836 (1440), foco en `#t-catalogo`; origen desconectado: foco en "Favoritos, 1 producto".
- Sin cambios de lógica pura: pruebas siguen 17/17. `VERSION` del SW ya era v3 respecto a `main`.

## Probado
Recorrido con clics reales (CDP sobre chromium, 390x844 y 1440x900; capturas `v2-*`): marcar dos corazones a mitad del catálogo y ver el contador en la barra inferior sin subir; abrir desde la barra (390) y desde el aside (1440); agregar sin talla (error), con talla, segundo toque ("En tu pedido: 2"); vaciar y estado vacío; "Ir a la tienda"; panel en `/privacidad`; foco devuelto al acceso; anillo de foco en cabecera. Antes: marcar/desmarcar, persistencia tras recarga, id inexistente descartado, agregar desde favoritos (error sin talla; con talla entra a `pitucos-pedido-v1`), vaciar y estado vacío, sin desborde horizontal a 390 y 1440, targets 44x44.
## No probado
Teléfono real; lector de pantalla; `localStorage` bloqueado en el navegador (cubierto solo por try/catch y pruebas de la lógica); navegación por teclado completa (foco de Radix confiado).
