import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";
import { isAudiobookAdmin } from "@/lib/audiobookAuth";

const AUDIO_PATH = /^audiobooks\/[a-z0-9-]+\/master\.mp3$/;
const COVER_PATH = /^audiobooks\/[a-z0-9-]+\/cover\.(png|jpe?g|webp)$/;
const ACTIVE_MANIFEST_PATH = "audiobooks/active.json";

export async function POST(request: Request) {
  if (!isAudiobookAdmin(request)) {
    return Response.json({ error: "Yetkisiz işlem." }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (AUDIO_PATH.test(pathname)) {
          return {
            allowedContentTypes: ["audio/mpeg", "audio/mp3"],
            maximumSizeInBytes: 120 * 1024 * 1024,
            addRandomSuffix: false,
            allowOverwrite: true,
            tokenPayload: JSON.stringify({ type: "audiobook-audio", pathname }),
          };
        }

        if (COVER_PATH.test(pathname)) {
          return {
            allowedContentTypes: ["image/png", "image/jpeg", "image/webp"],
            maximumSizeInBytes: 10 * 1024 * 1024,
            addRandomSuffix: false,
            allowOverwrite: true,
            tokenPayload: JSON.stringify({ type: "audiobook-cover", pathname }),
          };
        }

        if (pathname === ACTIVE_MANIFEST_PATH) {
          return {
            allowedContentTypes: ["application/json"],
            maximumSizeInBytes: 256 * 1024,
            addRandomSuffix: false,
            allowOverwrite: true,
            tokenPayload: JSON.stringify({ type: "audiobook-manifest" }),
          };
        }

        throw new Error("Geçersiz sesli kitap dosya yolu.");
      },
    });

    return Response.json(response);
  } catch (error) {
    const details =
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : { message: String(error) };
    console.error("Audiobook Blob upload error:", details);
    return Response.json({ error: details.message }, { status: 400 });
  }
}
