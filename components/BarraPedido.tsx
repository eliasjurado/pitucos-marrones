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
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-tinta bg-crema p-3 lg:hidden">
        <Dialog.Trigger className="btn w-full" disabled={totalItems === 0}>
          {totalItems === 0 ? "Tu pedido está vacío" : `Ver pedido (${totalItems})`}
        </Dialog.Trigger>
      </div>
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
