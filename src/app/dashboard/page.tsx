"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import {
  ShieldCheck,
  FileCheck,
  CalendarCheck,
  AlertTriangle,
  BarChart3,
  FileText,
  Layers,
  Bell,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusBadge from "@/components/ui/StatusBadge";

const ComplianceMap = dynamic(() => import("@/components/ui/ComplianceMap"), { ssr: false });

const RECENT_ACTIVITIES = [
  { id: 1, textKa: "ISO 14001 Gap Analysis დასრულდა", textEn: "ISO 14001 Gap Analysis completed", time: "2 სთ", icon: FileCheck, status: "completed" },
  { id: 2, textKa: "ESMP დოკუმენტი განახლდა", textEn: "ESMP document updated", time: "5 სთ", icon: FileText, status: "completed" },
  { id: 3, textKa: "ჰაერის ხარისხის ანგარიში — ვადა 7 დღე", textEn: "Air quality report — deadline 7 days", time: "1 დღე", icon: AlertTriangle, status: "pending" },
  { id: 4, textKa: "წყლის ნებართვის განახლება — ვადაგადაცილებული", textEn: "Water permit renewal — overdue", time: "3 დღე", icon: Bell, status: "overdue" },
];

const UPCOMING = [
  { id: 1, titleKa: "ჰაერის ემისიების ანგარიში", titleEn: "Air Emissions Report", date: "2025-04-15", priority: "high" },
  { id: 2, titleKa: "ნარჩენების მართვის გეგმის განახლება", titleEn: "Waste Management Plan Update", date: "2025-04-22", priority: "medium" },
  { id: 3, titleKa: "წყლის ხარისხის მონიტორინგი", titleEn: "Water Quality Monitoring", date: "2025-05-01", priority: "high" },
  { id: 4, titleKa: "ხმაურის დონის გაზომვა", titleEn: "Noise Level Measurement", date: "2025-05-10", priority: "low" },
];

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const tc = useTranslations("common");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-sm text-gray-500">{t("welcome")}, GreenComply</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("complianceScore")}
          value="73%"
          icon={ShieldCheck}
          color="text-primary"
          trend={{ value: 5, positive: true }}
        />
        <StatCard
          title={t("tasksCompleted")}
          value="24/38"
          icon={CheckCircle2}
          color="text-success"
        />
        <StatCard
          title={t("upcomingDeadlines")}
          value="6"
          icon={CalendarCheck}
          color="text-warning"
        />
        <StatCard
          title={t("documentsGenerated")}
          value="12"
          icon={FileText}
          color="text-brand"
        />
      </div>

      {/* Module Compliance */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">{t("activeModules")}</h2>
          <div className="space-y-4">
            <ProgressBar value={85} label="ISO 14001:2015" color="bg-primary" />
            <ProgressBar value={60} label="ESMP" color="bg-brand" />
            <ProgressBar value={45} label="SEP" color="bg-primary-light" />
            <ProgressBar value={70} label={tc("completed")} color="bg-warning" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">{t("quickActions")}</h2>
          <div className="space-y-2">
            {[
              { label: t("generateReport"), icon: BarChart3, href: "/reports" },
              { label: t("newAssessment"), icon: Layers, href: "/iso14001" },
              { label: t("viewCalendar"), icon: CalendarCheck, href: "/monitoring" },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <span className="flex items-center gap-2">
                  <action.icon className="h-4 w-4 text-gray-400" />
                  {action.label}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-300" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Upcoming */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">{t("recentActivity")}</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITIES.map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50">
                <div className={`mt-0.5 rounded-lg p-2 ${
                  a.status === "overdue" ? "bg-red-50 text-red-500" :
                  a.status === "pending" ? "bg-yellow-50 text-yellow-600" :
                  "bg-green-50 text-green-600"
                }`}>
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{a.textKa}</p>
                  <p className="text-xs text-gray-400">{a.time}</p>
                </div>
                <StatusBadge status={a.status} label={tc(a.status)} />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">{t("upcomingDeadlines")}</h2>
          <div className="space-y-3">
            {UPCOMING.map((d) => (
              <div key={d.id} className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{d.titleKa}</p>
                    <p className="text-xs text-gray-400">{d.date}</p>
                  </div>
                </div>
                <StatusBadge status={d.priority} label={tc(d.priority)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Map */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">🗺️ კომპანიების რუკა</h2>
        <ComplianceMap />
      </div>

      {/* Alerts */}
      <div className="rounded-xl border border-red-100 bg-red-50 p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <div>
            <p className="text-sm font-semibold text-red-800">{t("alerts")}</p>
            <p className="text-sm text-red-600">
              3 ვალდებულების ვადა იწურება მომავალ კვირაში
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
