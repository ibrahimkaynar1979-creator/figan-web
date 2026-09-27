import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AuthorPageView from "../../_components/author/AuthorPageView";
import { getAuthor } from "../../_data/authors";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  const featured = author.books.find((book) => book.featured) ?? author.books[0];
  return {
    title: author.name,
    description: `${author.name} yazar dünyası${featured ? `; ${featured.title}, e-kitap ve sesli kitap deneyimleri.` : "."}`,
    alternates: { canonical: `/yazarlar/${author.slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  return <AuthorPageView author={author} />;
}
