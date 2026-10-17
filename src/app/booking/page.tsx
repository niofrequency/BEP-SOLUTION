"use client";

import Link from "next/link";
import { useState } from "react";

export default function BookingPage() {
  const [payment, setPayment] = useState("bca");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0f2c3a] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-sm">B</div>
            <span className="font-bold">Bep's Solution Travel</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="bg-orange-500 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            <span>Data pemesan</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-400">2 Pembayaran</span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-400">3 E-tiket</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/search" className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Kembali ke hasil pencarian</Link>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Kontak */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold mb-4">Kontak pemesan</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500">NAMA LENGKAP</label>
                  <input placeholder="Sesuai KTP" className="w-full mt-1 border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">NOMOR WHATSAPP</label>
                  <input placeholder="08xx xxxx xxxx" className="w-full mt-1 border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">EMAIL</label>
                  <input placeholder="E-tiket dikirim ke sini" className="w-full mt-1 border rounded-lg px-3 py-2" />
                </div>
              </div>
            </div>

            {/* Penumpang */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold mb-4">Penumpang 1 · Dewasa</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500">TITEL</label>
                  <select className="w-full mt-1 border rounded-lg px-3 py-2">
                    <option>Tuan</option>
                    <option>Nyonya</option>
                    <option>Nona</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">NAMA SESUAI KTP</label>
                  <input placeholder="Tanpa gelar" className="w-full mt-1 border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">NIK</label>
                  <input placeholder="16 digit" className="w-full mt-1 border rounded-lg px-3 py-2" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold mb-4">Metode pembayaran</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { id: "bca", name: "Virtual Account BCA", desc: "Dicek otomatis" },
                  { id: "mandiri", name: "Virtual Account Mandiri", desc: "Dicek otomatis" },
                  { id: "briva", name: "BRIVA", desc: "Dicek otomatis" },
                  { id: "qris", name: "QRIS", desc: "Semua e-wallet & m-banking" },
                ].map((p) => (
                  <label key={p.id} className={`border rounded-lg p-4 flex items-start gap-3 cursor-pointer ${
                    payment === p.id ? "border-orange-500 bg-orange-50" : ""
                  }`}>
                    <input type="radio" name="payment" checked={payment === p.id} onChange={() => setPayment(p.id)} className="mt-1" />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f2c3a] text-white rounded-xl p-6 sticky top-6">
              <div className="text-xs text-gray-400 mb-1">RINGKASAN PESANAN</div>
              <div className="font-bold text-xl">CGK → DJJ</div>
              <div className="text-sm text-gray-300 mb-4">Jum, 23 Okt 2026</div>
              <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                <div className="flex justify-between"><span>Penerbangan</span><span>Lion Air JT 792</span></div>
                <div className="flex justify-between"><span>Jadwal</span><span>04:30 WIB → 14:20 WIT</span></div>
                <div className="flex justify-between"><span>Transit</span><span>Makassar (UPG)</span></div>
                <div className="flex justify-between"><span>Dewasa × 1</span><span>Rp 2.185.000</span></div>
                <div className="flex justify-between"><span>Biaya layanan</span><span>Rp 4.000</span></div>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-white/10">
                <span>Total</span>
                <span>Rp 2.189.000</span>
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium mt-6">
                Bayar sekarang
              </button>
              <p className="text-xs text-gray-400 mt-3 text-center">Harga dikunci 20 menit. Setelah itu kursi dicek ulang ke maskapai.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
