import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  colorClass: string;
  iconTextClass?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subValue,
  icon: Icon,
  colorClass,
  iconTextClass = 'text-white',
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-start justify-between transition-all hover:shadow-md hover:border-slate-200">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 truncate">{value}</h3>
        {subValue && <p className="text-xs text-slate-400 mt-2">{subValue}</p>}
      </div>
      <div className={`p-3 rounded-xl ${colorClass} flex-shrink-0 ml-4`}>
        <Icon className={`w-6 h-6 ${iconTextClass}`} />
      </div>
    </div>
  );
};

export default KPICard;
