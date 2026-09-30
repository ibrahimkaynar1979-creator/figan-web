import Link from "next/link";
import styles from "./FounderAuthors.module.css";

const benefits = [
  {
    no: "01",
    title: "Numaralı Statü",
    text: "İlk 22 içinde kalıcı sıra numarası.",
  },
  {
    no: "02",
    title: "Özel Kurucu Seti",
    text: "Sertifika, rozet, kart ve koleksiyon parçaları.",
  },
  {
    no: "03",
    title: "%50 Hizmet Avantajı",
    text: "Basılı kitap hariç sonraki yayıncılık hizmetlerinde.",
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
              22 Yayınevi’nin ilk 22 yazarı, kuruluş hikâyesine numaralı ve kalıcı bir
              statüyle dahil olur. Bu ayrıcalık daha sonra yeniden sunulmaz.
            </p>

            <div className={styles.actions}>
              <Link href="/kurucu-yazar" className={styles.primary}>
                Kurucu Yazar Statüsünü Keşfet <b>→</b>
              </Link>
              <span className={styles.note}>Sınırlı · Numaralı · Kalıcı</span>
            </div>
          </div>

          <div className={styles.collection} aria-hidden="true">
            <div className={styles.box}>
              <span>22 YAYINEVİ</span>
              <strong>KURUCU YAZAR</strong>
            </div>

            <div className={styles.certificate}>
              <p>22 YAYINEVİ</p>
              <span>KURUCU YAZAR SERTİFİKASI</span>
              <strong>07 / 22</strong>
              <small>NUMARALI · ÖZEL EDİSYON</small>
            </div>

            <div className={styles.memberCard}>
              <span>22</span>
              <strong>FOUNDER AUTHOR</strong>
              <small>07 / 22</small>
            </div>

            <div className={styles.bookmark}>
              <span>22</span>
            </div>

            <div className={styles.exlibris}>
              <span>EX LIBRIS</span>
              <strong>22</strong>
            </div>

            <div className={styles.waxSeal}>
              <span>İLK</span>
              <strong>22</strong>
              <span>KURUCU<br/>YAZAR</span>
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
