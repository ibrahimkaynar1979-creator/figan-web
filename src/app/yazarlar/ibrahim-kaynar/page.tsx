import type { Metadata } from "next";
import Image from "next/image";
import InnerPageShell from "../../_components/InnerPageShell";

export const metadata: Metadata = {
  title: "İbrahim Kaynar",
  description:
    "22 Yayınevi yazarı İbrahim Kaynar ve İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken kitabı.",
  alternates: { canonical: "/yazarlar/ibrahim-kaynar" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "İbrahim Kaynar",
  url: "https://www.22yayinevi.com/yazarlar/ibrahim-kaynar",
  affiliation: { "@id": "https://www.22yayinevi.com/#organization" },
};

export default function Page() {
  return (
    <InnerPageShell>
      <main className="seo-service-page seo-service-editorial">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <section className="seo-service-hero">
          <div className="container seo-service-grid">
            <div className="seo-service-copy">
              <a className="legal-back" href="/">← 22 Yayınevi</a>
              <p className="eyebrow"><span />22 YAYINEVİ YAZARI</p>
              <h1>İbrahim Kaynar</h1>
              <p className="author-profile-book-title">İçimdeki İbrahim</p>
              <p className="seo-service-lead">
                “İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken” ile şiir, hafıza ve
                edebiyatın izinde kişisel bir yolculuk kuruyor.
              </p>
              <div className="author-content-actions author-content-actions-stacked" aria-label="İbrahim Kaynar yayın içerikleri">
                <a className="author-action-website" href="/yazar-sitesi"><span>↗</span><b>Web Sitesini İncele</b><i>→</i></a>
                <a className="author-action-ebook" href="/e-kitap-yayini"><span>▤</span><b>E-Kitabını Oku</b><i>→</i></a>
                <a className="author-action-audio" href="/sesli-kitap"><span>◉</span><b>Sesli Kitabını Dinle</b><i>→</i></a>
              </div>
            </div>

            <div className="seo-service-visual">
              <Image
                src="/icimdeki-ibrahim.webp"
                alt="İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken"
                width={1200}
                height={900}
                sizes="(max-width: 760px) 100vw, 46vw"
                priority
              />
            </div>
          </div>
        </section>

        <section className="author-profile-section">
          <div className="container author-profile-standard-card">
            <p className="eyebrow"><span />YAZAR HAKKINDA</p>
            <h2>Edebiyatın izinde,<br /><em>kişisel bir arayış.</em></h2>
            <div className="author-profile-prose">
              <p>
                İbrahim Kaynar, edebiyat, şiir, hafıza ve yazarların hayatları üzerinden
                kişisel bir arayış kuran metinler kaleme alır.
              </p>
              <p>
                “İçimdeki İbrahim” serisinde bir edebiyatçının izini sürerken kendi
                düşünce ve hatıralarını da anlatının içine taşır.
              </p>
            </div>
          </div>
        </section>

        <section className="author-profile-section">
          <div className="container author-profile-standard-card author-profile-featured-book">
            <div className="author-profile-featured-copy">
              <p className="eyebrow"><span />ÖNE ÇIKAN ESER</p>
              <h2>İçimdeki İbrahim<br /><em>Âsaf Hâlet Çelebi’yi Ararken</em></h2>
              <p>
                Âsaf Hâlet Çelebi’nin şiir dünyası, hayatı ve edebî izleri üzerinden ilerleyen;
                okuru yalnızca bir şairin değil, anlatıcının kendi iç yolculuğunun da izine
                davet eden bir eser.
              </p>
              <div className="author-profile-book-actions">
                <a href="/kitaplar/icimdeki-ibrahim">Kitabı İncele <b>→</b></a>
                <a href="/e-kitap-yayini">E-Kitabını Oku <b>→</b></a>
                <a href="/sesli-kitap">Sesli Kitabını Dinle <b>→</b></a>
              </div>
            </div>
            <div className="author-profile-featured-visual">
              <Image
                src="/icimdeki-ibrahim.webp"
                alt="İçimdeki İbrahim kitap kapağı"
                width={900}
                height={1100}
                sizes="(max-width: 760px) 100vw, 38vw"
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
                    src="/icimdeki-ibrahim.webp"
                    alt="İçimdeki İbrahim"
                    width={260}
                    height={320}
                    sizes="110px"
                  />
                </div>
                <div className="author-profile-book-info">
                  <div className="author-profile-book-topline">
                    <span className="author-profile-book-no">01</span>
                    <span className="author-profile-book-state">22 Yayınevi</span>
                  </div>
                  <h3>İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken</h3>
                  <p>Şiir, hafıza, edebiyat ve kişisel arayış ekseninde ilerleyen eser.</p>
                  <div className="author-profile-book-meta">
                    <span>Edebiyat</span>
                    <span>Basılı + Dijital</span>
                  </div>
                  <div className="author-profile-book-actions">
                    <a href="/kitaplar/icimdeki-ibrahim">Kitabı İncele <b>→</b></a>
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
            <h2>İbrahim Kaynar&apos;ın<br /><em>yayın dünyası.</em></h2>
            <div className="author-profile-themes">
              <span>Şiir</span>
              <span>Edebiyat</span>
              <span>Hafıza</span>
              <span>Yazar Portreleri</span>
              <span>Kişisel Arayış</span>
              <span>Türk Edebiyatı</span>
              <span>Deneme</span>
            </div>
          </div>
        </section>

        <section className="author-profile-section author-profile-last-section">
          <div className="container author-profile-standard-card author-profile-audio-card">
            <p className="eyebrow"><span />SESLİ KİTAP</p>
            <h2>Metin başka bir sesle,<br /><em>yeni bir hayata kavuşur.</em></h2>
            <p>
              “İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken” sesli kitap sürümü
              profesyonel bir seslendirme ile hazırlanır.
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
