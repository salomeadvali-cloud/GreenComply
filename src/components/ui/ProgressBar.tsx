interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  label?: string;
  showPercent?: boolean;
}

export default function ProgressBar({ value, max = 100, color = "bg-primary", label, showPercent = true }: ProgressBarProps) {
  const pct = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div>
      {(label || showPercent) && (
        <div className="mb-1 flex items-center justify-between text-sm">
          {label && <span className="font-medium text-gray-700">{label}</span>}
          {showPercent && <span className="text-gray-500">{pct}%</span>}
        </div>
      )}
      <div className="h-2.5 w-full rounded-full bg-gray-100">
        <div
          className={`h-2.5 rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
