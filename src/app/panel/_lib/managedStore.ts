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

export type PersistenceMode = "database" | "browser-fallback";

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

function mapAuthorFromApi(input: any): ManagedAuthor {
  return {
    name: input.name,
    slug: input.slug,
    href: input.href,
    role: input.role || "Yazar",
    bio: input.bio ?? undefined,
    domain: input.domain ?? undefined,
    status: input.status === "Yayında" ? "Yayında" : "Taslak",
    instagram: input.instagram ?? undefined,
    website: input.website ?? undefined,
    photoName: input.photoUrl ?? input.photoName ?? undefined,
    source: "panel",
  };
}

function mapAuthorToApi(author: ManagedAuthor) {
  return {
    slug: author.slug,
    name: author.name,
    href: author.href,
    role: author.role,
    bio: author.bio || null,
    domain: author.domain || null,
    status: author.status,
    instagram: author.instagram || null,
    website: author.website || null,
    photoUrl: author.photoName || null,
  };
}

function mapBookFromApi(input: any): ManagedBook {
  return {
    title: input.title,
    subtitle: input.subtitle ?? undefined,
    author: input.author ?? "",
    authorSlug: input.authorSlug,
    authorHref: input.authorHref || `/yazarlar/${input.authorSlug}`,
    slug: input.slug,
    language: input.language || "Türkçe",
    status: input.status === "Yayında" ? "Yayında" : "Taslak",
    epubName: input.epubFilename ?? input.epubName ?? undefined,
    coverName: input.coverUrl ?? input.coverName ?? undefined,
    readerHref: input.readerHref || `/oku/${input.slug}`,
    format: input.format || "EPUB 3",
    updatedAt: input.updatedAt || new Date().toISOString(),
  };
}

function mapBookToApi(book: ManagedBook) {
  return {
    slug: book.slug,
    title: book.title,
    subtitle: book.subtitle || null,
    authorSlug: book.authorSlug,
    language: book.language,
    status: book.status,
    readerHref: book.readerHref,
    format: book.format,
    coverUrl: book.coverName || null,
    epubUrl: null,
    epubFilename: book.epubName || null,
    chapterCount: 0,
    metadata: {
      author: book.author,
      authorHref: book.authorHref,
    },
  };
}

async function apiJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const error = new Error(body?.message || `Panel API error: ${response.status}`);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  return response.json() as Promise<T>;
}

export function getManagedAuthors() {
  return readArray<ManagedAuthor>(AUTHOR_STORAGE);
}

export async function listManagedAuthors(): Promise<{
  items: ManagedAuthor[];
  mode: PersistenceMode;
}> {
  try {
    const data = await apiJson<{ ok: true; authors: any[] }>("/api/panel/authors");
    const items = data.authors.map(mapAuthorFromApi);
    writeArray(AUTHOR_STORAGE, items);
    return { items, mode: "database" };
  } catch {
    return { items: getManagedAuthors(), mode: "browser-fallback" };
  }
}

export function saveManagedAuthorLocal(author: ManagedAuthor, previousSlug?: string) {
  const current = getManagedAuthors();
  const next = [
    ...current.filter(item => item.slug !== author.slug && (!previousSlug || item.slug !== previousSlug)),
    author,
  ];
  writeArray(AUTHOR_STORAGE, next);
  return next;
}

export async function saveManagedAuthor(author: ManagedAuthor, previousSlug?: string): Promise<{
  item: ManagedAuthor;
  mode: PersistenceMode;
}> {
  try {
    const data = await apiJson<{ ok: true; author: any }>("/api/panel/authors", {
      method: "POST",
      body: JSON.stringify({
        author: mapAuthorToApi(author),
        previousSlug,
      }),
    });
    const item = mapAuthorFromApi(data.author);
    saveManagedAuthorLocal(item, previousSlug);
    return { item, mode: "database" };
  } catch {
    saveManagedAuthorLocal(author, previousSlug);
    return { item: author, mode: "browser-fallback" };
  }
}

export function getManagedBooks() {
  return readArray<ManagedBook>(BOOK_STORAGE);
}

export async function listManagedBooks(): Promise<{
  items: ManagedBook[];
  mode: PersistenceMode;
}> {
  try {
    const data = await apiJson<{ ok: true; books: any[] }>("/api/panel/books");
    const items = data.books.map(mapBookFromApi);
    writeArray(BOOK_STORAGE, items);
    return { items, mode: "database" };
  } catch {
    return { items: getManagedBooks(), mode: "browser-fallback" };
  }
}

export function saveManagedBookLocal(book: ManagedBook, previousSlug?: string) {
  const current = getManagedBooks();
  const next = [
    ...current.filter(item => item.slug !== book.slug && (!previousSlug || item.slug !== previousSlug)),
    book,
  ];
  writeArray(BOOK_STORAGE, next);
  return next;
}

export async function saveManagedBook(book: ManagedBook, previousSlug?: string): Promise<{
  item: ManagedBook;
  mode: PersistenceMode;
}> {
  try {
    const data = await apiJson<{ ok: true; book: any }>("/api/panel/books", {
      method: "POST",
      body: JSON.stringify({
        book: mapBookToApi(book),
        previousSlug,
      }),
    });
    const item = mapBookFromApi(data.book);
    saveManagedBookLocal(item, previousSlug);
    return { item, mode: "database" };
  } catch {
    saveManagedBookLocal(book, previousSlug);
    return { item: book, mode: "browser-fallback" };
  }
}

export async function getPanelPersistenceStatus() {
  try {
    const data = await apiJson<{
      databaseConfigured: boolean;
      blobConfigured: boolean;
      persistence: string;
    }>("/api/panel/status");

    return {
      databaseConfigured: data.databaseConfigured,
      blobConfigured: data.blobConfigured,
      mode: data.databaseConfigured ? "database" as const : "browser-fallback" as const,
      persistence: data.persistence,
    };
  } catch {
    return {
      databaseConfigured: false,
      blobConfigured: false,
      mode: "browser-fallback" as const,
      persistence: "browser-fallback",
    };
  }
}
