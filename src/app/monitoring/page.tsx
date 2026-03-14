"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Download,
  Upload,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import StatCard from "@/components/ui/StatCard";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusBadge from "@/components/ui/StatusBadge";

const OBLIGATIONS = [
  { id: 1, titleKa: "ჰაერის ემისიების მონიტორინგი", titleEn: "Air Emissions Monitoring", deadline: "2025-04-15", status: "pending", responsible: "ნ. გელაშვილი", priority: "high" },
  { id: 2, titleKa: "ჩამდინარე წყლების ანალიზი", titleEn: "Wastewater Analysis", deadline: "2025-04-20", status: "pending", responsible: "მ. კვარაცხელია", priority: "high" },
  { id: 3, titleKa: "ხმაურის დონის გაზომვა", titleEn: "Noise Level Measurement", deadline: "2025-04-30", status: "pending", responsible: "გ. ჯავახიშვილი", priority: "medium" },
  { id: 4, titleKa: "ნარჩენების ინვენტარიზაცია", titleEn: "Waste Inventory", deadline: "2025-03-31", status: "overdue", responsible: "ნ. გელაშვილი", priority: "high" },
  { id: 5, titleKa: "მწვანე საფარის აღდგენა", titleEn: "Green Cover Restoration", deadline: "2025-05-15", status: "pending", responsible: "ა. წიკლაური", priority: "medium" },
  { id: 6, titleKa: "ნიადაგის ხარისხის ანალიზი", titleEn: "Soil Quality Analysis", deadline: "2025-03-10", status: "completed", responsible: "მ. კვარაცხელია", priority: "low" },
  { id: 7, titleKa: "გარემოზე ზემოქმედების ყოველწლიური ანგარიში", titleEn: "Annual Environmental Impact Report", deadline: "2025-03-01", status: "completed", responsible: "ნ. გელაშვილი", priority: "high" },
  { id: 8, titleKa: "საგანგებო გეგმის განახლება", titleEn: "Emergency Plan Update", deadline: "2025-06-01", status: "pending", responsible: "გ. ჯავახიშვილი", priority: "low" },
];

const CONSEQUENCES = [
  { conditionKa: "ჰაერის ემისიების ლიმიტის გადაჭარბება", conditionEn: "Exceeding air emission limits", consequenceKa: "ჯარიმა 5,000 - 20,000 ლარი", consequenceEn: "Fine 5,000 - 20,000 GEL", riskLevel: "high", lawRef: "მუხლი 34" },
  { conditionKa: "მონიტორინგის ანგარიშის წარუდგენლობა", conditionEn: "Failure to submit monitoring report", consequenceKa: "ჯარიმა 2,000 - 10,000 ლარი", consequenceEn: "Fine 2,000 - 10,000 GEL", riskLevel: "medium", lawRef: "მუხლი 52" },
  { conditionKa: "ნებართვის პირობების სისტემატური დარღვევა", conditionEn: "Systematic violation of permit conditions", consequenceKa: "ლიცენზიის გაუქმება", consequenceEn: "License Revocation", riskLevel: "high", lawRef: "მუხლი 41" },
  { conditionKa: "ნარჩენების არასანქცირებული განთავსება", conditionEn: "Unauthorized waste disposal", consequenceKa: "ჯარიმა 10,000 - 50,000 ლარი", consequenceEn: "Fine 10,000 - 50,000 GEL", riskLevel: "high", lawRef: "მუხლი 29" },
];

const TABS = ["dashboard", "calendar", "deadlines", "consequences"] as const;

