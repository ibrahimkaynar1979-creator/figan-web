import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const ALLOWED_CONTENT_TYPES = [
  "application/epub+zip",
  "application/octet-stream",
  "image/png",
  "image/jpeg",
  "image/webp",
];

export async function POST(request: Request): Promise<NextResponse> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        code: "BLOB_NOT_CONFIGURED",
        message: "BLOB_READ_WRITE_TOKEN is not configured.",
      },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as HandleUploadBody;

    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_CONTENT_TYPES,
      }),
      onUploadCompleted: async () => {
        // The book record is saved separately after the client receives the Blob URL.
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        code: "BLOB_UPLOAD_FAILED",
        message: error instanceof Error ? error.message : "Blob upload failed.",
      },
      { status: 400 }
    );
  }
}
