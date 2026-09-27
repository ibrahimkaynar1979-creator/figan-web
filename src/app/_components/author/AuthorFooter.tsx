import styles from "./AuthorPlatform.module.css";
import type { AuthorProfile } from "../../_data/authors";

export default function AuthorFooter({ author }: { author: AuthorProfile }) {
  return (
    <footer className={styles.authorFooter}>
      <h2>{author.name}</h2>
      <nav>
        <a href="#kitaplar">Kitaplar</a><a href="#hakkinda">Hakkında</a><a href="#">Yazılar</a>
        <a href="#">Etkinlikler</a><a href="#">Basın</a><a href="#">İletişim</a>
      </nav>
      <div className={styles.footerBottom}><span>Yayın dünyası 22 Yayınevi tarafından oluşturuldu.</span><a href="/">22 Yayınevi</a></div>
    </footer>
  );
}
