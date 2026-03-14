export const COLORS = {
  primary: "#1A5C38",
  primaryLight: "#27AE60",
  brand: "#1B4F72",
  warning: "#F39C12",
  danger: "#E74C3C",
  success: "#27AE60",
  muted: "#6B7280",
  background: "#F9FAFB",
  white: "#FFFFFF",
} as const;

export const NAV_ITEMS = [
  { key: "dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { key: "monitoring", href: "/monitoring", icon: "ShieldCheck" },
  { key: "iso14001", href: "/iso14001", icon: "FileCheck" },
  { key: "activities", href: "/activities", icon: "Database" },
  { key: "esmp", href: "/esmp", icon: "ClipboardList" },
  { key: "sep", href: "/sep", icon: "Users" },
  { key: "legal", href: "/legal", icon: "Scale" },
  { key: "audit", href: "/audit", icon: "Search" },
  { key: "training", href: "/training", icon: "GraduationCap" },
  { key: "reports", href: "/reports", icon: "BarChart3" },
  { key: "settings", href: "/settings", icon: "Settings" },
] as const;

export const EIA_ACTIVITIES = [
  { id: 1, sector: "energy", nameKa: "ჰიდროელექტროსადგური (>2 მეგავატი)", nameEn: "Hydroelectric Power Plant (>2 MW)", class: "I", thresholdKa: "სიმძლავრე >2 მეგავატი", thresholdEn: "Capacity >2 MW" },
  { id: 2, sector: "energy", nameKa: "ჰიდროელექტროსადგური (0.5-2 მეგავატი)", nameEn: "Hydroelectric Power Plant (0.5-2 MW)", class: "II", thresholdKa: "სიმძლავრე 0.5-2 მეგავატი", thresholdEn: "Capacity 0.5-2 MW" },
  { id: 3, sector: "energy", nameKa: "ქარის ელექტროსადგური (>10 ტურბინა)", nameEn: "Wind Farm (>10 turbines)", class: "I", thresholdKa: ">10 ტურბინა ან >15 მეგავატი", thresholdEn: ">10 turbines or >15 MW" },
  { id: 4, sector: "energy", nameKa: "ქარის ელექტროსადგური (5-10 ტურბინა)", nameEn: "Wind Farm (5-10 turbines)", class: "II", thresholdKa: "5-10 ტურბინა", thresholdEn: "5-10 turbines" },
  { id: 5, sector: "energy", nameKa: "მზის ელექტროსადგური (>20 ჰა)", nameEn: "Solar Power Plant (>20 ha)", class: "I", thresholdKa: "ფართობი >20 ჰექტარი", thresholdEn: "Area >20 hectares" },
  { id: 6, sector: "energy", nameKa: "თბოელექტროსადგური (>50 მეგავატი)", nameEn: "Thermal Power Plant (>50 MW)", class: "I", thresholdKa: "სიმძლავრე >50 მეგავატი", thresholdEn: "Capacity >50 MW" },
  { id: 7, sector: "energy", nameKa: "ბიომასის ენერგეტიკული ობიექტი", nameEn: "Biomass Energy Facility", class: "II", thresholdKa: "სიმძლავრე >5 მეგავატი", thresholdEn: "Capacity >5 MW" },
  { id: 8, sector: "energy", nameKa: "ნავთობისა და გაზის მოპოვება", nameEn: "Oil and Gas Extraction", class: "I", thresholdKa: "ყველა მასშტაბი", thresholdEn: "All scales" },

  { id: 10, sector: "mining", nameKa: "ღია კარიერი (>25 ჰა)", nameEn: "Open Quarry (>25 ha)", class: "I", thresholdKa: "ფართობი >25 ჰექტარი", thresholdEn: "Area >25 hectares" },
  { id: 11, sector: "mining", nameKa: "ღია კარიერი (5-25 ჰა)", nameEn: "Open Quarry (5-25 ha)", class: "II", thresholdKa: "ფართობი 5-25 ჰექტარი", thresholdEn: "Area 5-25 hectares" },
  { id: 12, sector: "mining", nameKa: "სამსხვრევ-დამახარისხებელი საწარმო", nameEn: "Crushing and Sorting Plant", class: "II", thresholdKa: "წარმადობა >100 ტ/დღე", thresholdEn: "Capacity >100 t/day" },
  { id: 13, sector: "mining", nameKa: "სამთო-მომპოვებელი საწარმო", nameEn: "Mining Enterprise", class: "I", thresholdKa: "ყველა სახის წიაღისეული", thresholdEn: "All mineral types" },
  { id: 14, sector: "mining", nameKa: "ტორფის მოპოვება", nameEn: "Peat Extraction", class: "II", thresholdKa: ">50 ჰექტარი", thresholdEn: ">50 hectares" },

  { id: 20, sector: "infrastructure", nameKa: "ავტომაგისტრალი / სწრაფი გზა", nameEn: "Highway / Expressway", class: "I", thresholdKa: ">10 კმ სიგრძე", thresholdEn: ">10 km length" },
  { id: 21, sector: "infrastructure", nameKa: "საავტომობილო გზა (5-10 კმ)", nameEn: "Motor Road (5-10 km)", class: "II", thresholdKa: "5-10 კმ ახალი მშენებლობა", thresholdEn: "5-10 km new construction" },
  { id: 22, sector: "infrastructure", nameKa: "რკინიგზა", nameEn: "Railway", class: "I", thresholdKa: ">10 კმ სიგრძე", thresholdEn: ">10 km length" },
  { id: 23, sector: "infrastructure", nameKa: "ხიდი (>100 მ)", nameEn: "Bridge (>100 m)", class: "I", thresholdKa: "სიგრძე >100 მეტრი", thresholdEn: "Length >100 meters" },
  { id: 24, sector: "infrastructure", nameKa: "აეროპორტი", nameEn: "Airport", class: "I", thresholdKa: "ასაფრენი ზოლი >2100 მ", thresholdEn: "Runway >2100 m" },
  { id: 25, sector: "infrastructure", nameKa: "ნავსადგური", nameEn: "Port / Harbor", class: "I", thresholdKa: ">1350 ტონა ტვირთი", thresholdEn: ">1350 tons cargo" },
  { id: 26, sector: "infrastructure", nameKa: "გვირაბი", nameEn: "Tunnel", class: "I", thresholdKa: "სიგრძე >500 მ", thresholdEn: "Length >500 m" },

  { id: 30, sector: "industrial", nameKa: "ქიმიური ქარხანა", nameEn: "Chemical Plant", class: "I", thresholdKa: "ყველა მასშტაბი", thresholdEn: "All scales" },
  { id: 31, sector: "industrial", nameKa: "ცემენტის ქარხანა", nameEn: "Cement Factory", class: "I", thresholdKa: "წარმადობა >500 ტ/დღე", thresholdEn: "Capacity >500 t/day" },
  { id: 32, sector: "industrial", nameKa: "ლითონის დნობის საწარმო", nameEn: "Metal Smelting Plant", class: "I", thresholdKa: ">20 ტონა/დღე", thresholdEn: ">20 tons/day" },
  { id: 33, sector: "industrial", nameKa: "ნარჩენების გადამამუშავებელი", nameEn: "Waste Processing Plant", class: "I", thresholdKa: ">100 ტ/დღე", thresholdEn: ">100 t/day" },
  { id: 34, sector: "industrial", nameKa: "საკვები პროდუქტების ქარხანა", nameEn: "Food Processing Plant", class: "II", thresholdKa: ">50 ტ/დღე", thresholdEn: ">50 t/day" },
  { id: 35, sector: "industrial", nameKa: "ტექსტილის საწარმო", nameEn: "Textile Factory", class: "II", thresholdKa: ">10 ტ/დღე პროდუქცია", thresholdEn: ">10 t/day production" },

  { id: 40, sector: "agriculture", nameKa: "ინტენსიური მეცხოველეობა (>500 სული)", nameEn: "Intensive Livestock (>500 heads)", class: "I", thresholdKa: ">500 სული მსხვილფეხა", thresholdEn: ">500 cattle heads" },
  { id: 41, sector: "agriculture", nameKa: "ფრინველის ფერმა (>40,000)", nameEn: "Poultry Farm (>40,000)", class: "I", thresholdKa: ">40,000 ფრინველი", thresholdEn: ">40,000 poultry" },
  { id: 42, sector: "agriculture", nameKa: "ფრინველის ფერმა (10,000-40,000)", nameEn: "Poultry Farm (10,000-40,000)", class: "II", thresholdKa: "10,000-40,000 ფრინველი", thresholdEn: "10,000-40,000 poultry" },
  { id: 43, sector: "agriculture", nameKa: "სარწყავი სისტემა (>500 ჰა)", nameEn: "Irrigation System (>500 ha)", class: "I", thresholdKa: ">500 ჰექტარი", thresholdEn: ">500 hectares" },
  { id: 44, sector: "agriculture", nameKa: "აკვაკულტურა", nameEn: "Aquaculture", class: "II", thresholdKa: ">10 ტ/წელი", thresholdEn: ">10 t/year" },

  { id: 50, sector: "tourism", nameKa: "სასტუმრო (>300 ნომერი)", nameEn: "Hotel (>300 rooms)", class: "I", thresholdKa: ">300 ნომერი", thresholdEn: ">300 rooms" },
  { id: 51, sector: "tourism", nameKa: "სასტუმრო (50-300 ნომერი, დაცულ ტერიტორიაზე)", nameEn: "Hotel (50-300 rooms, protected area)", class: "II", thresholdKa: "50-300 ნომერი დაცულ ტერიტორიაზე", thresholdEn: "50-300 rooms in protected area" },
  { id: 52, sector: "tourism", nameKa: "სათხილამურო კურორტი", nameEn: "Ski Resort", class: "I", thresholdKa: ">20 ჰექტარი", thresholdEn: ">20 hectares" },
  { id: 53, sector: "tourism", nameKa: "საკემპინგო ტერიტორია", nameEn: "Camping Site", class: "II", thresholdKa: ">5 ჰა დაცულ ტერიტორიაზე", thresholdEn: ">5 ha in protected area" },

  { id: 60, sector: "wastewater", nameKa: "საკანალიზაციო გამწმენდი სადგური", nameEn: "Wastewater Treatment Plant", class: "I", thresholdKa: ">10,000 მ³/დღე", thresholdEn: ">10,000 m³/day" },
  { id: 61, sector: "wastewater", nameKa: "საკანალიზაციო სადგური (2,000-10,000 მ³/დღე)", nameEn: "Wastewater Plant (2,000-10,000 m³/day)", class: "II", thresholdKa: "2,000-10,000 მ³/დღე", thresholdEn: "2,000-10,000 m³/day" },
  { id: 62, sector: "wastewater", nameKa: "ნაგვის პოლიგონი", nameEn: "Landfill", class: "I", thresholdKa: ">50,000 ტონა", thresholdEn: ">50,000 tons" },
  { id: 63, sector: "wastewater", nameKa: "სახიფათო ნარჩენების განთავსება", nameEn: "Hazardous Waste Disposal", class: "I", thresholdKa: "ყველა მასშტაბი", thresholdEn: "All scales" },
] as const;

export type EIAActivity = (typeof EIA_ACTIVITIES)[number];
