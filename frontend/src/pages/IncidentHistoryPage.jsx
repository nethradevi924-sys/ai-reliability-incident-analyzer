import React, { useMemo, useState } from 'react';
import jsPDF from 'jspdf';
import SeverityBadge from '../components/SeverityBadge';

const IncidentHistoryPage = ({ history, onDelete, onExport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const filteredHistory = useMemo(() => {
    const items = [...history]
      .filter((entry) => (severityFilter === 'All' ? true : entry.severity === severityFilter))
      .filter((entry) => entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || entry.severity.toLowerCase().includes(searchTerm.toLowerCase()) || entry.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'severity') return a.severity.localeCompare(b.severity);
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

    return items;
  }, [history, searchTerm, sortBy, severityFilter]);

  const exportCsv = () => {
    const rows = [['Date', 'Incident Name', 'Severity', 'Summary']].concat(history.map((entry) => [entry.createdAt, entry.title, entry.severity, entry.summary]));
    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'incident-history.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPdf = (entry) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(entry.title, 10, 10);
    doc.setFontSize(11);
    doc.text(`Severity: ${entry.severity}`, 10, 22);
    doc.text(`Date: ${entry.createdAt}`, 10, 32);
    const lines = doc.splitTextToSize(entry.report || entry.summary, 180);
    doc.text(lines, 10, 42);
    doc.save(`${entry.title}.pdf`);
  };

  const clearAll = () => {
    if (window.confirm('Delete all saved analyses?')) {
      history.forEach((entry) => onDelete(entry.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-blue-100 bg-white/80 p-6 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Incident History</p>
            <h2 className="mt-2 text-2xl font-semibold">Saved analyses and reports</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search incidents" className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none">
              <option value="date">Sort by Date</option>
              <option value="severity">Sort by Severity</option>
            </select>
            <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none">
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            <button onClick={onExport} className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Export JSON</button>
            <button onClick={exportCsv} className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Export CSV</button>
            <button onClick={clearAll} className="rounded-2xl bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">Delete All</button>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Incident Name</th>
                <th className="px-4 py-3 font-semibold">Severity</th>
                <th className="px-4 py-3 font-semibold">Summary</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center text-slate-500">No incidents saved yet.</td>
                </tr>
              ) : (
                filteredHistory.map((entry) => (
                  <tr key={entry.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">{entry.createdAt}</td>
                    <td className="px-4 py-3 font-medium">{entry.title}</td>
                    <td className="px-4 py-3"><SeverityBadge severity={entry.severity} /></td>
                    <td className="px-4 py-3 text-slate-600">{entry.summary}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => setSelectedEntry(entry)} className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">View</button>
                        <button onClick={() => downloadPdf(entry)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">PDF</button>
                        <button onClick={() => onDelete(entry.id)} className="rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-700">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEntry && (
        <div className="rounded-[28px] border border-blue-100 bg-white/80 p-6 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold">{selectedEntry.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{selectedEntry.summary}</p>
            </div>
            <button onClick={() => setSelectedEntry(null)} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">Close</button>
          </div>
          <div className="mt-4 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{selectedEntry.report}</div>
        </div>
      )}
    </div>
  );
};

export default IncidentHistoryPage;
