import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface IconBoxProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'size-9 rounded-xl',
  md: 'size-11 rounded-xl',
  lg: 'size-12 rounded-2xl',
};

/** Transparent frame for 3D PNG icons — no clip, no flat fill */
export function IconBox({ children, className, size = 'md' }: IconBoxProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center overflow-visible',
        'bg-transparent',
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
