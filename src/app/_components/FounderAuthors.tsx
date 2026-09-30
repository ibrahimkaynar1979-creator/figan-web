import Link from "next/link";
import styles from "./FounderAuthors.module.css";

const benefits = [
  {
    no: "01",
    title: "Numaralı Kurucu Statüsü",
    text: "İlk 22 yazar, 01–22 arasında numaralanan ve sonradan yeniden verilmeyen kalıcı Kurucu Yazar statüsüne sahip olur.",
  },
  {
    no: "02",
    title: "Özel Kurucu Yazar Seti",
    text: "Numaralı sertifika, özel baskı kitap, metal rozet, ex libris, kitap ayracı, kurucu kartı ve özel kutudan oluşan seçkin set.",
  },
  {
    no: "03",
    title: "Yayın Hayatı Boyunca Avantaj",
    text: "Kurucu Yazarlar, sonraki yayıncılık hizmetlerinde basılı kitap hariç %50 avantajdan yararlanır.",
  },
] as const;

export default function FounderAuthors() {
  return (
    <section className={styles.section} aria-labelledby="founder-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span />
            İLK 22 KURUCU YAZAR
          </p>

          <h2 id="founder-title">
            İlk 22’de
            <em>yerinizi alın.</em>
          </h2>

          <p className={styles.lead}>
            22 Yayınevi’nin kuruluş hikâyesine yalnızca kitabınızla değil,
            kalıcı bir kurucu statüsüyle dahil olun. Bu ayrıcalık yalnızca ilk
            22 yazara verilir ve daha sonra yeniden satışa açılmaz.
          </p>

          <div className={styles.actions}>
            <Link href="/kurucu-yazar" className={styles.primary}>
              Kurucu Yazar Statüsünü İncele <b>→</b>
            </Link>
            <span className={styles.limit}>22 kişiyle sınırlı</span>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.halo} />
          <div className={styles.seal}>
            <span>İLK</span>
            <strong>22</strong>
            <span>KURUCU YAZAR</span>
          </div>
          <p className={styles.signature}>22 YAYINEVİ</p>
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
    </section>
  );
}
