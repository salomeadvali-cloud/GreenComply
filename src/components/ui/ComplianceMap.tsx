'use client';

import { useEffect, useState } from 'react';

interface Company {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'compliant' | 'warning' | 'violation';
  activity: string;
  region: string;
}

const sampleCompanies: Company[] = [
  { id: '1', name: 'შპს ენერგო', lat: 41.6938, lng: 44.8015, status: 'compliant', activity: 'ენერგეტიკა', region: 'თბილისი' },
  { id: '2', name: 'შპს ბათუმი ოილი', lat: 41.6168, lng: 41.6367, status: 'warning', activity: 'ნავთობი', region: 'ბათუმი' },
  { id: '3', name: 'შპს კუთაისი ინდასტრი', lat: 42.2679, lng: 42.7181, status: 'violation', activity: 'მრეწველობა', region: 'ქუთაისი' },
  { id: '4', name: 'შპს თელავი აგრო', lat: 41.9168, lng: 45.4833, status: 'compliant', activity: 'სოფლის მეურნეობა', region: 'თელავი' },
  { id: '5', name: 'შპს გორი მაინინგი', lat: 41.9864, lng: 44.1131, status: 'warning', activity: 'მადნეული', region: 'გორი' },
];

const statusColors = {
  compliant: '#22c55e',
  warning: '#f59e0b',
  violation: '#ef4444',
};

const statusLabels = {
  compliant: 'შესაბამისი',
  warning: 'გაფრთხილება',
  violation: 'დარღვევა',
};

export default function ComplianceMap() {
  const [MapComponents, setMapComponents] = useState<any>(null);
  const [selected, setSelected] = useState<Company | null>(null);

  useEffect(() => {
    // Dynamically import leaflet only on client
    Promise.all([
      import('leaflet'),
      import('react-leaflet'),
    ]).then(([L, RL]) => {
      // Fix leaflet default icon
      delete (L.default.Icon.Default.prototype as any)._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      setMapComponents({ L: L.default, ...RL });
    });

    // Load leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
  }, []);

  if (!MapComponents) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">რუკა იტვირთება...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, CircleMarker, Popup } = MapComponents;

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex gap-4 mb-3 text-sm">
        {Object.entries(statusLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors[key as keyof typeof statusColors] }} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={[42.0, 43.5]}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {sampleCompanies.map((company) => (
            <CircleMarker
              key={company.id}
              center={[company.lat, company.lng]}
              radius={10}
              fillColor={statusColors[company.status]}
              color="white"
              weight={2}
              opacity={1}
              fillOpacity={0.9}
              eventHandlers={{ click: () => setSelected(company) }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{company.name}</p>
                  <p>საქმიანობა: {company.activity}</p>
                  <p>რეგიონი: {company.region}</p>
                  <p>სტატუსი: <span style={{ color: statusColors[company.status] }}>{statusLabels[company.status]}</span></p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
