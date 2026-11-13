import { PedidoProvider } from "@/components/PedidoProvider";
import { BarraPedido } from "@/components/BarraPedido";
import { Catalogo } from "@/components/Catalogo";
import { Cabecera, ComoPedir, Hero, Pie, Preguntas } from "@/components/Secciones";

export default function Page() {
  return (
    <PedidoProvider>
      <Cabecera />
      <main>
        <Hero />
        <Catalogo />
        <ComoPedir />
        <Preguntas />
      </main>
      <Pie />
      <BarraPedido />
    </PedidoProvider>
  );
}
