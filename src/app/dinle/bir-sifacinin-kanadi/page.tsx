"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./player.module.css";

type Chapter = { id: number; title: string; start: number };

const FALLBACK_AUDIO =
  process.env.NEXT_PUBLIC_BIR_SIFACININ_KANADI_AUDIO_URL ||
  "https://edmrsvk0wqrotocr.public.blob.vercel-storage.com/audiobooks/bir-sifacinin-kanadi/master.mp3";
const BOOK_DURATION = 8477.232;
const PROGRESS_KEY = "22y-bir-sifacinin-kanadi-progress";
// deploy-refresh: audiobook upload flow + Blob auto-connect

const chapters: Chapter[] = [
  [1,"ARAYIŞIN YOLCULUĞU",0.0],
  [2,"MİNİK DETAYLARDAKİ BÜYÜK MUCİZELERİ GÖRMEK",70.7],
  [3,"GÖZÜN AÇIK GİTMESİN",326.6],
  [4,"TANRI ZAR ATMAMIŞ",414.3],
  [5,"BİR ÇİFT GÖZÜN DEĞDİĞİ ANDADIR BAZEN HUZUR",559.2],
  [6,"ÖĞRENDİM",627.3],
  [7,"SESSİZ YOLCULUK",693.5],
  [8,"ÇEMBERİN",826.7],
  [9,"HASSAS KİŞİLİK SENDROMU",898.2],
  [10,"ONDA OLAN PARÇAM",1178.4],
  [11,"KENDİ HAKİKATİN AYNALARDA",1237.8],
  [12,"KORKUNUN BÜYÜ ETKİSİ",1253.5],
  [13,"İLAHÎ IŞIK RUHLAR",1382.5],
  [14,"VEDALAR",1433.2],
  [15,"YETİŞECEK YER YOK",1488.5],
  [16,"AZAT ET",1531.8],
  [17,"KAZANMAK DA VAR KAYBETMEK DE.",1542.6],
  [18,"KARŞILAŞMALAR",1612.5],
  [19,"SİZCE?",1639.5],
  [20,"KENDİNDEN TANIRSIN BAZILARINI",1655.5],
  [21,"EKSİK KALANLAR",1679.2],
  [22,"NEFES VARSA UMUT OLUR",1696.0],
  [23,"SEN SEV YETER",1717.9],
  [24,"YOL",1826.9],
  [25,"IŞIĞINI GÖRMEYENE GÜNEŞ OLMA",1877.5],
  [26,"RUH SİMYACISI",2161.5],
  [27,"İHTİYACIMIZ OLAN",2395.4],
  [28,"AHENK",2453.1],
  [29,"TANRI BEKLERKEN BULUNMAZMIŞ",2754.3],
  [30,"ZATEN SAHİP OLMAK",2922.6],
  [31,"SON EMİR",3093.1],
  [32,"MARİFET İLTİFATA TABİDİR",3151.8],
  [33,"İNSAN OLMAK",3180.2],
  [34,"KAYBEDİP BULMAK",3322.2],
  [35,"BU ALEMDE",3419.6],
  [36,"HİÇBİR ŞEY GÖRÜNDÜĞÜ GİBİ DEĞİL",3532.7],
  [37,"SESİ KISIK OLURMUŞ GÜZELLİĞİN",3811.7],
  [38,"ASIL HİKÂYE VE SIRLAR",4143.7],
  [39,"AYNA",4252.6],
  [40,"RÜYALARIN SANCILI GEZİNTİSİ",4260.7],
  [41,"BAZEN",4409.9],
  [42,"HAYAT TEK KULLANIMLIK",4458.0],
  [43,"KALBİ OKUYABİLMEK",4627.7],
  [44,"MUCİZEYİZ",4639.2],
  [45,"TEK HAKİKAT",4671.2],
  [46,"HER ŞEY GEÇİYOR",4683.6],
  [47,"YOL ALMAK",4720.3],
  [48,"ORMANLAR",4732.0],
  [49,"KİM OLDUĞUNU BİLMEK",4743.2],
  [50,"DÖNÜN YOL YAKINKEN",4851.1],
  [51,"DENGENİN HİKMETİ",5025.7],
  [52,"YILDIZLARLA BULACAĞIN ŞİFA",5121.3],
  [53,"VAR OLMAK",5235.0],
  [54,"RÜYA",5260.7],
  [55,"BAZILARI BAŞKADIR",5313.6],
  [56,"TÜM HAKİKATİN ANLAŞILACAĞI AN",5382.9],
  [57,"DEĞİŞİM İÇİN",5561.6],
  [58,"BEDEN KAFTANIMIZ OLMASAYDI",5608.6],
  [59,"BİR ŞEYİ DE BİLMEN GEREK",5664.4],
  [60,"DEĞİŞİM",5705.2],
  [61,"ERDEM YOLCULUĞU",5816.5],
  [62,"MUTLULUK DEDİĞİN ŞEY",5921.6],
  [63,"BİLSE SEVER MİYDİ BEŞER",6025.4],
  [64,"EN BÜYÜK BULUŞ",6136.0],
  [65,"ŞER VE HAYIR",6169.9],
  [66,"SON EMİR",6226.2],
  [67,"UNUTMAYI SEÇTİK UYANABİLİRDİK",6280.9],
  [68,"GÖZLERİN KÜTÜPHANESİ",6394.4],
  [69,"UMUT ŞARTTIR YAŞAMAK İÇİN",6407.6],
  [70,"KODLARINIZ",6447.7],
  [71,"BIRAKMAK",6485.0],
  [72,"AŞK TÜKENDİ",6503.2],
  [73,"TANIK OLMAK",6605.7],
  [74,"SENİN KAPIN",7083.3],
  [75,"BUL HİRAN’I",7101.2],
  [76,"İNSANLAR KÖTÜ DOĞMAZLAR, SONRADAN OLURLAR",7186.3],
  [77,"MASALARIM VAR BENİM",7310.6],
  [78,"BİRİNİN FELAKETİ BİRİNİN MUCİZESİ",7324.4],
  [79,"YOLUM SENDİN",7497.5],
  [80,"İHTİŞAMLI BİR YARIN İÇİN",7532.9],
  [81,"İNANDIĞIN KADAR VARSIN, İNANDIĞIN KADAR YAŞARSIN",7786.3],
  [82,"YEMEĞİN PİŞTİĞİ YERDE MUTLAK KOKUSU SİNER ÜZERİNE",7843.8],
  [83,"MAZİMDEN İSTİFA",8205.1],
  [84,"AŞK",8301.9],
  [85,"AŞKIN ARACILARI",8391.7],
].map(([id,title,start]) => ({ id: id as number, title: title as string, start: start as number }));

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return hours > 0
    ? `${hours}:${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`
    : `${mins}:${secs.toString().padStart(2,"0")}`;
};

