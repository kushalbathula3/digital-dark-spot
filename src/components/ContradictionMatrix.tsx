import React from 'react';
import type { Contradiction, Source } from '../types';
import type { InspectorPayload } from './EvidenceInspectorDrawer';
import { AlertTriangle, ExternalLink, Scale, Sparkles, ArrowRightLeft } from 'lucide-react';

interface ContradictionMatrixProps {
  contradictions: Contradiction[];
  sources: Source[];
  onToggleResolved: (id: string) => void;
  onOpenInspector: (payload: InspectorPayload) => void;
}

export const ContradictionMatrix: React.FC<ContradictionMatrixProps> = ({
  contradictions,
  sources,
  onToggleResolved,
  onOpenInspector
}) => {
  const findSource = (sourceId: string) => sources.find(s => s.id === sourceId) || sources[0];

  const handleOpenConflictInspector = (conflict: Contradiction, claimIndex: 0 | 1) => {
    const claim = conflict.claims[claimIndex];
    const src = findSource(claim.sourceId);

    onOpenInspector({
      title: `${conflict.topic} — Claim ${claimIndex === 0 ? 'A' : 'B'}`,
      categoryOrDomain: conflict.topic,
      source: src,
      verbatimExcerpt: claim.exactQuote,
      epistemicType: 'disputed_conflict',
      contextNote: `Visual Delta: ${conflict.visualDelta.label} (${conflict.visualDelta.valueA} vs ${conflict.visualDelta.valueB}). AI Root Cause: ${conflict.rootCauseHypothesis}`
    });
  };

  return (
    <section className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Contradiction Matrix with Git-Style Visual Diff
              </h2>
              <span className="font-mono text-xs text-amber-400 font-semibold bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                {contradictions.length} Competing Claims
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Side-by-side comparative analysis of conflicting numerical and documentary criteria
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30">
          Disqualification Risk Flag
        </span>
      </div>

      <div className="space-y-6 mt-4">
        {contradictions.map((conflict) => (
          <div
            key={conflict.id}
            className={`p-4 rounded-xl border transition-all ${
              conflict.resolved ? 'bg-slate-950/40 border-slate-800 opacity-70' : 'bg-slate-950/90 border-amber-500/30 shadow-lg'
            }`}
          >
            {/* Header with Visual Delta Pill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono">
                  {conflict.severity} CONFLICT
                </span>
                <span className="text-xs font-bold text-slate-200">
                  {conflict.topic}
                </span>
              </div>

              <button
                onClick={() => onToggleResolved(conflict.id)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors self-start sm:self-auto cursor-pointer ${
                  conflict.resolved
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
              >
                {conflict.resolved ? '✓ Conflict Reviewed' : 'Mark Reviewed'}
              </button>
            </div>

            {/* Git-Style Visual Delta Badge */}
            <div 
              onClick={() => handleOpenConflictInspector(conflict, 0)}
              className="mb-3 p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono cursor-pointer hover:border-amber-400 transition-colors"
              title="Click to inspect contradiction evidence in Slide-Over Drawer"
            >
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] flex items-center space-x-1">
                <ArrowRightLeft className="w-3.5 h-3.5 mr-1" />
                {conflict.visualDelta.label}:
              </span>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                  Source A: {conflict.visualDelta.valueA}
                </span>
                <span className="text-slate-500 font-bold">vs</span>
                <span className="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800">
                  Source B: {conflict.visualDelta.valueB}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
              {conflict.summary}
            </p>

            {/* Side-by-Side Comparative Cards (Clicking any card opens Evidence Drawer) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {conflict.claims.map((claim, idx) => {
                const src = findSource(claim.sourceId);
                return (
                  <div
                    key={idx}
                    onClick={() => handleOpenConflictInspector(conflict, idx as 0 | 1)}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all hover:ring-1 hover:ring-blue-500 ${
                      claim.isOfficial
                        ? 'bg-emerald-950/15 border-emerald-500/40 hover:bg-emerald-950/25'
                        : 'bg-amber-950/15 border-amber-500/40 hover:bg-amber-950/25'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-200 truncate pr-2">
                          {claim.sourceName}
                        </span>
                        {claim.isOfficial ? (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">
                            Official Authority
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800 px-1.5 py-0.5 rounded font-medium">
                            Third-Party Advisory
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-bold text-slate-100 mb-2">
                        Asserted Rule: <span className="text-indigo-300">{claim.claimValue}</span>
                      </div>

                      <blockquote className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-mono italic leading-relaxed">
                        "{claim.exactQuote}"
                      </blockquote>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 font-mono">Date: {claim.lastUpdated || 'Unknown'}</span>
                      <span className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center space-x-1">
                        <span>Inspect Evidence</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Root Cause Hypothesis */}
            <div className="mt-3.5 p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start space-x-2.5 text-xs">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300 block mb-0.5">
                  AI Root Cause Hypothesis:
                </span>
                <span className="text-slate-300 text-[11px] leading-relaxed">
                  {conflict.rootCauseHypothesis}
                </span>
              </div>
            </div>

            {/* Resolution Guidance Box */}
            <div className="mt-2.5 p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/50 flex items-start space-x-2.5 text-xs text-indigo-200">
              <Scale className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5 text-indigo-300">
                  Evidentiary Precedence & Resolution:
                </span>
                <span className="text-slate-300 text-[11px] leading-relaxed">
                  {conflict.resolutionGuidance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
