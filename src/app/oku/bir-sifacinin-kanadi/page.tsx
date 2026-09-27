import type { Metadata } from "next";
import BirSifacininKanadiReader from "../../_components/BirSifacininKanadiReader";

export const metadata: Metadata = {
  title: "Bir Şifacının Kanadı | Figen Yavuz | 22 Reader",
  description: "Figen Yavuz'un Bir Şifacının Kanadı kitabı için 22 Yayınevi dijital okuma deneyimi.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BirSifacininKanadiReader />;
}
