# Tasks 041
- [x] T01 Copiar plantilla de King Kong Real, basePath y script publicar.
- [ ] T02 Recibir de Elías/marca: precios y número de WhatsApp (poner en `content/catalogo.ts` y `lib/pedido.mjs`).
- [x] T03 Catálogo de merch con tallas. Test: el mensaje lista talla y cantidad.
- [x] T04 Pedido: talla obligatoria, entrega Lima/provincia, `NUMERO` null. Tests en `tests/pedido.test.mjs`.
- [x] T06 Identidad visual desde el merch (DESIGN.md, PRODUCT.md).
- [x] T07 Compuerta UI: detector `[]`, render 390/1440 mirado, flujo probado. Crítica impeccable formal hecha el 21-nov-2026 (31/40).
- [x] T08 Publicar y verificar en vivo (publicado en andamialab.com/proposal/pitucos-marrones, noindex; se republica tras los ajustes del 21-nov).
- [ ] T09 Ampliación: La Diabetes y La Cirrosis del Barbas (con puerta de edad +18).

## Ajustes del 21-nov-2026
- [x] Envío honesto: sin `NUMERO` no se abre WhatsApp; el panel muestra "Así le llega el pedido a Pitucos Marrones por WhatsApp" con el mensaje en burbuja. Con número, abre el chat y dice que se abrió, con enlace por si no. Lógica en `accionEnvio` (`lib/pedido.mjs`) con pruebas.
- [x] Sin bandas de aviso en la página: el aviso de demo vive solo dentro del panel del pedido.
- [x] "Oficial" fuera de textos y metadatos (aún no autorizado por la marca); antetítulo "Pitumerch".
- [x] Emoji del pie fuera; crédito "Sitio por AndamIA Lab" con enlace a andamialab.com.
- [x] Comentario de contraste corregido (7.43:1); service worker a `pitucos-v2`.
