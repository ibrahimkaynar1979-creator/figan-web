import { getAudiobookCatalog } from "@/lib/audiobookCurrent";

export async function GET() {
  const catalog = await getAudiobookCatalog();
  return Response.json({ books: catalog }, {
    headers: { "cache-control": "no-store" },
  });
}
