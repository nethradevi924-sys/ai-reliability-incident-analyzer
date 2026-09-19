import React from 'react';

const Navbar = ({ darkMode }) => {
  return (
    <header className={`sticky top-0 z-20 border-b ${darkMode ? 'border-slate-800 bg-slate-950/90 text-slate-100' : 'border-blue-100 bg-white/80 text-slate-900'} backdrop-blur`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">AI Reliability Suite</p>
          <h1 className="text-xl font-bold">AI Reliability Incident & Root Cause Analyzer</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
          <span>⚡</span>
          <span>Live Incident Analysis</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
