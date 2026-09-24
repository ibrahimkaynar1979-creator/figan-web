type ServicePageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  bullets: string[];
  image: string;
};

export default function SeoServicePage({ eyebrow, title, lead, bullets, image }: ServicePageProps){
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
    </main>
  );
}
