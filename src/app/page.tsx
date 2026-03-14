import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  CheckCircle2,
} from "lucide-react";

export default async function HomePage() {
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const modules = [
    { title: "ISO 14001:2015", desc: t("feature1Desc"), href: "/iso14001", tags: ["EMS", "Certification"] },
    { title: "ESMP", desc: "Environmental & Social Management Plan — KPI monitoring", href: "/esmp", tags: ["Management", "KPI"] },
    { title: "EIA Database", desc: t("feature2Desc"), href: "/activities", tags: ["Class I", "Class II"] },
    { title: "Compliance", desc: t("feature3Desc"), href: "/monitoring", tags: ["Permits", "Deadlines"] },
  ];

  const stats = [
    { value: "50+", labelKa: "EIA საქმიანობა", labelEn: "EIA Activities" },
    { value: "100+", labelKa: "კომპანია", labelEn: "Companies" },
    { value: "7", labelKa: "მოდული", labelEn: "Modules" },
    { value: "2", labelKa: "ენა", labelEn: "Languages" },
  ];

  const news = [
    { titleKa: "ISO 14001 სერტიფიკაციის გზამკვლევი MSMEs-ებისთვის", titleEn: "ISO 14001 Certification Guide for MSMEs", date: "2025-03-10", tag: "Guide" },
    { titleKa: "გარემოსდაცვითი შეფასების კოდექსის ცვლილებები 2025", titleEn: "Environmental Assessment Code Changes 2025", date: "2025-02-28", tag: "Legal" },
    { titleKa: "კომპლაიანს მონიტორინგის ახალი მოდული", titleEn: "New Compliance Monitoring Module", date: "2025-02-15", tag: "Product" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* ───── NAV ───── */}
      <nav className="relative z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1A3C2A] text-xs font-bold text-white">
              G
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-[#1A3C2A]">
              green<span className="font-normal opacity-70">.comply</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 text-[13px] font-medium text-[#1A3C2A]/70 md:flex">
            <Link href="/dashboard" className="transition hover:text-[#1A3C2A]">Platform</Link>
            <Link href="/iso14001" className="transition hover:text-[#1A3C2A]">ISO 14001</Link>
            <Link href="/activities" className="transition hover:text-[#1A3C2A]">EIA Database</Link>
            <Link href="/monitoring" className="transition hover:text-[#1A3C2A]">Monitoring</Link>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-full bg-[#1A3C2A] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-[#1A3C2A]/90"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            {tc("getStarted")}
          </Link>
        </div>
      </nav>

      {/* ───── HERO ───── */}
      <section className="relative overflow-hidden bg-[#1A3C2A] pb-16 pt-12 lg:pt-20 lg:pb-24">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 lg:text-lg">
              {t("heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#1A3C2A] transition hover:bg-white/90"
              >
                {tc("getStarted")}
              </Link>
              <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:bg-white/10">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-12 flex max-w-xl items-start gap-3 lg:ml-auto lg:mt-0 lg:-translate-y-20">
            <p className="text-sm leading-relaxed text-white/50">
              ISO 14001, ESMP, EIA, SEP — საქართველოს მცირე და საშუალო საწარმოებისთვის შექმნილი გარემოსდაცვითი კომპლაიანსის ციფრული პლატფორმა.
            </p>
          </div>
        </div>
      </section>

      {/* ───── FEATURED MODULES ───── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex items-center gap-3">
            <Shield className="h-4 w-4 text-[#1A3C2A]/40" />
            <span className="text-[13px] font-medium tracking-wide text-[#1A3C2A]/50">Featured</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m, i) => (
              <Link
                key={i}
                href={m.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#1A3C2A] p-6 transition-transform hover:-translate-y-1"
                style={{ minHeight: 260 }}
              >
                <div className="flex flex-wrap gap-1.5">
                  {m.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-medium text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <h3 className="text-lg font-bold text-white">{m.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/50">
                    {m.desc}
                  </p>
                </div>

                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/30 opacity-0 transition group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 text-[13px] text-[#1A3C2A]/50">
            <span>Show all</span>
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1A3C2A]/15 transition hover:bg-[#1A3C2A]/5">
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-4 inline-flex rounded-full border border-[#1A3C2A]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-[#1A3C2A]/50">
            By the numbers
          </div>
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-[#1A3C2A]">
              გარემოსდაცვითი კომპლაიანსის{" "}
              <span className="text-[#1A3C2A]/40">
                სრული ციფრული პლატფორმა საქართველოს MSMEs-ებისთვის
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#1A3C2A]/50 lg:text-lg">
              As a testament to our shared dedication, the results speak volumes.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="rounded-2xl bg-[#1A3C2A] px-6 py-8 text-center">
                <div className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-white/50">{s.labelKa}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── NEWS + CTA ───── */}
      <section className="border-t border-[#1A3C2A]/10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1A3C2A] lg:text-4xl">
                {t("ctaTitle")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#1A3C2A]/50">
                {t("ctaSubtitle")}
              </p>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1A3C2A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1A3C2A]/90"
              >
                {tc("getStarted")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              <div className="mt-10 flex items-center gap-6 text-sm text-[#1A3C2A]/40">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  {t("freeForever")}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  {t("trustedBy")}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {news.map((n, i) => (
                <div
                  key={i}
                  className="group flex items-start justify-between rounded-xl border border-[#1A3C2A]/8 bg-white p-5 transition hover:shadow-sm"
                >
                  <div className="flex-1">
                    <span className="mb-2 inline-block rounded-full border border-[#1A3C2A]/10 px-2 py-0.5 text-[11px] font-medium text-[#1A3C2A]/50">
                      {n.tag}
                    </span>
                    <h3 className="text-sm font-semibold text-[#1A3C2A]">
                      {n.titleKa}
                    </h3>
                    <p className="mt-1 text-xs text-[#1A3C2A]/40">{n.date}</p>
                  </div>
                  <div className="ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#1A3C2A]/10 text-[#1A3C2A]/30 transition group-hover:bg-[#1A3C2A]/5 group-hover:text-[#1A3C2A]/60">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="border-t border-[#1A3C2A]/10 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1A3C2A] text-[10px] font-bold text-white">G</div>
                <span className="text-sm font-semibold text-[#1A3C2A]">green<span className="font-normal opacity-70">.comply</span></span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#1A3C2A]/40">
                {tc("tagline")}
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1A3C2A]/50">Discover</h4>
              <div className="space-y-2 text-[13px] text-[#1A3C2A]/50">
                <Link href="/dashboard" className="block hover:text-[#1A3C2A]">Platform</Link>
                <Link href="/iso14001" className="block hover:text-[#1A3C2A]">ISO 14001</Link>
                <Link href="/activities" className="block hover:text-[#1A3C2A]">EIA Database</Link>
                <Link href="/monitoring" className="block hover:text-[#1A3C2A]">Monitoring</Link>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1A3C2A]/50">Modules</h4>
              <div className="space-y-2 text-[13px] text-[#1A3C2A]/50">
                <Link href="/esmp" className="block hover:text-[#1A3C2A]">ESMP</Link>
                <Link href="/sep" className="block hover:text-[#1A3C2A]">SEP</Link>
                <Link href="/legal" className="block hover:text-[#1A3C2A]">Legal</Link>
                <Link href="/audit" className="block hover:text-[#1A3C2A]">Audit</Link>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#1A3C2A]/50">Info</h4>
              <div className="space-y-2 text-[13px] text-[#1A3C2A]/50">
                <a href="#" className="block hover:text-[#1A3C2A]">Privacy Policy</a>
                <a href="#" className="block hover:text-[#1A3C2A]">Terms of Use</a>
                <a href="#" className="block hover:text-[#1A3C2A]">Contact</a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-[#1A3C2A]/8 pt-6 text-xs text-[#1A3C2A]/30">
            &copy; 2025 GreenComply. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
