"use client";

import { useEffect, useMemo, useState } from "react";
import AuthorPageView from "./AuthorPageView";
import type { AuthorBook, AuthorProfile } from "../../_data/authors";
import { listManagedAuthors, listManagedBooks, type ManagedAuthor, type ManagedBook } from "../../panel/_lib/managedStore";



const FALLBACK_IMAGE = "/figan-hero-final.webp";
const FALLBACK_COVER = "/bir_sifaci_png.png";

function panelBookToAuthorBook(book: ManagedBook, existing?: AuthorBook): AuthorBook {
  return {
    slug: book.slug,
    title: book.title,
    subtitle: book.subtitle || existing?.subtitle || "",
    cover: book.coverUrl || book.coverName || existing?.cover || FALLBACK_COVER,
    year: existing?.year || String(new Date().getFullYear()),
    genre: existing?.genre || "Dijital Yayın",
    featured: existing?.featured ?? false,
    printUrl: existing?.printUrl,
    readerUrl: book.readerHref || existing?.readerUrl || `/oku/${book.slug}`,
    audioUrl: existing?.audioUrl,
    sampleUrl: book.readerHref || existing?.sampleUrl || `/oku/${book.slug}`,
    reader: {
      chapterCount: book.chapterCount ?? existing?.reader?.chapterCount ?? 0,
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
  const [panelAuthor, setManagedAuthor] = useState<ManagedAuthor | null>(null);
  const [panelBooks, setManagedBooks] = useState<ManagedBook[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void Promise.all([listManagedAuthors(), listManagedBooks()])
      .then(([authorsResult, booksResult]) => {
        if (cancelled) return;

        const found = authorsResult.items.find(item => item.slug === slug) ?? null;
        setManagedAuthor(found?.status === "Yayında" ? found : null);
        setManagedBooks(
          booksResult.items.filter(item => item.authorSlug === slug && item.status !== "Taslak")
        );
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
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
            heroImage: panelAuthor.photoName || FALLBACK_IMAGE,
            heroQuote: "Her kitabın kendine ait bir dünyası vardır.",
            bio: panelAuthor.bio || "",
            portraitSecondary: panelAuthor.photoName || FALLBACK_IMAGE,
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

  return <AuthorPageView author={author} />;
}
