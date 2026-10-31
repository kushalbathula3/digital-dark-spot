import React, { useState } from 'react';
import type { ChecklistItem, ScenarioDataset } from '../types';
import { CheckSquare, Square, ListTodo, Copy, Check, Download, ExternalLink } from 'lucide-react';

interface VerificationChecklistProps {
  checklist: ChecklistItem[];
  scenario: ScenarioDataset;
  onToggleCheck: (id: string) => void;
}

export const VerificationChecklist: React.FC<VerificationChecklistProps> = ({
  checklist,
  scenario,
  onToggleCheck
}) => {
  const [copied, setCopied] = useState(false);

  const completedCount = checklist.filter(c => c.completed).length;
  const progressPercent = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;
  const pendingCount = checklist.length - completedCount;

  // Build the strict professional Markdown export
  const buildDossierMarkdown = () => {
    return `# DIGITAL DARK SPOT: VERIFICATION DOSSIER & AUDIT BRIEF
**Topic:** ${scenario.chipLabel}
**Target Query:** ${scenario.goalQuestion}
**Audit Date:** ${new Date().toISOString().split('T')[0]}
**Completeness Index:** ${scenario.completenessIndex.verifiedPercentage}% Verified vs. ${scenario.completenessIndex.darkSpotPercentage}% Dark Spot

---

## 1. EXECUTIVE DIAGNOSTIC SUMMARY
- Contradictions Flagged: ${scenario.contradictions.length}
- Critical Dark Spots Identified: ${scenario.gaps.length}
- Stale / Outdated Cycle Warnings: ${scenario.temporalWarnings.length}
- Total Action Items: ${checklist.length} (${pendingCount} Pending Verification)

---

## 2. DETECTED CONTRADICTIONS & DISCREPANCIES
${scenario.contradictions.map((c) => `
### Field: ${c.topic} (Severity: ${c.severity.toUpperCase()})
- **Claim A:** "${c.claims[0].exactQuote}"
  - *Source:* ${c.claims[0].sourceName} (${c.claims[0].sourceUrl}) | Date: ${c.claims[0].lastUpdated || 'Undated'}
- **Claim B:** "${c.claims[1].exactQuote}"
  - *Source:* ${c.claims[1].sourceName} (${c.claims[1].sourceUrl}) | Date: ${c.claims[1].lastUpdated || 'Undated'}
- **Reconciliation Note:** ${c.rootCauseHypothesis}
`).join('\n')}

---

## 3. IDENTIFIED INFORMATION DARK SPOTS (CRITICAL Gaps)
${scenario.gaps.map((g) => `
- **${g.title}** \`[Potential Gap - AI Signal]\`
  - *Risk Assessment:* ${g.impactExplanation}
  - *Missing Elements:* ${g.missingItems.join(', ')}
`).join('\n')}

---

## 4. PRIORITIZED VERIFICATION CHECKLIST
${checklist.map((item) => `
- [${item.completed ? 'x' : ' '}] [P${item.priority}] ${item.taskTitle}
  - Target Authority: ${item.targetAuthority}
  - Instruction: ${item.actionGuidance}
`).join('\n')}

---
*Generated autonomously by Digital Dark Spot Engine — Grounded Epistemic Verification Architecture.*`;
  };

  const handleCopyDossier = () => {
    const md = buildDossierMarkdown();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadDossier = () => {
    const md = buildDossierMarkdown();
    const element = document.createElement('a');
    const file = new Blob([md], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'digital-dark-spot-verification-dossier.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ListTodo className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                Prioritized Verification Checklist
              </h2>
              <span className="font-mono text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                {completedCount}/{checklist.length} Completed ({progressPercent}%)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Action items prioritized by severity to eliminate information dark spots before final decisions
            </p>
          </div>
        </div>

        {/* Dual One-Click Export Actions */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          {/* Action A: Copy Brief to Clipboard */}
          <button
            onClick={handleCopyDossier}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600 shadow-md shadow-emerald-950/50'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title="Copy structured Markdown brief to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Brief</span>
              </>
            )}
          </button>

          {/* Action B: Download .MD / .TXT Dossier */}
          <button
            onClick={handleDownloadDossier}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 cursor-pointer"
            title="Download digital-dark-spot-verification-dossier.md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD Dossier</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 flex items-center space-x-3">
        <span className="text-xs font-mono font-bold text-slate-300">Verification Progress:</span>
        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-xs font-mono font-bold text-emerald-400">{progressPercent}%</span>
      </div>

      <div className="space-y-3 mt-4">
        {checklist.map((item) => (
          <div
            key={item.id}
            onClick={() => onToggleCheck(item.id)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
              item.completed
                ? 'bg-emerald-950/20 border-emerald-900/40 opacity-70'
                : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors flex-shrink-0"
            >
              {item.completed ? (
                <CheckSquare className="w-4 h-4 text-emerald-400" />
              ) : (
                <Square className="w-4 h-4 text-slate-500" />
              )}
            </button>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 text-[10px] font-black font-mono uppercase rounded ${
                  item.priority === 1
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  P{item.priority} - {item.priority === 1 ? 'Critical' : 'Secondary'}
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {item.category}
                </span>
              </div>

              <h4 className={`text-xs font-bold ${item.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                {item.taskTitle}
              </h4>

              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {item.actionGuidance}
              </p>

              <div className="mt-2 text-[11px] text-slate-400 flex flex-wrap items-center gap-1 font-mono">
                <span className="font-semibold text-slate-500">Contact / Inspect Authority:</span>
                <span className="text-blue-300 font-medium">{item.targetAuthority}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
