import type { Metadata } from "next";
import SeoServicePage from "../_components/SeoServicePage";

export const metadata: Metadata = {
  title: "Yabancı Dil Çeviri ve Yayın Hazırlığı",
  description: "Fi Yayınevi ile eserinizi yabancı dilde yayın için editoryal çeviri ve yayın dili açısından hazırlayın.",
  alternates:{canonical:"/yabanci-dil-ceviri"},
};

export default function Page(){
  return <SeoServicePage eyebrow="YABANCI DİL" title="Eserinizi yeni dillere açalım." lead="Metninizi hedef dile yalnızca çevirmekle kalmıyor; editoryal akış, yayın dili ve uluslararası yayın hazırlığı açısından yeniden ele alıyoruz." image="/figan-hizmet-04-yabanci-dil.webp" bullets={["Editoryal çeviri planlaması","Yayın diline uygun metin düzeni","Terminoloji ve tutarlılık kontrolü","Yabancı dilde dijital yayın hazırlığı"]}/>;
}