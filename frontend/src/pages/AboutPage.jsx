import React from 'react';

const sections = [
  { title: 'Project Description', content: 'A modern incident intelligence platform built for Site Reliability Engineers to investigate service issues, accelerate root cause analysis, and export executive-ready reports.' },
  { title: 'Problem Statement', content: 'Modern distributed systems generate high-volume logs and alerts, making manual incident triage slow and error-prone.' },
  { title: 'Objectives', content: 'Reduce triage time, improve consistency, and provide a shared operational view for production incidents.' },
  { title: 'Technology Stack', content: 'React, Vite, Tailwind CSS, React Router, Recharts, Flask, and Gemini-powered analysis.' },
  { title: 'Workflow', content: 'Upload logs, analyze, view structured findings, save history, export reports, and tune workspace preferences.' },
  { title: 'Future Scope', content: 'Expand with alert integrations, Slack/Teams workflows, postmortem templates, and deeper incident correlation dashboards.' },
];

const AboutPage = () => (
  <div className="space-y-6">
    <div className="rounded-[28px] border border-blue-100 bg-white/80 p-6 shadow-lg backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">About the Platform</p>
      <h2 className="mt-2 text-2xl font-semibold">A professional AI workspace for reliability operations</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">The platform is designed to help SRE teams move from noisy logs to actionable, structured incident insights in minutes.</p>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      {sections.map((section) => (
        <div key={section.title} className="rounded-[24px] border border-blue-100 bg-white/80 p-5 shadow-lg">
          <h3 className="font-semibold text-slate-800">{section.title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">{section.content}</p>
        </div>
      ))}
    </div>

    <div className="rounded-[24px] border border-blue-100 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 text-white shadow-lg">
      <h3 className="text-xl font-semibold">Developer Information</h3>
      <p className="mt-2 text-sm text-blue-50">Built as a full-stack React + Flask application focused on enterprise-ready incident investigation, polished UX, and hackathon-ready functionality.</p>
    </div>
  </div>
);

export default AboutPage;
