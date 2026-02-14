import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="sm:px-6 lg:px-8 w-full max-w-7xl mr-auto ml-auto py-16 md:py-24 px-4 bg-aphoria-bg">
      <div className="relative pt-20 [animation:fadeSlideIn_0.8s_ease-out_0.1s_both] animate-on-scroll">
        <style>
          {`@keyframes floatBounce {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }`}
        </style>
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wide border rounded-full px-3 py-1 text-aphoria-gold bg-aphoria-gold/5 border-aphoria-gold/20 animate-[floatBounce_3s_ease-in-out_infinite]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-aphoria-gold"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            </svg>
            Start Your Transformation
          </span>
        </div>

        <div className="text-center max-w-3xl mt-6 mr-auto ml-auto">
          <h2 className="md:text-6xl text-4xl font-brand font-light text-aphoria-black tracking-tight">
            Ready to Transform
          </h2>
          <h2 className="text-4xl md:text-6xl font-brand font-light tracking-tight text-aphoria-black mt-1">
            Your{' '}
            <span className="bg-clip-text italic font-serif bg-gradient-to-r from-aphoria-gold via-aphoria-green to-aphoria-gold text-transparent">
              Skin's Future?
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-aphoria-mid leading-relaxed">
            Join our exclusive community and discover how bioactive formulations from the Avocado Mask and 24 Gold Mask
            can revolutionize your skincare ritual. Get early access to new launches, clinical insights, and
            transformative protocols.
          </p>

          {/* CTA Button - Premium */}
          <div className="relative inline-block group mt-8">
            {/* Glow background */}
            <div
              className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 blur-xl"
              style={{
                background:
                  'linear-gradient(135deg, rgba(198,161,91,0.4) 0%, rgba(15,59,46,0.4) 50%, rgba(198,161,91,0.4) 100%)',
                animation: 'pulse 3s ease-in-out infinite'
              }}
            ></div>

            {/* Button */}
            <button className="relative z-10 overflow-hidden transition-all duration-300 ease-out active:scale-[0.98] group-hover:scale-[1.02] text-white rounded-xl pt-4 pr-10 pb-4 pl-10 shadow-[0_20px_60px_rgba(198,161,91,0.3)] group-hover:shadow-[0_25px_70px_rgba(198,161,91,0.5)]"
              style={{
                background: 'linear-gradient(135deg, #C6A15B 0%, #0F3B2E 50%, #C6A15B 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 6s ease infinite'
              }}
            >
              <style>
                {`@keyframes gradientShift {
                  0%, 100% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                }`}
              </style>

              {/* Inner shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transform: 'translateX(-100%)',
                  animation: 'shine 2s ease-in-out infinite'
                }}
              ></div>
              <style>
                {`@keyframes shine {
                  0% { transform: translateX(-100%); }
                  50%, 100% { transform: translateX(100%); }
                }`}
              </style>

              <span className="relative z-10 inline-flex items-center gap-2 font-semibold text-[15px] tracking-wide">
                Join Our Exclusive List
                <svg
                  className="h-5 w-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7"></path>
                </svg>
              </span>

              {/* Bottom shimmer */}
              <span className="pointer-events-none absolute bottom-0 left-1/2 right-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 transition-[left,right] duration-500 ease-out group-hover:left-0 group-hover:right-0"></span>
            </button>
          </div>

          {/* Separator */}
          <div className="relative mt-14">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-6">
              <span className="block mx-auto w-80 h-10 rounded-full bg-aphoria-gold/20 blur-2xl opacity-70"></span>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-aphoria-black/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
