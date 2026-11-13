export const NUMERO: string | null;
export const MODALIDADES: Record<string, string>;
export type Modalidad = "lima" | "provincia";
export type ItemPedido = {
  id?: string;
  nombre: string;
  cantidad: number;
  precio: number | null;
  /** Talla elegida (camisetas y polos). */
  talla?: string;
  /** Tallas disponibles; si existe, `talla` es obligatoria. */
  tallas?: readonly string[];
};
export type Pedido = {
  items: ItemPedido[];
  nombre: string;
  modalidad: Modalidad | "";
  /** Distrito (Lima) o ciudad (provincia). */
  lugar?: string;
};
export function validarPedido(pedido: Pedido): string | null;
export function armarMensaje(pedido: Pedido): string | null;
export function urlWhatsApp(mensaje: string, numero?: string | null): string;
