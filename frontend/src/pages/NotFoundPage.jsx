import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-[28px] border border-blue-100 bg-white/80 p-8 text-center shadow-lg">
    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">404</p>
    <h2 className="mt-3 text-3xl font-semibold">Page not found</h2>
    <p className="mt-3 max-w-lg text-slate-600">The requested route could not be found. Return to the dashboard to continue your workflow.</p>
    <Link to="/dashboard" className="mt-6 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Go to Dashboard</Link>
  </div>
);

export default NotFoundPage;
