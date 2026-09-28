export const AUTHOR_STORAGE = "22reader-panel-authors";
export const BOOK_STORAGE = "22reader-panel-books";

export type ManagedAuthor = {
  name: string;
  slug: string;
  href: string;
  role: string;
  bio?: string;
  domain?: string;
  status: "Yayında" | "Taslak";
  instagram?: string;
  website?: string;
  photoName?: string;
  source: "panel";
};

export type ManagedBook = {
  title: string;
  subtitle?: string;
  author: string;
  authorSlug: string;
  authorHref: string;
  slug: string;
  language: string;
  status: "Yayında" | "Taslak";
  epubName?: string;
  coverName?: string;
  readerHref: string;
  format: string;
  updatedAt: string;
};

function readArray<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeArray<T>(key: string, items: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(items));
}

export function getManagedAuthors() {
  return readArray<ManagedAuthor>(AUTHOR_STORAGE);
}

export function saveManagedAuthor(author: ManagedAuthor, previousSlug?: string) {
  const current = getManagedAuthors();
  const next = [
    ...current.filter(item => item.slug !== author.slug && (!previousSlug || item.slug !== previousSlug)),
    author,
  ];
  writeArray(AUTHOR_STORAGE, next);
  return next;
}

export function getManagedBooks() {
  return readArray<ManagedBook>(BOOK_STORAGE);
}

export function saveManagedBook(book: ManagedBook, previousSlug?: string) {
  const current = getManagedBooks();
  const next = [
    ...current.filter(item => item.slug !== book.slug && (!previousSlug || item.slug !== previousSlug)),
    book,
  ];
  writeArray(BOOK_STORAGE, next);
  return next;
}

/**
 * Temporary browser persistence adapter.
 * Keep panel code calling these functions only. When the database is connected,
 * this file can be swapped to server/API persistence without rewriting the UI.
 */
