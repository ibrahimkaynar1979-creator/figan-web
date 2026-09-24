type ServicePageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  bullets: string[];
  image: string;
  audience?: string[];
  process?: string[];
  outputs?: string[];
  faqs?: { q: string; a: string }[];
};

export default function SeoServicePage({
  eyebrow,
  title,
  lead,
  bullets,
  image,
  audience = [
    "Dosyasını profesyonel yayına hazırlamak isteyen yazarlar",
    "Basılı ve dijital yayın seçeneklerini birlikte değerlendirenler",
    "Yayın sürecini tek noktadan ve planlı biçimde yürütmek isteyenler",
  ],
  process = [
    "Dosya ve yayın hedefi değerlendirilir.",
    "Hizmete özel hazırlık ve editoryal plan oluşturulur.",
    "Yayın dosyaları ve gerekli görsel/teknik materyaller hazırlanır.",
    "Son kontroller yapılarak yayın veya dağıtım aşamasına geçilir.",
  ],
  outputs = [
    "Yayın standardına uygun hazırlanmış dosyalar",
    "Hizmete göre gerekli görsel ve teknik çıktılar",
    "Yayın veya dağıtım için uygulanabilir bir sonraki adım planı",
  ],
  faqs = [
    { q:"Süreç nasıl başlıyor?", a:"Önce dosyanızı ve yayın hedefinizi değerlendiriyoruz. Ardından ihtiyacınıza uygun hizmet kapsamı ve yol haritası netleştiriliyor." },
    { q:"Hizmet tek başına alınabilir mi?", a:"Evet. İhtiyacınıza göre tek bir hizmetten yararlanabilir veya birden fazla hizmeti aynı yayın planında birleştirebilirsiniz." },
    { q:"Fiyat nasıl belirleniyor?", a:"Eserin kapsamı, sayfa sayısı, hazırlık ihtiyacı ve seçilen hizmetlere göre değerlendirme sonrasında net teklif oluşturulur." },
  ],
}: ServicePageProps){
  return (
    <main className="seo-service-page">
      <section className="seo-service-hero">
        <div className="container seo-service-grid">
          <div className="seo-service-copy">
            <a className="legal-back" href="/">← Fi Yayınevi</a>
            <p className="eyebrow"><span/>{eyebrow}</p>
            <h1>{title}</h1>
            <p className="seo-service-lead">{lead}</p>
            <a className="btn primary" href="https://wa.me/905532419397?text=Merhaba%2C%20Fi%20Yay%C4%B1nevi%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer">Bilgi Alın <b>→</b></a>
          </div>
          <div className="seo-service-visual"><img src={image} alt=""/></div>
        </div>
      </section>

      <section className="seo-service-detail">
        <div className="container seo-service-detail-card">
          <h2>Bu hizmet neleri kapsar?</h2>
          <div className="seo-service-bullets">
            {bullets.map((item, index)=>(
              <article key={item}><b>{String(index+1).padStart(2,"0")}</b><p>{item}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-service-rich">
        <div className="container seo-service-rich-grid">
          <article>
            <p className="eyebrow"><span/>KİMLER İÇİN?</p>
            <h2>Bu hizmet size uygun mu?</h2>
            <ul>{audience.map((item)=><li key={item}>{item}</li>)}</ul>
          </article>
          <article>
            <p className="eyebrow"><span/>SÜREÇ</p>
            <h2>Nasıl ilerliyoruz?</h2>
            <ol>{process.map((item)=><li key={item}>{item}</li>)}</ol>
          </article>
        </div>
      </section>

      <section className="seo-service-output">
        <div className="container seo-service-output-card">
          <p className="eyebrow"><span/>TESLİM ÇIKTILARI</p>
          <h2>Süreç sonunda ne elde edersiniz?</h2>
          <div className="seo-service-output-grid">
            {outputs.map((item, index)=>(
              <article key={item}><b>{String(index+1).padStart(2,"0")}</b><p>{item}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-service-faq">
        <div className="container seo-service-faq-card">
          <p className="eyebrow"><span/>SIK SORULAN SORULAR</p>
          <h2>Bu hizmet hakkında merak edilenler</h2>
          <div className="faq-list">
            {faqs.map((item)=>(
              <details key={item.q}>
                <summary>{item.q}<span>+</span></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
