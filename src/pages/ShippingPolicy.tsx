import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package, Clock, MapPin, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const regions = [
  {
    flag: '🇺🇸',
    name: 'United States',
    transit: '3 – 12 business days',
    note: 'Most orders arrive within 5–7 days',
    highlight: true,
  },
  {
    flag: '🇨🇦',
    name: 'Canada',
    transit: '3 – 12 business days',
    note: 'May vary by province',
    highlight: false,
  },
  {
    flag: '🇬🇧',
    name: 'United Kingdom',
    transit: '5 – 12 business days',
    note: 'No customs duties on most orders',
    highlight: false,
  },
  {
    flag: '🇳🇿',
    name: 'New Zealand',
    transit: '8 – 18 business days',
    note: 'International tracked shipping',
    highlight: false,
  },
  {
    flag: '🇦🇺',
    name: 'Australia',
    transit: '8 – 18 business days',
    note: 'International tracked shipping',
    highlight: false,
  },
  {
    flag: '🌍',
    name: 'Rest of World',
    transit: '10 – 21 business days',
    note: 'Varies by destination country',
    highlight: false,
  },
];

const faqs = [
  {
    q: 'When will my order ship?',
    a: 'Orders are processed within 1–3 business days. You will receive a shipping confirmation email with your tracking number as soon as your order leaves our facility.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you will receive an email with a tracking link. You can also track your order directly through the carrier\'s website using the tracking number provided.',
  },
  {
    q: 'What if my order hasn\'t arrived within the estimated window?',
    a: 'If your order has not arrived within the maximum estimated delivery window, please contact our support team at support@aphoriabeauty.com. We will investigate and resolve the issue promptly — including reshipping or refunding if necessary.',
  },
  {
    q: 'Can I change my shipping address after ordering?',
    a: 'We can update your shipping address if the order has not yet been dispatched. Contact us immediately at support@aphoriabeauty.com with your order number and new address.',
  },
  {
    q: 'Do you ship to P.O. boxes?',
    a: 'Yes, we can ship to P.O. boxes in the United States. For international destinations, we recommend providing a physical address to avoid delivery issues.',
  },
  {
    q: 'Who pays customs and import duties?',
    a: 'For international orders outside the USA, any applicable customs fees, import duties, or taxes are the responsibility of the recipient. These charges are set by your country\'s customs authority and are outside our control.',
  },
];

