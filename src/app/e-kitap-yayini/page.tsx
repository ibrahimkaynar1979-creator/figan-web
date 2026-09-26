import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "E-Kitap Yayını",
  description: "22 Yayınevi ile EPUB hazırlığı, metadata düzeni, cihaz uyumluluğu ve dijital dağıtıma hazır e-kitap yayın sürecini yönetin.",
  alternates: { canonical: "/e-kitap-yayini" },
  openGraph: {
    type: "website",
    url: "/e-kitap-yayini",
    title: "E-Kitap Yayını | 22 Yayınevi",
    description: "22 Yayınevi ile EPUB hazırlığı, metadata düzeni, cihaz uyumluluğu ve dijital dağıtıma hazır e-kitap yayın sürecini yönetin.",
    images: [{ url: "/figan-hizmet-e-kitap.webp", alt: "E-Kitap Yayını" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Kitap Yayını | 22 Yayınevi",
    description: "22 Yayınevi ile EPUB hazırlığı, metadata düzeni, cihaz uyumluluğu ve dijital dağıtıma hazır e-kitap yayın sürecini yönetin.",
    images: ["/figan-hizmet-e-kitap.webp"],
  },
};

export default function Page(){
  return (
    <SeoServicePage
      editorialLayout
      eyebrow="E-KİTAP YAYINI"
      title="E-kitabınız, yalnızca PDF olmasın. Her ekranda doğru görünsün."
      lead="Eserinizi dijital okuma standartlarına göre hazırlıyor; EPUB yapısı, kapak, metadata ve cihaz uyumluluğunu birlikte ele alarak platformlara yüklemeye hazır bir yayın paketine dönüştürüyoruz."
      image="/figan-hizmet-e-kitap.webp"
      bullets={[
        "Kaynak dosyanın ve mevcut mizanpajın dijital yayın açısından kontrolü",
        "EPUB ve yeniden akışkan dijital format yapısının hazırlanması",
        "Dijital kapak, kitap bilgileri ve metadata düzeninin oluşturulması",
        "Mobil, tablet ve e-okuyucu kontrolleri tamamlanmış platforma hazır teslim",
      ]}
      audience={[
        "Basılı eserini dijital formatta da yayımlamak isteyen yazarlar",
        "EPUB standardına uygun profesyonel e-kitap dosyasına ihtiyaç duyanlar",
        "Eserini farklı ekran boyutlarında okunabilir hale getirmek isteyenler",
      ]}
      process={[
        "Kaynak dosya yapısı, bölüm başlıkları ve görseller kontrol edilir.",
        "Metin EPUB standardına uygun yeniden akışkan yapıya dönüştürülür.",
        "Metadata, kapak ve navigasyon yapısı hazırlanır.",
        "Farklı cihazlarda okuma kontrolleri yapılarak dağıtıma hazır dosya oluşturulur.",
      ]}
      outputs={[
        "Yayın standardına uygun EPUB dosyası",
        "Düzenlenmiş metadata ve dijital kapak paketi",
        "Mobil ve e-okuyucu kontrolleri tamamlanmış dağıtım dosyası",
      ]}
      faqs={[
        { q:"PDF doğrudan e-kitap olur mu?", a:"PDF sabit sayfa yapısına sahiptir. E-kitap için metnin çoğu durumda EPUB gibi yeniden akışkan bir formata hazırlanması daha doğru bir okuma deneyimi sağlar." },
        { q:"E-kitap telefonda ve tablette düzgün görünür mü?", a:"Dosya farklı ekran boyutlarına uyum sağlayacak şekilde hazırlanır ve mobil, tablet ve e-okuyucu görünümü kontrol edilir." },
        { q:"Metadata neden önemli?", a:"Kitap adı, yazar, açıklama, dil ve benzeri yayın bilgileri dijital platformların eseri doğru tanıması ve listelemesi için kullanılır." },
        { q:"Basılı kitapla e-kitap birlikte hazırlanabilir mi?", a:"Evet. Aynı eser için basılı ve dijital sürümler tek yayın planı içinde birlikte hazırlanabilir." },
      ]}
    />
  );
}
