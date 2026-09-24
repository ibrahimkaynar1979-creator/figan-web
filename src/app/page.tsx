"use client";

// vercel-refresh-services-2026-09-24

// deployment-refresh-2026-09-24

import { useEffect, useState } from "react";

const nav = [
  ["Ana Sayfa", "#top"],
  ["Hizmetler", "#hizmetler"],
  ["Süreç", "#surec"],
  ["Figan Ekosistemi", "#ekosistem"],
  ["Yazarlarımız", "#yazarlar"],
  ["Yazar Sitesi", "#yazar-sitesi"],
  ["İletişim", "#basvuru"],
] as const;

const services = [
  {
    no:"01",
    title:"Yazar Sitesi",
    traits:["Size Özel","Mobil Uyumlu","Kalıcı Dijital Alan"],
    badge:"Size Özel Dijital Alan",
    text:"Eserlerinizi, biyografinizi ve okurla bağınızı size ait seçkin bir dijital merkezde buluşturuyoruz.",
    image:"/figan-hizmet-yazar-sitesi.webp",
    href:"#yazar-sitesi",
  },
  {
    no:"02",
    title:"E-Kitap",
    traits:["EPUB","Mobil Uyumlu","Yayın Hazır"],
    badge:"Her Cihazda Okunsun",
    text:"Eserinizi profesyonel dijital yayına hazırlıyor, tüm cihazlarda okunabilir formata dönüştürüyoruz.",
    image:"/figan-hizmet-e-kitap.webp",
    href:"#basvuru",
  },
  {
    no:"03",
    title:"Sesli Kitap",
    traits:["Doğal Ses","Stüdyo Kalitesi","Platform Hazır"],
    badge:"Hikâyeniz Ses Bulsun",
    text:"Metninizi güçlü, doğal ve kaliteli bir dinleme deneyimine dönüştürüyoruz.",
    image:"/figan-hizmet-sesli-kitap.webp",
    href:"#basvuru",
  },
  {
    no:"04",
    title:"Basılı Kitap Yayını & Dağıtım",
    traits:["Kapak Tasarımı","Bandrollü Basım","Fizikî Dağıtım"],
    badge:"Kitabınız Basılsın, Dağıtıma Çıksın",
    text:"Kapak tasarımı, baskı hazırlığı, bandrollü basım ve fizikî dağıtım sürecini birlikte yürütüyor; kitabınızın online kitap satış kanalları ve dağıtım ağlarında yer almasına yönelik yayın sürecini yönetiyoruz.",
    image:"/figan-hizmet-basili-kitap-yayini.webp",
    href:"#basvuru",
  },
  {
    no:"05",
    title:"Dijital Dağıtım",
    traits:["Türkiye","Global","Tek Noktadan"],
    badge:"Daha Fazla Okura Ulaşın",
    text:"Eserinizi Türkiye’de ve dünyada uygun dijital yayın kanallarına taşıyoruz.",
    image:"/figan-hizmet-dijital-dagitim.webp",
    href:"#basvuru",
  },
  {
    no:"06",
    title:"Yabancı Dil Çeviri",
    traits:["Editoryal Çeviri","Yayın Dili","Global Hazırlık"],
    badge:"Eseriniz Yeni Dillere Açılsın",
    text:"Eserinizi hedef dile yalnızca çevirmiyor; yayın dili, editoryal akış ve uluslararası yayın hazırlığı açısından yeniden ele alıyoruz.",
    image:"/figan-hizmet-05-dijital-dagitim.webp",
    href:"#basvuru",
  },
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
              <p className="eyebrow"><span/>FIGAN YAYINEVİ</p>
              <h1><span>Bir kitap</span><em>yazdınız.</em></h1>
              <h2>Şimdi ona ait bir dünya kuralım.</h2>
              <p className="hero-lead">E-kitabınız, sesli kitabınız, yazar siteniz ve dijital dağıtımınız için tüm süreci tek bir yayın dünyasında bir araya getiriyoruz.</p>
              <div className="hero-actions">
                <a href="#basvuru" className="btn primary"><span className="cta-icon">▤</span><span className="cta-label">Yazar Başvurusu Yap</span><b className="cta-arrow">→</b></a>
                <button className="btn secondary" type="button"><span className="cta-icon cta-play">▶</span><span className="cta-label">Figan’ı İzleyin</span><b className="cta-arrow">→</b></button>
              </div>
            </div>
            <div className="hero-visual">
              <img src="/figan-hero-mobile-cropped.webp" alt="Figan yayın dünyası: kitap, Reader, Audio ve yazar sitesi"/>
            </div>
          </div>
        </section>

        <section id="hizmetler" className="section services figan-services-showcase">
          <div className="container">
            <header className="figan-services-header">
              <p className="figan-services-eyebrow">HİZMETLERİMİZ</p>
              <h2>Her biri farklı,<br/>hepsi <strong>aynı yayın dünyasında.</strong></h2>
              <p className="figan-services-description">
                Eserinizi yalnızca yayıma hazırlamıyoruz; yazar kimliğinizden dijital dağıtıma kadar bütün yayın dünyasını birlikte kuruyoruz.
              </p>
            </header>

            <div className="figan-services-track" aria-label="Figan yayın hizmetleri">
              {services.map((service) => (
                <article className="figan-service-card" key={service.no}>
                  <a className="figan-service-link" href={service.href}>
                    <div className="figan-service-photo">
                      <img src={service.image} alt="" />
                    </div>

                    <div className="figan-service-content">
                      <span className="figan-service-emblem" aria-hidden="true">✦</span>
                      <div className="figan-service-title-row">
                        <h3>{service.title}</h3>
                        <span className="figan-service-title-mark" aria-hidden="true">✦</span>
                      </div>
                      <ul className="figan-service-traits" aria-label={`${service.title} özellikleri`}>
                        {service.traits.map((trait) => <li key={trait}>{trait}</li>)}
                      </ul>
                      <p>{service.text}</p>
                      <span className="figan-service-cta">Detayları İnceleyin <i>→</i></span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="surec" className="section process">
          <div className="container process-wrap">
            <div className="process-panel">
              <div className="process-panel-head">
                <p className="process-kicker"><span>✦</span> BİR DOSYA, BİR YOLCULUK</p>
                <h2>Nasıl çalışıyoruz?</h2>
                <div className="process-ornament" aria-hidden="true"><span/><i>✦</i></div>
                <p className="process-intro">Eseriniz, Figan’ın profesyonel yayın süreciyle adım adım hazırlanır; metinden tasarıma, dijital yayından dağıtıma kadar bütün yolculuk tek bir yayın dünyasında ilerler.</p>
              </div>
              <div className="process-list">
                {process.map(([no,title,text])=>(
                  <article className="process-card" key={no}>
                    <span className="process-no">{no}</span>
                    <div className="process-copy"><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
              <a href="#basvuru" className="process-cta"><span>Yayın Yolculuğunu Başlat</span><b>→</b></a>
            </div>
          </div>
        </section>

        <section id="ekosistem" className="section ecosystem">
          <div className="container ecosystem-grid">
            <div className="ecosystem-copy">
              <p className="eyebrow light"><span/>FİGAN EKOSİSTEMİ</p>
              <h2>Bir kitap.<br/><em>Birden fazla yaşam.</em></h2>
              <p>Kitabınız dijitalde ve fizikî dünyada birlikte yaşar; okunur, dinlenir, bandrollü olarak basılır ve uygun dağıtım kanallarıyla okura ulaşır.</p>
              <a href="#basvuru" className="btn light-btn">Yayın Dünyamı Kur <b>→</b></a>
            </div>
            <div className="ecosystem-visual" aria-hidden="true">
              <div className="ecosystem-orbit">
                <span>E-Kitap</span><span>Sesli Kitap</span><span>Yazar Sitesi</span><span>Dijital Dağıtım</span><span>Bandrollü Basım</span><span>Fizikî Dağıtım</span>
                <strong>Figan</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="yazarlar" className="section authors-section">
          <div className="container authors-wrap">
            <header className="authors-header">
              <p className="eyebrow"><span/>YAZARLARIMIZ</p>
              <h2>Figan’ın yayın dünyasında<br/><em>yazarlar ve eserleri.</em></h2>
              <p>Her eser kendi sesiyle, her yazar kendi yayın kimliğiyle Figan dünyasında yerini alır.</p>
            </header>
            <div className="authors-grid">
              <article className="author-card">
                <div className="author-card-visual">
                  <img src="/icimdeki-ibrahim.webp" alt="İçimdeki İbrahim kitap kapağı"/>
                </div>
                <div className="author-card-copy">
                  <p className="author-card-kicker">FIGAN YAZARI</p>
                  <h3>İbrahim Kaynar</h3>
                  <p>“İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken” ile şiir, hafıza ve edebiyatın izinde kişisel bir yolculuk.</p>
                  <a href="#basvuru">Yazar dünyasını keşfedin <span>→</span></a>
                </div>
              </article>
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
            <a className="btn gold" href="https://wa.me/905532419397?text=Merhaba%2C%20Figan%20Yay%C4%B1nevi%20web%20sitesini%20inceledim.%20Yay%C4%B1nc%C4%B1l%C4%B1k%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer">WhatsApp’tan Başvur <b>→</b></a>
          </div>
        </section>
      </main>

      <footer className="figan-footer">
        <div className="container figan-footer-shell">
          <div className="footer-logo-row">
            <a href="#top" className="footer-logo"><img src="/figan-logo-silver.png" alt="Figan Yayınevi"/></a>
            <p>Bir kitabın ötesinde, size ait bir yayın dünyası.</p>
          </div>
          <div className="footer-divider"/>
          <div className="footer-groups">
            <section className="footer-group">
              <h4>Yayın Dünyası</h4>
              <a href="#hizmetler"><span>✦</span>E-Kitap</a>
              <a href="#hizmetler"><span>✦</span>Sesli Kitap</a>
              <a href="#yazar-sitesi"><span>✦</span>Yazar Sitesi</a>
              <a href="#hizmetler"><span>✦</span>Dijital Dağıtım</a>
            </section>
            <section className="footer-group">
              <h4>Figan</h4>
              <a href="#surec"><span>✦</span>Nasıl Çalışıyoruz?</a>
              <a href="#ekosistem"><span>✦</span>Figan Ekosistemi</a>
              <a href="#yazarlar"><span>✦</span>Yazarlarımız</a>
              <a href="#yazar-sitesi"><span>✦</span>Yazar Sitesi</a>
              <a href="#basvuru"><span>✦</span>Yazar Başvurusu</a>
            </section>
            <section className="footer-group footer-contact">
              <h4>Bize Ulaşın</h4>
              <a href="tel:+905532419397"><span aria-hidden="true">☎</span>0 532 4 290 290</a>
              <a href="https://wa.me/905532419397?text=Merhaba%2C%20Figan%20Yay%C4%B1nevi%20web%20sitesini%20inceledim.%20Yay%C4%B1nc%C4%B1l%C4%B1k%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer"><span aria-hidden="true">◉</span>WhatsApp’tan Yazın</a>
              <a href="mailto:info@figanyayinevi.com"><span aria-hidden="true">✉</span>info@figanyayinevi.com</a>
              <p className="footer-address"><span aria-hidden="true">⌖</span>Adalet Mah. Manas Blv. Folkart Towers A Kule No:47/B Kat:26 Daire:2601, Bayraklı / İzmir</p>
            </section>
          </div>
          <div className="footer-signature"><i/><span>✦</span><i/></div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Figan Yayınevi. Tüm hakları saklıdır.</p>
            <div className="footer-legal"><span>Gizlilik Politikası</span><i/><span>KVKK</span><i/><span>Kullanım Koşulları</span></div>
            <div className="naribo-credit" aria-label="Naribo Creative">
              <span className="naribo-mark">N</span>
              <span className="naribo-word">NARIBO</span>
              <span className="naribo-creative">CREATIVE</span>
            </div>
          </div>
        </div>
      </footer>

      <div className="contact-float">
        <a className="call" href="tel:+905532419397" aria-label="Figan Yayınevi'ni telefonla ara" title="Telefonla ara">
          <svg viewBox="0 0 24 24" width="29" height="29" aria-hidden="true">
            <path fill="currentColor" d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/>
          </svg>
        </a>
        <a className="wa" href="https://wa.me/905532419397?text=Merhaba%2C%20Figan%20Yay%C4%B1nevi%20web%20sitesini%20inceledim.%20Yay%C4%B1nc%C4%B1l%C4%B1k%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" aria-label="Figan Yayınevi ile WhatsApp üzerinden iletişime geçin" title="WhatsApp">
          <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
            <path fill="currentColor" d="M16.04 3C9.39 3 4 8.2 4 14.61c0 2.28.69 4.51 1.99 6.41L4 28l7.23-1.89a12.4 12.4 0 0 0 4.8.96h.01C22.68 27.07 28 21.86 28 15.45 28 9.04 22.68 3 16.04 3Zm0 21.96h-.01a10.25 10.25 0 0 1-4.35-.96l-.31-.15-4.29 1.12 1.15-4.07-.2-.32a9.41 9.41 0 0 1-1.5-5.08c0-5.21 4.38-9.45 9.76-9.45 5.38 0 9.76 4.24 9.76 9.45 0 5.21-4.38 9.46-10.01 9.46Zm5.35-7.07c-.29-.14-1.72-.82-1.99-.91-.27-.1-.47-.14-.67.14-.2.29-.77.91-.94 1.1-.17.19-.35.22-.64.07-.29-.14-1.24-.44-2.36-1.41-.87-.75-1.46-1.67-1.63-1.95-.17-.29-.02-.44.13-.58.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.67-1.56-.91-2.14-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.36-.27.29-1.04.98-1.04 2.39 0 1.41 1.07 2.77 1.22 2.96.15.19 2.11 3.12 5.1 4.38.71.29 1.27.46 1.7.59.71.22 1.36.19 1.87.12.57-.08 1.72-.68 1.96-1.34.24-.65.24-1.22.17-1.34-.07-.12-.27-.19-.56-.33Z"/>
          </svg>
        </a>
      </div>

      <nav className="mobile-dock" aria-label="Mobil alt menü">
        <a href="#top"><span>⌂</span>Ana Sayfa</a>
        <a href="#hizmetler"><span>▤</span>Hizmetler</a>
        <a href="#yazarlar"><span>✒</span>Yazarlar</a>
        <a href="#ekosistem"><span>▱</span>Kitaplar</a>
        <a href="#basvuru"><span>○</span>İletişim</a>
      </nav>
    </>
  );
}
