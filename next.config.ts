import type { NextConfig } from "next";
import { BASE } from "./lib/ruta";

const config: NextConfig = {
  output: "export",
  basePath: BASE,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default config;
