import LockedManagedReader from "../../../_components/LockedManagedReader";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  const epubUrl = value("epub");
  const title = value("title") || "Kitap Önizleme";
  const author = value("author") || "Yazar";
  const coverUrl = value("cover") || "/bir_sifaci_png.png";

  if (!epubUrl) return null;

  return (
    <LockedManagedReader
      book={{
        slug: "panel-onizleme",
        title,
        author,
        authorHref: "#",
        coverUrl,
        epubUrl,
      }}
    />
  );
}