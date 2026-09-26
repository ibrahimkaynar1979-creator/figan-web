import Image from "next/image";
import styles from "./FiFooter.module.css";

const whatsappMessage =
  "Merhaba, 22 Yayınevi web sitenizden geliyorum. Yayıncılık hizmetleriniz hakkında bilgi almak istiyorum.";

const whatsappUrl = `https://wa.me/905532419397?text=${encodeURIComponent(whatsappMessage)}`;

const publishingLinks = [
  { label: "Basılı Kitap Yayını", href: "/basili-kitap-yayini" },
  { label: "E-Kitap", href: "/e-kitap-yayini" },
  { label: "Sesli Kitap", href: "/sesli-kitap" },
  { label: "Yazar Sitesi", href: "/yazar-sitesi" },
  { label: "Dijital Dağıtım", href: "/dijital-dagitim" },
  { label: "Çeviri", href: "/yabanci-dil-ceviri" },
] as const;

const fiLinks = [
  { label: "Nasıl Çalışıyoruz?", href: "/#surec" },
  { label: "Yazarlarımız", href: "/#yazarlar" },
  { label: "22 Yayınevi Hakkında", href: "/#hakkimizda" },
  { label: "Yayın Alanlarımız", href: "/yayin-alanlarimiz" },
  { label: "İlk 22’ye Başvur", href: "/kurucu-yazar" },
] as const;

export default function FiFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.top}>
            <div className={styles.brandArea}>
              <a href="/" className={styles.brandLink} aria-label="22 Yayınevi ana sayfa">
                <Image src="/22_yayinevi_logo.png" alt="22 Yayınevi" width={360} height={260} sizes="(max-width: 700px) 150px, 180px" className={styles.footerBrandLogo} />
              </a>
              <p className={styles.brandLine}>Bir kitabın ötesinde, size ait bir yayın dünyası.</p>
            </div>

            <div className={styles.linksGrid}>
              <FooterColumn title="Yayın Dünyası">
                {publishingLinks.map((item) => (
                  <FooterLink key={item.href} href={item.href} label={item.label} />
                ))}
              </FooterColumn>

              <FooterColumn title="22 Yayınevi">
                {fiLinks.map((item) => (
                  <FooterLink key={item.href} href={item.href} label={item.label} />
                ))}
              </FooterColumn>

              <FooterColumn title="Bize Ulaşın">
                <a href="tel:+905324290290" className={styles.contactLink}>
                  <span className={styles.contactIcon} aria-hidden="true"><PhoneIcon /></span>
                  <span><strong>Ofis</strong> 0 532 4 290 290</span>
                </a>

                <a href="tel:+905532419397" className={styles.contactLink}>
                  <span className={styles.contactIcon} aria-hidden="true"><PhoneIcon /></span>
                  <span><strong>Mobil</strong> 0 553 241 93 97</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <span className={styles.contactIcon} aria-hidden="true"><WhatsAppIcon /></span>
                  <span>WhatsApp’tan Yazın</span>
                </a>

                <a href="mailto:info@22yayinevi.com" className={styles.contactLink}>
                  <span className={styles.contactIcon} aria-hidden="true"><MailIcon /></span>
                  <span>info@22yayinevi.com</span>
                </a>

                <p className={styles.location}>
                  <span className={styles.contactIcon} aria-hidden="true"><LocationIcon /></span>
                  <span>Folkart Towers A Kule · Adalet Mah. Manas Blv. No:47/B · Kat:26 D:2601 · Bayraklı / İzmir</span>
                </p>
              </FooterColumn>
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true">
            <span />
            <FiMark />
            <span />
          </div>

          <div className={styles.bottom}>
            <div className={styles.naribo}>
              <span className={styles.nariboLabel}>Tasarım ve Yazılım</span>
              <div className={styles.nariboLink}>
                <img
                  src="/naribo-creative-agency.png"
                  alt="Naribo Creative Agency"
                  className={styles.nariboLogo}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className={styles.legalArea}>
              <p className={styles.copyright}>
                © {new Date().getFullYear()} 22 Yayınevi. Tüm hakları saklıdır.
              </p>

              <div className={styles.legalLinks}>
                <a href="/gizlilik">Gizlilik Politikası</a>
                <a href="/kvkk">KVKK</a>
                <a href="/kullanim-kosullari">Kullanım Koşulları</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.column}>
      <h2>{title}</h2>
      <span className={styles.columnAccent} aria-hidden="true" />
      <div className={styles.columnLinks}>{children}</div>
    </section>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className={styles.footerLink}>
      <span className={styles.fiBullet} aria-hidden="true">✦</span>
      <span>{label}</span>
    </a>
  );
}

function FiMark() {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="M50 14 58 42 86 50 58 58 50 86 42 58 14 50 42 42Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3 4 5c-2 2 1 8 5 12s10 7 12 5l2-3-5-3-2 2c-2-1-4-3-5-5l2-2-3-5-3-3Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 12a8 8 0 0 1-12 7l-4 1 1-4a8 8 0 1 1 15-4Z" />
      <path d="M9 8c1 4 3 6 7 7" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s6-5 6-11a6 6 0 1 0-12 0c0 6 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
}
