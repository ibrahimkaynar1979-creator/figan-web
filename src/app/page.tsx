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
            <h1>
              <span>BİR KİTAP</span>
              <span>YAZDINIZ.</span>
              <em>Şimdi ona ait</em>
              <span>BİR DÜNYA</span>
              <span>KURALIM.</span>
            </h1>
            <p className="lead">Yazar siteniz. İnteraktif e-kitabınız.<br/>Sesli kitabınız. Dijital dağıtımınız.<br/>Tek bir yayın dünyasında.</p>
            <div className="cta-row">
              <a className="primary" href="#basvuru">Yazar Dünyamı Oluştur <b>→</b></a>
              <a className="secondary" href="#reader"><i>▶</i> Figan Reader&apos;ı Dene</a>
            </div>
            <div className="hero-note"><span/><p>DAHA FAZLA YAZAR.<br/>DAHA FAZLA OKUYUCU.<br/>DAHA UZUN ÖMÜRLÜ ESERLER.</p></div>
          </div>

          <div className="showcase" id="reader" aria-label="İbrahim Kaynar dijital yayın dünyası">
            <div className="desk-glow" aria-hidden="true" />

            <div className="laptop-wrap">
              <div className="laptop-screen">
                <img src="/ibrahim-author-site.png" alt="İbrahim Kaynar kişisel yazar sitesi" />
              </div>
              <div className="laptop-base"><span /></div>
            </div>

            <div className="phone-device" aria-label="Figan dijital kütüphane">
              <div className="phone-notch" />
              <div className="phone-screen">
                <span className="phone-brand">FİGAN</span>
                <p>Kütüphanem</p>
                <img src="/icimdeki-ibrahim-mockup.png" alt="İçimdeki İbrahim" />
                <strong>İçimdeki İbrahim</strong>
                <small>İbrahim Kaynar</small>
                <div className="phone-nav"><i>⌂</i><i>▣</i><i>◉</i></div>
              </div>
            </div>

            <div className="reader-device" aria-label="Figan Reader">
              <div className="reader-screen">
                <div className="reader-top"><b>FİGAN</b><span>☰</span></div>
                <small>BÖLÜM 04</small>
                <h2>Kendine Dönüş</h2>
                <p>Bazen insan, kendini bulmak için önce kendinden uzaklaşır. Sonra bir cümlede, bir sokakta, bir sessizlikte yeniden kendine rastlar.</p>
                <div className="reader-tools"><span>Aa</span><span>◐</span><span>⌑</span></div>
                <div className="reader-progress"><i /><b>37%</b></div>
              </div>
            </div>

            <div className="book-stage">
              <img className="hero-real-book" src="/icimdeki-ibrahim-mockup.png" alt="İbrahim Kaynar - İçimdeki İbrahim dijital edisyon mockup" />
              <span className="edition-label">E-KİTAP · DİJİTAL EDİSYON</span>
            </div>

            <div className="tagline"><span/>SÖZ<br/>SINIRLARI<br/>AŞAR.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
