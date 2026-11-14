"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { waConfigured, waLink } from "@/lib/config";
import { formatDate, makeOrderCode, nightsBetween, todayIso } from "@/lib/order";

const inputCls = "w-full mt-1 border rounded-lg px-3 py-2";
const labelCls = "text-xs text-gray-500";

type Kind = "Dewasa" | "Anak" | "Bayi";
type Passenger = { kind: Kind; title: string; name: string; idNo: string; birth: string };

const clampInt = (v: string | null, min: number, max: number, fallback: number) => {
  const n = Number.parseInt(v ?? "", 10);
  return Number.isNaN(n) ? fallback : Math.min(max, Math.max(min, n));
};

function buildPassengers(adults: number, children: number, infants: number, prev: Passenger[]): Passenger[] {
  const want: Kind[] = [
    ...Array<Kind>(adults).fill("Dewasa"),
    ...Array<Kind>(children).fill("Anak"),
    ...Array<Kind>(infants).fill("Bayi"),
  ];
  const pools: Record<Kind, Passenger[]> = {
    Dewasa: prev.filter((p) => p.kind === "Dewasa"),
    Anak: prev.filter((p) => p.kind === "Anak"),
    Bayi: prev.filter((p) => p.kind === "Bayi"),
  };
  return want.map(
    (kind) => pools[kind].shift() ?? { kind, title: kind === "Dewasa" ? "Tuan" : "Mstr", name: "", idNo: "", birth: "" },
  );
}

