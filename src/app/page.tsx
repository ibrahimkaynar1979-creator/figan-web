"use client";

// vercel-refresh-services-2026-09-24

// deployment-refresh-2026-09-24

import { useEffect, useState } from "react";
import Image from "next/image";
import FiFooter from "./_components/FiFooter";
import PublishingReels from "./_components/PublishingReels";
import DigitalExperiences from "./_components/DigitalExperiences";
import FounderAuthors from "./_components/FounderAuthors";
import { BRAND_ASSETS } from "../lib/brandAssets";

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
    traits:["EPUB","Mobil Uyumlu","Yayına Hazır"],
    text:"Eserinizi profesyonel dijital yayına hazırlıyor, tüm cihazlarda okunabilir formata dönüştürüyoruz.",
    image:"/figan-hizmet-e-kitap.webp",
    href:"/e-kitap-yayini",
  },
  {
    no:"03",
    title:"Sesli Kitap",
    traits:["Doğal Ses","Stüdyo Kalitesi","Platformlara Hazır"],
    text:"Metninizi güçlü, doğal ve kaliteli bir dinleme deneyimine dönüştürüyoruz.",
    image:"/figan-hizmet-sesli-kitap.webp",
    href:"/sesli-kitap",
  },
  {
    no:"04",
    title:"Basılı Kitap Yayını & Dağıtım",
    traits:["Kapak Tasarımı","Bandrollü Basım","Fizikî Dağıtım"],
    text:"Kapak tasarımı, baskı hazırlığı, bandrollü basım ve fizikî dağıtım sürecini birlikte yürütüyor; kitabınızın çevrim içi kitap satış kanalları ve dağıtım ağlarında yer almasına yönelik yayın sürecini yönetiyoruz.",
    image:"/figan-hizmet-basili-kitap-yayini.webp",
    href:"/basili-kitap-yayini",
  },
  {
    no:"05",
    title:"Dijital Dağıtım",
    traits:["Türkiye","Uluslararası","Tek Noktadan"],
    text:"Eserinizi Türkiye’de ve dünyada uygun dijital yayın kanallarına taşıyoruz.",
    image:"/figan-hizmet-dijital-dagitim.webp",
    href:"/dijital-dagitim",
  },
  {
    no:"06",
    title:"Çeviri",
    traits:["Editoryal Çeviri","Yayın Dili","Uluslararası Hazırlık"],
    text:"Eserinizi hedef dile yalnızca çevirmiyor; yayın dili, editoryal akış ve uluslararası yayın hazırlığı açısından yeniden ele alıyoruz.",
    image:"/figan-hizmet-04-yabanci-dil.webp",
    href:"/yabanci-dil-ceviri",
  },
];

const process = [
  ["01","Başvuru ve Değerlendirme","Dosyanızı ve yayın hedefinizi birlikte değerlendiriyoruz."],
  ["02","Editörlük","Metni yayın standardına hazırlıyoruz."],
  ["03","Kapak ve Tasarım","Eserin görsel yayın kimliğini oluşturuyoruz."],
  ["04","Basım ve Fizikî Dağıtım","Bandrollü baskı ve uygun satış kanallarını planlıyoruz."],
  ["05","Dijital Yayın","E-kitap ve sesli kitabı yayına hazırlıyoruz."],
  ["06","Yazar Dünyası","Site, dağıtım ve görünürlüğü tek yapıda birleştiriyoruz."],
] as const;

type AuthorCard = {
  name: string;
  kicker: string;
  description: string;
  image: string | null;
  initials: string;
  href: string;
  published: boolean;
};

