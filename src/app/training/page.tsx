"use client";

import { useTranslations } from "next-intl";
import { GraduationCap, Play, Clock, Award } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ProgressBar from "@/components/ui/ProgressBar";

const COURSES = [
  { id: 1, titleKa: "ISO 14001:2015 საფუძვლები", titleEn: "ISO 14001:2015 Fundamentals", duration: "2 სთ", lessons: 8, progress: 75, category: "ISO" },
  { id: 2, titleKa: "გარემოსდაცვითი ასპექტების იდენტიფიკაცია", titleEn: "Environmental Aspects Identification", duration: "1.5 სთ", lessons: 6, progress: 40, category: "ISO" },
  { id: 3, titleKa: "ESMP შედგენა და მართვა", titleEn: "ESMP Development & Management", duration: "3 სთ", lessons: 12, progress: 0, category: "ESMP" },
  { id: 4, titleKa: "შიდა აუდიტის ჩატარება", titleEn: "Conducting Internal Audits", duration: "2.5 სთ", lessons: 10, progress: 100, category: "Audit" },
  { id: 5, titleKa: "საქართველოს გარემოსდაცვითი კანონმდებლობა", titleEn: "Georgian Environmental Legislation", duration: "2 სთ", lessons: 8, progress: 20, category: "Legal" },
  { id: 6, titleKa: "EIA პროცესი და სკრინინგი", titleEn: "EIA Process and Screening", duration: "1.5 სთ", lessons: 6, progress: 0, category: "EIA" },
];

export default function TrainingPage() {
  const t = useTranslations("common");

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training</h1>
          <p className="text-sm text-gray-500">Online courses & certification</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
            <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 flex items-start justify-between">
                <div className="rounded-lg bg-primary/10 p-2">
                  {c.progress === 100 ? (
                    <Award className="h-5 w-5 text-primary" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-primary" />
                  )}
                </div>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{c.category}</span>
              </div>
              <h3 className="font-medium text-gray-900">{c.titleKa}</h3>
              <p className="text-xs text-gray-400">{c.titleEn}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{c.duration}</span>
                <span>{c.lessons} lessons</span>
              </div>
              <div className="mt-3">
                <ProgressBar value={c.progress} color={c.progress === 100 ? "bg-green-500" : "bg-primary"} />
              </div>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Play className="h-4 w-4" />
                {c.progress === 100 ? "Review" : c.progress > 0 ? "Continue" : "Start"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
