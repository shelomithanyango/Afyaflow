
import React from 'react';
import { PhoneCall } from 'lucide-react';

const EmergencyNotice = () => {
  return (
    <section className="mx-auto mt-5 w-full max-w-4xl px-4">

      <div
        role="alert"
        className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-start"
      >

        {/* Emergency Label */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-white">
          <PhoneCall size={14} strokeWidth={2.5} />
          <span className="text-xs font-bold uppercase">
            Emergency
          </span>
        </div>

        {/* Emergency Message */}
        <p className="text-sm leading-6 text-red-800">
          Emergency Notice: If experiencing chest pain, severe bleeding,
          difficulty breathing, or loss of consciousness, go immediately
          to Emergency Triage or call{' '}
          <a
            href="tel:999"
            className="font-bold underline hover:text-red-950"
          >
            999
          </a>
          {' / '}
          <a
            href="tel:112"
            className="font-bold underline hover:text-red-950"
          >
            112
          </a>.
        </p>

      </div>

    </section>
  );
};

export default EmergencyNotice;
