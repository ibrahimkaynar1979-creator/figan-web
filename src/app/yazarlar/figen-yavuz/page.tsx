import type { Metadata } from "next";
import Image from "next/image";
import InnerPageShell from "../../_components/InnerPageShell";

export const metadata: Metadata = {
  title: "Figen Yavuz",
  description:
    "22 Yayınevi yazarı Figen Yavuz ve Arayışın Yolculuğu kitabı. Yazarın yayın dünyasını, eserini ve 22 Yayınevi'ndeki yazar profilini keşfedin.",
  alternates: { canonical: "/yazarlar/figen-yavuz" },
  openGraph: {
    type: "profile",
    url: "/yazarlar/figen-yavuz",
    title: "Figen Yavuz | 22 Yayınevi",
    description:
      "Figen Yavuz'un Arayışın Yolculuğu kitabı ve 22 Yayınevi'ndeki yazar dünyası.",
    images: [
      {
        url: "/figen-yavuz-arayisin-yolculugu-mockup.webp",
        alt: "Figen Yavuz - Arayışın Yolculuğu kitap mockup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Figen Yavuz | 22 Yayınevi",
    description:
      "Figen Yavuz'un Arayışın Yolculuğu kitabı ve 22 Yayınevi'ndeki yazar dünyası.",
    images: ["/figen-yavuz-arayisin-yolculugu-mockup.webp"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Figen Yavuz",
  url: "https://www.22yayinevi.com/yazarlar/figen-yavuz",
  affiliation: { "@id": "https://www.22yayinevi.com/#organization" },
};

const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Arayışın Yolculuğu",
  author: {
    "@type": "Person",
    name: "Figen Yavuz",
    url: "https://www.22yayinevi.com/yazarlar/figen-yavuz",
  },
  publisher: { "@id": "https://www.22yayinevi.com/#organization" },
  inLanguage: "tr",
};

export default function Page() {
  return (
    <InnerPageShell>
      <main className="seo-service-page seo-service-editorial">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
        />

        <section className="seo-service-hero">
          <div className="container seo-service-grid">
            <div className="seo-service-copy">
              <a className="legal-back" href="/">← 22 Yayınevi</a>
              <p className="eyebrow"><span />22 YAYINEVİ YAZARI</p>
              <h1>Figen Yavuz</h1>
              <p className="author-profile-book-title">Arayışın Yolculuğu</p>
              <p className="seo-service-lead">
                “Arayışın Yolculuğu” ile insanın kendine, hayata ve varoluşa dair
                içsel yolculuğuna eşlik eden bir eser dünyası kuruyor.
              </p>
              <div className="author-content-actions author-content-actions-stacked" aria-label="Figen Yavuz yayın içerikleri">
                <a className="author-action-website" href="/yazar-sitesi"><span>↗</span><b>Web Sitesini İncele</b><i>→</i></a>
                <a className="author-action-ebook" href="/e-kitap-yayini"><span>▤</span><b>E-Kitabını Oku</b><i>→</i></a>
                <a className="author-action-audio" href="/sesli-kitap"><span>◉</span><b>Sesli Kitabını Dinle</b><i>→</i></a>
              </div>
            </div>

            <div className="seo-service-visual">
              <Image
                src="/figen-yavuz-arayisin-yolculugu-mockup.webp"
                alt="Figen Yavuz - Arayışın Yolculuğu kitap mockup"
                width={1200}
                height={900}
                sizes="(max-width: 760px) 100vw, 46vw"
                priority
              />
            </div>
          </div>
        </section>
      </main>
    </InnerPageShell>
  );
}
