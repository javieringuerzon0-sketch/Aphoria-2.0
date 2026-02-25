import React, { useState } from 'react';
import { FaInstagram, FaPinterest, FaTiktok } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { HiChevronDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What makes Aphoria different?",
      answer: "Aphoria combines clinical-grade bioactive ingredients with luxurious formulations. Our 28-day protocols are backed by dermatological science and designed for measurable transformation."
    },
    {
      question: "How do I use the 24 Gold Mask?",
      answer: "Apply a thin layer to clean, dry skin 2-3 times per week. Leave on for 15-20 minutes, then rinse with lukewarm water. Follow with your regular skincare routine."
    },
    {
      question: "What are the benefits of Avocado Mask?",
      answer: "The Avocado Mask deeply nourishes and hydrates, locks in moisture, and keeps skin calm and supple. Rich in vitamins and essential fatty acids for optimal skin health."
    },
    {
      question: "Are Aphoria products cruelty-free?",
      answer: "Yes, all Aphoria formulations are cruelty-free and developed with sustainable practices. We never test on animals."
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-aphoria-bg to-white/50 pt-20 pb-0">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          {/* Left: Brand */}
          <div>
            <Link to="/">
              <h3 className="text-6xl md:text-7xl font-brand font-light text-aphoria-black tracking-tight mb-2">
                Aphoria
              </h3>
            </Link>
            <p className="text-lg font-serif italic text-aphoria-mid/80">
              The Science of Transformation—
            </p>
          </div>

          {/* Right: Message */}
          <div className="max-w-md text-right">
            <div className="inline-flex items-start gap-2">
              <span className="text-aphoria-gold text-2xl mt-1">✦</span>
              <p className="text-base md:text-lg font-serif italic text-aphoria-black/80 leading-relaxed">
                We are currently formulating bioactive protocols
                <br />
                for luminous skin and crafting excellence
                <br />
                from our laboratory.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-12">
          {/* Navigation Links - Column 1 */}
          <div className="lg:col-span-2">
            <nav className="flex flex-col space-y-4 text-[15px] text-aphoria-black font-medium text-left">
              <Link to="/" className="hover:text-aphoria-gold transition-colors duration-200">
                Home
              </Link>
              <a href="/#ritual" className="hover:text-aphoria-gold transition-colors duration-200">
                Bundle
              </a>
              <Link to="/product/24-gold-mask" className="hover:text-aphoria-gold transition-colors duration-200">
                24 Gold Mask
              </Link>
              <Link to="/product/avocado-mask" className="hover:text-aphoria-gold transition-colors duration-200">
                Avocado Mask
              </Link>
              <a href="/#science" className="hover:text-aphoria-gold transition-colors duration-200">
                Science
              </a>
              <a href="/#ritual" className="hover:text-aphoria-gold transition-colors duration-200">
                Ritual
              </a>
              <a href="/#testimonials" className="hover:text-aphoria-gold transition-colors duration-200">
                Testimonials
              </a>
              <Link to="/contact" className="hover:text-aphoria-gold transition-colors duration-200">
                Contact
              </Link>
            </nav>
          </div>

          {/* Navigation Links - Column 2 */}
          <div className="lg:col-span-2">
            <nav className="flex flex-col space-y-4 text-[15px] text-aphoria-black font-medium text-left">
              <Link to="/about" className="hover:text-aphoria-gold transition-colors duration-200">
                About Us
              </Link>
              <Link to="/shipping-policy" className="hover:text-aphoria-gold transition-colors duration-200">
                Shipping Policy
              </Link>
              <Link to="/refund-policy" className="hover:text-aphoria-gold transition-colors duration-200">
                Return & Refunds
              </Link>
              <Link to="/privacy-policy" className="hover:text-aphoria-gold transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-aphoria-gold transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="hover:text-aphoria-gold transition-colors duration-200">
                Cookie Policy
              </Link>
            </nav>
          </div>

          {/* FAQ Card */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-sm border border-aphoria-black/10 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(198,161,91,0.15)] transition-all duration-300 group relative overflow-hidden text-left">
              <h4 className="text-2xl font-brand font-light text-aphoria-black mb-4 tracking-tight">FAQs</h4>
              <div className="flex flex-col gap-3 text-left">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-aphoria-black/10 last:border-0 pb-3 last:pb-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between text-left group/faq py-2"
                    >
                      <span className="text-sm font-medium text-aphoria-black group-hover/faq:text-aphoria-gold transition-colors">
                        {faq.question}
                      </span>
                      <HiChevronDown
                        className={`w-4 h-4 text-aphoria-gold transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 mt-2' : 'max-h-0'
                        }`}
                    >
                      <p className="text-sm text-aphoria-mid leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-sm border border-aphoria-black/10 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(15,59,46,0.15)] transition-all duration-300 group text-left">
              <div className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="flex items-center gap-3 text-aphoria-black hover:text-aphoria-gold transition-colors group/link"
                >
                  <div className="w-11 h-11 flex items-center justify-center bg-aphoria-bg/50 rounded-lg group-hover/link:bg-aphoria-gold/10 transition-colors">
                    <FaInstagram className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-[15px]">Instagram</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 text-aphoria-black hover:text-aphoria-gold transition-colors group/link"
                >
                  <div className="w-11 h-11 flex items-center justify-center bg-aphoria-bg/50 rounded-lg group-hover/link:bg-aphoria-gold/10 transition-colors">
                    <FaPinterest className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-[15px]">Pinterest</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 text-aphoria-black hover:text-aphoria-gold transition-colors group/link"
                >
                  <div className="w-11 h-11 flex items-center justify-center bg-aphoria-bg/50 rounded-lg group-hover/link:bg-aphoria-gold/10 transition-colors">
                    <FaTiktok className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-[15px]">TikTok</span>
                </a>

                <a
                  href="mailto:support@aphoriabeauty.com"
                  className="flex items-center gap-3 text-aphoria-black hover:text-aphoria-gold transition-colors group/link"
                >
                  <div className="w-11 h-11 flex items-center justify-center bg-aphoria-bg/50 rounded-lg group-hover/link:bg-aphoria-gold/10 transition-colors">
                    <HiMail className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-[15px]">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-aphoria-black via-aphoria-green to-aphoria-black mt-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/80">
            <p className="text-xs md:text-sm">
              © 2026 Aphoria Laboratories — All Rights Reserved.
            </p>
            <p className="text-xs md:text-sm font-light italic">
              Engineered for transformation, refined with luxury.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
