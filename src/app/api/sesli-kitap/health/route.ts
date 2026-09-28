import { getCurrentAudiobook } from "@/lib/audiobookCurrent";

export async function GET() {
  const current = await getCurrentAudiobook();
  const url = current.audioUrl || current.url;

  if (!url) {
    return Response.json(
      { ok: false, reachable: false, streaming: false, reason: "Ses kaynağı bulunamadı." },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const probe = await fetch(url, {
      method: "GET",
      headers: { Range: "bytes=0-0" },
      cache: "no-store",
      signal: controller.signal,
    });

    await probe.body?.cancel().catch(() => undefined);

    const contentType = probe.headers.get("content-type");
    const contentLength = Number(probe.headers.get("content-length") || 0);
    const contentRange = probe.headers.get("content-range");
    const acceptRanges = probe.headers.get("accept-ranges");
    const totalSizeMatch = contentRange?.match(/\/(\d+)$/);
    const totalSize = totalSizeMatch ? Number(totalSizeMatch[1]) : undefined;
    const audioTypeOk =
      Boolean(contentType?.toLowerCase().includes("audio")) ||
      url.toLowerCase().includes(".mp3");
    const streaming =
      probe.status === 206 ||
      Boolean(contentRange) ||
      acceptRanges?.toLowerCase() === "bytes";
    const reachable = probe.ok || probe.status === 206;
    const ok = reachable && audioTypeOk;

    return Response.json(
      {
        ok,
        reachable,
        streaming,
        status: probe.status,
        contentType,
        contentLength,
        contentRange,
        acceptRanges,
        totalSize,
        pathname: current.pathname,
        uploadedAt: current.uploadedAt,
        source: current.source,
        slug: current.slug,
        title: current.title,
      },
      {
        status: ok ? 200 : 503,
        headers: { "cache-control": "no-store" },
      },
    );
  } catch (error) {
    const aborted =
      error instanceof Error &&
      (error.name === "AbortError" || error.name === "TimeoutError");

    return Response.json(
      {
        ok: false,
        reachable: false,
        streaming: false,
        pathname: current.pathname,
        source: current.source,
        reason: aborted
          ? "Ses kaynağı kontrolü 5 saniyede yanıt vermedi."
          : error instanceof Error
            ? error.message
            : "Ses kaynağı kontrol edilemedi.",
      },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  } finally {
    clearTimeout(timeout);
  }
}
