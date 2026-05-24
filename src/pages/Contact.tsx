import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Search, ChevronDown, Clock, Video, Shield } from 'lucide-react';

// Contact page — premium Apple-style rebuild.
//   1. Booking-style consultation form (glassmorphism, focus ring premium)
//   2. Searchable FAQ (glass items, hover lift, animated expand)
//
// Visual language:
//   - Real glassmorphism: bg-white/55 + backdrop-blur-xl + inner shadow +
//     soft outer shadow + gold-tint on hover.
//   - Apple-style entrance stagger: cards animate in one after another.
//   - Hover micro-interactions: lift -3px, gold border, icon scale.
//   - Submission still uses mailto (no backend changes required).

const CONTACT_EMAIL = 'support@aphoriabeauty.com';

interface FAQ {
  q: string;
  a: string;
  category: 'shipping' | 'returns' | 'ingredients' | 'application' | 'orders';
}

const FAQS: FAQ[] = [
  {
    category: 'shipping',
    q: 'How long does shipping take?',
    a: 'All orders ship within 24 hours. Standard delivery is 3–5 business days within the US and 5–10 business days internationally. Express options are available at checkout. Every order ships in temperature-controlled packaging to preserve molecular integrity.',
  },
  {
    category: 'shipping',
    q: 'Do you ship internationally?',
    a: 'Yes — we ship to 47 countries with full duty-prepaid options. International shipping is calculated at checkout. Tracking is provided for every order, with insurance included.',
  },
  {
    category: 'returns',
    q: 'What is your refund policy?',
    a: 'Every Aphoria protocol includes a money-back guarantee. If you don\'t see visible results, return your product — used or unused — for a full refund. No questions asked. We stand behind every formulation.',
  },
  {
    category: 'returns',
    q: 'How do I initiate a return?',
    a: `Email ${CONTACT_EMAIL} with your order number and reason for return. Our concierge will issue a prepaid return label within one business day. Refunds are processed within 3–5 business days of receipt.`,
  },
  {
    category: 'ingredients',
    q: 'Are your products cruelty-free?',
    a: 'Yes. Aphoria is certified cruelty-free and never tests on animals. We do not work with third-party labs that test on animals, and we do not sell into markets that require animal testing.',
  },
  {
    category: 'ingredients',
    q: 'Are your products safe for sensitive skin?',
    a: 'Yes. Every formulation is dermatologist-tested, free of parabens, sulfates, synthetic fragrance, and known irritants. Patch-testing is always recommended for first use, especially with active ingredients like niacinamide.',
  },
  {
    category: 'ingredients',
    q: 'What is the science behind your formulations?',
    a: 'Aphoria runs on four peer-reviewed actives — colloidal 24K gold, ceramide complex, niacinamide, and avocado lipid — each dosed at concentrations supported by clinical research. No filler ingredients, no proprietary blends to hide weak formulation.',
  },
  {
    category: 'application',
    q: 'How often should I use the masks?',
    a: 'For the 24K Gold Mask: 2–3 times per week as a focused treatment. For the Avocado Ceramide Mask: nightly as part of your evening routine. Both masks are designed to layer with your existing skincare without interference.',
  },
  {
    category: 'application',
    q: 'Can I use both masks together?',
    a: 'Yes — and we recommend it. The Avocado mask provides the foundation (hydration, barrier repair) while the Gold mask delivers the active transformation (firming, brightening). The Synergistic Bundle is designed exactly for this combined protocol.',
  },
  {
    category: 'orders',
    q: 'Can I modify or cancel my order?',
    a: 'Orders can be modified or cancelled within 2 hours of placement. After that, our fulfillment process begins and changes are not possible. Contact us immediately via WhatsApp for the fastest response.',
  },
  {
    category: 'orders',
    q: 'How do I track my order?',
    a: 'Once your order ships you\'ll receive an email with a tracking number and a direct link. Tracking updates in real time. If you don\'t see the email within 24 hours, check your spam folder or contact our concierge with your order number.',
  },
];

const FAQ_CATEGORIES: Array<{ key: FAQ['category']; label: string }> = [
  { key: 'shipping', label: 'Shipping' },
  { key: 'returns', label: 'Returns & Refunds' },
  { key: 'ingredients', label: 'Ingredients & Safety' },
  { key: 'application', label: 'How to Use' },
  { key: 'orders', label: 'Orders' },
];

const SKIN_CONCERNS = [
  'Aging & Fine Lines',
  'Hydration & Dryness',
  'Redness & Sensitivity',
  'Texture & Pores',
  'Brightening & Dark Spots',
  'Custom Protocol Advice',
];

const TIME_PREFERENCES = ['Morning (9 AM – 12 PM)', 'Afternoon (12 PM – 5 PM)', 'Evening (5 PM – 8 PM)'];

