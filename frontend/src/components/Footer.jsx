import React from 'react';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`mt-10 border-t px-4 py-6 text-center text-sm ${darkMode ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-blue-100 bg-white text-slate-600'}`}>
      Built for rapid incident triage, root cause analysis, and engineering communication.
    </footer>
  );
};

export default Footer;
