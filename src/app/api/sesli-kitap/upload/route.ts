import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const response = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.endsWith(".mp3")) {
          throw new Error("Sadece MP3 dosyası yüklenebilir.");
        }

        return {
          allowedContentTypes: ["audio/mpeg"],
          maximumSizeInBytes: 120 * 1024 * 1024,
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({
            book: "bir-sifacinin-kanadi",
            type: "master-audio",
          }),
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
    console.error("Audiobook Blob upload token error:", details);
    return Response.json(
      { error: details.message, details },
      { status: 400 },
    );
  }
}
