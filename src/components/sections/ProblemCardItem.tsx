'use client';

import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import type { ProblemCard } from '@/lib/content';
import { cn } from '@/lib/utils';

const ICON_STYLES: Record<string, string> = {
  payments: 'from-violet-200 via-purple-200 to-indigo-300 shadow-[0_20px_40px_-12px_rgba(139,92,246,0.35)]',
  warning: 'from-amber-100 via-orange-200 to-violet-300 shadow-[0_20px_40px_-12px_rgba(245,158,11,0.3)]',
  no_accounts: 'from-sky-100 via-blue-200 to-indigo-200 shadow-[0_20px_40px_-12px_rgba(59,130,246,0.3)]',
  gavel: 'from-rose-100 via-red-100 to-orange-200 shadow-[0_20px_40px_-12px_rgba(239,68,68,0.25)]',
};

export interface ProblemCardItemProps {
  card: ProblemCard;
  index: number;
  className?: string;
}

export function ProblemCardItem({ card, index, className }: ProblemCardItemProps) {
  const num = String(index + 1).padStart(2, '0');
  const iconStyle = ICON_STYLES[card.icon] ?? ICON_STYLES.payments;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className={cn(
        'group relative flex h-full flex-col rounded-3xl bg-white p-6 shadow-[0_8px_30px_-8px_rgba(15,23,42,0.08),0_2px_8px_-2px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/60 md:p-8',
        'hover:shadow-[0_20px_48px_-12px_rgba(70,72,212,0.15),0_8px_20px_-6px_rgba(15,23,42,0.06)]',
        className,
      )}
    >
      <span className="mb-6 inline-flex w-fit rounded-xl bg-primary/8 px-2.5 py-1 text-xs font-bold tracking-wider text-primary ring-1 ring-primary/10">
        {num}
      </span>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
        className="mx-auto mb-6"
      >
        <div
          className={cn(
            'flex size-20 items-center justify-center rounded-[1.25rem] bg-gradient-to-br ring-2 ring-white/80 md:size-24',
            iconStyle,
          )}
          style={{ boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.85)' }}
        >
          <Icon name={card.icon} className="size-9 text-primary md:size-10" />
        </div>
      </motion.div>

      <h3 className="mb-2 text-base font-bold tracking-tight text-on-background md:text-lg">{card.title}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">{card.description}</p>

      <a
        href="#features"
        aria-label={`Learn more about ${card.title}`}
        className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 ring-1 ring-slate-200/80 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgba(70,72,212,0.4)] group-hover:ring-primary/20"
      >
        <Icon name="arrow_forward" className="size-4" />
      </a>
    </motion.article>
  );
}
