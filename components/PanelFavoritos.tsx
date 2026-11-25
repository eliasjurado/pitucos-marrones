"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { useId, useState } from "react";
import { productoPorId, type Producto } from "@/content/catalogo";
import { conTransicion } from "@/lib/transicion";
import { ruta } from "@/lib/ruta";
import { useFavoritos } from "./FavoritosProvider";
import { usePedido } from "./PedidoProvider";

function Fila({ p }: { p: Producto }) {
  const { quitar } = useFavoritos();
  const { agregar } = usePedido();
  const uid = useId();
  const [talla, setTalla] = useState("");
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  const poner = () => {
    if (p.tallas && !talla) {
      setError("Elige una talla para agregar.");
      return;
    }
    setError("");
    conTransicion(() => agregar(p.id, p.tallas ? talla : undefined, 1));
    setAviso(p.tallas ? `Agregado, talla ${talla}` : "Agregado al pedido");
  };

  return (
    <li className="flex gap-3 py-4">
      <Image
        src={ruta(p.foto.src)}
        alt=""
        width={p.foto.w}
        height={p.foto.h}
        className="size-20 shrink-0 rounded-lg object-cover"
        style={{ objectPosition: p.foto.pos }}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-bold leading-tight">{p.nombre}</p>
            <p className="mt-0.5 text-sm text-tinta-suave">{p.precio == null ? "Precio por WhatsApp" : `S/ ${p.precio}`}</p>
          </div>
          <button
            type="button"
            className="-mr-2 -mt-2 inline-flex size-11 shrink-0 items-center justify-center rounded-lg"
            aria-label={`Quitar ${p.nombre} de favoritos`}
            onClick={() => quitar(p.id)}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {p.tallas && (
          <div role="group" aria-label={`Talla de ${p.nombre}`} aria-describedby={error ? `${uid}-e` : undefined} className="mt-2 flex flex-wrap gap-1.5">
            {p.tallas.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={talla === t}
                className="talla"
                onClick={() => {
                  setTalla(t);
                  setError("");
                  setAviso("");
                }}
              >
                {t}
              </button>
            ))}
          </div>
        )}
        <p id={`${uid}-e`} role="alert" className="mt-2 text-sm font-bold text-guinda empty:hidden">{error}</p>

        <button type="button" className="btn mt-3 w-full px-2" onClick={poner} aria-label={`Agregar ${p.nombre} al pedido`}>
          {aviso || "Agregar al pedido"}
        </button>
        <span role="status" className="sr-only">{aviso}</span>
      </div>
    </li>
  );
}

/** Entrada a la lista de favoritos (cabecera) + panel. Mismo patrón de diálogo que el pedido. */
export function BotonFavoritos() {
  const { ids } = useFavoritos();
  // Un producto guardado que ya no existe en el catálogo se descarta en silencio.
  const productos = ids.map(productoPorId).filter((p): p is Producto => !!p);
  const n = productos.length;
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="relative inline-flex size-11 shrink-0 items-center justify-center rounded-lg"
        aria-label={n > 0 ? `Favoritos, ${n} ${n === 1 ? "producto" : "productos"}` : "Favoritos, aún vacío"}
      >
        <Heart className="size-6" aria-hidden="true" />
        {n > 0 && (
          <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-mostaza px-1 text-xs font-bold leading-5 text-tinta">
            {n}
          </span>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="hoja-fondo" />
        <Dialog.Content className="hoja hoja-lateral" aria-describedby={undefined}>
          <div className="mb-2 flex items-center justify-between">
            <Dialog.Title className="titulo text-2xl">Tus favoritos</Dialog.Title>
            <Dialog.Close className="inline-flex size-12 items-center justify-center rounded-lg" aria-label="Cerrar favoritos">
              <X className="size-6" aria-hidden="true" />
            </Dialog.Close>
          </div>
          {n === 0 ? (
            <p className="py-6 text-tinta-suave">
              Aún no guardas nada. Toca el corazón de un producto de la tienda y aparece aquí.
            </p>
          ) : (
            <ul className="divide-y divide-linea">
              {productos.map((p) => (
                <Fila key={p.id} p={p} />
              ))}
            </ul>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
