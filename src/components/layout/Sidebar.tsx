"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  ShieldCheck,
  FileCheck,
  Database,
  ClipboardList,
  Users,
  Scale,
  Search,
  GraduationCap,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  ShieldCheck,
  FileCheck,
  Database,
  ClipboardList,
  Users,
  Scale,
  Search,
  GraduationCap,
  BarChart3,
  Settings,
};

const NAV_ITEMS = [
  { key: "dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { key: "monitoring", href: "/monitoring", icon: "ShieldCheck" },
  { key: "iso14001", href: "/iso14001", icon: "FileCheck" },
  { key: "activities", href: "/activities", icon: "Database" },
  { key: "esmp", href: "/esmp", icon: "ClipboardList" },
  { key: "sep", href: "/sep", icon: "Users" },
  { key: "legal", href: "/permit", icon: "Scale" },
  { key: "analytics", href: "/analytics", icon: "BarChart3" },
  { key: "map", href: "/map", icon: "Search" },
  { key: "audit", href: "/audit", icon: "Search" },
  { key: "training", href: "/training", icon: "GraduationCap" },
  { key: "reports", href: "/reports", icon: "BarChart3" },
  { key: "settings", href: "/settings", icon: "Settings" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-gray-200 bg-white pt-16 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
