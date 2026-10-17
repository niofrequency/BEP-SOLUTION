# Bep's Solution Travel

Website pemesanan tiket pesawat & hotel yang terintegrasi dengan sistem Holigo.

## Fitur

- Homepage dengan pencarian tiket
- Halaman hasil pencarian penerbangan
- Form booking & pembayaran (VA / QRIS)
- Dasbor agen (pesanan, saldo, log API)
- UI sesuai prototipe

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS

## Cara Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Deploy ke Vercel (Gratis)

1. Push project ini ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import Project
3. Pilih repository GitHub
4. Deploy (otomatis)

## Catatan

- Data saat ini **mock** (contoh).
- Untuk integrasi Holigo API yang sesungguhnya, tambahkan environment variables:
  - `HOLIGO_API_URL`
  - `HOLIGO_API_KEY` (atau username/password)
- Kredensial Holigo hanya disimpan di server (Vercel Environment Variables), tidak pernah di frontend.

## Struktur Folder

```
src/app/
├── page.tsx          # Homepage
├── search/page.tsx   # Hasil pencarian
├── booking/page.tsx  # Form pemesanan
└── dashboard/page.tsx # Dasbor agen
```
