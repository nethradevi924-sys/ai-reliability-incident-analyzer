import React from 'react';
import { Link } from 'react-router-dom';
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import StatsCard from '../components/StatsCard';

const DashboardPage = ({ history, analysis }) => {
  const severityCounts = ['Low', 'Medium', 'High', 'Critical'].map((level) => ({
    name: level,
    value: history.filter((entry) => entry.severity === level).length,
  }));

  const trendData = history.slice(0, 6).reverse().map((entry, index) => ({
    name: `A${index + 1}`,
    incidents: index + 1,
  }));

  const cards = [
    { title: 'Total Incidents', value: history.length, icon: '🚨', accent: 'from-blue-600 to-cyan-500' },
    { title: 'Critical Incidents', value: history.filter((entry) => entry.severity === 'Critical').length, icon: '🔴', accent: 'from-rose-500 to-orange-500' },
    { title: 'AI Analyses', value: history.length + (analysis ? 1 : 0), icon: '🤖', accent: 'from-violet-600 to-indigo-500' },
    { title: 'Reports Generated', value: history.length, icon: '📄', accent: 'from-emerald-600 to-green-500' },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-blue-100 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-100">Operations Pulse</p>
            <h2 className="mt-2 text-3xl font-semibold">Welcome back, reliability engineering team.</h2>
            <p className="mt-3 max-w-2xl text-blue-50">Monitor incidents, accelerate triage, and generate professional executive-ready reports in a single workflow.</p>
          </div>
          <Link to="/analyzer" className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/30">
            Open Incident Analyzer
          </Link>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatsCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[28px] border border-blue-100 bg-white/80 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Incident Severity</h3>
            <span className="text-sm text-slate-500">Live breakdown</span>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={severityCounts} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  <Cell fill="#2563eb" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#f97316" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[28px] border border-blue-100 bg-white/80 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Incident Trend</h3>
            <span className="text-sm text-slate-500">Recent analysis volume</span>
          </div>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData.length ? trendData : [{ name: 'A1', incidents: 0 }] }>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="incidents" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-blue-100 bg-white/80 p-6 shadow-lg">
          <h3 className="text-xl font-semibold">Recent Activity</h3>
          <div className="mt-4 space-y-3">
            {history.length === 0 ? <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">No activity yet. Run an analysis to populate the dashboard.</div> : history.slice(0, 4).map((entry) => (
              <div key={entry.id} className="flex items-start justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-800">{entry.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{entry.summary}</p>
                </div>
                <span className="text-sm font-medium text-slate-500">{entry.createdAt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-blue-100 bg-white/80 p-6 shadow-lg">
          <h3 className="text-xl font-semibold">Latest Reports</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            {history.length === 0 ? <div className="rounded-2xl bg-slate-50 p-3">Reports will appear here after each analysis.</div> : history.slice(0, 3).map((entry) => (
              <div key={entry.id} className="rounded-2xl bg-blue-50 p-3">
                <p className="font-semibold text-slate-800">{entry.title}</p>
                <p className="mt-1">{entry.report.slice(0, 80)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