// Shared glassmorphism card class — premium look at REST so the effect is
// visible on mobile (where hover doesn't fire).
//   - bg-white/65 backdrop-blur-xl   (real glass, visible on both bg tints)
//   - border-aphoria-gold/15         (subtle gold edge instead of plain white)
//   - inset shadow (top highlight)
//   - outer shadow w/ gold tint      (gives life even without hover)
const glassCard =
  'border border-aphoria-gold/15 bg-white/65 backdrop-blur-xl ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_24px_44px_-20px_rgba(198,161,91,0.22),0_8px_18px_-10px_rgba(0,0,0,0.08)] ' +
  'transition-all duration-500';

// Desktop hover + mobile tap layer. whileHover (desktop) and whileTap (touch)
// trigger the lift; the CSS hover line below adds visual richness on devices
// that support it without breaking touch.
const glassCardHover =
  'hover:border-aphoria-gold/45 hover:bg-white/80 ' +
  'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_32px_56px_-18px_rgba(198,161,91,0.4)] ' +
  'hover:-translate-y-1';

// Premium input — glass background, focus ring gold, smooth transitions.
const inputBase =
  'w-full px-5 py-4 text-aphoria-black text-[15px] ' +
  'bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl ' +
  'shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ' +
  'transition-all duration-300 outline-none ' +
  'focus:bg-white/85 focus:border-aphoria-gold/60 ' +
  'focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_0_0_4px_rgba(198,161,91,0.12)] ' +
  'placeholder:text-aphoria-mid/60';

