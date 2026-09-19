import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: '📊' },
  { label: 'Incident Analyzer', path: '/analyzer', icon: '🧠' },
  { label: 'Incident History', path: '/history', icon: '🗂️' },
  { label: 'Reports', path: '/report', icon: '📄' },
  { label: 'Profile', path: '/profile', icon: '👤' },
  { label: 'Settings', path: '/settings', icon: '⚙️' },
  { label: 'About', path: '/about', icon: 'ℹ️' },
];

const Layout = ({ children, darkMode, setDarkMode, onLogout }) => {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <div className={`${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} min-h-screen`}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className={`${darkMode ? 'border-slate-800 bg-slate-900/95' : 'border-blue-100 bg-white/90'} w-full border-b px-4 py-4 lg:w-72 lg:border-b-0 lg:border-r lg:px-6 lg:py-6`}>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-xl font-semibold text-white shadow-lg">
              AI
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">SRE Console</p>
              <h2 className="text-lg font-semibold">Reliability AI</h2>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${activePath === item.path ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700') : (darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100')}`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={`mt-8 rounded-3xl border p-4 ${darkMode ? 'border-slate-800 bg-slate-800/70' : 'border-blue-100 bg-blue-50'}`}>
            <p className="text-sm font-semibold">Enterprise-ready</p>
            <p className={`mt-1 text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Streamline incidents, reports, and RCA workflows in one command center.
            </p>
          </div>
        </aside>

        <div className="flex-1">
          <header className={`${darkMode ? 'border-slate-800 bg-slate-900/80' : 'border-blue-100 bg-white/80'} sticky top-0 z-20 border-b px-4 py-4 backdrop-blur sm:px-6 lg:px-8`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">AI Reliability Incident & Root Cause Analyzer</p>
                <h1 className="text-2xl font-semibold">Operations Command Center</h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDarkMode((value) => !value)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${darkMode ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                >
                  {darkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
                <button
                  onClick={onLogout}
                  className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
