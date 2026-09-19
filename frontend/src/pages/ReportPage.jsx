import React from 'react';
import jsPDF from 'jspdf';

const ReportPage = ({ analysis, sections }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(analysis || 'No analysis available.');
    } catch {
      // ignore clipboard errors
    }
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('AI Reliability Incident Report', 10, 10);
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(analysis || 'No analysis available.', 180);
    doc.text(lines, 10, 24);
    doc.save('incident-report.pdf');
  };

  const handlePrint = () => window.print();

  const shareReport = () => {
    if (navigator.share) {
      navigator.share({ title: 'Incident Report', text: analysis || 'No analysis available.' });
    }
  };

  return (
    <div className="rounded-[28px] border border-blue-100 bg-white/80 p-6 shadow-lg backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Professional Report</p>
          <h2 className="mt-2 text-2xl font-semibold">Executive incident review</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleDownloadPdf} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Download PDF</button>
          <button onClick={handleCopy} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Copy</button>
          <button onClick={handlePrint} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Print</button>
          <button onClick={shareReport} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Share</button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-800">Executive Summary</h3>
          <p className="mt-2 text-sm text-slate-600">{sections.summary || 'No summary available.'}</p>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="font-semibold text-slate-800">Incident Timeline</h3>
          <p className="mt-2 text-sm text-slate-600">{analysis || 'No timeline available.'}</p>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="font-semibold text-slate-800">Root Cause</h3>
          <p className="mt-2 text-sm text-slate-600">{sections.rootCause || 'No root cause available.'}</p>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="font-semibold text-slate-800">Business Impact</h3>
          <p className="mt-2 text-sm text-slate-600">{sections.impact || 'No impact reported.'}</p>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="font-semibold text-slate-800">Recommendations</h3>
          <p className="mt-2 text-sm text-slate-600">{sections.recommendations || 'No recommendations available.'}</p>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="font-semibold text-slate-800">Engineer Notes</h3>
          <p className="mt-2 text-sm text-slate-600">{sections.report || 'No engineer notes available.'}</p>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-4">
          <h3 className="font-semibold text-slate-800">Conclusion</h3>
          <p className="mt-2 text-sm text-slate-600">The incident should be treated as a high-priority reliability event until the preventive recommendations are implemented.</p>
        </section>
      </div>
    </div>
  );
};

export default ReportPage;
