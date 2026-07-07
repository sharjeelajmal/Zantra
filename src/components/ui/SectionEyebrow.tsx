import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SectionEyebrowProps {
  children: ReactNode;
  centered?: boolean;
  className?: string;
}

export function SectionEyebrow({ children, centered = false, className }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        'font-label-md text-label-md font-bold text-primary uppercase tracking-[0.12em] mb-3',
        centered && 'text-center',
        className,
      )}
    >
      {children}
    </p>
  );
}
