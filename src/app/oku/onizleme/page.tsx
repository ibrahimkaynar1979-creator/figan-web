import { notFound } from "next/navigation";
import LockedManagedReader from "../../_components/LockedManagedReader";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const value = (key: string) => {
    const raw = params[key];
    return Array.isArray(raw) ? raw[0] || "" : raw || "";
  };

  const epubUrl = value("epub");
  if (!epubUrl) notFound();

  const title = value("title") || "Kitap adı";
  const author = value("author") || "22 Yayınevi";
  const slug = value("slug") || "onizleme";
  const coverUrl = value("cover") || "/bir_sifaci_png.png";

  return (
    <LockedManagedReader
      book={{
        slug: `preview-${slug}`,
        title,
        author,
        authorHref: "#",
        coverUrl,
        epubUrl,
      }}
    />
  );
}
