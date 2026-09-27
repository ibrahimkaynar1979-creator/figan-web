import { issueSignedToken } from "@vercel/blob";
import {
  handleUploadPresigned,
  type HandleUploadPresignedBody,
} from "@vercel/blob/client";
import { isAudiobookAdmin } from "@/lib/audiobookAuth";

export async function POST(request: Request) {
  if (!isAudiobookAdmin(request)) {
    return Response.json({ error: "Yetkisiz işlem." }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadPresignedBody;

  try {
    const response = await handleUploadPresigned({
      request,
      body,
      getSignedToken: async (pathname) => {
        if (pathname !== "audiobooks/bir-sifacinin-kanadi/master.mp3") {
          throw new Error("Geçersiz ses dosyası yolu.");
        }

        const token = await issueSignedToken({
          pathname,
          operations: ["put"],
          allowedContentTypes: ["audio/mpeg"],
          maximumSizeInBytes: 120 * 1024 * 1024,
          storeId: process.env.BLOB_STORE_ID,
        });

        return {
          token,
          urlOptions: {
            allowedContentTypes: ["audio/mpeg"],
            maximumSizeInBytes: 120 * 1024 * 1024,
            addRandomSuffix: false,
            allowOverwrite: true,
            tokenPayload: JSON.stringify({
              book: "bir-sifacinin-kanadi",
              type: "master-audio",
            }),
          },
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Bir Şifacının Kanadı master audio uploaded:", blob.url);
      },
    });

    return Response.json(response);
  } catch (error) {
    const details =
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : { message: String(error) };
    console.error("Audiobook Blob presigned upload error:", details);
    return Response.json({ error: details.message }, { status: 400 });
  }
}
