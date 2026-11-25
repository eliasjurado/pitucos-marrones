# Spec 052 — Favoritos (Pitucos Marrones)

**Pedido de Elías (24-nov-2026):** poder darle corazoncito a los productos y tener acceso a ese listado.
**Por qué:** el oyente decide en varias visitas; guardar lo que le gusta acorta el camino al pedido por WhatsApp.
**Fuera de alcance:** cuentas, sincronizar entre dispositivos, compartir la lista, analítica, cambios al flujo del pedido.

## Criterios de aceptación
- **CA1 · Corazón.** Dado el catálogo, cuando miro una tarjeta, entonces hay un botón con ícono SVG (lucide `Heart`), `aria-pressed`, nombre accesible "Agregar X a favoritos" / "Quitar X de favoritos", área de 44x44 px, relleno guinda al estar marcado y foco visible. Al tocarlo no agrega al pedido.
- **CA2 · Acceso.** Dado cualquier página con cabecera, entonces hay un botón de corazón siempre a la vista con contador cuando hay favoritos; abre un diálogo (Radix) con foto, nombre, precio, botón para quitar y botón "Agregar al pedido" que usa `usePedido().agregar`. Las prendas con talla piden talla antes de agregar.
- **CA3 · Vacío.** Dado cero favoritos, el panel dice cómo se usa.
- **CA4 · Persistencia.** Dado `localStorage` clave `pitucos-favoritos-v1`, se guardan solo ids; se leen tras hidratar (sin desajuste); datos corruptos, `localStorage` bloqueado o ids que ya no existen se descartan en silencio.
- **CA5 · Privacidad.** `/privacidad` explica que se guarda en este dispositivo, no se envía y cómo borrarlo.
- **CA6 · SW.** `VERSION` sube a `pitucos-v3`.

## Casos borde
JSON roto, lista no-array, ids repetidos o vacíos, más de 100 ids, `localStorage` que lanza error, producto guardado inexistente, producto con talla desde favoritos sin elegir talla.
