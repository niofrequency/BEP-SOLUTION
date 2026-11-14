import Link from "next/link";
import { BUSINESS_ADDRESS, BUSINESS_EMAIL, BUSINESS_HOURS, displayWaNumber, waConfigured, waLink } from "@/lib/config";

export default function SiteFooter() {
  return (
    <footer className="bg-[#0f2c3a] text-gray-300 mt-auto py-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-bold text-white mb-2">Bep&apos;s Solution Travel</div>
          {BUSINESS_ADDRESS && <p>{BUSINESS_ADDRESS}</p>}
          <p>Tiket pesawat &amp; hotel seluruh Indonesia.</p>
        </div>
        <div>
          <div className="font-bold text-white mb-2">Hubungi kami</div>
          {waConfigured && (
            <p>
              WhatsApp:{" "}
              <a href={waLink("Halo Bep's Solution Travel, saya mau tanya.")} className="hover:text-orange-400">
                {displayWaNumber()}
              </a>
            </p>
          )}
          {BUSINESS_EMAIL && <p>Email: {BUSINESS_EMAIL}</p>}
          <p>{BUSINESS_HOURS}</p>
        </div>
        <div>
          <div className="font-bold text-white mb-2">Informasi</div>
          <p><Link href="/cek-pesanan" className="hover:text-orange-400">Cek status pesanan</Link></p>
          <p><Link href="/kontak" className="hover:text-orange-400">Kontak</Link></p>
        </div>
      </div>
    </footer>
  );
}
