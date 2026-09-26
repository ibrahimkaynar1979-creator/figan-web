import Image from "next/image";
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
  scopeTitle?: string;
  scopeAccent?: string;
  scopeStepTitles?: string[];
  audienceTitle?: string;
  audienceAccent?: string;
  audienceIntro?: string;
  noteTitle?: string;
  noteText?: string;
  processTitle?: string;
  processStepTitles?: string[];
  outputTitles?: string[];
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
  scopeTitle = "Bir dosyadan,",
  scopeAccent = "gerçek bir kitaba.",
  scopeStepTitles = ["Editoryal Kontrol","Mizanpaj & Kapak","ISBN & Bandrol","Baskı & Dağıtım"],
  audienceTitle = "Kitabını yalnızca bastırmak değil,",
  audienceAccent = "yayımlamak isteyenler için.",
  audienceIntro = "Dosyasını profesyonel yayın standartlarına taşımak, baskıdan dağıtıma kadar bütün süreci tek bir yayın planı içinde yürütmek isteyen yazarlar için.",
  noteTitle = "Her kitap, kendine ait bir dünya taşır.",
  noteText = "Bizim için bir kitabı yayımlamak, yalnızca baskıya göndermek değildir. Her eserin kendi tonu, okuru ve yolu vardır. Editoryal özen, estetik tasarım ve doğru dağıtım planıyla kitabınızın bu yolculuğunda yanınızda oluruz.",
  processTitle = "Yayın yolculuğu nasıl ilerler?",
  processStepTitles = ["Dosya analizi","Mizanpaj ve kapak","Resmî işlemler","Baskı ve dağıtım"],
  outputTitles = ["Yayına hazır dosyalar","ISBN ve bandrollü kitap","Dağıtım desteği"],
  faqs = [
    { q:"Süreç nasıl başlıyor?", a:"Önce dosyanızı ve yayın hedefinizi değerlendiriyoruz. Ardından ihtiyacınıza uygun hizmet kapsamı ve yol haritası netleştiriliyor." },
    { q:"Hizmet tek başına alınabilir mi?", a:"Evet. İhtiyacınıza göre tek bir hizmetten yararlanabilir veya birden fazla hizmeti aynı yayın planında birleştirebilirsiniz." },
    { q:"Fiyat nasıl belirleniyor?", a:"Eserin kapsamı, sayfa sayısı, hazırlık ihtiyacı ve seçilen hizmetlere göre değerlendirme sonrasında net teklif oluşturulur." },
  ],
}: ServicePageProps){
  const whatsapp = "https://wa.me/905532419397?text=Merhaba%2C%2022%20Yay%C4%B1nevi%20hizmetleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

  return (
    <InnerPageShell>
    <main className={`seo-service-page${editorialLayout ? " seo-service-editorial" : ""}`}>
      

      <section className="seo-service-hero">
        <div className="container seo-service-grid">
          <div className="seo-service-copy">
            <a className="legal-back" href="/">← 22 Yayınevi</a>
            <p className="eyebrow"><span/>{eyebrow}</p>
            <h1>{title}</h1>
            <p className="seo-service-lead">{lead}</p>
            <a className="btn primary" href={whatsapp} target="_blank" rel="noreferrer">Bilgi Alın <b>→</b></a>
          </div>
          <div className="seo-service-visual"><Image src={image} alt="" width={1200} height={900} priority sizes="(max-width: 760px) 100vw, 46vw"/></div>
        </div>
      </section>

      <section className="seo-service-scope">
        <div className="container seo-service-scope-card">
          <p className="eyebrow"><span/>HİZMET KAPSAMI</p>
          <h2>{editorialLayout ? <>{scopeTitle} <em>{scopeAccent}</em></> : "Bu hizmet neleri kapsar?"}</h2>
          <div className="seo-service-scope-grid">
            {bullets.map((item, index)=>(
              <article key={item}>
                <b>{String(index+1).padStart(2,"0")}</b>
                {editorialLayout && <span className="seo-service-step-icon" aria-hidden="true">{["✦","◇","◎","↗"][index % 4]}</span>}
                <div>
                  {editorialLayout && <h3>{scopeStepTitles[index] || `Yayın Aşaması ${index+1}`}</h3>}
                  <p>{item}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {editorialLayout ? (
        <>
          <section className="seo-service-audience">
            <div className="container seo-service-audience-card">
              <p className="eyebrow"><span/>KİMLER İÇİN?</p>
              <h2>{audienceTitle}<br/><em>{audienceAccent}</em></h2>
              <p className="seo-service-section-intro">{audienceIntro}</p>
              <div className="seo-service-fit-box">
                {audience.map((item)=><p key={item}><span>✓</span>{item}</p>)}
              </div>
            </div>
          </section>

          <section className="seo-service-note">
            <div className="container seo-service-note-card">
              <div className="seo-service-note-mark">22</div>
              <div>
                <p className="eyebrow"><span/>YAYIN NOTU</p>
                <h2>{noteTitle}</h2>
                <p>{noteText}</p>
              </div>
            </div>
          </section>

          <section className="seo-service-process">
            <div className="container seo-service-process-card">
              <p className="eyebrow"><span/>SÜREÇ</p>
              <h2>{processTitle}</h2>
              <div className="seo-service-process-list">
                {process.map((item,index)=>(
                  <article key={item}>
                    <b>{String(index+1).padStart(2,"0")}</b>
                    <div>
                      <h3>{processStepTitles[index] || `Yayın adımı ${index+1}`}</h3>
                      <p>{item}</p>
                    </div>
                  </article>
                ))}
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
                    <b>{["▧","◫","↗"][index] || String(index+1).padStart(2,"0")}</b>
                    <div>
                      <h3>{outputTitles[index] || "Yayın çıktısı"}</h3>
                      <p>{item}</p>
                    </div>
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
        </>
      ) : (
        <>
          <section className="seo-service-combined">
            <div className="container seo-service-combined-card">
              <div className="seo-service-combined-col">
                <p className="eyebrow"><span/>KİMLER İÇİN?</p>
                <h2>Bu hizmet size uygun mu?</h2>
                <ul>{audience.map((item)=><li key={item}>{item}</li>)}</ul>
              </div>
              <div className="seo-service-combined-divider" aria-hidden="true"/>
              <div className="seo-service-combined-col">
                <p className="eyebrow"><span/>SÜREÇ</p>
                <h2>Nasıl ilerliyoruz?</h2>
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
        </>
      )}

      <section className="seo-service-final-cta">
        <div className="container seo-service-final-cta-card">
          <p className="eyebrow light"><span/>YAYIN YOLCULUĞU</p>
          <h2>Dosyanız hazırsa,<br/><em>birlikte başlayalım.</em></h2>
          <p>İhtiyacınızı birlikte netleştirelim; size uygun yayın yolunu planlayalım.</p>
          <a className="btn gold" href="/kurucu-yazar">İlk 22 Kurucu Yazar Statüsüne Başvur <b>→</b></a>
        </div>
      </section>
    </main>
    </InnerPageShell>
  );
}
