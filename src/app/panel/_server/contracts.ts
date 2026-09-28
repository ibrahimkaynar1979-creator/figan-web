export type PanelPublicationStatus = "Taslak" | "Yayında";

export type AuthorRecord = {
  id?: number;
  slug: string;
  name: string;
  href: string;
  role: string;
  bio?: string | null;
  domain?: string | null;
  status: PanelPublicationStatus;
  instagram?: string | null;
  website?: string | null;
  photoUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type BookRecord = {
  id?: number;
  slug: string;
  title: string;
  subtitle?: string | null;
  authorSlug: string;
  language: string;
  status: PanelPublicationStatus;
  readerHref: string;
  format: string;
  coverUrl?: string | null;
  epubUrl?: string | null;
  epubFilename?: string | null;
  chapterCount: number;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
};

export type PanelRepository = {
  listAuthors(): Promise<AuthorRecord[]>;
  saveAuthor(author: AuthorRecord, previousSlug?: string): Promise<AuthorRecord>;
  listBooks(): Promise<BookRecord[]>;
  saveBook(book: BookRecord, previousSlug?: string): Promise<BookRecord>;
};
