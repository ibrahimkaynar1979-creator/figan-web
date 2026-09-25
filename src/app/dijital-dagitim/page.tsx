import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Dijital Kitap Dağıtımı",
  description: "22 Yayınevi ile e-kitabınızı metadata, platform gereklilikleri ve yayın dosyalarıyla dijital dağıtım kanallarına hazırlayın.",
  alternates:{canonical:"/dijital-dagitim"},
};

export default function Page(){
  return (
    <SeoServicePage
      editorialLayout
      eyebrow="DİJİTAL DAĞITIM"
      title="Kitabınız hazırsa, şimdi doğru kanallarda okuruyla buluşsun."
      lead="Yayın dosyalarınızı, kapak ve metadata bilgilerinizi platform standartlarına göre düzenliyor; kitabınızın Türkiye ve uygun global dijital kanallara hazırlanmasını tek bir dağıtım planı içinde yürütüyoruz."
      image="/figan-hizmet-dijital-dagitim.webp"
      scopeTitle="Hazır bir eserden,"
      scopeAccent="ulaşılabilir bir yayına."
      scopeStepTitles={["Dosya Kontrolü","Metadata & Kapak","Kanal Planı","Dağıtıma Hazırlık"]}
      audienceTitle="Kitabını yalnızca yayımlamak değil,"
      audienceAccent="okuruna ulaştırmak isteyenler için."
      audienceIntro="Eserini dijital satış ve okuma kanallarına taşımak, yayın bilgilerini doğru yapılandırmak ve yerel ya da global platformlarda görünür hâle getirmek isteyen yazarlar için."
      noteTitle="Bir kitabın yayımlanması, okura ulaştığında anlam kazanır."
      noteText="Dijital dağıtım yalnızca bir dosyayı platforma yüklemek değildir. Doğru dosya yapısı, tutarlı metadata, uygun kategori ve kanal seçimi kitabınızın dijital dünyada doğru biçimde yer almasının temelidir."
      processTitle="Dijital dağıtım nasıl ilerler?"
      processStepTitles={["Yayın dosyası analizi","Metadata ve kapak hazırlığı","Platform uyumluluğu","Dağıtım paketi"]}
      outputTitles={["Kontrol edilmiş yayın dosyaları","Hazır metadata paketi","Dağıtıma hazır yayın paketi"]}
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
