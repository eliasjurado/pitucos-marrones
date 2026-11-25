"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { useId, useState } from "react";
import { lineaId, productoPorId, type Producto } from "@/content/catalogo";
import { conTransicion } from "@/lib/transicion";
import { ruta } from "@/lib/ruta";
import { useFavoritos } from "./FavoritosProvider";
import { usePedido } from "./PedidoProvider";

/** Productos guardados que siguen existiendo en el catálogo (los demás se descartan en silencio). */
export function useProductosFavoritos() {
  const { ids } = useFavoritos();
  return ids.map(productoPorId).filter((p): p is Producto => !!p);
}

const IR_TIENDA = ruta("/") + "#catalogo";

function Fila({ p, enTienda }: { p: Producto; enTienda: boolean }) {
  const { quitar } = useFavoritos();
  const { agregar, pedido } = usePedido();
  const uid = useId();
  const [talla, setTalla] = useState("");
  const [error, setError] = useState("");
  // Talla con la que se agregó por última vez desde esta fila ("" = sin talla, null = aún no agregó).
  const [ultima, setUltima] = useState<string | null>(null);

  const poner = () => {
    if (p.tallas && !talla) {
      setError("Elige una talla para agregar.");
      return;
    }
    setError("");
    conTransicion(() => agregar(p.id, p.tallas ? talla : undefined, 1));
    setUltima(p.tallas ? talla : "");
  };

  // Cuántas unidades hay ya en el pedido de esa línea (producto + talla).
  const enPedido =
    ultima === null ? 0 : (pedido.items.find((i) => i.id === lineaId(p.id, ultima || undefined))?.cantidad ?? 0);
  const aviso = ultima === null ? "" : `En tu pedido: ${enPedido}${ultima ? `, talla ${ultima}` : ""}`;

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
            <p id={`${uid}-n`} className="font-bold leading-tight">{p.nombre}</p>
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

        {enTienda ? (
          <>
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
                      setUltima(null);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
            <p id={`${uid}-e`} role="alert" className="mt-2 text-sm font-bold text-guinda empty:hidden">{error}</p>
            {/* Nombre accesible = texto visible; el producto se anuncia como descripción. */}
            <button type="button" className="btn mt-3 w-full px-2" onClick={poner} aria-describedby={`${uid}-n`}>
              Agregar al pedido
            </button>
            <p role="status" className="mt-2 text-sm font-bold empty:hidden">{aviso}</p>
          </>
        ) : (
          // Fuera de la tienda (p. ej. /privacidad) no hay pedido a la vista: se lleva a la persona a la tienda.
          <a href={IR_TIENDA} className="btn mt-3 w-full px-2" aria-describedby={`${uid}-n`}>
            Ver en la tienda
          </a>
        )}
      </div>
    </li>
  );
}

/** Botón de acceso a la lista. `variante`: icono (cabecera), barra (barra fija móvil) o texto (columna del pedido). */
export function AccesoFavoritos({ variante, className = "" }: { variante: "icono" | "texto"; className?: string }) {
  const { abrir } = useFavoritos();
  const n = useProductosFavoritos().length;
  if (variante === "texto") {
    return (
      <button type="button" data-acceso-favoritos onClick={(e) => abrir(e.currentTarget)} className={`btn btn-borde w-full ${className}`}>
        <Heart className="size-5" aria-hidden="true" />
        <span>Tus favoritos{n > 0 && ` (${n})`}</span>
      </button>
    );
  }
  return (
    <button
      type="button"
      data-acceso-favoritos
      onClick={(e) => abrir(e.currentTarget)}
      className={`relative inline-flex size-11 shrink-0 items-center justify-center rounded-lg ${className}`}
      aria-label={n > 0 ? `Favoritos, ${n} ${n === 1 ? "producto" : "productos"}` : "Favoritos, aún vacío"}
    >
      <Heart className="size-6" aria-hidden="true" />
      {n > 0 && (
        <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-mostaza px-1 text-xs font-bold leading-5 text-tinta">
          {n}
        </span>
      )}
    </button>
  );
}

/** Cabecera: segundo acceso (el principal en móvil es la barra fija inferior). */
export const BotonFavoritos = () => <AccesoFavoritos variante="icono" />;

/** El diálogo, una sola vez por página. `enTienda`: la página tiene pedido a la vista. */
export function PanelFavoritos({ enTienda }: { enTienda: boolean }) {
  const { abierto, cerrar, origen, irATienda } = useFavoritos();
  const productos = useProductosFavoritos();
  const n = productos.length;

  const alIrATienda = (e: React.MouseEvent) => {
    if (!enTienda) return; // en otra página, el enlace navega solo
    e.preventDefault();
    irATienda.current = true; // el desplazamiento y el foco los hace onCloseAutoFocus, cuando el panel ya cerró
    cerrar();
  };

  const alCerrarFoco = (e: Event) => {
    e.preventDefault();
    if (irATienda.current) {
      irATienda.current = false;
      document.getElementById("catalogo")?.scrollIntoView({ block: "start" });
      document.getElementById("t-catalogo")?.focus({ preventScroll: true });
      return;
    }
    // Vuelve al acceso que abrió el panel; si ya no está (la barra cambió de variante), al acceso de favoritos visible.
    const destino = origen.current?.isConnected
      ? origen.current
      : [...document.querySelectorAll<HTMLElement>("[data-acceso-favoritos]")].find((el) => el.offsetParent !== null);
    destino?.focus();
  };

  return (
    <Dialog.Root open={abierto} onOpenChange={(v) => !v && cerrar()}>
      <Dialog.Portal>
        <Dialog.Overlay className="hoja-fondo" />
        <Dialog.Content
          className="hoja hoja-lateral"
          aria-describedby={undefined}
          onCloseAutoFocus={alCerrarFoco}
        >
          <div className="mb-2 flex items-center justify-between">
            <Dialog.Title className="titulo text-2xl">Tus favoritos</Dialog.Title>
            <Dialog.Close className="inline-flex size-12 items-center justify-center rounded-lg" aria-label="Cerrar favoritos">
              <X className="size-6" aria-hidden="true" />
            </Dialog.Close>
          </div>
          {n === 0 ? (
            <div className="py-6">
              <p className="text-tinta-suave">Aún no guardas nada. Toca el corazón de un producto de la tienda y aparece aquí.</p>
              <a href={enTienda ? "#catalogo" : IR_TIENDA} onClick={alIrATienda} className="btn mt-5 w-full">
                Ir a la tienda
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-linea">
              {productos.map((p) => (
                <Fila key={p.id} p={p} enTienda={enTienda} />
              ))}
            </ul>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
