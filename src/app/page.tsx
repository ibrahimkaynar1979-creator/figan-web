"use client";

import { useEffect, useState } from "react";

const nav = [
  ["Ana Sayfa", "#top"],
  ["Hizmetler", "#hizmetler"],
  ["Süreç", "#surec"],
  ["Figan Ekosistemi", "#ekosistem"],
  ["Yazar Sitesi", "#yazar-sitesi"],
  ["İletişim", "#basvuru"],
] as const;

const services = [
  { no:"01", title:"E-Kitap", text:"Eserinizi profesyonel dijital yayına hazırlıyor, tüm cihazlarda okunabilir formata dönüştürüyoruz.", image:"/figan-hizmet-01-ekitap.webp" },
  { no:"02", title:"Sesli Kitap", text:"Metninizi güçlü ve doğal bir dinleme deneyimine dönüştürüyoruz.", image:"/figan-hizmet-02-sesli-kitap.webp" },
  { no:"03", title:"Yazar Sitesi", text:"Eserlerinizi, biyografinizi ve okur bağınızı tek bir kişisel merkezde buluşturuyoruz.", image:"/figan-hizmet-03-yazar-sitesi.webp" },
  { no:"04", title:"Yabancı Dil", text:"Profesyonel çeviri ve editoryal uyarlamayla eserinizi farklı dillere hazırlıyoruz.", image:"/figan-hizmet-04-yabanci-dil.webp" },
  { no:"05", title:"Dijital Dağıtım", text:"Eserinizi Türkiye’de ve dünyada uygun dijital yayın kanallarına taşıyoruz.", image:"/figan-hizmet-05-dijital-dagitim.webp" },
];

const process = [
  ["01","Başvuru","Dosyanızı bizimle paylaşın."],
  ["02","Editörlük","Metninizi yayın için güçlendiriyoruz."],
  ["03","Kapak & Tasarım","Eserinize özgü yayın kimliği oluşturuyoruz."],
  ["04","E-Kitap","Tüm cihazlarda okunabilir dijital formata hazırlıyoruz."],
  ["05","Sesli Kitap","Eserinizi dinleme deneyimine dönüştürüyoruz."],
  ["06","Figan Reader & Audio","Okuma ve dinleme deneyiminizi tek dünyada buluşturuyoruz."],
  ["07","Yazar Sitesi","Size özel profesyonel yazar alanınızı kuruyoruz."],
  ["08","Yabancı Dil Yayını","Eserinizi farklı dillere hazırlıyoruz."],
  ["09","Dijital Dağıtım","Uygun yayın kanallarına taşıyoruz."],
] as const;

