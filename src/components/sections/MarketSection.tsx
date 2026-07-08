'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { stats } from '@/lib/content';
import { cn } from '@/lib/utils';

const STAT_META: { icon: IconName; accent: string; glow: string }[] = [
  {
    icon: 'public',
    accent: 'from-indigo-100 via-blue-200 to-violet-300',
    glow: 'rgba(70,72,212,0.35)',
  },
  {
    icon: 'rocket_launch',
    accent: 'from-violet-100 via-fuchsia-200 to-pink-200',
    glow: 'rgba(139,92,246,0.35)',
  },
  {
    icon: 'groups',
    accent: 'from-sky-100 via-cyan-200 to-teal-200',
    glow: 'rgba(14,165,233,0.3)',
  },
  {
    icon: 'account_balance_wallet',
    accent: 'from-emerald-100 via-teal-200 to-green-200',
    glow: 'rgba(16,185,129,0.3)',
  },
];

const HIGHLIGHTS = [
  { icon: 'shield_lock' as const, label: 'Escrow-first rails' },
  { icon: 'payments' as const, label: 'Mobile money ready' },
  { icon: 'flag' as const, label: 'Guinea launch market' },
];

export function MarketSection() {
  return (
    <AnimatedSection className="relative isolate overflow-hidden bg-white py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 mesh-market-3d" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden>
        <div className="size-[36rem] rounded-full bg-primary/20 blur-[120px] mesh-market-orb" />
      </div>
      <div
        className="pointer-events-none absolute right-[5%] top-[20%] size-64 rounded-full bg-violet-600/15 blur-3xl mesh-market-orb-delayed"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[10%] left-[8%] size-72 rounded-full bg-indigo-500/10 blur-3xl mesh-market-orb"
        aria-hidden
      />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <SectionEyebrow centered>Market Opportunity</SectionEyebrow>
          <h2 className="mb-4 text-balance font-headline-lg text-headline-lg-mobile tracking-tighter text-on-background md:text-headline-lg">
            Africa&apos;s trust gap is a $56B opportunity.
          </h2>
          <p className="mb-6 text-balance font-body-lg text-body-lg leading-relaxed text-slate-600">
            With 60%+ of transactions on mobile money and 1.4 billion people entering the digital economy, escrow
            infrastructure is the missing layer — starting in Guinea.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {HIGHLIGHTS.map((item, i) => (
              <motion.span
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-[0_8px_24px_-10px_rgba(70,72,212,0.2)] ring-1 ring-slate-900/5 backdrop-blur-sm"
              >
                <Icon name={item.icon} className="size-3.5 text-primary" />
                {item.label}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-2 items-stretch gap-3 sm:gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const meta = STAT_META[i] ?? STAT_META[0];

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -6 }}
                className="group relative h-full"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-1 rounded-[1.6rem] bg-gradient-to-b from-primary/20 via-transparent to-violet-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                />

                <div
                  className="relative h-full overflow-hidden rounded-[1.35rem] bg-gradient-to-b from-white via-slate-100/40 to-transparent p-[1px] shadow-[0_20px_40px_-16px_rgba(70,72,212,0.18)]"
                  style={{
                    boxShadow: `0 20px 40px -16px ${meta.glow}`,
                  }}
                >
                  <div className="relative flex h-full flex-col items-center rounded-[1.3rem] bg-white/75 p-4 text-center ring-1 ring-white/80 backdrop-blur-xl md:p-7">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:bg-primary/10"
                    />

                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4.2 + i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative mb-4"
                    >
                      <div
                        className={cn(
                          'flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ring-2 ring-white/90 md:size-14',
                          meta.accent,
                        )}
                        style={{
                          boxShadow:
                            'inset 0 2px 0 rgba(255,255,255,0.9), 0 12px 24px -10px rgba(70,72,212,0.25)',
                          transform: 'translateZ(18px)',
                        }}
                      >
                        <Icon name={meta.icon} className="size-5 text-primary md:size-6" />
                      </div>
                    </motion.div>

                    <p className="relative mb-2 bg-gradient-to-br from-primary to-violet-800 bg-clip-text text-2xl font-black tracking-tighter text-transparent drop-shadow-sm sm:text-3xl md:mb-3 md:text-4xl lg:text-5xl">
                      {stat.value}
                    </p>
                    <p className="relative mb-1 text-xs font-bold tracking-tight text-on-background sm:text-sm md:text-base">
                      {stat.label}
                    </p>
                    <p className="relative text-[10px] leading-relaxed text-slate-500 sm:text-xs md:text-sm">
                      {stat.sub}
                    </p>

                    <div className="relative mt-4 h-1 w-10 overflow-hidden rounded-full bg-slate-100 md:mt-5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-violet-600"
                        initial={{ width: '0%' }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
