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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.22yayinevi.com/#organization",
  name: "22 Yayınevi",
  url: "https://www.22yayinevi.com",
  email: "info@22yayinevi.com",
  telephone: "+90 553 241 93 97",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Adalet Mah. Manas Blv. No:47/B, Folkart Towers A Kule, Kat:26 D:2601",
    addressLocality: "Bayraklı",
    addressRegion: "İzmir",
    addressCountry: "TR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90 553 241 93 97",
    contactType: "customer service",
    availableLanguage: ["tr"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.22yayinevi.com/#website",
  url: "https://www.22yayinevi.com",
  name: "22 Yayınevi",
  publisher: { "@id": "https://www.22yayinevi.com/#organization" },
  inLanguage: "tr-TR",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.22yayinevi.com"),
  title: {
    default: "22 Yayınevi | Basılı Kitap, E-Kitap, Sesli Kitap ve Yazar Sitesi",
    template: "%s | 22 Yayınevi",
  },
  description: "22 Yayınevi; editörlük, kapak ve tasarım, bandrollü basım, fizikî ve dijital dağıtım, e-kitap, sesli kitap, yabancı dil çeviri ve yazar sitesi hizmetlerini tek yayın dünyasında buluşturur.",
  keywords: [
    "22 Yayınevi",
    "kitap yayınlama",
    "kitap bastırma",
    "bandrollü basım",
    "fiziki kitap dağıtımı",
    "e-kitap yayını",
    "sesli kitap",
    "yazar sitesi",
    "dijital dağıtım",
    "yabancı dil çeviri",
    "İzmir yayınevi",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "22 Yayınevi",
    title: "22 Yayınevi | Bir kitabın ötesinde, bütün bir yayın dünyası",
    description: "Basılı kitaptan e-kitaba, sesli kitaptan yazar sitesine kadar tüm yayın yolculuğunuzu 22 Yayınevi ile tek çatı altında kurun.",
    images: [
      {
        url: "/figan-hero-mobile-cropped.webp",
        width: 1200,
        height: 630,
        alt: "22 Yayınevi yayın dünyası",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "22 Yayınevi | Bir kitabın ötesinde, bütün bir yayın dünyası",
    description: "Basılı ve dijital yayın, sesli kitap, yazar sitesi ve dağıtım hizmetleri.",
    images: ["/figan-hero-mobile-cropped.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${editorial.variable} ${poetic.variable} ${ui.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        {children}

        <nav className="mobile-dock" aria-label="Mobil alt menü">
          <a href="/"><span>⌂</span>Ana Sayfa</a>
          <a href="/#hizmetler"><span>▤</span>Hizmetler</a>
          <a href="/#yazarlar"><span>✒</span>Yazarlar</a>
          <a href="/#ekosistem"><span>▱</span>Kitaplar</a>
          <a href="/#basvuru"><span>○</span>İletişim</a>
        </nav>
      </body>
    </html>
  );
}
