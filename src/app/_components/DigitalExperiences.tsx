import Link from "next/link";
import styles from "./DigitalExperiences.module.css";

function FeatureIcon({ type }: { type: "device" | "moon" | "bookmark" | "headphones" | "play" | "download" }) {
  if (type === "moon") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.2A8.2 8.2 0 0 1 8.8 4 8.8 8.8 0 1 0 20 15.2Z"/></svg>;
  }
  if (type === "bookmark") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5h12v15l-6-3.8-6 3.8z"/></svg>;
  }
  if (type === "headphones") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h4v6H6a2 2 0 0 1-2-2zM20 14h-4v6h2a2 2 0 0 0 2-2z"/></svg>;
  }
  if (type === "play") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m10 8 6 4-6 4z"/></svg>;
  }
  if (type === "download") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v10M8 10l4 4 4-4M5 19h14"/></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="3" width="10" height="18" rx="2"/><path d="M10 6h4M11 18h2"/></svg>;
}

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
            Yazarın kitabı, sesi ve dijital dünyası tek bir yayında buluşuyor.
          </p>
          <div className={styles.ornament} aria-hidden="true"><span />✦<span /></div>
        </div>

        <div className={styles.leftCopy}>
          <p className={styles.kicker}>E-KİTAP</p>
          <h3>Kitabınız,<br />okurunuzun hep yanında.</h3>
          <p>
            22 Reader ile eseriniz okurun cebinde, çantasında ve ekranında her an erişilebilir olur.
            Sade ve konforlu bir okuma deneyimiyle kitabınız okuruyla her yerde buluşur.
          </p>
          <div className={styles.features}>
            <div><i><FeatureIcon type="device" /></i><span>Her cihazda pürüzsüz okuma</span></div>
            <div><i><FeatureIcon type="moon" /></i><span>Gece modu ile rahat okuma</span></div>
            <div><i><FeatureIcon type="bookmark" /></i><span>Kişisel kütüphane ve yer imleri</span></div>
          </div>
          <Link href="/oku/bir-sifacinin-kanadi">E-Kitapları Keşfet <b>→</b></Link>
        </div>

        <div className={styles.rightCopy}>
          <p className={styles.kicker}>SESLİ KİTAP</p>
          <h3>Kitabınız,<br />artık dinleniyor.</h3>
          <p>
            22 Audio ile eserleriniz usta seslerden dinleniyor. Zengin anlatım,
            huzurlu bir dinleme deneyimi ve her an yanınızda olan ilham dolu içeriklerle,
            kitaplar şimdi sesinizle de hayat buluyor.
          </p>
          <div className={styles.features}>
            <div><i><FeatureIcon type="headphones" /></i><span>Profesyonel seslendirme</span></div>
            <div><i><FeatureIcon type="play" /></i><span>Arka planda dinleme</span></div>
            <div><i><FeatureIcon type="download" /></i><span>Çevrimdışı indir ve dinle</span></div>
          </div>
          <Link href="/dinle/bir-sifacinin-kanadi">Sesli Kitapları Keşfet <b>→</b></Link>
        </div>

        <div className={styles.centerLink}>
          <Link href="/yazarlar/figen-yavuz">Yazarın Dünyasını Keşfet <b>→</b></Link>
        </div>
      </div>
    </section>
  );
}
