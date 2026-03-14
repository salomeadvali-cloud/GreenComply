"use client";

import { useTranslations } from "next-intl";
import { Users, Plus, Mail, Phone, MapPin } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import StatusBadge from "@/components/ui/StatusBadge";

const STAKEHOLDERS = [
  { id: 1, nameKa: "ადგილობრივი მოსახლეობა", nameEn: "Local Community", categoryKa: "დაზარალებული მხარე", categoryEn: "Affected Party", engagementKa: "საჯარო კონსულტაცია", engagementEn: "Public Consultation", lastContact: "2025-03-01", priority: "high" },
  { id: 2, nameKa: "გარემოს დაცვის სამინისტრო (MEPA)", nameEn: "Ministry of Environment (MEPA)", categoryKa: "მარეგულირებელი", categoryEn: "Regulator", engagementKa: "ფორმალური კომუნიკაცია", engagementEn: "Formal Communication", lastContact: "2025-02-20", priority: "high" },
  { id: 3, nameKa: "ადგილობრივი მუნიციპალიტეტი", nameEn: "Local Municipality", categoryKa: "სამთავრობო", categoryEn: "Government", engagementKa: "შეხვედრა", engagementEn: "Meeting", lastContact: "2025-02-15", priority: "medium" },
  { id: 4, nameKa: "არასამთავრობო ორგანიზაციები", nameEn: "NGOs", categoryKa: "სამოქალაქო საზოგადოება", categoryEn: "Civil Society", engagementKa: "მოხსენება", engagementEn: "Report", lastContact: "2025-01-30", priority: "medium" },
  { id: 5, nameKa: "კომპანიის თანამშრომლები", nameEn: "Company Employees", categoryKa: "შიდა მხარე", categoryEn: "Internal", engagementKa: "ტრენინგი", engagementEn: "Training", lastContact: "2025-03-10", priority: "low" },
];

export default function SEPPage() {
  const t = useTranslations("common");

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SEP</h1>
            <p className="text-sm text-gray-500">Stakeholder Engagement Plan</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            {t("add")}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STAKEHOLDERS.map((s) => (
            <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 flex items-start justify-between">
                <div className="rounded-lg bg-brand/10 p-2">
                  <Users className="h-5 w-5 text-brand" />
                </div>
                <StatusBadge status={s.priority} label={t(s.priority)} />
              </div>
              <h3 className="font-semibold text-gray-900">{s.nameKa}</h3>
              <p className="text-xs text-gray-400">{s.nameEn}</p>
              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p><span className="text-gray-400">{t("category")}:</span> {s.categoryKa}</p>
                <p><span className="text-gray-400">Engagement:</span> {s.engagementKa}</p>
                <p><span className="text-gray-400">{t("date")}:</span> {s.lastContact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
