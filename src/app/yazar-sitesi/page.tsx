import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Yazar Sitesi",
  description: "Fi Yayınevi ile biyografi, kitap vitrini, yazılar ve duyurular için mobil uyumlu, kalıcı ve profesyonel yazar sitesi oluşturun.",
  alternates:{canonical:"/yazar-sitesi"},
};

export default function Page(){
  return (
    <SeoServicePage
      eyebrow="YAZAR SİTESİ"
      title="Size ait kalıcı bir yazar dünyası kuralım."
      lead="Biyografinizi, kitaplarınızı, yazılarınızı ve duyurularınızı sosyal medya akışında kaybolmadan size ait profesyonel ve mobil uyumlu bir dijital adreste buluşturuyoruz."
      image="/figan-hizmet-yazar-sitesi.webp"
      bullets={[
        "Yazar kimliğine özel mobil uyumlu web tasarımı",
        "Biyografi, kitaplar ve eser sayfaları için içerik yapısı",
        "Yazılar, duyurular ve etkinlikler için kalıcı yayın alanı",
        "Okurun sizi ve eserlerinizi kolayca keşfedebileceği yapı",
      ]}
      audience={[
        "Kendi adıyla profesyonel bir dijital varlık oluşturmak isteyen yazarlar",
        "Kitaplarını tek bir kalıcı adreste toplamak isteyenler",
        "Sosyal medya dışında bağımsız ve kontrol edilebilir bir yayın alanı isteyenler",
      ]}
      process={[
        "Yazar kimliği, eserler ve içerik ihtiyaçları birlikte belirlenir.",
        "Site haritası, sayfa yapısı ve görsel yayın dili oluşturulur.",
        "Biyografi, kitaplar ve içerikler mobil uyumlu sayfalara yerleştirilir.",
        "Son kontroller sonrası site yayına alınır ve yeni içerik eklemeye hazır hale getirilir.",
      ]}
      outputs={[
        "Mobil uyumlu profesyonel yazar sitesi",
        "Biyografi, kitap ve içerik sayfalarından oluşan kalıcı dijital alan",
        "Yeni eser ve duyurularla büyütülebilecek yayın altyapısı",
      ]}
      faqs={[
        { q:"Yazar sitesinde hangi sayfalar olabilir?", a:"Biyografi, kitaplar, eser detayları, yazılar, etkinlikler, basın/duyurular ve iletişim gibi bölümler ihtiyaca göre oluşturulabilir." },
        { q:"Site telefonda düzgün çalışır mı?", a:"Evet. Tasarım mobil, tablet ve masaüstü ekranlarda kullanılabilecek responsive yapı ile hazırlanır." },
        { q:"Yeni kitap çıktığında siteye eklenebilir mi?", a:"Evet. Yapı yeni eserlerin, yazıların ve duyuruların zaman içinde eklenebilmesine uygun olarak kurulabilir." },
        { q:"Sosyal medya varken neden ayrıca yazar sitesi gerekir?", a:"Yazar sitesi size ait kalıcı bir dijital merkez oluşturur; içerikleriniz bir sosyal ağın akışına veya algoritmasına bağlı kalmadan tek adreste toplanır." },
      ]}
    />
  );
}
