import React, { useState } from 'react';
import { Calendar, Clock, Building2, CheckCircle2 } from 'lucide-react';
import PatientNavbar from '../components/PatientNavbar';

const DEPARTMENTS = [
  'General Outpatient (OPD)',
  'Maternal & Child Health (MCH)',
  'Dental & Oral Clinic',
  'Eye / Ophthalmology Clinic',
  'Chronic Care & Hypertension',
];

export default function Appointments() {
  const [lang, setLang] = useState('EN');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [visitType, setVisitType] = useState('Scheduled Appointment');
  const [date, setDate] = useState('2026-11-24');
  const [timeSlot, setTimeSlot] = useState('09:30 AM');
  const [notes, setNotes] = useState('');
  const [bookedList, setBookedList] = useState([
    {
      id: 'APT-209',
      department: 'General Outpatient (OPD)',
      date: '2026-11-23',
      time: '08:30 AM',
      status: 'Checked In',
    },
  ]);

  const handleBook = (e) => {
    e.preventDefault();
    const newAppt = {
      id: `APT-${Math.floor(210 + Math.random() * 80)}`,
      department,
      date: visitType === 'Same-Day Walk-In' ? 'Today (Walk-In)' : date,
      time: visitType === 'Same-Day Walk-In' ? 'Next Available' : timeSlot,
      status: 'Confirmed',
    };
    setBookedList([newAppt, ...bookedList]);
    setNotes('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-10">
      <PatientNavbar lang={lang} setLang={setLang} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <section className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h1 className="text-xl font-bold text-[#111c35] mb-1">
            Book Appointment or Walk-In Request
          </h1>
          <p className="text-sm text-slate-600 mb-5">
            Select a hospital clinic, choose walk-in or scheduled care, and note any KSL or
            accessibility needs.
          </p>

          <form onSubmit={handleBook} className="space-y-4">
            <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-100 rounded-xl">
              {['Scheduled Appointment', 'Same-Day Walk-In'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setVisitType(type)}
                  className={`py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition ${
                    visitType === type
                      ? 'bg-white text-[#111c35] shadow-2xs'
                      : 'text-slate-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Hospital Department / Clinic
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-hidden focus:border-teal-600"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {visitType === 'Scheduled Appointment' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option>08:30 AM</option>
                    <option>09:30 AM</option>
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                    <option>03:30 PM</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Reason for Visit / Accessibility Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Follow-up checkup, KSL interpreter requested..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition"
            >
              Confirm Booking
            </button>
          </form>
        </section>

        {/* Upcoming Appointments Sidebar */}
        <aside className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#111c35]">Your Visits</h2>
          <div className="space-y-3">
            {bookedList.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-700">{item.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-100 text-teal-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                  {item.department}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}