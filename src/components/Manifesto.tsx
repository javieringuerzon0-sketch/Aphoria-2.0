import React from 'react';
import FadeInView from './FadeInView';
import { MANIFESTO_COPY } from '../constants';

const Manifesto: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-aphoria-bg flex flex-col items-center">
      <div className="max-w-[640px] text-center">
        <FadeInView>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-aphoria-gold mb-12">
            {MANIFESTO_COPY.h2}
          </h2>
          <p className="text-2xl md:text-[32px] leading-[1.4] font-light text-aphoria-black tracking-tight">
            {MANIFESTO_COPY.body}
          </p>
          <div className="mt-16 flex flex-col items-center">
            <div className="h-[1px] w-12 bg-aphoria-black/10 mb-6"></div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-aphoria-mid">
              Clinical Integrity • Architectural Precision
            </span>
          </div>
        </FadeInView>
      </div>
    </section>
  );
};

export default Manifesto;
