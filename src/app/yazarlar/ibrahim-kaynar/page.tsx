import type { Metadata } from "next";
import AuthorSite from "../_components/AuthorSite";
import { getAuthor } from "../_data/authors";

const author = getAuthor("ibrahim-kaynar");

export const metadata: Metadata = {
  title: "İbrahim Kaynar",
  description: "İbrahim Kaynar yazar dünyası ve eserleri.",
  alternates: { canonical: "/yazarlar/ibrahim-kaynar" },
};

export default function Page() {
  if (!author) return null;
  return <AuthorSite author={author} />;
}
