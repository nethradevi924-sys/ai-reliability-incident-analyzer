import React from 'react';
import jsPDF from 'jspdf';

const ResultCard = ({ title, content, darkMode, reportText, onCopy }) => {
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(reportText || content, 180);
    doc.text(lines, 10, 10);
    doc.save('incident-report.pdf');
  };

  return (
    <div className={`rounded-3xl border p-6 shadow-lg ${darkMode ? 'border-slate-700 bg-slate-900/80 text-slate-100' : 'border-blue-100 bg-white/80 text-slate-900'}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {title === 'Incident Report' && (
          <div className="flex gap-2">
            <button
              onClick={onCopy}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${darkMode ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
            >
              Copy Report
            </button>
            <button
              onClick={handleDownloadPdf}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${darkMode ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
      <div className={`mt-4 whitespace-pre-wrap text-sm leading-7 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
        {content}
      </div>
    </div>
  );
};

export default ResultCard;
