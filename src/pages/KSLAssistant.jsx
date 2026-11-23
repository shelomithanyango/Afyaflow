import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, RotateCcw, Volume2, CheckCircle2 } from 'lucide-react';
import PatientNavbar from '../components/PatientNavbar';

const SAMPLE_KSL_PHRASES = [
  'I cannot hear well and need help checking into the clinic for a headache.',
  'I have an appointment at the Pharmacy and need sign language support.',
  'Please direct me to the Outpatient Triage desk.',
];

export default function KSLAssistant() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('EN');
  const [isSigning, setIsSigning] = useState(false);
  const [kslText, setKslText] = useState(
    'I cannot hear well and need help checking into the clinic for a headache.'
  );
  const [routed, setRouted] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleStartSigning = () => {
    setIsSigning(true);
    setRouted(false);
    setTimeout(() => {
      setIsSigning(false);
      const nextPhrase =
        SAMPLE_KSL_PHRASES[Math.floor(Math.random() * SAMPLE_KSL_PHRASES.length)];
      setKslText(nextPhrase);
    }, 1800);
  };

  const handleSpeakResponse = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        'Karibu! Your request to check in for a headache has been noted. Please tap Confirm and Route to Desk to notify our desk.'
      );
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-10">
      <PatientNavbar lang={lang} setLang={setLang} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-5">
          {/* Camera Recognition Viewport */}
          <div className="relative h-64 sm:h-72 rounded-2xl bg-[#0b1326] text-white flex flex-col items-center justify-center overflow-hidden border border-slate-800">
            {isSigning ? (
              <div className="text-center space-y-2 animate-pulse">
                <Camera className="w-10 h-10 text-teal-400 mx-auto" />
                <p className="text-sm font-semibold text-teal-300">
                  Tracking KSL Hand &amp; Facial Gestures...
                </p>
                <p className="text-xs text-slate-400">Keep hands within the frame</p>
              </div>
            ) : (
              <div className="text-center space-y-2 px-4">
                <div className="w-12 h-12 rounded-full bg-slate-800/90 flex items-center justify-center mx-auto text-teal-400">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-200">
                  KSL Camera Feed Ready (Permission-Gated)
                </p>
                <p className="text-xs text-slate-400">
                  Tap &ldquo;Start Signing&rdquo; below to capture Kenyan Sign Language gestures
                </p>
              </div>
            )}

            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700 text-[11px] font-semibold text-teal-300">
              KSL Vision • v2.4
            </span>
          </div>

          {/* Primary Camera Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handleStartSigning}
              disabled={isSigning}
              className="flex-1 py-3 px-5 rounded-xl bg-teal-600/80 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold text-sm transition shadow-2xs"
            >
              {isSigning ? 'Capturing KSL Signs...' : 'Start Signing'}
            </button>

            <button
              type="button"
              onClick={() => {
                setKslText('');
                setRouted(false);
              }}
              className="py-3 px-5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Re-Record[cite: 4]
            </button>
          </div>

          {/* Interpreted Text Editor */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Interpreted KSL Text (Editable)[cite: 4]
            </label>
            <textarea
              rows={3}
              value={kslText}
              onChange={(e) => setKslText(e.target.value)}
              placeholder="Signed interpretation will appear here..."
              className="w-full p-3.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-hidden focus:border-teal-600"
            />
          </div>

          {/* Confirm & Route Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => setRouted(true)}
              className="flex-1 py-3 px-5 rounded-xl bg-[#00a859] hover:bg-[#008f4c] text-white font-semibold text-sm transition shadow-2xs"
            >
              Confirm &amp; Route to Desk[cite: 4]
            </button>

            <button
              type="button"
              onClick={() => {
                setSavedNotice(true);
                setTimeout(() => setSavedNotice(false), 2000);
              }}
              className="py-3 px-5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm transition"
            >
              {savedNotice ? 'Correction Saved ✓' : 'Save Correction'}
            </button>
          </div>

          {routed && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-semibold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Routed to Reception Desk with KSL Interpreter Flag!
              </span>
              <button
                type="button"
                onClick={() => navigate('/queue')}
                className="text-xs font-bold text-emerald-800 underline shrink-0"
              >
                Track Queue →
              </button>
            </div>
          )}

          {/* AfyaFlow Response Box */}
          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-800">
                AfyaFlow Response (Text &amp; Speech)[cite: 4]
              </span>
              <button
                type="button"
                onClick={handleSpeakResponse}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-teal-50 border border-teal-300 text-teal-700 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Speak[cite: 4]
              </button>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Karibu! Your request to check in for a headache has been noted. Please tap
              &ldquo;Confirm &amp; Route to Desk&rdquo; to notify our desk[cite: 4].
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}