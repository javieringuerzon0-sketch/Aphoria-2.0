import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ProtocolTimelineProps {
    productHandle?: string;
}

const ProtocolTimeline: React.FC<ProtocolTimelineProps> = ({ productHandle = '24-gold-mask' }) => {
    const protocols: Record<string, any[]> = {
        '24-gold-mask': [
            {
                step: "01",
                title: "Apply",
                desc: "Spread a thin, even layer of the golden gel across cleansed skin. The cooling sensation is immediate.",
                badge: "Topical",
                img: "/goldmask-landing/apply/apply.png"
            },
            {
                step: "02",
                title: "Activate",
                desc: "Relax for 20 minutes. As the mask dries, you'll feel a tightening effect—this is the 24K nano-particles working.",
                badge: "Binding",
                img: "/goldmask-landing/apply/activate.png"
            },
            {
                step: "03",
                title: "Reveal",
                desc: "Rinse with lukewarm water to reveal instantly firmer, brighter, and more radiant skin. The glow lasts up to 72 hours.",
                badge: "Radiance",
                img: "/goldmask-landing/apply/reveal.png"
            }
        ],
        'avocado-mask': [
            {
                step: "01",
                title: "Apply",
                desc: "Generously coat cleansed skin with the rich ceramide cream. Feel the instant soothing hydration.",
                badge: "Nourish",
                img: "/avocado-landing/apply/apply.png"
            },
            {
                step: "02",
                title: "Recover",
                desc: "Allow 15-20 minutes for the lipid complex to rebuild your moisture barrier. The cream will absorb significantly.",
                badge: "Repair",
                img: "/avocado-landing/apply/activate.png"
            },
            {
                step: "03",
                title: "Finish",
                desc: "Gently rinse or tissue off excess. Your skin is left soft, calm, and structurally resilient.",
                badge: "Restore",
                img: "/avocado-landing/apply/reveal.png"
            }
        ]
    };

    const steps = protocols[productHandle] || protocols['24-gold-mask'];

    return (
        <section className="py-24 lg:py-32 bg-[#FAF8F5] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold mb-4 block"
                    >
                        Clinical Protocol
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-brand font-light text-aphoria-black mb-6"
                    >
                        The 20-Minute Transformation
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-aphoria-mid/70 text-sm leading-relaxed"
                    >
                        A simple, sensorial ritual designed to deliver immediate structural remodeling.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {steps.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
                            className="group relative flex flex-col"
                        >
                            {/* Card Container - Premium Tall Format */}
                            <div className="relative rounded-[20px] mb-8 overflow-hidden bg-white shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] border border-aphoria-black/5 group-hover:shadow-[0_30px_60px_-10px_rgba(198,161,91,0.25)] transition-shadow duration-500" style={{ paddingBottom: '133.33%' }}>
                                {/* Image */}
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    loading="eager"
                                    decoding="async"
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Step Number Badge */}
                                <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center z-20">
                                    <span className="text-white text-xs font-bold tracking-widest">{item.step}</span>
                                </div>

                                {/* Premium Badge */}
                                <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 z-20 shadow-sm">
                                    <span className="text-[9px] text-aphoria-black font-bold uppercase tracking-[0.2em]">{item.badge}</span>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center px-4">
                                <h3 className="text-2xl font-brand text-aphoria-black mb-3 group-hover:text-aphoria-gold transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-aphoria-mid/80 leading-relaxed max-w-xs mx-auto">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Section CTA - Soft & Clean */}
                <div className="text-center">
                    <button className="inline-flex items-center gap-3 px-12 py-4 bg-aphoria-black text-white rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg hover:shadow-xl group">
                        Begin The Protocol
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProtocolTimeline;