"use client";

import Link from "next/link";

const flights = [
  {
    airline: "Lion Air",
    code: "JT 792",
    class: "Ekonomi · bagasi 20 kg",
    depart: "04:30",
    arrive: "14:20",
    duration: "7j50m",
    transit: "1 transit · Makassar (UPG)",
    price: "Rp 2.185.000",
    seats: "Sisa 7 kursi",
  },
  {
    airline: "Citilink",
    code: "QG 1840",
    class: "Ekonomi · bagasi 15 kg",
    depart: "21:30",
    arrive: "06:40+1",
    duration: "7j10m",
    transit: "1 transit · Makassar (UPG)",
    price: "Rp 2.310.000",
    seats: "Sisa 2 kursi",
  },
  {
    airline: "Batik Air",
    code: "ID 6182",
    class: "Ekonomi · bagasi 20 kg",
    depart: "08:15",
    arrive: "17:05",
    duration: "6j50m",
    transit: "1 transit · Makassar (UPG)",
    price: "Rp 2.640.000",
    seats: "Sisa 9 kursi",
  },
  {
    airline: "Garuda Indonesia",
    code: "GA 652",
    class: "Ekonomi · bagasi 20 kg",
    depart: "06:10",
    arrive: "13:45",
    duration: "5j35m",
    transit: "Langsung",
    price: "Rp 3.420.000",
    seats: "Sisa 4 kursi",
  },
];

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0f2c3a] text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-sm">B</div>
            <span className="font-bold">Bep's Solution Travel</span>
          </Link>
          <Link href="/dashboard" className="border border-white/30 px-4 py-1.5 rounded text-sm">Masuk agen</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="font-semibold">CGK → DJJ</div>
            <div className="text-sm text-gray-500">Jakarta - Jayapura · Jum, 23 Okt 2026 · 1 dewasa · Ekonomi</div>
          </div>
          <button className="border px-4 py-2 rounded text-sm">Ubah pencarian</button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {["Rab, 21 Okt Rp 2,4jt", "Kam, 22 Okt Rp 2,3jt", "Jum, 23 Okt Rp 2,1jt", "Sab, 24 Okt Rp 2,6jt", "Min, 25 Okt Rp 2,4jt"].map((d, i) => (
            <button key={i} className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap border ${i === 2 ? "bg-orange-50 border-orange-300" : "bg-white"}`}>
              {d}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Filters */}
          <aside className="w-56 hidden md:block">
            <div className="bg-white rounded-xl p-4 border">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Filter</span>
                <button className="text-orange-500 text-sm">Reset</button>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium mb-2">TRANSIT</div>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Langsung</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> 1 transit</label>
                </div>
                <div>
                  <div className="font-medium mb-2">MASKAPAI</div>
                  {["Garuda Indonesia", "Lion Air", "Batik Air", "Citilink"].map((a) => (
                    <label key={a} className="flex items-center gap-2"><input type="checkbox" defaultChecked /> {a}</label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">4 penerbangan · jam menurut zona waktu bandara</div>
              <div className="flex gap-2">
                <button className="bg-[#0f2c3a] text-white px-3 py-1 rounded text-sm">Termurah</button>
                <button className="bg-white border px-3 py-1 rounded text-sm">Paling pagi</button>
                <button className="bg-white border px-3 py-1 rounded text-sm">Tercepat</button>
              </div>
            </div>

            <div className="space-y-4">
              {flights.map((f) => (
                <div key={f.code} className="bg-white border rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span className="font-medium text-gray-800">{f.airline}</span>
                      <span>{f.code}</span>
                      <span>· {f.class}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-2xl font-bold">{f.depart}</div>
                        <div className="text-xs text-gray-400">CGK WIB</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="text-xs text-gray-400">{f.duration}</div>
                        <div className="border-t border-dashed my-1" />
                        <div className="text-xs text-green-600">{f.transit}</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{f.arrive}</div>
                        <div className="text-xs text-gray-400">DJJ WIT</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right min-w-[140px]">
                    <div className="text-xs text-gray-400">per orang</div>
                    <div className="text-xl font-bold text-gray-800">{f.price}</div>
                    <div className="text-xs text-orange-500 mb-3">{f.seats}</div>
                    <Link href="/booking" className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium">
                      Pilih
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
