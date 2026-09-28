"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

const themes = [
  { id: "turquoise", label: "Turkuaz", color: "#14b8c4" },
  { id: "coral", label: "Mercan", color: "#f06f61" },
  { id: "graphite", label: "Grafit", color: "#68737d" },
  { id: "navy", label: "Lacivert", color: "#355c8a" },
  { id: "olive", label: "Zeytin", color: "#7d8b58" },
  { id: "amber", label: "Kehribar", color: "#d99a2b" },
] as const;

type ThemeId = (typeof themes)[number]["id"];

export default function ThemeSwitcher() {
  const [themeId, setThemeId] = useState<ThemeId>("turquoise");

  useEffect(() => {
    const saved = window.localStorage.getItem("publishing-os-palette") as ThemeId | null;
    const next = themes.some(theme => theme.id === saved) ? saved! : "turquoise";
    setThemeId(next);

    const sync = (event: Event) => {
      const incoming = (event as CustomEvent<ThemeId>).detail;
      if (themes.some(theme => theme.id === incoming)) setThemeId(incoming);
    };

    window.addEventListener("publishing-os-palette-change", sync);
    return () => window.removeEventListener("publishing-os-palette-change", sync);
  }, []);

  const chooseTheme = (next: ThemeId) => {
    setThemeId(next);
    window.localStorage.setItem("publishing-os-palette", next);
    window.dispatchEvent(new CustomEvent("publishing-os-palette-change", { detail: next }));
  };

  return (
    <div className={styles.control} aria-label="Panel teması">
      <span className={styles.label}>Tema</span>
      <div className={styles.swatches}>
        {themes.map(theme => (
          <button
            type="button"
            key={theme.id}
            className={theme.id === themeId ? styles.active : ""}
            onClick={() => chooseTheme(theme.id)}
            aria-label={theme.label}
            title={theme.label}
            aria-pressed={theme.id === themeId}
          >
            <i style={{ background: theme.color }} />
          </button>
        ))}
      </div>
    </div>
  );
}
