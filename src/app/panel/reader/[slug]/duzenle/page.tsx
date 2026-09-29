import { notFound } from "next/navigation";
import ReaderBookForm from "../../_components/ReaderBookForm";
import { getPanelRepository } from "../../../_server/repository";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const repository = getPanelRepository();
  const books = await repository.listBooks();
  const book = books.find(item => item.slug === slug);

  if (!book) notFound();

  return (
    <ReaderBookForm
      mode="edit"
      initial={{
        title: book.title,
        subtitle: book.subtitle || "",
        author: book.author || "",
        authorSlug: book.authorSlug,
        slug: book.slug,
        status: book.status,
        language: book.language || "Türkçe",
        cover: book.coverUrl || "",
        readerHref: book.readerHref || `/oku/${book.slug}`,
        epubName: book.epubFilename || "",
        epubUrl: book.epubUrl || "",
      }}
    />
  );
}
