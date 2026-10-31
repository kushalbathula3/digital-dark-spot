import React, { useState } from 'react';
import type { Source } from '../types';
import { X, Globe, PlusCircle, Sparkles } from 'lucide-react';
import { EpistemicBadge } from './EpistemicBadge';

interface AddSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSource: (newSource: Source) => void;
}

export const AddSourceModal: React.FC<AddSourceModalProps> = ({
  isOpen,
  onClose,
  onAddSource
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [domain, setDomain] = useState('');
  const [isOfficial, setIsOfficial] = useState(true);
  const [cycleOrEdition, setCycleOrEdition] = useState('');
  const [summaryExcerpt, setSummaryExcerpt] = useState('');
  const [fullContent, setFullContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !summaryExcerpt.trim()) return;

    let derivedDomain = domain.trim();
    if (!derivedDomain && url.trim()) {
      try {
        derivedDomain = new URL(url.trim()).hostname;
      } catch {
        derivedDomain = 'user-submitted.org';
      }
    }

    const newSource: Source = {
      id: `usr-src-${Date.now()}`,
      name: name.trim(),
      url: url.trim() || 'https://user-submitted.gov.in/gazette',
      domain: derivedDomain || 'user-submitted.org',
      status: isOfficial ? 'verified_official' : 'third_party_advisory',
      ingestedDate: new Date().toISOString().split('T')[0],
      lastUpdatedDate: new Date().toISOString().split('T')[0],
      cycleOrEdition: cycleOrEdition.trim() || '2026 Supplementary Circular',
      isOfficial,
      credibilityScore: isOfficial ? 96 : 68,
      summaryExcerpt: summaryExcerpt.trim(),
      fullContent: fullContent.trim() || summaryExcerpt.trim()
    };

    onAddSource(newSource);
    onClose();
    setName('');
    setUrl('');
    setDomain('');
    setSummaryExcerpt('');
    setFullContent('');
  };

  const handleAutofillRenewalAddendum = () => {
    setName('National Scholarship Cell Addendum No. 12/2026 on Renewal Benchmarks');
    setUrl('https://scholarships.gov.in/notices/2026/renewal-standards');
    setDomain('scholarships.gov.in');
    setCycleOrEdition('2026-2027 Official Addendum');
    setIsOfficial(true);
    setSummaryExcerpt('Continuing recipients must maintain a minimum cumulative CGPA of 3.50 with at least 16 registered laboratory credits per semester to receive Year 2 and Year 3 disbursements.');
    setFullContent('OFFICIAL ADDENDUM: REVISED TENURE AND RENEWAL CRITERIA 2026.\nContinuing scholars under the National Merit Scheme must maintain a minimum semester CGPA of 3.50 on a 4.0 scale. In addition, scholars must complete at least 16 credits of thesis/laboratory coursework annually with zero unexcused backlogs.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-slate-100">
              Ingest Source URL or Document Snippet
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Quick Demo Fill Helper */}
          <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-900/60 p-3 rounded-xl">
            <span className="text-indigo-300 font-medium">
              Want to see a critical information dark spot resolved dynamically?
            </span>
            <button
              type="button"
              onClick={handleAutofillRenewalAddendum}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow"
            >
              Autofill Renewal Addendum
            </button>
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
              Source / Document Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Official Ministry Gazette Notification 2026"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                Source URL
              </label>
              <input
                type="url"
                placeholder="https://official.gov.in/gazette-link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                Cycle or Edition
              </label>
              <input
                type="text"
                placeholder="e.g. 2026-2027 Cycle"
                value={cycleOrEdition}
                onChange={(e) => setCycleOrEdition(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="officialCheck"
              checked={isOfficial}
              onChange={(e) => setIsOfficial(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded bg-slate-950 border-slate-800 focus:ring-indigo-500"
            />
            <label htmlFor="officialCheck" className="text-slate-300 font-medium">
              Mark as Primary Official Authority / Gazette (High Evidence Weight)
            </label>
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
              Key Passage / Extracted Excerpt *
            </label>
            <textarea
              required
              rows={2}
              placeholder="Paste exact excerpt containing key claims or rules..."
              value={summaryExcerpt}
              onChange={(e) => setSummaryExcerpt(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
              Full Text or Document Body (Optional for cross-audit)
            </label>
            <textarea
              rows={3}
              placeholder="Paste full text or circular body..."
              value={fullContent}
              onChange={(e) => setFullContent(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-wide transition-all shadow-md shadow-indigo-600/30"
            >
              Ingest & Re-Audit Dark Spots
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