const ShippingPolicy: React.FC = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Shipping Policy | Aphoria Beauty Laboratory';
  }, []);

  return (
    <div className="min-h-screen bg-aphoria-bg text-aphoria-black font-sans antialiased">
      <main className="pt-28 pb-24">

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-aphoria-mid mb-10">
            <Link to="/" className="hover:text-aphoria-black transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-aphoria-black font-semibold">Shipping Policy</span>
          </nav>

          {/* Hero Banner */}
          <div className="relative bg-aphoria-green rounded-3xl overflow-hidden p-12 lg:p-20 mb-16">
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 80% 50%, #C6A15B 0%, transparent 60%)',
              }}
            />
            <div className="relative z-10 max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-4">Worldwide Delivery</span>
              <h1 className="text-5xl lg:text-7xl font-brand font-light tracking-tight text-white leading-[0.95] mb-6">
                Free Shipping,<br />
                <span className="italic text-aphoria-gold">Everywhere.</span>
              </h1>
              <p className="text-white/60 text-base font-light leading-relaxed max-w-lg">
                Every Aphoria order ships free — no minimum, no exceptions. From our laboratory to your door, worldwide.
              </p>
            </div>
          </div>

          {/* 4 Trust Signals */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Package, label: 'Free Shipping', sub: 'On every order, worldwide' },
              { icon: Clock, label: '1–3 Day Processing', sub: 'Orders dispatched quickly' },
              { icon: MapPin, label: 'Tracked Delivery', sub: 'Real-time tracking included' },
              { icon: Shield, label: 'Insured Parcels', sub: 'Every shipment is protected' },
            ].map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(198,161,91,0.13)' }}
                className="bg-white/80 border border-aphoria-black/8 rounded-2xl p-6 flex flex-col gap-3 cursor-default transition-colors duration-300 hover:border-aphoria-gold/30"
              >
                <motion.div
                  whileHover={{ scale: 1.12, rotate: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="w-10 h-10 bg-aphoria-gold/10 rounded-xl flex items-center justify-center"
                >
                  <Icon size={18} className="text-aphoria-gold" />
                </motion.div>
                <div>
                  <p className="text-[13px] font-semibold text-aphoria-black">{label}</p>
                  <p className="text-[12px] text-aphoria-mid font-light">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Delivery Times */}
          <div className="mb-20">
            <div className="mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-3">Estimated Transit Times</span>
              <h2 className="text-3xl lg:text-4xl font-brand font-light text-aphoria-black">Delivery by Region</h2>
              <p className="text-aphoria-mid text-[14px] font-light mt-2">Transit times begin after order processing (1–3 business days). Weekends and public holidays are excluded.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regions.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  whileHover={{
                    y: -7,
                    boxShadow: r.highlight
                      ? '0 24px 52px rgba(15,59,46,0.28)'
                      : '0 20px 48px rgba(198,161,91,0.12)',
                  }}
                  className={`rounded-2xl p-6 border cursor-default transition-colors duration-300 ${
                    r.highlight
                      ? 'bg-aphoria-green border-aphoria-green text-white hover:border-aphoria-gold/60'
                      : 'bg-white/80 border-aphoria-black/8 hover:border-aphoria-gold/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.span
                      whileHover={{ scale: 1.18, rotate: -6 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                      className="text-3xl inline-block"
                    >
                      {r.flag}
                    </motion.span>
                    <div>
                      <p className={`font-semibold text-[14px] ${r.highlight ? 'text-white' : 'text-aphoria-black'}`}>{r.name}</p>
                      {r.highlight && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-aphoria-gold">Primary Market</span>
                      )}
                    </div>
                  </div>
                  <p className={`text-xl font-brand font-light mb-1 ${r.highlight ? 'text-aphoria-gold' : 'text-aphoria-black'}`}>
                    {r.transit}
                  </p>
                  <p className={`text-[12px] font-light ${r.highlight ? 'text-white/60' : 'text-aphoria-mid'}`}>{r.note}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Processing & Tracking */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {[
              {
                title: 'Order Processing',
                paragraphs: [
                  <p key="1">Orders are typically processed and handed to our shipping carrier within <strong className="text-aphoria-black font-medium">1–3 business days</strong> of being placed. Orders placed on weekends or public holidays will begin processing on the next business day.</p>,
                  <p key="2">During peak periods (promotional events, holidays), processing may take up to 5 business days. We will notify you if there is an unexpected delay.</p>,
                  <p key="3">You will receive an order confirmation email immediately after purchase, followed by a shipping confirmation with tracking details once your order is dispatched.</p>,
                ]
              },
              {
                title: 'Tracking Your Order',
                paragraphs: [
                  <p key="1">Every Aphoria shipment includes full tracking. Once your order is dispatched, you will receive an email with your <strong className="text-aphoria-black font-medium">tracking number and a direct link</strong> to monitor your delivery in real time.</p>,
                  <p key="2">Tracking information may take up to 24 hours to update after your order ships, as carriers process scan data at scheduled intervals.</p>,
                  <p key="3">If you have not received a tracking email within 5 business days of your order, please check your spam folder or contact us at <a href="mailto:support@aphoriabeauty.com" className="text-aphoria-gold hover:underline">support@aphoriabeauty.com</a>.</p>,
                ]
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                whileHover={{ y: -5, boxShadow: '0 18px 44px rgba(198,161,91,0.10)' }}
                className="bg-white/80 border border-aphoria-black/8 rounded-2xl p-8 cursor-default transition-colors duration-300 hover:border-aphoria-gold/25"
              >
                <h3 className="text-xl font-brand font-light text-aphoria-black mb-4">{card.title}</h3>
                <div className="space-y-4 text-[15px] text-aphoria-mid font-light leading-relaxed">
                  {card.paragraphs}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Customs Note */}
          <div className="bg-aphoria-gold/8 border border-aphoria-gold/20 rounded-2xl p-8 mb-20">
            <h3 className="text-xl font-brand font-light text-aphoria-black mb-3">International Orders — Customs & Duties</h3>
            <p className="text-[15px] text-aphoria-mid font-light leading-relaxed max-w-3xl">
              For orders shipped outside of the United States, your package may be subject to import duties, customs fees, or taxes imposed by your country's customs authority. These charges are <strong className="text-aphoria-black font-medium">not included in our product price or shipping cost</strong> and are the sole responsibility of the recipient. We have no control over these charges and cannot predict their amount. We recommend contacting your local customs office for information before placing your order.
            </p>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-3">Have Questions?</span>
            <h2 className="text-3xl font-brand font-light text-aphoria-black mb-8">Shipping FAQ</h2>
            <div className="space-y-0 border-t border-aphoria-black/8">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-aphoria-black/8">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                  >
                    <span className="text-[15px] font-medium text-aphoria-black group-hover:text-aphoria-gold transition-colors pr-8">{faq.q}</span>
                    <ChevronRight
                      size={16}
                      className={`text-aphoria-gold flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-90' : ''}`}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48 pb-5' : 'max-h-0'}`}>
                    <p className="text-[15px] text-aphoria-mid font-light leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white/80 border border-aphoria-black/8 rounded-2xl p-6">
              <p className="text-[13px] text-aphoria-mid font-light mb-2">Still have questions about your shipment?</p>
              <p className="text-aphoria-black font-medium text-[14px] mb-4">Our team responds within 24 hours.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-aphoria-black border border-aphoria-black rounded-full px-6 py-3 hover:bg-aphoria-black hover:text-white transition-all duration-300"
              >
                Contact Support
                <ChevronRight size={12} />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ShippingPolicy;
