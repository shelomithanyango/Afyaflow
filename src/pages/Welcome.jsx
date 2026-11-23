import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mic, Hand, ClipboardList } from 'lucide-react';
import PatientNavbar from '../components/PatientNavbar';
import PatientAuthModal from '../components/PatientAuthModal';
import EmergencyNotice from '../components/EmergencyNotice';

export default function Welcome() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('EN');
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
   <div className="min-h-screen bg-slate-50 text-slate-900">

  {/* Patient Navigation */}
  <PatientNavbar lang={lang} setLang={setLang} />

  {/* Emergency Warning */}
  <EmergencyNotice />

  {/* Main Welcome Content */}
  <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Patient Navigation */} 
        {/* Hero Card */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs">

                  

{/* Top information bar */}
<div className="w-full flex items-center justify-between gap-3 mb-8">

  {/* Left badge */}
  <div className="inline-flex items-center rounded-full bg-[#e5f4f1] px-3 py-1 text-xs font-semibold text-gray-700">
    Multimodal AI Patient Portal • Kenya
  </div>

  {/* Right badge */}
  <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-medium text-orange-600">
    <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
    Simulated Voice &amp; KSL Engine
  </div>

</div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-teal-700 tracking-tight mb-3">
            {lang === 'EN'
              ? 'Healthcare , understood your way'
              : 'Huduma za Hospitali Zinazofikika kwa Urahisi na AI nchini Kenya'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
            AfyaFlow connects patients, clinicians, laboratories, pharmacies, and hospital
            administrators in Kenya through voice, Kenyan Sign Language (KSL), and text AI—with
            strict role-based security and real-time queue transparency.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openAuth('register')}
              className="px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition shadow-xs"
            >
              Get Started (Register / Sign In)
            </button>

            <button
              type="button"
              onClick={() => navigate('/ai-assistant')}
              className="px-5 py-3 rounded-xl bg-[#111c35] hover:bg-slate-800 text-white font-semibold text-sm transition shadow-xs flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              Talk to AfyaFlow AI
            </button>

            <button
              type="button"
              onClick={() => navigate('/ksl')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-teal-50 text-teal-700 border border-teal-600 font-semibold text-sm transition"
            >
              KSL Assistant
            </button>
          </div>
        </section>

        {/* 3 Modality Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Voice */}
          <div
            onClick={() => navigate('/ai-assistant')}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs hover:border-teal-400 transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Mic className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#111c35] mb-2">Voice Interaction[cite: 2]</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Speak naturally via push-to-talk in English or Kiswahili. Review and edit live
              speech-to-text before submitting.
            </p>
          </div>

          {/* Card 2: KSL */}
          <div
            onClick={() => navigate('/ksl')}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs hover:border-teal-400 transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <Hand className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#111c35] mb-2">
              Kenyan Sign Language (KSL)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Deaf and hard-of-hearing patients communicate via permission-gated camera sign
              recognition with text &amp; voice feedback.
            </p>
          </div>

          {/* Card 3: Text & Guided Workflows */}
          <div
            onClick={() => navigate('/appointments')}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs hover:border-teal-400 transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
              <ClipboardList className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-[#111c35] mb-2">
              Text &amp; Guided Workflows
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Accessible chat, appointment booking, walk-in requests, and real-time department
              queue tracking.
            </p>
          </div>
        </section>

        {/* Bottom Patient Profile CTA Banner */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div>
            <h3 className="text-base font-bold text-[#111c35]">
              Patient Profile, Appointments &amp; Queue Tracking
            </h3>
            <p className="text-sm text-slate-600 mt-0.5">
              Create a patient account or sign in to book appointments, request walk-in care, and
              track your visit live.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openAuth('login')}
              className="px-4 py-2.5 rounded-xl border border-teal-600 text-teal-700 hover:bg-teal-50 font-semibold text-sm transition"
            >
              Patient Sign In
            </button>
            <button
              type="button"
              onClick={() => openAuth('register')}
              className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition"
            >
              Register Patient
            </button>
          </div>
        </section>
      </main>

      <PatientAuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}