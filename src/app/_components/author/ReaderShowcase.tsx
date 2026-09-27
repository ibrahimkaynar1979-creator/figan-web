import Image from "next/image";
import styles from "./AuthorPlatform.module.css";
import type { AuthorBook, AuthorProfile } from "../../_data/authors";

export default function ReaderShowcase({ author, book }: { author: AuthorProfile; book: AuthorBook }) {
  return (
    <section className={styles.readerSection}>
      <div className={styles.devicePanel}>
        <div className={styles.productHeader}><a href="/">22 <span>YAYINEVİ</span></a><b>•••</b></div>
        <div className={styles.readerCover}><Image src={book.cover} alt={book.title} width={900} height={1100} /></div>
        <h2>{author.name}</h2>
        <p>22 Yayınevi</p>
        <a className={styles.readerButton} href={book.readerUrl || "#"}>Okumaya Başla <span>→</span></a>
        <div className={styles.readerMeta}>
          <span>▤ <b>{book.reader?.chapterCount ?? 0} bölüm</b></span>
          <span>◷ <b>{book.reader?.estimatedReadTime ?? "—"}</b></span>
          <span>▱ <b>{book.reader?.format ?? "EPUB"}</b></span>
        </div>
        <div className={styles.readerBrand}><strong>22</strong><span>Reader</span></div>
      </div>
    </section>
  );
}
