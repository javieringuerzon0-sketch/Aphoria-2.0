import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', color = 'currentColor' }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Minimalist "A" with luxury touch - Apple style */}
      <path
        d="M16 4L6 28H10.5L12.8 22H19.2L21.5 28H26L16 4Z M14 18L16 12L18 18H14Z"
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
      />
      {/* Subtle accent dot - luxury detail */}
      <circle cx="16" cy="8" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
};

export default Logo;
