import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Yazar Sitesi",
  description: "Fi Yayınevi ile kitaplarınızı, biyografinizi ve okurla bağınızı tek bir profesyonel yazar sitesinde buluşturun.",
  alternates:{canonical:"/yazar-sitesi"},
};

export default function Page(){
  return <SeoServicePage eyebrow="YAZAR SİTESİ" title="Size ait kalıcı bir yazar dünyası kuralım." lead="Kitaplarınız, biyografiniz, yazılarınız ve duyurularınız sosyal medya akışında kaybolmadan size ait profesyonel bir dijital adreste buluşur." image="/figan-hizmet-yazar-sitesi.webp" bullets={["Size özel profesyonel yazar alanı","Mobil uyumlu ve kalıcı dijital adres","Kitap, biyografi ve içerik vitrini","Okurla doğrudan bağ kurabileceğiniz yapı"]}/>;
}