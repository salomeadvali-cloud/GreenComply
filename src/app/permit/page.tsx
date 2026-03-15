'use client';

import { useState, useEffect, useMemo } from 'react';

interface Permit {
  company: string;
  project: string;
  permit_type: string;
  project_type: string;
  year: string;
  municipality: string;
  region: string;
  address: string;
  activity: string;
  activity_type: string;
  attachment: string;
  website: string;
  eia_required: string;
  procedure_types?: string[];
}

const TYPE_COLORS: Record<string, string> = {
  'გარემოსდაცვითი გადაწყვეტილება': 'bg-green-100 text-green-800',
  'გარემოზე ზემოქმედების ნებართვა': 'bg-blue-100 text-blue-800',
  'სკოპინგი': 'bg-yellow-100 text-yellow-800',
  'ეკო-ექსპერტიზა': 'bg-gray-100 text-gray-700',
};

const SECTOR_COLORS: Record<string, string> = {
  'ენერგეტიკა': 'bg-blue-100 text-blue-800',
  'ინფრასტრუქტურა': 'bg-orange-100 text-orange-800',
  'ნარჩენების მართვა': 'bg-purple-100 text-purple-800',
  'მრეწველობა': 'bg-yellow-100 text-yellow-800',
  'სასარგებლო წიაღისეულის გადამუშავება': 'bg-indigo-100 text-indigo-800',
  'ნავთობი და გაზი': 'bg-red-100 text-red-800',
  'სასოფლო-სამეურნეო': 'bg-green-100 text-green-800',
};

const OFFICIAL_REGIONS = [
  'თბილისი', 'კახეთი', 'შიდა ქართლი', 'ქვემო ქართლი',
  'სამცხე-ჯავახეთი', 'აჭარა', 'გურია', 'სამეგრელო-ზემო სვანეთი',
  'იმერეთი', 'რაჭა-ლეჩხუმი და ქვემო სვანეთი', 'მცხეთა-მთიანეთი',
];

