import Image from "next/image";
import Link from "next/link";
import styles from "./DigitalExperiences.module.css";

const experiences = [
  {
    key: "reader",
    kicker: "E-KİTAP",
    title: "22 Reader",
    description: "Kitabınız, kendi okuma deneyimiyle zarif ve mobil uyumlu bir dijital esere dönüşür.",
    href: "/oku/bir-sifacinin-kanadi",
    cta: "Reader’ı İncele",
    image: "/ekosistem-reader.webp",
    alt: "22 Reader e-kitap arayüzü",
  },
  {
    key: "author",
    kicker: "YAZAR SİTESİ",
    title: "figenyavuz.com",
    description: "Yazarın portresi, kitapları ve dijital dünyası tek bir zarif mobil vitrinde buluşur.",
    href: "/yazarlar/figen-yavuz",
    cta: "Yazarı Keşfet",
    image: "/figen_yavuz_hero_mobile.png",
    alt: "Figen Yavuz mobil yazar sitesi hero",
  },
  {
    key: "audio",
    kicker: "SESLİ KİTAP",
    title: "22 Audio",
    description: "Sesli kitap deneyimi; bölüm yapısı, oynatma kontrolleri ve kaldığı yerden devam akışıyla sunulur.",
    href: "/dinle/bir-sifacinin-kanadi",
    cta: "Dinlemeyi Aç",
    image: "/ekosistem-audio.webp",
    alt: "22 Audio sesli kitap arayüzü",
  },
] as const;

export default function DigitalExperiences() {
  return (
    <section className={styles.section} aria-label="22 Yayınevi dijital deneyimleri">
      <div className={styles.heading}>
        <span>22 DIGITAL · DİJİTAL DENEYİMLER</span>
        <h2>Bir kitap artık yalnızca okunmaz.</h2>
        <p className={styles.subtitle}>Okunur. Dinlenir. Keşfedilir.</p>
        <p className={styles.intro}>
          Kitap yalnızca yayımlanmaz; okunur, dinlenir ve yazarın dünyasıyla birlikte yaşayan bir deneyime dönüşür.
        </p>
      </div>

      <div className={styles.stage} aria-label="22 Digital üçlü deneyim vitrini">
        {experiences.map((item, index) => (
          <article
            className={[
              styles.item,
              index === 0 ? styles.left : "",
              index === 1 ? styles.center : "",
              index === 2 ? styles.right : "",
            ].filter(Boolean).join(" ")}
            key={item.key}
          >
            <div className={styles.phoneArea}>
              <div className={styles.glow} aria-hidden="true" />
              <div className={styles.phone}>
                <div className={styles.island} aria-hidden="true" />
                <div className={styles.screen}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 767px) 72vw, (max-width: 1100px) 226px, 320px"
                    className={styles.screenImage}
                  />
                </div>
              </div>
            </div>

            <div className={styles.copy}>
              <p className={styles.kicker}>{item.kicker}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={item.href} className={styles.link}>
                {item.cta} <b aria-hidden="true">→</b>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.footerLine}>Bir kitap. Üç ayrı deneyim. Tek bir yazar dünyası.</p>
      <span className={styles.signature}>22 DIGITAL</span>
    </section>
  );
}
