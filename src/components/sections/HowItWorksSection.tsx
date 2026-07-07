import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Icon } from '@/components/ui/Icon';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { steps } from '@/lib/content';
import { cn, oddGridLastSpan } from '@/lib/utils';

export function HowItWorksSection() {
  return (
    <AnimatedSection id="how-it-works" className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(248,249,255,1)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute left-[8%] top-[35%] size-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-[20%] size-72 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[15%] left-1/2 size-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        <SectionEyebrow>How It Works</SectionEyebrow>
        <h2 className="mb-5 max-w-2xl text-balance font-headline-lg text-headline-lg-mobile tracking-tighter text-on-background md:text-headline-lg">
          Zantrra in six steps.
        </h2>
        <p className="mb-12 max-w-2xl text-balance font-body-lg text-body-lg leading-relaxed text-slate-600 md:mb-14">
          A simple, secure process that protects both buyers and sellers at every stage of the transaction.
        </p>

        <div className="relative [perspective:1200px]">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent lg:block" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-4">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={cn(
                  'group flex flex-col items-center rounded-2xl bg-white/80 p-3 text-center ring-1 ring-slate-900/5 backdrop-blur-sm shadow-[0_20px_40px_-15px_rgba(70,72,212,0.2)] transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_28px_50px_-12px_rgba(70,72,212,0.28),0_12px_24px_-8px_rgba(15,23,42,0.08)] md:p-5',
                  oddGridLastSpan(i, steps.length),
                )}
              >
                <div className="relative mb-3 md:mb-4">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-[0_12px_28px_-8px_rgba(70,72,212,0.55)] ring-4 ring-primary/10 transition-transform duration-300 group-hover:scale-105 md:size-16 md:text-sm">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <Icon
                      name="arrow_forward"
                      className="absolute -right-5 top-1/2 hidden size-4 -translate-y-1/2 text-primary/25 lg:block"
                    />
                  )}
                </div>
                <h3 className="mb-1 text-xs font-label-md font-bold text-on-background md:mb-2 md:text-label-md">{step.title}</h3>
                <p className="text-[10px] leading-relaxed text-slate-600 md:text-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
