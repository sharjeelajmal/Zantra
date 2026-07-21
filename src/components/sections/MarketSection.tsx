'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Icon } from '@/components/ui/Icon';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import {
  economyStats,
  marketGapItems,
  mobileInternetGrowth,
  stats,
  targetMarkets,
  whyAfricaItems,
  whyNowItems,
  whyZantrraItems,
} from '@/lib/content';
import { cn } from '@/lib/utils';

const ICON_SHADOW = 'drop-shadow-[0_8px_16px_rgba(15,23,42,0.14)]';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' as const },
};

const SOURCES = ['Statista (2025)', 'GSMA (2024)', 'World Bank (2024)', 'Brookings (2024)', 'IMF (2024)'];

export function MarketSection() {
  return (
    <AnimatedSection id="market" className="relative isolate overflow-hidden bg-white py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 mesh-market-3d" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px] mesh-market-orb"
        aria-hidden
      />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        {/* Header — exact diagram copy */}
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <SectionEyebrow centered>Market Opportunity</SectionEyebrow>
          <h2 className="mb-3 text-balance font-headline-lg text-headline-lg-mobile tracking-tighter text-on-background md:text-headline-lg">
            Building Africa&apos;s{' '}
            <span className="text-primary">Trust Infrastructure</span>
          </h2>
          <p className="mb-4 text-balance text-base font-semibold text-slate-700 md:text-lg">
            Powering the Future of Trusted Commerce Across Africa
          </p>
          <p className="text-pretty font-body-lg text-body-lg leading-relaxed text-slate-600">
            Africa is one of the world&apos;s fastest-growing digital economies, fueled by a young population, mobile
            adoption, and digital payments. As commerce accelerates, trusted transaction infrastructure will become
            essential.
          </p>
        </div>

        {/* Top stats */}
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="rounded-2xl bg-white/80 p-4 text-center shadow-[0_12px_32px_-16px_rgba(70,72,212,0.18)] ring-1 ring-slate-900/5 backdrop-blur-sm md:p-5"
            >
              <p className="mb-1 bg-gradient-to-br from-primary to-violet-800 bg-clip-text text-2xl font-black tracking-tighter text-transparent md:text-3xl">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-on-background md:text-sm">{stat.label}</p>
              <p className="mt-0.5 text-[10px] text-slate-500 md:text-xs">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Africa | Map + callouts | Target Markets */}
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.35fr_0.9fr] lg:gap-5 xl:gap-8">
          {/* Why Africa */}
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-on-background">Why Africa?</h3>
            <ul className="space-y-3">
              {whyAfricaItems.map((item) => (
                <li key={item.title} className="flex gap-3 rounded-2xl bg-white/70 p-3 ring-1 ring-slate-900/[0.04]">
                  <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/80 ring-1 ring-slate-900/5">
                    <Icon name={item.icon} className={cn('size-8 object-contain', ICON_SHADOW)} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-on-background">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Map with pin → dandi → callout (image-matched) */}
          <motion.div {...fadeUp} transition={{ duration: 0.55, delay: 0.08 }} className="relative">
            <p className="mb-4 text-center text-sm font-black uppercase tracking-[0.14em] text-on-background">
              Why Now?
            </p>

            {/* Desktop / tablet: map + SVG leader lines */}
            <div className="relative mx-auto hidden min-h-[580px] w-full max-w-[36rem] lg:block xl:min-h-[620px] xl:max-w-[40rem]">
              {/* Large map — restored visual size */}
              <div className="absolute left-1/2 top-[44%] z-0 w-[78%] max-w-md -translate-x-1/2 -translate-y-1/2 xl:w-[82%] xl:max-w-[30rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/Icons/AfricaMap.png"
                  alt="Africa market map"
                  className="mx-auto h-auto w-full object-contain drop-shadow-[0_28px_56px_rgba(70,72,212,0.28)]"
                />
              </div>

              {/* SVG dandi — bent (2-segment) leader lines, equal length */}
              <svg
                className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                <g
                  stroke="#faa343"
                  strokeWidth="0.45"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                >
                  {/* Top-left → Growing Mobile Connectivity */}
                  <polyline points="38,28 24,28 12,14" />
                  {/* Bottom-left → Expanding Digital Payments (pin closer into map) */}
                  <polyline points="44,50 28,50 12,66" />
                  {/* Top-right → Trust Gap */}
                  <polyline points="62,28 76,28 88,14" />
                  {/* Bottom-right → Cross-Border */}
                  <polyline points="60,50 76,50 88,66" />
                </g>
                <g fill="#faa343">
                  <circle cx="38" cy="28" r="0.85" />
                  <circle cx="44" cy="50" r="0.85" />
                  <circle cx="62" cy="28" r="0.85" />
                  <circle cx="60" cy="50" r="0.85" />
                  <circle cx="12" cy="14" r="0.55" />
                  <circle cx="12" cy="66" r="0.55" />
                  <circle cx="88" cy="14" r="0.55" />
                  <circle cx="88" cy="66" r="0.55" />
                </g>
              </svg>

              <MapPin className="left-[38%] top-[28%]" />
              <MapPin className="left-[44%] top-[50%]" />
              <MapPin className="left-[62%] top-[28%]" />
              <MapPin className="left-[60%] top-[50%]" />

              {/* Callouts — top slightly below previous overshoot */}
              <FloatingCallout
                item={whyNowItems[0]}
                className="left-0 top-1 max-w-[11.5rem] xl:max-w-[13rem]"
              />
              <FloatingCallout
                item={whyNowItems[2]}
                className="left-0 top-[68%] max-w-[11.5rem] xl:max-w-[13rem]"
              />
              <FloatingCallout
                item={whyNowItems[1]}
                className="right-0 top-1 max-w-[11.5rem] text-right xl:max-w-[13rem]"
              />
              <FloatingCallout
                item={whyNowItems[3]}
                className="right-0 top-[68%] max-w-[11.5rem] text-right xl:max-w-[13rem]"
              />
            </div>

            {/* Mobile: full-size map + stacked cards */}
            <div className="lg:hidden">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mx-auto mb-5 max-w-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/Icons/AfricaMap.png"
                  alt="Africa market map"
                  className="mx-auto h-auto w-full object-contain drop-shadow-[0_28px_56px_rgba(70,72,212,0.28)]"
                />
              </motion.div>
              <div className="grid gap-3 sm:grid-cols-2">
                {whyNowItems.map((item) => (
                  <div key={item.title} className="px-1 py-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-[#faa343]" />
                      <p className="text-xs font-bold text-[#E8922E]">{item.title}</p>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex w-full items-start gap-3 rounded-2xl bg-primary px-4 py-4 text-left shadow-[0_20px_40px_-16px_rgba(70,72,212,0.45)] md:items-center md:px-5">
              <Icon
                name="shield_lock"
                className="mt-0.5 size-10 shrink-0 drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)] md:mt-0"
              />
              <p className="text-sm font-semibold leading-relaxed text-white/95">
                Zantrra provides the trust infrastructure powering Africa&apos;s next generation of digital commerce.
              </p>
            </div>
          </motion.div>

          {/* Target Markets */}
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-on-background">Target Markets</h3>
            <ul className="space-y-3">
              {targetMarkets.map((item) => (
                <li key={item.title} className="flex gap-3 rounded-2xl bg-white/70 p-3.5 ring-1 ring-slate-900/[0.04]">
                  <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/80 ring-1 ring-slate-900/5">
                    <Icon name={item.icon} className={cn('size-9 object-contain', ICON_SHADOW)} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-on-background">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom: Economy | Gap | Why Zantrra | Chart */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          <motion.div {...fadeUp} className="rounded-3xl bg-emerald-50/80 p-5 ring-1 ring-emerald-500/15 md:p-6">
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-emerald-800">
              The African Economy Today &amp; By 2030
            </h3>
            <div className="space-y-3">
              {economyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white/80 px-4 py-3 ring-1 ring-emerald-500/10"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
                    <p className="text-[10px] text-slate-400">{stat.sub}</p>
                  </div>
                  <p className="shrink-0 text-xl font-black tracking-tight text-emerald-700">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.06 }}
            className="rounded-3xl bg-rose-50/80 p-5 ring-1 ring-rose-500/15 md:p-6"
          >
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-rose-800">The Market Gap</h3>
            <ul className="space-y-2.5">
              {marketGapItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-rose-900/80">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                    ×
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="rounded-3xl bg-primary/[0.06] p-5 ring-1 ring-primary/10 md:p-6"
          >
            <h3 className="mb-4 text-xs font-black uppercase tracking-[0.14em] text-primary">Why Zantrra?</h3>
            <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">
              {whyZantrraItems.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-1.5 rounded-xl bg-white/80 px-1.5 py-2.5 text-center ring-1 ring-slate-900/5"
                >
                  <Icon name={item.icon} className={cn('size-8 object-contain', ICON_SHADOW)} />
                  <span className="text-[9px] font-semibold leading-tight text-slate-600">{item.title}</span>
                </div>
              ))}
            </div>
            <p className="rounded-xl bg-white/70 px-3 py-2.5 text-xs leading-relaxed text-slate-600 ring-1 ring-slate-900/5">
              Zantrra is building the most trusted peer-to-peer commerce platform for Africa and beyond.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.12 }}
            className="rounded-3xl bg-gradient-to-b from-slate-50 to-white p-5 ring-1 ring-slate-900/5 md:p-6"
          >
            <div className="mb-1 flex items-start justify-between gap-2">
              <h3 className="text-xs font-black uppercase tracking-[0.14em] text-on-background">
                Mobile Internet Users
              </h3>
              <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white shadow-[0_6px_14px_-4px_rgba(70,72,212,0.55)]">
                18.8% CAGR
              </span>
            </div>
            <p className="mb-4 text-[10px] font-medium text-slate-400">Projections · Millions</p>

            <div className="relative flex h-48 items-end gap-3 border-b border-l border-slate-200/80 pb-0 pl-2">
              {/* subtle grid lines */}
              <div className="pointer-events-none absolute inset-0 left-2 flex flex-col justify-between pb-0 pr-1" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-px w-full bg-slate-100" />
                ))}
              </div>

              {mobileInternetGrowth.map((bar, i) => (
                <div
                  key={bar.year}
                  className="group relative z-[1] flex h-full flex-1 flex-col items-center justify-end"
                >
                  {/* Hover tooltip */}
                  <div className="pointer-events-none absolute -top-1 left-1/2 z-20 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                    <div className="whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-center shadow-lg">
                      <p className="text-[11px] font-bold text-white">{bar.value}</p>
                      <p className="text-[9px] text-white/60">{bar.year}</p>
                    </div>
                    <div className="mx-auto h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-slate-900" />
                  </div>

                  <span className="mb-1.5 text-[11px] font-bold text-on-background transition-colors group-hover:text-primary">
                    {bar.value}
                  </span>

                  <div className="relative flex h-32 w-full max-w-[3.5rem] items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${bar.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.85, delay: i * 0.08, ease: 'easeOut' }}
                      className="relative w-[78%] origin-bottom rounded-t-xl bg-gradient-to-t from-primary via-indigo-500 to-violet-400 shadow-[0_8px_20px_-8px_rgba(70,72,212,0.55)] transition-all duration-300 group-hover:w-[88%] group-hover:shadow-[0_14px_28px_-8px_rgba(70,72,212,0.65)] group-hover:brightness-110"
                    >
                      {/* shine */}
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-xl bg-gradient-to-b from-white/35 to-transparent opacity-70" />
                      {/* hover glow */}
                      <span className="pointer-events-none absolute inset-0 rounded-t-xl bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 flex justify-between gap-3 px-2">
              {mobileInternetGrowth.map((bar) => (
                <span
                  key={bar.year}
                  className="flex-1 text-center text-[10px] font-semibold text-slate-500"
                >
                  {bar.year}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Closing — editorial commitment (premium) */}
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.12 }}
          className="relative mt-14 overflow-hidden rounded-[2rem] bg-[#F7F8FC] ring-1 ring-slate-900/[0.06]"
        >
          {/* Atmosphere */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(70,72,212,0.14)_0%,transparent_68%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-16 size-[22rem] rounded-full bg-[radial-gradient(circle,rgba(70,72,212,0.08)_0%,transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_65%_at_50%_40%,#000_20%,transparent_100%)]"
          />

          <div className="relative grid gap-10 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16 lg:px-14 lg:py-16">
            {/* Manifesto */}
            <div className="min-w-0">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-8 bg-primary" aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Our Commitment</p>
              </div>

              <p
                aria-hidden
                className="mb-2 select-none font-display-lg text-[4.5rem] leading-none text-primary/15 md:text-[6rem]"
              >
                “
              </p>

              <h3 className="-mt-8 text-balance font-display-lg text-[1.85rem] leading-[1.15] tracking-tight text-on-background sm:text-[2.25rem] md:-mt-10 md:text-[2.75rem] md:leading-[1.12]">
                Zantrra isn&apos;t just another marketplace.
              </h3>

              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 md:text-lg md:leading-[1.7]">
                We&apos;re building the{' '}
                <span className="font-semibold text-on-background">trust infrastructure</span> that enables
                Africa&apos;s digital economy to{' '}
                <span className="relative inline-block font-semibold text-primary">
                  scale
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-100 bg-primary/40"
                  />
                </span>
                .
              </p>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-slate-900/8 pt-7">
                {[
                  { label: 'Escrow-protected', value: 'Payments' },
                  { label: 'Verified', value: 'Identities' },
                  { label: 'Africa-first', value: 'Infrastructure' },
                ].map((pillar) => (
                  <div key={pillar.label} className="min-w-[7rem]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{pillar.label}</p>
                    <p className="mt-1 text-sm font-semibold text-on-background">{pillar.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunity side panel */}
            <div className="flex flex-col justify-between gap-8 lg:border-l lg:border-slate-900/8 lg:pl-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Opportunity</p>
                <p className="mt-3 bg-gradient-to-br from-primary to-indigo-700 bg-clip-text text-5xl font-black tracking-tighter text-transparent md:text-6xl">
                  $2.5T
                </p>
                <p className="mt-2 text-sm font-semibold text-on-background">Consumer economy by 2030</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Everything people and businesses spend across goods, services, and experiences — including cash.
                  Zantrra is positioned to capture a growing share.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Zantrra" className="h-7 w-auto opacity-80" />
                <span className="h-4 w-px bg-slate-300" aria-hidden />
                <p className="text-[11px] font-medium text-slate-400">Trust for Africa&apos;s commerce</p>
              </div>
            </div>
          </div>

          {/* Sources rail */}
          <div className="relative flex flex-col gap-2 border-t border-slate-900/[0.06] bg-white/50 px-6 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Sources</p>
            <p className="text-[11px] leading-relaxed text-slate-500">{SOURCES.join('  ·  ')}</p>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

function MapPin({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'absolute z-[2] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#faa343] shadow-[0_0_0_3px_rgba(250,163,67,0.3)]',
        className,
      )}
      aria-hidden
    />
  );
}

function FloatingCallout({
  item,
  className,
}: {
  item: { title: string; description: string };
  className?: string;
}) {
  return (
    <div className={cn('absolute z-[3] px-1', className)}>
      <p className="text-[11px] font-bold leading-snug text-[#E8922E] xl:text-xs">{item.title}</p>
      <p className="mt-1 text-[10px] leading-relaxed text-slate-600 xl:text-[11px]">{item.description}</p>
    </div>
  );
}
