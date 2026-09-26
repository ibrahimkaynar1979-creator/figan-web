"use client";

// vercel-refresh-services-2026-09-24

// deployment-refresh-2026-09-24

import { useEffect, useState } from "react";
import Image from "next/image";
import FiFooter from "./_components/FiFooter";
import PublishingReels from "./_components/PublishingReels";

const nav = [
  ["Ana Sayfa", "#top"],
  ["Hizmetler", "#hizmetler"],
  ["Yayın Alanlarımız", "/yayin-alanlarimiz"],
  ["Süreç", "#surec"],
  ["22 Ekosistemi", "#ekosistem"],
  ["Yazar Dünyamız", "#yazarlar"],
  ["Yazar Sitesi", "#yazar-sitesi"],
  ["İletişim", "#basvuru"],
] as const;

const services = [
  {
    no:"01",
    title:"Yazar Sitesi",
    traits:["Size Özel","Mobil Uyumlu","Kalıcı Dijital Alan"],
    text:"Eserlerinizi, biyografinizi ve okurla bağınızı size ait seçkin bir dijital merkezde buluşturuyoruz.",
    image:"/figan-hizmet-yazar-sitesi.webp",
    href:"/yazar-sitesi",
  },
  {
    no:"02",
    title:"E-Kitap",
    traits:["EPUB","Mobil Uyumlu","Yayın Hazır"],
    text:"Eserinizi profesyonel dijital yayına hazırlıyor, tüm cihazlarda okunabilir formata dönüştürüyoruz.",
    image:"/figan-hizmet-e-kitap.webp",
    href:"/e-kitap-yayini",
  },
  {
    no:"03",
    title:"Sesli Kitap",
    traits:["Doğal Ses","Stüdyo Kalitesi","Platform Hazır"],
    text:"Metninizi güçlü, doğal ve kaliteli bir dinleme deneyimine dönüştürüyoruz.",
    image:"/figan-hizmet-sesli-kitap.webp",
    href:"/sesli-kitap",
  },
  {
    no:"04",
    title:"Basılı Kitap Yayını & Dağıtım",
    traits:["Kapak Tasarımı","Bandrollü Basım","Fizikî Dağıtım"],
    text:"Kapak tasarımı, baskı hazırlığı, bandrollü basım ve fizikî dağıtım sürecini birlikte yürütüyor; kitabınızın online kitap satış kanalları ve dağıtım ağlarında yer almasına yönelik yayın sürecini yönetiyoruz.",
    image:"/figan-hizmet-basili-kitap-yayini.webp",
    href:"/basili-kitap-yayini",
  },
  {
    no:"05",
    title:"Dijital Dağıtım",
    traits:["Türkiye","Global","Tek Noktadan"],
    text:"Eserinizi Türkiye’de ve dünyada uygun dijital yayın kanallarına taşıyoruz.",
    image:"/figan-hizmet-dijital-dagitim.webp",
    href:"/dijital-dagitim",
  },
  {
    no:"06",
    title:"Çeviri",
    traits:["Editoryal Çeviri","Yayın Dili","Global Hazırlık"],
    text:"Eserinizi hedef dile yalnızca çevirmiyor; yayın dili, editoryal akış ve uluslararası yayın hazırlığı açısından yeniden ele alıyoruz.",
    image:"/figan-hizmet-04-yabanci-dil.webp",
    href:"/yabanci-dil-ceviri",
  },
];

const process = [
  ["01","Başvuru & Değerlendirme","Dosyanızı alıyor, eserinizi ve yayın hedefinizi birlikte değerlendiriyoruz."],
  ["02","Editörlük","Metni dil, akış ve yayın standardı açısından yayına hazırlıyoruz."],
  ["03","Kapak & Tasarım","Kapak, iç sayfa ve eserin görsel yayın kimliğini oluşturuyoruz."],
  ["04","Bandrollü Basım & Fizikî Dağıtım","Kitabınızı bandrollü basıma hazırlıyor, uygun fizikî satış ve dağıtım kanallarına taşıyoruz."],
  ["05","Dijital Yayına Hazırlık","E-kitap, sesli kitap ve gerekli dijital dosyaları platformlara uygun biçimde hazırlıyoruz."],
  ["06","Yayın & Yazar Dünyası","Dijital dağıtımınızı, yazar sitenizi ve yayın sonrası görünürlüğünüzü tek yapıda birleştiriyoruz."],
] as const;

