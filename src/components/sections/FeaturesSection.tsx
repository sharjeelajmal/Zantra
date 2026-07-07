'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { FeatureCardGrid } from '@/components/sections/FeatureCardItem';
import { Icon } from '@/components/ui/Icon';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { features } from '@/lib/content';

const TRUST_PILLS = [
  { icon: 'shield_lock' as const, label: 'Escrow-Protected' },
  { icon: 'verified_user' as const, label: 'Verified Vendors' },
  { icon: 'psychology' as const, label: 'AI Fraud Shield' },
];

export function FeaturesSection() {
  return (
    <AnimatedSection id="features" className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(248,249,255,1)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute left-[6%] top-[18%] size-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-[30%] size-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[8%] left-1/2 size-80 -translate-x-1/2 rounded-full bg-indigo-400/8 blur-3xl" />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        <div className="mb-12 md:mb-16">
          <SectionEyebrow>Features</SectionEyebrow>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="mb-4 text-balance font-headline-lg text-headline-lg-mobile tracking-tighter text-on-background md:text-headline-lg">
                Built for trust,
                <br />
                end to end.
              </h2>
              <p className="max-w-2xl text-balance font-body-lg text-body-lg leading-relaxed text-slate-600">
                Every feature is designed around one core principle: protecting the people who use Zantrra.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRUST_PILLS.map((pill, i) => (
                <motion.span
                  key={pill.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-slate-600 shadow-[0_8px_24px_-10px_rgba(70,72,212,0.2)] ring-1 ring-slate-900/5 backdrop-blur-sm"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon name={pill.icon} className="size-3.5" />
                  </span>
                  {pill.label}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <FeatureCardGrid features={features} />
      </div>
    </AnimatedSection>
  );
}
