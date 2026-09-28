"use client";

import { useEffect, useMemo, useState } from "react";
import AuthorPageView from "./AuthorPageView";
import type { AuthorBook, AuthorProfile } from "../../_data/authors";

type PanelAuthor = {
  name: string;
  slug: string;
  href?: string;
  role?: string;
  bio?: string;
  domain?: string;
  status?: "Yayında" | "Taslak";
  website?: string;
  instagram?: string;
  photoName?: string;
};

type PanelBook = {
  title: string;
  subtitle?: string;
  author?: string;
  authorSlug: string;
  authorHref?: string;
  slug: string;
  language?: string;
  status?: "Yayında" | "Taslak";
  epubName?: string;
  coverName?: string;
  readerHref?: string;
  format?: string;
  updatedAt?: string;
};

const AUTHOR_STORAGE = "22reader-panel-authors";
const BOOK_STORAGE = "22reader-panel-books";
const FALLBACK_IMAGE = "/figan-hero-final.webp";
const FALLBACK_COVER = "/bir_sifaci_png.png";

function panelBookToAuthorBook(book: PanelBook, existing?: AuthorBook): AuthorBook {
  return {
    slug: book.slug,
    title: book.title,
    subtitle: book.subtitle || existing?.subtitle || "",
    cover: existing?.cover || FALLBACK_COVER,
    year: existing?.year || String(new Date().getFullYear()),
    genre: existing?.genre || "Dijital Yayın",
    featured: existing?.featured ?? false,
    printUrl: existing?.printUrl,
    readerUrl: book.readerHref || existing?.readerUrl || `/oku/${book.slug}`,
    audioUrl: existing?.audioUrl,
    sampleUrl: book.readerHref || existing?.sampleUrl || `/oku/${book.slug}`,
    reader: {
      chapterCount: existing?.reader?.chapterCount ?? 0,
      estimatedReadTime: existing?.reader?.estimatedReadTime ?? "—",
      format: book.format || existing?.reader?.format || "EPUB",
    },
    audio: existing?.audio,
  };
}

export default function ManagedAuthorPageView({
  slug,
  initialAuthor,
}: {
  slug: string;
  initialAuthor?: AuthorProfile | null;
}) {
  const [panelAuthor, setPanelAuthor] = useState<PanelAuthor | null>(null);
  const [panelBooks, setPanelBooks] = useState<PanelBook[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const authors = JSON.parse(localStorage.getItem(AUTHOR_STORAGE) || "[]");
      if (Array.isArray(authors)) {
        const found = authors.find((item: PanelAuthor) => item?.slug === slug);
        if (found) setPanelAuthor(found);
      }
    } catch {}

    try {
      const books = JSON.parse(localStorage.getItem(BOOK_STORAGE) || "[]");
      if (Array.isArray(books)) {
        setPanelBooks(
          books.filter((item: PanelBook) => item?.authorSlug === slug && item?.status !== "Taslak")
        );
      }
    } catch {}

    setReady(true);
  }, [slug]);

  const author = useMemo<AuthorProfile | null>(() => {
    const base = initialAuthor
      ? { ...initialAuthor, books: [...initialAuthor.books] }
      : panelAuthor
        ? {
            slug: panelAuthor.slug,
            name: panelAuthor.name,
            domain: panelAuthor.domain,
            role: panelAuthor.role || "Yazar",
            heroImage: FALLBACK_IMAGE,
            heroQuote: "Her kitabın kendine ait bir dünyası vardır.",
            bio: panelAuthor.bio || "",
            portraitSecondary: FALLBACK_IMAGE,
            books: [],
            articles: [],
            events: [],
          }
        : null;

    if (!base) return null;

    const mergedBooks = [...base.books];
    panelBooks.forEach(panelBook => {
      const existingIndex = mergedBooks.findIndex(book => book.slug === panelBook.slug);
      const existing = existingIndex >= 0 ? mergedBooks[existingIndex] : undefined;
      const nextBook = panelBookToAuthorBook(panelBook, existing);

      if (existingIndex >= 0) mergedBooks[existingIndex] = nextBook;
      else mergedBooks.push(nextBook);
    });

    return { ...base, books: mergedBooks };
  }, [initialAuthor, panelAuthor, panelBooks]);

  if (!ready && !initialAuthor) return null;

  if (!author) {
    return (
      <main style={{ minHeight: "100vh", padding: "80px 24px", background: "#f4eee5" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p>22 YAYINEVİ</p>
          <h1>Yazar profili bulunamadı.</h1>
          <a href="/panel/yazarlar">Yazar yönetimine dön</a>
        </div>
      </main>
    );
  }

  if (author.books.length === 0) {
    return (
      <main style={{ minHeight: "100vh", padding: "80px 24px", background: "#f4eee5", color: "#1e150f" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <p style={{ letterSpacing: ".18em", fontSize: 11, color: "#9d6635" }}>22 YAYINEVİ YAZARI</p>
          <h1 style={{ fontFamily: "var(--font-editorial), Georgia, serif", fontSize: 64, margin: "12px 0" }}>{author.name}</h1>
          <p style={{ maxWidth: 650, lineHeight: 1.75, color: "#6e6258" }}>{author.bio || "Yazar profili oluşturuldu. Kitap bağlantıları eklendiğinde eserleri burada otomatik görünecek."}</p>
          <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
            <a href="/panel/reader/yeni">Kitap Bağla →</a>
            <a href="/panel/yazarlar">Yazar Yönetimi</a>
          </div>
        </div>
      </main>
    );
  }

  return <AuthorPageView author={author} />;
}
