
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PatientNavbar = ({ lang, setLang }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const navItems = [
    {
      label: lang === 'EN' ? 'Welcome' : 'Karibu',
      path: '/',
    },
    {
      label: lang === 'EN' ? 'AI Assistant' : 'Msaidizi wa AI',
      path: '/ai-assistant',
    },
    {
      label: lang === 'EN' ? 'Sign Language (KSL)' : 'Lugha ya Alama',
      path: '/ksl',
    },
    {
      label: lang === 'EN' ? 'Appointments' : 'Miadi',
      path: '/appointments',
    },
    {
      label: lang === 'EN' ? 'Queue & Journey' : 'Foleni na Safari',
      path: '/queue',
    },
  ];

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header
      className={`w-full border-b ${
        highContrast
          ? 'bg-black text-white border-gray-700'
          : 'bg-white text-slate-900 border-slate-200'
      }`}
    >
      {/* TOP HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">

        {/* LOGO AND BRAND */}
        <div className="flex items-center gap-3 shrink-0">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-700 text-sm font-bold text-white">
            AF
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight">
                AfyaFlow
              </h1>

              <span className="rounded-full bg-teal-50 px-2 py-1 text-[10px] font-semibold text-teal-700">
                /patient
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Patient Portal • Mobile-First
            </p>
          </div>
        </div>

        {/* ACCESSIBILITY AND ACCOUNT CONTROLS */}
        <div className="flex flex-wrap items-center gap-2">

          {/* LANGUAGE SELECTOR */}
          <div className="flex items-center rounded-xl border border-slate-200 p-1">

            <button
              type="button"
              onClick={() => setLang('EN')}
              aria-pressed={lang === 'EN'}
              className={`rounded-lg px-3 py-3 text-xs font-semibold transition ${
                lang === 'EN'
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => setLang('SW')}
              aria-pressed={lang === 'SW'}
              className={`rounded-lg px-3 py-3 text-xs font-semibold transition ${
                lang === 'SW'
                  ? 'bg-teal-700 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              SW
            </button>

          </div>

          {/* HIGH CONTRAST */}
          <button
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            aria-pressed={highContrast}
            className="rounded-xl border border-slate-200 px-3 py-3 text-xs font-semibold transition hover:bg-slate-100"
          >
            Contrast
          </button>

          {/* LARGE TEXT */}
          <button
            type="button"
            onClick={() => setLargeText(!largeText)}
            aria-pressed={largeText}
            className={`rounded-xl border px-3 py-3 text-xs font-semibold transition ${
              largeText
                ? 'bg-teal-700 text-white border-teal-700'
                : 'border-slate-200 hover:bg-slate-100'
            }`}
          >
            A+
          </button>

          {/* PATIENT LOGIN */}
          <button
            type="button"
            onClick={handleLogin}
            className="rounded-xl bg-teal-700 px-4 py-3 text-xs font-semibold text-white transition hover:bg-teal-800"
          >
            {lang === 'EN'
              ? 'Patient Login / Register'
              : 'Ingia / Jisajili'}
          </button>

        </div>
      </div>

      {/* NAVIGATION TABS */}
      <nav className="flex gap-2 overflow-x-auto px-6 pb-3">

        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              aria-current={isActive ? 'page' : undefined}
              className={`shrink-0 rounded-xl px-4 py-3 text-xs font-semibold transition ${
                isActive
                  ? 'bg-[#1d3157] text-white'
                  : highContrast
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {index + 1}. {item.label}
            </button>
          );
        })}

      </nav>
    </header>
  );
};

export default PatientNavbar;
