import React, { useEffect } from 'react';
import type { Source } from '../types';
import { X, ExternalLink, FileText, Hash, ShieldCheck, Building, Calendar, AlertTriangle, Sparkles, Clock, Globe } from 'lucide-react';

export interface InspectorPayload {
  title: string;
  categoryOrDomain: string;
  source: Source;
  verbatimExcerpt: string;
  epistemicType: 'verified_ground_truth' | 'potential_gap' | 'temporal_mismatch' | 'disputed_conflict';
  contextNote?: string;
}

interface EvidenceInspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  payload: InspectorPayload | null;
}

export const EvidenceInspectorDrawer: React.FC<EvidenceInspectorDrawerProps> = ({
  isOpen,
  onClose,
  payload
}) => {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !payload) return null;

  const { title, source, verbatimExcerpt, epistemicType, contextNote } = payload;

  const getEpistemicBadge = () => {
    switch (epistemicType) {
      case 'verified_ground_truth':
        return (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>[Verified Ground Truth]</span>
          </span>
        );
      case 'potential_gap':
        return (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-rose-950/80 text-rose-300 border border-rose-500/40 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>[Potential Gap - AI Signal]</span>
          </span>
        );
      case 'temporal_mismatch':
        return (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-orange-950/80 text-orange-300 border border-orange-500/40 flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span>[Temporal Mismatch]</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center space-x-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>[Disputed Claim Conflict]</span>
          </span>
        );
    }
  };

  const getDomainTypeBadge = () => {
    if (source.domain.endsWith('.gov.in') || source.domain.endsWith('.gov')) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
          .gov.in Official Gazette
        </span>
      );
    }
    if (source.domain.includes('.edu') || source.domain.includes('.ac.')) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800">
          Accredited Educational Body
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
        Independent Portal
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-fadeIn flex justify-end">
      
      {/* Slide-over Container */}
      <div 
        className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-hidden transform transition-transform duration-300 ease-in-out translate-x-0"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {getDomainTypeBadge()}
                {getEpistemicBadge()}
              </div>
              <h3 className="text-sm font-bold text-slate-100 line-clamp-1">
                {title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close Drawer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          
          {/* Source Identification Card */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-1">
              Source Publication Title
            </span>
            <div className="font-bold text-slate-200 text-xs flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>{source.name}</span>
            </div>
          </div>

          {/* Verbatim Excerpt Block */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Hash className="w-3.5 h-3.5 text-blue-400" />
                <span>Verbatim Excerpt / Audited Quote</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                Exact Citation
              </span>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg font-mono text-xs text-slate-200 leading-relaxed italic shadow-inner">
              "{verbatimExcerpt}"
            </div>

            {contextNote && (
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed font-sans">
                <strong>Context Note:</strong> {contextNote}
              </p>
            )}
          </div>

          {/* Metadata Table */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
              Provenance & Metadata Table
            </span>
            <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Ingestion Timestamp</span>
                <span className="font-semibold text-slate-200 mt-0.5 block font-mono">{source.ingestedDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Last Modified / Cycle</span>
                <span className="font-semibold text-indigo-300 mt-0.5 block font-mono">{source.cycleOrEdition || source.lastUpdatedDate || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Reliability Index</span>
                <span className={`font-black font-mono mt-0.5 block ${source.credibilityScore >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {source.credibilityScore}% Domain Trust
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Extraction Protocol</span>
                <span className="font-mono text-slate-300 mt-0.5 block">Static DOM Heuristic</span>
              </div>
            </div>
          </div>

          {/* Full Ingested Context Snippet */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Surrounding Document Section
            </h4>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto selection:bg-blue-600">
              {source.fullContent}
            </pre>
          </div>

          {/* Outdated Warning Notice if applicable */}
          {source.outdatedRisk && (
            <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/30 text-xs text-orange-300 leading-relaxed">
              <span className="font-bold block mb-1">Temporal Outdated Risk:</span>
              <p className="text-slate-300 text-[11px]">{source.outdatedRisk}</p>
            </div>
          )}

        </div>

        {/* Drawer Footer with Functioning Linkout Action */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs">
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-md shadow-blue-600/30"
          >
            <span>Open Verified Origin URL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors cursor-pointer"
          >
            Close Drawer
          </button>
        </div>

      </div>
    </div>
  );
};
