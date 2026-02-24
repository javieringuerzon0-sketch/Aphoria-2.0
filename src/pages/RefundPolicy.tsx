import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Contact Us',
    desc: 'Email support@aphoriabeauty.com with your order number and reason. No lengthy forms — just a quick message.',
  },
  {
    number: '02',
    title: 'We Approve',
    desc: 'Our team reviews and approves your request within 1–2 business days. For USA orders, we send a prepaid return label.',
  },
  {
    number: '03',
    title: 'Refund Issued',
    desc: 'Once we receive your return (or approve your claim), your refund is processed within 5–10 business days to your original payment method.',
  },
];

const eligible = [
  'Unopened products in original packaging',
  'Products used 1–2 times that did not meet your expectations',
  'Products delivered damaged, defective, or incorrect',
  'Orders where you experience an adverse skin reaction',
];

const notEligible = [
  'Products purchased through third-party retailers (Amazon, eBay, etc.)',
  'Products returned after 60 days from purchase date',
  'Products that have been more than 50% used',
  'Orders placed with fraudulent payment methods',
];

const faqs = [
  {
    q: 'Can I return a product I\'ve already opened?',
    a: 'Yes — we understand skincare needs time to work. If you\'ve opened a product but are not satisfied after trying it, you may return it within 60 days provided the product is at least 50% full. For lightly used products (1–2 applications), we accept returns unconditionally within the 60-day window.',
  },
  {
    q: 'What if my product arrived damaged or broken?',
    a: 'If your order arrives damaged, defective, or contains the wrong item, we will replace it or issue a full refund immediately — regardless of the product\'s condition or how much has been used. Simply email us a photo of the damaged item within 7 days of delivery.',
  },
  {
    q: 'How long does it take to receive my refund?',
    a: 'Once we receive your returned item (or approve your claim for damaged goods), refunds are processed within 5–10 business days. The time for the refund to appear in your account depends on your bank or card issuer — typically 3–5 additional business days.',
  },
  {
    q: 'I\'m outside the USA — do I pay for return shipping?',
    a: 'For international returns, the customer is responsible for return shipping costs unless the product arrived damaged or defective. We recommend using a tracked shipping method and keeping your receipt, as we cannot be responsible for returns lost in transit.',
  },
  {
    q: 'I\'m past the 60-day window — what can you do?',
    a: 'While our formal guarantee covers 60 days, we review every case individually. If you\'ve had an exceptional circumstance, contact us — we genuinely want you to be satisfied and will do what we can to help.',
  },
  {
    q: 'Will I receive a refund or store credit?',
    a: 'Refunds are always issued to your original payment method (credit card, PayPal, etc.). We do not issue store credit unless you specifically request it as a preference.',
  },
];

