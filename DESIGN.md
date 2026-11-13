# DESIGN — Pitumerch

Identidad tomada del merch de Pitucos Marrones (no la de Elías Jurado).

- **Color:** chocolate `#3F2A1D` (visera; cabecera, hero, títulos de grupo), crema `#F3EAD8` (fondo), papel `#FBF6EB` (tarjetas), mostaza `#E2A622` (botones y bloque "Cómo pedir"), negro `#17120F` (texto, contornos, pie), guinda `#7B2230` (errores y números). Contraste AA en los pares usados.
- **Tipografía:** Fredoka 700 para títulos y logotipo (trazo grueso y redondeado, eco del logo PITU MERCH), Figtree para texto. Campos a 16 px.
- **Logotipo:** PITU / MERCH recreado como texto (`components/Logotipo.tsx`) con contorno oscuro; el original de 150 px no se agranda.
- **Forma:** bordes de 2 px en negro, esquinas de 8 a 12 px, planos, sin sombras.
- **Mobile-first:** base 390 px, `min-width` para tablet y escritorio, targets ≥44 px. En móvil el pedido va en una hoja desde una barra fija; desde 1024 px es columna lateral fija.
- **Imágenes:** fotos reales de su Instagram en WebP, sin agrandar (máx. 640 px), recorte cuadrado en tarjetas con `object-position` por producto.
- **Motion:** CSS nativo y mejora progresiva, dentro de `prefers-reduced-motion`: revelado con `animation-timeline: view()`, `<details>` animado, `@starting-style` en tarjetas.