const authors: readonly AuthorCard[] = [
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
];

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
      <header className={`site-header home-overlay-header ${scrolled?"is-scrolled":""}`}>
        <div className="container header-inner">
          <a href="#top" className="brand brand-fi brand-logo-image" aria-label="22 Yayınevi ana sayfa"><Image src={BRAND_ASSETS.publisherLogo} alt="22 Yayınevi" width={420} height={140} priority /></a>
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

        <section className="homepage-image-hero" aria-label="22 Yayınevi 360 derece yayıncılık ekosistemi">
          <picture className="homepage-image-hero-picture">
            <source media="(max-width: 767px)" srcSet="/22-yayinevi-hero-mobile.png" />
            <img
              src="/22-yayinevi-hero-desktop.png"
              alt="22 Yayınevi - Basılı kitap, e-kitap, sesli kitap ve yazar sitesiyle 360 derece yayıncılık ekosistemi"
              fetchPriority="high"
              decoding="async"
            />
          </picture>

          <div className="homepage-hero-overlay">
            <div className="homepage-hero-positioning">
              <p className="homepage-hero-first">TÜRKİYE’NİN İLK VE TEK</p>
              <p className="homepage-hero-ecosystem">360° YAYINCILIK EKOSİSTEMİ</p>
            </div>
            <h1>
              <span>Bir yazar için</span>
              <em>her şey.</em>
            </h1>
            <h2>Tek çatı altında.</h2>
            <p className="homepage-hero-description">
              Kitabınızı, sesinizi, dijital dünyanızı ve dağıtımınızı tek bir yayın ekosisteminde birleştiriyoruz.
            </p>
            <div className="homepage-hero-actions">
              <a href="/kurucu-yazar" className="homepage-hero-primary">Yayın Yolculuğunu Başlat <b>→</b></a>
              <a href="#ekosistem" className="homepage-hero-text-link">Ekosistemi keşfet <b>↓</b></a>
            </div>
          </div>

          <div className="homepage-hero-service-band" aria-label="22 Yayınevi yayın hizmetleri">
            <a href="/yazar-sitesi" className="homepage-hero-service-item">
              <span className="homepage-hero-service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              </span>
              <span>Yazar Sitesi</span>
            </a>
            <a href="/e-kitap-yayini" className="homepage-hero-service-item">
              <span className="homepage-hero-service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M9 6h6M10 18h4"/></svg>
              </span>
              <span>E-Kitap</span>
            </a>
            <a href="/sesli-kitap" className="homepage-hero-service-item">
              <span className="homepage-hero-service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M5 12h2a2 2 0 0 1 2 2v5H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 1-2ZM19 12h-2a2 2 0 0 0-2 2v5h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-1-2Z"/></svg>
              </span>
              <span>Sesli Kitap</span>
            </a>
            <a href="/dijital-dagitim" className="homepage-hero-service-item">
              <span className="homepage-hero-service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 7.5 10 10M17 7.5 14 10M7 16.5 10 14M17 16.5 14 14"/></svg>
              </span>
              <span>Dijital Dağıtım</span>
            </a>
            <a href="/yabanci-dil-ceviri" className="homepage-hero-service-item">
              <span className="homepage-hero-service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3.5 12h17M12 3c2.2 2.4 3.4 5.4 3.4 9S14.2 18.6 12 21M12 3C9.8 5.4 8.6 8.4 8.6 12S9.8 18.6 12 21"/></svg>
              </span>
              <span>Çeviri</span>
            </a>
            <a href="/basili-kitap-yayini" className="homepage-hero-service-item">
              <span className="homepage-hero-service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M4 5.5c3.1-.8 5.7-.3 8 1.4v12c-2.3-1.7-4.9-2.2-8-1.4v-12ZM20 5.5c-3.1-.8-5.7-.3-8 1.4v12c2.3-1.7 4.9-2.2 8-1.4v-12Z"/></svg>
              </span>
              <span>Basılı Kitap</span>
            </a>
            <a href="/basili-kitap-yayini" className="homepage-hero-service-item">
              <span className="homepage-hero-service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>
              </span>
              <span>Fizikî Dağıtım</span>
            </a>
          </div>
        </section>


        <section className="homepage-vision-bridge" aria-label="22 Yayınevi kurucu vizyonu ve teknoloji yaklaşımı">
          <div className="homepage-vision-bridge-inner">
            <span className="homepage-vision-bridge-mark">22</span>
            <div className="homepage-vision-bridge-copy">
              <p>
                <strong>Figen Yavuz’un yayıncılık vizyonu</strong>
                <span> Naribo’nun tasarım, yazılım ve teknoloji gücüyle buluşuyor.</span>
              </p>
              <small>YAYINCILIK · TASARIM · TEKNOLOJİ</small>
            </div>
          </div>
        </section>

        <DigitalExperiences />

        <section className="homepage-author-bridge" aria-label="22 Yayınevi yayın yaklaşımı">
          <div className="homepage-author-bridge-inner">
            <div className="homepage-author-bridge-copy">
              <p className="homepage-author-bridge-eyebrow">22 YAYINEVİ</p>
              <h2>
                <span>Bir kitapla başlamaz.</span>
                <strong>Bir yazarla başlar.</strong>
              </h2>
              <p className="homepage-author-bridge-text">22 Yayınevi, eseri yalnızca yayımlamaz; yazarın dünyasını baştan sona kurar.</p>
            </div>
          </div>
        </section>

        <FounderAuthors />

        <section id="hizmetler" className="section services figan-services-showcase">
          <div className="container">
            <header className="figan-services-header">
              <h2>Tek kitap.<br/><strong>Bütün yayın dünyası.</strong></h2>
              <p className="figan-services-description">
                Bir yazarın ihtiyaç duyduğu yayıncılık adımlarını birbirinden kopuk hizmetler olarak değil, tek bir 360° ekosistemin parçaları olarak yönetiyoruz.
              </p>
            </header>

            <div className="figan-services-track" aria-label="22 Yayınevi yayın hizmetleri">
              {services.map((service) => (
                <article className="figan-service-card" key={service.no}>
                  <a className="figan-service-link" href={service.href}>
                    <div className="figan-service-photo">
                      <img src={service.image} alt="" loading="lazy" decoding="async" />
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

        <PublishingReels home />

        <section id="surec" className="section journey-duo">
          <div className="container journey-duo-grid">
            <article className="journey-card journey-card-process">
              <header className="journey-card-head">
                <p className="journey-kicker">22 YAYINEVİ · YAYIN SÜRECİ</p>
                <h2><span>Bir dosya.</span><em>Bir yayın yolculuğu.</em></h2>
                <p>Metinden yayına, bütün süreç tek sistemde ilerler.</p>
              </header>

              <div className="journey-process-list">
                {process.map(([no,title,text])=>(
                  <div className="journey-process-row" key={no}>
                    <span className="journey-process-no">{no}</span>
                    <div className="journey-process-copy">
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="/kurucu-yazar" className="journey-card-cta journey-card-cta-light">
                <span>Yayın Yolculuğunu Başlat</span><b>→</b>
              </a>
            </article>

            <article id="ekosistem" className="journey-card journey-card-ecosystem">
              <header className="journey-card-head journey-card-head-dark">
                <p className="journey-kicker">22 YAYINEVİ · EKOSİSTEM</p>
                <h2><span>Bir kitap.</span><em>Birden fazla yaşam.</em></h2>
                <p>Kitabınız basılı, dijital ve sesli dünyada birlikte yaşar; tek ekosistem içinde okura ulaşır.</p>
              </header>

              <div className="journey-ecosystem-grid" aria-label="22 Yayınevi ekosistemi">
                <span>Basılı Kitap</span>
                <span>E-Kitap</span>
                <span>Sesli Kitap</span>
                <span>Yazar Sitesi</span>
                <span>Türkiye Dağıtımı</span>
                <span>Global Yayın</span>
                <strong>22</strong>
              </div>

              <a href="/kurucu-yazar" className="journey-card-cta journey-card-cta-dark">
                <span>Kurucu Yazar Statüsünü İncele</span><b>→</b>
              </a>
            </article>
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
            <div className="author-visual"><img src="/figan-yazar-sitesi-laptop.webp" alt="22 Yayınevi yazar sitesi örneği" loading="lazy" decoding="async"/></div>
          </div>
        </section>

        



        <section id="yazarlar" className="section authors-section authors-showcase">
          <div className="container authors-showcase-wrap">
            <header className="authors-showcase-header">
              <p className="authors-showcase-eyebrow">YAZAR DÜNYAMIZ</p>
              <h2>Yazarlarımız.<br/><strong>Eserleriyle yaşayan bir dünya.</strong></h2>
              <p>Her yazar; kendi sesi, eserleri ve dijital dünyasıyla 22 Yayınevi vitrininin bir parçası.</p>
            </header>

            <div className="authors-showcase-panel" aria-label="22 Yayınevi yazarları">
              {authors.filter((author)=>author.published).map((author)=>(
                <article className="authors-showcase-card" key={author.name}>
                  <a
                    className="authors-showcase-hit"
                    href={author.href}
                    aria-label={`${author.name} yazar sayfasını görüntüle`}
                  >
                    <div className="authors-showcase-visual">
                      {author.image ? (
                        <img src={author.image} alt={author.name} loading="lazy" decoding="async"/>
                      ) : (
                        <div className="author-placeholder" aria-hidden="true">{author.initials}</div>
                      )}
                      <span className="authors-showcase-badge">22 YAYINEVİ YAZARI</span>
                    </div>

                    <div className="authors-showcase-copy">
                      <span className="authors-showcase-emblem" aria-hidden="true">✦</span>
                      <div className="authors-showcase-title-row">
                        <h3>{author.name}</h3>
                        <span aria-hidden="true">✦</span>
                      </div>
                      <p>{author.description}</p>
                      <div className="authors-showcase-meta">
                        <span>Yazar Profili</span>
                        <span>Eserler</span>
                        <span>Dijital Dünya</span>
                      </div>
                      <span className="authors-showcase-link">Yazarı Gör <b>→</b></span>
                    </div>
                  </a>
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
