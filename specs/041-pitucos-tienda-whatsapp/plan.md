# Plan 041
- **Base:** plantilla de King Kong Real (spec 040): Next.js estático + Tailwind v4, `basePath` `/pitucos-marrones`, `lib/pedido.mjs` (mensaje y URL de WhatsApp, con tests), PWA con service worker de lista permitida (`pitumerch-v1`).
- **Cambios v1:** catálogo de merch con tallas (`content/catalogo.ts`); carrito por línea producto+talla; entrega Lima/provincia; `NUMERO = null`; identidad desde el merch (chocolate, crema, mostaza, negro, guinda; Fredoka + Figtree); logotipo PITU MERCH como texto; fotos reales en WebP; iconos y OG generados desde el logotipo y una foto real.
- **Fuera de v1:** líneas del Barbas y puerta de edad.
- **Publicación:** `npm run publicar` copia el build a `repos/eliasjurado.github.io/public/pitucos-marrones/`; sin push ni deploy hasta que Elías lo pida.
- **Repo:** privado `eliasjurado/pitucos-marrones` cuando Elías lo cree.
