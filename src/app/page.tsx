// Figan hero v1 — deployment trigger
const nav = ["Ana Sayfa", "Biz Kimiz", "Yazarlar", "Hizmetler", "Nasıl Çalışır?", "Blog", "İletişim"];

export default function Home() {
  return (
    <main className="figan-page">
      <section className="hero">
        <header className="header shell">
          <a className="brand" href="#" aria-label="Figan Yayınevi ana sayfa">
            <span className="brand-mark">♢</span>
            <span><strong>FİGAN</strong><small>Y A Y I N E V İ</small><em>Sözün yeni dünyası.</em></span>
          </a>
          <nav>{nav.map((item, i) => <a className={i === 0 ? "active" : ""} href="#" key={item}>{item}</a>)}</nav>
          <div className="header-actions"><button className="search" aria-label="Ara">⌕</button><a className="author-btn" href="#basvuru">Yazar Olun <span>→</span></a></div>
        </header>

        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow">DİJİTAL YAYINCILIĞIN<br/>YENİ DÜNYASI</p>
            <h1><span>BİR KİTAP</span><span>YAZDINIZ.</span><em>Şimdi ona ait</em><span>BİR DÜNYA</span><span>KURALIM.</span></h1>
            <p className="lead">Yazar siteniz. İnteraktif e-kitabınız.<br/>Sesli kitabınız. Dijital dağıtımınız.<br/>Tek bir yayın dünyasında.</p>
            <div className="cta-row"><a className="primary" href="#basvuru">Yazar Dünyamı Oluştur <b>→</b></a><a className="secondary" href="#reader"><i>▶</i> Figan Reader&apos;ı Dene</a></div>
            <div className="hero-note"><span></span><p>DAHA FAZLA YAZAR.<br/>DAHA FAZLA OKUYUCU.<br/>DAHA UZUN ÖMÜRLÜ ESERLER.</p></div>
          </div>

          <div className="showcase" aria-label="İbrahim Kaynar dijital yayın dünyası">
            <div className="laptop">
              <div className="laptop-screen">
                <div className="author-site-top"><div className="mini-brand"><b>♢</b><span>İBRAHİM KAYNAR<small>YAZAR</small></span></div><div className="mini-nav">Hakkında&nbsp;&nbsp;&nbsp; Eserler&nbsp;&nbsp;&nbsp; Yazılar&nbsp;&nbsp;&nbsp; Basın&nbsp;&nbsp;&nbsp; İletişim</div></div>
                <div className="author-site-body"><div><p>İbrahim Kaynar</p><i>— kelimelerle içe doğru bir yolculuk</i><blockquote>“Bazen bir şiir,<br/>insanın kendi içine<br/>açılan en uzak yoldur.”</blockquote><button>Eserleri Keşfet →</button></div><div className="portrait"><div className="portrait-moon"></div><div className="portrait-silhouette"></div></div></div>
                <div className="author-site-foot"><div className="cover-mini"><span>İÇİMDEKİ<br/><b>İBRAHİM</b></span></div><div><strong>İçimdeki İbrahim</strong><small>Âsaf Hâlet Çelebi’yi Ararken</small></div><div className="istanbul">⌁⌁⌁</div></div>
              </div><div className="laptop-base"></div>
            </div>

            <div className="tablet" id="reader"><div className="tablet-notch"></div><div className="reader-head">‹ <span>F I G A N&nbsp;&nbsp; R E A D E R</span> •••</div><div className="reader-copy"><small>Bölüm 04</small><h2>Kendine Dönüş</h2><p>İnsan, bazen en çok kendinden uzaklaştığında, kendine yaklaşır. Belki de yol, hiç gitmediğin yerde değil, hep döndüğün yerdedir.</p></div><div className="reader-land">İSTANBUL</div><div className="progress"><b></b><span>%37</span></div><div className="reader-tools">Aa　☾　♡　☷</div></div>

            <div className="phone"><div className="phone-island"></div><div className="phone-head">Kütüphanem　⌕　☰</div><div className="phone-cover"><span>İÇİMDEKİ<br/><b>İBRAHİM</b></span></div><strong>İçimdeki İbrahim</strong><small>İbrahim Kaynar<br/>Şiir · Biyografi</small><div className="phone-nav">⌂　▥　◇　♙</div></div>

            <div className="book"><div className="book-spine"><span>İÇİMDEKİ İBRAHİM</span></div><div className="book-face"><div className="book-quote">“Bazen bir şiir,<br/>insanın kendi içine<br/>açılan en uzak yoldur.”</div><div className="book-author">İ B R A H İ M&nbsp;&nbsp; K A Y N A R</div><div className="book-title">İÇİMDEKİ<br/><b>İBRAHİM</b></div><div className="book-sub">Âsaf Hâlet Çelebi’yi <i>Ararken</i></div><div className="book-skyline">♢　⌁⌁⌁　♢</div><div className="book-publisher">FİGAN<small>YAYINEVİ</small></div></div></div>
            <div className="tagline">SÖZ<br/>SINIRLARI<br/>AŞAR.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
