import React from 'react';
import type { TemporalWarning } from '../types';
import { History, AlertOctagon } from 'lucide-react';

interface TemporalWarningsModuleProps {
  warnings: TemporalWarning[];
}

export const TemporalWarningsModule: React.FC<TemporalWarningsModuleProps> = ({ warnings }) => {
  if (warnings.length === 0) return null;

  return (
    <section className="bg-slate-900/80 backdrop-blur-md border border-orange-500/30 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-orange-500/20 gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <History className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-orange-200">
                Temporal Cycle & Outdated Source Alerter
              </h2>
              <span className="font-mono text-xs text-orange-400 font-semibold bg-orange-950/60 border border-orange-500/30 px-2 py-0.5 rounded">
                {warnings.length} Stale Records Flagged
              </span>
            </div>
            <p className="text-xs text-orange-300/80 mt-0.5">
              Warning against relying on obsolete application links or expired cohort rules
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/30">
          [Cycle Warning / Stale]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
        {warnings.map((warn) => (
          <div
            key={warn.id}
            className="p-4 rounded-xl bg-slate-950/80 border border-orange-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-orange-950 text-orange-300 border border-orange-800">
                  Detected: {warn.detectedCycle}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                  Current: {warn.currentOperatingCycle}
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-100">
                {warn.sourceName}
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {warn.riskDescription}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-start space-x-1.5 text-[11px] text-amber-300">
              <AlertOctagon className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span><strong>Actionable Remedy:</strong> {warn.remedyAction}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
