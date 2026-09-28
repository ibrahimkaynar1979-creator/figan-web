import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    service: "22-reader-panel",
    databaseConfigured: Boolean(process.env.DATABASE_URL),
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    persistence: process.env.DATABASE_URL ? "database-pending-driver" : "browser-fallback",
  });
}
