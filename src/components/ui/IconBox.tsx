import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface IconBoxProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'size-9 rounded-xl [&_svg]:size-4',
  md: 'size-11 rounded-xl [&_svg]:size-5',
  lg: 'size-12 rounded-2xl [&_svg]:size-6',
};

export function IconBox({ children, className, size = 'md' }: IconBoxProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center text-primary bg-primary/5 ring-1 ring-primary/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]',
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
