import React from 'react';

const StatsCard = ({ title, value, icon, accentClass }) => (
  <div className="rounded-[24px] border border-blue-100 bg-white/80 p-5 shadow-lg backdrop-blur">
    <div className={`inline-flex rounded-2xl bg-gradient-to-r ${accentClass} px-3 py-2 text-xl text-white`}>{icon}</div>
    <p className="mt-4 text-sm font-medium text-slate-500">{title}</p>
    <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
  </div>
);

export default StatsCard;
