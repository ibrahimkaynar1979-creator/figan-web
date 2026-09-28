"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "./ReaderPanel.module.css";

const books = [
  {
    title: "Bir Şifacının Kanadı",
    author: "Figen Yavuz",
    cover: "/bir_sifaci_png.png",
    status: "Yayında",
    chapters: 85,
    format: "EPUB",
    updated: "Bugün",
    href: "/oku/bir-sifacinin-kanadi",
  },
];

export default function ReaderPanelPage() {
  useEffect(() => {
    document.body.classList.add("reader-admin-route");
    return () => document.body.classList.remove("reader-admin-route");
  }, []);

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <a href="/" className={styles.brand} aria-label="22 Yayınevi ana sayfa">
          <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={330} height={210} priority />
        </a>

        <div className={styles.readerMark}>
          <Image src="/22_reader_logo.png" alt="22 Reader" width={360} height={118} priority />
        </div>

        <nav className={styles.nav} aria-label="Reader yönetim menüsü">
          <a className={styles.active} href="/panel/reader"><span>▦</span> Kitaplar</a>
          <a href="/panel/reader/yeni"><span>＋</span> Yeni Kitap</a>
          <a href="/panel/reader"><span>◌</span> Taslaklar</a>
          <a href="/panel/reader"><span>⌁</span> Yayındakiler</a>
        </nav>

        <div className={styles.sidebarFoot}>
          <span>22 READER</span>
          <p>Dijital yayın yönetimi</p>
        </div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <span className={styles.kicker}>22 READER · YÖNETİM</span>
            <h1>Kitaplar</h1>
          </div>
          <a className={styles.newButton} href="/panel/reader/yeni">
            <span>＋</span> Yeni Kitap
          </a>
        </header>

        <section className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>DİJİTAL KÜTÜPHANE</p>
            <h2>
              Kitaplarınızı <em>tek bir yerden</em> yönetin.
            </h2>
          </div>
          <p>
            EPUB dosyası, kapak, kitap bilgileri ve yayın durumu aynı akışta.
            Kitabınızı hazırlayın, önizleyin ve 22 Reader’da yayınlayın.
          </p>
        </section>

        <section className={styles.stats} aria-label="Reader özeti">
          <article><b>{books.length}</b><span>Toplam Kitap</span></article>
          <article><b>{books.filter(book => book.status === "Yayında").length}</b><span>Yayında</span></article>
          <article><b>85</b><span>Toplam Bölüm</span></article>
          <article><b>EPUB 3</b><span>Aktif Format</span></article>
        </section>

        <div className={styles.sectionHead}>
          <div>
            <span>KÜTÜPHANE</span>
            <h3>Reader Kitapları</h3>
          </div>
          <button type="button" aria-label="Kitaplarda ara">⌕</button>
        </div>

        <section className={styles.grid}>
          {books.map(book => (
            <article className={styles.bookCard} key={book.title}>
              <div className={styles.coverWrap}>
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={420}
                  height={600}
                  className={styles.cover}
                />
                <span className={styles.status}>{book.status}</span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardTopline}>
                  <span>22 READER</span>
                  <span>{book.updated}</span>
                </div>

                <h4>{book.title}</h4>
                <p className={styles.author}>{book.author}</p>

                <div className={styles.meta}>
                  <span><b>{book.chapters}</b> bölüm</span>
                  <i />
                  <span>{book.format}</span>
                  <i />
                  <span>Türkçe</span>
                </div>

                <div className={styles.cardActions}>
                  <a href={book.href} target="_blank" rel="noreferrer">Önizle <span>↗</span></a>
                  <a href="/panel/reader/yeni">Düzenle <span>→</span></a>
                </div>
              </div>
            </article>
          ))}

          <a className={styles.addCard} href="/panel/reader/yeni">
            <span className={styles.addIcon}>＋</span>
            <span className={styles.addKicker}>YENİ YAYIN</span>
            <h4>Yeni kitap ekle</h4>
            <p>Kapak ve EPUB dosyanızı yükleyerek yeni bir 22 Reader kitabı oluşturun.</p>
            <b>Kitap Oluştur <span>→</span></b>
          </a>
        </section>
      </section>
    </main>
  );
}
