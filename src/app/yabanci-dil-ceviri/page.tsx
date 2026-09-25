import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Yabancı Dil Çeviri ve Yayın Hazırlığı",
  description: "Fi Yayınevi ile editoryal çeviri, terminoloji kontrolü, hedef dilde yayın dili ve yabancı dilde dijital yayın hazırlığını planlayın.",
  alternates:{canonical:"/yabanci-dil-ceviri"},
};

export default function Page(){
  return (
    <SeoServicePage
      eyebrow="YABANCI DİL"
      title="Eserinizi yeni dillere açalım."
      lead="Metninizi yalnızca kelime kelime çevirmek yerine; editoryal akış, terminoloji, hedef dilin doğal kullanımı ve yayın standardı açısından yeniden ele alıyoruz."
      image="/figan-hizmet-04-yabanci-dil.webp"
      bullets={[
        "Hedef dil ve yayın amacı için çeviri planlaması",
        "Editoryal çeviri ve doğal yayın dili düzeni",
        "Terminoloji, isimler ve kavramlarda tutarlılık kontrolü",
        "Yabancı dilde dijital yayın dosyası hazırlığı",
      ]}
      audience={[
        "Eserini farklı bir dilde yayımlamayı planlayan yazarlar",
        "Kelime çevirisinin ötesinde editoryal yayın dili isteyenler",
        "Yabancı dil sürümünü dijital dağıtıma hazırlamak isteyenler",
      ]}
      process={[
        "Kaynak metin, hedef dil ve yayın amacı değerlendirilir.",
        "Terminoloji ve üslup tercihleri için çeviri çerçevesi oluşturulur.",
        "Çeviri editoryal akış ve doğal dil açısından gözden geçirilir.",
        "Son metin yabancı dilde yayın dosyasına ve dijital dağıtım hazırlığına aktarılır.",
      ]}
      outputs={[
        "Editoryal kontrolden geçmiş hedef dil metni",
        "Tutarlı terminoloji ve yayın dili standardı",
        "Yabancı dilde dijital yayına hazırlanabilecek metin paketi",
      ]}
      faqs={[
        { q:"Her metin aynı şekilde mi çevrilir?", a:"Hayır. Eser türü, anlatım biçimi, hedef dil ve hedef okur kitlesi çeviri yaklaşımını doğrudan etkiler." },
        { q:"Terminoloji kontrolü neden önemli?", a:"Karakter isimleri, özel kavramlar ve tekrar eden terimlerin eser boyunca tutarlı kullanılması metnin profesyonel görünümü için önemlidir." },
        { q:"Çeviri sonrası ayrıca editörlük yapılır mı?", a:"Yabancı dil metni yayın dili, akış ve doğal kullanım açısından editoryal kontrolden geçirilerek daha tutarlı hale getirilebilir." },
        { q:"Yabancı dil sürümü dijital yayına hazırlanabilir mi?", a:"Evet. Hedef dil metni tamamlandıktan sonra e-kitap ve dijital dağıtım hazırlıkları aynı yayın planına eklenebilir." },
      ]}
    />
  );
}
