import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Sesli Kitap Yayını",
  description: "Fi Yayınevi ile seslendirme planı, kayıt, bölümleme, mastering ve platform hazırlığı dahil sesli kitap yayın sürecini yönetin.",
  alternates:{canonical:"/sesli-kitap"},
};

export default function Page(){
  return (
    <SeoServicePage
      editorialLayout
      eyebrow="SESLİ KİTAP"
      title="Hikâyeniz yalnızca okunsun değil, dinlensin."
      lead="Metninizi seslendirme yapısına hazırlıyor; anlatım tonu, kayıt düzeni, bölümleme ve mastering süreçlerini birlikte planlayarak profesyonel bir dinleme deneyimine dönüştürüyoruz."
      image="/figan-hizmet-sesli-kitap.webp"
      scopeTitle="Bir metinden,"
      scopeAccent="dinlenen bir esere."
      scopeStepTitles={["Metin Hazırlığı","Anlatım & Ses","Kayıt & Mastering","Platform Teslimi"]}
      audienceTitle="Eserini yalnızca okutmak değil,"
      audienceAccent="dinletmek isteyenler için."
      audienceIntro="Kitabını farklı bir yayın formatında okuruyla buluşturmak, profesyonel ses deneyimi oluşturmak ve sesli kitap platformlarına hazırlanmak isteyen yazarlar için."
      noteTitle="Sesli kitap, yalnızca metnin okunmuş hâli değildir."
      noteText="İyi bir sesli kitap; doğru anlatım tonu, bölüm ritmi, temiz kayıt ve dengeli mastering ile metnin duygusunu dinleyiciye taşıyan ayrı bir yayın deneyimidir."
      processTitle="Sesli kitap yolculuğu nasıl ilerler?"
      processStepTitles={["Metin analizi","Seslendirme planı","Kayıt ve mastering","Yayın paketi"]}
      outputTitles={["Bölümlenmiş ses dosyaları","Mastering çıktıları","Platforma hazır ses paketi"]}
      bullets={[
        "Metnin seslendirme ve bölüm yapısına hazırlanması",
        "Anlatım tonu ve seslendirme akışının planlanması",
        "Kayıt temizliği, düzenleme ve mastering hazırlığı",
        "Platformlara uygun bölümleme ve ses dosyası teslimi",
      ]}
      audience={[
        "Eserini dinleme formatında da okurla buluşturmak isteyen yazarlar",
        "Basılı veya e-kitap sürümüne sesli kitap eklemek isteyenler",
        "Uzun metinlerini bölüm bölüm profesyonel ses formatına hazırlatmak isteyenler",
      ]}
      process={[
        "Metin, bölüm süreleri ve anlatım yapısı açısından incelenir.",
        "Seslendirme tonu, tempo ve kayıt planı belirlenir.",
        "Kayıtlar düzenlenir; gürültü temizliği, seviye dengesi ve mastering işlemleri yapılır.",
        "Bölümler adlandırılır ve uygun platform formatlarına göre teslim paketi hazırlanır.",
      ]}
      outputs={[
        "Bölümlere ayrılmış düzenli ses dosyaları",
        "Dinleme seviyeleri dengelenmiş mastering çıktıları",
        "Sesli kitap platformlarına hazırlanmaya uygun yayın paketi",
      ]}
      faqs={[
        { q:"Kitabın tamamı tek dosya mı olur?", a:"Genellikle hayır. Bölüm yapısına göre ayrı ses dosyaları hazırlanması hem dinleme deneyimi hem de platform yönetimi açısından daha uygundur." },
        { q:"Seslendirme tonu nasıl belirlenir?", a:"Eserin türü, anlatıcı sesi, hedef dinleyici ve metnin ritmi birlikte değerlendirilerek uygun ton ve tempo planlanır." },
        { q:"Mastering ne işe yarar?", a:"Ses seviyelerinin tutarlı hale getirilmesi, gereksiz gürültülerin azaltılması ve dinleme deneyiminin daha dengeli olması için son ses düzenleme aşamasıdır." },
        { q:"Basılı kitap ve sesli kitap birlikte hazırlanabilir mi?", a:"Evet. Aynı eser için basılı, e-kitap ve sesli kitap sürümleri ortak bir yayın planı içinde ilerleyebilir." },
      ]}
    />
  );
}
