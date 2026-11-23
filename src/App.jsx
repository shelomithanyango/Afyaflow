import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Welcome from './pages/Welcome';
import AIAssistant from './pages/AIAssistant';
import KSLAssistant from './pages/KSLAssistant';
import Appointments from './pages/Appointments';
import QueueJourney from './pages/QueueJourney';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/ksl" element={<KSLAssistant />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/queue" element={<QueueJourney />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}