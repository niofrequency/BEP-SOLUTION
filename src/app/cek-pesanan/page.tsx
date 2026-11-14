"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { waConfigured, waLink } from "@/lib/config";

export default function CekPesananPage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!waConfigured) return setError("Nomor WhatsApp toko belum diatur. Silakan hubungi admin.");
    if (!code.trim()) return setError("Isi kode pesanan Anda.");
    setError("");
    const msg = [
      "Halo Bep's Solution Travel, saya mau cek status pesanan.",
      "",
      `*Kode pesanan:* ${code.trim().toUpperCase()}`,
      name.trim() && `*Nama pemesan:* ${name.trim()}`,
    ].filter(Boolean).join("\n");
    window.location.href = waLink(msg);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader />
      <form onSubmit={submit} className="max-w-md w-full mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-2">Cek status pesanan</h1>
        <p className="text-gray-600 mb-6 text-sm">Masukkan kode pesanan (contoh: BEP-261114-AB12). Kami akan membalas status pesanan Anda lewat WhatsApp.</p>
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-500">KODE PESANAN</label>
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="BEP-…" className="w-full mt-1 border rounded-lg px-3 py-2 font-mono uppercase" />
          </div>
          <div>
            <label className="text-xs text-gray-500">NAMA PEMESAN (OPSIONAL)</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 border rounded-lg px-3 py-2" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
            Tanya via WhatsApp
          </button>
        </div>
      </form>
      <SiteFooter />
    </div>
  );
}
