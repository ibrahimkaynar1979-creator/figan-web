const CURRENT_ENDPOINT = "/api/sesli-kitap/current";

export async function GET(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const currentResponse = await fetch(origin + CURRENT_ENDPOINT, { cache: "no-store" });
    const current = await currentResponse.json().catch(() => null) as {
      ready?: boolean;
      url?: string;
      pathname?: string;
      size?: number;
      uploadedAt?: string;
      source?: string;
    } | null;

    if (!currentResponse.ok || !current?.ready || !current.url) {
      return Response.json(
        { ok: false, reason: "Ses kaynağı hazır değil." },
        { status: 503, headers: { "cache-control": "no-store" } },
      );
    }

    const probe = await fetch(current.url, {
      method: "GET",
      headers: { Range: "bytes=0-0" },
      cache: "no-store",
    });

    // We only request one byte. Cancel the body immediately after headers arrive.
    await probe.body?.cancel().catch(() => undefined);

    const contentType = probe.headers.get("content-type");
    const contentLength = Number(probe.headers.get("content-length") || 0);
    const contentRange = probe.headers.get("content-range");
    const acceptRanges = probe.headers.get("accept-ranges");
    const urlLooksLikeMp3 = current.url.toLowerCase().includes(".mp3");
    const audioTypeOk = Boolean(contentType?.toLowerCase().includes("audio")) || urlLooksLikeMp3;
    const rangeOk = probe.status === 206 || Boolean(contentRange) || acceptRanges === "bytes";
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
        reason: error instanceof Error ? error.message : "Ses kaynağı kontrol edilemedi.",
      },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
}
