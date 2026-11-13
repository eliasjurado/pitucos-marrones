"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { lineaId, productoPorId } from "@/content/catalogo";
import type { Modalidad, Pedido } from "@/lib/pedido.mjs";

type Form = { nombre: string; modalidad: Modalidad | ""; lugar: string };

type Ctx = {
  agregar: (id: string, talla: string | undefined, delta: number) => void;
  form: Form;
  setForm: (f: Partial<Form>) => void;
  pedido: Pedido;
  totalItems: number;
  abierto: boolean;
  setAbierto: (v: boolean) => void;
  enviado: boolean;
  setEnviado: (v: boolean) => void;
  vaciar: () => void;
};

const PedidoCtx = createContext<Ctx | null>(null);
const CLAVE = "pitucos-pedido-v1";
const FORM0: Form = { nombre: "", modalidad: "", lugar: "" };

export function usePedido() {
  const c = useContext(PedidoCtx);
  if (!c) throw new Error("usePedido fuera de PedidoProvider");
  return c;
}

/** Una línea del carrito = producto + talla. Se guarda como "id|talla". */
const separar = (k: string) => {
  const [id, talla] = k.split("|");
  return { id, talla };
};
const valida = (k: string) => {
  const { id, talla } = separar(k);
  const p = productoPorId(id);
  return !!p && (p.tallas ? !!talla && p.tallas.includes(talla) : !talla);
};

export function PedidoProvider({ children }: { children: React.ReactNode }) {
  const [lineas, setLineas] = useState<Record<string, number>>({});
  const [form, setFormState] = useState<Form>(FORM0);
  const [abierto, setAbierto] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [cargado, setCargado] = useState(false);

  // Recupera el pedido guardado en este dispositivo (solo en el cliente, después de hidratar).
  useEffect(() => {
    try {
      const g = JSON.parse(localStorage.getItem(CLAVE) ?? "null");
      if (g && typeof g === "object") {
        const c: Record<string, number> = {};
        for (const [k, v] of Object.entries(g.lineas ?? {})) {
          if (valida(k) && Number.isInteger(v) && (v as number) > 0) c[k] = Math.min(99, v as number);
        }
        setLineas(c);
        const f = g.form ?? {};
        setFormState({
          nombre: typeof f.nombre === "string" ? f.nombre.slice(0, 80) : "",
          modalidad: ["lima", "provincia"].includes(f.modalidad) ? f.modalidad : "",
          lugar: typeof f.lugar === "string" ? f.lugar.slice(0, 80) : "",
        });
      }
    } catch {}
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ lineas, form }));
    } catch {}
  }, [cargado, lineas, form]);

  const agregar = useCallback((id: string, talla: string | undefined, delta: number) => {
    setEnviado(false);
    const k = lineaId(id, talla);
    setLineas((prev) => {
      const n = Math.max(0, Math.min(99, (prev[k] ?? 0) + delta));
      const { [k]: _, ...resto } = prev;
      return n > 0 ? { ...resto, [k]: n } : resto;
    });
  }, []);

  const setForm = useCallback((f: Partial<Form>) => {
    setEnviado(false);
    setFormState((p) => ({ ...p, ...f }));
  }, []);

  const vaciar = useCallback(() => {
    setLineas({});
    setFormState(FORM0);
    setEnviado(false);
  }, []);

  const value = useMemo<Ctx>(() => {
    const items = Object.entries(lineas)
      .filter(([k]) => valida(k))
      .map(([k, cantidad]) => {
        const { id, talla } = separar(k);
        const p = productoPorId(id)!;
        return { id: k, nombre: p.nombre, cantidad, precio: p.precio, talla, tallas: p.tallas };
      });
    return {
      agregar,
      form,
      setForm,
      pedido: { items, ...form },
      totalItems: items.reduce((s, i) => s + i.cantidad, 0),
      abierto,
      setAbierto,
      enviado,
      setEnviado,
      vaciar,
    };
  }, [lineas, agregar, form, setForm, abierto, enviado, vaciar]);

  return <PedidoCtx.Provider value={value}>{children}</PedidoCtx.Provider>;
}
