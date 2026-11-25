# Spec 052 — Favoritos (Pitucos Marrones)

**Pedido de Elías (24-nov-2026):** poder darle corazoncito a los productos y tener acceso a ese listado.
**Por qué:** el oyente decide en varias visitas; guardar lo que le gusta acorta el camino al pedido por WhatsApp.
**Fuera de alcance:** cuentas, sincronizar entre dispositivos, compartir la lista, analítica, cambios al flujo del pedido.

## Criterios de aceptación
- **CA1 · Corazón.** Dado el catálogo, cuando miro una tarjeta, entonces hay un botón con ícono SVG (lucide `Heart`), `aria-pressed`, nombre accesible "Agregar X a favoritos" / "Quitar X de favoritos", área de 44x44 px, relleno guinda al estar marcado y foco visible. Al tocarlo no agrega al pedido.
- **CA2 · Acceso siempre a la vista.** Dado el catálogo en móvil, cuando hay al menos un favorito o un producto en el pedido, entonces la **barra fija inferior** muestra el acceso a favoritos con contador (solo favoritos: botón "Tus favoritos (n)"; con pedido: corazón con contador junto a "Ver pedido"). En escritorio hay "Tus favoritos (n)" en la cabecera del aside "Tu pedido" (sticky). El corazón de la cabecera queda como segundo acceso (y único en `/privacidad`). Todos abren un solo diálogo (Radix) con foto, nombre, precio, quitar y "Agregar al pedido" (`usePedido().agregar`); las prendas con talla piden talla antes. Al agregar, el aviso dice cuántas unidades hay ya en el pedido ("En tu pedido: 2, talla M"). Al cerrar, el foco vuelve al acceso que abrió el panel.
- **CA2b · Fuera de la tienda.** Dado `/privacidad` (sin pedido a la vista), el botón de cada fila es "Ver en la tienda" y enlaza a `/#catalogo`; no hay selector de talla.
- **CA2c · Accesibilidad.** El nombre accesible de "Agregar" contiene su texto visible (WCAG 2.5.3); el foco sobre la cabecera oscura es mostaza (`sobre-oscuro`).
- **CA3 · Vacío.** Dado cero favoritos, el panel dice cómo se usa y ofrece "Ir a la tienda" (cierra el panel y lleva a `#catalogo`; desde otra página, enlaza a la portada).
- **CA4 · Persistencia.** Dado `localStorage` clave `pitucos-favoritos-v1`, se guardan solo ids; se leen tras hidratar (sin desajuste); datos corruptos, `localStorage` bloqueado o ids que ya no existen se descartan en silencio.
- **CA5 · Privacidad.** `/privacidad` explica que se guarda en este dispositivo, no se envía y cómo borrarlo.
- **CA6 · SW.** `VERSION` sube a `pitucos-v3`.

## Casos borde
JSON roto, lista no-array, ids repetidos o vacíos, más de 100 ids, `localStorage` que lanza error, producto guardado inexistente, producto con talla desde favoritos sin elegir talla.
