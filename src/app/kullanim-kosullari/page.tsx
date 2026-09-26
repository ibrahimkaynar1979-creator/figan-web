import PublishingReels from "../_components/PublishingReels";
export default function KullanimKosullariPage(){
  return (
    <main className="legal-page">\n      <PublishingReels />
      <div className="legal-page-inner">
        <a className="legal-back" href="/">← Ana sayfaya dön</a>
        <h1>Kullanım Koşulları</h1>
        <p>Bu web sitesini kullanarak aşağıdaki genel kullanım koşullarını kabul etmiş sayılırsınız.</p>
        <h2>Bilgilendirme amacı</h2>
        <p>Site içeriği 22 Yayınevi'nin yayıncılık hizmetleri hakkında genel bilgi vermek amacıyla hazırlanmıştır. Hizmet kapsamı, süre, ücret ve yayın koşulları başvuru sonrasında ayrıca netleştirilir.</p>
        <h2>İçerik ve fikrî haklar</h2>
        <p>Site üzerindeki marka, tasarım, metin, görsel ve diğer içerikler ilgili hak sahiplerine aittir. Yazılı izin olmadan ticari amaçla kopyalanamaz veya yeniden yayımlanamaz.</p>
        <h2>Yazar başvuruları</h2>
        <p>Dosya göndermek tek başına bir yayın sözleşmesi veya yayın taahhüdü oluşturmaz. Yayın kararı ve koşulları değerlendirme sonrasında ayrıca belirlenir.</p>
        <h2>İletişim</h2>
        <p>Sorularınız için <a href="mailto:info@22yayinevi.com">info@22yayinevi.com</a> adresinden bize ulaşabilirsiniz.</p>
      </div>
    </main>
  );
}