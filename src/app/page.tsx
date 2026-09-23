function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.4 16.4 4 4"/></svg>;
}

function MenuIcon() {
  return <span className="menuIcon" aria-hidden="true"><i/><i/><i/></span>;
}

export default function Home() {
  return (
    <main>
      <header className="siteHeader">
        <a className="wordmark logoWordmark" href="#top" aria-label="Figan Yayınevi ana sayfa">
          <img src="/figan-logo-silver.png" alt="Figan Yayınevi" />
        </a>
        <div className="headerActions">
          <button className="iconButton menuButton" aria-label="Menüyü aç"><MenuIcon /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <img
          className="heroArt"
          src="/figan-hero-dark.webp"
          alt=""
          aria-hidden="true"
        />
        <div className="heroContent">
          <div className="heroCopy">
            <p className="eyebrow">YAZ. YAYINLA. DÜNYAYA ULAŞ.</p>

            <h1>
              <span>Bir kitap</span>
              <em>yazdınız.</em>
            </h1>

            <p className="poetic">Şimdi ona ait<br/>bir dünya kuralım.</p>
            <div className="shortRule" />

            <p className="lead">
              E-kitabınız. Sesli kitabınız.<br/>
              Yazar siteniz. Dijital dağıtımınız.<br/>
              Tek bir yayın dünyasında.
            </p>
          </div>

          <div className="heroActions heroActionsBottom desktopHeroActions">
            <a className="primaryCta" href="#basvuru">Yazar Başvurusu Yap <span>→</span></a>
            <button className="videoCta" type="button">
              <span className="play">▶</span>
              <span><b>Figan’ı İzleyin</b><small>2 dakikada tanıyın.</small></span>
            </button>
          </div>
        </div>

        <blockquote className="heroQuote">
          “Bazı yaralar,<br/>insanı göğe<br/>daha yakın kılar.”
          <cite>— FİGAN</cite>
        </blockquote>

      </section>

      <section className="mobileActionPanel" aria-label="Figan hızlı işlemler">
        <a className="mobileApplyCta" href="#basvuru">
          <span className="mobileCtaIcon">▤</span>
          <span>Yazar Başvurusu Yap</span>
          <span className="mobileCtaArrow">→</span>
        </a>

        <button className="mobileWatchCta" type="button">
          <span className="mobilePlay">▶</span>
          <span>Figan’ı İzleyin</span>
          <span className="mobileCtaArrow">→</span>
        </button>
      </section>

      <section className="manifesto" id="manifesto">
        <p className="eyebrow">FİGAN NE YAPIYOR?</p>
        <h2>Bir dosyadan,<br/>bir yazar dünyasına.</h2>
        <p>Dosyanızı profesyonel yayın süreciyle e-kitaba ve sesli kitaba dönüştürüyor; size özel yazar sitesi kuruyor ve eserinizi dijital kanallar aracılığıyla okuyucuyla buluşturuyoruz.</p>
        <a href="#basvuru" className="textLink">Süreci keşfet <span>→</span></a>
      </section>

      <section id="basvuru" className="placeholderCta">
        <p className="eyebrow">YAZAR BAŞVURUSU</p>
        <h2>Bir dosyanız mı var?</h2>
        <p>Ya da henüz yalnızca bir fikriniz? İkisi de başlamak için yeterli.</p>
        <a className="primaryCta light" href="mailto:merhaba@figanyayinevi.com">Başvuruyu Başlat <span>→</span></a>
      </section>

      <nav className="mobileDock" aria-label="Mobil alt menü">
        <a className="active" href="#top"><span>⌂</span><b>Ana Sayfa</b></a>
        <a href="#manifesto"><span>▤</span><b>Hizmetler</b></a>
        <a href="#top"><span>✒</span><b>Yazarlar</b></a>
        <a href="#top"><span>▭</span><b>Kitaplar</b></a>
        <a href="#basvuru"><span>○</span><b>İletişim</b></a>
      </nav>
    </main>
  );
}
