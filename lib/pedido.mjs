// Lógica pura del pedido: sin React, para probarla con `node --test`.
// Para fijar el WhatsApp de la tienda, reemplaza null por el número con código de país (ej. "51999999999").
export const NUMERO = null;

export const MODALIDADES = {
  lima: "delivery en Lima",
  provincia: "envío a provincia",
};

const soles = (n) => `S/ ${Number.isInteger(n) ? n : n.toFixed(2)}`;
const nombreItem = (i) => (i.talla ? `${i.nombre} (talla ${i.talla})` : i.nombre);

/** Devuelve el texto del problema, o null si el pedido se puede enviar. */
export function validarPedido(pedido) {
  const items = (pedido?.items ?? []).filter((i) => i.cantidad > 0);
  if (items.length === 0) return "Agrega al menos un producto.";
  if (items.some((i) => i.tallas && !i.talla)) return "Elige la talla de cada prenda.";
  if (!pedido.nombre || !pedido.nombre.trim()) return "Escribe tu nombre.";
  if (!Object.hasOwn(MODALIDADES, pedido.modalidad)) return "Elige cómo recibes tu pedido.";
  if (!(pedido.lugar ?? "").trim()) {
    return pedido.modalidad === "lima" ? "Escribe tu distrito." : "Escribe la ciudad de envío.";
  }
  return null;
}

/** Arma el mensaje del pedido. Devuelve null si el pedido no es válido. */
export function armarMensaje(pedido) {
  if (validarPedido(pedido) !== null) return null;
  const items = pedido.items.filter((i) => i.cantidad > 0);

  const lineas = ["Hola Pitucos Marrones, quiero hacer un pedido:"];
  for (const i of items) lineas.push(`- ${i.cantidad} x ${nombreItem(i)}`);

  if (items.some((i) => i.precio == null)) {
    lineas.push("Precios: por confirmar");
  } else {
    const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
    lineas.push(`Total referencial: ${soles(total)}`);
  }
  const lugar = pedido.lugar.trim();
  lineas.push(
    pedido.modalidad === "lima" ? `Entrega: delivery en Lima (${lugar})` : `Entrega: envío a provincia (${lugar})`,
  );
  lineas.push(`Nombre: ${pedido.nombre.trim()}`);
  return lineas.join("\n");
}

/** Sin NUMERO, wa.me/?text= deja que la persona elija el chat. */
export function urlWhatsApp(mensaje, numero = NUMERO) {
  return `https://wa.me/${numero ?? ""}?text=${encodeURIComponent(mensaje)}`;
}
