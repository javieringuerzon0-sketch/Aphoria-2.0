import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-aphoria-bg pt-24 pb-12 px-6">
            <div className="max-w-[1360px] mx-auto px-6 md:px-12">

                {/* Conversion Section */}
                <div className="mb-40 text-center">
                    <h2 className="text-3xl md:text-[48px] font-light text-aphoria-black tracking-tight mb-8">
                        Begin Your Protocol
                    </h2>
                    <p className="max-w-xl mx-auto text-aphoria-mid text-lg font-normal mb-12 leading-relaxed">
                        Aphoria formulations are available without subscription, without minimum commitment. Begin with one. Build a system over time.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <button className="px-12 py-5 bg-aphoria-green text-white text-[13px] font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity">
                            Explore the Collection
                        </button>
                        <a href="#" className="text-[13px] font-bold uppercase tracking-[0.12em] text-aphoria-black border-b border-aphoria-black pb-1 hover:opacity-50 transition-opacity">
                            Understand Your Skin First
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 pt-24 border-t border-aphoria-black/5">
                    {/* Logo/Identity */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-light text-aphoria-black tracking-[-0.02em] mb-6">Aphoria</h3>
                        <p className="max-w-xs text-[13px] text-aphoria-mid leading-relaxed font-normal mb-8">
                            Clinical-grade formulations engineered for long-term skin transformation. Developed with the rigour of cosmetic science, refined with the restraint of luxury.
                        </p>
                        <span className="text-[10px] text-aphoria-mid/40 uppercase tracking-widest block">
                            © 2026 Aphoria Laboratories — All Rights Reserved.
                        </span>
                    </div>

                    {/* Links Group 1 */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-aphoria-black mb-8">Protocol</h4>
                        <div className="flex flex-col space-y-4 text-[13px] text-aphoria-mid font-medium">
                            <a href="#science" className="hover:text-aphoria-black transition-colors">Science</a>
                            <a href="#ritual" className="hover:text-aphoria-black transition-colors">Ritual</a>
                            <a href="#about" className="hover:text-aphoria-black transition-colors">Manifesto</a>
                        </div>
                    </div>

                    {/* Links Group 2 */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-aphoria-black mb-8">Legal</h4>
                        <div className="flex flex-col space-y-4 text-[13px] text-aphoria-mid font-medium">
                            <a href="#" className="hover:text-aphoria-black transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-aphoria-black transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-aphoria-black transition-colors">Ingredient Glossary</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;