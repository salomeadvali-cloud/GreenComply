"use client";

import { useTranslations } from "next-intl";
import { Bell, Menu } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            G
          </div>
          <span className="text-lg font-bold text-gray-900">
            {t("appName")}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
            3
          </span>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-medium text-white">
          U
        </div>
      </div>
    </header>
  );
}
