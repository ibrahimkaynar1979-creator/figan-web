import type { AuthorRecord, BookRecord, PanelRepository } from "./contracts";

export class PanelDatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not configured for the 22 Reader panel.");
    this.name = "PanelDatabaseNotConfiguredError";
  }
}

/**
 * Server repository boundary.
 *
 * The concrete PostgreSQL implementation will live behind this function once
 * DATABASE_URL and the database driver are connected. API routes already depend
 * only on the PanelRepository contract, so UI routes will not need to change.
 */
export function getPanelRepository(): PanelRepository {
  if (!process.env.DATABASE_URL) {
    throw new PanelDatabaseNotConfiguredError();
  }

  return {
    async listAuthors(): Promise<AuthorRecord[]> {
      throw new Error("PostgreSQL driver is not connected yet.");
    },
    async saveAuthor(_author: AuthorRecord, _previousSlug?: string): Promise<AuthorRecord> {
      throw new Error("PostgreSQL driver is not connected yet.");
    },
    async listBooks(): Promise<BookRecord[]> {
      throw new Error("PostgreSQL driver is not connected yet.");
    },
    async saveBook(_book: BookRecord, _previousSlug?: string): Promise<BookRecord> {
      throw new Error("PostgreSQL driver is not connected yet.");
    },
  };
}
