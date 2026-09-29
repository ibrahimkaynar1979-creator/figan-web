"use client";

import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./ReaderBookForm.module.css";
import PublicationPreviewDock from "../../_components/PublicationPreviewDock";
import PanelSidebar from "../../_components/PanelSidebar";
import ThemeSwitcher from "../../_components/ThemeSwitcher";
import {
  getPanelPersistenceStatus,
  listManagedAuthors,
  saveManagedBook,
  type ManagedBook,
} from "../../_lib/managedStore";

type Props = {
  mode: "new" | "edit";
  initial?: {
    title: string;
    subtitle: string;
    author: string;
    authorSlug: string;
    slug: string;
    status: "Taslak" | "Yayında";
    language: string;
    cover: string;
    readerHref: string;
  };
};

type AuthorOption = { name: string; slug: string; href: string };
type SystemState = { databaseConfigured: boolean; blobConfigured: boolean };

const BUILT_IN_AUTHORS: AuthorOption[] = [
  { name: "Figen Yavuz", slug: "figen-yavuz", href: "/yazarlar/figen-yavuz" },
];

const slugify = (value: string) =>
  value
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const fileSize = (size?: number) => {
  if (!size) return "";
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
};

export default function ReaderBookForm({ mode, initial }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? "");
  const [authorSlug, setAuthorSlug] = useState(initial?.authorSlug ?? "figen-yavuz");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [language, setLanguage] = useState(initial?.language ?? "Türkçe");
  const [status, setStatus] = useState<"Taslak" | "Yayında">(initial?.status ?? "Taslak");

  const [epubName, setEpubName] = useState("");
  const [epubFile, setEpubFile] = useState<File | null>(null);
  const [epubUrl, setEpubUrl] = useState("");

  const [coverName, setCoverName] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [lastSavedHref, setLastSavedHref] = useState("");
  const [authorOptions, setAuthorOptions] = useState<AuthorOption[]>(BUILT_IN_AUTHORS);
  const [systemState, setSystemState] = useState<SystemState | null>(null);

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview("");
      return;
    }
    const url = URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverFile]);

  useEffect(() => {
    document.body.classList.add("reader-admin-route");

    void Promise.all([listManagedAuthors(), getPanelPersistenceStatus()]).then(
      ([authorsResult, persistence]) => {
        const panelAuthors: AuthorOption[] = authorsResult.items.map(item => ({
          name: item.name,
          slug: item.slug,
          href: item.href || `/yazarlar/${item.slug}`,
        }));

        const merged = [...BUILT_IN_AUTHORS];
        panelAuthors.forEach(item => {
          if (!merged.some(existing => existing.slug === item.slug)) merged.push(item);
        });

        setAuthorOptions(merged);
        setSystemState({
          databaseConfigured: persistence.databaseConfigured,
          blobConfigured: persistence.blobConfigured,
        });

        if (mode === "new" && panelAuthors.length > 0) {
          setAuthorSlug(current =>
            panelAuthors.some(item => item.slug === current) ? current : panelAuthors[0].slug
          );
        }
      }
    );

    return () => document.body.classList.remove("reader-admin-route");
  }, [mode]);

  const author = authorOptions.find(item => item.slug === authorSlug) ?? authorOptions[0];
  const readerHref = useMemo(() => (slug ? `/oku/${slug}` : "/oku"), [slug]);

  const hasCover = Boolean(coverFile || coverUrl || initial?.cover);
  const hasEpub = Boolean(epubFile || epubUrl);
  const requiredReady = Boolean(title.trim() && slug && authorSlug && hasCover && hasEpub);
  const infraReady = systemState?.databaseConfigured !== false && systemState?.blobConfigured !== false;
  const canSave = requiredReady && infraReady && !saving;

  const projectStages = [
    { label: "Dosya", state: title.trim() ? "active" : "waiting", note: title.trim() ? "Proje açık" : "Başlangıç" },
    { label: "Editoryal", state: "planned", note: "Sonraki sürüm" },
    { label: "Kapak", state: hasCover ? "done" : "waiting", note: hasCover ? "Hazır" : "Bekliyor" },
    { label: "EPUB", state: hasEpub ? "done" : "waiting", note: hasEpub ? "Hazır" : "Bekliyor" },
    { label: "Reader", state: saved ? "done" : hasEpub ? "active" : "waiting", note: saved ? "Bağlı" : "Hazırlanıyor" },
    { label: "Sesli Kitap", state: "planned", note: "Modül hazır" },
    { label: "Dağıtım", state: "planned", note: "Planlandı" },
    { label: "Yayında", state: status === "Yayında" && saved ? "done" : "waiting", note: status === "Yayında" && saved ? "Yayında" : "Bekliyor" },
  ] as const;

  const onTitleChange = (value: string) => {
    setTitle(value);
    if (mode === "new") setSlug(slugify(value));
    setSaved(false);
    setLastSavedHref("");
  };

  const selectCover = (file: File | null) => {
    setCoverFile(file);
    setCoverName(file?.name ?? "");
    setSaved(false);
    setLastSavedHref("");
    setSaveError("");
  };

  const selectEpub = (file: File | null) => {
    setEpubFile(file);
    setEpubName(file?.name ?? "");
    setSaved(false);
    setLastSavedHref("");
    setSaveError("");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaveError("");
    setSaved(false);

    if (!title.trim()) {
      setSaveError("Kitap adını girin.");
      return;
    }
    if (!slug) {
      setSaveError("Reader adresi için geçerli bir kitap slug'ı gerekli.");
      return;
    }
    if (!authorSlug || !author) {
      setSaveError("Bir yazar seçin.");
      return;
    }
    if (!hasCover) {
      setSaveError("Kitap kapağını yükleyin.");
      return;
    }
    if (!hasEpub) {
      setSaveError("EPUB dosyasını yükleyin.");
      return;
    }
    if (systemState && !systemState.databaseConfigured) {
      setSaveError("Neon veritabanı bağlantısı hazır değil. DATABASE_URL kontrol edilmeli.");
      return;
    }
    if (systemState && !systemState.blobConfigured) {
      setSaveError("Vercel Blob bağlantısı hazır değil. BLOB_READ_WRITE_TOKEN kontrol edilmeli.");
      return;
    }

    setSaving(true);

    try {
      let nextCoverUrl = coverUrl;
      let nextEpubUrl = epubUrl;

      if (coverFile) {
        const extension = coverFile.name.split(".").pop()?.toLowerCase() || "webp";
        const blob = await upload(
          `22-reader/${slug}/cover-${Date.now()}.${extension}`,
          coverFile,
          {
            access: "public",
            handleUploadUrl: "/api/blob/upload",
            contentType: coverFile.type || "image/webp",
          }
        );
        nextCoverUrl = blob.url;
        setCoverUrl(blob.url);
      }

      if (epubFile) {
        const blob = await upload(
          `22-reader/${slug}/book-${Date.now()}.epub`,
          epubFile,
          {
            access: "public",
            handleUploadUrl: "/api/blob/upload",
            contentType: "application/epub+zip",
          }
        );
        nextEpubUrl = blob.url;
        setEpubUrl(blob.url);
      }

      const payload: ManagedBook = {
        title: title.trim(),
        subtitle: subtitle.trim(),
        author: author.name,
        authorSlug,
        authorHref: author.href,
        slug,
        language,
        status,
        epubName,
        epubUrl: nextEpubUrl || undefined,
        coverName,
        coverUrl: nextCoverUrl || undefined,
        readerHref,
        format: "EPUB 3",
        updatedAt: new Date().toISOString(),
      };

      const result = await saveManagedBook(payload, mode === "edit" ? initial?.slug : undefined);

      if (result.mode !== "database") {
        throw new Error("Kitap veritabanına kaydedilemedi. Yerel tarayıcı kaydı yeterli değil.");
      }

      setSaved(true);
      setLastSavedHref(readerHref);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Kitap kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  };

  const coverSource =
    coverPreview ||
    coverUrl ||
    (initial?.cover
      ? initial.cover.startsWith("/") || /^https?:\/\//i.test(initial.cover)
        ? initial.cover
        : "/" + initial.cover
      : "");

  return (
    <main className={styles.page}>
      <PanelSidebar
        active="new"
        footer={
          <div className={styles.systemBox}>
            <span>SİSTEM DURUMU</span>
            <div><i className={systemState?.databaseConfigured ? styles.okDot : styles.waitDot} /><b>Neon</b><small>{systemState === null ? "Kontrol" : systemState.databaseConfigured ? "Bağlı" : "Eksik"}</small></div>
            <div><i className={systemState?.blobConfigured ? styles.okDot : styles.waitDot} /><b>Blob</b><small>{systemState === null ? "Kontrol" : systemState.blobConfigured ? "Bağlı" : "Eksik"}</small></div>
          </div>
        }
      />

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <span>22 PUBLISHING OS · YAYIN PROJESİ</span>
            <h1>{mode === "new" ? "Yeni yayın projesi" : title || "Yayın projesi"}</h1>
            <p>Bir kitabın editoryal hazırlıktan Reader, sesli kitap ve dağıtıma uzanan bütün yayın yaşam döngüsünü tek projede yönetin.</p>
          </div>
          <div className={styles.topActions}>
            <ThemeSwitcher />
            {lastSavedHref ? (
              <a className={styles.previewButton} href={lastSavedHref} target="_blank" rel="noreferrer">
                Reader'ı Aç ↗
              </a>
            ) : (
              <span className={styles.draftBadge}>{status}</span>
            )}
            <a href="/panel/reader">Kapat ×</a>
          </div>
        </header>

        <section className={styles.pipeline} aria-label="Yayın üretim hattı">
          <div className={styles.pipelineHead}>
            <div>
              <span>YAYIN ÜRETİM HATTI</span>
              <strong>{title.trim() || "Yeni proje"}</strong>
            </div>
            <b>v1 · Modüler</b>
          </div>
          <div className={styles.stageRail}>
            {projectStages.map((stage, index) => (
              <div
                key={stage.label}
                className={`${styles.stage} ${styles[`stage_${stage.state}`] || ""}`}
              >
                <i>{stage.state === "done" ? "✓" : String(index + 1).padStart(2, "0")}</i>
                <div>
                  <strong>{stage.label}</strong>
                  <small>{stage.note}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.editorLayout}>
          <form className={styles.form} onSubmit={submit}>
            <section className={styles.mainCard}>
              <div className={styles.sectionTitle}>
                <span>01</span>
                <div>
                  <b>PROJE KİMLİĞİ</b>
                  <h2>Kitap ve yayın bilgileri</h2>
                  <p>Bu proje Reader, sesli kitap, dağıtım ve gelecekteki üretim araçlarının ortak kaynağıdır.</p>
                </div>
              </div>

              <div className={styles.fields}>
                <label className={styles.fieldWide}>
                  <span>Kitap Adı *</span>
                  <input
                    required
                    value={title}
                    onChange={e => onTitleChange(e.target.value)}
                    placeholder="Örn. Bir Şifacının Kanadı"
                  />
                </label>

                <label>
                  <span>Alt Başlık</span>
                  <input
                    value={subtitle}
                    onChange={e => {
                      setSubtitle(e.target.value);
                      setSaved(false);
                    }}
                    placeholder="Varsa alt başlık"
                  />
                </label>

                <label>
                  <span>Yazar *</span>
                  <select
                    value={authorSlug}
                    onChange={e => {
                      setAuthorSlug(e.target.value);
                      setSaved(false);
                    }}
                  >
                    {authorOptions.map(item => (
                      <option key={item.slug} value={item.slug}>{item.name}</option>
                    ))}
                  </select>
                  <small>
                    {author?.href} · <a href="/panel/yazarlar/yeni">Yeni yazar oluştur</a>
                  </small>
                </label>

                <label>
                  <span>Reader Adresi *</span>
                  <div className={styles.slugInput}>
                    <em>/oku/</em>
                    <input
                      required
                      value={slug}
                      onChange={e => {
                        setSlug(slugify(e.target.value));
                        setSaved(false);
                      }}
                      placeholder="kitap-adi"
                    />
                  </div>
                </label>

                <label>
                  <span>Dil</span>
                  <select value={language} onChange={e => setLanguage(e.target.value)}>
                    <option>Türkçe</option>
                    <option>İngilizce</option>
                    <option>Almanca</option>
                  </select>
                </label>

                <label>
                  <span>Yayın Durumu</span>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as "Taslak" | "Yayında")}
                  >
                    <option>Taslak</option>
                    <option>Yayında</option>
                  </select>
                </label>
              </div>
            </section>

            <section className={styles.uploadSection}>
              <div className={styles.sectionTitle}>
                <span>02</span>
                <div>
                  <b>DOSYALAR</b>
                  <h2>Üretim kaynakları</h2>
                  <p>Bugün kapak ve EPUB yüklenir; sonraki sürümlerde bu dosyalar panel içinde üretilebilecek.</p>
                </div>
              </div>

              <div className={styles.uploadGrid}>
                <label className={`${styles.uploadCard} ${hasCover ? styles.fileReady : ""}`}>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={e => selectCover(e.target.files?.[0] ?? null)}
                  />
                  <div className={styles.uploadIcon}>▣</div>
                  <div>
                    <span>KİTAP KAPAĞI</span>
                    <strong>{coverName || (hasCover ? "Mevcut kapak" : "Kapak görselini seç")}</strong>
                    <small>
                      {coverFile ? `${coverFile.type.replace("image/", "").toUpperCase()} · ${fileSize(coverFile.size)}` : "PNG · JPG · WebP"}
                    </small>
                  </div>
                  <b>{hasCover ? "Hazır ✓" : "Dosya Seç"}</b>
                </label>

                <label className={`${styles.uploadCard} ${hasEpub ? styles.fileReady : ""}`}>
                  <input
                    type="file"
                    accept=".epub,application/epub+zip"
                    onChange={e => selectEpub(e.target.files?.[0] ?? null)}
                  />
                  <div className={styles.uploadIcon}>E</div>
                  <div>
                    <span>EPUB DOSYASI</span>
                    <strong>{epubName || (hasEpub ? "Mevcut EPUB" : "EPUB dosyasını seç")}</strong>
                    <small>{epubFile ? `EPUB · ${fileSize(epubFile.size)}` : "EPUB 3 önerilir"}</small>
                  </div>
                  <b>{hasEpub ? "Hazır ✓" : "Dosya Seç"}</b>
                </label>
              </div>
            </section>

            <section className={styles.futureCard} id="uretim">
              <div className={styles.sectionTitle}>
                <span>03</span>
                <div>
                  <b>ÜRETİM MERKEZİ</b>
                  <h2>Bugün yükle, yarın panelde üret</h2>
                  <p>Bu alan gelecekte editoryal düzenleme, redaksiyon, EPUB üretimi ve sesli kitap üretimini aynı proje içinde çalıştıracak.</p>
                </div>
              </div>
              <div className={styles.futureGrid}>
                <div><i>✦</i><strong>Editoryal Düzenleme</strong><span>Metni analiz et, düzenle, sürümle</span><b>Planlandı</b></div>
                <div><i>✓</i><strong>Redaksiyon & Kontrol</strong><span>Yazım, tutarlılık ve son okuma akışı</span><b>Planlandı</b></div>
                <div><i>E</i><strong>EPUB Üret</strong><span>Dosyadan EPUB 3 oluştur ve doğrula</span><b>Sonraki sürüm</b></div>
                <div><i>♪</i><strong>Sesli Kitap Üret</strong><span>Ses seç, bölümle, master MP3 hazırla</span><b>Modül hazır</b></div>
              </div>
            </section>

            <section className={styles.connectionCard}>
              <div className={styles.sectionTitle}>
                <span>04</span>
                <div>
                  <b>YAYIN KONTROLÜ</b>
                  <h2>Bağlantılar</h2>
                  <p>Kaydetmeden önce Reader, yazar ve dosya bağlantılarını kontrol edin.</p>
                </div>
              </div>

              <div className={styles.connections}>
                <div>
                  <span>Reader</span>
                  <code>{readerHref}</code>
                  <b>{slug ? "Hazır" : "Bekliyor"}</b>
                </div>
                <div>
                  <span>Yazar</span>
                  <code>{author?.href || "—"}</code>
                  <b>{author ? "Bağlı" : "Bekliyor"}</b>
                </div>
                <div>
                  <span>Kapak</span>
                  <code>{coverName || coverUrl || "Dosya seçilmedi"}</code>
                  <b>{hasCover ? "Hazır" : "Eksik"}</b>
                </div>
                <div>
                  <span>EPUB</span>
                  <code>{epubName || epubUrl || "Dosya seçilmedi"}</code>
                  <b>{hasEpub ? "Hazır" : "Eksik"}</b>
                </div>
              </div>
            </section>

            {saveError && <div className={styles.errorBox}>{saveError}</div>}

            {saved && (
              <div className={styles.successBox}>
                <div>
                  <b>Kitap kaydedildi ✓</b>
                  <span>Kapak ve EPUB bağlandı. Reader adresi hazır.</span>
                </div>
                <a href={readerHref} target="_blank" rel="noreferrer">Reader'ı Aç ↗</a>
              </div>
            )}

            <footer className={styles.actions}>
              <div className={styles.readySummary}>
                <span className={title.trim() ? styles.ready : ""}>Kitap adı</span>
                <span className={authorSlug ? styles.ready : ""}>Yazar</span>
                <span className={hasCover ? styles.ready : ""}>Kapak</span>
                <span className={hasEpub ? styles.ready : ""}>EPUB</span>
              </div>
              <div>
                <a href="/panel/reader">Vazgeç</a>
                <button type="submit" disabled={!canSave}>
                  {saving ? "Yükleniyor ve kaydediliyor…" : saved ? "Proje Kaydedildi ✓" : "Projeyi Kaydet"}
                </button>
              </div>
            </footer>
          </form>

          <PublicationPreviewDock
            activeMode="reader"
            title={title}
            subtitle={subtitle}
            author={author?.name || ""}
            coverSrc={coverSource}
            status={status}
            publicationHref={slug ? readerHref : undefined}
            audioPreviewHref={slug ? `/dinle/${slug}` : "/dinle/bir-sifacinin-kanadi"}
            sourceReady={hasEpub}
            chapterLabel={hasEpub ? "EPUB bağlı" : "EPUB bekleniyor"}
            readingTimeLabel={hasEpub ? "otomatik" : "bekliyor"}
          />
        </div>
      </section>
    </main>
  );
}
