import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-aphoria-bg flex flex-col items-center justify-center px-6 text-center">
      <span className="text-[10px] uppercase tracking-[0.4em] text-aphoria-gold font-bold mb-4">
        Page Not Found
      </span>
      <h1 className="text-[64px] md:text-[96px] font-brand font-light text-aphoria-black leading-none mb-6">
        404
      </h1>
      <p className="text-[16px] text-aphoria-mid font-light max-w-md mb-10">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-aphoria-black px-10 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg"
        >
          Back to Home
        </Link>
        <Link
          to="/diagnostic"
          className="inline-flex items-center gap-2 rounded-full border border-aphoria-black/15 px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-aphoria-black/70 hover:border-aphoria-black/40 hover:text-aphoria-black transition-all duration-500"
        >
          Take the Diagnostic
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
