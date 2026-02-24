import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const cookieTypes = [
  {
    type: 'Essential',
    color: 'bg-green-100 text-green-700',
    description: 'Required for the website to function. Cannot be disabled.',
    cookies: [
      { name: '_session_id', provider: 'Aphoria / Shopify', duration: 'Session', purpose: 'Maintains your shopping session and cart contents' },
      { name: '_csrf_token', provider: 'Shopify', duration: 'Session', purpose: 'Security token to prevent cross-site request forgery' },
      { name: 'cart', provider: 'Shopify', duration: '2 weeks', purpose: 'Stores cart items between visits' },
      { name: 'secure_customer_sig', provider: 'Shopify', duration: '20 years', purpose: 'Authenticates returning customers securely' },
    ],
  },
  {
    type: 'Analytics',
    color: 'bg-blue-100 text-blue-700',
    description: 'Help us understand how visitors use our site. Data is aggregated and anonymized.',
    cookies: [
      { name: '_ga', provider: 'Google Analytics', duration: '2 years', purpose: 'Distinguishes unique users for traffic reporting' },
      { name: '_ga_*', provider: 'Google Analytics (GA4)', duration: '2 years', purpose: 'Maintains session state and event tracking' },
      { name: '_gid', provider: 'Google Analytics', duration: '24 hours', purpose: 'Distinguishes users within a single day' },
      { name: '_gat', provider: 'Google Analytics', duration: '1 minute', purpose: 'Throttles request rate for analytics pings' },
    ],
  },
  {
    type: 'Marketing',
    color: 'bg-aphoria-gold/20 text-aphoria-black',
    description: 'Used to deliver relevant ads and measure campaign effectiveness.',
    cookies: [
      { name: '_fbp', provider: 'Meta (Facebook/Instagram)', duration: '3 months', purpose: 'Tracks visits for Facebook/Instagram ad targeting and retargeting' },
      { name: '_fbc', provider: 'Meta', duration: '2 years', purpose: 'Stores Facebook click identifier from ads' },
      { name: 'ttclid', provider: 'TikTok', duration: '7 days', purpose: 'Tracks ad clicks from TikTok campaigns' },
      { name: '_ttp', provider: 'TikTok Pixel', duration: '13 months', purpose: 'Measures performance of TikTok ad campaigns' },
    ],
  },
  {
    type: 'Preferences',
    color: 'bg-purple-100 text-purple-700',
    description: 'Remember your choices and personalize your experience.',
    cookies: [
      { name: 'locale', provider: 'Aphoria / Shopify', duration: '1 year', purpose: 'Stores your preferred language and currency' },
      { name: 'klaviyo_*', provider: 'Klaviyo / Omnisend', duration: '2 years', purpose: 'Personalizes email and SMS communications based on browsing' },
    ],
  },
];

