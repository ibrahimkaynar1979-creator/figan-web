import Image from "next/image";
import Link from "next/link";
import styles from "./FounderAuthors.module.css";

const highlights = [
  ["01", "Numaralı Statü"],
  ["02", "Kurucu Koleksiyonu"],
  ["03", "%50 Hizmet Avantajı"],
] as const;

export default function FounderAuthors() {
  return (
    <section className={styles.section} aria-labelledby="founder-title">
      <div className={styles.shell}>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}><span />İLK 22 KURUCU YAZAR</p>

            <h2 id="founder-title">
              22 isim.
              <em>Bir kuruluş hikâyesi.</em>
            </h2>

            <p className={styles.lead}>
              İlk 22 yazar, 22 Yayınevi’nin kuruluş dönemine numaralı ve kalıcı
              bir statüyle dahil olur. Her kurucu yazar için hazırlanan koleksiyon,
              bu ayrıcalığı fiziksel bir hatıraya dönüştürür.
            </p>

            <p className={styles.collectionLine}>
              Sertifika <span>·</span> Metal Kart <span>·</span> Metal Ayraç <span>·</span> Mühür
            </p>

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
                sizes="(max-width: 900px) 100vw, 62vw"
                className={styles.image}
              />
            </div>
          </div>
        </div>

        <div className={styles.strip}>
          {highlights.map(([no,title]) => (
            <div key={no} className={styles.stripItem}>
              <span>{no}</span>
              <strong>{title}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
