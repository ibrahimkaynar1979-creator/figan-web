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
        <a className="wordmark" href="#top" aria-label="Figan Yayınevi ana sayfa">
          <strong>FİGAN</strong>
          <span>YAYINEVİ</span>
        </a>
        <div className="headerActions">
          <button className="iconButton" aria-label="Ara"><SearchIcon /></button>
          <span className="headerRule" />
          <button className="iconButton" aria-label="Menüyü aç"><MenuIcon /></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="heroContent">
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

          <div className="heroActions">
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

      <section className="heroPhotoSection" id="hero-photo" aria-label="Figan yayın dünyası görseli">
        <img src="/figan-hero-ibrahim.webp" alt="Figan yayın dünyası; kitap, mürekkep, tüy ve İstanbul atmosferi" />
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
    </main>
  );
}
