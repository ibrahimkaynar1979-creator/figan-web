import { notFound } from "next/navigation";
import DatabaseEpubReader from "../../_components/DatabaseEpubReader";
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
    <DatabaseEpubReader
      title={book.title}
      subtitle={book.subtitle}
      author={book.author}
      coverUrl={book.coverUrl}
      epubUrl={book.epubUrl}
      slug={book.slug}
    />
  );
}
