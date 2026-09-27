"use client";

import { FormEvent, useEffect, useState } from "react";
import { uploadPresigned } from "@vercel/blob/client";
import styles from "./upload.module.css";

const TARGET_PATH = "audiobooks/bir-sifacinin-kanadi/master.mp3";

export default function AudiobookUploadPage() {
  const [file,setFile] = useState<File | null>(null);
  const [progress,setProgress] = useState(0);
  const [status,setStatus] = useState<"idle"|"uploading"|"done"|"error">("idle");
  const [message,setMessage] = useState("");
  const [url,setUrl] = useState("");
  const [authChecked,setAuthChecked] = useState(false);
  const [authenticated,setAuthenticated] = useState(false);
  const [pin,setPin] = useState("");
  const [authMessage,setAuthMessage] = useState("");
  const [verified,setVerified] = useState(false);
  const [masterStatus,setMasterStatus] = useState<{
    ready:boolean;
    size?:number;
    uploadedAt?:string;
    source?:string;
  } | null>(null);
  const [healthStatus,setHealthStatus] = useState<{
    ok:boolean;
    contentType?:string | null;
    contentLength?:number;
    acceptRanges?:string | null;
  } | null>(null);

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
    ])
      .then(([current,health])=>{
        setMasterStatus({
          ready:Boolean(current?.ready),
          size:typeof current?.size==="number" ? current.size : undefined,
          uploadedAt:typeof current?.uploadedAt==="string" ? current.uploadedAt : undefined,
          source:typeof current?.source==="string" ? current.source : undefined,
        });
        setHealthStatus({
          ok:Boolean(health.ok && health.data?.ok),
          contentType:typeof health.data?.contentType==="string" ? health.data.contentType : null,
          contentLength:typeof health.data?.contentLength==="number" ? health.data.contentLength : undefined,
          acceptRanges:typeof health.data?.acceptRanges==="string" ? health.data.acceptRanges : null,
        });
      })
      .catch(()=>{
        setMasterStatus({ready:false});
        setHealthStatus({ok:false});
      });
  },[authenticated]);

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

  async function verifyPublishedAudio(expectedUrl:string) {
    try{
      const [currentResponse,healthResponse]=await Promise.all([
        fetch("/api/sesli-kitap/current",{cache:"no-store"}),
        fetch("/api/sesli-kitap/health",{cache:"no-store"}),
      ]);
      const data=await currentResponse.json();
      const health=await healthResponse.json().catch(()=>null);
      const currentOk=Boolean(
        currentResponse.ok &&
        data?.ready &&
        typeof data.url==="string" &&
        data.url &&
        (data.pathname==="audiobooks/bir-sifacinin-kanadi/master.mp3" || data.url===expectedUrl)
      );
      const ok=Boolean(currentOk && healthResponse.ok && health?.ok);
      setVerified(ok);
      setHealthStatus({
        ok,
        contentType:typeof health?.contentType==="string" ? health.contentType : null,
        contentLength:typeof health?.contentLength==="number" ? health.contentLength : undefined,
        acceptRanges:typeof health?.acceptRanges==="string" ? health.acceptRanges : null,
      });
      return ok;
    }catch{
      setVerified(false);
      setHealthStatus({ok:false});
      return false;
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;

    const isMp3Name=file.name.toLowerCase().endsWith(".mp3");
    const isMp3Type=!file.type || ["audio/mpeg","audio/mp3"].includes(file.type);
    if (!isMp3Name || !isMp3Type) {
      setStatus("error");
      setMessage("Lütfen geçerli bir MP3 dosyası seçin.");
      return;
    }
    if (file.size > 120 * 1024 * 1024) {
      setStatus("error");
      setMessage("MP3 dosyası 120 MB sınırını aşıyor.");
      return;
    }

    setStatus("uploading");
    setProgress(0);
    setMessage("");
    setUrl("");
    setVerified(false);

    try {
      const blob = await uploadPresigned(TARGET_PATH,file,{
        access:"public",
        handleUploadUrl:"/api/sesli-kitap/upload",
        multipart:true,
        onUploadProgress:(event)=>setProgress(Math.round(event.percentage)),
      });

      setUrl(blob.url);
      const ok=await verifyPublishedAudio(blob.url);
      if(ok){
        const response=await fetch("/api/sesli-kitap/current",{cache:"no-store"});
        const data=await response.json().catch(()=>null);
        setMasterStatus({
          ready:Boolean(data?.ready),
          size:typeof data?.size==="number" ? data.size : file.size,
          uploadedAt:typeof data?.uploadedAt==="string" ? data.uploadedAt : new Date().toISOString(),
          source:typeof data?.source==="string" ? data.source : "blob",
        });
      }
      setStatus("done");
      setMessage(
        ok
          ? "Master ses dosyası yüklendi ve player kaynağı doğrulandı."
          : "Dosya yüklendi; player kaynağı henüz doğrulanamadı."
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Yükleme sırasında hata oluştu.");
    }
  }

  const size = file ? (file.size / 1024 / 1024).toFixed(1) : null;

  if(!authChecked){
    return <main className={styles.page}><section className={styles.card}><div className={styles.authBox}>Yönetim paneli hazırlanıyor…</div></section></main>;
  }

  if(!authenticated){
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.authBox}>
            <span>22 YAYINEVİ</span>
            <h1>Sesli Kitap Yönetimi</h1>
            <p>Master ses dosyasını değiştirmek için yönetici girişi gereklidir.</p>
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

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <a href="/" className={styles.brand} aria-label="22 Yayınevi ana sayfa">
          <span>22</span>
          <small>YAYINEVİ</small>
        </a>

        <div className={styles.heading}>
          <p>SESLİ KİTAP YÖNETİMİ</p>
          <h1>Bir Şifacının Kanadı</h1>
          <span>Figen Yavuz · Master MP3 yükleme</span>
        </div>

        <div className={styles.bookRow}>
          <div className={styles.cover}>
            <small>FİGEN YAVUZ</small>
            <strong>Bir<br/>Şifacının<br/>Kanadı</strong>
            <span>22 YAYINEVİ</span>
          </div>
          <div>
            <b>Hedef dosya</b>
            <code>{TARGET_PATH}</code>
            <p>Web player tek master MP3 kullanır. Bölüm geçişleri dosyanın içindeki zaman işaretlerinden yapılır.</p>
          </div>
        </div>

        <div className={styles.masterState}>
          <div>
            <span>MEVCUT MASTER</span>
            <strong>{masterStatus?.ready && healthStatus?.ok ? "Yayına hazır" : masterStatus?.ready ? "Kaynak kontrolü" : "Kontrol ediliyor"}</strong>
          </div>
          <div>
            <span>BOYUT</span>
            <strong>{masterStatus?.size ? `${(masterStatus.size/1024/1024).toFixed(1)} MB` : "—"}</strong>
          </div>
          <div>
            <span>SON YÜKLEME</span>
            <strong>{masterStatus?.uploadedAt ? new Date(masterStatus.uploadedAt).toLocaleString("tr-TR") : "—"}</strong>
          </div>
          <a href="/dinle/bir-sifacinin-kanadi" target="_blank" rel="noreferrer">Player'ı Aç →</a>
          <div>
            <span>SES KONTROLÜ</span>
            <strong>{healthStatus?.ok ? "✓ Erişilebilir" : "—"}</strong>
          </div>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.drop}>
            <input
              type="file"
              accept=".mp3,audio/mpeg"
              onChange={(event)=>{
                const next=event.target.files?.[0] ?? null;
                setFile(next);
                setStatus("idle");
                setProgress(0);
                setMessage("");
              }}
            />
            <span className={styles.uploadIcon}>↑</span>
            <strong>{file ? file.name : "Master MP3 dosyasını seçin"}</strong>
            <small>{file ? `${size} MB` : "MP3 · en fazla 120 MB"}</small>
          </label>

          {status === "uploading" && (
            <div className={styles.progressArea}>
              <div className={styles.progressTop}><span>Yükleniyor</span><b>{progress}%</b></div>
              <div className={styles.progress}><i style={{width:`${progress}%`}} /></div>
              <small>Tarayıcıyı kapatmayın. Dosya doğrudan Vercel Blob'a yükleniyor.</small>
            </div>
          )}

          {message && <div className={status === "done" ? styles.success : styles.error}>{message}</div>}

          {url && (
            <div className={styles.result}>
              <span>YAYIN DURUMU</span>
              <b>{verified ? "✓ Player kaynağı doğrulandı" : "Kontrol bekliyor"}</b>
            </div>
          )}

          <button type="submit" disabled={!file || status === "uploading"}>
            {status === "uploading" ? "Yükleniyor…" : "Ses Dosyasını Yükle"}
          </button>
        </form>

        <div className={styles.footer}>
          <span>2:21:17</span>
          <span>85 bölüm</span>
          <span>64 kbps</span>
          <span>Web master</span>
        </div>
      </section>
    </main>
  );
}
