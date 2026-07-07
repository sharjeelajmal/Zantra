'use client';

import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import type { Feature } from '@/lib/content';
import { cn, oddGridLastSpan } from '@/lib/utils';

const ICON_STYLES: Record<string, string> = {
  shield_lock: 'from-indigo-100 via-blue-200 to-violet-300 shadow-[0_20px_40px_-12px_rgba(70,72,212,0.35)]',
  pin: 'from-emerald-100 via-teal-200 to-cyan-200 shadow-[0_20px_40px_-12px_rgba(16,185,129,0.3)]',
  gavel: 'from-orange-100 via-amber-200 to-yellow-200 shadow-[0_20px_40px_-12px_rgba(245,158,11,0.3)]',
  account_balance_wallet: 'from-fuchsia-100 via-pink-200 to-rose-200 shadow-[0_20px_40px_-12px_rgba(217,70,239,0.28)]',
  psychology: 'from-sky-100 via-blue-200 to-indigo-200 shadow-[0_20px_40px_-12px_rgba(59,130,246,0.3)]',
  balance: 'from-rose-100 via-red-100 to-orange-200 shadow-[0_20px_40px_-12px_rgba(244,63,94,0.28)]',
};

export interface FeatureCardItemProps {
  feature: Feature;
  index: number;
  className?: string;
}

export function FeatureCardItem({ feature, index, className }: FeatureCardItemProps) {
  const iconStyle = ICON_STYLES[feature.icon] ?? ICON_STYLES.shield_lock;

  return (
    <motion.article
      whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
      transition={{ type: 'spring', stiffness: 360, damping: 22 }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-white via-white to-slate-50/80 p-[1px]',
        'shadow-[0_8px_30px_-8px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60',
        'hover:shadow-[0_24px_56px_-14px_rgba(70,72,212,0.18),0_12px_24px_-8px_rgba(15,23,42,0.08)]',
        className,
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative flex h-full flex-col rounded-3xl bg-white/90 p-5 backdrop-blur-sm md:p-7">
        <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/5 blur-2xl transition-opacity duration-300 group-hover:bg-primary/10" />

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.5 + index * 0.35, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mx-auto mb-5 md:mb-6"
        >
          <div
            className={cn(
              'flex size-[4.5rem] items-center justify-center rounded-[1.35rem] bg-gradient-to-br ring-2 ring-white/90 md:size-20',
              iconStyle,
            )}
            style={{
              boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.9), 0 12px 28px -10px rgba(70,72,212,0.2)',
              transform: 'translateZ(16px)',
            }}
          >
            <Icon name={feature.icon} className="size-8 text-primary md:size-9" />
          </div>
        </motion.div>

        <h3 className="relative mb-2 text-center text-sm font-bold tracking-tight text-on-background md:text-base">
          {feature.title}
        </h3>
        <p className="relative flex-1 text-center text-xs leading-relaxed text-slate-600 md:text-sm">
          {feature.description}
        </p>

        <div className="relative mt-5 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 ring-1 ring-slate-200/80 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary group-hover:ring-primary/15">
            <Icon name="verified" className="size-3" />
            Trusted
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function FeatureCardGrid({ features }: { features: Feature[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3 [perspective:1200px]">
      {features.map((feature, i) => (
        <div key={feature.title} className={cn(oddGridLastSpan(i, features.length))}>
          <FeatureCardItem feature={feature} index={i} />
        </div>
      ))}
    </div>
  );
}
