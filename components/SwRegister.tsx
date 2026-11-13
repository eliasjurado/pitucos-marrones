"use client";

import { useEffect } from "react";
import { ruta } from "@/lib/ruta";

export function SwRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register(ruta("/sw.js")).catch(() => {});
    }
  }, []);
  return null;
}
