import Image from "next/image";
import Link from "next/link";
import styles from "./FounderAuthors.module.css";

const benefits = [
  {
    no: "01",
    title: "Numaralı Sertifika",
    text: "İlk 22 içinde kişiye özel sıra numarasıyla hazırlanan kurucu yazar sertifikası.",
  },
  {
    no: "02",
    title: "Metal Kurucu Kartı",
    text: "Yazar adına ve kurucu numarasına özel, kalıcı koleksiyon parçası.",
  },
  {
    no: "03",
    title: "Metal Ayraç & Mühür",
    text: "22 Yayınevi kimliğini taşıyan, kitabın dünyasına ait iki seçkin obje.",
  },
] as const;

export default function FounderAuthors() {
  return (
    <section className={styles.section} aria-labelledby="founder-title">
      <div className={styles.shell}>
        <div className={styles.mainGrid}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}><span />İLK 22 KURUCU YAZAR</p>

            <h2 id="founder-title">
              Yalnızca 22 isim.
              <em>Bir kez verilen bir statü.</em>
            </h2>

            <p className={styles.lead}>
              22 Yayınevi’nin ilk 22 yazarı, kuruluş hikâyesine numaralı ve kalıcı
              bir statüyle dahil olur. Her kurucu yazar için hazırlanan koleksiyon,
              bu ayrıcalığı fiziksel bir hatıraya dönüştürür.
            </p>

            <div className={styles.collectionLine}>
              <span>Sertifika</span>
              <i>·</i>
              <span>Metal Kart</span>
              <i>·</i>
              <span>Metal Ayraç</span>
              <i>·</i>
              <span>Mühür</span>
            </div>

            <div className={styles.actions}>
              <Link href="/kurucu-yazar" className={styles.primary}>
                Kurucu Yazar Statüsünü Keşfet <b>→</b>
              </Link>
              <span className={styles.note}>Sınırlı · Numaralı · Kalıcı</span>
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.imageFrame}>
              <Image
                src="/22-yayinevi-kurucu-yazar-koleksiyon-v1.png"
                alt="22 Yayınevi İlk 22 Kurucu Yazar koleksiyonu; sertifika, metal kart, metal ayraç, mühür ve premium koleksiyon kutusu"
                fill
                sizes="(max-width: 980px) 94vw, 48vw"
                className={styles.collectionImage}
              />
            </div>

            <div className={styles.imageCaption}>
              <span>KURUCU YAZAR KOLEKSİYONU</span>
              <strong>07 / 22</strong>
            </div>
          </div>
        </div>

        <div className={styles.benefits}>
          {benefits.map((item) => (
            <article key={item.no} className={styles.benefit}>
              <span className={styles.number}>{item.no}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
