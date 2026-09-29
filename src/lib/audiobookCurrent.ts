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
const BLOB_BASE =
  "https://edmrsvk0wqrotocr.public.blob.vercel-storage.com";
const ACTIVE_MANIFEST_URL =
  `${BLOB_BASE}/audiobooks/active.json`;
const CATALOG_URL =
  `${BLOB_BASE}/audiobooks/catalog.json`;

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

async function readManifestUrl(url: string) {
  try {
    const response = await fetch(`${url}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = (await response.json()) as unknown;
    return isManifest(data) ? data : null;
  } catch {
    return null;
  }
}

async function readActiveManifest() {
  return readManifestUrl(ACTIVE_MANIFEST_URL);
}

export async function getAudiobookBySlug(slug: string): Promise<CurrentAudiobookResult | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const manifestUrl =
    `${BLOB_BASE}/audiobooks/${slug}/manifest.json`;
  const manifest = await readManifestUrl(manifestUrl);

  if (manifest) {
    return {
      ready: true,
      ...manifest,
      url: manifest.audioUrl,
      pathname: `audiobooks/${manifest.slug}/master.mp3`,
      uploadedAt: manifest.updatedAt,
      source: "active-manifest",
    };
  }

  if (slug === DEFAULT_AUDIOBOOK.slug) {
    return {
      ready: true,
      ...DEFAULT_AUDIOBOOK,
      url: DEFAULT_AUDIOBOOK.audioUrl,
      pathname: PREFIX + "master.mp3",
      source: "public-fallback",
    };
  }

  return null;
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
        uploadedAt: preferred.uploadedAt instanceof Date ? preferred.uploadedAt.toISOString() : String(preferred.uploadedAt),
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


export async function getAudiobookCatalog(): Promise<AudiobookManifest[]> {
  try {
    const response = await fetch(`${CATALOG_URL}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return [];
    const data = (await response.json()) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(isManifest);
  } catch {
    return [];
  }
}
