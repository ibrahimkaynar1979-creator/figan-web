"use client";

import { useEffect, useState } from "react";

const palettes = ["turquoise","coral","graphite","navy","olive","amber"] as const;
type Palette = (typeof palettes)[number];

const STORAGE_KEY = "publishing-os-palette";
const EVENT_NAME = "publishing-os-palette-change";

const validPalette = (value: string | null): Palette =>
  palettes.includes(value as Palette) ? (value as Palette) : "turquoise";

export default function PanelThemeRoot({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState<Palette>("turquoise");

  useEffect(() => {
    setPalette(validPalette(window.localStorage.getItem(STORAGE_KEY)));

    const onPalette = (event: Event) => {
      const next = validPalette((event as CustomEvent<string>).detail);
      setPalette(next);
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setPalette(validPalette(event.newValue));
    };

    window.addEventListener(EVENT_NAME, onPalette);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT_NAME, onPalette);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <div className="publishing-os" data-palette={palette} data-tenant-theme="publisher">
      {children}
    </div>
  );
}
