import Image from "next/image";
import Link from "next/link";
import styles from "./DigitalExperiences.module.css";

function PhoneShell({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <div className={`${styles.phone} ${className}`} aria-label={label}>
      <div className={styles.phoneRim} aria-hidden="true" />
      <div className={styles.island} aria-hidden="true" />
      <div className={styles.screen}>{children}</div>
    </div>
  );
}

export default function DigitalExperiences() {
  return (
    <section className={styles.section} aria-label="22 Yayınevi dijital deneyimleri">
      <div className={styles.head}>
        <p className={styles.eyebrow}><span />22 YAYINEVİ<span /></p>
        <h2>Dijital Deneyimler</h2>
        <p>Yazarın kitabı, sesi ve dijital dünyası tek bir yayın deneyiminde buluşuyor.</p>
        <div className={styles.ornament} aria-hidden="true"><span />✦<span /></div>
      </div>

      <div className={styles.scene}>
        <aside className={styles.sideCopy}>
          <p className={styles.sideKicker}>E-KİTAP</p>
          <h3>Kitabınız,<br />her zaman yanınızda.</h3>
          <p>
            22 Reader ile eseriniz sade, konforlu ve odaklanmayı destekleyen
            gerçek bir dijital okuma deneyimine dönüşür.
          </p>
          <ul>
            <li>Her cihazda pürüzsüz okuma</li>
            <li>Gece modu ve görünüm ayarları</li>
            <li>Kaldığı yerden devam</li>
          </ul>
          <Link href="/oku/bir-sifacinin-kanadi">E-Kitabı Keşfet <b>→</b></Link>
        </aside>

        <div className={styles.phoneColumn}>
          <PhoneShell className={styles.readerPhone} label="Bir Şifacının Kanadı 22 Reader">
            <iframe
              className={styles.readerFrame}
              src="/oku/bir-sifacinin-kanadi"
              title="Bir Şifacının Kanadı 22 Reader"
              loading="lazy"
              tabIndex={-1}
            />
          </PhoneShell>
          <div className={styles.phoneCaption}>
            <span>E-KİTAP</span>
            <strong>22 Reader</strong>
          </div>
        </div>

        <div className={`${styles.phoneColumn} ${styles.centerColumn}`}>
          <PhoneShell className={styles.authorPhone} label="Figen Yavuz mobil yazar sitesi">
            <Image
              src="/figen_yavuz_hero_mobile.png"
              alt="Figen Yavuz mobil yazar sitesi hero"
              fill
              sizes="310px"
              className={styles.authorImage}
            />
            <div className={styles.authorDomain}>figenyavuz.com</div>
          </PhoneShell>
          <div className={styles.phoneCaption}>
            <span>YAZAR SİTESİ</span>
            <strong>figenyavuz.com</strong>
          </div>
        </div>

        <div className={styles.phoneColumn}>
          <PhoneShell className={styles.audioPhone} label="Bir Şifacının Kanadı 22 Audio">
            <iframe
              className={styles.audioFrame}
              src="/dinle/bir-sifacinin-kanadi"
              title="Bir Şifacının Kanadı 22 Audio"
              loading="lazy"
              tabIndex={-1}
            />
          </PhoneShell>
          <div className={styles.phoneCaption}>
            <span>SESLİ KİTAP</span>
            <strong>22 Audio</strong>
          </div>
        </div>

        <aside className={`${styles.sideCopy} ${styles.sideCopyRight}`}>
          <p className={styles.sideKicker}>SESLİ KİTAP</p>
          <h3>Kitabınız,<br />artık dinleniyor.</h3>
          <p>
            22 Audio ile eseriniz güçlü bir dinleme deneyimine dönüşür;
            bölüm yapısı, hız, uyku modu ve devam özelliği tek yerde buluşur.
          </p>
          <ul>
            <li>Bölümlü profesyonel dinleme</li>
            <li>Hız ve uyku kontrolleri</li>
            <li>Kaldığı yerden devam</li>
          </ul>
          <Link href="/dinle/bir-sifacinin-kanadi">Sesli Kitabı Keşfet <b>→</b></Link>
        </aside>
      </div>

      <div className={styles.mobileActions}>
        <Link href="/oku/bir-sifacinin-kanadi">E-Kitap <b>→</b></Link>
        <Link href="/yazarlar/figen-yavuz">Yazar Sitesi <b>→</b></Link>
        <Link href="/dinle/bir-sifacinin-kanadi">Sesli Kitap <b>→</b></Link>
      </div>
    </section>
  );
}
