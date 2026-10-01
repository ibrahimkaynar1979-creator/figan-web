import Image from "next/image";
import Link from "next/link";
import styles from "./FounderAuthors.module.css";

const highlights = [
  ["01", "Numaralı Statü", "01–22 arasında kalıcı sıra."],
  ["02", "Kurucu Koleksiyonu", "Sertifika, kart, ayraç ve mühür."],
  ["03", "%50 Hizmet Avantajı", "Basılı kitap hariç sonraki hizmetlerde."],
] as const;

export default function FounderAuthors() {
  return (
    <section className={styles.section} aria-labelledby="founder-title">
      <div className={styles.shell}>
        <div className={styles.topLine}>
          <span>22 YAYINEVİ</span>
          <i />
          <span>İLK 22 KURUCU YAZAR</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.kicker}>KURUCU STATÜSÜ</p>

            <h2 id="founder-title">
              22 isim.
              <em>Bir kuruluş hikâyesi.</em>
            </h2>

            <p className={styles.statement}>Bu statü yalnızca bir kez verilir.</p>

            <p className={styles.lead}>
              İlk 22 yazar, 22 Yayınevi’nin kuruluş dönemine numaralı ve kalıcı
              bir statüyle dahil olur. Her kurucu yazar için hazırlanan koleksiyon,
              bu ayrıcalığı fiziksel bir hatıraya dönüştürür.
            </p>

            <div className={styles.collectionBlock}>
              <span>NUMARALI KOLEKSİYON</span>
              <p>Sertifika — Metal Kart — Metal Ayraç — Mühür</p>
            </div>

            <Link href="/kurucu-yazar" className={styles.cta}>
              Kurucu Yazar Koleksiyonunu Keşfet <b>→</b>
            </Link>
          </div>

          <div className={styles.visual}>
            <div className={styles.imageWrap}>
              <Image
                src="/22-yayinevi-kurucu-yazar-koleksiyon-v1.png"
                alt="22 Yayınevi İlk 22 Kurucu Yazar koleksiyonu"
                fill
                sizes="(max-width: 900px) 100vw, 64vw"
                className={styles.image}
              />

              <div className={styles.numberBadge}>
                <span>NO.</span>
                <strong>07 / 22</strong>
                <small>KURUCU YAZAR</small>
              </div>
            </div>

            <div className={styles.visualNote}>
              <span>İlk 22’ye özel</span>
              <strong>Sınırlı · Numaralı · Kalıcı</strong>
            </div>
          </div>
        </div>

        <div className={styles.strip}>
          {highlights.map(([no,title,text]) => (
            <article key={no} className={styles.stripItem}>
              <span className={styles.stripNo}>{no}</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
