import React from 'react';

const PageHeader = ({ eyebrow, title, description, actions }) => (
  <div className="flex flex-col gap-4 rounded-[28px] border border-blue-100 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 text-white shadow-xl md:flex-row md:items-end md:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-100">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 max-w-2xl text-sm text-blue-50 sm:text-base">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export default PageHeader;
