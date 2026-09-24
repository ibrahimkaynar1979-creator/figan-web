import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Figen Yavuz",
  description: "Fi Yayınevi yazarı Figen Yavuz.",
  robots:{index:false,follow:true},
};

export default function Page(){
  return (
    <main className="seo-profile-page">
      <div className="container seo-profile-card">
        <a className="legal-back" href="/">← Fi Yayınevi</a>
        <p className="eyebrow"><span/>Fİ YAZARI</p>
        <h1>Figen Yavuz</h1>
        <p className="seo-profile-lead">Yazar profili ve eser bilgileri hazırlandığında bu sayfa Fi yayın dünyasındaki kalıcı yazar alanı olarak kullanılacak.</p>
      </div>
    </main>
  );
}