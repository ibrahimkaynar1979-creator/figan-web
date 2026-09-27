"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./EbookReader.module.css";
import p00 from "../_data/bskPlain/p00";
import p01 from "../_data/bskPlain/p01";
import p02 from "../_data/bskPlain/p02";
import p03 from "../_data/bskPlain/p03";
import p04 from "../_data/bskPlain/p04";
import p05 from "../_data/bskPlain/p05";
import p06 from "../_data/bskPlain/p06";
import p07 from "../_data/bskPlain/p07";
import p08 from "../_data/bskPlain/p08";
import p09 from "../_data/bskPlain/p09";
import p10 from "../_data/bskPlain/p10";
import p11 from "../_data/bskPlain/p11";
import p12 from "../_data/bskPlain/p12";
import p13 from "../_data/bskPlain/p13";
import p14 from "../_data/bskPlain/p14";
import p15 from "../_data/bskPlain/p15";
import p16 from "../_data/bskPlain/p16";

type Theme = "light" | "cream" | "dark";
type ReaderFont = "serif" | "sans" | "modern";
type TextAlign = "left" | "justify";
type Panel = "toc" | "appearance" | "notes" | "search" | "bookmarks" | "underlines" | null;
type Section = { title: string; paragraphs: readonly string[] };
type ReaderBookmark = { index: number; page: number };
type ReaderUnderline = { id: string; index: number; paragraph: number; start: number; end: number; page?: number };
type PendingUnderline = { segments: Omit<ReaderUnderline, "id">[]; x: number; y: number };
type ActiveUnderline = { id: string; x: number; y: number };

const sections: Section[] = [
  ...p00, ...p01, ...p02, ...p03, ...p04, ...p05, ...p06,
  ...p07, ...p08, ...p09, ...p10, ...p11, ...p12,
  ...p13, ...p14, ...p15, ...p16,
].filter(section => !["DEĞİŞİM", "ERDEM YOLCULUĞU"].includes(section.title))
 .map(section => section.title === "KAZANMAK DA VAR KAYBETMEK DE." ? { ...section, title: "KAZANMAK DA VAR KAYBETMEK" } : section);

const STORAGE = "22reader-bir-sifacinin-kanadi";
const READER_FONTS: Record<ReaderFont, string> = {
  serif: 'Georgia, "Times New Roman", serif',
  sans: 'Arial, Helvetica, sans-serif',
  modern: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif',
};

