"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { productoPorId } from "@/content/catalogo";
import { CLAVE_FAVORITOS, alternarFavorito, leerFavoritos, serializarFavoritos } from "@/lib/favoritos.mjs";

type Ctx = {
  /** Ids de productos guardados, en el orden en que se marcaron. */
  ids: string[];
  esFavorito: (id: string) => boolean;
  alternar: (id: string) => void;
  quitar: (id: string) => void;
  /** Panel de favoritos: un solo diálogo, varios accesos (cabecera, barra fija, columna del pedido). */
  abierto: boolean;
  abrir: () => void;
  cerrar: () => void;
  /** Elemento que abrió el panel, para devolverle el foco al cerrar. */
  origen: React.RefObject<HTMLElement | null>;
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
  const [abierto, setAbierto] = useState(false);
  const origen = useRef<HTMLElement | null>(null);
  const abrir = useCallback(() => {
    origen.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setAbierto(true);
  }, []);
  const cerrar = useCallback(() => setAbierto(false), []);

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
    () => ({ ids, esFavorito: (id) => ids.includes(id), alternar, quitar, abierto, abrir, cerrar, origen }),
    [ids, alternar, quitar, abierto, abrir, cerrar],
  );
  return <FavoritosCtx.Provider value={value}>{children}</FavoritosCtx.Provider>;
}
