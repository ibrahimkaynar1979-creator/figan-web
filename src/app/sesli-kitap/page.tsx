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
      eyebrow="SESLİ KİTAP"
      title="Hikâyeniz ses bulsun."
      lead="Eserinizi seslendirme, bölümleme, kayıt düzeni ve mastering adımlarıyla profesyonel bir dinleme deneyimine dönüştürmek için sesli kitap sürecini planlıyoruz."
      image="/figan-hizmet-sesli-kitap.webp"
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
