import React from 'react';
import { AlertTriangle, EyeOff, History, ListTodo } from 'lucide-react';

interface ExecutiveDiagnosticBarProps {
  verifiedPercentage: number;
  darkSpotPercentage: number;
  contradictionsCount: number;
  gapsCount: number;
  staleCount: number;
  checklistPending: number;
  checklistTotal: number;
}

export const ExecutiveDiagnosticBar: React.FC<ExecutiveDiagnosticBarProps> = ({
  verifiedPercentage,
  darkSpotPercentage,
  contradictionsCount,
  gapsCount,
  staleCount,
  checklistPending,
  checklistTotal
}) => {
  // SVG circular gauge math
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (verifiedPercentage / 100) * circumference;

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* Information Completeness Radar Circle */}
        <div className="lg:col-span-4 flex items-center space-x-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
          <div className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-slate-800"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress stroke */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black font-mono text-slate-100">{verifiedPercentage}%</span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Verified</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Completeness Index
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-900">
                Health Radar
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              <strong className="text-emerald-400">{verifiedPercentage}% Verified Coverage</strong>
              <span className="text-slate-500 mx-1">|</span>
              <strong className="text-rose-400">{darkSpotPercentage}% Information Dark Spot</strong>
            </p>
            <div className="mt-2 text-[11px] text-slate-500 font-mono">
              Uncovered operational clauses remain unaddressed.
            </div>
          </div>
        </div>

        {/* 4-Pillar Metric Strip */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* Contradictions Detected (Amber) */}
          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-1">
              <span className="text-[11px] uppercase tracking-wider">Contradictions</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black font-mono text-amber-300">{contradictionsCount}</span>
              <span className="text-[10px] text-amber-400/80 font-mono">active</span>
            </div>
            <div className="text-[10px] text-amber-400/80 mt-1 truncate">
              Direct Claim Conflicts
            </div>
          </div>

          {/* Critical Dark Spots (Rose) */}
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-xs text-rose-300 font-semibold mb-1">
              <span className="text-[11px] uppercase tracking-wider">Dark Spots</span>
              <EyeOff className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black font-mono text-rose-300">{gapsCount}</span>
              <span className="text-[10px] text-rose-400/80 font-mono">blind spots</span>
            </div>
            <div className="text-[10px] text-rose-400/80 mt-1 truncate">
              Omitted Policies
            </div>
          </div>

          {/* Stale / Outdated Cycles (Orange) */}
          <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/30 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-xs text-orange-300 font-semibold mb-1">
              <span className="text-[11px] uppercase tracking-wider">Stale Cycles</span>
              <History className="w-4 h-4 text-orange-400" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black font-mono text-orange-300">{staleCount}</span>
              <span className="text-[10px] text-orange-400/80 font-mono">flagged</span>
            </div>
            <div className="text-[10px] text-orange-400/80 mt-1 truncate">
              Temporal Mismatches
            </div>
          </div>

          {/* Verification Tasks Pending (Blue) */}
          <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between text-xs text-blue-300 font-semibold mb-1">
              <span className="text-[11px] uppercase tracking-wider">Tasks Pending</span>
              <ListTodo className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black font-mono text-blue-300">{checklistPending}</span>
              <span className="text-[10px] text-blue-400/80 font-mono">/ {checklistTotal}</span>
            </div>
            <div className="text-[10px] text-blue-400/80 mt-1 truncate">
              Prioritized Actions
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
