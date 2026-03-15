'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/ui/MapView'), { ssr: false, loading: () => <div className="h-full flex items-center justify-center text-gray-400">რუკა იტვირთება...</div> });

interface Permit {
  company: string;
  project: string;
  region: string;
  municipality: string;
  project_type: string;
  permit_type: string;
  year: string;
  activity_type: string;
  website: string;
}

const OFFICIAL_REGIONS = [
  'თბილისი','კახეთი','შიდა ქართლი','ქვემო ქართლი','სამცხე-ჯავახეთი',
  'აჭარა','გურია','სამეგრელო-ზემო სვანეთი','იმერეთი',
  'რაჭა-ლეჩხუმი და ქვემო სვანეთი','მცხეთა-მთიანეთი',
];

export default function MapPage() {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [regionFilter, setRegionFilter] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [mapMode, setMapMode] = useState<'region' | 'municipality'>('region');
  const [selectedArea, setSelectedArea] = useState<string>('');

  useEffect(() => {
    fetch('/data/permits.json').then(r => r.json()).then(setPermits);
  }, []);

  const sectors = useMemo(() => {
    const set = new Set(permits.map(p => p.project_type).filter(Boolean));
    return Array.from(set).sort();
  }, [permits]);

  const filtered = useMemo(() => permits.filter(p => {
    if (regionFilter && p.region !== regionFilter) return false;
    if (sectorFilter && p.project_type !== sectorFilter) return false;
    return p.region && p.region.trim() !== '';
  }), [permits, regionFilter, sectorFilter]);

  // list shown below map — additionally filtered by clicked area
  const listPermits = useMemo(() => {
    if (!selectedArea) return filtered;
    if (mapMode === 'municipality') {
      return filtered.filter(p => p.municipality && p.municipality.trim().startsWith(selectedArea));
    } else {
      return filtered.filter(p => p.region === selectedArea);
    }
  }, [filtered, selectedArea, mapMode]);

  return (
    <div className="flex flex-col h-full p-6 gap-4">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600&display=swap'); * { font-family: 'Noto Sans Georgian', sans-serif; }`}</style>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">გეოგრაფიული რუკა</h1>
          <p className="text-gray-400 text-sm">გარემოსდაცვითი გადაწყვეტილებები რეგიონების მიხედვით · {filtered.length.toLocaleString()} ჩანაწერი</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ყველა რეგიონი</option>
          {OFFICIAL_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ყველა სექტორი</option>
          {sectors.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {(regionFilter || sectorFilter) && (
          <button onClick={() => { setRegionFilter(''); setSectorFilter(''); }}
            className="px-3 py-2 text-sm text-gray-500 hover:text-red-500 border border-gray-300 rounded-lg">
            X გასუფთავება
          </button>
        )}
        <div className="ml-auto flex rounded-lg overflow-hidden border border-gray-300">
          <button onClick={() => setMapMode('region')}
            className={`px-3 py-2 text-sm ${mapMode === 'region' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
            რეგიონი
          </button>
          <button onClick={() => setMapMode('municipality')}
            className={`px-3 py-2 text-sm ${mapMode === 'municipality' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
            მუნიციპალიტეტი
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: 500 }}>
        <MapView permits={filtered} mode={mapMode} onAreaClick={setSelectedArea} selectedArea={selectedArea} />
      </div>

      {/* Permit list below map */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-700 text-sm">
              {selectedArea ? `${selectedArea} — პროექტები` : 'პროექტების ჩამონათვალი'}
            </h2>
            {selectedArea && (
              <button onClick={() => setSelectedArea('')} className="text-xs text-green-600 hover:underline mt-0.5">
                ← ყველა ჩვენება
              </button>
            )}
          </div>
          <span className="text-xs text-gray-400">{listPermits.length.toLocaleString()} ჩანაწერი</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-600">კომპანია</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-600">პროექტი</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-600 w-32">რეგიონი</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-600 w-36">სექტორი</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-600 w-40">საქმიანობა</th>
                <th className="text-left px-4 py-2.5 font-semibold text-gray-600 w-14">წელი</th>
              </tr>
            </thead>
            <tbody>
              {listPermits.slice(0, 100).map((p, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-green-50 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-gray-800 max-w-[180px] truncate" title={p.company}>{p.company}</td>
                  <td className="px-4 py-2.5 text-gray-600 max-w-[240px] truncate" title={p.project}>{p.project}</td>
                  <td className="px-4 py-2.5 text-gray-500 text-xs">{p.region || '—'}</td>
                  <td className="px-4 py-2.5">
                    {p.project_type && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {p.project_type}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-gray-500 text-xs max-w-[160px] truncate" title={p.activity_type}>{p.activity_type || '—'}</td>
                  <td className="px-4 py-2.5 text-gray-400 text-xs">{p.year || '—'}</td>
                </tr>
              ))}
              {listPermits.length > 100 && (
                <tr>
                  <td colSpan={6} className="px-4 py-3 text-center text-xs text-gray-400">
                    ... და კიდევ {(listPermits.length - 100).toLocaleString()} ჩანაწერი.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
