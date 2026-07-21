'use client';

import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import type { ProblemCard } from '@/lib/content';
import { cn } from '@/lib/utils';

const ICON_SHADOW =
  'drop-shadow-[0_12px_24px_rgba(15,23,42,0.18)] drop-shadow-[0_4px_10px_rgba(70,72,212,0.16)]';

export interface ProblemCardItemProps {
  card: ProblemCard;
  index: number;
  className?: string;
}

export function ProblemCardItem({ card, index, className }: ProblemCardItemProps) {
  const num = String(index + 1).padStart(2, '0');

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
        className="mx-auto mb-6 flex items-center justify-center"
      >
        <Icon
          name={card.icon}
          className={cn('size-24 object-contain md:size-36', ICON_SHADOW)}
        />
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
