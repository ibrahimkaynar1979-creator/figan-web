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

        <div className="hero-layout shell">
          <div className="hero-copy">
            <p className="eyebrow">DİJİTAL YAYINCILIĞIN<br/>YENİ DÜNYASI</p>
            <h1><span>BİR KİTAP</span><span>YAZDINIZ.</span><em>Şimdi ona ait</em><span>BİR DÜNYA</span><span>KURALIM.</span></h1>
            <p className="lead">Yazar siteniz. İnteraktif e-kitabınız.<br/>Dijital dağıtımınız. Tek bir yayın dünyasında.</p>
            <div className="cta-row"><a className="primary" href="#basvuru">Yazar Dünyamı Oluştur <b>→</b></a><a className="secondary" href="#reader"><i>▶</i> Figan Reader&apos;ı Dene</a></div>
            <div className="hero-note"><span/><p>DAHA FAZLA YAZAR.<br/>DAHA FAZLA OKUYUCU.<br/>DAHA UZUN ÖMÜRLÜ ESERLER.</p></div>
          </div>

          <div className="hero-stage" id="reader">
            <div className="stage-shadow" />
            <div className="laptop">
              <div className="laptop-lid"><div className="camera"/><img src="/ibrahim-author-site.png" alt="İbrahim Kaynar yazar sitesi" /></div>
              <div className="laptop-deck"><span/></div>
            </div>

            <div className="reader-tablet">
              <div className="tablet-camera"/>
              <div className="tablet-ui">
                <div className="reader-head"><span>‹</span><b>FİGAN READER</b><span>•••</span></div>
                <div className="reader-copy"><small>BÖLÜM 04</small><h2>Kendine Dönüş</h2><p>İnsan, bazen en çok kendinden uzaklaştığında, kendine yaklaşır. Belki de yol, hiç gitmediğin yerde değil, hep döndüğün yerdedir.</p></div>
                <div className="reader-scene"/><div className="reader-bar"><i/><b>%37</b></div>
                <div className="reader-icons"><span>Aa</span><span>◐</span><span>▱</span><span>☷</span></div>
              </div>
            </div>

            <div className="library-phone">
              <div className="phone-island"/>
              <div className="phone-ui"><div className="phone-head"><span>9:41</span><span>•••</span></div><h3>Kütüphanem</h3><img src="/icimdeki-ibrahim-mockup.png" alt="İçimdeki İbrahim"/><strong>İçimdeki İbrahim</strong><small>İbrahim Kaynar</small><div className="phone-tabs"><span>⌂</span><span>▣</span><span>◇</span><span>♙</span></div></div>
            </div>

            <div className="book-object"><img src="/icimdeki-ibrahim-mockup.png" alt="İbrahim Kaynar İçimdeki İbrahim"/></div>
            <div className="stage-tag"><span/>SÖZ<br/>SINIRLARI<br/>AŞAR.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