export default function BirSifacininKanadiReader() {
  const [index, setIndex] = useState(-1);
  const [theme, setTheme] = useState<Theme>("cream");
  const [fontSize, setFontSize] = useState(22);
  const [readerFont, setReaderFont] = useState<ReaderFont>("serif");
  const [textAlign, setTextAlign] = useState<TextAlign>("left");
  const [panel, setPanel] = useState<Panel>(null);
  const [bookmarks, setBookmarks] = useState<ReaderBookmark[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [underlines, setUnderlines] = useState<ReaderUnderline[]>([]);
  const [pendingUnderline, setPendingUnderline] = useState<PendingUnderline | null>(null);
  const [activeUnderline, setActiveUnderline] = useState<ActiveUnderline | null>(null);
  const [draft, setDraft] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tocQuery, setTocQuery] = useState("");
  const [chromeVisible, setChromeVisible] = useState(true);
  const [lineHeight, setLineHeight] = useState(1.68);
  const [pageMargin, setPageMargin] = useState(24);
  const [readerPage, setReaderPage] = useState(0);
  const [readerPageCount, setReaderPageCount] = useState(1);
  const [storageReady, setStorageReady] = useState(false);
  const [resumePosition, setResumePosition] = useState<{ index: number; page: number } | null>(null);
  const textWrapRef = useRef<HTMLDivElement | null>(null);
  const pendingReaderEdge = useRef<"start" | "end" | null>(null);
  const pendingReaderPage = useRef<number | null>(null);
  const pendingReaderFraction = useRef<number | null>(null);
  const pendingSearchParagraph = useRef<number | null>(null);
  const readerPageRef = useRef(0);
  const swipeStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    document.body.classList.add("reader-route");
    return () => document.body.classList.remove("reader-route");
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) {
      setStorageReady(true);
      return;
    }
    try {
      const saved = JSON.parse(raw);
      const savedIndex =
        typeof saved.lastReadingIndex === "number"
          ? saved.lastReadingIndex
          : saved.index;
      const savedPage =
        typeof saved.lastReaderPage === "number"
          ? saved.lastReaderPage
          : saved.readerPage;

      if (typeof savedIndex === "number" && savedIndex >= 0 && savedIndex < sections.length) {
        setIndex(savedIndex);
        setResumePosition({
          index: savedIndex,
          page: typeof savedPage === "number" && savedPage >= 0 ? Math.floor(savedPage) : 0,
        });
      }
      if (typeof savedPage === "number" && savedPage >= 0) {
        const restoredPage = Math.floor(savedPage);
        pendingReaderPage.current = restoredPage;
        readerPageRef.current = restoredPage;
        setReaderPage(restoredPage);
      }
      if (["light","cream","dark"].includes(saved.theme)) setTheme(saved.theme);
      if (typeof saved.fontSize === "number") setFontSize(saved.fontSize);
      if (["serif","sans","modern"].includes(saved.readerFont)) setReaderFont(saved.readerFont);
      if (["left","justify"].includes(saved.textAlign)) setTextAlign(saved.textAlign);
      if (typeof saved.lineHeight === "number") setLineHeight(saved.lineHeight);
      if (typeof saved.pageMargin === "number") setPageMargin(saved.pageMargin);
      if (Array.isArray(saved.bookmarks)) {
        const migratedBookmarks: ReaderBookmark[] = saved.bookmarks
          .map((item: unknown) => {
            if (typeof item === "number") return { index: item, page: 0 };
            if (
              item &&
              typeof item === "object" &&
              typeof (item as { index?: unknown }).index === "number" &&
              typeof (item as { page?: unknown }).page === "number"
            ) {
              return {
                index: Math.floor((item as { index: number }).index),
                page: Math.max(0, Math.floor((item as { page: number }).page)),
              };
            }
            return null;
          })
          .filter((item: ReaderBookmark | null): item is ReaderBookmark => item !== null);
        setBookmarks(migratedBookmarks);
      }
      if (saved.notes && typeof saved.notes === "object") {
        const migratedNotes: Record<string, string> = {};
        Object.entries(saved.notes as Record<string, unknown>).forEach(([key, value]) => {
          if (typeof value !== "string") return;
          migratedNotes[key.includes(":") ? key : key + ":0"] = value;
        });
        setNotes(migratedNotes);
      }
      if (Array.isArray(saved.underlines)) {
        const safeUnderlines = saved.underlines.filter((item: unknown): item is ReaderUnderline => {
          if (!item || typeof item !== "object") return false;
          const value = item as Partial<ReaderUnderline>;
          return (
            typeof value.id === "string" &&
            typeof value.index === "number" &&
            typeof value.paragraph === "number" &&
            typeof value.start === "number" &&
            typeof value.end === "number"
          );
        });
        setUnderlines(safeUnderlines);
      }
    } catch {}
    setStorageReady(true);
  }, []);

  useEffect(() => {
    readerPageRef.current = readerPage;
    if (index >= 0) {
      setResumePosition({ index, page: readerPage });
    }
  }, [index, readerPage]);

  useEffect(() => {
    if (!storageReady) return;

    let previous: Record<string, unknown> = {};
    try {
      previous = JSON.parse(localStorage.getItem(STORAGE) || "{}");
    } catch {}

    const next = {
      ...previous,
      index,
      readerPage,
      theme,
      fontSize,
      readerFont,
      textAlign,
      lineHeight,
      pageMargin,
      bookmarks,
      notes,
      underlines,
      ...(index >= 0
        ? { lastReadingIndex: index, lastReaderPage: readerPage }
        : {}),
    };

    localStorage.setItem(STORAGE, JSON.stringify(next));
    const noteKey = index >= 0 ? index + ":" + readerPage : "";
    setDraft(noteKey ? notes[noteKey] || "" : "");
  }, [storageReady, index, readerPage, theme, fontSize, readerFont, textAlign, lineHeight, pageMargin, bookmarks, notes, underlines]);

  useEffect(() => {
    if (!storageReady) return;

    const saveExactPosition = () => {
      let previous: Record<string, unknown> = {};
      try {
        previous = JSON.parse(localStorage.getItem(STORAGE) || "{}");
      } catch {}

      const exactPage = readerPageRef.current;
      const next = {
        ...previous,
        index,
        readerPage: exactPage,
        ...(index >= 0
          ? { lastReadingIndex: index, lastReaderPage: exactPage }
          : {}),
      };
      localStorage.setItem(STORAGE, JSON.stringify(next));
    };

    window.addEventListener("pagehide", saveExactPosition);
    window.addEventListener("beforeunload", saveExactPosition);
    return () => {
      window.removeEventListener("pagehide", saveExactPosition);
      window.removeEventListener("beforeunload", saveExactPosition);
    };
  }, [storageReady, index]);

  useEffect(() => {
    if (index < 0 || panel) return;
    const t = window.setTimeout(() => setChromeVisible(false), 2600);
    return () => window.clearTimeout(t);
  }, [index, panel, chromeVisible]);

  const current = index >= 0 ? sections[index] : null;
  const totalReadingMinutes = useMemo(() => {
    const wordCount = sections.reduce((total, section) => {
      const sectionText = [section.title, ...section.paragraphs].join(" ");
      const words = sectionText.trim().split(/\s+/).filter(Boolean).length;
      return total + words;
    }, 0);
    return Math.max(1, Math.ceil(wordCount / 200));
  }, []);

  const readingTime = useMemo(() => {
    const hours = Math.floor(totalReadingMinutes / 60);
    const remainingMinutes = totalReadingMinutes % 60;

    if (hours === 0) return `~ ${totalReadingMinutes} dk`;
    if (remainingMinutes === 0) return `~ ${hours} saat`;
    return `~ ${hours} sa ${remainingMinutes} dk`;
  }, [totalReadingMinutes]);

  const readingFraction = useMemo(() => {
    if (index < 0) return 0;
    const withinSection =
      readerPageCount > 0 ? (readerPage + 1) / readerPageCount : 1;
    return Math.min(1, Math.max(0, (index + withinSection) / sections.length));
  }, [index, readerPage, readerPageCount]);

  const progress = useMemo(
    () => Math.round(readingFraction * 100),
    [readingFraction]
  );

  const remainingReadingTime = useMemo(() => {
    if (index < 0) return "";
    const remainingMinutes = Math.max(
      0,
      Math.ceil(totalReadingMinutes * (1 - readingFraction))
    );
    if (remainingMinutes <= 0) return "Tamamlandı";
    if (remainingMinutes === 1) return "~ 1 dk kaldı";
    if (remainingMinutes < 60) return `~ ${remainingMinutes} dk kaldı`;
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;
    return minutes === 0
      ? `~ ${hours} saat kaldı`
      : `~ ${hours} sa ${minutes} dk kaldı`;
  }, [index, readingFraction, totalReadingMinutes]);

  const progressSliderValue = useMemo(() => {
    if (index < 0) return 0;
    const withinSection =
      readerPageCount > 1 ? readerPage / (readerPageCount - 1) : 0;
    return Math.round(((index + withinSection) / Math.max(1, sections.length - 1)) * 1000);
  }, [index, readerPage, readerPageCount]);

  const filteredTocSections = useMemo(() => {
    const q = tocQuery.trim().toLocaleLowerCase("tr-TR");
    if (!q) return sections.map((section, sectionIndex) => ({ section, sectionIndex }));
    return sections
      .map((section, sectionIndex) => ({ section, sectionIndex }))
      .filter(({ section }) => section.title.toLocaleLowerCase("tr-TR").includes(q));
  }, [tocQuery]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase("tr-TR");
    if (q.length < 2) return [];

    return sections.flatMap((section, sectionIndex) => {
      const titleMatch = section.title.toLocaleLowerCase("tr-TR").includes(q);
      const paragraphIndex = section.paragraphs.findIndex(p =>
        p.toLocaleLowerCase("tr-TR").includes(q)
      );

      if (!titleMatch && paragraphIndex === -1) return [];

      const source = titleMatch
        ? section.title
        : section.paragraphs[paragraphIndex] || "";

      const lower = source.toLocaleLowerCase("tr-TR");
      const hit = lower.indexOf(q);
      const start = Math.max(0, hit - 55);
      const end = Math.min(source.length, hit + q.length + 85);
      const snippet =
        (start > 0 ? "…" : "") +
        source.slice(start, end).trim() +
        (end < source.length ? "…" : "");

      return [{
        sectionIndex,
        paragraphIndex: titleMatch ? null : paragraphIndex,
        title: section.title,
        snippet,
      }];
    }).slice(0, 60);
  }, [searchQuery]);

  const bookmarked =
    index >= 0 &&
    bookmarks.some(mark => mark.index === index && mark.page === readerPage);

  const go = (next: number) => {
    const target = Math.max(-1, Math.min(sections.length - 1, next));
    if (target !== index && pendingReaderEdge.current === null) pendingReaderPage.current = 0;
    setIndex(target);
    setPanel(null);
    setChromeVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (index < 0) return;
    const el = textWrapRef.current;
    if (!el) return;

    const measure = () => {
      const width = Math.max(1, el.clientWidth);
      const pages = Math.max(1, Math.ceil(el.scrollWidth / width));
      setReaderPageCount(pages);

      if (pendingReaderEdge.current === "end") {
        const lastPage = pages - 1;
        el.scrollLeft = lastPage * width;
        setReaderPage(lastPage);
        readerPageRef.current = lastPage;
        pendingReaderEdge.current = null;
        pendingReaderPage.current = null;
        return;
      }

      if (pendingReaderEdge.current === "start") {
        el.scrollLeft = 0;
        setReaderPage(0);
        readerPageRef.current = 0;
        pendingReaderEdge.current = null;
        pendingReaderPage.current = null;
        return;
      }

      if (pendingReaderFraction.current !== null) {
        const targetPage = Math.min(
          pages - 1,
          Math.max(0, Math.round(pendingReaderFraction.current * Math.max(0, pages - 1)))
        );
        el.scrollLeft = targetPage * width;
        setReaderPage(targetPage);
        readerPageRef.current = targetPage;
        pendingReaderFraction.current = null;
        pendingReaderPage.current = null;
        return;
      }

      if (pendingSearchParagraph.current !== null) {
        const paragraph = el.querySelector(
          `p[data-reader-paragraph="${pendingSearchParagraph.current}"]`
        ) as HTMLElement | null;

        if (paragraph) {
          const elRect = el.getBoundingClientRect();
          const pRect = paragraph.getBoundingClientRect();
          const absoluteLeft = el.scrollLeft + (pRect.left - elRect.left);
          const targetPage = Math.min(
            pages - 1,
            Math.max(0, Math.floor((absoluteLeft + 2) / width))
          );
          el.scrollLeft = targetPage * width;
          setReaderPage(targetPage);
          readerPageRef.current = targetPage;
          pendingSearchParagraph.current = null;
          pendingReaderPage.current = null;
          return;
        }

        pendingSearchParagraph.current = null;
      }

      const requestedPage = pendingReaderPage.current ?? readerPageRef.current;
      const targetPage = Math.min(pages - 1, Math.max(0, requestedPage));
      el.scrollLeft = targetPage * width;
      setReaderPage(targetPage);
      readerPageRef.current = targetPage;
      pendingReaderPage.current = null;
    };
    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [index, fontSize, lineHeight, pageMargin]);

  const handleReaderTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) {
      swipeStartRef.current = null;
      return;
    }
    const touch = e.touches[0];
    swipeStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleReaderTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || e.changedTouches.length !== 1) return;

    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const elapsed = Math.max(1, Date.now() - start.time);
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    const velocity = absX / elapsed;

    const isHorizontal = absX > 48 && absX > absY * 1.35;
    const isFastFlick = absX > 32 && velocity > 0.38 && absX > absY * 1.2;
    if (!isHorizontal && !isFastFlick) return;

    setPendingUnderline(null);
    setActiveUnderline(null);
    window.getSelection()?.removeAllRanges();

    if (dx < 0) turnReaderPage(1);
    else turnReaderPage(-1);
  };

  const turnReaderPage = (direction: -1 | 1) => {
    const el = textWrapRef.current;
    if (!el || index < 0) return;
    const width = Math.max(1, el.clientWidth);
    const page = Math.min(readerPageCount - 1, Math.max(0, Math.round(el.scrollLeft / width)));

    if (direction === 1) {
      if (page < readerPageCount - 1) {
        const nextPage = page + 1;
        el.scrollTo({ left: nextPage * width, behavior: "smooth" });
        setReaderPage(nextPage);
        setChromeVisible(false);
        return;
      }
      if (index < sections.length - 1) {
        pendingReaderEdge.current = "start";
        go(index + 1);
        window.setTimeout(() => setChromeVisible(false), 0);
      }
      return;
    }

    if (page > 0) {
      const prevPage = page - 1;
      el.scrollTo({ left: prevPage * width, behavior: "smooth" });
      setReaderPage(prevPage);
      setChromeVisible(false);
      return;
    }
    if (index > 0) {
      pendingReaderEdge.current = "end";
      go(index - 1);
      window.setTimeout(() => setChromeVisible(false), 0);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (e.key === "Escape") {
        setPanel(null);
        return;
      }

      if (isTyping || panel || index < 0) return;

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        turnReaderPage(1);
      }

      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        turnReaderPage(-1);
      }

      if (e.key === "Home") {
        e.preventDefault();
        const el = textWrapRef.current;
        if (!el) return;
        el.scrollTo({ left: 0, behavior: "auto" });
        setReaderPage(0);
        readerPageRef.current = 0;
      }

      if (e.key === "End") {
        e.preventDefault();
        const el = textWrapRef.current;
        if (!el) return;
        const lastPage = Math.max(0, readerPageCount - 1);
        el.scrollTo({ left: lastPage * Math.max(1, el.clientWidth), behavior: "auto" });
        setReaderPage(lastPage);
        readerPageRef.current = lastPage;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, panel, readerPage, readerPageCount]);

  const seekReaderPosition = (sliderValue: number) => {
    if (index < 0) return;

    const normalized = Math.min(1, Math.max(0, sliderValue / 1000));
    const bookPosition = normalized * Math.max(1, sections.length - 1);
    const targetIndex = Math.min(
      sections.length - 1,
      Math.max(0, Math.floor(bookPosition))
    );
    const fraction = Math.min(1, Math.max(0, bookPosition - targetIndex));

    setPanel(null);
    setChromeVisible(true);

    if (targetIndex === index) {
      const el = textWrapRef.current;
      if (!el) return;
      const width = Math.max(1, el.clientWidth);
      const targetPage = Math.min(
        readerPageCount - 1,
        Math.max(0, Math.round(fraction * Math.max(0, readerPageCount - 1)))
      );
      el.scrollTo({ left: targetPage * width, behavior: "auto" });
      setReaderPage(targetPage);
      readerPageRef.current = targetPage;
      return;
    }

    pendingReaderEdge.current = null;
    pendingReaderPage.current = null;
    pendingReaderFraction.current = fraction;
    setIndex(targetIndex);
  };

  const toggleBookmark = () => {
    if (index < 0) return;
    const currentMark = { index, page: readerPage };
    setBookmarks(prev =>
      bookmarked
        ? prev.filter(mark => !(mark.index === currentMark.index && mark.page === currentMark.page))
        : [...prev, currentMark]
    );
  };

  const saveNote = () => {
    if (index < 0) return;
    const noteKey = index + ":" + readerPage;
    setNotes(prev => {
      const next = { ...prev };
      if (draft.trim()) next[noteKey] = draft.trim();
      else delete next[noteKey];
      return next;
    });
  };

  const getOffsetWithin = (root: HTMLElement, node: Node, offset: number) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let total = 0;
    let current = walker.nextNode();
    while (current) {
      if (current === node) return total + offset;
      total += current.textContent?.length || 0;
      current = walker.nextNode();
    }
    return total;
  };

  const captureUnderlineSelection = () => {
    if (index < 0) return;
    window.setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0 || selection.isCollapsed || !current) {
        setPendingUnderline(null);
        return;
      }

      const range = selection.getRangeAt(0);
      const startEl = range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentElement
        : range.startContainer as HTMLElement;
      const endEl = range.endContainer.nodeType === Node.TEXT_NODE
        ? range.endContainer.parentElement
        : range.endContainer as HTMLElement;

      const startParagraph = startEl?.closest?.("p[data-reader-paragraph]") as HTMLElement | null;
      const endParagraph = endEl?.closest?.("p[data-reader-paragraph]") as HTMLElement | null;
      if (!startParagraph || !endParagraph) {
        setPendingUnderline(null);
        return;
      }

      const startParagraphIndex = Number(startParagraph.dataset.readerParagraph);
      const endParagraphIndex = Number(endParagraph.dataset.readerParagraph);
      if (
        !Number.isFinite(startParagraphIndex) ||
        !Number.isFinite(endParagraphIndex) ||
        startParagraphIndex > endParagraphIndex
      ) {
        setPendingUnderline(null);
        return;
      }

      const startOffset = getOffsetWithin(startParagraph, range.startContainer, range.startOffset);
      const endOffset = getOffsetWithin(endParagraph, range.endContainer, range.endOffset);
      const segments: Omit<ReaderUnderline, "id">[] = [];

      for (let paragraph = startParagraphIndex; paragraph <= endParagraphIndex; paragraph += 1) {
        const text = current.paragraphs[paragraph] || "";
        const start = paragraph === startParagraphIndex ? Math.max(0, startOffset) : 0;
        const end = paragraph === endParagraphIndex ? Math.min(text.length, endOffset) : text.length;
        if (end > start) {
          segments.push({ index, paragraph, start, end });
        }
      }

      if (segments.length === 0) {
        setPendingUnderline(null);
        return;
      }

      const rect = range.getBoundingClientRect();
      setActiveUnderline(null);
      setPendingUnderline({
        segments,
        x: Math.min(window.innerWidth - 84, Math.max(84, rect.left + rect.width / 2)),
        y: Math.max(58, rect.top - 12),
      });
    }, 0);
  };

  const addUnderline = () => {
    if (index < 0 || !pendingUnderline) return;
    const underlineId = index + "-" + Date.now();

    setUnderlines(prev => {
      const additions = pendingUnderline.segments
        .filter(segment => !prev.some(mark =>
          mark.index === segment.index &&
          mark.paragraph === segment.paragraph &&
          Math.max(mark.start, segment.start) < Math.min(mark.end, segment.end)
        ))
        .map(segment => ({ ...segment, id: underlineId, page: readerPage }));

      return additions.length ? [...prev, ...additions] : prev;
    });

    window.getSelection()?.removeAllRanges();
    setPendingUnderline(null);
  };

  const removeUnderline = (id: string) => {
    setUnderlines(prev => prev.filter(mark => mark.id !== id));
    setActiveUnderline(null);
  };

  const renderParagraph = (text: string, paragraph: number) => {
    if (index < 0) return text;
    const marks = underlines
      .filter(mark => mark.index === index && mark.paragraph === paragraph)
      .sort((a, b) => a.start - b.start);

    if (marks.length === 0) return text;

    const parts: ReactNode[] = [];
    let cursor = 0;
    marks.forEach((mark, markIndex) => {
      const start = Math.max(cursor, Math.min(text.length, mark.start));
      const end = Math.max(start, Math.min(text.length, mark.end));
      if (start > cursor) parts.push(text.slice(cursor, start));
      if (end > start) {
        parts.push(
          <span
            key={mark.id + "-" + paragraph + "-" + markIndex}
            className={styles.readerUnderline}
            onClick={(e) => {
              e.stopPropagation();
              setPendingUnderline(null);
              setActiveUnderline({
                id: mark.id,
                x: Math.min(window.innerWidth - 70, Math.max(70, e.clientX)),
                y: Math.max(58, e.clientY - 10),
              });
            }}
            title="Alt çizgiyi sil"
          >
            {text.slice(start, end)}
          </span>
        );
      }
      cursor = Math.max(cursor, end);
    });
    if (cursor < text.length) parts.push(text.slice(cursor));
    return parts;
  };

  const openCover = () => {
    if (index >= 0) {
      setResumePosition({ index, page: readerPageRef.current });
    }
    setPanel(null);
    setChromeVisible(true);
    setIndex(-1);
  };

  const resumeReading = () => {
    if (!resumePosition) {
      go(0);
      return;
    }
    pendingReaderEdge.current = null;
    pendingReaderFraction.current = null;
    pendingReaderPage.current = resumePosition.page;
    readerPageRef.current = resumePosition.page;
    setReaderPage(resumePosition.page);
    setIndex(resumePosition.index);
    setPanel(null);
    setChromeVisible(true);
  };

  const selectReaderFont = (font: ReaderFont) => {
    setReaderFont(font);
  };

  const revealChrome = () => {
    if (index >= 0) setChromeVisible(v => !v);
  };

  return (
    <main
      className={styles.reader}
      data-theme={theme}
      data-font={readerFont}
      data-reading={index >= 0 ? "true" : "false"}
      data-chrome={chromeVisible ? "visible" : "hidden"}
      style={{
        "--reader-font-size": fontSize + "px",
        "--reader-line-height": String(lineHeight),
        "--reader-page-margin": pageMargin + "px",
      } as CSSProperties}
    >
      <div className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {index >= 0 && current
          ? `${current.title}. Sayfa ${readerPage + 1} / ${readerPageCount}. Kitap yüzde ${progress} tamamlandı.`
          : "Bir Şifacının Kanadı kitap kapağı"}
      </div>
      <aside className={styles.sidebar}>
        <a href="/" className={styles.brand} aria-label="22 Yayınevi ana sayfa">
          <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={360} height={236} priority />
        </a>
        <div className={styles.cover}>
          <Image src="/bir_sifaci_png.png" alt="Bir Şifacının Kanadı - Figen Yavuz" width={320} height={440} priority />
        </div>
        <h2>Bir Şifacının Kanadı</h2>
        <p>Figen Yavuz</p>
        <nav className={styles.sideNav}>
          <button onClick={() => setPanel(panel === "toc" ? null : "toc")}><span>☰</span> İçindekiler</button>
          <button onClick={() => setPanel(panel === "notes" ? null : "notes")}><span>▤</span> Notlarım</button>
          <button onClick={() => setPanel(panel === "search" ? null : "search")}><span>⌕</span> Kitapta Ara</button>
          <button onClick={() => setPanel(panel === "bookmarks" ? null : "bookmarks")}><span>★</span> Yer İşaretlerim</button>
          <button onClick={() => setPanel(panel === "underlines" ? null : "underlines")}><span>＿</span> Altı Çizilenler</button>
          <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")}><span>◐</span> Görünüm</button>
        </nav>
        <a className={styles.backToBook} href="/yazarlar/figen-yavuz">← Figen Yavuz sayfasına dön</a>
      </aside>

      <section className={styles.stage} onClick={revealChrome}>
        <header className={styles.topbar} onClick={e => e.stopPropagation()}>
          {index === -1 ? (
            <>
              <div className={styles.coverTopLogo}>
                <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={300} height={190} priority />
              </div>
              <button className={styles.coverMenuButton} onClick={() => setPanel("toc")} aria-label="Menü">⋮</button>
            </>
          ) : (
            <>
              <div className={styles.mobileBrand}>
                <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={240} height={158} priority />
              </div>
              <div className={styles.chapterMini}>
                <button
                  type="button"
                  onClick={() => {
                    if (readerPage > 0) {
                      turnReaderPage(-1);
                    } else if (index > 0) {
                      pendingReaderEdge.current = "end";
                      go(index - 1);
                    }
                  }}
                  disabled={index === 0 && readerPage === 0}
                  aria-label="Önceki sayfa veya bölüm"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={openCover}
                  aria-label="Kitap kapağına dön"
                  title="Kitap kapağı"
                >
                  ⌂
                </button>
                <span>{current?.title}</span>
              </div>
              <div className={styles.tools}>
                <button onClick={() => setPanel(panel === "search" ? null : "search")} aria-label="Kitapta ara">⌕</button>
                <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")} aria-label="Yazı ve görünüm">Aa</button>
                <button onClick={() => setTheme(theme === "dark" ? "cream" : "dark")} aria-label="Tema değiştir">☼</button>
                <button onClick={toggleBookmark} className={bookmarked ? styles.active : ""} aria-label="Yer işareti">{bookmarked ? "★" : "☆"}</button>
                <button onClick={() => setPanel(panel === "toc" ? null : "toc")} aria-label="İçindekiler">☰</button>
              </div>
            </>
          )}
        </header>

        <article
          className={styles.readingArea}
          aria-label={index >= 0 && current ? `${current.title} okuma alanı` : "Kitap kapağı"}
        >
          {index === -1 ? (
            <div className={styles.coverScreen}>
              <div className={styles.coverHero}>
                <Image
                  src="/bir_sifaci_png.png"
                  alt="Bir Şifacının Kanadı - Figen Yavuz"
                  width={720}
                  height={900}
                  sizes="(max-width: 900px) 86vw, 520px"
                  priority
                />
              </div>
              <div className={styles.coverAuthor}>Figen Yavuz</div>
              <div className={styles.coverPublisher}>22 Yayınevi</div>
              <button
                onClick={(e) => { e.stopPropagation(); resumeReading(); }}
                className={styles.startButton}
              >
                Okumaya Başla <span>→</span>
              </button>
              <div className={styles.coverStats}>
                <span>
                  <i aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M3.5 5.5c2.8-.7 5.5-.2 8 1.5v12c-2.5-1.7-5.2-2.2-8-1.5z"/><path d="M20.5 5.5c-2.8-.7-5.5-.2-8 1.5v12c2.5-1.7 5.2-2.2 8-1.5z"/></svg>
                  </i>
                  <b>{sections.length} bölüm</b>
                </span>
                <span>
                  <i aria-hidden="true">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.5 2"/></svg>
                  </i>
                  <b>{readingTime}</b>
                </span>
                <span>
                  <i aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M6.5 3.5h7l4 4v13h-11z"/><path d="M13.5 3.5v4h4"/><path d="M9 12h6M9 15h6"/></svg>
                  </i>
                  <b>EPUB</b>
                </span>
              </div>
              <div className={styles.coverReaderBrand}><Image src="/22_reader_logo.png" alt="22 Reader" width={520} height={170} priority /></div>
            </div>
          ) : (
            <div
              ref={textWrapRef}
              className={styles.textWrap}
              onTouchStart={handleReaderTouchStart}
              onTouchEnd={handleReaderTouchEnd}
              onScroll={(e) => {
                const el = e.currentTarget;
                const width = Math.max(1, el.clientWidth);
                setReaderPage(Math.min(readerPageCount - 1, Math.max(0, Math.round(el.scrollLeft / width))));
              }}
              style={{ columnWidth: textWrapRef.current?.clientWidth ? textWrapRef.current.clientWidth + "px" : undefined }}
            >
              <p className={styles.chapter}>BİR ŞİFACININ KANADI</p>
              <h1>{current?.title}</h1>
              <div className={styles.rule} />
              <div
                className={styles.prose}
                onMouseUp={captureUnderlineSelection}
                onTouchEnd={captureUnderlineSelection}
                style={{
                  fontFamily: READER_FONTS[readerFont],
                  textAlign: textAlign === "justify" ? "justify" : "left",
                }}
              >
                {current?.paragraphs.map((p, i) => (
                  <p key={i} data-reader-paragraph={i}>{renderParagraph(p, i)}</p>
                ))}
              </div>
            </div>
          )}

          {index >= 0 && <>
            <button className={styles.prev} onClick={(e) => { e.stopPropagation(); turnReaderPage(-1); }} aria-label="Önceki sayfa">‹</button>
            <button className={styles.next} onClick={(e) => { e.stopPropagation(); turnReaderPage(1); }} disabled={index === sections.length - 1 && readerPage === readerPageCount - 1} aria-label="Sonraki sayfa">›</button>

            <footer className={styles.progressArea} onClick={e => e.stopPropagation()}>
              <input
                type="range"
                min="0"
                max="1000"
                step="1"
                value={progressSliderValue}
                onChange={e => seekReaderPosition(Number(e.target.value))}
                aria-label="Okuma ilerlemesi"
                aria-valuetext={`% ${progress} — Bölüm ${index + 1}, Sayfa ${readerPage + 1}/${readerPageCount}`}
              />
              <div className={styles.progressMeta}>
                <span>{index + 1} / {sections.length} <i /> Sayfa {readerPage + 1}/{readerPageCount}</span>
                <span>{remainingReadingTime} <i /> % {progress} <i /> 22 Reader</span>
              </div>
            </footer>
          </>}
        </article>

        {index >= 0 && <nav className={styles.mobileNav} onClick={e => e.stopPropagation()}>
          <button onClick={() => setPanel(panel === "toc" ? null : "toc")}><span>☰</span>İçindekiler</button>
          <button onClick={() => setPanel(panel === "search" ? null : "search")}><span>⌕</span>Ara</button>
          <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")}><span>☼</span>Görünüm</button>
          <button onClick={() => setPanel(panel === "notes" ? null : "notes")}><span>▤</span>Notlarım</button>
        </nav>}
      </section>

      {(pendingUnderline || activeUnderline) && (
        <div
          className={styles.selectionToolbar}
          style={{
            left: pendingUnderline?.x ?? activeUnderline?.x,
            top: pendingUnderline?.y ?? activeUnderline?.y,
          }}
          onMouseDown={e => e.preventDefault()}
          onClick={e => e.stopPropagation()}
        >
          {pendingUnderline ? (
            <button type="button" onClick={addUnderline}>Altını çiz</button>
          ) : activeUnderline ? (
            <button type="button" onClick={() => removeUnderline(activeUnderline.id)}>Sil</button>
          ) : null}
          <button
            type="button"
            aria-label="Kapat"
            onClick={() => {
              window.getSelection()?.removeAllRanges();
              setPendingUnderline(null);
              setActiveUnderline(null);
            }}
          >
            ×
          </button>
        </div>
      )}

      {panel && (
        <>
          <button className={styles.backdrop} onClick={() => setPanel(null)} aria-label="Paneli kapat" />
          <aside
            className={styles.panel}
            data-panel={panel ?? undefined}
            role="dialog"
            aria-modal="true"
            aria-label={panel === "toc" ? "İçindekiler" : panel === "appearance" ? "Görünüm" : panel === "search" ? "Kitapta ara" : panel === "bookmarks" ? "Yer işaretlerim" : panel === "underlines" ? "Altı çizilenler" : "Notlarım"}
          >
            <div className={styles.panelHead}>
              <h3>{panel === "toc" ? "İçindekiler" : panel === "appearance" ? "Görünüm" : panel === "search" ? "Kitapta Ara" : panel === "bookmarks" ? "Yer İşaretlerim" : panel === "underlines" ? "Altı Çizilenler" : "Notlarım"}</h3>
              <button onClick={() => setPanel(null)}>×</button>
            </div>
            {panel === "toc" && <div className={styles.toc}>
              <div className={styles.tocQuickActions}>
                <button type="button" onClick={() => setPanel("bookmarks")}>
                  <span>★ Yer İşaretlerim</span>
                  <b>{bookmarks.length}</b>
                </button>
                <button type="button" onClick={() => setPanel("notes")}>
                  <span>▤ Notlarım</span>
                  <b>{Object.keys(notes).length}</b>
                </button>
                <button type="button" onClick={() => setPanel("underlines")}>
                  <span>＿ Altı Çizilenler</span>
                  <b>{new Set(underlines.map(mark => mark.id)).size}</b>
                </button>
              </div>

              <div className={styles.tocSearch}>
                <span aria-hidden="true">⌕</span>
                <input
                  type="search"
                  value={tocQuery}
                  onChange={e => setTocQuery(e.target.value)}
                  placeholder="Bölüm ara…"
                  aria-label="İçindekilerde bölüm ara"
                />
                {tocQuery && (
                  <button type="button" onClick={() => setTocQuery("")} aria-label="Bölüm aramasını temizle">×</button>
                )}
              </div>

              <div className={styles.tocList}>
                {!tocQuery && <button onClick={() => go(-1)}><span>Kapak</span><b>00</b></button>}

                {filteredTocSections.length === 0 ? (
                  <p className={styles.searchHint}>Bölüm bulunamadı.</p>
                ) : (
                  filteredTocSections.map(({ section, sectionIndex }) => (
                    <button
                      key={section.title + sectionIndex}
                      className={index === sectionIndex ? styles.currentToc : ""}
                      onClick={() => go(sectionIndex)}
                    >
                      <span>
                        {section.title}
                        {index === sectionIndex && <small className={styles.tocStatus}>Şu an buradasın</small>}
                      </span>
                      <b>{String(sectionIndex + 1).padStart(2,"0")}</b>
                    </button>
                  ))
                )}
              </div>
            </div>}
            {panel === "bookmarks" && <div className={styles.bookmarkPanel}>
              {bookmarks.length === 0 ? (
                <p className={styles.searchHint}>Henüz yer işareti eklemediniz.</p>
              ) : (
                <div className={styles.bookmarkList}>
                  {[...bookmarks]
                    .sort((a, b) => a.index - b.index || a.page - b.page)
                    .map((mark, i) => (
                      <button
                        key={mark.index + "-" + mark.page + "-" + i}
                        type="button"
                        onClick={() => {
                          pendingReaderEdge.current = null;
                          pendingReaderFraction.current = null;
                          pendingReaderPage.current = mark.page;
                          readerPageRef.current = mark.page;
                          setReaderPage(mark.page);
                          setIndex(mark.index);
                          setPanel(null);
                          setChromeVisible(true);
                        }}
                      >
                        <b>{String(mark.index + 1).padStart(2, "0")} · {sections[mark.index]?.title}</b>
                        <span>Sayfa {mark.page + 1}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>}
            {panel === "underlines" && <div className={styles.underlinePanel}>
              {underlines.length === 0 ? (
                <p className={styles.searchHint}>Henüz altı çizilmiş bir metin yok.</p>
              ) : (
                <div className={styles.underlineList}>
                  {Array.from(new Set(underlines.map(mark => mark.id))).map(id => {
                    const group = underlines
                      .filter(mark => mark.id === id)
                      .sort((a, b) => a.paragraph - b.paragraph || a.start - b.start);
                    const first = group[0];
                    if (!first) return null;
                    const excerpt = group
                      .map(mark => (sections[mark.index]?.paragraphs[mark.paragraph] || "").slice(mark.start, mark.end))
                      .join(" ")
                      .replace(/\s+/g, " ")
                      .trim();
                    const targetPage = Math.max(0, first.page ?? 0);

                    return (
                      <div className={styles.underlineItem} key={id}>
                        <button
                          type="button"
                          className={styles.underlineJump}
                          onClick={() => {
                            pendingReaderEdge.current = null;
                            pendingReaderFraction.current = null;
                            pendingReaderPage.current = targetPage;
                            readerPageRef.current = targetPage;
                            setReaderPage(targetPage);
                            setIndex(first.index);
                            setPanel(null);
                            setChromeVisible(true);
                          }}
                        >
                          <b>{String(first.index + 1).padStart(2, "0")} · {sections[first.index]?.title}</b>
                          <span>{first.page == null ? "Bölüme git" : "Sayfa " + (targetPage + 1)}</span>
                          <em>“{excerpt.length > 170 ? excerpt.slice(0, 170) + "…" : excerpt}”</em>
                        </button>
                        <button
                          type="button"
                          className={styles.underlineDelete}
                          onClick={() => removeUnderline(id)}
                          aria-label="Altı çizili metni sil"
                        >
                          Sil
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>}
            {panel === "search" && <div className={styles.searchPanel}>
              <div className={styles.searchBox}>
                <span aria-hidden="true">⌕</span>
                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Kelime veya ifade ara…"
                  aria-label="Kitapta ara"
                />
                {searchQuery && <button type="button" onClick={() => setSearchQuery("")} aria-label="Aramayı temizle">×</button>}
              </div>

              {searchQuery.trim().length < 2 ? (
                <p className={styles.searchHint}>Aramak için en az 2 karakter yazın.</p>
              ) : searchResults.length === 0 ? (
                <p className={styles.searchHint}>Sonuç bulunamadı.</p>
              ) : (
                <>
                  <p className={styles.searchCount}>{searchResults.length} sonuç</p>
                  <div className={styles.searchResults}>
                    {searchResults.map(result => (
                      <button
                        key={result.sectionIndex + "-" + result.title}
                        type="button"
                        onClick={() => {
                          pendingReaderEdge.current = null;
                          pendingReaderFraction.current = null;
                          pendingSearchParagraph.current = result.paragraphIndex;

                          if (result.sectionIndex === index) {
                            const el = textWrapRef.current;
                            const paragraph = result.paragraphIndex === null
                              ? null
                              : el?.querySelector(
                                  `p[data-reader-paragraph="${result.paragraphIndex}"]`
                                ) as HTMLElement | null;

                            if (el && paragraph) {
                              const width = Math.max(1, el.clientWidth);
                              const elRect = el.getBoundingClientRect();
                              const pRect = paragraph.getBoundingClientRect();
                              const absoluteLeft = el.scrollLeft + (pRect.left - elRect.left);
                              const targetPage = Math.min(
                                readerPageCount - 1,
                                Math.max(0, Math.floor((absoluteLeft + 2) / width))
                              );
                              el.scrollTo({ left: targetPage * width, behavior: "auto" });
                              setReaderPage(targetPage);
                              readerPageRef.current = targetPage;
                              pendingSearchParagraph.current = null;
                            } else {
                              pendingReaderPage.current = 0;
                            }
                            setPanel(null);
                            setChromeVisible(true);
                            return;
                          }

                          pendingReaderPage.current = 0;
                          setIndex(result.sectionIndex);
                          setPanel(null);
                          setChromeVisible(true);
                        }}
                      >
                        <b>{String(result.sectionIndex + 1).padStart(2, "0")} · {result.title}</b>
                        <span>{result.snippet}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>}
            {panel === "appearance" && <div className={styles.appearance}>
              <label>Tema</label>
              <div className={styles.themeRow}>
                <button className={theme === "light" ? styles.selected : ""} onClick={() => setTheme("light")}><i className={styles.lightSwatch}/>Açık</button>
                <button className={theme === "cream" ? styles.selected : ""} onClick={() => setTheme("cream")}><i className={styles.creamSwatch}/>Krem</button>
                <button className={theme === "dark" ? styles.selected : ""} onClick={() => setTheme("dark")}><i className={styles.darkSwatch}/>Koyu</button>
              </div>
              <label>Yazı Tipi <strong style={{ marginLeft: 8, color: "var(--accent)", fontWeight: 500 }}>({readerFont === "serif" ? "Serif" : readerFont === "sans" ? "Sans" : "Modern"})</strong></label>
              <div className={styles.fontFamilyRow}>
                <button
                  type="button"
                  className={readerFont === "serif" ? styles.selected : ""}
                  data-selected={readerFont === "serif" ? "true" : "false"}
                  onPointerDown={(e) => { e.stopPropagation(); selectReaderFont("serif"); }}
                  onClick={(e) => { e.stopPropagation(); selectReaderFont("serif"); }}
                  aria-pressed={readerFont === "serif"}
                >
                  Aa<span>Serif</span>
                </button>
                <button
                  type="button"
                  className={readerFont === "sans" ? styles.selected : ""}
                  data-selected={readerFont === "sans" ? "true" : "false"}
                  onPointerDown={(e) => { e.stopPropagation(); selectReaderFont("sans"); }}
                  onClick={(e) => { e.stopPropagation(); selectReaderFont("sans"); }}
                  aria-pressed={readerFont === "sans"}
                >
                  Aa<span>Sans</span>
                </button>
                <button
                  type="button"
                  className={readerFont === "modern" ? styles.selected : ""}
                  data-selected={readerFont === "modern" ? "true" : "false"}
                  onPointerDown={(e) => { e.stopPropagation(); selectReaderFont("modern"); }}
                  onClick={(e) => { e.stopPropagation(); selectReaderFont("modern"); }}
                  aria-pressed={readerFont === "modern"}
                >
                  Aa<span>Modern</span>
                </button>
              </div>
              <label>Paragraf Hizalama</label>
              <div className={styles.alignRow}>
                <button
                  type="button"
                  className={textAlign === "left" ? styles.selected : ""}
                  aria-pressed={textAlign === "left"}
                  onClick={() => setTextAlign("left")}
                >
                  <span className={styles.alignIcon}>☰</span>
                  <small>Sola Yaslı</small>
                </button>
                <button
                  type="button"
                  className={textAlign === "justify" ? styles.selected : ""}
                  aria-pressed={textAlign === "justify"}
                  onClick={() => setTextAlign("justify")}
                >
                  <span className={styles.justifyIcon}>☰</span>
                  <small>İki Yana Yaslı</small>
                </button>
              </div>
              <label htmlFor="bsk-font">Yazı Boyutu</label>
              <div className={styles.fontRow}><span>A</span><input id="bsk-font" type="range" min="17" max="30" value={fontSize} onChange={e => setFontSize(Number(e.target.value))}/><span>A</span></div>
              <label>Satır Aralığı</label>
              <div className={styles.fontRow}><span>−</span><input type="range" min="1.45" max="1.95" step="0.05" value={lineHeight} onChange={e => setLineHeight(Number(e.target.value))}/><span>+</span></div>
              <label>Kenar Boşluğu</label>
              <div className={styles.fontRow}><span>−</span><input type="range" min="16" max="44" step="2" value={pageMargin} onChange={e => setPageMargin(Number(e.target.value))}/><span>+</span></div>
            </div>}
            {panel === "notes" && <div className={styles.notes}>
              {index < 0 ? <p>Not eklemek için bir bölüme geçin.</p> : <>
                <p>{index + 1}. bölüm · Sayfa {readerPage + 1} için not</p>
                <textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="Bu sayfayla ilgili notunuzu yazın…" />
                <button className={styles.saveNote} onClick={saveNote}>Notu Kaydet</button>
                <div className={styles.savedNotes}>
                  {Object.entries(notes)
                    .filter(([,v]) => v.trim())
                    .sort(([a],[b]) => {
                      const [ai, ap] = a.split(":").map(Number);
                      const [bi, bp] = b.split(":").map(Number);
                      return ai - bi || ap - bp;
                    })
                    .map(([k,v]) => {
                      const [noteIndex, notePage] = k.split(":").map(Number);
                      return (
                        <button
                          key={k}
                          onClick={() => {
                            pendingReaderEdge.current = null;
                            pendingReaderFraction.current = null;
                            pendingReaderPage.current = notePage;
                            readerPageRef.current = notePage;
                            setReaderPage(notePage);
                            setIndex(noteIndex);
                            setPanel(null);
                            setChromeVisible(true);
                          }}
                        >
                          <b>{noteIndex + 1}. bölüm · Sayfa {notePage + 1}</b>
                          <span>{v}</span>
                        </button>
                      );
                    })}
                </div>
              </>}
            </div>}
          </aside>
        </>
      )}
    </main>
  );
}
