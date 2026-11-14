import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="bg-[#0f2c3a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-sm">B</div>
          <div>
            <div className="font-bold text-lg leading-none">Bep&apos;s</div>
            <div className="text-xs text-gray-300">SOLUTION TRAVEL</div>
          </div>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6 text-sm">
          <Link href="/?tab=pesawat" className="hidden sm:inline hover:text-orange-400">Pesawat</Link>
          <Link href="/?tab=hotel" className="hidden sm:inline hover:text-orange-400">Hotel</Link>
          <Link href="/cek-pesanan" className="hover:text-orange-400">Cek pesanan</Link>
          <Link href="/kontak" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-medium">
            Kontak
          </Link>
        </nav>
      </div>
    </header>
  );
}
