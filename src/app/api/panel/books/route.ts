import { NextRequest, NextResponse } from "next/server";
import { getPanelRepository, PanelDatabaseNotConfiguredError } from "../../../panel/_server/repository";
import type { BookRecord } from "../../../panel/_server/contracts";

function unavailable(error: unknown) {
  if (error instanceof PanelDatabaseNotConfiguredError) {
    return NextResponse.json(
      { ok: false, code: "DATABASE_NOT_CONFIGURED", message: error.message },
      { status: 503 }
    );
  }
  return NextResponse.json(
    { ok: false, code: "PERSISTENCE_UNAVAILABLE", message: error instanceof Error ? error.message : "Unknown error" },
    { status: 503 }
  );
}

export async function GET() {
  try {
    const repository = getPanelRepository();
    const books = await repository.listBooks();
    return NextResponse.json({ ok: true, books });
  } catch (error) {
    return unavailable(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const book = body?.book as BookRecord | undefined;
    const previousSlug = typeof body?.previousSlug === "string" ? body.previousSlug : undefined;

    if (!book?.title || !book?.slug || !book?.authorSlug || !book?.readerHref) {
      return NextResponse.json(
        { ok: false, code: "INVALID_BOOK", message: "title, slug, authorSlug and readerHref are required" },
        { status: 400 }
      );
    }

    const repository = getPanelRepository();
    const saved = await repository.saveBook(book, previousSlug);
    return NextResponse.json({ ok: true, book: saved });
  } catch (error) {
    return unavailable(error);
  }
}
