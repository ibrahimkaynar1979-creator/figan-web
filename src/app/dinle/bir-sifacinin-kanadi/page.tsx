"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./player.module.css";

type Chapter = { id: number; title: string; start: number };

const FALLBACK_AUDIO =
  process.env.NEXT_PUBLIC_BIR_SIFACININ_KANADI_AUDIO_URL ||
  "https://edmrsvk0wqrotocr.public.blob.vercel-storage.com/audiobooks/bir-sifacinin-kanadi/master.mp3";
const BOOK_DURATION = 8477.232;
// deploy-refresh: audiobook upload flow + Blob auto-connect

const chapters: Chapter[] = [
  [1,"ARAYIŞIN YOLCULUĞU",0.0],
  [2,"MİNİK DETAYLARDAKİ BÜYÜK MUCİZELERİ GÖRMEK",70.7],
  [3,"GÖZÜN AÇIK GİTMESİN",325.918],
  [4,"TANRI ZAR ATMAMIŞ",414.557],
  [5,"BİR ÇİFT GÖZÜN DEĞDİĞİ ANDADIR BAZEN HUZUR",559.201],
  [6,"ÖĞRENDİM",627.316],
  [7,"SESSİZ YOLCULUK",693.465],
  [8,"ÇEMBERİN",826.658],
  [9,"HASSAS KİŞİLİK SENDROMU",898.183],
  [10,"ONDA OLAN PARÇAM",1178.4],
  [11,"KENDİ HAKİKATİN AYNALARDA",1238.847],
  [12,"KORKUNUN BÜYÜ ETKİSİ",1253.5],
  [13,"İLAHÎ IŞIK RUHLAR",1382.5],
  [14,"VEDALAR",1433.200],
  [15,"YETİŞECEK YER YOK",1488.5],
  [16,"AZAT ET",1531.826],
  [17,"KAZANMAK DA VAR KAYBETMEK DE.",1542.593],
  [18,"KARŞILAŞMALAR",1612.5],
  [19,"SİZCE?",1638.577],
  [20,"KENDİNDEN TANIRSIN BAZILARINI",1655.461],
  [21,"EKSİK KALANLAR",1679.2],
  [22,"NEFES VARSA UMUT OLUR",1695.973],
  [23,"SEN SEV YETER",1717.894],
  [24,"YOL",1826.889],
  [25,"IŞIĞINI GÖRMEYENE GÜNEŞ OLMA",1877.505],
  [26,"RUH SİMYACISI",2161.480],
  [27,"İHTİYACIMIZ OLAN",2395.403],
  [28,"AHENK",2453.1],
  [29,"TANRI BEKLERKEN BULUNMAZMIŞ",2754.3],
  [30,"ZATEN SAHİP OLMAK",2923.426],
  [31,"SON EMİR",3092.704],
  [32,"MARİFET İLTİFATA TABİDİR",3151.755],
  [33,"İNSAN OLMAK",3181.164],
  [34,"KAYBEDİP BULMAK",3322.153],
  [35,"BU ALEMDE",3419.6],
  [36,"HİÇBİR ŞEY GÖRÜNDÜĞÜ GİBİ DEĞİL",3532.719],
  [37,"SESİ KISIK OLURMUŞ GÜZELLİĞİN",3811.7],
  [38,"ASIL HİKÂYE VE SIRLAR",4143.742],
  [39,"AYNA",4252.6],
  [40,"RÜYALARIN SANCILI GEZİNTİSİ",4260.698],
  [41,"BAZEN",4409.948],
  [42,"HAYAT TEK KULLANIMLIK",4458.0],
  [43,"KALBİ OKUYABİLMEK",4627.741],
  [44,"MUCİZEYİZ",4639.221],
  [45,"TEK HAKİKAT",4671.233],
  [46,"HER ŞEY GEÇİYOR",4683.6],
  [47,"YOL ALMAK",4720.282],
  [48,"ORMANLAR",4732.367],
  [49,"KİM OLDUĞUNU BİLMEK",4743.484],
  [50,"DÖNÜN YOL YAKINKEN",4851.1],
  [51,"DENGENİN HİKMETİ",5024.717],
  [52,"YILDIZLARLA BULACAĞIN ŞİFA",5121.682],
  [53,"VAR OLMAK",5235.0],
  [54,"RÜYA",5260.749],
  [55,"BAZILARI BAŞKADIR",5313.555],
  [56,"TÜM HAKİKATİN ANLAŞILACAĞI AN",5382.853],
  [57,"DEĞİŞİM İÇİN",5561.324],
  [58,"BEDEN KAFTANIMIZ OLMASAYDI",5608.620],
  [59,"BİR ŞEYİ DE BİLMEN GEREK",5664.445],
  [60,"DEĞİŞİM",5705.217],
  [61,"ERDEM YOLCULUĞU",5816.457],
  [62,"MUTLULUK DEDİĞİN ŞEY",5921.6],
  [63,"BİLSE SEVER MİYDİ BEŞER",6025.4],
  [64,"EN BÜYÜK BULUŞ",6136.026],
  [65,"ŞER VE HAYIR",6170.263],
  [66,"SON EMİR",6226.2],
  [67,"UNUTMAYI SEÇTİK UYANABİLİRDİK",6280.865],
  [68,"GÖZLERİN KÜTÜPHANESİ",6394.4],
  [69,"UMUT ŞARTTIR YAŞAMAK İÇİN",6407.630],
  [70,"KODLARINIZ",6447.7],
  [71,"BIRAKMAK",6485.036],
  [72,"AŞK TÜKENDİ",6503.164],
  [73,"TANIK OLMAK",6605.681],
  [74,"SENİN KAPIN",7083.3],
  [75,"BUL HİRAN’I",7101.167],
  [76,"İNSANLAR KÖTÜ DOĞMAZLAR, SONRADAN OLURLAR",7186.320],
  [77,"MASALARIM VAR BENİM",7310.6],
  [78,"BİRİNİN FELAKETİ BİRİNİN MUCİZESİ",7324.391],
  [79,"YOLUM SENDİN",7497.487],
  [80,"İHTİŞAMLI BİR YARIN İÇİN",7532.873],
  [81,"İNANDIĞIN KADAR VARSIN, İNANDIĞIN KADAR YAŞARSIN",7786.316],
  [82,"YEMEĞİN PİŞTİĞİ YERDE MUTLAK KOKUSU SİNER ÜZERİNE",7842.504],
  [83,"MAZİMDEN İSTİFA",8205.1],
  [84,"AŞK",8301.981],
  [85,"AŞKIN ARACILARI",8391.696],
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
  const pathname=usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingResumeRef = useRef(0);
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
  const [bookMeta,setBookMeta] = useState({
    slug:"bir-sifacinin-kanadi",
    title:"Bir Şifacının Kanadı",
    author:"Figen Yavuz",
    voice:"Elif",
    coverUrl:"/bir_sifaci_png.png",
  });
  const [activeChapters,setActiveChapters] = useState<Chapter[]>(chapters);
  const progressKey=useMemo(()=>`22y-audio-progress-${bookMeta.slug}`,[bookMeta.slug]);

  const chapter = activeChapters[chapterIndex] ?? activeChapters[0] ?? {id:1,title:"Kitabın Tamamı",start:0};
  const chapterEnd = activeChapters[chapterIndex + 1]?.start ?? duration;
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
    const segments=pathname.split("/").filter(Boolean);
    const slug=segments[0]==="dinle" && segments.length>1 ? segments[1] : "";
    const endpoint=slug ? `/api/sesli-kitap/${slug}` : "/api/sesli-kitap/current";

    void fetch(endpoint,{cache:"no-store"})
      .then((response)=>response.ok?response.json():null)
      .then((data)=>{
        const params=new URLSearchParams(window.location.search);
        const preview=params.get("preview")==="1";
        if(!data?.ready && !preview) return;

        const nextAudio=
          typeof data?.audioUrl==="string" && data.audioUrl
            ? data.audioUrl
            : typeof data?.url==="string" && data.url
              ? data.url
              : "";
        const previewAudio=preview ? params.get("audio") : "";
        if(previewAudio) setAudioSrc(previewAudio);
        else if(nextAudio) setAudioSrc(nextAudio);

        const dataSlug=typeof data?.slug==="string" && data.slug ? data.slug : "bir-sifacinin-kanadi";
        const dataCover=
          dataSlug==="bir-sifacinin-kanadi"
            ? "/bir_sifaci_png.png"
            : typeof data?.coverUrl==="string" && data.coverUrl
              ? data.coverUrl
              : "/bir_sifaci_png.png";

        setBookMeta({
          slug:dataSlug,
          title:preview && params.get("title") ? params.get("title")! : typeof data?.title==="string" && data.title ? data.title : "Bir Şifacının Kanadı",
          author:preview && params.get("author") ? params.get("author")! : typeof data?.author==="string" && data.author ? data.author : "Figen Yavuz",
          voice:preview && params.get("voice")!==null ? params.get("voice")! : typeof data?.voice==="string" ? data.voice : "",
          coverUrl:preview && params.get("cover") ? params.get("cover")! : dataCover,
        });

        const previewDuration=preview ? Number(params.get("duration")) : NaN;
        if(Number.isFinite(previewDuration) && previewDuration>0){
          setDuration(previewDuration);
        }else if(typeof data?.duration==="number" && Number.isFinite(data.duration) && data.duration>0){
          setDuration(data.duration);
        }
        if(Array.isArray(data?.chapters) && data.chapters.length){
          const nextChapters=data.chapters
            .filter((item:Chapter)=>item && typeof item.id==="number" && typeof item.title==="string" && typeof item.start==="number")
            .sort((a:Chapter,b:Chapter)=>a.start-b.start);
          if(nextChapters.length) setActiveChapters(nextChapters);
        }else if(data?.slug && data.slug!=="bir-sifacinin-kanadi"){
          setActiveChapters([{id:1,title:"Kitabın Tamamı",start:0}]);
        }
        setChapterIndex(0);
        setCurrentTime(0);
        pendingResumeRef.current=0;
      })
      .catch(()=>{});
  },[pathname]);

  useEffect(()=>{
    const saved=window.localStorage.getItem(progressKey);
    if(!saved) return;
    try{
      const parsed=JSON.parse(saved) as {currentTime?:number;rate?:number};
      if(typeof parsed.currentTime==="number" && parsed.currentTime>=0){
        pendingResumeRef.current=parsed.currentTime;
        setCurrentTime(parsed.currentTime);
        const idx=[...activeChapters].reverse().findIndex((item)=>parsed.currentTime!>=item.start);
        if(idx>=0) setChapterIndex(activeChapters.length-1-idx);
      }
      if(typeof parsed.rate==="number" && [0.75,1,1.25,1.5,1.75,2].includes(parsed.rate)){
        setRate(parsed.rate);
      }
    }catch{}
  },[progressKey,activeChapters]);

  useEffect(()=>{
    const persist=()=>{
      try{
        const audio=audioRef.current;
        const liveTime=audio?.currentTime ?? 0;
        const liveRate=audio?.playbackRate ?? 1;
        window.localStorage.setItem(progressKey,JSON.stringify({currentTime:liveTime,rate:liveRate,updatedAt:Date.now()}));
      }catch{}
    };
    const timer=window.setInterval(persist,4000);
    const onVisibility=()=>{ if(document.visibilityState==="hidden") persist(); };
    window.addEventListener("pagehide",persist);
    document.addEventListener("visibilitychange",onVisibility);
    return()=>{
      window.clearInterval(timer);
      window.removeEventListener("pagehide",persist);
      document.removeEventListener("visibilitychange",onVisibility);
    };
  },[progressKey]);

  useEffect(()=>{
    const index=Math.max(0,activeChapters.findIndex((item,i)=>{
      const next=activeChapters[i+1]?.start ?? Infinity;
      return currentTime>=item.start && currentTime<next;
    }));
    if(index!==chapterIndex) setChapterIndex(index);
  },[currentTime,chapterIndex,activeChapters]);

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

  useEffect(()=>{
    if(!("mediaSession" in navigator) || !("MediaMetadata" in window)) return;

    navigator.mediaSession.metadata=new MediaMetadata({
      title: chapter.title,
      artist: `${bookMeta.title} · ${bookMeta.author}`,
      album: `${chapter.id}. Bölüm`,
      artwork: [
        { src: bookMeta.coverUrl },
      ],
    });

    const safeSet=(action: MediaSessionAction, handler: MediaSessionActionHandler | null)=>{
      try{ navigator.mediaSession.setActionHandler(action,handler); }catch{}
    };

    safeSet("play",()=>{ void audioRef.current?.play(); });
    safeSet("pause",()=>{ audioRef.current?.pause(); });
    safeSet("seekbackward",(details)=>{
      const audio=audioRef.current;
      if(!audio) return;
      audio.currentTime=Math.max(0,audio.currentTime-(details.seekOffset ?? 15));
    });
    safeSet("seekforward",(details)=>{
      const audio=audioRef.current;
      if(!audio) return;
      audio.currentTime=Math.min(audio.duration||BOOK_DURATION,audio.currentTime+(details.seekOffset ?? 15));
    });
    safeSet("seekto",(details)=>{
      const audio=audioRef.current;
      if(!audio || typeof details.seekTime!=="number") return;
      if(details.fastSeek && "fastSeek" in audio) audio.fastSeek(details.seekTime);
      else audio.currentTime=details.seekTime;
    });
    safeSet("previoustrack",()=>{
      const audio=audioRef.current;
      if(!audio) return;
      const previousIndex=Math.max(0,chapterIndex-1);
      const target=activeChapters[previousIndex].start;
      audio.currentTime=target;
      setCurrentTime(target);
      setChapterIndex(previousIndex);
    });
    safeSet("nexttrack",()=>{
      const audio=audioRef.current;
      if(!audio) return;
      const nextIndex=Math.min(activeChapters.length-1,chapterIndex+1);
      const target=activeChapters[nextIndex].start;
      audio.currentTime=target;
      setCurrentTime(target);
      setChapterIndex(nextIndex);
    });

    return()=>{
      safeSet("play",null);
      safeSet("pause",null);
      safeSet("seekbackward",null);
      safeSet("seekforward",null);
      safeSet("seekto",null);
      safeSet("previoustrack",null);
      safeSet("nexttrack",null);
    };
  },[chapter.title,chapterIndex,bookMeta,activeChapters]);

  useEffect(()=>{
    if(!("mediaSession" in navigator)) return;
    const audio=audioRef.current;
    if(!audio || !Number.isFinite(duration) || duration<=0) return;
    try{
      navigator.mediaSession.setPositionState({
        duration,
        playbackRate:audio.playbackRate||1,
        position:Math.min(currentTime,duration),
      });
    }catch{}
  },[currentTime,duration,rate]);

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
      const resumeAt=pendingResumeRef.current || currentTime;
      if(resumeAt>1 && audio.currentTime<1){
        audio.currentTime=resumeAt;
      }
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
    const next=Math.max(0,Math.min(audio.duration||BOOK_DURATION,audio.currentTime+amount));
    pendingResumeRef.current=next;
    audio.currentTime=next;
    setCurrentTime(next);
    try{
      window.localStorage.setItem(progressKey,JSON.stringify({currentTime:next,rate:audio.playbackRate,updatedAt:Date.now()}));
    }catch{}
  };

  const changeRate=()=>{
    const order=[1,1.25,1.5,1.75,2,0.75];
    const next=order[(order.indexOf(rate)+1)%order.length];
    setRate(next);
    if(audioRef.current) audioRef.current.playbackRate=next;
    try{
      window.localStorage.setItem(progressKey,JSON.stringify({currentTime,rate:next,updatedAt:Date.now()}));
    }catch{}
  };

  const selectChapter=(index:number)=>{
    const audio=audioRef.current;
    if(!audio) return;
    const target=activeChapters[index].start;
    pendingResumeRef.current=target;
    audio.currentTime=target;
    setCurrentTime(target);
    setChapterIndex(index);
    try{
      window.localStorage.setItem(progressKey,JSON.stringify({currentTime:target,rate:audio.playbackRate,updatedAt:Date.now()}));
    }catch{}
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
          pendingResumeRef.current=next;
          setCurrentTime(next);
          const wholeSecond=Math.floor(next);
          if(wholeSecond!==lastSavedSecondRef.current && wholeSecond%4===0){
            lastSavedSecondRef.current=wholeSecond;
            try{
              window.localStorage.setItem(progressKey,JSON.stringify({currentTime:next,rate,updatedAt:Date.now()}));
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
            const saved=window.localStorage.getItem(progressKey);
            if(saved){
              const parsed=JSON.parse(saved) as {currentTime?:number;rate?:number};
              if(typeof parsed.currentTime==="number" && parsed.currentTime>=0) resumeAt=parsed.currentTime;
              if(typeof parsed.rate==="number" && [0.75,1,1.25,1.5,1.75,2].includes(parsed.rate)) savedRate=parsed.rate;
            }
          }catch{}
          if(resumeAt>0 && resumeAt<actualDuration-1){
            pendingResumeRef.current=resumeAt;
            audio.currentTime=resumeAt;
            setCurrentTime(resumeAt);
          }
          audio.playbackRate=savedRate;
          setRate(savedRate);
        }}
        onPlay={()=>{setPlaying(true);setAudioError(false);}}
        onPause={(e)=>{
          setPlaying(false);
          try{
            window.localStorage.setItem(progressKey,JSON.stringify({
              currentTime:e.currentTarget.currentTime,
              rate:e.currentTarget.playbackRate,
              updatedAt:Date.now(),
            }));
          }catch{}
        }}
        onCanPlay={(e)=>{
          setAudioError(false);
          const resumeAt=pendingResumeRef.current;
          if(resumeAt>1 && e.currentTarget.currentTime<1 && resumeAt<e.currentTarget.duration-1){
            e.currentTarget.currentTime=resumeAt;
            setCurrentTime(resumeAt);
          }
        }}
        onEnded={(e)=>{
          setPlaying(false);
          e.currentTarget.currentTime=0;
          setCurrentTime(0);
          setChapterIndex(0);
          pendingResumeRef.current=0;
          try{ window.localStorage.removeItem(progressKey); }catch{}
        }}
        onError={()=>{setAudioError(true);setPlaying(false);}}
      />

      <section className={styles.stage}>
        <header className={styles.topbar}>
          <a href="/" className={styles.logo} aria-label="22 Yayınevi ana sayfa">
            <img src="/22_yayinevi_logo_1.webp" alt="22 Yayınevi" />
          </a>
          <button className={styles.menuButton} onClick={()=>setChaptersOpen(true)} aria-label="Bölümler">⋮</button>
        </header>

        <div className={styles.content}>
          <div className={styles.coverHero}>
            <img src={bookMeta.coverUrl} alt={`${bookMeta.title} - ${bookMeta.author}`} />
          </div>

          <div className={styles.listeningLabel}>
            <svg className={styles.waveIcon} viewBox="0 0 28 22" aria-hidden="true">
              <path d="M2 8v6M6 5v12M10 2v18M14 7v8M18 4v14M22 6v10M26 9v4" />
            </svg>
            <span>ŞİMDİ DİNLİYORSUNUZ</span>
          </div>
          <h1>{bookMeta.title}</h1>
          <p className={styles.bookMeta}>{bookMeta.author}{bookMeta.voice ? ` · ${bookMeta.voice} sesi` : ""} · {formatTime(duration)}</p>

          <div className={styles.divider}>
            <svg className={styles.ornament} viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 2.5c1.2 3 2.8 4.9 5.7 6.1-2.9 1.2-4.5 3.1-5.7 6.1-1.2-3-2.8-4.9-5.7-6.1C7.2 7.4 8.8 5.5 10 2.5Z" />
              <path d="M10 8.6v8.2M7.2 11.6c1.3.2 2.3.9 2.8 2 .5-1.1 1.5-1.8 2.8-2" />
            </svg>
          </div>

          <div className={styles.nowPlaying}>
            <span>{bookMeta.title.toLocaleUpperCase("tr-TR")}</span>
            <h2>{chapter.id}. Bölüm — {chapter.title}</h2>
            <p>{formatTime(chapterDuration)} · {bookMeta.author}</p>
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
                pendingResumeRef.current=value;
                if(audioRef.current) audioRef.current.currentTime=value;
                setCurrentTime(value);
                try{
                  window.localStorage.setItem(progressKey,JSON.stringify({
                    currentTime:value,
                    rate:audioRef.current?.playbackRate ?? rate,
                    updatedAt:Date.now(),
                  }));
                }catch{}
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
            <div><span>BÖLÜM {chapter.id} / {activeChapters.length}</span><strong>{chapter.title}</strong></div>
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
            <img src={bookMeta.coverUrl} alt="" />
            <div><strong>{bookMeta.title}</strong><span>{bookMeta.author}</span><small>{activeChapters.length} bölüm · {formatTime(duration)}</small></div>
          </div>
          <div className={styles.chapterList}>
            {activeChapters.map((item,index)=>{
              const end=activeChapters[index+1]?.start??duration;
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
