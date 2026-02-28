import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const sections = [
  { id: 'information-we-collect', title: '1. Information We Collect' },
  { id: 'how-we-use', title: '2. How We Use Your Information' },
  { id: 'sharing', title: '3. Sharing Your Information' },
  { id: 'cookies', title: '4. Cookies & Tracking' },
  { id: 'data-retention', title: '5. Data Retention' },
  { id: 'your-rights', title: '6. Your Rights' },
  { id: 'security', title: '7. Security' },
  { id: 'third-party', title: '8. Third-Party Links' },
  { id: 'children', title: '9. Children\'s Privacy' },
  { id: 'changes', title: '10. Changes to This Policy' },
  { id: 'contact', title: '11. Contact Us' },
];

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy | Aphoria Beauty Laboratory';
  }, []);

  return (
    <div className="min-h-screen bg-aphoria-bg text-aphoria-black font-sans antialiased">
      <main className="pt-28 pb-24">

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-aphoria-mid mb-10">
            <Link to="/" className="hover:text-aphoria-black transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-aphoria-black font-semibold">Privacy Policy</span>
          </nav>

          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-4">Legal</span>
            <h1 className="text-5xl lg:text-7xl font-brand font-light tracking-tight text-aphoria-black leading-[0.95] mb-6">
              Privacy<br />
              <span className="italic text-aphoria-gold">Policy</span>
            </h1>
            <p className="text-aphoria-mid text-base font-light leading-relaxed max-w-xl">
              Effective date: January 1, 2026. This policy explains how Aphoria Beauty Laboratory collects, uses, and protects your personal information.
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
            <article className="flex-1 max-w-2xl prose-custom">

              <section id="information-we-collect" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  1. Information We Collect
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p><strong className="text-aphoria-black font-medium">Information you provide directly:</strong> When you place an order, create an account, or contact us, we collect your name, email address, shipping address, billing address, and payment information. Payment card data is processed securely by our payment provider (Shopify Payments / Stripe) and is never stored on our servers.</p>
                  <p><strong className="text-aphoria-black font-medium">Information collected automatically:</strong> When you visit our website, we automatically collect certain technical information including your IP address, browser type and version, device type, operating system, pages visited, time spent on pages, and referring URLs. This helps us understand how our site is used and improve your experience.</p>
                  <p><strong className="text-aphoria-black font-medium">Information from third parties:</strong> We may receive information about you from third-party services such as social media platforms (if you interact with our social accounts), advertising partners, and analytics providers.</p>
                </div>
              </section>

              <section id="how-we-use" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  2. How We Use Your Information
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>We use the information we collect for the following purposes:</p>
                  <ul className="space-y-2 list-none pl-0">
                    {[
                      'To process and fulfill your orders, including sending confirmation and shipping notifications',
                      'To communicate with you about your account, orders, or customer service inquiries',
                      'To send promotional emails and marketing communications (only with your consent)',
                      'To personalize your experience and recommend products suited to your skin profile',
                      'To improve our website, products, and services through analytics',
                      'To detect, investigate, and prevent fraudulent transactions and other illegal activities',
                      'To comply with our legal obligations',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-aphoria-gold mt-1 flex-shrink-0">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section id="sharing" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  3. Sharing Your Information
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                  <p><strong className="text-aphoria-black font-medium">Service providers:</strong> We work with trusted third-party companies to operate our business — including payment processors (Shopify / Stripe), shipping carriers, email marketing platforms (Klaviyo / Omnisend), and analytics providers (Google Analytics). These partners are contractually bound to protect your data and may only use it to provide services on our behalf.</p>
                  <p><strong className="text-aphoria-black font-medium">Legal requirements:</strong> We may disclose your information when required by law, court order, or governmental authority, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</p>
                  <p><strong className="text-aphoria-black font-medium">Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website before your data is transferred.</p>
                </div>
              </section>

              <section id="cookies" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  4. Cookies & Tracking
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>We use cookies and similar tracking technologies to enhance your experience on our site. Cookies are small data files stored on your device.</p>
                  <p><strong className="text-aphoria-black font-medium">Essential cookies:</strong> Necessary for the website to function, including maintaining your shopping cart session and secure login.</p>
                  <p><strong className="text-aphoria-black font-medium">Analytics cookies:</strong> Help us understand how visitors interact with our site (e.g., Google Analytics). Data is aggregated and anonymized.</p>
                  <p><strong className="text-aphoria-black font-medium">Marketing cookies:</strong> Used to deliver relevant advertisements and track campaign performance (e.g., Meta Pixel, TikTok Pixel).</p>
                  <p>You may disable cookies through your browser settings; however, some features of our website may not function properly if cookies are disabled.</p>
                </div>
              </section>

              <section id="data-retention" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  5. Data Retention
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.</p>
                  <p>Order information is retained for a minimum of 7 years for accounting and legal compliance purposes. If you request deletion of your account, we will erase your personal data within 30 days, except where retention is legally required.</p>
                </div>
              </section>

              <section id="your-rights" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  6. Your Rights
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                  <ul className="space-y-2 list-none pl-0">
                    {[
                      'Right to access — request a copy of the personal data we hold about you',
                      'Right to rectification — request correction of inaccurate or incomplete data',
                      'Right to erasure — request deletion of your personal data ("right to be forgotten")',
                      'Right to restriction — request that we limit the processing of your data',
                      'Right to data portability — receive your data in a structured, machine-readable format',
                      'Right to object — object to the processing of your data for marketing purposes',
                      'Right to withdraw consent — withdraw consent at any time where processing is based on consent',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-aphoria-gold mt-1 flex-shrink-0">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>To exercise any of these rights, please contact us at <a href="mailto:support@aphoriabeauty.com" className="text-aphoria-gold hover:underline">support@aphoriabeauty.com</a>. We will respond within 30 days.</p>
                </div>
              </section>

              <section id="security" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  7. Security
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Our website uses SSL/TLS encryption for all data transmission. Payment processing is handled by PCI-DSS compliant providers.</p>
                  <p>While we take every reasonable precaution, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we continually work to improve our security practices.</p>
                </div>
              </section>

              <section id="third-party" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  8. Third-Party Links
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>Our website may contain links to third-party websites, social media platforms, and partner sites. We are not responsible for the privacy practices of those websites and encourage you to review their privacy policies independently. This Privacy Policy applies solely to information collected by Aphoria Beauty Laboratory.</p>
                </div>
              </section>

              <section id="children" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  9. Children's Privacy
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>Our website and products are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information immediately. If you believe we have inadvertently collected information from a child, please contact us at <a href="mailto:support@aphoriabeauty.com" className="text-aphoria-gold hover:underline">support@aphoriabeauty.com</a>.</p>
                </div>
              </section>

              <section id="changes" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  10. Changes to This Policy
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of significant changes by posting the new policy on this page with an updated effective date, and by sending an email notification to customers with active accounts where required by law.</p>
                  <p>Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.</p>
                </div>
              </section>

              <section id="contact" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  11. Contact Us
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Data Protection team:</p>
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

export default PrivacyPolicy;
