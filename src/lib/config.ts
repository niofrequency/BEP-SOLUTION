// Business settings. Set these in Vercel → Settings → Environment Variables,
// then redeploy. NEXT_PUBLIC_* values are visible in the browser, which is
// fine for a public WhatsApp number and email — never put secrets here.

function normalizeWaNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  return digits;
}

export const WA_NUMBER = normalizeWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER ?? "");
export const BUSINESS_EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "";
export const BUSINESS_ADDRESS = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? "";
export const BUSINESS_HOURS = "Senin–Minggu, 08.00–22.00 WIT";

export const waConfigured = WA_NUMBER.length >= 10;

/** "6281234567890" → "+62 812-3456-7890" */
export function displayWaNumber(): string {
  if (!waConfigured) return "-";
  const local = WA_NUMBER.slice(2);
  return `+62 ${local.slice(0, 3)}-${local.slice(3, 7)}-${local.slice(7)}`;
}

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
