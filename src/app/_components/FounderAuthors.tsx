import Image from "next/image";
import Link from "next/link";
import styles from "./FounderAuthors.module.css";

function CrownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 18h16l-1.5-9-4.5 4-2-6-2 6-4.5-4L4 18Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9h16v11H4zM12 9v11M4 13h16M6 9V7c0-1 .8-1.8 1.8-1.8 2 0 4.2 3.8 4.2 3.8s2.2-3.8 4.2-3.8C17.2 5.2 18 6 18 7v2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4h10l4 5-9 11L3 9l4-5ZM3 9h18M7 4l5 16L17 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

const highlights = [
  ["01", <CrownIcon key="crown" />, "Numaralı Statü", "01–22 arasında kalıcı sıra."],
  ["02", <GiftIcon key="gift" />, "Kurucu Koleksiyonu", "Sertifika, kart, ayraç ve mühür."],
  ["03", <DiamondIcon key="diamond" />, "%50 Hizmet Avantajı", "Basılı kitap hariç sonraki hizmetlerde."],
] as const;

export default function FounderAuthors() {
  return (
    <section className={styles.section} aria-labelledby="founder-title">
      <div className={styles.shell}>
        <div className={styles.main}>
          <div className={styles.copy}>
            <div className={styles.brandLine}>
              <span>22 YAYINEVİ</span>
              <i />
            </div>

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
              <p>Sertifika <i>—</i> Metal Kart <i>—</i> Metal Ayraç <i>—</i> Mühür</p>
            </div>

            <Link href="/kurucu-yazar" className={styles.cta}>
              Kurucu Yazar Koleksiyonunu Keşfet <b>→</b>
            </Link>
          </div>

          <div className={styles.visualColumn}>
            <div className={styles.visual}>
              <Image
                src="/22-yayinevi-kurucu-yazar-koleksiyon-yatay-v2.png"
                alt="22 Yayınevi İlk 22 Kurucu Yazar koleksiyonu"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
                className={styles.image}
              />

              <Image
                src="/muhur_koleksiyon_v1.png"
                alt="07/22 Kurucu Yazar mührü"
                width={180}
                height={180}
                className={styles.numberBadgeImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.strip}>
          {highlights.map(([no,icon,title,text]) => (
            <article key={no} className={styles.stripItem}>
              <span className={styles.stripNo}>{no}</span>
              <span className={styles.stripIcon}>{icon}</span>
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
