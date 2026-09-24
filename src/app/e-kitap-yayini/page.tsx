import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "E-Kitap Yayını",
  description: "Fi Yayınevi ile EPUB uyumlu e-kitap hazırlığı, mobil uyum ve dijital yayın sürecini tek noktadan yönetin.",
  alternates:{canonical:"/e-kitap-yayini"},
};

export default function Page(){
  return <SeoServicePage eyebrow="E-KİTAP YAYINI" title="Eserinizi profesyonel e-kitaba dönüştürelim." lead="Metninizi dijital okuma standartlarına göre hazırlıyor, farklı cihazlarda rahat okunabilecek yayın dosyasına dönüştürüyoruz." image="/figan-hizmet-e-kitap.webp" bullets={["EPUB ve dijital okuma uyumluluğu","Mobil, tablet ve e-okuyucu için okunabilir düzen","Yayın öncesi dosya ve içerik kontrolleri","Dijital dağıtıma hazır teslim süreci"]}/>;
}