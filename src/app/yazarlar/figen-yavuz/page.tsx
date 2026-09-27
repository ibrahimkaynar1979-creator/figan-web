import type { Metadata } from "next";
import AuthorPageView from "../../_components/author/AuthorPageView";
import { getAuthor } from "../../_data/authors";

const author = getAuthor("figen-yavuz");

export const metadata: Metadata = {
  title: "Figen Yavuz",
  description: "Figen Yavuz'un yazar dünyası; Bir Şifacının Kanadı, e-kitap ve sesli kitap deneyimleri.",
  alternates: { canonical: "/yazarlar/figen-yavuz" },
};

export default function Page() {
  if (!author) return null;
  return <AuthorPageView author={author} />;
}
