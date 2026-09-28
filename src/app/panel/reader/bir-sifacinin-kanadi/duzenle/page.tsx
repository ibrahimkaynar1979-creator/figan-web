import ReaderBookForm from "../../../_components/ReaderBookForm";

export default function Page() {
  return (
    <ReaderBookForm
      mode="edit"
      initial={{
        title: "Bir Şifacının Kanadı",
        subtitle: "İnsanın Kendine Dönüş Yolculuğu",
        author: "Figen Yavuz",
        authorSlug: "figen-yavuz",
        slug: "bir-sifacinin-kanadi",
        status: "Yayında",
        language: "Türkçe",
        cover: "/bir_sifaci_png.png",
        readerHref: "/oku/bir-sifacinin-kanadi",
      }}
    />
  );
}
