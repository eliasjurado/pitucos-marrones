import type { Metadata, Viewport } from "next";
import { Figtree, Fredoka } from "next/font/google";
import { SwRegister } from "@/components/SwRegister";
import { ruta } from "@/lib/ruta";
import "./globals.css";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: "Pitumerch · Merch oficial de Pitucos Marrones",
  description: "Camisetas, polos, gorras y pines oficiales de Pitucos Marrones. Arma tu pedido y envíalo por WhatsApp.",
  metadataBase: new URL("https://eliasjurado.com"),
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Pitumerch",
    title: "Pitumerch · Merch oficial de Pitucos Marrones",
    description: "Merch oficial para resentidos sociales de confianza. Pide por WhatsApp.",
    url: ruta("/"),
    images: [{ url: ruta("/og.jpg"), width: 1200, height: 630, alt: "Pitumerch: camiseta guinda de Pitucos Marrones" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: false, follow: false },
  manifest: ruta("/manifest.webmanifest"),
  icons: { icon: ruta("/icons/icon-192.png"), apple: ruta("/icons/icon-192.png") },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#3F2A1D" };

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