const authors = [
  {
    name:"Figen Yavuz",
    kicker:"22 YAYINEVİ YAZARI",
    description:"“Arayışın Yolculuğu” ile insanın kendine, hayata ve varoluşa dair içsel yolculuğuna eşlik eden bir eser.",
    image:"/figen-yavuz-arayisin-yolculugu-mockup.webp",
    initials:"FY",
    href:"/yazarlar/figen-yavuz",
    published:true,
  },
  {
    name:"İbrahim Kaynar",
    kicker:"22 YAYINEVİ YAZARI",
    description:"“İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken” ile şiir, hafıza ve edebiyatın izinde kişisel bir yolculuk.",
    image:"/icimdeki-ibrahim-mockup.png",
    initials:"İK",
    href:"/yazarlar/ibrahim-kaynar",
    published:true,
  },
] as const;

const faqs = [
  {
    q:"Kitap yayınlatmak için ne yapmalıyım?",
    a:"Dosyanızı 22 Yayınevi ile paylaşmanızın ardından eseriniz ve yayın hedefiniz değerlendirilir; editörlük, tasarım, basılı ve dijital yayın seçenekleri birlikte planlanır.",
  },
  {
    q:"Bandrollü basım ve fizikî dağıtım yapılıyor mu?",
    a:"Evet. Basılı kitap sürecinde kapak ve iç tasarım, baskı hazırlığı, bandrollü basım ve uygun fizikî satış ve dağıtım kanallarına hazırlık birlikte yürütülür.",
  },
  {
    q:"E-kitap ve sesli kitap birlikte hazırlanabilir mi?",
    a:"Evet. Aynı eser için basılı kitap, e-kitap ve sesli kitap formatları tek bir yayın planı içinde birlikte hazırlanabilir.",
  },
  {
    q:"Yazar sitesi hizmeti neleri kapsar?",
    a:"Yazar sitesi; biyografi, kitaplar, yazılar, etkinlikler ve okurla iletişim gibi içerikleri size ait kalıcı bir dijital adreste bir araya getirir.",
  },
] as const;

