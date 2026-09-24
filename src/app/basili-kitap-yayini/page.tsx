import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Basılı Kitap Yayını ve Dağıtım",
  description: "Fi Yayınevi ile kapak ve iç tasarım, bandrollü basım ve fizikî dağıtım süreçlerini tek yayın planında yönetin.",
  alternates:{canonical:"/basili-kitap-yayini"},
};

export default function Page(){
  return <SeoServicePage eyebrow="BASILI KİTAP YAYINI" title="Kitabınızı basıma ve dağıtıma hazırlayalım." lead="Kapak ve iç tasarımdan bandrollü basıma, fizikî satış ve dağıtım kanallarına kadar basılı yayın sürecini birlikte yürütüyoruz." image="/figan-hizmet-basili-kitap-yayini.webp" bullets={["Kapak ve iç sayfa tasarımı","Baskı öncesi dosya kontrolleri","Bandrollü basım süreci","Fizikî satış ve dağıtım kanallarına hazırlık"]}/>;
}