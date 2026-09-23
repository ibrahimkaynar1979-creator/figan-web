function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.4 16.4 4 4"/></svg>;
}

function ProcessIcon({ type }: { type: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    document: <><path {...common} d="M7 3.5h7l3 3V20.5H7z"/><path {...common} d="M14 3.5v4h4M10 11h5M10 14h5M10 17h4"/></>,
    edit: <><path {...common} d="M5 19l1-4L15.5 5.5a2.1 2.1 0 013 3L9 18z"/><path {...common} d="M13.8 7.2l3 3"/></>,
    design: <><rect {...common} x="4" y="5" width="16" height="14" rx="2"/><circle {...common} cx="9" cy="10" r="1.4"/><path {...common} d="M6.5 17l4.2-4 2.6 2.4 2.2-2 2.5 3.6"/></>,
    book: <><path {...common} d="M4 6.5c3-1 5.5-.5 8 1.2v11c-2.5-1.7-5-2.2-8-1.2zM20 6.5c-3-1-5.5-.5-8 1.2v11c2.5-1.7 5-2.2 8-1.2z"/></>,
    audio: <><path {...common} d="M5 13v-2a7 7 0 0114 0v2"/><path {...common} d="M5 12h2v6H5a2 2 0 01-2-2v-2a2 2 0 012-2zM19 12h-2v6h2a2 2 0 002-2v-2a2 2 0 00-2-2z"/></>,
    player: <><rect {...common} x="3.5" y="5" width="17" height="14" rx="2.5"/><path {...common} d="M10 9l5 3-5 3z"/></>,
    site: <><circle {...common} cx="12" cy="8" r="3"/><path {...common} d="M6 20c.5-4 2.5-6 6-6s5.5 2 6 6"/></>,
    globe: <><circle {...common} cx="12" cy="12" r="8.5"/><path {...common} d="M3.8 12h16.4M12 3.5c2.4 2.3 3.5 5.1 3.5 8.5S14.4 18.2 12 20.5C9.6 18.2 8.5 15.4 8.5 12S9.6 5.8 12 3.5"/></>,
    distribution: <><path {...common} d="M5 19V13h3v6zM10.5 19V9h3v10zM16 19V5h3v14z"/></>
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
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

        <div className="serviceShowcase" aria-label="Figan hizmetleri">
          <article className="serviceShowcaseRow imageLeft">
            <div className="serviceVisual" style={{backgroundImage:"url('/figan-hizmet-01-ekitap.webp')"}}><img src="/figan-hizmet-01-ekitap.webp" alt="Figan E-Kitap" /></div>
            <div className="serviceShowcaseCopy">
              <span className="serviceKicker">01 · E-KİTAP</span>
              <h3>Her yerde<br/>okunsun.</h3>
              <p>Profesyonel dijital hazırlık ve tüm cihazlarla uyumlu yayın deneyimi.</p>
              <a href="#surec">Detaylı Bilgi <b>→</b></a>
            </div>
          </article>

          <article className="serviceShowcaseRow imageRight">
            <div className="serviceShowcaseCopy">
              <span className="serviceKicker">02 · SESLİ KİTAP</span>
              <h3>Hikâyeniz<br/>ses bulsun.</h3>
              <p>Eserinizi güçlü bir dinleme deneyimine dönüştürüyoruz.</p>
              <a href="#surec">Detaylı Bilgi <b>→</b></a>
            </div>
            <div className="serviceVisual" style={{backgroundImage:"url('/figan-hizmet-02-sesli-kitap.webp')"}}><img src="/figan-hizmet-02-sesli-kitap.webp" alt="Figan Sesli Kitap" /></div>
          </article>

          <article className="serviceShowcaseRow imageLeft">
            <div className="serviceVisual" style={{backgroundImage:"url('/figan-hizmet-03-yazar-sitesi.webp')"}}><img src="/figan-hizmet-03-yazar-sitesi.webp" alt="Figan Yazar Sitesi" /></div>
            <div className="serviceShowcaseCopy">
              <span className="serviceKicker">03 · YAZAR SİTESİ</span>
              <h3>Size ait bir<br/>dijital dünya.</h3>
              <p>Eserlerinizi ve yazar kimliğinizi tek bir kişisel merkezde buluşturuyoruz.</p>
              <a href="#surec">Detaylı Bilgi <b>→</b></a>
            </div>
          </article>

          <article className="serviceShowcaseRow imageRight">
            <div className="serviceShowcaseCopy">
              <span className="serviceKicker">04 · YABANCI DİL YAYINI</span>
              <h3>Eseriniz<br/>sınırları aşsın.</h3>
              <p>Profesyonel çeviri ve editoryal uyarlamayla uluslararası yayına hazırlıyoruz.</p>
              <a href="#surec">Detaylı Bilgi <b>→</b></a>
            </div>
            <div className="serviceVisual" style={{backgroundImage:"url('/figan-hizmet-04-yabanci-dil.webp')"}}><img src="/figan-hizmet-04-yabanci-dil.webp" alt="Figan Yabancı Dil Yayını" /></div>
          </article>

          <article className="serviceShowcaseRow imageLeft">
            <div className="serviceVisual" style={{backgroundImage:"url('/figan-hizmet-05-dijital-dagitim.webp')"}}><img src="/figan-hizmet-05-dijital-dagitim.webp" alt="Figan Dijital Dağıtım" /></div>
            <div className="serviceShowcaseCopy">
              <span className="serviceKicker">05 · DİJİTAL DAĞITIM</span>
              <h3>Daha fazla<br/>okura ulaşın.</h3>
              <p>Eserinizi Türkiye’de ve dünyada uygun dijital yayın kanallarına taşıyoruz.</p>
              <a href="#surec">Detaylı Bilgi <b>→</b></a>
            </div>
          </article>
        </div>
      </section>

      <section className="processSection" id="surec">
        <p className="eyebrow">BİR DOSYA, BİR YOLCULUK.</p>
        <h2>Nasıl çalışıyoruz?</h2>
        <p className="processLead">Eseriniz, Figan’ın profesyonel yayın süreciyle adım adım dijital dünyaya hazırlanır.</p>

        <div className="processTimeline">
          <article>
            <div className="processMarks"><span className="processNo">1</span><span className="processIcon" aria-hidden="true"><ProcessIcon type="document" /></span></div>
            <div className="processMain"><h3>Başvuru</h3><p>Dosyanızı bizimle paylaşın.</p></div>
            <small>Hayaliniz ilk adımı atar.</small>
          </article>
          <article>
            <div className="processMarks"><span className="processNo">2</span><span className="processIcon" aria-hidden="true"><ProcessIcon type="edit" /></span></div>
            <div className="processMain"><h3>Editörlük</h3><p>Metninizi yayın için güçlendiriyoruz.</p></div>
            <small>Daha güçlü bir metin.</small>
          </article>
          <article>
            <div className="processMarks"><span className="processNo">3</span><span className="processIcon" aria-hidden="true"><ProcessIcon type="design" /></span></div>
            <div className="processMain"><h3>Kapak &amp; Tasarım</h3><p>Eserinize özgü yayın kimliği oluşturuyoruz.</p></div>
            <small>İlk bakışta fark yaratır.</small>
          </article>
          <article>
            <div className="processMarks"><span className="processNo">4</span><span className="processIcon" aria-hidden="true"><ProcessIcon type="book" /></span></div>
            <div className="processMain"><h3>E-Kitap</h3><p>Tüm cihazlarda okunabilen dijital formata hazırlıyoruz.</p></div>
            <small>Her yerde okunsun.</small>
          </article>
          <article>
            <div className="processMarks"><span className="processNo">5</span><span className="processIcon" aria-hidden="true"><ProcessIcon type="audio" /></span></div>
            <div className="processMain"><h3>Sesli Kitap</h3><p>Eserinizi dinleme deneyimine dönüştürüyoruz.</p></div>
            <small>Sözün sesi daha uzağa gider.</small>
          </article>
          <article>
            <div className="processMarks"><span className="processNo">6</span><span className="processIcon" aria-hidden="true"><ProcessIcon type="player" /></span></div>
            <div className="processMain"><h3>Figan Reader &amp; Audio</h3><p>E-kitabınız ve sesli kitabınız Figan’ın dijital okuma ve dinleme deneyiminde yerini alır.</p></div>
            <small>İki format. Tek yayın dünyası.</small>
          </article>
          <article>
            <div className="processMarks"><span className="processNo">7</span><span className="processIcon" aria-hidden="true"><ProcessIcon type="site" /></span></div>
            <div className="processMain"><h3>Yazar Sitesi</h3><p>Size özel profesyonel yazar alanınızı kuruyoruz.</p></div>
            <small>Dijitalde sizin dünyanız.</small>
          </article>
          <article>
            <div className="processMarks"><span className="processNo">8</span><span className="processIcon" aria-hidden="true"><ProcessIcon type="globe" /></span></div>
            <div className="processMain"><h3>Yabancı Dil Yayını</h3><p>Eserinizi profesyonel çeviri ve editoryal uyarlamayla farklı dillere hazırlıyoruz.</p></div>
            <small>Hikâyeniz sınırları aşar.</small>
          </article>
          <article>
            <div className="processMarks"><span className="processNo">9</span><span className="processIcon" aria-hidden="true"><ProcessIcon type="distribution" /></span></div>
            <div className="processMain"><h3>Dijital Dağıtım</h3><p>Eserinizi uygun dijital yayın kanallarına taşıyoruz.</p></div>
            <small>Daha fazla okur, daha fazla erişim.</small>
          </article>
        </div>

        <a className="processCta" href="#basvuru">Yazar Başvurusu Yap <span>→</span></a>
        <blockquote>“Her kitap, yeni bir dünyaya açılan kapıdır.” <cite>— FİGAN</cite></blockquote>
      </section>

      <section className="ecosystemSection" id="ekosistem">
        <div className="ecosystemIntro">
          <div className="ecosystemKicker"><span>FİGAN EKOSİSTEMİ</span><i/><b>04</b></div>
          <h2>Bir kitap.<br/><em>Birden fazla yaşam.</em></h2>
          <p>E-kitabınız okunur. Sesli kitabınız dinlenir. Yazar siteniz sizi anlatır. Figan bütününü tek bir yayın dünyasında bir araya getirir.</p>
        </div>

        <div className="ecosystemCanvas">
          <svg className="ecosystemLines" viewBox="0 0 1000 720" preserveAspectRatio="none" aria-hidden="true">
            <path d="M500 108 C500 165 500 190 500 235"/>
            <path d="M178 260 C285 245 325 270 382 322"/>
            <path d="M822 260 C715 245 675 270 618 322"/>
            <path d="M190 535 C300 520 340 485 395 438"/>
            <path d="M810 535 C700 520 660 485 605 438"/>
          </svg>

          <div className="ecoNode ecoEbook">
            <span className="ecoIcon"><ProcessIcon type="book" /></span>
            <h3>E-KİTAP</h3>
            <strong>Okunur.</strong>
            <p>Tüm cihazlarda,<br/>her yerde.</p>
          </div>

          <div className="ecoNode ecoAudio">
            <span className="ecoIcon"><ProcessIcon type="audio" /></span>
            <h3>SESLİ KİTAP</h3>
            <strong>Dinlenir.</strong>
            <p>Profesyonel seslendirme ile hikâyeniz daha uzağa gider.</p>
          </div>

          <div className="ecoNode ecoSite">
            <span className="ecoIcon"><ProcessIcon type="site" /></span>
            <h3>YAZAR SİTESİ</h3>
            <strong>Yazarın dünyasını kurar.</strong>
            <p>Kendi alanınızda okurlarınızla buluşun.</p>
          </div>

          <div className="ecoNode ecoLanguage">
            <span className="ecoIcon"><ProcessIcon type="globe" /></span>
            <h3>YABANCI DİL</h3>
            <strong>Yeni okurlara açılır.</strong>
            <p>Profesyonel çeviri ve editoryal uyarlama.</p>
          </div>

          <div className="ecoNode ecoDistribution">
            <span className="ecoIcon"><ProcessIcon type="distribution" /></span>
            <h3>DİJİTAL DAĞITIM</h3>
            <strong>Dünyaya ulaşır.</strong>
            <p>Türkiye’de ve uluslararası dijital kanallarda.</p>
          </div>

          <div className="ecosystemStage" aria-label="Figan dijital yayın ekosistemi">
            <img className="ecoReader" src="/ekosistem-reader.webp" alt="Figan Reader üzerinde İçimdeki İbrahim" />
            <img className="ecoBook" src="/ekosistem-kitap.webp" alt="İçimdeki İbrahim kitap mockup" />
            <img className="ecoAudioPhone" src="/ekosistem-audio.webp" alt="Figan Audio üzerinde İçimdeki İbrahim" />
          </div>
        </div>

        <div className="ecosystemClosing">
          <p>Dosyanız yalnızca bir kitaba dönüşmez.</p>
          <strong>Kendi yayın dünyasına dönüşür.</strong>
          <span>Daha fazla okur. Daha fazla yaşam.</span>
        </div>
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
