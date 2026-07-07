'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Icon } from '@/components/ui/Icon';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { faqItems } from '@/lib/content';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <AnimatedSection id="faq" className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(248,249,255,1)_0%,transparent_55%)]" />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <SectionEyebrow centered>FAQ</SectionEyebrow>
            <h2 className="mb-4 text-balance font-headline-lg text-headline-lg-mobile tracking-tighter text-on-background md:text-headline-lg">
              Common questions.
            </h2>
            <p className="text-balance font-body-lg text-body-lg leading-relaxed text-slate-600">
              Everything you need to know about Zantrra. Can&apos;t find your answer?{' '}
              <a href="#" className="font-semibold text-primary hover:underline">
                Contact us.
              </a>
            </p>
          </div>

          <div className="divide-y divide-slate-200/60 rounded-2xl bg-white/80 px-2 ring-1 ring-slate-900/5 backdrop-blur-sm shadow-[0_2px_4px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.06)]">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;

              return (
                <div key={item.question} className="rounded-xl">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className={cn(
                      'group flex w-full items-center justify-between gap-4 px-4 py-6 text-left transition-colors',
                      isOpen ? 'bg-slate-50/60' : 'hover:bg-slate-50/50',
                    )}
                  >
                    <span
                      className={cn(
                        'font-label-md text-label-md font-semibold transition-colors',
                        isOpen ? 'text-primary' : 'text-on-background group-hover:text-primary',
                      )}
                    >
                      {item.question}
                    </span>
                    <Icon
                      name={isOpen ? 'remove' : 'add'}
                      className={cn(
                        'size-5 shrink-0 transition-colors',
                        isOpen ? 'text-primary' : 'text-slate-400 group-hover:text-primary',
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-6 text-sm leading-relaxed text-slate-600 md:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
