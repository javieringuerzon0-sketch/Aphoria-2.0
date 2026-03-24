import React from 'react';
import { useInView } from '../hooks/useInView';

interface FadeInViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the animation starts */
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav' | 'span' | 'li' | 'ul' | 'ol' | 'p';
}

/**
 * CSS-only fade-in-up reveal on scroll.
 * Replaces framer-motion's `whileInView` for simple entrance animations.
 * Zero JS animation overhead — uses CSS transitions only (GPU composited).
 * Supports all standard HTML element props (onClick, aria-*, etc.)
 */
const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  style,
  ...rest
}) => {
  const { ref, inView } = useInView();

  const Component = Tag as any;
  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
        transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: inView ? 'auto' : 'opacity, transform',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default FadeInView;
