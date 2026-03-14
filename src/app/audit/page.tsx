"use client";

import { useTranslations } from "next-intl";
import { Search, FileCheck, ClipboardCheck, AlertCircle, CheckCircle2, Plus, Download } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import StatusBadge from "@/components/ui/StatusBadge";
import ProgressBar from "@/components/ui/ProgressBar";

const CHECKLIST = [
  { clause: "4.1", titleKa: "ორგანიზაციისა და მისი კონტექსტის გაგება", titleEn: "Understanding the organization and its context", status: "completed" },
  { clause: "4.2", titleKa: "დაინტერესებული მხარეების საჭიროებები", titleEn: "Needs of interested parties", status: "completed" },
  { clause: "5.1", titleKa: "ლიდერობა და ვალდებულება", titleEn: "Leadership and commitment", status: "completed" },
  { clause: "5.2", titleKa: "გარემოსდაცვითი პოლიტიკა", titleEn: "Environmental policy", status: "pending" },
  { clause: "6.1", titleKa: "რისკებისა და შესაძლებლობების განხილვა", titleEn: "Actions to address risks and opportunities", status: "pending" },
  { clause: "6.2", titleKa: "გარემოსდაცვითი მიზნები", titleEn: "Environmental objectives", status: "pending" },
  { clause: "7.2", titleKa: "კომპეტენცია", titleEn: "Competence", status: "overdue" },
  { clause: "8.1", titleKa: "საოპერაციო დაგეგმვა და კონტროლი", titleEn: "Operational planning and control", status: "pending" },
  { clause: "9.1", titleKa: "მონიტორინგი და გაზომვა", titleEn: "Monitoring and measurement", status: "pending" },
  { clause: "10.2", titleKa: "მუდმივი გაუმჯობესება", titleEn: "Continual improvement", status: "pending" },
];

const FINDINGS = [
  { id: 1, titleKa: "გარემოსდაცვითი პოლიტიკა არ არის განახლებული", titleEn: "Environmental policy not updated", type: "nonConformity", clause: "5.2", status: "pending" },
  { id: 2, titleKa: "ტრენინგის ჩანაწერები არასრულია", titleEn: "Training records incomplete", type: "nonConformity", clause: "7.2", status: "overdue" },
  { id: 3, titleKa: "მონიტორინგის სიხშირე გაზრდილი უნდა იყოს", titleEn: "Monitoring frequency should be increased", type: "observation", clause: "9.1", status: "pending" },
];

export default function AuditPage() {
  const t = useTranslations("iso");
  const tc = useTranslations("common");

  const completed = CHECKLIST.filter((c) => c.status === "completed").length;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Internal Audit</h1>
            <p className="text-sm text-gray-500">ISO 19011 / ISO 14001:2015</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" /> PDF
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
              <Plus className="h-4 w-4" /> New Audit
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Audit Progress</h2>
          <ProgressBar value={completed} max={CHECKLIST.length} label={`${completed}/${CHECKLIST.length} clauses`} color="bg-primary" />
        </div>

        {/* Checklist */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Audit Checklist</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {CHECKLIST.map((item) => (
              <div key={item.clause} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  {item.status === "completed" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : item.status === "overdue" ? (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                  )}
                  <div>
                    <span className="text-sm font-medium text-gray-800">{item.clause} — {item.titleKa}</span>
                    <p className="text-xs text-gray-400">{item.titleEn}</p>
                  </div>
                </div>
                <StatusBadge status={item.status} label={tc(item.status)} />
              </div>
            ))}
          </div>
        </div>

        {/* Findings */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Findings</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {FINDINGS.map((f) => (
              <div key={f.id} className="flex items-start gap-3 px-6 py-4">
                <AlertCircle className={`mt-0.5 h-5 w-5 ${f.type === "nonConformity" ? "text-red-500" : "text-yellow-500"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{f.titleKa}</p>
                  <p className="text-xs text-gray-400">{f.titleEn}</p>
                  <div className="mt-1 flex gap-2">
                    <span className="text-xs text-gray-400">{t("clause")} {f.clause}</span>
                    <StatusBadge status={f.status} label={tc(f.status)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
