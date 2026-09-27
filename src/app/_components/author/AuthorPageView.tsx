import styles from "./AuthorPlatform.module.css";
import AuthorHero from "./AuthorHero";
import FeaturedBook from "./FeaturedBook";
import ReaderShowcase from "./ReaderShowcase";
import AudioShowcase from "./AudioShowcase";
import AuthorIntro from "./AuthorIntro";
import AuthorArticles from "./AuthorArticles";
import AuthorLibrary from "./AuthorLibrary";
import AuthorEvents from "./AuthorEvents";
import AuthorNewsletter from "./AuthorNewsletter";
import AuthorFooter from "./AuthorFooter";
import type { AuthorProfile } from "../../_data/authors";

export default function AuthorPageView({ author }: { author: AuthorProfile }) {
  const featuredBook = author.books.find((book) => book.featured) ?? author.books[0];
  if (!featuredBook) return null;

  return (
    <main className={`author-platform-shell ${styles.platform}`}>
      <AuthorHero author={author} />
      <FeaturedBook book={featuredBook} />
      <ReaderShowcase author={author} book={featuredBook} />
      <AudioShowcase author={author} book={featuredBook} />
      <AuthorIntro author={author} />
      <AuthorArticles author={author} />
      <AuthorLibrary author={author} />
      <AuthorEvents author={author} />
      <AuthorNewsletter />
      <AuthorFooter author={author} />
    </main>
  );
}
