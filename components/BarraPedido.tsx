"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { usePedido } from "./PedidoProvider";
import { PanelPedido } from "./PanelPedido";
import { IconoCerrar } from "./Iconos";

/** Móvil: barra fija abajo + hoja con el pedido. Escritorio: no se muestra (hay columna lateral). */
export function BarraPedido() {
  const { totalItems, abierto, setAbierto } = usePedido();
  return (
    <Dialog.Root open={abierto} onOpenChange={setAbierto}>
      {totalItems > 0 && (
        <>
          <div className="h-24 lg:hidden" aria-hidden="true" />
          <div className="fixed inset-x-0 bottom-0 z-40 bg-crema p-3 shadow-[var(--sombra-arriba)] lg:hidden">
            <Dialog.Trigger className="btn w-full">
              Ver pedido (<span className="contador">{totalItems}</span>)
            </Dialog.Trigger>
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
