import React from 'react';
import { motion } from 'framer-motion';
import { MANIFESTO_COPY } from '../constants';

const Manifesto: React.FC = () => {
  return (
    <section id="about" className="py-40 md:py-48 px-6 bg-aphoria-bg flex flex-col items-center">
      <div className="max-w-[640px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;