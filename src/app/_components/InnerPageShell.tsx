import type { ReactNode } from "react";
import Image from "next/image";
import FiFooter from "./FiFooter";
import styles from "./InnerPageShell.module.css";

export default function InnerPageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.brand} aria-label="22 Yayınevi ana sayfa">
            <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={420} height={140} priority />
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
