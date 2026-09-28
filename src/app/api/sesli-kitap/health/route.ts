import { list } from "@vercel/blob";

const PREFIX = "audiobooks/bir-sifacinin-kanadi/";
const PUBLIC_FALLBACK_URL =
  "https://edmrsvk0wqrotocr.public.blob.vercel-storage.com/audiobooks/bir-sifacinin-kanadi/master.mp3";

async function resolveAudioSource() {
  try {
    const { blobs } = await list({ prefix: PREFIX, limit: 20 });
    const preferred =
      blobs.find((blob) => blob.pathname === PREFIX + "master.mp3") ??
      blobs.find((blob) => blob.pathname.endsWith(".mp3"));

    if (preferred) {
      return {
        url: preferred.url,
        pathname: preferred.pathname,
        uploadedAt: preferred.uploadedAt,
        source: "blob",
      };
    }
  } catch {
    // Local development may not have Blob credentials. Public fallback is intentional.
  }

  return {
    url: PUBLIC_FALLBACK_URL,
    pathname: PREFIX + "master.mp3",
    uploadedAt: undefined,
    source: "public-fallback",
  };
}

export async function GET() {
  try {
    const current = await resolveAudioSource();

    const probe = await fetch(current.url, {
      method: "GET",
      headers: { Range: "bytes=0-0" },
      cache: "no-store",
    });

    await probe.body?.cancel().catch(() => undefined);

    const contentType = probe.headers.get("content-type");
    const contentLength = Number(probe.headers.get("content-length") || 0);
    const contentRange = probe.headers.get("content-range");
    const acceptRanges = probe.headers.get("accept-ranges");
    const urlLooksLikeMp3 = current.url.toLowerCase().includes(".mp3");
    const audioTypeOk =
      Boolean(contentType?.toLowerCase().includes("audio")) || urlLooksLikeMp3;
    const rangeOk =
      probe.status === 206 ||
      Boolean(contentRange) ||
      acceptRanges?.toLowerCase() === "bytes";
    const reachable = probe.ok || probe.status === 206;
    const ok = reachable && audioTypeOk;

    return Response.json(
      {
        ok,
        reachable,
        streaming: rangeOk,
        status: probe.status,
        contentType,
        contentLength,
        contentRange,
        acceptRanges,
        pathname: current.pathname,
        uploadedAt: current.uploadedAt,
        source: current.source,
      },
      {
        status: ok ? 200 : 503,
        headers: { "cache-control": "no-store" },
      },
    );
  } catch (error) {
    return Response.json(
      {
        ok: false,
        reachable: false,
        streaming: false,
        reason:
          error instanceof Error
            ? error.message
            : "Ses kaynağı kontrol edilemedi.",
      },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
}
