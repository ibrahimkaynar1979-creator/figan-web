"use client";

import { useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const palettes = ["turquoise","coral","graphite","navy","olive","amber"] as const;
type Palette = (typeof palettes)[number];

export default function PanelThemeRoot({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState<Palette>("turquoise");

  useEffect(() => {
    const saved = window.localStorage.getItem("publishing-os-palette") as Palette | null;
    const next = palettes.includes(saved as Palette) ? (saved as Palette) : "turquoise";
    setPalette(next);
  }, []);

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== "publishing-os-palette") return;
      const next = palettes.includes(event.newValue as Palette) ? (event.newValue as Palette) : "turquoise";
      setPalette(next);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <div className="publishing-os" data-theme="light" data-palette={palette} data-tenant-theme="publisher">
      {children}
    </div>
  );
}
