import type { Metadata, Viewport } from "next";
import { Figtree, Fredoka } from "next/font/google";
import { SwRegister } from "@/components/SwRegister";
import { ruta } from "@/lib/ruta";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: "Pitucos Marrones · Tienda oficial",
  description: "Tienda oficial de Pitucos Marrones: Pitumerch con camisetas, polos, gorras y pines. Arma tu pedido y envíalo por WhatsApp.",
  metadataBase: new URL("https://eliasjurado.com"),
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Pitucos Marrones",
    title: "Pitucos Marrones · Tienda oficial",
    description: "Muy marrones para ser pitucos, muy pitucos para ser marrones. Pide el merch oficial por WhatsApp.",
    url: ruta("/"),
    images: [{ url: ruta("/og.jpg"), width: 1200, height: 630, alt: "Pitucos Marrones: tienda oficial, con la camiseta guinda" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: false, follow: false },
  manifest: ruta("/manifest.webmanifest"),
  icons: { icon: ruta("/icon.png"), apple: ruta("/icons/icon-192.png") },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#433938" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${fredoka.variable} ${figtree.variable}`}>
      <body>
        {children}
        <SwRegister />
      </body>
    </html>
  );
}
