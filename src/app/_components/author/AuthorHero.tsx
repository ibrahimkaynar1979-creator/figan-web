import styles from "./AuthorPlatform.module.css";
import type { AuthorProfile } from "../../_data/authors";

export default function AuthorHero({ author }: { author: AuthorProfile }) {
  return (
    <section id="top" className={styles.hero} style={{ backgroundImage: `url("${author.heroImage}")` }}>
      <header className={styles.heroHeader}>
        <div>
          <a href="#top" className={styles.heroName}>{author.name}</a>
          <span className={styles.role}>{author.role}</span>
        </div>
        <div className={styles.heroHeaderRight}>
          <button aria-label="Ara" className={styles.searchButton}><span /></button>
          <button aria-label="Menüyü aç" className={styles.menuButton}><i /><i /></button>
          <a href="/" className={styles.publisherMini} aria-label="22 Yayınevi"><strong>22</strong><small>YAYINEVİ</small></a>
        </div>
      </header>
      <div className={styles.heroShade} />
      <div className={styles.heroCopy}>
        <blockquote>“{author.heroQuote}”</blockquote>
        <span>{author.name}</span>
      </div>
      <a className={styles.scrollCue} href="#son-kitap"><i />AŞAĞI KAYDIR<b>⌄</b></a>
    </section>
  );
}
