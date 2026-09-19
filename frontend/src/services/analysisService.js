const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

export const analyzeLogs = async (logs) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ logs }),
    });
  } catch {
    throw new Error(`Unable to reach the analysis service at ${API_BASE_URL}.`);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Analysis request failed.');
  }

  return data.analysis || '';
};
