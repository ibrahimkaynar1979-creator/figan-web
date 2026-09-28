import p00 from "./content/p00";
import p01 from "./content/p01";
import p02 from "./content/p02";
import p03 from "./content/p03";
import p04 from "./content/p04";
import p05 from "./content/p05";
import p06 from "./content/p06";
import p07 from "./content/p07";
import p08 from "./content/p08";
import p09 from "./content/p09";
import p10 from "./content/p10";
import p11 from "./content/p11";
import p12 from "./content/p12";
import p13 from "./content/p13";
import p14 from "./content/p14";
import p15 from "./content/p15";
import p16 from "./content/p16";
import { bskEpubChapters } from "./book";

export type BskReaderSection = {
  title: string;
  paragraphs: readonly string[];
  epubHref: string;
};

const epubContentSections: BskReaderSection[] = [
  ...p00, ...p01, ...p02, ...p03, ...p04, ...p05, ...p06,
  ...p07, ...p08, ...p09, ...p10, ...p11, ...p12,
  ...p13, ...p14, ...p15, ...p16,
];

if (epubContentSections.length !== bskEpubChapters.length) {
  throw new Error(
    `EPUB bölüm sayısı uyuşmuyor: içerik=${epubContentSections.length}, nav=${bskEpubChapters.length}`
  );
}

export const bskEpubSections: BskReaderSection[] = epubContentSections.map((section, index) => {
  const nav = bskEpubChapters[index];

  if (section.title !== nav.title) {
    throw new Error(
      `EPUB başlık sırası uyuşmuyor (#${index + 1}): içerik="${section.title}", nav="${nav.title}"`
    );
  }

  if (section.epubHref !== nav.href) {
    throw new Error(
      `EPUB dosya yolu uyuşmuyor (#${index + 1}): içerik="${section.epubHref}", nav="${nav.href}"`
    );
  }

  return section;
});

export const bskLegacyReaderSections = bskEpubSections.filter(
  section => !["DEĞİŞİM", "ERDEM YOLCULUĞU"].includes(section.title)
);

export function legacyReaderIndexToEpubIndex(legacyIndex: number) {
  const legacySection = bskLegacyReaderSections[legacyIndex];
  if (!legacySection) return legacyIndex;
  return bskEpubSections.findIndex(section => section.epubHref === legacySection.epubHref);
}

export default bskEpubSections;
