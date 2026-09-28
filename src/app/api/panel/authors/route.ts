import { NextRequest, NextResponse } from "next/server";
import { getPanelRepository, PanelDatabaseNotConfiguredError } from "../../../panel/_server/repository";
import type { AuthorRecord } from "../../../panel/_server/contracts";

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
    const authors = await repository.listAuthors();
    return NextResponse.json({ ok: true, authors });
  } catch (error) {
    return unavailable(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const author = body?.author as AuthorRecord | undefined;
    const previousSlug = typeof body?.previousSlug === "string" ? body.previousSlug : undefined;

    if (!author?.name || !author?.slug || !author?.href) {
      return NextResponse.json(
        { ok: false, code: "INVALID_AUTHOR", message: "name, slug and href are required" },
        { status: 400 }
      );
    }

    const repository = getPanelRepository();
    const saved = await repository.saveAuthor(author, previousSlug);
    return NextResponse.json({ ok: true, author: saved });
  } catch (error) {
    return unavailable(error);
  }
}
