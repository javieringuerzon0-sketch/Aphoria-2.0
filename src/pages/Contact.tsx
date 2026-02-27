import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Clock, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONTACT_EMAIL = 'support@aphoriabeauty.com';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', protocol: '24K Gold Mask Protocol', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        setSending(true);

        const subject = encodeURIComponent(`[Aphoria] ${formData.protocol} — Inquiry from ${formData.name}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nProtocol: ${formData.protocol}\n\nMessage:\n${formData.message}`
        );

        // Open mailto via a temporary link — avoids navigating away from the page
        const link = document.createElement('a');
        link.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show confirmation after a brief delay
        setTimeout(() => {
            setSending(false);
            setSubmitted(true);
        }, 500);
    };

    const contactOptions = [
        {
            icon: <Mail size={22} />,
            title: "Scientific Support",
            detail: "support@aphoriabeauty.com",
            href: "mailto:support@aphoriabeauty.com",
            description: "Direct access to our dermal specialists for protocol inquiries.",
            delay: 0.1
        },
        {
            icon: <Clock size={22} />,
            title: "Consultation Hours",
            detail: "Mon - Fri | 9:00 - 18:00",
            description: "Dedicated time for intensive cellular analysis support.",
            delay: 0.2
        },
        {
            icon: <Globe size={22} />,
            title: "Global Reach",
            detail: "Priority Shipping",
            description: "Ensuring molecular integrity from our lab to your door.",
            delay: 0.3
        }
    ];

    return (
        <div className="min-h-screen bg-aphoria-bg pt-32 pb-20 px-6 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-aphoria-gold/5 rounded-full blur-[120px] -mr-40 -mt-40" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-aphoria-green/5 rounded-full blur-[100px] -ml-20 -mb-20" />

            <div className="max-w-[1280px] mx-auto relative z-10">
                <header className="max-w-3xl mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-[11px] uppercase tracking-[0.4em] text-aphoria-gold font-bold mb-6 block"
                    >
                        Contact & Concierge
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1 }}
                        className="text-[48px] md:text-[72px] font-brand font-light text-aphoria-black leading-[1.1] tracking-tight mb-8"
                    >
                        We are here to <span className="italic">assist</span> your <span className="text-aphoria-gold font-normal">transformation.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-[18px] text-aphoria-mid leading-relaxed font-light"
                    >
                        Whether you have a question about our botanical science or need assistance with your order,
                        our concierge team is dedicated to providing a seamless experience.
                    </motion.p>
                </header>

                <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 md:gap-24 items-start">
                    {/* Left Column - Contact Channels */}
                    <div className="space-y-12">
                        <div className="grid gap-6">
                            {contactOptions.map((option, idx) => (
                                <div
                                    key={idx}
                                    className="group flex gap-5 p-6 rounded-2xl border border-aphoria-black/5 bg-white/40 backdrop-blur-sm transition-all hover:bg-white/80 hover:border-aphoria-gold/20"
                                >
                                    <div className="w-12 h-12 rounded-full bg-aphoria-green/5 flex items-center justify-center text-aphoria-green group-hover:scale-110 transition-transform font-bold">
                                        {option.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-[11px] uppercase tracking-[0.2em] text-aphoria-gold font-bold mb-1">
                                            {option.title}
                                        </h3>
                                        {(option as any).href ? (
                                            <a href={(option as any).href} className="text-[17px] font-medium text-aphoria-black mb-0.5 hover:text-aphoria-gold transition-colors">
                                                {option.detail}
                                            </a>
                                        ) : (
                                            <p className="text-[17px] font-medium text-aphoria-black mb-0.5">
                                                {option.detail}
                                            </p>
                                        )}
                                        <p className="text-[12px] text-aphoria-mid leading-relaxed font-light">
                                            {option.description}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* WhatsApp Special Link */}
                            <a
                                href="https://wa.me/526122893294"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex gap-5 p-6 rounded-2xl border border-aphoria-black/5 bg-white/40 backdrop-blur-sm transition-all hover:bg-white/80 hover:border-aphoria-gold/20"
                            >
                                <div className="w-12 h-12 rounded-full bg-aphoria-gold/10 flex items-center justify-center text-aphoria-gold group-hover:scale-110 transition-transform">
                                    <MessageSquare size={22} />
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-aphoria-black">Direct Concierge</h4>
                                    <p className="text-[13px] text-aphoria-mid">WhatsApp Support</p>
                                    <p className="text-[11px] text-aphoria-mid/60 mt-1 uppercase tracking-widest">Available for immediate order assistance.</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="relative"
                    >
                        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-aphoria-black/5">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-aphoria-green/10 flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={32} className="text-aphoria-green" />
                                    </div>
                                    <h3 className="text-[24px] font-brand font-light text-aphoria-black mb-3">
                                        Message Prepared
                                    </h3>
                                    <p className="text-[15px] text-aphoria-mid leading-relaxed max-w-sm mx-auto mb-8">
                                        Your email client should have opened with your inquiry. Send the email and our team will respond within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', protocol: '24K Gold Mask Protocol', message: '' }); }}
                                        className="text-[10px] uppercase tracking-[0.3em] font-semibold text-aphoria-gold hover:text-aphoria-black transition-colors"
                                    >
                                        Send Another Inquiry
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <h2 className="text-[28px] font-brand font-light text-aphoria-black mb-10">Digital Skin Consultant</h2>
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[11px] uppercase tracking-widest text-aphoria-mid font-bold ml-1">Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    className="w-full bg-aphoria-bg border-none rounded-2xl px-6 py-4 text-aphoria-black focus:ring-1 focus:ring-aphoria-gold transition-all outline-none"
                                                    placeholder="Your full name"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] uppercase tracking-widest text-aphoria-mid font-bold ml-1">Email</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    className="w-full bg-aphoria-bg border-none rounded-2xl px-6 py-4 text-aphoria-black focus:ring-1 focus:ring-aphoria-gold transition-all outline-none"
                                                    placeholder="you@email.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase tracking-widest text-aphoria-mid font-bold ml-1">Protocol of Interest</label>
                                            <select
                                                value={formData.protocol}
                                                onChange={e => setFormData(prev => ({ ...prev, protocol: e.target.value }))}
                                                className="w-full bg-aphoria-bg border-none rounded-2xl px-6 py-4 text-aphoria-black focus:ring-1 focus:ring-aphoria-gold transition-all outline-none appearance-none"
                                                aria-label="Protocol of interest"
                                            >
                                                <option>24K Gold Mask Protocol</option>
                                                <option>Pure Avocado Protocol</option>
                                                <option>Synergistic Integration Bundle</option>
                                                <option>Other / General Inquiry</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase tracking-widest text-aphoria-mid font-bold ml-1">How can we assist?</label>
                                            <textarea
                                                rows={4}
                                                value={formData.message}
                                                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                                className="w-full bg-aphoria-bg border-none rounded-2xl px-6 py-4 text-aphoria-black focus:ring-1 focus:ring-aphoria-gold transition-all outline-none resize-none"
                                                placeholder="Tell us about your dermal goals..."
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={sending}
                                            className="w-full bg-aphoria-black text-white py-5 rounded-full text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-aphoria-green transition-all shadow-xl hover:-translate-y-1 disabled:opacity-60"
                                        >
                                            {sending ? 'Opening Email...' : 'Transmit Inquiry'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Footer Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="mt-32 rounded-[40px] bg-aphoria-green p-8 md:p-16 text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <span className="text-white/40 text-[11px] uppercase tracking-[0.6em] mb-6 block font-bold">The Essence of Time</span>
                        <h2 className="text-white text-[24px] md:text-[36px] font-brand font-light italic leading-relaxed max-w-4xl mx-auto mb-12">
                            "Beauty is not a race, but a meticulously crafted transformation. Allow us to guide your path to cellular excellence."
                        </h2>
                        <Link
                            to="/diagnostic"
                            className="inline-flex items-center gap-3 bg-aphoria-gold text-white px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-aphoria-black transition-all shadow-lg"
                        >
                            Launch Diagnostic Tool
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
