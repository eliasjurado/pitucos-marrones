# Spec 041 — Pitucos Marrones: tienda por WhatsApp de Pitucos Marrones

## Qué y por qué
Hugo Lezama (Cinesmero, "el Barbas") vende merch de Pitucos Marrones por mensaje directo de Instagram y tiene dos marcas de producto: **La Diabetes del Barbas** (repostería) y **La Cirrosis del Barbas** (cervezas artesanales). No tienen tienda propia ni un enlace de WhatsApp en sus perfiles. Una página que arma el pedido y lo manda listo por WhatsApp convierte la audiencia del stream (~96K en YouTube, ~61K en Instagram) en ventas sin comisiones ni pasarela.

Demo para prospecto (regla de cuentas: va en la cuenta de Elías hasta que el cliente apruebe). Publicada en `eliasjurado.com/pitucos-marrones`, noindex.

## Alcance (v1: solo merch)
1. Catálogo de Pitumerch en cuatro grupos: Camisetas (2), Polos (7), Gorras (2), Accesorios (pines). Fotos reales de su Instagram.
2. Carrito: talla obligatoria en camisetas y polos (S, M, L, XL; cada talla es una línea distinta); gorras y pines sin variante.
3. Mensaje de WhatsApp: `Hola Pitucos Marrones, quiero hacer un pedido:` + líneas `- 2 x Polo ¡Nada! (talla M)` + `Precios: por confirmar` + entrega (delivery en Lima con distrito, o envío a provincia con ciudad) + nombre.
4. Sin precios ni número: `NUMERO = null` en `lib/pedido.mjs`; con null la URL es `wa.me/?text=` (la persona elige el chat).
5. Secciones: cabecera con logo oficial, hero con la frase de la bio, Dónde vernos (plataformas como datos), tienda por línea → grupo, cómo pedir, FAQ, pie con enlaces y crédito. Marca paraguas: Pitucos Marrones; Pitumerch es la línea 1.
6. Estándar de Elías: mobile-first, PWA, motion CSS nativo, compuerta de calidad UI.

## Fuera de alcance (ampliación futura)
La Diabetes del Barbas (repostería) y La Cirrosis del Barbas (cervezas, con puerta de edad +18); pagos en línea, stock, panel, cuentas.

## Criterios de aceptación
- Un pedido con 2 polos de tallas distintas y una gorra produce el mensaje correcto.
- Sin talla no se agrega una prenda (error accesible).
- Fotos reales; nada generado por IA.
- Sin overflow a 390 px, targets ≥44 px, contraste AA, noindex.

## Datos pendientes (bloquean el catálogo)
Precios del merch y número de WhatsApp para pedidos (hoy placeholders). Para la ampliación: marcas del Barbas, fotos y productos.
