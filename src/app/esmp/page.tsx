"use client";

import { useTranslations } from "next-intl";
import { ClipboardList, Target, Calendar, BarChart3, Plus } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusBadge from "@/components/ui/StatusBadge";

const MEASURES = [
  { id: 1, measureKa: "მტვრის ემისიების კონტროლი", measureEn: "Dust Emission Control", responsibleKa: "გარემოსდ. მენეჯერი", status: "completed", kpi: 85 },
  { id: 2, measureKa: "ხმაურის შემცირების ღონისძიებები", measureEn: "Noise Reduction Measures", responsibleKa: "ოპერაციების მენეჯერი", status: "pending", kpi: 45 },
  { id: 3, measureKa: "ნარჩენების სეპარაცია და რეციკლირება", measureEn: "Waste Segregation & Recycling", responsibleKa: "ნარჩენების მენეჯერი", status: "pending", kpi: 60 },
  { id: 4, measureKa: "ჩამდინარე წყლების გაწმენდა", measureEn: "Wastewater Treatment", responsibleKa: "გარემოსდ. მენეჯერი", status: "overdue", kpi: 30 },
  { id: 5, measureKa: "ბიომრავალფეროვნების დაცვა", measureEn: "Biodiversity Protection", responsibleKa: "ეკოლოგი", status: "pending", kpi: 55 },
];

export default function ESMPPage() {
  const t = useTranslations("common");

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ESMP</h1>
            <p className="text-sm text-gray-500">Environmental & Social Management Plan</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            {t("add")}
          </button>
        </div>

        {/* KPI Overview */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">KPI Dashboard</h2>
          <div className="space-y-4">
            {MEASURES.map((m) => (
              <ProgressBar
                key={m.id}
                value={m.kpi}
                label={m.measureKa}
                color={m.kpi >= 80 ? "bg-green-500" : m.kpi >= 50 ? "bg-yellow-500" : "bg-red-500"}
              />
            ))}
          </div>
        </div>

        {/* Measures Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Measure</th>
                  <th className="px-6 py-3">Responsible</th>
                  <th className="px-6 py-3">KPI</th>
                  <th className="px-6 py-3">{t("status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MEASURES.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-400">{m.id}</td>
                    <td className="px-6 py-3">
                      <div>
                        <span className="font-medium text-gray-800">{m.measureKa}</span>
                        <p className="text-xs text-gray-400">{m.measureEn}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-600">{m.responsibleKa}</td>
                    <td className="px-6 py-3 font-medium text-gray-800">{m.kpi}%</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={m.status} label={t(m.status)} />
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
