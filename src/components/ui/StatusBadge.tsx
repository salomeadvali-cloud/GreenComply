const STYLES: Record<string, string> = {
  completed: "bg-green-50 text-green-700 border-green-200",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  overdue: "bg-red-50 text-red-700 border-red-200",
  active: "bg-blue-50 text-blue-700 border-blue-200",
  "class-I": "bg-red-50 text-red-700 border-red-200",
  "class-II": "bg-orange-50 text-orange-700 border-orange-200",
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  low: "bg-green-50 text-green-700 border-green-200",
};

export default function StatusBadge({ status, label }: { status: string; label: string }) {
  const style = STYLES[status] || "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}
