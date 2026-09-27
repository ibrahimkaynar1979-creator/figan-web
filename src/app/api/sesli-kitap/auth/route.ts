import {
  AUDIOBOOK_ADMIN_COOKIE,
  audiobookAdminToken,
  isAudiobookAdmin,
  isAudiobookAdminConfigured,
  isLocalRequest,
  validateAudiobookPin,
} from "@/lib/audiobookAuth";

export async function GET(request: Request) {
  return Response.json({
    configured: isAudiobookAdminConfigured(),
    authenticated: isAudiobookAdmin(request),
    localBypass: !isAudiobookAdminConfigured() && isLocalRequest(request),
  });
}

export async function POST(request: Request) {
  if (!isAudiobookAdminConfigured()) {
    if (isLocalRequest(request)) {
      return Response.json({ authenticated: true, localBypass: true });
    }
    return Response.json(
      { error: "AUDIOBOOK_ADMIN_PIN production ortamında tanımlı değil." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { pin?: string } | null;
  const pin = body?.pin ?? "";
  if (!validateAudiobookPin(pin)) {
    return Response.json({ error: "Yönetici PIN'i hatalı." }, { status: 401 });
  }

  const token = audiobookAdminToken();
  if (!token) {
    return Response.json({ error: "Yönetici doğrulaması hazırlanamadı." }, { status: 500 });
  }

  return new Response(JSON.stringify({ authenticated: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": `${AUDIOBOOK_ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`,
    },
  });
}

export async function DELETE() {
  return new Response(JSON.stringify({ authenticated: false }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": `${AUDIOBOOK_ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
    },
  });
}
