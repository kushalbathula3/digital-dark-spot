import React from 'react';
import { ShieldCheck, Sparkles, Clock, AlertTriangle, Layers, BookOpen } from 'lucide-react';

export type BadgeType = 'verified_excerpt' | 'potential_gap' | 'stale_warning' | 'conflict_flag' | 'official_portal';

interface EpistemicBadgeProps {
  type: BadgeType;
  label?: string;
  size?: 'sm' | 'md';
  onClick?: () => void;
}

export const EpistemicBadge: React.FC<EpistemicBadgeProps> = ({
  type,
  label,
  size = 'md',
  onClick
}) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'verified_excerpt':
        return {
          icon: <ShieldCheck className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
          text: label || 'Verified Source Excerpt',
          classes: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/60'
        };
      case 'potential_gap':
        return {
          icon: <Sparkles className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
          text: label || 'Potential Gap - AI Signal',
          classes: 'bg-amber-950/60 text-amber-300 border-amber-500/40 hover:bg-amber-900/60'
        };
      case 'stale_warning':
        return {
          icon: <Clock className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
          text: label || 'Cycle Warning / Stale',
          classes: 'bg-rose-950/60 text-rose-300 border-rose-500/40 hover:bg-rose-900/60'
        };
      case 'conflict_flag':
        return {
          icon: <AlertTriangle className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
          text: label || 'Disputed Conflict',
          classes: 'bg-crimsonConflict-500/15 text-rose-400 border-rose-500/40 hover:bg-rose-950/60'
        };
      case 'official_portal':
        return {
          icon: <BookOpen className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
          text: label || 'Official Gazette / Portal',
          classes: 'bg-indigo-950/60 text-indigo-300 border-indigo-500/40 hover:bg-indigo-900/60'
        };
      default:
        return {
          icon: <Layers className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />,
          text: label || 'Document Evidence',
          classes: 'bg-slate-800 text-slate-300 border-slate-700'
        };
    }
  };

  const config = getBadgeConfig();
  const paddingClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center space-x-1.5 font-semibold font-mono tracking-tight rounded-md border transition-all cursor-pointer ${config.classes} ${paddingClass}`}
      title={type === 'potential_gap' ? 'Inferred advisory signal — verify directly with official body' : 'Traceable evidence'}
    >
      {config.icon}
      <span>{config.text}</span>
    </span>
  );
};
