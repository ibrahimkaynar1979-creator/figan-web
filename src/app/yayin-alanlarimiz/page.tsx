import type { Metadata } from "next";
import InnerPageShell from "../_components/InnerPageShell";

export const metadata: Metadata = {
  title: "Yayın Alanlarımız",
  description:
    "22 Yayınevi'nin edebiyat, düşünce, tarih, sanat, çocuk ve gençlik, akademik yayınlar ile spiritüel, mistik ve ezoterik çalışmalar dahil yayın alanlarını keşfedin.",
  alternates: { canonical: "/yayin-alanlarimiz" },
  openGraph: {
    type: "website",
    url: "/yayin-alanlarimiz",
    title: "Yayın Alanlarımız | 22 Yayınevi",
    description:
      "22 Yayınevi'nin edebiyat, düşünce, tarih, sanat, çocuk ve gençlik, akademik yayınlar ile spiritüel, mistik ve ezoterik çalışmalar dahil yayın alanlarını keşfedin.",
    images: [{ url: "/22_yayinevi_logo.png", alt: "Yayın Alanlarımız | 22 Yayınevi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yayın Alanlarımız | 22 Yayınevi",
    description:
      "22 Yayınevi'nin edebiyat, düşünce, tarih, sanat, çocuk ve gençlik, akademik yayınlar ile spiritüel, mistik ve ezoterik çalışmalar dahil yayın alanlarını keşfedin.",
    images: ["/22_yayinevi_logo.png"],
  },
};

const areas = [
  ["Edebiyat","Roman, öykü, novella, deneme"],
  ["Şiir","Şiir kitapları, şiir seçkileri, toplu şiirler"],
  ["Biyografi & Anı","Biyografi, otobiyografi, anı, günlük, mektup"],
  ["Araştırma & İnceleme","Edebiyat, kültür, tarih ve toplum üzerine araştırma ve incelemeler"],
  ["Düşünce","Felsefe, psikoloji, sosyoloji, düşünce ve fikir eserleri"],
  ["Tarih & Kültür","Tarih, şehir kültürü, medeniyet ve kültürel miras"],
  ["Kişisel Anlatı","Yaşam hikâyeleri, kişisel deneyimler, yolculuk ve dönüşüm anlatıları"],
  ["Çocuk & Gençlik","Çocuk edebiyatı, gençlik romanları, öyküler ve eğitici eserler"],
  ["Sanat","Edebiyat ve sanat incelemeleri, sinema, müzik, fotoğraf ve tasarım"],
  ["İş & Yaşam","Girişimcilik, kariyer, iş dünyası, liderlik ve kişisel gelişim"],
  ["Akademik & Mesleki","Uzmanlık kitapları, monografiler, akademik çalışmalar ve kaynak eserler"],
  ["Özel Yayınlar","Prestij kitapları, kurum yayınları, koleksiyonlar ve özel yayın projeleri"],
] as const;

const specialTopics = [
  ["Spiritüalizm & Ruhçuluk","Ruh kavramı, spiritüalist düşünce, ruhçuluk tarihi ve ekolleri, ölüm ve ölüm sonrası yaşama ilişkin inanışlar ve deneyim anlatıları."],
  ["Mistisizm","Doğu ve Batı mistik gelenekleri, tasavvuf, mistik düşünce ve insanın hakikat arayışı."],
  ["Parapsikoloji","Telepati, önsezi, psişik deneyimler, olağandışı bilinç deneyimleri ve parapsikoloji tarihi üzerine çalışmalar."],
  ["Ezoterizm & Okült Gelenekler","Ezoterik düşünce, hermetizm, tarihsel okült gelenekler, semboller ve ritüeller."],
  ["Kadim Öğretiler & Sembolizm","Doğu ve Batı öğretileri, mitoloji, arketipler, kadim semboller ve bunların farklı dönemlerdeki yorumları."],
  ["Astroloji","Astrolojinin tarihi, gelenekleri, ekolleri ve sembolik dünyası."],
  ["Rüyalar, Bilinç & Sezgi","Rüyalar, bilinç, bilinçaltı, sezgi ve farklı bilinç deneyimleri."],
  ["Meditasyon & Farkındalık","Meditasyon, nefes, farkındalık ve farklı geleneklerdeki içsel çalışmalar."],
  ["Enerji & Holistik Yaklaşımlar","Reiki, çakralar, enerji çalışmaları ve farklı kültürlerdeki bütünsel yaşam yaklaşımları."],
  ["İçsel Yolculuk & Kişisel Dönüşüm","İnsanın kendini tanıma arayışı, öz farkındalık, yaşamın anlamı, kişisel deneyimler ve dönüşüm hikâyeleri."],
] as const;

export default function YayinAlanlarimizPage() {
  return (
    <InnerPageShell>
      <main className="publishing-areas-page">
        
        <section className="publishing-areas-hero">
          <div className="container">
            <div className="publishing-areas-card publishing-areas-hero-card">
              <p className="eyebrow"><span/>YAYIN ALANLARIMIZ</p>
              <h1>Geniş bir yayın dünyası,<br/><em>seçici bir editoryal çizgi.</em></h1>
              <p className="publishing-areas-lead">
                <strong>22 Yayınevi</strong>; edebiyattan düşünceye, sanattan tarihe, kişisel anlatılardan araştırma ve inceleme eserlerine uzanan geniş bir yayın yelpazesinde özgün, nitelikli ve kalıcı eserleri okurla buluşturmayı amaçlar.
              </p>
              <p className="publishing-areas-lead">
                Yayın çizgimiz, insanı ve yaşamı farklı yönleriyle ele alan özgün çalışmalara açıktır. Bu yaklaşım içinde, kurucumuz <strong>Figen Yavuz&apos;un</strong> uzun yıllardır ilgi duyduğu spiritüel, mistik ve ezoterik alanlar, <strong>Figen Yavuz Özel Seçkisi</strong> başlığı altında yayınevimizin özel yayın alanlarından birini oluşturur.
              </p>
            </div>
          </div>
        </section>

        <section className="publishing-areas-section">
          <div className="container">
            <div className="publishing-areas-card">
              <p className="eyebrow"><span/>ANA YAYIN DALLARI</p>
              <h2>Hangi alanlarda <em>eser değerlendiriyoruz?</em></h2>
              <div className="publishing-areas-grid">
                {areas.map(([title, text], index)=>(
                  <article key={title}>
                    <b>{String(index+1).padStart(2,"0")}</b>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="publishing-areas-section">
          <div className="container">
            <div className="publishing-areas-card publishing-areas-special">
              <p className="eyebrow"><span/>ÖZEL YAYIN ALANIMIZ</p>
              <h2>Spiritüel, Mistik &amp;<br/><em>Ezoterik Çalışmalar</em></h2>
              <p>
                22 Yayınevi&apos;nin yayın dünyasında ayrı bir yere sahip olan <strong>Spiritüel, Mistik &amp; Ezoterik Çalışmalar</strong>, kurucumuz <strong>Figen Yavuz&apos;un uzun yıllardır kişisel ilgi duyduğu ve takip ettiği alanlardan</strong> doğan özel bir yayın seçkisidir.
              </p>
              <p>
                İnsanın yalnızca dış dünyasını değil; <strong>ruhunu, bilincini, sezgilerini, rüyalarını, içsel yolculuğunu ve varoluşa ilişkin kadim sorularını</strong> konu alan eserleri bu özel yayın alanında değerlendiriyoruz.
              </p>
              <p>
                Bu seçki; belirli bir inancı veya öğretiyi benimsetmek amacı taşımaz. Farklı kültürlerin, geleneklerin ve düşünce sistemlerinin insanın kendisini ve varoluşu anlama çabasına nasıl yaklaştığını konu alan özgün eserlere alan açmayı amaçlar.
              </p>
            </div>
          </div>
        </section>

        <section className="publishing-areas-section">
          <div className="container">
            <div className="publishing-areas-card">
              <p className="eyebrow"><span/>BU ALANDA DEĞERLENDİRDİĞİMİZ KONULAR</p>
              <div className="publishing-special-grid">
                {specialTopics.map(([title, text], index)=>(
                  <article key={title}>
                    <b>{String(index+1).padStart(2,"0")}</b>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="publishing-areas-section">
          <div className="container">
            <div className="publishing-areas-card publishing-areas-curation">
              <p className="eyebrow"><span/>FİGEN YAVUZ SEÇKİSİ</p>
              <h2>Özel bir editoryal <em>seçki.</em></h2>
              <p>
                Bu özel yayın alanında yayımlanacak eserlerin bir bölümü, <strong>Figen Yavuz&apos;un editoryal ilgisi ve seçkisiyle</strong> 22 Yayınevi kataloğuna dahil edilir.
              </p>
              <p>
                Böylece 22 Yayınevi&apos;nin genel yayın çizgisinin yanında; spiritüel, mistik ve ezoterik dünyaya ayrılmış, zaman içinde kendi yazarlarını ve okur kitlesini oluşturabilecek özel bir yayın koleksiyonu geliştirmeyi hedefliyoruz.
              </p>
              <a className="btn primary" href="/kurucu-yazar">İlk 22 Kurucu Yazar Başvurusu <b>→</b></a>
            </div>
          </div>
        </section>
      </main>
    </InnerPageShell>
  );
}
