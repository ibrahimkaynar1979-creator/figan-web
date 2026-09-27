import styles from "./AuthorPlatform.module.css";

export default function AuthorNewsletter() {
  return (
    <section className={styles.newsletter}>
      <p>Yazardan yeni metinleri ve kitap haberlerini alın.</p>
      <form className={styles.newsletterForm}>
        <input aria-label="E-posta adresiniz" type="email" placeholder="E-posta adresiniz" />
        <button type="submit">Katıl →</button>
      </form>
    </section>
  );
}
