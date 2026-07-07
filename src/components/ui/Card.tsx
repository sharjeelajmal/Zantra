import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  gradientBorder?: boolean;
  stripeShadow?: boolean;
}

const stripeShadowClass =
  'shadow-[0_2px_4px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.06)]';

const stripeShadowHoverClass =
  'hover:shadow-[0_4px_8px_rgba(0,0,0,0.03),0_8px_20px_rgba(0,0,0,0.06),0_20px_40px_rgba(0,0,0,0.08)]';

export function Card({
  children,
  className,
  hover = false,
  gradientBorder = false,
  stripeShadow = false,
  ...props
}: CardProps) {
  const inner = (
    <div
      className={cn(
        'rounded-2xl bg-white',
        stripeShadow && stripeShadowClass,
        hover && cn('transition-all duration-300 ease-out hover:-translate-y-0.5', stripeShadowHoverClass),
        !stripeShadow && hover && 'premium-shadow hover:premium-shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );

  if (gradientBorder) {
    return (
      <div className="p-[1px] rounded-2xl bg-gradient-to-b from-slate-200 to-transparent">
        {inner}
      </div>
    );
  }

  return inner;
}
