import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'default' | 'outline' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    'inline-flex items-center justify-center gap-2 bg-primary text-white font-label-md text-label-md font-semibold shadow-[0_12px_28px_-8px_rgba(70,72,212,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-12px_rgba(70,72,212,0.5)] active:scale-95',
  outline:
    'inline-flex items-center justify-center gap-2 border border-slate-200/80 bg-white/60 backdrop-blur-sm font-label-md text-label-md font-semibold text-on-background ring-1 ring-slate-900/[0.03] transition-all hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(70,72,212,0.12)] active:scale-95',
  ghost:
    'inline-flex items-center justify-center font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors',
};

export function Button({
  variant = 'default',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'cursor-pointer disabled:cursor-not-allowed',
        variantStyles[variant],
        variant === 'default' && 'px-6 py-3.5 rounded-2xl',
        variant === 'outline' && 'px-6 py-3.5 rounded-2xl',
        variant === 'ghost' && 'px-3 py-1.5',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
