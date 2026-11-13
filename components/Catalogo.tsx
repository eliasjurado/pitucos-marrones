"use client";

import { ruta } from "@/lib/ruta";
import Image from "next/image";
import { useId, useState } from "react";
import { GRUPOS, PRODUCTOS, type Producto } from "@/content/catalogo";
import { usePedido } from "./PedidoProvider";
import { PanelPedido } from "./PanelPedido";

function Tarjeta({ p }: { p: Producto }) {
  const { agregar } = usePedido();
  const uid = useId();
  const [talla, setTalla] = useState("");
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  const poner = () => {
    if (p.tallas && !talla) {
      setAviso("");
      setError("Elige una talla para agregar.");
      return;
    }
    setError("");
    agregar(p.id, p.tallas ? talla : undefined, 1);
    setAviso(p.tallas ? `Agregado: talla ${talla}.` : "Agregado.");
  };

  return (
    <li className="tarjeta-nueva flex flex-col overflow-hidden rounded-xl border-2 border-tinta bg-papel">
      <Image
        src={ruta(p.foto.src)}
        alt={p.alt}
        width={p.foto.w}
        height={p.foto.h}
        className="aspect-square w-full object-cover"
        style={{ objectPosition: p.foto.pos }}
      />
      <div className="flex flex-1 flex-col p-4">
        <h4 className="titulo text-xl leading-tight">{p.nombre}</h4>
        <p className="mt-1 text-sm text-tinta-suave">Precio por WhatsApp</p>

        {p.tallas ? (
          <div
            role="group"
            aria-label={`Talla de ${p.nombre}`}
            aria-describedby={error ? `${uid}-e` : undefined}
            className="mt-3 flex flex-wrap gap-2"
          >
            {p.tallas.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={talla === t}
                onClick={() => {
                  setTalla(t);
                  setError("");
                  setAviso("");
                }}
                className="talla"
              >
                {t}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm font-bold">{p.grupo === "gorras" ? "Talla única" : "Sin talla"}</p>
        )}
        <p id={`${uid}-e`} role="alert" className="mt-2 text-sm font-bold text-guinda empty:hidden">{error}</p>

        <div className="mt-auto pt-4">
          <button type="button" className="btn w-full" onClick={poner} aria-label={`Agregar ${p.nombre}`}>
            Agregar al pedido
          </button>
          <p role="status" className="mt-2 min-h-5 text-sm font-bold text-marca">{aviso}</p>
        </div>
      </div>
    </li>
  );
}

export function Catalogo() {
  return (
    <section id="catalogo" aria-labelledby="t-catalogo" className="mx-auto max-w-6xl px-4 py-12 lg:grid lg:grid-cols-[1fr_22rem] lg:gap-10 lg:py-16">
      <div>
        <h2 id="t-catalogo" className="titulo text-4xl lg:text-5xl">Catálogo</h2>
        <p className="mt-2 max-w-md text-tinta-suave">Elige, agrega y el pedido te sale ya escrito en WhatsApp.</p>
        <div className="mt-8 space-y-12">
          {GRUPOS.map((g) => (
            <div key={g.id} className="revelar">
              <h3 className="titulo mb-4 text-2xl text-marca">{g.nombre}</h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {PRODUCTOS.filter((p) => p.grupo === g.id).map((p) => (
                  <Tarjeta key={p.id} p={p} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <aside id="pedido" aria-label="Tu pedido" className="mt-10 hidden self-start rounded-xl border-2 border-tinta bg-papel p-5 lg:sticky lg:top-6 lg:block">
        <h2 className="titulo mb-4 text-2xl">Tu pedido</h2>
        <PanelPedido />
      </aside>
    </section>
  );
}
