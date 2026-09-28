import p00 from "../bskPlain/p00";
import p01 from "../bskPlain/p01";
import p02 from "../bskPlain/p02";
import p03 from "../bskPlain/p03";
import p04 from "../bskPlain/p04";
import p05 from "../bskPlain/p05";
import p06 from "../bskPlain/p06";
import p07 from "../bskPlain/p07";
import p08 from "../bskPlain/p08";
import p09 from "../bskPlain/p09";
import p10 from "../bskPlain/p10";
import p11 from "../bskPlain/p11";
import p12 from "../bskPlain/p12";
import p13 from "../bskPlain/p13";
import p14 from "../bskPlain/p14";
import p15 from "../bskPlain/p15";
import p16 from "../bskPlain/p16";
import { bskEpubChapters } from "./book";

export type BskReaderSection = {
  title: string;
  paragraphs: readonly string[];
  epubHref: string;
};

const plainSections = [
  ...p00, ...p01, ...p02, ...p03, ...p04, ...p05, ...p06,
  ...p07, ...p08, ...p09, ...p10, ...p11, ...p12,
  ...p13, ...p14, ...p15, ...p16,
];

if (plainSections.length !== bskEpubChapters.length) {
  throw new Error(
    `EPUB bölüm sayısı uyuşmuyor: metin=${plainSections.length}, nav=${bskEpubChapters.length}`
  );
}

export const bskEpubSections: BskReaderSection[] = plainSections.map((section, index) => {
  const nav = bskEpubChapters[index];

  if (section.title !== nav.title) {
    throw new Error(
      `EPUB başlık sırası uyuşmuyor (#${index + 1}): metin="${section.title}", nav="${nav.title}"`
    );
  }

  return {
    ...section,
    epubHref: nav.href,
  };
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
