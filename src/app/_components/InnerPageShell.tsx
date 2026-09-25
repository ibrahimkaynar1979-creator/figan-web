import type { ReactNode } from "react";
import FiFooter from "./FiFooter";
import styles from "./InnerPageShell.module.css";

export default function InnerPageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.brand} aria-label="Fi Yayınevi ana sayfa">
            <span>Fi</span>
            <small>YAYINEVİ</small>
          </a>

          <nav className={styles.nav} aria-label="İç sayfa menüsü">
            <a href="/#hizmetler">Hizmetler</a>
            <a href="/#surec">Süreç</a>
            <a href="/#yazarlar">Yazarlar</a>
            <a href="/#basvuru">İletişim</a>
          </nav>

          <a href="/#basvuru" className={styles.cta}>Yazar Başvurusu</a>
        </div>
      </header>

      {children}

      <FiFooter />
    </>
  );
}