export default function PermitPage() {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [procedureTypeFilter, setProcedureTypeFilter] = useState('');
  const [projectTypeFilter, setProjectTypeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'company' | 'year' | ''>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (col: 'company' | 'year') => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };
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

  const regions = OFFICIAL_REGIONS;

  const activities = useMemo(() => {
    const set = new Set(permits.map(p => p.activity).filter(Boolean));
    return Array.from(set).sort();
  }, [permits]);

  const projectTypes = useMemo(() => {
    const set = new Set(permits.map(p => p.project_type).filter(Boolean));
    return Array.from(set).sort();
  }, [permits]);

  const activityTypes = useMemo(() => {
    const set = new Set(permits.map(p => p.activity_type).filter(Boolean));
    return Array.from(set).sort();
  }, [permits]);

  const filtered = useMemo(() => {
    return permits.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !search ||
        p.company.toLowerCase().includes(q) ||
        p.project.toLowerCase().includes(q) ||
        (p.region && p.region.toLowerCase().includes(q)) ||
        (p.address && p.address.toLowerCase().includes(q)) ||
        (p.activity_type && p.activity_type.toLowerCase().includes(q)) ||
        (p.municipality && p.municipality.toLowerCase().includes(q));
      const matchYear = !yearFilter || p.year === yearFilter;
      const matchType = !typeFilter ||
        (typeFilter === '__eco__' ? p.procedure_types?.includes('ეკოლოგიური ექსპერტიზა') :
         typeFilter === '__env__' ? p.procedure_types?.includes('გარემოზე ზემოქმედების ნებართვა') :
         typeFilter === '__gd__' ? p.procedure_types?.includes('გარემოსდაცვითი გადაწყვეტილება') :
         p.permit_type === typeFilter);
      const matchProcedureType = !procedureTypeFilter || (p.procedure_types && p.procedure_types.includes(procedureTypeFilter));
      const matchProjectType = !projectTypeFilter || p.project_type === projectTypeFilter;
      const matchActivityType = !activityTypeFilter || p.activity_type === activityTypeFilter;
      const matchRegion = !regionFilter || p.region === regionFilter;
      const matchActivity = !activityFilter || p.activity === activityFilter;
      return matchSearch && matchYear && matchType && matchProcedureType && matchProjectType && matchActivityType && matchRegion && matchActivity;
    });
  }, [permits, search, yearFilter, typeFilter, projectTypeFilter, activityTypeFilter, regionFilter, activityFilter]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    return [...filtered].sort((a, b) => {
      const av = sortBy === 'year' ? (a.year || '') : a.company.toLowerCase();
      const bv = sortBy === 'year' ? (b.year || '') : b.company.toLowerCase();
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filtered, sortBy, sortDir]);

  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const clearFilters = () => {
    setSearch(''); setYearFilter(''); setTypeFilter('');
    setProjectTypeFilter(''); setActivityTypeFilter('');
    setRegionFilter(''); setActivityFilter(''); setProcedureTypeFilter(''); setPage(1);
  };

  const exportCSV = () => {
    const headers = ['კომპანია', 'პროექტი', 'რეგიონი', 'სექტორი', 'პროცედურა', 'საქმიანობის სახე', 'წელი', 'მისამართი', 'ვებ-გვერდი'];
    const rows = filtered.map(p => [
      p.company, p.project, p.region, p.project_type, p.permit_type,
      p.activity_type, p.year, p.address, p.website
    ].map(v => `"${(v || '').replace(/"/g, '""')}"`));
    const csv = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `permits_${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600&display=swap'); * { font-family: 'Noto Sans Georgian', sans-serif; }`}</style>

      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-gray-800">გაცემული გარემოსდაცვითი გადაწყვეტილებები</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition">
          ↓ CSV გადმოტვირთვა ({filtered.length.toLocaleString()})
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">სულ: {permits.length.toLocaleString()} · ნაჩვენებია: {filtered.length.toLocaleString()}</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="🔍 კომპანია, პროექტი, მისამართი, საქმიანობა..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="flex-1 min-w-60 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
        />
        <select value={regionFilter} onChange={e => { setRegionFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ყველა რეგიონი</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={projectTypeFilter} onChange={e => { setProjectTypeFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ყველა სექტორი</option>
          {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={activityTypeFilter} onChange={e => { setActivityTypeFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">საქმიანობის სახე</option>
          {activityTypes.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setProcedureTypeFilter(''); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ყველა პროცედურა</option>
          <optgroup label="გარემოსდაცვითი გადაწყვეტილება">
            <option value="__eco__">— ეკოლოგიური ექსპერტიზა</option>
            <option value="__env__">— გარემოზე ზემოქმედების ნებართვა</option>
            <option value="__gd__">— გარემოსდაცვითი გადაწყვეტ.</option>
          </optgroup>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={yearFilter} onChange={e => { setYearFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ყველა წელი</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        {(search || yearFilter || typeFilter || procedureTypeFilter || projectTypeFilter || activityTypeFilter || regionFilter || activityFilter) && (
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
              <th className="text-left px-4 py-3 font-semibold text-gray-600 cursor-pointer select-none hover:text-green-700" onClick={() => toggleSort('company')}>
                კომპანია {sortBy === 'company' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">პროექტი</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 w-32">რეგიონი</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 w-36">სექტორი</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 w-40">პროცედურა</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 w-14 cursor-pointer select-none hover:text-green-700" onClick={() => toggleSort('year')}>
                წელი {sortBy === 'year' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400">ჩანაწერი ვერ მოიძებნა</td></tr>
            ) : paginated.map((p, i) => (
              <>
                <tr
                  key={i}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="border-b border-gray-100 hover:bg-green-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{p.company}</td>
                  <td className="px-4 py-3 text-gray-600">{p.project}</td>
                  <td className="px-4 py-3 text-gray-500">{p.region || '—'}</td>
                  <td className="px-4 py-3">
                    {p.project_type ? (
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${SECTOR_COLORS[p.project_type] || 'bg-gray-100 text-gray-700'}`}>
                        {p.project_type}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[p.permit_type] || 'bg-gray-100 text-gray-700'}`}>
                      {p.permit_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{p.year || '—'}</td>
                </tr>
                {expanded === i && (
                  <tr key={`exp-${i}`} className="bg-green-50 border-b border-green-100">
                    <td colSpan={6} className="px-6 py-3 text-sm text-gray-600">
                      <div className="grid grid-cols-2 gap-2">
                        {p.region && <div><span className="font-medium text-gray-700">რეგიონი: </span>{p.region}</div>}
                        {p.procedure_types && p.procedure_types.length > 0 && (
                          <div className="col-span-2"><span className="font-medium text-gray-700">დოკუმენტები: </span>{p.procedure_types.join(', ')}</div>
                        )}
                        {p.project_type && <div><span className="font-medium text-gray-700">სექტორი: </span>{p.project_type}</div>}
                        {p.activity_type && <div className="col-span-2"><span className="font-medium text-gray-700">საქმიანობის დაზუსტება: </span>{p.activity_type}</div>}
                        {p.activity && <div className="col-span-2"><span className="font-medium text-gray-700">საქმიანობის ტიპი: </span>{p.activity}</div>}
                        {p.address && <div className="col-span-2"><span className="font-medium text-gray-700">მისამართი: </span>{p.address}</div>}
                        {p.eia_required && (
                          <div className="col-span-2">
                            <span className="font-medium text-gray-700">გზშ-ს დაქვემდებარება: </span>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              p.eia_required === 'კი' || p.eia_required.toLowerCase() === 'yes'
                                ? 'bg-orange-100 text-orange-800'
                                : p.eia_required === 'არა' || p.eia_required.toLowerCase() === 'no'
                                ? 'bg-gray-100 text-gray-600'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {p.eia_required === 'კი' || p.eia_required.toLowerCase() === 'yes' ? '✅ დაექვემდებარა გზშ-ს' :
                               p.eia_required === 'არა' || p.eia_required.toLowerCase() === 'no' ? '⬜ არ დაექვემდებარა გზშ-ს' :
                               p.eia_required}
                            </span>
                          </div>
                        )}
                        {p.website && p.website !== '' && (
                          <div className="col-span-2">
                            <a href={p.website} target="_blank" rel="noopener noreferrer"
                              className="text-green-600 hover:underline text-sm">
                              🔗 დოკუმენტის ლინკი
                            </a>
                          </div>
                        )}
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
