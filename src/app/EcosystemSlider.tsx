"use client";

import { useMemo, useRef, useState } from "react";

const slides = [
  {
    no: "01",
    kicker: "KİTAP",
    title: "Eseriniz\nbir kimlik kazanır.",
    body: "Kapak, tasarım ve yayın hazırlığıyla kitabınız kendi dünyasını kurar.",
    image: "/ekosistem-kitap.webp",
    imageClass: "productBook",
    alt: "İçimdeki İbrahim kitap mockup",
  },
  {
    no: "02",
    kicker: "22 READER",
    title: "Her yerde\nokunur.",
    body: "E-kitabınız 22 Reader deneyiminde, farklı cihazlarda okurla buluşur.",
    image: "/ekosistem-reader.webp",
    imageClass: "productReader",
    alt: "22 Reader üzerinde İçimdeki İbrahim",
  },
  {
    no: "03",
    kicker: "22 AUDIO",
    title: "Hikâyeniz\nses bulur.",
    body: "Sesli kitabınız güçlü bir dinleme deneyimiyle yeni bir hayata kavuşur.",
    image: "/ekosistem-audio-transparent.webp",
    imageClass: "productAudio",
    alt: "22 Audio üzerinde İçimdeki İbrahim",
  },
  {
    no: "04",
    kicker: "YAZAR SİTESİ",
    title: "Size ait\nbir dijital dünya.",
    body: "Eserleriniz, biyografiniz ve okurlarınızla bağınız tek bir kişisel adreste buluşur.",
    image: "/figan-yazar-sitesi-laptop.webp",
    imageClass: "productSite",
    alt: "22 Yayınevi yazar sitesi laptop görünümü",
  },
];

export default function EcosystemSlider() {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);

  const slide = slides[active];
  const count = slides.length;

  const go = (dir: number) => {
    setActive((current) => (current + dir + count) % count);
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    startX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (startX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? startX.current;
    const distance = endX - startX.current;
    startX.current = null;
    if (Math.abs(distance) < 42) return;
    go(distance < 0 ? 1 : -1);
  };

  const dots = useMemo(() => slides.map((item) => item.no), []);

  return (
    <section className="ecosystemSection" id="ekosistem">
      <div className="ecosystemIntro">
        <div className="ecosystemKicker"><span>22 YAYINEVİ EKOSİSTEMİ</span><i/><b>04</b></div>
        <h2>Bir kitap.<br/><em>Birden fazla yaşam.</em></h2>
        <p>Kitabınız farklı biçimlerde yaşar; okunur, dinlenir ve size ait dijital dünyada okurla buluşur.</p>
      </div>

      <div className="ecosystemSlider" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="ecosystemSlideCopy">
          <span className="slideNo">{slide.no}</span>
          <span className="slideKicker">{slide.kicker}</span>
          <h3>{slide.title.split("\n").map((line, index) => <span key={index}>{line}<br/></span>)}</h3>
          <p>{slide.body}</p>
        </div>

        <div className="ecosystemProductStage" aria-live="polite">
          <img key={slide.image} className={slide.imageClass} src={slide.image} alt={slide.alt} />
        </div>

        <button className="sliderArrow sliderPrev" type="button" onClick={() => go(-1)} aria-label="Önceki ürün">←</button>
        <button className="sliderArrow sliderNext" type="button" onClick={() => go(1)} aria-label="Sonraki ürün">→</button>

        <div className="sliderDots" aria-label="Ürün slaytları">
          {dots.map((no, index) => (
            <button
              key={no}
              type="button"
              className={index === active ? "active" : ""}
              onClick={() => setActive(index)}
              aria-label={`${index + 1}. slayta git`}
            />
          ))}
        </div>

        <div className="sliderProgress">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <i><b style={{width: `${((active + 1) / count) * 100}%`}} /></i>
          <span>{String(count).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="ecosystemClosing">
        <p>Dosyanız yalnızca bir kitaba dönüşmez.</p>
        <strong>Kendi yayın dünyasına dönüşür.</strong>
        <span>Daha fazla okur. Daha fazla yaşam.</span>
      </div>
    </section>
  );
}
