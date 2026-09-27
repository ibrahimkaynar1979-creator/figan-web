import styles from "./AuthorPlatform.module.css";
import type { AuthorProfile } from "../../_data/authors";

export default function AuthorEvents({ author }: { author: AuthorProfile }) {
  if (!author.events.length) return null;
  return (
    <section className={styles.eventsSection}>
      <div className={styles.sectionLabel}><span>08</span><b>ETKİNLİKLER</b></div>
      {author.events.map((event) => (
        <a key={event.title + event.date} href={event.href || "#"} className={styles.eventRow}>
          <time>{event.date}</time><h3>{event.title}</h3><p>{event.place}</p><span>{event.type}</span>
        </a>
      ))}
    </section>
  );
}
