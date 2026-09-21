import type { Metadata } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const editorial = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-editorial",
  weight: ["500", "600"],
  display: "swap",
});

const poetic = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  variable: "--font-poetic",
  style: ["normal", "italic"],
  weight: ["400", "500"],
  display: "swap",
});

const ui = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ui",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Figan Yayınevi | Bir kitabınız varsa, ona ait bir dünya kuralım",
  description: "E-kitap, sesli kitap, yazar sitesi, Figan Reader & Audio ve dijital dağıtım tek bir yayın dünyasında.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${editorial.variable} ${poetic.variable} ${ui.variable}`}>
      <body>{children}</body>
    </html>
  );
}
