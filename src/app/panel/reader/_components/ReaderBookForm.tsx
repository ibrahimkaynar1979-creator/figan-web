"use client";

import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./ReaderBookForm.module.css";
import { listManagedAuthors, saveManagedBook, type ManagedBook } from "../../_lib/managedStore";

type Props = {
  mode: "new" | "edit";
  initial?: {
    title: string;
    subtitle: string;
    author: string;
    authorSlug: string;
    slug: string;
    status: "Taslak" | "Yayında";
    language: string;
    cover: string;
    readerHref: string;
  };
};

type AuthorOption = { name: string; slug: string; href: string };

const BUILT_IN_AUTHORS: AuthorOption[] = [
  { name: "Figen Yavuz", slug: "figen-yavuz", href: "/yazarlar/figen-yavuz" },
];

const slugify = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function ReaderBookForm({ mode, initial }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? "");
  const [authorSlug, setAuthorSlug] = useState(initial?.authorSlug ?? "figen-yavuz");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [language, setLanguage] = useState(initial?.language ?? "Türkçe");
  const [status, setStatus] = useState<"Taslak" | "Yayında">(initial?.status ?? "Taslak");
  const [epubName, setEpubName] = useState(mode === "edit" ? "Bir_Sifacinin_Kanadi_Figen_Yavuz_22_Yayinevi.epub" : "");
  const [epubFile, setEpubFile] = useState<File | null>(null);
  const [epubUrl, setEpubUrl] = useState("");
  const [coverName, setCoverName] = useState(mode === "edit" ? "bir_sifaci_png.png" : "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [authorOptions, setAuthorOptions] = useState<AuthorOption[]>(BUILT_IN_AUTHORS);

  useEffect(() => {
    document.body.classList.add("reader-admin-route");

    void listManagedAuthors().then(({ items }) => {
      const panelAuthors: AuthorOption[] = items.map(item => ({
        name: item.name,
        slug: item.slug,
        href: item.href || `/yazarlar/${item.slug}`,
      }));
      const merged = [...BUILT_IN_AUTHORS];
      panelAuthors.forEach(item => {
        if (!merged.some(existing => existing.slug === item.slug)) merged.push(item);
      });
      setAuthorOptions(merged);
    });

    return () => document.body.classList.remove("reader-admin-route");
  }, []);

  const author = authorOptions.find(item => item.slug === authorSlug) ?? authorOptions[0];
  const readerHref = useMemo(() => `/oku/${slug || "kitap-slug"}`, [slug]);

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (mode === "new") setSlug(slugify(value));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setSaveError("");

    try {
      let nextCoverUrl = coverUrl;
      let nextEpubUrl = epubUrl;

      if (coverFile) {
        const extension = coverFile.name.split(".").pop() || "webp";
        const blob = await upload(
          `22-reader/${slug}/cover-${Date.now()}.${extension}`,
          coverFile,
          {
            access: "public",
            handleUploadUrl: "/api/blob/upload",
            contentType: coverFile.type || "image/webp",
          }
        );
        nextCoverUrl = blob.url;
        setCoverUrl(blob.url);
      }

      if (epubFile) {
        const blob = await upload(
          `22-reader/${slug}/book-${Date.now()}.epub`,
          epubFile,
          {
            access: "public",
            handleUploadUrl: "/api/blob/upload",
            contentType: "application/epub+zip",
          }
        );
        nextEpubUrl = blob.url;
        setEpubUrl(blob.url);
      }

      const payload: ManagedBook = {
        title,
        subtitle,
        author: author.name,
        authorSlug,
        authorHref: author.href,
        slug,
        language,
        status,
        epubName,
        epubUrl: nextEpubUrl || undefined,
        coverName,
        coverUrl: nextCoverUrl || undefined,
        readerHref,
        format: "EPUB 3",
        updatedAt: new Date().toISOString(),
      };

      const result = await saveManagedBook(payload, mode === "edit" ? initial?.slug : undefined);

      if (result.mode !== "database") {
        throw new Error("Veritabanına kaydedilemedi; tarayıcı yedeğine düşüldü.");
      }

      setSaved(true);
      window.setTimeout(() => setSaved(false), 2600);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Dosya yüklenemedi.");
    } finally {
      setSaving(false);
    }
  };

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
          <a href="/panel/reader">← Kitaplara Dön</a>
          <a href="/panel/yazarlar">✒ Yazarlar</a>
          <a className={styles.active} href={mode === "new" ? "/panel/reader/yeni" : `/panel/reader/${slug}/duzenle`}>
            {mode === "new" ? "Yeni Kitap" : "Kitabı Düzenle"}
          </a>
          <a href={author.href}>Yazar Profilini Aç ↗</a>
          {mode === "edit" && <a href={readerHref} target="_blank" rel="noreferrer">Reader&apos;ı Aç ↗</a>}
        </nav>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <span>22 READER · {mode === "new" ? "YENİ YAYIN" : "DÜZENLEME"}</span>
            <h1>{mode === "new" ? "Yeni Kitap" : title}</h1>
          </div>
          <a href="/panel/reader">Kapat ×</a>
        </header>

        <form className={styles.form} onSubmit={submit}>
          <section className={styles.mainCard}>
            <div className={styles.sectionTitle}>
              <span>01</span>
              <div><b>KİTAP BİLGİLERİ</b><h2>Yayın kimliği</h2></div>
            </div>

            <div className={styles.fields}>
              <label>
                <span>Kitap Adı</span>
                <input required value={title} onChange={e => onTitleChange(e.target.value)} placeholder="Kitabın adı" />
              </label>
              <label>
                <span>Alt Başlık</span>
                <input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Varsa alt başlık" />
              </label>
              <label>
                <span>Yazar</span>
                <select value={authorSlug} onChange={e => setAuthorSlug(e.target.value)}>
                  {authorOptions.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
                <small>
                  Seçilen yazar: <a href={author.href}>{author.href}</a>
                  {" · "}<a href="/panel/yazarlar/yeni">Yeni yazar oluştur</a>
                </small>
              </label>
              <label>
                <span>Kitap Slug</span>
                <input required value={slug} onChange={e => setSlug(slugify(e.target.value))} placeholder="kitap-adi" />
                <small>Reader adresi: <code>{readerHref}</code></small>
              </label>
              <label>
                <span>Dil</span>
                <select value={language} onChange={e => setLanguage(e.target.value)}>
                  <option>Türkçe</option>
                  <option>İngilizce</option>
                  <option>Almanca</option>
                </select>
              </label>
              <label>
                <span>Yayın Durumu</span>
                <select value={status} onChange={e => setStatus(e.target.value as "Taslak" | "Yayında")}>
                  <option>Taslak</option>
                  <option>Yayında</option>
                </select>
              </label>
            </div>
          </section>

          <section className={styles.uploadGrid}>
            <label className={styles.uploadCard}>
              <span className={styles.uploadNo}>02</span>
              <strong>Kitap Kapağı</strong>
              <p>Reader kapağı ve kitap kartlarında kullanılacak görsel.</p>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={e => {
                  const file = e.target.files?.[0] ?? null;
                  setCoverFile(file);
                  setCoverName(file?.name ?? "");
                }}
              />
              <b>{coverName || "Kapak seç"}</b>
            </label>

            <label className={styles.uploadCard}>
              <span className={styles.uploadNo}>03</span>
              <strong>EPUB Dosyası</strong>
              <p>Reader içeriğinin ana kaynağı. EPUB 3 önerilir.</p>
              <input
                type="file"
                accept=".epub,application/epub+zip"
                onChange={e => {
                  const file = e.target.files?.[0] ?? null;
                  setEpubFile(file);
                  setEpubName(file?.name ?? "");
                }}
              />
              <b>{epubName || "EPUB seç"}</b>
            </label>
          </section>

          <section className={styles.connectionCard}>
            <div className={styles.sectionTitle}>
              <span>04</span>
              <div><b>BAĞLANTILAR</b><h2>Yayın ağı</h2></div>
            </div>
            <div className={styles.connections}>
              <a href={author.href}><span>Yazar Profili</span><code>{author.href}</code><b>↗</b></a>
              <div><span>Reader Adresi</span><code>{readerHref}</code><b>Hazır</b></div>
              <div><span>Yayınevi</span><code>22 Yayınevi</code><b>Sabit</b></div>
            </div>
          </section>

          {saveError && (
            <p role="alert" style={{ color: "#9f2f24", margin: "0 0 14px" }}>
              {saveError}
            </p>
          )}

          <footer className={styles.actions}>
            <a href="/panel/reader">Vazgeç</a>
            <button type="submit" disabled={saving}>
              {saving
                ? "Yükleniyor..."
                : saved
                  ? "Kaydedildi ✓"
                  : mode === "new"
                    ? "Taslağı Kaydet"
                    : "Değişiklikleri Kaydet"}
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}
