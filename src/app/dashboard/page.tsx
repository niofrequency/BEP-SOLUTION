"use client";

import Link from "next/link";

const orders = [
  { code: "BEP-7K2QX", service: "CGK → DJJ", detail: "Lion Air JT 792 · 23 Okt", customer: "[NAMA PELANGGAN]", time: "03:41", total: "Rp 2.189.000", status: "Menunggu bayar" },
  { code: "BEP-6FQ81", service: "DJJ → SOQ", detail: "Garuda GA 655 · 18 Okt", customer: "[NAMA PELANGGAN]", time: "02:15", total: "Rp 1.312.000", status: "E-tiket terbit" },
  { code: "BEP-6F2LZ", service: "Griya Teluk Biru", detail: "Hotel · 2 malam · 20-22 Okt", customer: "[NAMA PELANGGAN]", time: "01:58", total: "Rp 1.570.000", status: "E-tiket terbit" },
  { code: "BEP-6E9VA", service: "UPG → DJJ", detail: "Batik ID 6270 · 17 Okt", customer: "[NAMA PELANGGAN]", time: "00:47", total: "Rp 1.644.000", status: "Menunggu bayar" },
  { code: "BEP-6E1KC", service: "DJJ → TIM", detail: "Citilink QG 1871 · 16 Okt", customer: "[NAMA PELANGGAN]", time: "00:12", total: "Rp 964.000", status: "Dibatalkan" },
  { code: "BEP-6D7HP", service: "CGK → DPS", detail: "Lion Air JT 34 · 19 Okt", customer: "[NAMA PELANGGAN]", time: "00:05", total: "Rp 894.000", status: "E-tiket terbit" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0f2c3a] text-white min-h-screen p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-sm">B</div>
          <div className="text-sm font-bold">Bep's<br/>PANEL AGEN</div>
        </div>
        <nav className="space-y-1 text-sm">
          <Link href="/dashboard" className="block bg-white/10 px-3 py-2 rounded">Dasbor</Link>
          <Link href="/dashboard" className="block px-3 py-2 hover:bg-white/5 rounded">Pesanan</Link>
          <Link href="/dashboard" className="block px-3 py-2 hover:bg-white/5 rounded">Pelanggan</Link>
          <Link href="/dashboard" className="block px-3 py-2 hover:bg-white/5 rounded">Deposit & keuangan</Link>
          <Link href="/dashboard" className="block px-3 py-2 hover:bg-white/5 rounded">Laporan</Link>
          <Link href="/dashboard" className="block px-3 py-2 hover:bg-white/5 rounded">Pengaturan API</Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs text-orange-500 font-medium">DATA CONTOH</div>
            <h1 className="text-2xl font-bold">Dasbor hari ini</h1>
            <p className="text-sm text-gray-500">Jumat, 16 Oktober 2026 · semua pesanan diproses lewat akun Holigo yang sama dengan aplikasi Holigo Anda</p>
          </div>
          <div className="flex gap-2">
            <button className="border px-4 py-2 rounded text-sm">Sinkron status</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm">Pesan untuk pelanggan</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0f2c3a] text-white rounded-xl p-4">
            <div className="text-xs text-gray-400">SALDO DEPOSIT HOLIGO</div>
            <div className="text-2xl font-bold mt-1">Rp 18.450.000</div>
            <div className="text-xs text-gray-400 mt-1">Dipakai otomatis saat tiket di-issue</div>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <div className="text-xs text-gray-500">PESANAN HARI INI</div>
            <div className="text-2xl font-bold mt-1">14</div>
            <div className="text-xs text-gray-400">11 pesawat · 3 hotel</div>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <div className="text-xs text-gray-500">MENUNGGU BAYAR</div>
            <div className="text-2xl font-bold text-orange-500 mt-1">3</div>
            <div className="text-xs text-gray-400">1 kedaluwarsa dalam 30 menit</div>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <div className="text-xs text-gray-500">KONEKSI API HOLIGO</div>
            <div className="text-green-600 font-medium mt-1">● Terhubung</div>
            <div className="text-xs text-gray-400">Rata-rata respons 640 ms · token aktif</div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-semibold">Pesanan terbaru</h2>
            <div className="flex gap-2 text-sm">
              <button className="bg-[#0f2c3a] text-white px-3 py-1 rounded">Semua</button>
              <button className="px-3 py-1">Menunggu bayar</button>
              <button className="px-3 py-1">Terbit</button>
              <button className="px-3 py-1">Batal</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-3">KODE</th>
                  <th className="px-4 py-3">LAYANAN</th>
                  <th className="px-4 py-3">PELANGGAN</th>
                  <th className="px-4 py-3">WAKTU</th>
                  <th className="px-4 py-3">TOTAL</th>
                  <th className="px-4 py-3">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.code} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{o.code}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{o.service}</div>
                      <div className="text-xs text-gray-400">{o.detail}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{o.customer}</td>
                    <td className="px-4 py-3">{o.time}</td>
                    <td className="px-4 py-3 font-medium">{o.total}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        o.status === "E-tiket terbit" ? "bg-green-100 text-green-700" :
                        o.status === "Menunggu bayar" ? "bg-orange-100 text-orange-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* API Logs */}
        <div className="bg-white rounded-xl border mt-6 p-4">
          <h2 className="font-semibold mb-3">Log permintaan ke API Holigo</h2>
          <div className="text-xs font-mono space-y-1 text-gray-600">
            <div className="flex justify-between"><span>03:41:22 POST /flight/booking</span><span className="text-green-600">200</span><span>1.840 ms</span></div>
            <div className="flex justify-between"><span>03:40:57 POST /flight/search CGK-DJJ</span><span className="text-green-600">200</span><span>912 ms</span></div>
            <div className="flex justify-between"><span>03:12:04 POST /booking/status BEP-6FQ81</span><span className="text-green-600">200</span><span>318 ms</span></div>
            <div className="flex justify-between"><span>02:15:40 POST /flight/issued BEP-6FQ81</span><span className="text-green-600">200</span><span>2.210 ms</span></div>
            <div className="flex justify-between"><span>01:02:11 POST /auth/login</span><span className="text-red-500">401</span><span>204 ms</span></div>
          </div>
        </div>
      </main>
    </div>
  );
}
