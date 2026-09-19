import React from 'react';

const LogInput = ({ logs, setLogs, onAnalyze, onLoadSample, onClear, isLoading, charCount, darkMode, setDarkMode, onFileUpload }) => {
  return (
    <div className={`rounded-3xl border ${darkMode ? 'border-slate-700 bg-slate-900/80 text-slate-100' : 'border-blue-100 bg-white/80 text-slate-900'} p-6 shadow-xl backdrop-blur`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Incident Logs</h2>
          <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Paste system logs or upload .log, .txt, or .csv files to generate a root cause analysis.
          </p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`rounded-full px-3 py-2 text-sm font-medium transition ${darkMode ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <textarea
        value={logs}
        onChange={(e) => setLogs(e.target.value)}
        placeholder="Paste your logs here..."
        className={`mt-5 min-h-[280px] w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${darkMode ? 'border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500' : 'border-blue-100 bg-slate-50 text-slate-900 placeholder:text-slate-400'}`}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <label className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition ${darkMode ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
          Upload File
          <input type="file" accept=".log,.txt,.csv" className="hidden" onChange={onFileUpload} />
        </label>
        <button onClick={onLoadSample} className={`rounded-full px-4 py-2 text-sm font-medium transition ${darkMode ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
          Load Sample Logs
        </button>
        <button onClick={onClear} className={`rounded-full px-4 py-2 text-sm font-medium transition ${darkMode ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
          Clear Logs
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{charCount} characters</span>
        <button
          onClick={onAnalyze}
          disabled={isLoading || !logs.trim()}
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Incident'}
        </button>
      </div>
    </div>
  );
};

export default LogInput;
