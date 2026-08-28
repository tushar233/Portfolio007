import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  fadeInUp,
  fadeInDown,
  slideInLeft,
  slideInRight,
  scaleIn,
  staggerContainer,
} from '../../hooks/useAnimations';

export type SectionAnimation =
  | 'fadeUp'
  | 'fadeDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'stagger';

const VARIANTS: Record<SectionAnimation, Variants> = {
  fadeUp:    fadeInUp,
  fadeDown:  fadeInDown,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
  scale:     scaleIn,
  stagger:   staggerContainer,
};

const blurUp: Variants = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.62, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

interface SectionRevealProps {
  children: React.ReactNode;
  animation?: SectionAnimation | 'blurUp';
  className?: string;
  as?: 'section' | 'div' | 'header';
  ariaLabel?: string;
  delay?: number;
}

export default function SectionReveal({
  children,
  animation = 'fadeUp',
  className = '',
  as = 'section',
  ariaLabel,
  delay = 0,
}: SectionRevealProps) {
  const Component = motion[as];
  const variants = animation === 'blurUp' ? blurUp : VARIANTS[animation];

  return (
    <Component
      className={`page-section ${className}`.trim()}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Component>
  );
}
