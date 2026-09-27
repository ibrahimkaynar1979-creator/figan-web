import styles from "./AuthorPlatform.module.css";
import type { AuthorProfile } from "../../_data/authors";

export default function AuthorIntro({ author }: { author: AuthorProfile }) {
  return (
    <section className={styles.authorIntro} style={{ backgroundImage: `url("${author.portraitSecondary}")` }}>
      <div className={styles.authorIntroShade} />
      <div className={styles.authorIntroCopy}>
        <span>05 · YAZARI TANIYIN</span>
        <h2>{author.name}</h2>
        <p>{author.bio}</p>
        <a href="#hakkinda">Hikâyemi Oku <b>→</b></a>
      </div>
    </section>
  );
}
