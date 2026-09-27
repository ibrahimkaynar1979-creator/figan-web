import Image from "next/image";
import styles from "./AuthorPlatform.module.css";
import type { AuthorProfile } from "../../_data/authors";

export default function AuthorLibrary({ author }: { author: AuthorProfile }) {
  return (
    <section id="kitaplar" className={styles.librarySection}>
      <div className={styles.sectionLabel}><span>07</span><b>KİTAPLIK</b></div>
      <div className={styles.libraryHeader}>
        <h2>Her kitap,<br /><em>başka bir kapı.</em></h2>
        <p>Basılı, dijital ve sesli yayınların tamamı aynı yazar dünyasında.</p>
      </div>
      <div className={styles.libraryTrack}>
        {author.books.map((book) => (
          <article key={book.slug} className={styles.libraryBook}>
            <div className={styles.libraryCover}><Image src={book.cover} alt={book.title} width={720} height={900} /></div>
            <div className={styles.libraryBookCopy}>
              <span>{book.year} · {book.genre}</span>
              <h3>{book.title}</h3>
              <div className={styles.libraryStatus}><b>Basılı</b><b>E-Kitap</b><b>Sesli</b></div>
              <div className={styles.libraryActions}>
                <a href={book.printUrl || "#"}>İncele</a>
                <a href={book.readerUrl || "#"}>Oku</a>
                <a href={book.audioUrl || "#"}>Dinle</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
