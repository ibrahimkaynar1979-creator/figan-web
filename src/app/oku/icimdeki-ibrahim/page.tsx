import type { Metadata } from "next";
import EbookReader from "../../_components/EbookReader";

export const metadata: Metadata = {
  title: "İçimdeki İbrahim | 22 Reader",
  description: "İçimdeki İbrahim – Âsaf Hâlet Çelebi’yi Ararken için 22 Yayınevi dijital okuma deneyimi.",
  robots: { index: false, follow: false },
};

export default function ReaderPage(){
  return <EbookReader />;
}
