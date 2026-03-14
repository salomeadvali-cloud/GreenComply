"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Scale,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ChevronRight,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";

const OBLIGATIONS = [
  { id: 1, lawKa: "გარემოსდაცვითი შეფასების კოდექსი", lawEn: "Environmental Assessment Code", obligationKa: "გზშ ანგარიშის წარდგენა", obligationEn: "EIA Report Submission", deadline: "2025-04-30", frequency: "annual", status: "pending", category: "environmentalCode" },
  { id: 2, lawKa: "ნარჩენების მართვის კოდექსი", lawEn: "Waste Management Code", obligationKa: "ნარჩენების ინვენტარიზაციის ანგარიში", obligationEn: "Waste Inventory Report", deadline: "2025-03-31", frequency: "quarterly", status: "overdue", category: "wasteManagement" },
  { id: 3, lawKa: "წყლის რესურსების მართვის კანონი", lawEn: "Water Resources Management Law", obligationKa: "წყლის ხარისხის მონიტორინგის ანგარიში", obligationEn: "Water Quality Monitoring Report", deadline: "2025-05-15", frequency: "quarterly", status: "pending", category: "waterResources" },
  { id: 4, lawKa: "ატმოსფერული ჰაერის დაცვის კანონი", lawEn: "Atmospheric Air Protection Law", obligationKa: "ჰაერის ემისიების წლიური ანგარიში", obligationEn: "Annual Air Emissions Report", deadline: "2025-06-01", frequency: "annual", status: "pending", category: "airQuality" },
  { id: 5, lawKa: "გარემოსდაცვითი შეფასების კოდექსი", lawEn: "Environmental Assessment Code", obligationKa: "სკრინინგის განცხადება", obligationEn: "Screening Application", deadline: "2025-02-28", frequency: "annual", status: "completed", category: "environmentalCode" },
  { id: 6, lawKa: "ხმაურის დაცვის ტექნიკური რეგლამენტი", lawEn: "Noise Protection Technical Regulation", obligationKa: "ხმაურის დონის გაზომვის ანგარიში", obligationEn: "Noise Level Measurement Report", deadline: "2025-07-01", frequency: "annual", status: "pending", category: "noiseRegulation" },
];

export default function LegalPage() {
  const t = useTranslations("legal");
  const tc = useTranslations("common");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = ["all", "environmentalCode", "wasteManagement", "waterResources", "airQuality", "noiseRegulation"] as const;

  const filtered = categoryFilter === "all"
    ? OBLIGATIONS
    : OBLIGATIONS.filter((o) => o.category === categoryFilter);

  const completed = OBLIGATIONS.filter((o) => o.status === "completed").length;
  const pending = OBLIGATIONS.filter((o) => o.status === "pending").length;
  const overdue = OBLIGATIONS.filter((o) => o.status === "overdue").length;

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-sm text-gray-500">{t("subtitle")}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard title={tc("completed")} value={completed} icon={CheckCircle2} color="text-success" />
          <StatCard title={tc("pending")} value={pending} icon={Clock} color="text-warning" />
          <StatCard title={tc("overdue")} value={overdue} icon={AlertTriangle} color="text-danger" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                categoryFilter === cat
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat === "all" ? tc("all") : t(cat)}
            </button>
          ))}
        </div>

        {/* Obligations Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3">{t("law")}</th>
                  <th className="px-6 py-3">{t("obligations")}</th>
                  <th className="px-6 py-3">{t("deadline")}</th>
                  <th className="px-6 py-3">{t("frequency")}</th>
                  <th className="px-6 py-3">{tc("status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div>
                        <span className="font-medium text-gray-800">{o.lawKa}</span>
                        <p className="text-xs text-gray-400">{o.lawEn}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <div>
                        <span className="text-gray-700">{o.obligationKa}</span>
                        <p className="text-xs text-gray-400">{o.obligationEn}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-600">{o.deadline}</td>
                    <td className="px-6 py-3">
                      <span className="text-xs text-gray-500">{t(o.frequency)}</span>
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={o.status} label={tc(o.status)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
