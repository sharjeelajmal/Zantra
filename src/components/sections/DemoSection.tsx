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

const TAB_LABELS: Record<DemoTab, string> = {
  buyer: 'Buyer Experience',
  seller: 'Seller Experience',
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

  return (
    <div className="mb-4 px-5 sm:px-8">
      <div className="relative mx-auto max-w-xl">
        <div className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-slate-200/80" />
        <motion.div
          className="absolute left-3 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-violet-600"
          initial={false}
          animate={{ width: `${(activeIndex / (PIPELINE.length - 1)) * 100}%` }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          style={{ maxWidth: 'calc(100% - 1.5rem)' }}
        />
        <div className="relative flex justify-between">
          {PIPELINE.map((item, i) => {
            const isActive = i <= activeIndex;
            const isCurrent = item.key === step;

            return (
              <div key={item.key} className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.14 : 1,
                    y: isCurrent ? -2 : 0,
                    boxShadow: isCurrent
                      ? '0 0 24px -2px rgba(70, 72, 212, 0.55), 0 8px 20px -6px rgba(70, 72, 212, 0.25)'
                      : '0 2px 8px -2px rgba(15, 23, 42, 0.08)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className={cn(
                    'flex size-8 items-center justify-center rounded-xl ring-2 backdrop-blur-sm sm:size-9',
                    isActive
                      ? 'bg-gradient-to-br from-primary to-violet-700 text-white ring-primary/30'
                      : 'bg-white text-slate-400 ring-slate-200/80',
                  )}
                  style={{ transformStyle: 'preserve-3d' }}
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

        <div className="mx-auto max-w-4xl [perspective:1400px]">
          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-white/60 shadow-[0_20px_40px_-15px_rgba(70,72,212,0.15)] ring-1 ring-slate-900/10 backdrop-blur-2xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="noise-texture relative flex items-center gap-3 border-b border-slate-200/50 bg-slate-100/40 px-5 py-3.5 backdrop-blur-xl">
              <div className="relative z-10 flex shrink-0 gap-1.5">
                <span className="size-2.5 rounded-full bg-[#FF5F57] ring-1 ring-black/[0.06]" />
                <span className="size-2.5 rounded-full bg-[#FFBD2E] ring-1 ring-black/[0.06]" />
                <span className="size-2.5 rounded-full bg-[#28CA42] ring-1 ring-black/[0.06]" />
              </div>
              <div className="relative z-10 flex min-w-0 flex-1 justify-center">
                <div className="max-w-[14rem] truncate rounded-lg bg-white/50 px-4 py-1.5 text-xs font-medium text-slate-500 ring-1 ring-slate-900/5 backdrop-blur-sm sm:max-w-xs">
                  demo.zantrra.com
                </div>
              </div>
              <div className="relative z-10 size-6 shrink-0" aria-hidden="true" />
            </div>

            <DemoStepPipeline />

            <div className="px-5 pb-2 sm:px-8">
              <div className="relative flex rounded-2xl bg-slate-100/60 p-1 ring-1 ring-slate-900/5 backdrop-blur-sm">
                {(['buyer', 'seller'] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key)}
                    className={cn(
                      'relative z-10 flex-1 rounded-xl px-4 py-2.5 font-label-md text-label-md font-semibold transition-colors duration-200',
                      tab === key ? 'text-primary' : 'text-slate-500 hover:text-on-background',
                    )}
                  >
                    {tab === key && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-white/90 shadow-[0_2px_12px_-2px_rgba(70,72,212,0.22)] ring-1 ring-slate-900/5 backdrop-blur-md"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{TAB_LABELS[key]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(239,244,255,0.55)_0%,transparent_70%)] p-6 md:p-10">
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
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