export default function MonitoringPage() {
  const t = useTranslations("monitoring");
  const tc = useTranslations("common");
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("dashboard");

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

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-px">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t(tab)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard title={t("totalObligations")} value={OBLIGATIONS.length} icon={ShieldCheck} color="text-brand" />
              <StatCard title={t("completedObligations")} value={completed} icon={CheckCircle2} color="text-success" />
              <StatCard title={t("pendingObligations")} value={pending} icon={Clock} color="text-warning" />
              <StatCard title={t("overdueObligations")} value={overdue} icon={AlertTriangle} color="text-danger" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">{t("complianceRate")}</h3>
                <div className="flex items-center gap-6">
                  <div className="relative flex h-32 w-32 items-center justify-center">
                    <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#1A5C38" strokeWidth="10"
                        strokeDasharray={`${(completed / OBLIGATIONS.length) * 314} 314`}
                        strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-gray-900">
                      {Math.round((completed / OBLIGATIONS.length) * 100)}%
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>{t("completedObligations")}: {completed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span>{t("pendingObligations")}: {pending}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span>{t("overdueObligations")}: {overdue}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">{t("riskLevel")}</h3>
                <div className="space-y-4">
                  <ProgressBar value={overdue} max={OBLIGATIONS.length} label={tc("high")} color="bg-red-500" />
                  <ProgressBar value={pending} max={OBLIGATIONS.length} label={tc("medium")} color="bg-yellow-500" />
                  <ProgressBar value={completed} max={OBLIGATIONS.length} label={tc("low")} color="bg-green-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === "calendar" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{t("calendar")}</h3>
              <div className="flex items-center gap-2">
                <button className="rounded-lg p-1.5 hover:bg-gray-100"><ChevronLeft className="h-4 w-4" /></button>
                <span className="text-sm font-medium">2025 - აპრილი</span>
                <button className="rounded-lg p-1.5 hover:bg-gray-100"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-px rounded-lg border border-gray-200 bg-gray-200">
              {["ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვ"].map((d) => (
                <div key={d} className="bg-gray-50 px-2 py-2 text-center text-xs font-medium text-gray-500">{d}</div>
              ))}
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const hasDeadline = [15, 20, 30].includes(day);
                const isOverdue = day <= 14 && day === 1;
                return (
                  <div key={day} className={`min-h-[80px] bg-white p-2 ${hasDeadline ? "bg-yellow-50" : ""}`}>
                    <span className={`text-xs ${hasDeadline ? "font-bold text-warning" : "text-gray-600"}`}>{day}</span>
                    {day === 15 && <div className="mt-1 rounded bg-red-100 px-1 py-0.5 text-[10px] text-red-700">ჰაერი</div>}
                    {day === 20 && <div className="mt-1 rounded bg-blue-100 px-1 py-0.5 text-[10px] text-blue-700">წყალი</div>}
                    {day === 30 && <div className="mt-1 rounded bg-yellow-100 px-1 py-0.5 text-[10px] text-yellow-700">ხმაური</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Deadlines Tab */}
        {activeTab === "deadlines" && (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">{t("deadlines")}</h3>
              <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                <Download className="h-4 w-4" />
                PDF
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3">{tc("name")}</th>
                    <th className="px-6 py-3">{tc("date")}</th>
                    <th className="px-6 py-3">{tc("status")}</th>
                    <th className="px-6 py-3">{tc("priority")}</th>
                    <th className="px-6 py-3">Responsible</th>
                    <th className="px-6 py-3">{tc("actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {OBLIGATIONS.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 font-medium text-gray-800">{o.titleKa}</td>
                      <td className="px-6 py-3 text-gray-600">{o.deadline}</td>
                      <td className="px-6 py-3">
                        <StatusBadge status={o.status} label={tc(o.status)} />
                      </td>
                      <td className="px-6 py-3">
                        <StatusBadge status={o.priority} label={tc(o.priority)} />
                      </td>
                      <td className="px-6 py-3">
                        <span className="flex items-center gap-1 text-gray-600">
                          <User className="h-3 w-3" />{o.responsible}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {o.status !== "completed" && (
                          <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50">
                            <Upload className="h-3 w-3" />
                            Upload
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Consequences Tab */}
        {activeTab === "consequences" && (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">{t("consequences")}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {CONSEQUENCES.map((c, i) => (
                <div key={i} className="flex items-start gap-4 px-6 py-4">
                  <AlertTriangle className={`mt-0.5 h-5 w-5 ${c.riskLevel === "high" ? "text-red-500" : "text-yellow-500"}`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{c.conditionKa}</p>
                    <p className="mt-1 text-sm text-gray-500">{c.conditionEn}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="rounded-lg bg-red-50 px-2 py-1 text-xs font-medium text-red-700">{c.consequenceKa}</span>
                      <span className="text-xs text-gray-400">{c.lawRef}</span>
                    </div>
                  </div>
                  <StatusBadge status={c.riskLevel} label={tc(c.riskLevel)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
