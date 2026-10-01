import Image from "next/image";
import Link from "next/link";
import styles from "./FounderAuthors.module.css";

const journey = [
  ["01", "edit", "Editörlük & Redaksiyon"],
  ["02", "layout", "Mizanpaj & İç Tasarım"],
  ["03", "cover", "Kapak Tasarımı"],
  ["04", "ebook", "E-Kitap"],
  ["05", "audio", "Sesli Kitap"],
  ["06", "site", "Yazar Sitesi"],
  ["07", "reader", "Reader / Audio"],
  ["08", "digital", "Dijital Dağıtım"],
  ["09", "print", "Basılı Kitap & Dağıtım"],
] as const;

function JourneyIcon({ type }: { type: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "edit") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 19h4l10-10-4-4L4 15v4Zm9-13 4 4M6 12l6 6" /></svg>;
  if (type === "layout") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="4" y="4" width="16" height="16" rx="2"/><path {...common} d="M8 8h8M8 12h8M8 16h5" /></svg>;
  if (type === "cover") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="5" y="4" width="14" height="16" rx="1.5"/><path {...common} d="M9 8h6M9 12h6M9 16h4" /></svg>;
  if (type === "ebook") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="7" y="3" width="10" height="18" rx="2"/><path {...common} d="M10 7h4M10 11h4M11 18h2" /></svg>;
  if (type === "audio") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 13v-2a8 8 0 0 1 16 0v2M4 13h3v6H5a1 1 0 0 1-1-1v-5Zm16 0h-3v6h2a1 1 0 0 0 1-1v-5Z" /></svg>;
  if (type === "site") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="3" y="5" width="18" height="14" rx="2"/><path {...common} d="M3 9h18M7 7h.01M10 7h.01" /></svg>;
  if (type === "reader") return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 6.5A3.5 3.5 0 0 1 7.5 3H11v16H7.5A3.5 3.5 0 0 0 4 22V6.5ZM20 6.5A3.5 3.5 0 0 0 16.5 3H13v16h3.5A3.5 3.5 0 0 1 20 22V6.5Z" /></svg>;
  if (type === "digital") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="12" r="8"/><path {...common} d="M4 12h16M12 4a12 12 0 0 1 0 16M12 4a12 12 0 0 0 0 16" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M3 7h12v10H3V7Zm12 4h3l3 3v3h-6v-6ZM7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" /></svg>;
}

const founderBenefits = [
  ["01", "Kalıcı Bir İmza", "Numaralı kurucu statüsü"],
  ["02", "Özel Koleksiyon", "Sertifika, kart, ayraç ve mühür"],
  ["03", "Sınırlı Sayıda", "Yalnızca ilk 22 yazar"],
] as const;

export default function FounderAuthors() {
  return (
    <section className={styles.section} aria-label="Kurucu Yazar ve Yayın Yolculuğu">
      <div className={styles.shell}>
        <article className={`${styles.panel} ${styles.founderPanel}`}>
          <div className={styles.founderTop}>
            <div className={styles.founderCopy}>
              <div className={styles.eyebrow}>
                <span>22 YAYINEVİ</span>
                <i />
              </div>

              <p className={styles.kicker}>İLK 22 KURUCU YAZAR</p>

              <h2>
                22 isim.
                <em>Bir kuruluş hikâyesi.</em>
              </h2>

              <p className={styles.statement}>Bu statü yalnızca bir kez verilir.</p>

              <p className={styles.lead}>
                Kuruluş dönemine numaralı ve kalıcı bir statüyle dahil olun;
                bu ayrıcalığı size özel hazırlanan koleksiyonla yaşatın.
              </p>

              <div className={styles.collectionLine}>
                Sertifika <span>·</span> Metal Kart <span>·</span> Metal Ayraç <span>·</span> Mühür
              </div>

              <Link href="/kurucu-yazar" className={styles.darkCta}>
                Koleksiyonu Keşfet <b>→</b>
              </Link>
            </div>

            <div className={styles.founderVisual}>
              <Image
                src="/22-yayinevi-kurucu-yazar-koleksiyon-yatay-v2.png"
                alt="22 Yayınevi İlk 22 Kurucu Yazar koleksiyonu"
                fill
                sizes="(max-width: 980px) 100vw, 28vw"
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
              <div className={styles.founderBenefit} key={no}>
                <span>{no}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={`${styles.panel} ${styles.journeyPanel}`}>
          <div className={styles.journeyTop}>
            <div className={styles.eyebrow}>
              <span>22 YAYINEVİ</span>
              <i />
            </div>

            <p className={styles.kicker}>YAYIN YOLCULUĞU</p>

            <h2>
              Bir dosyadan,
              <em>yaşayan bir yayına.</em>
            </h2>

            <p className={styles.lead}>
              Editoryal hazırlıktan tasarıma, dijital yayından dağıtıma kadar
              eseriniz tek bir sistem içinde hayata geçirilir.
            </p>
          </div>

          <div className={styles.journeyRail} aria-label="Yayın süreci adımları">
            {journey.map(([no, type, title]) => (
              <div className={styles.journeyStep} key={no}>
                <div className={styles.iconDisc}>
                  <JourneyIcon type={type} />
                </div>
                <span className={styles.stepNo}>{no}</span>
                <strong>{title}</strong>
              </div>
            ))}
          </div>

          <div className={styles.journeyFooter}>
            <div className={styles.journeyMark}>
              <span>01</span>
              <b>→</b>
              <span>09</span>
            </div>

            <Link href="/surec" className={styles.lightCta}>
              Süreci Keşfet <b>→</b>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
