import React, { useState } from 'react';

const defaultSettings = {
  appearance: 'system',
  notifications: { email: true, browser: true },
  application: { autoSave: true, autoDownloadReports: false, language: 'English' },
  security: { password: '', logoutAllDevices: false },
  aiModel: 'Gemini 2.5 Flash',
};

const SettingsPage = ({ settings = defaultSettings, onSave }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = (event) => {
    event.preventDefault();
    onSave?.(localSettings);
  };

  const updateSection = (section, value) => {
    setLocalSettings((current) => ({ ...current, [section]: value }));
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="rounded-[28px] border border-blue-100 bg-white/80 p-6 shadow-lg backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Settings</p>
        <h2 className="mt-2 text-2xl font-semibold">Configure your incident workspace</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-800">Appearance</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <label className="flex items-center gap-2"><input type="radio" name="appearance" checked={localSettings.appearance === 'light'} onChange={() => updateSection('appearance', 'light')} /> Light Mode</label>
              <label className="flex items-center gap-2"><input type="radio" name="appearance" checked={localSettings.appearance === 'dark'} onChange={() => updateSection('appearance', 'dark')} /> Dark Mode</label>
              <label className="flex items-center gap-2"><input type="radio" name="appearance" checked={localSettings.appearance === 'system'} onChange={() => updateSection('appearance', 'system')} /> System Theme</label>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-800">Notifications</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <label className="flex items-center gap-2"><input type="checkbox" checked={localSettings.notifications.email} onChange={() => updateSection('notifications', { ...localSettings.notifications, email: !localSettings.notifications.email })} /> Email Notifications</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={localSettings.notifications.browser} onChange={() => updateSection('notifications', { ...localSettings.notifications, browser: !localSettings.notifications.browser })} /> Browser Notifications</label>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-800">Application</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <label className="flex items-center gap-2"><input type="checkbox" checked={localSettings.application.autoSave} onChange={() => updateSection('application', { ...localSettings.application, autoSave: !localSettings.application.autoSave })} /> Auto Save</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={localSettings.application.autoDownloadReports} onChange={() => updateSection('application', { ...localSettings.application, autoDownloadReports: !localSettings.application.autoDownloadReports })} /> Auto Download Reports</label>
              <select value={localSettings.application.language} onChange={(e) => updateSection('application', { ...localSettings.application, language: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-800">Security</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <input type="password" value={localSettings.security.password} onChange={(e) => updateSection('security', { ...localSettings.security, password: e.target.value })} placeholder="Change Password" className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2" />
              <label className="flex items-center gap-2"><input type="checkbox" checked={localSettings.security.logoutAllDevices} onChange={() => updateSection('security', { ...localSettings.security, logoutAllDevices: !localSettings.security.logoutAllDevices })} /> Logout All Devices</label>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
            <h3 className="font-semibold text-slate-800">AI Settings</h3>
            <select value={localSettings.aiModel} onChange={(e) => updateSection('aiModel', e.target.value)} className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <option>Gemini 2.5 Flash</option>
              <option>Gemini 2.5 Pro</option>
              <option>GPT</option>
              <option>Claude</option>
            </select>
          </div>
        </div>

        <button type="submit" className="mt-6 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Save Settings</button>
      </div>
    </form>
  );
};

export default SettingsPage;
