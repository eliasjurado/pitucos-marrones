import type { Metadata } from "next";
import { PanelFavoritos } from "@/components/PanelFavoritos";
import { FavoritosProvider } from "@/components/FavoritosProvider";
import { PedidoProvider } from "@/components/PedidoProvider";
import { Cabecera, Pie } from "@/components/Secciones";
import { ruta } from "@/lib/ruta";

export const metadata: Metadata = {
  title: "Privacidad · Pitucos Marrones",
  description: "Qué pasa con tu nombre y tu ciudad cuando armas un pedido en la tienda de Pitucos Marrones.",
};

export default function Page() {
  return (
    <PedidoProvider>
    <FavoritosProvider>
      <Cabecera base={ruta("/")} />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="titulo text-3xl leading-tight">Privacidad</h1>
        <p className="mt-3 text-tinta-suave">Aquí va claro qué pasa con lo que escribes al armar tu pedido.</p>

        <h2 className="titulo mt-8 text-xl">Qué te pedimos</h2>
        <p className="mt-2">Tu nombre y, según cómo lo recibas, tu distrito (delivery en Lima) o tu ciudad (envío a provincia). Nada más: no pedimos correo, teléfono ni dirección en esta página.</p>

        <h2 className="titulo mt-8 text-xl">Qué hacemos con eso</h2>
        <p className="mt-2">Con esos datos y los productos que elegiste, la página arma un mensaje ya redactado y abre WhatsApp para que tú lo envíes. Si no aprietas enviar allá, el mensaje no sale de tu celular. Esta página no guarda tu nombre ni tu ciudad en ningún servidor ni los manda a otro sitio.</p>
        <p className="mt-2">Cuando envías el mensaje, lo recibe Pitucos Marrones por WhatsApp y lo usa solo para atender tu pedido. WhatsApp lo trata según sus propias condiciones.</p>

        <h2 className="titulo mt-8 text-xl">Lo que se queda en tu dispositivo</h2>
        <p className="mt-2">Para que no pierdas tu pedido si cierras la pestaña, el navegador guarda en tu propio dispositivo los productos que elegiste y lo que escribiste en nombre y lugar. Eso solo lo ve tu navegador. Puedes borrarlo con «Vaciar pedido» o limpiando los datos del sitio en la configuración del navegador.</p>
        <p className="mt-2">Si marcas productos con el corazón, también se guarda en tu dispositivo la lista de esos productos (solo cuáles son, nada más). No se envía a nadie. Se borra al quitar el corazón o al limpiar los datos del sitio en el navegador. No usamos cookies de publicidad ni de análisis.</p>

        <h2 className="titulo mt-8 text-xl">Tus derechos</h2>
        <p className="mt-2">Si ya enviaste un pedido y quieres que corrijan o borren tus datos, pídelo por el mismo chat de WhatsApp. La Ley 29733 de Protección de Datos Personales del Perú te respalda.</p>

        <p className="mt-8 text-sm text-tinta-suave">Vista previa de demostración: los datos de la tienda como responsable y el texto final se completan antes de publicar.</p>
        <a href={ruta("/")} className="btn btn-borde mt-6 inline-flex">Volver a la tienda</a>
      </main>
      <Pie />
      <PanelFavoritos enTienda={false} />
    </FavoritosProvider>
    </PedidoProvider>
  );
}
