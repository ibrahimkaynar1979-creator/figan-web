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
                sizes="(max-width: 760px) calc(100vw - 16px), 46vw"
                priority
              />
            </div>
          </div>
        </section>

        <section className="author-profile-section">
          <div className="container author-profile-standard-card">
            <p className="eyebrow"><span />YAZAR HAKKINDA</p>
            <h2>Bir arayışın peşinde,<br /><em>içe doğru bir yolculuk.</em></h2>
            <div className="author-profile-prose">
              <p>
                Figen Yavuz, insanın kendisiyle, hayatla ve varoluşla kurduğu bağı merkeze alan
                metinlere ilgi duyan bir yazar ve 22 Yayınevi&apos;nin kurucusudur.
              </p>
              <p>
                Yazı dünyasında içsel yolculuk, farkındalık, sezgi ve insanın anlam arayışı gibi
                temalar öne çıkar. “Arayışın Yolculuğu” bu çizginin merkezindeki eseridir.
              </p>
            </div>
          </div>
        </section>

        <section className="author-profile-section">
          <div className="container author-profile-standard-card author-profile-featured-book">
            <div className="author-profile-featured-copy">
              <p className="eyebrow"><span />ÖNE ÇIKAN ESER</p>
              <h2>Arayışın<br /><em>Yolculuğu</em></h2>
              <p>
                İnsanın dışarıda aradığı cevaplardan kendi iç dünyasına uzanan bir yolculuk.
                Eser; kendini tanıma, anlam arayışı ve dönüşüm düşüncesi etrafında şekillenen
                bir okuma deneyimi sunuyor.
              </p>
              <div className="author-profile-book-actions">
                <a href="/e-kitap-yayini">E-Kitabını Oku <b>→</b></a>
                <a href="/sesli-kitap">Sesli Kitabını Dinle <b>→</b></a>
              </div>
            </div>
            <div className="author-profile-featured-visual">
              <Image
                src="/figen-yavuz-arayisin-yolculugu-mockup.webp"
                alt="Arayışın Yolculuğu kitap mockup"
                width={900}
                height={1100}
                sizes="(max-width: 760px) calc(100vw - 52px), 38vw"
              />
            </div>
          </div>
        </section>

        <section className="author-profile-section">
          <div className="container author-profile-standard-card">
            <p className="eyebrow"><span />ESERLERİ</p>
            <h2>Yayınlanan ve hazırlanan<br /><em>eser dünyası.</em></h2>
            <div className="author-profile-books-grid">
              <article className="author-profile-book-card-rich">
                <div className="author-profile-book-thumb">
                  <Image
                    src="/figen-yavuz-arayisin-yolculugu-mockup.webp"
                    alt="Arayışın Yolculuğu"
                    width={260}
                    height={320}
                    sizes="(max-width: 760px) calc(100vw - 44px), 110px"
                  />
                </div>
                <div className="author-profile-book-info">
                  <div className="author-profile-book-topline">
                    <span className="author-profile-book-no">01</span>
                    <span className="author-profile-book-state">22 Yayınevi</span>
                  </div>
                  <h3>Arayışın Yolculuğu</h3>
                  <p>İçsel yolculuk, anlam arayışı ve kişisel dönüşüm ekseninde ilerleyen eser.</p>
                  <div className="author-profile-book-meta">
                    <span>İçsel Yolculuk</span>
                    <span>Basılı + Dijital</span>
                  </div>
                  <div className="author-profile-book-actions">
                    <a href="/e-kitap-yayini">E-Kitabını Oku <b>→</b></a>
                    <a href="/sesli-kitap">Sesli Kitabını Dinle <b>→</b></a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="author-profile-section">
          <div className="container author-profile-standard-card author-profile-themes-card">
            <p className="eyebrow"><span />YAZARLIK TEMALARI</p>
            <h2>Figen Yavuz&apos;un<br /><em>yayın dünyası.</em></h2>
            <div className="author-profile-themes">
              <span>İçsel Yolculuk</span>
              <span>Varoluş</span>
              <span>Farkındalık</span>
              <span>Sezgi</span>
              <span>Spiritüel Arayış</span>
              <span>Mistik Düşünce</span>
              <span>Kişisel Dönüşüm</span>
            </div>
          </div>
        </section>

        <section className="author-profile-section author-profile-last-section">
          <div className="container author-profile-standard-card author-profile-audio-card">
            <p className="eyebrow"><span />SESLİ KİTAP</p>
            <h2>Metin başka bir sesle,<br /><em>yeni bir hayata kavuşur.</em></h2>
            <p>
              “Arayışın Yolculuğu”nun sesli kitap sürümü profesyonel bir seslendirme ile
              hazırlanıyor. Seslendiren kişi ve dinleme bağlantısı yayın hazır olduğunda
              bu alanda yer alacak.
            </p>
            <div className="author-profile-audio-meta">
              <span><b>Durum</b> Hazırlanıyor</span>
              <span><b>Seslendiren</b> Yakında açıklanacak</span>
            </div>
            <a className="btn primary" href="/sesli-kitap">Sesli Kitap Sürecini İncele <b>→</b></a>
          </div>
        </section>
      </main>
    </InnerPageShell>
  );
}
