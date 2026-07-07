import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Icon } from '@/components/ui/Icon';
import { IconBox } from '@/components/ui/IconBox';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { roadmapItems } from '@/lib/content';
import { cn, oddGridLastSpan } from '@/lib/utils';

export function RoadmapSection() {
  return (
    <AnimatedSection className="relative overflow-hidden bg-slate-50/50 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        <SectionEyebrow>Roadmap</SectionEyebrow>
        <h2 className="mb-5 max-w-xl text-balance font-headline-lg text-headline-lg-mobile tracking-tighter text-on-background md:text-headline-lg">
          Future Vision
        </h2>
        <p className="mb-16 max-w-2xl text-balance font-body-lg text-body-lg leading-relaxed text-slate-600">
          We are building the trust layer for the next generation of global commerce.
        </p>

        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
          {roadmapItems.map((item, i) => (
            <div
              key={item.title}
              className={cn(
                'flex h-full flex-col rounded-2xl p-4 transition-shadow duration-300 md:p-6',
                oddGridLastSpan(i, roadmapItems.length),
                item.active
                  ? 'bg-gradient-to-br from-primary via-indigo-600 to-violet-800 text-white shadow-[0_20px_40px_-12px_rgba(70,72,212,0.45)] ring-1 ring-white/10'
                  : 'bg-white/90 ring-1 ring-slate-900/[0.03] backdrop-blur-sm shadow-[0_2px_4px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.04),0_12px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.03),0_8px_20px_rgba(0,0,0,0.06),0_20px_40px_rgba(0,0,0,0.08)]',
              )}
            >
              {item.active ? (
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/20">
                  <Icon name="psychology" className="size-5 text-white" />
                </div>
              ) : (
                <IconBox size="md" className="mb-4">
                  <Icon name="rocket_launch" />
                </IconBox>
              )}
              <p
                className={`mb-2 text-xs font-bold uppercase tracking-widest ${
                  item.active ? 'text-[#c6d2ff]' : 'text-primary'
                }`}
              >
                {item.quarter}
              </p>
              <h3
                className={`mb-2 text-base font-headline-md text-headline-md ${
                  item.active ? 'text-white' : 'text-on-background'
                }`}
              >
                {item.title}
              </h3>
              <p
                className={`flex-1 text-sm font-body-md text-body-md leading-relaxed ${
                  item.active ? 'text-[#e0e7ff]' : 'text-slate-600'
                }`}
              >
                {item.description}
              </p>
              {item.status && (
                <div className="mt-4">
                  {item.status === 'In Progress' ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm">
                      <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      In Progress
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">{item.status}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
