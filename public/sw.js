// Service worker de Pitumerch. Sube VERSION en cada release.
// Solo cachea estáticos de una lista permitida. El HTML y todo lo demás va directo a la red.
const VERSION = "pitumerch-v1";
const BASE = new URL(self.registration.scope).pathname.replace(/\/$/, "");
const PERMITIDOS = ["/_next/static/", "/fotos/", "/icons/"].map((p) => BASE + p);
const PRIVADOS = ["/admin", "/auth", "/api", "/login"].map((p) => BASE + p);

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.headers.get("RSC") || url.searchParams.has("_rsc")) return;
  if (PRIVADOS.some((p) => url.pathname.startsWith(p))) return;
  if (!PERMITIDOS.some((p) => url.pathname.startsWith(p))) return; // HTML: red, sin cache

  // stale-while-revalidate
  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const guardado = await cache.match(req);
      const red = fetch(req)
        .then((res) => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => guardado);
      return guardado || red;
    }),
  );
});
