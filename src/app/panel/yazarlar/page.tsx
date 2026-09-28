"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { authors as builtInAuthors } from "../../_data/authors";
import styles from "./AuthorsPanel.module.css";
import { listManagedAuthors, type ManagedAuthor as StoredAuthor } from "../_lib/managedStore";

type ManagedAuthor = {
  name: string;
  slug: string;
  href: string;
  role: string;
  bio?: string;
  domain?: string;
  status: "Yayında" | "Taslak";
  source: "site" | "panel";
};

export default function AuthorsPanelPage() {
  const [savedAuthors, setSavedAuthors] = useState<ManagedAuthor[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.body.classList.add("reader-admin-route");
    void listManagedAuthors().then(({ items }) => {
      setSavedAuthors(
        items.map((author: StoredAuthor) => ({ ...author, source: "panel" as const }))
      );
    });
    return () => document.body.classList.remove("reader-admin-route");
  }, []);

  const authors = useMemo<ManagedAuthor[]>(() => {
    const base = builtInAuthors.map(author => ({
      name: author.name,
      slug: author.slug,
      href: `/yazarlar/${author.slug}`,
      role: author.role,
      bio: author.bio,
      domain: author.domain,
      status: "Yayında" as const,
      source: "site" as const,
    }));
    const merged = [...base];
    savedAuthors.forEach(author => {
      if (!merged.some(item => item.slug === author.slug)) merged.push(author);
    });
    return merged;
  }, [savedAuthors]);

  const visible = authors.filter(author => {
    const q = query.trim().toLocaleLowerCase("tr-TR");
    return !q || [author.name, author.slug, author.role, author.domain || ""]
      .some(value => value.toLocaleLowerCase("tr-TR").includes(q));
  });

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <a href="/panel/reader" className={styles.brand}>
          <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={330} height={210} priority />
        </a>
        <div className={styles.readerMark}>
          <Image src="/22_reader_logo.png" alt="22 Reader" width={360} height={118} priority />
        </div>
        <nav>
          <a href="/panel/reader">▦ Kitaplar</a>
          <a className={styles.active} href="/panel/yazarlar">✒ Yazarlar</a>
          <a href="/panel/yazarlar/yeni">＋ Yeni Yazar</a>
        </nav>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <span>22 READER · YÖNETİM</span>
            <h1>Yazarlar</h1>
          </div>
          <a className={styles.newButton} href="/panel/yazarlar/yeni">＋ Yeni Yazar</a>
        </header>

        <section className={styles.intro}>
          <div>
            <span>YAZAR VERİTABANI</span>
            <h2>Kitapları doğru <em>yazar profiline</em> bağlayın.</h2>
          </div>
          <p>Burada oluşturduğunuz yazar kaydı, Reader’daki “Yazar” seçim alanında görünür. Profil URL’si yazar slug’ından otomatik oluşur.</p>
        </section>

        <div className={styles.search}>
          <span>⌕</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Yazar ara…" />
        </div>

        <section className={styles.grid}>
          {visible.map(author => (
            <article className={styles.card} key={author.slug}>
              <div className={styles.avatar}>{author.name.split(" ").map(part => part[0]).join("").slice(0,2)}</div>
              <div className={styles.cardBody}>
                <div className={styles.topline}><span>{author.status}</span><i>{author.source === "site" ? "Site kaydı" : "Panel kaydı"}</i></div>
                <h3>{author.name}</h3>
                <p>{author.role}</p>
                <div className={styles.links}>
                  <div><span>Profil URL</span><code>{author.href}</code></div>
                  <div><span>Slug</span><code>{author.slug}</code></div>
                  {author.domain && <div><span>Alan adı</span><code>{author.domain}</code></div>}
                </div>
                <div className={styles.actions}>
                  <a href={author.href} target="_blank" rel="noreferrer">Profili Aç ↗</a>
                  {author.source === "panel" && <a href={`/panel/yazarlar/${author.slug}/duzenle`}>Düzenle →</a>}
                </div>
              </div>
            </article>
          ))}

          <a className={styles.addCard} href="/panel/yazarlar/yeni">
            <b>＋</b><span>YENİ YAZAR</span><h3>Yazar profili oluştur</h3>
            <p>Ad, slug ve profil URL’siyle yeni bir yazar kaydı oluşturun.</p>
          </a>
        </section>
      </section>
    </main>
  );
}
