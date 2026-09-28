import { getAudiobookBySlug } from "@/lib/audiobookCurrent";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const book = await getAudiobookBySlug(slug);

  if (!book) {
    return Response.json(
      { ready: false, error: "Sesli kitap bulunamadı." },
      { status: 404, headers: { "cache-control": "no-store" } },
    );
  }

  return Response.json(book, {
    headers: { "cache-control": "no-store" },
  });
}
