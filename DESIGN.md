# DESIGN — Pitucos Marrones (tienda oficial)

Identidad tomada del logo y el merch de Pitucos Marrones (no la de Elías Jurado).

- **Color:** marrón del logo `#433938` (cabecera, hero, pie; el logo no tiene transparencia y exige este fondo exacto), mostaza del logo `#F7B74D` (botones, bloque "Cómo pedir"), crema `#F3EAD8` (fondo), papel `#FBF6EB` (tarjetas), negro `#17120F` (texto y contornos), guinda `#7B2230` (errores y números).
- **Contraste (cálculo WCAG):** tinta sobre mostaza 10.48 · tinta sobre mostaza hover `#E0A02F` 8.18 · crema sobre `#433938` 9.34 · mostaza sobre `#433938` 6.29 · tinta suave `#5A4636` sobre crema 7.43 y sobre papel 8.24 · marrón sobre crema 9.34 · guinda sobre papel 9.22 · borde de control `#7D6A5A` sobre crema 4.31 (≥3 exigido a controles).
- **Tipografía:** Fredoka 700 para títulos, Figtree para texto. Campos a 16 px.
- **Logo:** `public/fotos/logo-pitucos-marrones.webp` (920x320) a 56 px de alto en cabecera y pie, ambos sobre `#433938`. Iconos PWA: el logo centrado al 78 % del lienzo sobre `#433938`.
- **Estructura:** hero → Dónde vernos (botones a plataformas, datos en `content/plataformas.ts`) → Tienda por línea (`LINEAS` en `content/catalogo.ts`) y grupo → Cómo pedir → FAQ → pie.
- **Forma:** bordes de 2 px en negro, esquinas de 8 a 12 px, planos, sin sombras.
- **Mobile-first:** base 390 px, `min-width` para tablet y escritorio, targets ≥44 px. En móvil el pedido va en una hoja desde una barra fija; desde 1024 px es columna lateral fija.
- **Motion:** CSS nativo, mejora progresiva, dentro de `prefers-reduced-motion`: revelado con `animation-timeline: view()`, `<details>` animado, `@starting-style`.
