import {
  handleUpload,
  type HandleUploadBody,
} from "@vercel/blob/client";
import { isAudiobookAdmin } from "@/lib/audiobookAuth";

const TARGET_PATH = "audiobooks/bir-sifacinin-kanadi/master.mp3";

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
        if (pathname !== TARGET_PATH) {
          throw new Error("Geçersiz ses dosyası yolu.");
        }

        return {
          allowedContentTypes: ["audio/mpeg"],
          maximumSizeInBytes: 120 * 1024 * 1024,
          addRandomSuffix: false,
          allowOverwrite: true,
          tokenPayload: JSON.stringify({
            book: "bir-sifacinin-kanadi",
            type: "master-audio",
          }),
        };
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
