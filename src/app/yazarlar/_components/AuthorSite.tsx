import Image from "next/image";
import styles from "./AuthorSite.module.css";
import type { AuthorProfile } from "../_data/authors";

function SectionNumber({ n, label }: { n: string; label: string }) {
  return <div className={styles.sectionNumber}><span>{n}</span><b>{label}</b></div>;
}

function BackgroundPicture({ desktop, mobile, alt = "" }: { desktop: string; mobile: string; alt?: string }) {
  return (
    <div className={styles.backgroundPicture} aria-hidden={alt ? undefined : true}>
      <Image className={styles.desktopImage} src={desktop} alt={alt} fill sizes="100vw" />
      <Image className={styles.mobileImage} src={mobile} alt={alt} fill sizes="100vw" />
    </div>
  );
}

export default function AuthorSite({ author }: { author: AuthorProfile }) {
  const featured = author.books[0];
  if (!featured) return null;

  return (
    <main className={styles.site}>
      <section className={styles.hero} id="ana-sayfa">
        <BackgroundPicture desktop={author.heroDesktop} mobile={author.heroMobile} alt={author.name} />
        <div className={styles.heroShade} />
        <header className={styles.header}>
          <a href="#ana-sayfa" className={styles.brand}>figenyavuz.com</a>
          <nav className={styles.nav} aria-label="Yazar sitesi">
            <a href="#ana-sayfa">Ana Sayfa</a>
            <a href="#hakkinda">Figen</a>
            <a href="#kitaplik">Kitaplar</a>
            <a href="#cizimler">Çizimler</a>
            <a href="#spirituel">Spiritüel Çalışmalar</a>
            <a href="#yazilar">Yazılar</a>
            <a href="#iletisim">İletişim</a>
          </nav>
          <a className={styles.mobileMenuButton} href="#mobile-menu" aria-label="Menüyü aç">
            <span /><span /><span />
          </a>
          <a className={styles.publisher} href="/" aria-label="22 Yayınevi">22</a>
        </header>

        <div className={styles.heroCopy}>
          <SectionNumber n="01" label="YAZAR" />
          <h1>{author.name}</h1>
          <blockquote className={styles.heroQuoteDesktop}>“{author.heroQuote}”</blockquote>
          <p className={styles.heroDescriptor}>{author.descriptor ?? author.role}</p>
          {author.affiliation && <p className={styles.heroAffiliation}>{author.affiliation}</p>}
        </div>

        <div className={styles.heroActions} aria-label="Kitap seçenekleri">
          {featured.readerUrl && <a className={styles.heroActionReader} href={featured.readerUrl}><span className={styles.heroActionIcon} aria-hidden="true">▣</span>E-Kitap Oku <span>→</span></a>}
          {featured.audioUrl && <a className={styles.heroActionAudio} href={featured.audioUrl}><span className={styles.heroActionIcon} aria-hidden="true">◉</span>Sesli Kitap Dinle <span>→</span></a>}
          {featured.purchaseUrl && <a className={styles.heroActionWorks} href={featured.purchaseUrl}><span className={styles.heroActionIcon} aria-hidden="true">▤</span>Eserlerini Keşfet <span>→</span></a>}
        </div>
        <a className={styles.scrollCue} href="#kitap">AŞAĞI KAYDIR <span>↓</span></a>
      </section>

      <section className={styles.bookSection} id="kitap">
        <div className={styles.bookInner}>
          <div className={styles.bookCopy}>
            <SectionNumber n="02" label="SON KİTAP" />
            <span className={styles.bookKicker}>BİR ŞİFACININ KANADI</span>
            <h2>{featured.title}</h2>
            <p className={styles.bookSubtitle}>{featured.subtitle}</p>
            <p className={styles.bookQuote}>{featured.quote}</p>
            <div className={styles.actions}>
              {featured.purchaseUrl && <a className={styles.primaryAction} href={featured.purchaseUrl}><span className={styles.actionIcon}>↗</span> Satın Al <b>→</b></a>}
              {featured.readerUrl && <a href={featured.readerUrl}><span className={styles.actionIcon}>▣</span> E-Kitap Oku <b>→</b></a>}
              {featured.audioUrl && <a href={featured.audioUrl}><span className={styles.actionIcon}>◉</span> Sesli Kitap Dinle <b>→</b></a>}
            </div>
          </div>

          <div className={styles.bookVisual}>
            <div className={styles.bookHalo} aria-hidden="true" />
            <Image src={featured.mockup} alt={featured.title} width={1100} height={1400} sizes="(max-width: 800px) 88vw, 45vw" priority />
          </div>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <BackgroundPicture desktop={author.quoteSection.desktop} mobile={author.quoteSection.mobile} />
        <div className={styles.sceneShade} />
        <div className={styles.sceneCopy}>
          <SectionNumber n="03" label="YAZARDAN" />
          <blockquote>“{author.quoteSection.quote}”</blockquote>
          <span>{author.name}</span>
        </div>
      </section>

      <section className={styles.experienceSection} id="oku">
        <BackgroundPicture desktop={author.readerSection.desktop} mobile={author.readerSection.mobile} />
        <div className={styles.sceneShadeSoft} />
        <div className={styles.experienceCard}>
          <p>{author.readerSection.eyebrow}</p>
          <h2>{author.readerSection.title}</h2>
          <span>{author.readerSection.text}</span>
          {featured.readerUrl && <a href={featured.readerUrl}>Şimdi Oku <b>→</b></a>}
        </div>
      </section>

      <section className={styles.experienceSection} id="dinle">
        <BackgroundPicture desktop={author.audioSection.desktop} mobile={author.audioSection.mobile} />
        <div className={styles.sceneShadeSoft} />
        <div className={styles.experienceCard}>
          <p>{author.audioSection.eyebrow}</p>
          <h2>{author.audioSection.title}</h2>
          <span>{author.audioSection.text}</span>
          {featured.audioUrl && <a href={featured.audioUrl}>Şimdi Dinle <b>→</b></a>}
        </div>
      </section>

      <section className={styles.aboutSection} id="hakkinda">
        <div className={styles.aboutPortrait}>
          {author.portrait && <Image src={author.portrait} alt={author.name} fill sizes="(max-width: 800px) 100vw, 50vw" />}
        </div>
        <div className={styles.aboutCopy}>
          <SectionNumber n="06" label="YAZARI TANIYIN" />
          <h2>{author.name}</h2>
          <p>{author.bio}</p>
          <a href="#yazilar">Hikâyemi Oku <span>→</span></a>
        </div>
      </section>

      <section className={styles.articlesSection} id="yazilar">
        <SectionNumber n="07" label="YAZARDAN" />
        <div className={styles.sectionHeading}>
          <h2>Seçilmiş yazılar</h2>
          <p>Yazardan notlar, denemeler ve kişisel metinler.</p>
        </div>
        <div className={styles.articles}>
          {(author.articles.length ? author.articles : [
            { title: "Yakında", excerpt: "Yazarın yeni metinleri bu alanda yer alacak.", href: "#" }
          ]).slice(0,3).map((article, index) => (
            <a key={article.title} href={article.href} className={styles.article}>
              <span>0{index + 1}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <b>→</b>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.librarySection} id="kitaplik">
        <SectionNumber n="08" label="KİTAPLIK" />
        <div className={styles.sectionHeading}>
          <h2>Kitaplar</h2>
          <p>Yeni eserler eklendikçe aynı yapı içinde büyüyen yazar kitaplığı.</p>
        </div>
        <div className={styles.library}>
          {author.books.map((book) => (
            <article key={book.slug} className={styles.libraryBook}>
              <div className={styles.libraryCover}>
                <Image src={book.mockup} alt={book.title} width={760} height={980} />
              </div>
              <div>
                <span>{book.year} · {book.genre}</span>
                <h3>{book.title}</h3>
                <p>{book.subtitle}</p>
                <div className={styles.libraryLinks}>
                  {book.purchaseUrl && <a href={book.purchaseUrl}>İncele</a>}
                  {book.readerUrl && <a href={book.readerUrl}>Oku</a>}
                  {book.audioUrl && <a href={book.audioUrl}>Dinle</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.eventsSection}>
        <SectionNumber n="09" label="ETKİNLİKLER + BÜLTEN" />
        <div className={styles.eventsGrid}>
          <div>
            <h2>{author.events.length ? "Yaklaşan buluşmalar" : "Yeni buluşmalardan haberdar olun."}</h2>
            {author.events.map((event) => (
              <a href={event.href || "#"} key={event.title + event.date} className={styles.event}>
                <time>{event.date}</time><strong>{event.title}</strong><span>{event.place}</span>
              </a>
            ))}
          </div>
          <form className={styles.newsletter}>
            <label htmlFor={`newsletter-${author.slug}`}>Yazardan yeni metinleri ve kitap haberlerini alın.</label>
            <div>
              <input id={`newsletter-${author.slug}`} type="email" placeholder="E-posta adresiniz" />
              <button type="submit">Katıl →</button>
            </div>
          </form>
        </div>
      </section>

      <section className={styles.menuPanel} id="mobile-menu">
        <div className={styles.menuPanelInner}>
          <div className={styles.menuPanelTop}><span className={styles.menuPanelLabel}>FIGEN YAVUZ</span><a className={styles.menuClose} href="#ana-sayfa" aria-label="Menüyü kapat">×</a></div>
          <a href="#ana-sayfa">Ana Sayfa</a>
          <a href="#hakkinda">Figen · Biyografi</a>
          <a href="#kitaplik">Kitaplar</a>
          <a href="#cizimler">Çizimler</a>
          <a href="#spirituel">Spiritüel Çalışmalar</a>
          <a href="#yazilar">Yazılar</a>
          <a href="#iletisim">İletişim</a>
        </div>
      </section>

      <footer className={styles.footer}>
        <SectionNumber n="10" label="FİNAL" />
        <h2>{author.name}</h2>
        <nav>
          <a href="#ana-sayfa">Ana Sayfa</a>
          <a href="#kitap">Kitap</a>
          <a href="#hakkinda">Hakkında</a>
          <a href="#yazilar">Yazılar</a>
          <a href="#kitaplik">Kitaplık</a>
        </nav>
        <div className={styles.footerBottom}>
          <span>Yayın dünyası 22 Yayınevi tarafından oluşturuldu.</span>
          <a href="/">22 Yayınevi</a>
        </div>
      </footer>
    </main>
  );
}
