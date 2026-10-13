'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-gray-400">{label || 'Progression du parcours'}</span>
        <span className="text-blue-400 font-mono">{current} / {total} ({percentage}%)</span>
      </div>
      <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}