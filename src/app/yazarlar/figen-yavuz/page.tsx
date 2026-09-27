import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Figen Yavuz",
  description:
    "Figen Yavuz'un yazar dünyası; Bir Şifacının Kanadı, e-kitap ve sesli kitap deneyimleri.",
  alternates: { canonical: "/yazarlar/figen-yavuz" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Figen Yavuz",
  url: "https://www.22yayinevi.com/yazarlar/figen-yavuz",
  affiliation: { "@id": "https://www.22yayinevi.com/#organization" },
};

const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Bir Şifacının Kanadı",
  author: { "@type": "Person", name: "Figen Yavuz" },
  publisher: { "@id": "https://www.22yayinevi.com/#organization" },
  inLanguage: "tr",
};

function ArrowIcon() {
  return <span aria-hidden="true">→</span>;
}

export default function Page() {
  return (
    <main className={styles.authorWorld}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />

      <header className={styles.header}>
        <a className={styles.authorName} href="#top">Figen Yavuz</a>
        <div className={styles.headerRight}>
          <button className={styles.iconButton} aria-label="Ara">
            <span className={styles.searchIcon} />
          </button>
          <button className={styles.menuButton} aria-label="Menüyü aç">
            <span /><span />
          </button>
          <a className={styles.publisherMark} href="/" aria-label="22 Yayınevi">
            <strong>22</strong><small>YAYINEVİ</small>
          </a>
        </div>
      </header>

      <section id="top" className={styles.hero}>
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <div className={styles.heroInner}>
          <p className={styles.kicker}>YAZAR</p>
          <h1>Figen<br />Yavuz</h1>
          <p className={styles.heroQuote}>
            “İnsan bazen kendine dönebilmek için önce bütün yollarını kaybetmelidir.”
          </p>
          <a className={styles.discover} href="#son-kitap">
            <span className={styles.discoverCircle}>↓</span>
            <span>KEŞFET</span>
          </a>
        </div>
      </section>

      <section id="son-kitap" className={styles.bookSection}>
        <div className={styles.bookTopline}>
          <span>01</span>
          <span>SON KİTAP</span>
        </div>

        <h2>BİR ŞİFACININ<br /><em>KANADI</em></h2>

        <div className={styles.bookStage}>
          <div className={styles.bookGlow} aria-hidden="true" />
          <Image
            className={styles.bookImage}
            src="/figen-yavuz-arayisin-yolculugu-mockup.webp"
            alt="Figen Yavuz kitabı için geçici kitap görseli"
            width={900}
            height={1100}
            priority
          />
        </div>

        <p className={styles.bookSubtitle}>İnsanın Kendine Dönüş Yolculuğu</p>
        <p className={styles.bookTeaser}>Bazen en derin acılar en güzel kanatları büyütür…</p>

        <div className={styles.bookActions}>
          <a className={styles.primaryAction} href="#satinal">
            <span className={styles.actionIcon}>⌑</span>
            <b>Satın Al</b>
            <ArrowIcon />
          </a>
          <a className={styles.secondaryAction} href="/oku/bir-sifacinin-kanadi">
            <span className={styles.actionIcon}>▤</span>
            <b>E-Kitap Oku</b>
            <ArrowIcon />
          </a>
          <a className={styles.secondaryAction} href="/sesli-kitap">
            <span className={styles.actionIcon}>◉</span>
            <b>Sesli Kitap Dinle</b>
            <ArrowIcon />
          </a>
        </div>

        <div className={styles.formatRail} aria-label="Kitap formatları">
          <div><span>▤</span><b>BASILI KİTAP</b><small>Taşıyın, hikâye kalsın</small></div>
          <div><span>▯</span><b>E-KİTAP</b><small>Her yerde sizinle</small></div>
          <div><span>◉</span><b>SESLİ KİTAP</b><small>Dinle, hisset</small></div>
          <div><span>≡</span><b>ÖRNEK BÖLÜM</b><small>Ücretsiz incele</small></div>
        </div>
      </section>

      <section className={styles.nextSection} aria-label="Sonraki bölüm">
        <span>02</span>
        <p>Yazarın dünyası burada devam edecek.</p>
      </section>
    </main>
  );
}
