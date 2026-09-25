import styles from "./FiFooter.module.css";

const whatsappHref =
  "https://wa.me/905532419397?text=Merhaba%2C%20Fi%20Yay%C4%B1nevi%20web%20sitesini%20inceledim.%20Yay%C4%B1nc%C4%B1l%C4%B1k%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

export default function FiFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        <div className={styles.brand}>
          <a href="#top" className={styles.logo} aria-label="Fi Yayınevi ana sayfa">
            <span>Fi</span>
            <small>YAYINEVİ</small>
          </a>
          <p>Bir kitabın ötesinde, size ait bir yayın dünyası.</p>
        </div>

        <div className={styles.links}>
          <section>
            <h2>Yayın Dünyası</h2>
            <a href="/basili-kitap-yayini">✦ <span>Basılı Kitap Yayını</span></a>
            <a href="/e-kitap-yayini">✦ <span>E-Kitap</span></a>
            <a href="/sesli-kitap">✦ <span>Sesli Kitap</span></a>
            <a href="/yazar-sitesi">✦ <span>Yazar Sitesi</span></a>
            <a href="/dijital-dagitim">✦ <span>Dijital Dağıtım</span></a>
          </section>

          <section>
            <h2>Fi</h2>
            <a href="#surec">✦ <span>Nasıl Çalışıyoruz?</span></a>
            <a href="#yazarlar">✦ <span>Yazarlarımız</span></a>
            <a href="#hakkimizda">✦ <span>Fi Hakkında</span></a>
            <a href="#basvuru">✦ <span>Yazar Başvurusu</span></a>
          </section>
        </div>

        <section className={styles.contact}>
          <h2>Bize Ulaşın</h2>
          <div className={styles.contactGrid}>
            <a href="tel:+905324290290"><b>☎</b><strong>Ofis</strong><span>0 532 4 290 290</span></a>
            <a href="tel:+905532419397"><b>☎</b><strong>Mobil</strong><span>0 553 241 93 97</span></a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer"><b>◉</b><span>WhatsApp’tan Yazın</span></a>
            <a href="mailto:info@fiyayinevi.com"><b>✉</b><span>info@fiyayinevi.com</span></a>
          </div>
          <p className={styles.address}>
            <b>⌖</b>
            <span>Folkart Towers A Kule · Adalet Mah. Manas Blv. No:47/B · Kat:26 D:2601 · Bayraklı / İzmir</span>
          </p>
        </section>

        <div className={styles.ornament} aria-hidden="true"><i/><span>✦</span><i/></div>

        <div className={styles.naribo}>
          <div className={styles.nariboLabel}><i/><span>TASARIM VE YAZILIM</span><i/></div>
          <img src="/naribo-creative-agency.png" alt="Naribo Creative Agency" />
        </div>

        <div className={styles.legal}>
          <p>© {new Date().getFullYear()} Fi Yayınevi. Tüm hakları saklıdır.</p>
          <div>
            <a href="/gizlilik">Gizlilik Politikası</a>
            <i/>
            <a href="/kvkk">KVKK</a>
            <i/>
            <a href="/kullanim-kosullari">Kullanım Koşulları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
