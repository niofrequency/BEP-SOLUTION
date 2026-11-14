import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BUSINESS_ADDRESS, BUSINESS_EMAIL, BUSINESS_HOURS, displayWaNumber, waConfigured, waLink } from "@/lib/config";

export const metadata = { title: "Kontak · Bep's Solution Travel" };

export default function KontakPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader />
      <div className="max-w-md w-full mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-6">Hubungi kami</h1>
        <div className="bg-white border rounded-xl p-6 space-y-4 text-sm">
          {waConfigured ? (
            <div>
              <div className="text-xs text-gray-500">WHATSAPP</div>
              <div className="font-medium text-lg">{displayWaNumber()}</div>
            </div>
          ) : (
            <div className="text-red-600">Nomor WhatsApp belum diatur.</div>
          )}
          {BUSINESS_EMAIL && (
            <div>
              <div className="text-xs text-gray-500">EMAIL</div>
              <a href={`mailto:${BUSINESS_EMAIL}`} className="font-medium">{BUSINESS_EMAIL}</a>
            </div>
          )}
          {BUSINESS_ADDRESS && (
            <div>
              <div className="text-xs text-gray-500">ALAMAT</div>
              <div>{BUSINESS_ADDRESS}</div>
            </div>
          )}
          <div>
            <div className="text-xs text-gray-500">JAM LAYANAN</div>
            <div>{BUSINESS_HOURS}</div>
          </div>
          {waConfigured && (
            <a
              href={waLink("Halo Bep's Solution Travel, saya mau tanya.")}
              className="block text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
            >
              Chat via WhatsApp
            </a>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
