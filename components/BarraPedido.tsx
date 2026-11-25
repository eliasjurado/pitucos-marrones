"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { usePedido } from "./PedidoProvider";
import { PanelPedido } from "./PanelPedido";
import { IconoCerrar } from "./Iconos";
import { AccesoFavoritos, useProductosFavoritos } from "./PanelFavoritos";

/**
 * Móvil: barra fija abajo con el acceso a favoritos y el pedido (aparece si hay productos o favoritos) + hoja con el pedido.
 * Escritorio: no se muestra (hay columna lateral).
 */
export function BarraPedido() {
  const { totalItems, abierto, setAbierto } = usePedido();
  const nFav = useProductosFavoritos().length;
  const hayBarra = totalItems > 0 || nFav > 0;
  return (
    <Dialog.Root open={abierto} onOpenChange={setAbierto}>
      {hayBarra && (
        <>
          <div className="h-24 lg:hidden" aria-hidden="true" />
          <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-crema p-3 shadow-[var(--sombra-arriba)] lg:hidden">
            {totalItems > 0 ? (
              <>
                <AccesoFavoritos variante="icono" className="btn-borde size-12!" />
                <Dialog.Trigger className="btn min-w-0 flex-1">
                  Ver pedido (<span className="contador">{totalItems}</span>)
                </Dialog.Trigger>
              </>
            ) : (
              <AccesoFavoritos variante="texto" />
            )}
          </div>
        </>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="hoja-fondo" />
        <Dialog.Content className="hoja" aria-describedby={undefined}>
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="titulo text-2xl">Tu pedido</Dialog.Title>
            <Dialog.Close className="inline-flex size-12 items-center justify-center rounded-lg" aria-label="Cerrar pedido">
              <IconoCerrar className="size-6" />
            </Dialog.Close>
          </div>
          <PanelPedido />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
