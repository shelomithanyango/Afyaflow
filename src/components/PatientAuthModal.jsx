import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function PatientAuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [shaNumber, setShaNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-teal-700 font-semibold text-xs uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          Patient Portal Access
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          {mode === 'login' ? 'Sign In to AfyaFlow' : 'Register Patient Profile'}
        </h2>

        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 text-xs font-semibold rounded-lg transition ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Patient Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 text-xs font-semibold rounded-lg transition ${
              mode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Register Patient
          </button>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-sm font-medium text-center">
            Karibu! Authenticated as {fullName || 'Mary Wanjiku'}.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mary Wanjiku"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number (Kenya)
              </label>
              <input
                type="tel"
                required
                placeholder="+254 712 345 678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600"
              />
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  SHA / NHIF Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="SHA-2026-XXXX"
                  value={shaNumber}
                  onChange={(e) => setShaNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition"
            >
              {mode === 'login' ? 'Continue to Patient Portal' : 'Create Patient Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}