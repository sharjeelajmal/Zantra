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

export function IconBox({ children, className, size = 'md' }: IconBoxProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center overflow-hidden',
        'bg-white/80 backdrop-blur-sm shadow-sm ring-1 ring-slate-900/5',
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
