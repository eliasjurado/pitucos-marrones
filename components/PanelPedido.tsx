"use client";

import { useId, useRef, useState } from "react";
import { armarMensaje, urlWhatsApp } from "@/lib/pedido.mjs";
import { usePedido } from "./PedidoProvider";
import { IconoWhatsApp } from "./Iconos";

const MODOS = [
  { id: "lima", texto: "Delivery en Lima" },
  { id: "provincia", texto: "Envío a provincia" },
] as const;

export function PanelPedido() {
  const { pedido, form, setForm, agregar, totalItems, enviado, setEnviado, vaciar } = usePedido();
  const uid = useId();
  const [intento, setIntento] = useState(false);
  const nombreRef = useRef<HTMLInputElement>(null);
  const modoRef = useRef<HTMLInputElement>(null);
  const lugarRef = useRef<HTMLInputElement>(null);

  const errores = {
    nombre: form.nombre.trim() ? "" : "Escribe tu nombre.",
    modalidad: form.modalidad ? "" : "Elige cómo recibes tu pedido.",
    lugar: form.modalidad && !form.lugar.trim() ? (form.modalidad === "lima" ? "Escribe tu distrito." : "Escribe la ciudad de envío.") : "",
  };
  const ver = (k: keyof typeof errores) => (intento ? errores[k] : "");

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setIntento(true);
    if (errores.nombre) return nombreRef.current?.focus();
    if (errores.modalidad) return modoRef.current?.focus();
    if (errores.lugar) return lugarRef.current?.focus();
    const msg = armarMensaje(pedido);
    if (!msg) return;
    window.open(urlWhatsApp(msg), "_blank", "noopener,noreferrer");
    setEnviado(true);
  };

  const hayPendientes = pedido.items.some((i) => i.precio == null);
  const total = pedido.items.reduce((s, i) => s + (i.precio ?? 0) * i.cantidad, 0);
  const resumen = hayPendientes ? "Los precios te los confirmamos por WhatsApp." : `Total S/ ${total}.`;

  return (
    <form onSubmit={enviar} noValidate className="space-y-5">
      {totalItems === 0 ? (
        <p className="text-tinta-suave">Aún no agregas nada. Elige del catálogo y aparece aquí.</p>
      ) : (
        <>
          <ul className="divide-y divide-linea border-y border-linea">
            {pedido.items.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="font-bold leading-tight">{i.nombre}</p>
                  <p className="text-sm text-tinta-suave">
                    {i.talla ? `Talla ${i.talla} · ` : ""}
                    {i.precio == null ? "Precio por WhatsApp" : `S/ ${i.precio}`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center">
                  <button type="button" className="size-11 text-xl font-bold" aria-label={`Quitar uno: ${i.nombre}${i.talla ? `, talla ${i.talla}` : ""}`} onClick={() => agregar(i.id!.split("|")[0], i.talla, -1)}>
                    −
                  </button>
                  <span className="w-6 text-center font-bold" aria-live="polite">{i.cantidad}</span>
                  <button type="button" className="size-11 text-xl font-bold" aria-label={`Agregar uno: ${i.nombre}${i.talla ? `, talla ${i.talla}` : ""}`} onClick={() => agregar(i.id!.split("|")[0], i.talla, 1)}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {resumen && <p className="font-bold">{resumen}</p>}
        </>
      )}

      <div>
        <label htmlFor={`${uid}-nombre`} className="mb-1 block font-bold">Tu nombre</label>
        <input
          ref={nombreRef}
          id={`${uid}-nombre`}
          className="campo"
          autoComplete="name"
          value={form.nombre}
          aria-invalid={!!ver("nombre")}
          aria-describedby={ver("nombre") ? `${uid}-e-nombre` : undefined}
          onChange={(e) => setForm({ nombre: e.target.value })}
        />
        {ver("nombre") && <p id={`${uid}-e-nombre`} className="mt-1 text-sm font-bold text-marca">{ver("nombre")}</p>}
      </div>

      <fieldset aria-describedby={ver("modalidad") ? `${uid}-e-modo` : undefined}>
        <legend className="mb-1 font-bold">Cómo lo recibes</legend>
        <div className="space-y-2">
          {MODOS.map((m, idx) => (
            <label key={m.id} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-[var(--borde-control)] bg-white px-3 has-[:checked]:border-marca has-[:checked]:bg-marca has-[:checked]:text-crema">
              <input
                ref={idx === 0 ? modoRef : undefined}
                type="radio"
                name={`${uid}-modo`}
                className="size-5 accent-marca"
                aria-invalid={!!ver("modalidad")}
                checked={form.modalidad === m.id}
                onChange={() => setForm({ modalidad: m.id })}
              />
              {m.texto}
            </label>
          ))}
        </div>
        {ver("modalidad") && <p id={`${uid}-e-modo`} className="mt-1 text-sm font-bold text-marca">{ver("modalidad")}</p>}
      </fieldset>

      {form.modalidad && (
        <div>
          <label htmlFor={`${uid}-lugar`} className="mb-1 block font-bold">{form.modalidad === "lima" ? "Distrito" : "Ciudad de envío"}</label>
          <input
            ref={lugarRef}
            id={`${uid}-lugar`}
            className="campo"
            autoComplete={form.modalidad === "lima" ? "address-level3" : "address-level2"}
            value={form.lugar}
            aria-invalid={!!ver("lugar")}
            aria-describedby={ver("lugar") ? `${uid}-e-lugar` : undefined}
            onChange={(e) => setForm({ lugar: e.target.value })}
          />
          {ver("lugar") && <p id={`${uid}-e-lugar`} className="mt-1 text-sm font-bold text-marca">{ver("lugar")}</p>}
        </div>
      )}

      <div className="space-y-3">
        <button type="submit" className="btn w-full" disabled={totalItems === 0}>
          <IconoWhatsApp className="size-5" />
          Enviar pedido por WhatsApp
        </button>
        {enviado ? (
          <div role="status" className="space-y-2">
            <p className="font-bold">Listo. Revisa WhatsApp y aprieta enviar.</p>
            <button type="button" className="btn btn-borde w-full" onClick={vaciar}>Vaciar pedido</button>
          </div>
        ) : (
          <p className="text-sm text-tinta-suave">Se abre WhatsApp con tu pedido escrito. Tú aprietas enviar.</p>
        )}
      </div>
    </form>
  );
}
