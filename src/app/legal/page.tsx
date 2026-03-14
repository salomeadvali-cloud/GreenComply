'use client';

import { useState, useEffect, useMemo } from 'react';

interface Permit {
  company: string;
  project: string;
  permit_type: string;
  year: string;
  municipality: string;
  region: string;
  address: string;
  activity: string;
}

const TYPE_COLORS: Record<string, string> = {
  'გარემოსდაცვითი გადაწყვეტილება': 'bg-green-100 text-green-800',
  'გარემოზე ზემოქმედების ნებართვა': 'bg-blue-100 text-blue-800',
  'სკოპინგი': 'bg-yellow-100 text-yellow-800',
  'ეკო-ექსპერტიზა': 'bg-gray-100 text-gray-700',
};

export default function LegalPage() {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 50;

  useEffect(() => {
    fetch('/data/permits.json').then(r => r.json()).then(setPermits);
  }, []);

  const years = useMemo(() => {
    const set = new Set(permits.map(p => p.year).filter(Boolean));
    return Array.from(set).sort().reverse();
  }, [permits]);

  const types = useMemo(() => {
    const set = new Set(permits.map(p => p.permit_type).filter(Boolean));
    return Array.from(set);
  }, [permits]);

  const regions = useMemo(() => {
    const set = new Set(permits.map(p => p.region).filter(Boolean));
    return Array.from(set).sort();
  }, [permits]);

  const activities = useMemo(() => {
    const set = new Set(permits.map(p => p.activity).filter(Boolean));
    return Array.from(set).sort();
  }, [permits]);

  const filtered = useMemo(() => {
    return permits.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !search ||
        p.company.toLowerCase().includes(q) ||
        p.project.toLowerCase().includes(q) ||
        p.municipality.toLowerCase().includes(q);
      const matchYear = !yearFilter || p.year === yearFilter;
      const matchType = !typeFilter || p.permit_type === typeFilter;
      const matchRegion = !regionFilter || p.region === regionFilter;
      const matchActivity = !activityFilter || p.activity === activityFilter;
      return matchSearch && matchYear && matchType && matchRegion && matchActivity;
    });
  }, [permits, search, yearFilter, typeFilter, regionFilter]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const clearFilters = () => { setSearch(''); setYearFilter(''); setTypeFilter(''); setRegionFilter(''); setActivityFilter(''); setPage(1); };

  return (
    <div className="p-6">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600&display=swap'); * { font-family: 'Noto Sans Georgian', sans-serif; }`}</style>

      <h1 className="text-2xl font-bold text-gray-800 mb-1">გაცემული გარემოსდაცვითი გადაწყვეტილებები</h1>
      <p className="text-gray-400 text-sm mb-6">სულ: {permits.length.toLocaleString()} · ნაჩვენებია: {filtered.length.toLocaleString()}</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="🔍 კომპანია, პროექტი, მუნიციპალიტეტი..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 min-w-60 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
        <select value={regionFilter} onChange={e => { setRegionFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ყველა რეგიონი</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={activityFilter} onChange={e => { setActivityFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ყველა საქმიანობა</option>
          {activities.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ყველა ტიპი</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={yearFilter} onChange={e => { setYearFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ყველა წელი</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        {(search || yearFilter || typeFilter || regionFilter || activityFilter) && (
          <button onClick={clearFilters} className="px-3 py-2 text-sm text-gray-500 hover:text-red-500 border border-gray-300 rounded-lg">
            ✕ გასუფთავება
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">კომპანია</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">პროექტი</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 w-36">მუნიციპალიტეტი</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 w-40">ნებართვის ტიპი</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 w-14">წელი</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-12 text-gray-400">ჩანაწერი ვერ მოიძებნა</td></tr>
            ) : paginated.map((p, i) => (
              <>
                <tr
                  key={i}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="border-b border-gray-100 hover:bg-green-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{p.company}</td>
                  <td className="px-4 py-3 text-gray-600">{p.project}</td>
                  <td className="px-4 py-3 text-gray-500">{p.municipality || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[p.permit_type] || 'bg-gray-100 text-gray-700'}`}>
                      {p.permit_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{p.year || '—'}</td>
                </tr>
                {expanded === i && (
                  <tr key={`exp-${i}`} className="bg-green-50 border-b border-green-100">
                    <td colSpan={5} className="px-6 py-3 text-sm text-gray-600">
                      <div className="grid grid-cols-2 gap-2">
                        {p.region && <div><span className="font-medium text-gray-700">რეგიონი: </span>{p.region}</div>}
                        {p.municipality && <div><span className="font-medium text-gray-700">მუნიციპალიტეტი: </span>{p.municipality}</div>}
                        {p.activity && <div className="col-span-2"><span className="font-medium text-gray-700">საქმიანობა: </span>{p.activity}</div>}
                        {p.address && <div className="col-span-2"><span className="font-medium text-gray-700">მისამართი: </span>{p.address}</div>}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-400">გვერდი {page} / {totalPages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">← წინა</button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50">შემდეგი →</button>
          </div>
        </div>
      )}
    </div>
  );
}
