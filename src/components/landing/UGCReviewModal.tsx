import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShieldCheck, CheckCircle } from 'lucide-react';
import { Review } from '../../types';

interface UGCReviewModalProps {
  review: Review | null;
  productName: string;
  productPrice: number;
  productImg: string;
  onClose: () => void;
  onShopClick: () => void;
}

const verifiedDaysAgo = (id: number) => (id * 3 + 5) % 90 + 2;

const UGCReviewModal: React.FC<UGCReviewModalProps> = ({
  review,
  productName,
  productPrice,
  productImg,
  onClose,
  onShopClick,
}) => {
  useEffect(() => {
    if (!review) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [review, onClose]);

  return (
    <AnimatePresence>
      {review && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-0 md:p-6"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full md:max-w-[1100px] h-full md:h-auto md:max-h-[90vh] bg-white md:rounded-[24px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              aria-label="Close review"
              className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/95 backdrop-blur shadow-md hover:bg-aphoria-black hover:text-white transition-colors duration-300"
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className="relative w-full md:w-1/2 md:flex-shrink-0 bg-aphoria-bg/40 overflow-hidden aspect-[3/4] md:aspect-auto">
              <img
                src={review.img}
                alt={`Review by ${review.user}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-aphoria-black/85 backdrop-blur text-white px-3 py-1.5 rounded-full">
                <CheckCircle size={12} className="text-aphoria-gold" />
                <span className="text-[9px] font-bold uppercase tracking-[0.22em]">Verified Buyer</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col p-6 md:p-10 overflow-y-auto">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-aphoria-gold via-[#FFF4E0] to-aphoria-gold/50">
                  <div className="w-12 h-12 rounded-full bg-white overflow-hidden border-2 border-white">
                    <img src={review.img} alt={review.user} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-aphoria-black">
                    {review.user}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5 text-aphoria-gold">
                      {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] text-aphoria-mid uppercase tracking-wider">
                      Verified {verifiedDaysAgo(review.id ?? 1)} days ago
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 mb-6">
                <span className="text-[10px] uppercase tracking-[0.32em] text-aphoria-gold font-bold block mb-3">
                  Real result
                </span>
                <p className="font-brand text-[22px] md:text-[26px] text-aphoria-black leading-[1.35] tracking-tight">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="border-t border-aphoria-black/8 pt-5 mt-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-aphoria-bg/60 overflow-hidden flex-shrink-0 border border-aphoria-black/5">
                    <img src={productImg} alt={productName} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-aphoria-gold font-bold">She used</p>
                    <p className="text-[14px] font-medium text-aphoria-black">{productName}</p>
                  </div>
                  <span className="text-[18px] font-light text-aphoria-black tabular-nums">
                    ${productPrice.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => { onShopClick(); onClose(); }}
                  className="w-full h-12 bg-aphoria-black text-white rounded-full text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-aphoria-gold hover:text-aphoria-black transition-all duration-500 shadow-lg hover:shadow-xl active:scale-[0.98]"
                >
                  Shop This Look — ${productPrice.toFixed(2)}
                </button>

                <div className="flex items-center justify-center gap-4 mt-4 text-[10px] uppercase tracking-[0.22em] text-aphoria-mid">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={11} className="text-aphoria-gold" /> 30-Day Guarantee</span>
                  <span>•</span>
                  <span>Free Shipping</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UGCReviewModal;
