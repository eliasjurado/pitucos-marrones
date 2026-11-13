// Contenido cerrado de la spec 041 (v1: solo merch). Sin precios conocidos: todo es "Precio por WhatsApp".
export type Foto = { src: string; w: number; h: number; pos?: string };

export const TALLAS = ["S", "M", "L", "XL"] as const;

export type Producto = {
  id: string;
  nombre: string;
  grupo: "camisetas" | "polos" | "gorras" | "accesorios";
  /** null = "Precio por WhatsApp" */
  precio: number | null;
  /** Sin tallas = sin selector (gorras de talla única, pines). */
  tallas?: readonly string[];
  foto: Foto;
  alt: string;
};

export const GRUPOS = [
  { id: "camisetas", nombre: "Camisetas" },
  { id: "polos", nombre: "Polos" },
  { id: "gorras", nombre: "Gorras" },
  { id: "accesorios", nombre: "Accesorios" },
] as const;

export const PRODUCTOS: Producto[] = [
  {
    id: "camiseta-negra", nombre: "Camiseta Pitucos Marrones negra", grupo: "camisetas", precio: null, tallas: TALLAS,
    foto: { src: "/fotos/camiseta-negra.webp", w: 480, h: 640, pos: "50% 45%" },
    alt: "Camiseta negra con rombos y el logo Pitucos Marrones, puesta a un hombre con los brazos cruzados",
  },
  {
    id: "camiseta-guinda", nombre: "Camiseta Pitucos Marrones guinda", grupo: "camisetas", precio: null, tallas: TALLAS,
    foto: { src: "/fotos/camiseta-guinda.webp", w: 480, h: 640, pos: "50% 55%" },
    alt: "Camiseta guinda con el logo Pitucos Marrones, puesta a un hombre que celebra con el puño cerrado",
  },
  {
    id: "polo-brown-park", nombre: "Polo Brown Park", grupo: "polos", precio: null, tallas: TALLAS,
    foto: { src: "/fotos/polo-brown-park.webp", w: 640, h: 640 },
    alt: "Polo blanco con cuatro personajes estilo dibujo animado y el texto Brown Park",
  },
  {
    id: "polo-stoners-lover", nombre: "Polo Stoner's Lover", grupo: "polos", precio: null, tallas: TALLAS,
    foto: { src: "/fotos/polo-stoners-lover.webp", w: 361, h: 640, pos: "50% 55%" },
    alt: "Polo blanco con una cabeza de perfil y el texto Stoner's Lover",
  },
  {
    id: "polo-relax-o-vision", nombre: "Polo Relax-o-Visión", grupo: "polos", precio: null, tallas: TALLAS,
    foto: { src: "/fotos/polo-relax-o-vision.webp", w: 640, h: 640 },
    alt: "Polo negro con un rostro rojo y el texto Relax-o-Visión",
  },
  {
    id: "polo-hijo-de-tv-jardinero", nombre: "Polo Hijo de TV Jardinero y Guardián", grupo: "polos", precio: null, tallas: TALLAS,
    foto: { src: "/fotos/polo-hijo-de-tv-jardinero.webp", w: 640, h: 640 },
    alt: "Polo negro con una ilustración en blanco y negro y el texto Hijo de TV Jardinero y Guardián",
  },
  {
    id: "polo-nada", nombre: "Polo ¡Nada!", grupo: "polos", precio: null, tallas: TALLAS,
    foto: { src: "/fotos/polo-nada.webp", w: 512, h: 640, pos: "50% 60%" },
    alt: "Polo negro con un retrato en mostaza y el texto ¡Nada!",
  },
  {
    id: "polo-leto-sound-machine", nombre: "Polo Leto Sound Machine", grupo: "polos", precio: null, tallas: TALLAS,
    foto: { src: "/fotos/polo-leto-sound-machine.webp", w: 512, h: 640, pos: "50% 62%" },
    alt: "Polo negro con un DJ en mostaza y el texto Leto Sound Machine",
  },
  {
    id: "polo-einstein", nombre: "Polo ¿Quién te crees, Einstein?", grupo: "polos", precio: null, tallas: TALLAS,
    foto: { src: "/fotos/polo-einstein.webp", w: 512, h: 640, pos: "50% 55%" },
    alt: "Polo negro con una ilustración en blanco y negro y el texto ¿Quién te crees, Einstein?",
  },
  {
    id: "gorra-campeones", nombre: "Gorra Campeones", grupo: "gorras", precio: null,
    foto: { src: "/fotos/gorra-campeones.webp", w: 640, h: 640 },
    alt: "Gorra trucker crema con visera marrón y la palabra Campeones en letra cursiva",
  },
  {
    id: "gorra-trucker", nombre: "Gorra trucker Pitucos Marrones", grupo: "gorras", precio: null,
    foto: { src: "/fotos/gorra-trucker.webp", w: 512, h: 640, pos: "50% 50%" },
    alt: "Gorra trucker blanca con visera marrón y el logo Pitucos Marrones, flotando en un cielo celeste",
  },
  {
    id: "pines", nombre: "Pines ¡Nada! y Pitucos Marrones", grupo: "accesorios", precio: null,
    foto: { src: "/fotos/pines.webp", w: 512, h: 640, pos: "50% 50%" },
    alt: "Pines mostaza con el retrato de ¡Nada! y el logo Pitucos Marrones sobre una chaqueta de jean",
  },
];

export const lineaId = (id: string, talla?: string) => (talla ? `${id}|${talla}` : id);
export const productoPorId = (id: string) => PRODUCTOS.find((p) => p.id === id);
