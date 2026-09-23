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

      <section className="servicesSection" id="manifesto">
        <p className="eyebrow">HİZMETLERİMİZ</p>
        <h2>Her ihtiyaç için,<br/><em>tek bir yayın dünyasında.</em></h2>
        <p className="servicesLead">Eserinizi en iyi haliyle hazırlıyor, dijital dünyada okuyucuya ulaşacağı bütün parçaları tek çatı altında kuruyoruz.</p>

        <div className="serviceEditorialList">
          <article className="serviceEditorialItem">
            <span className="serviceIndex">01</span>
            <div className="serviceEditorialCopy">
              <h3>E-Kitap</h3>
              <p>Her yerde okunsun.</p>
              <span>Profesyonel dijital hazırlık · Tüm cihazlarla uyum · Yayına hazır EPUB</span>
            </div>
            <a href="#surec" aria-label="E-Kitap detayları">→</a>
          </article>

          <article className="serviceEditorialItem">
            <span className="serviceIndex">02</span>
            <div className="serviceEditorialCopy">
              <h3>Sesli Kitap</h3>
              <p>Hikâyeniz ses bulsun.</p>
              <span>Profesyonel ses üretimi · Bölüm bazlı dinleme · Figan Audio deneyimi</span>
            </div>
            <a href="#surec" aria-label="Sesli Kitap detayları">→</a>
          </article>

          <article className="serviceEditorialItem">
            <span className="serviceIndex">03</span>
            <div className="serviceEditorialCopy">
              <h3>Yazar Sitesi</h3>
              <p>Size ait bir dijital dünya.</p>
              <span>Eserleriniz · Yazar kimliğiniz · Okurla doğrudan bağ kuran kişisel alanınız</span>
            </div>
            <a href="#surec" aria-label="Yazar Sitesi detayları">→</a>
          </article>

          <article className="serviceEditorialItem">
            <span className="serviceIndex">04</span>
            <div className="serviceEditorialCopy">
              <h3>Dijital Dağıtım</h3>
              <p>Daha fazla okura ulaşın.</p>
              <span>Türkiye ve dünya · Uygun dijital yayın kanalları · Uzun vadeli yayın desteği</span>
            </div>
            <a href="#surec" aria-label="Dijital Dağıtım detayları">→</a>
          </article>
        </div>
      </section>

      <section className="processSection" id="surec">
        <p className="eyebrow">BİR DOSYA, BİR YOLCULUK.</p>
        <h2>Nasıl çalışıyoruz?</h2>
        <p className="processLead">Eseriniz, Figan’ın profesyonel yayın süreciyle adım adım dijital dünyaya hazırlanır.</p>

        <div className="processTimeline">
          <article><span>1</span><div><h3>Başvuru</h3><p>Dosyanızı bizimle paylaşın.</p></div><small>Hayaliniz ilk adımı atar.</small></article>
          <article><span>2</span><div><h3>Editörlük</h3><p>Metninizi yayın için güçlendiriyoruz.</p></div><small>Daha güçlü bir metin.</small></article>
          <article><span>3</span><div><h3>Kapak &amp; Tasarım</h3><p>Eserinize özgü yayın kimliği oluşturuyoruz.</p></div><small>İlk bakışta fark yaratır.</small></article>
          <article><span>4</span><div><h3>E-Kitap</h3><p>Tüm cihazlarda okunabilen dijital formata hazırlıyoruz.</p></div><small>Her yerde okunsun.</small></article>
          <article><span>5</span><div><h3>Sesli Kitap</h3><p>Eserinizi dinleme deneyimine dönüştürüyoruz.</p></div><small>Sözün sesi daha uzağa gider.</small></article>
          <article><span>6</span><div><h3>Figan Reader &amp; Audio</h3><p>Okuma ve dinleme deneyimini tek dünyada buluşturuyoruz.</p></div><small>Okur ve dinleyiciyle buluşur.</small></article>
          <article><span>7</span><div><h3>Yazar Sitesi</h3><p>Size özel profesyonel yazar alanınızı kuruyoruz.</p></div><small>Dijitalde sizin dünyanız.</small></article>
          <article><span>8</span><div><h3>Dijital Dağıtım</h3><p>Eserinizi uygun dijital yayın kanallarına taşıyoruz.</p></div><small>Daha fazla okur, daha fazla erişim.</small></article>
        </div>

        <a className="processCta" href="#basvuru">Yazar Başvurusu Yap <span>→</span></a>
        <blockquote>“Her kitap, yeni bir dünyaya açılan kapıdır.” <cite>— FİGAN</cite></blockquote>
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
