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
          allowedContentTypes: ["audio/mpeg", "audio/mp3"],
          maximumSizeInBytes: 120 * 1024 * 1024,
          addRandomSuffix: false,
          allowOverwrite: true,
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
    return Response.json(
      { error: error instanceof Error ? error.message : "Yükleme başlatılamadı." },
      { status: 400 },
    );
  }
}
