import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { stats } from '@/lib/content';
import { cn } from '@/lib/utils';

export function MarketSection() {
  return (
    <AnimatedSection className="relative isolate overflow-hidden bg-white py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 mesh-market-3d" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden>
        <div className="size-[36rem] rounded-full bg-primary/20 blur-[120px] mesh-market-orb" />
      </div>
      <div className="pointer-events-none absolute right-[5%] top-[20%] size-64 rounded-full bg-violet-600/15 blur-3xl mesh-market-orb-delayed" aria-hidden />
      <div className="pointer-events-none absolute bottom-[10%] left-[8%] size-72 rounded-full bg-indigo-500/10 blur-3xl mesh-market-orb" aria-hidden />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <SectionEyebrow centered>Market Opportunity</SectionEyebrow>
          <h2 className="mb-4 text-balance font-headline-lg text-headline-lg-mobile tracking-tighter text-on-background md:text-headline-lg">
            Africa&apos;s trust gap is a $56B opportunity.
          </h2>
          <p className="text-balance font-body-lg text-body-lg leading-relaxed text-slate-600">
            With 60%+ of transactions on mobile money and 1.4 billion people entering the digital economy, escrow infrastructure is the missing layer — starting in Guinea.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'rounded-2xl bg-gradient-to-b from-white/90 via-slate-100/50 to-transparent p-[1px] shadow-[0_20px_40px_-15px_rgba(70,72,212,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-12px_rgba(70,72,212,0.22)]',
                i === 1 && 'lg:-translate-y-2',
              )}
            >
              <div className="rounded-2xl bg-white/60 p-4 text-center ring-1 ring-white/80 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(70,72,212,0.2),0_8px_16px_-6px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] md:p-8">
                <p className="mb-2 text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-violet-800 drop-shadow-sm md:mb-3 md:text-5xl lg:text-6xl">
                  {stat.value}
                </p>
                <p className="mb-1 text-sm font-headline-md text-headline-md text-on-background md:text-base">{stat.label}</p>
                <p className="text-xs font-body-md text-body-md leading-relaxed text-slate-600 md:text-sm">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
