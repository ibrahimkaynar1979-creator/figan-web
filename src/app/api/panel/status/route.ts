import { NextResponse } from "next/server";

export async function GET() {
  const databaseConfigured = Boolean(process.env.DATABASE_URL);

  return NextResponse.json({
    service: "22-reader-panel",
    databaseConfigured,
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    persistence: databaseConfigured ? "database" : "browser-fallback",
  });
}
