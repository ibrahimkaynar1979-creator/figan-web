import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Basılı Kitap Yayını ve Dağıtım",
  description: "Fi Yayınevi ile editörlük, mizanpaj, kapak tasarımı, ISBN ve bandrol hazırlığı, baskı ve fizikî dağıtım süreçlerini tek yayın planında yönetin.",
  alternates:{canonical:"/basili-kitap-yayini"},
};

export default function Page(){
  return (
    <SeoServicePage
      eyebrow="BASILI KİTAP YAYINI"
      title="Kitabınızı basıma ve dağıtıma hazırlayalım."
      lead="Metninizin editoryal hazırlığından mizanpaja, kapak tasarımından bandrollü basıma ve fizikî dağıtıma kadar basılı yayın sürecini tek plan içinde yürütüyoruz."
      image="/figan-hizmet-basili-kitap-yayini.webp"
      bullets={[
        "Editörlük, redaksiyon ve mizanpaj hazırlığı",
        "Kapak tasarımı ve baskı öncesi prova kontrolü",
        "ISBN ve bandrol sürecine uygun yayın hazırlığı",
        "Baskı adedi planlama, üretim ve fizikî dağıtım hazırlığı",
      ]}
      audience={[
        "İlk kitabını profesyonel standartta yayımlamak isteyen yazarlar",
        "Mevcut dosyasını kapak, mizanpaj ve baskı açısından yeniden hazırlatmak isteyenler",
        "Basılı kitabını fizikî satış ve dağıtım kanallarına taşımayı planlayan yazarlar",
      ]}
      process={[
        "Dosya editoryal ve teknik açıdan incelenir; yayın planı oluşturulur.",
        "Metin düzenleme, mizanpaj ve kapak çalışmaları tamamlanır.",
        "Prova dosyası kontrol edilir; baskı, ISBN ve bandrol gereklilikleri planlanır.",
        "Onay sonrası baskı adedi netleştirilir ve fizikî dağıtım hazırlığı yapılır.",
      ]}
      outputs={[
        "Baskıya hazır iç blok ve kapak dosyaları",
        "Prova kontrolü tamamlanmış bandrollü basım hazırlığı",
        "Fizikî satış ve dağıtım süreci için hazırlanmış yayın paketi",
      ]}
      faqs={[
        { q:"Baskı adedi nasıl belirleniyor?", a:"Eserin hedef kitlesi, bütçe, satış planı ve dağıtım hedefi birlikte değerlendirilerek uygun ilk baskı adedi planlanır." },
        { q:"ISBN ve bandrol süreci nasıl ilerliyor?", a:"Eserin yayın bilgileri basım öncesinde düzenlenir; ISBN ve bandrol için gerekli yayın hazırlıkları süreç içinde planlanır." },
        { q:"Kapak ve mizanpaj hizmete dahil mi?", a:"Seçilen yayın kapsamına göre kapak tasarımı, iç sayfa mizanpajı ve baskı öncesi prova kontrolü aynı yayın planına dahil edilebilir." },
        { q:"Kitap dağıtıma hazır hale geliyor mu?", a:"Basım sonrası kitabın uygun fizikî satış ve dağıtım kanallarına hazırlanması yayın planının bir parçası olarak ele alınabilir." },
      ]}
    />
  );
}