const easeOut = [0.22, 1, 0.36, 1] as const;

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    concern: SKIN_CONCERNS[0],
    time: TIME_PREFERENCES[0],
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  // FAQ state
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSending(true);

    const subject = encodeURIComponent(`[Aphoria Consultation] ${form.concern} — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp || '—'}\nPrimary concern: ${form.concern}\nPreferred time: ${form.time}\n\nPlease confirm a 30-minute consultation slot.`
    );

    const link = document.createElement('a');
    link.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 500);
  };

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    // Padding-top must clear the fixed navbar at every breakpoint. The navbar
    // is ~78px tall on desktop and ~70px on mobile; we add a generous safety
    // margin so the H1 never tucks under it when the user lands on this page.
    <div className="min-h-screen bg-aphoria-bg pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-24 px-6 relative overflow-hidden">
      {/* Brand gradient background washes */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[700px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(198,161,91,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[40%] -left-40 w-[600px] h-[600px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(74,111,90,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-20 w-[500px] h-[500px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(198,161,91,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1180px] mx-auto">
        {/* ─────────── SECTION 1 — CONSULTATION BOOKING ─────────── */}
        <section aria-label="Book a skin consultation" className="mb-32 md:mb-44">
          <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="block text-[11px] uppercase tracking-[0.36em] text-aphoria-gold font-medium mb-6"
            >
              Complimentary Consultation
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: easeOut }}
              className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-brand font-light text-aphoria-black leading-[1.1] tracking-[-0.02em] mb-6"
            >
              Book a 30-minute skin consultation.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
              className="text-[16px] md:text-[18px] text-aphoria-mid leading-relaxed font-light"
            >
              One-on-one with our clinical formulators. Personalized protocol recommendation tailored to your skin. No commitment, no upsell.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 items-start">
            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: easeOut }}
              className={`rounded-[32px] p-8 md:p-12 ${glassCard}`}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-aphoria-green/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} className="text-aphoria-green" />
                    </div>
                    <h2 className="text-[24px] md:text-[28px] font-brand font-light text-aphoria-black mb-3">
                      Consultation request sent.
                    </h2>
                    <p className="text-[15px] text-aphoria-mid leading-relaxed max-w-md mx-auto mb-8">
                      Your email client should have opened with the request. Send it and our concierge will confirm your slot within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: '',
                          email: '',
                          whatsapp: '',
                          concern: SKIN_CONCERNS[0],
                          time: TIME_PREFERENCES[0],
                        });
                      }}
                      className="text-[10px] uppercase tracking-[0.3em] font-semibold text-aphoria-gold hover:text-aphoria-black transition-colors"
                    >
                      Book Another Consultation
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-7"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.28em] text-aphoria-mid font-semibold">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className={inputBase}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.28em] text-aphoria-mid font-semibold">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@email.com"
                          className={inputBase}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.28em] text-aphoria-mid font-semibold">
                        WhatsApp (optional, for faster scheduling)
                      </label>
                      <input
                        type="tel"
                        value={form.whatsapp}
                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                        placeholder="+1 555 123 4567"
                        className={inputBase}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.28em] text-aphoria-mid font-semibold">
                        Primary skin concern
                      </label>
                      <select
                        value={form.concern}
                        onChange={(e) => setForm({ ...form, concern: e.target.value })}
                        className={`${inputBase} appearance-none cursor-pointer`}
                      >
                        {SKIN_CONCERNS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.28em] text-aphoria-mid font-semibold">
                        Preferred time
                      </label>
                      <select
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className={`${inputBase} appearance-none cursor-pointer`}
                      >
                        {TIME_PREFERENCES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={sending}
                      className="w-full bg-aphoria-black text-white py-5 rounded-full text-[11px] uppercase tracking-[0.3em] font-semibold transition-colors duration-500 hover:bg-aphoria-gold hover:text-aphoria-black shadow-[0_18px_36px_-12px_rgba(0,0,0,0.35)] hover:shadow-[0_24px_50px_-12px_rgba(198,161,91,0.5)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending ? 'Opening Email…' : 'Schedule My Consultation'}
                    </motion.button>

                    <p className="text-[11px] text-aphoria-mid/80 text-center mt-2">
                      Or reach us directly at{' '}
                      <a href={`mailto:${CONTACT_EMAIL}`} className="text-aphoria-gold hover:underline">
                        {CONTACT_EMAIL}
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Trust rail */}
            <aside className="space-y-5">
              {[
                {
                  icon: <Clock size={20} strokeWidth={1.6} />,
                  label: '30 Minutes',
                  body: 'A focused one-on-one. No rushed pitch, no pressure to buy.',
                },
                {
                  icon: <Video size={20} strokeWidth={1.6} />,
                  label: 'Online · Zoom or WhatsApp',
                  body: 'Wherever you are. Whatever camera you have. No app required.',
                },
                {
                  icon: <Shield size={20} strokeWidth={1.6} />,
                  label: 'Complimentary',
                  body: 'Free for every guest. No subscription required, no card asked.',
                },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: easeOut }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group rounded-2xl p-6 cursor-pointer ${glassCard} ${glassCardHover} active:border-aphoria-gold/55 active:bg-white/85`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-aphoria-gold/12 flex items-center justify-center text-aphoria-gold flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-[11px] uppercase tracking-[0.28em] text-aphoria-mid font-semibold mb-1 transition-colors duration-500 group-hover:text-aphoria-gold">
                        {card.label}
                      </h3>
                      <p className="text-[15px] text-aphoria-black font-medium leading-snug">
                        {card.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Order support — gold-tinted glass with a soft breathing border */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
                whileHover={{ y: -3 }}
                className="relative rounded-2xl p-6 cursor-default
                           border border-aphoria-gold/30 bg-aphoria-gold/[0.06] backdrop-blur-xl
                           shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_18px_36px_-18px_rgba(198,161,91,0.3)]
                           transition-all duration-500
                           hover:border-aphoria-gold/55 hover:bg-aphoria-gold/[0.10]
                           hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_28px_50px_-18px_rgba(198,161,91,0.5)]"
              >
                {/* Soft breathing glow ring */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  animate={{ boxShadow: ['0 0 0 0 rgba(198,161,91,0)', '0 0 0 6px rgba(198,161,91,0.08)', '0 0 0 0 rgba(198,161,91,0)'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="relative text-[11px] uppercase tracking-[0.28em] text-aphoria-gold font-semibold mb-2">
                  Order support
                </p>
                <p className="relative text-[14px] text-aphoria-black/85 leading-relaxed mb-3">
                  Need help with an existing order? Skip the consultation form — write us directly:
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="relative block text-[14px] text-aphoria-black font-medium hover:text-aphoria-gold transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
                <a
                  href="https://wa.me/526122893294"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block text-[14px] text-aphoria-black font-medium hover:text-aphoria-gold transition-colors mt-1"
                >
                  WhatsApp →
                </a>
              </motion.div>
            </aside>
          </div>
        </section>

        {/* ─────────── SECTION 2 — FAQ ─────────── */}
        <section aria-label="Frequently asked questions">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          >
            <span className="block text-[11px] uppercase tracking-[0.36em] text-aphoria-gold font-medium mb-6">
              Frequently Asked
            </span>
            <h2 className="text-[34px] md:text-[48px] font-brand font-light text-aphoria-black tracking-tight mb-5">
              Answered before you ask.
            </h2>
            <p className="text-[15px] md:text-[16px] text-aphoria-mid leading-relaxed font-light">
              The most common questions about shipping, returns, ingredients, and protocols. Search or browse below.
            </p>
          </motion.div>

          {/* Search bar — glass + animated focus ring */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="max-w-2xl mx-auto mb-10"
          >
            <div className="relative group">
              <Search
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-aphoria-mid pointer-events-none transition-colors duration-300 group-focus-within:text-aphoria-gold"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpenId(null);
                }}
                placeholder="Search for an answer…"
                className="w-full bg-white/65 backdrop-blur-xl border border-white/50 rounded-full pl-14 pr-5 py-4 text-aphoria-black text-[15px] outline-none transition-all duration-300
                           shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_30px_-12px_rgba(0,0,0,0.12)]
                           focus:bg-white/85 focus:border-aphoria-gold/55
                           focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_0_0_4px_rgba(198,161,91,0.14),0_18px_36px_-12px_rgba(198,161,91,0.2)]"
              />
            </div>
          </motion.div>

          {/* Category pills */}
          {search.trim() === '' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
              className="max-w-3xl mx-auto mb-12 flex flex-wrap items-center justify-center gap-3"
            >
              {FAQ_CATEGORIES.map((cat, i) => (
                <motion.a
                  key={cat.key}
                  href={`#faq-${cat.key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(`faq-${cat.key}`);
                    if (el) {
                      window.scrollTo({
                        top: el.getBoundingClientRect().top + window.scrollY - 120,
                        behavior: 'smooth',
                      });
                    }
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.06, ease: easeOut }}
                  whileHover={{ y: -2 }}
                  className="text-[11px] uppercase tracking-[0.24em] text-aphoria-black/70 px-4 py-2 rounded-full border border-aphoria-black/10 bg-white/40 backdrop-blur-md transition-all duration-300 hover:border-aphoria-gold hover:text-aphoria-gold hover:bg-white/70 hover:shadow-[0_8px_20px_-8px_rgba(198,161,91,0.3)]"
                >
                  {cat.label}
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* FAQ list */}
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <p className="text-center text-[15px] text-aphoria-mid py-10">
                No results. Try a different keyword or{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-aphoria-gold hover:underline">
                  email our concierge
                </a>
                .
              </p>
            ) : search.trim() === '' ? (
              FAQ_CATEGORIES.map((cat) => {
                const items = FAQS.filter((f) => f.category === cat.key);
                if (items.length === 0) return null;
                return (
                  <div key={cat.key} id={`faq-${cat.key}`} className="mb-12 scroll-mt-32">
                    <motion.h3
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, ease: easeOut }}
                      className="text-[11px] uppercase tracking-[0.32em] text-aphoria-gold font-semibold mb-5"
                    >
                      {cat.label}
                    </motion.h3>
                    <div className="space-y-3">
                      {items.map((f, idx) => {
                        const id = FAQS.indexOf(f);
                        return (
                          <FaqItem
                            key={id}
                            id={id}
                            faq={f}
                            isOpen={openId === id}
                            onToggle={() => setOpenId(openId === id ? null : id)}
                            delay={idx * 0.05}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((f, idx) => {
                  const id = FAQS.indexOf(f);
                  return (
                    <FaqItem
                      key={id}
                      id={id}
                      faq={f}
                      isOpen={openId === id}
                      onToggle={() => setOpenId(openId === id ? null : id)}
                      delay={idx * 0.04}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Still need help */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="max-w-2xl mx-auto mt-16 text-center"
          >
            <p className="text-[14px] text-aphoria-mid mb-4">
              Still have a question we didn't answer?
            </p>
            <div className="inline-flex items-center gap-6">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[12px] uppercase tracking-[0.28em] text-aphoria-black font-medium border-b border-aphoria-gold/40 hover:text-aphoria-gold hover:border-aphoria-gold transition-colors pb-1"
              >
                Email Concierge
              </a>
              <a
                href="https://wa.me/526122893294"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] uppercase tracking-[0.28em] text-aphoria-black font-medium border-b border-aphoria-gold/40 hover:text-aphoria-gold hover:border-aphoria-gold transition-colors pb-1"
              >
                WhatsApp Concierge
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

const FaqItem: React.FC<{
  id: number;
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
}> = ({ faq, isOpen, onToggle, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={isOpen ? undefined : { y: -2 }}
    className={`rounded-2xl backdrop-blur-xl transition-all duration-500 ${
      isOpen
        ? 'border border-aphoria-gold/55 bg-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_24px_48px_-18px_rgba(198,161,91,0.35)]'
        : 'border border-white/55 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_12px_28px_-16px_rgba(0,0,0,0.15)] hover:border-aphoria-gold/35 hover:bg-white/70 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_18px_36px_-16px_rgba(198,161,91,0.25)]'
    }`}
  >
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer"
      aria-expanded={isOpen}
    >
      <span className={`text-[15px] md:text-[16px] font-medium leading-snug transition-colors duration-300 ${isOpen ? 'text-aphoria-black' : 'text-aphoria-black/85'}`}>
        {faq.q}
      </span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-shrink-0"
      >
        <ChevronDown
          size={18}
          className={`transition-colors duration-300 ${isOpen ? 'text-aphoria-gold' : 'text-aphoria-mid'}`}
        />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-5 text-[14px] md:text-[15px] text-aphoria-mid leading-relaxed font-light">
            {faq.a}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default Contact;
