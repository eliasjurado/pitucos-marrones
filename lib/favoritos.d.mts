export const CLAVE_FAVORITOS: string;
export const MAX_FAVORITOS: number;
export function alternarFavorito(ids: readonly string[], id: string): string[];
export function leerFavoritos(crudo: string | null, existe?: (id: string) => boolean): string[];
export function serializarFavoritos(ids: readonly string[]): string;
