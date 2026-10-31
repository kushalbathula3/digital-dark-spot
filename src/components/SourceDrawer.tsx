import React from 'react';
import type { Source } from '../types';
import { Globe, Calendar, ExternalLink, ShieldCheck, AlertCircle, PlusCircle, Trash2, Eye } from 'lucide-react';
import { EpistemicBadge } from './EpistemicBadge';

interface SourceDrawerProps {
  sources: Source[];
  onInspectSource: (source: Source) => void;
  onOpenAddModal: () => void;
  onRemoveSource: (sourceId: string) => void;
}

export const SourceDrawer: React.FC<SourceDrawerProps> = ({
  sources,
  onInspectSource,
  onOpenAddModal,
  onRemoveSource
}) => {
  return (
    <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Ingested Sources & Provenance ({sources.length})
            </h2>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-indigo-950/60 text-indigo-400 border border-indigo-900/60 rounded">
              Multi-Source Corpus
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified ground truth documents cross-audited by the gap detection engine
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/30 self-start sm:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add Source URL / Text</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4">
        {sources.map((src) => (
          <div
            key={src.id}
            className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between group relative"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                {src.isOfficial ? (
                  <EpistemicBadge type="verified_excerpt" label="Official Authority" size="sm" />
                ) : (
                  <EpistemicBadge type="potential_gap" label="Third-Party Source" size="sm" />
                )}

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onInspectSource(src)}
                    className="p-1 rounded text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                    title="Inspect Source Evidence"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveSource(src.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                    title="Remove Source"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-xs font-bold text-slate-100 group-hover:text-indigo-200 transition-colors line-clamp-1">
                {src.name}
              </h3>

              <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                <Globe className="w-3 h-3 text-slate-500" />
                <span className="font-mono text-slate-300">{src.domain}</span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-slate-400">{src.lastUpdatedDate || 'Undated'}</span>
              </div>

              <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 font-mono text-[11px]">
                "{src.summaryExcerpt}"
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-mono">
                Score: <strong className={src.credibilityScore >= 90 ? 'text-emerald-400' : 'text-amber-400'}>{src.credibilityScore}%</strong>
              </span>

              <button
                onClick={() => onInspectSource(src)}
                className="text-indigo-400 hover:text-indigo-300 inline-flex items-center space-x-1 font-medium"
              >
                <span>Inspect Evidence</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
