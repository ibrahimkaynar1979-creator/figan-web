import { neon } from "@neondatabase/serverless";
import type { AuthorRecord, BookRecord, PanelRepository } from "./contracts";

type DbRow = Record<string, unknown>;

export class PanelDatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured for the 22 Reader panel.");
    this.name = "PanelDatabaseNotConfiguredError";
  }
}

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new PanelDatabaseNotConfiguredError();
  }

  return neon(databaseUrl);
}

function toIso(value: unknown): string | undefined {
  if (!value) return undefined;
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? String(value) : date.toISOString();
}

function mapAuthor(row: DbRow): AuthorRecord {
  return {
    id: Number(row.id),
    slug: String(row.slug ?? ""),
    name: String(row.name ?? ""),
    href: String(row.href ?? ""),
    role: String(row.role ?? "Yazar"),
    bio: row.bio == null ? null : String(row.bio),
    domain: row.domain == null ? null : String(row.domain),
    status: row.status === "Yayında" ? "Yayında" : "Taslak",
    instagram: row.instagram == null ? null : String(row.instagram),
    website: row.website == null
      ? (row.website_url == null ? null : String(row.website_url))
      : String(row.website),
    photoUrl: row.photo_url == null ? null : String(row.photo_url),
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

function mapBook(row: DbRow): BookRecord {
  const metadata =
    row.metadata && typeof row.metadata === "object"
      ? (row.metadata as Record<string, unknown>)
      : {};

  return {
    id: Number(row.id),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    subtitle: row.subtitle == null ? null : String(row.subtitle),
    authorSlug: String(row.author_slug ?? ""),
    author: metadata.author == null ? undefined : String(metadata.author),
    authorHref: metadata.authorHref == null ? undefined : String(metadata.authorHref),
    language: String(row.language ?? "Türkçe"),
    status: row.status === "Yayında" ? "Yayında" : "Taslak",
    readerHref: String(row.reader_href ?? ""),
    format: String(row.format ?? "EPUB 3"),
    coverUrl: row.cover_url == null ? null : String(row.cover_url),
    epubUrl: row.epub_url == null ? null : String(row.epub_url),
    epubFilename: row.epub_filename == null ? null : String(row.epub_filename),
    chapterCount: Number(row.chapter_count ?? 0),
    metadata,
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

export function getPanelRepository(): PanelRepository {
  const sql = getSql();

  return {
    async listAuthors(): Promise<AuthorRecord[]> {
      const rows = await sql`
        SELECT *
        FROM reader_authors
        ORDER BY created_at ASC, id ASC
      `;
      return rows.map(row => mapAuthor(row as DbRow));
    },

    async saveAuthor(author: AuthorRecord, previousSlug?: string): Promise<AuthorRecord> {
      if (previousSlug && previousSlug !== author.slug) {
        await sql`
          UPDATE reader_authors
          SET slug = ${author.slug},
              updated_at = NOW()
          WHERE slug = ${previousSlug}
        `;
      }

      const rows = await sql`
        INSERT INTO reader_authors (
          name,
          slug,
          bio,
          photo_url,
          href,
          role,
          domain,
          instagram,
          website,
          status,
          updated_at
        )
        VALUES (
          ${author.name},
          ${author.slug},
          ${author.bio ?? null},
          ${author.photoUrl ?? null},
          ${author.href},
          ${author.role},
          ${author.domain ?? null},
          ${author.instagram ?? null},
          ${author.website ?? null},
          ${author.status},
          NOW()
        )
        ON CONFLICT (slug)
        DO UPDATE SET
          name = EXCLUDED.name,
          bio = EXCLUDED.bio,
          photo_url = EXCLUDED.photo_url,
          href = EXCLUDED.href,
          role = EXCLUDED.role,
          domain = EXCLUDED.domain,
          instagram = EXCLUDED.instagram,
          website = EXCLUDED.website,
          status = EXCLUDED.status,
          updated_at = NOW()
        RETURNING *
      `;

      return mapAuthor(rows[0] as DbRow);
    },

    async listBooks(): Promise<BookRecord[]> {
      const rows = await sql`
        SELECT *
        FROM reader_books
        ORDER BY created_at ASC, id ASC
      `;
      return rows.map(row => mapBook(row as DbRow));
    },

    async saveBook(book: BookRecord, previousSlug?: string): Promise<BookRecord> {
      if (previousSlug && previousSlug !== book.slug) {
        await sql`
          UPDATE reader_books
          SET slug = ${book.slug},
              updated_at = NOW()
          WHERE slug = ${previousSlug}
        `;
      }

      const rows = await sql`
        INSERT INTO reader_books (
          title,
          slug,
          subtitle,
          author_slug,
          language,
          status,
          reader_href,
          format,
          cover_url,
          epub_url,
          epub_filename,
          chapter_count,
          metadata,
          updated_at
        )
        VALUES (
          ${book.title},
          ${book.slug},
          ${book.subtitle ?? null},
          ${book.authorSlug},
          ${book.language},
          ${book.status},
          ${book.readerHref},
          ${book.format},
          ${book.coverUrl ?? null},
          ${book.epubUrl ?? null},
          ${book.epubFilename ?? null},
          ${book.chapterCount},
          ${JSON.stringify(book.metadata ?? {})}::jsonb,
          NOW()
        )
        ON CONFLICT (slug)
        DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          author_slug = EXCLUDED.author_slug,
          language = EXCLUDED.language,
          status = EXCLUDED.status,
          reader_href = EXCLUDED.reader_href,
          format = EXCLUDED.format,
          cover_url = EXCLUDED.cover_url,
          epub_url = EXCLUDED.epub_url,
          epub_filename = EXCLUDED.epub_filename,
          chapter_count = EXCLUDED.chapter_count,
          metadata = EXCLUDED.metadata,
          updated_at = NOW()
        RETURNING *
      `;

      return mapBook(rows[0] as DbRow);
    },
  };
}
