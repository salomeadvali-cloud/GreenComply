"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  FileCheck,
  Target,
  Leaf,
  AlertTriangle,
  FolderOpen,
  ChevronRight,
  CheckCircle2,
  Circle,
  Download,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusBadge from "@/components/ui/StatusBadge";

const ISO_CLAUSES = [
  { id: "4", titleKa: "ორგანიზაციის კონტექსტი", titleEn: "Context of the Organization", progress: 90 },
  { id: "5", titleKa: "ლიდერობა", titleEn: "Leadership", progress: 80 },
  { id: "6", titleKa: "დაგეგმვა", titleEn: "Planning", progress: 65 },
  { id: "7", titleKa: "მხარდაჭერა", titleEn: "Support", progress: 70 },
  { id: "8", titleKa: "ოპერაციები", titleEn: "Operation", progress: 55 },
  { id: "9", titleKa: "შესრულების შეფასება", titleEn: "Performance Evaluation", progress: 40 },
  { id: "10", titleKa: "გაუმჯობესება", titleEn: "Improvement", progress: 30 },
];

const TABS = ["gapAnalysis", "policy", "objectives", "aspects", "risks", "documents"] as const;

const ASPECTS = [
  { id: 1, aspectKa: "ჰაერის ემისიები", aspectEn: "Air Emissions", impactKa: "ატმოსფეროს დაბინძურება", impactEn: "Atmospheric Pollution", significance: "high" },
  { id: 2, aspectKa: "ჩამდინარე წყლები", aspectEn: "Wastewater", impactKa: "წყლის რესურსების დაბინძურება", impactEn: "Water Resource Pollution", significance: "high" },
  { id: 3, aspectKa: "მყარი ნარჩენები", aspectEn: "Solid Waste", impactKa: "ნიადაგის დაბინძურება", impactEn: "Soil Contamination", significance: "medium" },
  { id: 4, aspectKa: "ენერგომოხმარება", aspectEn: "Energy Consumption", impactKa: "რესურსების გამოლევა", impactEn: "Resource Depletion", significance: "medium" },
  { id: 5, aspectKa: "ხმაური", aspectEn: "Noise", impactKa: "საზოგადოებაზე ზემოქმედება", impactEn: "Community Impact", significance: "low" },
];

export default function ISO14001Page() {
  const t = useTranslations("iso");
  const tc = useTranslations("common");
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("gapAnalysis");

  const tabLabels: Record<typeof TABS[number], string> = {
    gapAnalysis: t("gapAnalysis"),
    policy: t("policy"),
    objectives: t("objectives"),
    aspects: t("aspects"),
    risks: t("risks"),
    documents: t("documents"),
  };

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
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {/* Gap Analysis Tab */}
        {activeTab === "gapAnalysis" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{t("gapAnalysis")}</h2>
                <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                  <Download className="h-4 w-4" />
                  PDF
                </button>
              </div>
              <p className="mb-6 text-sm text-gray-500">{t("gapAnalysisDesc")}</p>
              <div className="space-y-4">
                {ISO_CLAUSES.map((clause) => (
                  <div key={clause.id} className="rounded-lg border border-gray-100 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-800">
                        {t("clause")} {clause.id}: {clause.titleKa}
                      </span>
                      <span className="text-xs text-gray-400">{clause.titleEn}</span>
                    </div>
                    <ProgressBar
                      value={clause.progress}
                      color={clause.progress >= 80 ? "bg-green-500" : clause.progress >= 50 ? "bg-yellow-500" : "bg-red-500"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Policy Tab */}
        {activeTab === "policy" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">{t("policyTemplate")}</h2>
            <div className="rounded-lg bg-gray-50 p-6">
              <div className="space-y-4 text-sm text-gray-700">
                <p className="font-medium text-gray-900">გარემოსდაცვითი პოლიტიკა</p>
                <p>ჩვენი ორგანიზაცია ვალდებულებას იღებს:</p>
                <ul className="ml-4 list-disc space-y-2">
                  <li>გარემოს დაცვა, დაბინძურების პრევენციის ჩათვლით</li>
                  <li>შესაბამისი სამართლებრივი და სხვა მოთხოვნების შესრულება</li>
                  <li>გარემოსდაცვითი მენეჯმენტის სისტემის მუდმივი გაუმჯობესება</li>
                </ul>
                <div className="mt-4 flex gap-3">
                  <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                    {tc("edit")}
                  </button>
                  <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Download className="mr-1 inline h-4 w-4" />
                    {tc("download")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Aspects Tab */}
        {activeTab === "aspects" && (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">{t("aspectsRegister")}</h2>
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                {tc("add")}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3">#</th>
                    <th className="px-6 py-3">{t("aspects")}</th>
                    <th className="px-6 py-3">Impact</th>
                    <th className="px-6 py-3">{tc("priority")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ASPECTS.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-400">{a.id}</td>
                      <td className="px-6 py-3 font-medium text-gray-800">{a.aspectKa}</td>
                      <td className="px-6 py-3 text-gray-600">{a.impactKa}</td>
                      <td className="px-6 py-3">
                        <StatusBadge status={a.significance} label={tc(a.significance)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Objectives Tab */}
        {activeTab === "objectives" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">{t("objectivesRegister")}</h2>
            <div className="space-y-4">
              {[
                { obj: "CO₂ ემისიების 20%-ით შემცირება", target: "2025 წლის ბოლისთვის", progress: 65 },
                { obj: "ნარჩენების რეციკლირების 50%-მდე გაზრდა", target: "2025 Q3", progress: 40 },
                { obj: "წყლის მოხმარების 15%-ით შემცირება", target: "2025 Q4", progress: 25 },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-gray-100 p-4">
                  <div className="mb-1 font-medium text-gray-800">{item.obj}</div>
                  <div className="mb-3 text-xs text-gray-400">{item.target}</div>
                  <ProgressBar value={item.progress} color="bg-primary" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risks Tab */}
        {activeTab === "risks" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">{t("risksRegister")}</h2>
            <div className="space-y-3">
              {[
                { risk: "ჰაერის დაბინძურების ნორმების გადაჭარბება", level: "high", opportunity: false },
                { risk: "ახალი გარემოსდაცვითი რეგულაციები", level: "medium", opportunity: false },
                { risk: "მწვანე ტექნოლოგიების დანერგვა", level: "high", opportunity: true },
                { risk: "ნარჩენების არასწორი მართვა", level: "high", opportunity: false },
                { risk: "ენერგოეფექტურობის გაუმჯობესება", level: "medium", opportunity: true },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
                  <div className="flex items-center gap-3">
                    {r.opportunity ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="text-sm font-medium text-gray-800">{r.risk}</span>
                  </div>
                  <StatusBadge status={r.level} label={tc(r.level)} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">{t("documents")}</h2>
            <div className="space-y-2">
              {[
                "გარემოსდაცვითი პოლიტიკა",
                "ასპექტებისა და ზემოქმედებების რეესტრი",
                "მიზნებისა და სამიზნე მაჩვენებლების რეესტრი",
                "რისკებისა და შესაძლებლობების რეესტრი",
                "საგანგებო სიტუაციებზე რეაგირების გეგმა",
                "მონიტორინგისა და გაზომვის პროცედურა",
                "შიდა აუდიტის პროცედურა",
                "მენეჯმენტის მიმოხილვის ოქმი",
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">{doc}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
