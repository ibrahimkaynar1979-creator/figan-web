import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Dijital Kitap Dağıtımı",
  description: "Fi Yayınevi ile e-kitabınızı metadata, platform gereklilikleri ve yayın dosyalarıyla dijital dağıtım kanallarına hazırlayın.",
  alternates:{canonical:"/dijital-dagitim"},
};

export default function Page(){
  return (
    <SeoServicePage
      eyebrow="DİJİTAL DAĞITIM"
      title="Eserinizi daha fazla okura ulaştıralım."
      lead="Eserinizin yayın dosyalarını, metadata bilgilerini ve platform gerekliliklerini düzenleyerek Türkiye ve uygun global dijital kanallara hazırlanmasını planlıyoruz."
      image="/figan-hizmet-dijital-dagitim.webp"
      bullets={[
        "Platform standartlarına uygun yayın dosyası kontrolü",
        "Kitap adı, açıklama, kategori ve metadata düzeni",
        "Türkiye odaklı dijital yayın kanallarına hazırlık",
        "Uygun global platformlar için yayın paketi planlaması",
      ]}
      audience={[
        "E-kitabını dijital satış ve okuma kanallarına taşımak isteyen yazarlar",
        "Yayın bilgilerini platform standartlarına göre düzenlemek isteyenler",
        "Türkiye ve global dijital dağıtımı birlikte planlamak isteyenler",
      ]}
      process={[
        "Yayın dosyası ve metadata bilgileri kontrol edilir.",
        "Platformlara göre gerekli kapak, açıklama ve kategori bilgileri hazırlanır.",
        "Dosya formatları ve teknik gereklilikler uyumlu hale getirilir.",
        "Uygun dağıtım kanalları için yayın paketi ve yükleme planı oluşturulur.",
      ]}
      outputs={[
        "Platform gerekliliklerine göre kontrol edilmiş yayın dosyaları",
        "Tutarlı metadata, açıklama ve kategori bilgileri",
        "Dijital dağıtım kanallarına hazırlanmaya uygun yayın paketi",
      ]}
      faqs={[
        { q:"Dijital dağıtım için hangi dosya gerekir?", a:"Platforma göre gereklilik değişebilir; e-kitap tarafında çoğunlukla EPUB ve uygun kapak/metadata bilgileri temel yayın paketini oluşturur." },
        { q:"Türkiye ve global yayın aynı anda planlanabilir mi?", a:"Evet. Eserin diline, hak durumuna ve hedef kitlesine göre yerel ve global kanallar birlikte değerlendirilebilir." },
        { q:"Metadata neden dağıtımın parçası?", a:"Kitap adı, yazar, açıklama, kategori ve dil gibi bilgiler eserin platformlarda doğru listelenmesi ve bulunabilirliği için gereklidir." },
        { q:"Dağıtım için önce e-kitap hazırlığı gerekli mi?", a:"Dijital dağıtıma girecek eserin platformun istediği teknik formata hazırlanmış olması gerekir; gerekli format hazırlığı aynı yayın planında ele alınabilir." },
      ]}
    />
  );
}
