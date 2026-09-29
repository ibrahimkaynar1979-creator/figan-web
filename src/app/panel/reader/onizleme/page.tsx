"use client";

import { useEffect, useRef, useState } from "react";
import LockedManagedReader from "../../../_components/LockedManagedReader";

type PreviewBook = {
  title: string;
  author: string;
  coverUrl: string;
};

export default function Page() {
  const [book, setBook] = useState<PreviewBook>({
    title: "Kitap Önizleme",
    author: "Yazar",
    coverUrl: "/bir_sifaci_png.png",
  });
  const [epubUrl, setEpubUrl] = useState("");
  const blobUrlRef = useRef("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setBook({
      title: params.get("title") || "Kitap Önizleme",
      author: params.get("author") || "Yazar",
      coverUrl: params.get("cover") || "/bir_sifaci_png.png",
    });

    const persistedEpub = params.get("epub") || "";
    if (persistedEpub) setEpubUrl(persistedEpub);

    const receivePreviewFile = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { type?: string; file?: unknown } | null;
      if (data?.type !== "22-reader-preview-file" || !(data.file instanceof Blob)) return;

      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
      const nextUrl = URL.createObjectURL(data.file);
      blobUrlRef.current = nextUrl;
      setEpubUrl(nextUrl);
    };

    window.addEventListener("message", receivePreviewFile);
    window.parent.postMessage({ type: "22-reader-preview-ready" }, window.location.origin);

    return () => {
      window.removeEventListener("message", receivePreviewFile);
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = "";
      }
    };
  }, []);

  if (!epubUrl) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", fontFamily: "Arial, sans-serif", color: "#607284", background: "#fff" }}>
        EPUB önizlemesi hazırlanıyor…
      </main>
    );
  }

  return (
    <LockedManagedReader
      book={{
        slug: "panel-onizleme",
        title: book.title,
        author: book.author,
        authorHref: "#",
        coverUrl: book.coverUrl,
        epubUrl,
      }}
    />
  );
}
