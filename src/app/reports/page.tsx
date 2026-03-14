"use client";

import { useTranslations } from "next-intl";
import { BarChart3, Download, FileText, Calendar } from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const REPORTS = [
  { id: 1, titleKa: "ISO 14001 Gap Analysis ანგარიში", titleEn: "ISO 14001 Gap Analysis Report", type: "PDF", date: "2025-03-10", module: "ISO 14001" },
  { id: 2, titleKa: "ESMP პროგრესის ანგარიში", titleEn: "ESMP Progress Report", type: "PDF", date: "2025-03-05", module: "ESMP" },
  { id: 3, titleKa: "კომპლაიანს მონიტორინგის კვარტალური ანგარიში", titleEn: "Compliance Monitoring Quarterly Report", type: "PDF", date: "2025-03-01", module: "Monitoring" },
  { id: 4, titleKa: "SEP ანგარიში", titleEn: "SEP Report", type: "Word", date: "2025-02-20", module: "SEP" },
  { id: 5, titleKa: "შიდა აუდიტის ანგარიში", titleEn: "Internal Audit Report", type: "PDF", date: "2025-02-15", module: "Audit" },
  { id: 6, titleKa: "სამართლებრივი ვალდებულებების ანგარიში", titleEn: "Legal Obligations Report", type: "PDF", date: "2025-02-01", module: "Legal" },
];

export default function ReportsPage() {
  const t = useTranslations("common");

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500">PDF / Word document generation</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((r) => (
            <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 flex items-start justify-between">
                <div className="rounded-lg bg-brand/10 p-2">
                  <FileText className="h-5 w-5 text-brand" />
                </div>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{r.type}</span>
              </div>
              <h3 className="font-medium text-gray-900">{r.titleKa}</h3>
              <p className="text-xs text-gray-400">{r.titleEn}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="h-3 w-3" /> {r.date}
                </span>
                <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50">
                  <Download className="h-3 w-3" />
                  {t("download")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
