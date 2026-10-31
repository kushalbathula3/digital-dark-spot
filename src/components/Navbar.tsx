import React from 'react';
import { ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenNewModal: () => void;
  activePresetTitle?: string;
  sourceCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNewModal, activePresetTitle, sourceCount }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Identity */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 shadow-lg shadow-indigo-500/20">
            <ShieldAlert className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-200">
                DIGITAL DARK SPOT
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                AI Gap Engine 2.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Information Gap & Contradiction Detection Platform
            </p>
          </div>
        </div>

        {/* Center Active Context indicator */}
        <div className="hidden md:flex items-center space-x-2 text-xs font-medium text-slate-400 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-slate-300 truncate max-w-xs">{activePresetTitle || 'Custom Investigation'}</span>
          <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[11px] font-mono">
            {sourceCount} {sourceCount === 1 ? 'source' : 'sources'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenNewModal}
            className="flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 shadow-md shadow-indigo-600/30 hover:shadow-indigo-500/50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Add Custom Source</span>
          </button>
        </div>
      </div>
    </header>
  );
};
