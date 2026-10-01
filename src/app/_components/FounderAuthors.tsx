import Image from "next/image";
import Link from "next/link";
import styles from "./FounderAuthors.module.css";

const journey = [
  ["01", "Başvuru"],
  ["02", "Editörlük"],
  ["03", "Tasarım"],
  ["04", "E-Kitap"],
  ["05", "Sesli Kitap"],
  ["06", "Dağıtım"],
] as const;

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
            {journey.map(([no, title], index) => (
              <div className={styles.journeyStep} key={no}>
                <span className={styles.stepNo}>{no}</span>
                <span className={styles.stepDot} />
                <strong>{title}</strong>
                {index < journey.length - 1 && <i className={styles.connector} />}
              </div>
            ))}
          </div>

          <div className={styles.journeyFooter}>
            <div className={styles.journeyMark}>
              <span>01</span>
              <b>→</b>
              <span>06</span>
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
