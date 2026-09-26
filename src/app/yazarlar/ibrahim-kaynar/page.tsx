import type { Metadata } from "next";
import PublishingReels from "../../_components/PublishingReels";

export const metadata: Metadata = {
  title: "İbrahim Kaynar",
  description: "22 Yayınevi yazarı İbrahim Kaynar ve İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken kitabı.",
  alternates:{canonical:"/yazarlar/ibrahim-kaynar"},
};

const personSchema = {
  "@context":"https://schema.org",
  "@type":"Person",
  name:"İbrahim Kaynar",
  url:"https://www.22yayinevi.com/yazarlar/ibrahim-kaynar",
  worksFor:{ "@id":"https://www.22yayinevi.com/#organization" },
};

export default function Page(){
  return (
    <main className="seo-profile-page">\n      <PublishingReels />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(personSchema)}}/>
      <div className="container seo-profile-card">
        <a className="legal-back" href="/">← 22 Yayınevi</a>
        <p className="eyebrow"><span/>Fİ YAZARI</p>
        <h1>İbrahim Kaynar</h1>
        <p className="seo-profile-lead">“İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken” ile şiir, hafıza ve edebiyatın izinde kişisel bir yolculuk.</p>
        <div className="author-content-actions" aria-label="İbrahim Kaynar yayın içerikleri">
          <a href="/yazar-sitesi"><span>↗</span><b>Web Sitesi</b></a>
          <a href="/e-kitap-yayini"><span>▤</span><b>E-Kitap</b></a>
          <a href="/sesli-kitap"><span>◉</span><b>Sesli Kitap</b></a>
        </div>
        <a className="btn primary" href="/kitaplar/icimdeki-ibrahim">Kitabı İnceleyin <b>→</b></a>
      </div>
    </main>
  );
}