const faqSchema = {
  "@context":"https://schema.org",
  "@type":"FAQPage",
  mainEntity: faqs.map((item)=>({
    "@type":"Question",
    name:item.q,
    acceptedAnswer:{ "@type":"Answer", text:item.a },
  })),
};

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
          <a href="#top" className="brand brand-fi brand-logo-image" aria-label="22 Yayınevi ana sayfa"><Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={420} height={140} priority /></a>
          <nav className="desktop-nav">
            {nav.map(([label,href])=><a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="header-actions">
            <a className="header-cta" href="/kurucu-yazar">İlk 22’ye Başvur</a>
            <button className="menu-btn" aria-label="Menüyü aç" onClick={()=>setOpen(!open)}>
              <span/><span/><span/>
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${open?"open":""}`}>
          <nav>{nav.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
          <a href="/kurucu-yazar" className="mobile-menu-cta" onClick={()=>setOpen(false)}>İlk 22’ye Başvur</a>
        </div>
      </header>

      <main id="top" className="home-page-main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>

        <PublishingReels home />

        <section className="home-hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span/>22 YAYINEVİ</p>
              <h1><span>Bir kitap</span><em>yazdınız.</em></h1>
              <h2>Şimdi ona ait bir dünya kuralım.</h2>
              <p className="hero-lead">Editörlükten bandrollü basıma, e-kitaptan sesli kitaba, yazar sitenizden dijital ve fizikî dağıtıma kadar tüm yayın dünyanızı tek çatı altında kuruyoruz.</p>
              <div className="hero-actions">
                <a href="/kurucu-yazar" className="btn primary"><span className="cta-icon">▤</span><span className="cta-label">İlk 22’ye Başvur</span><b className="cta-arrow">→</b></a>
                <a href="#fi-video" className="btn secondary"><span className="cta-icon cta-play">▶</span><span className="cta-label">22’yi İzleyin</span><b className="cta-arrow">→</b></a>
              </div>
            </div>
            <div className="hero-visual">
              <img src="/figan-hero-mobile-cropped.webp" alt="22 Yayınevi yayın dünyası: basılı kitap, e-kitap, sesli kitap ve yazar sitesi"/>
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

            <div className="figan-services-track" aria-label="22 Yayınevi yayın hizmetleri">
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
                      <span className="figan-service-cta">Hizmeti İnceleyin <i>→</i></span>
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
                <p className="process-intro">Eseriniz, 22 Yayınevi’nin profesyonel yayın süreciyle adım adım hazırlanır; metinden tasarıma, dijital yayından dağıtıma kadar bütün yolculuk tek bir yayın dünyasında ilerler.</p>
              </div>
              <div className="process-list">
                {process.map(([no,title,text])=>(
                  <article className="process-card" key={no}>
                    <span className="process-no">{no}</span>
                    <div className="process-copy"><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
              <a href="/kurucu-yazar" className="process-cta"><span>İlk 22’ye Başvur</span><b>→</b></a>
            </div>
          </div>
        </section>

        <section id="ekosistem" className="section ecosystem">
          <div className="container ecosystem-grid">
            <div className="ecosystem-copy">
              <p className="eyebrow light"><span/>22 YAYINEVİ EKOSİSTEMİ</p>
              <h2>Bir kitap.<br/><em>Birden fazla yaşam.</em></h2>
              <p>Kitabınız dijitalde ve fizikî dünyada birlikte yaşar; okunur, dinlenir, bandrollü olarak basılır ve uygun dağıtım kanallarıyla okura ulaşır.</p>
              <a href="/kurucu-yazar" className="btn light-btn">Kurucu Yazar Statüsünü İncele <b>→</b></a>
            </div>
            <div className="ecosystem-visual" aria-hidden="true">
              <div className="ecosystem-orbit">
                <span>Basılı Kitap</span><span>E-Kitap</span><span>Sesli Kitap</span><span>Yazar Sitesi</span><span>Türkiye Dağıtımı</span><span>Global Yayın</span>
                <strong>22</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="yazar-sitesi" className="section author-site author-site-compact">
          <div className="container author-grid">
            <div className="author-copy">
              <p className="eyebrow"><span/>YAZAR SİTESİ</p>
              <h2>Sadece bir sayfa değil.<br/><em>Size ait bir yazar dünyası.</em></h2>
              <p>Kitaplarınız, biyografiniz ve okurla kurduğunuz bağ size ait kalıcı bir dijital adreste buluşur.</p>
              <a className="author-site-more" href="/yazar-sitesi">Yazar Sitesini İnceleyin <span>→</span></a>
            </div>
            <div className="author-visual"><img src="/figan-yazar-sitesi-laptop.webp" alt="22 Yayınevi yazar sitesi örneği"/></div>
          </div>
        </section>

        

        <section className="section founder-home-section">
          <div className="container">
            <div className="founder-home-card">
              <div className="founder-home-copy">
                <p className="eyebrow"><span/>İLK 22 KURUCU YAZAR</p>
                <h2>İlk 22 yazar,<br/><em>kuruluş hikâyemizin bir parçası.</em></h2>
                <p>
                  22 Yayınevi’nin ilk 22 yazarı; numaralı Kurucu Yazar vitrini,
                  yayın hayatı boyunca sonraki yayıncılık hizmetlerinde %50 avantaj
                  ve sonradan satın alınamayacak özel bir statü kazanır.
                </p>
                <div className="founder-home-points">
                  <span>01–22 numaralı kalıcı vitrin</span>
                  <span>Yayın hayatı boyunca %50 hizmet avantajı</span>
                  <span>Sonradan satın alınamayan sınırlı statü</span>
                </div>
                <a className="btn primary founder-home-cta" href="/kurucu-yazar">
                  Kurucu Yazar Statüsünü İncele <b>→</b>
                </a>
              </div>
              <div className="founder-home-number" aria-hidden="true">
                <strong>22</strong>
                <span>KURUCU<br/>YAZAR</span>
              </div>
            </div>
          </div>
        </section>

        <section id="yazarlar" className="section authors-section">
          <div className="container authors-wrap">
            <header className="authors-header">
              <p className="eyebrow"><span/>YAZAR DÜNYAMIZ</p>
              <h2>22 Yayınevi yazarları,<br/><em>bir yayın vitrini.</em></h2>
              <p>Yeni yazarlar eklendikçe aynı kart sistemi içinde yan yana yer alacak ve yayın vitrini büyüyecek.</p>
            </header>

            <div className="authors-track" aria-label="22 Yayınevi yazarları">
              {authors.filter((author)=>author.published).map((author)=>(
                <article className="author-slide-card" key={author.name}>
                  <div className="author-slide-visual">
                    {author.image ? (
                      <img src={author.image} alt={author.name}/>
                    ) : (
                      <div className="author-placeholder" aria-hidden="true">{author.initials}</div>
                    )}
                  </div>
                  <div className="author-slide-copy">
                    <p className="author-card-kicker">{author.kicker}</p>
                    <h3>{author.name}</h3>
                    <p>{author.description}</p>
                    <a className="author-slide-link" href={author.href}>Yazarı Gör <span>→</span></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="hakkimizda" className="section about-figan about-fi-manifesto">
          <div className="container">
            <div className="about-figan-card">
              <div className="about-figan-copy">
                <p className="eyebrow"><span/>22 YAYINEVİ HAKKINDA</p>
                <h2>Bir kitabın ötesinde,<br/><em>bütün bir yayın dünyası.</em></h2>
                <p>22 Yayınevi, bir eseri yalnızca basılacak bir dosya olarak görmez. Metnin editoryal hazırlığından basılı ve dijital yayına, sesli kitaptan yazarın kendi dijital alanına kadar birbirini tamamlayan bir yayın dünyası kurar.</p>
                <p className="about-fi-note">Yazarın eseri kadar kendi adıyla da kalıcı, görünür ve erişilebilir olmasını önemsiyoruz.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="fi-video" className="section fi-video-teaser">
          <div className="container fi-video-teaser-card">
            <div>
              <p className="eyebrow light"><span/>22 YAYINEVİ’Nİ İZLEYİN</p>
              <h2>Yayın dünyamızı<br/><em>yakında videoda anlatıyoruz.</em></h2>
            </div>
            <div className="fi-video-teaser-play" aria-hidden="true"><span>▶</span><small>Tanıtım videosu yakında</small></div>
          </div>
        </section>

        <section id="basvuru" className="section final-cta">
          <div className="container final-panel">
            <p className="eyebrow light"><span/>İLK 22 KURUCU YAZAR</p>
            <h2>Bir kitabınız varsa,<br/><em>ona ait dünyayı birlikte kuralım.</em></h2>
            <p>Dosyanızı paylaşın; yayın yolculuğunuzu birlikte planlayalım.</p>
            <a className="btn gold" href="/kurucu-yazar">İlk 22 Kurucu Yazar Başvurusu <b>→</b></a>
          </div>
        </section>
      </main>

      <div className="home-footer-zone"><FiFooter /></div>

      <div className="contact-float">
        <a className="call" href="tel:+905532419397" aria-label="22 Yayınevi'ni telefonla ara" title="Telefonla ara">
          <svg viewBox="0 0 24 24" width="29" height="29" aria-hidden="true">
            <path fill="currentColor" d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/>
          </svg>
        </a>
        <a className="wa" href="https://wa.me/905532419397?text=Merhaba%2C%2022%20Yay%C4%B1nevi%20web%20sitesini%20inceledim.%20Yay%C4%B1nc%C4%B1l%C4%B1k%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" aria-label="22 Yayınevi ile WhatsApp üzerinden iletişime geçin" title="WhatsApp">
          <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
            <path fill="currentColor" d="M16.04 3C9.39 3 4 8.2 4 14.61c0 2.28.69 4.51 1.99 6.41L4 28l7.23-1.89a12.4 12.4 0 0 0 4.8.96h.01C22.68 27.07 28 21.86 28 15.45 28 9.04 22.68 3 16.04 3Zm0 21.96h-.01a10.25 10.25 0 0 1-4.35-.96l-.31-.15-4.29 1.12 1.15-4.07-.2-.32a9.41 9.41 0 0 1-1.5-5.08c0-5.21 4.38-9.45 9.76-9.45 5.38 0 9.76 4.24 9.76 9.45 0 5.21-4.38 9.46-10.01 9.46Zm5.35-7.07c-.29-.14-1.72-.82-1.99-.91-.27-.1-.47-.14-.67.14-.2.29-.77.91-.94 1.1-.17.19-.35.22-.64.07-.29-.14-1.24-.44-2.36-1.41-.87-.75-1.46-1.67-1.63-1.95-.17-.29-.02-.44.13-.58.13-.13.29-.34.44-.51.15-.17.2-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.67-1.56-.91-2.14-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.36-.27.29-1.04.98-1.04 2.39 0 1.41 1.07 2.77 1.22 2.96.15.19 2.11 3.12 5.1 4.38.71.29 1.27.46 1.7.59.71.22 1.36.19 1.87.12.57-.08 1.72-.68 1.96-1.34.24-.65.24-1.22.17-1.34-.07-.12-.27-.19-.56-.33Z"/>
          </svg>
        </a>
      </div>

    </>
  );
}
