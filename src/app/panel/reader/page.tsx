"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./ReaderPanel.module.css";
import { listManagedBooks } from "../_lib/managedStore";

const books = [
  {
    title: "Bir Şifacının Kanadı",
    author: "Figen Yavuz",
    authorSlug: "figen-yavuz",
    authorHref: "/yazarlar/figen-yavuz",
    subtitle: "İnsanın Kendine Dönüş Yolculuğu",
    slug: "bir-sifacinin-kanadi",
    cover: "/bir_sifaci_png.png",
    status: "Yayında",
    chapters: 85,
    format: "EPUB 3",
    language: "Türkçe",
    publisher: "22 Yayınevi",
    updated: "Bugün",
    readerHref: "/oku/bir-sifacinin-kanadi",
  },
];

export default function ReaderPanelPage() {
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [managedBooks, setManagedBooks] = useState<typeof books>([]);

  const allBooks = useMemo(() => {
    const merged = [...books];
    managedBooks.filter(book => book.slug !== "blop-test").forEach(book => {
      const index = merged.findIndex(item => item.slug === book.slug);
      if (index >= 0) merged[index] = { ...merged[index], ...book };
      else merged.push(book);
    });
    return merged;
  }, [managedBooks]);

  const visibleBooks = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    return allBooks.filter(book => {
      const statusMatch =
        filter === "all" ||
        (filter === "published" && book.status === "Yayında") ||
        (filter === "draft" && book.status === "Taslak");
      const queryMatch =
        !q ||
        [book.title, book.author, book.subtitle, book.slug]
          .some(value => value.toLocaleLowerCase("tr-TR").includes(q));
      return statusMatch && queryMatch;
    });
  }, [filter, query, allBooks]);

  useEffect(() => {
    document.body.classList.add("reader-admin-route");
    void listManagedBooks().then(({ items }) => {
      setManagedBooks(
        items.map(book => ({
          title: book.title,
          author: book.author || "",
          authorSlug: book.authorSlug,
          authorHref: book.authorHref || `/yazarlar/${book.authorSlug}`,
          subtitle: book.subtitle || "",
          slug: book.slug,
          cover: book.coverName || "/bir_sifaci_png.png",
          status: book.status,
          chapters: Number(book.chapterCount ?? 0),
          format: book.format || "EPUB 3",
          language: book.language || "Türkçe",
          publisher: "22 Yayınevi",
          updated: book.updatedAt
            ? new Date(book.updatedAt).toLocaleDateString("tr-TR")
            : "Bugün",
          readerHref: book.readerHref || `/oku/${book.slug}`,
        }))
      );
    });
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
          <button className={filter === "all" ? styles.active : ""} type="button" onClick={() => setFilter("all")}><span>▦</span> Kitaplar</button>
          <a href="/panel/reader/yeni"><span>＋</span> Yeni Kitap</a>
          <a href="/oku" target="_blank" rel="noreferrer"><span>◫</span> Reader Tasarım Alanı</a>
          <a href="/panel/yazarlar"><span>✒</span> Yazarlar</a>
          <button className={filter === "draft" ? styles.active : ""} type="button" onClick={() => setFilter("draft")}><span>◌</span> Taslaklar</button>
          <button className={filter === "published" ? styles.active : ""} type="button" onClick={() => setFilter("published")}><span>⌁</span> Yayındakiler</button>
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

        <section className={styles.connectionGuide}>
          <div>
            <span className={styles.guideKicker}>KİTAP BAĞLANTILARI</span>
            <h3>Bir kitap hangi alanlara bağlanmalı?</h3>
          </div>
          <div className={styles.guideGrid}>
            <article><b>01</b><strong>Yazar</strong><p>Kitap, daha önce oluşturduğunuz yazar profiline bağlanır. Karttaki yazar adı doğrudan o profile gider.</p></article>
            <article><b>02</b><strong>Reader adresi</strong><p>Her kitap için benzersiz bir <code>/oku/kitap-slug</code> adresi oluşur.</p></article>
            <article><b>03</b><strong>EPUB + Kapak</strong><p>Yayın kaynağı EPUB dosyasıdır; kapak Reader ve kitap kartlarında kullanılır.</p></article>
            <article><b>04</b><strong>Yayın durumu</strong><p>Taslak, önizleme veya yayında durumuyla hangi kitabın görünür olacağı yönetilir.</p></article>
          </div>
        </section>

        <section className={styles.stats} aria-label="Reader özeti">
          <article><b>{allBooks.length}</b><span>Toplam Kitap</span></article>
          <article><b>{allBooks.filter(book => book.status === "Yayında").length}</b><span>Yayında</span></article>
          <article><b>{allBooks.reduce((sum, book) => sum + (Number(book.chapters) || 0), 0)}</b><span>Toplam Bölüm</span></article>
          <article><b>EPUB 3</b><span>Aktif Format</span></article>
        </section>

        <div className={styles.sectionHead}>
          <div>
            <span>KÜTÜPHANE</span>
            <h3>{filter === "draft" ? "Taslak Kitaplar" : filter === "published" ? "Yayındaki Kitaplar" : "Reader Kitapları"}</h3>
          </div>
          <button
            type="button"
            aria-label="Kitaplarda ara"
            aria-pressed={searchOpen}
            onClick={() => setSearchOpen(value => !value)}
          >⌕</button>
        </div>

        {searchOpen && (
          <div className={styles.librarySearch}>
            <span>⌕</span>
            <input
              autoFocus
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Kitap, yazar veya slug ara…"
              aria-label="Kitaplarda ara"
            />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Aramayı temizle">×</button>}
          </div>
        )}

        <section className={styles.grid}>
          {visibleBooks.map(book => (
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
                <a className={styles.author} href={book.authorHref}>{book.author} <span>↗</span></a>
                <p className={styles.subtitle}>{book.subtitle}</p>

                <div className={styles.meta}>
                  <span><b>{book.chapters}</b> bölüm</span>
                  <i />
                  <span>{book.format}</span>
                  <i />
                  <span>{book.language}</span>
                </div>

                <div className={styles.linksBox}>
                  <span className={styles.linksLabel}>BAĞLANTILAR</span>
                  <a href={book.authorHref}>
                    <span>Yazar Profili</span>
                    <code>{book.authorHref}</code>
                  </a>
                  <a href={book.readerHref} target="_blank" rel="noreferrer">
                    <span>Reader Adresi</span>
                    <code>{book.readerHref}</code>
                  </a>
                  <div>
                    <span>Kitap Slug</span>
                    <code>{book.slug}</code>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <a href={book.readerHref} target="_blank" rel="noreferrer">Reader&apos;ı Aç <span>↗</span></a>
                  <a href={`/panel/reader/${book.slug}/duzenle`}>Kitabı Düzenle <span>→</span></a>
                </div>
              </div>
            </article>
          ))}

          {visibleBooks.length === 0 && (
            <div className={styles.emptyState}>
              <span>22 READER</span>
              <h4>Bu görünümde kitap yok.</h4>
              <p>Filtreyi değiştirebilir veya yeni bir kitap oluşturabilirsiniz.</p>
              <button type="button" onClick={() => { setFilter("all"); setQuery(""); }}>Tüm kitapları göster</button>
            </div>
          )}

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
