import { notFound } from "next/navigation";
import LockedManagedReader from "../../_components/LockedManagedReader";
import { getPanelRepository } from "../../panel/_server/repository";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repository = getPanelRepository();
  const books = await repository.listBooks();
  const book = books.find(item => item.slug === slug);

  if (!book || !book.epubUrl) {
    notFound();
  }

  return (
    <LockedManagedReader
      book={{
        slug: book.slug,
        title: book.title,
        author: book.author || "22 Yayınevi",
        authorHref: book.authorHref || `/yazarlar/${book.authorSlug}`,
        coverUrl: book.coverUrl || "/bir_sifaci_png.png",
        epubUrl: book.epubUrl,
      }}
    />
  );
}
