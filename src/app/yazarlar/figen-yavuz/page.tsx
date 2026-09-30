import type { Metadata } from "next";
import AuthorSite from "../_components/AuthorSite";
import { getAuthor } from "../_data/authors";

const author = getAuthor("figen-yavuz");

export const metadata: Metadata = {
  title: "Figen Yavuz",
  description: "Figen Yavuz yazar dünyası, Bir Şifacının Kanadı, e-kitap ve sesli kitap deneyimleri.",
  alternates: { canonical: "/yazarlar/figen-yavuz" },
};

export default function Page() {
  if (!author) return null;
  return <AuthorSite author={author} />;
}
