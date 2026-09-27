export type AuthorBook = {
  slug: string;
  title: string;
  subtitle: string;
  cover: string;
  year: string;
  genre: string;
  featured?: boolean;
  printUrl?: string;
  readerUrl?: string;
  audioUrl?: string;
  sampleUrl?: string;
  reader?: {
    chapterCount: number;
    estimatedReadTime: string;
    format: string;
  };
  audio?: {
    narrator: string;
    duration: string;
    chapters: number;
  };
};

export type AuthorArticle = {
  title: string;
  date: string;
  image?: string;
  href: string;
};

export type AuthorEvent = {
  title: string;
  date: string;
  place: string;
  type: string;
  href?: string;
};

export type AuthorProfile = {
  slug: string;
  name: string;
  domain?: string;
  role: string;
  heroImage: string;
  heroQuote: string;
  bio: string;
  portraitSecondary: string;
  books: AuthorBook[];
  articles: AuthorArticle[];
  events: AuthorEvent[];
};

export const authors: AuthorProfile[] = [
  {
    slug: "figen-yavuz",
    name: "Figen Yavuz",
    domain: "figenyavuz.com",
    role: "Yazar",
    heroImage: "/figan-hero-final.webp",
    heroQuote: "Bazı yolculuklar insanı kendine götürür.",
    bio: "Yazmak, benim için hayata yeniden bağ kurmanın bir yolu. İnsan hikâyelerini, iyileşmenin sessiz ama derin dönüşümünü ve içimizdeki gücü anlatmayı seviyorum.",
    portraitSecondary: "/figan-hero-final.webp",
    books: [
      {
        slug: "bir-sifacinin-kanadi",
        title: "Bir Şifacının Kanadı",
        subtitle: "İnsanın Kendine Dönüş Yolculuğu",
        cover: "/figen-yavuz-arayisin-yolculugu-mockup.webp",
        year: "2026",
        genre: "İçsel Yolculuk",
        featured: true,
        printUrl: "#satinal",
        readerUrl: "/oku/bir-sifacinin-kanadi",
        audioUrl: "/sesli-kitap",
        sampleUrl: "/oku/bir-sifacinin-kanadi",
        reader: {
          chapterCount: 83,
          estimatedReadTime: "~ 5 saat",
          format: "EPUB",
        },
        audio: {
          narrator: "Elif",
          duration: "2:21:17",
          chapters: 83,
        },
      },
    ],
    articles: [
      { title: "Bir kitabın doğduğu gece", date: "12 Mart 2026", href: "#" },
      { title: "Neden yazıyorum?", date: "05 Şubat 2026", href: "#" },
      { title: "İyileşmek hatırlamaktır", date: "21 Ocak 2026", href: "#" },
    ],
    events: [],
  },
];

export function getAuthor(slug: string) {
  return authors.find((author) => author.slug === slug);
}
