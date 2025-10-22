import { ReactNode } from 'react';

const ICON_MAP: Record<string, string> = {
  brain: '🧠',
  users: '👥',
  chart: '📊',
  robot: '🤖',
  'git-branch': '🌿',
  library: '📚',
  download: '⬇️',
  shield: '🛡️',
  default: '✨',
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
}

export default function FeatureCard({ title, description, icon, onClick }: FeatureCardProps) {
  const iconSymbol = ICON_MAP[icon] || ICON_MAP.default;

  return (
    <div
      className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <span className="text-2xl">{iconSymbol}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
