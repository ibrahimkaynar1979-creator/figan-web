import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken",
  description: "İbrahim Kaynar’ın İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken kitabı. Fi Yayınevi.",
  alternates:{canonical:"/kitaplar/icimdeki-ibrahim"},
};

const bookSchema = {
  "@context":"https://schema.org",
  "@type":"Book",
  name:"İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken",
  author:{
    "@type":"Person",
    name:"İbrahim Kaynar",
    url:"https://www.fiyayinevi.com/yazarlar/ibrahim-kaynar",
  },
  publisher:{ "@id":"https://www.fiyayinevi.com/#organization" },
  inLanguage:"tr",
  url:"https://www.fiyayinevi.com/kitaplar/icimdeki-ibrahim",
};

export default function Page(){
  return (
    <main className="seo-book-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(bookSchema)}}/>
      <div className="container seo-book-grid">
        <div className="seo-book-cover"><img src="/icimdeki-ibrahim.webp" alt="İçimdeki İbrahim kitap kapağı"/></div>
        <div className="seo-book-copy">
          <a className="legal-back" href="/">← Fi Yayınevi</a>
          <p className="eyebrow"><span/>KİTAP</p>
          <h1>İçimdeki İbrahim</h1>
          <h2>Âsaf Hâlet Çelebi’yi Ararken</h2>
          <p>İbrahim Kaynar’ın şiir, hafıza ve edebiyatın izinde kişisel bir yolculuğa dönüştürdüğü eser.</p>
          <a className="btn primary" href="/yazarlar/ibrahim-kaynar">Yazarı Görün <b>→</b></a>
        </div>
      </div>
    </main>
  );
}