import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Mic, Send, CheckCircle2 } from 'lucide-react';
import PatientNavbar from '../components/PatientNavbar';

const QUICK_PROMPTS = [
  'I have had stomach pains for three days and want to see a doctor.',
  'What is my current queue position?',
  'I need a refill for my blood pressure medication.',
  'Nina maumivu ya kichwa na homa tangu jana.',
];

export default function AIAssistant() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('EN');
  const [voiceReply, setVoiceReply] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(
    'I have been experiencing stomach pains for three days. I would like to see a doctor.'
  );
  const [consultationConfirmed, setConsultationConfirmed] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      time: '08:12 AM',
      text: 'Jambo Mary! I am AfyaFlow, your hospital communication assistant. You can speak, sign in Kenyan Sign Language (KSL), or type how I can help you today. Note: I do not diagnose conditions or prescribe medication.',
    },
    {
      id: 2,
      sender: 'user',
      label: 'You • Voice (Simulated STT)',
      time: '08:14 AM',
      text: 'I have been experiencing stomach pains for three days. I would like to see a doctor.',
    },
    {
      id: 3,
      sender: 'ai',
      time: '08:14 AM',
      text: 'I understand you have had stomach pains for three days and want to see a doctor. To help prepare your visit summary: is the pain sharp or dull, and are you having nausea, fever, or vomiting? I can also help request a General Outpatient consultation once you confirm.',
      requiresConfirmation: true,
      summary: '3-day stomach pains; patient requests General Outpatient doctor consultation.',
    },
  ]);

  const handleSendTranscript = (e) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      label: 'You • Text / Edited STT',
      time: now,
      text: transcript.trim(),
    };

    const aiReply = {
      id: Date.now() + 1,
      sender: 'ai',
      time: now,
      text: 'Thank you. I have added those details to your pre-triage intake note. Would you like me to route you to the General Outpatient queue now?',
    };

    setMessages((prev) => [...prev, userMsg, aiReply]);
    setTranscript('');
  };

  const handlePushToTalk = () => {
    setIsRecording((prev) => !prev);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setTranscript('The pain is dull and started after meals, no fever so far.');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-10">
      <PatientNavbar lang={lang} setLang={setLang} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Dark Navy Assistant Header */}
          <div className="bg-[#111c35] text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-teal-700/90 border border-teal-400/40 flex items-center justify-center font-bold text-sm shrink-0">
                AI
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-lg font-bold tracking-tight">
                    AfyaFlow AI Patient Assistant[cite: 1]
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900">
                    • Simulated AI &amp; STT[cite: 1]
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Guides symptom intake &amp; consultation requests • Does not diagnose or prescribe[cite: 1]
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => navigate('/ksl')}
                className="px-3.5 py-2 rounded-xl bg-slate-700/80 hover:bg-slate-600 text-white text-xs font-semibold transition"
              >
                KSL Mode[cite: 1]
              </button>
              <button
                type="button"
                onClick={() => setVoiceReply(!voiceReply)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  voiceReply
                    ? 'bg-teal-700 hover:bg-teal-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {voiceReply ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {voiceReply ? 'Voice Reply On' : 'Voice Muted'}
              </button>
            </div>
          </div>

          {/* Quick Prompts Strip */}
          <div className="px-5 py-3 bg-slate-50/70 border-b border-slate-200 flex items-center gap-3 overflow-x-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
              QUICK PROMPTS:[cite: 1]
            </span>
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTranscript(prompt)}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-teal-500 text-xs text-slate-700 whitespace-nowrap transition shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Conversation Feed */}
          <div className="p-5 sm:p-6 space-y-5 max-h-[430px] overflow-y-auto bg-slate-50/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-xl rounded-2xl p-4 sm:p-5 shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#111c35] text-white'
                      : 'bg-white border border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-[11px] mb-2 opacity-75">
                    <span className="font-semibold">
                      {msg.sender === 'user' ? msg.label : 'AfyaFlow AI'}
                    </span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.text}</p>

                  {/* Confirmation Action Box */}
                  {msg.requiresConfirmation && (
                    <div className="mt-4 p-4 rounded-xl bg-teal-50/80 border border-teal-200">
                      <p className="text-xs font-bold text-teal-950 mb-1">
                        Confirmation Required Before Action:[cite: 3]
                      </p>
                      <p className="text-xs text-teal-900 mb-3">{msg.summary}</p>

                      {consultationConfirmed ? (
                        <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-lg border border-teal-300">
                          <span className="text-xs font-semibold text-teal-800 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                            Consultation Requested (Token #A-104)
                          </span>
                          <button
                            type="button"
                            onClick={() => navigate('/queue')}
                            className="text-xs font-bold text-teal-700 underline"
                          >
                            View Queue →
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => setConsultationConfirmed(true)}
                            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold transition"
                          >
                            Confirm &amp; Request Consultation[cite: 3]
                          </button>
                          <button
                            type="button"
                            onClick={() => setTranscript(msg.summary)}
                            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold transition"
                          >
                            Edit Details First[cite: 3]
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Push-to-Talk & Editable STT Review */}
          <div className="p-5 bg-white border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-800">
                Push-to-Talk Voice &amp; STT Review (Simulated)[cite: 3]
              </span>
              <button
                type="button"
                onClick={handlePushToTalk}
                className={`px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2 transition ${
                  isRecording
                    ? 'bg-rose-600 animate-pulse'
                    : 'bg-teal-700 hover:bg-teal-800'
                }`}
              >
                <Mic className="w-4 h-4" />
                {isRecording ? 'Listening (Speak now)...' : 'Push-to-Talk Mic'}
              </button>
            </div>

            {/* Simulated Waveform Strip */}
            <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {isRecording ? 'Capturing audio waveform...' : 'Waveform ready'}
              </span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all ${
                      isRecording
                        ? 'h-4 bg-teal-600 animate-bounce'
                        : 'h-2.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Editable Transcript Input */}
            <form onSubmit={handleSendTranscript} className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Speech-to-Text Transcription (Edit before sending):[cite: 3]
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Type or edit your message before sending..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-teal-600"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#111c35] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition shrink-0"
                >
                  <Send className="w-4 h-4" />
                  Send Transcript[cite: 3]
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}