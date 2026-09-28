"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentTheme = useMemo(
    () => themes.find(theme => theme.id === themeId) ?? themes[0],
    [themeId]
  );

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

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const chooseTheme = (next: ThemeId) => {
    setThemeId(next);
    window.localStorage.setItem("publishing-os-palette", next);
    window.dispatchEvent(new CustomEvent("publishing-os-palette-change", { detail: next }));
    setOpen(false);
  };

  return (
    <div className={styles.picker} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen(value => !value)}
        aria-expanded={open}
        aria-label="Panel temasını seç"
      >
        <span className={styles.paletteIcon}>◉</span>
        <i className={styles.currentDot} style={{ background: currentTheme.color }} />
        <strong>Tema</strong>
      </button>

      {open ? (
        <div className={styles.popover}>
          <div className={styles.popoverHead}>
            <strong>Panel Teması</strong>
            <small>Renk karakterini seçin</small>
          </div>
          <div className={styles.options}>
            {themes.map(theme => (
              <button
                type="button"
                key={theme.id}
                className={theme.id === themeId ? styles.selected : ""}
                onClick={() => chooseTheme(theme.id)}
              >
                <i style={{ background: theme.color }} />
                <span>{theme.label}</span>
                {theme.id === themeId ? <b>✓</b> : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
