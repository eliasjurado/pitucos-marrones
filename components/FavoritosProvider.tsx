"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { productoPorId } from "@/content/catalogo";
import { CLAVE_FAVORITOS, alternarFavorito, leerFavoritos, serializarFavoritos } from "@/lib/favoritos.mjs";

type Ctx = {
  /** Ids de productos guardados, en el orden en que se marcaron. */
  ids: string[];
  esFavorito: (id: string) => boolean;
  alternar: (id: string) => void;
  quitar: (id: string) => void;
};

const FavoritosCtx = createContext<Ctx | null>(null);

export function useFavoritos() {
  const c = useContext(FavoritosCtx);
  if (!c) throw new Error("useFavoritos fuera de FavoritosProvider");
  return c;
}

export function FavoritosProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [cargado, setCargado] = useState(false);

  // Lee lo guardado solo en el cliente, después de hidratar (el sitio es export estático).
  useEffect(() => {
    try {
      setIds(leerFavoritos(localStorage.getItem(CLAVE_FAVORITOS), (id) => !!productoPorId(id)));
    } catch {}
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(CLAVE_FAVORITOS, serializarFavoritos(ids));
    } catch {}
  }, [cargado, ids]);

  const alternar = useCallback((id: string) => setIds((p) => alternarFavorito(p, id)), []);
  const quitar = useCallback((id: string) => setIds((p) => p.filter((x) => x !== id)), []);

  const value = useMemo<Ctx>(
    () => ({ ids, esFavorito: (id) => ids.includes(id), alternar, quitar }),
    [ids, alternar, quitar],
  );
  return <FavoritosCtx.Provider value={value}>{children}</FavoritosCtx.Provider>;
}
