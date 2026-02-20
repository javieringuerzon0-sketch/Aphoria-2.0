import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [time, setTime] = useState('');

  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m left today`;
  };

  useEffect(() => {
    setTime(calculateTimeLeft());
    const interval = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
};

export default CountdownTimer;
