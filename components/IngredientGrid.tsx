import React from 'react';
import { motion } from 'framer-motion';
import { SCIENCE_INGREDIENTS } from '../constants';

const IngredientGrid: React.FC = () => {
  return (
    <section id="science" className="py-32 md:py-40 bg-white px-6">
      <div className="max-w-[1360px] mx-auto">
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-[40px] font-light text-aphoria-black tracking-tight mb-6"
          >
            Formulation Intelligence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-xl text-aphoria-mid text-lg leading-relaxed"
          >
            Each ingredient is selected for a specific mechanism of action, not for marketing appeal.
            Precision dosage meets biological biocompatibility.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {SCIENCE_INGREDIENTS.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="flex flex-col h-full"
            >
              <div className="mb-8 p-4 bg-aphoria-bg/50 inline-block w-fit rounded-sm">
                <span className="font-mono text-[11px] uppercase tracking-widest text-aphoria-gold">
                  {item.clinicalName}
                </span>
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-medium text-aphoria-black mb-4 tracking-tight">
                  {item.benefitHeadline}
                </h3>
                <p className="text-[15px] leading-relaxed text-aphoria-mid font-normal mb-6">
                  {item.benefitCopy}
                </p>
              </div>

              <div className="pt-6 border-t border-aphoria-black/5">
                <span className="text-[12px] font-semibold text-aphoria-black uppercase tracking-wider block mb-2">
                  Mechanism
                </span>
                <p className="text-[13px] leading-relaxed text-aphoria-mid font-light">
                  {item.mechanism}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IngredientGrid;