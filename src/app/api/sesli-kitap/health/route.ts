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
      method: "HEAD",
      cache: "no-store",
    });

    const contentType = probe.headers.get("content-type");
    const contentLength = Number(probe.headers.get("content-length") || current.size || 0);
    const acceptRanges = probe.headers.get("accept-ranges");

    const ok =
      probe.ok &&
      Boolean(contentType?.toLowerCase().includes("audio")) &&
      contentLength > 0;

    return Response.json(
      {
        ok,
        status: probe.status,
        contentType,
        contentLength,
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
        reason: error instanceof Error ? error.message : "Ses kaynağı kontrol edilemedi.",
      },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
}