export default function BirSifacininKanadiPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSavedSecondRef = useRef(-1);
  const [chapterIndex,setChapterIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [currentTime,setCurrentTime] = useState(0);
  const [duration,setDuration] = useState(BOOK_DURATION);
  const [rate,setRate] = useState(1);
  const [chaptersOpen,setChaptersOpen] = useState(false);
  const [sleepMinutes,setSleepMinutes] = useState<number | null>(null);
  const [sleepLeft,setSleepLeft] = useState<number | null>(null);
  const [audioError,setAudioError] = useState(false);
  const [audioSrc,setAudioSrc] = useState(FALLBACK_AUDIO);

  const chapter = chapters[chapterIndex];
  const chapterEnd = chapters[chapterIndex + 1]?.start ?? duration;
  const chapterDuration = Math.max(0,chapterEnd - chapter.start);

  useEffect(()=>{
    document.body.classList.add("reader-route");
    const dock = document.querySelector<HTMLElement>(".mobile-dock");
    const previousDockDisplay = dock?.style.display ?? "";
    const previousPaddingBottom = document.body.style.paddingBottom;
    const previousOverflow = document.body.style.overflow;
    if(dock) dock.style.display = "none";
    document.body.style.paddingBottom = "0";
    document.body.style.overflow = "hidden";
    return()=>{
      document.body.classList.remove("reader-route");
      if(dock) dock.style.display = previousDockDisplay;
      document.body.style.paddingBottom = previousPaddingBottom;
      document.body.style.overflow = previousOverflow;
    };
  },[]);

  useEffect(()=>{
    void fetch("/api/sesli-kitap/current",{cache:"no-store"})
      .then((response)=>response.ok?response.json():null)
      .then((data)=>{
        if(data?.ready && typeof data.url==="string" && data.url) setAudioSrc(data.url);
      })
      .catch(()=>{});
  },[]);

  useEffect(()=>{
    const saved=window.localStorage.getItem(PROGRESS_KEY);
    if(!saved) return;
    try{
      const parsed=JSON.parse(saved) as {currentTime?:number;rate?:number};
      if(typeof parsed.currentTime==="number" && parsed.currentTime>=0){
        setCurrentTime(parsed.currentTime);
        const idx=[...chapters].reverse().findIndex((item)=>parsed.currentTime!>=item.start);
        if(idx>=0) setChapterIndex(chapters.length-1-idx);
      }
      if(typeof parsed.rate==="number" && [0.75,1,1.25,1.5,1.75,2].includes(parsed.rate)){
        setRate(parsed.rate);
      }
    }catch{}
  },[]);

  useEffect(()=>{
    const audio=audioRef.current;
    if(!audio) return;
    const restore=()=>{
      let resumeAt=0;
      let savedRate=1;
      try{
        const saved=window.localStorage.getItem(PROGRESS_KEY);
        if(saved){
          const parsed=JSON.parse(saved) as {currentTime?:number;rate?:number};
          if(typeof parsed.currentTime==="number" && parsed.currentTime>=0) resumeAt=parsed.currentTime;
          if(typeof parsed.rate==="number" && [0.75,1,1.25,1.5,1.75,2].includes(parsed.rate)) savedRate=parsed.rate;
        }
      }catch{}
      const actualDuration=audio.duration || BOOK_DURATION;
      if(resumeAt>0 && resumeAt<actualDuration-1){
        audio.currentTime=resumeAt;
        setCurrentTime(resumeAt);
      }
      audio.playbackRate=savedRate;
      setRate(savedRate);
      setDuration(actualDuration);
    };
    audio.addEventListener("loadedmetadata",restore,{once:true});
    return()=>audio.removeEventListener("loadedmetadata",restore);
  },[]);

  useEffect(()=>{
    const timer=window.setInterval(()=>{
      try{
        window.localStorage.setItem(PROGRESS_KEY,JSON.stringify({currentTime,rate,updatedAt:Date.now()}));
      }catch{}
    },4000);
    return()=>window.clearInterval(timer);
  },[currentTime,rate]);

  useEffect(()=>{
    const index=Math.max(0,chapters.findIndex((item,i)=>{
      const next=chapters[i+1]?.start ?? Infinity;
      return currentTime>=item.start && currentTime<next;
    }));
    if(index!==chapterIndex) setChapterIndex(index);
  },[currentTime,chapterIndex]);

  useEffect(()=>{
    if(!sleepMinutes){setSleepLeft(null);return;}
    const endAt=Date.now()+sleepMinutes*60000;
    const timer=window.setInterval(()=>{
      const remaining=Math.max(0,Math.ceil((endAt-Date.now())/1000));
      setSleepLeft(remaining);
      if(remaining<=0){
        audioRef.current?.pause();
        setPlaying(false);
        setSleepMinutes(null);
      }
    },1000);
    return()=>window.clearInterval(timer);
  },[sleepMinutes]);

  const progress=duration>0?Math.min(100,(currentTime/duration)*100):0;
  const sleepLabel=useMemo(()=>{
    if(sleepLeft===null) return "Uyku";
    return `${Math.floor(sleepLeft/60)}:${(sleepLeft%60).toString().padStart(2,"0")}`;
  },[sleepLeft]);

  const togglePlay=async()=>{
    const audio=audioRef.current;
    if(!audio) return;
    setAudioError(false);
    if(playing){audio.pause();setPlaying(false);return;}
    try{
      if(audio.readyState===0) audio.load();
      await audio.play();
      setPlaying(true);
    }catch(error){
      console.error("Audiobook play error:",error);
      setAudioError(true);
      setPlaying(false);
    }
  };

  const seekBy=(amount:number)=>{
    const audio=audioRef.current;
    if(!audio) return;
    audio.currentTime=Math.max(0,Math.min(audio.duration||BOOK_DURATION,audio.currentTime+amount));
  };

  const changeRate=()=>{
    const order=[1,1.25,1.5,1.75,2,0.75];
    const next=order[(order.indexOf(rate)+1)%order.length];
    setRate(next);
    if(audioRef.current) audioRef.current.playbackRate=next;
    try{
      window.localStorage.setItem(PROGRESS_KEY,JSON.stringify({currentTime,rate:next,updatedAt:Date.now()}));
    }catch{}
  };

  const selectChapter=(index:number)=>{
    const audio=audioRef.current;
    if(!audio) return;
    const target=chapters[index].start;
    audio.currentTime=target;
    setCurrentTime(target);
    setChapterIndex(index);
    setChaptersOpen(false);
    void audio.play().then(()=>setPlaying(true)).catch(()=>setAudioError(true));
  };

  const cycleSleep=()=>{
    const order:Array<number|null>=[15,30,45,60,null];
    setSleepMinutes(order[(order.indexOf(sleepMinutes)+1)%order.length]);
  };

  return (
    <main className={styles.page}>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onTimeUpdate={(e)=>{
          const next=e.currentTarget.currentTime;
          setCurrentTime(next);
          const wholeSecond=Math.floor(next);
          if(wholeSecond!==lastSavedSecondRef.current && wholeSecond%4===0){
            lastSavedSecondRef.current=wholeSecond;
            try{
              window.localStorage.setItem(PROGRESS_KEY,JSON.stringify({currentTime:next,rate,updatedAt:Date.now()}));
            }catch{}
          }
        }}
        onLoadedMetadata={(e)=>{
          const audio=e.currentTarget;
          const actualDuration=audio.duration||BOOK_DURATION;
          setDuration(actualDuration);
          let resumeAt=0;
          let savedRate=rate;
          try{
            const saved=window.localStorage.getItem(PROGRESS_KEY);
            if(saved){
              const parsed=JSON.parse(saved) as {currentTime?:number;rate?:number};
              if(typeof parsed.currentTime==="number" && parsed.currentTime>=0) resumeAt=parsed.currentTime;
              if(typeof parsed.rate==="number" && [0.75,1,1.25,1.5,1.75,2].includes(parsed.rate)) savedRate=parsed.rate;
            }
          }catch{}
          if(resumeAt>0 && resumeAt<actualDuration-1){
            audio.currentTime=resumeAt;
            setCurrentTime(resumeAt);
          }
          audio.playbackRate=savedRate;
          setRate(savedRate);
        }}
        onPlay={()=>{setPlaying(true);setAudioError(false);}}
        onPause={()=>setPlaying(false)}
        onCanPlay={()=>setAudioError(false)}
        onEnded={()=>setPlaying(false)}
        onError={()=>{setAudioError(true);setPlaying(false);}}
      />

      <section className={styles.stage}>
        <header className={styles.topbar}>
          <a href="/" className={styles.logo} aria-label="22 Yayınevi ana sayfa">
            <img src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" />
          </a>
          <button className={styles.menuButton} onClick={()=>setChaptersOpen(true)} aria-label="Bölümler">⋮</button>
        </header>

        <div className={styles.content}>
          <div className={styles.coverHero}>
            <img src="/bir_sifaci_png.png" alt="Bir Şifacının Kanadı - Figen Yavuz" />
          </div>

          <div className={styles.listeningLabel}>
            <svg className={styles.waveIcon} viewBox="0 0 28 22" aria-hidden="true">
              <path d="M2 8v6M6 5v12M10 2v18M14 7v8M18 4v14M22 6v10M26 9v4" />
            </svg>
            <span>ŞİMDİ DİNLİYORSUNUZ</span>
          </div>
          <h1>Bir Şifacının Kanadı</h1>
          <p className={styles.bookMeta}>Figen Yavuz · Elif sesi · {formatTime(duration)}</p>

          <div className={styles.divider}>
            <svg className={styles.ornament} viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 2.5c1.2 3 2.8 4.9 5.7 6.1-2.9 1.2-4.5 3.1-5.7 6.1-1.2-3-2.8-4.9-5.7-6.1C7.2 7.4 8.8 5.5 10 2.5Z" />
              <path d="M10 8.6v8.2M7.2 11.6c1.3.2 2.3.9 2.8 2 .5-1.1 1.5-1.8 2.8-2" />
            </svg>
          </div>

          <div className={styles.nowPlaying}>
            <span>BİR ŞİFACININ KANADI</span>
            <h2>{chapter.id}. Bölüm — {chapter.title}</h2>
            <p>{formatTime(chapterDuration)} · Figen Yavuz</p>
          </div>

          <div className={styles.progressWrap}>
            <input
              className={styles.range}
              aria-label="Dinleme konumu"
              type="range"
              min="0"
              max={duration||BOOK_DURATION}
              step="0.1"
              value={Math.min(currentTime,duration||BOOK_DURATION)}
              onChange={(e)=>{
                const value=Number(e.target.value);
                if(audioRef.current) audioRef.current.currentTime=value;
                setCurrentTime(value);
              }}
              style={{"--progress":`${progress}%`} as React.CSSProperties}
            />
            <div className={styles.timeRow}><span>{formatTime(currentTime)}</span><span>-{formatTime(Math.max(0,duration-currentTime))}</span></div>
          </div>

          <div className={styles.transport}>
            <button className={styles.seekButton} onClick={()=>seekBy(-15)} aria-label="15 saniye geri">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M15.6 10.6H8.9V3.9" />
                <path d="M9.6 11A16.8 16.8 0 1 1 7.9 31" />
              </svg>
              <small>15</small>
            </button>
            <button className={styles.play} onClick={togglePlay} aria-label={playing?"Duraklat":"Oynat"}>
              {playing ? (
                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 8v16M22 8v16" /></svg>
              ) : (
                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 7.5 24 16 11 24.5Z" /></svg>
              )}
            </button>
            <button className={styles.seekButton} onClick={()=>seekBy(15)} aria-label="15 saniye ileri">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path d="M32.4 10.6h6.7V3.9" />
                <path d="M38.4 11A16.8 16.8 0 1 0 40.1 31" />
              </svg>
              <small>15</small>
            </button>
          </div>

          {audioError && (
            <div className={styles.audioNotice}>
              <span>Ses yüklenemedi.</span>
              <button
                type="button"
                onClick={()=>{
                  const audio=audioRef.current;
                  if(!audio) return;
                  setAudioError(false);
                  audio.load();
                  void audio.play().then(()=>setPlaying(true)).catch(()=>setAudioError(true));
                }}
              >
                Tekrar dene
              </button>
            </div>
          )}

          <div className={styles.tools}>
            <button onClick={changeRate}><b>{rate}x</b><span>Hız</span></button>
            <button onClick={cycleSleep}>
              <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M23.5 22.5A10.8 10.8 0 0 1 10 9a10 10 0 1 0 13.5 13.5Z" /></svg>
              <span>{sleepLabel}</span>
            </button>
            <button onClick={()=>setChaptersOpen(true)}>
              <svg viewBox="0 0 32 32" aria-hidden="true">
                <path d="M7 8.5h4.5M14.5 8.5H25M7 16h4.5M14.5 16H25M7 23.5h4.5M14.5 23.5H25" />
                <path d="M9.2 6.8v3.4M9.2 14.3v3.4M9.2 21.8v3.4" />
              </svg>
              <span>Bölümler</span>
            </button>
          </div>

          <div className={styles.chapterStrip}>
            <div><span>BÖLÜM {chapter.id} / {chapters.length}</span><strong>{chapter.title}</strong></div>
            <button onClick={()=>setChaptersOpen(true)}>Tüm bölümler <span>→</span></button>
          </div>
        </div>
      </section>

      <aside className={`${styles.drawer} ${chaptersOpen?styles.drawerOpen:""}`} aria-hidden={!chaptersOpen}>
        <button className={styles.drawerBackdrop} aria-label="Bölümleri kapat" onClick={()=>setChaptersOpen(false)} />
        <div className={styles.drawerPanel}>
          <div className={styles.drawerHead}>
            <div><span>22 YAYINEVİ</span><h2>Bölümler</h2></div>
            <button onClick={()=>setChaptersOpen(false)} aria-label="Kapat">×</button>
          </div>
          <div className={styles.drawerBook}>
            <img src="/bir_sifaci_png.png" alt="" />
            <div><strong>Bir Şifacının Kanadı</strong><span>Figen Yavuz</span><small>{chapters.length} bölüm · {formatTime(duration)}</small></div>
          </div>
          <div className={styles.chapterList}>
            {chapters.map((item,index)=>{
              const end=chapters[index+1]?.start??duration;
              return (
                <button key={item.id} className={index===chapterIndex?styles.activeChapter:""} onClick={()=>selectChapter(index)}>
                  <span className={styles.chapterNo}>{item.id.toString().padStart(2,"0")}</span>
                  <span className={styles.chapterText}><strong>{item.title}</strong><small>{formatTime(Math.max(0,end-item.start))}</small></span>
                  <span className={styles.chapterPlay}>{index===chapterIndex&&playing?"Ⅱ":"▶"}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </main>
  );
}
