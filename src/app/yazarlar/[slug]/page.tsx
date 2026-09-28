import type { Metadata } from "next";
import ManagedAuthorPageView from "../../_components/author/ManagedAuthorPageView";
import { getAuthor } from "../../_data/authors";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) {
    return {
      title: "Yazar",
      alternates: { canonical: `/yazarlar/${slug}` },
    };
  }

  const featured = author.books.find((book) => book.featured) ?? author.books[0];
  return {
    title: author.name,
    description: `${author.name} yazar dünyası${featured ? `; ${featured.title}, e-kitap ve sesli kitap deneyimleri.` : "."}`,
    alternates: { canonical: `/yazarlar/${author.slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthor(slug) ?? null;

  return <ManagedAuthorPageView slug={slug} initialAuthor={author} />;
}