const RefundPolicy: React.FC = () => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Return & Refund Policy | Aphoria Beauty Laboratory';
  }, []);

  return (
    <div className="min-h-screen bg-aphoria-bg text-aphoria-black font-sans antialiased">
      <main className="pt-28 pb-24">

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-aphoria-mid mb-10">
            <Link to="/" className="hover:text-aphoria-black transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-aphoria-black font-semibold">Return & Refund Policy</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-4">Our Guarantee</span>
              <h1 className="text-5xl lg:text-6xl font-brand font-light tracking-tight text-aphoria-black leading-[0.95] mb-6">
                60-Day<br />
                <span className="italic text-aphoria-gold">Money-Back.</span><br />
                No Questions Asked.
              </h1>
              <p className="text-aphoria-mid text-base font-light leading-relaxed mb-8 max-w-lg">
                We are confident in the efficacy of every Aphoria formulation. If you don't see visible results within 60 days, we will refund you in full — completely hassle-free.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[12px] font-medium text-aphoria-black">
                  <CheckCircle size={16} className="text-aphoria-gold flex-shrink-0" />
                  Free return shipping (USA)
                </div>
                <div className="flex items-center gap-2 text-[12px] font-medium text-aphoria-black">
                  <CheckCircle size={16} className="text-aphoria-gold flex-shrink-0" />
                  Refund to original payment
                </div>
                <div className="flex items-center gap-2 text-[12px] font-medium text-aphoria-black">
                  <CheckCircle size={16} className="text-aphoria-gold flex-shrink-0" />
                  5–10 business days processing
                </div>
              </div>
            </div>

            <div className="bg-aphoria-green rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #C6A15B 0%, transparent 60%)' }}
              />
              <div className="relative z-10">
                <RefreshCw size={32} className="text-aphoria-gold mb-6" />
                <p className="text-4xl font-brand font-light text-aphoria-gold mb-2">60 Days</p>
                <p className="text-white/60 text-sm font-light mb-8">Risk-Free Trial Period</p>
                <div className="space-y-3">
                  {['No lengthy forms', 'No return fees (USA)', 'No judgment', 'Full refund, always'].map(item => (
                    <div key={item} className="flex items-center gap-3 text-[13px] text-white/80">
                      <span className="text-aphoria-gold">✦</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* 3-Step Process */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-3">Simple Process</span>
              <h2 className="text-3xl lg:text-4xl font-brand font-light text-aphoria-black">How to Return or Refund</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
              {/* Connector line (desktop only) */}
              <div className="hidden lg:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-aphoria-gold/20" />
              {steps.map((step) => (
                <div key={step.number} className="bg-white/80 border border-aphoria-black/8 rounded-2xl p-8 relative">
                  <div className="w-14 h-14 bg-aphoria-gold/10 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-aphoria-gold font-brand text-xl font-light">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-medium text-aphoria-black mb-3">{step.title}</h3>
                  <p className="text-[14px] text-aphoria-mid font-light leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* What's eligible */}
            <div className="bg-white/80 border border-aphoria-black/8 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-aphoria-black">Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                {eligible.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-aphoria-mid font-light">
                    <span className="text-aphoria-gold mt-0.5 flex-shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* What's not eligible */}
            <div className="bg-white/80 border border-aphoria-black/8 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                  <XCircle size={16} className="text-red-400" />
                </div>
                <h3 className="text-lg font-medium text-aphoria-black">Not Eligible</h3>
              </div>
              <ul className="space-y-3">
                {notEligible.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] text-aphoria-mid font-light">
                    <span className="text-red-300 mt-0.5 flex-shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Damaged / Defective — always covered */}
          <div className="bg-aphoria-gold/8 border border-aphoria-gold/20 rounded-2xl p-8 mb-20 flex items-start gap-6">
            <div className="w-12 h-12 bg-aphoria-gold/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle size={22} className="text-aphoria-gold" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-aphoria-black mb-2">Damaged or Defective Items — Always Covered</h3>
              <p className="text-[15px] text-aphoria-mid font-light leading-relaxed max-w-2xl">
                If your Aphoria product arrives damaged, broken, or not as described, we will replace it or issue a full refund immediately — regardless of how much product has been used, and regardless of the 60-day window. Simply email us a photo within 7 days of delivery. Your safety and satisfaction are non-negotiable.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-3">Common Questions</span>
            <h2 className="text-3xl font-brand font-light text-aphoria-black mb-8">Refund FAQ</h2>
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
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-64 pb-5' : 'max-h-0'}`}>
                    <p className="text-[15px] text-aphoria-mid font-light leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white/80 border border-aphoria-black/8 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-aphoria-black font-medium mb-1">Ready to initiate a return?</p>
              <p className="text-[13px] text-aphoria-mid font-light">Our team responds within 24 hours.</p>
            </div>
            <a
              href="mailto:support@aphoriabeauty.com"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] bg-aphoria-black text-white rounded-full px-8 py-4 hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-300 flex-shrink-0"
            >
              Start a Return
              <ChevronRight size={12} />
            </a>
          </div>

        </div>
      </main>
    </div>
  );
};

export default RefundPolicy;
