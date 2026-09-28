-- 22 Reader / 22 Yayınevi panel persistence schema
-- Target: PostgreSQL (Neon-ready)
-- Safe initial migration: creates new tables only.

create table if not exists reader_authors (
  id bigserial primary key,
  slug text not null unique,
  name text not null,
  href text not null,
  role text not null default 'Yazar',
  bio text,
  domain text,
  status text not null default 'Taslak' check (status in ('Taslak','Yayında')),
  instagram text,
  website text,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists reader_books (
  id bigserial primary key,
  slug text not null unique,
  title text not null,
  subtitle text,
  author_slug text not null references reader_authors(slug)
    on update cascade
    on delete restrict,
  language text not null default 'Türkçe',
  status text not null default 'Taslak' check (status in ('Taslak','Yayında')),
  reader_href text not null,
  format text not null default 'EPUB 3',
  cover_url text,
  epub_url text,
  epub_filename text,
  chapter_count integer not null default 0 check (chapter_count >= 0),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reader_books_author_slug_idx
  on reader_books(author_slug);

create index if not exists reader_books_status_idx
  on reader_books(status);

create index if not exists reader_authors_status_idx
  on reader_authors(status);

comment on table reader_authors is '22 Reader managed author profiles';
comment on table reader_books is '22 Reader managed books and EPUB publication metadata';
