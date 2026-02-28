import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'products', title: '2. Products & Descriptions' },
  { id: 'orders', title: '3. Orders & Payment' },
  { id: 'shipping', title: '4. Shipping & Delivery' },
  { id: 'returns', title: '5. Returns & Refunds' },
  { id: 'prohibited', title: '6. Prohibited Uses' },
  { id: 'intellectual-property', title: '7. Intellectual Property' },
  { id: 'disclaimer', title: '8. Disclaimer of Warranties' },
  { id: 'liability', title: '9. Limitation of Liability' },
  { id: 'governing-law', title: '10. Governing Law' },
  { id: 'changes', title: '11. Changes to Terms' },
  { id: 'contact', title: '12. Contact Us' },
];

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms of Service | Aphoria Beauty Laboratory';
  }, []);

  return (
    <div className="min-h-screen bg-aphoria-bg text-aphoria-black font-sans antialiased">
      <main className="pt-28 pb-24">

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-aphoria-mid mb-10">
            <Link to="/" className="hover:text-aphoria-black transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-aphoria-black font-semibold">Terms of Service</span>
          </nav>

          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-4">Legal</span>
            <h1 className="text-5xl lg:text-7xl font-brand font-light tracking-tight text-aphoria-black leading-[0.95] mb-6">
              Terms of<br />
              <span className="italic text-aphoria-gold">Service</span>
            </h1>
            <p className="text-aphoria-mid text-base font-light leading-relaxed max-w-xl">
              Effective date: January 1, 2026. By accessing or using our website and purchasing our products, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Sidebar TOC */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-28 bg-white/80 backdrop-blur-sm border border-aphoria-black/8 rounded-2xl p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-aphoria-mid mb-4">Contents</p>
                <nav className="flex flex-col gap-2">
                  {sections.map(s => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="text-[13px] text-aphoria-mid hover:text-aphoria-gold transition-colors duration-200 py-0.5"
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <article className="flex-1 max-w-2xl">

              <section id="acceptance" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  1. Acceptance of Terms
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>By accessing our website at <span className="text-aphoria-black">aphoriabeauty.com</span> or making a purchase, you confirm that you are at least 16 years of age and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website or services.</p>
                  <p>These Terms of Service apply to all users of the site, including browsers, vendors, customers, merchants, and contributors of content.</p>
                </div>
              </section>

              <section id="products" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  2. Products & Descriptions
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>We have made every effort to display our products and their descriptions as accurately as possible. However, we cannot guarantee that your screen's display of colors and textures accurately reflects the actual product.</p>
                  <p><strong className="text-aphoria-black font-medium">Skincare disclaimer:</strong> Our products are cosmetic formulations intended for external use only. Clinical claims referenced on our site are based on independent ingredient studies and user reports. Individual results may vary. Our products are not intended to diagnose, treat, cure, or prevent any disease or medical condition. If you have a skin condition or medical concern, consult a dermatologist before use.</p>
                  <p>We reserve the right to limit the sale of our products to any person, geographic region, or jurisdiction, and to discontinue any product at any time.</p>
                </div>
              </section>

              <section id="orders" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  3. Orders & Payment
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>By placing an order, you represent that the information you provide is accurate, current, and complete. We reserve the right to refuse or cancel any order for reasons including product unavailability, errors in product descriptions or pricing, or suspicion of fraudulent activity.</p>
                  <p><strong className="text-aphoria-black font-medium">Pricing:</strong> All prices are listed in US Dollars (USD) unless otherwise stated. We reserve the right to change prices at any time without notice. Promotional prices are valid for the duration of the promotion only.</p>
                  <p><strong className="text-aphoria-black font-medium">Payment:</strong> We accept major credit and debit cards, PayPal, and other payment methods available at checkout. All transactions are processed securely through our payment provider. By submitting an order, you authorize us to charge your payment method for the total amount of your order.</p>
                  <p><strong className="text-aphoria-black font-medium">Taxes:</strong> Prices displayed do not include applicable taxes. Any applicable taxes will be calculated and displayed at checkout based on your shipping address.</p>
                </div>
              </section>

              <section id="shipping" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  4. Shipping & Delivery
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>We process orders within 1–3 business days of receipt. Estimated delivery times are provided at checkout and vary by destination. We ship internationally to most countries worldwide.</p>
                  <p>Delivery times are estimates only and are not guaranteed. We are not responsible for delays caused by customs, postal services, weather events, or other circumstances beyond our control. Risk of loss and title for products purchased pass to you upon delivery to the carrier.</p>
                  <p>For detailed shipping rates, timelines, and policies, please refer to our <Link to="/shipping-policy" className="text-aphoria-gold hover:underline">Shipping Policy</Link>.</p>
                </div>
              </section>

              <section id="returns" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  5. Returns & Refunds
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p><strong className="text-aphoria-black font-medium">60-Day Money-Back Guarantee:</strong> We stand behind the efficacy of our formulations. If you are not satisfied with your results within 60 days of your purchase date, contact our team for a full refund — no questions asked.</p>
                  <p>To initiate a return or refund request, contact us at <a href="mailto:support@aphoriabeauty.com" className="text-aphoria-gold hover:underline">support@aphoriabeauty.com</a> with your order number. Once approved, refunds are processed within 5–10 business days to your original payment method.</p>
                  <p>Products that are damaged, counterfeit, or not purchased directly from Aphoria Beauty Laboratory are not eligible for our guarantee. We reserve the right to limit or refuse refunds in cases of suspected abuse of this policy.</p>
                </div>
              </section>

              <section id="prohibited" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  6. Prohibited Uses
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>You may not use our website or services for any of the following purposes:</p>
                  <ul className="space-y-2 list-none pl-0">
                    {[
                      'Any unlawful purpose or in violation of any applicable laws or regulations',
                      'To solicit others to perform or participate in any unlawful acts',
                      'To violate any international, federal, provincial, or state regulations or laws',
                      'To transmit or procure the sending of any unsolicited advertising or promotional material (spam)',
                      'To impersonate or attempt to impersonate Aphoria, our employees, or other users',
                      'To engage in any conduct that restricts or inhibits anyone\'s use or enjoyment of the site',
                      'To harvest or collect personal information about other users without their consent',
                      'To use automated tools (bots, scrapers) to access or copy content from our site',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-aphoria-gold mt-1 flex-shrink-0">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section id="intellectual-property" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  7. Intellectual Property
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>All content on this website — including but not limited to text, graphics, logos, images, product descriptions, videos, and software — is the exclusive property of Aphoria Beauty Laboratory and is protected by international copyright, trademark, and intellectual property laws.</p>
                  <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from our website without our express written consent. Unauthorized use may result in legal action.</p>
                  <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Aphoria Beauty Laboratory.</p>
                </div>
              </section>

              <section id="disclaimer" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  8. Disclaimer of Warranties
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>Our website and services are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
                  <p>We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy or completeness of any information on this site.</p>
                  <p>Some jurisdictions do not allow the exclusion of implied warranties, so the above exclusions may not apply to you.</p>
                </div>
              </section>

              <section id="liability" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  9. Limitation of Liability
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>To the fullest extent permitted by applicable law, Aphoria Beauty Laboratory, its directors, employees, partners, agents, suppliers, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our products, website, or services.</p>
                  <p>In no event shall our total liability to you exceed the amount you paid for the product(s) giving rise to the claim. This limitation applies regardless of the theory of liability (contract, tort, strict liability, or otherwise).</p>
                  <p>If you have a skin reaction to any of our products, discontinue use immediately and consult a healthcare professional. We are not liable for individual allergic reactions or sensitivities.</p>
                </div>
              </section>

              <section id="governing-law" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  10. Governing Law
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration, except where prohibited by law.</p>
                  <p>If any provision of these Terms is deemed unlawful, void, or unenforceable, that provision shall be severed from these Terms and shall not affect the validity and enforceability of the remaining provisions.</p>
                </div>
              </section>

              <section id="changes" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  11. Changes to Terms
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>We reserve the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. We will notify users of material changes via email or a prominent notice on our website.</p>
                  <p>Your continued use of our website or services after any changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.</p>
                </div>
              </section>

              <section id="contact" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  12. Contact Us
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>Questions about these Terms of Service should be directed to our legal team:</p>
                  <div className="bg-white/80 border border-aphoria-black/8 rounded-2xl p-6 mt-4 space-y-2">
                    <p className="text-aphoria-black font-medium">Aphoria Beauty Laboratory</p>
                    <p>Email: <a href="mailto:support@aphoriabeauty.com" className="text-aphoria-gold hover:underline">support@aphoriabeauty.com</a></p>
                    <p>Support: <Link to="/contact" className="text-aphoria-gold hover:underline">Contact Form</Link></p>
                    <p>Response time: Within 2 business days</p>
                  </div>
                </div>
              </section>

            </article>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
