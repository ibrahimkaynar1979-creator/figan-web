import { createHmac, timingSafeEqual } from "node:crypto";

export const AUDIOBOOK_ADMIN_COOKIE = "22y_audiobook_admin";

function expectedToken() {
  const pin = process.env.AUDIOBOOK_ADMIN_PIN;
  if (!pin) return null;
  return createHmac("sha256", pin).update("22y-audiobook-admin").digest("hex");
}

export function isAudiobookAdminConfigured() {
  return Boolean(process.env.AUDIOBOOK_ADMIN_PIN);
}

export function isLocalRequest(request: Request) {
  try {
    const host = new URL(request.url).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return false;
  }
}

export function isAudiobookAdmin(request: Request) {
  const expected = expectedToken();
  if (!expected) return isLocalRequest(request);

  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(AUDIOBOOK_ADMIN_COOKIE + "="));
  const actual = match?.slice(AUDIOBOOK_ADMIN_COOKIE.length + 1) ?? "";

  if (!actual || actual.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

export function validateAudiobookPin(pin: string) {
  const configured = process.env.AUDIOBOOK_ADMIN_PIN;
  if (!configured || pin.length !== configured.length) return false;
  return timingSafeEqual(Buffer.from(pin), Buffer.from(configured));
}

export function audiobookAdminToken() {
  return expectedToken();
}
