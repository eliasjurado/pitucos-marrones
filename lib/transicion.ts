import { flushSync } from "react-dom";

/** Envuelve un cambio de estado en una View Transition. Sin soporte o con movimiento reducido, solo lo aplica. */
export function conTransicion(cambio: () => void) {
  const vt = (document as Document & { startViewTransition?: (cb: () => void) => unknown }).startViewTransition;
  if (!vt || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cambio();
    return;
  }
  vt.call(document, () => flushSync(cambio));
}
