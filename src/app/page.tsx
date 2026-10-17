"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [from, setFrom] = useState("Jakarta (CGK)");
  const [to, setTo] = useState("Jayapura (DJJ)");
  const [date, setDate] = useState("2026-10-23");
  const [passengers, setPassengers] = useState("1 dewasa - Ekonomi");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#0f2c3a] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-sm">B</div>
            <div>
              <div className="font-bold text-lg leading-none">Bep's</div>
              <div className="text-xs text-gray-300">SOLUTION TRAVEL</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-orange-400">Pesawat</Link>
            <Link href="/" className="hover:text-orange-400">Hotel</Link>
            <Link href="/cek-pesanan" className="hover:text-orange-400">Cek pesanan</Link>
            <Link href="/kontak" className="hover:text-orange-400">Kontak</Link>
            <Link href="/dashboard" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-medium">
              Masuk agen
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#0f2c3a] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm tracking-widest text-orange-400 mb-3">TIKET PESAWAT · HOTEL · SELURUH INDONESIA</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Pesan tiket dan hotel, e-tiket terbit dalam hitungan menit.
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Harga dan kursi diambil langsung dari maskapai melalui sistem Holigo. Bayar lewat transfer VA atau QRIS.
          </p>
        </div>
      </section>

      {/* Search Card */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex border-b mb-6">
            <button className="px-6 py-3 border-b-2 border-orange-500 text-orange-500 font-medium">Tiket pesawat</button>
            <button className="px-6 py-3 text-gray-500">Hotel</button>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-gray-500">DARI</label>
              <input value={from} onChange={(e) => setFrom(e.target.value)} className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="text-xs text-gray-500">KE</label>
              <input value={to} onChange={(e) => setTo(e.target.value)} className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="text-xs text-gray-500">TANGGAL PERGI</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="text-xs text-gray-500">PENUMPANG & KELAS</label>
              <input value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Link href="/search" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium">
              Cari tiket
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        <div className="flex gap-3">
          <div className="text-2xl">⏱️</div>
          <div>
            <h3 className="font-semibold">Harga real-time</h3>
            <p className="text-sm text-gray-600">Kursi dan harga dicek ulang ke maskapai sebelum Anda membayar.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-2xl">🎫</div>
          <div>
            <h3 className="font-semibold">E-tiket langsung terbit</h3>
            <p className="text-sm text-gray-600">Dikirim ke email dan WhatsApp setelah pembayaran diterima.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-2xl">💳</div>
          <div>
            <h3 className="font-semibold">VA, QRIS, transfer</h3>
            <p className="text-sm text-gray-600">Pembayaran dicek otomatis, tanpa kirim bukti transfer.</p>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold">Rute populer</h2>
          <p className="text-sm text-gray-500">Harga mulai, sekali jalan, per orang</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { from: "CGK", to: "DJJ", route: "Jakarta - Jayapura", price: "Rp 2.185.000" },
            { from: "UPG", to: "DJJ", route: "Makassar - Jayapura", price: "Rp 1.640.000" },
            { from: "DJJ", to: "SOQ", route: "Jayapura - Sorong", price: "Rp 1.150.000" },
            { from: "CGK", to: "DPS", route: "Jakarta - Bali", price: "Rp 890.000" },
            { from: "SUB", to: "DJJ", route: "Surabaya - Jayapura", price: "Rp 1.980.000" },
            { from: "DJJ", to: "TIM", route: "Jayapura - Timika", price: "Rp 960.000" },
          ].map((r) => (
            <Link key={r.route} href="/search" className="bg-white border rounded-xl p-4 hover:shadow-md transition">
              <div className="text-sm font-medium text-gray-500">{r.from} → {r.to}</div>
              <div className="font-semibold mt-1">{r.route}</div>
              <div className="text-orange-600 font-bold mt-2">{r.price}</div>
              <div className="text-xs text-gray-400">mulai</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Partner CTA */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Buka usaha tiket sendiri bersama Bep's</h3>
            <p className="text-sm text-gray-600 mt-1">Daftar sebagai mitra agen, dapatkan harga khusus, dan jual tiket ke pelanggan Anda dari dasbor yang sama.</p>
          </div>
          <Link href="/dashboard" className="bg-[#0f2c3a] text-white px-6 py-3 rounded-lg font-medium whitespace-nowrap">
            Daftar jadi mitra
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f2c3a] text-gray-300 mt-auto py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-bold text-white mb-2">Bep's Solution Travel</div>
            <p>[ALAMAT KANTOR]</p>
            <p>[NOMOR IZIN USAHA / NIB]</p>
          </div>
          <div>
            <div className="font-bold text-white mb-2">Hubungi kami</div>
            <p>WhatsApp: [NOMOR WHATSAPP]</p>
            <p>Email: [EMAIL BISNIS]</p>
            <p>Senin-Minggu, 08.00-22.00 WIT</p>
          </div>
          <div>
            <div className="font-bold text-white mb-2">Informasi</div>
            <p>Cara pesan · Syarat & ketentuan</p>
            <p>Kebijakan refund · Privasi</p>
            <p className="mt-2 text-xs">Reservasi diproses melalui sistem Holigo.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
