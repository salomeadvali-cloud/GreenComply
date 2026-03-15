'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';

interface Permit {
  region: string;
  project_type: string;
  permit_type: string;
  year: string;
  activity_type: string;
  company: string;
  project: string;
}

const COLORS = ['#16a34a', '#2563eb', '#d97706', '#9333ea', '#ef4444', '#0891b2', '#84cc16'];

const OFFICIAL_REGIONS = [
  'თბილისი','კახეთი','შიდა ქართლი','ქვემო ქართლი','სამცხე-ჯავახეთი',
  'აჭარა','გურია','სამეგრელო-ზემო სვანეთი','იმერეთი',
  'რაჭა-ლეჩხუმი და ქვემო სვანეთი','მცხეთა-მთიანეთი',
];

const pct = (p: number | undefined) => p != null ? `${Math.round(p * 100)}%` : '';

export default function AnalyticsPage() {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [regionFilter, setRegionFilter] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState('');
  const [projectTypeFilter, setProjectTypeFilter] = useState('');

  useEffect(() => {
    fetch('/data/permits.json').then(r => r.json()).then(setPermits);
  }, []);

  const activityTypes = useMemo(() => {
    const set = new Set(permits.map(p => p.activity_type).filter(Boolean));
    return Array.from(set).sort();
  }, [permits]);

  const projectTypes = useMemo(() => {
    const set = new Set(permits.map(p => p.project_type).filter(Boolean));
    return Array.from(set).sort();
  }, [permits]);

  const filtered = useMemo(() => permits.filter(p => {
    if (regionFilter && p.region !== regionFilter) return false;
    if (activityTypeFilter && p.activity_type !== activityTypeFilter) return false;
    if (projectTypeFilter && p.project_type !== projectTypeFilter) return false;
    return true;
  }), [permits, regionFilter, activityTypeFilter, projectTypeFilter]);

  const byRegion = useMemo(() => {
    const counts: Record<string, number> = {};
    OFFICIAL_REGIONS.forEach(r => counts[r] = 0);
    filtered.forEach(p => { if (p.region && counts[p.region] !== undefined) counts[p.region]++; });
    return OFFICIAL_REGIONS
      .map(r => ({
        name: r.replace('სამეგრელო-ზემო სვანეთი','სამეგრელო')
                .replace('რაჭა-ლეჩხუმი და ქვემო სვანეთი','რაჭა')
                .replace('სამცხე-ჯავახეთი','სამცხე-ჯავ.')
                .replace('მცხეთა-მთიანეთი','მცხეთა-მთ.'),
        full: r, count: counts[r]
      }))
      .sort((a, b) => b.count - a.count);
  }, [filtered]);

  const byType = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach(p => { if (p.project_type) counts[p.project_type] = (counts[p.project_type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [filtered]);

  const byProcedure = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach(p => { if (p.permit_type) counts[p.permit_type] = (counts[p.permit_type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  const byYear = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach(p => {
      if (p.year && /^(19|20)\d{2}$/.test(p.year)) {
        counts[p.year] = (counts[p.year] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([year, count]) => ({ year, count })).sort((a, b) => Number(a.year) - Number(b.year));
  }, [filtered]);

  const byActivityType = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach(p => { if (p.activity_type) counts[p.activity_type] = (counts[p.activity_type] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 15);
  }, [filtered]);

  const topCompanies = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach(p => { if (p.company) counts[p.company] = (counts[p.company] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name: name.length > 35 ? name.slice(0, 35) + '...' : name, value })).sort((a, b) => b.value - a.value).slice(0, 10);
  }, [filtered]);

  const total = permits.length;
  const filteredCount = filtered.length;
  const hasFilter = regionFilter || activityTypeFilter || projectTypeFilter;
  const clearFilters = () => { setRegionFilter(''); setActivityTypeFilter(''); setProjectTypeFilter(''); };

  return (
    <div className="p-6 space-y-6">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600&display=swap'); * { font-family: 'Noto Sans Georgian', sans-serif; }`}</style>

      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">ანალიტიკა</h1>
        <p className="text-gray-400 text-sm">გარემოსდაცვითი გადაწყვეტილებების სტატისტიკა</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <p className="text-sm font-semibold text-gray-600 mb-3">გაფილტრე</p>
        <div className="flex flex-wrap gap-3">
          <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">ყველა რეგიონი</option>
            {OFFICIAL_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={activityTypeFilter} onChange={e => setActivityTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">საქმიანობის სახე</option>
            {activityTypes.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={projectTypeFilter} onChange={e => setProjectTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">ყველა სექტორი</option>
            {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {hasFilter && (
            <button onClick={clearFilters} className="px-3 py-2 text-sm text-gray-500 hover:text-red-500 border border-gray-300 rounded-lg">
              X გასუფთავება
            </button>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-gray-500">ნაჩვენებია:</span>
          <span className="text-sm font-semibold text-green-700">{filteredCount.toLocaleString()}</span>
          <span className="text-sm text-gray-400">/ {total.toLocaleString()} ჩანაწერი</span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'მოძებნილი', value: filteredCount, color: 'text-gray-800' },
          { label: 'რეგიონები', value: byRegion.filter(r => r.count > 0).length, color: 'text-green-600' },
          { label: 'წლები', value: byYear.length, color: 'text-blue-600' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Year line */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">წლების მიხედვით</h2>
        {byYear.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={byYear}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [v, 'ნებართვა']} />
              <Line type="monotone" dataKey="count" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : <p className="text-gray-400 text-sm text-center py-8">მონაცემი არ მოიძებნა</p>}
      </div>

      {/* Region bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">რეგიონების მიხედვით</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={byRegion} margin={{ top: 5, right: 20, left: 0, bottom: 65 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v) => [v, 'ნებართვა']} labelFormatter={(l) => byRegion.find(r => r.name === l)?.full || l} />
            <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Sector pie */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">სექტორების განაწილება</h2>
          {byType.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={byType} cx="45%" cy="50%" outerRadius={85} dataKey="value" label={({ percent }) => pct(percent)} labelLine={false}>
                    {byType.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2">
                {byType.map((t, i) => (
                  <div key={t.name} className="flex items-center gap-1 text-xs text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                    {t.name} ({t.value})
                  </div>
                ))}
              </div>
            </>
          ) : <p className="text-gray-400 text-sm text-center py-8">მონაცემი არ მოიძებნა</p>}
        </div>

        {/* Procedure pie */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">პროცედურების განაწილება</h2>
          {byProcedure.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={byProcedure} cx="45%" cy="50%" outerRadius={85} dataKey="value" label={({ percent }) => pct(percent)} labelLine={false}>
                    {byProcedure.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2">
                {byProcedure.map((t, i) => (
                  <div key={t.name} className="flex items-center gap-1 text-xs text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                    {t.name} ({t.value})
                  </div>
                ))}
              </div>
            </>
          ) : <p className="text-gray-400 text-sm text-center py-8">მონაცემი არ მოიძებნა</p>}
        </div>
      </div>
      {/* Activity type bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">საქმიანობის სახე — Top 15</h2>
        {byActivityType.length > 0 ? (
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={byActivityType} layout="vertical" margin={{ top: 0, right: 30, left: 220, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={220} />
              <Tooltip formatter={(v) => [v, 'ნებართვა']} />
              <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <p className="text-gray-400 text-sm text-center py-8">მონაცემი არ მოიძებნა</p>}
      </div>

      {/* Top companies */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Top 10 კომპანია</h2>
        {topCompanies.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topCompanies} layout="vertical" margin={{ top: 0, right: 30, left: 240, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={240} />
              <Tooltip formatter={(v) => [v, 'ნებართვა']} />
              <Bar dataKey="value" fill="#9333ea" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <p className="text-gray-400 text-sm text-center py-8">მონაცემი არ მოიძებნა</p>}
      </div>

    </div>
  );
}
