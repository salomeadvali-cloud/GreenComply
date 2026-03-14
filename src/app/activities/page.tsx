"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Database,
  Search,
  Filter,
  Zap,
  Mountain,
  Building2,
  Factory,
  Wheat,
  TreePine,
  Droplets,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import StatusBadge from "@/components/ui/StatusBadge";
import { EIA_ACTIVITIES } from "@/lib/constants";

const SECTOR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  energy: Zap,
  mining: Mountain,
  infrastructure: Building2,
  industrial: Factory,
  agriculture: Wheat,
  tourism: TreePine,
  wastewater: Droplets,
};

const SECTORS = ["all", "energy", "mining", "infrastructure", "industrial", "agriculture", "tourism", "wastewater"] as const;

export default function ActivitiesPage() {
  const t = useTranslations("activities");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [classFilter, setClassFilter] = useState<string>("all");

  const filtered = EIA_ACTIVITIES.filter((a) => {
    const name = locale === "ka" ? a.nameKa : a.nameEn;
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase());
    const matchSector = sectorFilter === "all" || a.sector === sectorFilter;
    const matchClass = classFilter === "all" || a.class === classFilter;
    return matchSearch && matchSector && matchClass;
  });

  const sectorLabels: Record<string, string> = {
    all: tc("all"),
    energy: t("energy"),
    mining: t("mining"),
    infrastructure: t("infrastructure"),
    industrial: t("industrial"),
    agriculture: t("agriculture"),
    tourism: t("tourism"),
    wastewater: t("wastewater"),
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-500">{t("subtitle")}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={tc("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:border-primary focus:outline-none"
            >
              {SECTORS.map((s) => (
                <option key={s} value={s}>{sectorLabels[s]}</option>
              ))}
            </select>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 focus:border-primary focus:outline-none"
            >
              <option value="all">{tc("all")}</option>
              <option value="I">{t("classI")}</option>
              <option value="II">{t("classII")}</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="rounded-lg bg-red-50 px-4 py-2 text-sm">
            <span className="font-medium text-red-700">I {t("class")}:</span>{" "}
            <span className="text-red-600">{EIA_ACTIVITIES.filter((a) => a.class === "I").length}</span>
          </div>
          <div className="rounded-lg bg-orange-50 px-4 py-2 text-sm">
            <span className="font-medium text-orange-700">II {t("class")}:</span>{" "}
            <span className="text-orange-600">{EIA_ACTIVITIES.filter((a) => a.class === "II").length}</span>
          </div>
          <div className="rounded-lg bg-gray-50 px-4 py-2 text-sm">
            <span className="font-medium text-gray-700">{tc("all")}:</span>{" "}
            <span className="text-gray-600">{EIA_ACTIVITIES.length}</span>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">{t("sector")}</th>
                  <th className="px-6 py-3">{t("activity")}</th>
                  <th className="px-6 py-3">{t("class")}</th>
                  <th className="px-6 py-3">{t("threshold")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((a) => {
                  const SectorIcon = SECTOR_ICONS[a.sector] || Database;
                  return (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-400">{a.id}</td>
                      <td className="px-6 py-3">
                        <span className="flex items-center gap-2">
                          <SectorIcon className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{sectorLabels[a.sector]}</span>
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div>
                          <span className="font-medium text-gray-800">{locale === "ka" ? a.nameKa : a.nameEn}</span>
                          <p className="text-xs text-gray-400">{locale === "ka" ? a.nameEn : a.nameKa}</p>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <StatusBadge status={`class-${a.class}`} label={`${a.class}`} />
                      </td>
                      <td className="px-6 py-3 text-gray-600 text-xs">{locale === "ka" ? a.thresholdKa : a.thresholdEn}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-400">
              No activities found
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
