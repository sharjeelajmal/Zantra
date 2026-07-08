'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { DemoBuyerTab } from '@/components/sections/DemoBuyerTab';
import { DemoSellerTab } from '@/components/sections/DemoSellerTab';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { useEscrowStore, type EscrowStep } from '@/lib/store/useEscrowStore';
import { cn } from '@/lib/utils';

type DemoTab = 'buyer' | 'seller';

const TAB_LABELS: Record<DemoTab, { label: string; shortLabel: string; icon: IconName }> = {
  buyer: { label: 'Buyer Experience', shortLabel: 'Buyer', icon: 'shopping_cart' },
  seller: { label: 'Seller Experience', shortLabel: 'Seller', icon: 'storefront' },
};

const PIPELINE: { key: EscrowStep; label: string; icon: IconName }[] = [
  { key: 'idle', label: 'Start', icon: 'cursor_click' },
  { key: 'bidding', label: 'Bids', icon: 'gavel' },
  { key: 'locked', label: 'Escrow', icon: 'shield_lock' },
  { key: 'delivered', label: 'Deliver', icon: 'package' },
  { key: 'released', label: 'Release', icon: 'banknote' },
];

const PIPELINE_INDEX: Record<EscrowStep, number> = {
  idle: 0,
  bidding: 1,
  locked: 2,
  delivered: 3,
  released: 4,
};

