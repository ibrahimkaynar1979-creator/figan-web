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
      editorialLayout
      eyebrow="YAZAR SİTESİ"
      title="Kitaplarınızın ötesinde, size ait bir yazar dünyası kuralım."
      lead="Biyografinizi, kitaplarınızı, yazılarınızı ve duyurularınızı sosyal medya akışında kaybolmadan size ait profesyonel ve mobil uyumlu bir dijital adreste buluşturuyoruz."
      image="/figan-hizmet-yazar-sitesi.webp"
      scopeTitle="Bir profilden,"
      scopeAccent="kalıcı bir yazar dünyasına."
      scopeStepTitles={["Yazar Kimliği","Kitap Vitrini","İçerik Alanı","Dijital Merkez"]}
      audienceTitle="Yalnızca sosyal medyada görünmek değil,"
      audienceAccent="kendine ait bir adres isteyenler için."
      audienceIntro="Yazar kimliğini, eserlerini ve güncel içeriklerini tek bir kalıcı dijital merkezde toplamak; okuruyla doğrudan ve profesyonel bir bağ kurmak isteyen yazarlar için."
      noteTitle="Sosyal medya akıp gider. Yazar sitesi kalır."
      noteText="Bir yazar sitesi yalnızca biyografi sayfası değildir. Kitaplarınızı, yazılarınızı, etkinliklerinizi ve yayın kimliğinizi size ait bir adreste bir araya getiren; zamanla sizinle birlikte büyüyen dijital yayın alanınızdır."
      processTitle="Yazar dünyanız nasıl kuruluyor?"
      processStepTitles={["Kimlik ve içerik analizi","Site mimarisi ve tasarım","İçerik yerleşimi","Yayın ve büyüme"]}
      outputTitles={["Profesyonel yazar sitesi","Kitap ve içerik vitrini","Büyüyebilir dijital altyapı"]}
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