function BookingForm() {
  const params = useSearchParams();
  const type = params.get("type") === "hotel" ? "hotel" : "pesawat";
  const [today, setToday] = useState("");
  useEffect(() => setToday(todayIso()), []);

  // Trip (prefilled from the homepage, still editable here)
  const [from, setFrom] = useState(params.get("from") ?? "");
  const [to, setTo] = useState(params.get("to") ?? "");
  const [date, setDate] = useState(params.get("date") ?? "");
  const [returnDate, setReturnDate] = useState(params.get("returnDate") ?? "");
  const [adults, setAdults] = useState(clampInt(params.get("adults"), 1, 9, 1));
  const [children, setChildren] = useState(clampInt(params.get("children"), 0, 8, 0));
  const [infants, setInfants] = useState(clampInt(params.get("infants"), 0, 9, 0));
  const [cabin, setCabin] = useState(params.get("cabin") === "Bisnis" ? "Bisnis" : "Ekonomi");
  const [airline, setAirline] = useState("");
  const [timePref, setTimePref] = useState("Bebas");

  const [city, setCity] = useState(params.get("city") ?? "");
  const [checkIn, setCheckIn] = useState(params.get("checkIn") ?? "");
  const [checkOut, setCheckOut] = useState(params.get("checkOut") ?? "");
  const [rooms, setRooms] = useState(clampInt(params.get("rooms"), 1, 9, 1));
  const [guests, setGuests] = useState(clampInt(params.get("guests"), 1, 20, 2));
  const [budget, setBudget] = useState("");
  const [breakfast, setBreakfast] = useState("Bebas");

  // Contact
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [passengers, setPassengers] = useState<Passenger[]>(() => buildPassengers(adults, children, infants, []));
  useEffect(() => {
    setPassengers((prev) => buildPassengers(adults, children, infants, prev));
  }, [adults, children, infants]);

  const [error, setError] = useState("");
  const [sent, setSent] = useState<{ code: string; link: string } | null>(null);

  const nights = useMemo(() => nightsBetween(checkIn, checkOut), [checkIn, checkOut]);

  function updatePassenger(i: number, patch: Partial<Passenger>) {
    setPassengers((ps) => ps.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  }

  function buildMessage(code: string): string {
    const lines: string[] = [];
    const contact = [`Nama: ${name}`, `WhatsApp: ${phone}`, email && `Email: ${email}`].filter(Boolean) as string[];

    if (type === "pesawat") {
      const pax = [`${adults} dewasa`, children && `${children} anak`, infants && `${infants} bayi`].filter(Boolean).join(", ");
      lines.push(
        "Halo Bep's Solution Travel, saya mau pesan *tiket pesawat*.",
        "",
        `*Kode pesanan:* ${code}`,
        `*Rute:* ${from} → ${to}`,
        `*Pergi:* ${formatDate(date)}`,
        `*Pulang:* ${returnDate ? formatDate(returnDate) : "Sekali jalan"}`,
        `*Penumpang:* ${pax}`,
        `*Kelas:* ${cabin}`,
        `*Maskapai:* ${airline || "Bebas / termurah"}`,
        `*Jam berangkat:* ${timePref}`,
        "",
        "*Data penumpang:*",
        ...passengers.map((p, i) => {
          const extra = p.kind === "Dewasa" ? (p.idNo ? ` – NIK/Paspor ${p.idNo}` : "") : ` – lahir ${formatDate(p.birth)}`;
          return `${i + 1}. ${p.title} ${p.name.trim().toUpperCase()} (${p.kind})${extra}`;
        }),
      );
    } else {
      lines.push(
        "Halo Bep's Solution Travel, saya mau pesan *hotel*.",
        "",
        `*Kode pesanan:* ${code}`,
        `*Kota / hotel:* ${city}`,
        `*Check-in:* ${formatDate(checkIn)}`,
        `*Check-out:* ${formatDate(checkOut)} (${nights} malam)`,
        `*Kamar:* ${rooms} · *Tamu:* ${guests}`,
        `*Budget per malam:* ${budget || "Bebas"}`,
        `*Sarapan:* ${breakfast}`,
      );
    }
    lines.push("", "*Kontak:*", ...contact);
    if (notes.trim()) lines.push("", `*Catatan:* ${notes.trim()}`);
    lines.push("", "Mohon info harga dan cara pembayarannya. Terima kasih.");
    return lines.join("\n");
  }

  function validate(): string {
    if (!waConfigured) return "Nomor WhatsApp toko belum diatur. Silakan hubungi admin.";
    if (type === "pesawat") {
      if (!from.trim() || !to.trim()) return "Isi kota asal dan tujuan.";
      if (!date) return "Isi tanggal berangkat.";
      if (returnDate && returnDate < date) return "Tanggal pulang tidak boleh sebelum tanggal pergi.";
      if (infants > adults) return "Jumlah bayi tidak boleh lebih dari jumlah dewasa.";
      if (passengers.some((p) => !p.name.trim())) return "Isi nama semua penumpang sesuai KTP/paspor.";
      if (passengers.some((p) => p.kind !== "Dewasa" && !p.birth)) return "Isi tanggal lahir untuk anak dan bayi.";
    } else {
      if (!city.trim()) return "Isi kota atau nama hotel.";
      if (!checkIn || !checkOut) return "Isi tanggal check-in dan check-out.";
      if (nights < 1) return "Tanggal check-out harus setelah check-in.";
    }
    if (!name.trim()) return "Isi nama pemesan.";
    if (phone.replace(/\D/g, "").length < 9) return "Isi nomor WhatsApp yang benar.";
    return "";
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const problem = validate();
    setError(problem);
    if (problem) return;
    const code = makeOrderCode();
    const link = waLink(buildMessage(code));
    setSent({ code, link });
    window.scrollTo({ top: 0 });
    window.location.href = link;
  }

  if (sent) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold mb-2">Pesanan siap dikirim</h1>
        <p className="text-gray-600 mb-6">
          WhatsApp akan terbuka dengan pesan pesanan Anda. <b>Tekan tombol kirim</b> di WhatsApp agar pesanan sampai ke kami.
        </p>
        <div className="bg-white border rounded-xl p-4 mb-6">
          <div className="text-xs text-gray-500">KODE PESANAN</div>
          <div className="text-2xl font-mono font-bold">{sent.code}</div>
          <div className="text-xs text-gray-500 mt-1">Simpan kode ini untuk cek status pesanan.</div>
        </div>
        <a href={sent.link} className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium">
          WhatsApp tidak terbuka? Klik di sini
        </a>
        <div className="mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">← Kembali ke beranda</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-6xl mx-auto px-4 py-6" noValidate>
      <Link href={`/?tab=${type}`} className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">← Kembali</Link>
      <h1 className="text-2xl font-bold mb-6">{type === "pesawat" ? "Pesan tiket pesawat" : "Pesan hotel"}</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {type === "pesawat" ? (
            <>
              <div className="bg-white rounded-xl border p-6">
                <h2 className="font-semibold mb-4">Detail penerbangan</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>DARI</label>
                    <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Kota / bandara" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>KE</label>
                    <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Kota / bandara" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>TANGGAL PERGI</label>
                    <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>TANGGAL PULANG (KOSONGKAN JIKA SEKALI JALAN)</label>
                    <input type="date" min={date || today} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className={labelCls}>DEWASA</label>
                    <input type="number" min={1} max={9} value={adults} onChange={(e) => setAdults(clampInt(e.target.value, 1, 9, 1))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>ANAK (2–11)</label>
                    <input type="number" min={0} max={8} value={children} onChange={(e) => setChildren(clampInt(e.target.value, 0, 8, 0))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>BAYI (&lt;2)</label>
                    <input type="number" min={0} max={adults} value={infants} onChange={(e) => setInfants(clampInt(e.target.value, 0, 9, 0))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>KELAS</label>
                    <select value={cabin} onChange={(e) => setCabin(e.target.value)} className={inputCls}>
                      <option>Ekonomi</option>
                      <option>Bisnis</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={labelCls}>MASKAPAI PILIHAN (OPSIONAL)</label>
                    <input value={airline} onChange={(e) => setAirline(e.target.value)} placeholder="Contoh: Garuda, Lion Air" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>JAM BERANGKAT</label>
                    <select value={timePref} onChange={(e) => setTimePref(e.target.value)} className={inputCls}>
                      <option>Bebas</option>
                      <option>Pagi (00.00–11.59)</option>
                      <option>Siang (12.00–17.59)</option>
                      <option>Malam (18.00–23.59)</option>
                    </select>
                  </div>
                </div>
              </div>

              {passengers.map((p, i) => (
                <div key={i} className="bg-white rounded-xl border p-6">
                  <h2 className="font-semibold mb-4">Penumpang {i + 1} · {p.kind}</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelCls}>TITEL</label>
                      <select value={p.title} onChange={(e) => updatePassenger(i, { title: e.target.value })} className={inputCls}>
                        {p.kind === "Dewasa" ? (
                          <>
                            <option>Tuan</option>
                            <option>Nyonya</option>
                            <option>Nona</option>
                          </>
                        ) : (
                          <>
                            <option value="Mstr">Laki-laki (Mstr)</option>
                            <option value="Miss">Perempuan (Miss)</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>NAMA SESUAI KTP / PASPOR</label>
                      <input value={p.name} onChange={(e) => updatePassenger(i, { name: e.target.value })} placeholder="Tanpa gelar" className={inputCls} />
                    </div>
                    {p.kind === "Dewasa" ? (
                      <div>
                        <label className={labelCls}>NIK / NO. PASPOR (OPSIONAL)</label>
                        <input value={p.idNo} onChange={(e) => updatePassenger(i, { idNo: e.target.value })} className={inputCls} />
                      </div>
                    ) : (
                      <div>
                        <label className={labelCls}>TANGGAL LAHIR</label>
                        <input type="date" max={today} value={p.birth} onChange={(e) => updatePassenger(i, { birth: e.target.value })} className={inputCls} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold mb-4">Detail hotel</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className={labelCls}>KOTA / AREA / NAMA HOTEL</label>
                  <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Contoh: Jayapura, dekat bandara" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>CHECK-IN</label>
                  <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>CHECK-OUT</label>
                  <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>JUMLAH KAMAR</label>
                  <input type="number" min={1} max={9} value={rooms} onChange={(e) => setRooms(clampInt(e.target.value, 1, 9, 1))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>JUMLAH TAMU</label>
                  <input type="number" min={1} max={20} value={guests} onChange={(e) => setGuests(clampInt(e.target.value, 1, 20, 1))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>BUDGET PER MALAM (OPSIONAL)</label>
                  <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Contoh: Rp 500.000" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>SARAPAN</label>
                  <select value={breakfast} onChange={(e) => setBreakfast(e.target.value)} className={inputCls}>
                    <option>Bebas</option>
                    <option>Dengan sarapan</option>
                    <option>Tanpa sarapan</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-semibold mb-4">Kontak pemesan</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>NAMA LENGKAP</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>NOMOR WHATSAPP</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08xx xxxx xxxx" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>EMAIL (OPSIONAL)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="mt-4">
              <label className={labelCls}>CATATAN (OPSIONAL)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Permintaan khusus, bagasi tambahan, dll." className={inputCls} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#0f2c3a] text-white rounded-xl p-6 sticky top-6">
            <div className="text-xs text-gray-400 mb-1">RINGKASAN PESANAN</div>
            {type === "pesawat" ? (
              <>
                <div className="font-bold text-xl">{from || "…"} → {to || "…"}</div>
                <div className="text-sm text-gray-300 mb-4">
                  {date ? formatDate(date) : "Tanggal belum diisi"}
                  {returnDate && ` · pulang ${formatDate(returnDate)}`}
                </div>
                <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                  <div className="flex justify-between"><span>Penumpang</span><span>{passengers.length} orang</span></div>
                  <div className="flex justify-between"><span>Kelas</span><span>{cabin}</span></div>
                </div>
              </>
            ) : (
              <>
                <div className="font-bold text-xl">{city || "…"}</div>
                <div className="text-sm text-gray-300 mb-4">
                  {checkIn && checkOut ? `${formatDate(checkIn)} – ${formatDate(checkOut)}` : "Tanggal belum diisi"}
                </div>
                <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                  <div className="flex justify-between"><span>Durasi</span><span>{nights > 0 ? `${nights} malam` : "-"}</span></div>
                  <div className="flex justify-between"><span>Kamar / tamu</span><span>{rooms} / {guests}</span></div>
                </div>
              </>
            )}
            <div className="text-sm text-gray-300 mt-4 pt-4 border-t border-white/10">
              Harga akan kami kirim lewat WhatsApp setelah dicek ke maskapai/hotel.
            </div>
            {error && <div className="mt-4 bg-red-500/20 border border-red-400 text-red-100 text-sm rounded-lg p-3">{error}</div>}
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium mt-6">
              Kirim pesanan via WhatsApp
            </button>
            <p className="text-xs text-gray-400 mt-3 text-center">Belum ada pembayaran di langkah ini.</p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader />
      <Suspense fallback={<div className="p-12 text-center text-gray-500">Memuat…</div>}>
        <BookingForm />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
