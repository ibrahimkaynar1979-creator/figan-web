"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";

type Theme = "light" | "dark";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".publishing-os");
    const saved = (window.localStorage.getItem("publishing-os-theme") as Theme | null) || "light";
    setTheme(saved);
    if (root) root.dataset.theme = saved;
  }, []);

  const setNext = (next: Theme) => {
    const root = document.querySelector<HTMLElement>(".publishing-os");
    setTheme(next);
    window.localStorage.setItem("publishing-os-theme", next);
    if (root) root.dataset.theme = next;
  };

  return (
    <div className={styles.switcher} aria-label="Tema seçimi">
      <button
        type="button"
        className={theme === "light" ? styles.active : ""}
        onClick={() => setNext("light")}
        aria-pressed={theme === "light"}
      >
        Açık
      </button>
      <button
        type="button"
        className={theme === "dark" ? styles.active : ""}
        onClick={() => setNext("dark")}
        aria-pressed={theme === "dark"}
      >
        Koyu
      </button>
    </div>
  );
}
