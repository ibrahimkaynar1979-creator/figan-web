import Image from "next/image";
import Link from "next/link";
import styles from "./FounderAuthors.module.css";

const journey = [
  ["01", "edit", "Editörlük & Redaksiyon", "Metni yayına hazırlarız."],
  ["02", "layout", "Mizanpaj & İç Tasarım", "Sayfa düzenini profesyonelleştiririz."],
  ["03", "cover", "Kapak Tasarımı", "Eserin kimliğini görünür kılarız."],
  ["04", "ebook", "E-Kitap", "EPUB ve dijital okuma deneyimi."],
  ["05", "audio", "Sesli Kitap", "Eseri sese dönüştürürüz."],
  ["06", "site", "Yazar Sitesi", "Yazara ait dijital vitrin kurarız."],
  ["07", "reader", "Reader / Audio", "Okuma ve dinleme deneyimi."],
  ["08", "digital", "Dijital Dağıtım", "Dijital kanallara erişim sağlarız."],
  ["09", "print", "Basılı Kitap & Dağıtım", "Baskıdan okura uzanan fizikî süreç."],
] as const;

const founderBenefits = [
  ["01", "Numaralı Statü", "01–22 arasında kalıcı sıra"],
  ["02", "Kurucu Koleksiyonu", "Sertifika, kart, ayraç ve mühür"],
  ["03", "%50 Hizmet Avantajı", "Basılı kitap hariç sonraki hizmetlerde"],
] as const;

function JourneyIcon({ type }: { type: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "edit") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 19h4l10-10-4-4L4 15v4Zm9-13 4 4M6 12l6 6" /></svg>;
  if (type === "layout") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="4" y="4" width="16" height="16" rx="2"/><path {...common} d="M8 8h8M8 12h8M8 16h5" /></svg>;
  if (type === "cover") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="5" y="4" width="14" height="16" rx="1.5"/><path {...common} d="M9 8h6M9 12h6M9 16h4" /></svg>;
  if (type === "ebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="7" y="3" width="10" height="18" rx="2"/><path {...common} d="M10 7h4M10 11h4M11 18h2" /></svg>;
  if (type === "audio") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 13v-2a8 8 0 0 1 16 0v2M4 13h3v6H5a1 1 0 0 1-1-1v-5Zm16 0h-3v6h2a1 1 0 0 0 2-2v-5Z" /></svg>;
  if (type === "site") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="3" y="5" width="18" height="14" rx="2"/><path {...common} d="M3 9h18M7 7h.01M10 7h.01" /></svg>;
  if (type === "reader") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 6.5A3.5 3.5 0 0 1 7.5 3H11v16H7.5A3.5 3.5 0 0 0 4 22V6.5ZM20 6.5A3.5 3.5 0 0 0 16.5 3H13v16h3.5A3.5 3.5 0 0 1 20 22V6.5Z" /></svg>;
  if (type === "digital") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="12" r="8"/><path {...common} d="M4 12h16M12 4a12 12 0 0 1 0 16M12 4a12 12 0 0 0 0 16" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M3 7h12v10H3V7Zm12 4h3l3 3v3h-6v-6ZM7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" /></svg>;
}

export default function FounderAuthors() {
  return (
    <section className={styles.section} aria-label="Kurucu Yazar ve Yayın Yolculuğu">
      <div className={styles.shell}>
        <article className={styles.founderPanel}>
          <div className={styles.founderMain}>
            <div className={styles.founderCopy}>
              <p className={styles.eyebrow}>22 YAYINEVİ</p>
              <p className={styles.kicker}>İLK 22 KURUCU YAZAR</p>

              <h2>
                <span>22 isim.</span>
                <em>Bir kuruluş hikâyesi.</em>
              </h2>

              <p className={styles.statement}>Bu statü yalnızca bir kez verilir.</p>

              <p className={styles.lead}>
                Kuruluş dönemine numaralı ve kalıcı bir statüyle dahil olun.
                Size özel hazırlanan koleksiyon, bu ayrıcalığı fiziksel bir hatıraya dönüştürür.
              </p>

              <div className={styles.collectionLine}>
                Sertifika <span>·</span> Metal Kart <span>·</span> Metal Ayraç <span>·</span> Mühür
              </div>

              <Link href="/kurucu-yazar" className={styles.primaryCta}>
                Koleksiyonu Keşfet <b>→</b>
              </Link>
            </div>

            <div className={styles.founderVisual}>
              <Image
                src="/22-yayinevi-kurucu-yazar-koleksiyon-yatay-v2.png"
                alt="22 Yayınevi İlk 22 Kurucu Yazar koleksiyonu"
                fill
                sizes="(max-width: 1100px) 100vw, 29vw"
                className={styles.collectionImage}
                loading="eager"
              />
              <div className={styles.visualShade} />
              <Image
                src="/muhur_koleksiyon_v1.png"
                alt="07/22 Kurucu Yazar mührü"
                width={150}
                height={150}
                className={styles.seal}
              />
            </div>
          </div>

          <div className={styles.founderBenefits}>
            {founderBenefits.map(([no, title, text]) => (
              <div className={styles.benefit} key={no}>
                <span>{no}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.journeyPanel}>
          <header className={styles.journeyHeader}>
            <div>
              <p className={styles.eyebrow}>22 YAYINEVİ</p>
              <p className={styles.kicker}>YAYIN YOLCULUĞU</p>
              <h2>
                <span>Bir dosyadan,</span>
                <em>yaşayan bir yayına.</em>
              </h2>
            </div>
            <p className={styles.journeyIntro}>
              Editoryal hazırlıktan tasarıma, dijital yayından dağıtıma kadar
              eseriniz tek bir sistem içinde hayata geçirilir.
            </p>
          </header>

          <div className={styles.journeyGrid}>
            {journey.map(([no, type, title, text]) => (
              <div className={styles.journeyItem} key={no}>
                <div className={styles.iconDisc}><JourneyIcon type={type} /></div>
                <div className={styles.stepCopy}>
                  <span>{no}</span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.journeyFooter}>
            <span>01 — 09</span>
            <Link href="/surec">Süreci Keşfet <b>→</b></Link>
          </div>
        </article>
      </div>
    </section>
  );
}
