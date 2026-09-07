const nav = ["Ana Sayfa", "Biz Kimiz", "Yazarlar", "Hizmetler", "Nasıl Çalışır?", "Blog", "İletişim"];

export default function Home() {
  return (
    <main className="figan-page">
      <section className="hero-reference">
        <header className="ref-header">
          <a className="ref-brand" href="#" aria-label="Figan Yayınevi">
            <span className="ref-mark" aria-hidden="true"><i/><i/><i/><i/><i/><i/></span>
            <span className="ref-brand-text"><strong>FİGAN</strong><small>Y A Y I N E V İ</small><em>Sözün yeni dünyası.</em></span>
          </a>
          <nav className="ref-nav">{nav.map((item, index)=><a className={index===0?"active":""} href="#" key={item}>{item}</a>)}</nav>
          <div className="ref-actions"><button aria-label="Ara" className="ref-search">⌕</button><a href="#basvuru" className="ref-author">Yazar Olun <span>→</span></a></div>
        </header>

        <div className="ref-copy">
          <p className="ref-eyebrow">DİJİTAL YAYINCILIĞIN<br/>YENİ DÜNYASI</p>
          <h1><b>BİR KİTAP</b><b>YAZDINIZ.</b><em>Şimdi ona ait</em><b>BİR DÜNYA</b><b>KURALIM.</b></h1>
          <p className="ref-lead">Yazar siteniz. İnteraktif e-kitabınız.<br/>Dijital dağıtımınız. Tek bir yayın dünyasında.</p>
          <div className="ref-ctas"><a className="ref-primary" href="#basvuru">Yazar Dünyamı Oluştur <span>→</span></a><a className="ref-secondary" href="#reader"><i>▶</i> Figan Reader&apos;ı Dene</a></div>
          <div className="ref-manifest"><span/><p>DAHA FAZLA YAZAR.<br/>DAHA FAZLA OKUYUCU.<br/>DAHA UZUN ÖMÜRLÜ ESERLER.</p></div>
        </div>

        <div className="ref-laptop" aria-label="İbrahim Kaynar yazar sitesi">
          <div className="ref-laptop-lid"><span className="ref-camera"/><img src="/ibrahim-author-site.png" alt="İbrahim Kaynar kişisel yazar sitesi"/></div>
          <div className="ref-laptop-base"><span/></div>
        </div>

        <div className="ref-phone" aria-label="Figan kütüphane">
          <span className="ref-island"/>
          <div className="ref-phone-ui"><div className="ref-phone-top"><span>9:41</span><span>•••</span></div><h3>Kütüphanem</h3><div className="ref-phone-book"><img src="/icimdeki-ibrahim-mockup.png" alt="İçimdeki İbrahim"/></div><strong>İçimdeki İbrahim</strong><small>İbrahim Kaynar</small><div className="ref-tabs"><span>⌂</span><span>▣</span><span>◇</span><span>♙</span></div></div>
        </div>

        <div className="ref-tablet" id="reader" aria-label="Figan Reader">
          <span className="ref-tablet-cam"/>
          <div className="ref-tablet-ui"><div className="ref-reader-top"><span>‹</span><b>FİGAN READER</b><span>•••</span></div><div className="ref-reader-copy"><small>Bölüm 04</small><h2>Kendine Dönüş</h2><p>İnsan, bazen en çok kendinden uzaklaştığında, kendine yaklaşır. Belki de yol, hiç gitmediğin yerde değil, hep döndüğün yerdedir.</p></div><div className="ref-reader-scene"/><div className="ref-progress"><i/><b>%37</b></div><div className="ref-reader-icons"><span>Aa</span><span>◐</span><span>▱</span><span>☷</span></div></div>
        </div>

        <div className="ref-book" aria-label="İçimdeki İbrahim"><img src="/icimdeki-ibrahim-mockup.png" alt="İbrahim Kaynar - İçimdeki İbrahim"/></div>
        <div className="ref-tag"><span/>SÖZ<br/>SINIRLARI<br/>AŞAR.</div>
      </section>
    </main>
  );
}
