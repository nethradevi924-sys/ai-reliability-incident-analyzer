import React from 'react';

const Toast = ({ message, type = 'success' }) => {
  if (!message) return null;

  const styles = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    error: 'border-rose-200 bg-rose-50 text-rose-700',
  };

  return (
    <div className={`fixed right-4 top-4 z-50 rounded-2xl border px-4 py-3 shadow-xl ${styles[type]}`}>
      {message}
    </div>
  );
};

export default Toast;
