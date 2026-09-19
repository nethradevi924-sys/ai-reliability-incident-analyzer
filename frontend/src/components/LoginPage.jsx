import React, { useState } from 'react';

const LoginPage = ({ onLogin, isAuthenticating, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_35%),linear-gradient(135deg,_#eff6ff_0%,_#f8fbff_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[32px] border border-blue-100 bg-white/80 shadow-2xl backdrop-blur xl:flex-row">
        <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-8 text-white sm:p-10 lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-100">Enterprise Reliability Platform</p>
            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Analyze incidents with clarity, speed, and confidence.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-blue-50">
              Securely review system health, investigate root causes, and produce executive-ready incident reports in minutes.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">🛡️</div>
              <div>
                <h2 className="font-semibold">Trusted by modern SRE teams</h2>
                <p className="text-sm text-blue-50">Fast triage, guided reports, and structured postmortems.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Welcome back</p>
              <h2 className="mt-2 text-3xl font-bold">Sign in to your workspace</h2>
              <p className="mt-2 text-sm text-slate-600">Enter a valid email and a password of at least 6 characters to open the demo workspace.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
                  Keep me signed in
                </label>
                <span className="font-medium text-slate-400">Demo access</span>
              </div>

              {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isAuthenticating ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-blue-700">Local demo workspace</p>
              <p className="mt-1">This demo validates the form locally. Profile and session details are stored in your browser.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
