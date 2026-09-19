export const loadJson = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch {
    return fallback;
  }
};

export const saveJson = (key, value) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in restricted environments.
  }
};

export const removeJson = (key) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage errors in restricted environments.
  }
};

export const getStoredUser = () => loadJson('ai-reliability-user', null);
export const saveStoredUser = (user) => saveJson('ai-reliability-user', user);
export const clearStoredUser = () => removeJson('ai-reliability-user');

export const getStoredSettings = () => loadJson('ai-reliability-settings', {
  appearance: 'system',
  notifications: { email: true, browser: true },
  application: { autoSave: true, autoDownloadReports: false, language: 'English' },
  security: { password: '', logoutAllDevices: false },
  aiModel: 'Gemini 2.5 Flash',
});

export const saveStoredSettings = (settings) => saveJson('ai-reliability-settings', settings);
export const getStoredHistory = () => loadJson('ai-reliability-history', []);
export const saveStoredHistory = (history) => saveJson('ai-reliability-history', history);
export const getStoredProfile = () => loadJson('ai-reliability-profile', { name: '', email: '', avatar: '', loginTime: '' });
export const saveStoredProfile = (profile) => saveJson('ai-reliability-profile', profile);
