import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Basılı Kitap Yayını ve Dağıtım",
  description: "22 Yayınevi ile editörlük, mizanpaj, kapak tasarımı, ISBN ve bandrol hazırlığı, baskı ve fizikî dağıtım süreçlerini tek yayın planında yönetin.",
  alternates: { canonical: "/basili-kitap-yayini" },
  openGraph: {
    type: "website",
    url: "/basili-kitap-yayini",
    title: "Basılı Kitap Yayını ve Dağıtım | 22 Yayınevi",
    description: "22 Yayınevi ile editörlük, mizanpaj, kapak tasarımı, ISBN ve bandrol hazırlığı, baskı ve fizikî dağıtım süreçlerini tek yayın planında yönetin.",
    images: [{ url: "/figan-hizmet-basili-kitap-yayini.webp", alt: "Basılı Kitap Yayını ve Dağıtım" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Basılı Kitap Yayını ve Dağıtım | 22 Yayınevi",
    description: "22 Yayınevi ile editörlük, mizanpaj, kapak tasarımı, ISBN ve bandrol hazırlığı, baskı ve fizikî dağıtım süreçlerini tek yayın planında yönetin.",
    images: ["/figan-hizmet-basili-kitap-yayini.webp"],
  },
};

export default function Page(){
  return (
    <SeoServicePage
      editorialLayout
      eyebrow="BASILI KİTAP YAYINI"
      title="Kitabınız yalnızca basılmasın. Okuruyla buluşsun."
      lead="Metninizin editoryal hazırlığını ve mevcut mizanpajınızı kontrol ediyor; kapak, ISBN, bandrol, prova, baskı ve fizikî dağıtım sürecini birlikte yürütüyor, kitabınızı satış ve dağıtım kanallarına hazır hâle getiriyoruz."
      image="/figan-hizmet-basili-kitap-yayini.webp"
      bullets={[
        "Editörlük kontrolü ve mevcut mizanpajın baskıya uygunluk kontrolü",
        "Kapak, prova ve baskı dosyalarının son kontrolü",
        "ISBN, bandrol ve baskı kayıtlarının yayın sürecine dahil edilmesi",
        "Baskı, üretim ve kitabın fizikî satış-dağıtım kanallarına çıkarılması",
      ]}
      audience={[
        "İlk kitabını profesyonel standartta yayımlamak isteyen yazarlar",
        "Mizanpajı mevcut olup kitabını profesyonel baskı ve dağıtım sürecine taşımak isteyenler",
        "Kitabını basılı olarak yayımlayıp satış ve dağıtım kanallarında yer almak isteyen yazarlar",
      ]}
      process={[
        "Dosya editoryal ve teknik açıdan incelenir; yayın planı oluşturulur.",
        "Mevcut mizanpaj kontrol edilir; gerekli editoryal, kapak ve baskı dosyası düzeltmeleri tamamlanır.",
        "Prova onaylanır; ISBN, bandrol ve baskı gereklilikleri tamamlanır.",
        "Onay sonrası kitap basılır ve belirlenen fizikî satış ve dağıtım kanallarına çıkarılır.",
      ]}
      outputs={[
        "Kontrolleri tamamlanmış iç blok, kapak ve prova dosyaları",
        "ISBN ve bandrol süreci tamamlanmış basılı kitap",
        "Satış ve dağıtım kanallarına hazır hâle getirilmiş kitap yayını",
      ]}
      faqs={[
        { q:"Baskı adedi nasıl belirleniyor?", a:"Eserin hedef kitlesi, bütçe, satış planı ve dağıtım hedefi birlikte değerlendirilerek uygun ilk baskı adedi planlanır." },
        { q:"ISBN ve bandrol süreci nasıl ilerliyor?", a:"Eserin yayın bilgileri basım öncesinde düzenlenir; ISBN ve bandrol için gerekli yayın hazırlıkları süreç içinde planlanır." },
        { q:"Mizanpajım hazırsa yeniden yapılır mı?", a:"Hayır. Mevcut mizanpajınız baskı standardı açısından kontrol edilir; yalnızca gerekli teknik veya editoryal düzeltmeler yapılır." },
        { q:"Kitap sadece basılıyor mu, dağıtıma da çıkıyor mu?", a:"Basım tamamlandıktan sonra kitap, yayın planında belirlenen uygun fizikî satış ve dağıtım kanallarına çıkarılacak şekilde hazırlanır ve sürece alınır." },
      ]}
    />
  );
}
