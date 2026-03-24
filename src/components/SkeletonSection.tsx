import React from 'react';

interface SkeletonSectionProps {
  height?: string;
}

/**
 * CSS-only skeleton placeholder for lazy-loaded sections.
 * Uses background-position animation (GPU-friendly, no layout thrash).
 */
const SkeletonSection: React.FC<SkeletonSectionProps> = ({ height = '400px' }) => (
  <div
    style={{
      height,
      background: 'linear-gradient(90deg, #FAF8F5 0%, #EDE9E3 50%, #FAF8F5 100%)',
      backgroundSize: '200% 100%',
      animation: 'skeletonShimmer 2s linear infinite',
    }}
  />
);

export default SkeletonSection;
