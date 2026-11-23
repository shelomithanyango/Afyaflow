import React, { useState } from 'react';
import { Clock, CheckCircle2, Circle, MapPin } from 'lucide-react';
import PatientNavbar from '../components/PatientNavbar';

const JOURNEY_STEPS = [
  {
    step: '1. Reception & Check-In',
    detail: 'Verified SHA/Patient ID & KSL preference logged',
    status: 'completed',
    time: '08:10 AM',
  },
  {
    step: '2. Nursing Triage (Room 2)',
    detail: 'Vitals recorded (BP, Temp, Pulse)',
    status: 'completed',
    time: '08:22 AM',
  },
  {
    step: '3. General Outpatient Doctor (Room 5)',
    detail: '2 patients ahead of you • Est. 12 mins',
    status: 'current',
    time: 'In Queue',
  },
  {
    step: '4. Laboratory / Pharmacy Dispatch',
    detail: 'Pending clinician orders',
    status: 'upcoming',
    time: 'Pending',
  },
];

export default function QueueJourney() {
  const [lang, setLang] = useState('EN');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-10">
      <PatientNavbar lang={lang} setLang={setLang} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Live Queue Token Banner */}
        <section className="bg-[#111c35] text-white rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs">
          <div>
            <span className="px-3 py-1 rounded-full bg-teal-600/30 border border-teal-400/40 text-teal-300 text-xs font-semibold">
              Live Outpatient Queue
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
              Token #A-104
            </h1>
            <p className="text-sm text-slate-300 mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-400" />
              General Outpatient (OPD) • Consultation Room 5
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3.5 text-center">
              <p className="text-xs text-slate-400">Ahead of You</p>
              <p className="text-2xl font-extrabold text-white mt-0.5">2</p>
            </div>
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3.5 text-center">
              <p className="text-xs text-slate-400">Est. Wait</p>
              <p className="text-2xl font-extrabold text-teal-400 mt-0.5 flex items-center justify-center gap-1">
                <Clock className="w-4 h-4" />
                12m
              </p>
            </div>
          </div>
        </section>

        {/* Step-by-Step Hospital Journey */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h2 className="text-lg font-bold text-[#111c35] mb-5">
            Today&apos;s Hospital Visit Journey
          </h2>

          <div className="space-y-4">
            {JOURNEY_STEPS.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border flex items-start justify-between gap-4 ${
                  item.status === 'current'
                    ? 'bg-teal-50/60 border-teal-400'
                    : 'bg-slate-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {item.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-700 mt-0.5 shrink-0" />
                  ) : item.status === 'current' ? (
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 shrink-0">
                      •
                    </span>
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.step}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{item.detail}</p>
                  </div>
                </div>

                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0 ${
                    item.status === 'current'
                      ? 'bg-teal-700 text-white'
                      : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}