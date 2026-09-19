export const analyzeLogs = async (logs) => {
  const response = await fetch('http://localhost:5000/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ logs }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Analysis request failed.');
  }

  return data.analysis || '';
};
