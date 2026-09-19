import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import Toast from './components/Toast';
import DashboardPage from './pages/DashboardPage';
import IncidentHistoryPage from './pages/IncidentHistoryPage';
import ReportPage from './pages/ReportPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import LogInput from './components/LogInput';
import ResultCard from './components/ResultCard';
import { analyzeLogs } from './services/analysisService';
import { getStoredHistory, getStoredProfile, getStoredSettings, getStoredUser, saveStoredHistory, saveStoredProfile, saveStoredSettings, saveStoredUser, clearStoredUser } from './utils/storage';
import { useToast } from './hooks/useToast';

const SAMPLE_LOGS = `2026-07-16 10:10:02 Database Connection Timeout
2026-07-16 10:10:05 Payment API Error 500
2026-07-16 10:10:10 CPU Usage 98%
2026-07-16 10:10:20 Server Restarted
2026-07-16 10:10:45 Database Connected Successfully`;

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logs, setLogs] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getStoredUser()));
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { message: toast, type: toastType, showToast } = useToast();
  const [history, setHistory] = useState(getStoredHistory());
  const [profile, setProfile] = useState(getStoredProfile());
  const [settings, setSettings] = useState(getStoredSettings());
  const [user, setUser] = useState(getStoredUser() || { name: '', email: '', loginTime: '' });

  const charCount = useMemo(() => logs.length, [logs]);

  const parseSections = (text) => {
    const sections = {
      summary: '',
      rootCause: '',
      severity: '',
      impact: '',
      recommendations: '',
      report: '',
    };

    const lines = text.split(/\n/).map((line) => line.trim());
    let current = '';

    lines.forEach((line) => {
      if (line.startsWith('Incident Summary:')) {
        current = 'summary';
        sections.summary = line.replace('Incident Summary:', '').trim();
      } else if (line.startsWith('Possible Root Cause:')) {
        current = 'rootCause';
        sections.rootCause = line.replace('Possible Root Cause:', '').trim();
      } else if (line.startsWith('Severity:')) {
        current = 'severity';
        sections.severity = line.replace('Severity:', '').trim();
      } else if (line.startsWith('Business Impact:')) {
        current = 'impact';
        sections.impact = line.replace('Business Impact:', '').trim();
      } else if (line.startsWith('Recommendations:')) {
        current = 'recommendations';
        sections.recommendations = line.replace('Recommendations:', '').trim();
      } else if (line.startsWith('Incident Report:')) {
        current = 'report';
        sections.report = line.replace('Incident Report:', '').trim();
      } else if (current && line) {
        sections[current] += (sections[current] ? '\n' : '') + line;
      }
    });

    return sections;
  };

  useEffect(() => {
    if (location.pathname === '/' && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [location.pathname, isAuthenticated, navigate]);

  useEffect(() => {
    saveStoredHistory(history);
  }, [history]);

  useEffect(() => {
    saveStoredSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (user?.email) {
      saveStoredUser(user);
      saveStoredProfile({ ...profile, email: user.email, name: user.name, loginTime: user.loginTime });
    }
  }, [user, profile]);

  const validateLogin = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (password.trim().length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  };

  const handleLogin = (email, password) => {
    setIsAuthenticating(true);
    setAuthError('');

    setTimeout(() => {
      const validationError = validateLogin(email, password);
      if (validationError) {
        setAuthError(validationError);
        setIsAuthenticating(false);
        return;
      }

      const nextUser = {
        userName: email.split('@')[0],
        email,
        loginTime: new Date().toLocaleString(),
      };

      setUser(nextUser);
      setProfile({ ...getStoredProfile(), name: nextUser.userName, email, loginTime: nextUser.loginTime });
      setIsAuthenticated(true);
      showToast('Login successful.');
      navigate('/dashboard');
      setIsAuthenticating(false);
    }, 700);
  };

  const handleAnalyze = async () => {
    if (!logs.trim()) {
      setError('Please provide incident logs before analyzing.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis('');

    showToast('Analysis started.');

    try {
      const nextAnalysis = await analyzeLogs(logs);
      setAnalysis(nextAnalysis);
      showToast('Analysis completed successfully.');

      if (nextAnalysis) {
        const title = nextAnalysis.split(/\n/)[0]?.replace('Incident Summary:', '').trim() || 'Incident Analysis';
        const severityMatch = nextAnalysis.match(/Severity:\s*(Low|Medium|High|Critical)/i);
        const severity = severityMatch ? severityMatch[1] : 'Medium';
        const summaryLines = nextAnalysis.split(/\n/).filter(Boolean).slice(0, 4).join(' ');
        const reportEntry = {
          id: Date.now(),
          title,
          severity,
          createdAt: new Date().toLocaleString(),
          summary: summaryLines,
          report: nextAnalysis,
        };
        setHistory((prev) => [reportEntry, ...prev]);
      }
    } catch (err) {
      setError(err.message || 'Unexpected error while contacting the analysis service.');
      showToast('Analysis failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(analysis);
      setError('');
      showToast('Report copied to clipboard.');
    } catch {
      setError('Unable to copy the report automatically.');
    }
  };

  const handleClear = () => {
    setLogs('');
    setAnalysis('');
    setError('');
    showToast('Logs cleared.');
  };

  const handleLoadSample = () => {
    setLogs(SAMPLE_LOGS);
    setError('');
    showToast('Sample logs loaded.');
  };

  const sections = useMemo(() => parseSections(analysis), [analysis]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthError('');
    clearStoredUser();
    setUser({ name: '', email: '', loginTime: '' });
    showToast('Logout successful.');
    navigate('/');
  };

  const handleDeleteHistory = (id) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
    showToast('Incident removed from history.');
  };

  const handleExportHistory = () => {
    const serialized = JSON.stringify(history, null, 2);
    const blob = new Blob([serialized], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'incident-history.json';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Incident history exported.');
  };

  const handleSettingsSave = (nextSettings) => {
    setSettings(nextSettings);
    showToast('Settings saved successfully.');
  };

  const handleProfileUpdated = (nextProfile) => {
    setProfile(nextProfile);
    setUser((current) => ({ ...current, name: nextProfile.name, email: nextProfile.email, loginTime: nextProfile.loginTime || current.loginTime }));
    showToast('Profile updated successfully.');
  };

  if (!isAuthenticated) {
    return (
      <>
        <LoginPage onLogin={handleLogin} isAuthenticating={isAuthenticating} error={authError} />
        <Toast message={toast} type={toastType} />
      </>
    );
  }

  return (
    <>
      <Layout darkMode={darkMode} setDarkMode={setDarkMode} onLogout={handleLogout}>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage history={history} analysis={analysis} />} />
          <Route
            path="/analyzer"
            element={
              <div className="space-y-6">
                <section className="rounded-[28px] border border-blue-100 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
                  <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-100">Incident Analyzer</p>
                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Turn noisy logs into a clear incident analysis in seconds.</h2>
                    <p className="mt-4 text-lg text-blue-50">Paste incident logs, review the likely root cause, and share a professional report with your team.</p>
                  </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <LogInput
                    logs={logs}
                    setLogs={setLogs}
                    onAnalyze={handleAnalyze}
                    onLoadSample={handleLoadSample}
                    onClear={handleClear}
                    isLoading={isLoading}
                    charCount={charCount}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                  />

                  <div className="space-y-4">
                    {error && (
                      <div className={`rounded-2xl border px-4 py-3 text-sm ${darkMode ? 'border-rose-800 bg-rose-950/60 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                        {error}
                      </div>
                    )}

                    {isLoading && (
                      <div className={`rounded-3xl border p-6 text-center shadow-lg ${darkMode ? 'border-slate-700 bg-slate-900/80' : 'border-blue-100 bg-white/80'}`}>
                        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                        <p className={`mt-4 text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>The AI is analyzing your incident data...</p>
                      </div>
                    )}

                    {analysis && (
                      <div className="space-y-4">
                        <ResultCard title="Incident Summary" content={sections.summary || 'No summary available.'} darkMode={darkMode} reportText={analysis} onCopy={handleCopy} />
                        <ResultCard title="Possible Root Cause" content={sections.rootCause || 'No root cause available.'} darkMode={darkMode} reportText={analysis} onCopy={handleCopy} />
                        <ResultCard title="Severity" content={sections.severity || 'No severity available.'} darkMode={darkMode} reportText={analysis} onCopy={handleCopy} />
                        <ResultCard title="Business Impact" content={sections.impact || 'No impact analysis available.'} darkMode={darkMode} reportText={analysis} onCopy={handleCopy} />
                        <ResultCard title="Recommendations" content={sections.recommendations || 'No recommendations available.'} darkMode={darkMode} reportText={analysis} onCopy={handleCopy} />
                        <ResultCard title="Incident Report" content={sections.report || 'No incident report available.'} darkMode={darkMode} reportText={analysis} onCopy={handleCopy} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/history" element={<IncidentHistoryPage history={history} onDelete={handleDeleteHistory} onExport={handleExportHistory} />} />
          <Route path="/report" element={<ReportPage analysis={analysis} sections={sections} />} />
          <Route path="/settings" element={<SettingsPage settings={settings} onSave={handleSettingsSave} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage user={{ ...user, analysisCount: history.length, reportCount: history.length }} onProfileUpdated={handleProfileUpdated} onNotify={showToast} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <Toast message={toast} type="success" />
    </>
  );
};

export default App;
