const nav = ["Ana Sayfa", "Biz Kimiz", "Yazarlar", "Hizmetler", "Nasıl Çalışır?", "Blog", "İletişim"];

export default function Home() {
  return (
    <main className="figan-page">
      <section className="hero">
        <header className="header shell">
          <a className="brand" href="#" aria-label="Figan Yayınevi ana sayfa">
            <span className="leaf-logo" aria-hidden="true"><i/><i/><i/><i/><i/><i/></span>
            <span><strong>FİGAN</strong><small>Y A Y I N E V İ</small><em>Sözün yeni dünyası.</em></span>
          </a>
          <nav>{nav.map((item, i) => <a className={i === 0 ? "active" : ""} href="#" key={item}>{item}</a>)}</nav>
          <div className="header-actions"><button className="search" aria-label="Ara">⌕</button><a className="author-btn" href="#basvuru">Yazar Olun <span>→</span></a></div>
        </header>
        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow">DİJİTAL YAYINCILIĞIN<br/>YENİ DÜNYASI</p>
            <h1><span>BİR KİTAP</span><span>YAZDINIZ.</span><em>Şimdi ona ait</em><span>BİR DÜNYA</span><span>KURALIM.</span></h1>
            <p className="lead">Yazar siteniz. İnteraktif e-kitabınız.<br/>Sesli kitabınız. Dijital dağıtımınız.<br/>Tek bir yayın dünyasında.</p>
            <div className="cta-row"><a className="primary" href="#basvuru">Yazar Dünyamı Oluştur <b>→</b></a><a className="secondary" href="#reader"><i>▶</i> Figan Reader&apos;ı Dene</a></div>
            <div className="hero-note"><span/><p>DAHA FAZLA YAZAR.<br/>DAHA FAZLA OKUYUCU.<br/>DAHA UZUN ÖMÜRLÜ ESERLER.</p></div>
          </div>
          <div className="showcase" id="reader" aria-label="İbrahim Kaynar dijital yayın dünyası">
            <img className="showcase-scene" src="/figan-hero-ibrahim.webp" alt="İbrahim Kaynar dijital yazar dünyası: laptop, telefon ve Figan Reader" />
            <img className="hero-real-book" src="/icimdeki-ibrahim-cutout.webp" alt="İbrahim Kaynar - İçimdeki İbrahim" />
            <div className="tagline"><span/>SÖZ<br/>SINIRLARI<br/>AŞAR.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
