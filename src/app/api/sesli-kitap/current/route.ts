import { getCurrentAudiobook } from "@/lib/audiobookCurrent";

export async function GET() {
  const current = await getCurrentAudiobook();
  return Response.json(current, {
    headers: { "cache-control": "no-store" },
  });
}
