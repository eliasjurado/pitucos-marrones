import test from "node:test";
import assert from "node:assert/strict";
import { armarMensaje, urlWhatsApp, validarPedido } from "../lib/pedido.mjs";

const base = { nombre: "Lucía", modalidad: "lima", lugar: "Miraflores" };
const TALLAS = ["S", "M", "L", "XL"];
const polo = { nombre: "Polo ¡Nada!", cantidad: 2, precio: null, talla: "M", tallas: TALLAS };
const gorra = { nombre: "Gorra trucker Pitucos Marrones", cantidad: 1, precio: null };

test("0 ítems: no hay mensaje y el pedido es inválido", () => {
  assert.equal(armarMensaje({ ...base, items: [] }), null);
  assert.equal(armarMensaje({ ...base, items: [{ ...polo, cantidad: 0 }] }), null);
  assert.ok(validarPedido({ ...base, items: [] }));
});

test("mensaje con talla, precios por confirmar, entrega y nombre", () => {
  const m = armarMensaje({ ...base, items: [polo, gorra] });
  assert.equal(
    m,
    [
      "Hola Pitumerch, quiero hacer un pedido:",
      "- 2 x Polo ¡Nada! (talla M)",
      "- 1 x Gorra trucker Pitucos Marrones",
      "Precios: por confirmar",
      "Entrega: delivery en Lima (Miraflores)",
      "Nombre: Lucía",
    ].join("\n"),
  );
});

test("la misma prenda en dos tallas son dos líneas", () => {
  const m = armarMensaje({ ...base, items: [polo, { ...polo, cantidad: 1, talla: "L" }] });
  assert.match(m, /- 2 x Polo ¡Nada! \(talla M\)/);
  assert.match(m, /- 1 x Polo ¡Nada! \(talla L\)/);
});

test("prenda con tallas sin talla elegida no se envía", () => {
  const sinTalla = { ...polo, talla: undefined };
  assert.equal(armarMensaje({ ...base, items: [sinTalla] }), null);
  assert.match(validarPedido({ ...base, items: [sinTalla] }), /talla/);
});

test("Lima pide distrito y provincia pide ciudad", () => {
  assert.equal(armarMensaje({ ...base, lugar: "  ", items: [polo] }), null);
  assert.match(validarPedido({ ...base, lugar: "", items: [polo] }), /distrito/);
  const p = { ...base, modalidad: "provincia", lugar: "", items: [polo] };
  assert.match(validarPedido(p), /ciudad/);
  assert.match(armarMensaje({ ...p, lugar: "Arequipa" }), /Entrega: envío a provincia \(Arequipa\)/);
});

test("exige nombre y modalidad válida", () => {
  assert.equal(armarMensaje({ ...base, nombre: " ", items: [polo] }), null);
  assert.equal(armarMensaje({ ...base, modalidad: "", items: [polo] }), null);
});

test("si todo tiene precio, muestra total referencial", () => {
  const m = armarMensaje({ ...base, items: [{ ...polo, precio: 50 }, { ...gorra, precio: 40 }] });
  assert.match(m, /Total referencial: S\/ 140$/m);
  assert.doesNotMatch(m, /por confirmar/);
});

test("sin NUMERO la URL es wa.me/?text= y codifica tildes, ñ y saltos", () => {
  const m = armarMensaje({ ...base, nombre: "Begoña Peña", items: [polo] });
  const url = urlWhatsApp(m);
  assert.ok(url.startsWith("https://wa.me/?text="));
  assert.match(url, /Pe%C3%B1a/);
  assert.match(url, /%C2%A1Nada!|%C2%A1Nada/);
  assert.match(url, /%0A/);
  assert.ok(!/[ \n]/.test(url));
  assert.equal(decodeURIComponent(url.split("?text=")[1]), m);
});

test("con número, la URL apunta a ese chat", () => {
  const url = urlWhatsApp("Hola", "51999999999");
  assert.equal(url, "https://wa.me/51999999999?text=Hola");
});
