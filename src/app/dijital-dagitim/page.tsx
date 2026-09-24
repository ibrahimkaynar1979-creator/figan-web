import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Dijital Kitap Dağıtımı",
  description: "Fi Yayınevi ile e-kitabınızı uygun dijital yayın kanallarına ve platformlara taşıyın.",
  alternates:{canonical:"/dijital-dagitim"},
};

export default function Page(){
  return <SeoServicePage eyebrow="DİJİTAL DAĞITIM" title="Eserinizi daha fazla okura ulaştıralım." lead="Yayın dosyanızı uygun dijital satış ve okuma kanallarına hazırlıyor, dağıtım sürecini tek noktadan planlıyoruz." image="/figan-hizmet-dijital-dagitim.webp" bullets={["Platformlara uygun yayın dosyası kontrolü","Türkiye odaklı dijital dağıtım planı","Uygun global yayın kanallarına hazırlık","Yayın bilgilerinin tutarlı şekilde hazırlanması"]}/>;
}