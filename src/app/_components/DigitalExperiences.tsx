import Link from "next/link";
import styles from "./DigitalExperiences.module.css";

export default function DigitalExperiences() {
  return (
    <section className={styles.section} aria-label="22 Yayınevi dijital deneyimleri">
      <div className={styles.stage}>
        <img
          src="/22-yayinevi-dijital-deneyimler-3lu-telefon-vitrini-v1.png"
          alt="22 Yayınevi Reader, Figen Yavuz yazar sitesi ve 22 Audio üçlü dijital deneyim vitrini"
          className={styles.artwork}
          loading="lazy"
          decoding="async"
        />

        <div className={styles.topCopy}>
          <p className={styles.eyebrow}><span />22 YAYINEVİ<span /></p>
          <h2>Dijital Deneyimler</h2>
          <p className={styles.lead}>
            Yazarın kitabı, sesi ve dijital dünyası tek bir yayın deneyiminde buluşuyor.
          </p>
          <div className={styles.ornament} aria-hidden="true"><span />✦<span /></div>
        </div>

        <div className={styles.leftCopy}>
          <p className={styles.kicker}>E-KİTAP</p>
          <h3>Kitabınız,<br />her zaman yanınızda.</h3>
          <p>
            22 Reader ile kitaplarınız her yerde sizinle. Sade, konforlu ve
            odaklanmayı destekleyen bir okuma deneyimi.
          </p>
          <ul>
            <li>Her cihazda pürüzsüz okuma</li>
            <li>Gece modu ile rahat okuma</li>
            <li>Kaldığı yerden devam</li>
          </ul>
          <Link href="/oku/bir-sifacinin-kanadi">E-Kitabı Keşfet <b>→</b></Link>
        </div>

        <div className={styles.rightCopy}>
          <p className={styles.kicker}>SESLİ KİTAP</p>
          <h3>Kitabınız,<br />artık dinleniyor.</h3>
          <p>
            22 Audio ile eseriniz güçlü bir dinleme deneyimine dönüşür.
            Bölüm yapısı, hız, uyku modu ve devam özelliği tek yerde buluşur.
          </p>
          <ul>
            <li>Profesyonel dinleme deneyimi</li>
            <li>Hız ve uyku kontrolleri</li>
            <li>Kaldığı yerden devam</li>
          </ul>
          <Link href="/dinle/bir-sifacinin-kanadi">Sesli Kitabı Keşfet <b>→</b></Link>
        </div>

        <div className={styles.centerLink}>
          <Link href="/yazarlar/figen-yavuz">Yazarın Dünyasını Keşfet <b>→</b></Link>
        </div>
      </div>
    </section>
  );
}
