# Bep's Solution Travel

Website pemesanan tiket pesawat & hotel. Pesanan dikirim ke **WhatsApp** admin,
lalu diproses manual (cek harga & issued tiket lewat panel agen Holigo).

## Alur pesanan

1. Pelanggan isi rute/tanggal (pesawat) atau kota/tanggal (hotel) di beranda.
2. Pelanggan isi data penumpang & kontak di halaman `/booking`.
3. Klik **Kirim pesanan via WhatsApp** → WhatsApp terbuka dengan pesan pesanan
   lengkap + kode pesanan (contoh `BEP-261114-AB12`), pelanggan tekan kirim.
4. Admin cek harga di Holigo, balas harga & cara bayar, lalu kirim e-tiket.

Pelanggan bisa menanyakan status di `/cek-pesanan` (membuka WhatsApp dengan kode pesanannya).

## Pengaturan (Vercel → Settings → Environment Variables)

| Variabel | Wajib | Contoh |
| --- | --- | --- |
| `NEXT_PUBLIC_WA_NUMBER` | Ya | `081234567890` atau `6281234567890` |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | Tidak | `info@contoh.com` |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | Tidak | `Jl. ..., Jayapura` |

Setelah mengubah variabel, lakukan **Redeploy** di Vercel agar berlaku.
Tanpa `NEXT_PUBLIC_WA_NUMBER`, tombol pesan akan menampilkan pesan error.

## Menjalankan lokal

```bash
npm install
NEXT_PUBLIC_WA_NUMBER=081234567890 npm run dev
```

Buka http://localhost:3000

## Struktur

```
src/app/page.tsx              # Beranda + form cari pesawat/hotel
src/app/booking/page.tsx      # Form pesanan → WhatsApp
src/app/cek-pesanan/page.tsx  # Cek status via WhatsApp
src/app/kontak/page.tsx       # Kontak
src/components/               # Header & footer
src/lib/config.ts             # Nomor WA, email, alamat
src/lib/order.ts              # Kode pesanan & format tanggal
```

Integrasi otomatis (API Holigo, pembayaran VA/QRIS otomatis) belum ada; bisa
ditambahkan nanti tanpa mengubah tampilan.