const browsers = [
  { name: 'Google Chrome', url: 'https://support.google.com/chrome/answer/95647' },
  { name: 'Safari (Mac & iOS)', url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac' },
  { name: 'Firefox', url: 'https://support.mozilla.org/en-US/kb/block-websites-storing-cookies-site-data-firefox' },
  { name: 'Microsoft Edge', url: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
];

const optOuts = [
  { name: 'Google Analytics Opt-Out', url: 'https://tools.google.com/dlpage/gaoptout', desc: 'Browser add-on to disable GA tracking' },
  { name: 'Meta Ad Preferences', url: 'https://www.facebook.com/ads/preferences', desc: 'Manage Facebook & Instagram ad targeting' },
  { name: 'TikTok Ad Settings', url: 'https://www.tiktok.com/legal/privacy-policy', desc: 'Control TikTok personalized ads' },
  { name: 'Your Online Choices (EU)', url: 'https://www.youronlinechoices.com/', desc: 'Industry opt-out tool for behavioral advertising' },
];

const sections = [
  { id: 'what-are-cookies', title: '1. What Are Cookies?' },
  { id: 'types-we-use', title: '2. Cookies We Use' },
  { id: 'cookie-table', title: '3. Full Cookie List' },
  { id: 'manage', title: '4. Managing Cookies' },
  { id: 'opt-out', title: '5. Opt-Out Options' },
  { id: 'updates', title: '6. Policy Updates' },
  { id: 'contact', title: '7. Contact Us' },
];

const CookiePolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Cookie Policy | Aphoria Beauty Laboratory';
  }, []);

  return (
    <div className="min-h-screen bg-aphoria-bg text-aphoria-black font-sans antialiased">
      <main className="pt-28 pb-24">

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-aphoria-mid mb-10">
            <Link to="/" className="hover:text-aphoria-black transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-aphoria-black font-semibold">Cookie Policy</span>
          </nav>
          <div className="max-w-3xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold block mb-4">Transparency</span>
            <h1 className="text-5xl lg:text-7xl font-brand font-light tracking-tight text-aphoria-black leading-[0.95] mb-6">
              Cookie<br />
              <span className="italic text-aphoria-gold">Policy</span>
            </h1>
            <p className="text-aphoria-mid text-base font-light leading-relaxed max-w-xl">
              Effective date: January 1, 2026. We believe in complete transparency about the data we collect and why. This page explains exactly which cookies we use and how you can control them.
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
                    <a key={s.id} href={`#${s.id}`} className="text-[13px] text-aphoria-mid hover:text-aphoria-gold transition-colors duration-200 py-0.5">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <article className="flex-1 max-w-3xl">

              <section id="what-are-cookies" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  1. What Are Cookies?
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>Cookies are small text files placed on your device (computer, smartphone, tablet) when you visit a website. They allow the website to remember your actions and preferences over time, so you don't have to re-enter information each time you visit or navigate between pages.</p>
                  <p>Cookies cannot run programs, deliver viruses, or access your personal computer files. They are stored on your device and can only be read by the website that created them — or trusted third parties authorized by that website.</p>
                  <p>Some cookies are deleted when you close your browser ("session cookies"), while others persist on your device for a set period ("persistent cookies").</p>
                </div>
              </section>

              <section id="types-we-use" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  2. Cookies We Use
                </h2>
                <div className="space-y-4">
                  {cookieTypes.map((ct) => (
                    <div key={ct.type} className="bg-white/80 border border-aphoria-black/8 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${ct.color}`}>
                          {ct.type}
                        </span>
                      </div>
                      <p className="text-[14px] text-aphoria-mid font-light">{ct.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="cookie-table" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  3. Full Cookie List
                </h2>
                <div className="space-y-8">
                  {cookieTypes.map((ct) => (
                    <div key={ct.type}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${ct.color}`}>
                          {ct.type}
                        </span>
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-aphoria-black/8">
                        <table className="w-full text-[13px]">
                          <thead>
                            <tr className="bg-aphoria-black/4 text-left">
                              <th className="px-4 py-3 font-semibold text-aphoria-black/70 text-[11px] uppercase tracking-wider">Cookie</th>
                              <th className="px-4 py-3 font-semibold text-aphoria-black/70 text-[11px] uppercase tracking-wider">Provider</th>
                              <th className="px-4 py-3 font-semibold text-aphoria-black/70 text-[11px] uppercase tracking-wider">Duration</th>
                              <th className="px-4 py-3 font-semibold text-aphoria-black/70 text-[11px] uppercase tracking-wider">Purpose</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-aphoria-black/5 bg-white">
                            {ct.cookies.map((c) => (
                              <tr key={c.name} className="hover:bg-aphoria-bg/30 transition-colors">
                                <td className="px-4 py-3 font-mono text-[12px] text-aphoria-black">{c.name}</td>
                                <td className="px-4 py-3 text-aphoria-mid">{c.provider}</td>
                                <td className="px-4 py-3 text-aphoria-mid whitespace-nowrap">{c.duration}</td>
                                <td className="px-4 py-3 text-aphoria-mid">{c.purpose}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="manage" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  4. Managing Cookies
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>You have full control over cookies through your browser settings. Most browsers allow you to view, delete, block, and allow cookies. Below are links to cookie management instructions for popular browsers:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {browsers.map((b) => (
                      <a
                        key={b.name}
                        href={b.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-white/80 border border-aphoria-black/8 rounded-xl px-5 py-4 hover:border-aphoria-gold hover:text-aphoria-gold transition-all duration-200 text-aphoria-black"
                      >
                        <span className="text-[14px] font-medium">{b.name}</span>
                        <ChevronRight size={14} className="text-aphoria-gold" />
                      </a>
                    ))}
                  </div>
                  <p className="mt-4">Please note that disabling certain cookies (particularly Essential cookies) may affect the functionality of our website, including your ability to add items to your cart or complete purchases.</p>
                </div>
              </section>

              <section id="opt-out" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  5. Opt-Out Options
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>You can opt out of specific third-party tracking and advertising cookies using the tools below. These do not affect essential functionality:</p>
                  <div className="space-y-3">
                    {optOuts.map((o) => (
                      <a
                        key={o.name}
                        href={o.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-between bg-white/80 border border-aphoria-black/8 rounded-xl px-5 py-4 hover:border-aphoria-gold transition-all duration-200 group"
                      >
                        <div>
                          <p className="text-[14px] font-medium text-aphoria-black group-hover:text-aphoria-gold transition-colors">{o.name}</p>
                          <p className="text-[12px] text-aphoria-mid font-light mt-0.5">{o.desc}</p>
                        </div>
                        <ChevronRight size={14} className="text-aphoria-gold flex-shrink-0 mt-1" />
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              <section id="updates" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  6. Policy Updates
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>We may update this Cookie Policy from time to time as we introduce new technologies or change the ways we use data. The effective date at the top of this page will always reflect the most recent version. We encourage you to review this page periodically.</p>
                  <p>For significant changes that affect how we use your data, we will notify you by email or via a notice on our website.</p>
                </div>
              </section>

              <section id="contact" className="mb-12 scroll-mt-28">
                <h2 className="text-2xl font-brand font-light text-aphoria-black mb-4 pb-3 border-b border-aphoria-black/8">
                  7. Contact Us
                </h2>
                <div className="space-y-4 text-[15px] text-aphoria-mid leading-relaxed font-light">
                  <p>If you have questions about our use of cookies or this policy, please contact us:</p>
                  <div className="bg-white/80 border border-aphoria-black/8 rounded-2xl p-6 mt-4 space-y-2">
                    <p className="text-aphoria-black font-medium">Aphoria Beauty Laboratory</p>
                    <p>Email: <a href="mailto:privacy@aphoriabeauty.com" className="text-aphoria-gold hover:underline">privacy@aphoriabeauty.com</a></p>
                    <p>Support: <Link to="/contact" className="text-aphoria-gold hover:underline">Contact Form</Link></p>
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

export default CookiePolicy;
