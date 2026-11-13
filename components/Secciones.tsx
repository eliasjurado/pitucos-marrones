import { ruta } from "@/lib/ruta";
import Image from "next/image";
import { IconoMas } from "./Iconos";
import { Logotipo } from "./Logotipo";

export function Cabecera() {
  return (
    <header className="bg-chocolate text-crema">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="#" aria-label="Pitumerch, inicio" className="inline-flex min-h-11 items-center">
          <Logotipo className="text-[1.6rem]" />
        </a>
        <a href="#catalogo" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">Catálogo</a>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="t-hero" className="sobre-oscuro bg-chocolate text-crema">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-[1fr_26rem] lg:items-center lg:gap-12 lg:px-4">
        <Image
          src={ruta("/fotos/camiseta-guinda.webp")}
          alt="Hombre celebrando con el puño cerrado, con la camiseta guinda de Pitucos Marrones"
          width={480}
          height={640}
          priority
          className="aspect-[4/3] w-full object-cover object-[50%_40%] lg:order-2 lg:aspect-[3/4] lg:max-w-[26rem] lg:rounded-xl"
        />
        <div className="px-4 py-10 lg:px-0 lg:py-20">
          <p className="font-bold text-mostaza">Merch oficial del podcast</p>
          <h1 id="t-hero" className="titulo mt-3 text-5xl lg:text-7xl">Merch para resentidos sociales de confianza</h1>
          <p className="mt-4 max-w-md text-lg">Camisetas, polos, gorras y pines de Pitucos Marrones. Pides por WhatsApp.</p>
          <a href="#catalogo" className="btn mt-6">Ver el catálogo</a>
        </div>
      </div>
    </section>
  );
}

const PASOS = [
  ["Elige", "Agrega lo que quieras al pedido. En camisetas y polos, con su talla."],
  ["Completa", "Pon tu nombre y dónde lo recibes: delivery en Lima o envío a provincia."],
  ["Envía", "Se abre WhatsApp con el pedido escrito. Tú aprietas enviar y coordinamos el pago ahí."],
];

export function ComoPedir() {
  return (
    <section aria-labelledby="t-como" className="border-y-2 border-tinta bg-mostaza text-tinta">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <h2 id="t-como" className="titulo text-3xl lg:text-4xl">Cómo pedir</h2>
        <ol className="mt-8 grid gap-4 lg:grid-cols-3">
          {PASOS.map(([t, d], i) => (
            <li key={t} className="revelar rounded-xl border-2 border-tinta bg-crema p-5">
              <p className="titulo text-5xl text-guinda" aria-hidden="true">{i + 1}</p>
              <h3 className="titulo mt-1 text-2xl">{t}</h3>
              <p className="mt-2">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const PREGUNTAS = [
  ["¿Qué tallas hay?", "Camisetas y polos vienen en S, M, L y XL. Las gorras son de talla única y los pines no tienen talla."],
  ["¿Hacen envíos a provincia?", "Sí. En el pedido pones tu ciudad y el costo y el tiempo del envío se coordinan por WhatsApp. En Lima hay delivery: pones tu distrito."],
  ["¿Cómo pago?", "Se coordina por WhatsApp, junto con el precio final de tu pedido."],
];

export function Preguntas() {
  return (
    <section aria-labelledby="t-faq" className="mx-auto max-w-3xl px-4 py-12 lg:py-16">
      <h2 id="t-faq" className="titulo text-3xl lg:text-4xl">Preguntas frecuentes</h2>
      <div className="mt-6 border-t-2 border-tinta">
        {PREGUNTAS.map(([q, a]) => (
          <details key={q} name="faq" className="faq border-b border-linea">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-3 font-bold">
              {q}
              <IconoMas className="mas size-6 shrink-0 text-marca" />
            </summary>
            <p className="pb-4 text-tinta-suave">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Pie() {
  return (
    <footer className="sobre-oscuro bg-negro py-10 text-crema">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Logotipo className="text-[1.6rem]" />
            <p className="max-w-xs titulo text-lg leading-tight">Muy marrones para ser pitucos, muy pitucos para ser marrones.</p>
          </div>
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <a href="https://www.youtube.com/@Pitucos.Marrones" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">YouTube</a>
            </li>
            <li>
              <a href="https://www.instagram.com/pitucosmarronesmerch/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold underline underline-offset-4">Instagram</a>
            </li>
          </ul>
        </div>
        <p className="text-sm text-crema/80">
          Hecho con <span role="img" aria-label="amor">❤️</span> por{" "}
          <a href="https://eliasjurado.com" className="text-crema underline underline-offset-2 hover:no-underline">
            Elías Jurado
          </a>
        </p>
      </div>
    </footer>
  );
}
