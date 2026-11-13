// Dónde está Pitucos Marrones. Para sumar una plataforma (TikTok, Cinesmero...): agrega una entrada aquí.
export type Plataforma = {
  id: string;
  nombre: string;
  /** Una línea que dice qué hay ahí. */
  bajada: string;
  href: string;
  icono: "play" | "vivo" | "camara" | "bolsa" | "nota";
};

export const PLATAFORMAS: Plataforma[] = [
  { id: "youtube", nombre: "YouTube", bajada: "Los episodios completos", href: "https://www.youtube.com/@Pitucos.Marrones", icono: "play" },
  { id: "kick", nombre: "Kick", bajada: "El stream en vivo", href: "https://kick.com/pitucosmarrones666", icono: "vivo" },
  { id: "tiktok", nombre: "TikTok", bajada: "Videos cortos", href: "https://www.tiktok.com/@pitucos.marrones", icono: "nota" },
  { id: "instagram", nombre: "Instagram", bajada: "Clips y el día a día", href: "https://www.instagram.com/pitucosmarrones/", icono: "camara" },
  { id: "pitumerch", nombre: "Pitumerch en Instagram", bajada: "Merch y stock nuevo", href: "https://www.instagram.com/pitucosmarronesmerch/", icono: "bolsa" },
];
