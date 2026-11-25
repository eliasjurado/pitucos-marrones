import test from "node:test";
import assert from "node:assert/strict";
import { alternarFavorito, leerFavoritos, serializarFavoritos, MAX_FAVORITOS } from "../lib/favoritos.mjs";

test("alternar agrega y quita, sin mutar la lista", () => {
  const a = ["x"];
  const b = alternarFavorito(a, "y");
  assert.deepEqual(b, ["x", "y"]);
  assert.deepEqual(a, ["x"]);
  assert.deepEqual(alternarFavorito(b, "x"), ["y"]);
  assert.deepEqual(alternarFavorito(["x"], "x"), []);
});

test("alternar ignora ids vacíos y listas inválidas", () => {
  assert.deepEqual(alternarFavorito(["x"], ""), ["x"]);
  assert.deepEqual(alternarFavorito(null, "x"), ["x"]);
});

test("leer: lo guardado vuelve igual, en orden", () => {
  assert.deepEqual(leerFavoritos(serializarFavoritos(["a", "b"])), ["a", "b"]);
});

test("leer: null, vacío, JSON roto o de otra forma dan lista vacía", () => {
  for (const crudo of [null, "", "{no es json", "{}", '"texto"', "42", "null"]) {
    assert.deepEqual(leerFavoritos(crudo), []);
  }
});

test("leer: descarta repetidos, no-texto e ids que ya no existen", () => {
  const existe = (id) => id !== "viejo";
  assert.deepEqual(leerFavoritos('["a","a","viejo",3,null,"b",""]', existe), ["a", "b"]);
});

test("leer: topa en el máximo", () => {
  const muchos = Array.from({ length: MAX_FAVORITOS + 20 }, (_, i) => `p${i}`);
  assert.equal(leerFavoritos(JSON.stringify(muchos)).length, MAX_FAVORITOS);
});
