"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { setLocale } from "@/app/actions";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const toggle = async () => {
    const next = locale === "ka" ? "en" : "ka";
    await setLocale(next);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
    >
      <span className={locale === "ka" ? "font-bold text-primary" : ""}>ქა</span>
      <span className="text-gray-300">/</span>
      <span className={locale === "en" ? "font-bold text-primary" : ""}>EN</span>
    </button>
  );
}
