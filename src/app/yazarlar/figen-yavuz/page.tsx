import type { Metadata } from "next";
import Image from "next/image";
import InnerPageShell from "../../_components/InnerPageShell";
import PublishingReels from "../../_components/PublishingReels";

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
      <main className="seo-profile-page author-profile-editorial">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
        />

        <PublishingReels />

        <section className="container author-profile-card">
          <div className="author-profile-copy">
            <a className="legal-back" href="/">← 22 Yayınevi</a>
            <p className="eyebrow"><span />22 YAYINEVİ YAZARI</p>
            <h1>Figen Yavuz</h1>
            <p className="author-profile-book-title">Arayışın Yolculuğu</p>
            <p className="seo-profile-lead">
              “Arayışın Yolculuğu” ile insanın kendine, hayata ve varoluşa dair
              içsel yolculuğuna eşlik eden bir eser dünyası kuruyor.
            </p>
            <p className="author-profile-body">
              Figen Yavuz&apos;un yazar profili; kitabını, yayın yolculuğunu ve
              22 Yayınevi çatısı altında gelişen yayın dünyasını tek bir kalıcı
              alanda bir araya getirir.
            </p>
            <a className="btn primary" href="/#basvuru">
              Yazar Dünyasını Keşfedin <b>→</b>
            </a>
          </div>

          <div className="author-profile-visual">
            <Image
              src="/figen-yavuz-arayisin-yolculugu-mockup.webp"
              alt="Figen Yavuz - Arayışın Yolculuğu kitap mockup"
              width={900}
              height={1100}
              sizes="(max-width: 760px) 100vw, 42vw"
              priority
            />
          </div>
        </section>
      </main>
    </InnerPageShell>
  );
}
