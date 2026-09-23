import type { Metadata } from "next";
import FolioReader from "./FolioReader";

export const metadata: Metadata = {
  title: "Folio - İçimdeki İbrahim",
  description: "Mobil ve masaüstü sayfa çevirme deneyimi",
};

export default function FolioPage() {
  return <FolioReader />;
}
