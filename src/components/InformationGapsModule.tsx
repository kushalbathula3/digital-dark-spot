import React from 'react';
import type { InformationGap, Source } from '../types';
import type { InspectorPayload } from './EvidenceInspectorDrawer';
import { EyeOff, ChevronRight, CheckCircle2, Info, ExternalLink } from 'lucide-react';

interface InformationGapsModuleProps {
  gaps: InformationGap[];
  sources: Source[];
  onToggleGap: (gapId: string) => void;
  onOpenInspector: (payload: InspectorPayload) => void;
}

export const InformationGapsModule: React.FC<InformationGapsModuleProps> = ({
  gaps,
  sources,
  onToggleGap,
  onOpenInspector
}) => {
  const officialSource = sources.find(s => s.isOfficial) || sources[0];

  const handleOpenGapInspector = (gap: InformationGap) => {
    onOpenInspector({
      title: `Dark Spot: ${gap.title}`,
      categoryOrDomain: gap.domainCategory,
      source: officialSource,
      verbatimExcerpt: `QUERY AUDIT: Cross-referencing identified a total omission of criteria regarding [${gap.title}]. Missing elements: ${gap.missingItems.join('; ')}.`,
      epistemicType: 'potential_gap',
      contextNote: `Risk Assessment: ${gap.impactExplanation} | Recommended Official Inquiry: ${gap.suggestedOfficialInquiry}`
    });
  };

  return (
    <section className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <EyeOff className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Information Dark Spots (Missing Requirements)
              </h2>
              <span className="font-mono text-xs text-rose-400 font-semibold bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded">
                {gaps.length} Unaddressed Topics
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Crucial operational conditions completely missing across all reviewed sources
            </p>
          </div>
        </div>

        {/* Mandatory Epistemic Labelling Badge */}
        <div className="group relative cursor-help">
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>[Potential Gap - AI Signal]</span>
          </span>
          <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block z-30 w-72 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 shadow-xl leading-relaxed">
            AI signals represent inferred blind spots based on standard domain patterns, not guaranteed factual errors. Always verify with official authorities.
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-4">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            onClick={() => handleOpenGapInspector(gap)}
            className={`p-4 rounded-xl border transition-all cursor-pointer hover:ring-1 hover:ring-rose-500/60 ${
              gap.severity === 'critical'
                ? 'border-rose-500/30 bg-rose-950/20 hover:bg-rose-950/30'
                : 'border-amber-500/30 bg-amber-950/20 hover:bg-amber-950/30'
            } ${gap.isAddressed ? 'opacity-60 bg-slate-950/40' : ''}`}
            title="Click card to inspect missing context in Slide-Over Drawer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2 py-0.5 text-[10px] font-black uppercase rounded font-mono ${
                  gap.severity === 'critical' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-slate-950'
                }`}>
                  {gap.severity} DARK SPOT
                </span>
                <span className="text-xs font-mono font-semibold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {gap.domainCategory}
                </span>
              </div>

              <div className="flex items-center space-x-2 self-start sm:self-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleGap(gap.id);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors flex items-center space-x-1 cursor-pointer ${
                    gap.isAddressed
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{gap.isAddressed ? 'Investigated' : 'Mark Done'}</span>
                </button>

                <span className="text-blue-400 hover:text-blue-300 text-xs inline-flex items-center space-x-0.5 font-medium">
                  <span>Inspect</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-100 mt-1">
              {gap.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              {gap.description}
            </p>

            {/* Missing items breakdown */}
            <div className="mt-3 bg-slate-950/80 rounded-lg p-3 border border-slate-800/80">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5 font-mono">
                Specific Omitted Operational Clauses:
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {gap.missingItems.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <ChevronRight className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact & Official Target */}
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/40">
                <span className="font-semibold text-rose-300 block mb-0.5 font-mono text-[10px] uppercase">Decision Friction / Risk:</span>
                <span className="text-slate-300 text-[11px] leading-relaxed">{gap.impactExplanation}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-900/40">
                <span className="font-semibold text-indigo-300 block mb-0.5 font-mono text-[10px] uppercase">Recommended Inquiry to Official:</span>
                <span className="text-slate-300 text-[11px] font-mono leading-relaxed">{gap.suggestedOfficialInquiry}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
