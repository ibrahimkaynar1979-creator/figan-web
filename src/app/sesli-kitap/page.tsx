import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Sesli Kitap Yayını",
  description: "Fi Yayınevi ile metninizi profesyonel dinleme deneyimine dönüştürün; sesli kitap hazırlığı ve yayın sürecini planlayın.",
  alternates:{canonical:"/sesli-kitap"},
};

export default function Page(){
  return <SeoServicePage eyebrow="SESLİ KİTAP" title="Hikâyeniz ses bulsun." lead="Eserinizi doğal, anlaşılır ve yayın standartlarına uygun bir dinleme deneyimine dönüştürmek için sesli kitap sürecini planlıyoruz." image="/figan-hizmet-sesli-kitap.webp" bullets={["Metin ve bölüm yapısının sesli yayına hazırlanması","Doğal ve tutarlı dinleme deneyimi","Ses dosyalarının yayın formatına hazırlanması","Uygun sesli kitap platformları için yayın planı"]}/>;
}