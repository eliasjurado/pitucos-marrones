"use client";

import { ruta } from "@/lib/ruta";
import { conTransicion } from "@/lib/transicion";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { GRUPOS, LINEAS, PRODUCTOS, type Producto } from "@/content/catalogo";
import { usePedido } from "./PedidoProvider";
import { PanelPedido } from "./PanelPedido";

function Tarjeta({ p }: { p: Producto }) {
  const { agregar } = usePedido();
  const uid = useId();
  const [talla, setTalla] = useState("");
  const [error, setError] = useState("");
  const [agregado, setAgregado] = useState("");
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(temporizador.current), []);

  const poner = () => {
    if (p.tallas && !talla) {
      setError("Elige una talla para agregar.");
      return;
    }
    setError("");
    conTransicion(() => agregar(p.id, p.tallas ? talla : undefined, 1));
    setAgregado(p.tallas ? `Agregado, talla ${talla}` : "Agregado");
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setAgregado(""), 2000);
  };

  return (
    <li className="tarjeta-nueva panel flex flex-col overflow-hidden">
      <Image
        src={ruta(p.foto.src)}
        alt={p.alt}
        width={p.foto.w}
        height={p.foto.h}
        className="aspect-square w-full object-cover"
        style={{ objectPosition: p.foto.pos }}
      />
      <div className="flex flex-1 flex-col p-3">
        <h5 className="titulo text-base leading-tight sm:text-lg">{p.nombre}</h5>
        <p className="mt-1 text-sm text-tinta-suave">Precio por WhatsApp</p>

        {p.tallas ? (
          <div
            role="group"
            aria-label={`Talla de ${p.nombre}`}
            aria-describedby={error ? `${uid}-e` : undefined}
            className="mt-3 grid grid-cols-2 gap-2 min-[520px]:grid-cols-4 min-[520px]:gap-1.5"
          >
            {p.tallas.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={talla === t}
                onClick={() => {
                  setTalla(t);
                  setError("");
                }}
                className="talla"
              >
                {t}
              </button>
            ))}
          </div>
        ) : (
          p.grupo === "gorras" && <p className="mt-3 text-sm font-bold">Talla única</p>
        )}
        <p id={`${uid}-e`} role="alert" className="mt-2 text-sm font-bold text-guinda empty:hidden">{error}</p>

        <div className="mt-auto pt-3">
          <button type="button" className="btn w-full px-2" onClick={poner} aria-label={`Agregar ${p.nombre}`}>
            {agregado || "Agregar"}
          </button>
        </div>
        <span role="status" className="sr-only">{agregado}</span>
      </div>
    </li>
  );
}

export function Catalogo() {
  const { totalItems } = usePedido();
  const grupos = GRUPOS.filter((g) => PRODUCTOS.some((p) => p.grupo === g.id));
  return (
    <section id="catalogo" aria-labelledby="t-catalogo" className="mx-auto max-w-6xl px-4 pb-12 pt-10 lg:grid lg:grid-cols-[1fr_22rem] lg:gap-10 lg:pb-16 lg:pt-14">
      <div>
        <h2 id="t-catalogo" className="titulo text-4xl lg:text-5xl">Tienda</h2>
        <p className="mt-2 max-w-md text-tinta-suave">Elige, agrega y el pedido te sale ya escrito en WhatsApp.</p>

        <nav aria-label="Categorías" className="sticky top-0 z-30 -mx-4 mt-4 bg-crema px-4 py-2">
          <ul className="sin-barra flex gap-1.5 overflow-x-auto">
            {grupos.map((g) => (
              <li key={g.id}>
                <a href={`#g-${g.id}`} className="chip">{g.nombre}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 space-y-14">
          {LINEAS.map((l) => (
            <div key={l.id} aria-labelledby={`t-${l.id}`}>
              <h3 id={`t-${l.id}`} className="titulo text-2xl lg:text-3xl">{l.nombre}</h3>
              <p className="mt-1 text-tinta-suave">{l.bajada}</p>
              <div className="mt-6 space-y-10">
                {GRUPOS.map((g) => {
                  const productos = PRODUCTOS.filter((p) => p.linea === l.id && p.grupo === g.id);
                  if (productos.length === 0) return null;
                  return (
                    <div key={g.id} id={`g-${g.id}`} className="revelar scroll-mt-28">
                      <h4 className="titulo mb-4 text-xl text-marca">{g.nombre}</h4>
                      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                        {productos.map((p) => (
                          <Tarjeta key={p.id} p={p} />
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <aside id="pedido" aria-label="Tu pedido" className="panel mt-10 hidden self-start p-5 lg:sticky lg:top-6 lg:block">
        <h2 className="titulo mb-4 text-2xl">
          Tu pedido{totalItems > 0 && <> (<span className="contador">{totalItems}</span>)</>}
        </h2>
        <PanelPedido />
      </aside>
    </section>
  );
}