export default function Home() {
  const [open,setOpen] = useState(false);
  const [scrolled,setScrolled] = useState(false);

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>8);
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  useEffect(()=>{
    document.body.style.overflow=open?"hidden":"";
    return ()=>{document.body.style.overflow=""};
  },[open]);

  return (
    <>
      <header className={`site-header ${scrolled?"is-scrolled":""}`}>
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Figan Yayınevi ana sayfa">
            <img src="/figan-logo-silver.png" alt="Figan Yayınevi"/>
          </a>
          <nav className="desktop-nav">
            {nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <a className="header-cta" href="#basvuru">Yazar Başvurusu</a>
            <button className="menu-btn" aria-label="Menüyü aç" onClick={()=>setOpen(!open)}>
              <span/><span/><span/>
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${open?"open":""}`}>
          <nav>{nav.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
          <a href="#basvuru" className="mobile-menu-cta" onClick={()=>setOpen(false)}>Yazar Başvurusu Yap</a>
        </div>
      </header>

      <main id="top">

        <nav className="figan-category-nav" aria-label="Figan yayın hizmetleri">
          <div className="figan-category-panel">
            <div className="figan-category-scroller">
              {[
                ["E-Kitap", "/figan-hizmet-01-ekitap.webp", "#hizmetler"],
                ["Sesli Kitap", "/figan-hizmet-02-sesli-kitap.webp", "#hizmetler"],
                ["Yazar Sitesi", "/figan-hizmet-03-yazar-sitesi.webp", "#yazar-sitesi"],
                ["Dijital Dağıtım", "/figan-hizmet-05-dijital-dagitim.webp", "#hizmetler"],
              ].map(([label, image, href]) => (
                <a className="figan-category-item" href={href} key={label}>
                  <span className="figan-category-image">
                    <img src={image} alt="" />
                  </span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>

        <section className="category-strip">
          <div className="container category-inner">
            <span>Figan Yayınevi</span><i/>
            <a href="#hizmetler">E-Kitap</a>
            <a href="#hizmetler">Sesli Kitap</a>
            <a href="#yazar-sitesi">Yazar Sitesi</a>
            <a href="#hizmetler">Dijital Dağıtım</a>
          </div>
        </section>

        <section className="home-hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span/>YAZ. YAYINLA. DÜNYAYA ULAŞ.</p>
              <h1><span>Bir kitap</span><em>yazdınız.</em></h1>
              <h2>Şimdi ona ait<br/>bir dünya kuralım.</h2>
              <p className="hero-lead">E-kitabınız. Sesli kitabınız. Yazar siteniz. Dijital dağıtımınız.<br/>Tek bir yayın dünyasında.</p>
              <div className="hero-actions">
                <a href="#basvuru" className="btn primary"><span className="cta-icon">▤</span><span className="cta-label">Yazar Başvurusu Yap</span><b className="cta-arrow">→</b></a>
                <button className="btn secondary" type="button"><span className="cta-icon cta-play">▶</span><span className="cta-label">Figan’ı İzleyin</span><b className="cta-arrow">→</b></button>
              </div>
            </div>
            <div className="hero-visual">
              <img src="/figan-hero-mobile-final.webp" alt="Figan yayın dünyası: kitap, Reader, Audio ve yazar sitesi"/>
            </div>
          </div>
        </section>

        <section id="hizmetler" className="section services">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow"><span/>HİZMETLERİMİZ</p>
              <h2>Her ihtiyaç için,<br/><em>tek bir yayın dünyasında.</em></h2>
              <p>Eserinizi en iyi haliyle hazırlıyor, dijital dünyada okuyucuya ulaşacağı bütün parçaları tek çatı altında kuruyoruz.</p>
            </div>
            <div className="service-grid">
              {services.map((s,i)=>(
                <article className={`service-card ${i%2?"reverse":""}`} key={s.no}>
                  <div className="service-image"><img src={s.image} alt=""/></div>
                  <div className="service-copy">
                    <span className="service-no">{s.no}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <a href="#basvuru">Detaylı bilgi <b>→</b></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="surec" className="section process">
          <div className="container">
            <div className="section-head narrow">
              <p className="eyebrow"><span/>BİR DOSYA, BİR YOLCULUK.</p>
              <h2>Nasıl çalışıyoruz?</h2>
              <p>Eseriniz, Figan’ın profesyonel yayın süreciyle adım adım dijital dünyaya hazırlanır.</p>
            </div>
            <div className="process-list">
              {process.map(([no,title,text])=>(
                <article className="process-card" key={no}>
                  <span className="process-no">{no}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="ekosistem" className="section ecosystem">
          <div className="container ecosystem-grid">
            <div className="ecosystem-copy">
              <p className="eyebrow light"><span/>FİGAN EKOSİSTEMİ</p>
              <h2>Bir kitap.<br/><em>Birden fazla yaşam.</em></h2>
              <p>Kitabınız farklı biçimlerde yaşar; okunur, dinlenir ve size ait dijital dünyada okurla buluşur.</p>
              <a href="#basvuru" className="btn light-btn">Yayın Dünyamı Kur <b>→</b></a>
            </div>
            <div className="ecosystem-visual">
              <img src="/figan-ekosistem-premium.webp" alt="Figan ekosistemi"/>
            </div>
          </div>
        </section>

        <section id="yazar-sitesi" className="section author-site">
          <div className="container author-grid">
            <div className="author-copy">
              <p className="eyebrow"><span/>YAZAR SİTESİ</p>
              <h2>Sadece bir sayfa değil.<br/><em>Size ait bir yazar dünyası.</em></h2>
              <p>Kitaplarınız, hikâyeniz ve okurlarınızla kurduğunuz bağ; sosyal medya akışında kaybolmayan, size ait bir dijital adreste buluşur.</p>
              <div className="benefit-grid">
                <div><b>01</b><h3>Kendi dijital adresiniz</h3><p>Yazar kimliğinizi size ait bir alanda kalıcılaştırın.</p></div>
                <div><b>02</b><h3>Tüm eserleriniz</h3><p>Kitaplarınızı tek bir seçkin vitrinde bir araya getirin.</p></div>
                <div><b>03</b><h3>Yazılar & etkinlikler</h3><p>Yeni metinlerinizi, buluşmalarınızı ve duyurularınızı paylaşın.</p></div>
                <div><b>04</b><h3>Okurla doğrudan bağ</h3><p>Okurlarınızın sizi ve eserlerinizi doğrudan keşfetmesini sağlayın.</p></div>
              </div>
            </div>
            <div className="author-visual"><img src="/figan-yazar-sitesi-laptop.webp" alt="Figan yazar sitesi örneği"/></div>
          </div>
        </section>

        <section id="basvuru" className="section final-cta">
          <div className="container final-panel">
            <p className="eyebrow light"><span/>YAZAR BAŞVURUSU</p>
            <h2>Bir kitabınız varsa,<br/><em>ona ait dünyayı birlikte kuralım.</em></h2>
            <p>Dosyanızı paylaşın; yayın yolculuğunuzu birlikte planlayalım.</p>
            <a className="btn gold" href="https://wa.me/905324290290?text=Merhaba%2C%20Figan%20Yay%C4%B1nevi%20web%20sitesini%20inceledim.%20Yay%C4%B1nc%C4%B1l%C4%B1k%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer">WhatsApp’tan Başvur <b>→</b></a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand"><img src="/figan-logo-silver.png" alt="Figan Yayınevi"/><p>Bir kitabın ötesinde, size ait bir yayın dünyası.</p></div>
          <div><h4>Yayın Dünyası</h4><a href="#hizmetler">E-Kitap</a><a href="#hizmetler">Sesli Kitap</a><a href="#yazar-sitesi">Yazar Sitesi</a><a href="#hizmetler">Dijital Dağıtım</a></div>
          <div><h4>Figan</h4><a href="#surec">Nasıl Çalışıyoruz?</a><a href="#ekosistem">Ekosistem</a><a href="#basvuru">Yazar Başvurusu</a></div>
          <div><h4>İletişim</h4><a href="tel:+905324290290">0 532 429 02 90</a><a href="mailto:info@figanyayinevi.com">info@figanyayinevi.com</a><span>İzmir</span></div>
        </div>
        <div className="container footer-bottom">© {new Date().getFullYear()} Figan Yayınevi. Tüm hakları saklıdır.</div>
      </footer>

      <div className="contact-float">
        <a className="call" href="tel:+905324290290" aria-label="Ara">☎</a>
        <a className="wa" href="https://wa.me/905324290290" target="_blank" rel="noreferrer" aria-label="WhatsApp">W</a>
      </div>

      <nav className="mobile-dock" aria-label="Mobil alt menü">
        <a href="#top"><span>⌂</span>Ana Sayfa</a>
        <a href="#hizmetler"><span>▤</span>Hizmetler</a>
        <a href="#yazar-sitesi"><span>✒</span>Yazarlar</a>
        <a href="#ekosistem"><span>▱</span>Kitaplar</a>
        <a href="#basvuru"><span>○</span>İletişim</a>
      </nav>
    </>
  );
}
