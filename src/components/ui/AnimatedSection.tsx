'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface AnimatedSectionProps extends HTMLMotionProps<'section'> {
  children: ReactNode;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
};

export function AnimatedSection({ children, className, id, ...props }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={cn(id && 'scroll-mt-[4.5rem]', className)}
      {...fadeUp}
      {...props}
    >
      {children}
    </motion.section>
  );
}
