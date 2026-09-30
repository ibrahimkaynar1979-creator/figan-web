import Link from "next/link";
import styles from "./DigitalExperiences.module.css";

export default function DigitalExperiences() {
  return (
    <section className={styles.section} aria-label="22 Yayınevi dijital deneyimleri">
      <div className={styles.visual}>
        <img
          src="/22-yayinevi-dijital-deneyimler-3lu-telefon-vitrini-v1.png"
          alt=""
          className={styles.background}
          loading="lazy"
          decoding="async"
        />

        <div className={styles.overlay}>
          <div className={styles.heading}>
            <span>22 YAYINEVİ</span>
            <h2>Dijital Deneyimler</h2>
            <p>Yazarın kitabı, sesi ve dijital dünyası tek bir yayın deneyiminde buluşuyor.</p>
          </div>

          <div className={styles.actions}>
            <Link href="/oku/bir-sifacinin-kanadi">E-Kitap</Link>
            <Link href="/yazarlar/figen-yavuz">Yazar Sitesi</Link>
            <Link href="/dinle/bir-sifacinin-kanadi">Sesli Kitap</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
