export type AuthorArticle = {
  title: string;
  excerpt: string;
  href: string;
};

export type AuthorEvent = {
  date: string;
  title: string;
  place: string;
  href?: string;
};

export type AuthorBook = {
  slug: string;
  title: string;
  subtitle: string;
  quote: string;
  mockup: string;
  year: string;
  genre: string;
  purchaseUrl?: string;
  readerUrl?: string;
  audioUrl?: string;
};

export type AuthorProfile = {
  slug: string;
  name: string;
  role: string;
  heroQuote: string;
  heroDesktop: string;
  heroMobile: string;
  quoteSection: {
    desktop: string;
    mobile: string;
    quote: string;
  };
  readerSection: {
    desktop: string;
    mobile: string;
    eyebrow: string;
    title: string;
    text: string;
  };
  audioSection: {
    desktop: string;
    mobile: string;
    eyebrow: string;
    title: string;
    text: string;
  };
  bio: string;
  portrait?: string;
  articles: AuthorArticle[];
  books: AuthorBook[];
  events: AuthorEvent[];
  socials?: {
    instagram?: string;
    youtube?: string;
    website?: string;
  };
};

export const authors: Record<string, AuthorProfile> = {
  "figen-yavuz": {
    slug: "figen-yavuz",
    name: "Figen Yavuz",
    role: "Yazar",
    heroQuote: "Bazı yolculuklar insanı kendine götürür.",
    heroDesktop: "/figen-yavuz-hero-desktop.png",
    heroMobile: "/figen-yavuz-hero-mobile.png",
    quoteSection: {
      desktop: "/figen-section2-bg-desktop.png",
      mobile: "/figen-section2-bg-mobile.png",
      quote: "Bazen en derin acılar en güzel kanatları büyütür.",
    },
    readerSection: {
      desktop: "/figen-section3-bg-desktop.png",
      mobile: "/figen-section3-bg-mobile.png",
      eyebrow: "04 · OKU",
      title: "Kitaptan bir bölüm",
      text: "Bir Şifacının Kanadı’nı 22 Reader’da kaldığınız yerden okumaya başlayın.",
    },
    audioSection: {
      desktop: "/figen-section4-bg-desktop.png",
      mobile: "/figen-section4-bg-mobile.png",
      eyebrow: "05 · DİNLE",
      title: "Sesli kitap deneyimi",
      text: "Bir Şifacının Kanadı’nı 22 Audio deneyimiyle dinleyin.",
    },
    bio: "Figen Yavuz, insanın kendine dönüşünü, içsel yolculuğu, farkındalığı ve dönüşümü merkeze alan metinler kaleme alır. Yazı dünyasında sezgi, anlam arayışı ve insanın kendi sesiyle yeniden buluşması öne çıkar.",
    portrait: "/figen-yavuz-hero-mobile.png",
    articles: [
      { title: "Bir kitabın doğduğu gece", excerpt: "Bir hikâyenin ilk cümlesinden kitaba dönüşmesine uzanan kişisel anlatı.", href: "#" },
      { title: "Neden yazıyorum?", excerpt: "Yazının, hatırlamanın ve kendine dönmenin iç içe geçtiği yer.", href: "#" },
      { title: "İyileşmek hatırlamaktır", excerpt: "İnsan bazen iyileşmek için yeni bir şey öğrenmez; unuttuğunu hatırlar.", href: "#" },
    ],
    books: [
      {
        slug: "bir-sifacinin-kanadi",
        title: "Bir Şifacının Kanadı",
        subtitle: "İnsanın Kendine Dönüş Yolculuğu",
        quote: "Bazen en derin acılar en güzel kanatları büyütür…",
        mockup: "/bir-sifacinin-kanadi-mockup.png",
        year: "2026",
        genre: "Kişisel Anlatı",
        purchaseUrl: "#kitaplik",
        readerUrl: "/oku/bir-sifacinin-kanadi",
        audioUrl: "/dinle/bir-sifacinin-kanadi",
      },
    ],
    events: [],
    socials: {},
  },

  "ibrahim-kaynar": {
    slug: "ibrahim-kaynar",
    name: "İbrahim Kaynar",
    role: "Yazar",
    heroQuote: "Bazı arayışlar bir yazarı değil, insanın kendisini bulmasına çıkar.",
    heroDesktop: "/figan-hero-ibrahim.webp",
    heroMobile: "/figan-hero-ibrahim.webp",
    quoteSection: {
      desktop: "/figan-hero-dark.webp",
      mobile: "/figan-hero-dark.webp",
      quote: "Bir adamı ararken bazen kendi sesinle karşılaşırsın.",
    },
    readerSection: {
      desktop: "/figan-hero-dark.webp",
      mobile: "/figan-hero-dark.webp",
      eyebrow: "04 · OKU",
      title: "Kitaptan bir bölüm",
      text: "İçimdeki İbrahim’i dijital yayın deneyiminde keşfedin.",
    },
    audioSection: {
      desktop: "/figan-hero-dark.webp",
      mobile: "/figan-hero-dark.webp",
      eyebrow: "05 · DİNLE",
      title: "Sesli kitap deneyimi",
      text: "Eserin sesli kitap sürümü hazır olduğunda bu alandan dinlenebilir.",
    },
    bio: "İbrahim Kaynar, edebiyat, şiir, hafıza ve yazarların hayatları üzerinden kişisel bir arayış kuran metinler kaleme alır.",
    portrait: "/figan-hero-ibrahim.webp",
    articles: [],
    books: [
      {
        slug: "icimdeki-ibrahim",
        title: "İçimdeki İbrahim",
        subtitle: "Âsaf Hâlet Çelebi’yi Ararken",
        quote: "Bir Adamı Aramak",
        mockup: "/icimdeki-ibrahim-mockup.png",
        year: "2026",
        genre: "Edebiyat",
        purchaseUrl: "/kitaplar/icimdeki-ibrahim",
        readerUrl: "/e-kitap-yayini",
        audioUrl: "/sesli-kitap",
      },
    ],
    events: [],
    socials: {},
  },
};

export function getAuthor(slug: string) {
  return authors[slug];
}
