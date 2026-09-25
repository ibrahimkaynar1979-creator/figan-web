import InnerPageShell from "./InnerPageShell";

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
  editorialLayout?: boolean;
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
  editorialLayout = false,
  faqs = [
    { q:"Süreç nasıl başlıyor?", a:"Önce dosyanızı ve yayın hedefinizi değerlendiriyoruz. Ardından ihtiyacınıza uygun hizmet kapsamı ve yol haritası netleştiriliyor." },
    { q:"Hizmet tek başına alınabilir mi?", a:"Evet. İhtiyacınıza göre tek bir hizmetten yararlanabilir veya birden fazla hizmeti aynı yayın planında birleştirebilirsiniz." },
    { q:"Fiyat nasıl belirleniyor?", a:"Eserin kapsamı, sayfa sayısı, hazırlık ihtiyacı ve seçilen hizmetlere göre değerlendirme sonrasında net teklif oluşturulur." },
  ],
}: ServicePageProps){
  const whatsapp = "https://wa.me/905532419397?text=Merhaba%2C%20Fi%20Yay%C4%B1nevi%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

  return (
    <InnerPageShell>
    <main className={`seo-service-page${editorialLayout ? " seo-service-editorial" : ""}`}>
      <section className="seo-service-hero">
        <div className="container seo-service-grid">
          <div className="seo-service-copy">
            <a className="legal-back" href="/">← Fi Yayınevi</a>
            <p className="eyebrow"><span/>{eyebrow}</p>
            <h1>{title}</h1>
            <p className="seo-service-lead">{lead}</p>
            <a className="btn primary" href={whatsapp} target="_blank" rel="noreferrer">Bilgi Alın <b>→</b></a>
          </div>
          <div className="seo-service-visual"><img src={image} alt=""/></div>
        </div>
      </section>

      <section className="seo-service-scope">
        <div className="container seo-service-scope-card">
          <p className="eyebrow"><span/>HİZMET KAPSAMI</p>
          <h2>{editorialLayout ? <>Bir dosyadan, <em>gerçek bir kitaba.</em></> : "Bu hizmet neleri kapsar?"}</h2>
          <div className="seo-service-scope-grid">
            {bullets.map((item, index)=>(
              <article key={item}>
                <b>{String(index+1).padStart(2,"0")}</b>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-service-combined">
        <div className="container seo-service-combined-card">
          <div className="seo-service-combined-col">
            <p className="eyebrow"><span/>KİMLER İÇİN?</p>
            <h2>{editorialLayout ? <>Kitabını yalnızca bastırmak değil, <em>yayımlamak isteyenler için.</em></> : "Bu hizmet size uygun mu?"}</h2>
            <ul>{audience.map((item)=><li key={item}>{item}</li>)}</ul>
          </div>

          <div className="seo-service-combined-divider" aria-hidden="true"/>

          <div className="seo-service-combined-col">
            <p className="eyebrow"><span/>SÜREÇ</p>
            <h2>{editorialLayout ? "Yayın yolculuğu nasıl ilerler?" : "Nasıl ilerliyoruz?"}</h2>
            <ol>{process.map((item)=><li key={item}>{item}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="seo-service-output">
        <div className="container seo-service-output-card">
          <div className="seo-service-output-head">
            <p className="eyebrow"><span/>TESLİM ÇIKTILARI</p>
            <h2>Süreç sonunda ne elde edersiniz?</h2>
          </div>
          <div className="seo-service-output-list">
            {outputs.map((item, index)=>(
              <article key={item}>
                <b>{String(index+1).padStart(2,"0")}</b>
                <p>{item}</p>
              </article>
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

      <section className="seo-service-final-cta">
        <div className="container seo-service-final-cta-card">
          <p className="eyebrow light"><span/>YAYIN YOLCULUĞU</p>
          <h2>Dosyanız hazırsa,<br/><em>birlikte başlayalım.</em></h2>
          <p>İhtiyacınızı birlikte netleştirelim; size uygun yayın yolunu planlayalım.</p>
          <a className="btn gold" href={whatsapp} target="_blank" rel="noreferrer">Başvuru Yapın <b>→</b></a>
        </div>
      </section>
    </main>
    </InnerPageShell>
  );
}