function DemoStepPipeline() {
  const step = useEscrowStore((s) => s.step);
  const activeIndex = PIPELINE_INDEX[step];
  const progress = activeIndex / (PIPELINE.length - 1);

  return (
    <div className="relative z-10 mb-5 px-4 sm:px-8">
      <div className="relative mx-auto max-w-xl rounded-2xl bg-white/50 px-3 py-4 ring-1 ring-slate-900/[0.04] backdrop-blur-md sm:px-5">
        <div className="relative flex justify-between">
          {/* Track runs only from first icon center → last icon center */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[1rem] right-[1rem] top-4 h-px -translate-y-1/2 bg-slate-200/70 sm:left-[1.125rem] sm:right-[1.125rem] sm:top-[1.125rem]"
          >
            <motion.div
              className="absolute inset-y-0 left-0 h-full origin-left rounded-full bg-gradient-to-r from-primary via-indigo-500 to-violet-600"
              initial={false}
              animate={{ scaleX: progress }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              style={{ width: '100%' }}
            />
          </div>

          {PIPELINE.map((item, i) => {
            const isActive = i <= activeIndex;
            const isCurrent = item.key === step;

            return (
              <div key={item.key} className="relative z-10 flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.12 : 1,
                    y: isCurrent ? -2 : 0,
                    boxShadow: isCurrent
                      ? '0 0 28px -4px rgba(70, 72, 212, 0.55), 0 10px 24px -8px rgba(70, 72, 212, 0.35)'
                      : '0 2px 8px -2px rgba(15, 23, 42, 0.06)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className={cn(
                    'flex size-8 items-center justify-center rounded-xl ring-2 backdrop-blur-sm sm:size-9',
                    isActive
                      ? 'bg-gradient-to-br from-primary to-violet-700 text-white ring-primary/25'
                      : 'bg-white text-slate-400 ring-slate-200/80',
                  )}
                >
                  <Icon
                    name={item.icon}
                    className={cn('size-3.5 sm:size-4', isActive ? 'text-white' : 'text-slate-400')}
                  />
                </motion.div>
                <span
                  className={cn(
                    'hidden text-[9px] font-semibold uppercase tracking-wider sm:block',
                    isCurrent ? 'text-primary' : isActive ? 'text-slate-600' : 'text-slate-400',
                  )}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function DemoSection() {
  const [tab, setTab] = useState<DemoTab>('buyer');

  return (
    <AnimatedSection id="demo" className="relative overflow-hidden bg-slate-50/50 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute right-[10%] top-[20%] size-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <SectionEyebrow centered>Live Preview</SectionEyebrow>
          <h2 className="mb-4 text-balance font-headline-lg text-headline-lg-mobile tracking-tighter text-on-background md:text-headline-lg">
            Experience Zantrra.
          </h2>
          <p className="text-balance font-body-lg text-body-lg leading-relaxed text-slate-600">
            Buy direct or post a service request — compare bids, lock escrow, and release funds in GNF.
          </p>
        </div>

        <div className="mx-auto max-w-4xl [perspective:1600px]">
          <motion.div
            initial={{ opacity: 0, y: 28, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Outer glow rim */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-[1px] rounded-[2.1rem] bg-gradient-to-b from-white via-primary/25 to-violet-500/40 opacity-90 blur-[1px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-violet-600/15 blur-2xl"
            />

            {/* Premium shell */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-white/80 via-white/70 to-slate-50/80 shadow-[0_32px_64px_-20px_rgba(70,72,212,0.28),0_16px_32px_-12px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-slate-900/[0.08] backdrop-blur-2xl">
              {/* Ambient mesh inside shell */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(70,72,212,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(109,40,217,0.06)_0%,transparent_45%)]"
              />

              {/* Browser chrome */}
              <div className="noise-texture relative flex items-center gap-3 border-b border-slate-200/60 bg-gradient-to-b from-slate-50/90 to-white/40 px-4 py-3.5 backdrop-blur-xl sm:px-5">
                <div className="relative z-10 flex shrink-0 gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#FF5F57] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
                  <span className="size-2.5 rounded-full bg-[#FFBD2E] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
                  <span className="size-2.5 rounded-full bg-[#28CA42] shadow-[0_0_0_1px_rgba(0,0,0,0.06)]" />
                </div>
                <div className="relative z-10 flex min-w-0 flex-1 justify-center">
                  <div className="flex max-w-[16rem] items-center gap-2 truncate rounded-xl bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-500 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/[0.06] backdrop-blur-sm sm:max-w-xs">
                    <Icon name="shield_lock" className="size-3 shrink-0 text-primary/70" />
                    <span className="truncate">demo.zantrra.com</span>
                  </div>
                </div>
                <div className="relative z-10 hidden shrink-0 items-center gap-1.5 sm:flex">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-500/15">
                    <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    Live
                  </span>
                </div>
              </div>

              <div className="relative pt-4">
                <DemoStepPipeline />

                <div className="relative z-10 px-3 pb-3 sm:px-8">
                  <div className="relative grid grid-cols-2 gap-1 rounded-2xl bg-slate-100/70 p-1 shadow-[inset_0_1px_3px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.04] sm:flex sm:gap-0">
                    {(['buyer', 'seller'] as const).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTab(key)}
                        className={cn(
                          'relative z-10 flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2.5 text-center font-label-md font-semibold transition-colors duration-200 sm:flex-row sm:gap-2 sm:px-4 sm:py-2.5',
                          tab === key ? 'text-primary' : 'text-slate-500 hover:text-on-background',
                        )}
                      >
                        {tab === key && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 rounded-xl bg-white shadow-[0_4px_16px_-4px_rgba(70,72,212,0.28)] ring-1 ring-slate-900/[0.06]"
                            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          />
                        )}
                        <Icon
                          name={TAB_LABELS[key].icon}
                          className={cn(
                            'relative z-10 size-4 shrink-0 sm:size-3.5',
                            tab === key ? 'text-primary' : 'text-slate-400',
                          )}
                        />
                        <span className="relative z-10 text-[11px] leading-tight sm:hidden">
                          {TAB_LABELS[key].shortLabel}
                        </span>
                        <span className="relative z-10 hidden truncate text-label-md sm:inline">
                          {TAB_LABELS[key].label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative flex flex-col items-center justify-center overflow-hidden p-5">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,244,255,0.7)_0%,transparent_65%)]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/40 to-transparent"
                  />
                  <div className="relative z-10 w-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={tab}
                        initial={{ opacity: 0, x: tab === 'buyer' ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: tab === 'buyer' ? 20 : -20 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        {tab === 'buyer' ? <DemoBuyerTab /> : <DemoSellerTab />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
