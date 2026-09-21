const services = ["E-KİTAP", "SESLİ KİTAP", "YAZAR SİTESİ", "DİJİTAL DAĞITIM"];

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
        <div className="heroShade" aria-hidden="true" />
        <div className="heroContent">
          <p className="eyebrow">YAZ. YAYINLA. DÜNYAYA ULAŞ.</p>
          <h1>
            <span>Bir kitap</span>
            <span className="displayBlack">yazdınız.</span>
          </h1>
          <p className="poetic">Şimdi ona ait<br/>bir dünya kuralım.</p>
          <div className="shortRule" />
          <p className="lead">E-kitabınız. Sesli kitabınız.<br/>Yazar siteniz. Dijital dağıtımınız.<br/>Tek bir yayın dünyasında.</p>

          <div className="heroActions">
            <a className="primaryCta" href="#basvuru">Yazar Başvurusu Yap <span>→</span></a>
            <button className="videoCta" type="button"><span className="play">▶</span><span><b>Figan’ı İzleyin</b><small>2 dakikada tanıyın.</small></span></button>
          </div>
        </div>

        <blockquote className="heroQuote">“Bazı yaralar,<br/>insanı göğe<br/>daha yakın kılar.”<cite>— FİGAN</cite></blockquote>

        <div className="heroServiceRail" aria-label="Figan hizmetleri">
          {services.map((item) => <span key={item}>{item}</span>)}
        </div>

        <a href="#manifesto" className="discover">KEŞFET <span>↓</span></a>
      </section>

      <section className="manifesto" id="manifesto">
        <p className="eyebrow">FİGAN NE YAPIYOR?</p>
        <h2>Eserinizi yalnızca yayımlamıyoruz.<br/><em>Ona ait bir yayın dünyası kuruyoruz.</em></h2>
        <p>Figan, dosyanızı profesyonel olarak yayına hazırlar; e-kitap ve sesli kitaba dönüştürür, size özel yazar sitesi kurar ve eserinizi dijital dünyada okuyucuyla buluşturur.</p>
        <a href="#basvuru" className="textLink">Yayın yolculuğunu keşfet <span>→</span></a>
      </section>

      <section id="basvuru" className="placeholderCta">
        <p className="eyebrow">YAZAR BAŞVURUSU</p>
        <h2>Bir dosyanız mı var?</h2>
        <p>Ya da henüz yalnızca bir fikriniz? İkisi de başlamak için yeterli.</p>
        <a className="primaryCta" href="mailto:merhaba@figanyayinevi.com">Başvuruyu Başlat <span>→</span></a>
      </section>
    </main>
  );
}
