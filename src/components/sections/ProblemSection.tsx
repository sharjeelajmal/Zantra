import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { GridBackground } from '@/components/ui/GridBackground';
import { ProblemCardItem } from '@/components/sections/ProblemCardItem';
import { ProblemVisual } from '@/components/sections/ProblemVisual';
import { problemCards } from '@/lib/content';
import { cn, oddGridLastSpan } from '@/lib/utils';

export function ProblemSection() {
  return (
    <AnimatedSection className="relative overflow-hidden bg-white py-16 md:py-20">
      <GridBackground />
      <div className="pointer-events-none absolute right-0 top-0 size-[28rem] rounded-full bg-violet-500/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 size-80 rounded-full bg-primary/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        <div className="mb-[6px] grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="mb-4 inline-flex rounded-full bg-primary/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary ring-1 ring-primary/10">
              The Problem
            </span>
            <h2 className="mb-3 max-w-xl text-balance text-[2rem] font-extrabold leading-[1.08] tracking-tighter text-on-background sm:text-[2.5rem] md:text-[2.75rem]">
              Online commerce is{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-600 to-indigo-500">
                broken.
              </span>
            </h2>
            <p className="max-w-lg text-balance text-base leading-relaxed text-slate-600 md:text-lg">
              Scams, unreliable sellers, failed payments, and lack of trust make online transactions risky for
              everyone involved — especially across Africa&apos;s mobile-money economy.
            </p>
          </div>

          <div className="hidden lg:block">
            <ProblemVisual />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {problemCards.map((card, i) => (
            <ProblemCardItem
              key={card.title}
              card={card}
              index={i}
              className={cn(oddGridLastSpan(i, problemCards.length))}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
