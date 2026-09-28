import { list } from "@vercel/blob";

export type AudiobookChapter = {
  id: number;
  title: string;
  start: number;
};

export type AudiobookManifest = {
  version: 1;
  slug: string;
  title: string;
  author: string;
  voice?: string;
  coverUrl: string;
  audioUrl: string;
  duration?: number;
  chapters?: AudiobookChapter[];
  updatedAt?: string;
};

export type CurrentAudiobookResult = AudiobookManifest & {
  ready: true;
  url?: string;
  pathname: string;
  size?: number;
  uploadedAt?: string;
  source: "active-manifest" | "blob" | "public-fallback";
  warning?: string;
};

const PREFIX = "audiobooks/bir-sifacinin-kanadi/";
const PUBLIC_AUDIO_FALLBACK =
  "https://edmrsvk0wqrotocr.public.blob.vercel-storage.com/audiobooks/bir-sifacinin-kanadi/master.mp3";
const PUBLIC_COVER_FALLBACK = "/bir_sifaci_png.png";
const ACTIVE_MANIFEST_URL =
  "https://edmrsvk0wqrotocr.public.blob.vercel-storage.com/audiobooks/active.json";

export const DEFAULT_AUDIOBOOK: AudiobookManifest = {
  version: 1,
  slug: "bir-sifacinin-kanadi",
  title: "Bir Şifacının Kanadı",
  author: "Figen Yavuz",
  voice: "Elif",
  coverUrl: PUBLIC_COVER_FALLBACK,
  audioUrl: PUBLIC_AUDIO_FALLBACK,
  duration: 8477.232,
};

function isManifest(value: unknown): value is AudiobookManifest {
  if (!value || typeof value !== "object") return false;
  const data = value as Partial<AudiobookManifest>;
  return Boolean(
    data.version === 1 &&
      typeof data.slug === "string" &&
      data.slug &&
      typeof data.title === "string" &&
      data.title &&
      typeof data.author === "string" &&
      data.author &&
      typeof data.coverUrl === "string" &&
      data.coverUrl &&
      typeof data.audioUrl === "string" &&
      data.audioUrl,
  );
}

async function readActiveManifest() {
  try {
    const response = await fetch(`${ACTIVE_MANIFEST_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = (await response.json()) as unknown;
    return isManifest(data) ? data : null;
  } catch {
    return null;
  }
}

export async function getCurrentAudiobook(): Promise<CurrentAudiobookResult> {
  const active = await readActiveManifest();
  if (active) {
    return {
      ready: true,
      ...active,
      url: active.audioUrl,
      pathname: `audiobooks/${active.slug}/master.mp3`,
      uploadedAt: active.updatedAt,
      source: "active-manifest",
    };
  }

  try {
    const { blobs } = await list({ prefix: PREFIX, limit: 20 });
    const preferred =
      blobs.find((blob) => blob.pathname === PREFIX + "master.mp3") ??
      blobs.find((blob) => blob.pathname.endsWith(".mp3"));

    if (preferred) {
      return {
        ready: true,
        ...DEFAULT_AUDIOBOOK,
        audioUrl: preferred.url,
        url: preferred.url,
        pathname: preferred.pathname,
        size: preferred.size,
        uploadedAt: preferred.uploadedAt,
        source: "blob",
      };
    }
  } catch (error) {
    return {
      ready: true,
      ...DEFAULT_AUDIOBOOK,
      url: DEFAULT_AUDIOBOOK.audioUrl,
      pathname: PREFIX + "master.mp3",
      source: "public-fallback",
      warning:
        error instanceof Error ? error.message : "Blob listesi okunamadı.",
    };
  }

  return {
    ready: true,
    ...DEFAULT_AUDIOBOOK,
    url: DEFAULT_AUDIOBOOK.audioUrl,
    pathname: PREFIX + "master.mp3",
    source: "public-fallback",
  };
}
