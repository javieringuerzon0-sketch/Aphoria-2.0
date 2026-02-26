import React, { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  name: string;
  city: string;
  product?: string;
  result?: string;
  time: string;
  image?: string;
}

const notifications: Notification[] = [
  {
    name: 'Sarah',
    city: 'Auckland',
    product: 'Gold Mask',
    time: '2 min ago',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    name: 'María',
    city: 'Toronto',
    product: 'Complete Kit',
    time: '5 min ago',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    name: 'Jessica',
    city: 'Vancouver',
    product: 'Avocado Mask',
    time: '8 min ago',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    name: 'Emily',
    city: 'Sydney',
    result: 'saw visible results in 21 days',
    time: '12 min ago',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    name: 'Sofia',
    city: 'Melbourne',
    product: 'Gold Mask',
    time: '15 min ago',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    name: 'Isabella',
    city: 'Wellington',
    result: 'joined the 28-day challenge',
    time: '18 min ago',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    name: 'Mia',
    city: 'London',
    product: 'Complete Kit',
    time: '22 min ago',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&w=160&h=160&q=80'
  },
  {
    name: 'Olivia',
    city: 'Manchester',
    product: 'Avocado Mask',
    time: '25 min ago',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=160&h=160&q=80'
  },
];

const LiveNotifications: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);

  useEffect(() => {
    // Check if sticky bar is visible
    const checkStickyBar = () => {
      const scrolled = window.scrollY > 600;
      setStickyBarVisible(scrolled);
    };

    window.addEventListener('scroll', checkStickyBar, { passive: true });
    checkStickyBar();

    // Esperar 10 segundos antes de mostrar la primera notificación
    const initialTimeout = setTimeout(() => {
      setShow(true);
    }, 10000);

    const interval = setInterval(() => {
      setShow(true);
      setCurrent(prev => (prev + 1) % notifications.length);

      // Ocultar después de 5 segundos
      setTimeout(() => setShow(false), 5000);
    }, 35000); // Mostrar cada 35 segundos

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      window.removeEventListener('scroll', checkStickyBar);
    };
  }, []);

  const notification = notifications[current];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            y: stickyBarVisible ? -120 : 0
          }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm hidden md:block"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-aphoria-black/10 p-4 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              {/* Customer Image */}
              {notification.image ? (
                <OptimizedImage
                  src={notification.image}
                  alt={notification.name}
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 rounded-full border-2 border-aphoria-gold/30 object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aphoria-gold/20 to-aphoria-green/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[18px]">
                    {notification.product ? '🛍️' : '✨'}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-aphoria-black font-medium leading-relaxed">
                  {notification.product ? (
                    <>
                      <strong className="text-aphoria-black">{notification.name}</strong> in {notification.city} just ordered{' '}
                      <strong className="text-aphoria-gold">{notification.product}</strong>
                    </>
                  ) : (
                    <>
                      <strong className="text-aphoria-black">{notification.name}</strong> {notification.result}
                    </>
                  )}
                </p>
                <p className="text-[10px] text-aphoria-mid mt-1 uppercase tracking-wide">
                  {notification.time}
                </p>
              </div>

              {/* Checkmark */}
              <div className="flex-shrink-0">
                <svg className="w-4 h-4 text-aphoria-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveNotifications;
