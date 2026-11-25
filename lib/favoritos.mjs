// Lógica pura de favoritos: sin React ni navegador, para probarla con `node --test`.
// Se guardan solo ids de producto, en este dispositivo (localStorage).
export const CLAVE_FAVORITOS = "pitucos-favoritos-v1";
export const MAX_FAVORITOS = 100;

/** Agrega el id si no está y lo quita si ya está. No muta la lista original. */
export function alternarFavorito(ids, id) {
  const lista = Array.isArray(ids) ? ids : [];
  if (typeof id !== "string" || !id) return [...lista];
  if (lista.includes(id)) return lista.filter((x) => x !== id);
  return [...lista, id].slice(-MAX_FAVORITOS);
}

/**
 * Lee lo guardado (texto JSON o null). Tolera datos corruptos: devuelve [] si no es una lista.
 * Descarta ids repetidos, que no sean texto o que `existe(id)` rechace (producto que ya no está).
 */
export function leerFavoritos(crudo, existe = () => true) {
  let datos;
  try {
    datos = JSON.parse(crudo ?? "null");
  } catch {
    return [];
  }
  if (!Array.isArray(datos)) return [];
  const vistos = new Set();
  const limpios = [];
  for (const id of datos) {
    if (typeof id !== "string" || !id || vistos.has(id) || !existe(id)) continue;
    vistos.add(id);
    limpios.push(id);
    if (limpios.length >= MAX_FAVORITOS) break;
  }
  return limpios;
}

export const serializarFavoritos = (ids) => JSON.stringify(Array.isArray(ids) ? ids : []);
