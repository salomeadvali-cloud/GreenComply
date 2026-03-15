'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MUNICIPALITIES } from '@/data/municipalities';

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

// Georgian region centroids
const REGION_COORDS: Record<string, [number, number]> = {
  'თბილისი': [41.6938, 44.8015],
  'კახეთი': [41.6419, 45.6950],
  'შიდა ქართლი': [41.9798, 44.1101],
  'ქვემო ქართლი': [41.4000, 44.8000],
  'სამცხე-ჯავახეთი': [41.5754, 43.1231],
  'აჭარა': [41.6500, 42.0000],
  'გურია': [41.9500, 42.0500],
  'სამეგრელო-ზემო სვანეთი': [42.5000, 42.5000],
  'იმერეთი': [42.2500, 42.9000],
  'რაჭა-ლეჩხუმი და ქვემო სვანეთი': [42.6500, 43.0000],
  'მცხეთა-მთიანეთი': [42.2000, 44.7000],
};

const SECTOR_COLORS: Record<string, string> = {
  'ენერგეტიკა': '#2563eb',
  'მრეწველობა': '#d97706',
  'ინფრასტრუქტურა': '#f97316',
  'ნარჩენების მართვა': '#9333ea',
  'ნავთობი და გაზი': '#ef4444',
  'სასოფლო-სამეურნეო': '#16a34a',
  'სასარგებლო წიაღისეულის გადამუშავება': '#0891b2',
};

function getColor(sector: string) {
  return SECTOR_COLORS[sector] || '#6b7280';
}

type GroupMode = 'region' | 'municipality';

function groupPermits(permits: Permit[], mode: GroupMode) {
  const groups: Record<string, { lat: number; lng: number; total: number; sectors: Record<string, number>; samples: Permit[]; label: string }> = {};

  for (const p of permits) {
    let key = '';
    let lat = 0, lng = 0;

    if (mode === 'municipality' && p.municipality) {
      const mun = p.municipality.trim();
      // find best match in MUNICIPALITIES
      const match = Object.keys(MUNICIPALITIES).find(k => mun.startsWith(k) || mun === k);
      if (!match) continue;
      key = match;
      lat = MUNICIPALITIES[match].lat;
      lng = MUNICIPALITIES[match].lng;
    } else {
      if (!p.region || !REGION_COORDS[p.region]) continue;
      key = p.region;
      [lat, lng] = REGION_COORDS[p.region];
    }

    if (!groups[key]) groups[key] = { lat, lng, total: 0, sectors: {}, samples: [], label: key };
    groups[key].total++;
    if (p.project_type) groups[key].sectors[p.project_type] = (groups[key].sectors[p.project_type] || 0) + 1;
    if (groups[key].samples.length < 3) groups[key].samples.push(p);
  }
  return groups;
}

function FitBounds({ permits }: { permits: Permit[] }) {
  const map = useMap();
  useEffect(() => {
    map.setView([42.0, 43.5], 7);
  }, [map]);
  return null;
}

export default function MapView({ permits, mode = 'region', onAreaClick, selectedArea }: {
  permits: Permit[];
  mode?: 'region' | 'municipality';
  onAreaClick?: (area: string) => void;
  selectedArea?: string;
}) {
  const groups = groupPermits(permits, mode);
  const maxCount = Math.max(...Object.values(groups).map(g => g.total), 1);

  return (
    <MapContainer
      center={[42.0, 43.5]}
      zoom={7}
      style={{ height: '100%', width: '100%', minHeight: 500 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds permits={permits} />

      {Object.entries(groups).map(([key, data]) => {
        const topSector = Object.entries(data.sectors).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
        const color = getColor(topSector);
        const radius = 8 + (data.total / maxCount) * 35;

        const isSelected = selectedArea === key;
        return (
          <CircleMarker
            key={key}
            center={[data.lat, data.lng]}
            radius={isSelected ? radius + 4 : radius}
            pathOptions={{ color: isSelected ? '#1a1a1a' : color, fillColor: color, fillOpacity: isSelected ? 0.9 : 0.6, weight: isSelected ? 3 : 2 }}
            eventHandlers={{ click: () => onAreaClick?.(key) }}
          >
            <Popup maxWidth={280}>
              <div style={{ fontFamily: 'Noto Sans Georgian, sans-serif' }}>
                <strong style={{ fontSize: 14 }}>{key}</strong>
                <div style={{ color: '#6b7280', fontSize: 12, marginTop: 2 }}>სულ: {data.total} ნებართვა</div>
                <hr style={{ margin: '8px 0' }} />
                <div style={{ fontSize: 12 }}>
                  {Object.entries(data.sectors).sort((a,b) => b[1]-a[1]).slice(0,5).map(([s, c]) => (
                    <div key={s} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 2 }}>
                      <span style={{ color: getColor(s) }}>● {s}</span>
                      <strong>{c}</strong>
                    </div>
                  ))}
                </div>
                {data.samples.length > 0 && (
                  <>
                    <hr style={{ margin: '8px 0' }} />
                    <div style={{ fontSize: 11, color: '#6b7280' }}>მაგ:</div>
                    {data.samples.map((p, i) => (
                      <div key={i} style={{ fontSize: 11, marginTop: 3 }}>• {p.company}</div>
                    ))}
                  </>
                )}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
