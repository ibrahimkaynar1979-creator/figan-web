import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Kitap Çevirisi ve Yayın Hazırlığı",
  description: "22 Yayınevi ile editoryal çeviri, terminoloji kontrolü, hedef dilde yayın dili ve yabancı dilde dijital yayın hazırlığını planlayın.",
  alternates: { canonical: "/yabanci-dil-ceviri" },
  openGraph: {
    type: "website",
    url: "/yabanci-dil-ceviri",
    title: "Kitap Çevirisi ve Yayın Hazırlığı | 22 Yayınevi",
    description: "22 Yayınevi ile editoryal çeviri, terminoloji kontrolü, hedef dilde yayın dili ve yabancı dilde dijital yayın hazırlığını planlayın.",
    images: [{ url: "/figan-hizmet-04-yabanci-dil.webp", alt: "Kitap Çevirisi ve Yayın Hazırlığı" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitap Çevirisi ve Yayın Hazırlığı | 22 Yayınevi",
    description: "22 Yayınevi ile editoryal çeviri, terminoloji kontrolü, hedef dilde yayın dili ve yabancı dilde dijital yayın hazırlığını planlayın.",
    images: ["/figan-hizmet-04-yabanci-dil.webp"],
  },
};

export default function Page(){
  return (
    <SeoServicePage
      editorialLayout
      eyebrow="ÇEVİRİ"
      title="Eseriniz yeni bir dilde de kendi sesini korusun."
      lead="Metninizi yalnızca çevirmiyor; anlatım tonu, terminoloji, kültürel bağlam ve hedef dilin doğal akışıyla birlikte ele alarak yayıma hazır yeni bir dil sürümüne dönüştürüyoruz."
      image="/figan-hizmet-04-yabanci-dil.webp"
      scopeTitle="Bir dilden,"
      scopeAccent="yeni bir okur dünyasına."
      scopeStepTitles={["Çeviri Planı","Editoryal Çeviri","Dil & Terminoloji","Yayın Hazırlığı"]}
      audienceTitle="Eserini yalnızca çevirmek değil,"
      audienceAccent="başka bir dilde yeniden yayımlamak isteyenler için."
      audienceIntro="Kitabını yeni okurlara açmak, anlatım sesini koruyarak başka bir dilde profesyonel bir yayın sürümü oluşturmak ve dijital yayına hazırlanmak isteyen yazarlar için."
      noteTitle="İyi çeviri, kelimeleri değil; eserin sesini taşır."
      noteText="Bir kitabın başka bir dilde aynı etkiyi yaratabilmesi için yalnızca anlamın değil, ritmin, tonun, kavramların ve kültürel bağlamın da korunması gerekir. Çeviriyi yayıncılık sürecinin bir parçası olarak ele alıyoruz."
      processTitle="Çeviri ve yayın süreci nasıl ilerler?"
      processStepTitles={["Kaynak metin analizi","Çeviri ve üslup planı","Editoryal dil kontrolü","Yayın dosyası hazırlığı"]}
      outputTitles={["Editoryal çeviri metni","Tutarlı dil ve terminoloji","Yayına hazır dil paketi"]}
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
