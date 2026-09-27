import { list } from "@vercel/blob";

const PREFIX = "audiobooks/bir-sifacinin-kanadi/";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: PREFIX, limit: 20 });
    const preferred =
      blobs.find((blob) => blob.pathname === PREFIX + "master.mp3") ??
      blobs.find((blob) => blob.pathname.endsWith(".mp3"));

    if (!preferred) {
      return Response.json({ ready: false, url: null });
    }

    return Response.json({
      ready: true,
      url: preferred.url,
      pathname: preferred.pathname,
      size: preferred.size,
      uploadedAt: preferred.uploadedAt,
    });
  } catch (error) {
    return Response.json(
      {
        ready: false,
        url: null,
        error: error instanceof Error ? error.message : "Ses dosyası okunamadı.",
      },
      { status: 503 },
    );
  }
}
