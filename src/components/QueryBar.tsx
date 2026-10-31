import React, { useState } from 'react';
import { Search, Sparkles, PlusCircle, ShieldQuestion } from 'lucide-react';

interface QueryBarProps {
  currentQuery: string;
  onRunSearch: (query: string) => void;
  isAnalyzing: boolean;
  onOpenAddSource: () => void;
}

export const QueryBar: React.FC<QueryBarProps> = ({
  currentQuery,
  onRunSearch,
  isAnalyzing,
  onOpenAddSource
}) => {
  const [queryInput, setQueryInput] = useState(currentQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim()) {
      onRunSearch(queryInput.trim());
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-indigo-400" />
          </div>
          <input
            type="text"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="Enter research topic, question, or goal (e.g., 'What should I verify before applying for this scholarship?')..."
            className="w-full pl-10 pr-4 py-3 bg-slate-950/90 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={isAnalyzing || !queryInput.trim()}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs tracking-wide uppercase transition-all duration-200 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Scan For Gaps</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenAddSource}
            className="flex items-center justify-center space-x-1.5 px-3.5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-medium transition-all"
            title="Add URL, PDF Text, or Custom Article"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Add Source</span>
          </button>
        </div>
      </form>

      {/* Suggested Quick Prompts */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span className="flex items-center text-slate-400 text-[11px] font-medium mr-1">
          <ShieldQuestion className="w-3.5 h-3.5 mr-1 text-amber-400" /> Quick Tests:
        </span>
        <button
          onClick={() => {
            const q = 'What should I verify before applying for this scholarship?';
            setQueryInput(q);
            onRunSearch(q);
          }}
          className="px-2.5 py-1 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 text-[11px] transition-colors"
        >
          🎓 Hackathon Scenario (Scholarship Verification)
        </button>
        <button
          onClick={() => {
            const q = 'What information is missing or conflicting for Digital Nomad Visas?';
            setQueryInput(q);
            onRunSearch(q);
          }}
          className="px-2.5 py-1 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 text-[11px] transition-colors"
        >
          ✈️ Immigration Thresholds & PE Risk
        </button>
        <button
          onClick={() => {
            const q = 'Clean Energy Heat Pump tax credit documents and limits';
            setQueryInput(q);
            onRunSearch(q);
          }}
          className="px-2.5 py-1 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 text-[11px] transition-colors"
        >
          ⚡ Federal Rebate vs Tax Credit Limits
        </button>
      </div>
    </div>
  );
};
