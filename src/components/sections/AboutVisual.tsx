'use client';

import { FloatingElement } from '@/components/ui/FloatingElement';
import { Icon } from '@/components/ui/Icon';
import { IconBox } from '@/components/ui/IconBox';
import { demoVendors, stats } from '@/lib/content';

const [, paintVendor, riceVendor] = demoVendors;
const africaPopulation = stats.find((s) => s.label === 'People in Africa');

function MicroCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`backdrop-blur-xl bg-white/70 ring-1 ring-slate-900/5 rounded-2xl ${className ?? ''}`}
      style={{
        boxShadow:
          '0 2px 4px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.06)',
      }}
    >
      {children}
    </div>
  );
}

export function AboutVisual() {
  return (
    <div className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[24rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(70,72,212,0.06)_0%,transparent_70%)]" />

      <FloatingElement delay={0} className="absolute left-1/2 top-4 z-10 -translate-x-1/2">
        <MicroCard className="px-4 py-3">
          <div className="flex items-center gap-2">
            <IconBox size="sm">
              <Icon name="hub" />
            </IconBox>
            <div className="min-w-0">
              <p className="whitespace-nowrap text-xs font-semibold text-slate-900">African Trust Network</p>
              <p className="whitespace-nowrap text-[10px] text-slate-500">
                {africaPopulation?.value ?? '1.4B+'} people connected
              </p>
            </div>
          </div>
        </MicroCard>
      </FloatingElement>

      <FloatingElement delay={0.6} duration={5.5} className="absolute left-2 top-24 z-0 w-44 -rotate-6">
        <MicroCard className="p-3">
          <div className="mb-2 flex items-center gap-2">
            <div className="size-7 shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 ring-2 ring-white" />
            <p className="min-w-0 truncate text-[10px] font-medium text-slate-700">{riceVendor.name}</p>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-slate-200/80" />
            <div className="h-1.5 w-4/5 rounded-full bg-slate-200/60" />
          </div>
          <p className="mt-2 truncate whitespace-nowrap text-[10px] font-medium text-primary">
            {riceVendor.product} · Escrow active
          </p>
        </MicroCard>
      </FloatingElement>

      <FloatingElement delay={1.2} duration={6} className="absolute right-0 top-28 z-10 w-48 rotate-3">
        <MicroCard className="p-3">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Live Transaction</p>
          <div className="mb-2 flex items-center justify-between gap-1">
            <span className="truncate whitespace-nowrap text-sm font-bold text-slate-900 sm:text-base">
              {paintVendor.price}
            </span>
            <span className="flex shrink-0 items-center gap-1 text-[10px] font-semibold text-emerald-600">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              Verified
            </span>
          </div>
          <p className="mb-2 truncate text-[10px] text-slate-500">{paintVendor.product}</p>
          <div className="flex -space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="size-7 rounded-full bg-gradient-to-r from-indigo-400 to-violet-500 ring-2 ring-white"
                style={{ opacity: 1 - i * 0.15 }}
              />
            ))}
          </div>
        </MicroCard>
      </FloatingElement>

      <FloatingElement delay={1.8} duration={5} className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <MicroCard className="px-4 py-2.5 sm:px-5">
          <p className="whitespace-nowrap text-center text-[10px] font-medium text-slate-600 sm:text-xs">
            Verified vendors across Guinea &amp; Africa
          </p>
        </MicroCard>
      </FloatingElement>

      <svg className="pointer-events-none absolute inset-0 h-full w-full text-primary/15" aria-hidden>
        <line x1="50%" y1="18%" x2="20%" y2="42%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="50%" y1="18%" x2="82%" y2="48%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20%" y1="42%" x2="50%" y2="82%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="82%" y1="48%" x2="50%" y2="82%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}
