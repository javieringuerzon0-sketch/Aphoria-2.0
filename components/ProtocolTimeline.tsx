import React from 'react';
import { motion } from 'framer-motion';
import { PROTOCOL_STEPS } from '../constants';

const ProtocolTimeline: React.FC = () => {
    return (
        <section id="protocol" className="py-32 md:py-48 bg-aphoria-bg px-6">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-[40px] font-light text-aphoria-black tracking-tight mb-6">
                            The Aphoria Protocol
                        </h2>
                        <p className="text-aphoria-mid text-lg font-normal leading-relaxed">
                            Skincare is most effective as a system. Each step is designed to prepare, activate, or protect — building cumulative results over time.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-aphoria-mid font-semibold border-b border-aphoria-black/10 pb-2">
                            Sequential System v2.0
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-px md:bg-aphoria-black/5">
                    {PROTOCOL_STEPS.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="bg-aphoria-bg md:p-12 flex flex-col items-start"
                        >
                            <span className="text-[11px] font-semibold text-aphoria-gold uppercase tracking-[0.16em] mb-4">
                                Step {step.step} • {step.label}
                            </span>
                            <h3 className="text-2xl font-light text-aphoria-black tracking-tight mb-6">
                                {step.name}
                            </h3>
                            <p className="text-aphoria-mid text-[15px] leading-relaxed font-normal mb-12">
                                {step.copy}
                            </p>

                            <div className="mt-auto pt-8 border-t border-aphoria-black/5 w-full flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full border border-aphoria-black/10 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-aphoria-black">{index + 1}</span>
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-aphoria-mid font-bold">
                                    Target Activation
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProtocolTimeline;