"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { todayIso } from "@/lib/order";

const inputCls = "w-full mt-1 border rounded-lg px-3 py-2";
const labelCls = "text-xs text-gray-500";

const popularRoutes = [
  { from: "Jakarta (CGK)", to: "Jayapura (DJJ)", code: "CGK → DJJ", route: "Jakarta - Jayapura" },
  { from: "Makassar (UPG)", to: "Jayapura (DJJ)", code: "UPG → DJJ", route: "Makassar - Jayapura" },
  { from: "Jayapura (DJJ)", to: "Sorong (SOQ)", code: "DJJ → SOQ", route: "Jayapura - Sorong" },
  { from: "Jakarta (CGK)", to: "Bali (DPS)", code: "CGK → DPS", route: "Jakarta - Bali" },
  { from: "Surabaya (SUB)", to: "Jayapura (DJJ)", code: "SUB → DJJ", route: "Surabaya - Jayapura" },
  { from: "Jayapura (DJJ)", to: "Timika (TIM)", code: "DJJ → TIM", route: "Jayapura - Timika" },
];

function SearchCard() {
  const router = useRouter();
  const params = useSearchParams();
  const [tab, setTab] = useState<"pesawat" | "hotel">("pesawat");
  const [today, setToday] = useState("");

  useEffect(() => {
    setTab(params.get("tab") === "hotel" ? "hotel" : "pesawat");
  }, [params]);
  useEffect(() => setToday(todayIso()), []);

  // Flight
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabin, setCabin] = useState("Ekonomi");

  // Hotel
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  function submitFlight(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({
      type: "pesawat", from, to, date, returnDate,
      adults: String(adults), children: String(children), infants: String(infants), cabin,
    });
    router.push(`/booking?${q}`);
  }

  function submitHotel(e: React.FormEvent) {
    e.preventDefault();
    const q = new URLSearchParams({
      type: "hotel", city, checkIn, checkOut, rooms: String(rooms), guests: String(guests),
    });
    router.push(`/booking?${q}`);
  }

  const tabCls = (t: string) =>
    `px-6 py-3 font-medium ${tab === t ? "border-b-2 border-orange-500 text-orange-500" : "text-gray-500"}`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex border-b mb-6">
        <button type="button" className={tabCls("pesawat")} onClick={() => setTab("pesawat")}>Tiket pesawat</button>
        <button type="button" className={tabCls("hotel")} onClick={() => setTab("hotel")}>Hotel</button>
      </div>

      {tab === "pesawat" ? (
        <form onSubmit={submitFlight}>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className={labelCls}>DARI</label>
              <input required value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Kota / bandara" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>KE</label>
              <input required value={to} onChange={(e) => setTo(e.target.value)} placeholder="Kota / bandara" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>TANGGAL PERGI</label>
              <input required type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>TANGGAL PULANG (OPSIONAL)</label>
              <input type="date" min={date || today} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>DEWASA (12+ TH)</label>
              <input type="number" min={1} max={9} value={adults} onChange={(e) => setAdults(Number(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>ANAK (2–11 TH)</label>
              <input type="number" min={0} max={8} value={children} onChange={(e) => setChildren(Number(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>BAYI (&lt;2 TH)</label>
              <input type="number" min={0} max={adults} value={infants} onChange={(e) => setInfants(Number(e.target.value))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>KELAS</label>
              <select value={cabin} onChange={(e) => setCabin(e.target.value)} className={inputCls}>
                <option>Ekonomi</option>
                <option>Bisnis</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium">
              Lanjut pesan
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={submitHotel}>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className={labelCls}>KOTA / NAMA HOTEL</label>
              <input required value={city} onChange={(e) => setCity(e.target.value)} placeholder="Contoh: Jayapura" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>CHECK-IN</label>
              <input required type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>CHECK-OUT</label>
              <input required type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={labelCls}>KAMAR</label>
                <input type="number" min={1} max={9} value={rooms} onChange={(e) => setRooms(Number(e.target.value))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>TAMU</label>
                <input type="number" min={1} max={20} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={inputCls} />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium">
              Lanjut pesan
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="bg-[#0f2c3a] text-white pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm tracking-widest text-orange-400 mb-3">TIKET PESAWAT · HOTEL · SELURUH INDONESIA</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Pesan tiket dan hotel, dibantu langsung lewat WhatsApp.
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Isi rute dan tanggal, tim kami cekkan harga terbaik dan kirim detailnya ke WhatsApp Anda.
          </p>
        </div>
      </section>

      <div className="max-w-4xl w-full mx-auto px-4 -mt-8 relative z-10">
        <Suspense fallback={<div className="bg-white rounded-xl shadow-lg p-6 h-64" />}>
          <SearchCard />
        </Suspense>
      </div>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Cara pesan</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { n: "1", t: "Isi pesanan", d: "Pilih rute & tanggal, lalu isi data penumpang." },
            { n: "2", t: "Kirim via WhatsApp", d: "Pesanan Anda terkirim otomatis ke WhatsApp kami." },
            { n: "3", t: "Konfirmasi & bayar", d: "Kami kirim pilihan jadwal, harga, dan cara bayar." },
            { n: "4", t: "Terima e-tiket", d: "Setelah pembayaran diterima, e-tiket dikirim ke WhatsApp." },
          ].map((s) => (
            <div key={s.n} className="flex gap-3">
              <div className="w-8 h-8 shrink-0 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">{s.n}</div>
              <div>
                <h3 className="font-semibold">{s.t}</h3>
                <p className="text-sm text-gray-600">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl w-full mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Rute populer</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularRoutes.map((r) => (
            <Link
              key={r.route}
              href={`/booking?${new URLSearchParams({ type: "pesawat", from: r.from, to: r.to })}`}
              className="bg-white border rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="text-sm font-medium text-gray-500">{r.code}</div>
              <div className="font-semibold mt-1">{r.route}</div>
              <div className="text-orange-600 text-sm font-medium mt-2">Pesan →</div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
