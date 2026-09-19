import React from 'react';

const severityStyles = {
  Low: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-orange-100 text-orange-700',
  Critical: 'bg-rose-100 text-rose-700',
};

const severityIcons = {
  Low: '🟢',
  Medium: '🟡',
  High: '🟠',
  Critical: '🔴',
};

const SeverityBadge = ({ severity }) => {
  const normalized = severity || 'Medium';
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${severityStyles[normalized] || severityStyles.Medium}`}>
      <span>{severityIcons[normalized] || '🟡'}</span>
      {normalized}
    </span>
  );
};

export default SeverityBadge;
