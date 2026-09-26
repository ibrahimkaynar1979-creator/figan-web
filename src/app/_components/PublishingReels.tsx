import Image from "next/image";

const reels = [
  {label:"Basılı Kitap",href:"/basili-kitap-yayini",image:"/figan-hizmet-basili-kitap-yayini.webp"},
  {label:"E-Kitap",href:"/e-kitap-yayini",image:"/figan-hizmet-e-kitap.webp"},
  {label:"Sesli Kitap",href:"/sesli-kitap",image:"/figan-hizmet-sesli-kitap.webp"},
  {label:"Yabancı Dil",href:"/yabanci-dil-ceviri",image:"/ekosistem-reader.webp"},
  {label:"Yazar Sitesi",href:"/yazar-sitesi",image:"/figan-hizmet-yazar-sitesi.webp"},
  {label:"Dijital Dağıtım",href:"/dijital-dagitim",image:"/figan-hizmet-dijital-dagitim.webp"},
  {label:"Yayın Alanlarımız",href:"/yayin-alanlarimiz",image:"/22_yayinevi_logo.png"},
  {label:"İlk 22 Kurucu Yazar",href:"/kurucu-yazar",image:"/22_yayinevi_logo.png"},
] as const;

export default function PublishingReels({ home = false }: { home?: boolean }) {
  return (
    <nav className={`seo-service-nav${home ? " home-service-reels" : ""}`} aria-label="22 Yayınevi yayın dünyası">
      <div className="seo-service-nav-track">
        {reels.map((item)=>(
          <a className="seo-service-nav-item" href={item.href} key={item.href}>
            <span className="seo-service-nav-image">
              <Image src={item.image} alt="" width={120} height={120} sizes="84px"/>
            </span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
