import { list } from "@vercel/blob";

const PREFIX = "audiobooks/bir-sifacinin-kanadi/";
const PUBLIC_FALLBACK_URL = "https://edmrsvk0wqrotocr.public.blob.vercel-storage.com/audiobooks/bir-sifacinin-kanadi/master.mp3";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: PREFIX, limit: 20 });
    const preferred =
      blobs.find((blob) => blob.pathname === PREFIX + "master.mp3") ??
      blobs.find((blob) => blob.pathname.endsWith(".mp3"));

    if (!preferred) {
      return Response.json({
        ready: true,
        url: PUBLIC_FALLBACK_URL,
        pathname: PREFIX + "master.mp3",
        source: "public-fallback",
      });
    }

    return Response.json({
      ready: true,
      url: preferred.url,
      pathname: preferred.pathname,
      size: preferred.size,
      uploadedAt: preferred.uploadedAt,
    });
  } catch (error) {
    return Response.json({
      ready: true,
      url: PUBLIC_FALLBACK_URL,
      pathname: PREFIX + "master.mp3",
      source: "public-fallback",
      warning: error instanceof Error ? error.message : "Blob listesi okunamadı.",
    });
  }
}
