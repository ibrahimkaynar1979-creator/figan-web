import styles from "./AuthorPlatform.module.css";
import type { AuthorProfile } from "../../_data/authors";

export default function AuthorArticles({ author }: { author: AuthorProfile }) {
  return (
    <section className={styles.articlesSection}>
      <div className={styles.sectionLabel}><span>06</span><b>YAZARDAN</b></div>
      <div className={styles.articleGrid}>
        {author.articles.slice(0,3).map((article, index) => (
          <a key={article.title} href={article.href} className={styles.articleItem}>
            <span>0{index + 1}</span>
            <h3>{article.title}</h3>
            <p>{article.date}</p>
            <b>→</b>
          </a>
        ))}
      </div>
    </section>
  );
}
