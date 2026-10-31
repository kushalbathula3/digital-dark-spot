import React from 'react';
import type { Fact, Source } from '../types';
import type { InspectorPayload } from './EvidenceInspectorDrawer';
import { FileCheck, ExternalLink, ShieldCheck } from 'lucide-react';

interface VerifiedSourcedClaimsProps {
  facts: Fact[];
  sources: Source[];
  onOpenInspector: (payload: InspectorPayload) => void;
}

export const VerifiedSourcedClaims: React.FC<VerifiedSourcedClaimsProps> = ({
  facts,
  sources,
  onOpenInspector
}) => {
  const findSource = (sourceId: string) => sources.find(s => s.id === sourceId) || sources[0];

  const handleOpenFactInspector = (fact: Fact) => {
    const src = findSource(fact.sourceId);
    onOpenInspector({
      title: `Verified Ground Truth: ${fact.category}`,
      categoryOrDomain: fact.category,
      source: src,
      verbatimExcerpt: fact.exactQuote,
      epistemicType: 'verified_ground_truth',
      contextNote: `Established Statutory Fact: "${fact.claimText}" (Referenced from ${fact.paragraphRef || 'Statutory Section'}).`
    });
  };

  return (
    <section className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <FileCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Verified Sourced Claims (Established Ground Truth)
              </h2>
              <span className="font-mono text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                {facts.length} Verified Facts
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Statutory claims directly traceable to official gazettes and executive orders
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          [Verified Ground Truth]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
        {facts.map((fact) => (
          <div
            key={fact.id}
            onClick={() => handleOpenFactInspector(fact)}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-950/90 transition-all cursor-pointer flex flex-col justify-between"
            title="Click item to inspect official excerpt in Slide-Over Drawer"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-900/60">
                  {fact.category}
                </span>
                <span className="flex items-center space-x-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/60">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Statutory Rule</span>
                </span>
              </div>

              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {fact.claimText}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/80">
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-mono italic">
                "{fact.exactQuote}"
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate pr-2 font-mono text-slate-400">{fact.sourceName}</span>
                <span className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center space-x-1">
                  <span>Inspect</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
