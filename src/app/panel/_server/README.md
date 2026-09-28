# 22 Reader — Kalıcı Veri Altyapısı

Bu klasör 22 Reader yönetim panelinin kalıcı veri katmanını hazırlar.

## Hedef mimari

- PostgreSQL / Neon: yazarlar ve kitap metadata kayıtları
- Vercel Blob: kapak ve EPUB dosyaları
- Next.js Route Handlers: panel ile veri tabanı arasında sunucu katmanı
- Reader UI: mevcut görünüm korunur

## Veritabanı tabloları

`schema.sql` iki tablo oluşturur:

- `reader_authors`
- `reader_books`

Kitap kaydı `author_slug` üzerinden yazara bağlanır.

## Ortam değişkenleri

Gerçek bağlantıda şu değişken kullanılacak:

```
DATABASE_URL=postgresql://...
```

Dosya yükleme tarafında Vercel Blob bağlantısı ayrıca kullanılacak.

## Geçiş kuralı

Panel bileşenleri doğrudan localStorage veya SQL kullanmamalı.
UI -> persistence adapter -> API -> database şeklinde ilerleyecek.

Mevcut localStorage verileri geçiş sırasında kaybolmaması için migration/import adımıyla taşınacak.
