"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { upload } from "@vercel/blob/client";
import styles from "./page.module.css";
import PublicationPreviewDock from "../_components/PublicationPreviewDock";
import PanelSidebar from "../_components/PanelSidebar";

type Chapter = { id:number; title:string; start:number };

type CatalogBook = {
  version:1;
  slug:string;
  title:string;
  author:string;
  voice?:string;
  coverUrl:string;
  audioUrl:string;
  duration?:number;
  chapters?:Chapter[];
  updatedAt?:string;
};

type CurrentBook = {
  ready?: boolean;
  slug?: string;
  title?: string;
  author?: string;
  voice?: string;
  coverUrl?: string;
  audioUrl?: string;
  url?: string;
  duration?: number;
  size?: number;
  uploadedAt?: string;
  source?: string;
  chapters?: Chapter[];
};

const formatTime = (seconds?: number) => {
  if (seconds === undefined || !Number.isFinite(seconds) || seconds < 0) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return h > 0
    ? `${h}:${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`
    : `${m}:${s.toString().padStart(2,"0")}`;
};

const parseChapterTime = (value:string) => {
  const parts=value.trim().split(":").map(Number);
  if(parts.some((part)=>!Number.isFinite(part))) return null;
  if(parts.length===2) return parts[0]*60+parts[1];
  if(parts.length===3) return parts[0]*3600+parts[1]*60+parts[2];
  if(parts.length===1) return parts[0];
  return null;
};

const parseChapters = (value:string): Chapter[] => {
  const rows=value
    .split(/\r?\n/)
    .map((line)=>line.trim())
    .filter(Boolean);

  const parsed: Chapter[]=[];
  for(const row of rows){
    const match=row.match(/^((?:\d+:)?\d{1,2}:\d{2}|\d+(?:\.\d+)?)\s*(?:[-|—–]\s*)?(.+)$/);
    if(!match) continue;
    const start=parseChapterTime(match[1]);
    const title=match[2]?.trim();
    if(start===null || !title) continue;
    parsed.push({id:parsed.length+1,title,start});
  }

  return parsed
    .sort((a,b)=>a.start-b.start)
    .map((item,index)=>({...item,id:index+1}));
};

const slugify = (value:string) =>
  value
    .replace(/İ/g,"I")
    .replace(/ı/g,"i")
    .replace(/Ş/g,"S")
    .replace(/ş/g,"s")
    .replace(/Ğ/g,"G")
    .replace(/ğ/g,"g")
    .replace(/Ü/g,"U")
    .replace(/ü/g,"u")
    .replace(/Ö/g,"O")
    .replace(/ö/g,"o")
    .replace(/Ç/g,"C")
    .replace(/ç/g,"c")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-+|-+$/g,"");

