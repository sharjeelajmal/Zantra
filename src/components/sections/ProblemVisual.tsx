'use client';

import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

function Float({
  children,
  delay = 0,
  y = 10,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -y, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ProblemVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.12)_0%,transparent_68%)]" />

      <Float delay={0} y={8} className="absolute left-[8%] top-[12%]">
        <Icon name="warning" className="size-12" />
      </Float>

      <Float delay={0.6} y={12} className="absolute right-[6%] top-[18%]">
        <Icon name="payments" className="size-11" />
      </Float>

      <Float delay={1.2} y={9} className="absolute bottom-[22%] left-[4%]">
        <Icon name="no_accounts" className="size-10" />
      </Float>

      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 1.5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div className="absolute -left-6 top-2 size-8 rotate-12 rounded-lg bg-white/90 shadow-[0_8px_20px_-6px_rgba(15,23,42,0.15)] ring-1 ring-slate-200/80" />
          <div className="absolute -right-5 bottom-4 size-6 -rotate-6 rounded-md bg-violet-100/90 shadow-md ring-1 ring-violet-200/60" />
          <div className="absolute -top-4 right-2 size-5 rotate-45 rounded-sm bg-indigo-200/80 shadow-sm" />

          <div className="relative flex size-36 items-center justify-center rounded-[2rem] bg-gradient-to-br from-sky-100 via-indigo-100 to-violet-200 shadow-[0_28px_56px_-16px_rgba(99,102,241,0.35),inset_0_2px_0_rgba(255,255,255,0.9)] ring-2 ring-white/80 sm:size-40">
            <svg viewBox="0 0 64 64" className="size-20 text-indigo-500/90 sm:size-24" aria-hidden>
              <path
                d="M8 12h8l4 32h24l6-24H18"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="26" cy="50" r="4" fill="currentColor" opacity="0.5" />
              <circle cx="46" cy="50" r="4" fill="currentColor" opacity="0.5" />
            </svg>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute -right-3 -top-3 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_12px_28px_-6px_rgba(70,72,212,0.55)] ring-2 ring-white"
            >
              <span className="text-xl font-black text-white">!</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Float delay={0.3} y={7} className="absolute bottom-[10%] right-[12%]">
        <Icon name="gavel" className="size-9" />
      </Float>
    </div>
  );
}
