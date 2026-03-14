"use client";

import { useTranslations } from "next-intl";
import { Settings, Building2, Globe, Users, Bell } from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function SettingsPage() {
  const t = useTranslations("common");

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">{t("appName")} configuration</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Company Profile */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Building2 className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">Company Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" defaultValue="GreenTech Solutions LLC" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none">
                  <option>Manufacturing</option>
                  <option>Energy</option>
                  <option>Construction</option>
                  <option>Mining</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employees</label>
                <select className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none">
                  <option>1-50</option>
                  <option>50-250</option>
                  <option>250+</option>
                </select>
              </div>
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                {t("save")}
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">{t("language")}</h2>
            </div>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-primary bg-primary/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🇬🇪</span>
                  <span className="font-medium text-gray-900">{t("georgian")}</span>
                </div>
                <input type="radio" name="lang" defaultChecked className="text-primary" />
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🇬🇧</span>
                  <span className="font-medium text-gray-900">{t("english")}</span>
                </div>
                <input type="radio" name="lang" className="text-primary" />
              </label>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Email reminders — 30, 14, 7, 1 days before deadline", defaultChecked: true },
                { label: "Overdue obligation alerts", defaultChecked: true },
                { label: "Document update reminders", defaultChecked: true },
                { label: "Weekly compliance digest", defaultChecked: false },
              ].map((n, i) => (
                <label key={i} className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
                  <span className="text-sm text-gray-700">{n.label}</span>
                  <input type="checkbox" defaultChecked={n.defaultChecked} className="rounded text-primary" />
                </label>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: "ნ. გელაშვილი", role: "Admin", email: "n.gelashvili@greentech.ge" },
                { name: "მ. კვარაცხელია", role: "Manager", email: "m.kvaratskhelia@greentech.ge" },
                { name: "გ. ჯავახიშვილი", role: "Viewer", email: "g.javakhishvili@greentech.ge" },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.email}</p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{m.role}</span>
                </div>
              ))}
              <button className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
                + Invite member
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