export default function AudiobookUploadPage() {
  const [audioFile,setAudioFile] = useState<File | null>(null);
  const [coverFile,setCoverFile] = useState<File | null>(null);
  const [coverPreview,setCoverPreview] = useState("");
  const [detectedDuration,setDetectedDuration] = useState<number | undefined>();
  const [title,setTitle] = useState("");
  const [author,setAuthor] = useState("");
  const [voice,setVoice] = useState("");
  const [chapterText,setChapterText] = useState("");
  const [progress,setProgress] = useState(0);
  const [status,setStatus] = useState<"idle"|"uploading"|"done"|"error">("idle");
  const [message,setMessage] = useState("");
  const [authChecked,setAuthChecked] = useState(false);
  const [authenticated,setAuthenticated] = useState(false);
  const [pin,setPin] = useState("");
  const [authMessage,setAuthMessage] = useState("");
  const [current,setCurrent] = useState<CurrentBook | null>(null);
  const [catalog,setCatalog] = useState<CatalogBook[]>([]);
  const [healthStatus,setHealthStatus] = useState<{ok:boolean;streaming?:boolean;totalSize?:number} | null>(null);

  const slug=useMemo(()=>slugify(title),[title]);
  const parsedChapters=useMemo(()=>parseChapters(chapterText),[chapterText]);

  useEffect(()=>{
    void fetch("/api/sesli-kitap/auth",{cache:"no-store"})
      .then((response)=>response.json())
      .then((data)=>{
        setAuthenticated(Boolean(data?.authenticated));
        setAuthChecked(true);
      })
      .catch(()=>{
        setAuthenticated(false);
        setAuthChecked(true);
      });
  },[]);

  useEffect(()=>{
    if(!authenticated) return;
    void Promise.all([
      fetch("/api/sesli-kitap/current",{cache:"no-store"}).then((response)=>response.json()),
      fetch("/api/sesli-kitap/health",{cache:"no-store"}).then(async(response)=>({
        ok:response.ok,
        data:await response.json().catch(()=>null),
      })),
      fetch("/api/sesli-kitap/catalog",{cache:"no-store"}).then((response)=>response.json()).catch(()=>({books:[]})),
    ]).then(([book,health,catalogData])=>{
      setCurrent(book);
      setTitle(typeof book?.title==="string" ? book.title : "");
      setAuthor(typeof book?.author==="string" ? book.author : "");
      setVoice(typeof book?.voice==="string" ? book.voice : "");
      if(Array.isArray(book?.chapters) && book.chapters.length){
        setChapterText(
          book.chapters
            .map((item:Chapter)=>`${formatTime(item.start)} | ${item.title}`)
            .join("\n")
        );
      }else{
        setChapterText("");
      }
      setCatalog(Array.isArray(catalogData?.books) ? catalogData.books : []);
      setHealthStatus({
        ok:Boolean(health.ok && health.data?.ok),
        streaming:Boolean(health.data?.streaming),
        totalSize:typeof health.data?.totalSize==="number" ? health.data.totalSize : undefined,
      });
    }).catch(()=>{
      setCurrent(null);
      setHealthStatus({ok:false});
    });
  },[authenticated]);

  useEffect(()=>{
    if(!coverFile){
      setCoverPreview("");
      return;
    }
    const url=URL.createObjectURL(coverFile);
    setCoverPreview(url);
    return()=>URL.revokeObjectURL(url);
  },[coverFile]);

  function inspectAudio(file:File | null){
    setAudioFile(file);
    setDetectedDuration(undefined);
    setStatus("idle");
    setMessage("");
    if(!file) return;

    const url=URL.createObjectURL(file);
    const audio=document.createElement("audio");
    audio.preload="metadata";
    audio.src=url;
    audio.onloadedmetadata=()=>{
      if(Number.isFinite(audio.duration)) setDetectedDuration(audio.duration);
      URL.revokeObjectURL(url);
    };
    audio.onerror=()=>URL.revokeObjectURL(url);
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthMessage("");
    const response=await fetch("/api/sesli-kitap/auth",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({pin}),
    });
    const data=await response.json().catch(()=>null);
    if(!response.ok){
      setAuthMessage(data?.error || "Giriş yapılamadı.");
      return;
    }
    setAuthenticated(true);
    setPin("");
  }

  async function logout() {
    await fetch("/api/sesli-kitap/auth",{method:"DELETE"}).catch(()=>null);
    setAuthenticated(false);
    setPin("");
    setAuthMessage("");
  }

  function startNewBook() {
    setTitle("");
    setAuthor("");
    setVoice("");
    setChapterText("");
    setAudioFile(null);
    setCoverFile(null);
    setCoverPreview("");
    setDetectedDuration(undefined);
    setStatus("idle");
    setMessage("");
    setProgress(0);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(!title.trim() || !author.trim() || !slug){
      setStatus("error");
      setMessage("Kitap adı ve yazar adı zorunludur.");
      return;
    }
    if(!audioFile || !coverFile){
      setStatus("error");
      setMessage("MP3 dosyası ve kapak görseli birlikte seçilmelidir.");
      return;
    }

    const isMp3=audioFile.name.toLowerCase().endsWith(".mp3") &&
      (!audioFile.type || ["audio/mpeg","audio/mp3"].includes(audioFile.type));
    if(!isMp3){
      setStatus("error");
      setMessage("Lütfen geçerli bir MP3 dosyası seçin.");
      return;
    }
    if(audioFile.size>120*1024*1024){
      setStatus("error");
      setMessage("MP3 dosyası 120 MB sınırını aşıyor.");
      return;
    }
    if(coverFile.size>10*1024*1024 || !["image/png","image/jpeg","image/webp"].includes(coverFile.type)){
      setStatus("error");
      setMessage("Kapak PNG, JPG veya WebP olmalı ve 10 MB'ı aşmamalıdır.");
      return;
    }

    setStatus("uploading");
    setProgress(0);
    setMessage("");

    try{
      const audioPath=`audiobooks/${slug}/master.mp3`;
      const ext=coverFile.type==="image/png" ? "png" : coverFile.type==="image/webp" ? "webp" : "jpg";
      const coverPath=`audiobooks/${slug}/cover.${ext}`;

      const audioBlob=await upload(audioPath,audioFile,{
        access:"public",
        handleUploadUrl:"/api/sesli-kitap/upload",
        multipart:true,
        onUploadProgress:(event)=>setProgress(Math.round(event.percentage*0.8)),
      });

      const coverBlob=await upload(coverPath,coverFile,{
        access:"public",
        handleUploadUrl:"/api/sesli-kitap/upload",
        onUploadProgress:(event)=>setProgress(80+Math.round(event.percentage*0.12)),
      });

      const manifest={
        version:1 as const,
        slug,
        title:title.trim(),
        author:author.trim(),
        voice:voice.trim() || undefined,
        coverUrl:coverBlob.url,
        audioUrl:audioBlob.url,
        duration:detectedDuration,
        chapters:parsedChapters.length
          ? parsedChapters
          : [{id:1,title:"Kitabın Tamamı",start:0}],
        updatedAt:new Date().toISOString(),
      };

      const manifestFile=new File(
        [JSON.stringify(manifest)],
        "active.json",
        {type:"application/json"},
      );

      const bookManifestFile=new File(
        [JSON.stringify(manifest)],
        "manifest.json",
        {type:"application/json"},
      );

      await upload(`audiobooks/${slug}/manifest.json`,bookManifestFile,{
        access:"public",
        handleUploadUrl:"/api/sesli-kitap/upload",
        onUploadProgress:(event)=>setProgress(92+Math.round(event.percentage*0.02)),
      });

      const nextCatalog=[
        ...catalog.filter((item)=>item.slug!==slug),
        manifest,
      ].sort((a,b)=>(b.updatedAt || "").localeCompare(a.updatedAt || ""));

      const catalogFile=new File(
        [JSON.stringify(nextCatalog)],
        "catalog.json",
        {type:"application/json"},
      );

      await upload("audiobooks/catalog.json",catalogFile,{
        access:"public",
        handleUploadUrl:"/api/sesli-kitap/upload",
        onUploadProgress:(event)=>setProgress(94+Math.round(event.percentage*0.02)),
      });

      await upload("audiobooks/active.json",manifestFile,{
        access:"public",
        handleUploadUrl:"/api/sesli-kitap/upload",
        onUploadProgress:(event)=>setProgress(96+Math.round(event.percentage*0.04)),
      });

      setProgress(100);
      setCurrent({
        ready:true,
        ...manifest,
        url:audioBlob.url,
        size:audioFile.size,
        uploadedAt:manifest.updatedAt,
        source:"active-manifest",
      });
      setCatalog(nextCatalog);
      setHealthStatus({ok:true,totalSize:audioFile.size});
      setStatus("done");
      setMessage(`Sesli kitap yayınlandı. Kalıcı player adresi: /dinle/${slug}`);
    }catch(error){
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Yükleme sırasında hata oluştu.");
    }
  }

  if(!authChecked){
    return <main className={styles.page}><section className={styles.card}><div className={styles.authBox}>Yönetim paneli hazırlanıyor…</div></section></main>;
  }

  if(!authenticated){
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.authBox}>
            <span>22 YAYINEVİ</span>
            <h1>22 Yayınevi · Sesli Kitap Yönetimi</h1>
            <p>Sesli kitap yayınlamak için yönetici girişi gereklidir.</p>
            <form onSubmit={login}>
              <input
                type="password"
                inputMode="numeric"
                autoComplete="current-password"
                placeholder="Yönetici PIN"
                value={pin}
                onChange={(event)=>setPin(event.target.value)}
              />
              <button type="submit">Giriş Yap</button>
            </form>
            {authMessage && <small>{authMessage}</small>}
          </div>
        </section>
      </main>
    );
  }

  const currentSize=current?.size || healthStatus?.totalSize;
  const displayCover=coverPreview || current?.coverUrl || "/bir_sifaci_png.png";

  return (
    <main className={styles.page}>
      <PanelSidebar active="audio" />
      <section className={styles.card}>
        <div className={styles.adminTop}>
          <a href="/" className={styles.brand} aria-label="22 Yayınevi ana sayfa">
            <span>22</span>
            <small>YAYINEVİ</small>
          </a>
          <div className={styles.adminActions}>
            <a href="/panel/reader">22 Reader</a>
            <button type="button" onClick={startNewBook}>+ Yeni Kitap</button>
            <button type="button" onClick={logout}>Çıkış</button>
          </div>
        </div>

        <div className={styles.heading}>
          <p>SESLİ KİTAP YÖNETİMİ</p>
          <h1>{title || "Yeni Sesli Kitap"}</h1>
          <span>Kapak, kitap bilgileri, bölümler ve master MP3 tek panelden yayınlanır. Player tasarımı sabit kalır.</span>
        </div>

        <div className={styles.bookRow}>
          <div className={styles.coverPreview}>
            <img src={displayCover} alt="" />
          </div>
          <div>
            <b>Aktif player</b>
            <strong className={styles.currentTitle}>{current?.title || "Henüz yayın yok"}</strong>
            <p>{current?.author || "Yazar bilgisi yok"}{current?.voice ? ` · ${current.voice} sesi` : ""}</p>
            <a href={current?.slug ? `/dinle/${current.slug}` : "/dinle"} target="_blank" rel="noreferrer">Player'ı Aç →</a>
          </div>
        </div>

        <div className={styles.masterState}>
          <div><span>DURUM</span><strong>{current?.ready ? "Yayına hazır" : "Hazırlanıyor"}</strong></div>
          <div><span>SÜRE</span><strong>{formatTime(detectedDuration || current?.duration)}</strong></div>
          <div><span>BOYUT</span><strong>{currentSize ? `${(currentSize/1024/1024).toFixed(1)} MB` : "—"}</strong></div>
          <div><span>SES KONTROLÜ</span><strong>{healthStatus?.ok ? "✓ Erişilebilir" : "—"}</strong></div>
          <div><span>AKIŞ</span><strong>{healthStatus?.streaming ? "✓ Byte-range" : healthStatus?.ok ? "Hazır" : "—"}</strong></div>
          <div><span>KAYNAK</span><strong>{current?.source==="active-manifest" ? "Aktif yayın" : current?.source==="blob" ? "Vercel Blob" : "Fallback"}</strong></div>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.metaGrid}>
            <label>
              <span>Kitap adı</span>
              <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Kitabın adı" />
            </label>
            <label>
              <span>Yazar</span>
              <input value={author} onChange={(e)=>setAuthor(e.target.value)} placeholder="Yazar adı" />
            </label>
            <label>
              <span>Seslendiren</span>
              <input value={voice} onChange={(e)=>setVoice(e.target.value)} placeholder="Örn. Elif" />
            </label>
            <label>
              <span>Yayın kodu</span>
              <input value={slug} readOnly />
            </label>
          </div>

          <div className={styles.chapterEditor}>
            <div className={styles.chapterEditorHead}>
              <div>
                <span>Bölümler</span>
                <strong>{parsedChapters.length ? `${parsedChapters.length} bölüm hazır` : "Bölüm girilmezse tek parça oynatılır"}</strong>
              </div>
              <small>Örnek: 00:00 | Giriş</small>
            </div>
            <textarea
              value={chapterText}
              onChange={(event)=>setChapterText(event.target.value)}
              placeholder={"00:00 | Giriş\n03:25 | Birinci Bölüm\n12:40 | İkinci Bölüm"}
              rows={7}
            />
            <p>Her satırda başlangıç zamanı ve bölüm adı yazın. Player'daki Bölümler alanı otomatik oluşur.</p>
          </div>

          <div className={styles.fileGrid}>
            <label className={styles.drop}>
              <input
                type="file"
                accept=".mp3,audio/mpeg"
                onChange={(event)=>inspectAudio(event.target.files?.[0] ?? null)}
              />
              <span className={styles.uploadIcon}>♪</span>
              <strong>{audioFile ? audioFile.name : "Master MP3 seçin"}</strong>
              <small>{audioFile ? `${(audioFile.size/1024/1024).toFixed(1)} MB · ${formatTime(detectedDuration)}` : "MP3 · en fazla 120 MB"}</small>
            </label>

            <label className={styles.drop}>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
                onChange={(event)=>{
                  setCoverFile(event.target.files?.[0] ?? null);
                  setStatus("idle");
                  setMessage("");
                }}
              />
              <span className={styles.uploadIcon}>▣</span>
              <strong>{coverFile ? coverFile.name : "Kapak görselini seçin"}</strong>
              <small>PNG · JPG · WebP · en fazla 10 MB</small>
            </label>
          </div>

          {status==="uploading" && (
            <div className={styles.progressArea}>
              <div className={styles.progressTop}><span>Kitap yayınlanıyor</span><b>{progress}%</b></div>
              <div className={styles.progress}><i style={{width:`${progress}%`}} /></div>
              <small>Önce MP3, sonra kapak ve yayın bilgileri kaydediliyor.</small>
            </div>
          )}

          {message && <div className={status==="done" ? styles.success : styles.error}>{message}</div>}

          <button type="submit" disabled={status==="uploading"}>
            {status==="uploading" ? "Yayınlanıyor…" : "Sesli Kitabı Yayınla"}
          </button>
        </form>

        <div className={styles.catalogSection}>
          <div className={styles.catalogHead}>
            <div>
              <span>YAYINLANAN SESLİ KİTAPLAR</span>
              <strong>{catalog.length} kitap</strong>
            </div>
          </div>
          <div className={styles.catalogList}>
            {catalog.length ? catalog.map((item)=>(
              <a key={item.slug} href={`/dinle/${item.slug}`} target="_blank" rel="noreferrer" className={styles.catalogItem}>
                <img src={item.coverUrl} alt="" />
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.author}{item.voice ? ` · ${item.voice}` : ""}</span>
                  <small>{formatTime(item.duration)} · {item.chapters?.length || 1} bölüm</small>
                </div>
                <b>Dinle →</b>
              </a>
            )) : (
              <div className={styles.catalogEmpty}>İlk sesli kitabınızı yayınladığınızda burada görünecek.</div>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <span>{formatTime(detectedDuration || current?.duration)}</span>
          <span>{parsedChapters.length || current?.chapters?.length || 1} bölüm</span>
          <span>{current?.author || "22 Yayınevi"}</span>
          <span>Dinamik player</span>
        </div>
      </section>

      <PublicationPreviewDock
        activeMode="audio"
        title={title}
        author={author}
        coverSrc={coverPreview || current?.coverUrl || ""}
        voice={voice}
        audioDuration={formatTime(detectedDuration || current?.duration)}
        chapterLabel={parsedChapters.length ? `${parsedChapters.length} bölüm` : `${current?.chapters?.length || 1} bölüm`}
        status={status === "done" ? "Yayına hazır" : "Taslak"}
      />
    </main>
  );
}
