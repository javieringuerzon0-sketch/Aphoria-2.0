import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';

const Validation: React.FC = () => {
  return (
    <section className="py-32 md:py-48 px-6 bg-aphoria-bg overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12">
        <div className="mb-24 text-center">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-aphoria-gold mb-4">
            Trusted by Discerning Professionals
          </h2>
          <p className="text-aphoria-mid text-sm font-normal">
            Luxury buyers are moved by quality of source and specificity of result.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-32">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="flex flex-col items-start p-10 bg-white border border-aphoria-black/5"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-aphoria-gold mb-8 px-2 py-1 bg-aphoria-gold/5 rounded-sm">
                {t.sourceType}
              </span>
              <blockquote className="text-xl md:text-[22px] leading-[1.6] font-light text-aphoria-black tracking-tight mb-10">
                "{t.text}"
              </blockquote>
              <div className="mt-auto">
                <cite className="text-[12px] font-semibold text-aphoria-black not-italic block uppercase tracking-wider mb-2">
                  {t.author}
                </cite>
                <span className="text-[11px] text-aphoria-mid font-medium italic">
                  {t.context}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial Press Block */}
        <div className="pt-24 border-t border-aphoria-black/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aphoria-black">VOGUE</span>
              <p className="text-[13px] text-aphoria-mid font-light italic leading-relaxed">
                "A precision-engineered approach that redefines the luxury skincare protocol."
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aphoria-black">MONOCLE</span>
              <p className="text-[13px] text-aphoria-mid font-light italic leading-relaxed">
                "Restraint and scientific rigour converge in Aphoria's flagship formulations."
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aphoria-black">WALL STREET JOURNAL</span>
              <p className="text-[13px] text-aphoria-mid font-light italic leading-relaxed">
                "The professional's choice for deep hydration and dermal matrix support."
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-aphoria-black">HARPER'S BAZAAR</span>
              <p className="text-[13px] text-aphoria-mid font-light italic leading-relaxed">
                "A clinical transformation presented with the elegance of high luxury."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Validation;