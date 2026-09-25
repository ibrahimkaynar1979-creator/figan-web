import type { Metadata } from "next";
import InnerPageShell from "../_components/InnerPageShell";

export const metadata: Metadata = {
  title: "İlk 22 Kurucu Yazar Statüsü | 22 Yayınevi",
  description:
    "22 Yayınevi'nin ilk 22 yazarı için oluşturulan Kurucu Yazar Statüsü; kalıcı kurucu yazar vitrini, gelecek hizmetlerde %50 avantaj ve sınırlı kontenjan yapısıyla özel bir yayın modeli sunar.",
};

const whatsapp =
  "https://wa.me/905532419397?text=Merhaba%2C%2022%20Yay%C4%B1nevi%20%C4%B0lk%2022%20Kurucu%20Yazar%20Stat%C3%BCs%C3%BC%20i%C3%A7in%20ba%C5%9Fvurmak%20istiyorum.";

export default function KurucuYazarPage() {
  return (
    <InnerPageShell>
      <main className="founder-author-page">
        <section className="founder-author-hero">
          <div className="container">
            <div className="founder-author-hero-card">
              <p className="founder-author-kicker"><span /> SINIRLI STATÜ · İLK 22</p>
              <h1>
                İlk 22 yazar,<br />
                yalnızca yayımlanmayacak.<br />
                <em>22 Yayınevi&apos;nin kuruluş hikâyesinde yer alacak.</em>
              </h1>
              <p className="founder-author-lead">
                Kurucu Yazar Statüsü, 22 Yayınevi&apos;nin yayın dünyasına ilk katılan
                22 yazar için oluşturulan, daha sonra yeniden satın alınamayacak özel ve
                kalıcı bir statüdür.
              </p>
              <div className="founder-author-hero-actions">
                <a className="btn gold" href={whatsapp} target="_blank" rel="noreferrer">
                  İlk 22 Kurucu Yazar İçin Başvur <b>→</b>
                </a>
                <a className="founder-author-text-link" href="#detaylar">
                  Statünün detaylarını incele ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="detaylar" className="founder-author-section">
          <div className="container">
            <div className="founder-author-card">
              <p className="founder-author-kicker"><span /> KURUCU YAZAR STATÜSÜ</p>
              <h2>İlk 22&apos;ye ait, bir daha tekrarlanmayacak bir yayın statüsü.</h2>
              <p className="founder-author-intro">
                Bu statü bir kampanya etiketi değil; 22 Yayınevi&apos;nin kuruluş döneminde
                yer alan ilk 22 yazarın yayın hayatı boyunca taşıyacağı özel bir konumdur.
              </p>

              <div className="founder-author-benefits">
                <article>
                  <span>01</span>
                  <div>
                    <h3>Numaralı kurucu yazar vitrini</h3>
                    <p>
                      İlk 22 yazar, 22 Yayınevi ana sayfasında 01–22 arasında numaralandırılarak
                      “Kurucu Yazar” statüsüyle kalıcı biçimde yer alır.
                    </p>
                  </div>
                </article>
                <article>
                  <span>02</span>
                  <div>
                    <h3>Gelecek hizmetlerde %50 avantaj</h3>
                    <p>
                      Kurucu Yazar Statüsü kazanan yazarlar, sonraki dönemlerde 22 Yayınevi&apos;nden
                      alacakları yayıncılık hizmetlerinden yayın hayatları boyunca %50 indirimli yararlanır.
                    </p>
                  </div>
                </article>
                <article>
                  <span>03</span>
                  <div>
                    <h3>Yalnızca ilk 22 yazar</h3>
                    <p>
                      Kontenjan 22 yazarla sınırlıdır. İlk 22 tamamlandıktan sonra Kurucu Yazar
                      Statüsü yeniden satışa açılmaz ve sonradan satın alınamaz.
                    </p>
                  </div>
                </article>
                <article>
                  <span>04</span>
                  <div>
                    <h3>Kalıcı bir yayın kimliği</h3>
                    <p>
                      Statü, yalnızca ilk yayına değil; yazarın 22 Yayınevi ile kurduğu uzun vadeli
                      yayın ilişkisine eşlik eden kalıcı bir tanımlamadır.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="founder-author-section">
          <div className="container">
            <div className="founder-author-card founder-author-note-card">
              <p className="founder-author-kicker"><span /> NEDEN 22?</p>
              <h2>Bir yayınevinin ilk yazarları, onun hafızasını oluşturur.</h2>
              <p>
                22 Yayınevi&apos;nin ilk 22 yazarı; yalnızca hizmet alan kişiler olarak değil,
                yayınevinin ilk yayın dönemini birlikte oluşturan isimler olarak konumlanır.
                Bu nedenle Kurucu Yazar Statüsü sayı ile sınırlandırılmıştır ve bir daha
                tekrarlanmayacaktır.
              </p>
            </div>
          </div>
        </section>

        <section className="founder-author-section">
          <div className="container">
            <div className="founder-author-card">
              <p className="founder-author-kicker"><span /> BAŞVURU SÜRECİ</p>
              <h2>Kurucu Yazar başvurusu nasıl ilerler?</h2>
              <div className="founder-author-steps">
                <article><span>01</span><div><h3>Dosyanızı paylaşın</h3><p>Eseriniz ve yayın hedefiniz hakkında temel bilgileri bize iletin.</p></div></article>
                <article><span>02</span><div><h3>Yayın değerlendirmesi</h3><p>Dosyanın kapsamı, hazırlık ihtiyacı ve yayın modeli birlikte değerlendirilir.</p></div></article>
                <article><span>03</span><div><h3>Yayın planı ve teklif</h3><p>Size uygun hizmet kapsamı, süreç ve teklif net biçimde paylaşılır.</p></div></article>
                <article><span>04</span><div><h3>Kurucu Yazar onayı</h3><p>Karşılıklı onay sonrasında ilgili sıra numarasıyla Kurucu Yazar Statüsü kesinleşir.</p></div></article>
              </div>
            </div>
          </div>
        </section>

        <section className="founder-author-section">
          <div className="container">
            <div className="founder-author-card">
              <p className="founder-author-kicker"><span /> ŞEFFAF BİLGİLENDİRME</p>
              <h2>İlk 22 tamamlandıktan sonra ne olacak?</h2>
              <p className="founder-author-intro">
                İlk 22 Kurucu Yazar kontenjanı tamamlandıktan sonra bu statü tekrar satın alınamayacaktır.
                23. yazardan 100. yazara kadar yayın hizmet bedelinin bugün için 44.444 TL seviyesinde
                planlanması öngörülmektedir. Bu tutar geleceğe yönelik bir planlamadır; güncel piyasa
                koşullarına göre artı veya eksi yönde değişebilir ve bugün için kesin fiyat taahhüdü değildir.
              </p>
            </div>
          </div>
        </section>

        <section className="founder-author-section">
          <div className="container">
            <div className="founder-author-card">
              <p className="founder-author-kicker"><span /> SIK SORULAN SORULAR</p>
              <h2>Kurucu Yazar Statüsü hakkında</h2>
              <div className="founder-author-faq">
                <details>
                  <summary>Başvuru yapmak statüyü otomatik olarak kazandırır mı?</summary>
                  <p>Hayır. Eser ve yayın planı değerlendirildikten ve karşılıklı onay sağlandıktan sonra statü kesinleşir.</p>
                </details>
                <details>
                  <summary>Kurucu Yazar kontenjanı kaç kişi?</summary>
                  <p>Yalnızca ilk 22 yazar. Kontenjan tamamlandığında statü kapanır.</p>
                </details>
                <details>
                  <summary>%50 avantaj hangi dönemde geçerli?</summary>
                  <p>Kurucu Yazar Statüsü kazanan yazarlar, 22 Yayınevi&apos;nden sonraki dönemlerde alacakları yayıncılık hizmetlerinden yayın hayatları boyunca %50 indirimli yararlanır.</p>
                </details>
                <details>
                  <summary>Statü daha sonra ayrıca satın alınabilir mi?</summary>
                  <p>Hayır. Kurucu Yazar Statüsü yalnızca ilk 22 yazar için tanımlanır ve kontenjan sonrasında yeniden satışa açılmaz.</p>
                </details>
              </div>
            </div>
          </div>
        </section>

        <section className="founder-author-final">
          <div className="container">
            <div className="final-panel">
              <p className="eyebrow light"><span /> İLK 22 KURUCU YAZAR</p>
              <h2>Dosyanız hazırsa,<br /><em>kuruluş hikâyesinde yerinizi alın.</em></h2>
              <p>Kurucu Yazar Statüsü için eserinizi ve yayın hedefinizi birlikte değerlendirelim.</p>
              <a className="btn gold" href={whatsapp} target="_blank" rel="noreferrer">
                Kurucu Yazar Başvurusu Yap <b>→</b>
              </a>
            </div>
          </div>
        </section>
      </main>
    </InnerPageShell>
  );
}
