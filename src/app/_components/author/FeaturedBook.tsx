import Image from "next/image";
import styles from "./AuthorPlatform.module.css";
import type { AuthorBook } from "../../_data/authors";

export default function FeaturedBook({ book }: { book: AuthorBook }) {
  return (
    <section id="son-kitap" className={styles.featuredBook}>
      <div className={styles.sectionLabel}><span>02</span><b>SON KİTAP</b></div>
      <div className={styles.featuredGrid}>
        <div className={styles.featuredCopy}>
          <h2>{book.title}</h2>
          <p className={styles.subtitle}>{book.subtitle}</p>
          <p className={styles.teaser}>Bazen en derin acılar en güzel kanatları büyütür…</p>
          <div className={styles.bookActions}>
            <a className={styles.primaryAction} href={book.printUrl || "#"}>Satın Al <span>→</span></a>
            <a href={book.readerUrl || "#"}>E-Kitap Oku <span>→</span></a>
            <a href={book.audioUrl || "#"}>Sesli Kitap Dinle <span>→</span></a>
          </div>
        </div>
        <div className={styles.bookVisual}>
          <Image src={book.cover} alt={book.title} width={900} height={1100} priority />
        </div>
      </div>
      <div className={styles.formatRail}>
        <div><b>▤</b><strong>BASILI KİTAP</strong><span>Taşınan hikâye</span></div>
        <div><b>▯</b><strong>E-KİTAP</strong><span>Her yerde seninle</span></div>
        <div><b>◉</b><strong>SESLİ KİTAP</strong><span>Dinle, hisset</span></div>
        <div><b>≡</b><strong>ÖRNEK BÖLÜM</strong><span>Ücretsiz incele</span></div>
      </div>
    </section>
  );
}
